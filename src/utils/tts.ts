/**
 * 일본어/한국어 음성 출력 유틸리티
 * 
 * 1. 최신 Gemini 3.8 Flash-Lite TTS를 기본 우선 적용하여 사람과 같은 고품질 자연스러운 발음 제공
 * 2. 일일 10회 한도 소진 또는 API 오류(429 등) 발생 시 기존 Web Speech API로 0ms 무지연 자동 폴백 (Seamless Fallback)
 * 3. 기생성된 음성은 인메모리 Blob 캐싱으로 10회 쿼터를 소진하지 않고 0ms 즉각 재사용
 * 4. 모라(Mora) 박자 타이밍 보정 엔진을 통해 Gemini/Web Speech 모두에서 정밀한 글자별 실시간 하이라이트(onBoundary) 보장
 */

import { isSoundEnabled } from './soundManager';
import {
  getTtsEngineMode,
  handleTtsQuotaExceeded,
} from './ttsQuota';

interface CharRange {
  index: number;
  char: string;
  weight: number;
  startRatio: number;
  endRatio: number;
}

// 일본어 글자별 모라(Mora) 가중치 및 상대적 재생 비율 계산
function computeCharRanges(text: string): CharRange[] {
  const ODAN_CHARS = 'おこそとのほもよろごぞどぼぽヲ';
  const EDAN_CHARS = 'えけせてねへめれげぜでべぺ';
  const UDAN_CHARS = 'うくすつぬふむゆるぐずづぶぷ';
  const ADAN_CHARS = 'あかさたなはまやらわがざだばぱ';

  const ranges: CharRange[] = [];
  const weights: number[] = [];
  let totalWeight = 0;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const prevChar = i > 0 ? text[i - 1] : '';
    let weight = 1.0;

    // 한자는 보통 2음절(모라)을 차지함
    if (/[\u4e00-\u9faf]/.test(char)) {
      weight = 2.0;
    } else if ('ゃゅょぁぃぅぇぉャュョァィゥェォ'.includes(char)) {
      weight = 0.3; // 요음
    } else if ('っッ'.includes(char)) {
      weight = 0.75; // 촉음
    } else if ('ー'.includes(char)) {
      weight = 0.85; // 장음 부호
    } else if (char === 'う' && ODAN_CHARS.includes(prevChar)) {
      weight = 0.85; // 오단 장음 (예: ありがとう의 う)
    } else if (char === 'い' && EDAN_CHARS.includes(prevChar)) {
      weight = 0.85; // 에단 장음 (예: せんせい의 い)
    } else if (char === 'う' && UDAN_CHARS.includes(prevChar)) {
      weight = 0.85; // 우단 장음
    } else if (char === 'あ' && ADAN_CHARS.includes(prevChar)) {
      weight = 0.85; // 아단 장음
    } else if ('、,'.includes(char)) {
      weight = 0.35; // 쉼표
    } else if ('。.!?！？'.includes(char)) {
      // 문장 부호는 발음되지 않는 무음 기호이므로 싱크 밀림 방지를 위해 최소 가중치 부여
      weight = 0.05;
    } else if (char === ' ' || char === '　') {
      weight = 0.15; // 공백
    }

    weights.push(weight);
    totalWeight += weight;
  }

  const safeTotal = Math.max(0.001, totalWeight);
  let cumWeight = 0;

  for (let i = 0; i < text.length; i++) {
    const w = weights[i];
    const startRatio = cumWeight / safeTotal;
    cumWeight += w;
    const endRatio = cumWeight / safeTotal;

    ranges.push({
      index: i,
      char: text[i],
      weight: w,
      startRatio,
      endRatio: i === text.length - 1 ? 1.0 : endRatio,
    });
  }

  return ranges;
}

// 브라우저 보이스 목록 비동기 로딩 대비 프리로드
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  window.speechSynthesis.onvoiceschanged = () => {
    window.speechSynthesis.getVoices();
  };
}

/**
 * 기계음을 피하고 사람에 가까운 고품질 신경망(Natural / Online / Google 등) 음성을 우선적으로 탐색 (Web Speech Fallback용)
 */
