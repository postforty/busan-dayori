'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Phrase, Dialect } from '@/types';
import HangulMasterStudio from './HangulMasterStudio';
import PhrasesClient from '@/components/phrases/PhrasesClient';
import DialectsClient from '@/components/dialects/DialectsClient';
import { Sparkles, Languages, MessageSquareText, Compass, BookOpen } from 'lucide-react';

interface KoreanHubViewProps {
  initialPhrases: Phrase[];
  initialDialects: Dialect[];
}

export default function KoreanHubView({
  initialPhrases,
  initialDialects
}: KoreanHubViewProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tabParam = searchParams.get('tab');

  const [activeTab, setActiveTab] = useState<'hangul' | 'phrases' | 'dialects'>(() => {
    if (tabParam === 'phrases' || tabParam === 'dialects') {
      return tabParam;
    }
    return 'hangul';
  });

  useEffect(() => {
    if (tabParam === 'phrases' || tabParam === 'dialects' || tabParam === 'hangul') {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  const handleTabChange = (tab: 'hangul' | 'phrases' | 'dialects') => {
    setActiveTab(tab);
    const url = new URL(window.location.href);
    url.searchParams.set('tab', tab);
    router.replace(url.pathname + url.search);
  };

  return (
    <div className="px-4 py-4 space-y-5 max-w-xl mx-auto">
      {/* 최상단 소개 히어로 배너 */}
      <section className="bg-gradient-to-br from-[#FAF0E6] via-[#FDF8F3] to-[#F4F1EA] rounded-3xl p-5 border border-[#EDE8E1] shadow-2xs relative overflow-hidden">
        <div className="absolute top-2 right-2 w-24 h-24 bg-[#E07A5F]/10 rounded-full blur-xl pointer-events-none" />

        <div className="flex items-center gap-1.5 text-xs font-bold text-[#E07A5F] mb-1">
          <Sparkles className="w-4 h-4 fill-current" />
          <span>旅行者のための韓国語ナビ</span>
        </div>

        <h1 className="text-xl font-black text-[#2D3748] tracking-tight mb-2 flex items-center gap-2">
          <span>韓国語・ハングル学習ハブ</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-[#E07A5F] text-white font-bold">
            NEW
          </span>
        </h1>

        <p className="text-xs text-[#718096] leading-relaxed">
          釜山旅行が何倍も楽しくなる！看板・メニューの読み方から、食堂で画面を見せるだけの指差し会話、現地で耳にする釜山方言までまるごとマスターしましょう。
        </p>
      </section>

      {/* 3대 핵심 서브 탭 스위처 */}
      <div className="grid grid-cols-3 gap-1.5 bg-[#EDE8E1]/60 p-1.5 rounded-2xl border border-[#EDE8E1]">
        <button
          onClick={() => handleTabChange('hangul')}
          className={`py-2.5 px-2 rounded-xl text-xs font-bold transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 ${
            activeTab === 'hangul'
              ? 'bg-white text-[#E07A5F] shadow-sm'
              : 'text-[#718096] hover:text-[#2D3748]'
          }`}
        >
          <Languages className="w-4 h-4" />
          <span>ハングル読み</span>
        </button>

        <button
          onClick={() => handleTabChange('phrases')}
          className={`py-2.5 px-2 rounded-xl text-xs font-bold transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 ${
            activeTab === 'phrases'
              ? 'bg-white text-[#E07A5F] shadow-sm'
              : 'text-[#718096] hover:text-[#2D3748]'
          }`}
        >
          <MessageSquareText className="w-4 h-4" />
          <span>指差し会話</span>
        </button>

        <button
          onClick={() => handleTabChange('dialects')}
          className={`py-2.5 px-2 rounded-xl text-xs font-bold transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 ${
            activeTab === 'dialects'
              ? 'bg-white text-[#E07A5F] shadow-sm'
              : 'text-[#718096] hover:text-[#2D3748]'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>釜山方言</span>
        </button>
      </div>

      {/* 탭 콘텐츠 영역 */}
      <div>
        {activeTab === 'hangul' && (
          <div className="animate-in fade-in duration-200">
            <HangulMasterStudio />
          </div>
        )}

        {activeTab === 'phrases' && (
          <div className="-mx-4 -mt-4 animate-in fade-in duration-200">
            <PhrasesClient initialPhrases={initialPhrases} />
          </div>
        )}

        {activeTab === 'dialects' && (
          <div className="-mx-4 -mt-4 animate-in fade-in duration-200">
            <DialectsClient initialDialects={initialDialects} />
          </div>
        )}
      </div>
    </div>
  );
}
