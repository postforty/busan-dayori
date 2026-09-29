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
  ChevronRight,
  CheckCircle2,
  Check,
  ArrowRight,
  Type,
  BookOpen,
  Target,
  Zap,
  X
} from 'lucide-react';

// 로컬 스토리지 키 및 저장 구조
const STORAGE_KEY = 'mini_words_study_progress';

interface MiniWordsStudyProgress {
  knownIds: string[];
  confusedIds: string[];
  selectedCategory?: string;
  currentIndex?: number;
  deckIds?: string[];
  isSessionFinished?: boolean;
  updatedAt: number;
}

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
  const [reviewListTab, setReviewListTab] = useState<'confused' | 'skipped'>('confused');

  // 실행 취소(Undo) 지원 토스트 상태
  const [toast, setToast] = useState<{
    message: string;
    onUndo?: () => void;
  } | null>(null);
  const toastTimerRef = useRef<NodeJS.Timeout | null>(null);

  const showToast = useCallback((message: string, onUndo?: () => void) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast({ message, onUndo });
    toastTimerRef.current = setTimeout(() => {
      setToast(null);
    }, 4000);
  }, []);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);

  // 로컬 스토리지 복원 완료 여부 (초기 빈 state가 저장 데이터를 덮어쓰지 않도록 방어)
  const [isLoaded, setIsLoaded] = useState(false);

  // 1. 마운트 시 로컬 스토리지에서 학습 진행 상태 복원
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: MiniWordsStudyProgress = JSON.parse(saved);
        if (Array.isArray(parsed.knownIds)) {
          setKnownWordIds(new Set(parsed.knownIds));
        }
        if (Array.isArray(parsed.confusedIds)) {
          setConfusedWordIds(new Set(parsed.confusedIds));
        }

        // 카테고리 복원
        let cat = 'all';
        if (parsed.selectedCategory && ALL_CATEGORIES.includes(parsed.selectedCategory)) {
          cat = parsed.selectedCategory;
          setSelectedCategory(cat);
        }

        // 덱 복원 (저장된 단어 순서 및 복습 덱 상태 보존)
        let restoredDeck: MiniWord[] = [];
        if (Array.isArray(parsed.deckIds) && parsed.deckIds.length > 0) {
          const wordMap = new Map(MINI_WORDS.map((w) => [w.id, w]));
          restoredDeck = parsed.deckIds
            .map((id) => wordMap.get(id))
            .filter((w): w is MiniWord => Boolean(w));
        }

        if (restoredDeck.length === 0) {
          restoredDeck = cat === 'all'
            ? [...MINI_WORDS]
            : MINI_WORDS.filter((w) => w.category === cat);
        }
        setCardDeck(restoredDeck.length > 0 ? restoredDeck : [...MINI_WORDS]);

        // 현재 카드 인덱스 복원
        if (typeof parsed.currentIndex === 'number' && parsed.currentIndex >= 0) {
          const safeIndex = Math.min(parsed.currentIndex, Math.max(0, restoredDeck.length - 1));
          setCurrentIndex(safeIndex);
        }

        // 세션 완료 상태 복원
        if (typeof parsed.isSessionFinished === 'boolean') {
          setIsSessionFinished(parsed.isSessionFinished);
        }
      }
    } catch {
      // 무시
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // 2. 상태 변경 시 로컬 스토리지에 자동 동기화 (복원 완료 이후에만 실행)
  useEffect(() => {
    if (!isLoaded) return;
    try {
      const data: MiniWordsStudyProgress = {
        knownIds: Array.from(knownWordIds),
        confusedIds: Array.from(confusedWordIds),
        selectedCategory,
        currentIndex,
        deckIds: cardDeck.map((w) => w.id),
        isSessionFinished,
        updatedAt: Date.now()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // 무시
    }
  }, [isLoaded, knownWordIds, confusedWordIds, selectedCategory, currentIndex, cardDeck, isSessionFinished]);

  // 카테고리 필터 변경 (누적 기록 보존)
  const handleCategoryChange = (cat: string) => {
    stopJapaneseSpeech();
    setSelectedCategory(cat);
    const newDeck = cat === 'all' ? [...MINI_WORDS] : MINI_WORDS.filter((w) => w.category === cat);
    setCardDeck(newDeck.length > 0 ? newDeck : [...MINI_WORDS]);
    setCurrentIndex(0);
    setIsFlipped(false);
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

  // 단어 분류 계산
  const knownWords = cardDeck.filter((w) => knownWordIds.has(w.id));
  const confusedWords = cardDeck.filter((w) => confusedWordIds.has(w.id));
  const unreviewedWords = cardDeck.filter(
    (w) => !knownWordIds.has(w.id) && !confusedWordIds.has(w.id)
  );
  const unfinishedWords = cardDeck.filter((w) => !knownWordIds.has(w.id));

  // 다음 카드로 이동 (마지막 카드에서 다음을 누르면 세션 완료)
  const handleNextCard = useCallback(() => {
    if (isSliding) return;
    if (currentIndex >= cardDeck.length - 1) {
      setIsSessionFinished(true);
      return;
    }
    setSlideDir('left');
    setIsSliding(true);

    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      setIsFlipped(false);
      setSlideDir('none');
      setIsSliding(false);
    }, 250);
  }, [currentIndex, cardDeck.length, isSliding]);

  // 🎯 미완료 단어 복습 (헷갈림 + 건너뜀)
  const handleReviewUnfinished = () => {
    stopJapaneseSpeech();
    if (unfinishedWords.length === 0) return;

    setCardDeck(unfinishedWords);
    setCurrentIndex(0);
    setIsFlipped(false);
    setIsSessionFinished(false);
  };

  // ⚡ 헷갈린 단어 복습 (누적 헷갈린 단어 전체 또는 현재 덱)
  const handleReviewConfused = () => {
    stopJapaneseSpeech();
    const targetWords = MINI_WORDS.filter((w) => confusedWordIds.has(w.id));
    if (targetWords.length === 0) return;

    setCardDeck(targetWords);
    setCurrentIndex(0);
    setIsFlipped(false);
    setIsSessionFinished(false);
  };

  // 📖 건너뛴 단어 복습
  const handleReviewSkipped = () => {
    stopJapaneseSpeech();
    if (unreviewedWords.length === 0) return;

    setCardDeck(unreviewedWords);
    setCurrentIndex(0);
    setIsFlipped(false);
    setIsSessionFinished(false);
  };

  // 세션 재시작 (현재 카테고리 첫 카드부터)
  const handleRestartSession = () => {
    stopJapaneseSpeech();
    const original = selectedCategory === 'all'
      ? [...MINI_WORDS]
      : MINI_WORDS.filter((w) => w.category === selectedCategory);
    setCardDeck(original);
    setCurrentIndex(0);
    setIsFlipped(false);
    setIsSessionFinished(false);
  };

  // 개별 기록 초기화 (알럿 없이 즉시 초기화 & 실행 취소 토스트 제공)
  const handleResetKnownWords = () => {
    if (knownWordIds.size === 0) return;
    const backup = new Set(knownWordIds);
    const count = backup.size;
    setKnownWordIds(new Set());

    showToast(`외운 단어 (${count}개) 기록이 초기화되었습니다.`, () => {
      setKnownWordIds(backup);
    });
  };

  const handleResetConfusedWords = () => {
    if (confusedWordIds.size === 0) return;
    const backup = new Set(confusedWordIds);
    const count = backup.size;
    setConfusedWordIds(new Set());

    showToast(`헷갈린 단어 (${count}개) 기록이 초기화되었습니다.`, () => {
      setConfusedWordIds(backup);
    });
  };

  // 전체 학습 기록 초기화 (알럿 없이 즉시 초기화 & 실행 취소 토스트 제공)
  const handleResetProgress = () => {
    stopJapaneseSpeech();
    const backupKnown = new Set(knownWordIds);
    const backupConfused = new Set(confusedWordIds);
    const backupCategory = selectedCategory;
    const backupDeck = [...cardDeck];
    const backupIndex = currentIndex;
    const backupFinished = isSessionFinished;

    setKnownWordIds(new Set());
    setConfusedWordIds(new Set());
    setSelectedCategory('all');
    setCardDeck([...MINI_WORDS]);
    setCurrentIndex(0);
    setIsFlipped(false);
    setIsSessionFinished(false);

    showToast('단어 암기 학습 기록을 모두 초기화했습니다.', () => {
      setKnownWordIds(backupKnown);
      setConfusedWordIds(backupConfused);
      setSelectedCategory(backupCategory);
      setCardDeck(backupDeck);
      setCurrentIndex(backupIndex);
      setIsSessionFinished(backupFinished);
    });
  };

  // 키보드 단축키 지원 (스페이스바: 뒤집기, 1/2번 또는 화살표 키)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        handleFlip();
      } else if (e.code === 'Digit1' || e.code === 'Numpad1' || e.key === '1') {
        if (isFlipped) {
          e.preventDefault();
          handleGradeCard(false); // 헷갈려요
        }
      } else if (e.code === 'Digit2' || e.code === 'Numpad2' || e.key === '2') {
        if (isFlipped) {
          e.preventDefault();
          handleGradeCard(true); // 외웠어요
        }
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (isFlipped) {
          handleGradeCard(false);
        } else {
          handlePrevCard();
        }
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        if (isFlipped) {
          handleGradeCard(true);
        } else {
          handleNextCard();
        }
      } else if (e.code === 'KeyR') {
        e.preventDefault();
        playCurrentSound();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleFlip, handleGradeCard, handlePrevCard, handleNextCard, playCurrentSound, isFlipped]);

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
    const threshold = 50;
    if (dragOffset > threshold) {
      handlePrevCard();
    } else if (dragOffset < -threshold) {
      handleNextCard();
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
  const progressPercent = Math.min(
    100,
    Math.round(((currentIndex + (isSessionFinished ? 1 : 0)) / cardDeck.length) * 100)
  );

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
                className={`px-3 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all border ${isSelected
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
            <div className="flex items-center gap-1.5 text-[11px] font-bold">
              <button
                type="button"
                onClick={handleResetKnownWords}
                disabled={knownWordIds.size === 0}
                className={`flex items-center gap-0.5 bg-[#FAF0E6] text-[#E07A5F] px-2 py-0.5 rounded-full border border-[#F4DDD4] transition-all ${knownWordIds.size > 0
                    ? 'hover:bg-[#F4DDD4] hover:opacity-90 active:scale-95 cursor-pointer shadow-2xs'
                    : 'cursor-default opacity-70'
                  }`}
                title={
                  knownWordIds.size > 0
                    ? `외운 단어 ${knownWordIds.size}개 (클릭 시 기록 초기화)`
                    : '외운 단어 0개'
                }
              >
                <Check className="w-3 h-3 text-[#E07A5F]" />
                <span>{knownWordIds.size}</span>
              </button>
              <button
                type="button"
                onClick={handleResetConfusedWords}
                disabled={confusedWordIds.size === 0}
                className={`flex items-center gap-0.5 bg-[#F7EBE5] text-[#C45B40] px-2 py-0.5 rounded-full border border-[#ECCDC2] transition-all ${confusedWordIds.size > 0
                    ? 'hover:bg-[#F2DDD3] hover:opacity-90 active:scale-95 cursor-pointer shadow-2xs'
                    : 'cursor-default opacity-70'
                  }`}
                title={
                  confusedWordIds.size > 0
                    ? `헷갈린 단어 ${confusedWordIds.size}개 (클릭 시 기록 초기화)`
                    : '헷갈린 단어 0개'
                }
              >
                <RotateCcw className="w-3 h-3 text-[#C45B40]" />
                <span>{confusedWordIds.size}</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {/* 글꼴 스타일 토글 (정자 / 흘림) */}
            <button
              type="button"
              onClick={handleToggleFont}
              className={`px-2 py-1 rounded-xl text-[11px] font-bold transition-all border flex items-center gap-1 shadow-2xs ${currentFontStyle === 'serif'
                ? 'bg-[#FAF0E6] text-[#E07A5F] border-[#F4DDD4] font-serif'
                : 'bg-white hover:bg-stone-50 text-[#4A5568] border-[#EDE8E1] font-sans'
                }`}
              title="글꼴 변경: 또박또박한 정자체 ⇄ 붓글씨 느낌 흘림체"
            >
              <Type className="w-3 h-3 text-[#E07A5F]" />
              <span className="hidden sm:inline">
                {currentFontStyle === 'serif' ? '흘림' : '정자'}
              </span>
              <span className="sm:hidden">
                {currentFontStyle === 'serif' ? '흘림' : '정자'}
              </span>
            </button>

            {/* 소리 자동 재생 토글 */}
            <button
              type="button"
              onClick={() => setAutoSpeech((prev) => !prev)}
              className={`px-2 py-1 rounded-xl text-[11px] font-bold transition-all border flex items-center gap-1 ${autoSpeech
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
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EDE8E1] shadow-xs text-center space-y-6">
          <div className="w-16 h-16 bg-gradient-to-tr from-[#FAF0E6] to-[#FFF6F1] text-[#E07A5F] rounded-full flex items-center justify-center mx-auto shadow-inner border border-[#F4DDD4]">
            <Sparkles className="w-8 h-8" />
          </div>

          <div className="space-y-1.5">
            <h3 className="text-xl font-black text-[#2D3748]">
              미니 단어 암기 세션 완료! 🎉
            </h3>
            <p className="text-xs text-[#718096]">
              배운 히라가나로 실생활 단어 1사이클을 마쳤습니다. 상태별로 모아 복습해보세요.
            </p>
          </div>

          {/* 3분할 스코어 카드 (외움 / 헷갈림 / 건너뜀) */}
          <div className="grid grid-cols-3 gap-2.5 max-w-md mx-auto">
            {/* 1. 외운 단어 */}
            <div className="p-3 bg-[#FAF0E6] rounded-2xl border border-[#F4DDD4] text-center">
              <span className="text-[11px] font-bold text-[#E07A5F]">외운 단어</span>
              <p className="text-xl sm:text-2xl font-black text-[#E07A5F] mt-0.5">
                {knownWords.length} <span className="text-xs font-semibold">개</span>
              </p>
            </div>

            {/* 2. 헷갈린 단어 */}
            <div className="p-3 bg-[#F7EBE5] rounded-2xl border border-[#ECCDC2] text-center">
              <span className="text-[11px] font-bold text-[#C45B40]">헷갈린 단어</span>
              <p className="text-xl sm:text-2xl font-black text-[#C45B40] mt-0.5">
                {confusedWords.length} <span className="text-xs font-semibold">개</span>
              </p>
            </div>

            {/* 3. 건너뛴 단어 */}
            <div className="p-3 bg-[#F8F6F2] rounded-2xl border border-[#EDE8E1] text-center">
              <span className="text-[11px] font-bold text-[#718096]">건너뛴 단어</span>
              <p className="text-xl sm:text-2xl font-black text-[#2D3748] mt-0.5">
                {unreviewedWords.length} <span className="text-xs font-semibold">개</span>
              </p>
            </div>
          </div>

          {/* 3색 복합 진행 바 */}
          <div className="max-w-md mx-auto space-y-1.5">
            <div className="w-full bg-[#EDE8E1] rounded-full h-2 overflow-hidden flex">
              <div
                className="bg-[#E07A5F] h-full transition-all duration-300"
                style={{ width: `${(knownWords.length / cardDeck.length) * 100}%` }}
                title={`외운 단어: ${knownWords.length}개`}
              />
              <div
                className="bg-[#C45B40] h-full transition-all duration-300"
                style={{ width: `${(confusedWords.length / cardDeck.length) * 100}%` }}
                title={`헷갈린 단어: ${confusedWords.length}개`}
              />
              <div
                className="bg-[#D6D0C7] h-full transition-all duration-300"
                style={{ width: `${(unreviewedWords.length / cardDeck.length) * 100}%` }}
                title={`건너뛴 단어: ${unreviewedWords.length}개`}
              />
            </div>
            <div className="flex justify-between text-[10px] text-[#718096] px-1 font-semibold">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#E07A5F] inline-block" /> 외움 {Math.round((knownWords.length / cardDeck.length) * 100)}%
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#C45B40] inline-block" /> 헷갈림 {Math.round((confusedWords.length / cardDeck.length) * 100)}%
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#D6D0C7] inline-block" /> 건너뜀 {Math.round((unreviewedWords.length / cardDeck.length) * 100)}%
              </span>
            </div>
          </div>

          {/* 복습 대상 단어 리스트 (탭 전환) */}
          {(confusedWords.length > 0 || unreviewedWords.length > 0) && (
            <div className="text-left bg-[#FBF9F5] rounded-2xl p-4 border border-[#EDE8E1] space-y-3 max-w-md mx-auto">
              <div className="flex items-center justify-between border-b border-[#EDE8E1] pb-2">
                <span className="text-xs font-black text-[#2D3748]">
                  복습 대상 단어
                </span>
                <div className="flex items-center gap-1">
                  {confusedWords.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setReviewListTab('confused')}
                      className={`px-2 py-0.5 rounded-lg text-[10px] font-bold transition-all border ${reviewListTab === 'confused'
                        ? 'bg-[#F7EBE5] text-[#C45B40] border-[#ECCDC2]'
                        : 'bg-white text-[#718096] border-[#EDE8E1]'
                        }`}
                    >
                      헷갈림 ({confusedWords.length})
                    </button>
                  )}
                  {unreviewedWords.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setReviewListTab('skipped')}
                      className={`px-2 py-0.5 rounded-lg text-[10px] font-bold transition-all border ${reviewListTab === 'skipped'
                        ? 'bg-[#F8F6F2] text-[#2D3748] border-[#D6D0C7]'
                        : 'bg-white text-[#718096] border-[#EDE8E1]'
                        }`}
                    >
                      건너뜀 ({unreviewedWords.length})
                    </button>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-1.5 max-h-48 overflow-y-auto pr-1">
                {((reviewListTab === 'confused' && confusedWords.length > 0)
                  ? confusedWords
                  : (unreviewedWords.length > 0 ? unreviewedWords : confusedWords)
                ).map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => playCurrentSound(item.japanese)}
                    className="px-2.5 py-1 bg-white hover:bg-[#FAF9F7] active:scale-95 rounded-xl border border-[#EDE8E1] text-[#2D3748] text-xs font-bold flex items-center gap-1 transition-all shadow-2xs"
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
                ))}
              </div>
            </div>
          )}

          {/* 하단 액션 버튼 그룹 (가로 한 줄 복습 버튼 & 보조 버튼) */}
          <div className="flex flex-col gap-2 pt-2 max-w-md mx-auto">
            {/* 가로 한 줄 복습 버튼: [헷갈림 복습] [건너뜀 복습] [둘다 복습] */}
            {unfinishedWords.length > 0 && (
              <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                {/* 1. 헷갈림 복습 (브릭 틴트 - 스코어 카드와 통일) */}
                <button
                  type="button"
                  onClick={handleReviewConfused}
                  disabled={confusedWords.length === 0}
                  className={`py-3 px-1 sm:px-2.5 rounded-2xl text-[11px] sm:text-xs font-black transition-all flex items-center justify-center gap-1 sm:gap-1.5 active:scale-95 whitespace-nowrap border ${confusedWords.length === 0
                      ? 'bg-stone-50 text-stone-300 border-stone-200 cursor-not-allowed'
                      : 'bg-[#F7EBE5] hover:bg-[#F2DDD3] text-[#C45B40] border-[#ECCDC2] shadow-2xs'
                    }`}
                  title={confusedWords.length > 0 ? `헷갈린 단어 ${confusedWords.length}개 복습` : '헷갈린 단어가 없습니다'}
                >
                  <Zap className="w-3.5 h-3.5 shrink-0 text-[#C45B40]" />
                  <span>헷갈림 복습</span>
                </button>

                {/* 2. 건너뜀 복습 (웜 페이퍼 틴트 - 스코어 카드와 통일) */}
                <button
                  type="button"
                  onClick={handleReviewSkipped}
                  disabled={unreviewedWords.length === 0}
                  className={`py-3 px-1 sm:px-2.5 rounded-2xl text-[11px] sm:text-xs font-black transition-all flex items-center justify-center gap-1 sm:gap-1.5 active:scale-95 whitespace-nowrap border ${unreviewedWords.length === 0
                      ? 'bg-stone-50 text-stone-300 border-stone-200 cursor-not-allowed'
                      : 'bg-[#F8F6F2] hover:bg-[#EFECE5] text-[#556377] border-[#EDE8E1] shadow-2xs'
                    }`}
                  title={unreviewedWords.length > 0 ? `건너뛴 단어 ${unreviewedWords.length}개 복습` : '건너뛴 단어가 없습니다'}
                >
                  <BookOpen className="w-3.5 h-3.5 shrink-0 text-[#718096]" />
                  <span>건너뜀 복습</span>
                </button>

                {/* 3. 둘다 복습 (시그니처 코랄 틴트 - 스코어 카드와 통일) */}
                <button
                  type="button"
                  onClick={handleReviewUnfinished}
                  disabled={unfinishedWords.length === 0}
                  className={`py-3 px-1 sm:px-2.5 rounded-2xl text-[11px] sm:text-xs font-black transition-all flex items-center justify-center gap-1 sm:gap-1.5 active:scale-95 whitespace-nowrap border ${unfinishedWords.length === 0
                      ? 'bg-stone-50 text-stone-300 border-stone-200 cursor-not-allowed'
                      : 'bg-[#FAF0E6] hover:bg-[#F4DDD4] text-[#E07A5F] border-[#F4DDD4] shadow-2xs'
                    }`}
                  title={`미완료 단어(헷갈림+건너뜀) ${unfinishedWords.length}개 전체 복습`}
                >
                  <Target className="w-3.5 h-3.5 shrink-0 text-[#E07A5F]" />
                  <span>둘다 복습</span>
                </button>
              </div>
            )}

            {/* 보조 액션 버튼들 */}
            <div className="flex flex-col sm:flex-row items-center gap-2 pt-1">
              <button
                type="button"
                onClick={handleRestartSession}
                className="w-full sm:flex-1 py-3 px-4 rounded-2xl bg-stone-100 hover:bg-stone-200 text-[#2D3748] text-xs font-bold transition-all flex items-center justify-center gap-1.5 active:scale-98"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>처음부터 다시 학습</span>
              </button>

              {onCompleteToNextStep && (
                <button
                  type="button"
                  onClick={onCompleteToNextStep}
                  className="w-full sm:flex-1 py-3 px-4 rounded-2xl bg-[#E07A5F] hover:bg-[#C45B40] text-white text-xs font-bold shadow-xs transition-all flex items-center justify-center gap-1.5 active:scale-98"
                >
                  <span>다음 단계 (첫 발화)로</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* 기록 초기화 옵션 */}
            {(knownWordIds.size > 0 || confusedWordIds.size > 0) && (
              <div className="pt-1">
                <button
                  type="button"
                  onClick={handleResetProgress}
                  className="text-[11px] font-semibold text-[#A0AEC0] hover:text-[#E07A5F] underline underline-offset-4 transition-colors"
                >
                  학습 기록 전체 초기화
                </button>
              </div>
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
                      className={`text-7xl sm:text-8xl md:text-9xl font-bold text-[#2D3748] tracking-widest leading-none drop-shadow-xs transition-all ${currentFontStyle === 'serif' ? 'font-jp-mincho' : 'font-jp-gothic'
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
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold transition-all border ${isPlayingSound
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
                          className={`text-5xl sm:text-6xl font-bold text-[#2D3748] tracking-wider transition-all ${currentFontStyle === 'serif' ? 'font-jp-mincho' : 'font-jp-gothic'
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

          {/* 3. 하단 액션 버튼 컨트롤러 */}
          <div className="space-y-2">
            {isFlipped ? (
              /* 카드가 뒤집혔을 때: 헷갈려요 vs 외웠어요 평가 버튼 */
              <div className="grid grid-cols-2 gap-2.5 animate-fadeIn">
                <button
                  type="button"
                  onClick={() => handleGradeCard(false)}
                  disabled={isSliding}
                  className="py-3 px-4 rounded-2xl bg-white hover:bg-[#FAF9F7] text-[#4A5568] border-2 border-[#EDE8E1] text-xs font-black transition-all flex items-center justify-center gap-2 active:scale-95 shadow-2xs"
                >
                  <RotateCcw className="w-4 h-4 text-[#718096]" />
                  <span>헷갈려요</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleGradeCard(true)}
                  disabled={isSliding}
                  className="py-3 px-4 rounded-2xl bg-[#E07A5F] hover:bg-[#C45B40] text-white text-xs font-black transition-all flex items-center justify-center gap-2 active:scale-95 shadow-xs"
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
                  onClick={handlePrevCard}
                  disabled={currentIndex === 0 || isSliding}
                  className="p-3 rounded-2xl bg-white border border-[#EDE8E1] text-[#718096] hover:bg-[#FAF9F7] disabled:opacity-30 disabled:pointer-events-none transition-all shadow-2xs"
                  title="이전 카드"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={handleFlip}
                  disabled={isSliding}
                  className="flex-1 py-3 px-4 rounded-2xl bg-[#E07A5F] hover:bg-[#C55D42] text-white text-xs font-black transition-all flex items-center justify-center gap-1.5 shadow-xs active:scale-[0.99]"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>정답 확인하기 (탭)</span>
                </button>

                <button
                  type="button"
                  onClick={handleNextCard}
                  disabled={isSliding}
                  className="p-3 rounded-2xl bg-white border border-[#EDE8E1] text-[#718096] hover:bg-[#FAF9F7] disabled:opacity-30 disabled:pointer-events-none transition-all shadow-2xs"
                  title={currentIndex === cardDeck.length - 1 ? '학습 완료 및 결과 보기' : '다음 카드'}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 실행 취소(Undo) 지원 스낵바 토스트 (DESIGN.md 웜 페이퍼 톤 & 하단 버튼 가림 방지 상단 배치) */}
      {toast && (
        <div className="fixed top-20 sm:top-24 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-sm animate-in fade-in slide-in-from-top-3 duration-200">
          <div className="flex items-center justify-between gap-2.5 px-4 py-3 rounded-2xl bg-white/95 backdrop-blur-md text-[#2D3748] shadow-lg shadow-[#2D3748]/8 border border-[#EDE8E1] text-xs">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-6 h-6 rounded-full bg-[#FAF0E6] flex items-center justify-center shrink-0 text-[#E07A5F]">
                <RotateCcw className="w-3.5 h-3.5" />
              </div>
              <span className="truncate font-bold text-[#2D3748]">{toast.message}</span>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              {toast.onUndo && (
                <button
                  type="button"
                  onClick={() => {
                    toast.onUndo?.();
                    setToast(null);
                  }}
                  className="px-2.5 py-1 rounded-xl bg-[#FAF0E6] hover:bg-[#F4DDD4] text-[#E07A5F] border border-[#F4DDD4] font-black text-[11px] transition-all active:scale-95 shadow-2xs"
                >
                  되돌리기
                </button>
              )}
              <button
                type="button"
                onClick={() => setToast(null)}
                className="text-[#A0AEC0] hover:text-[#718096] p-1 rounded-full transition-colors"
                title="닫기"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
