'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { MINI_WORDS, MiniWord } from '@/lib/curriculum/hiraganaData';
import { speakJapanese, stopJapaneseSpeech } from '@/utils/tts';
import {
  Volume2,
  RotateCcw,
  Shuffle,
  Sparkles,
  ChevronLeft,
  Check,
  ArrowRight,
  Type,
  BookOpen
} from 'lucide-react';

// 카테고리 목록 추출
const ALL_CATEGORIES = ['all', ...Array.from(new Set(MINI_WORDS.map((w) => w.category)))];

interface MiniWordFlashcardsProps {
  onCompleteToNextStep?: () => void;
  fontStyle?: 'sans' | 'serif';
  onToggleFontStyle?: () => void;
}

export default function MiniWordFlashcards({
  onCompleteToNextStep,
  fontStyle: propFontStyle,
  onToggleFontStyle
}: MiniWordFlashcardsProps) {
  // --- 상태 관리 ---
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [autoSpeech, setAutoSpeech] = useState(true);

  // 글꼴 상태 ('sans': 고딕/정자체, 'serif': 명조/흘림체)
  const [localFontStyle, setLocalFontStyle] = useState<'sans' | 'serif'>('sans');

  useEffect(() => {
    try {
      const savedFont = localStorage.getItem('hiragana_font_style');
      if (savedFont === 'sans' || savedFont === 'serif') {
        setLocalFontStyle(savedFont);
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
        localStorage.setItem('hiragana_font_style', next);
      } catch {
        // 무시
      }
    }
  }, [currentFontStyle, onToggleFontStyle]);

  // 카드 목록 및 덱 관리
  const [cardDeck, setCardDeck] = useState<MiniWord[]>(MINI_WORDS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isPlayingSound, setIsPlayingSound] = useState(false);

  // 캐로우셀 슬라이드 애니메이션
  const [slideDir, setSlideDir] = useState<'none' | 'left' | 'right'>('none');
  const [isSliding, setIsSliding] = useState(false);

  // 학습 세션 결과 (외운 단어 / 헷갈린 단어)
  const [knownWordIds, setKnownWordIds] = useState<Set<string>>(new Set());
  const [confusedWordIds, setConfusedWordIds] = useState<Set<string>>(new Set());
  const [isSessionFinished, setIsSessionFinished] = useState(false);

  // 카테고리 필터 변경
  const handleCategoryChange = (cat: string) => {
    stopJapaneseSpeech();
    setSelectedCategory(cat);
    const newDeck = cat === 'all' ? [...MINI_WORDS] : MINI_WORDS.filter((w) => w.category === cat);
    setCardDeck(newDeck.length > 0 ? newDeck : [...MINI_WORDS]);
    setCurrentIndex(0);
    setIsFlipped(false);
    setKnownWordIds(new Set());
    setConfusedWordIds(new Set());
    setIsSessionFinished(false);
  };

  // 카드 셔플
  const handleShuffle = () => {
    stopJapaneseSpeech();
    const shuffled = [...cardDeck].sort(() => Math.random() - 0.5);
    setCardDeck(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const currentCard = cardDeck[currentIndex] || cardDeck[0];

  // 음성 재생
  const playCurrentSound = useCallback((text?: string) => {
    const textToPlay = text || currentCard?.japanese;
    if (!textToPlay) return;

    setIsPlayingSound(true);
    speakJapanese(
      textToPlay,
      0.8,
      undefined,
      () => setIsPlayingSound(false)
    );
  }, [currentCard]);

  // 카드 뒤집기
  const handleFlip = useCallback(() => {
    const nextFlipped = !isFlipped;
    setIsFlipped(nextFlipped);

    if (nextFlipped && autoSpeech) {
      playCurrentSound(currentCard?.japanese);
    }
  }, [isFlipped, autoSpeech, playCurrentSound, currentCard]);

  // 카드 채점 (외웠어요 / 헷갈려요)
  const handleGradeCard = useCallback(
    (isKnown: boolean) => {
      if (isSliding || !currentCard) return;

      if (isKnown) {
        setKnownWordIds((prev) => new Set(prev).add(currentCard.id));
        setConfusedWordIds((prev) => {
          const next = new Set(prev);
          next.delete(currentCard.id);
          return next;
        });
      } else {
        setConfusedWordIds((prev) => new Set(prev).add(currentCard.id));
      }

      setSlideDir('left');
      setIsSliding(true);

      setTimeout(() => {
        if (currentIndex < cardDeck.length - 1) {
          setCurrentIndex((prev) => prev + 1);
          setIsFlipped(false);
          setSlideDir('none');
          setIsSliding(false);

          if (autoSpeech) {
            const nextCard = cardDeck[currentIndex + 1];
            if (nextCard) {
              setTimeout(() => {
                speakJapanese(nextCard.japanese, 0.8);
              }, 200);
            }
          }
        } else {
          setIsSessionFinished(true);
          setIsSliding(false);
          setSlideDir('none');
        }
      }, 250);
    },
    [isSliding, currentCard, currentIndex, cardDeck, autoSpeech]
  );

  // 이전 카드로 이동
  const handlePrevCard = useCallback(() => {
    if (currentIndex <= 0 || isSliding) return;
    setSlideDir('right');
    setIsSliding(true);

    setTimeout(() => {
      setCurrentIndex((prev) => prev - 1);
      setIsFlipped(false);
      setSlideDir('none');
      setIsSliding(false);
    }, 250);
  }, [currentIndex, isSliding]);

  // 헷갈린 단어만 다시 복습
  const handleReviewConfused = () => {
    stopJapaneseSpeech();
    const wrongWords = MINI_WORDS.filter((w) => confusedWordIds.has(w.id));
    if (wrongWords.length === 0) return;

    setCardDeck(wrongWords);
    setCurrentIndex(0);
    setIsFlipped(false);
    setIsSessionFinished(false);
    setKnownWordIds(new Set());
    setConfusedWordIds(new Set());
  };

  // 세션 재시작
  const handleRestartSession = () => {
    stopJapaneseSpeech();
    const original = selectedCategory === 'all'
      ? [...MINI_WORDS]
      : MINI_WORDS.filter((w) => w.category === selectedCategory);
    setCardDeck(original);
    setCurrentIndex(0);
    setIsFlipped(false);
    setIsSessionFinished(false);
    setKnownWordIds(new Set());
    setConfusedWordIds(new Set());
  };

  // 키보드 단축키
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        handleFlip();
      } else if (e.code === 'ArrowRight' || e.code === 'Digit2' || e.code === 'Numpad2') {
        e.preventDefault();
        handleGradeCard(true);
      } else if (e.code === 'ArrowLeft' || e.code === 'Digit1' || e.code === 'Numpad1') {
        e.preventDefault();
        handleGradeCard(false);
      } else if (e.code === 'KeyR') {
        e.preventDefault();
        playCurrentSound();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleFlip, handleGradeCard, playCurrentSound]);

  // 스와이프 제스처 핸들링
  const [touchStartPos, setTouchStartPos] = useState<{ x: number; y: number } | null>(null);
  const [dragOffset, setDragOffset] = useState<number>(0);
  const isDraggingRef = useRef(false);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (isSliding) return;
    setTouchStartPos({ x: e.clientX, y: e.clientY });
    isDraggingRef.current = true;
    setDragOffset(0);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current || !touchStartPos) return;
    const diffX = e.clientX - touchStartPos.x;
    const diffY = e.clientY - touchStartPos.y;
    if (Math.abs(diffX) > Math.abs(diffY)) {
      setDragOffset(diffX);
    }
  };

  const handlePointerUp = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    const threshold = 70;
    if (dragOffset > threshold) {
      handleGradeCard(true);
    } else if (dragOffset < -threshold) {
      handleGradeCard(false);
    }
    setDragOffset(0);
    setTouchStartPos(null);
  };

  const handlePointerCancel = () => {
    isDraggingRef.current = false;
    setDragOffset(0);
    setTouchStartPos(null);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    if (Math.abs(dragOffset) > 10) return;
    const target = e.target as HTMLElement;
    if (target.closest('button')) return;
    handleFlip();
  };

  // 진행률 계산
  const progressPercent = Math.round(((currentIndex + 1) / cardDeck.length) * 100);

  return (
    <div className="space-y-4">
      {/* 1. 상단 컨트롤 패널 */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-[#EDE8E1] shadow-xs space-y-3">
        <div className="flex items-center justify-between gap-2.5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-[#FAF0E6] flex items-center justify-center text-[#E07A5F] shrink-0">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-black text-[#2D3748] flex items-center gap-1.5">
                <span>미니 단어 암기 카드</span>
                <span className="text-[11px] font-semibold text-[#718096]">({cardDeck.length}단어)</span>
              </h2>
            </div>
          </div>
        </div>

        {/* 카테고리 칩 필터 */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-0.5 pb-0.5">
          {ALL_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategoryChange(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all border ${
                  isSelected
                    ? 'bg-[#2D3748] text-white border-[#2D3748] shadow-2xs'
                    : 'bg-white text-[#718096] border-[#EDE8E1] hover:bg-[#FAF9F7]'
                }`}
              >
                {cat === 'all' ? '전체 단어' : cat}
              </button>
            );
          })}

          {confusedWordIds.size > 0 && (
            <button
              type="button"
              onClick={handleReviewConfused}
              className="px-3 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all border flex items-center gap-1 bg-[#3D5A80] text-white border-[#3D5A80] shadow-2xs"
            >
              <RotateCcw className="w-3 h-3" />
              <span>오답 복습 ({confusedWordIds.size})</span>
            </button>
          )}
        </div>

        {/* 하단 진행도 및 글꼴/셔플 컨트롤 바 */}
        <div className="flex items-center justify-between pt-2 border-t border-[#EDE8E1]/80 text-xs">
          <div className="flex items-center gap-3">
            <span className="font-extrabold text-[#2D3748]">
              진행: <span className="text-[#E07A5F]">{currentIndex + 1}</span> / {cardDeck.length}
            </span>
            <div className="flex items-center gap-2 text-[11px] font-bold">
              <span className="text-[#E07A5F] flex items-center gap-0.5 bg-[#FAF0E6] px-2 py-0.5 rounded-full border border-[#F4DDD4]">
                <Check className="w-3 h-3 text-[#E07A5F]" /> {knownWordIds.size}
              </span>
              <span className="text-[#718096] flex items-center gap-0.5 bg-stone-100 px-2 py-0.5 rounded-full border border-[#EDE8E1]">
                <RotateCcw className="w-3 h-3 text-[#718096]" /> {confusedWordIds.size}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {/* 글꼴 스타일 토글 (정자체 / 흘림체) */}
            <button
              type="button"
              onClick={handleToggleFont}
              className={`px-2 py-1 rounded-xl text-[11px] font-bold transition-all border flex items-center gap-1 shadow-2xs ${
                currentFontStyle === 'serif'
                  ? 'bg-[#FAF0E6] text-[#E07A5F] border-[#F4DDD4] font-serif'
                  : 'bg-white hover:bg-stone-50 text-[#4A5568] border-[#EDE8E1] font-sans'
              }`}
              title="글꼴 변경: 또박또박한 정자체(교과서체) ⇄ 붓글씨 느낌 흘림체(명조체)"
            >
              <Type className="w-3 h-3 text-[#E07A5F]" />
              <span className="hidden sm:inline">
                {currentFontStyle === 'serif' ? '흘림체(명조)' : '정자체(교과서)'}
              </span>
              <span className="sm:hidden">
                {currentFontStyle === 'serif' ? '흘림체' : '정자체'}
              </span>
            </button>

            {/* 소리 자동 재생 토글 */}
            <button
              type="button"
              onClick={() => setAutoSpeech((prev) => !prev)}
              className={`px-2 py-1 rounded-xl text-[11px] font-bold transition-all border flex items-center gap-1 ${
                autoSpeech
                  ? 'bg-[#FAF0E6] text-[#E07A5F] border-[#F4DDD4]'
                  : 'bg-stone-50 text-stone-400 border-stone-200'
              }`}
              title="카드 뒤집을 때 발음 자동 재생"
            >
              <Volume2 className="w-3 h-3" />
              <span className="hidden sm:inline">자동발음</span>
            </button>

            {/* 셔플 버튼 */}
            <button
              type="button"
              onClick={handleShuffle}
              className="px-2 py-1 rounded-xl text-[11px] font-bold bg-[#FAF9F7] hover:bg-[#F4EFEA] text-[#718096] border border-[#EDE8E1] transition-all flex items-center gap-1"
              title="단어 순서 섞기"
            >
              <Shuffle className="w-3 h-3" />
              <span className="hidden sm:inline">셔플</span>
            </button>
          </div>
        </div>

        {/* 진행률 게이지 바 */}
        <div className="w-full bg-stone-100 rounded-full h-1.5 overflow-hidden">
          <div
            className="bg-gradient-to-r from-[#E07A5F] to-amber-500 h-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* 2. 메인 카드 영역 vs 학습 완료 화면 */}
      {isSessionFinished ? (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EDE8E1] shadow-xs text-center space-y-5">
          <div className="w-16 h-16 bg-gradient-to-tr from-amber-100 to-rose-100 text-[#E07A5F] rounded-full flex items-center justify-center mx-auto shadow-inner">
            <Sparkles className="w-8 h-8" />
          </div>

          <div className="space-y-1.5">
            <h3 className="text-xl font-black text-[#2D3748]">
              미니 단어 암기 세션 완료! 🎉
            </h3>
            <p className="text-xs text-[#718096]">
              배운 히라가나로 실생활 단어를 모두 읽어보았습니다. 헷갈린 단어는 바로 복습해보세요.
            </p>
          </div>

          {/* 스코어 카드 */}
          <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto">
            <div className="p-3.5 bg-[#FAF0E6] rounded-2xl border border-[#F4DDD4]">
              <span className="text-[11px] font-bold text-[#E07A5F]">외운 단어</span>
              <p className="text-2xl font-black text-[#E07A5F] mt-0.5">
                {knownWordIds.size} <span className="text-xs font-semibold">개</span>
              </p>
            </div>
            <div className="p-3.5 bg-stone-50 rounded-2xl border border-[#EDE8E1]">
              <span className="text-[11px] font-bold text-[#718096]">헷갈린 단어</span>
              <p className="text-2xl font-black text-[#2D3748] mt-0.5">
                {confusedWordIds.size} <span className="text-xs font-semibold">개</span>
              </p>
            </div>
          </div>

          {/* 헷갈린 단어 목록 칩 */}
          {confusedWordIds.size > 0 && (
            <div className="pt-2 text-left bg-stone-50/80 rounded-2xl p-4 border border-[#EDE8E1] space-y-2">
              <span className="text-xs font-bold text-[#718096] block">
                헷갈렸던 단어들 (클릭하여 발음 청취):
              </span>
              <div className="flex flex-wrap items-center gap-1.5">
                {Array.from(confusedWordIds).map((id) => {
                  const item = MINI_WORDS.find((w) => w.id === id);
                  if (!item) return null;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => playCurrentSound(item.japanese)}
                      className="px-2.5 py-1 bg-white hover:bg-[#FAF9F7] rounded-xl border border-[#EDE8E1] text-[#2D3748] text-xs font-bold flex items-center gap-1 transition-all"
                    >
                      <span>{item.emoji}</span>
                      <span
                        className={currentFontStyle === 'serif' ? 'font-jp-mincho' : 'font-jp-gothic'}
                        style={{
                          fontFamily:
                            currentFontStyle === 'serif'
                              ? "'Noto Serif JP', 'Yu Mincho', serif"
                              : "'Klee One', 'Noto Sans JP', sans-serif"
                        }}
                      >
                        {item.japanese}
                      </span>
                      <span className="text-[10px] text-[#718096] font-normal">
                        ({item.koreanMeaning})
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 하단 액션 버튼 그룹 */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-2">
            {confusedWordIds.size > 0 && (
              <button
                type="button"
                onClick={handleReviewConfused}
                className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-[#3D5A80] hover:bg-[#2F4563] text-white text-xs font-bold shadow-xs transition-all flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>헷갈린 단어만 다시 복습 ({confusedWordIds.size})</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleRestartSession}
              className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-stone-100 hover:bg-stone-200 text-[#2D3748] text-xs font-bold transition-all flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>처음부터 다시 학습</span>
            </button>

            {onCompleteToNextStep && (
              <button
                type="button"
                onClick={onCompleteToNextStep}
                className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-[#E07A5F] hover:bg-[#C55D42] text-white text-xs font-bold shadow-xs transition-all flex items-center justify-center gap-1.5"
              >
                <span>다음 단계 (첫 발화)로</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* 카드 영역 */
        <div className="space-y-4">
          {/* 플립 & 스와이프 카드 컨테이너 */}
          <div
            className="w-full min-h-[360px] select-none cursor-pointer touch-pan-y relative overflow-hidden"
            style={{ perspective: '1200px' }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerCancel}
            onClick={handleCardClick}
          >
            {/* 캐로우셀 슬라이드 & 드래그 모션 래퍼 */}
            <div
              key={currentIndex}
              className="w-full min-h-[360px]"
              style={{
                transform: isSliding
                  ? `translateX(${slideDir === 'left' ? '-115%' : '115%'})`
                  : `translateX(${dragOffset}px) rotate(${dragOffset * 0.02}deg)`,
                opacity: isSliding ? 0 : 1,
                transition: isSliding
                  ? 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.25s ease'
                  : isDraggingRef.current ? 'none' : dragOffset !== 0 ? 'transform 0.28s cubic-bezier(0.2, 0.8, 0.2, 1)' : 'none',
              }}
            >
              <div
                className="relative w-full h-full min-h-[360px] rounded-3xl transition-transform duration-500"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                }}
              >
                {/* =========================================
                    앞면 (Front Card)
                ========================================= */}
                <div
                  className="absolute inset-0 w-full h-full bg-gradient-to-b from-white to-[#FDFBF7] rounded-3xl p-6 sm:p-8 border-2 border-[#EDE8E1] hover:border-[#E07A5F]/60 card-shadow flex flex-col justify-between items-center text-center transition-all"
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden'
                  }}
                >
                  {/* 상단 힌트 배지 */}
                  <div className="w-full flex items-center justify-between text-xs text-[#718096]">
                    <span className="px-2.5 py-0.5 rounded-full bg-stone-100 text-[#718096] text-[10px] font-bold">
                      {currentCard.category} • {currentCard.japanese.length}글자
                    </span>
                  </div>

                  {/* 중앙 메인 콘텐츠 */}
                  <div className="my-auto py-6 flex flex-col items-center justify-center">
                    <span
                      className={`text-7xl sm:text-8xl md:text-9xl font-bold text-[#2D3748] tracking-widest leading-none drop-shadow-xs transition-all ${
                        currentFontStyle === 'serif' ? 'font-jp-mincho' : 'font-jp-gothic'
                      }`}
                      style={{
                        fontFamily:
                          currentFontStyle === 'serif'
                            ? "'Noto Serif JP', 'Yu Mincho', serif"
                            : "'Klee One', 'Noto Sans JP', sans-serif"
                      }}
                    >
                      {currentCard.japanese}
                    </span>
                  </div>

                  {/* 하단 여백 균형 유지 */}
                  <div className="h-5" aria-hidden="true" />
                </div>

                {/* =========================================
                    뒷면 (Back Card - 정답 및 음절 분해 해설)
                ========================================= */}
                <div
                  className="absolute inset-0 w-full h-full bg-gradient-to-b from-[#FFFDF9] via-white to-[#FAF4ED] rounded-3xl p-6 sm:p-7 border-2 border-[#E07A5F]/40 card-shadow flex flex-col justify-between items-center text-center"
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)'
                  }}
                >
                  {/* 상단 헤더 */}
                  <div className="w-full flex items-center justify-between text-xs">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#FAF0E6] text-[#E07A5F] text-[10px] font-bold border border-[#F4DDD4]">
                      정답 확인
                    </span>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        playCurrentSound();
                      }}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold transition-all border ${
                        isPlayingSound
                          ? 'bg-[#E07A5F] text-white border-[#E07A5F]'
                          : 'bg-white text-[#E07A5F] border-[#F4DDD4] hover:bg-[#FFF4EE]'
                      }`}
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>전체 발음</span>
                    </button>
                  </div>

                  {/* 중앙 정답 상세 정보 */}
                  <div className="my-auto py-6 flex flex-col items-center justify-center gap-4 text-center">
                    <span className="text-6xl drop-shadow-sm select-none">
                      {currentCard.emoji}
                    </span>

                    <div className="space-y-1.5">
                      <div className="flex items-baseline justify-center gap-2.5">
                        <span
                          className={`text-5xl sm:text-6xl font-bold text-[#2D3748] tracking-wider transition-all ${
                            currentFontStyle === 'serif' ? 'font-jp-mincho' : 'font-jp-gothic'
                          }`}
                          style={{
                            fontFamily:
                              currentFontStyle === 'serif'
                                ? "'Noto Serif JP', 'Yu Mincho', serif"
                                : "'Klee One', 'Noto Sans JP', sans-serif"
                          }}
                        >
                          {currentCard.japanese}
                        </span>
                        <span className="text-base font-semibold text-[#A0AEC0]">
                          [{currentCard.romaji}]
                        </span>
                      </div>
                      <p className="text-2xl font-black text-[#E07A5F]">
                        {currentCard.koreanMeaning}
                      </p>
                    </div>
                  </div>

                  {/* 하단 여백 균형 유지 */}
                  <div className="h-5" aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>

          {/* 3. 하단 컨트롤 버튼 바 */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrevCard}
              disabled={currentIndex === 0 || isSliding}
              className={`p-3 rounded-2xl border transition-all ${
                currentIndex === 0 || isSliding
                  ? 'bg-stone-50 border-stone-200 text-stone-300 cursor-not-allowed'
                  : 'bg-white hover:bg-stone-50 border-[#EDE8E1] text-[#718096] hover:text-[#2D3748] shadow-2xs'
              }`}
              title="이전 카드 (단축키: ←)"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* 헷갈려요 버튼 */}
            <button
              type="button"
              onClick={() => handleGradeCard(false)}
              disabled={isSliding}
              className="flex-1 py-3 px-4 rounded-2xl bg-white hover:bg-stone-50 active:scale-98 text-[#718096] hover:text-[#2D3748] border border-[#EDE8E1] shadow-2xs font-extrabold text-sm transition-all flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4 text-[#718096]" />
              <span>헷갈려요 (↺)</span>
            </button>

            {/* 외웠어요 버튼 */}
            <button
              type="button"
              onClick={() => handleGradeCard(true)}
              disabled={isSliding}
              className="flex-1 py-3 px-4 rounded-2xl bg-[#E07A5F] hover:bg-[#C55D42] active:scale-98 text-white shadow-xs font-extrabold text-sm transition-all flex items-center justify-center gap-2"
            >
              <Check className="w-4 h-4 text-white stroke-[3]" />
              <span>외웠어요 (✓)</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
