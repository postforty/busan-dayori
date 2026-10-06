'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Sparkles, RotateCcw, Trophy, Volume2, CheckCircle2, Flame, Award } from 'lucide-react';
import { KATAKANA_MATCH_PAIRS, KatakanaMatchPair, playKatakanaAudio } from '@/lib/curriculum/katakanaData';

interface CardItem {
  uid: string; // 고유 ID (pairId + type)
  pairId: string;
  char: string;
  type: 'hiragana' | 'katakana';
  romaji: string;
  korean: string;
  isFlipped: boolean;
  isMatched: boolean;
}

type Difficulty = 'easy' | 'medium' | 'hard';

const DIFFICULTY_CONFIG: Record<Difficulty, { label: string; pairsCount: number; gridClass: string; badge: string }> = {
  easy: { label: '초급 (4쌍)', pairsCount: 4, gridClass: 'grid-cols-4', badge: '🌱 입문' },
  medium: { label: '중급 (6쌍)', pairsCount: 6, gridClass: 'grid-cols-4 sm:grid-cols-6', badge: '🌿 도전' },
  hard: { label: '고급 (8쌍)', pairsCount: 8, gridClass: 'grid-cols-4', badge: '👑 마스터' }
};

interface KatakanaMatchGameProps {
  fontStyle?: 'sans' | 'serif';
}

