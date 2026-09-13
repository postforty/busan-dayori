'use client';

import React, { useState } from 'react';
import { Dialect } from '@/types';
import { Volume2, Sparkles, Info } from 'lucide-react';

interface DialectsClientProps {
  initialDialects: Dialect[];
}

export default function DialectsClient({ initialDialects }: DialectsClientProps) {
  const [isPlaying, setIsPlaying] = useState<string | null>(null);

  const handleSpeak = (text: string, id: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ko-KR';
      utterance.rate = 0.9;
      utterance.onstart = () => setIsPlaying(id);
      utterance.onend = () => setIsPlaying(null);
      utterance.onerror = () => setIsPlaying(null);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="px-4 pt-4 space-y-5">
      {/* 인트로 */}
      <section className="bg-[#E8F5E9] rounded-3xl p-5 border border-[#C8E6C9]">
        <div className="flex items-center gap-1.5 text-xs font-bold text-[#2E7D32] mb-1">
          <Sparkles className="w-4 h-4" />
          <span>街や食堂で耳にする言葉</span>
        </div>
        <h1 className="text-lg font-black text-[#2D3748] tracking-tight mb-1.5">
          釜山方言プチノート
        </h1>
        <p className="text-xs text-[#4A5568] leading-relaxed">
          釜山の街を歩いていると、標準語の韓国語テキストには載っていない独特のイントネーションや方言（サトゥリ）を耳にします。知っておくと釜山旅が何倍も楽しくなる表現を集めました！
        </p>
      </section>

      {/* 사투리 카드 목록 */}
      <div className="space-y-4">
        {initialDialects.map((d) => (
          <div
            key={d.id}
            className="bg-white rounded-2xl p-5 border border-[#EDE8E1] card-shadow space-y-3"
          >
            {/* 상단 사투리 & 일본어 뜻 */}
            <div className="flex items-start justify-between gap-2 border-b border-gray-100 pb-2.5">
              <div>
                <span className="text-[10px] text-[#2E7D32] font-bold uppercase tracking-wider block">
                  釜山方言 (サトゥリ)
                </span>
                <h3 className="text-lg font-black text-[#2D3748] tracking-tight mt-0.5">
                  {d.dialect}
                </h3>
              </div>

              <button
                onClick={() => handleSpeak(d.dialect.split('(')[0], d.id)}
                className={`p-2 rounded-xl border text-xs flex items-center gap-1 transition-colors ${
                  isPlaying === d.id
                    ? 'bg-[#2E7D32] text-white border-[#2E7D32]'
                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                }`}
                title="音声を聞く"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            {/* 표준어 & 일본어 대응 */}
            <div className="grid grid-cols-1 gap-1.5 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-gray-400 text-[11px] shrink-0">標準語：</span>
                <span className="font-semibold text-[#2D3748]">{d.standard}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-400 text-[11px] shrink-0">日本語の意味：</span>
                <span className="font-bold text-[#E07A5F]">{d.japanese}</span>
              </div>
            </div>

            {/* 상황 설명 및 예시 대화 */}
            <div className="bg-[#FAF0E6]/50 rounded-xl p-3 text-xs space-y-2 border border-[#F4DDD4]">
              <div className="flex items-start gap-1.5 text-[11px] text-[#8C5243]">
                <Info className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#E07A5F]" />
                <p className="leading-relaxed">{d.situation}</p>
              </div>

              <div className="bg-white/80 p-2.5 rounded-lg border border-[#EDE8E1] text-[11px] text-gray-600 font-medium leading-relaxed">
                {d.example}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
