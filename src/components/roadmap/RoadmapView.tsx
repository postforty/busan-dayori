'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { CurriculumLevel, DailyLesson } from '@/types';
import {
  Sparkles,
  Bookmark
} from 'lucide-react';
import AiGeneratorBar from '@/components/daily/AiGeneratorBar';
import DailyLessonCard from '@/components/daily/DailyLessonCard';

interface RoadmapViewProps {
  levels?: CurriculumLevel[];
  initialDbLessons?: DailyLesson[];
}

export default function RoadmapView({ initialDbLessons = [] }: RoadmapViewProps) {
  // 최근 생성된 1개의 AI 레슨 상태
  const [currentAiLesson, setCurrentAiLesson] = useState<DailyLesson | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [savedCount, setSavedCount] = useState<number>(0);

  // 보관함(saved_lessons) 상태 동기화
  const syncSavedState = useCallback(() => {
    try {
      const saved = localStorage.getItem('saved_lessons');
      if (saved) {
        const list: DailyLesson[] = JSON.parse(saved);
        setSavedCount(list.length);
      } else {
        setSavedCount(0);
      }
    } catch {
      // 무시
    }
  }, []);

  // 1. 초기 로드: 최근 생성된 레슨 1개 복원 (없으면 초기 DB 레슨 첫 번째 활용)
  useEffect(() => {
    try {
      const savedLatest = localStorage.getItem('latest_ai_lesson');
      let targetLesson: DailyLesson | null = null;

      if (savedLatest) {
        targetLesson = JSON.parse(savedLatest);
      } else if (initialDbLessons.length > 0) {
        targetLesson = initialDbLessons[0];
      }

      if (targetLesson) {
        setCurrentAiLesson(targetLesson);
      }
      syncSavedState();
    } catch {
      if (initialDbLessons.length > 0) {
        setCurrentAiLesson(initialDbLessons[0]);
      }
    } finally {
      setIsLoaded(true);
    }
  }, [initialDbLessons, syncSavedState]);

  // 보관함 로컬 스토리지 변경 감지
  useEffect(() => {
    const handleStorageChange = () => {
      syncSavedState();
    };

    window.addEventListener('storage', handleStorageChange);
    const interval = setInterval(handleStorageChange, 2500);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [syncSavedState]);

  // 2. 새 레슨 생성 시: 오직 최신 1개로 교체 (미북마크된 이전 레슨은 자연 휘발)
  const handleLessonGenerated = (newLesson: DailyLesson) => {
    setCurrentAiLesson(newLesson);

    try {
      localStorage.setItem('latest_ai_lesson', JSON.stringify(newLesson));
    } catch {
      // 무시
    }

    syncSavedState();
  };

  return (
    <div className="px-4 pt-3 pb-24 space-y-4 max-w-xl mx-auto">
      {/* 1. 상단 웰컴 AI 챌린지 카드 (홈 화면 시그니처 웜톤 스타일) */}
      <section className="bg-gradient-to-br from-[#FAF0E6] to-[#FFF9F2] rounded-3xl p-5 border border-[#F4DDD4] relative overflow-hidden shadow-xs">
        <div className="relative z-10 space-y-3">
          {/* 상단 헤더: 북마크 퀵 링크만 필요 시 우측에 깔끔히 노출 */}
          {savedCount > 0 && (
            <div className="flex justify-end">
              <Link
                href="/voca?tab=lessons"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/80 backdrop-blur-sm border border-[#F4DDD4] text-[11px] font-bold text-[#E07A5F] hover:bg-white transition-all shadow-2xs shrink-0"
                title="북마크한 레슨 모아보기"
              >
                <Bookmark className="w-3 h-3 text-[#E07A5F]" />
                <span>북마크 ({savedCount})</span>
              </Link>
            </div>
          )}

          {/* 2단 감성 볼드 타이틀 */}
          <div>
            <h1 className="text-xl font-black text-[#2D3748] tracking-tight leading-snug">
              내가 전하고 싶은 순간을
              <br />
              <span className="text-[#E07A5F] text-lg">자연스러운 일본어로</span>
            </h1>
          </div>

          {/* AI 생성 바 및 퀵 추천 칩 */}
          <AiGeneratorBar onLessonGenerated={handleLessonGenerated} />
        </div>
      </section>

      {/* 2. 최근 생성된 1개 레슨 집중 카드 */}
      <section>
        {!isLoaded ? (
          <div className="p-8 text-center bg-white rounded-3xl border border-[#EDE8E1] text-xs text-[#718096]">
            맞춤 레슨을 불러오는 중입니다...
          </div>
        ) : currentAiLesson ? (
          <DailyLessonCard
            key={currentAiLesson.id}
            lesson={currentAiLesson}
            isAiGenerated={true}
            hideAiBadge={true}
          />
        ) : (
          <div className="p-8 text-center bg-white rounded-3xl border border-[#EDE8E1] space-y-2.5">
            <Sparkles className="w-7 h-7 text-[#E07A5F] mx-auto opacity-70" />
            <h3 className="text-sm font-bold text-[#2D3748]">
              아직 생성된 맞춤 레슨이 없습니다
            </h3>
            <p className="text-xs text-[#718096] leading-relaxed max-w-sm mx-auto">
              위의 생성 바에서 관심 있는 부산 상황을 입력해 첫 번째 맞춤 레슨을 만들어보세요.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
