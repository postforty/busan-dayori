import React, { Suspense } from 'react';
import HiraganaStudio from '@/components/hiragana/HiraganaStudio';

export const metadata = {
  title: '히라가나 마스터 스튜디오 | 釜山だより',
  description: '소리 탐색, 획순 인터랙티브 손글씨 쓰기, 실생활 미니 단어 읽기, 첫 발화 챌린지로 완성하는 히라가나 입문 코스'
};

interface HiraganaPageProps {
  searchParams: Promise<{
    step?: string;
    char?: string;
  }>;
}

export default async function HiraganaPage({ searchParams }: HiraganaPageProps) {
  const resolvedParams = await searchParams;
  const initialStep = (resolvedParams.step as 'sound' | 'write' | 'words' | 'dialogue') || 'sound';
  const initialChar = resolvedParams.char || 'あ';

  return (
    <main className="min-h-screen bg-[#FDFCF7]">
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="w-8 h-8 border-4 border-[#E07A5F] border-t-transparent rounded-full animate-spin" />
          </div>
        }
      >
        <HiraganaStudio initialStep={initialStep} initialChar={initialChar} />
      </Suspense>
    </main>
  );
}
