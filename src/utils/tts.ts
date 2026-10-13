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

interface CharTiming {
  index: number;
  length: number;
  startMs: number;
  endMs: number;
}

// 모라 박자 기반 글자별 재생 시간 계산
function computeCharTimings(text: string, rate: number): CharTiming[] {
  const timings: CharTiming[] = [];
  let currentMs = 0;
  const speed = Math.max(0.1, rate);

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    let baseMs = 120;

    // 한자는 보통 2~3음절(모라)을 차지함
    if (/[\u4e00-\u9faf]/.test(char)) {
      baseMs = 210;
    } else if ('ゃゅょぁぃぅぇぉャュョァィゥェォ'.includes(char)) {
      baseMs = 40; // 요음
    } else if ('っッ'.includes(char)) {
      baseMs = 90; // 촉음
    } else if ('ー'.includes(char)) {
      baseMs = 110; // 장음
    } else if ('、,'.includes(char)) {
      baseMs = 250; // 쉼표
    } else if ('。.!?！？'.includes(char)) {
      baseMs = 350; // 마침표
    } else if (char === ' ') {
      baseMs = 70; // 공백
    }

    const duration = Math.round(baseMs / speed);
    timings.push({
      index: i,
      length: 1,
      startMs: currentMs,
      endMs: currentMs + duration,
    });
    currentMs += duration;
  }

  return timings;
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

  const timings = computeCharTimings(text, rate);
  const totalComputedMs = timings[timings.length - 1]?.endMs || 1000;

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
      const startTime = performance.now();

      activeTimer = setInterval(() => {
        // 실제 오디오 duration과 계산된 mora 타이밍의 비율 보정
        const durationMs = audio.duration && !isNaN(audio.duration) ? audio.duration * 1000 : totalComputedMs;
        const scale = durationMs / Math.max(1, totalComputedMs);

        const elapsed = (performance.now() - startTime) / scale;
        const current = timings.find((t) => elapsed >= t.startMs && elapsed < t.endMs);
        if (current) {
          onBoundary(current.index, 1);
        } else if (elapsed >= (timings[timings.length - 1]?.endMs || 0)) {
          onBoundary(text.length - 1, 1);
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

  const timings = computeCharTimings(text, rate);

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
        const current = timings.find((t) => elapsed >= t.startMs && elapsed < t.endMs);
        if (current) {
          onBoundary(current.index, 1);
        } else if (elapsed >= (timings[timings.length - 1]?.endMs || 0)) {
          onBoundary(text.length - 1, 1);
        }
      }, 25);
    }
  };

  if (onBoundary) {
    utterance.onboundary = (event) => {
      const charIndex = event.charIndex;
      const matched = timings.find((t) => t.index === charIndex);
      if (matched && startTime > 0) {
        startTime = performance.now() - matched.startMs;
        onBoundary(charIndex, 1);
      }
    };
  }

  utterance.onend = () => {
    cleanup();
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

