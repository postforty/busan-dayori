'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { RotateCcw, Trophy, Check } from 'lucide-react';
import { KATAKANA_MATCH_PAIRS, KatakanaMatchPair, playKatakanaAudio } from '@/lib/curriculum/katakanaData';

interface MatchCard {
  id: string; // 고유 ID (left-xxx, right-xxx)
  pairId: string;
  char: string;
  type: 'hiragana' | 'katakana';
  romaji: string;
  korean: string;
}

type Difficulty = 'easy' | 'medium' | 'hard';

const DIFFICULTY_CONFIG: Record<
  Difficulty,
  { label: string; pairsCount: number; badge: string }
> = {
  easy: { label: '초급 (4쌍)', pairsCount: 4, badge: '🌱 입문' },
  medium: { label: '중급 (6쌍)', pairsCount: 6, badge: '🌿 도전' },
  hard: { label: '고급 (8쌍)', pairsCount: 8, badge: '👑 마스터' },
};

interface ConnectionLine {
  pairId: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

interface KatakanaMatchGameProps {
  fontStyle?: 'sans' | 'serif';
}

export default function KatakanaMatchGame({ fontStyle = 'sans' }: KatakanaMatchGameProps = {}) {
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [pairs, setPairs] = useState<KatakanaMatchPair[]>([]);
  const [leftCards, setLeftCards] = useState<MatchCard[]>([]);
  const [rightCards, setRightCards] = useState<MatchCard[]>([]);

  // 선택 상태
  const [selectedLeftId, setSelectedLeftId] = useState<string | null>(null);
  const [selectedRightId, setSelectedRightId] = useState<string | null>(null);

  // 일치 완료된 pairId 목록
  const [matchedPairIds, setMatchedPairIds] = useState<string[]>([]);

  // 오답 흔들림 효과용 카드 ID
  const [shakeCardIds, setShakeCardIds] = useState<string[]>([]);

  // 진행 상태 통계
  const [attempts, setAttempts] = useState(0);
  const [gameStartTime, setGameStartTime] = useState<number | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  // SVG 연결선 좌표 목록
  const [lines, setLines] = useState<ConnectionLine[]>([]);

  // 보드 및 앵커 참조
  const boardRef = useRef<HTMLDivElement | null>(null);
  const leftAnchorsRef = useRef<Map<string, HTMLDivElement>>(new Map());
  const rightAnchorsRef = useRef<Map<string, HTMLDivElement>>(new Map());

  // 게임 초기화
  const startNewGame = useCallback((diff: Difficulty = difficulty) => {
    const config = DIFFICULTY_CONFIG[diff];
    const shuffledPool = [...KATAKANA_MATCH_PAIRS].sort(() => Math.random() - 0.5);
    const selected = shuffledPool.slice(0, config.pairsCount);

    const left: MatchCard[] = selected.map((p) => ({
      id: `left-${p.id}`,
      pairId: p.id,
      char: p.hiragana,
      type: 'hiragana' as const,
      romaji: p.romaji,
      korean: p.korean,
    }));

    // 오른쪽 가타카나는 별도로 무작위 셔플
    const right: MatchCard[] = selected
      .map((p) => ({
        id: `right-${p.id}`,
        pairId: p.id,
        char: p.katakana,
        type: 'katakana' as const,
        romaji: p.romaji,
        korean: p.korean,
      }))
      .sort(() => Math.random() - 0.5);

    setPairs(selected);
    setLeftCards(left);
    setRightCards(right);
    setSelectedLeftId(null);
    setSelectedRightId(null);
    setMatchedPairIds([]);
    setShakeCardIds([]);
    setAttempts(0);
    setIsCompleted(false);
    setLines([]);
    setGameStartTime(Date.now());
    setElapsedSeconds(0);
  }, [difficulty]);

  useEffect(() => {
    startNewGame(difficulty);
  }, [difficulty, startNewGame]);

  // 타이머
  useEffect(() => {
    if (!gameStartTime || isCompleted) return;
    const interval = setInterval(() => {
      setElapsedSeconds(Math.floor((Date.now() - gameStartTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [gameStartTime, isCompleted]);

  // SVG 선 좌표 계산
  const updateLines = useCallback(() => {
    if (!boardRef.current) return;
    const boardRect = boardRef.current.getBoundingClientRect();

    const newLines: ConnectionLine[] = [];
    matchedPairIds.forEach((pairId) => {
      const leftEl = leftAnchorsRef.current.get(pairId);
      const rightEl = rightAnchorsRef.current.get(pairId);

      if (leftEl && rightEl) {
        const leftRect = leftEl.getBoundingClientRect();
        const rightRect = rightEl.getBoundingClientRect();

        newLines.push({
          pairId,
          x1: leftRect.left + leftRect.width / 2 - boardRect.left,
          y1: leftRect.top + leftRect.height / 2 - boardRect.top,
          x2: rightRect.left + rightRect.width / 2 - boardRect.left,
          y2: rightRect.top + rightRect.height / 2 - boardRect.top,
        });
      }
    });

    setLines(newLines);
  }, [matchedPairIds]);

  // 창 크기 조절 및 매칭 변경 시 선 업데이트
  useEffect(() => {
    const frame = requestAnimationFrame(updateLines);
    window.addEventListener('resize', updateLines);

    let observer: ResizeObserver | null = null;
    if (boardRef.current) {
      observer = new ResizeObserver(() => {
        updateLines();
      });
      observer.observe(boardRef.current);
    }

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', updateLines);
      if (observer) observer.disconnect();
    };
  }, [updateLines]);

  // 왼쪽(히라가나) 카드 클릭
  const handleLeftClick = (card: MatchCard) => {
    if (matchedPairIds.includes(card.pairId)) return;
    if (shakeCardIds.length > 0) return;

    // 이미 선택된 상태라면 선택 해제
    if (selectedLeftId === card.id) {
      setSelectedLeftId(null);
      return;
    }

    // 소리 재생
    playKatakanaAudio(card.char);

    // 만약 오른쪽 가타카나가 이미 선택되어 있다면 짝 검사
    if (selectedRightId) {
      const rightCard = rightCards.find((c) => c.id === selectedRightId);
      if (rightCard) {
        setAttempts((prev) => prev + 1);
        if (card.pairId === rightCard.pairId) {
          // 정답!
          const nextMatched = [...matchedPairIds, card.pairId];
          setMatchedPairIds(nextMatched);
          setSelectedLeftId(null);
          setSelectedRightId(null);

          if (nextMatched.length === DIFFICULTY_CONFIG[difficulty].pairsCount) {
            setIsCompleted(true);
          }
        } else {
          // 오답!
          setShakeCardIds([card.id, rightCard.id]);
          setTimeout(() => {
            setShakeCardIds([]);
            setSelectedLeftId(null);
            setSelectedRightId(null);
          }, 500);
        }
        return;
      }
    }

    setSelectedLeftId(card.id);
  };

  // 오른쪽(가타카나) 카드 클릭
  const handleRightClick = (card: MatchCard) => {
    if (matchedPairIds.includes(card.pairId)) return;
    if (shakeCardIds.length > 0) return;

    // 이미 선택된 상태라면 선택 해제
    if (selectedRightId === card.id) {
      setSelectedRightId(null);
      return;
    }

    // 소리 재생
    playKatakanaAudio(card.char);

    // 만약 왼쪽 히라가나가 이미 선택되어 있다면 짝 검사
    if (selectedLeftId) {
      const leftCard = leftCards.find((c) => c.id === selectedLeftId);
      if (leftCard) {
        setAttempts((prev) => prev + 1);
        if (card.pairId === leftCard.pairId) {
          // 정답!
          const nextMatched = [...matchedPairIds, card.pairId];
          setMatchedPairIds(nextMatched);
          setSelectedLeftId(null);
          setSelectedRightId(null);

          if (nextMatched.length === DIFFICULTY_CONFIG[difficulty].pairsCount) {
            setIsCompleted(true);
          }
        } else {
          // 오답!
          setShakeCardIds([card.id, leftCard.id]);
          setTimeout(() => {
            setShakeCardIds([]);
            setSelectedLeftId(null);
            setSelectedRightId(null);
          }, 500);
        }
        return;
      }
    }

    setSelectedRightId(card.id);
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
                히라가나 ⇄ 가타카나 선잇기 매칭
              </h3>
            </div>
            <p className="text-xs text-[#718096] mt-1">
              왼쪽의 히라가나와 오른쪽의 같은 소리 가타카나를 터치하여 짝을 연결해보세요.
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

        {/* 진행 스코어보드 (가타카나 메인색 #3D5A80 적극 적용) */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#F2ECE4]">
          <div className="p-2.5 rounded-2xl bg-[#F0F7FF] border border-[#C5D9F2]/50 text-center">
            <span className="text-[11px] text-[#3D5A80] font-bold block">연결한 짝</span>
            <div className="text-base font-black text-[#3D5A80] mt-0.5">
              {matchedPairIds.length} / {currentConfig.pairsCount}
            </div>
          </div>
          <div className="p-2.5 rounded-2xl bg-[#FAF9F7] border border-[#EDE8E1] text-center">
            <span className="text-[11px] text-[#718096] font-medium block">시도 횟수</span>
            <div className="text-base font-black text-[#2D3748] mt-0.5">
              {attempts}회
            </div>
          </div>
          <div className="p-2.5 rounded-2xl bg-[#FAF9F7] border border-[#EDE8E1] text-center">
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
            🎉 미션 완료! 완벽하게 짝을 연결했어요!
          </h4>
          <p className="text-xs text-[#718096] mt-1.5 max-w-md mx-auto">
            {elapsedSeconds}초 동안 {attempts}번의 시도로 모든 히라가나와 가타카나 짝을 완벽히 마스터했습니다.
          </p>

          {/* 복습용 정답 단어장 요약 */}
          <div className="mt-4 p-3 bg-white/80 rounded-2xl border border-[#EDE8E1] max-w-lg mx-auto">
            <span className="text-[11px] font-bold text-[#3D5A80] block mb-2">
              📖 오늘 맞춘 글자 발음 확인
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {pairs.map((p) => (
                <div
                  key={p.id}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#F0F7FF] rounded-xl border border-[#C5D9F2] text-xs"
                >
                  <span className="font-bold text-[#E07A5F]">{p.hiragana}</span>
                  <span className="text-[#A0AEC0] text-[10px]">⇄</span>
                  <span className="font-bold text-[#3D5A80]">{p.katakana}</span>
                  <span className="text-[11px] text-[#718096] font-medium ml-0.5">
                    ({p.romaji} [{p.korean}])
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 flex items-center justify-center gap-2">
            <button
              onClick={() => startNewGame(difficulty)}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-2xl bg-[#3D5A80] hover:bg-[#2B3E58] text-white text-xs font-bold transition-all shadow-sm active:scale-95"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>한 번 더 도전하기</span>
            </button>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 선잇기 플레이 보드 영역 (좌우 2열 및 중앙 SVG 연결선) */}
      {/* ============================================================== */}
      <div
        ref={boardRef}
        className="relative bg-white rounded-3xl p-4 sm:p-6 border border-[#EDE8E1] shadow-2xs select-none"
      >
        {/* SVG 연결선 레이어 */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
          {lines.map((line) => {
            const dx = Math.abs(line.x2 - line.x1) * 0.45;
            const pathD = `M ${line.x1} ${line.y1} C ${line.x1 + dx} ${line.y1}, ${line.x2 - dx} ${line.y2}, ${line.x2} ${line.y2}`;
            return (
              <g key={line.pairId}>
                {/* 외곽 부드러운 글로우 */}
                <path
                  d={pathD}
                  fill="none"
                  stroke="#3D5A80"
                  strokeWidth="6"
                  strokeOpacity="0.15"
                  strokeLinecap="round"
                />
                {/* 메인 선 */}
                <path
                  d={pathD}
                  fill="none"
                  stroke="#3D5A80"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  className="transition-all duration-300"
                />
              </g>
            );
          })}
        </svg>

        {/* 컬럼 상단 헤더 */}
        <div className="grid grid-cols-2 gap-8 sm:gap-14 mb-4">
          <div className="flex items-center justify-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF6F1] border border-[#F4DDD4] text-[#E07A5F] text-[11px] font-bold shadow-2xs">
              <span>히라가나</span>
              <span className="text-[10px] text-[#A0AEC0] font-normal">ひらがな</span>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F0F7FF] border border-[#C5D9F2] text-[#3D5A80] text-[11px] font-bold shadow-2xs">
              <span>가타카나</span>
              <span className="text-[10px] text-[#A0AEC0] font-normal">カタカナ</span>
            </div>
          </div>
        </div>

        {/* 좌우 카드 목록 그리드 (높이 완벽 균일화: h-14 sm:h-16) */}
        <div className="grid grid-cols-2 gap-8 sm:gap-14 relative z-0">
          {/* 왼쪽 열: 히라가나 카드들 */}
          <div className="space-y-3">
            {leftCards.map((card) => {
              const isMatched = matchedPairIds.includes(card.pairId);
              const isSelected = selectedLeftId === card.id;
              const isShaking = shakeCardIds.includes(card.id);

              return (
                <div key={card.id} className="relative flex items-center">
                  <button
                    onClick={() => handleLeftClick(card)}
                    disabled={isMatched}
                    className={`w-full h-14 sm:h-16 rounded-2xl flex items-center justify-center transition-all duration-200 relative ${
                      isShaking
                        ? 'bg-red-50 border-2 border-red-400 text-red-500 animate-pulse'
                        : isMatched
                        ? 'bg-[#F0F7FF] border-2 border-[#3D5A80] text-[#3D5A80] shadow-2xs opacity-90 cursor-default'
                        : isSelected
                        ? 'bg-[#FFF6F1] border-2 border-[#E07A5F] text-[#E07A5F] shadow-sm ring-2 ring-[#E07A5F]/20 scale-[1.02]'
                        : 'bg-white border-2 border-[#EDE8E1] hover:border-[#E07A5F]/60 text-[#2D3748] hover:shadow-xs active:scale-98'
                    }`}
                  >
                    {/* 카드 본문: 글자만 깔끔하게 노출 (발음기호 제외!) */}
                    <span
                      className={`text-2xl sm:text-3xl font-bold tracking-tight transition-transform ${
                        fontStyle === 'serif' ? 'font-jp-mincho' : 'font-jp-gothic'
                      }`}
                      style={{
                        fontFamily:
                          fontStyle === 'serif'
                            ? "'Noto Serif JP', 'Yu Mincho', serif"
                            : "'Klee One', 'Noto Sans JP', sans-serif",
                      }}
                    >
                      {card.char}
                    </span>

                    {/* 일치 완료 체크 뱃지 */}
                    {isMatched && (
                      <span className="absolute top-1.5 left-2 text-[#3D5A80]">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </button>

                  {/* 오른쪽 앵커 포인트 (선이 연결되는 점) */}
                  <div
                    ref={(el) => {
                      if (el) leftAnchorsRef.current.set(card.pairId, el);
                      else leftAnchorsRef.current.delete(card.pairId);
                    }}
                    className={`absolute -right-2 w-3.5 h-3.5 rounded-full border-2 transition-all duration-200 z-20 pointer-events-none flex items-center justify-center ${
                      isMatched
                        ? 'bg-[#3D5A80] border-white ring-2 ring-[#3D5A80]/40'
                        : isSelected
                        ? 'bg-[#E07A5F] border-white ring-4 ring-[#E07A5F]/30 scale-125'
                        : 'bg-[#EDE8E1] border-white'
                    }`}
                  >
                    {isMatched && <span className="w-1 h-1 rounded-full bg-white" />}
                  </div>
                </div>
              );
            })}
          </div>

          {/* 오른쪽 열: 가타카나 카드들 */}
          <div className="space-y-3">
            {rightCards.map((card) => {
              const isMatched = matchedPairIds.includes(card.pairId);
              const isSelected = selectedRightId === card.id;
              const isShaking = shakeCardIds.includes(card.id);

              return (
                <div key={card.id} className="relative flex items-center">
                  {/* 왼쪽 앵커 포인트 (선이 연결되는 점) */}
                  <div
                    ref={(el) => {
                      if (el) rightAnchorsRef.current.set(card.pairId, el);
                      else rightAnchorsRef.current.delete(card.pairId);
                    }}
                    className={`absolute -left-2 w-3.5 h-3.5 rounded-full border-2 transition-all duration-200 z-20 pointer-events-none flex items-center justify-center ${
                      isMatched
                        ? 'bg-[#3D5A80] border-white ring-2 ring-[#3D5A80]/40'
                        : isSelected
                        ? 'bg-[#3D5A80] border-white ring-4 ring-[#3D5A80]/30 scale-125'
                        : 'bg-[#EDE8E1] border-white'
                    }`}
                  >
                    {isMatched && <span className="w-1 h-1 rounded-full bg-white" />}
                  </div>

                  <button
                    onClick={() => handleRightClick(card)}
                    disabled={isMatched}
                    className={`w-full h-14 sm:h-16 rounded-2xl flex items-center justify-center transition-all duration-200 relative ${
                      isShaking
                        ? 'bg-red-50 border-2 border-red-400 text-red-500 animate-pulse'
                        : isMatched
                        ? 'bg-[#F0F7FF] border-2 border-[#3D5A80] text-[#3D5A80] shadow-2xs opacity-90 cursor-default'
                        : isSelected
                        ? 'bg-[#F0F7FF] border-2 border-[#3D5A80] text-[#3D5A80] shadow-sm ring-2 ring-[#3D5A80]/20 scale-[1.02]'
                        : 'bg-white border-2 border-[#EDE8E1] hover:border-[#3D5A80]/60 text-[#2D3748] hover:shadow-xs active:scale-98'
                    }`}
                  >
                    {/* 카드 본문: 글자만 깔끔하게 노출 (발음기호 제외!) */}
                    <span
                      className={`text-2xl sm:text-3xl font-bold tracking-tight transition-transform ${
                        fontStyle === 'serif' ? 'font-jp-mincho' : 'font-jp-gothic'
                      }`}
                      style={{
                        fontFamily:
                          fontStyle === 'serif'
                            ? "'Noto Serif JP', 'Yu Mincho', serif"
                            : "'Klee One', 'Noto Sans JP', sans-serif",
                      }}
                    >
                      {card.char}
                    </span>

                    {/* 일치 완료 체크 뱃지 */}
                    {isMatched && (
                      <span className="absolute top-1.5 right-2 text-[#3D5A80]">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 리셋 버튼 */}
      <div className="flex justify-center pt-2">
        <button
          onClick={() => startNewGame(difficulty)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-white border border-[#EDE8E1] hover:bg-[#FAF9F7] text-xs font-bold text-[#718096] hover:text-[#3D5A80] hover:border-[#C5D9F2] transition-all shadow-2xs active:scale-95"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>새 문제로 다시 섞기</span>
        </button>
      </div>
    </div>
  );
}
