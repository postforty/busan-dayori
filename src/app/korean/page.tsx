import React, { Suspense } from 'react';
import { getPhrases, getDialects } from '@/lib/supabase/queries';
import KoreanHubView from '@/components/korean/KoreanHubView';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: '韓国語・ハングル学習ハブ | 釜山だより',
  description:
    '釜山旅行者のための韓国語＆ハングル学習ハブ。ハングルの組み合わせの仕組み、街の看板・メニュー解読クイズ、食堂で使える指差し会話カード、釜山方言まで完全ナビゲート！'
};

export default async function KoreanPage() {
  const [phrases, dialects] = await Promise.all([
    getPhrases(),
    getDialects()
  ]);

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="w-8 h-8 border-4 border-[#E07A5F] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <KoreanHubView initialPhrases={phrases} initialDialects={dialects} />
    </Suspense>
  );
}
