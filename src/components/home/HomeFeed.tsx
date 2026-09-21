'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { DailyLesson } from '@/types';
import DailyLessonCard from '@/components/daily/DailyLessonCard';
import AiGeneratorBar from '@/components/daily/AiGeneratorBar';
import {
  getLessonByIdFromCurriculum,
  enrichLessonWithCurriculum,
  getAdjacentCurriculumUnits
} from '@/lib/curriculum/curriculumData';
import {
  BookOpen,
  Sparkles,
  FolderArchive,
  Compass,
  ArrowRight,
  Baby,
  Pencil,
  ChevronLeft,
  ChevronRight
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
      if (fromInitial) return enrichLessonWithCurriculum(fromInitial);
    }

    const firstLesson = initialLessons[0]
      ? enrichLessonWithCurriculum(initialLessons[0])
      : getLessonByIdFromCurriculum('lesson-starter-1') || {
          id: 'default',
          dayNumber: 1,
          seriesTitle: '기본 레슨',
          themeTitle: '일본어 기본 표현',
          keyExpression: { japanese: '', reading: '', korean: '' },
          dialogue: [],
          grammar: { title: '', structure: '', explanation: '' },
          vocabulary: [],
          nuanceTip: ''
        };

    return firstLesson;
  });

  const [isAiGenerated, setIsAiGenerated] = useState(false);
  const [savedLessons, setSavedLessons] = useState<DailyLesson[]>([]);

  // 레슨 선택 및 진도 기억
  const selectLesson = (lesson: DailyLesson, isAi: boolean = false) => {
    const enriched = enrichLessonWithCurriculum(lesson);
    setCurrentLesson(enriched);
    setIsAiGenerated(isAi);
    if (!isAi) {
      try {
        localStorage.setItem('last_studied_lesson_id', enriched.id);
      } catch {
        // 무시
      }
    }
  };

  // 마지막 학습 진도 복원 (쿼리 파라미터가 없을 때)
  useEffect(() => {
    if (!queryLessonId) {
      try {
        const lastLessonId = localStorage.getItem('last_studied_lesson_id');
        if (lastLessonId) {
          const fromCurriculum = getLessonByIdFromCurriculum(lastLessonId);
          if (fromCurriculum) {
            setTimeout(() => {
              setCurrentLesson(fromCurriculum);
              setIsAiGenerated(false);
            }, 0);
            return;
          }
          const fromInitial = initialLessons.find((l) => l.id === lastLessonId);
          if (fromInitial) {
            setTimeout(() => {
              setCurrentLesson(enrichLessonWithCurriculum(fromInitial));
              setIsAiGenerated(false);
            }, 0);
          }
        }
      } catch {
        // 무시
      }
    }
  }, [queryLessonId, initialLessons]);

  // 쿼리 파라미터 변경 시 레슨 업데이트
  useEffect(() => {
    if (queryLessonId) {
      const fromCurriculum = getLessonByIdFromCurriculum(queryLessonId);
      if (fromCurriculum) {
        setTimeout(() => {
          selectLesson(fromCurriculum, false);
        }, 0);
        return;
      }
      const fromInitial = initialLessons.find((l) => l.id === queryLessonId);
      if (fromInitial) {
        setTimeout(() => {
          selectLesson(fromInitial, false);
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

  // 인접 로드맵 유닛 계산
  const adjacentInfo = getAdjacentCurriculumUnits(currentLesson.id);

  const handleGoToAdjacent = (targetLessonId: string) => {
    const fromCurriculum = getLessonByIdFromCurriculum(targetLessonId);
    if (fromCurriculum) {
      selectLesson(fromCurriculum, false);
      return;
    }
    const fromInitial = initialLessons.find((l) => l.id === targetLessonId);
    if (fromInitial) {
      selectLesson(fromInitial, false);
    }
  };

  return (
    <div className="px-4 pt-4 pb-20 space-y-6 max-w-xl mx-auto">
      {/* 1. 웰컴 인트로 배너 */}
      <section className="bg-gradient-to-br from-[#FAF0E6] to-[#FFF9F2] rounded-3xl p-5 border border-[#F4DDD4] relative overflow-hidden shadow-xs">
        <div className="relative z-10 space-y-3">


          {/* 상단 챌린지 배지 ([그림1]과 동일한 스타일 패턴) */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/80 backdrop-blur-sm rounded-full text-[11px] font-bold text-[#E07A5F] border border-[#F4DDD4]">
            <Sparkles className="w-3.5 h-3.5 text-[#E07A5F]" />
            <span>매일 한 걸음 일본어 챌린지</span>
          </div>

          <div>
            <h1 className="text-xl font-black text-[#2D3748] tracking-tight leading-snug mb-2">
              부산의 따뜻한 이야기를
              <br />
              <span className="text-[#E07A5F] text-lg">편지에 담기까지</span>
            </h1>
            <p className="text-xs text-[#718096] leading-relaxed">
              히라가나 한 글자부터 차곡차곡 일기 쓰듯 도전해요. 정성껏 배운 일본어로 부산을 찾는 일본인 친구에게 다정한 편지를 띄웁니다.
            </p>
          </div>

          {/* 히라가나 스튜디오 단일 메인 CTA (제안 A) */}
          <div className="pt-1">
            <Link
              href="/hiragana"
              className="flex items-center justify-between gap-2 w-full p-3 rounded-2xl bg-white border border-[#F4DDD4] hover:border-[#E07A5F] shadow-2xs hover:shadow-xs transition-all group"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-xl bg-[#FFF6F1] border border-[#FCE4D8] flex items-center justify-center shrink-0">
                  <Pencil className="w-4 h-4 text-[#E07A5F]" />
                </div>
                <div className="text-left min-w-0">
                  <div className="text-xs font-black text-[#2D3748] group-hover:text-[#E07A5F] transition-colors flex items-center gap-1.5 flex-wrap">
                    <span>히라가나 캔버스 스튜디오</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#FFF6F1] text-[#E07A5F] font-bold border border-[#FCE4D8]">
                      Lv.0 입문
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-0.5 text-xs font-bold text-[#E07A5F] shrink-0">
                <span>시작하기</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. AI 맞춤 일본어 생성기 바 */}
      <AiGeneratorBar onLessonGenerated={handleLessonGenerated} />

      {/* 3. 데일리 일본어 학습 카드 섹션 */}
      <section className="space-y-3">
        {/* 섹션 헤더: 로드맵 연동 및 타이틀 */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 min-w-0">
            <BookOpen className="w-4 h-4 text-[#E07A5F] shrink-0" />
            <h2 className="text-sm font-bold text-[#2D3748] truncate">
              今日の学習ノート (오늘의 챌린지 일기)
            </h2>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {/* AI 보관함 레슨이 있는 경우에만 선택 칩 제공 */}
            {savedLessons.length > 0 && (
              <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5 max-w-[120px]">
                {savedLessons.map((lesson, idx) => (
                  <button
                    key={lesson.id}
                    onClick={() => {
                      setCurrentLesson(lesson);
                      setIsAiGenerated(true);
                    }}
                    className={`px-2 py-1 rounded-lg text-[10px] font-bold whitespace-nowrap transition-all flex items-center gap-1 ${
                      currentLesson.id === lesson.id && isAiGenerated
                        ? 'bg-[#E07A5F] text-white'
                        : 'bg-[#FAF0E6] text-[#E07A5F] border border-[#F4DDD4]'
                    }`}
                    title={lesson.themeTitle}
                  >
                    <FolderArchive className="w-2.5 h-2.5" />
                    <span>저장 {idx + 1}</span>
                  </button>
                ))}
              </div>
            )}

            {/* 전체 로드맵 바로가기 버튼 */}
            <Link
              href="/roadmap"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-white text-[#E07A5F] border border-[#F4DDD4] text-[11px] font-bold hover:bg-[#FAF0E6] transition-colors shadow-2xs"
            >
              <Compass className="w-3 h-3 text-[#E07A5F]" />
              <span>전체 로드맵</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* 로드맵 진도 네비게이션 컨트롤 */}
        <div className="flex items-center justify-between px-3 py-2 bg-gradient-to-r from-[#FAF0E6]/80 to-[#FFF9F2]/80 rounded-2xl border border-[#F4DDD4]">
          <button
            type="button"
            disabled={!adjacentInfo.prev}
            onClick={() => adjacentInfo.prev && handleGoToAdjacent(adjacentInfo.prev.unit.lessonId)}
            className={`flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-xl transition-all ${
              adjacentInfo.prev
                ? 'bg-white text-[#E07A5F] border border-[#F4DDD4] shadow-2xs hover:bg-[#FFF6F1] active:scale-95'
                : 'text-gray-300 border border-transparent cursor-not-allowed'
            }`}
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">이전 유닛</span>
          </button>

          {/* 현재 유닛 단계 및 위치 표시 */}
          <div className="flex items-center gap-1.5 text-center">
            {adjacentInfo.current ? (
              <div className="flex items-center gap-1.5">
                <span
                  className="px-2 py-0.5 rounded-full text-[10px] font-black text-white shadow-2xs"
                  style={{ backgroundColor: adjacentInfo.current.level.color }}
                >
                  {adjacentInfo.current.level.badge}
                </span>
                <span className="text-xs font-black text-[#2D3748]">
                  Unit {adjacentInfo.current.unit.unitNumber}
                </span>
                <span className="text-[10px] text-[#718096] font-medium hidden xs:inline">
                  ({adjacentInfo.currentIndex}/{adjacentInfo.totalUnits})
                </span>
              </div>
            ) : (
              <span className="text-xs font-bold text-[#2D3748]">
                {currentLesson.unitTitle || currentLesson.themeTitle}
              </span>
            )}
          </div>

          <button
            type="button"
            disabled={!adjacentInfo.next}
            onClick={() => adjacentInfo.next && handleGoToAdjacent(adjacentInfo.next.unit.lessonId)}
            className={`flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-xl transition-all ${
              adjacentInfo.next
                ? 'bg-white text-[#E07A5F] border border-[#F4DDD4] shadow-2xs hover:bg-[#FFF6F1] active:scale-95'
                : 'text-gray-300 border border-transparent cursor-not-allowed'
            }`}
          >
            <span className="hidden sm:inline">다음 유닛</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
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
