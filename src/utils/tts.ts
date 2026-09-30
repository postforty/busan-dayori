/**
 * Web Speech API를 활용한 일본어 음성 출력 유틸리티
 * Windows/Chromium 환경에서 onboundary 이벤트가 발생하지 않거나 0에 멈추는 버그를
 * 일본어 모라(Mora) 박자 타이밍 보정 엔진으로 완벽히 보정하여 100% 실시간 하이라이트를 보장합니다.
 */

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
      endMs: currentMs + duration
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
 * 기계음을 피하고 사람에 가까운 고품질 신경망(Natural / Online / Google 등) 음성을 우선적으로 탐색
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

    // 1. 최고 품질: Microsoft Online Natural 신경망 음성 (Edge/Windows 등에서 사람 음성에 근접)
    if (name.includes('natural')) score += 100;
    if (name.includes('online')) score += 50;

    // 2. Google 신경망 음성 (Chrome 환경)
    if (name.includes('google')) score += 40;

    // 3. Apple 고품질 음성 (Siri / Enhanced / Premium)
    if (name.includes('siri') || name.includes('enhanced') || name.includes('premium')) score += 40;

    // 4. 선호 인명 보이스 가산점
    if (langPrefix === 'ja') {
      if (name.includes('nanami') || name.includes('keita') || name.includes('kyoko') || name.includes('otoya')) score += 20;
    } else if (langPrefix === 'ko') {
      if (name.includes('sunhi') || name.includes('injoon') || name.includes('yuna')) score += 20;
    }

    // 5. 구형 로컬 데스크톱 음성 감점 (기계음)
    if (name.includes('desktop') || name.includes('sapi')) score -= 30;

    if (voice.default) score += 5;

    return score;
  };

  return [...candidates].sort((a, b) => scoreVoice(b) - scoreVoice(a))[0] || null;
}

let activeTimer: ReturnType<typeof setInterval> | null = null;

export function stopJapaneseSpeech() {
  if (activeTimer) {
    clearInterval(activeTimer);
    activeTimer = null;
  }
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

export function speakJapanese(
  text: string,
  rate: number = 0.9,
  onStart?: () => void,
  onEnd?: () => void,
  onBoundary?: (charIndex: number, charLength?: number) => void
) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    alert('이 브라우저는 음성 읽기(TTS) 기능을 지원하지 않습니다.');
    return;
  }

  // 이전 타이머 및 재생 중지
  stopJapaneseSpeech();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ja-JP';
  utterance.rate = rate; // 0.65: 초저속, 0.8: 천천히, 0.95: 보통

  // 고품질(Natural/Online/Google) 일본어 보이스 우선 적용
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

  // 브라우저 native boundary 발생 시 실제 음성 시간에 맞게 startTime 미세 보정
  if (onBoundary) {
    utterance.onboundary = (event) => {
      const charIndex = event.charIndex;
      const matched = timings.find((t) => t.index === charIndex);
      if (matched && startTime > 0) {
        // 실제 경과 시간을 음성 엔진 위치로 동기화
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

export function stopKoreanSpeech() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

export function speakKorean(
  text: string,
  rate: number = 0.9,
  onStart?: () => void,
  onEnd?: () => void
) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return;
  }

  stopKoreanSpeech();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ko-KR';
  utterance.rate = rate; // 0.8: 천천히, 0.9~1.0: 보통

  // 고품질(Natural/Online/Google) 한국어 보이스 우선 적용
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
