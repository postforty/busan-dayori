'use client';

import React, { useState } from 'react';
import { DailyLesson } from '@/types';
import {
  Sparkles,
  Search,
  Loader2,
  Utensils,
  Building,
  Compass,
  MessageSquare
} from 'lucide-react';

interface AiGeneratorBarProps {
  onLessonGenerated: (lesson: DailyLesson, isAi: boolean) => void;
}

export default function AiGeneratorBar({ onLessonGenerated }: AiGeneratorBarProps) {
  const [topic, setTopic] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const quickPresets = [
    { label: '釜山グルメのおすすめ', icon: Utensils, query: '日本の友達に釜山のローカルグルメやおすすめメニューを紹介するとき' },
    { label: '辛さの気遣い・注文', icon: MessageSquare, query: '日本の友達に韓国料理が辛くないか聞いて配慮するとき' },
    { label: '釜山の道案内', icon: Compass, query: '釜山に遊びに来た日本の友達に地下鉄や名所への行き方を案内するとき' },
    { label: '友達へのリアクション', icon: Sparkles, query: '日本の友達と親しく話すときに使う自然な相槌や感嘆表現' },
  ];

  const handleGenerate = async (queryText?: string) => {
    const targetTopic = (queryText || topic).trim();
    if (!targetTopic) return;

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/generate-lesson', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: targetTopic }),
      });

      const data = await response.json();

      if (data.lesson) {
        onLessonGenerated(data.lesson, !data.isFallback);
        if (data.isFallback && data.message) {
          setErrorMessage(data.message);
        }
      } else {
        setErrorMessage(data.error || 'レ슨 생성에 실패했습니다.');
      }
    } catch {
      setErrorMessage('ネットワークエラーが発生しました。もう一度お試しください。');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-2.5">
      {/* 검색 및 입력 폼 */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleGenerate();
        }}
        className="relative flex items-center"
      >
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="例：テジクッパの食べ方を説明したい、釜山方言を教えたい..."
          disabled={isLoading}
          className="w-full pl-3.5 pr-24 py-2.5 bg-white border border-[#F4DDD4] rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-[#E07A5F]/20 focus:border-[#E07A5F] disabled:opacity-50 shadow-2xs placeholder:text-gray-400 text-[#2D3748]"
        />

        <button
          type="submit"
          disabled={isLoading || !topic.trim()}
          className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3.5 py-1.5 bg-[#E07A5F] hover:bg-[#D0694E] disabled:bg-gray-300 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 shadow-2xs"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>생성 중</span>
            </>
          ) : (
            <>
              <Search className="w-3.5 h-3.5" />
              <span>생성</span>
            </>
          )}
        </button>
      </form>

      {/* 에러/알림 메시지 */}
      {errorMessage && (
        <p className="text-[11px] text-amber-800 bg-amber-50/90 px-3 py-1.5 rounded-xl border border-amber-200">
          {errorMessage}
        </p>
      )}

      {/* 퀵 추천 칩 */}
      <div className="flex flex-wrap gap-1.5 pt-0.5">
        {quickPresets.map((preset, idx) => {
          const Icon = preset.icon;
          return (
            <button
              key={idx}
              onClick={() => {
                setTopic(preset.query);
                handleGenerate(preset.query);
              }}
              disabled={isLoading}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-white/80 hover:bg-white text-[#4A5568] hover:text-[#E07A5F] rounded-xl text-[11px] font-medium border border-[#F4DDD4] transition-all shadow-2xs active:scale-95 disabled:opacity-50"
            >
              <Icon className="w-3 h-3 text-[#E07A5F]/80" />
              <span>{preset.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
