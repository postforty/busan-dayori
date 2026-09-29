'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  HIRAGANA_GRID,
  CONFUSING_PAIRS,
  HiraganaChar
} from '@/lib/curriculum/hiraganaData';
import { speakJapanese, stopJapaneseSpeech } from '@/utils/tts';
import {
  Volume2,
  RotateCcw,
  Shuffle,
  Sparkles,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Lightbulb,
  Pencil,
  Check,
  Layers,
  ArrowRight,
  Type,
  BookOpen,
  Target,
  Zap,
  X
} from 'lucide-react';

// 50음도 전체 글자 추출 (46자)
const ALL_HIRAGANA_CHARS: HiraganaChar[] = HIRAGANA_GRID.flatMap((r) =>
  r.chars.filter(Boolean) as HiraganaChar[]
);

// 헷갈리는 대표 글자 목록 추출 (さ, ち, れ, わ, ね, は, ほ, め, ぬ + る, ろ)
const CONFUSING_CHAR_SET = new Set<string>();
CONFUSING_PAIRS.forEach((pair) => {
  CONFUSING_CHAR_SET.add(pair.char1.char);
  CONFUSING_CHAR_SET.add(pair.char2.char);
  if (pair.char3) CONFUSING_CHAR_SET.add(pair.char3.char);
});
CONFUSING_CHAR_SET.add('る');
CONFUSING_CHAR_SET.add('ろ');

const CONFUSING_HIRAGANA_CHARS = ALL_HIRAGANA_CHARS.filter((c) =>
  CONFUSING_CHAR_SET.has(c.char)
);

// 로컬 스토리지 키 및 저장 구조
const STORAGE_KEY = 'hiragana_flashcards_study_progress';

// 필터 옵션
type FilterCategory = 'all' | 'confusing' | 'row' | 'wrong';

interface HiraganaStudyProgress {
  knownChars: string[];
  confusedChars: string[];
  filterType?: FilterCategory;
  selectedRow?: string;
  currentIndex?: number;
  deckChars?: string[];
  isSessionFinished?: boolean;
  updatedAt: number;
}

interface HiraganaFlashcardsProps {
  onCompleteToNextStep?: () => void;
  fontStyle?: 'sans' | 'serif';
  onToggleFontStyle?: () => void;
}

