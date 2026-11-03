import React from 'react';

export default function Loading() {
  return (
    <div
      className="w-full px-4 pt-3 pb-24 space-y-4 max-w-xl mx-auto animate-pulse select-none"
      aria-busy="true"
      aria-live="polite"
      role="status"
    >
      {/* 1. 상단 웰컴 AI 챌린지 / 메인 인트로 카드 스켈레톤 (실제 카드 높이 ~235px와 정밀 동기화) */}
      <section className="bg-gradient-to-br from-[#FAF0E6] to-[#FFF9F2] rounded-3xl p-5 border border-[#F4DDD4] shadow-xs space-y-3.5">
        {/* 2단 볼드 타이틀 */}
        <div className="space-y-1.5 pt-0.5">
          <div className="h-6 w-52 bg-[#2D3748]/15 rounded-lg" />
          <div className="h-5 w-36 bg-[#E07A5F]/25 rounded-lg" />
        </div>

        {/* 입력 및 생성 폼 바 */}
        <div className="h-11 w-full bg-white border border-[#F4DDD4] rounded-2xl px-3.5 flex items-center justify-between shadow-2xs">
          <div className="h-3.5 w-44 bg-[#EDE8E1] rounded-md" />
          <div className="h-7 w-16 bg-[#E07A5F]/20 rounded-xl" />
        </div>

        {/* 퀵 추천 칩 리스트 (실제 칩 4개 배치 반영) */}
        <div className="flex flex-wrap gap-1.5 pt-0.5">
          <div className="h-7 w-36 bg-white/80 border border-[#F4DDD4] rounded-xl" />
          <div className="h-7 w-32 bg-white/80 border border-[#F4DDD4] rounded-xl" />
          <div className="h-7 w-28 bg-white/80 border border-[#F4DDD4] rounded-xl" />
          <div className="h-7 w-34 bg-white/80 border border-[#F4DDD4] rounded-xl" />
        </div>
      </section>

      {/* 2. 데일리 레슨 카드 스켈레톤 (DailyLessonCard 실제 높이 및 계층 구조 반영) */}
      <section className="bg-white rounded-3xl border border-[#EDE8E1] card-shadow overflow-hidden">
        {/* 카드 헤더 (단원/제목 및 우측 액션 버튼들) */}
        <div className="bg-gradient-to-r from-[#FAF0E6] to-[#FFF9F2] px-4 py-3 border-b border-[#F4DDD4] flex items-center justify-between gap-2">
          <div className="h-4 w-52 bg-[#2D3748]/15 rounded-md" />
          <div className="flex items-center gap-1.5">
            <div className="h-7 w-7 rounded-xl bg-white border border-[#EDE8E1]" />
            <div className="h-7 w-7 rounded-xl bg-[#E07A5F]/20 border border-[#F4DDD4]" />
          </div>
        </div>

        {/* 카드 본문 */}
        <div className="p-4 space-y-4">
          {/* 오늘의 키 프레이즈 박스 */}
          <div className="bg-[#FAF0E6]/30 border border-[#F4DDD4]/60 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="h-3 w-24 bg-[#718096]/25 rounded" />
              <div className="w-7 h-7 rounded-full bg-[#FAF0E6] border border-[#F4DDD4]/70" />
            </div>
            {/* 2줄로 표시되는 실제 일본어 핵심 문장 높이 */}
            <div className="space-y-2 py-1">
              <div className="h-6 w-11/12 bg-[#2D3748]/20 rounded-lg" />
              <div className="h-6 w-4/5 bg-[#2D3748]/20 rounded-lg" />
            </div>
          </div>

          {/* 실전 컨버세이션 헤더 */}
          <div className="flex items-center justify-between pt-1">
            <div className="h-4 w-32 bg-[#2D3748]/15 rounded" />
            <div className="h-7 w-7 rounded-xl bg-[#FAF0E6] border border-[#F4DDD4]/60" />
          </div>

          {/* 상황극 대화 카드들 */}
          <div className="space-y-2.5">
            <div className="h-16 w-full bg-[#FBF9F5] rounded-2xl border border-[#EDE8E1] p-3 flex items-center justify-between">
              <div className="space-y-1.5 w-3/4">
                <div className="h-3 w-16 bg-[#EDE8E1] rounded" />
                <div className="h-3.5 w-full bg-[#EDE8E1]/80 rounded" />
              </div>
              <div className="w-7 h-7 rounded-full bg-[#EDE8E1]/60" />
            </div>
            <div className="h-16 w-full bg-[#FBF9F5] rounded-2xl border border-[#EDE8E1] p-3 flex items-center justify-between">
              <div className="space-y-1.5 w-2/3">
                <div className="h-3 w-14 bg-[#EDE8E1] rounded" />
                <div className="h-3.5 w-full bg-[#EDE8E1]/80 rounded" />
              </div>
              <div className="w-7 h-7 rounded-full bg-[#EDE8E1]/60" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
