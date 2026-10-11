/**
 * 부산 다요리 (Busan Dayori) 전역 사운드 매니저
 * - 도서관, 공공장소, 야간 등 조용한 환경에서의 무음 학습을 완벽히 지원
 * - localStorage 기반 영속화 및 CustomEvent 기반 전역 실시간 동기화
 * - Web Speech API (TTS) 및 오디오 재생 통합 가로채기(Interceptor) 지원
 */

import { useState, useEffect, useCallback } from 'react';

export const SOUND_STORAGE_KEY = 'busan_dayori_sound_enabled';
export const SOUND_EVENT_NAME = 'busan-sound-change';

// 초기 메모리 캐시 (기본값: true)
let memorySoundEnabled = true;

if (typeof window !== 'undefined') {
  try {
    const saved = localStorage.getItem(SOUND_STORAGE_KEY);
    if (saved !== null) {
      memorySoundEnabled = saved === 'true';
    }
  } catch {
    // 로컬 스토리지 접근 제한 환경 예외 무시
  }
}

/**
 * 현재 사운드 활성화 여부 동기 조회
 * - 일반 함수(TTS / playKatakanaAudio) 내부에서 즉시 호출 가능
 */
export function isSoundEnabled(): boolean {
  if (typeof window === 'undefined') return true;
  return memorySoundEnabled;
}

/**
 * 사운드 활성화 여부 설정 및 전역 전파
 */
export function setSoundEnabled(enabled: boolean): void {
  if (typeof window === 'undefined') return;
  memorySoundEnabled = enabled;

  try {
    localStorage.setItem(SOUND_STORAGE_KEY, String(enabled));
  } catch {
    // 무시
  }

  // 음소거로 전환된 경우 재생 중이던 Web Speech API 즉시 취소
  if (!enabled && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }

  // 브라우저 윈도우 내 모든 구독 컴포넌트에 통지
  window.dispatchEvent(
    new CustomEvent(SOUND_EVENT_NAME, {
      detail: { enabled }
    })
  );
}

/**
 * 사운드 켜기/끄기 토글
 * @returns 변경된 사운드 활성화 상태 (true: 켬, false: 끔)
 */
export function toggleSound(): boolean {
  const next = !isSoundEnabled();
  setSoundEnabled(next);
  return next;
}

/**
 * 전역 사운드 상태 구독 React Hook
 */
export function useSoundManager() {
  const [enabled, setEnabled] = useState<boolean>(true);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    setEnabled(isSoundEnabled());

    const handleSoundChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ enabled: boolean }>;
      if (customEvent.detail && typeof customEvent.detail.enabled === 'boolean') {
        setEnabled(customEvent.detail.enabled);
      } else {
        setEnabled(isSoundEnabled());
      }
    };

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === SOUND_STORAGE_KEY && e.newValue !== null) {
        const nextVal = e.newValue === 'true';
        memorySoundEnabled = nextVal;
        setEnabled(nextVal);
      }
    };

    window.addEventListener(SOUND_EVENT_NAME, handleSoundChange);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener(SOUND_EVENT_NAME, handleSoundChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const toggle = useCallback(() => {
    return toggleSound();
  }, []);

  const setSound = useCallback((val: boolean) => {
    setSoundEnabled(val);
  }, []);

  return {
    isSoundEnabled: mounted ? enabled : true,
    isMuted: mounted ? !enabled : false,
    toggleSound: toggle,
    setSoundEnabled: setSound,
    mounted
  };
}
