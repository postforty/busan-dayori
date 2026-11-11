'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Loader2, Compass } from 'lucide-react';

// SSR 회피를 위한 클라이언트 단독 3D 뷰어 동적 임포트
const World3DViewer = dynamic(
  () => import('@/components/3d/World3DViewer'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex flex-col items-center justify-center bg-[#FAF0E6] text-[#2D3748] space-y-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-3xl bg-white border border-[#F4DDD4] shadow-md flex items-center justify-center animate-bounce">
            <Compass className="w-8 h-8 text-[#E07A5F]" />
          </div>
          <Loader2 className="w-6 h-6 text-[#E07A5F] animate-spin absolute -bottom-2 -right-2" />
        </div>
        <div className="text-center space-y-1">
          <h2 className="text-base font-black tracking-tight text-[#2D3748]">
            3D 日本語の町 (마을)에 입장하는 중...
          </h2>
          <p className="text-xs text-[#718096]">
            주변을 둘러보고 일본어로 자유롭게 말을 걸어보세요.
          </p>
        </div>
      </div>
    )
  }
);

export default function WorldPage() {
  return (
    <div className="fixed inset-0 bottom-[calc(3.75rem+env(safe-area-inset-bottom,0px))] max-w-xl mx-auto z-30 overflow-hidden bg-slate-900">
      <World3DViewer />
    </div>
  );
}
