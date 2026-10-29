'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { CurriculumLevel, LevelQuizQuestion } from '@/types';
import { LEVEL_QUIZ_DATA, saveLevelTestResult } from '@/lib/curriculum/levelQuizData';
import { speakJapanese, stopJapaneseSpeech } from '@/utils/tts';
import { isSoundEnabled } from '@/utils/soundManager';
import {
  X,
  Volume2,
  CheckCircle2,
  XCircle,
  Trophy,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Check,
  ChevronRight,
  ChevronLeft,
  HelpCircle,
  Award
} from 'lucide-react';

interface LevelTestModalProps {
  isOpen: boolean;
  onClose: () => void;
  level: CurriculumLevel;
  onPassSuccess?: () => void;
  onNavigateToNextLevel?: () => void;
}

/**
 * Web Audio API를 활용한 가벼운 퀴즈 인터랙션 사운드
 */
function playQuizSound(type: 'correct' | 'wrong' | 'fanfare') {
  if (!isSoundEnabled()) return;
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();

    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    const now = ctx.currentTime;

    if (type === 'correct') {
      // 딩-동 2화음 (E5 -> A5)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(659.25, now);
      gain1.gain.setValueAtTime(0.18, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.25);

      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(880, now + 0.1);
      gain2.gain.setValueAtTime(0.001, now);
      gain2.gain.setValueAtTime(0.22, now + 0.1);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.1);
      osc2.stop(now + 0.55);
    } else if (type === 'wrong') {
      // 툭- (부드러운 저음 비프)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.linearRampToValueAtTime(130, now + 0.18);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.22);
    } else if (type === 'fanfare') {
      // 팡파르 3음 화음 (C5 -> E5 -> G5 -> C6)
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const start = now + idx * 0.1;
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.001, start);
        gain.gain.setValueAtTime(0.2, start + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, start + (idx === 3 ? 0.7 : 0.25));
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(start);
        osc.stop(start + (idx === 3 ? 0.75 : 0.3));
      });
    }
  } catch {
    // 오디오 지원 안 되는 환경 조용히 패스
  }
}

