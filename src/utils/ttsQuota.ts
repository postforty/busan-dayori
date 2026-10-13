import { showGlobalToast } from './toast';

export type TtsEngineMode = 'gemini' | 'browser';
const MODE_STORAGE_KEY = 'gemini_tts_engine_mode';

/**
 * 현재 선택된 TTS 엔진 모드 반환 ('gemini' 또는 'browser')
 * 초기값은 'gemini'
 */
export function getTtsEngineMode(): TtsEngineMode {
  if (typeof window === 'undefined') return 'gemini';
  try {
    const saved = localStorage.getItem(MODE_STORAGE_KEY);
    if (saved === 'browser') return 'browser';
    return 'gemini';
  } catch {
    return 'gemini';
  }
}

/**
 * TTS 엔진 모드 저장 및 전역 이벤트('tts-mode-change') 디스패치
 */
export function setTtsEngineMode(mode: TtsEngineMode): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(MODE_STORAGE_KEY, mode);
    window.dispatchEvent(new CustomEvent('tts-mode-change', { detail: { mode } }));
  } catch {
    // ignore
  }
}

/**
 * 쿼터 소진 / Rate Limit 오류 발생 시 자동으로 Gemini TTS를 토글 OFF 처리하고 안내 토스트 발송
 */
export function handleTtsQuotaExceeded(
  message: string = 'Gemini AI 음성 쿼터가 소진되어 기본 브라우저 음성 모드로 자동 전환되었습니다.'
): void {
  setTtsEngineMode('browser');
  showGlobalToast(message, { icon: 'info' });
}

/**
 * Gemini TTS 사용 가능 여부 (현재 토글 ON 여부)
 */
export function canUseGeminiTts(): boolean {
  return getTtsEngineMode() === 'gemini';
}

// --- 하위 호환성을 위한 레거시 스텁 (타입 에러 방지) ---
export const DAILY_TTS_LIMIT = 99999;

export function getTtsUsage(): { date: string; count: number } {
  return { date: new Date().toISOString().slice(0, 10), count: 0 };
}

export function incrementTtsUsage(): number {
  return 0;
}

export function markQuotaExhausted(): void {
  handleTtsQuotaExceeded();
}

export function notifyQuotaExhaustedOnce(): void {
  handleTtsQuotaExceeded();
}

export function notifyServerQuotaOnce(): void {
  handleTtsQuotaExceeded('AI 음성 서버의 일일 할당량이 소진되어 기본 브라우저 음성으로 자동 전환되었습니다.');
}

export function notifyTransientCooldownOnce(): void {
  handleTtsQuotaExceeded('음성 요청이 일시적으로 집중되어 기본 브라우저 음성으로 자동 전환되었습니다.');
}

export function isServerQuotaExhausted(): boolean {
  return false;
}

export function setServerQuotaExhausted(): void {
  handleTtsQuotaExceeded();
}

export function getTtsCooldownRemaining(): number {
  return 0;
}

export function setTtsTransientCooldown(_seconds?: number): void {
  // no-op
}