export function getBestVoice(langPrefix: 'ja' | 'ko'): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;

  const voices = window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) return null;

  const candidates = voices.filter((v) => {
    const lang = v.lang.toLowerCase().replace('_', '-');
    return lang.startsWith(langPrefix);
  });

  if (candidates.length === 0) return null;

  const scoreVoice = (voice: SpeechSynthesisVoice): number => {
    const name = voice.name.toLowerCase();
    let score = 0;

    if (name.includes('natural')) score += 100;
    if (name.includes('online')) score += 50;
    if (name.includes('google')) score += 40;
    if (name.includes('siri') || name.includes('enhanced') || name.includes('premium')) score += 40;

    if (langPrefix === 'ja') {
      if (name.includes('nanami') || name.includes('keita') || name.includes('kyoko') || name.includes('otoya')) score += 20;
    } else if (langPrefix === 'ko') {
      if (name.includes('sunhi') || name.includes('injoon') || name.includes('yuna')) score += 20;
    }

    if (name.includes('desktop') || name.includes('sapi')) score -= 30;
    if (voice.default) score += 5;

    return score;
  };

  return [...candidates].sort((a, b) => scoreVoice(b) - scoreVoice(a))[0] || null;
}

// 오디오 캐시 및 재생 상태 관리
const audioBlobCache = new Map<string, string>(); // `${lang}:${text}` -> ObjectURL
let sharedAudio: HTMLAudioElement | null = null;
let activeTimer: ReturnType<typeof setInterval> | null = null;

function getSharedAudio(): HTMLAudioElement | null {
  if (typeof window === 'undefined') return null;
  if (!sharedAudio) {
    sharedAudio = new Audio();
  }
  return sharedAudio;
}

function stopCurrentPlayback() {
  if (activeTimer) {
    clearInterval(activeTimer);
    activeTimer = null;
  }
  if (sharedAudio) {
    sharedAudio.pause();
    sharedAudio.currentTime = 0;
    sharedAudio.onplay = null;
    sharedAudio.onended = null;
    sharedAudio.onerror = null;
    sharedAudio.ontimeupdate = null;
  }
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

export function stopJapaneseSpeech() {
  stopCurrentPlayback();
}

export function stopKoreanSpeech() {
  stopCurrentPlayback();
}

/**
 * Gemini TTS 생성 오디오 재생 및 모라 타이밍 기반 onBoundary 실시간 동기화
 */
function playAudioBlob(
  audioUrl: string,
  text: string,
  rate: number,
  onStart?: () => void,
  onEnd?: () => void,
  onBoundary?: (charIndex: number, charLength?: number) => void
) {
  const audio = getSharedAudio();
  if (!audio) {
    if (onEnd) onEnd();
    return;
  }

  stopCurrentPlayback();

  audio.src = audioUrl;
  audio.playbackRate = rate;

  const ranges = computeCharRanges(text);

  const cleanup = () => {
    if (activeTimer) {
      clearInterval(activeTimer);
      activeTimer = null;
    }
  };

  audio.onplay = () => {
    if (onStart) onStart();

    if (onBoundary) {
      onBoundary(0, 1);

      activeTimer = setInterval(() => {
        if (!audio) return;
        const duration = audio.duration;
        if (duration && !isNaN(duration) && duration > 0) {
          // audio.currentTime은 배속(rate)과 상관없이 원본 오디오 기준 위치(0~duration)로 흐르므로
          // progress는 어떤 배속(0.65x, 0.8x, 0.95x)이든 실제 발화 위치와 정확하게 일치합니다.
          const progress = Math.min(0.999, Math.max(0, audio.currentTime / duration));
          const current = ranges.find((r) => progress >= r.startRatio && progress < r.endRatio);
          if (current) {
            onBoundary(current.index, 1);
          }
        }
      }, 25);
    }
  };

  audio.onended = () => {
    cleanup();
    if (onBoundary) {
      onBoundary(text.length - 1, 1);
    }
    if (onEnd) onEnd();
  };

  audio.onerror = () => {
    cleanup();
    if (onEnd) onEnd();
  };

  audio.play().catch((err) => {
    console.warn('[Gemini TTS Audio Play Error]:', err);
    cleanup();
    if (onEnd) onEnd();
  });
}

/**
 * 기존 Web Speech API를 활용한 일본어 Fallback 재생
 */
export function speakJapaneseWebSpeech(
  text: string,
  rate: number = 0.9,
  onStart?: () => void,
  onEnd?: () => void,
  onBoundary?: (charIndex: number, charLength?: number) => void
) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    alert('이 브라우저는 음성 읽기(TTS) 기능을 지원하지 않습니다.');
    if (onEnd) onEnd();
    return;
  }

  stopCurrentPlayback();

  if (!isSoundEnabled()) {
    if (onEnd) onEnd();
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ja-JP';
  utterance.rate = rate;

  const bestVoice = getBestVoice('ja');
  if (bestVoice) {
    utterance.voice = bestVoice;
  }

  const ranges = computeCharRanges(text);
  const totalWeight = ranges.reduce((acc, r) => acc + r.weight, 0);
  // 일본어 1모라당 기준 발화 시간: 약 145ms (rate에 반비례)
  const estimatedTotalMs = Math.round((totalWeight * 145) / Math.max(0.1, rate));

  const cleanup = () => {
    if (activeTimer) {
      clearInterval(activeTimer);
      activeTimer = null;
    }
  };

  let startTime = 0;

  utterance.onstart = () => {
    if (onStart) onStart();

    if (onBoundary) {
      onBoundary(0, 1);
      startTime = performance.now();

      activeTimer = setInterval(() => {
        const elapsed = performance.now() - startTime;
        const progress = Math.min(0.999, Math.max(0, elapsed / estimatedTotalMs));
        const current = ranges.find((r) => progress >= r.startRatio && progress < r.endRatio);
        if (current) {
          onBoundary(current.index, 1);
        } else if (progress >= 0.999) {
          onBoundary(text.length - 1, 1);
        }
      }, 25);
    }
  };

  if (onBoundary) {
    utterance.onboundary = (event) => {
      const charIndex = event.charIndex;
      const matched = ranges.find((r) => r.index === charIndex);
      if (matched && startTime > 0) {
        // 브라우저의 실제 발음 경계 이벤트 발생 시 경과 시간 부드럽게 동기화
        startTime = performance.now() - matched.startRatio * estimatedTotalMs;
        onBoundary(charIndex, 1);
      }
    };
  }

  utterance.onend = () => {
    cleanup();
    if (onBoundary) {
      onBoundary(text.length - 1, 1);
    }
    if (onEnd) onEnd();
  };

  utterance.onerror = () => {
    cleanup();
    if (onEnd) onEnd();
  };

  window.speechSynthesis.speak(utterance);
}

