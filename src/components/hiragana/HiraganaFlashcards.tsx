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
  ArrowRight
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

// 필터 옵션
type FilterCategory = 'all' | 'confusing' | 'row' | 'wrong';

interface HiraganaFlashcardsProps {
  onCompleteToNextStep?: () => void;
}

export default function HiraganaFlashcards({
  onCompleteToNextStep
}: HiraganaFlashcardsProps) {
  // --- 상태 관리 ---
  const [filterType, setFilterType] = useState<FilterCategory>('all');
  const [selectedRow, setSelectedRow] = useState<string>('あ');
  const [studyMode, setStudyMode] = useState<'charToSound' | 'soundToChar'>('charToSound');
  const [autoSpeech, setAutoSpeech] = useState(true);

  // 카드 목록 및 진행 상태
  const [cardDeck, setCardDeck] = useState<HiraganaChar[]>(ALL_HIRAGANA_CHARS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isPlayingSound, setIsPlayingSound] = useState(false);

  // 학습 세션 결과 (외운 글자 / 헷갈린 글자)
  const [knownCharIds, setKnownCharIds] = useState<Set<string>>(new Set());
  const [confusedCharIds, setConfusedCharIds] = useState<Set<string>>(new Set());
  const [isSessionFinished, setIsSessionFinished] = useState(false);

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

  // 필터 변경 시 덱 재구성
  const handleFilterChange = (type: FilterCategory, row?: string) => {
    stopJapaneseSpeech();
    setFilterType(type);
    if (row) setSelectedRow(row);

    const newDeck = prepareDeck(type, row || selectedRow, confusedCharIds);
    setCardDeck(newDeck);
    setCurrentIndex(0);
    setIsFlipped(false);
    setKnownCharIds(new Set());
    setConfusedCharIds(new Set());
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

  // 다음 카드로 이동 (알아요 / 헷갈려요)
  const handleGradeCard = useCallback(
    (isKnown: boolean) => {
      stopJapaneseSpeech();
      if (!currentCard) return;

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

      // 마지막 카드인 경우 세션 종료
      if (currentIndex >= cardDeck.length - 1) {
        setIsSessionFinished(true);
      } else {
        setCurrentIndex((prev) => prev + 1);
        setIsFlipped(false);
      }
    },
    [currentCard, currentIndex, cardDeck.length]
  );

  // 이전 카드로 이동
  const handlePrevCard = useCallback(() => {
    if (currentIndex > 0) {
      stopJapaneseSpeech();
      setCurrentIndex((prev) => prev - 1);
      setIsFlipped(false);
    }
  }, [currentIndex]);

  // 다음 카드로 단순 이동
  const handleNextCard = useCallback(() => {
    if (currentIndex < cardDeck.length - 1) {
      stopJapaneseSpeech();
      setCurrentIndex((prev) => prev + 1);
      setIsFlipped(false);
    }
  }, [currentIndex, cardDeck.length]);

  // --- 스와이프(좌우 쓸어넘기기) 및 드래그 제스처 상태 및 핸들러 ---
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const touchStartPos = useRef<{ x: number; y: number } | null>(null);
  const didSwipeRef = useRef(false);

  // 모바일 터치 제스처
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartPos.current = { x: touch.clientX, y: touch.clientY };
    setIsDragging(true);
    didSwipeRef.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartPos.current) return;
    const touch = e.touches[0];
    const deltaX = touch.clientX - touchStartPos.current.x;
    const deltaY = touch.clientY - touchStartPos.current.y;

    // 수평 이동 거리가 수직 이동보다 클 때만 스와이프 모션 적용
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      const dampened = Math.max(-100, Math.min(100, deltaX * 0.75));
      setDragOffset(dampened);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartPos.current) return;
    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStartPos.current.x;
    const deltaY = touch.clientY - touchStartPos.current.y;

    touchStartPos.current = null;
    setIsDragging(false);
    setDragOffset(0);

    // 수평 이동 거리가 45px 이상이고 수직보다 클 때 넘기기
    if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY)) {
      didSwipeRef.current = true;
      if (deltaX < 0) {
        // 오른쪽 -> 왼쪽: 다음 카드
        handleNextCard();
      } else {
        // 왼쪽 -> 오른쪽: 이전 카드
        handlePrevCard();
      }
    }
  };

  // 데스크톱 마우스 드래그 지원
  const handleMouseDown = (e: React.MouseEvent) => {
    // 버튼이나 인터랙티브 엘리먼트 클릭 시 드래그 시작 무시
    if ((e.target as HTMLElement).closest('button')) return;
    touchStartPos.current = { x: e.clientX, y: e.clientY };
    setIsDragging(true);
    didSwipeRef.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !touchStartPos.current) return;
    const deltaX = e.clientX - touchStartPos.current.x;
    const deltaY = e.clientY - touchStartPos.current.y;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      const dampened = Math.max(-100, Math.min(100, deltaX * 0.75));
      setDragOffset(dampened);
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging || !touchStartPos.current) return;
    const deltaX = e.clientX - touchStartPos.current.x;
    const deltaY = e.clientY - touchStartPos.current.y;

    touchStartPos.current = null;
    setIsDragging(false);
    setDragOffset(0);

    if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY)) {
      didSwipeRef.current = true;
      if (deltaX < 0) {
        handleNextCard();
      } else {
        handlePrevCard();
      }
    }
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      touchStartPos.current = null;
      setIsDragging(false);
      setDragOffset(0);
    }
  };

  // 카드 클릭/탭 핸들러 (스와이프 완료 시 불필요한 뒤집힘 방지)
  const handleCardClick = () => {
    if (didSwipeRef.current) {
      didSwipeRef.current = false;
      return;
    }
    handleFlip();
  };

  // 세션 다시 시작
  const handleRestartSession = () => {
    stopJapaneseSpeech();
    setCurrentIndex(0);
    setIsFlipped(false);
    setKnownCharIds(new Set());
    setConfusedCharIds(new Set());
    setIsSessionFinished(false);
  };

  // 헷갈린 글자만 다시 학습
  const handleReviewConfused = () => {
    stopJapaneseSpeech();
    const wrongDeck = ALL_HIRAGANA_CHARS.filter((c) => confusedCharIds.has(c.char));
    if (wrongDeck.length === 0) return;

    setFilterType('wrong');
    setCardDeck(wrongDeck);
    setCurrentIndex(0);
    setIsFlipped(false);
    setKnownCharIds(new Set());
    // 헷갈린 글자 목록 유지하면서 재도전
    setIsSessionFinished(false);
  };

  // 키보드 단축키 지원 (스페이스바: 뒤집기, 화살표/1/2번)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // 폼 입력 중일 땐 무시
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        handleFlip();
      } else if (e.key === '1' || e.key === 'ArrowLeft') {
        if (isFlipped) {
          e.preventDefault();
          handleGradeCard(false); // 헷갈려요
        }
      } else if (e.key === '2' || e.key === 'ArrowRight') {
        if (isFlipped) {
          e.preventDefault();
          handleGradeCard(true); // 알아요
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleFlip, handleGradeCard, isFlipped]);

  // 진행률 계산
  const progressPercent = Math.round(
    ((currentIndex + (isSessionFinished ? 1 : 0)) / cardDeck.length) * 100
  );

  return (
    <section className="space-y-4">
      {/* 1. 상단 컨트롤 패널 (학습 범위 & 모드 설정) */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-[#EDE8E1] shadow-xs space-y-3.5">
        <div className="flex flex-wrap items-center justify-between gap-2.5">
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

          {/* 모드 전환 (글자 ➔ 소리 vs 소리 ➔ 글자) */}
          <div className="flex items-center bg-[#FAF9F7] p-1 rounded-2xl border border-[#EDE8E1] text-[11px] font-bold">
            <button
              type="button"
              onClick={() => {
                setStudyMode('charToSound');
                setIsFlipped(false);
              }}
              className={`px-2.5 py-1 rounded-xl transition-all ${
                studyMode === 'charToSound'
                  ? 'bg-[#E07A5F] text-white shadow-2xs'
                  : 'text-[#718096] hover:text-[#2D3748]'
              }`}
            >
              글자 ➔ 소리
            </button>
            <button
              type="button"
              onClick={() => {
                setStudyMode('soundToChar');
                setIsFlipped(false);
              }}
              className={`px-2.5 py-1 rounded-xl transition-all ${
                studyMode === 'soundToChar'
                  ? 'bg-[#E07A5F] text-white shadow-2xs'
                  : 'text-[#718096] hover:text-[#2D3748]'
              }`}
            >
              소리 ➔ 글자
            </button>
          </div>
        </div>

        {/* 범위 선택 탭 필터 */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1 pb-0.5">
          <button
            type="button"
            onClick={() => handleFilterChange('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all border ${
              filterType === 'all'
                ? 'bg-[#2D3748] text-white border-[#2D3748] shadow-2xs'
                : 'bg-white text-[#718096] border-[#EDE8E1] hover:bg-[#FAF9F7]'
            }`}
          >
            전체 46자
          </button>

          <button
            type="button"
            onClick={() => handleFilterChange('confusing')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all border flex items-center gap-1 ${
              filterType === 'confusing'
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
                className={`px-2.5 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all border ${
                  isSelected
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
              className={`px-3 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all border flex items-center gap-1 ${
                filterType === 'wrong'
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
            <div className="flex items-center gap-2 text-[11px] font-bold">
              <span className="text-[#E07A5F] flex items-center gap-0.5 bg-[#FAF0E6] px-2 py-0.5 rounded-full border border-[#F4DDD4]">
                <Check className="w-3 h-3 text-[#E07A5F]" /> {knownCharIds.size}
              </span>
              <span className="text-[#718096] flex items-center gap-0.5 bg-stone-100 px-2 py-0.5 rounded-full border border-[#EDE8E1]">
                <RotateCcw className="w-3 h-3 text-[#718096]" /> {confusedCharIds.size}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1">
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
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EDE8E1] shadow-xs text-center space-y-5">
          <div className="w-16 h-16 bg-gradient-to-tr from-amber-100 to-rose-100 text-[#E07A5F] rounded-full flex items-center justify-center mx-auto shadow-inner">
            <Sparkles className="w-8 h-8" />
          </div>

          <div className="space-y-1.5">
            <h3 className="text-xl font-black text-[#2D3748]">
              플래시 암기 세션 완료! 🎉
            </h3>
            <p className="text-xs text-[#718096]">
              선택한 카드를 모두 학습했습니다. 틀린 글자를 바로 복습하면 장기 기억으로 전환됩니다.
            </p>
          </div>

          {/* 스코어 카드 */}
          <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto">
            <div className="p-3.5 bg-[#FAF0E6] rounded-2xl border border-[#F4DDD4]">
              <span className="text-[11px] font-bold text-[#E07A5F]">외운 글자</span>
              <p className="text-2xl font-black text-[#E07A5F] mt-0.5">
                {knownCharIds.size} <span className="text-xs font-semibold">자</span>
              </p>
            </div>
            <div className="p-3.5 bg-stone-50 rounded-2xl border border-[#EDE8E1]">
              <span className="text-[11px] font-bold text-[#718096]">헷갈린 글자</span>
              <p className="text-2xl font-black text-[#4A5568] mt-0.5">
                {confusedCharIds.size} <span className="text-xs font-semibold">자</span>
              </p>
            </div>
          </div>

          {/* 헷갈린 글자 칩 리스트 */}
          {confusedCharIds.size > 0 && (
            <div className="space-y-2 pt-2">
              <p className="text-xs font-bold text-[#718096]">
                다시 확인할 헷갈린 글자 목록:
              </p>
              <div className="flex flex-wrap items-center justify-center gap-1.5">
                {Array.from(confusedCharIds).map((char) => {
                  const item = ALL_HIRAGANA_CHARS.find((c) => c.char === char);
                  return (
                    <button
                      key={char}
                      type="button"
                      onClick={() => playCurrentSound(char)}
                      className="px-2.5 py-1 bg-white hover:bg-[#FAF9F7] rounded-xl border border-[#EDE8E1] text-[#2D3748] text-xs font-bold flex items-center gap-1 transition-all"
                    >
                      <span>{char}</span>
                      <span className="text-[10px] text-[#718096] font-normal">
                        ({item?.koreanSound})
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 하단 액션 버튼 그룹 */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-2">
            {confusedCharIds.size > 0 && (
              <button
                type="button"
                onClick={handleReviewConfused}
                className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-[#3D5A80] hover:bg-[#2F4563] text-white text-xs font-bold shadow-xs transition-all flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>헷갈린 글자만 다시 복습 ({confusedCharIds.size})</span>
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
                <span>다음 단계 (미니 단어)로</span>
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
            className="w-full min-h-[340px] select-none cursor-pointer touch-pan-y relative"
            style={{ perspective: '1200px' }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onClick={handleCardClick}
          >
            {/* 스와이프 방향 피드백 인디케이터 배지 */}
            {dragOffset < -25 && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-[#E07A5F] text-white px-3.5 py-1.5 rounded-full text-xs font-black shadow-lg pointer-events-none flex items-center gap-1.5 animate-bounce">
                <span>다음 글자</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            )}
            {dragOffset > 25 && (
              <div className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-[#2D3748] text-white px-3.5 py-1.5 rounded-full text-xs font-black shadow-lg pointer-events-none flex items-center gap-1.5 animate-bounce">
                <ChevronLeft className="w-4 h-4" />
                <span>이전 글자</span>
              </div>
            )}

            {/* 좌우 이동 및 살짝 기울어지는 모션 래퍼 */}
            <div
              className="w-full h-full min-h-[340px]"
              style={{
                transform: `translateX(${dragOffset}px) rotate(${dragOffset * 0.04}deg)`,
                transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)'
              }}
            >
              <div
                className="relative w-full h-full min-h-[340px] rounded-3xl transition-transform duration-500"
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
                    {currentCard.row}행 • {currentCard.strokeCount}획
                  </span>

                  <span className="text-[11px] font-semibold text-[#E07A5F] bg-[#FFF4EE] px-2 py-0.5 rounded-full border border-[#F4DDD4]">
                    {studyMode === 'charToSound' ? '글자를 보고 읽기' : '소리를 듣고 글자 맞히기'}
                  </span>
                </div>

                {/* 중앙 메인 콘텐츠 */}
                <div className="my-auto py-4 flex flex-col items-center justify-center">
                  {studyMode === 'charToSound' ? (
                    <span className="text-8xl sm:text-9xl font-black text-[#2D3748] tracking-tight leading-none drop-shadow-xs font-serif">
                      {currentCard.char}
                    </span>
                  ) : (
                    <div className="flex flex-col items-center gap-3">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          playCurrentSound();
                        }}
                        className={`w-20 h-20 rounded-full flex items-center justify-center transition-all shadow-md ${
                          isPlayingSound
                            ? 'bg-[#E07A5F] text-white scale-105 animate-pulse'
                            : 'bg-amber-100 text-amber-900 hover:bg-amber-200'
                        }`}
                        title="소리 다시 듣기"
                      >
                        <Volume2 className="w-10 h-10" />
                      </button>
                      <div className="space-y-0.5">
                        <span className="text-3xl font-black text-[#2D3748]">
                          [{currentCard.koreanSound}]
                        </span>
                        <p className="text-sm font-bold text-[#718096]">
                          {currentCard.romaji}
                        </p>
                      </div>
                    </div>
                  )}
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
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold transition-all border ${
                      isPlayingSound
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
                    <span className="text-5xl font-black text-[#2D3748] font-serif">
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
                  <span>헷갈려요 (다시 볼래요)</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleGradeCard(true)}
                  className="py-3 px-4 rounded-2xl bg-[#E07A5F] hover:bg-[#C45B40] text-white text-xs font-black transition-all flex items-center justify-center gap-2 active:scale-95 shadow-xs"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>외웠어요! (다음 카드)</span>
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
                  disabled={currentIndex === cardDeck.length - 1}
                  className="p-3 rounded-2xl bg-white border border-[#EDE8E1] text-[#718096] hover:bg-[#FAF9F7] disabled:opacity-30 disabled:pointer-events-none transition-all"
                  title="다음 카드"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* 제스처 및 단축키 안내 팁 */}
            <p className="text-center text-[10px] text-[#A0AEC0]">
              💡 좌우로 쓸어 넘겨 이전/다음 • 탭하여 뒤집기 •{' '}
              <kbd className="px-1 py-0.5 bg-stone-100 rounded text-stone-600">Space</kbd> 뒤집기 •{' '}
              <kbd className="px-1 py-0.5 bg-stone-100 rounded text-stone-600">1</kbd> 헷갈려요 •{' '}
              <kbd className="px-1 py-0.5 bg-stone-100 rounded text-stone-600">2</kbd> 외웠어요
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
