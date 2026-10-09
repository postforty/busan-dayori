'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  KATAKANA_GRID,
  KATAKANA_DAKUON_GRID,
  KATAKANA_YOUON_GRID,
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
  Type,
  ArrowRight,
  BookOpen,
  Zap,
  Layers,
  Check,
  X,
  Trash2
} from 'lucide-react';
import KatakanaMnemonicSvg from '@/components/katakana/KatakanaMnemonicSvg';
import { KATAKANA_MNEMONIC_DATA } from '@/components/katakana/mnemonics/types';

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
  const [reviewListTab, setReviewListTab] = useState<'confused' | 'skipped'>('confused');
  const [isPlayingSound, setIsPlayingSound] = useState(false);

  // 뱃지 클릭 시 글자 상세/복습 모달 ('known' | 'confused' | null)
  const [activeBadgeModal, setActiveBadgeModal] = useState<'known' | 'confused' | null>(null);

  // 슬라이드 애니메이션 제어
  const [isSliding, setIsSliding] = useState(false);
  const [slideDir, setSlideDir] = useState<'left' | 'right' | 'none'>('none');

  // 드래그 제스처
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ x: number; y: number } | null>(null);
  const didSwipeRef = useRef(false);

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
      const timer = setTimeout(() => {
        playCurrentSound();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, autoSpeech, isSessionFinished, currentCard, playCurrentSound]);

  // 다음 카드로 이동 (캐로우셀 슬라이드 - 히라가나 카드와 동일하게 다음 카드의 글자가 표시됨)
  const handleNext = useCallback(() => {
    if (isSliding) return;
    if (currentIndex >= cardDeck.length - 1) {
      setIsSessionFinished(true);
      return;
    }

    setSlideDir('left');
    setIsSliding(true);
    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      setIsFlipped(false); // ★ 스와이프 시 다음 카드의 글자(앞면) 노출!
      setIsSliding(false);
      setSlideDir('none');
    }, 320);
  }, [currentIndex, cardDeck.length, isSliding]);

  // 이전 카드로 이동 (캐로우셀 슬라이드 - 히라가나 카드와 동일하게 이전 카드의 글자가 표시됨)
  const handlePrev = useCallback(() => {
    if (currentIndex > 0 && !isSliding) {
      setSlideDir('right');
      setIsSliding(true);
      setTimeout(() => {
        setCurrentIndex((prev) => prev - 1);
        setIsFlipped(false); // ★ 스와이프 시 이전 카드의 글자(앞면) 노출!
        setIsSliding(false);
        setSlideDir('none');
      }, 320);
    }
  }, [currentIndex, isSliding]);

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

  // 글자 분류 계산 (현재 덱 기준)
  const knownCharsList = cardDeck.filter((c) => knownChars.has(c.char));
  const confusedCharsList = cardDeck.filter((c) => confusedChars.has(c.char));
  const unreviewedCharsList = cardDeck.filter(
    (c) => !knownChars.has(c.char) && !confusedChars.has(c.char)
  );

  // ✨ 외운 글자 복습
  const handleReviewKnown = useCallback(() => {
    const knownDeck = cardDeck.filter((c) => knownChars.has(c.char));
    if (knownDeck.length === 0) return;

    setCardDeck(knownDeck);
    setCurrentIndex(0);
    setIsFlipped(false);
    setIsSessionFinished(false);
  }, [cardDeck, knownChars]);

  // ⚡ 헷갈린 글자 복습
  const handleReviewConfused = useCallback(() => {
    const wrongDeck = ALL_KATAKANA_CHARS.filter((c) => confusedChars.has(c.char));
    if (wrongDeck.length === 0) return;

    setFilterType('wrong');
    setCardDeck(wrongDeck);
    setCurrentIndex(0);
    setIsFlipped(false);
    setIsSessionFinished(false);
  }, [confusedChars]);

  // 📖 건너뛴 글자 복습
  const handleReviewSkipped = useCallback(() => {
    if (unreviewedCharsList.length === 0) return;

    setCardDeck(unreviewedCharsList);
    setCurrentIndex(0);
    setIsFlipped(false);
    setIsSessionFinished(false);
  }, [unreviewedCharsList]);

  // 전체 학습 기록 초기화
  const handleResetProgress = useCallback(() => {
    setKnownChars(new Set());
    setConfusedChars(new Set());
    try {
      localStorage.removeItem(storageKey);
    } catch {
      // 무시
    }
    const deck = prepareDeck(filterType);
    setCardDeck(deck);
    setCurrentIndex(0);
    setIsFlipped(false);
    setIsSessionFinished(false);
  }, [filterType, prepareDeck, storageKey]);

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

  // 모달 대상 글자 목록
  const modalChars =
    activeBadgeModal === 'known'
      ? ALL_KATAKANA_CHARS.filter((c) => knownChars.has(c.char))
      : activeBadgeModal === 'confused'
      ? ALL_KATAKANA_CHARS.filter((c) => confusedChars.has(c.char))
      : [];

  // 모달에서 글자 복습 시작
  const handleStartReviewFromModal = useCallback(() => {
    if (modalChars.length === 0) return;
    setCardDeck(modalChars);
    setCurrentIndex(0);
    setIsFlipped(false);
    setIsSessionFinished(false);
    setActiveBadgeModal(null);
  }, [modalChars]);

  // 모달 내 단일 글자 제외
  const handleRemoveCharFromModal = useCallback(
    (charChar: string) => {
      if (activeBadgeModal === 'known') {
        const nextKnown = new Set(knownChars);
        nextKnown.delete(charChar);
        setKnownChars(nextKnown);
        saveProgress(nextKnown, confusedChars);
        if (nextKnown.size === 0) setActiveBadgeModal(null);
      } else if (activeBadgeModal === 'confused') {
        const nextConfused = new Set(confusedChars);
        nextConfused.delete(charChar);
        setConfusedChars(nextConfused);
        saveProgress(knownChars, nextConfused);
        if (nextConfused.size === 0) setActiveBadgeModal(null);
      }
    },
    [activeBadgeModal, knownChars, confusedChars, saveProgress]
  );

  // 모달 내 해당 카테고리 전체 초기화
  const handleResetFromModal = useCallback(() => {
    if (activeBadgeModal === 'known') {
      const empty = new Set<string>();
      setKnownChars(empty);
      saveProgress(empty, confusedChars);
    } else if (activeBadgeModal === 'confused') {
      const empty = new Set<string>();
      setConfusedChars(empty);
      saveProgress(knownChars, empty);
    }
    setActiveBadgeModal(null);
  }, [activeBadgeModal, knownChars, confusedChars, saveProgress]);

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
      if (activeBadgeModal) {
        if (e.key === 'Escape') {
          setActiveBadgeModal(null);
        }
        return;
      }
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
  }, [handleFlip, handleNext, handlePrev, handleMarkConfused, handleMarkKnown, isFlipped, activeBadgeModal]);

  // 포인터 터치 드래그 스와이프 제어 (히라가나 카드 스와이프 구현과 일치)
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // 내부 버튼 클릭 시 제스처 무시
    if ((e.target as HTMLElement).closest('button')) return;
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    if (isSliding) return;

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // 일부 브라우저 예외 무시
    }

    dragStartRef.current = { x: e.clientX, y: e.clientY };
    setIsDragging(true);
    didSwipeRef.current = false;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !dragStartRef.current) return;

    const deltaX = e.clientX - dragStartRef.current.x;
    const deltaY = e.clientY - dragStartRef.current.y;

    // 수평 이동 거리가 수직 이동보다 클 때 카드가 좌우로 반응
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      const dampened = Math.max(-140, Math.min(140, deltaX * 0.85));
      setDragOffset(dampened);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !dragStartRef.current) return;

    const deltaX = e.clientX - dragStartRef.current.x;
    const deltaY = e.clientY - dragStartRef.current.y;

    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {
      // 무시
    }

    dragStartRef.current = null;
    setIsDragging(false);
    setDragOffset(0);

    // 수평 이동 거리가 35px 이상이고 수직보다 크면 스와이프 판정 (다음/이전 카드의 앞면 글자 노출)
    if (Math.abs(deltaX) > 35 && Math.abs(deltaX) > Math.abs(deltaY)) {
      didSwipeRef.current = true;
      if (deltaX < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  const handlePointerCancel = (e: React.PointerEvent<HTMLDivElement>) => {
    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {
      // 무시
    }
    setIsDragging(false);
    setDragOffset(0);
    dragStartRef.current = null;
  };

  // 카드 클릭/탭 핸들러 (스와이프 시 뒤집힘 방지)
  const handleCardClick = () => {
    if (didSwipeRef.current) {
      didSwipeRef.current = false;
      return;
    }
    handleFlip();
  };

  const progressPercent =
    cardDeck.length > 0
      ? Math.round(((currentIndex + (isSessionFinished ? 1 : 0)) / cardDeck.length) * 100)
      : 0;

  return (
    <div className="w-full space-y-5 animate-in fade-in duration-200">
      {/* 1. 상단 컨트롤 패널 & 진행 바 */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-[#EDE8E1] shadow-2xs space-y-3.5">
        <div className="flex items-center justify-between gap-2.5">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-2xl bg-[#EBF3FB] text-[#3D5A80] border border-[#C5D9F2]">
              <Layers className="w-4 h-4" />
            </span>
            <div>
              <h2 className="text-sm font-black text-[#2D3748]">
                가타카나 플래시 암기 카드
              </h2>
              <p className="text-[11px] text-[#718096]">
                앞뒤로 뒤집으며 글자와 소리를 번개처럼 연결해보세요.
              </p>
            </div>
          </div>
        </div>

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
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 flex items-center gap-1 cursor-pointer ${
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

        {/* 하단 진행도 및 셔플 컨트롤 바 */}
        <div className="flex items-center justify-between pt-2 border-t border-[#EDE8E1]/80 text-xs">
          <div className="flex items-center gap-3">
            <span className="font-extrabold text-[#2D3748]">
              진행: <span className="text-[#3D5A80]">{isSessionFinished ? cardDeck.length : currentIndex + 1}</span> / {cardDeck.length}
            </span>
            <div className="flex items-center gap-1.5 text-[11px] font-bold">
              <button
                type="button"
                onClick={() => setActiveBadgeModal('known')}
                disabled={knownChars.size === 0}
                className={`flex items-center gap-0.5 bg-[#FAF0E6] text-[#E07A5F] px-2 py-0.5 rounded-full border border-[#F4DDD4] transition-all ${
                  knownChars.size > 0
                    ? 'hover:bg-[#F4DDD4] hover:opacity-90 active:scale-95 cursor-pointer shadow-2xs'
                    : 'cursor-default opacity-70'
                }`}
                title={
                  knownChars.size > 0
                    ? `외운 글자 ${knownChars.size}자 (클릭 시 목록 확인 및 복습)`
                    : '외운 글자 0자'
                }
              >
                <Check className="w-3 h-3 text-[#E07A5F]" />
                <span>{knownChars.size}</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveBadgeModal('confused')}
                disabled={confusedChars.size === 0}
                className={`flex items-center gap-0.5 bg-[#F7EBE5] text-[#C45B40] px-2 py-0.5 rounded-full border border-[#ECCDC2] transition-all ${
                  confusedChars.size > 0
                    ? 'hover:bg-[#F2DDD3] hover:opacity-90 active:scale-95 cursor-pointer shadow-2xs'
                    : 'cursor-default opacity-70'
                }`}
                title={
                  confusedChars.size > 0
                    ? `헷갈린 글자 ${confusedChars.size}자 (클릭 시 목록 확인 및 복습)`
                    : '헷갈린 글자 0자'
                }
              >
                <RotateCcw className="w-3 h-3 text-[#C45B40]" />
                <span>{confusedChars.size}</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {/* 글꼴 스타일 토글 (정자체 / 명조체) */}
            <button
              type="button"
              onClick={handleToggleFont}
              className={`px-2 py-1 rounded-xl text-[11px] font-bold transition-all border flex items-center gap-1 shadow-2xs cursor-pointer ${
                currentFontStyle === 'serif'
                  ? 'bg-[#EBF3FB] text-[#3D5A80] border-[#C5D9F2] font-serif'
                  : 'bg-white hover:bg-stone-50 text-[#4A5568] border-[#EDE8E1] font-sans'
              }`}
              title="글꼴 변경: 정자체 ⇄ 명조체"
            >
              <Type className="w-3 h-3 text-[#3D5A80]" />
              <span suppressHydrationWarning>
                {currentFontStyle === 'serif' ? '명조' : '정자'}
              </span>
            </button>

            {/* 소리 자동 재생 토글 */}
            <button
              type="button"
              onClick={() => setAutoSpeech((prev) => !prev)}
              className={`px-2 py-1 rounded-xl text-[11px] font-bold transition-all border flex items-center gap-1 cursor-pointer ${
                autoSpeech
                  ? 'bg-[#EBF3FB] text-[#3D5A80] border-[#C5D9F2]'
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
              className="px-2 py-1 rounded-xl text-[11px] font-bold bg-[#FAF9F7] hover:bg-[#F4EFEA] text-[#718096] hover:text-[#3D5A80] border border-[#EDE8E1] transition-all flex items-center gap-1 cursor-pointer shadow-2xs"
              title="카드 순서 섞기"
            >
              <Shuffle className="w-3 h-3" />
              <span className="hidden sm:inline">셔플</span>
            </button>
          </div>
        </div>

        {/* 진행률 게이지 바 */}
        <div className="w-full bg-stone-100 rounded-full h-1.5 overflow-hidden">
          <div
            className="bg-gradient-to-r from-[#3D5A80] to-[#5B84B1] h-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* 2. 세션 완료 화면 vs 플래시 카드 화면 */}
      {isSessionFinished ? (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EDE8E1] shadow-xs text-center space-y-6 animate-in zoom-in-95 duration-200">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#EBF3FB] to-[#F0F7FF] text-[#3D5A80] flex items-center justify-center mx-auto shadow-inner border border-[#C5D9F2]">
            <Sparkles className="w-8 h-8" />
          </div>

          <div className="space-y-1.5">
            <h3 className="text-xl font-black text-[#2D3748]">
              가타카나 카드 학습 완료! 🎉
            </h3>
            <p className="text-xs text-[#718096]">
              선택한 카드를 모두 학습했습니다. 상태별 카드를 누르면 바로 집중 복습을 진행합니다.
            </p>
          </div>

          {/* 3분할 스코어 카드 겸 복습 트리거 버튼 (외움 / 헷갈림 / 건너뜀) - DESIGN.md 웜톤 팔레트 적용 */}
          <div className="grid grid-cols-3 gap-2 sm:gap-2.5 max-w-md mx-auto">
            {/* 1. 외운 글자 복습 카드 */}
            <button
              type="button"
              onClick={handleReviewKnown}
              disabled={knownCharsList.length === 0}
              className={`p-2.5 sm:p-3 bg-[#FAF0E6] rounded-2xl border border-[#F4DDD4] text-center transition-all group flex flex-col items-center justify-between min-h-[104px] ${
                knownCharsList.length === 0
                  ? 'opacity-50 cursor-not-allowed'
                  : 'cursor-pointer hover:shadow-md hover:-translate-y-0.5 hover:border-[#E8C5B8] active:scale-95'
              }`}
              title={knownCharsList.length > 0 ? `외운 글자 ${knownCharsList.length}자 복습하기` : '외운 글자가 없습니다'}
            >
              <div className="flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-1 text-[11px] font-bold text-[#E07A5F] w-full">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span className="whitespace-nowrap tracking-tight">외운 글자</span>
              </div>
              <p className="text-xl sm:text-2xl font-black text-[#E07A5F] my-0.5 whitespace-nowrap">
                {knownCharsList.length} <span className="text-xs font-semibold">자</span>
              </p>
              {knownCharsList.length > 0 ? (
                <span className="inline-flex items-center justify-center gap-0.5 text-[10px] font-bold text-[#E07A5F] opacity-80 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  복습하기 ›
                </span>
              ) : (
                <span className="text-[10px] text-[#A0AEC0] whitespace-nowrap">0자</span>
              )}
            </button>

            {/* 2. 헷갈린 글자 복습 카드 */}
            <button
              type="button"
              onClick={handleReviewConfused}
              disabled={confusedCharsList.length === 0}
              className={`p-2.5 sm:p-3 bg-[#F7EBE5] rounded-2xl border border-[#ECCDC2] text-center transition-all group flex flex-col items-center justify-between min-h-[104px] ${
                confusedCharsList.length === 0
                  ? 'opacity-50 cursor-not-allowed'
                  : 'cursor-pointer hover:shadow-md hover:-translate-y-0.5 hover:border-[#DFB0A1] active:scale-95'
              }`}
              title={confusedCharsList.length > 0 ? `헷갈린 글자 ${confusedCharsList.length}자 복습하기` : '헷갈린 글자가 없습니다'}
            >
              <div className="flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-1 text-[11px] font-bold text-[#C45B40] w-full">
                <Zap className="w-3.5 h-3.5 shrink-0" />
                <span className="whitespace-nowrap tracking-tight">헷갈린 글자</span>
              </div>
              <p className="text-xl sm:text-2xl font-black text-[#C45B40] my-0.5 whitespace-nowrap">
                {confusedCharsList.length} <span className="text-xs font-semibold">자</span>
              </p>
              {confusedCharsList.length > 0 ? (
                <span className="inline-flex items-center justify-center gap-0.5 text-[10px] font-bold text-[#C45B40] opacity-80 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  복습하기 ›
                </span>
              ) : (
                <span className="text-[10px] text-[#A0AEC0] whitespace-nowrap">0자</span>
              )}
            </button>

            {/* 3. 건너뛴 글자 복습 카드 */}
            <button
              type="button"
              onClick={handleReviewSkipped}
              disabled={unreviewedCharsList.length === 0}
              className={`p-2.5 sm:p-3 bg-[#F8F6F2] rounded-2xl border border-[#EDE8E1] text-center transition-all group flex flex-col items-center justify-between min-h-[104px] ${
                unreviewedCharsList.length === 0
                  ? 'opacity-50 cursor-not-allowed'
                  : 'cursor-pointer hover:shadow-md hover:-translate-y-0.5 hover:border-[#D6D0C7] active:scale-95'
              }`}
              title={unreviewedCharsList.length > 0 ? `건너뛴 글자 ${unreviewedCharsList.length}자 복습하기` : '건너뛴 글자가 없습니다'}
            >
              <div className="flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-1 text-[11px] font-bold text-[#718096] w-full">
                <BookOpen className="w-3.5 h-3.5 shrink-0" />
                <span className="whitespace-nowrap tracking-tight">건너뛴 글자</span>
              </div>
              <p className="text-xl sm:text-2xl font-black text-[#2D3748] my-0.5 whitespace-nowrap">
                {unreviewedCharsList.length} <span className="text-xs font-semibold">자</span>
              </p>
              {unreviewedCharsList.length > 0 ? (
                <span className="inline-flex items-center justify-center gap-0.5 text-[10px] font-bold text-[#718096] opacity-80 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  복습하기 ›
                </span>
              ) : (
                <span className="text-[10px] text-[#A0AEC0] whitespace-nowrap">0자</span>
              )}
            </button>
          </div>

          {/* 3색 복합 진행 바 (DESIGN.md 웜톤 팔레트) */}
          <div className="max-w-md mx-auto space-y-1.5">
            <div className="w-full bg-[#EDE8E1] rounded-full h-2 overflow-hidden flex">
              <div
                className="bg-[#E07A5F] h-full transition-all duration-300"
                style={{ width: `${cardDeck.length > 0 ? (knownCharsList.length / cardDeck.length) * 100 : 0}%` }}
                title={`외운 글자: ${knownCharsList.length}자`}
              />
              <div
                className="bg-[#C45B40] h-full transition-all duration-300"
                style={{ width: `${cardDeck.length > 0 ? (confusedCharsList.length / cardDeck.length) * 100 : 0}%` }}
                title={`헷갈린 글자: ${confusedCharsList.length}자`}
              />
              <div
                className="bg-[#D6D0C7] h-full transition-all duration-300"
                style={{ width: `${cardDeck.length > 0 ? (unreviewedCharsList.length / cardDeck.length) * 100 : 0}%` }}
                title={`건너뛴 글자: ${unreviewedCharsList.length}자`}
              />
            </div>
            <div className="flex justify-between text-[10px] text-[#718096] px-1 font-semibold">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#E07A5F] inline-block" /> 외움 {cardDeck.length > 0 ? Math.round((knownCharsList.length / cardDeck.length) * 100) : 0}%
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#C45B40] inline-block" /> 헷갈림 {cardDeck.length > 0 ? Math.round((confusedCharsList.length / cardDeck.length) * 100) : 0}%
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#D6D0C7] inline-block" /> 건너뜀 {cardDeck.length > 0 ? Math.round((unreviewedCharsList.length / cardDeck.length) * 100) : 0}%
              </span>
            </div>
          </div>

          {/* 복습 대상 글자 리스트 (탭 전환) */}
          {(confusedCharsList.length > 0 || unreviewedCharsList.length > 0) && (
            <div className="text-left bg-[#FBF9F5] rounded-2xl p-4 border border-[#EDE8E1] space-y-3 max-w-md mx-auto">
              <div className="flex items-center justify-between border-b border-[#EDE8E1] pb-2">
                <span className="text-xs font-black text-[#2D3748]">
                  복습 대상 글자
                </span>
                <div className="flex items-center gap-1">
                  {confusedCharsList.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setReviewListTab('confused')}
                      className={`px-2 py-0.5 rounded-lg text-[10px] font-bold transition-all border cursor-pointer ${
                        reviewListTab === 'confused'
                          ? 'bg-[#F7EBE5] text-[#C45B40] border-[#ECCDC2]'
                          : 'bg-white text-[#718096] border-[#EDE8E1]'
                      }`}
                    >
                      헷갈림 ({confusedCharsList.length})
                    </button>
                  )}
                  {unreviewedCharsList.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setReviewListTab('skipped')}
                      className={`px-2 py-0.5 rounded-lg text-[10px] font-bold transition-all border cursor-pointer ${
                        reviewListTab === 'skipped'
                          ? 'bg-[#F8F6F2] text-[#2D3748] border-[#D6D0C7]'
                          : 'bg-white text-[#718096] border-[#EDE8E1]'
                      }`}
                    >
                      건너뜀 ({unreviewedCharsList.length})
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 max-h-56 overflow-y-auto pr-1">
                {((reviewListTab === 'confused' && confusedCharsList.length > 0)
                  ? confusedCharsList
                  : (unreviewedCharsList.length > 0 ? unreviewedCharsList : confusedCharsList)
                ).map((item) => (
                  <button
                    key={item.char}
                    type="button"
                    onClick={() => playKatakanaAudio(item.char)}
                    className="px-2.5 py-2 bg-white hover:bg-[#FAF9F7] active:scale-98 rounded-xl border border-[#EDE8E1] hover:border-[#C5D9F2] flex items-center justify-between gap-1 transition-all shadow-2xs group text-left cursor-pointer"
                    title={`클릭하여 '${item.char}' 발음 듣기`}
                  >
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span
                        className={`text-sm font-black text-[#2D3748] ${
                          currentFontStyle === 'serif' ? 'font-jp-mincho' : 'font-jp-gothic'
                        }`}
                      >
                        {item.char}
                      </span>
                      <span className="text-[10px] text-[#718096] truncate font-medium">
                        {item.koreanSound}
                      </span>
                    </div>
                    <Volume2 className="w-3.5 h-3.5 shrink-0 text-[#CBD5E1] group-hover:text-[#3D5A80] group-hover:scale-110 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 하단 액션 버튼 그룹 */}
          <div className="flex flex-col gap-2 pt-2 max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row items-center gap-2 pt-1">
              <button
                type="button"
                onClick={handleRestart}
                className="w-full sm:flex-1 py-3 px-4 rounded-2xl bg-stone-100 hover:bg-stone-200 text-[#2D3748] text-xs font-bold transition-all flex items-center justify-center gap-1.5 active:scale-98 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>처음부터 다시 학습</span>
              </button>

              {onCompleteToNextStep && (
                <button
                  type="button"
                  onClick={onCompleteToNextStep}
                  className="w-full sm:flex-1 py-3 px-4 rounded-2xl bg-[#3D5A80] hover:bg-[#2B3E58] text-white text-xs font-bold shadow-xs transition-all flex items-center justify-center gap-1.5 active:scale-98 cursor-pointer"
                >
                  <span>다음 학습 단계로</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* 기록 초기화 옵션 */}
            {(knownChars.size > 0 || confusedChars.size > 0) && (
              <div className="pt-1 text-center">
                <button
                  type="button"
                  onClick={handleResetProgress}
                  className="text-[11px] font-semibold text-[#A0AEC0] hover:text-[#E07A5F] underline underline-offset-4 transition-colors cursor-pointer"
                >
                  학습 기록 전체 초기화
                </button>
              </div>
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
              onClick={handleCardClick}
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
                    className="absolute inset-0 w-full h-full bg-gradient-to-b from-[#F8FAFD] via-white to-[#F0F4F8] rounded-3xl p-5 sm:p-7 border-2 border-[#3D5A80]/40 shadow-2xs flex flex-col justify-between items-center text-center touch-pan-y"
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

                    {/* 중앙 정답 상세 정보 */}
                    <div className="my-auto py-2 flex flex-col items-center gap-2 max-w-sm w-full">
                      {/* 가타카나 전용 연상 기억법(Visual Mnemonic) 그림 카드 렌더링 */}
                      {KATAKANA_MNEMONIC_DATA[currentCard.char] ? (
                        <KatakanaMnemonicSvg
                          char={currentCard.char}
                          koreanSound={currentCard.koreanSound}
                          romaji={currentCard.romaji}
                          fontStyle={currentFontStyle}
                        />
                      ) : (
                        <>
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

                          {/* 획순 및 발음 팁 (그림 카드가 없는 글자에만 표시) */}
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
                        </>
                      )}
                    </div>

                    {/* 하단 여백 균형 유지 */}
                    <div className="h-6" aria-hidden="true" />
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

      {/* 뱃지 상세 모달 (외운 글자 / 헷갈린 글자 목록 및 복습/초기화) */}
      {activeBadgeModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setActiveBadgeModal(null)}
        >
          <div
            className="bg-white rounded-3xl p-5 max-w-sm w-full border border-[#EDE8E1] shadow-xl space-y-4 animate-in zoom-in-95 duration-200 max-h-[85vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 모달 헤더 */}
            <div className="flex items-center justify-between border-b border-[#EDE8E1] pb-3 shrink-0">
              <div className="flex items-center gap-2">
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${
                    activeBadgeModal === 'known'
                      ? 'bg-[#FAF0E6] text-[#E07A5F]'
                      : 'bg-[#F7EBE5] text-[#C45B40]'
                  }`}
                >
                  {activeBadgeModal === 'known' ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <RotateCcw className="w-4 h-4" />
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-black text-[#2D3748] flex items-center gap-1.5">
                    <span>
                      {activeBadgeModal === 'known' ? '외운 글자' : '헷갈린 글자'}
                    </span>
                    <span className="text-xs font-semibold text-[#718096]">
                      ({modalChars.length}자)
                    </span>
                  </h3>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveBadgeModal(null)}
                className="text-[#A0AEC0] hover:text-[#718096] p-1.5 rounded-full transition-colors cursor-pointer"
                title="닫기"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* 설명 */}
            <p className="text-xs text-[#718096] shrink-0">
              {activeBadgeModal === 'known'
                ? '외운 글자로 분류된 목록입니다. 발음을 듣거나 복습할 수 있습니다.'
                : '학습 중 헷갈렸던 글자 목록입니다. 다시 복습해보세요.'}
            </p>

            {/* 글자 리스트 */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-1 min-h-[120px]">
              {modalChars.length === 0 ? (
                <div className="py-8 text-center text-xs text-[#A0AEC0]">
                  목록에 글자가 없습니다.
                </div>
              ) : (
                modalChars.map((item) => (
                  <div
                    key={item.char}
                    className="flex items-center justify-between p-2.5 rounded-2xl bg-[#FAF9F7] border border-[#EDE8E1] hover:bg-[#F4EFEA]/60 transition-colors"
                  >
                    <div className="flex items-center gap-2 min-w-0 flex-1 mr-2">
                      <span
                        className={`text-xl font-black text-[#2D3748] shrink-0 w-7 text-center ${
                          currentFontStyle === 'serif' ? 'font-jp-mincho' : 'font-jp-gothic'
                        }`}
                      >
                        {item.char}
                      </span>
                      <div className="flex items-baseline gap-1.5 min-w-0 flex-1 truncate">
                        <span className="font-bold text-xs text-[#2D3748] shrink-0">
                          [{item.koreanSound}]
                        </span>
                        <span className="text-[10px] text-[#A0AEC0] font-mono shrink-0">
                          {item.romaji}
                        </span>
                        <span className="text-[11px] font-semibold text-[#718096] truncate">
                          {item.row.endsWith('행') ? item.row : `${item.row}행`}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      {/* 발음 듣기 */}
                      <button
                        type="button"
                        onClick={() => playKatakanaAudio(item.char)}
                        className="p-1.5 rounded-xl bg-white hover:bg-stone-100 text-[#718096] hover:text-[#3D5A80] border border-[#EDE8E1] transition-colors cursor-pointer"
                        title="발음 듣기"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                      {/* 개별 제외 */}
                      <button
                        type="button"
                        onClick={() => handleRemoveCharFromModal(item.char)}
                        className="p-1.5 rounded-xl bg-white hover:bg-rose-50 text-[#A0AEC0] hover:text-rose-500 border border-[#EDE8E1] transition-colors cursor-pointer"
                        title="목록에서 제외"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* 하단 액션 버튼 */}
            <div className="pt-2 border-t border-[#EDE8E1] flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handleResetFromModal}
                disabled={modalChars.length === 0}
                className="flex-1 py-2.5 px-3 rounded-2xl bg-[#FAF9F7] hover:bg-rose-50 text-[#718096] hover:text-rose-600 border border-[#EDE8E1] hover:border-rose-200 text-xs font-bold transition-all flex items-center justify-center gap-1.5 active:scale-[0.98] disabled:opacity-40 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>초기화</span>
              </button>

              <button
                type="button"
                onClick={handleStartReviewFromModal}
                disabled={modalChars.length === 0}
                className="flex-1 py-2.5 px-3 rounded-2xl bg-[#3D5A80] hover:bg-[#2B3E58] text-white text-xs font-black transition-all flex items-center justify-center gap-1.5 shadow-xs active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>복습</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