export default function KatakanaMatchGame({ fontStyle = 'sans' }: KatakanaMatchGameProps = {}) {
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [cards, setCards] = useState<CardItem[]>([]);
  const [flippedUids, setFlippedUids] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [gameStartTime, setGameStartTime] = useState<number | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  // 게임 초기화
  const startNewGame = useCallback((diff: Difficulty = difficulty) => {
    const config = DIFFICULTY_CONFIG[diff];
    // 랜덤으로 n개 쌍 추출
    const shuffledPool = [...KATAKANA_MATCH_PAIRS].sort(() => Math.random() - 0.5);
    const selectedPairs = shuffledPool.slice(0, config.pairsCount);

    const generatedCards: CardItem[] = [];
    selectedPairs.forEach((pair) => {
      // 히라가나 카드
      generatedCards.push({
        uid: `${pair.id}-hira`,
        pairId: pair.id,
        char: pair.hiragana,
        type: 'hiragana',
        romaji: pair.romaji,
        korean: pair.korean,
        isFlipped: false,
        isMatched: false,
      });
      // 가타카나 카드
      generatedCards.push({
        uid: `${pair.id}-kata`,
        pairId: pair.id,
        char: pair.katakana,
        type: 'katakana',
        romaji: pair.romaji,
        korean: pair.korean,
        isFlipped: false,
        isMatched: false,
      });
    });

    // 카드 무작위 셔플
    setCards(generatedCards.sort(() => Math.random() - 0.5));
    setFlippedUids([]);
    setMoves(0);
    setMatches(0);
    setIsLocked(false);
    setIsCompleted(false);
    setGameStartTime(Date.now());
    setElapsedSeconds(0);
  }, [difficulty]);

  // 최초 시작
  useEffect(() => {
    startNewGame(difficulty);
  }, [difficulty, startNewGame]);

  // 타이머 작동
  useEffect(() => {
    if (!gameStartTime || isCompleted) return;
    const interval = setInterval(() => {
      setElapsedSeconds(Math.floor((Date.now() - gameStartTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [gameStartTime, isCompleted]);

  // 카드 클릭 핸들러
  const handleCardClick = (targetCard: CardItem) => {
    if (isLocked) return;
    if (targetCard.isFlipped || targetCard.isMatched) return;
    if (flippedUids.length >= 2) return;

    // 소리 재생
    playKatakanaAudio(targetCard.char);

    // 카드 뒤집기
    const newFlipped = [...flippedUids, targetCard.uid];
    setFlippedUids(newFlipped);

    setCards((prev) =>
      prev.map((c) => (c.uid === targetCard.uid ? { ...c, isFlipped: true } : c))
    );

    // 2장이 뒤집힌 경우 판정
    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      setIsLocked(true);

      const firstCard = cards.find((c) => c.uid === newFlipped[0]);
      const secondCard = targetCard;

      if (firstCard && firstCard.pairId === secondCard.pairId && firstCard.type !== secondCard.type) {
        // 일치 성공!
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.pairId === firstCard.pairId ? { ...c, isMatched: true, isFlipped: true } : c
            )
          );
          setFlippedUids([]);
          setIsLocked(false);
          setMatches((prev) => {
            const nextMatch = prev + 1;
            if (nextMatch === DIFFICULTY_CONFIG[difficulty].pairsCount) {
              setIsCompleted(true);
            }
            return nextMatch;
          });
        }, 500);
      } else {
        // 불일치: 1초 후 다시 뒤집기
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              newFlipped.includes(c.uid) ? { ...c, isFlipped: false } : c
            )
          );
          setFlippedUids([]);
          setIsLocked(false);
        }, 900);
      }
    }
  };

  const currentConfig = DIFFICULTY_CONFIG[difficulty];

  return (
    <div className="space-y-6">
      {/* 상단 컨트롤 및 상태 바 */}
      <div className="bg-white rounded-3xl p-5 border border-[#EDE8E1] shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#3D5A80] animate-pulse" />
              <h3 className="text-base font-black text-[#2D3748]">
                히라가나 ⇄ 가타카나 짝맞추기 게임
              </h3>
            </div>
            <p className="text-xs text-[#718096] mt-1">
              카드를 뒤집으며 같은 소리의 히라가나와 가타카나 짝을 맞춥니다.
            </p>
          </div>

          {/* 난이도 스위처 */}
          <div className="flex items-center gap-1.5 p-1 bg-[#F5F2EB] rounded-2xl shrink-0 self-start sm:self-auto">
            {(Object.keys(DIFFICULTY_CONFIG) as Difficulty[]).map((key) => {
              const cfg = DIFFICULTY_CONFIG[key];
              const isSelected = difficulty === key;
              return (
                <button
                  key={key}
                  onClick={() => {
                    setDifficulty(key);
                    startNewGame(key);
                  }}
                  className={`text-xs px-3 py-1.5 rounded-xl font-bold transition-all ${
                    isSelected
                      ? 'bg-white text-[#3D5A80] shadow-2xs scale-100'
                      : 'text-[#718096] hover:text-[#2D3748]'
                  }`}
                >
                  {cfg.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 진행 스코어보드 */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#F2ECE4]">
          <div className="p-2.5 rounded-2xl bg-[#FAF9F7] text-center">
            <span className="text-[11px] text-[#718096] font-medium block">찾은 짝</span>
            <div className="text-base font-black text-[#3D5A80] mt-0.5">
              {matches} / {currentConfig.pairsCount}
            </div>
          </div>
          <div className="p-2.5 rounded-2xl bg-[#FAF9F7] text-center">
            <span className="text-[11px] text-[#718096] font-medium block">뒤집은 횟수</span>
            <div className="text-base font-black text-[#2D3748] mt-0.5">
              {moves}회
            </div>
          </div>
          <div className="p-2.5 rounded-2xl bg-[#FAF9F7] text-center">
            <span className="text-[11px] text-[#718096] font-medium block">소요 시간</span>
            <div className="text-base font-black text-[#3D5A80] mt-0.5">
              {elapsedSeconds}초
            </div>
          </div>
        </div>
      </div>

      {/* 완료 축하 배너 */}
      {isCompleted && (
        <div className="bg-gradient-to-r from-[#F0F7FF] via-[#FAF9F7] to-[#F0F7FF] border-2 border-[#3D5A80]/30 rounded-3xl p-6 text-center shadow-xs animate-in fade-in zoom-in-95 duration-300">
          <div className="w-14 h-14 rounded-full bg-[#3D5A80]/15 flex items-center justify-center text-[#3D5A80] mx-auto mb-3 shadow-inner">
            <Trophy className="w-7 h-7" />
          </div>
          <h4 className="text-lg font-black text-[#2D3748]">
            🎉 미션 완료! 완벽하게 짝을 맞췄어요!
          </h4>
          <p className="text-xs text-[#718096] mt-1.5 max-w-md mx-auto">
            {elapsedSeconds}초 동안 {moves}번의 시도로 모든 히라가나-가타카나 쌍을 마스터했습니다.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <button
              onClick={() => startNewGame(difficulty)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-[#3D5A80] hover:bg-[#2B3E58] text-white text-xs font-bold transition-all shadow-sm active:scale-95"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>한 번 더 도전하기</span>
            </button>
          </div>
        </div>
      )}

      {/* 카드 매트릭스 그리드 */}
      <div className={`grid ${currentConfig.gridClass} gap-3 sm:gap-4`}>
        {cards.map((card) => {
          const isFlipped = card.isFlipped || card.isMatched;
          const isHiragana = card.type === 'hiragana';

          return (
            <button
              key={card.uid}
              onClick={() => handleCardClick(card)}
              disabled={isFlipped || isLocked}
              className={`aspect-square rounded-2xl sm:rounded-3xl p-2 sm:p-3 flex flex-col items-center justify-center relative transition-all duration-300 select-none ${
                card.isMatched
                  ? 'bg-[#EBF7EE] border-2 border-[#68D391] shadow-2xs scale-95 opacity-90'
                  : isFlipped
                  ? isHiragana
                    ? 'bg-[#FFF6F1] border-2 border-[#E07A5F] shadow-md ring-2 ring-[#E07A5F]/20'
                    : 'bg-[#F0F7FF] border-2 border-[#3D5A80] shadow-md ring-2 ring-[#3D5A80]/20'
                  : 'bg-white border-2 border-[#EDE8E1] hover:border-[#CBD5E0] hover:shadow-xs active:scale-95'
              }`}
            >
              {isFlipped ? (
                <>
                  {/* 카드 종류 배지 (히라가나 vs 가타카나) */}
                  <span
                    className={`absolute top-2 left-2 text-[10px] px-1.5 py-0.5 rounded-full font-bold leading-none ${
                      isHiragana
                        ? 'bg-[#E07A5F]/15 text-[#E07A5F]'
                        : 'bg-[#3D5A80]/15 text-[#3D5A80]'
                    }`}
                  >
                    {isHiragana ? '히라' : '가타'}
                  </span>

                  {card.isMatched && (
                    <span className="absolute top-2 right-2 text-[#38A169]">
                      <CheckCircle2 className="w-4 h-4" />
                    </span>
                  )}

                  {/* 글자 본문 */}
                  <div
                    className={`text-3xl sm:text-4xl font-bold text-[#2D3748] tracking-tight my-1 transition-all ${
                      fontStyle === 'serif' ? 'font-jp-mincho' : 'font-jp-gothic'
                    }`}
                    style={{
                      fontFamily:
                        fontStyle === 'serif'
                          ? "'Noto Serif JP', 'Yu Mincho', serif"
                          : "'Klee One', 'Noto Sans JP', sans-serif"
                    }}
                  >
                    {card.char}
                  </div>

                  {/* 발음 정보 */}
                  <div className="text-center mt-0.5">
                    <span className="text-[11px] font-bold text-[#718096]">
                      {card.romaji}
                    </span>
                    <span className="text-[10px] text-[#A0AEC0] ml-1">
                      [{card.korean}]
                    </span>
                  </div>
                </>
              ) : (
                /* 카드 뒷면 디자인 */
                <div className="flex flex-col items-center justify-center gap-1.5 text-[#CBD5E0]">
                  <div className="w-8 h-8 rounded-full bg-[#FAF9F7] flex items-center justify-center border border-[#EDE8E1]">
                    <Sparkles className="w-4 h-4 text-[#A0AEC0]" />
                  </div>
                  <span className="text-[10px] font-bold text-[#A0AEC0] tracking-wider uppercase">
                    ?
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* 리셋 버튼 */}
      <div className="flex justify-center pt-2">
        <button
          onClick={() => startNewGame(difficulty)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-white border border-[#EDE8E1] hover:bg-[#FAF9F7] text-xs font-bold text-[#718096] hover:text-[#2D3748] transition-all shadow-2xs active:scale-95"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>카드 새로 섞기</span>
        </button>
      </div>
    </div>
  );
}