/**
 * 기존 Web Speech API를 활용한 한국어 Fallback 재생
 */
export function speakKoreanWebSpeech(
  text: string,
  rate: number = 0.9,
  onStart?: () => void,
  onEnd?: () => void
) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    if (onEnd) onEnd();
    return;
  }

  stopCurrentPlayback();

  if (!isSoundEnabled()) {
    if (onEnd) onEnd();
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ko-KR';
  utterance.rate = rate;

  const bestVoice = getBestVoice('ko');
  if (bestVoice) {
    utterance.voice = bestVoice;
  }

  utterance.onstart = () => {
    if (onStart) onStart();
  };

  utterance.onend = () => {
    if (onEnd) onEnd();
  };

  utterance.onerror = () => {
    if (onEnd) onEnd();
  };

  window.speechSynthesis.speak(utterance);
}


/**
 * Gemini TTS 에러 응답 분석 및 쿼터/레이트 리밋 초과 시 자동으로 토글 OFF 전환
 */
async function handleTtsErrorResponse(res: Response): Promise<void> {
  try {
    const errorData = await res.json().catch(() => null);
    const code = errorData?.code;
    const category = errorData?.category;

    const isQuotaOrRateLimit =
      res.status === 429 ||
      res.status === 402 ||
      res.status === 503 ||
      category === 'daily_quota' ||
      category === 'transient' ||
      code === 'quota_exceeded' ||
      code === 'rate_limit_exceeded' ||
      code === 'too_many_requests';

    if (isQuotaOrRateLimit) {
      handleTtsQuotaExceeded();
    }
  } catch {
    if (res.status === 429 || res.status === 402 || res.status === 503) {
      handleTtsQuotaExceeded();
    }
  }
}

/**
 * 히라가나 전용 음성 출력
 * (Gemini 쿼터 보존 및 즉각적 반응성을 위해 브라우저 Web Speech 엔진 고정 사용)
 */
export function speakHiraganaAudio(
  text: string,
  rate: number = 0.85,
  onStart?: () => void,
  onEnd?: () => void,
  onBoundary?: (charIndex: number, charLength?: number) => void
) {
  speakJapaneseWebSpeech(text, rate, onStart, onEnd, onBoundary);
}

/**
 * 일본어 음성 출력 (회화, 데일리 레슨, 로드맵, 편지 등 회화 유닛 전용)
 * 토글 ON 시 Gemini TTS 호출, 쿼터 소진 시 자동으로 토글 OFF 전환 및 Web Speech 폴백
 */
