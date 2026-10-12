/**
 * 전역 토스트 메시지 트리거 유틸리티
 */
export function showGlobalToast(message: string, duration: number = 3500) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('app:toast', {
        detail: { message, duration },
      })
    );
  }
}
