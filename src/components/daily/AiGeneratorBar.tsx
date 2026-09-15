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
    { label: '식당 세부 주문', icon: Utensils, query: '식당에서 양념이나 재료를 빼달라고 요청할 때' },
    { label: '호텔 룸 요청', icon: Building, query: '호텔 체크인할 때 높은 층 전망 좋은 방으로 요청하기' },
    { label: '길 묻기 및 방향', icon: Compass, query: '지하철역이나 특정 장소로 가는 길을 정중히 물어볼 때' },
    { label: '자연스러운 리액션', icon: MessageSquare, query: '친구와의 대화에서 공감하거나 놀랄 때 쓰는 자연스러운 감탄사' },
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
        setErrorMessage(data.error || '레슨 생성에 실패했습니다.');
      }
    } catch {
      setErrorMessage('네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-5 border border-[#EDE8E1] card-shadow space-y-3.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#FAF0E6] flex items-center justify-center text-[#E07A5F]">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-[#2D3748]">
              AI 맞춤 일본어 생성
            </h3>
            <p className="text-[10px] text-gray-400">
              배우고 싶은 상황을 입력하면 즉석에서 학습 카드를 만듭니다
            </p>
          </div>
        </div>
      </div>

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
          placeholder="예: 이자카야에서 점원에게 추천 술 물어보기..."
          disabled={isLoading}
          className="w-full pl-3.5 pr-24 py-2.5 bg-[#FBF9F5] border border-[#EDE8E1] rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-[#E07A5F]/20 focus:border-[#E07A5F] disabled:opacity-50"
        />

        <button
          type="submit"
          disabled={isLoading || !topic.trim()}
          className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3.5 py-1.5 bg-[#E07A5F] hover:bg-[#D0694E] disabled:bg-gray-300 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 shadow-sm"
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
        <p className="text-[11px] text-amber-700 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200">
          {errorMessage}
        </p>
      )}

      {/* 퀵 추천 칩 */}
      <div className="space-y-1.5">
        <span className="text-[10px] font-semibold text-gray-400 block">
          자주 찾는 추천 상황:
        </span>
        <div className="flex flex-wrap gap-1.5">
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
                className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-[#FBF9F5] hover:bg-[#FAF0E6] text-[#4A5568] hover:text-[#E07A5F] rounded-xl text-[11px] border border-[#EDE8E1] transition-colors disabled:opacity-50"
              >
                <Icon className="w-3 h-3 text-gray-500" />
                <span>{preset.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
