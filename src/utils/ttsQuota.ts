import { showGlobalToast } from './toast';

const STORAGE_KEY = 'gemini_tts_daily_usage';
const NOTIFIED_KEY = 'gemini_tts_notified_date';
const SERVER_NOTIFIED_KEY = 'gemini_tts_server_notified_date';
const COOLDOWN_KEY = 'gemini_tts_cooldown_until';
const SERVER_QUOTA_KEY = 'gemini_tts_server_quota_date';

export const DAILY_TTS_LIMIT = 10;

export type TtsEngineMode = 'gemini' | 'browser';
const MODE_STORAGE_KEY = 'gemini_tts_engine_mode';

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

export function setTtsEngineMode(mode: TtsEngineMode): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(MODE_STORAGE_KEY, mode);
    window.dispatchEvent(new CustomEvent('tts-mode-change', { detail: { mode } }));
  } catch {
    // ignore
  }
}

interface QuotaData {
  date: string; // YYYY-MM-DD
  count: number;
}

function getTodayString(): string {
  // 로컬 시간 기준 YYYY-MM-DD
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getTtsUsage(): QuotaData {
  const today = getTodayString();
  if (typeof window === 'undefined') {
    return { date: today, count: 0 };
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const initData = { date: today, count: 0 };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initData));
      return initData;
    }

    const data: QuotaData = JSON.parse(raw);
    if (data.date !== today) {
      // 날짜가 바뀌었으면 카운터 자동 초기화 및 로컬스토리지 즉시 동기화
      const resetData = { date: today, count: 0 };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(resetData));

      // 날짜 변경 시 이전 날짜의 서버 쿼터 마킹도 자동 해제
      const serverQuotaDate = localStorage.getItem(SERVER_QUOTA_KEY);
      if (serverQuotaDate && serverQuotaDate !== today) {
        localStorage.removeItem(SERVER_QUOTA_KEY);
      }

      window.dispatchEvent(new CustomEvent('tts-mode-change', { detail: { mode: getTtsEngineMode() } }));
      return resetData;
    }
    return data;
  } catch {
    return { date: today, count: 0 };
  }
}

/**
 * 일시적 과부하/RPM 초과(rate_limit_exceeded, too_many_requests) 시 쿨다운 잔여 시간(초) 반환
 */
export function getTtsCooldownRemaining(): number {
  if (typeof window === 'undefined') return 0;
  try {
    const until = localStorage.getItem(COOLDOWN_KEY);
    if (!until) return 0;
    const remainingMs = parseInt(until, 10) - Date.now();
    if (remainingMs <= 0) {
      localStorage.removeItem(COOLDOWN_KEY);
      return 0;
    }
    return Math.ceil(remainingMs / 1000);
  } catch {
    return 0;
  }
}

/**
 * 일시적 과부하 발생 시 n초 동안 AI 호출 일시 중단 (쿨다운)
 */
export function setTtsTransientCooldown(seconds: number = 60): void {
  if (typeof window === 'undefined') return;
  try {
    const until = Date.now() + seconds * 1000;
    localStorage.setItem(COOLDOWN_KEY, until.toString());
  } catch {
    // ignore
  }
}

/**
 * 당일 서버 전체 일일 쿼터(quota_exceeded) 소진 여부 확인
 */
export function isServerQuotaExhausted(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const quotaDate = localStorage.getItem(SERVER_QUOTA_KEY);
    return quotaDate === getTodayString();
  } catch {
    return false;
  }
}

/**
 * 서버 전체 일일 쿼터 소진 상태 마킹 (개인 사용량 카운트는 몰수하지 않음)
 */
export function setServerQuotaExhausted(): void {
  if (typeof window === 'undefined') return;
  const today = getTodayString();
  try {
    localStorage.setItem(SERVER_QUOTA_KEY, today);
  } catch {
    // ignore
  }
  notifyServerQuotaOnce();
}

/**
 * 사용자가 현재 Gemini AI 음성을 호출할 수 있는 상태인지 검사
 */
export function canUseGeminiTts(): boolean {
  const { count } = getTtsUsage();
  if (count >= DAILY_TTS_LIMIT) return false;
  if (getTtsCooldownRemaining() > 0) return false;
  if (isServerQuotaExhausted()) return false;
  return true;
}

export function incrementTtsUsage(): number {
  const today = getTodayString();
  const current = getTtsUsage();
  const newCount = current.date === today ? current.count + 1 : 1;

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ date: today, count: newCount })
      );
      window.dispatchEvent(new CustomEvent('tts-mode-change', { detail: { mode: getTtsEngineMode() } }));
    } catch {
      // localStorage 접근 제한 환경 예외 무시
    }
  }

  return newCount;
}

/**
 * 사용자 개인의 일일 한도(10회)를 소진 처리 (하위 호환 유지)
 */
export function markQuotaExhausted(): void {
  const today = getTodayString();
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ date: today, count: DAILY_TTS_LIMIT })
      );
      window.dispatchEvent(new CustomEvent('tts-mode-change', { detail: { mode: getTtsEngineMode() } }));
    } catch {
      // ignore
    }
  }
  notifyQuotaExhaustedOnce();
}

/**
 * 사용자 개인 10회 한도 소진 시 당일 최초 1회 토스트 안내
 */
export function notifyQuotaExhaustedOnce(): void {
  if (typeof window === 'undefined') return;

  const today = getTodayString();
  try {
    const lastNotifiedDate = localStorage.getItem(NOTIFIED_KEY);
    if (lastNotifiedDate !== today) {
      localStorage.setItem(NOTIFIED_KEY, today);
      showGlobalToast('오늘의 개인 AI 음성 한도(10회)가 소진되어 기본 브라우저 음성으로 재생됩니다.', { icon: 'info' });
    }
  } catch {
    showGlobalToast('오늘의 개인 AI 음성 한도(10회)가 소진되어 기본 브라우저 음성으로 재생됩니다.', { icon: 'info' });
  }
}

/**
 * 서버 전체 일일 쿼터 소진 시 당일 최초 1회 토스트 안내
 */
export function notifyServerQuotaOnce(): void {
  if (typeof window === 'undefined') return;

  const today = getTodayString();
  try {
    const lastNotifiedDate = localStorage.getItem(SERVER_NOTIFIED_KEY);
    if (lastNotifiedDate !== today) {
      localStorage.setItem(SERVER_NOTIFIED_KEY, today);
      showGlobalToast('AI 음성 서버의 일일 할당량이 소진되어 기본 브라우저 음성으로 재생됩니다.', { icon: 'info' });
    }
  } catch {
    showGlobalToast('AI 음성 서버의 일일 할당량이 소진되어 기본 브라우저 음성으로 재생됩니다.', { icon: 'info' });
  }
}

/**
 * 일시적 과부하 쿨다운 진입 시 1회 안내
 */
export function notifyTransientCooldownOnce(): void {
  showGlobalToast('음성 요청이 일시적으로 집중되어 기본 브라우저 음성으로 재생됩니다.', { icon: 'info' });
}