export default function LevelTestModal({
  isOpen,
  onClose,
  level,
  onPassSuccess,
  onNavigateToNextLevel
}: LevelTestModalProps) {
  const questions: LevelQuizQuestion[] = LEVEL_QUIZ_DATA[level.level] || [];
  const totalCount = questions.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  // 문항별 사용자 선택 답변 저장 (문항 인덱스 -> 선택한 옵션 인덱스)
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [isFinished, setIsFinished] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // 스와이프 인터랙션 및 방향성 슬라이드 전환 상태 (옵션 A)
  const [dragOffset, setDragOffset] = useState<number>(0);
  const [slidePhase, setSlidePhase] = useState<'idle' | 'exiting' | 'entering'>('idle');
  const [slideDir, setSlideDir] = useState<'none' | 'left' | 'right'>('none');
  const isDraggingRef = useRef<boolean>(false);
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const gestureLockRef = useRef<'horizontal' | 'vertical' | null>(null);

  // 모달 오픈 시 상태 초기화
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(0);
      setUserAnswers({});
      setIsFinished(false);
      setDragOffset(0);
      setSlidePhase('idle');
      setSlideDir('none');
      stopJapaneseSpeech();
    }
  }, [isOpen, level.level]);

  // 문제 변경 시 음성 정지
  useEffect(() => {
    stopJapaneseSpeech();
    setIsPlayingAudio(false);
  }, [currentIndex]);

  const currentQuestion = questions[currentIndex];
  const selectedOptionIndex = userAnswers[currentIndex] ?? null;
  const isAnswerSubmitted = selectedOptionIndex !== null;

  // 점수 계산 (사용자가 맞힌 문항 수 합산)
  const score = Object.entries(userAnswers).filter(
    ([qIdx, optIdx]) => questions[+qIdx]?.options[optIdx]?.isCorrect
  ).length;

  // 음성 재생 (슬라이딩 중에는 오디오 재생 차단)
  const handlePlayAudio = useCallback(
    (text?: string) => {
      if (!text || slidePhase !== 'idle') return;
      setIsPlayingAudio(true);
      speakJapanese(
        text,
        0.9,
        () => setIsPlayingAudio(true),
        () => setIsPlayingAudio(false)
      );
    },
    [slidePhase]
  );

  // 선택지 클릭 (스와이프 드래그 중이거나 슬라이딩 전환 중 터치 오작동 방지)
  const handleSelectOption = (index: number) => {
    if (isAnswerSubmitted || slidePhase !== 'idle' || Math.abs(dragOffset) > 10) return;
    setUserAnswers((prev) => ({ ...prev, [currentIndex]: index }));

    const isCorrect = currentQuestion.options[index]?.isCorrect;
    if (isCorrect) {
      playQuizSound('correct');
    } else {
      playQuizSound('wrong');
    }
  };

  // 이전 문제로 이동 (부드러운 오른쪽 슬라이드 아웃 & 인 애니메이션)
  const handlePrevQuestion = useCallback(() => {
    if (currentIndex <= 0 || slidePhase !== 'idle') return;
    setSlideDir('right');
    setSlidePhase('exiting');

    setTimeout(() => {
      setCurrentIndex((prev) => prev - 1);
      setDragOffset(0);
      setSlidePhase('entering');
      setTimeout(() => {
        setSlidePhase('idle');
        setSlideDir('none');
      }, 30);
    }, 180);
  }, [currentIndex, slidePhase]);

  // 다음 문제로 이동 또는 결과 화면 (부드러운 왼쪽 슬라이드 아웃 & 인 애니메이션)
  const handleNextQuestion = useCallback(() => {
    if (slidePhase !== 'idle') return;

    if (currentIndex + 1 < totalCount) {
      setSlideDir('left');
      setSlidePhase('exiting');

      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
        setDragOffset(0);
        setSlidePhase('entering');
        setTimeout(() => {
          setSlidePhase('idle');
          setSlideDir('none');
        }, 30);
      }, 180);
    } else {
      // 퀴즈 종료 및 결과 저장
      const isPassed = score >= Math.ceil(totalCount * 0.8);

      saveLevelTestResult({
        level: level.level,
        score,
        total: totalCount,
        isPassed,
        completedAt: new Date().toISOString()
      });

      if (isPassed) {
        playQuizSound('fanfare');
        onPassSuccess?.();
      }

      setIsFinished(true);
      setDragOffset(0);
      setSlidePhase('idle');
      setSlideDir('none');
    }
  }, [currentIndex, totalCount, score, level.level, onPassSuccess, slidePhase]);

  // 실시간 터치 드래그 & 스와이프 제스처 핸들러 (옵션 A)
  const handleTouchStart = (e: React.TouchEvent) => {
    if (slidePhase !== 'idle' || isFinished) return;
    const touch = e.touches[0];
    touchStartXRef.current = touch.clientX;
    touchStartYRef.current = touch.clientY;
    gestureLockRef.current = null;
    isDraggingRef.current = true;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current || touchStartXRef.current === null || touchStartYRef.current === null) return;
    const touch = e.touches[0];
    const diffX = touch.clientX - touchStartXRef.current;
    const diffY = touch.clientY - touchStartYRef.current;

    // 제스처 방향 감지 (최소 6px 이동 후 수평 스와이프 vs 수직 스크롤 잠금 판정)
    if (!gestureLockRef.current) {
      if (Math.abs(diffX) > 6 || Math.abs(diffY) > 6) {
        if (Math.abs(diffX) > Math.abs(diffY)) {
          gestureLockRef.current = 'horizontal';
        } else {
          gestureLockRef.current = 'vertical';
          return;
        }
      } else {
        return;
      }
    }

    if (gestureLockRef.current === 'vertical') {
      return;
    }

    // 러버밴딩 탄성 저항 계산
    let effectiveOffset = diffX;

    if (diffX < 0) {
      // 왼쪽으로 드래그 (다음 문제)
      if (!isAnswerSubmitted) {
        // 아직 답을 제출하지 않았을 때 강한 저항 (최대 -32px)
        effectiveOffset = -Math.min(32, Math.pow(Math.abs(diffX), 0.62));
      }
    } else if (diffX > 0) {
      // 오른쪽으로 드래그 (이전 문제)
      if (currentIndex === 0) {
        // 첫 문제에서는 강한 저항 (최대 32px)
        effectiveOffset = Math.min(32, Math.pow(diffX, 0.62));
      }
    }

    setDragOffset(effectiveOffset);
  };

  const handleTouchEnd = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    const finalDrag = dragOffset;
    touchStartXRef.current = null;
    touchStartYRef.current = null;
    gestureLockRef.current = null;

    const threshold = 55;

    if (finalDrag < -threshold && isAnswerSubmitted) {
      // 다음 문제로 슬라이드 전환
      handleNextQuestion();
    } else if (finalDrag > threshold && currentIndex > 0) {
      // 이전 문제로 슬라이드 전환
      handlePrevQuestion();
    } else {
      // 제자리로 부드러운 스냅 복귀
      setDragOffset(0);
    }
  };

  const handleTouchCancel = () => {
    isDraggingRef.current = false;
    touchStartXRef.current = null;
    touchStartYRef.current = null;
    gestureLockRef.current = null;
    setDragOffset(0);
  };

  // 문제 카드에 적용할 GPU 가속 인라인 스타일 계산
  const getCardTransformStyle = (): React.CSSProperties => {
    if (slidePhase === 'exiting') {
      const exitTranslate = slideDir === 'left' ? '-108%' : '108%';
      return {
        transform: `translate3d(${exitTranslate}, 0, 0)`,
        opacity: 0,
        transition: 'transform 0.18s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.18s ease'
      };
    }

    if (slidePhase === 'entering') {
      const enterTranslate = slideDir === 'left' ? '36px' : '-36px';
      return {
        transform: `translate3d(${enterTranslate}, 0, 0)`,
        opacity: 0,
        transition: 'none'
      };
    }

    // 터치 실시간 드래그 중
    if (isDraggingRef.current) {
      return {
        transform: `translate3d(${dragOffset}px, 0, 0) rotate(${dragOffset * 0.015}deg)`,
        opacity: 1 - Math.min(Math.abs(dragOffset) / 450, 0.3),
        transition: 'none'
      };
    }

    // 기본 대기 상태 및 스냅백
    return {
      transform: 'translate3d(0, 0, 0) rotate(0deg)',
      opacity: 1,
      transition:
        dragOffset !== 0
          ? 'transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.2s ease'
          : 'transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.22s ease'
    };
  };

  // 다시 풀기
  const handleRetry = () => {
    setCurrentIndex(0);
    setUserAnswers({});
    setIsFinished(false);
    setDragOffset(0);
    setSlidePhase('idle');
    setSlideDir('none');
  };

  if (!isOpen) return null;

  const isPassed = score >= Math.ceil(totalCount * 0.8);
  const passRate = totalCount > 0 ? Math.round((score / totalCount) * 100) : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-[#EDE8E1] overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-150 transition-all duration-350 ease-out"
        role="dialog"
        aria-modal="true"
      >
        {/* 모달 상단 헤더 */}
        <div
          className="px-5 py-4 border-b flex items-center justify-between shrink-0"
          style={{ backgroundColor: level.bgLight, borderColor: level.borderColor }}
        >
          <div className="flex items-center gap-2">
            <span
              className="px-2.5 py-0.5 rounded-full text-[11px] font-black text-white shadow-2xs"
              style={{ backgroundColor: level.color }}
            >
              {level.badge}
            </span>
            <span className="text-xs font-black text-[#2D3748]">
              회화 마스터 테스트
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-black/5 transition-colors"
            title="닫기"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 퀴즈 진행 바 */}
        {!isFinished && (
          <div className="w-full bg-[#EDE8E1] h-1.5">
            <div
              className="h-full transition-all duration-300 rounded-r-full"
              style={{
                width: `${((currentIndex + (isAnswerSubmitted ? 1 : 0)) / totalCount) * 100}%`,
                backgroundColor: level.color
              }}
            />
          </div>
        )}

        {/* 모달 바디: 테스트 진행 중 vs 결과 화면 (좌우 터치 스와이프 제스처 지원) */}
        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchCancel}
          className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4 transition-all duration-350 ease-out select-none touch-pan-y relative overflow-x-hidden"
        >
          {!isFinished ? (
            currentQuestion ? (
              <div
                style={getCardTransformStyle()}
                className="space-y-4 will-change-transform"
              >
                {/* 문항 번호 & 상황 태그 */}
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#718096]">
                    문제 {currentIndex + 1} / {totalCount}
                  </span>
                  <span
                    className="px-2.5 py-0.5 rounded-full font-bold text-[10px]"
                    style={{ backgroundColor: level.bgLight, color: level.color }}
                  >
                    🏷️ {currentQuestion.situationTag}
                  </span>
                </div>

                {/* 부산 여행 시나리오 카드 */}
                <div className="bg-[#FAF7F2] rounded-2xl p-4 border border-[#EFEAE2] space-y-2.5">
                  <p className="text-xs sm:text-sm text-[#2D3748] leading-relaxed font-medium">
                    {currentQuestion.scenario}
                  </p>

                  {/* 상대방 일본어 음성 듣기 박스 (있는 경우) */}
                  {currentQuestion.speakerAudioText && (
                    <div className="flex items-center justify-between gap-3 bg-white p-2.5 rounded-xl border border-[#E2D8CC]/80">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#E07A5F]">
                          {currentQuestion.speakerAudioLabel || currentQuestion.speakerAudioText}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handlePlayAudio(currentQuestion.speakerAudioText)}
                        className={`p-1.5 rounded-lg border shrink-0 transition-colors cursor-pointer ${
                          isPlayingAudio
                            ? 'bg-[#FAF0E6] text-[#E07A5F] border-[#E07A5F]'
                            : 'bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100 hover:text-[#E07A5F]'
                        }`}
                        title="발음 듣기"
                        aria-label="발음 듣기"
                      >
                        <Volume2 className="w-3.5 h-3.5 shrink-0" />
                      </button>
                    </div>
                  )}
                </div>

                {/* 4지선다형 선택지 목록 */}
                <div className="space-y-2 pt-1">
                  {currentQuestion.options.map((option, idx) => {
                    const isSelected = selectedOptionIndex === idx;
                    let optionStyle =
                      'bg-white border border-[#EDE8E1] text-[#2D3748] hover:border-[#E07A5F] hover:bg-[#FFF9F5] shadow-2xs font-bold';
                    let badgeStyle = 'bg-[#FAF0E6] text-[#718096]';

                    if (isAnswerSubmitted) {
                      if (option.isCorrect) {
                        // 정답: 브랜드 시그니처 코랄 (선명한 차콜 텍스트와 웜 틴트 배경)
                        optionStyle =
                          'bg-[#FAF0E6] border-2 border-[#E07A5F] text-[#2D3748] font-black shadow-xs';
                        badgeStyle = 'bg-[#E07A5F] text-white';
                      } else if (isSelected && !option.isCorrect) {
                        // 내가 고른 오답: 정통 스탬프 인주 레드 (#D62828) 톤 적용
                        optionStyle =
                          'bg-[#FFF5F5] border-2 border-[#D62828] text-[#D62828] font-bold shadow-xs';
                        badgeStyle = 'bg-[#D62828] text-white';
                      } else {
                        // 미선택 기타 보기: 웜 캔버스 슬레이트 페이퍼
                        optionStyle = 'bg-[#FBF9F5] border border-[#EDE8E1] text-[#A0AEC0] opacity-50 font-medium';
                        badgeStyle = 'bg-[#EDE8E1] text-[#A0AEC0]';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        type="button"
                        disabled={isAnswerSubmitted}
                        onClick={() => handleSelectOption(idx)}
                        className={`w-full p-3 sm:p-3.5 rounded-2xl text-left transition-all duration-150 flex items-start justify-between gap-3 text-xs sm:text-sm active:scale-[0.99] ${optionStyle}`}
                      >
                        <div className="flex items-start gap-2.5 min-w-0 flex-1">
                          <span
                            className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-black shrink-0 transition-colors mt-0.5 ${badgeStyle}`}
                          >
                            {idx + 1}
                          </span>
                          <span
                            className={`break-words leading-snug flex-1 ${
                              isAnswerSubmitted && isSelected && !option.isCorrect
                                ? 'line-through decoration-[#D62828]/60'
                                : ''
                            }`}
                          >
                            {option.text}
                          </span>
                        </div>

                        {/* 피드백 아이콘 (휴리스틱: 텍스트를 제거하고 아이콘 기호만으로 직관적 전달) */}
                        {isAnswerSubmitted && option.isCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-[#E07A5F] shrink-0 mt-0.5" />
                        )}
                        {isAnswerSubmitted && isSelected && !option.isCorrect && (
                          <XCircle className="w-4 h-4 text-[#D62828] shrink-0 mt-0.5" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* 정답 제출 시 해설 및 뉘앙스 팁 (스르륵 자연스럽게 늘어나는 아코디언 확장 애니메이션) */}
                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-350 ease-out ${
                    isAnswerSubmitted
                      ? 'grid-rows-[1fr] opacity-100'
                      : 'grid-rows-[0fr] opacity-0 pointer-events-none'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="pt-2.5">
                      <div className="p-3.5 rounded-2xl bg-[#FFF9F2] border border-[#F4DDD4] space-y-2 shadow-2xs">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-[#E07A5F]">
                          <Sparkles className="w-3.5 h-3.5 shrink-0" />
                          <span>
                            {selectedOptionIndex !== null &&
                            currentQuestion.options[selectedOptionIndex]?.isCorrect
                              ? '정답입니다!'
                              : '아쉬워요! 핵심 해설'}
                          </span>
                        </div>

                        <p className="text-xs text-[#4A5568] leading-relaxed">
                          {selectedOptionIndex !== null &&
                            currentQuestion.options[selectedOptionIndex]?.explanation}
                        </p>

                        {currentQuestion.tip && (
                          <div className="text-[11px] text-[#718096] pt-1 border-t border-[#F4DDD4]/60">
                            {currentQuestion.tip}
                          </div>
                        )}

                        {/* 옵션 1: 정답 제출 시 해설 하단 인라인 버튼 (다음 문제로 / 결과 확인하기) */}
                        {isAnswerSubmitted && (
                          <div className="pt-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
                            <button
                              type="button"
                              onClick={handleNextQuestion}
                              className="w-full py-3 rounded-2xl font-bold text-xs sm:text-sm bg-[#E07A5F] hover:bg-[#C45B40] text-white flex items-center justify-center gap-2 shadow-md shadow-[#E07A5F]/20 active:scale-[0.99] transition-all cursor-pointer"
                            >
                              <span>
                                {currentIndex + 1 === totalCount
                                  ? '테스트 결과 확인하기'
                                  : '다음 문제로'}
                              </span>
                              {currentIndex + 1 === totalCount ? (
                                <Award className="w-4 h-4" />
                              ) : (
                                <ChevronRight className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center text-xs text-gray-400">
                퀴즈 문항을 불러올 수 없습니다.
              </div>
            )
          ) : (
            /* 결과 화면 */
            <div className="py-4 text-center space-y-5 animate-in zoom-in-95 duration-200">
              {/* 상단 엠블럼 아이콘 */}
              <div className="relative inline-block mx-auto">
                {isPassed ? (
                  <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#FEF3C7] to-[#FDE68A] border-4 border-[#F59E0B] flex items-center justify-center shadow-lg animate-bounce">
                    <Trophy className="w-10 h-10 text-[#D97706]" />
                  </div>
                ) : (
                  <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-gray-100 to-gray-200 border-4 border-gray-300 flex items-center justify-center shadow-md">
                    <Award className="w-10 h-10 text-gray-500" />
                  </div>
                )}
              </div>

              {/* 결과 텍스트 */}
              <div className="space-y-1.5">
                <span
                  className="px-2.5 py-0.5 rounded-full text-xs font-black text-white"
                  style={{ backgroundColor: level.color }}
                >
                  {level.badge} 마스터 테스트
                </span>
                <h3 className="text-xl font-black text-[#2D3748] pt-1">
                  {isPassed ? '축하합니다! 완벽히 마스터하셨어요 🎉' : '조금만 더 복습해볼까요? 💪'}
                </h3>
                <p className="text-xs text-[#718096] max-w-sm mx-auto leading-relaxed">
                  {isPassed
                    ? `부산 여행지에서 일본인 친구나 점원을 만나도 당당하게 소통할 수 있는 실력을 입증하셨습니다!`
                    : `80점 이상 획득 시 마스터 배지가 수여됩니다. 틀린 표현을 복습하고 언제든 다시 도전하세요!`}
                </p>
              </div>

              {/* 점수 요약 박스 */}
              <div className="inline-flex items-center gap-6 px-6 py-3 bg-[#FAF7F2] rounded-2xl border border-[#EDE8E1]">
                <div>
                  <div className="text-[10px] text-[#718096] font-bold">정답 개수</div>
                  <div className="text-lg font-black text-[#2D3748]">
                    {score} <span className="text-xs font-normal text-gray-400">/ {totalCount}</span>
                  </div>
                </div>
                <div className="w-px h-8 bg-gray-200" />
                <div>
                  <div className="text-[10px] text-[#718096] font-bold">정답률</div>
                  <div
                    className="text-lg font-black"
                    style={{ color: isPassed ? '#E07A5F' : '#718096' }}
                  >
                    {passRate}%
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 모달 푸터: 퀴즈 진행 중에는 푸터 바를 완전히 제거하여 높이 최적화, 최종 결과 화면에서만 액션 푸터 렌더링 */}
        {isFinished && (
          <div className="p-4 bg-[#FBF9F5] border-t border-[#EDE8E1] flex items-center justify-end gap-2 shrink-0">
            {isPassed ? (
              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={handleRetry}
                  className="px-4 py-2.5 rounded-xl border border-[#EDE8E1] text-[#718096] font-bold text-xs hover:bg-[#FAF0E6]/60 transition-all flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>다시 풀기</span>
                </button>

                {onNavigateToNextLevel ? (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onNavigateToNextLevel();
                    }}
                    className="px-5 py-2.5 rounded-xl font-bold text-xs bg-[#E07A5F] hover:bg-[#C45B40] text-white transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
                  >
                    <span>다음 레벨 둘러보기</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-2.5 rounded-xl font-bold text-xs bg-[#2D3748] hover:bg-[#1A202C] text-white transition-all shadow-sm active:scale-95"
                  >
                    학습 완료
                  </button>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl border border-[#EDE8E1] text-[#718096] font-bold text-xs hover:bg-[#FAF0E6]/60 transition-all"
                >
                  닫기
                </button>
                <button
                  type="button"
                  onClick={handleRetry}
                  className="px-5 py-2.5 rounded-xl font-bold text-xs bg-[#E07A5F] hover:bg-[#C45B40] text-white transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>다시 도전하기</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
