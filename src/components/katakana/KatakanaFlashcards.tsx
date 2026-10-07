'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  KATAKANA_GRID,
  KATAKANA_DAKUON_GRID,
  KATAKANA_YOUON_GRID,
  KATAKANA_SPECIAL_GRID,
  ALL_KATAKANA_SEION_CHARS,
  ALL_KATAKANA_DAKUON_CHARS,
  ALL_KATAKANA_YOUON_CHARS,
  ALL_KATAKANA_SPECIAL_CHARS,
  ALL_KATAKANA_CHARS,
  CONFUSING_KATAKANA_PAIRS,
  KatakanaChar,
  playKatakanaAudio
} from '@/lib/curriculum/katakanaData';
import {
  Volume2,
  RotateCcw,
  Shuffle,
  Sparkles,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  Type,
  Layers,
  ArrowRight
} from 'lucide-react';
import HiraganaMnemonicSvg from '@/components/hiragana/HiraganaMnemonicSvg';
import { MNEMONIC_DATA } from '@/components/hiragana/mnemonics/types';

// 도플갱어 (헷갈리는 글자) 추출
const CONFUSING_CHAR_SET = new Set<string>();
CONFUSING_KATAKANA_PAIRS.forEach((pair) => {
  CONFUSING_CHAR_SET.add(pair.char1.char);
  CONFUSING_CHAR_SET.add(pair.char2.char);
  if (pair.char3) CONFUSING_CHAR_SET.add(pair.char3.char);
});

const CONFUSING_CHARS = ALL_KATAKANA_CHARS.filter((c) =>
  CONFUSING_CHAR_SET.has(c.char)
);

export type KatakanaFilterCategory =
  | 'all'
  | 'seion'
  | 'dakuon'
  | 'youon'
  | 'special'
  | 'confusing'
  | 'wrong';

interface KatakanaFlashcardsProps {
  onCompleteToNextStep?: () => void;
  fontStyle?: 'sans' | 'serif';
  onToggleFontStyle?: () => void;
  category?: 'seion' | 'dakuon' | 'youon' | 'special';
}

