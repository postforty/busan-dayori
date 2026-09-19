'use client';

import React, { useState } from 'react';
import { Phrase } from '@/types';
import {
  Volume2,
  Maximize2,
  X,
  Sparkles,
  Utensils,
  Flame,
  CreditCard,
  Car,
  ShoppingBag,
  Info
} from 'lucide-react';

interface PhrasesClientProps {
  initialPhrases: Phrase[];
}

export default function PhrasesClient({ initialPhrases }: PhrasesClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [fullscreenPhrase, setFullscreenPhrase] = useState<Phrase | null>(null);
  const [isPlaying, setIsPlaying] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'すべて', icon: Sparkles },
    { id: 'order', label: '注文', icon: Utensils },
    { id: 'spicy', label: '辛さ調整', icon: Flame },
    { id: 'pay', label: '会計', icon: CreditCard },
    { id: 'taxi', label: 'タクシー', icon: Car },
    { id: 'convenience', label: 'マート・その他', icon: ShoppingBag }
  ];

  const filteredPhrases = selectedCategory === 'all'
    ? initialPhrases
    : initialPhrases.filter((p) => p.category === selectedCategory);

  // 한국어 음성 읽어주기 (Web Speech API)
  const handleSpeak = (koreanText: string, id: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(koreanText);
      utterance.lang = 'ko-KR';
      utterance.rate = 0.9;

      utterance.onstart = () => setIsPlaying(id);
      utterance.onend = () => setIsPlaying(null);
      utterance.onerror = () => setIsPlaying(null);

      window.speechSynthesis.speak(utterance);
    } else {
      alert('お使いのブラウザは音声読み上げに対応していません。');
    }
  };

  return (
    <div className="px-4 pt-4 space-y-5">
      {/* 헤더 인트로 */}
      <section className="bg-[#FAF0E6] rounded-3xl p-5 border border-[#F4DDD4]">
        <div className="flex items-center gap-1.5 text-xs font-bold text-[#E07A5F] mb-1">
          <Sparkles className="w-4 h-4" />
          <span>旅行者向けサポート</span>
        </div>
        <h1 className="text-lg font-black text-[#2D3748] tracking-tight mb-1.5">
          指差し韓国語会話カード
        </h1>
        <p className="text-xs text-[#718096] leading-relaxed">
          食堂やカフェで店員さんにスマホ画面を見せるだけで通じる便利なフレーズ集です。拡大ボタンを押すと全画面表示になります。
        </p>
      </section>

      {/* 카테고리 필터 탭 */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-[#E07A5F] text-white shadow-sm'
                  : 'bg-white text-gray-600 border border-[#EDE8E1] hover:bg-gray-50'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* 회화 카드 그리드 */}
      <div className="grid grid-cols-1 gap-3">
        {filteredPhrases.map((phrase) => (
          <div
            key={phrase.id}
            className="bg-white rounded-2xl p-4 border border-[#EDE8E1] card-shadow space-y-3 relative group"
          >
            {/* 일본어 뜻 */}
            <div className="flex items-start justify-between gap-2 border-b border-gray-100 pb-2">
              <span className="text-xs font-bold text-gray-500">
                {phrase.japanese}
              </span>
              <button
                onClick={() => setFullscreenPhrase(phrase)}
                className="text-gray-400 hover:text-[#E07A5F] p-1 rounded-lg hover:bg-gray-50 transition-colors"
                title="画面を大きく見せる"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>

            {/* 한국어 크게 표시 */}
            <div className="py-1">
              <h3 className="text-lg font-black text-[#2D3748] tracking-tight mb-1">
                {phrase.korean}
              </h3>
              <p className="text-xs font-medium text-[#E07A5F]">
                {phrase.pronunciation}
              </p>
            </div>

            {/* 팁 및 소리듣기 */}
            <div className="flex items-center justify-between pt-1 text-[11px] text-gray-500">
              {phrase.tip ? (
                <div className="flex items-center gap-1 text-[10px] text-gray-400">
                  <Info className="w-3 h-3 text-gray-400 shrink-0" />
                  <span className="truncate max-w-[200px]">{phrase.tip}</span>
                </div>
              ) : <div />}

              <button
                onClick={() => handleSpeak(phrase.korean, phrase.id)}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg border text-xs font-bold transition-all ${
                  isPlaying === phrase.id
                    ? 'bg-[#E07A5F] text-white border-[#E07A5F]'
                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                }`}
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>発音を聞く</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 전체화면 모달 (점원에게 화면 보여주기용) */}
      {fullscreenPhrase && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col justify-between p-6 animate-in fade-in">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#E07A5F] bg-[#FAF0E6] px-3 py-1 rounded-full">
              店員さんに見せてください
            </span>
            <button
              onClick={() => setFullscreenPhrase(null)}
              className="p-2 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="text-center space-y-4 my-auto">
            <p className="text-sm font-semibold text-gray-400">
              {fullscreenPhrase.japanese}
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-[#2D3748] tracking-tight leading-tight">
              {fullscreenPhrase.korean}
            </h2>
            <p className="text-base font-bold text-[#E07A5F]">
              {fullscreenPhrase.pronunciation}
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => handleSpeak(fullscreenPhrase.korean, fullscreenPhrase.id)}
              className="w-full py-3 bg-[#E07A5F] text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-md shadow-[#E07A5F]/20 active:scale-98 transition-all"
            >
              <Volume2 className="w-5 h-5" />
              <span>音声で読み上げる</span>
            </button>
            <button
              onClick={() => setFullscreenPhrase(null)}
              className="w-full py-3 bg-gray-100 text-gray-600 font-bold rounded-2xl"
            >
              閉じる
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
