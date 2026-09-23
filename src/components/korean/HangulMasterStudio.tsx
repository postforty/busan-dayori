'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  HANGUL_CONSONANTS,
  HANGUL_VOWELS,
  SIGN_QUIZ_LIST,
  combineHangul,
  HangulConsonant,
  HangulVowel,
  SignQuizItem
} from '@/lib/curriculum/hangulData';
import { speakKorean, stopKoreanSpeech } from '@/utils/tts';
import {
  Volume2,
  RotateCcw,
  Sparkles,
  CheckCircle,
  HelpCircle,
  ChevronRight,
  Flame,
  ArrowRight,
  Pencil,
  BookOpen,
  Award,
  Layers,
  Lightbulb,
  LayoutGrid,
  Utensils,
  Coffee,
  TrainFront,
  ShoppingBag
} from 'lucide-react';

type HangulStep = 'combine' | 'write' | 'quiz';

export default function HangulMasterStudio() {
  const [currentStep, setCurrentStep] = useState<HangulStep>('combine');

  // --- Step 1: 조합 상태 ---
  const [selectedConsonant, setSelectedConsonant] = useState<HangulConsonant>(HANGUL_CONSONANTS[0]);
  const [selectedVowel, setSelectedVowel] = useState<HangulVowel>(HANGUL_VOWELS[0]);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // 실시간 조합된 글자
  const combinedChar = combineHangul(selectedConsonant, selectedVowel);

  const handlePlayCombined = useCallback((charToPlay: string) => {
    setIsPlayingAudio(true);
    speakKorean(
      charToPlay,
      0.85,
      () => setIsPlayingAudio(true),
      () => setIsPlayingAudio(false)
    );
  }, []);

  // --- Step 2: 손글씨 캔버스 쓰기 상태 (히라가나 스튜디오 동등 엔진) ---
  const [writingTargetType, setWritingTargetType] = useState<'consonant' | 'vowel'>('consonant');
  const [writingConsonant, setWritingConsonant] = useState<HangulConsonant>(HANGUL_CONSONANTS[0]);
  const [writingVowel, setWritingVowel] = useState<HangulVowel>(HANGUL_VOWELS[0]);
  const currentWritingChar =
    writingTargetType === 'consonant' ? writingConsonant.char : writingVowel.char;
  const currentWritingGuide =
    writingTargetType === 'consonant' ? writingConsonant : writingVowel;

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const charListScrollRef = useRef<HTMLDivElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const penColor = '#E07A5F';
  const strokeWidth = 10;
  const [hasDrawn, setHasDrawn] = useState(false);
  const [drawnStrokes, setDrawnStrokes] = useState<number>(0);
  const [isCharCompleted, setIsCharCompleted] = useState<boolean>(false);
  const [completedChars, setCompletedChars] = useState<string[]>([]);
  const autoNextTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 획 정확도 검증(Pixel Mask Matching) 상태
  const charMaskRef = useRef<ImageData | null>(null);
  const strokePointsRef = useRef<{ x: number; y: number }[]>([]);
  const [accuracyFeedback, setAccuracyFeedback] = useState<string | null>(null);
  const feedbackTimerRef = useRef<NodeJS.Timeout | null>(null);

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

  // 캔버스 초기화
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
    ctx.fillText(currentWritingChar, width / 2, height / 2);

    charMaskRef.current = ctx.getImageData(0, 0, width, height);
  }, [currentWritingChar]);

  // 글자 변경 시 캔버스 초기화 및 마스크 갱신
  useEffect(() => {
    clearCanvas();
    updateCharMask();
  }, [currentWritingChar, clearCanvas, updateCharMask]);

  // 글자 변경 시 또는 쓰기 스텝 진입 시 가로 스크롤 목록에서 현재 글자가 화면 중앙에 보이도록 자동 스크롤
  useEffect(() => {
    if (currentStep !== 'write' || !charListScrollRef.current) return;
    const timer = requestAnimationFrame(() => {
      const container = charListScrollRef.current;
      if (!container) return;
      const activeBtn = container.querySelector<HTMLButtonElement>('[data-active="true"]');
      if (activeBtn) {
        const containerWidth = container.clientWidth;
        const btnLeft = activeBtn.offsetLeft;
        const btnWidth = activeBtn.offsetWidth;
        const targetScrollLeft = btnLeft - containerWidth / 2 + btnWidth / 2;
        container.scrollTo({
          left: Math.max(0, targetScrollLeft),
          behavior: 'smooth'
        });
      }
    });
    return () => cancelAnimationFrame(timer);
  }, [currentWritingChar, currentStep]);

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

  // 캔버스 초기 설정 (DPR 스케일링)
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
        // 무시
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
      showAccuracyFeedback('線をもっと長く引いてみましょう ✍️');
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
      // 글자 획 위의 적중률이 50% 미만이면 유효한 획으로 인정하지 않음
      if (hitRate < 0.50) {
        showAccuracyFeedback('ガイド文字の上をなぞってみましょう ✍️');
        return;
      }
    }

    // 정확하게 그린 획인 경우 피드백 클리어 및 획수 1 증가
    setAccuracyFeedback(null);
    const nextStrokes = drawnStrokes + 1;
    setDrawnStrokes(nextStrokes);

    if (nextStrokes >= currentWritingGuide.strokeCount && !isCharCompleted) {
      setIsCharCompleted(true);
      setCompletedChars((prev) =>
        prev.includes(currentWritingChar) ? prev : [...prev, currentWritingChar]
      );

      // 완성 순간 해당 글자의 한국어 원어민 발음(TTS) 자동 재생
      speakKorean(currentWritingChar, 0.85);

      // 이전 타이머 취소 후 1.5초 뒤 다음 글자로 자동 이동
      if (autoNextTimerRef.current) {
        clearTimeout(autoNextTimerRef.current);
      }

      autoNextTimerRef.current = setTimeout(() => {
        if (writingTargetType === 'consonant') {
          const currIdx = HANGUL_CONSONANTS.findIndex((c) => c.char === writingConsonant.char);
          if (currIdx >= 0 && currIdx < HANGUL_CONSONANTS.length - 1) {
            setWritingConsonant(HANGUL_CONSONANTS[currIdx + 1]);
          } else {
            // 자음 전체 완주 시 모음으로 전환하거나 첫 자음으로 순환
            setWritingConsonant(HANGUL_CONSONANTS[0]);
          }
        } else {
          const currIdx = HANGUL_VOWELS.findIndex((v) => v.char === writingVowel.char);
          if (currIdx >= 0 && currIdx < HANGUL_VOWELS.length - 1) {
            setWritingVowel(HANGUL_VOWELS[currIdx + 1]);
          } else {
            setWritingVowel(HANGUL_VOWELS[0]);
          }
        }
        autoNextTimerRef.current = null;
      }, 1500);
    }
  };

  // --- Step 3: 간판 & 메뉴 퀴즈 상태 ---
  const [quizCategory, setQuizCategory] = useState<'all' | 'gourmet' | 'cafe' | 'traffic' | 'shopping'>('all');
  const filteredQuizList =
    quizCategory === 'all'
      ? SIGN_QUIZ_LIST
      : SIGN_QUIZ_LIST.filter((q) => q.category === quizCategory);

  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

  const currentQuiz = filteredQuizList[currentQuizIndex] || filteredQuizList[0];

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    setSelectedOptionIndex(index);
    setIsAnswered(true);

    const isCorrect = currentQuiz.options[index]?.isCorrect;
    if (isCorrect) {
      setScore((s) => s + 1);
      setStreak((st) => st + 1);
      speakKorean(currentQuiz.korean, 0.9);
    } else {
      setStreak(0);
    }
  };

  const handleNextQuiz = () => {
    setSelectedOptionIndex(null);
    setIsAnswered(false);
    if (currentQuizIndex + 1 < filteredQuizList.length) {
      setCurrentQuizIndex((i) => i + 1);
    } else {
      setCurrentQuizIndex(0);
    }
  };

  return (
    <div className="space-y-6">
      {/* 3단계 네비게이션 탭 */}
      <div className="grid grid-cols-3 gap-2 bg-[#F4F1EA] p-1.5 rounded-2xl border border-[#EDE8E1]">
        <button
          onClick={() => {
            setCurrentStep('combine');
            stopKoreanSpeech();
          }}
          className={`flex flex-col items-center py-2 px-1 rounded-xl text-xs font-bold transition-all ${
            currentStep === 'combine'
              ? 'bg-white text-[#E07A5F] shadow-sm'
              : 'text-[#718096] hover:text-[#2D3748]'
          }`}
        >
          <div className="flex items-center gap-1">
            <Layers className="w-3.5 h-3.5" />
            <span className="whitespace-nowrap">1. 音と合体</span>
          </div>
          <span className="text-[10px] font-normal text-gray-500 mt-0.5 whitespace-nowrap">
            組み合わせ
          </span>
        </button>

        <button
          onClick={() => {
            setCurrentStep('write');
            stopKoreanSpeech();
          }}
          className={`flex flex-col items-center py-2 px-1 rounded-xl text-xs font-bold transition-all ${
            currentStep === 'write'
              ? 'bg-white text-[#E07A5F] shadow-sm'
              : 'text-[#718096] hover:text-[#2D3748]'
          }`}
        >
          <div className="flex items-center gap-1">
            <Pencil className="w-3.5 h-3.5" />
            <span className="whitespace-nowrap">2. なぞり書き</span>
          </div>
          <span className="text-[10px] font-normal text-gray-500 mt-0.5 whitespace-nowrap">
            書き順と練習
          </span>
        </button>

        <button
          onClick={() => {
            setCurrentStep('quiz');
            stopKoreanSpeech();
          }}
          className={`flex flex-col items-center py-2 px-1 rounded-xl text-xs font-bold transition-all ${
            currentStep === 'quiz'
              ? 'bg-white text-[#E07A5F] shadow-sm'
              : 'text-[#718096] hover:text-[#2D3748]'
          }`}
        >
          <div className="flex items-center gap-1">
            <Award className="w-3.5 h-3.5" />
            <span className="whitespace-nowrap">3. 看板クイズ</span>
          </div>
          <span className="text-[10px] font-normal text-gray-500 mt-0.5 whitespace-nowrap">
            実戦メニュー
          </span>
        </button>
      </div>

      {/* ================= STEP 1: 音と合体 ================= */}
      {currentStep === 'combine' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* 상단 힌트 배너 */}
          <div className="bg-[#FAF0E6] border border-[#E07A5F]/20 rounded-2xl p-4 text-xs text-[#2D3748] flex items-start gap-3">
            <div className="p-2 bg-[#E07A5F]/10 rounded-xl text-[#E07A5F] shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <p className="font-bold text-[#E07A5F]">
                ハングルは「子音 ＋ 母音」で完成する科学的な文字！
              </p>
              <p className="text-[#4A5568] leading-relaxed">
                下の【子音 14個】と【母音 10個】をそれぞれタップして、文字がどのように合体するか体験してみましょう！
              </p>
            </div>
          </div>

          {/* 중앙: 실시간 합체 프리뷰 카드 (아날로그 수첩 웜톤 카드) */}
          <div className="bg-gradient-to-br from-[#FFF9F2] via-[#FAF0E6] to-[#F5EBE1] text-[#2D3748] rounded-3xl p-6 border border-[#F4DDD4] shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#E07A5F]/5 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex items-center justify-between text-xs text-[#718096] mb-2">
              <span className="flex items-center gap-1.5 font-bold">
                <span className="w-2 h-2 rounded-full bg-[#E07A5F] animate-pulse" />
                リアルタイム合体プレビュー
              </span>
              <span className="font-mono text-[11px] bg-white/80 px-2 py-0.5 rounded-full border border-[#EDE8E1] text-[#718096]">
                {selectedConsonant.romaji} + {selectedVowel.romaji}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-around gap-6 py-4">
              {/* 결합 수식 표시 */}
              <div className="flex items-center gap-3">
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-black text-[#E07A5F]">
                    {selectedConsonant.char}
                  </span>
                  <span className="text-[11px] text-[#718096] font-medium mt-1">
                    {selectedConsonant.katakanaName}
                  </span>
                </div>
                <span className="text-2xl text-[#A0AEC0] font-light">+</span>
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-black text-[#2D3748]">
                    {selectedVowel.char}
                  </span>
                  <span className="text-[11px] text-[#718096] font-medium mt-1">
                    {selectedVowel.katakanaName}
                  </span>
                </div>
                <span className="text-2xl text-[#A0AEC0] font-light">=</span>
              </div>

              {/* 완성된 글자 및 발음 버튼 */}
              <div className="flex items-center gap-4">
                <div className="w-24 h-24 rounded-2xl bg-white border-2 border-[#F4DDD4] flex flex-col items-center justify-center shadow-sm">
                  <span className="text-5xl font-black text-[#2D3748] tracking-tight">
                    {combinedChar}
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => handlePlayCombined(combinedChar)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#E07A5F] hover:bg-[#C45B40] text-white font-bold text-xs shadow-sm transition-all active:scale-95"
                  >
                    <Volume2 className={`w-4 h-4 ${isPlayingAudio ? 'animate-bounce' : ''}`} />
                    <span>発音を聞く</span>
                  </button>
                  <span className="text-[11px] text-[#718096]">
                    読み: <strong className="text-[#2D3748] font-black">{combinedChar}</strong>
                  </span>
                </div>
              </div>
            </div>

            {/* 발음 팁 메모 */}
            <div className="mt-3 pt-3 border-t border-[#F4DDD4]/80 text-xs text-[#4A5568] flex items-start gap-2">
              <span className="px-1.5 py-0.5 rounded bg-[#E07A5F]/15 text-[#E07A5F] text-[10px] font-bold shrink-0 border border-[#E07A5F]/20">
                発音のコツ
              </span>
              <p className="leading-relaxed">
                {selectedVowel.soundTip}
              </p>
            </div>
          </div>

          {/* 자음 14자 가로 1줄 스크롤 */}
          <div className="bg-white rounded-3xl p-4 border border-[#EDE8E1] shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-[#2D3748] flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E07A5F]" />
                ① 子音 (14個) を選ぶ
              </h4>
              <span className="text-[11px] text-gray-500 font-medium">
                選択中: <strong className="text-[#E07A5F] font-bold text-xs">{selectedConsonant.char}</strong> ({selectedConsonant.katakanaName})
              </span>
            </div>

            {/* 가로 스크롤 1줄 컨테이너 */}
            <div className="flex items-center gap-2 overflow-x-auto pt-1.5 pb-2 px-1 scrollbar-none snap-x touch-pan-x">
              {HANGUL_CONSONANTS.map((c) => {
                const isSelected = selectedConsonant.char === c.char;
                return (
                  <button
                    key={c.char}
                    onClick={() => {
                      setSelectedConsonant(c);
                      handlePlayCombined(combineHangul(c, selectedVowel));
                    }}
                    className={`w-[52px] h-[64px] shrink-0 snap-center rounded-2xl flex flex-col items-center justify-center border transition-all active:scale-95 ${
                      isSelected
                        ? 'bg-[#E07A5F] text-white border-[#E07A5F] shadow-md font-black scale-105 ring-2 ring-[#E07A5F]/20'
                        : 'bg-[#FBF9F5] hover:bg-gray-100 text-[#2D3748] border-[#EDE8E1] font-bold'
                    }`}
                  >
                    <span className="text-xl block leading-tight">{c.char}</span>
                    <span className="text-[9px] block opacity-85 leading-none mt-1">
                      {c.katakanaName.slice(0, 3)}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-start gap-2 bg-[#FBF9F5] p-2.5 rounded-xl border border-[#EDE8E1] text-[11px] text-gray-600 leading-relaxed">
              <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
              <p>
                <strong className="text-[#2D3748]">{selectedConsonant.char} ({selectedConsonant.katakanaName})</strong>: {selectedConsonant.soundTip}
              </p>
            </div>
          </div>

          {/* 모음 10자 가로 1줄 스크롤 */}
          <div className="bg-white rounded-3xl p-4 border border-[#EDE8E1] shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-[#2D3748] flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2D3748]" />
                ② 母音 (10個) を選ぶ
              </h4>
              <span className="text-[11px] text-gray-500 font-medium">
                選択中: <strong className="text-[#2D3748] font-bold text-xs">{selectedVowel.char}</strong> ({selectedVowel.katakanaName})
              </span>
            </div>

            {/* 가로 스크롤 1줄 컨테이너 */}
            <div className="flex items-center gap-2 overflow-x-auto pt-1.5 pb-2 px-1 scrollbar-none snap-x touch-pan-x">
              {HANGUL_VOWELS.map((v) => {
                const isSelected = selectedVowel.char === v.char;
                return (
                  <button
                    key={v.char}
                    onClick={() => {
                      setSelectedVowel(v);
                      handlePlayCombined(combineHangul(selectedConsonant, v));
                    }}
                    className={`w-[52px] h-[64px] shrink-0 snap-center rounded-2xl flex flex-col items-center justify-center border transition-all active:scale-95 ${
                      isSelected
                        ? 'bg-[#2D3748] text-white border-[#2D3748] shadow-md font-black scale-105 ring-2 ring-[#2D3748]/20'
                        : 'bg-[#FBF9F5] hover:bg-gray-100 text-[#2D3748] border-[#EDE8E1] font-bold'
                    }`}
                  >
                    <span className="text-xl block leading-tight">{v.char}</span>
                    <span className="text-[9px] block opacity-85 leading-none mt-1">
                      {v.katakanaName}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-start gap-2 bg-[#FBF9F5] p-2.5 rounded-xl border border-[#EDE8E1] text-[11px] text-gray-600 leading-relaxed">
              <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
              <p>
                <strong className="text-[#2D3748]">{selectedVowel.char} ({selectedVowel.katakanaName})</strong>: {selectedVowel.soundTip}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ================= STEP 2: なぞり書き ================= */}
      {currentStep === 'write' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl p-5 border border-[#EDE8E1] shadow-sm space-y-4">
            {/* 자음/모음 토글 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 bg-[#F4F1EA] p-1 rounded-xl">
                <button
                  onClick={() => setWritingTargetType('consonant')}
                  className={`text-xs px-3 py-1.5 rounded-lg font-bold transition-all ${
                    writingTargetType === 'consonant'
                      ? 'bg-white text-[#E07A5F] shadow-sm'
                      : 'text-gray-500'
                  }`}
                >
                  子音 (ㄱ~ㅎ)
                </button>
                <button
                  onClick={() => setWritingTargetType('vowel')}
                  className={`text-xs px-3 py-1.5 rounded-lg font-bold transition-all ${
                    writingTargetType === 'vowel'
                      ? 'bg-white text-[#2D3748] shadow-sm'
                      : 'text-gray-500'
                  }`}
                >
                  母音 (ㅏ~ㅣ)
                </button>
              </div>

              <button
                onClick={() => speakKorean(currentWritingChar, 0.85)}
                className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-full bg-[#FAF0E6] text-[#E07A5F] font-bold hover:bg-[#F4E1D2] transition-colors"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>音を聞く</span>
              </button>
            </div>

            {/* 빠른 글자 선택 칩 헤더 & 진행 현황 */}
            <div className="flex items-center justify-between text-xs font-bold text-[#718096] pt-1">
              <span>{writingTargetType === 'consonant' ? '子音 (14個) リスト' : '母音 (10個) リスト'}</span>
              <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                writingTargetType === 'consonant'
                  ? 'text-[#E07A5F] bg-[#FAF0E6] border-[#F4DDD4]'
                  : 'text-[#2D3748] bg-stone-100 border-stone-200'
              }`}>
                完成 {writingTargetType === 'consonant'
                  ? completedChars.filter((c) => HANGUL_CONSONANTS.some((hc) => hc.char === c)).length
                  : completedChars.filter((c) => HANGUL_VOWELS.some((hv) => hv.char === c)).length
                } / {writingTargetType === 'consonant' ? HANGUL_CONSONANTS.length : HANGUL_VOWELS.length}
              </span>
            </div>

            {/* 빠른 글자 선택 칩 */}
            <div
              ref={charListScrollRef}
              className="flex items-center gap-1.5 overflow-x-auto pt-2 pb-2 px-1 scrollbar-none scroll-smooth"
            >
              {writingTargetType === 'consonant'
                ? HANGUL_CONSONANTS.map((c) => {
                    const isSelected = writingConsonant.char === c.char;
                    const isDone = completedChars.includes(c.char);
                    return (
                      <button
                        key={c.char}
                        type="button"
                        data-active={isSelected}
                        onClick={() => setWritingConsonant(c)}
                        className={`relative w-10 h-10 shrink-0 rounded-xl text-sm font-black transition-all ${
                          isSelected
                            ? 'bg-[#E07A5F] text-white shadow-sm scale-105 ring-2 ring-[#E07A5F]/20'
                            : isDone
                              ? 'bg-amber-50 text-amber-900 border border-amber-300'
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
                  })
                : HANGUL_VOWELS.map((v) => {
                    const isSelected = writingVowel.char === v.char;
                    const isDone = completedChars.includes(v.char);
                    return (
                      <button
                        key={v.char}
                        type="button"
                        data-active={isSelected}
                        onClick={() => setWritingVowel(v)}
                        className={`relative w-10 h-10 shrink-0 rounded-xl text-sm font-black transition-all ${
                          isSelected
                            ? 'bg-[#2D3748] text-white shadow-sm scale-105 ring-2 ring-[#2D3748]/20'
                            : isDone
                              ? 'bg-amber-50 text-amber-900 border border-amber-300'
                              : 'bg-stone-50 hover:bg-[#FAF0E6] text-[#4A5568] border border-[#EDE8E1]'
                        }`}
                      >
                        {v.char}
                        {isDone && (
                          <span
                            className={`absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] font-black shadow-2xs ${
                              isSelected ? 'bg-white text-[#2D3748]' : 'bg-amber-500 text-white'
                            }`}
                          >
                            ✓
                          </span>
                        )}
                      </button>
                    );
                  })}
            </div>

            {/* 획순 가이드 팁 */}
            <div className="p-3.5 bg-[#FAF0E6] rounded-2xl border border-[#E07A5F]/20 text-xs space-y-2">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-baseline gap-2">
                  <span className="font-black text-base text-[#E07A5F]">
                    {currentWritingGuide.char}
                  </span>
                  <span className="text-gray-700 font-bold text-xs">
                    （{currentWritingGuide.katakanaName}）
                  </span>
                  <span className="text-[11px] text-gray-500 font-medium">
                    総画数: <strong className="text-[#2D3748]">{currentWritingGuide.strokeCount}画</strong>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={clearCanvas}
                  className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-xl bg-white border border-[#EDE8E1] text-gray-700 hover:text-black font-bold transition-all shadow-2xs shrink-0 whitespace-nowrap active:scale-95"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>消去</span>
                </button>
              </div>

              <div className="text-[11px] text-[#4A5568] bg-white/70 p-2.5 rounded-xl border border-[#E07A5F]/10 leading-relaxed">
                <span className="font-bold text-[#E07A5F] mr-1.5">書き順:</span>
                {currentWritingGuide.strokeGuide}
              </div>
            </div>

            {/* 손글씨 캔버스 영역 */}
            <div
              className={`relative w-full aspect-square max-w-[340px] mx-auto bg-[#FFFDF9] rounded-3xl overflow-hidden shadow-inner flex items-center justify-center transition-all duration-500 ${
                isCharCompleted
                  ? 'border-2 border-amber-400 ring-4 ring-amber-300/60 shadow-[0_0_30px_rgba(251,191,36,0.35)] scale-[1.01]'
                  : 'border-2 border-dashed border-[#F4DDD4]'
              }`}
            >
              {/* 배경 십자 보조선 */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <div className="w-full h-px bg-stone-200/60" />
                <div className="absolute h-full w-px bg-stone-200/60" />
              </div>

              {/* 반투명 가이드 글자 */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center select-none">
                <span className="text-[160px] font-black text-stone-200 leading-none">
                  {currentWritingChar}
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
                    <span>{currentWritingGuide.strokeCount}画完成！</span>
                    <span className="text-[10px] text-amber-700 font-normal">次の文字へ</span>
                  </>
                ) : (
                  <>
                    <Pencil className="w-3 h-3 text-[#E07A5F]" />
                    <span>{drawnStrokes} / {currentWritingGuide.strokeCount}画</span>
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

              {!hasDrawn && !isCharCompleted && (
                <div className="absolute bottom-4 pointer-events-none flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 text-white text-[11px] backdrop-blur-xs">
                  <Pencil className="w-3 h-3 text-[#E07A5F]" />
                  <span>指やマウスでなぞってみよう</span>
                </div>
              )}
            </div>

            {/* 하단 완료 및 다음 글자 이동 */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-gray-500 font-medium">
                {isCharCompleted
                  ? '🎉 完成！1.5秒後に自動で次へ移動します'
                  : hasDrawn
                    ? `✍️ あと ${Math.max(0, currentWritingGuide.strokeCount - drawnStrokes)}画`
                    : 'なぞり書きで正しい形と書き順をマスター'}
              </span>
              <button
                type="button"
                onClick={() => {
                  if (writingTargetType === 'consonant') {
                    const idx = HANGUL_CONSONANTS.findIndex((c) => c.char === writingConsonant.char);
                    const next = HANGUL_CONSONANTS[(idx + 1) % HANGUL_CONSONANTS.length];
                    setWritingConsonant(next);
                  } else {
                    const idx = HANGUL_VOWELS.findIndex((v) => v.char === writingVowel.char);
                    const next = HANGUL_VOWELS[(idx + 1) % HANGUL_VOWELS.length];
                    setWritingVowel(next);
                  }
                }}
                className="flex items-center gap-1 text-xs px-3.5 py-2 rounded-xl bg-[#2D3748] hover:bg-black text-white font-bold transition-all shrink-0 active:scale-95"
              >
                <span>次の文字へ</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= STEP 3: 実戦！街の看板クイズ ================= */}
      {currentStep === 'quiz' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* 점수 및 콤보 헤더 */}
          <div className="flex items-center justify-between bg-white px-4 py-3 rounded-2xl border border-[#EDE8E1] shadow-sm">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-[#E07A5F]/10 rounded-xl text-[#E07A5F]">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs text-gray-500 font-medium block">クイズスコア</span>
                <span className="text-sm font-extrabold text-[#2D3748]">
                  {score} 問正解
                </span>
              </div>
            </div>

            {streak > 1 && (
              <div className="flex items-center gap-1 text-xs font-bold text-[#E07A5F] bg-[#FAF0E6] px-3 py-1 rounded-full animate-bounce">
                <Flame className="w-4 h-4 fill-current" />
                <span>{streak} 連続正解！</span>
              </div>
            )}

            <span className="text-xs text-gray-400 font-medium">
              {currentQuizIndex + 1} / {filteredQuizList.length}
            </span>
          </div>

          {/* 카테고리 필터 */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none text-xs">
            {[
              { id: 'all', label: 'すべて', icon: LayoutGrid },
              { id: 'gourmet', label: 'グルメ', icon: Utensils },
              { id: 'cafe', label: 'カフェ', icon: Coffee },
              { id: 'traffic', label: '街・交通', icon: TrainFront },
              { id: 'shopping', label: '買い物', icon: ShoppingBag }
            ].map((cat) => {
              const Icon = cat.icon;
              const isSelected = quizCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setQuizCategory(cat.id as any);
                    setCurrentQuizIndex(0);
                    setIsAnswered(false);
                    setSelectedOptionIndex(null);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full shrink-0 font-bold transition-all ${
                    isSelected
                      ? 'bg-[#E07A5F] text-white shadow-sm'
                      : 'bg-white text-gray-600 border border-[#EDE8E1] hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* 간판 스타일 대형 퀴즈 카드 (부산 다이어리 웜톤 카드) */}
          <div className="bg-gradient-to-br from-[#FFF9F2] via-[#FAF0E6] to-[#F5EBE1] text-[#2D3748] rounded-3xl p-6 shadow-sm border border-[#F4DDD4] relative overflow-hidden text-center">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#E07A5F]/5 rounded-full blur-2xl pointer-events-none" />

            {/* 상단 태그 및 발음 버튼 */}
            <div className="flex items-center justify-between text-xs text-[#718096] mb-3">
              <span className="px-3 py-1 rounded-full bg-white text-[#E07A5F] font-bold border border-[#F4DDD4] shadow-2xs">
                {currentQuiz.signType}
              </span>
              <button
                onClick={() => speakKorean(currentQuiz.korean, 0.85)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white hover:bg-[#FAF0E6] text-[#2D3748] border border-[#EDE8E1] font-bold transition-colors shadow-2xs"
              >
                <Volume2 className="w-3.5 h-3.5 text-[#E07A5F]" />
                <span>発音</span>
              </button>
            </div>

            {/* 실제 간판 느낌의 거대한 한글 글씨 - 웜톤 종이 보드 */}
            <div className="py-6 my-2 bg-white/80 backdrop-blur-xs rounded-2xl border border-[#EDE8E1] max-w-sm mx-auto shadow-inner">
              <span className="text-4xl sm:text-5xl font-black text-[#2D3748] tracking-wider block">
                {currentQuiz.korean}
              </span>
              <span className="text-xs text-[#718096] mt-2 block font-medium">
                この看板やメニューは何と読むでしょう？
              </span>
            </div>

            {/* 정답 발표 시 나타나는 발음 뱃지 */}
            {isAnswered && (
              <div className="mt-3 py-2 px-4 rounded-2xl bg-white border border-[#E07A5F]/30 inline-flex items-center gap-2 animate-in zoom-in-95 duration-200 shadow-2xs">
                <span className="text-sm font-bold text-[#E07A5F]">
                  読み: {currentQuiz.katakana}
                </span>
                <span className="text-[#718096] text-xs font-medium">（{currentQuiz.meaning}）</span>
              </div>
            )}
          </div>

          {/* 4지선다 선택지 버튼 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentQuiz.options.map((opt, idx) => {
              const isSelected = selectedOptionIndex === idx;
              let btnStyle = 'bg-white text-gray-800 border-[#EDE8E1] hover:border-[#E07A5F]';

              if (isAnswered) {
                if (opt.isCorrect) {
                  btnStyle = 'bg-emerald-50 text-emerald-800 border-emerald-500 font-bold ring-2 ring-emerald-500/20';
                } else if (isSelected && !opt.isCorrect) {
                  btnStyle = 'bg-rose-50 text-rose-700 border-rose-300 line-through opacity-75';
                } else {
                  btnStyle = 'bg-gray-50 text-gray-400 border-gray-200 opacity-50';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswered}
                  className={`p-4 rounded-2xl border text-left transition-all relative flex flex-col justify-center ${btnStyle} shadow-2xs`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold block">{opt.text}</span>
                    {isAnswered && opt.isCorrect && (
                      <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                    )}
                  </div>
                  <span className="text-[11px] text-gray-500 mt-0.5">
                    発音: <strong>{opt.katakana}</strong>
                  </span>
                </button>
              );
            })}
          </div>

          {/* 정답 후 공개되는 부산 현지 실전 꿀팁 카드 */}
          {isAnswered && (
            <div className="bg-[#FAF0E6] rounded-2xl p-4 border border-[#E07A5F]/20 space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex items-start gap-2.5">
                <div className="p-2 bg-white rounded-xl text-[#E07A5F] shadow-2xs border border-[#F4DDD4] shrink-0 mt-0.5">
                  <Lightbulb className="w-4 h-4 text-amber-500" />
                </div>
                <div className="space-y-1">
                  <h5 className="text-xs font-bold text-[#E07A5F]">
                    釜山ローカル旅のプチ知識（現場のコツ）
                  </h5>
                  <p className="text-xs text-[#4A5568] leading-relaxed">
                    {currentQuiz.tip}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-[#E07A5F]/15 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
                  {selectedOptionIndex !== null && currentQuiz.options[selectedOptionIndex]?.isCorrect ? (
                    <>
                      <Sparkles className="w-3.5 h-3.5 text-[#E07A5F]" />
                      <span>正解です！素晴らしい！</span>
                    </>
                  ) : (
                    <>
                      <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                      <span>間違えても大丈夫！何度も見て覚えましょう</span>
                    </>
                  )}
                </div>
                <button
                  onClick={handleNextQuiz}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#E07A5F] hover:bg-[#C8654B] text-white text-xs font-bold shadow-sm transition-transform active:scale-95"
                >
                  <span>次の問題へ</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