export default function KatakanaFlashcards({
  onCompleteToNextStep,
  fontStyle: propFontStyle,
  onToggleFontStyle,
  category = 'seion'
}: KatakanaFlashcardsProps) {
  const storageKey =
    category === 'special'
      ? 'katakana_flashcards_progress_special'
      : category === 'youon'
      ? 'katakana_flashcards_progress_youon'
      : category === 'dakuon'
      ? 'katakana_flashcards_progress_dakuon'
      : 'katakana_flashcards_progress_seion';

  // 필터 및 초기 덱 구성
  const defaultFilter: KatakanaFilterCategory = category;
  const [filterType, setFilterType] = useState<KatakanaFilterCategory>(defaultFilter);
  const [autoSpeech, setAutoSpeech] = useState(true);

  // 글꼴 상태
  const [localFontStyle, setLocalFontStyle] = useState<'sans' | 'serif'>('sans');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('katakana_font_style');
      if (saved === 'sans' || saved === 'serif') {
        setLocalFontStyle(saved);
      }
    } catch {
      // 무시
    }
  }, []);

  const currentFontStyle = propFontStyle !== undefined ? propFontStyle : localFontStyle;

  const handleToggleFont = useCallback(() => {
    if (onToggleFontStyle) {
      onToggleFontStyle();
    } else {
      const next = currentFontStyle === 'sans' ? 'serif' : 'sans';
      setLocalFontStyle(next);
      try {
        localStorage.setItem('katakana_font_style', next);
      } catch {
        // 무시
      }
    }
  }, [currentFontStyle, onToggleFontStyle]);

  // 필터별 카드 덱 준비
  const prepareDeck = useCallback(
    (type: KatakanaFilterCategory, wrongIds?: Set<string>): KatakanaChar[] => {
      let result: KatakanaChar[] = [];
      if (type === 'all') {
        result = [...ALL_KATAKANA_CHARS];
      } else if (type === 'seion') {
        result = [...ALL_KATAKANA_SEION_CHARS];
      } else if (type === 'dakuon') {
        result = [...ALL_KATAKANA_DAKUON_CHARS];
      } else if (type === 'youon') {
        result = [...ALL_KATAKANA_YOUON_CHARS];
      } else if (type === 'special') {
        result = [...ALL_KATAKANA_SPECIAL_CHARS];
      } else if (type === 'confusing') {
        result = [...CONFUSING_CHARS];
      } else if (type === 'wrong' && wrongIds) {
        result = ALL_KATAKANA_CHARS.filter((c) => wrongIds.has(c.char));
      }
      return result.length > 0 ? result : [...ALL_KATAKANA_SEION_CHARS];
    },
    []
  );

  // 카드 덱 및 상태
  const [cardDeck, setCardDeck] = useState<KatakanaChar[]>(() =>
    prepareDeck(defaultFilter)
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownChars, setKnownChars] = useState<Set<string>>(new Set());
  const [confusedChars, setConfusedChars] = useState<Set<string>>(new Set());
  const [isSessionFinished, setIsSessionFinished] = useState(false);
  const [isPlayingSound, setIsPlayingSound] = useState(false);

  // 슬라이드 애니메이션 제어
  const [isSliding, setIsSliding] = useState(false);
  const [slideDir, setSlideDir] = useState<'left' | 'right'>('right');

  // 드래그 제스처
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ x: number; y: number } | null>(null);

  // 현재 카드
  const currentCard = cardDeck[currentIndex] || cardDeck[0];

  // 로컬 스토리지 복원
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.knownChars) setKnownChars(new Set(parsed.knownChars));
        if (parsed.confusedChars) setConfusedChars(new Set(parsed.confusedChars));
      }
    } catch {
      // 무시
    }
  }, [storageKey]);

  // 진행도 저장
  const saveProgress = useCallback(
    (known: Set<string>, confused: Set<string>) => {
      try {
        localStorage.setItem(
          storageKey,
          JSON.stringify({
            knownChars: Array.from(known),
            confusedChars: Array.from(confused),
            updatedAt: Date.now()
          })
        );
      } catch {
        // 무시
      }
    },
    [storageKey]
  );

  // 소리 재생
  const playCurrentSound = useCallback(() => {
    if (!currentCard) return;
    setIsPlayingSound(true);
    playKatakanaAudio(currentCard.char);
    setTimeout(() => {
      setIsPlayingSound(false);
    }, 600);
  }, [currentCard]);

  // 카드 변경 시 자동 발음 재생 (뒤집혀 있거나 자동재생 활성화된 경우)
  useEffect(() => {
    if (autoSpeech && currentCard && !isSessionFinished) {
      playCurrentSound();
    }
  }, [currentIndex, autoSpeech, isSessionFinished, currentCard, playCurrentSound]);

  // 카드 전환 애니메이션 헬퍼
  const triggerSlide = useCallback(
    (dir: 'left' | 'right', callback: () => void) => {
      setSlideDir(dir);
      setIsSliding(true);
      setTimeout(() => {
        setIsFlipped(false);
        callback();
        setSlideDir(dir === 'right' ? 'left' : 'right');
        setTimeout(() => {
          setIsSliding(false);
        }, 150);
      }, 150);
    },
    []
  );

  // 다음 카드
  const handleNext = useCallback(() => {
    if (currentIndex >= cardDeck.length - 1) {
      setIsSessionFinished(true);
      return;
    }
    triggerSlide('left', () => {
      setCurrentIndex((prev) => prev + 1);
    });
  }, [currentIndex, cardDeck.length, triggerSlide]);

  // 이전 카드
  const handlePrev = useCallback(() => {
    if (currentIndex <= 0) return;
    triggerSlide('right', () => {
      setCurrentIndex((prev) => prev - 1);
    });
  }, [currentIndex, triggerSlide]);

  // 카드 뒤집기
  const handleFlip = useCallback(() => {
    setIsFlipped((prev) => !prev);
  }, []);

  // 셔플
  const handleShuffle = useCallback(() => {
    const shuffled = [...cardDeck].sort(() => Math.random() - 0.5);
    setCardDeck(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
    setIsSessionFinished(false);
  }, [cardDeck]);

  // 초기화 (처음부터 다시 학습)
  const handleRestart = useCallback(() => {
    const deck = prepareDeck(filterType, confusedChars);
    setCardDeck(deck);
    setCurrentIndex(0);
    setIsFlipped(false);
    setIsSessionFinished(false);
  }, [filterType, confusedChars, prepareDeck]);

  // 외웠어요 체크
  const handleMarkKnown = useCallback(() => {
    if (!currentCard) return;
    const nextKnown = new Set(knownChars).add(currentCard.char);
    const nextConfused = new Set(confusedChars);
    nextConfused.delete(currentCard.char);
    setKnownChars(nextKnown);
    setConfusedChars(nextConfused);
    saveProgress(nextKnown, nextConfused);
    handleNext();
  }, [currentCard, knownChars, confusedChars, saveProgress, handleNext]);

  // 헷갈려요 체크
  const handleMarkConfused = useCallback(() => {
    if (!currentCard) return;
    const nextConfused = new Set(confusedChars).add(currentCard.char);
    const nextKnown = new Set(knownChars);
    nextKnown.delete(currentCard.char);
    setConfusedChars(nextConfused);
    setKnownChars(nextKnown);
    saveProgress(nextKnown, nextConfused);
    handleNext();
  }, [currentCard, confusedChars, knownChars, saveProgress, handleNext]);

  // 필터 변경 처리
  const handleFilterChange = (type: KatakanaFilterCategory) => {
    setFilterType(type);
    const newDeck = prepareDeck(type, confusedChars);
    setCardDeck(newDeck);
    setCurrentIndex(0);
    setIsFlipped(false);
    setIsSessionFinished(false);
  };

  // 키보드 단축키
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        handleFlip();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        if (isFlipped) {
          handleMarkKnown();
        } else {
          handleNext();
        }
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (isFlipped) {
          handleMarkConfused();
        } else {
          handlePrev();
        }
      } else if (e.key === '1' || e.key === 'x' || e.key === 'X') {
        if (isFlipped) {
          e.preventDefault();
          handleMarkConfused();
        }
      } else if (e.key === '2' || e.key === 'c' || e.key === 'C') {
        if (isFlipped) {
          e.preventDefault();
          handleMarkKnown();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleFlip, handleNext, handlePrev, handleMarkConfused, handleMarkKnown, isFlipped]);

  // 포인터 터치 드래그 스와이프 제어
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !dragStartRef.current) return;
    const deltaX = e.clientX - dragStartRef.current.x;
    setDragOffset(deltaX);
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (Math.abs(dragOffset) > 70) {
      if (dragOffset < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    setDragOffset(0);
    dragStartRef.current = null;
  };

  const handlePointerCancel = () => {
    setIsDragging(false);
    setDragOffset(0);
    dragStartRef.current = null;
  };

  const progressPercent = cardDeck.length > 0 ? Math.round(((currentIndex + 1) / cardDeck.length) * 100) : 0;

  return (
    <div className="w-full space-y-5 animate-in fade-in duration-200">
      {/* 1. 상단 컨트롤 패널 & 진행 바 */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-[#EDE8E1] shadow-2xs space-y-4">
        {/* 필터 탭 */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {[
            { id: 'seion', label: '청음 (46자)' },
            { id: 'dakuon', label: '탁음 (25자)' },
            { id: 'youon', label: '요음 (36자)' },
            { id: 'special', label: '특수음 (12자)' },
            { id: 'confusing', label: '도플갱어' },
            { id: 'all', label: '전체 (119자)' },
            { id: 'wrong', label: `복습 (${confusedChars.size})`, badge: confusedChars.size > 0 }
          ].map((tab) => {
            const isActive = filterType === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleFilterChange(tab.id as KatakanaFilterCategory)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 flex items-center gap-1 ${
                  isActive
                    ? 'bg-[#3D5A80] text-white shadow-2xs'
                    : 'bg-[#FAF9F7] text-[#718096] hover:bg-white hover:text-[#2D3748] border border-[#EDE8E1]'
                }`}
              >
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                )}
              </button>
            );
          })}
        </div>

        {/* 진행률 & 유틸리티 버튼 */}
        <div className="flex items-center justify-between gap-3 pt-1">
          <div className="flex-1 max-w-xs">
            <div className="flex items-center justify-between text-xs font-bold mb-1">
              <span className="text-[#3D5A80]">
                {currentIndex + 1} / {cardDeck.length}
              </span>
              <span className="text-[#A0AEC0]">{progressPercent}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-[#F0F4F8] overflow-hidden">
              <div
                className="h-full bg-[#3D5A80] transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* 글꼴 변경 */}
            <button
              type="button"
              onClick={handleToggleFont}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-bold text-[#4A5568] bg-[#FAF9F7] hover:bg-white border border-[#EDE8E1] transition-all shadow-2xs"
              title="글꼴 변경"
            >
              <Type className="w-3.5 h-3.5 text-[#3D5A80]" />
              <span suppressHydrationWarning>
                {currentFontStyle === 'sans' ? '정자체' : '명조체'}
              </span>
            </button>

            {/* 자동 발음 토글 */}
            <button
              type="button"
              onClick={() => setAutoSpeech((prev) => !prev)}
              className={`p-1.5 rounded-full border transition-all ${
                autoSpeech
                  ? 'bg-[#EBF3FB] text-[#3D5A80] border-[#C5D9F2]'
                  : 'bg-[#FAF9F7] text-[#A0AEC0] border-[#EDE8E1]'
              }`}
              title={autoSpeech ? '자동 발음 켜짐' : '자동 발음 꺼짐'}
            >
              <Volume2 className="w-4 h-4" />
            </button>

            {/* 셔플 */}
            <button
              type="button"
              onClick={handleShuffle}
              className="p-1.5 rounded-full bg-[#FAF9F7] hover:bg-white text-[#718096] hover:text-[#3D5A80] border border-[#EDE8E1] transition-all shadow-2xs"
              title="카드 무작위 섞기"
            >
              <Shuffle className="w-4 h-4" />
            </button>

            {/* 초기화 */}
            <button
              type="button"
              onClick={handleRestart}
              className="p-1.5 rounded-full bg-[#FAF9F7] hover:bg-white text-[#718096] hover:text-[#3D5A80] border border-[#EDE8E1] transition-all shadow-2xs"
              title="처음부터 다시 학습"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. 메인 플래시카드 영역 (또는 완료 축하 화면) */}
      {isSessionFinished ? (
        <div className="bg-white rounded-3xl p-8 border border-[#EDE8E1] shadow-2xs text-center space-y-6 animate-in zoom-in-95 duration-200">
          <div className="w-16 h-16 rounded-full bg-[#EBF3FB] text-[#3D5A80] flex items-center justify-center mx-auto shadow-inner">
            <Sparkles className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl font-black text-[#2D3748]">
              가타카나 카드 학습 완료! 🎉
            </h3>
            <p className="text-sm text-[#718096] mt-1">
              총 {cardDeck.length}장의 카드를 모두 확인하셨습니다.
            </p>
          </div>

          <div className="flex items-center justify-center gap-6 py-2">
            <div className="text-center">
              <span className="text-2xl font-black text-emerald-600">
                {knownChars.size}
              </span>
              <p className="text-xs text-[#A0AEC0] font-bold">외운 글자</p>
            </div>
            <div className="w-px h-8 bg-stone-200" />
            <div className="text-center">
              <span className="text-2xl font-black text-rose-500">
                {confusedChars.size}
              </span>
              <p className="text-xs text-[#A0AEC0] font-bold">헷갈리는 글자</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            {confusedChars.size > 0 && (
              <button
                type="button"
                onClick={() => handleFilterChange('wrong')}
                className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs shadow-sm transition-all active:scale-95"
              >
                헷갈린 글자만 다시 복습하기 ({confusedChars.size}자)
              </button>
            )}
            <button
              type="button"
              onClick={handleRestart}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-[#3D5A80] hover:bg-[#2B3E58] text-white font-bold text-xs shadow-sm transition-all active:scale-95"
            >
              처음부터 다시 보기
            </button>
            {onCompleteToNextStep && (
              <button
                type="button"
                onClick={onCompleteToNextStep}
                className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-[#FAF9F7] hover:bg-white text-[#2D3748] border border-[#EDE8E1] font-bold text-xs transition-all active:scale-95"
              >
                다음 학습 단계로
              </button>
            )}
          </div>
        </div>
      ) : (
        currentCard && (
          <div className="space-y-4">
            {/* 플립 & 스와이프 카드 컨테이너 */}
            <div
              className="w-full min-h-[380px] select-none cursor-pointer touch-pan-y relative overflow-hidden"
              style={{ perspective: '1200px' }}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerCancel}
              onClick={handleFlip}
            >
              {/* 캐로우셀 슬라이드 & 드래그 모션 래퍼 */}
              <div
                key={currentIndex}
                className="w-full min-h-[380px]"
                style={{
                  transform: isSliding
                    ? `translateX(${slideDir === 'left' ? '-115%' : '115%'})`
                    : `translateX(${dragOffset}px) rotate(${dragOffset * 0.025}deg)`,
                  opacity: isSliding ? 0 : 1,
                  transition: isSliding
                    ? 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.25s ease'
                    : isDragging
                    ? 'none'
                    : dragOffset !== 0
                    ? 'transform 0.28s cubic-bezier(0.2, 0.8, 0.2, 1)'
                    : 'none'
                }}
              >
                <div
                  className="relative w-full h-full min-h-[380px] rounded-3xl transition-transform duration-500"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                  }}
                >
                  {/* =========================================
                      앞면 (Front Card - 가타카나 퀴즈)
                  ========================================= */}
                  <div
                    className="absolute inset-0 w-full h-full bg-gradient-to-b from-white to-[#F9FBFC] rounded-3xl p-6 sm:p-8 border-2 border-[#EDE8E1] hover:border-[#3D5A80]/60 shadow-2xs flex flex-col justify-between items-center text-center transition-all"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden'
                    }}
                  >
                    {/* 상단 힌트 배지 */}
                    <div className="w-full flex items-center justify-between text-xs text-[#718096]">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#F0F4F8] text-[#3D5A80] text-[10px] font-bold">
                        {currentCard.row} • {currentCard.strokeCount}획
                      </span>
                    </div>

                    {/* 중앙 메인 가타카나 글자 */}
                    <div className="my-auto py-4 flex flex-col items-center justify-center">
                      <span
                        className={`text-8xl sm:text-9xl font-bold text-[#2D3748] tracking-tight leading-none drop-shadow-xs transition-all duration-150 ${
                          currentFontStyle === 'serif' ? 'font-jp-mincho' : 'font-jp-gothic'
                        }`}
                        style={{
                          fontFamily:
                            currentFontStyle === 'serif'
                              ? "'Noto Serif JP', 'Yu Mincho', serif"
                              : "'Klee One', 'Noto Sans JP', sans-serif"
                        }}
                      >
                        {currentCard.char}
                      </span>
                    </div>

                    {/* 하단 여백 균형 유지 */}
                    <div className="h-5" aria-hidden="true" />
                  </div>

                  {/* ==============================================================
                      뒷면 (Back Card - 정답 및 히라가나 Mnemonic 연계 브릿지)
                  ============================================================== */}
                  <div
                    className="absolute inset-0 w-full h-full bg-gradient-to-b from-[#F8FAFD] via-white to-[#F0F4F8] rounded-3xl p-5 sm:p-7 border-2 border-[#3D5A80]/40 shadow-2xs flex flex-col justify-between items-center text-center overflow-y-auto no-scrollbar"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)'
                    }}
                  >
                    {/* 상단 헤더: 정답 배지 & 소리 재생 */}
                    <div className="w-full flex items-center justify-between text-xs shrink-0">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#EBF3FB] text-[#3D5A80] text-[10px] font-bold">
                        정답 및 연상 브릿지
                      </span>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          playCurrentSound();
                        }}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold transition-all border ${
                          isPlayingSound
                            ? 'bg-[#3D5A80] text-white border-[#3D5A80]'
                            : 'bg-white text-[#3D5A80] border-[#C5D9F2] hover:bg-[#F0F7FF]'
                        }`}
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>발음 듣기</span>
                      </button>
                    </div>

                    {/* 중앙 정답 및 연상 그림 */}
                    <div className="my-auto py-2 flex flex-col items-center gap-2 max-w-sm w-full">
                      {/* 가타카나 ⇄ 히라가나 1:1 브릿지 배지 */}
                      {currentCard.matchingHiragana && (
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#CBD5E0] shadow-2xs text-xs font-bold">
                          <span className="text-[#3D5A80]">
                            가타카나 <strong className="text-base text-[#2D3748]">{currentCard.char}</strong>
                          </span>
                          <span className="text-[#A0AEC0]">⇄</span>
                          <span className="text-[#E07A5F]">
                            히라가나 <strong className="text-base text-[#E07A5F]">{currentCard.matchingHiragana}</strong>
                          </span>
                        </div>
                      )}

                      {/* 50음도 연상 기억법(Visual Mnemonic) 그림 카드 조합 렌더링 */}
                      {currentCard.matchingHiragana && MNEMONIC_DATA[currentCard.matchingHiragana] ? (
                        <div className="transform scale-95 sm:scale-100 origin-center">
                          <HiraganaMnemonicSvg
                            char={currentCard.matchingHiragana}
                            koreanSound={currentCard.koreanSound}
                            romaji={currentCard.romaji}
                            fontStyle={currentFontStyle}
                          />
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-2 py-4">
                          <div className="flex items-baseline gap-3">
                            <span
                              className={`text-5xl font-bold text-[#2D3748] ${
                                currentFontStyle === 'serif' ? 'font-jp-mincho' : 'font-jp-gothic'
                              }`}
                            >
                              {currentCard.char}
                            </span>
                            <div>
                              <span className="text-3xl font-black text-[#3D5A80]">
                                [{currentCard.koreanSound}]
                              </span>
                              <span className="text-sm font-bold text-[#718096] ml-2">
                                {currentCard.romaji}
                              </span>
                            </div>
                          </div>

                          {/* 탁음 변환 힌트 */}
                          {currentCard.baseChar && (
                            <div className="bg-[#FAF0E6] border border-[#F4DDD4] rounded-2xl px-3 py-1.5 text-xs text-[#2D3748] flex items-center gap-1.5 mt-1">
                              <span className="font-bold text-[#718096]">{currentCard.baseChar} (청음)</span>
                              <span className="text-[#3D5A80] font-bold">➔</span>
                              <span className="font-black text-[#3D5A80]">
                                {currentCard.char} ({currentCard.soundType === 'handakuon' ? '반탁음' : '탁음'})
                              </span>
                            </div>
                          )}
                        </div>
                      )}

                      {/* 획순 및 발음 팁 */}
                      {(currentCard.strokeGuide || currentCard.soundTip) && (
                        <div className="text-[11px] text-[#718096] bg-white/80 rounded-xl px-3 py-1.5 border border-[#EDE8E1] w-full text-center">
                          {currentCard.strokeGuide && (
                            <p>
                              <strong className="text-[#3D5A80]">획순:</strong> {currentCard.strokeGuide}
                            </p>
                          )}
                          {currentCard.soundTip && (
                            <p className="mt-0.5">
                              <strong className="text-[#3D5A80]">팁:</strong> {currentCard.soundTip}
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* 하단 독음 확인 */}
                    <div className="w-full flex items-center justify-between text-xs text-[#718096] pt-1 shrink-0">
                      <span className="text-xs font-black text-[#3D5A80]">
                        발음: [{currentCard.koreanSound}] ({currentCard.romaji})
                      </span>
                      <span className="text-[10px] text-[#A0AEC0]">
                        터치하면 앞면으로 회전
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. 하단 액션 버튼 컨트롤러 */}
            <div className="space-y-2 pt-1">
              {isFlipped ? (
                /* 카드가 뒤집혔을 때: 헷갈려요 vs 외웠어요 평가 버튼 */
                <div className="grid grid-cols-2 gap-2.5 animate-fadeIn">
                  <button
                    type="button"
                    onClick={handleMarkConfused}
                    disabled={isSliding}
                    className="py-3 px-4 rounded-2xl bg-white hover:bg-[#FAF9F7] text-[#4A5568] border-2 border-[#EDE8E1] text-xs font-black transition-all flex items-center justify-center gap-2 active:scale-95 shadow-2xs whitespace-nowrap"
                    title="단축키: 1 또는 ←"
                  >
                    <RotateCcw className="w-4 h-4 text-[#718096]" />
                    <span>헷갈려요</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleMarkKnown}
                    disabled={isSliding}
                    className="py-3 px-4 rounded-2xl bg-[#3D5A80] hover:bg-[#2B3E58] text-white text-xs font-black transition-all flex items-center justify-center gap-2 active:scale-95 shadow-xs whitespace-nowrap"
                    title="단축키: 2 또는 →"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>외웠어요!</span>
                  </button>
                </div>
              ) : (
                /* 카드가 뒤집히기 전: 탭하여 뒤집기 안내 또는 단순 이전/다음 */
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrev}
                    disabled={currentIndex === 0 || isSliding}
                    className="p-3 rounded-2xl bg-white border border-[#EDE8E1] text-[#718096] hover:bg-[#FAF9F7] disabled:opacity-30 disabled:pointer-events-none transition-all shadow-2xs whitespace-nowrap"
                    title="이전 카드 (←)"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={handleFlip}
                    className="flex-1 py-3 px-4 rounded-2xl bg-[#3D5A80] hover:bg-[#2B3E58] text-white text-xs font-black transition-all flex items-center justify-center gap-1.5 shadow-xs active:scale-[0.99] whitespace-nowrap"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>정답 확인하기 (탭)</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={isSliding}
                    className="p-3 rounded-2xl bg-white border border-[#EDE8E1] text-[#718096] hover:bg-[#FAF9F7] disabled:opacity-30 disabled:pointer-events-none transition-all shadow-2xs whitespace-nowrap"
                    title={currentIndex === cardDeck.length - 1 ? '학습 완료 및 결과 보기' : '다음 카드 (→)'}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )
      )}
    </div>
  );
}
