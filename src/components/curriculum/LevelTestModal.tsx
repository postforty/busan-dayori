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

  // 스와이프 터치 제스처 추적용 Ref
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  // 모달 오픈 시 상태 초기화
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(0);
      setUserAnswers({});
      setIsFinished(false);
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

  // 음성 재생
  const handlePlayAudio = useCallback(
    (text?: string) => {
      if (!text) return;
      setIsPlayingAudio(true);
      speakJapanese(
        text,
        0.9,
        () => setIsPlayingAudio(true),
        () => setIsPlayingAudio(false)
      );
    },
    []
  );

  // 선택지 클릭
  const handleSelectOption = (index: number) => {
    if (isAnswerSubmitted) return;
    setUserAnswers((prev) => ({ ...prev, [currentIndex]: index }));

    const isCorrect = currentQuestion.options[index]?.isCorrect;
    if (isCorrect) {
      playQuizSound('correct');
    } else {
      playQuizSound('wrong');
    }
  };

  // 이전 문제로 이동
  const handlePrevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // 다음 문제로 이동 또는 결과 화면
  const handleNextQuestion = () => {
    if (currentIndex + 1 < totalCount) {
      setCurrentIndex((prev) => prev + 1);
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
    }
  };

  // 스와이프 터치 제스처 핸들러
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
    const deltaY = e.changedTouches[0].clientY - touchStartYRef.current;
    touchStartXRef.current = null;
    touchStartYRef.current = null;

    // 수평 스와이프 감지 (수직 스크롤과 명확히 구분)
    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY) * 1.3) {
      if (deltaX < 0) {
        // 왼쪽으로 스와이프 (다음 문제)
        if (isAnswerSubmitted) {
          handleNextQuestion();
        }
      } else {
        // 오른쪽으로 스와이프 (이전 문제)
        if (currentIndex > 0) {
          handlePrevQuestion();
        }
      }
    }
  };

  // 다시 풀기
  const handleRetry = () => {
    setCurrentIndex(0);
    setUserAnswers({});
    setIsFinished(false);
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
          onTouchEnd={handleTouchEnd}
          className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4 transition-all duration-350 ease-out select-none"
        >
          {!isFinished ? (
            currentQuestion ? (
              <div className="space-y-4 animate-in fade-in duration-150">
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
                        className={`w-full p-3 sm:p-3.5 rounded-2xl text-left transition-all duration-150 flex items-center justify-between gap-3 text-xs sm:text-sm active:scale-[0.99] ${optionStyle}`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span
                            className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-black shrink-0 transition-colors ${badgeStyle}`}
                          >
                            {idx + 1}
                          </span>
                          <span className={isAnswerSubmitted && isSelected && !option.isCorrect ? 'line-through decoration-[#D62828]/60 truncate' : 'truncate'}>
                            {option.text}
                          </span>
                        </div>

                        {/* 피드백 아이콘 (휴리스틱: 텍스트를 제거하고 아이콘 기호만으로 직관적 전달) */}
                        {isAnswerSubmitted && option.isCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-[#E07A5F] shrink-0" />
                        )}
                        {isAnswerSubmitted && isSelected && !option.isCorrect && (
                          <XCircle className="w-4 h-4 text-[#D62828] shrink-0" />
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
