'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { DailyLesson, CurriculumLevel } from '@/types';
import DailyLessonCard from '@/components/daily/DailyLessonCard';
import LevelTestModal from '@/components/curriculum/LevelTestModal';
import SecretEnvelopeModal from '@/components/curriculum/SecretEnvelopeModal';

/**
 * 일본 정통 참잘했어요(花丸, Hanamaru) 10엽 꽃잎 외곽선 생성 함수
 */
function generateHanamaruPath(cx: number, cy: number, r: number, petals: number, fullness = 1.16): string {
  const angleStep = (Math.PI * 2) / petals;
  const chord = 2 * r * Math.sin(angleStep / 2);
  const arcR = (chord / 2) * fullness;
  let d = '';

  for (let i = 0; i < petals; i++) {
    const offset = -Math.PI / 2;
    const startAngle = offset + i * angleStep;
    const endAngle = offset + (i + 1) * angleStep;

    const x1 = cx + r * Math.cos(startAngle);
    const y1 = cy + r * Math.sin(startAngle);
    const x2 = cx + r * Math.cos(endAngle);
    const y2 = cy + r * Math.sin(endAngle);

    if (i === 0) {
      d += `M ${x1.toFixed(2)} ${y1.toFixed(2)} `;
    }
    d += `A ${arcR.toFixed(2)} ${arcR.toFixed(2)} 0 0 1 ${x2.toFixed(2)} ${y2.toFixed(2)} `;
  }
  return d + 'Z';
}

