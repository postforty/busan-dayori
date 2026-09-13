'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, X } from 'lucide-react';

export default function GlobalToast() {
  const searchParams = useSearchParams();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

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
      const showTimer = setTimeout(() => {
        setToastMessage(msg);
      }, 50);

      // URL 파라미터 정리
      const url = new URL(window.location.href);
      url.searchParams.delete('deleted');
      url.searchParams.delete('created');
      url.searchParams.delete('updated');
      window.history.replaceState({}, '', url.pathname + (url.search ? url.search : ''));

      // 3초 후 자동 닫힘
      const hideTimer = setTimeout(() => {
        setToastMessage(null);
      }, 3200);

      return () => {
        clearTimeout(showTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [searchParams]);

  if (!toastMessage) return null;

  return (
    <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 w-auto max-w-sm px-4 animate-in fade-in slide-in-from-top-4 duration-300">
      <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-[#2D3748] text-white shadow-xl border border-white/10 text-xs font-semibold backdrop-blur-md">
        <div className="w-5 h-5 rounded-full bg-[#E07A5F] flex items-center justify-center text-white shrink-0">
          <CheckCircle2 className="w-3.5 h-3.5" />
        </div>
        <span className="leading-snug">{toastMessage}</span>
        <button
          onClick={() => setToastMessage(null)}
          className="ml-2 text-white/60 hover:text-white p-0.5 rounded-full transition-colors"
          title="닫기"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
