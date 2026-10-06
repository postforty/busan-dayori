'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Volume2,
  CheckCircle2,
  Sparkles,
  BookOpen,
  Layers,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Coffee,
  UtensilsCrossed,
  ShoppingBag,
  Store,
  Compass,
  Lightbulb
} from 'lucide-react';
import {
  KATAKANA_TRAVEL_WORDS,
  KatakanaTravelWord,
  playKatakanaAudio
} from '@/lib/curriculum/katakanaData';

type ViewMode = 'grid' | 'flashcard';
type CategoryFilter = 'all' | 'cafe' | 'food' | 'convenience' | 'shopping' | 'travel';

const CATEGORY_TABS: { id: CategoryFilter; label: string; icon: React.FC<{ className?: string }> }[] = [
  { id: 'all', label: '전체', icon: Layers },
  { id: 'cafe', label: '카페·음료', icon: Coffee },
  { id: 'food', label: '식당·주문', icon: UtensilsCrossed },
  { id: 'convenience', label: '편의점', icon: Store },
  { id: 'shopping', label: '쇼핑', icon: ShoppingBag },
  { id: 'travel', label: '교통·호텔', icon: Compass },
];

interface TravelKatakanaWordsProps {
  fontStyle?: 'sans' | 'serif';
}

export default function TravelKatakanaWords({ fontStyle = 'sans' }: TravelKatakanaWordsProps = {}) {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [activeWordId, setActiveWordId] = useState<string | null>(null);
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // 암기 완료 상태 (로컬 스토리지)
  const [memorizedIds, setMemorizedIds] = useState<Set<string>>(() => {
    if (typeof window === 'undefined') return new Set();
    try {
      const saved = localStorage.getItem('katakana_travel_memorized_ids');
      if (saved) return new Set(JSON.parse(saved));
    } catch {
      // 무시
    }
    return new Set();
  });

  const toggleMemorized = useCallback((id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setMemorizedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      try {
        localStorage.setItem('katakana_travel_memorized_ids', JSON.stringify(Array.from(next)));
      } catch {
        // 무시
      }
      return next;
    });
  }, []);

  // 필터링된 단어 리스트
  const filteredWords = useMemo(() => {
    if (selectedCategory === 'all') return KATAKANA_TRAVEL_WORDS;
    return KATAKANA_TRAVEL_WORDS.filter((w) => w.category === selectedCategory);
  }, [selectedCategory]);

  // 카테고리 변경 시 플래시카드 인덱스 초기화
  useEffect(() => {
    setCardIndex(0);
    setIsFlipped(false);
  }, [selectedCategory]);

  const currentFlashcard = filteredWords[cardIndex] || filteredWords[0];

  const handleNextCard = () => {
    setIsFlipped(false);
    setCardIndex((prev) => (prev + 1) % filteredWords.length);
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    setCardIndex((prev) => (prev - 1 + filteredWords.length) % filteredWords.length);
  };

  return (
    <div className="space-y-6">
      {/* 상단 헤더 & 모드 전환 */}
      <div className="bg-white rounded-3xl p-5 border border-[#EDE8E1] shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#3D5A80] animate-pulse" />
              <h3 className="text-base font-black text-[#2D3748]">
                여행 실전 외래어 단어장 ({KATAKANA_TRAVEL_WORDS.length}선)
              </h3>
            </div>
            <p className="text-xs text-[#718096] mt-1">
              일본 여행 간판과 카페 메뉴판에서 가장 많이 마주치는 핵심 가타카나 단어를 체득해요.
            </p>
          </div>

          {/* 뷰 모드 스위처 (그리드 vs 플래시카드) */}
          <div className="flex items-center gap-1 p-1 bg-[#F5F2EB] rounded-2xl shrink-0 self-start sm:self-auto">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-xl font-bold transition-all ${
                viewMode === 'grid'
                  ? 'bg-white text-[#3D5A80] shadow-2xs'
                  : 'text-[#718096] hover:text-[#2D3748]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>단어 도감</span>
            </button>
            <button
              onClick={() => setViewMode('flashcard')}
              className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-xl font-bold transition-all ${
                viewMode === 'flashcard'
                  ? 'bg-white text-[#3D5A80] shadow-2xs'
                  : 'text-[#718096] hover:text-[#2D3748]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>플래시카드</span>
            </button>
          </div>
        </div>

        {/* 학습 달성률 바 */}
        <div className="pt-2 border-t border-[#F2ECE4]">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-bold text-[#718096]">외래어 정복률</span>
            <span className="font-black text-[#3D5A80]">
              {memorizedIds.size} / {KATAKANA_TRAVEL_WORDS.length} 단어 (
              {Math.round((memorizedIds.size / KATAKANA_TRAVEL_WORDS.length) * 100)}%)
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-[#FAF9F7] overflow-hidden border border-[#EDE8E1]">
            <div
              className="h-full bg-gradient-to-r from-[#3D5A80] to-[#5B84B1] rounded-full transition-all duration-500"
              style={{
                width: `${(memorizedIds.size / KATAKANA_TRAVEL_WORDS.length) * 100}%`
              }}
            />
          </div>
        </div>

        {/* 카테고리 필터 칩 */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 no-scrollbar">
          {CATEGORY_TABS.map((tab) => {
            const Icon = tab.icon;
            const isSelected = selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-[#3D5A80] text-white shadow-2xs'
                    : 'bg-[#FAF9F7] text-[#718096] hover:bg-[#F2ECE4] border border-[#EDE8E1]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 1. 단어 도감 그리드 뷰 */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {filteredWords.map((word) => {
            const isDone = memorizedIds.has(word.id);
            const isOpened = activeWordId === word.id;

            return (
              <div
                key={word.id}
                onClick={() => {
                  playKatakanaAudio(word.japanese);
                  setActiveWordId(isOpened ? null : word.id);
                }}
                className={`bg-white rounded-3xl p-4 border transition-all cursor-pointer relative group ${
                  isDone
                    ? 'border-[#C6F6D5] bg-[#F7FCF9]/60'
                    : 'border-[#EDE8E1] hover:border-[#3D5A80] hover:shadow-xs'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl shrink-0 p-1.5 bg-[#FAF9F7] rounded-2xl border border-[#EDE8E1]">
                      {word.emoji}
                    </div>
                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <span
                          className={`text-xl font-bold text-[#2D3748] tracking-tight transition-all ${
                            fontStyle === 'serif' ? 'font-jp-mincho' : 'font-jp-gothic'
                          }`}
                          style={{
                            fontFamily:
                              fontStyle === 'serif'
                                ? "'Noto Serif JP', 'Yu Mincho', serif"
                                : "'Klee One', 'Noto Sans JP', sans-serif"
                          }}
                        >
                          {word.japanese}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            playKatakanaAudio(word.japanese);
                          }}
                          className="p-1 rounded-full text-[#718096] hover:text-[#3D5A80] hover:bg-[#F0F7FF] transition-all"
                          title="소리 듣기"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs mt-0.5">
                        <span className="font-bold text-[#3D5A80]">
                          {word.koreanMeaning}
                        </span>
                        <span className="text-[11px] text-[#A0AEC0]">
                          [{word.koreanPronunciation}]
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 암기 완료 토글 */}
                  <button
                    onClick={(e) => toggleMemorized(word.id, e)}
                    className={`p-1.5 rounded-full transition-all shrink-0 ${
                      isDone
                        ? 'text-[#38A169] bg-[#EBF7EE]'
                        : 'text-[#CBD5E0] hover:text-[#718096]'
                    }`}
                    title={isDone ? '마스터 완료' : '암기 체크하기'}
                  >
                    <CheckCircle2 className="w-5 h-5" />
                  </button>
                </div>

                {/* 여행 꿀팁 영역 */}
                <div className="mt-3 pt-3 border-t border-[#F2ECE4] text-[11px] text-[#718096] leading-relaxed flex items-start gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5 text-[#D97706] shrink-0 mt-0.5" />
                  <span>{word.travelTip}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 2. 플래시카드 모드 뷰 */}
      {viewMode === 'flashcard' && currentFlashcard && (
        <div className="max-w-md mx-auto space-y-4">
          <div
            onClick={() => {
              setIsFlipped(!isFlipped);
              if (!isFlipped) playKatakanaAudio(currentFlashcard.japanese);
            }}
            className={`w-full min-h-[300px] rounded-3xl p-6 border-2 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 relative select-none ${
              isFlipped
                ? 'bg-[#F0F7FF] border-[#3D5A80] shadow-sm'
                : 'bg-white border-[#EDE8E1] hover:border-[#CBD5E0] shadow-2xs'
            }`}
          >
            {/* 카드 진행 번호 */}
            <span className="absolute top-4 left-4 text-xs font-bold text-[#A0AEC0]">
              {cardIndex + 1} / {filteredWords.length}
            </span>

            {/* 암기 완료 배지 */}
            <button
              onClick={(e) => toggleMemorized(currentFlashcard.id, e)}
              className={`absolute top-4 right-4 p-2 rounded-full transition-all ${
                memorizedIds.has(currentFlashcard.id)
                  ? 'text-[#38A169] bg-[#EBF7EE]'
                  : 'text-[#CBD5E0] hover:text-[#718096]'
              }`}
            >
              <CheckCircle2 className="w-6 h-6" />
            </button>

            {!isFlipped ? (
              /* 카드 앞면 (일본어 단어 + 이모지) */
              <div className="space-y-4">
                <div className="text-6xl">{currentFlashcard.emoji}</div>
                <div
                  className={`text-4xl sm:text-5xl font-bold text-[#2D3748] tracking-tight transition-all ${
                    fontStyle === 'serif' ? 'font-jp-mincho' : 'font-jp-gothic'
                  }`}
                  style={{
                    fontFamily:
                      fontStyle === 'serif'
                        ? "'Noto Serif JP', 'Yu Mincho', serif"
                        : "'Klee One', 'Noto Sans JP', sans-serif"
                  }}
                >
                  {currentFlashcard.japanese}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    playKatakanaAudio(currentFlashcard.japanese);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF9F7] border border-[#EDE8E1] text-xs font-bold text-[#718096] hover:text-[#3D5A80]"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>소리 듣기</span>
                </button>
                <p className="text-[11px] text-[#A0AEC0] pt-2">
                  카드를 터치하면 한국어 뜻과 여행 팁이 나와요
                </p>
              </div>
            ) : (
              /* 카드 뒷면 (한국어 뜻 + 여행 팁) */
              <div className="space-y-4">
                <div className="text-3xl font-black text-[#3D5A80]">
                  {currentFlashcard.koreanMeaning}
                </div>
                <div className="text-base font-bold text-[#718096]">
                  [{currentFlashcard.koreanPronunciation}]
                </div>
                <div className="bg-white/80 rounded-2xl p-3 border border-[#C5D9F2] text-left text-xs text-[#4A5568] leading-relaxed flex items-start gap-2">
                  <Lightbulb className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#2D3748] block mb-0.5">여행 실전 팁</span>
                    {currentFlashcard.travelTip}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 카드 네비게이션 컨트롤 */}
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={handlePrevCard}
              className="flex-1 py-3 rounded-2xl bg-white border border-[#EDE8E1] hover:bg-[#FAF9F7] text-xs font-bold text-[#2D3748] flex items-center justify-center gap-1 shadow-2xs active:scale-95"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>이전 단어</span>
            </button>
            <button
              onClick={() => {
                setIsFlipped(!isFlipped);
                if (!isFlipped) playKatakanaAudio(currentFlashcard.japanese);
              }}
              className="flex-1 py-3 rounded-2xl bg-[#F0F7FF] border border-[#C5D9F2] text-xs font-bold text-[#3D5A80] flex items-center justify-center gap-1 shadow-2xs active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              <span>뒤집기</span>
            </button>
            <button
              onClick={handleNextCard}
              className="flex-1 py-3 rounded-2xl bg-white border border-[#EDE8E1] hover:bg-[#FAF9F7] text-xs font-bold text-[#2D3748] flex items-center justify-center gap-1 shadow-2xs active:scale-95"
            >
              <span>다음 단어</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