const HANAMARU_OUTER_PATH = generateHanamaruPath(100, 100, 78, 10, 1.16);
const HANAMARU_INNER_PATH = generateHanamaruPath(100, 100, 67, 10, 1.16);
import {
  getLessonByIdFromCurriculum,
  enrichLessonWithCurriculum,
  getAdjacentCurriculumUnits,
  getCurriculumLevels
} from '@/lib/curriculum/curriculumData';
import { getAllLevelTestResults, isLevelAllUnitsCompleted } from '@/lib/curriculum/levelQuizData';
import {
  BookOpen,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Trophy,
  Sparkles,
  Check,
  CheckCircle2,
  ChevronDown,
  RotateCcw,
  Mail
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


  // ----------------------------------------------------
  // 히라가나 & 가타카나 마스터 상태 관리 (4안: 게이미피케이션 배지)
  // ----------------------------------------------------
  const [kanaStatus, setKanaStatus] = useState<{ hiragana: boolean; katakana: boolean }>({
    hiragana: false,
    katakana: false
  });
  const [isBadgeMenuOpen, setIsBadgeMenuOpen] = useState(false);
  const badgeMenuRef = useRef<HTMLDivElement>(null);

  // 로컬 스토리지에서 가나 마스터 상태 로드 (기존 46자 이상 완료 데이터 있을 시 자동 연동)
  useEffect(() => {
    try {
      const saved = localStorage.getItem('kana_master_status');
      if (saved) {
        const parsed = JSON.parse(saved);
        setTimeout(() => setKanaStatus(parsed), 0);
      } else {
        const katakanaChars = localStorage.getItem('katakana_completed_chars');
        const isKatakanaDone = katakanaChars && JSON.parse(katakanaChars).length >= 46;
        if (isKatakanaDone) {
          setTimeout(() => setKanaStatus((prev) => ({ ...prev, katakana: true })), 0);
        }
      }
    } catch {
      // 무시
    }
  }, []);

  // 팝오버 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (badgeMenuRef.current && !badgeMenuRef.current.contains(e.target as Node)) {
        setIsBadgeMenuOpen(false);
      }
    };
    if (isBadgeMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isBadgeMenuOpen]);

  const updateKanaStatus = (next: Partial<{ hiragana: boolean; katakana: boolean }>) => {
    setKanaStatus((prev) => {
      const updated = { ...prev, ...next };
      try {
        localStorage.setItem('kana_master_status', JSON.stringify(updated));
      } catch {
        // 무시
      }
      return updated;
    });
  };

  const isAllKanaMastered = kanaStatus.hiragana && kanaStatus.katakana;

  // ----------------------------------------------------
  // 회화 레벨 테스트 상태 관리 (Lv.0, Lv.1, Lv.2 마스터 테스트)
  // ----------------------------------------------------
  const [activeTestLevel, setActiveTestLevel] = useState<CurriculumLevel | null>(null);
  const [secretEnvelopeLevel, setSecretEnvelopeLevel] = useState<CurriculumLevel | null>(null);
  const [levelTestResults, setLevelTestResults] = useState<Record<string, { isPassed: boolean; score: number }>>({});

  useEffect(() => {
    try {
      const results = getAllLevelTestResults();
      setTimeout(() => setLevelTestResults(results), 0);
    } catch {
      // 무시
    }

    const handleLevelTestUpdated = () => {
      try {
        const results = getAllLevelTestResults();
        setLevelTestResults(results);
      } catch {
        // 무시
      }
    };

    window.addEventListener('busan-level-test-updated', handleLevelTestUpdated);
    return () => {
      window.removeEventListener('busan-level-test-updated', handleLevelTestUpdated);
    };
  }, []);

  // 인접 로드맵 유닛 계산
  const adjacentInfo = getAdjacentCurriculumUnits(currentLesson.id);

  // 현재 레벨의 모든 유닛 완료 여부 (비밀 편지 해금 조건)
  const [isCurrentLevelCompleted, setIsCurrentLevelCompleted] = useState(false);
  // 학습 완료 스탬프 / 비밀 편지 모달이 화면에 표시되는 동안 우측 하단 플로팅 스탬프 숨김
  const [isLessonRewardModalOpen, setIsLessonRewardModalOpen] = useState(false);

  // 현재 레벨 및 테스트 마스터(합격) 여부
  const currentCurriculumLevel = adjacentInfo.current?.level;
  const isCurrentLevelPassed = Boolean(
    currentCurriculumLevel && levelTestResults[currentCurriculumLevel.level]?.isPassed
  );

  useEffect(() => {
    const checkLevelCompletion = () => {
      if (adjacentInfo.current?.level) {
        const allDone = isLevelAllUnitsCompleted(adjacentInfo.current.level);
        setIsCurrentLevelCompleted(allDone);
      } else {
        setIsCurrentLevelCompleted(false);
      }
    };

    checkLevelCompletion();

    // 유닛 완료 토글 시 실시간 재검사
    window.addEventListener('busan-lesson-completed-changed', checkLevelCompletion);
    return () => {
      window.removeEventListener('busan-lesson-completed-changed', checkLevelCompletion);
    };
  }, [adjacentInfo.current?.level, currentLesson.id]);

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
      {/* 1. 웰컴 인트로 배너 (드롭다운이 가려지지 않도록 overflow-hidden 제거 및 z-index 보장) */}
      <section
        className={`bg-gradient-to-br from-[#FAF0E6] to-[#FFF9F2] rounded-3xl p-4 sm:p-5 border border-[#F4DDD4] relative shadow-xs transition-all ${
          isBadgeMenuOpen ? 'z-30' : 'z-10'
        }`}
      >
        <div className="relative space-y-3">
          {/* 타이틀 및 가나 마스터 완료 엠블럼 배지 */}
          <div className="flex items-start justify-between gap-3">
            <div>
              <h1 className="text-lg sm:text-xl font-black text-[#2D3748] tracking-tight leading-snug">
                부산의 따뜻한 이야기를
                <br />
                <span className="text-[#E07A5F] text-base sm:text-lg">편지에 담기까지</span>
              </h1>
              <p className="text-xs text-[#718096] leading-relaxed mt-1">
                매일 배운 일본어로 부산을 찾는 일본인 친구에게 다정한 편지를 띄웁니다.
              </p>
            </div>

            {/* 마스터 달성 시 노출되는 골드 엠블럼 배지 & 팝오버 */}
            {isAllKanaMastered && (
              <div className="relative shrink-0 z-50" ref={badgeMenuRef}>
                <button
                  type="button"
                  onClick={() => setIsBadgeMenuOpen((prev) => !prev)}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-2xl bg-gradient-to-r from-[#FFFBEB] via-[#FEF3C7] to-[#FDE68A] border border-[#F59E0B]/40 text-[#92400E] text-xs font-black shadow-xs hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer group"
                  title="가나 마스터 완료! 클릭하여 복습 및 설정"
                >
                  <Trophy className="w-3.5 h-3.5 text-[#D97706] group-hover:rotate-12 transition-transform shrink-0" />
                  <span className="flex items-center gap-0.5 tracking-tight font-black text-xs">
                    <span className="text-[#E07A5F]">あ</span>
                    <span className="text-[#D97706]/70 text-[10px]">·</span>
                    <span className="text-[#3D5A80]">ア</span>
                  </span>
                  <ChevronDown
                    className={`w-3 h-3 text-[#B45309] transition-transform duration-200 shrink-0 ${
                      isBadgeMenuOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* 퀵 복습 팝오버 메뉴 (1안: 듀얼 심볼 퀵 런처) */}
                {isBadgeMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-64 max-w-[calc(100vw-2.5rem)] p-2.5 bg-white rounded-2xl shadow-xl border border-[#F4DDD4] z-50 animate-in fade-in zoom-in-95 duration-150 space-y-2">
                    {/* 상단 콤팩트 헤더: 타이틀 + 리셋 아이콘 버튼 */}
                    <div className="flex items-center justify-between px-1 pt-0.5">
                      <div className="flex items-center gap-1.5">
                        <Trophy className="w-3.5 h-3.5 text-[#D97706]" />
                        <span className="text-xs font-black text-[#2D3748] tracking-tight">50音 Mastered</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          updateKanaStatus({ hiragana: false, katakana: false });
                          setIsBadgeMenuOpen(false);
                        }}
                        className="p-1 rounded-lg text-[#A0AEC0] hover:text-[#E07A5F] hover:bg-[#FAF0E6] transition-colors cursor-pointer"
                        title="기초 카드 형태로 다시 펼치기"
                        aria-label="기초 카드 형태로 다시 펼치기"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* 가로 2분할 듀얼 심볼 런처 */}
                    <div className="grid grid-cols-2 gap-1.5 pt-0.5">
                      <Link
                        href="/hiragana"
                        onClick={() => setIsBadgeMenuOpen(false)}
                        className="flex items-center justify-between p-2 rounded-xl bg-[#FFF6F1] hover:bg-[#FCE4D8]/60 border border-[#FCE4D8] transition-all group/h"
                        title="히라가나 학습 바로가기"
                      >
                        <div className="flex items-center gap-1.5 min-w-0">
                          <span className="w-6 h-6 rounded-lg bg-white border border-[#FCE4D8] text-[#E07A5F] font-black flex items-center justify-center text-xs shrink-0 shadow-2xs">
                            あ
                          </span>
                          <span className="text-xs font-black text-[#2D3748] group-hover/h:text-[#E07A5F] transition-colors truncate">
                            히라가나
                          </span>
                        </div>
                        <ArrowRight className="w-3 h-3 text-[#E07A5F] group-hover/h:translate-x-0.5 transition-transform shrink-0" />
                      </Link>

                      <Link
                        href="/katakana"
                        onClick={() => setIsBadgeMenuOpen(false)}
                        className="flex items-center justify-between p-2 rounded-xl bg-[#F0F7FF] hover:bg-[#C5D9F2]/60 border border-[#C5D9F2] transition-all group/k"
                        title="가타카나 학습 바로가기"
                      >
                        <div className="flex items-center gap-1.5 min-w-0">
                          <span className="w-6 h-6 rounded-lg bg-white border border-[#C5D9F2] text-[#3D5A80] font-black flex items-center justify-center text-xs shrink-0 shadow-2xs">
                            ア
                          </span>
                          <span className="text-xs font-black text-[#2D3748] group-hover/k:text-[#3D5A80] transition-colors truncate">
                            가타카나
                          </span>
                        </div>
                        <ArrowRight className="w-3 h-3 text-[#3D5A80] group-hover/k:translate-x-0.5 transition-transform shrink-0" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 문자 학습 CTA (히라가나 & 가타카나) - 둘 다 마스터 완료 시 숨김 */}
          {!isAllKanaMastered && (
            <div className="pt-0.5 animate-in fade-in duration-300">
              <div className="grid grid-cols-2 gap-2">
                {/* 히라가나 카드 (Warm Coral 테마) */}
                <div
                  className={`flex items-center justify-between p-2 sm:p-2.5 rounded-2xl border transition-all ${
                    kanaStatus.hiragana
                      ? 'bg-[#FFF6F1] border-[#FCE4D8]'
                      : 'bg-white border-[#F4DDD4] hover:border-[#E07A5F] shadow-2xs hover:shadow-xs'
                  }`}
                >
                  <Link
                    href="/hiragana"
                    className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-1 py-0.5 group"
                    title="히라가나 마스터 학습하러 가기"
                  >
                    <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-white border border-[#FCE4D8] text-[#E07A5F] font-black flex items-center justify-center text-xs shrink-0 shadow-2xs">
                      あ
                    </span>
                    <span className="text-xs font-black text-[#2D3748] group-hover:text-[#E07A5F] transition-colors truncate">
                      히라가나
                    </span>
                  </Link>

                  {/* 히라가나 원형 완료 체크 토글 (Warm Coral: #E07A5F) */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      updateKanaStatus({ hiragana: !kanaStatus.hiragana });
                    }}
                    className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all shrink-0 cursor-pointer ${
                      kanaStatus.hiragana
                        ? 'bg-[#E07A5F] border-[#E07A5F] text-white shadow-2xs scale-105'
                        : 'bg-white border-[#F4DDD4] text-transparent hover:border-[#E07A5F] hover:text-[#E07A5F]/40'
                    }`}
                    title={kanaStatus.hiragana ? '완료 취소' : '학습 완료 체크'}
                    aria-label={kanaStatus.hiragana ? '히라가나 완료 취소' : '히라가나 완료 체크'}
                  >
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </button>
                </div>

                {/* 가타카나 카드 (Slate Navy 테마) */}
                <div
                  className={`flex items-center justify-between p-2 sm:p-2.5 rounded-2xl border transition-all ${
                    kanaStatus.katakana
                      ? 'bg-[#F0F7FF] border-[#C5D9F2]'
                      : 'bg-white border-[#D0E1F9] hover:border-[#3D5A80] shadow-2xs hover:shadow-xs'
                  }`}
                >
                  <Link
                    href="/katakana"
                    className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-1 py-0.5 group"
                    title="가타카나 마스터 학습하러 가기"
                  >
                    <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-white border border-[#C5D9F2] text-[#3D5A80] font-black flex items-center justify-center text-xs shrink-0 shadow-2xs">
                      ア
                    </span>
                    <span className="text-xs font-black text-[#2D3748] group-hover:text-[#3D5A80] transition-colors truncate">
                      가타카나
                    </span>
                  </Link>

                  {/* 가타카나 원형 완료 체크 토글 (Slate Navy: #3D5A80) */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      updateKanaStatus({ katakana: !kanaStatus.katakana });
                    }}
                    className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all shrink-0 cursor-pointer ${
                      kanaStatus.katakana
                        ? 'bg-[#3D5A80] border-[#3D5A80] text-white shadow-2xs scale-105'
                        : 'bg-white border-[#C5D9F2] text-transparent hover:border-[#3D5A80] hover:text-[#3D5A80]/40'
                    }`}
                    title={kanaStatus.katakana ? '완료 취소' : '학습 완료 체크'}
                    aria-label={kanaStatus.katakana ? '가타카나 완료 취소' : '가타카나 완료 체크'}
                  >
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 2. 데일리 일본어 학습 카드 섹션 */}
      <section className="space-y-3">
        {/* 섹션 헤더: 로드맵 연동 및 타이틀 (노골적인 테스트 버튼 배제) */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 min-w-0">
            <BookOpen className="w-4 h-4 text-[#E07A5F] shrink-0" />
            <h2 className="text-sm font-bold text-[#2D3748] truncate">
              今日のレッスン (오늘의 레슨)
            </h2>
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

        <DailyLessonCard
          key={currentLesson.id}
          lesson={currentLesson}
          isAiGenerated={isAiGenerated}
          onRewardModalChange={setIsLessonRewardModalOpen}
        />

        </section>

      {/* 회화 레벨 테스트 플로팅 버튼 (완주한 레벨에서는 시험 합격 후에도 상시 노출되어 복습 및 재도전 가능) */}
      {isCurrentLevelCompleted &&
        !isLessonRewardModalOpen &&
        !secretEnvelopeLevel &&
        !activeTestLevel &&
        currentCurriculumLevel && (
        <button
          type="button"
          onClick={() => setSecretEnvelopeLevel(currentCurriculumLevel)}
          className="fixed bottom-20 right-4 sm:right-6 z-40 group cursor-pointer select-none transition-all duration-300 hover:scale-110 active:scale-95 animate-in fade-in zoom-in-75 duration-300"
          aria-label={isCurrentLevelPassed ? '회화 마스터 수료증 및 복습 편지 열기' : '회화 마스터 퀘스트 편지 열기'}
          title={isCurrentLevelPassed ? '마스터 완료! (터치하여 언제든 복습 및 재시험)' : '비밀 편지 열기'}
        >
          <div className="relative w-16 h-16 sm:w-[70px] sm:h-[70px] drop-shadow-[0_8px_20px_rgba(214,40,40,0.45)] -rotate-8 transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105 group-active:scale-95">
            {/* 이미 마스터한 레벨인 경우 우상단에 축하 왕관 배지 부착 */}
            {isCurrentLevelPassed && (
              <div
                className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 border-2 border-white shadow-md flex items-center justify-center text-[11px] z-10"
                title="마스터 완료! (터치하여 복습)"
              >
                👑
              </div>
            )}
            <svg
              className="w-full h-full filter"
              viewBox="0 0 200 200"
              aria-hidden="true"
            >
              <path
                d={HANAMARU_OUTER_PATH}
                fill="#FFF9F7"
                fillOpacity="0.98"
              />
              <path
                d={HANAMARU_OUTER_PATH}
                fill="none"
                stroke="#D62828"
                strokeWidth="4.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d={HANAMARU_INNER_PATH}
                fill="none"
                stroke="#D62828"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeOpacity="0.85"
              />
              <text
                x="100"
                y="74"
                textAnchor="middle"
                fontWeight="900"
                fontSize="16"
                fill="#D62828"
                letterSpacing="2"
              >
                たいへん
              </text>
              <text
                x="100"
                y="108"
                textAnchor="middle"
                fontWeight="900"
                fontSize="20"
                fill="#D62828"
                letterSpacing="1.2"
              >
                よくできました
              </text>
              <path
                d="M 52 119 L 148 119"
                stroke="#D62828"
                strokeWidth="1.2"
                strokeDasharray="2 2"
                strokeOpacity="0.65"
              />
              <text
                x="100"
                y="134"
                textAnchor="middle"
                fontWeight="700"
                fontSize="10"
                fill="#D62828"
                letterSpacing="1.5"
                opacity="0.9"
              >
                ★ 釜山だより ★
              </text>
            </svg>
            <div
              className={`absolute -inset-1 rounded-full pointer-events-none ${
                isCurrentLevelPassed ? 'bg-amber-400/20' : 'bg-[#D62828]/15 animate-ping'
              }`}
            />
          </div>
        </button>
      )}

      {/* 레벨 완주 시 동봉된 비밀 편지 봉투 모달 */}
      {secretEnvelopeLevel && (
        <SecretEnvelopeModal
          isOpen={!!secretEnvelopeLevel}
          level={secretEnvelopeLevel}
          onClose={() => setSecretEnvelopeLevel(null)}
          onOpenTest={() => {
            const lvl = secretEnvelopeLevel;
            setSecretEnvelopeLevel(null);
            setActiveTestLevel(lvl);
          }}
        />
      )}

      {activeTestLevel && (
        <LevelTestModal
          isOpen={!!activeTestLevel}
          level={activeTestLevel}
          onClose={() => setActiveTestLevel(null)}
          onPassSuccess={() => {
            const results = getAllLevelTestResults();
            setLevelTestResults(results);
          }}
          onNavigateToNextLevel={() => {
            const allLevels = getCurriculumLevels();
            const currIdx = allLevels.findIndex((l) => l.level === activeTestLevel.level);
            if (currIdx >= 0 && currIdx < allLevels.length - 1) {
              const nextLvl = allLevels[currIdx + 1];
              if (nextLvl.units.length > 0) {
                handleGoToAdjacent(nextLvl.units[0].lessonId);
              }
            }
          }}
        />
      )}
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
