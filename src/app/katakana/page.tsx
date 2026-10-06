import React, { Suspense } from 'react';
import KatakanaStudio from '@/components/katakana/KatakanaStudio';

export const metadata = {
  title: '가타카나 마스터 | 釜山だより',
  description: '소리 탐색, 도플갱어(シ/ツ, ソ/ン) 집중 비교, 획순 손글씨 쓰기, 히라가나⇄가타카나 짝맞추기 게임, 여행 실전 외래어로 완성하는 가타카나 입문 코스'
};

interface KatakanaPageProps {
  searchParams: Promise<{
    step?: string;
    char?: string;
    type?: string;
  }>;
}

export default async function KatakanaPage({ searchParams }: KatakanaPageProps) {
  const resolvedParams = await searchParams;
  const initialStep = (resolvedParams.step as 'sound' | 'confusing' | 'write' | 'match' | 'travel') || 'sound';
  const initialCategory = (
    resolvedParams.type === 'special'
      ? 'special'
      : resolvedParams.type === 'youon'
      ? 'youon'
      : resolvedParams.type === 'dakuon'
      ? 'dakuon'
      : 'seion'
  ) as 'seion' | 'dakuon' | 'youon' | 'special';
  const initialChar = resolvedParams.char || (initialCategory === 'special' ? 'ティ' : initialCategory === 'youon' ? 'キャ' : initialCategory === 'dakuon' ? 'ガ' : 'ア');

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="w-8 h-8 border-4 border-[#3D5A80] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <KatakanaStudio
        initialStep={initialStep}
        initialChar={initialChar}
        initialCategory={initialCategory}
      />
    </Suspense>
  );
}
