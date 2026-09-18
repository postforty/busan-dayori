'use client';

import React, { useState, useEffect } from 'react';
import { DailyLesson } from '@/types';
import DailyLessonCard from '@/components/daily/DailyLessonCard';
import AiGeneratorBar from '@/components/daily/AiGeneratorBar';
import {
  BookOpen,
  Sparkles,
  FolderArchive
} from 'lucide-react';

interface HomeFeedProps {
  initialLessons: DailyLesson[];
}

export default function HomeFeed({ initialLessons }: HomeFeedProps) {
  // 데일리 학습 상태
  const [currentLesson, setCurrentLesson] = useState<DailyLesson>(
    initialLessons[0] || {
      id: 'default',
      dayNumber: 1,
      seriesTitle: '기본 레슨',
      themeTitle: '일본어 기본 표현',
      keyExpression: { japanese: '', reading: '', korean: '' },
      dialogue: [],
      grammar: { title: '', structure: '', explanation: '' },
      vocabulary: [],
      nuanceTip: ''
    }
  );
  const [isAiGenerated, setIsAiGenerated] = useState(false);
  const [savedLessons, setSavedLessons] = useState<DailyLesson[]>([]);

  // 로컬 스토리지에서 보관된 레슨 로드
  useEffect(() => {
    try {
      const saved = localStorage.getItem('saved_lessons');
      if (saved) {
        const parsed = JSON.parse(saved);
        setTimeout(() => setSavedLessons(parsed), 0);
      }
    } catch {
      // 무시
    }
  }, []);

  // AI 생성 결과 수신
  const handleLessonGenerated = (lesson: DailyLesson, isAi: boolean) => {
    setCurrentLesson(lesson);
    setIsAiGenerated(isAi);
  };

  return (
    <div className="px-4 pt-4 space-y-6">
      {/* 1. 웰컴 인트로 배너 */}
      <section className="bg-gradient-to-br from-[#FAF0E6] to-[#FFF9F2] rounded-3xl p-5 border border-[#F4DDD4] relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/80 backdrop-blur-sm rounded-full text-[10px] font-bold text-[#E07A5F] mb-2.5 border border-[#F4DDD4]">
            <Sparkles className="w-3 h-3 text-[#D97706]" />
            <span>부산 토박이의 데일리 일본어 학습 & 로컬 편지</span>
          </div>

          <h1 className="text-lg font-black text-[#2D3748] tracking-tight leading-snug mb-1.5">
            釜山在住の私が届ける、<br />
            まいにちの日本語ノート
          </h1>
          <p className="text-xs text-[#718096] leading-relaxed">
            매일 실전 일본어 표현을 익히고, 부산의 숨은 로컬 이야기 속에서 자연스러운 일본어 문장을 확인해보세요.
          </p>
        </div>
      </section>

      {/* 2. AI 맞춤 일본어 생성기 바 */}
      <AiGeneratorBar onLessonGenerated={handleLessonGenerated} />

      {/* 3. 데일리 일본어 학습 카드 섹션 */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-[#E07A5F]" />
            <h2 className="text-sm font-bold text-[#2D3748]">
              오늘의 일본어 레슨
            </h2>
          </div>

          {/* 기본 프리셋 레슨 및 보관함 레슨 선택 칩 */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
            {initialLessons.map((lesson) => (
              <button
                key={lesson.id}
                onClick={() => {
                  setCurrentLesson(lesson);
                  setIsAiGenerated(false);
                }}
                className={`px-2 py-1 rounded-lg text-[10px] font-bold whitespace-nowrap transition-all ${
                  currentLesson.id === lesson.id && !isAiGenerated
                    ? 'bg-[#2D3748] text-white'
                    : 'bg-white text-gray-400 border border-[#EDE8E1] hover:bg-gray-50'
                }`}
              >
                Day {lesson.dayNumber}
              </button>
            ))}

            {savedLessons.map((lesson, idx) => (
              <button
                key={lesson.id}
                onClick={() => {
                  setCurrentLesson(lesson);
                  setIsAiGenerated(true);
                }}
                className={`px-2 py-1 rounded-lg text-[10px] font-bold whitespace-nowrap transition-all flex items-center gap-1 ${
                  currentLesson.id === lesson.id
                    ? 'bg-[#E07A5F] text-white'
                    : 'bg-[#FAF0E6] text-[#E07A5F] border border-[#F4DDD4] hover:bg-[#F4DDD4]'
                }`}
                title={lesson.themeTitle}
              >
                <FolderArchive className="w-2.5 h-2.5" />
                <span>보관 {idx + 1}</span>
              </button>
            ))}
          </div>
        </div>

        <DailyLessonCard lesson={currentLesson} isAiGenerated={isAiGenerated} />
      </section>
    </div>
  );
}
