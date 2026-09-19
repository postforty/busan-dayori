'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { DailyLesson } from '@/types';
import DailyLessonCard from '@/components/daily/DailyLessonCard';
import AiGeneratorBar from '@/components/daily/AiGeneratorBar';
import { getLessonByIdFromCurriculum } from '@/lib/curriculum/curriculumData';
import {
  BookOpen,
  Sparkles,
  FolderArchive,
  Compass,
  ArrowRight,
  Baby
} from 'lucide-react';

interface HomeFeedProps {
  initialLessons: DailyLesson[];
}

function HomeFeedInner({ initialLessons }: HomeFeedProps) {
  const searchParams = useSearchParams();
  const queryLessonId = searchParams.get('lessonId');

  // 데일리 학습 상태
  const [currentLesson, setCurrentLesson] = useState<DailyLesson>(() => {
    if (queryLessonId) {
      const fromCurriculum = getLessonByIdFromCurriculum(queryLessonId);
      if (fromCurriculum) return fromCurriculum;
      const fromInitial = initialLessons.find((l) => l.id === queryLessonId);
      if (fromInitial) return fromInitial;
    }

    return (
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
  });

  const [isAiGenerated, setIsAiGenerated] = useState(false);
  const [savedLessons, setSavedLessons] = useState<DailyLesson[]>([]);

  // 쿼리 파라미터 변경 시 레슨 업데이트
  useEffect(() => {
    if (queryLessonId) {
      const fromCurriculum = getLessonByIdFromCurriculum(queryLessonId);
      if (fromCurriculum) {
        setTimeout(() => {
          setCurrentLesson(fromCurriculum);
          setIsAiGenerated(false);
        }, 0);
        return;
      }
      const fromInitial = initialLessons.find((l) => l.id === queryLessonId);
      if (fromInitial) {
        setTimeout(() => {
          setCurrentLesson(fromInitial);
          setIsAiGenerated(false);
        }, 0);
      }
    }
  }, [queryLessonId, initialLessons]);

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
    <div className="px-4 pt-4 pb-20 space-y-6 max-w-xl mx-auto">
      {/* 1. 웰컴 인트로 배너 */}
      <section className="bg-gradient-to-br from-[#FAF0E6] to-[#FFF9F2] rounded-3xl p-5 border border-[#F4DDD4] relative overflow-hidden shadow-xs">
        <div className="relative z-10 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/80 backdrop-blur-sm rounded-full text-[10px] font-bold text-[#E07A5F] border border-[#F4DDD4]">
              <Sparkles className="w-3 h-3 text-[#D97706]" />
              <span>まいにちの日本語ノート</span>
            </div>

            {/* 로드맵 바로가기 버튼 */}
            <Link
              href="/roadmap"
              className="inline-flex items-center gap-1 text-[11px] font-bold text-[#D97706] hover:text-[#B45309] bg-amber-50 hover:bg-amber-100/70 px-2.5 py-1 rounded-full border border-amber-200 transition-colors"
            >
              <Compass className="w-3 h-3" />
              <span>로드맵·커리큘럼</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div>
            <h1 className="text-lg font-black text-[#2D3748] tracking-tight leading-snug mb-1">
              왕초보부터 실전 회화까지,
              <br />
              매일 하나씩 배우는 일본어
            </h1>
            <p className="text-xs text-[#718096] leading-relaxed">
              히라가나를 몰라도 괜찮아요! <strong>Lv.0 유치원생 입문</strong>부터 차근차근 시작해보세요.
            </p>
          </div>

          {/* Lv.0 바로 시작 추천 칩 */}
          <div className="pt-1 flex items-center gap-2 overflow-x-auto no-scrollbar">
            <Link
              href="/?lessonId=lesson-starter-1"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white text-xs font-black text-[#D97706] border border-amber-300 shadow-2xs hover:bg-amber-50 transition-all shrink-0"
            >
              <Baby className="w-3.5 h-3.5 text-amber-600" />
              <span>Lv.0 고마워요! 배우기</span>
            </Link>
            <Link
              href="/?lessonId=lesson-starter-2"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white text-xs font-black text-[#D97706] border border-amber-300 shadow-2xs hover:bg-amber-50 transition-all shrink-0"
            >
              <Baby className="w-3.5 h-3.5 text-amber-600" />
              <span>Lv.0 이거 주세요! 배우기</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. AI 맞춤 일본어 생성기 바 */}
      <AiGeneratorBar onLessonGenerated={handleLessonGenerated} />

      {/* 3. 데일리 일본어 학습 카드 섹션 */}
      <section className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 min-w-0">
            <BookOpen className="w-4 h-4 text-[#E07A5F] shrink-0" />
            <h2 className="text-sm font-bold text-[#2D3748] truncate">
              今日の学習ノート (데일리 레슨)
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
                <span>保存 {idx + 1}</span>
              </button>
            ))}
          </div>
        </div>

        <DailyLessonCard lesson={currentLesson} isAiGenerated={isAiGenerated} />
      </section>
    </div>
  );
}

export default function HomeFeed(props: HomeFeedProps) {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-[#718096]">로딩 중...</div>}>
      <HomeFeedInner {...props} />
    </Suspense>
  );
}
