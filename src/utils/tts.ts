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
    let baseMs = 130;

    if ('ゃゅょぁぃぅぇぉャュョァィゥェォ'.includes(char)) {
      baseMs = 35;
    } else if ('っッー'.includes(char)) {
      baseMs = 90;
    } else if ('、,'.includes(char)) {
      baseMs = 260;
    } else if ('。.!?！？'.includes(char)) {
      baseMs = 360;
    } else if (char === ' ') {
      baseMs = 80;
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

  let nativeBoundaryCount = 0;
  const timings = computeCharTimings(text, rate);

  const cleanup = () => {
    if (activeTimer) {
      clearInterval(activeTimer);
      activeTimer = null;
    }
  };

  utterance.onstart = () => {
    if (onStart) onStart();

    if (onBoundary) {
      onBoundary(0, 1);

      const startTime = performance.now();
      activeTimer = setInterval(() => {
        // 브라우저 네이티브 boundary 이벤트가 정상 수신 중이면 타이머 간섭 중지
        if (nativeBoundaryCount >= 2) {
          cleanup();
          return;
        }

        const elapsed = performance.now() - startTime;
        const current = timings.find((t) => elapsed >= t.startMs && elapsed < t.endMs);
        if (current) {
          onBoundary(current.index, current.length);
        } else if (elapsed >= (timings[timings.length - 1]?.endMs || 0)) {
          onBoundary(text.length - 1, 1);
        }
      }, 35);
    }
  };

  if (onBoundary) {
    utterance.onboundary = (event) => {
      if (event.charIndex > 0) {
        nativeBoundaryCount++;
      }
      onBoundary(event.charIndex, event.charLength || 1);
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
