'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, X, Sparkles, Volume2, Info } from 'lucide-react';
import { ToastIconType } from '@/utils/toast';

export default function GlobalToast() {
  const searchParams = useSearchParams();
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastIcon, setToastIcon] = useState<ToastIconType>('check');
  const [isVisible, setIsVisible] = useState(false);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (fadeTimerRef.current) {
      clearTimeout(fadeTimerRef.current);
      fadeTimerRef.current = null;
    }
  }, []);

  const show = useCallback((message: string, icon: ToastIconType = 'check', duration: number = 3000) => {
    clearTimers();
    setToastIcon(icon);
    setToastMessage(message);

    // 다음 프레임에서 표시 활성화하여 진입 트랜지션 보장
    requestAnimationFrame(() => {
      setIsVisible(true);
    });

    timerRef.current = setTimeout(() => {
      setIsVisible(false);
      fadeTimerRef.current = setTimeout(() => {
        setToastMessage(null);
      }, 300);
    }, duration);
  }, [clearTimers]);

  const hide = useCallback(() => {
    clearTimers();
    setIsVisible(false);
    fadeTimerRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 200);
  }, [clearTimers]);

  // 1. URL 쿼리 파라미터 기반 알림 (편지 CRUD 알림)
  useEffect(() => {
    let msg: string | null = null;

    if (searchParams.get('deleted') === 'true') {
      msg = '편지가 안전하게 삭제되었습니다.';
    } else if (searchParams.get('created') === 'true') {
      msg = '새 편지가 성공적으로 발행되었습니다.';
    } else if (searchParams.get('updated') === 'true') {
      msg = '편지 내용이 수정되었습니다.';
    }

    if (msg) {
      const timer = setTimeout(() => {
        show(msg, 'check', 3000);
      }, 50);

      // URL 파라미터 정리
      const url = new URL(window.location.href);
      url.searchParams.delete('deleted');
      url.searchParams.delete('created');
      url.searchParams.delete('updated');
      window.history.replaceState({}, '', url.pathname + (url.search ? url.search : ''));

      return () => clearTimeout(timer);
    }
  }, [searchParams, show]);

  // 2. 외부 커스텀 이벤트(app:toast) 수신
  useEffect(() => {
    const handleCustomToast = (event: Event) => {
      const customEvent = event as CustomEvent<{
        message?: string;
        icon?: ToastIconType;
        duration?: number;
      }>;
      const msg = customEvent.detail?.message;
      if (!msg) return;

      const icon = customEvent.detail?.icon || 'check';
      const duration = customEvent.detail?.duration || 3000;
      show(msg, icon, duration);
    };

    window.addEventListener('app:toast', handleCustomToast);
    return () => {
      window.removeEventListener('app:toast', handleCustomToast);
      clearTimers();
    };
  }, [show, clearTimers]);

  if (!toastMessage) return null;

  const renderIconBadge = () => {
    switch (toastIcon) {
      case 'sparkles':
        return (
          <div className="w-5 h-5 sm:w-5.5 sm:h-5.5 rounded-full bg-[#FEF3C7] border border-[#FDE68A] flex items-center justify-center text-[#D97706] shrink-0">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
        );
      case 'volume':
        return (
          <div className="w-5 h-5 sm:w-5.5 sm:h-5.5 rounded-full bg-[#EBF3FB] border border-[#C5D9F2] flex items-center justify-center text-[#3D5A80] shrink-0">
            <Volume2 className="w-3.5 h-3.5" />
          </div>
        );
      case 'info':
        return (
          <div className="w-5 h-5 sm:w-5.5 sm:h-5.5 rounded-full bg-[#F1F5F9] border border-[#CBD5E1] flex items-center justify-center text-[#475569] shrink-0">
            <Info className="w-3.5 h-3.5" />
          </div>
        );
      case 'check':
      default:
        return (
          <div className="w-5 h-5 sm:w-5.5 sm:h-5.5 rounded-full bg-[#FAF0E6] border border-[#F4DDD4] flex items-center justify-center text-[#E07A5F] shrink-0">
            <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
          </div>
        );
    }
  };

  return (
    <div
      className={`fixed top-16 left-1/2 -translate-x-1/2 z-50 pointer-events-auto max-w-[92vw] transition-all duration-300 ease-out ${
        isVisible
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 -translate-y-2 scale-95 pointer-events-none'
      }`}
    >
      <div className="flex items-center gap-2.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white/95 backdrop-blur-md text-[#2D3748] shadow-[0_8px_24px_rgba(45,55,72,0.12)] border border-[#F4DDD4] text-xs sm:text-[13px] font-semibold">
        {renderIconBadge()}
        <span className="whitespace-nowrap tracking-tight leading-none text-[#2D3748]">
          {toastMessage}
        </span>
        <button
          type="button"
          onClick={hide}
          className="ml-1 text-[#A0AEC0] hover:text-[#4A5568] p-1 rounded-full hover:bg-black/5 transition-colors cursor-pointer shrink-0"
          title="닫기"
          aria-label="알림 닫기"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