export default function HiraganaFlashcards({
  onCompleteToNextStep,
  fontStyle: propFontStyle,
  onToggleFontStyle
}: HiraganaFlashcardsProps) {
  // --- 상태 관리 ---
  const [filterType, setFilterType] = useState<FilterCategory>('all');
  const [selectedRow, setSelectedRow] = useState<string>('あ');
  const [autoSpeech, setAutoSpeech] = useState(true);

  // 글꼴 상태 ('sans': 고딕/정자체, 'serif': 명조/흘림체)
  const [localFontStyle, setLocalFontStyle] = useState<'sans' | 'serif'>('sans');

  // 로컬 스토리지에서 글꼴 설정 불러오기
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

  // 필터별 카드 덱 준비
  const prepareDeck = useCallback(
    (type: FilterCategory, rowName: string, wrongIds?: Set<string>) => {
      let result: HiraganaChar[] = [];
      if (type === 'all') {
        result = [...ALL_HIRAGANA_CHARS];
      } else if (type === 'confusing') {
        result = [...CONFUSING_HIRAGANA_CHARS];
      } else if (type === 'row') {
        const foundRow = HIRAGANA_GRID.find((r) => r.name.startsWith(rowName));
        result = foundRow ? (foundRow.chars.filter(Boolean) as HiraganaChar[]) : [];
      } else if (type === 'wrong' && wrongIds) {
        result = ALL_HIRAGANA_CHARS.filter((c) => wrongIds.has(c.char));
      }
      return result.length > 0 ? result : [...ALL_HIRAGANA_CHARS];
    },
    []
  );

  // 카드 목록 및 진행 상태
  const [cardDeck, setCardDeck] = useState<HiraganaChar[]>(ALL_HIRAGANA_CHARS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isPlayingSound, setIsPlayingSound] = useState(false);

  // 캐로우셀 슬라이드 애니메이션 상태
  const [slideDir, setSlideDir] = useState<'none' | 'left' | 'right'>('none');
  const [isSliding, setIsSliding] = useState(false);

  // 학습 세션 결과 (외운 글자 / 헷갈린 글자)
  const [knownCharIds, setKnownCharIds] = useState<Set<string>>(new Set());
  const [confusedCharIds, setConfusedCharIds] = useState<Set<string>>(new Set());
  const [isSessionFinished, setIsSessionFinished] = useState(false);
  const [reviewListTab, setReviewListTab] = useState<'confused' | 'skipped'>('confused');

  // 로컬 스토리지 복원 완료 여부 (초기 빈 state가 저장 데이터를 덮어쓰지 않도록 방어)
  const [isLoaded, setIsLoaded] = useState(false);

  // 1. 마운트 시 로컬 스토리지에서 학습 진행 상태 복원
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: HiraganaStudyProgress = JSON.parse(saved);
        if (Array.isArray(parsed.knownChars)) {
          setKnownCharIds(new Set(parsed.knownChars));
        }
        if (Array.isArray(parsed.confusedChars)) {
          setConfusedCharIds(new Set(parsed.confusedChars));
        }

        // 필터 및 행 복원
        let fType: FilterCategory = 'all';
        if (parsed.filterType && ['all', 'confusing', 'row', 'wrong'].includes(parsed.filterType)) {
          fType = parsed.filterType;
          setFilterType(fType);
        }
        let sRow = 'あ';
        if (parsed.selectedRow) {
          sRow = parsed.selectedRow;
          setSelectedRow(sRow);
        }

        // 덱 복원 (저장된 글자 순서 및 복습 덱 상태 보존)
        let restoredDeck: HiraganaChar[] = [];
        if (Array.isArray(parsed.deckChars) && parsed.deckChars.length > 0) {
          const charMap = new Map(ALL_HIRAGANA_CHARS.map((c) => [c.char, c]));
          restoredDeck = parsed.deckChars
            .map((char) => charMap.get(char))
            .filter((c): c is HiraganaChar => Boolean(c));
        }

        if (restoredDeck.length === 0) {
          restoredDeck = prepareDeck(fType, sRow, new Set(parsed.confusedChars || []));
        }
        setCardDeck(restoredDeck.length > 0 ? restoredDeck : [...ALL_HIRAGANA_CHARS]);

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
  }, [prepareDeck]);

  // 2. 상태 변경 시 로컬 스토리지에 자동 동기화 (복원 완료 이후에만 실행)
  useEffect(() => {
    if (!isLoaded) return;
    try {
      const data: HiraganaStudyProgress = {
        knownChars: Array.from(knownCharIds),
        confusedChars: Array.from(confusedCharIds),
        filterType,
        selectedRow,
        currentIndex,
        deckChars: cardDeck.map((c) => c.char),
        isSessionFinished,
        updatedAt: Date.now()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // 무시
    }
  }, [isLoaded, knownCharIds, confusedCharIds, filterType, selectedRow, currentIndex, cardDeck, isSessionFinished]);

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

  // 필터 변경 시 덱 재구성 (누적 학습 기록 보존)
  const handleFilterChange = (type: FilterCategory, row?: string) => {
    stopJapaneseSpeech();
    setFilterType(type);
    const targetRow = row || selectedRow;
    if (row) setSelectedRow(row);

    const newDeck = prepareDeck(type, targetRow, confusedCharIds);
    setCardDeck(newDeck);
    setCurrentIndex(0);
    setIsFlipped(false);
    setIsSessionFinished(false);
  };

  // 셔플 (순서 섞기)
  const handleShuffle = () => {
    stopJapaneseSpeech();
    const shuffled = [...cardDeck].sort(() => Math.random() - 0.5);
    setCardDeck(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  // 소리 재생
  const currentCard = cardDeck[currentIndex] || cardDeck[0];

  const playCurrentSound = useCallback((charText?: string) => {
    const textToPlay = charText || currentCard?.char;
    if (!textToPlay) return;

    setIsPlayingSound(true);
    speakJapanese(
      textToPlay,
      0.85,
      undefined,
      () => setIsPlayingSound(false)
    );
  }, [currentCard]);

  // 카드 뒤집기
  const handleFlip = useCallback(() => {
    const nextFlipped = !isFlipped;
    setIsFlipped(nextFlipped);

    // 뒤집힐 때 자동 소리 재생
    if (nextFlipped && autoSpeech) {
      playCurrentSound(currentCard?.char);
    }
  }, [isFlipped, autoSpeech, playCurrentSound, currentCard]);

  // handleGradeCard: 다음 카드로 이동 (외웠어요/헷갈려요) - 캐로우셀 슬라이드 포함
  const handleGradeCard = useCallback(
    (isKnown: boolean) => {
      stopJapaneseSpeech();
      if (!currentCard || isSliding) return;

      const charChar = currentCard.char;
      if (isKnown) {
        setKnownCharIds((prev) => new Set(prev).add(charChar));
        setConfusedCharIds((prev) => {
          const next = new Set(prev);
          next.delete(charChar);
          return next;
        });
      } else {
        setConfusedCharIds((prev) => new Set(prev).add(charChar));
      }

      if (currentIndex >= cardDeck.length - 1) {
        setIsSessionFinished(true);
      } else {
        setSlideDir('left');
        setIsSliding(true);
        setTimeout(() => {
          setCurrentIndex((prev) => prev + 1);
          setIsFlipped(false);
          setIsSliding(false);
          setSlideDir('none');
        }, 320);
      }
    },
    [currentCard, currentIndex, cardDeck.length, isSliding]
  );

  // 이전 카드로 이동 (캐로우셀 슬라이드)
  const handlePrevCard = useCallback(() => {
    if (currentIndex > 0 && !isSliding) {
      stopJapaneseSpeech();
      setSlideDir('right');
      setIsSliding(true);
      setTimeout(() => {
        setCurrentIndex((prev) => prev - 1);
        setIsFlipped(false);
        setIsSliding(false);
        setSlideDir('none');
      }, 320);
    }
  }, [currentIndex, isSliding]);

  // 다음 카드로 이동 (마지막 카드에서 다음을 누르면 세션 완료)
  const handleNextCard = useCallback(() => {
    if (isSliding) return;
    if (currentIndex >= cardDeck.length - 1) {
      stopJapaneseSpeech();
      setIsSessionFinished(true);
      return;
    }

    stopJapaneseSpeech();
    setSlideDir('left');
    setIsSliding(true);
    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      setIsFlipped(false);
      setIsSliding(false);
      setSlideDir('none');
    }, 320);
  }, [currentIndex, cardDeck.length, isSliding]);

  // --- 스와이프(좌우 쓸어넘기기) Pointer Events 핸들러 ---
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const pointerStartRef = useRef<{ x: number; y: number } | null>(null);
  const didSwipeRef = useRef(false);

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

    pointerStartRef.current = { x: e.clientX, y: e.clientY };
    setIsDragging(true);
    didSwipeRef.current = false;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !pointerStartRef.current) return;

    const deltaX = e.clientX - pointerStartRef.current.x;
    const deltaY = e.clientY - pointerStartRef.current.y;

    // 수평 이동 거리가 수직 이동보다 클 때 카드가 좌우로 반응
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      const dampened = Math.max(-140, Math.min(140, deltaX * 0.85));
      setDragOffset(dampened);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !pointerStartRef.current) return;

    const deltaX = e.clientX - pointerStartRef.current.x;
    const deltaY = e.clientY - pointerStartRef.current.y;

    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {
      // 무시
    }

    pointerStartRef.current = null;
    setIsDragging(false);
    setDragOffset(0);

    // 수평 이동 거리가 35px 이상이고 수직보다 크면 스와이프 판정
    if (Math.abs(deltaX) > 35 && Math.abs(deltaX) > Math.abs(deltaY)) {
      didSwipeRef.current = true;
      if (deltaX < 0) {
        handleNextCard();
      } else {
        handlePrevCard();
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
    pointerStartRef.current = null;
    setIsDragging(false);
    setDragOffset(0);
  };

  // 카드 클릭/탭 핸들러 (스와이프 완료 시 불필요한 뒤집힘 방지)
  const handleCardClick = () => {
    if (didSwipeRef.current) {
      didSwipeRef.current = false;
      return;
    }
    handleFlip();
  };

  // 개별 기록 초기화 (알럿 없이 즉시 초기화 & 실행 취소 토스트 제공)
  const handleResetKnownChars = () => {
    if (knownCharIds.size === 0) return;
    const backup = new Set(knownCharIds);
    const count = backup.size;
    setKnownCharIds(new Set());

    showToast(`외운 글자 (${count}자) 기록이 초기화되었습니다.`, () => {
      setKnownCharIds(backup);
    });
  };

  const handleResetConfusedChars = () => {
    if (confusedCharIds.size === 0) return;
    const backup = new Set(confusedCharIds);
    const count = backup.size;
    setConfusedCharIds(new Set());

    showToast(`헷갈린 글자 (${count}자) 기록이 초기화되었습니다.`, () => {
      setConfusedCharIds(backup);
    });
  };

  // 세션 다시 시작 (누적 기록 보존, 현재 덱 첫 카드부터)
  const handleRestartSession = () => {
    stopJapaneseSpeech();
    const original = prepareDeck(filterType, selectedRow, confusedCharIds);
    setCardDeck(original);
    setCurrentIndex(0);
    setIsFlipped(false);
    setIsSessionFinished(false);
  };

  // 글자 분류 계산
  const knownChars = cardDeck.filter((c) => knownCharIds.has(c.char));
  const confusedChars = cardDeck.filter((c) => confusedCharIds.has(c.char));
  const unreviewedChars = cardDeck.filter(
    (c) => !knownCharIds.has(c.char) && !confusedCharIds.has(c.char)
  );
  const unfinishedChars = cardDeck.filter((c) => !knownCharIds.has(c.char));

  // 🎯 미완료 글자 복습 (헷갈림 + 건너뜀)
  const handleReviewUnfinished = () => {
    stopJapaneseSpeech();
    if (unfinishedChars.length === 0) return;

    setCardDeck(unfinishedChars);
    setCurrentIndex(0);
    setIsFlipped(false);
    setIsSessionFinished(false);
  };

  // ⚡ 헷갈린 글자 복습 (누적 헷갈린 글자 전체 또는 현재 덱)
  const handleReviewConfused = () => {
    stopJapaneseSpeech();
    const wrongDeck = ALL_HIRAGANA_CHARS.filter((c) => confusedCharIds.has(c.char));
    if (wrongDeck.length === 0) return;

    setFilterType('wrong');
    setCardDeck(wrongDeck);
    setCurrentIndex(0);
    setIsFlipped(false);
    setIsSessionFinished(false);
  };

  // 📖 건너뛴 글자 복습
  const handleReviewSkipped = () => {
    stopJapaneseSpeech();
    if (unreviewedChars.length === 0) return;

    setCardDeck(unreviewedChars);
    setCurrentIndex(0);
    setIsFlipped(false);
    setIsSessionFinished(false);
  };

  // 전체 학습 기록 초기화 (알럿 없이 즉시 초기화 & 실행 취소 토스트 제공)
  const handleResetProgress = () => {
    stopJapaneseSpeech();
    const backupKnown = new Set(knownCharIds);
    const backupConfused = new Set(confusedCharIds);
    const backupFilter = filterType;
    const backupRow = selectedRow;
    const backupDeck = [...cardDeck];
    const backupIndex = currentIndex;
    const backupFinished = isSessionFinished;

    setKnownCharIds(new Set());
    setConfusedCharIds(new Set());
    setFilterType('all');
    setSelectedRow('あ');
    setCardDeck([...ALL_HIRAGANA_CHARS]);
    setCurrentIndex(0);
    setIsFlipped(false);
    setIsSessionFinished(false);

    showToast('히라가나 학습 기록을 모두 초기화했습니다.', () => {
      setKnownCharIds(backupKnown);
      setConfusedCharIds(backupConfused);
      setFilterType(backupFilter);
      setSelectedRow(backupRow);
      setCardDeck(backupDeck);
      setCurrentIndex(backupIndex);
      setIsSessionFinished(backupFinished);
    });
  };

  // 키보드 단축키 지원 (스페이스바: 뒤집기, 화살표/1/2번)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // 폼 입력 중일 땐 무시
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
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleFlip, handleGradeCard, handlePrevCard, handleNextCard, isFlipped]);

  // 진행률 계산
  const progressPercent = Math.round(
    ((currentIndex + (isSessionFinished ? 1 : 0)) / cardDeck.length) * 100
  );

  return (
    <section className="space-y-4">
      {/* 1. 상단 컨트롤 패널 (학습 범위 & 모드 설정) */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-[#EDE8E1] shadow-xs space-y-3.5">
        <div className="flex items-center justify-between gap-2.5">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-2xl bg-[#FFF4EE] text-[#E07A5F] border border-[#F4DDD4]">
              <Layers className="w-4 h-4" />
            </span>
            <div>
              <h2 className="text-sm font-black text-[#2D3748]">
                히라가나 플래시 암기 카드
              </h2>
              <p className="text-[11px] text-[#718096]">
                앞뒤로 뒤집으며 글자와 소리를 번개처럼 연결해보세요.
              </p>
            </div>
          </div>
        </div>

        {/* 범위 선택 탭 필터 */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1 pb-0.5">
          <button
            type="button"
            onClick={() => handleFilterChange('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all border ${filterType === 'all'
              ? 'bg-[#2D3748] text-white border-[#2D3748] shadow-2xs'
              : 'bg-white text-[#718096] border-[#EDE8E1] hover:bg-[#FAF9F7]'
              }`}
          >
            전체 46자
          </button>

          <button
            type="button"
            onClick={() => handleFilterChange('confusing')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all border flex items-center gap-1 ${filterType === 'confusing'
              ? 'bg-amber-600 text-white border-amber-600 shadow-2xs'
              : 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100/60'
              }`}
          >
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span>헷갈리는 도플갱어 ({CONFUSING_HIRAGANA_CHARS.length})</span>
          </button>

          {/* 행별 선택 버튼들 */}
          {HIRAGANA_GRID.map((row) => {
            const rowChar = row.chars[0]?.char || '';
            const isSelected = filterType === 'row' && selectedRow === rowChar;
            return (
              <button
                key={row.name}
                type="button"
                onClick={() => handleFilterChange('row', rowChar)}
                className={`px-2.5 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all border ${isSelected
                  ? 'bg-[#E07A5F] text-white border-[#E07A5F] shadow-2xs'
                  : 'bg-white text-[#718096] border-[#EDE8E1] hover:bg-[#FAF9F7]'
                  }`}
              >
                {row.name.split(' ')[0]}
              </button>
            );
          })}

          {confusedCharIds.size > 0 && (
            <button
              type="button"
              onClick={handleReviewConfused}
              className={`px-3 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all border flex items-center gap-1 ${filterType === 'wrong'
                ? 'bg-[#3D5A80] text-white border-[#3D5A80] shadow-2xs'
                : 'bg-stone-100 text-[#4A5568] border-[#EDE8E1] hover:bg-stone-200'
                }`}
            >
              <RotateCcw className="w-3 h-3 text-[#718096]" />
              <span>오답 복습 ({confusedCharIds.size})</span>
            </button>
          )}
        </div>

        {/* 하단 진행도 및 셔플 컨트롤 바 */}
        <div className="flex items-center justify-between pt-2 border-t border-[#EDE8E1]/80 text-xs">
          <div className="flex items-center gap-3">
            <span className="font-extrabold text-[#2D3748]">
              진행: <span className="text-[#E07A5F]">{currentIndex + 1}</span> / {cardDeck.length}
            </span>
            <div className="flex items-center gap-1.5 text-[11px] font-bold">
              <button
                type="button"
                onClick={handleResetKnownChars}
                disabled={knownCharIds.size === 0}
                className={`flex items-center gap-0.5 bg-[#FAF0E6] text-[#E07A5F] px-2 py-0.5 rounded-full border border-[#F4DDD4] transition-all ${
                  knownCharIds.size > 0
                    ? 'hover:bg-[#F4DDD4] hover:opacity-90 active:scale-95 cursor-pointer shadow-2xs'
                    : 'cursor-default opacity-70'
                }`}
                title={
                  knownCharIds.size > 0
                    ? `외운 글자 ${knownCharIds.size}자 (클릭 시 기록 초기화)`
                    : '외운 글자 0자'
                }
              >
                <Check className="w-3 h-3 text-[#E07A5F]" />
                <span>{knownCharIds.size}</span>
              </button>
              <button
                type="button"
                onClick={handleResetConfusedChars}
                disabled={confusedCharIds.size === 0}
                className={`flex items-center gap-0.5 bg-[#F7EBE5] text-[#C45B40] px-2 py-0.5 rounded-full border border-[#ECCDC2] transition-all ${
                  confusedCharIds.size > 0
                    ? 'hover:bg-[#F2DDD3] hover:opacity-90 active:scale-95 cursor-pointer shadow-2xs'
                    : 'cursor-default opacity-70'
                }`}
                title={
                  confusedCharIds.size > 0
                    ? `헷갈린 글자 ${confusedCharIds.size}자 (클릭 시 기록 초기화)`
                    : '헷갈린 글자 0자'
                }
              >
                <RotateCcw className="w-3 h-3 text-[#C45B40]" />
                <span>{confusedCharIds.size}</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {/* 글꼴 스타일 토글 (정자체 / 흘림체) */}
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
            className="bg-gradient-to-r from-[#E07A5F] to-amber-500 h-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* 2. 세션 완료 화면 vs 플래시 카드 화면 */}
      {isSessionFinished ? (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EDE8E1] shadow-xs text-center space-y-6">
          <div className="w-16 h-16 bg-gradient-to-tr from-[#FAF0E6] to-[#FFF6F1] text-[#E07A5F] rounded-full flex items-center justify-center mx-auto shadow-inner border border-[#F4DDD4]">
            <Sparkles className="w-8 h-8" />
          </div>

          <div className="space-y-1.5">
            <h3 className="text-xl font-black text-[#2D3748]">
              플래시 암기 세션 완료! 🎉
            </h3>
            <p className="text-xs text-[#718096]">
              선택한 카드를 모두 학습했습니다. 상태별로 모아 바로 복습해보세요.
            </p>
          </div>

          {/* 3분할 스코어 카드 (외움 / 헷갈림 / 건너뜀) */}
          <div className="grid grid-cols-3 gap-2.5 max-w-md mx-auto">
            {/* 1. 외운 글자 */}
            <div className="p-3 bg-[#FAF0E6] rounded-2xl border border-[#F4DDD4] text-center">
              <span className="text-[11px] font-bold text-[#E07A5F]">외운 글자</span>
              <p className="text-xl sm:text-2xl font-black text-[#E07A5F] mt-0.5">
                {knownChars.length} <span className="text-xs font-semibold">자</span>
              </p>
            </div>

            {/* 2. 헷갈린 글자 */}
            <div className="p-3 bg-[#F7EBE5] rounded-2xl border border-[#ECCDC2] text-center">
              <span className="text-[11px] font-bold text-[#C45B40]">헷갈린 글자</span>
              <p className="text-xl sm:text-2xl font-black text-[#C45B40] mt-0.5">
                {confusedChars.length} <span className="text-xs font-semibold">자</span>
              </p>
            </div>

            {/* 3. 건너뛴 글자 */}
            <div className="p-3 bg-[#F8F6F2] rounded-2xl border border-[#EDE8E1] text-center">
              <span className="text-[11px] font-bold text-[#718096]">건너뛴 글자</span>
              <p className="text-xl sm:text-2xl font-black text-[#2D3748] mt-0.5">
                {unreviewedChars.length} <span className="text-xs font-semibold">자</span>
              </p>
            </div>
          </div>

          {/* 3색 복합 진행 바 */}
          <div className="max-w-md mx-auto space-y-1.5">
            <div className="w-full bg-[#EDE8E1] rounded-full h-2 overflow-hidden flex">
              <div
                className="bg-[#E07A5F] h-full transition-all duration-300"
                style={{ width: `${cardDeck.length > 0 ? (knownChars.length / cardDeck.length) * 100 : 0}%` }}
                title={`외운 글자: ${knownChars.length}자`}
              />
              <div
                className="bg-[#C45B40] h-full transition-all duration-300"
                style={{ width: `${cardDeck.length > 0 ? (confusedChars.length / cardDeck.length) * 100 : 0}%` }}
                title={`헷갈린 글자: ${confusedChars.length}자`}
              />
              <div
                className="bg-[#D6D0C7] h-full transition-all duration-300"
                style={{ width: `${cardDeck.length > 0 ? (unreviewedChars.length / cardDeck.length) * 100 : 0}%` }}
                title={`건너뛴 글자: ${unreviewedChars.length}자`}
              />
            </div>
            <div className="flex justify-between text-[10px] text-[#718096] px-1 font-semibold">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#E07A5F] inline-block" /> 외움 {cardDeck.length > 0 ? Math.round((knownChars.length / cardDeck.length) * 100) : 0}%
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#C45B40] inline-block" /> 헷갈림 {cardDeck.length > 0 ? Math.round((confusedChars.length / cardDeck.length) * 100) : 0}%
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#D6D0C7] inline-block" /> 건너뜀 {cardDeck.length > 0 ? Math.round((unreviewedChars.length / cardDeck.length) * 100) : 0}%
              </span>
            </div>
          </div>

          {/* 복습 대상 글자 리스트 (탭 전환) */}
          {(confusedChars.length > 0 || unreviewedChars.length > 0) && (
            <div className="text-left bg-[#FBF9F5] rounded-2xl p-4 border border-[#EDE8E1] space-y-3 max-w-md mx-auto">
              <div className="flex items-center justify-between border-b border-[#EDE8E1] pb-2">
                <span className="text-xs font-black text-[#2D3748]">
                  복습 대상 글자
                </span>
                <div className="flex items-center gap-1">
                  {confusedChars.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setReviewListTab('confused')}
                      className={`px-2 py-0.5 rounded-lg text-[10px] font-bold transition-all border ${
                        reviewListTab === 'confused'
                          ? 'bg-[#F7EBE5] text-[#C45B40] border-[#ECCDC2]'
                          : 'bg-white text-[#718096] border-[#EDE8E1]'
                      }`}
                    >
                      헷갈림 ({confusedChars.length})
                    </button>
                  )}
                  {unreviewedChars.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setReviewListTab('skipped')}
                      className={`px-2 py-0.5 rounded-lg text-[10px] font-bold transition-all border ${
                        reviewListTab === 'skipped'
                          ? 'bg-[#F8F6F2] text-[#2D3748] border-[#D6D0C7]'
                          : 'bg-white text-[#718096] border-[#EDE8E1]'
                      }`}
                    >
                      건너뜀 ({unreviewedChars.length})
                    </button>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-1.5 max-h-48 overflow-y-auto pr-1">
                {((reviewListTab === 'confused' && confusedChars.length > 0)
                  ? confusedChars
                  : (unreviewedChars.length > 0 ? unreviewedChars : confusedChars)
                ).map((item) => (
                  <button
                    key={item.char}
                    type="button"
                    onClick={() => playCurrentSound(item.char)}
                    className="px-2.5 py-1 bg-white hover:bg-[#FAF9F7] active:scale-95 rounded-xl border border-[#EDE8E1] text-[#2D3748] text-xs font-bold flex items-center gap-1 transition-all shadow-2xs"
                  >
                    <span
                      className={currentFontStyle === 'serif' ? 'font-jp-mincho' : 'font-jp-gothic'}
                      style={{
                        fontFamily:
                          currentFontStyle === 'serif'
                            ? "'Noto Serif JP', 'Yu Mincho', serif"
                            : "'Klee One', 'Noto Sans JP', sans-serif"
                      }}
                    >
                      {item.char}
                    </span>
                    <span className="text-[10px] text-[#718096] font-normal">
                      ({item.koreanSound})
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 하단 액션 버튼 그룹 (가로 한 줄 복습 버튼 & 보조 버튼) */}
          <div className="flex flex-col gap-2 pt-2 max-w-md mx-auto">
            {/* 가로 한 줄 복습 버튼: [헷갈림 복습] [건너뜀 복습] [둘다 복습] */}
            {unfinishedChars.length > 0 && (
              <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                {/* 1. 헷갈림 복습 (브릭 틴트 - 스코어 카드와 통일) */}
                <button
                  type="button"
                  onClick={handleReviewConfused}
                  disabled={confusedChars.length === 0}
                  className={`py-3 px-1 sm:px-2.5 rounded-2xl text-[11px] sm:text-xs font-black transition-all flex items-center justify-center gap-1 sm:gap-1.5 active:scale-95 whitespace-nowrap border ${
                    confusedChars.length === 0
                      ? 'bg-stone-50 text-stone-300 border-stone-200 cursor-not-allowed'
                      : 'bg-[#F7EBE5] hover:bg-[#F2DDD3] text-[#C45B40] border-[#ECCDC2] shadow-2xs'
                  }`}
                  title={confusedChars.length > 0 ? `헷갈린 글자 ${confusedChars.length}자 복습` : '헷갈린 글자가 없습니다'}
                >
                  <Zap className="w-3.5 h-3.5 shrink-0 text-[#C45B40]" />
                  <span>헷갈림 복습</span>
                </button>

                {/* 2. 건너뜀 복습 (웜 페이퍼 틴트 - 스코어 카드와 통일) */}
                <button
                  type="button"
                  onClick={handleReviewSkipped}
                  disabled={unreviewedChars.length === 0}
                  className={`py-3 px-1 sm:px-2.5 rounded-2xl text-[11px] sm:text-xs font-black transition-all flex items-center justify-center gap-1 sm:gap-1.5 active:scale-95 whitespace-nowrap border ${
                    unreviewedChars.length === 0
                      ? 'bg-stone-50 text-stone-300 border-stone-200 cursor-not-allowed'
                      : 'bg-[#F8F6F2] hover:bg-[#EFECE5] text-[#556377] border-[#EDE8E1] shadow-2xs'
                  }`}
                  title={unreviewedChars.length > 0 ? `건너뛴 글자 ${unreviewedChars.length}자 복습` : '건너뛴 글자가 없습니다'}
                >
                  <BookOpen className="w-3.5 h-3.5 shrink-0 text-[#718096]" />
                  <span>건너뜀 복습</span>
                </button>

                {/* 3. 둘다 복습 (시그니처 코랄 틴트 - 스코어 카드와 통일) */}
                <button
                  type="button"
                  onClick={handleReviewUnfinished}
                  disabled={unfinishedChars.length === 0}
                  className={`py-3 px-1 sm:px-2.5 rounded-2xl text-[11px] sm:text-xs font-black transition-all flex items-center justify-center gap-1 sm:gap-1.5 active:scale-95 whitespace-nowrap border ${
                    unfinishedChars.length === 0
                      ? 'bg-stone-50 text-stone-300 border-stone-200 cursor-not-allowed'
                      : 'bg-[#FAF0E6] hover:bg-[#F4DDD4] text-[#E07A5F] border-[#F4DDD4] shadow-2xs'
                  }`}
                  title={`미완료 글자(헷갈림+건너뜀) ${unfinishedChars.length}자 전체 복습`}
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
                  <span>다음 단계 (미니 단어)로</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* 기록 초기화 옵션 */}
            {(knownCharIds.size > 0 || confusedCharIds.size > 0) && (
              <div className="pt-1 text-center">
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
            className="w-full min-h-[340px] select-none cursor-pointer touch-pan-y relative overflow-hidden"
            style={{ perspective: "1200px" }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerCancel}
            onClick={handleCardClick}
          >
            {/* 캐로우셀 슬라이드 & 드래그 모션 래퍼 */}
            <div
              key={currentIndex}
              className="w-full min-h-[340px]"
              style={{
                transform: isSliding
                  ? `translateX(${slideDir === 'left' ? '-115%' : '115%'})`
                  : `translateX(${dragOffset}px) rotate(${dragOffset * 0.025}deg)`,
                opacity: isSliding ? 0 : 1,
                transition: isSliding
                  ? 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.25s ease'
                  : isDragging ? 'none' : dragOffset !== 0 ? 'transform 0.28s cubic-bezier(0.2, 0.8, 0.2, 1)' : 'none',
              }}
            >
              <div
                className="relative w-full h-full min-h-[340px] rounded-3xl transition-transform duration-500"
                style={{
                  transformStyle: "preserve-3d",
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
                      {currentCard.row}행 • {currentCard.strokeCount}획
                    </span>
                  </div>

                  {/* 중앙 메인 콘텐츠 */}
                  <div className="my-auto py-4 flex flex-col items-center justify-center">
                    <span
                      className={`text-8xl sm:text-9xl font-bold text-[#2D3748] tracking-tight leading-none drop-shadow-xs transition-all duration-150 ${currentFontStyle === 'serif'
                        ? 'font-jp-mincho'
                        : 'font-jp-gothic'
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

                {/* =========================================
                  뒷면 (Back Card - 정답 및 해설)
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
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold">
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
                      <span>발음 듣기</span>
                    </button>
                  </div>

                  {/* 중앙 정답 상세 정보 */}
                  <div className="my-auto py-2 flex flex-col items-center gap-2 max-w-sm">
                    <div className="flex items-baseline gap-3">
                      <span
                        className={`text-5xl font-bold text-[#2D3748] transition-all duration-150 ${currentFontStyle === 'serif'
                          ? 'font-jp-mincho'
                          : 'font-jp-gothic'
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
                      <div className="text-left">
                        <span className="text-3xl font-black text-[#E07A5F]">
                          [{currentCard.koreanSound}]
                        </span>
                        <span className="text-sm font-bold text-[#718096] ml-2">
                          {currentCard.romaji}
                        </span>
                      </div>
                    </div>

                    {/* 한국인 발음 팁이 있을 경우 */}
                    {currentCard.soundTip && (
                      <div className="bg-amber-50/90 border border-amber-200/80 rounded-2xl p-2.5 text-left text-[11px] text-amber-900 leading-relaxed flex items-start gap-2 mt-1">
                        <Lightbulb className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                        <span>{currentCard.soundTip}</span>
                      </div>
                    )}

                    {/* 획순 가이드 */}
                    {currentCard.strokeGuide && (
                      <div className="bg-stone-50 border border-stone-200/80 rounded-2xl p-2.5 text-left text-[11px] text-[#718096] leading-relaxed w-full flex items-start gap-2">
                        <Pencil className="w-3.5 h-3.5 text-[#718096] shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-[#4A5568] mr-1">획순:</span>
                          <span>{currentCard.strokeGuide}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 하단 여백 균형 유지 */}
                  <div className="h-6" aria-hidden="true" />
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
                  className="py-3 px-4 rounded-2xl bg-white hover:bg-[#FAF9F7] text-[#4A5568] border-2 border-[#EDE8E1] text-xs font-black transition-all flex items-center justify-center gap-2 active:scale-95 shadow-2xs"
                >
                  <RotateCcw className="w-4 h-4 text-[#718096]" />
                  <span>헷갈려요</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleGradeCard(true)}
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
                  disabled={currentIndex === 0}
                  className="p-3 rounded-2xl bg-white border border-[#EDE8E1] text-[#718096] hover:bg-[#FAF9F7] disabled:opacity-30 disabled:pointer-events-none transition-all"
                  title="이전 카드"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={handleFlip}
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
    </section>
  );
}
