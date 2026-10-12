export type ToastIconType = 'check' | 'sparkles' | 'volume' | 'info';

export interface ToastOptions {
  icon?: ToastIconType;
  duration?: number;
}

/**
 * 전역 토스트 메시지 트리거 유틸리티
 */
export function showGlobalToast(
  message: string,
  options?: ToastOptions | number
) {
  if (typeof window !== 'undefined') {
    const opts: ToastOptions =
      typeof options === 'number' ? { duration: options } : options || {};
    window.dispatchEvent(
      new CustomEvent('app:toast', {
        detail: {
          message,
          icon: opts.icon || 'check',
          duration: opts.duration || 3500,
        },
      })
    );
  }
}
