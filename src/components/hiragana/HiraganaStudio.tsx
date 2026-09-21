'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  HIRAGANA_GRID,
  MINI_WORDS,
  CONFUSING_PAIRS,
  FIRST_DIALOGUE_LIST,
  HiraganaChar,
  MiniWord,
  FirstDialogueItem
} from '@/lib/curriculum/hiraganaData';
import { speakJapanese, stopJapaneseSpeech } from '@/utils/tts';
import {
  Volume2,
  VolumeX,
  Pencil,
  RotateCcw,
  Sparkles,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  BookOpen,
  HelpCircle,
  Eye,
  EyeOff,
  Flame,
  ChevronRight,
  Compass
} from 'lucide-react';

type StudioStep = 'sound' | 'write' | 'words' | 'dialogue';

const ALL_HIRAGANA_CHARS: HiraganaChar[] = HIRAGANA_GRID.flatMap((r) =>
  r.chars.filter(Boolean) as HiraganaChar[]
);

interface HiraganaStudioProps {
  initialStep?: StudioStep;
  initialChar?: string;
}

export default function HiraganaStudio({
  initialStep = 'sound',
  initialChar = 'あ'
}: HiraganaStudioProps) {
  const [currentStep, setCurrentStep] = useState<StudioStep>(initialStep);

  // --- Step 1: 소리 탐색 상태 ---
  const [selectedChar, setSelectedChar] = useState<HiraganaChar>(() => {
    for (const r of HIRAGANA_GRID) {
      for (const c of r.chars) {
        if (c && c.char === initialChar) return c;
      }
    }
    return HIRAGANA_GRID[0].chars[0]!;
  });
  const [playingChar, setPlayingChar] = useState<string | null>(null);

  // --- Step 2: 인터랙티브 캔버스 쓰기 상태 ---
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [penColor, setPenColor] = useState<string>('#2D3748');
  const [strokeWidth, setStrokeWidth] = useState<number>(10);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [drawnStrokes, setDrawnStrokes] = useState<number>(0);
  const [isCharCompleted, setIsCharCompleted] = useState<boolean>(false);
  const [completedChars, setCompletedChars] = useState<string[]>([]);
  const autoNextTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [selectedConfusingIndex, setSelectedConfusingIndex] = useState(0);

  // 획 정확도 검증(Pixel Mask Matching) 상태
  const charMaskRef = useRef<ImageData | null>(null);
  const strokePointsRef = useRef<{ x: number; y: number }[]>([]);
  const [accuracyFeedback, setAccuracyFeedback] = useState<string | null>(null);
  const feedbackTimerRef = useRef<NodeJS.Timeout | null>(null);

  // --- Step 3: 미니 단어 상태 ---
  const [selectedWord, setSelectedWord] = useState<MiniWord>(MINI_WORDS[0]);
  const [playingWordId, setPlayingWordId] = useState<string | null>(null);

  // --- Step 4: 첫 발화 상태 ---
  const [showKoreanPronunciation, setShowKoreanPronunciation] = useState(false);
  const [playingDialogueId, setPlayingDialogueId] = useState<string | null>(null);
  const [completedDialogueIds, setCompletedDialogueIds] = useState<string[]>([]);

  // 정확도 피드백 토스트 표시 헬퍼
  const showAccuracyFeedback = useCallback((message: string) => {
    if (feedbackTimerRef.current) {
      clearTimeout(feedbackTimerRef.current);
    }
    setAccuracyFeedback(message);
    feedbackTimerRef.current = setTimeout(() => {
      setAccuracyFeedback(null);
      feedbackTimerRef.current = null;
    }, 1800);
  }, []);

  // 소리 재생 핸들러
  const handlePlayCharSound = useCallback((charItem: HiraganaChar) => {
    setPlayingChar(charItem.char);
    speakJapanese(
      charItem.char,
      0.85,
      undefined,
      () => setPlayingChar(null)
    );
  }, []);

  const handlePlayWordSound = useCallback((word: MiniWord) => {
    setPlayingWordId(word.id);
    speakJapanese(
      word.japanese,
      0.8,
      undefined,
      () => setPlayingWordId(null)
    );
  }, []);

  const handlePlayDialogueSound = useCallback((item: FirstDialogueItem) => {
    setPlayingDialogueId(item.id);
    speakJapanese(
      item.japanese,
      0.85,
      undefined,
      () => {
        setPlayingDialogueId(null);
        setCompletedDialogueIds((prev) =>
          prev.includes(item.id) ? prev : [...prev, item.id]
        );
      }
    );
  }, []);

  // 캔버스 초기화 및 리사이징
  const clearCanvas = useCallback(() => {
    if (autoNextTimerRef.current) {
      clearTimeout(autoNextTimerRef.current);
      autoNextTimerRef.current = null;
    }
    if (feedbackTimerRef.current) {
      clearTimeout(feedbackTimerRef.current);
      feedbackTimerRef.current = null;
    }
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
    setDrawnStrokes(0);
    setIsCharCompleted(false);
    setAccuracyFeedback(null);
    strokePointsRef.current = [];
  }, []);

  // 가이드 글자 오프스크린 픽셀 마스크 생성
  const updateCharMask = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const width = Math.round(rect.width);
    const height = Math.round(rect.height);
    if (width === 0 || height === 0) return;

    const offscreen = document.createElement('canvas');
    offscreen.width = width;
    offscreen.height = height;
    const ctx = offscreen.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    ctx.font = '900 160px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#000000';
    ctx.fillText(selectedChar.char, width / 2, height / 2);

    charMaskRef.current = ctx.getImageData(0, 0, width, height);
  }, [selectedChar]);

  // 글자 변경 시 캔버스 초기화 및 마스크 갱신
  useEffect(() => {
    clearCanvas();
    updateCharMask();
  }, [selectedChar, clearCanvas, updateCharMask]);

  // 언마운트 시 자동 전환 타이머 및 피드백 타이머 정리
  useEffect(() => {
    return () => {
      if (autoNextTimerRef.current) {
        clearTimeout(autoNextTimerRef.current);
      }
      if (feedbackTimerRef.current) {
        clearTimeout(feedbackTimerRef.current);
      }
    };
  }, []);

  // 캔버스 초기 설정
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
    }
    updateCharMask();
  }, [currentStep, updateCharMask]);

  // 드로잉 좌표 계산
  const getCoordinates = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const startDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (isCharCompleted) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.setPointerCapture(e.pointerId);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = penColor;
    ctx.lineWidth = strokeWidth;

    strokePointsRef.current = [{ x, y }];
    setIsDrawing(true);
    setHasDrawn(true);
  };

  const draw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.lineTo(x, y);
    ctx.stroke();

    strokePointsRef.current.push({ x, y });
  };

  const stopDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (canvas) {
      try {
        canvas.releasePointerCapture(e.pointerId);
      } catch {
        // 이미 릴리즈된 경우 무시
      }
    }
    setIsDrawing(false);

    const points = strokePointsRef.current;
    strokePointsRef.current = [];

    // 1. 최소 길이 검증 (단순 클릭/오터치 무시)
    let totalLength = 0;
    for (let i = 1; i < points.length; i++) {
      totalLength += Math.hypot(points[i].x - points[i - 1].x, points[i].y - points[i - 1].y);
    }
    if (totalLength < 25) {
      showAccuracyFeedback('선을 조금 더 길게 그어보세요 ✍️');
      return;
    }

    // 2. 가이드 글자 오프스크린 픽셀 마스크와의 일치도(적중률) 검사
    const mask = charMaskRef.current;
    if (mask) {
      const { width, height, data } = mask;
      const tolerance = 26; // 글자 획 허용 오차 반경 (px)
      const step = Math.max(1, Math.floor(points.length / 40));
      let hitCount = 0;
      let sampledCount = 0;

      for (let i = 0; i < points.length; i += step) {
        const pt = points[i];
        sampledCount++;
        const px = Math.round(pt.x);
        const py = Math.round(pt.y);

        let hit = false;
        for (let dy = -tolerance; dy <= tolerance; dy += 4) {
          for (let dx = -tolerance; dx <= tolerance; dx += 4) {
            if (dx * dx + dy * dy <= tolerance * tolerance) {
              const nx = px + dx;
              const ny = py + dy;
              if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
                if (data[(ny * width + nx) * 4 + 3] > 40) {
                  hit = true;
                  break;
                }
              }
            }
          }
          if (hit) break;
        }
        if (hit) hitCount++;
      }

      const hitRate = sampledCount > 0 ? hitCount / sampledCount : 0;
      // 글자 획 위의 적중률이 55% 미만이면 유효한 획으로 인정하지 않음
      if (hitRate < 0.55) {
        showAccuracyFeedback('가이드 글자 위를 따라 그려보세요 ✍️');
        return;
      }
    }

    // 정확하게 그린 획인 경우 피드백 클리어 및 획수 1 증가
    setAccuracyFeedback(null);
    const nextStrokes = drawnStrokes + 1;
    setDrawnStrokes(nextStrokes);

    if (nextStrokes >= selectedChar.strokeCount && !isCharCompleted) {
      setIsCharCompleted(true);
      setCompletedChars((prev) =>
        prev.includes(selectedChar.char) ? prev : [...prev, selectedChar.char]
      );

      // 완성 순간 해당 글자의 일본어 원어민 발음(TTS) 자동 재생
      speakJapanese(selectedChar.char, 0.85);

      // 이전 타이머 취소 후 1.5초 뒤 다음 글자로 자동 이동
      if (autoNextTimerRef.current) {
        clearTimeout(autoNextTimerRef.current);
      }

      const currIdx = ALL_HIRAGANA_CHARS.findIndex((c) => c.char === selectedChar.char);
      if (currIdx >= 0 && currIdx < ALL_HIRAGANA_CHARS.length - 1) {
        const nextChar = ALL_HIRAGANA_CHARS[currIdx + 1];
        autoNextTimerRef.current = setTimeout(() => {
          setSelectedChar(nextChar);
          autoNextTimerRef.current = null;
        }, 1500);
      }
    }
  };

  return (
    <div className="px-4 pt-4 pb-28 space-y-6 max-w-xl mx-auto min-h-screen">
      {/* 1. 상단 인트로 헤더 */}
      <section className="bg-gradient-to-br from-[#FFF9F2] via-[#FAF0E6] to-[#F5EBE1] rounded-3xl p-5 border border-[#F4DDD4] shadow-xs relative overflow-hidden">
        <div className="flex items-center justify-between gap-2 mb-3">
          <Link
            href="/roadmap"
            className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#E07A5F] hover:text-[#C55D42] bg-white/80 backdrop-blur-sm px-2.5 py-1 rounded-full border border-[#F4DDD4] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>로드맵으로 돌아가기</span>
          </Link>

          <div className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-100 text-amber-800 rounded-full text-[11px] font-black border border-amber-300 shadow-2xs">
            <Sparkles className="w-3 h-3 text-amber-600" />
            <span>Lv.0 입문 스튜디오</span>
          </div>
        </div>

        <h1 className="text-xl font-black text-[#2D3748] tracking-tight leading-snug mb-1">
          ひらがな マスター
          <br />
          <span className="text-[#E07A5F] text-lg">소리로 듣고 손으로 익히는 히라가나</span>
        </h1>
        <p className="text-xs text-[#718096] leading-relaxed">
          일본어의 첫 단추! 50음도 소리 탐색부터 획순 손글씨 연습, 실생활 미니 단어 읽기까지 차근차근 마스터해요.
        </p>

        {/* 4단계 탭 버튼 */}
        <div className="grid grid-cols-4 gap-1.5 mt-4 pt-3 border-t border-[#F4DDD4]/80">
          {[
            { key: 'sound', label: '1. 소리 탐색', icon: Volume2 },
            { key: 'write', label: '2. 쓰기 연습', icon: Pencil },
            { key: 'words', label: '3. 미니 단어', icon: BookOpen },
            { key: 'dialogue', label: '4. 첫 발화', icon: Flame }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = currentStep === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => {
                  stopJapaneseSpeech();
                  setCurrentStep(tab.key as StudioStep);
                }}
                className={`flex flex-col items-center justify-center py-2 px-1 rounded-2xl text-[11px] font-bold transition-all ${
                  isActive
                    ? 'bg-[#E07A5F] text-white shadow-xs scale-[1.02]'
                    : 'bg-white/80 text-[#718096] hover:bg-white hover:text-[#2D3748] border border-[#EDE8E1]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 mb-0.5 ${isActive ? 'text-white' : 'text-[#718096]'}`} />
                <span className="truncate">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* ========================================================
          STEP 1: 50음도 소리 탐색 (Phonetics Soundboard)
      ======================================================== */}
      {currentStep === 'sound' && (
        <section className="space-y-4">
          <div className="bg-white rounded-3xl p-5 border border-[#EDE8E1] shadow-xs space-y-4">
            <div className="flex items-center justify-between gap-2">
              <div>
                <h2 className="text-sm font-bold text-[#2D3748]">
                  50음도 사운드보드 (五十音図)
                </h2>
                <p className="text-xs text-[#718096]">
                  글자를 탭하면 원어민의 정확한 소리를 들을 수 있어요.
                </p>
              </div>

              {/* 현재 선택된 글자 바로 쓰기 링크 */}
              <button
                type="button"
                onClick={() => setCurrentStep('write')}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold border border-amber-200 transition-colors"
              >
                <span>'{selectedChar.char}' 써보기</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* 50음도 그리드 표 */}
            <div className="space-y-2">
              {HIRAGANA_GRID.map((row) => (
                <div key={row.name} className="flex items-center gap-2">
                  <span className="w-14 text-[11px] font-extrabold text-[#A0AEC0] shrink-0 text-right pr-1">
                    {row.name.split(' ')[0]}
                  </span>

                  <div className="grid grid-cols-5 gap-1.5 flex-1">
                    {row.chars.map((charItem, idx) => {
                      if (!charItem) {
                        return (
                          <div
                            key={idx}
                            className="aspect-square rounded-xl bg-stone-50/60 border border-dashed border-[#EDE8E1]"
                          />
                        );
                      }

                      const isSelected = selectedChar.char === charItem.char;
                      const isPlaying = playingChar === charItem.char;

                      return (
                        <button
                          key={charItem.char}
                          type="button"
                          onClick={() => {
                            setSelectedChar(charItem);
                            handlePlayCharSound(charItem);
                          }}
                          className={`aspect-square rounded-2xl flex flex-col items-center justify-center p-1 transition-all relative group ${
                            isSelected
                              ? 'bg-[#FAF0E6] border-2 border-[#E07A5F] shadow-xs scale-105 z-10'
                              : 'bg-white hover:bg-stone-50 border border-[#EDE8E1] hover:border-[#E07A5F]/50'
                          }`}
                        >
                          <span
                            className={`text-lg font-black leading-none ${
                              isSelected ? 'text-[#E07A5F]' : 'text-[#2D3748]'
                            }`}
                          >
                            {charItem.char}
                          </span>
                          <span className="text-[10px] font-semibold text-[#A0AEC0] mt-0.5">
                            {charItem.romaji}
                          </span>

                          {/* 음성 재생 중 물결 애니메이션 아이콘 */}
                          {isPlaying && (
                            <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-500 rounded-full animate-ping" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 선택된 글자 상세 카드 & 한국인 발음 팁 */}
          <div className="bg-gradient-to-br from-white to-[#FFF9F2] rounded-3xl p-5 border border-[#F4DDD4] shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-[#FAF0E6] border border-[#F4DDD4] flex items-center justify-center text-3xl font-black text-[#E07A5F]">
                  {selectedChar.char}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-black text-[#2D3748]">
                      {selectedChar.char} [{selectedChar.koreanSound}]
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-stone-100 text-[#718096]">
                      {selectedChar.romaji} • {selectedChar.strokeCount}획
                    </span>
                  </div>
                  <p className="text-xs text-[#718096] mt-0.5">
                    {selectedChar.strokeGuide || '획순을 지켜 바르게 쓰는 것이 중요해요.'}
                  </p>
                </div>
              </div>

              {/* 소리 듣기 큰 버튼 */}
              <button
                type="button"
                onClick={() => handlePlayCharSound(selectedChar)}
                className="p-3 rounded-2xl bg-[#E07A5F] hover:bg-[#C55D42] text-white shadow-xs transition-transform active:scale-95 shrink-0"
                title="소리 다시 듣기"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>

            {/* 발음 팁이 있을 경우 노출 */}
            {selectedChar.soundTip && (
              <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-start gap-2.5 text-xs text-amber-900 leading-relaxed">
                <HelpCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold text-amber-800">한국인 발음 클리닉: </strong>
                  <span>{selectedChar.soundTip}</span>
                </div>
              </div>
            )}

            {/* 바로 쓰기 이동 CTA */}
            <button
              type="button"
              onClick={() => setCurrentStep('write')}
              className="w-full py-3 px-4 rounded-2xl bg-[#2D3748] hover:bg-stone-800 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-xs"
            >
              <Pencil className="w-4 h-4 text-amber-400" />
              <span>'{selectedChar.char}' 캔버스에서 직접 써보기 (Step 2)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </section>
      )}

      {/* ========================================================
          STEP 2: 인터랙티브 쓰기 연습 (Canvas & Stroke)
      ======================================================== */}
      {currentStep === 'write' && (
        <section className="space-y-4">
          <div className="bg-white rounded-3xl p-5 border border-[#EDE8E1] shadow-xs space-y-4">
            <div className="flex items-center justify-between gap-2">
              <div>
                <h2 className="text-sm font-bold text-[#2D3748]">
                  손글씨 캔버스 쓰기 연습
                </h2>
                <p className="text-xs text-[#718096]">
                  가이드 글자 위로 손가락이나 마우스로 직접 획을 그어보세요.
                </p>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handlePlayCharSound(selectedChar)}
                  className="p-2 rounded-xl bg-stone-100 hover:bg-[#FAF0E6] text-[#718096] hover:text-[#E07A5F] transition-colors"
                  title="발음 듣기"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={clearCanvas}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-[#4A5568] text-xs font-bold transition-colors"
                  title="지우기"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>지우기</span>
                </button>
              </div>
            </div>

            {/* 빠른 글자 선택 칩 헤더 & 수집 진행 현황 */}
            <div className="flex items-center justify-between text-xs font-bold text-[#718096] pt-1">
              <span>50음도 글자 목록</span>
              <span className="text-[11px] font-bold text-[#E07A5F] bg-[#FAF0E6] px-2.5 py-0.5 rounded-full border border-[#F4DDD4]">
                완료 {completedChars.length} / {ALL_HIRAGANA_CHARS.length}
              </span>
            </div>

            {/* 빠른 글자 선택 칩 */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
              {ALL_HIRAGANA_CHARS.map((c) => {
                const isSelected = selectedChar.char === c.char;
                const isDone = completedChars.includes(c.char);
                return (
                  <button
                    key={c.char}
                    type="button"
                    onClick={() => setSelectedChar(c)}
                    className={`relative w-9 h-9 rounded-xl text-sm font-black shrink-0 transition-all ${
                      isSelected
                        ? 'bg-[#E07A5F] text-white shadow-2xs scale-105'
                        : isDone
                        ? 'bg-amber-50 text-[#8D5B4C] border border-amber-300'
                        : 'bg-stone-50 hover:bg-[#FAF0E6] text-[#4A5568] border border-[#EDE8E1]'
                    }`}
                  >
                    {c.char}
                    {isDone && (
                      <span
                        className={`absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] font-black shadow-2xs ${
                          isSelected ? 'bg-white text-[#E07A5F]' : 'bg-amber-500 text-white'
                        }`}
                      >
                        ✓
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* 캔버스 영역 */}
            <div
              className={`relative w-full aspect-square max-w-[340px] mx-auto bg-[#FFFDF9] rounded-3xl overflow-hidden shadow-inner flex items-center justify-center transition-all duration-500 ${
                isCharCompleted
                  ? 'border-2 border-amber-400 ring-4 ring-amber-300/60 shadow-[0_0_30px_rgba(251,191,36,0.35)] scale-[1.01]'
                  : 'border-2 border-dashed border-[#F4DDD4]'
              }`}
            >
              {/* 십자 가이드 보조선 */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <div className="w-full h-[1px] bg-stone-200/60" />
                <div className="absolute h-full w-[1px] bg-stone-200/60" />
              </div>

              {/* 배경 연한 가이드 텍스트 */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                <span className="text-[160px] font-black text-stone-200 leading-none">
                  {selectedChar.char}
                </span>
              </div>

              {/* 획순 팁 및 완료 배지 */}
              <div
                className={`absolute top-3 left-3 backdrop-blur-sm px-2.5 py-1 rounded-full text-[11px] font-bold transition-all duration-300 pointer-events-none flex items-center gap-1 shadow-2xs ${
                  isCharCompleted
                    ? 'bg-amber-100 text-amber-900 border border-amber-300 animate-pulse ring-2 ring-amber-400/40'
                    : 'bg-white/90 text-[#E07A5F] border border-[#F4DDD4]'
                }`}
              >
                {isCharCompleted ? (
                  <>
                    <span>✨</span>
                    <span>{selectedChar.strokeCount}획 완성!</span>
                    <span className="text-[10px] text-amber-700 font-normal">곧 다음으로 이동</span>
                  </>
                ) : (
                  <>
                    <span>✍️</span>
                    <span>{drawnStrokes} / {selectedChar.strokeCount}획</span>
                  </>
                )}
              </div>

              {/* 정확도 피드백 토스트 안내 */}
              {accuracyFeedback && (
                <div className="absolute top-3 right-3 z-20 px-2.5 py-1 bg-amber-500 text-white text-[11px] font-bold rounded-full shadow-md flex items-center gap-1 animate-bounce pointer-events-none">
                  <span>⚠️</span>
                  <span>{accuracyFeedback}</span>
                </div>
              )}

              {/* 실제 드로잉 캔버스 */}
              <canvas
                ref={canvasRef}
                onPointerDown={startDrawing}
                onPointerMove={draw}
                onPointerUp={stopDrawing}
                onPointerCancel={stopDrawing}
                className="relative z-10 w-full h-full cursor-crosshair touch-none"
              />
            </div>

            {/* 펜 설정 컨트롤 바 */}
            <div className="flex items-center justify-between gap-3 pt-2">
              {/* 펜 색상 선택 */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-[#718096]">색상:</span>
                {[
                  { color: '#2D3748', label: '먹색' },
                  { color: '#E07A5F', label: '코랄' },
                  { color: '#8D5B4C', label: '브라운' },
                  { color: '#3B82F6', label: '블루' }
                ].map((c) => (
                  <button
                    key={c.color}
                    type="button"
                    onClick={() => setPenColor(c.color)}
                    style={{ backgroundColor: c.color }}
                    className={`w-6 h-6 rounded-full transition-transform ${
                      penColor === c.color ? 'scale-125 ring-2 ring-offset-2 ring-stone-400' : 'opacity-80'
                    }`}
                    title={c.label}
                  />
                ))}
              </div>

              {/* 펜 두께 조절 */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-[#718096]">두께:</span>
                {[6, 10, 16].map((w) => (
                  <button
                    key={w}
                    type="button"
                    onClick={() => setStrokeWidth(w)}
                    className={`px-2 py-0.5 rounded-md text-[11px] font-bold border transition-colors ${
                      strokeWidth === w
                        ? 'bg-[#2D3748] text-white border-[#2D3748]'
                        : 'bg-stone-50 text-[#718096] border-[#EDE8E1]'
                    }`}
                  >
                    {w === 6 ? '얇게' : w === 10 ? '보통' : '두껍게'}
                  </button>
                ))}
              </div>
            </div>

            {/* 획순 가이드 텍스트 */}
            {selectedChar.strokeGuide && (
              <p className="text-xs text-center font-medium text-[#718096] bg-[#FAF9F7] py-2 px-3 rounded-xl border border-[#EDE8E1]">
                ✍️ <strong>획순 가이드:</strong> {selectedChar.strokeGuide}
              </p>
            )}

            {/* 완성 축하 배너 및 다음 글자 즉시 쓰기 */}
            {isCharCompleted && (
              <div className="flex items-center justify-between bg-amber-50/90 border border-amber-300/80 px-3.5 py-2.5 rounded-2xl shadow-2xs">
                <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500 shrink-0 animate-pulse" />
                  <span>훌륭해요! '{selectedChar.char}' 쓰기를 마쳤습니다.</span>
                </span>
                {(() => {
                  const currIdx = ALL_HIRAGANA_CHARS.findIndex((c) => c.char === selectedChar.char);
                  const nextChar =
                    currIdx >= 0 && currIdx < ALL_HIRAGANA_CHARS.length - 1
                      ? ALL_HIRAGANA_CHARS[currIdx + 1]
                      : null;
                  if (!nextChar) return null;
                  return (
                    <button
                      type="button"
                      onClick={() => {
                        if (autoNextTimerRef.current) {
                          clearTimeout(autoNextTimerRef.current);
                          autoNextTimerRef.current = null;
                        }
                        setSelectedChar(nextChar);
                      }}
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#E07A5F] hover:bg-[#C55D42] text-white text-xs font-bold rounded-xl shadow-xs transition-colors shrink-0"
                    >
                      <span>'{nextChar.char}' 바로 쓰기</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  );
                })()}
              </div>
            )}
          </div>

          {/* 도플갱어 (헷갈리기 쉬운 글자) 대조 카드 */}
          <div className="bg-white rounded-3xl p-5 border border-[#EDE8E1] shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#E07A5F]" />
                <h3 className="text-sm font-bold text-[#2D3748]">
                  도플갱어 글자 대조 클리닉
                </h3>
              </div>

              {/* 페어 전환 탭 */}
              <div className="flex items-center gap-1">
                {CONFUSING_PAIRS.map((pair, idx) => (
                  <button
                    key={pair.id}
                    type="button"
                    onClick={() => setSelectedConfusingIndex(idx)}
                    className={`px-2 py-0.5 rounded-lg text-[10px] font-bold transition-colors ${
                      selectedConfusingIndex === idx
                        ? 'bg-[#E07A5F] text-white'
                        : 'bg-stone-100 text-[#718096] hover:bg-stone-200'
                    }`}
                  >
                    {pair.char1.char} vs {pair.char2.char}
                  </button>
                ))}
              </div>
            </div>

            {(() => {
              const currentPair = CONFUSING_PAIRS[selectedConfusingIndex];
              return (
                <div className="bg-gradient-to-br from-[#FAF0E6]/50 to-white rounded-2xl p-4 border border-[#F4DDD4] space-y-3">
                  <h4 className="text-xs font-black text-[#2D3748]">
                    {currentPair.title}
                  </h4>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {[currentPair.char1, currentPair.char2, currentPair.char3]
                      .filter(Boolean)
                      .map((item) => (
                        <div
                          key={item!.char}
                          className="bg-white rounded-xl p-3 border border-[#EDE8E1] flex flex-col items-center text-center gap-1"
                        >
                          <span className="text-3xl font-black text-[#E07A5F]">
                            {item!.char}
                          </span>
                          <span className="text-xs font-bold text-[#2D3748]">
                            [{item!.korean}] ({item!.romaji})
                          </span>
                          <span className="text-[10px] text-[#718096] leading-tight mt-1">
                            {item!.feature}
                          </span>
                        </div>
                      ))}
                  </div>

                  <p className="text-xs text-amber-900 bg-amber-50/80 p-2.5 rounded-xl border border-amber-200/70 leading-relaxed font-medium">
                    💡 <strong>암기 팁:</strong> {currentPair.tip}
                  </p>
                </div>
              );
            })()}
          </div>
        </section>
      )}

      {/* ========================================================
          STEP 3: 미니 단어 매칭 (Micro Reading)
      ======================================================== */}
      {currentStep === 'words' && (
        <section className="space-y-4">
          <div className="bg-white rounded-3xl p-5 border border-[#EDE8E1] shadow-xs space-y-4">
            <div>
              <h2 className="text-sm font-bold text-[#2D3748]">
                배운 글자로 바로 읽는 미니 단어
              </h2>
              <p className="text-xs text-[#718096]">
                카드를 누르면 단어가 1글자씩 소리 내어 읽히며 바로 발음할 수 있어요.
              </p>
            </div>

            {/* 미니 단어 그리드 */}
            <div className="grid grid-cols-2 gap-2.5">
              {MINI_WORDS.map((word) => {
                const isSelected = selectedWord.id === word.id;
                const isPlaying = playingWordId === word.id;

                return (
                  <button
                    key={word.id}
                    type="button"
                    onClick={() => {
                      setSelectedWord(word);
                      handlePlayWordSound(word);
                    }}
                    className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col gap-2 group relative overflow-hidden ${
                      isSelected
                        ? 'bg-gradient-to-br from-[#FAF0E6] to-white border-[#E07A5F] shadow-xs ring-2 ring-[#E07A5F]/20'
                        : 'bg-white hover:bg-stone-50 border-[#EDE8E1]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-1">
                      <span className="text-2xl">{word.emoji}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-stone-100 text-[#718096]">
                        {word.category}
                      </span>
                    </div>

                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-lg font-black text-[#2D3748] tracking-wider group-hover:text-[#E07A5F] transition-colors">
                          {word.japanese}
                        </span>
                        <span className="text-[11px] font-medium text-[#A0AEC0]">
                          [{word.romaji}]
                        </span>
                      </div>
                      <p className="text-xs font-bold text-[#4A5568] mt-0.5">
                        {word.koreanMeaning}
                      </p>
                    </div>

                    <div className="flex items-center justify-end">
                      <div
                        className={`p-1.5 rounded-full transition-colors ${
                          isPlaying
                            ? 'bg-[#E07A5F] text-white'
                            : 'bg-stone-50 group-hover:bg-[#FAF0E6] text-[#718096] group-hover:text-[#E07A5F]'
                        }`}
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 단어 복습 큰 카드 */}
          <div className="bg-gradient-to-br from-amber-50/70 to-[#FAF0E6] rounded-3xl p-5 border border-amber-200/80 shadow-xs flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-4xl">{selectedWord.emoji}</span>
              <div>
                <span className="text-2xl font-black text-[#2D3748] tracking-widest">
                  {selectedWord.japanese}
                </span>
                <p className="text-xs font-bold text-[#E07A5F]">
                  {selectedWord.koreanMeaning} ({selectedWord.romaji})
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handlePlayWordSound(selectedWord)}
              className="px-4 py-2.5 rounded-2xl bg-[#E07A5F] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs hover:bg-[#C55D42] transition-all"
            >
              <Volume2 className="w-4 h-4" />
              <span>소리 듣기</span>
            </button>
          </div>
        </section>
      )}

      {/* ========================================================
          STEP 4: 첫 발화 챌린지 (First Dialogue)
      ======================================================== */}
      {currentStep === 'dialogue' && (
        <section className="space-y-4">
          <div className="bg-white rounded-3xl p-5 border border-[#EDE8E1] shadow-xs space-y-4">
            <div className="flex items-center justify-between gap-2">
              <div>
                <h2 className="text-sm font-bold text-[#2D3748]">
                  내 입으로 직접 읽는 첫인사
                </h2>
                <p className="text-xs text-[#718096]">
                  배운 히라가나를 연결하여 생존 표현을 소리 내어 말해보세요.
                </p>
              </div>

              {/* 한글 발음 보기/숨기기 토글 */}
              <button
                type="button"
                onClick={() => setShowKoreanPronunciation((prev) => !prev)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                  showKoreanPronunciation
                    ? 'bg-stone-100 text-[#4A5568] border-[#EDE8E1]'
                    : 'bg-amber-50 text-amber-800 border-amber-300'
                }`}
              >
                {showKoreanPronunciation ? (
                  <>
                    <EyeOff className="w-3.5 h-3.5" />
                    <span>한글발음 숨기기</span>
                  </>
                ) : (
                  <>
                    <Eye className="w-3.5 h-3.5 text-amber-600" />
                    <span>한글발음 보기</span>
                  </>
                )}
              </button>
            </div>

            {/* 문장 리스트 */}
            <div className="space-y-3">
              {FIRST_DIALOGUE_LIST.map((item, idx) => {
                const isPlaying = playingDialogueId === item.id;
                const isCompleted = completedDialogueIds.includes(item.id);

                return (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl border border-[#EDE8E1] hover:border-[#E07A5F]/70 transition-all bg-white flex flex-col gap-3 group"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-stone-100 text-[#718096]">
                        상황 {idx + 1}: {item.situation}
                      </span>

                      {isCompleted && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>발화 완료!</span>
                        </span>
                      )}
                    </div>

                    {/* 일본어 텍스트 및 발음 */}
                    <div className="space-y-1">
                      <div className="flex items-baseline justify-between">
                        <span className="text-xl font-black text-[#2D3748] tracking-wider">
                          {item.japanese}
                        </span>

                        <button
                          type="button"
                          onClick={() => handlePlayDialogueSound(item)}
                          className={`p-2 rounded-xl transition-all ${
                            isPlaying
                              ? 'bg-[#E07A5F] text-white animate-pulse'
                              : 'bg-stone-50 group-hover:bg-[#FAF0E6] text-[#718096] group-hover:text-[#E07A5F]'
                          }`}
                          title="발음 듣기"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* 한글 발음 (토글 상태에 따라 노출) */}
                      {showKoreanPronunciation && (
                        <p className="text-xs font-bold text-[#D97706]">
                          [{item.koreanPronunciation}] ({item.romaji})
                        </p>
                      )}

                      <p className="text-xs font-semibold text-[#4A5568]">
                        뜻: {item.koreanMeaning}
                      </p>
                    </div>

                    {/* 발화 팁 */}
                    <p className="text-[11px] text-[#718096] bg-[#FAF9F7] p-2 rounded-xl border border-[#EDE8E1]">
                      💬 {item.tip}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 수료 축하 카드 */}
          <div className="bg-gradient-to-br from-emerald-50 via-white to-amber-50 rounded-3xl p-5 border border-emerald-200/70 shadow-xs text-center space-y-2.5">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-black text-[#2D3748]">
              축하합니다! 히라가나 첫걸음 완주 🎉
            </h3>
            <p className="text-xs text-[#718096] leading-relaxed max-w-sm mx-auto">
              이제 기본 글자를 읽을 수 있는 단단한 기초가 마련되었습니다.
              다음 단계인 <strong>Lv.1 초급 (기본 패턴 & 여행 회화)</strong>으로 나아가 볼까요?
            </p>

            <Link
              href="/roadmap"
              className="inline-flex items-center justify-center gap-1.5 py-2.5 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs"
            >
              <span>Lv.1 초급 로드맵 보러가기</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
