import { showGlobalToast } from './toast';

const STORAGE_KEY = 'gemini_tts_daily_usage';
const NOTIFIED_KEY = 'gemini_tts_notified_date';
export const DAILY_TTS_LIMIT = 10;

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
    if (!raw) return { date: today, count: 0 };

    const data: QuotaData = JSON.parse(raw);
    if (data.date !== today) {
      // 날짜가 바뀌었으면 카운터 자동 초기화
      return { date: today, count: 0 };
    }
    return data;
  } catch {
    return { date: today, count: 0 };
  }
}

export function canUseGeminiTts(): boolean {
  const { count } = getTtsUsage();
  return count < DAILY_TTS_LIMIT;
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
    } catch {
      // localStorage 접근 제한 환경 예외 무시
    }
  }

  return newCount;
}

export function markQuotaExhausted(): void {
  const today = getTodayString();
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ date: today, count: DAILY_TTS_LIMIT })
      );
    } catch {
      // ignore
    }
  }
  notifyQuotaExhaustedOnce();
}

/**
 * 당일 최초 1회만 토스트 알림을 띄워 반복 클릭 시 토스트 공해 방지
 */
export function notifyQuotaExhaustedOnce(): void {
  if (typeof window === 'undefined') return;

  const today = getTodayString();
  try {
    const lastNotifiedDate = localStorage.getItem(NOTIFIED_KEY);
    if (lastNotifiedDate !== today) {
      localStorage.setItem(NOTIFIED_KEY, today);
      showGlobalToast('오늘의 AI 음성 한도(10회)가 소진되어 기본 브라우저 음성으로 재생됩니다.');
    }
  } catch {
    showGlobalToast('오늘의 AI 음성 한도(10회)가 소진되어 기본 브라우저 음성으로 재생됩니다.');
  }
}