export function speakJapanese(
  text: string,
  rate: number = 0.9,
  onStart?: () => void,
  onEnd?: () => void,
  onBoundary?: (charIndex: number, charLength?: number) => void
) {
  if (!text || text.trim() === '') {
    if (onEnd) onEnd();
    return;
  }

  // 전역 음소거 상태 시 재생 차단
  if (!isSoundEnabled()) {
    if (onEnd) onEnd();
    return;
  }

  const trimmedText = text.trim();

  // 0. 토글이 OFF('browser')인 경우 즉시 Web Speech 실행
  if (getTtsEngineMode() === 'browser') {
    speakJapaneseWebSpeech(trimmedText, rate, onStart, onEnd, onBoundary);
    return;
  }

  const cacheKey = `ja:${trimmedText}`;

  // 1. 이미 인메모리에 캐싱된 고품질 오디오가 있다면 즉시 재생
  if (audioBlobCache.has(cacheKey)) {
    playAudioBlob(audioBlobCache.get(cacheKey)!, trimmedText, rate, onStart, onEnd, onBoundary);
    return;
  }

  // 2. Gemini TTS 비동기 호출 (개인 일일 카운트 제한 없이 토글 ON이면 바로 호출)
  fetch('/api/tts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: trimmedText,
      lang: 'ja',
      voice: 'Charon',
    }),
  })
    .then(async (res) => {
      if (!res.ok) {
        await handleTtsErrorResponse(res);
        speakJapaneseWebSpeech(trimmedText, rate, onStart, onEnd, onBoundary);
        return;
      }

      const blob = await res.blob();
      const audioUrl = URL.createObjectURL(blob);
      audioBlobCache.set(cacheKey, audioUrl);

      playAudioBlob(audioUrl, trimmedText, rate, onStart, onEnd, onBoundary);
    })
    .catch((err) => {
      console.warn('[Gemini TTS fallback to Web Speech]:', err);
      speakJapaneseWebSpeech(trimmedText, rate, onStart, onEnd, onBoundary);
    });
}

/**
 * 한국어 음성 출력
 */
export function speakKorean(
  text: string,
  rate: number = 0.9,
  onStart?: () => void,
  onEnd?: () => void
) {
  if (!text || text.trim() === '') {
    if (onEnd) onEnd();
    return;
  }

  // 전역 음소거 상태 시 재생 차단
  if (!isSoundEnabled()) {
    if (onEnd) onEnd();
    return;
  }

  const trimmedText = text.trim();

  // 0. 토글이 OFF('browser')인 경우 즉시 Web Speech 실행
  if (getTtsEngineMode() === 'browser') {
    speakKoreanWebSpeech(trimmedText, rate, onStart, onEnd);
    return;
  }

  const cacheKey = `ko:${trimmedText}`;

  // 1. 이미 캐싱된 고품질 오디오가 있다면 즉시 재생
  if (audioBlobCache.has(cacheKey)) {
    playAudioBlob(audioBlobCache.get(cacheKey)!, trimmedText, rate, onStart, onEnd);
    return;
  }

  // 2. Gemini TTS 비동기 호출
  fetch('/api/tts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: trimmedText,
      lang: 'ko',
      voice: 'Charon',
    }),
  })
    .then(async (res) => {
      if (!res.ok) {
        await handleTtsErrorResponse(res);
        speakKoreanWebSpeech(trimmedText, rate, onStart, onEnd);
        return;
      }

      const blob = await res.blob();
      const audioUrl = URL.createObjectURL(blob);
      audioBlobCache.set(cacheKey, audioUrl);

      playAudioBlob(audioUrl, trimmedText, rate, onStart, onEnd);
    })
    .catch((err) => {
      console.warn('[Gemini TTS fallback to Web Speech]:', err);
      speakKoreanWebSpeech(trimmedText, rate, onStart, onEnd);
    });
}

/**
 * TTS 미리보기용 함수
 */
export async function playGeminiPreview(
  text: string = 'こんにちは！釜山だよりへようこそ。',
  lang: 'ja' | 'ko' = 'ja'
): Promise<void> {
  if (!isSoundEnabled()) return;
  const trimmedText = text.trim();
  const cacheKey = `${lang}:${trimmedText}`;

  if (audioBlobCache.has(cacheKey)) {
    playAudioBlob(audioBlobCache.get(cacheKey)!, trimmedText, 0.9);
    return;
  }

  try {
    const res = await fetch('/api/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: trimmedText,
        lang,
        voice: 'Charon',
      }),
    });
    if (!res.ok) {
      await handleTtsErrorResponse(res);
      throw new Error(`HTTP ${res.status}`);
    }
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    audioBlobCache.set(cacheKey, url);
    playAudioBlob(url, trimmedText, 0.9);
  } catch (err) {
    console.warn('[Preview Gemini Error]:', err);
    if (lang === 'ja') {
      speakJapaneseWebSpeech(trimmedText, 0.9);
    } else {
      speakKoreanWebSpeech(trimmedText, 0.9);
    }
  }
}

