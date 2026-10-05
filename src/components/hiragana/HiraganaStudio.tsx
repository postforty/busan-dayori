'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  HIRAGANA_GRID,
  DAKUON_GRID,
  ALL_SEION_CHARS,
  ALL_DAKUON_CHARS,
  COMBINED_HIRAGANA_CHARS,
  DAKUON_TRANSFORM_RULES,
  MINI_WORDS,
  SEION_MINI_WORDS,
  DAKUON_MINI_WORDS,
  CONFUSING_PAIRS,
  FIRST_DIALOGUE_LIST,
  HiraganaChar,
  MiniWord,
  FirstDialogueItem
} from '@/lib/curriculum/hiraganaData';
import { speakJapanese, stopJapaneseSpeech } from '@/utils/tts';
import {
  Volume2,
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
  Lightbulb,
  Type,
  Zap,
  ArrowLeftRight,
  Flower2
} from 'lucide-react';

import HiraganaFlashcards from './HiraganaFlashcards';
import MiniWordFlashcards from './MiniWordFlashcards';

type StudioStep = 'sound' | 'write' | 'cards' | 'words' | 'dialogue';
export type CharCategory = 'seion' | 'dakuon';

const ALL_HIRAGANA_CHARS: HiraganaChar[] = ALL_SEION_CHARS;

interface HiraganaStudioProps {
  initialStep?: StudioStep;
  initialChar?: string;
  initialCategory?: CharCategory;
}

export default function HiraganaStudio({
  initialStep = 'sound',
  initialChar = 'あ',
  initialCategory = 'seion'
}: HiraganaStudioProps) {
  const [currentStep, setCurrentStep] = useState<StudioStep>(initialStep);
  const [category, setCategory] = useState<CharCategory>(initialCategory);

  // 글꼴 상태 ('sans': 고딕/정자체, 'serif': 명조/흘림체)
  const [fontStyle, setFontStyle] = useState<'sans' | 'serif'>('sans');

  // 로컬 스토리지에서 글꼴 상태 동기화
  useEffect(() => {
    try {
      const saved = localStorage.getItem('hiragana_font_style');
      if (saved === 'sans' || saved === 'serif') {
        setFontStyle(saved);
      }
    } catch {
      // 무시
    }
  }, []);

  const handleToggleFontStyle = useCallback(() => {
    setFontStyle((prev) => {
      const next = prev === 'sans' ? 'serif' : 'sans';
      try {
        localStorage.setItem('hiragana_font_style', next);
      } catch {
        // 무시
      }
      return next;
    });
  }, []);

  // 현재 카테고리에 따른 그리드 및 글자 목록
  const currentGrid = category === 'seion' ? HIRAGANA_GRID : DAKUON_GRID;
  const currentChars = category === 'seion' ? ALL_SEION_CHARS : ALL_DAKUON_CHARS;

  // --- Step 1: 소리 탐색 상태 ---
  const [selectedChar, setSelectedChar] = useState<HiraganaChar>(() => {
    const all = [...ALL_SEION_CHARS, ...ALL_DAKUON_CHARS];
    const found = all.find((c) => c.char === initialChar);
    if (found) return found;
    return initialCategory === 'dakuon' ? ALL_DAKUON_CHARS[0] : ALL_SEION_CHARS[0];
  });
  const [playingChar, setPlayingChar] = useState<string | null>(null);

  // 카테고리(청음 ⇄ 탁음) 전환 핸들러
  const handleSelectCategory = useCallback((newCat: CharCategory) => {
    setCategory(newCat);
    if (newCat === 'seion') {
      const match = ALL_SEION_CHARS.find((c) => c.char === selectedChar.char);
      if (!match) setSelectedChar(ALL_SEION_CHARS[0]);
      setSelectedWord(SEION_MINI_WORDS[0]);
    } else {
      const match = ALL_DAKUON_CHARS.find((c) => c.char === selectedChar.char);
      if (!match) setSelectedChar(ALL_DAKUON_CHARS[0]);
      setSelectedWord(DAKUON_MINI_WORDS[0]);
    }
  }, [selectedChar.char]);

  // 청음 ⇄ 탁음 연속 비교 재생 핸들러 (A ➔ B)
  const handlePlayCompareSound = useCallback((baseCharText: string, dakuonCharText: string) => {
    stopJapaneseSpeech();
    setPlayingChar(baseCharText);
    speakJapanese(baseCharText, 0.85, undefined, () => {
      setPlayingChar(null);
      setTimeout(() => {
        setPlayingChar(dakuonCharText);
        speakJapanese(dakuonCharText, 0.85, undefined, () => {
          setPlayingChar(null);
        });
      }, 350);
    });
  }, []);

  // --- Step 2: 인터랙티브 캔버스 쓰기 상태 ---
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const charListScrollRef = useRef<HTMLDivElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const penColor = '#E07A5F'; // 기본 코랄 색상
  const strokeWidth = 10; // 기본 '보통' 두께
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

  // --- Step 4: 미니 단어 상태 ---
  const [wordsViewMode, setWordsViewMode] = useState<'cards' | 'grid'>('cards');
  const [selectedWord, setSelectedWord] = useState<MiniWord>(() =>
    initialCategory === 'dakuon' ? DAKUON_MINI_WORDS[0] : SEION_MINI_WORDS[0]
  );
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

    const fontFam =
      fontStyle === 'serif'
        ? "'Noto Serif JP', 'Yu Mincho', serif"
        : "'Klee One', 'Noto Sans JP', sans-serif";
    ctx.font = `bold 160px ${fontFam}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#000000';
    ctx.fillText(selectedChar.char, width / 2, height / 2);

    charMaskRef.current = ctx.getImageData(0, 0, width, height);
  }, [selectedChar, fontStyle]);

  // 글자 또는 글꼴 변경 시 캔버스 초기화 및 마스크 갱신
  useEffect(() => {
    clearCanvas();
    updateCharMask();
  }, [selectedChar, clearCanvas, updateCharMask, fontStyle]);

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
  }, [selectedChar.char, currentStep]);

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

      const currIdx = currentChars.findIndex((c) => c.char === selectedChar.char);
      if (currIdx >= 0 && currIdx < currentChars.length - 1) {
        const nextChar = currentChars[currIdx + 1];
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
            className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#E07A5F] hover:text-[#C55D42] bg-white/80 backdrop-blur-sm px-2.5 py-1 rounded-full border border-[#F4DDD4] transition-colors whitespace-nowrap shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5 shrink-0" />
            <span>
              로드맵<span className="hidden sm:inline">으로 돌아가기</span>
            </span>
          </Link>

          <div className="flex items-center gap-1.5 shrink-0">
            {/* 전체 글꼴 토글 버튼 */}
            <button
              type="button"
              onClick={handleToggleFontStyle}
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold transition-all border shadow-2xs whitespace-nowrap shrink-0 ${fontStyle === 'serif'
                ? 'bg-[#FAF0E6] text-[#E07A5F] border-[#F4DDD4] font-serif'
                : 'bg-white/90 hover:bg-white text-[#4A5568] border-[#EDE8E1] font-sans'
                }`}
              title="글꼴 변경: 또박또박한 정자체(고딕) ⇄ 붓글씨 느낌 흘림체(명조)"
            >
              <Type className="w-3 h-3 text-[#E07A5F] shrink-0" />
              <span>
                {fontStyle === 'serif' ? '흘림' : '정자'}
              </span>
            </button>

            <div className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-100 text-amber-800 rounded-full text-[11px] font-black border border-amber-300 shadow-2xs whitespace-nowrap shrink-0">
              <Sparkles className="w-3 h-3 text-amber-600 shrink-0" />
              <span>
                Lv.0 입문<span className="hidden sm:inline"> 스튜디오</span>
              </span>
            </div>
          </div>
        </div>

        <h1 className="text-xl font-black text-[#2D3748] tracking-tight leading-snug mb-1">
          ひらがな マスター
          <br />
          <span className="text-[#E07A5F] text-lg">소리로 듣고 손으로 익히는 히라가나</span>
        </h1>
        <p className="text-xs text-[#718096] leading-relaxed">
          일본어의 첫 단추! 50음도 소리 탐색부터 획순 손글씨 연습, 플래시 암기 카드, 실생활 미니 단어 읽기까지 차근차근 마스터해요.
        </p>

        {/* ========================================================
            학습 단계 & 음도 모드 컨트롤 패널 (2-Column 분리 구조)
            - 좌측 컬럼: 문자/단어 4단계 + 기본/탁음 스위처 (음도 종속 영역)
            - 우측 컬럼: [첫 발화] 단독 컬럼 (음도 무관 종합 실전 회화)
        ======================================================== */}
        <div className="grid grid-cols-[1fr_auto] gap-2 mt-4 pt-3 border-t border-[#F4DDD4]/80 items-stretch">
          {/* 1. 좌측 컬럼: 글자 & 단어 학습 영역 (소리/쓰기/암기/단어 + 음도 스위처) */}
          <div className="flex flex-col justify-between gap-1.5 min-w-0">
            {/* 1-1. 문자 학습 4단계 탭 버튼 */}
            <div className="grid grid-cols-4 gap-1">
              {[
                { key: 'sound', label: '소리 탐색', icon: Volume2 },
                { key: 'write', label: '쓰기 연습', icon: Pencil },
                { key: 'cards', label: '암기 카드', icon: Sparkles },
                { key: 'words', label: '미니 단어', icon: BookOpen }
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
                    className={`flex flex-col items-center justify-center py-2 px-0.5 rounded-2xl text-[10px] sm:text-[11px] font-bold transition-all ${
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

            {/* 1-2. 기본 50음도 ⇄ 탁음·반탁음 모드 스위처 (좌측 4개 탭에만 종속) */}
            <div className={`flex items-center p-1 bg-white/70 backdrop-blur-xs rounded-2xl border border-[#F4DDD4] transition-all min-w-0 overflow-hidden ${
              currentStep === 'dialogue' ? 'opacity-40 pointer-events-none' : ''
            }`}>
              <button
                type="button"
                onClick={() => handleSelectCategory('seion')}
                className={`flex-1 min-w-0 py-1.5 px-1.5 sm:px-2.5 rounded-xl text-[10px] sm:text-xs font-black transition-all flex items-center justify-center gap-1 sm:gap-1.5 ${
                  category === 'seion' && currentStep !== 'dialogue'
                    ? 'bg-[#E07A5F] text-white shadow-xs'
                    : 'text-[#718096] hover:text-[#2D3748] hover:bg-white/50'
                }`}
              >
                <Flower2 className={`w-3.5 h-3.5 shrink-0 ${category === 'seion' && currentStep !== 'dialogue' ? 'text-white' : 'text-[#E07A5F]'}`} />
                <span className="truncate min-w-0">
                  <span className="sm:hidden">50음도</span>
                  <span className="hidden sm:inline">기본 50음도</span>
                </span>
                <span
                  className={`text-[9px] sm:text-[10px] px-1 sm:px-1.5 py-0.5 rounded-full font-bold shrink-0 ${
                    category === 'seion' && currentStep !== 'dialogue'
                      ? 'bg-white/20 text-white'
                      : 'bg-stone-200/60 text-[#718096]'
                  }`}
                >
                  46자
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleSelectCategory('dakuon')}
                className={`flex-1 min-w-0 py-1.5 px-1.5 sm:px-2.5 rounded-xl text-[10px] sm:text-xs font-black transition-all flex items-center justify-center gap-1 sm:gap-1.5 ${
                  category === 'dakuon' && currentStep !== 'dialogue'
                    ? 'bg-[#E07A5F] text-white shadow-xs'
                    : 'text-[#718096] hover:text-[#2D3748] hover:bg-white/50'
                }`}
              >
                <Sparkles className={`w-3.5 h-3.5 shrink-0 ${category === 'dakuon' && currentStep !== 'dialogue' ? 'text-amber-200' : 'text-amber-500'}`} />
                <span className="truncate min-w-0">
                  <span className="sm:hidden">탁음</span>
                  <span className="hidden sm:inline">탁음 · 반탁음</span>
                </span>
                <span
                  className={`text-[9px] sm:text-[10px] px-1 sm:px-1.5 py-0.5 rounded-full font-bold shrink-0 ${
                    category === 'dakuon' && currentStep !== 'dialogue'
                      ? 'bg-white/20 text-white'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  25자
                </span>
              </button>
            </div>
          </div>

          {/* 2. 우측 컬럼: [첫 발화] 단독 컬럼 (종합 실전 회화 코스) */}
          <div className="w-[72px] sm:w-[88px] flex flex-col shrink-0">
            <button
              type="button"
              onClick={() => {
                stopJapaneseSpeech();
                setCurrentStep('dialogue');
              }}
              className={`w-full h-full min-h-[96px] flex flex-col items-center justify-center p-2 rounded-2xl transition-all border relative overflow-hidden group ${
                currentStep === 'dialogue'
                  ? 'bg-gradient-to-b from-[#E07A5F] to-[#C95B40] text-white border-[#B84E35] shadow-md ring-2 ring-[#E07A5F]/20 scale-[1.02]'
                  : 'bg-white/80 hover:bg-white text-[#718096] hover:text-[#2D3748] border-[#EDE8E1] hover:border-[#F4DDD4]'
              }`}
              title="배운 히라가나로 첫 인사 회화 문장 말해보기"
            >
              <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-full mb-1 transition-colors whitespace-nowrap ${
                currentStep === 'dialogue'
                  ? 'bg-white/25 text-white'
                  : 'bg-amber-100 text-amber-800 group-hover:bg-amber-200'
              }`}>
                실전 회화
              </span>
              <Flame className={`w-5 h-5 mb-1 transition-transform group-hover:scale-110 shrink-0 ${
                currentStep === 'dialogue' ? 'text-amber-300 animate-pulse' : 'text-[#E07A5F]'
              }`} />
              <span className="text-[11px] sm:text-xs font-black truncate whitespace-nowrap">
                첫 발화
              </span>
              <span className={`text-[9px] font-medium mt-0.5 whitespace-nowrap ${
                currentStep === 'dialogue' ? 'text-white/80' : 'text-[#A0AEC0]'
              }`}>
                도전
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================
          STEP 1: 소리 탐색 (Phonetics Soundboard)
      ======================================================== */}
      {currentStep === 'sound' && (
        <section className="space-y-4">
          <div className="bg-white rounded-3xl p-5 border border-[#EDE8E1] shadow-xs space-y-4">
            <div className="flex items-center justify-between gap-2.5">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-7 h-7 rounded-xl bg-[#FAF0E6] flex items-center justify-center text-[#E07A5F] shrink-0">
                  <Volume2 className="w-4 h-4" />
                </div>
                <h2 className="text-sm font-black text-[#2D3748] flex items-center gap-1.5 truncate">
                  <span>{category === 'seion' ? '五十音図' : '濁音・半濁音'}</span>
                  <span className="text-xs font-semibold text-[#A0AEC0]">
                    {category === 'seion' ? '(기본 50음도)' : '(탁음·반탁음 25자)'}
                  </span>
                </h2>
              </div>

              {/* 현재 선택된 글자 바로 쓰기 링크 */}
              <button
                type="button"
                onClick={() => setCurrentStep('write')}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold border border-amber-200 transition-colors shrink-0 whitespace-nowrap"
              >
                <span>&apos;{selectedChar.char}&apos; 써보기</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* 탁음 모드일 때 탁점 변환 공식 요약 배너 */}
            {category === 'dakuon' && (
              <div className="bg-gradient-to-r from-amber-50 to-[#FFF9F2] rounded-2xl p-3 border border-amber-200/80 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 min-w-0">
                    <Zap className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span className="truncate whitespace-nowrap break-keep">
                      <span className="sm:hidden">탁점 · 반탁점 변환 공식</span>
                      <span className="hidden sm:inline">탁점(゛) & 반탁점(゜) 소리 변환 공식</span>
                    </span>
                  </div>
                  <span className="text-[10px] text-amber-700 font-medium shrink-0 whitespace-nowrap">
                    <span className="sm:hidden">행 이동 ➔</span>
                    <span className="hidden sm:inline">클릭 시 해당 행 이동</span>
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
                  {DAKUON_TRANSFORM_RULES.map((rule) => {
                    const isRuleActive = selectedChar.row === rule.examplePair.dakuon;
                    return (
                      <button
                        key={rule.id}
                        type="button"
                        onClick={() => {
                          const targetChar = ALL_DAKUON_CHARS.find((c) => c.char === rule.examplePair.dakuon);
                          if (targetChar) {
                            setSelectedChar(targetChar);
                            handlePlayCharSound(targetChar);
                          }
                        }}
                        className={`p-1.5 rounded-xl border text-center transition-all ${isRuleActive
                          ? 'bg-white border-[#E07A5F] shadow-xs ring-1 ring-[#E07A5F]'
                          : 'bg-white/80 hover:bg-white border-amber-200/60'
                          }`}
                      >
                        <div className="text-[11px] font-black text-[#2D3748]">
                          {rule.changeFormula}
                        </div>
                        <div className="text-[10px] text-[#718096] flex items-center justify-center gap-1 mt-0.5">
                          <span>{rule.examplePair.seion}</span>
                          <span className="text-amber-500 font-bold">{rule.mark}</span>
                          <span>➔</span>
                          <span className="font-bold text-[#E07A5F]">{rule.examplePair.dakuon}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 글자 그리드 표 (청음 or 탁음) */}
            <div className="space-y-2">
              {/* 열 헤더 (단) */}
              <div className="flex items-center gap-2">
                <span className="w-14 shrink-0" aria-hidden="true" />
                <div className="grid grid-cols-5 gap-1.5 flex-1">
                  {['あ단 (a)', 'い단 (i)', 'う단 (u)', 'え단 (e)', 'お단 (o)'].map((dan) => (
                    <span
                      key={dan}
                      className="text-center text-[10px] sm:text-[11px] font-extrabold text-[#A0AEC0]"
                    >
                      {dan}
                    </span>
                  ))}
                </div>
              </div>

              {currentGrid.map((row) => (
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
                            className="w-full h-full rounded-2xl bg-stone-50/60 border border-dashed border-[#EDE8E1]"
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
                          className={`aspect-square rounded-2xl flex flex-col items-center justify-center p-1 transition-all relative group ${isSelected
                            ? 'bg-[#FAF0E6] border-2 border-[#E07A5F] shadow-xs scale-105 z-10'
                            : 'bg-white hover:bg-stone-50 border border-[#EDE8E1] hover:border-[#E07A5F]/50'
                            }`}
                        >
                          <span
                            className={`text-lg font-bold leading-none transition-all ${isSelected ? 'text-[#E07A5F]' : 'text-[#2D3748]'
                              } ${fontStyle === 'serif'
                                ? 'font-jp-mincho'
                                : 'font-jp-gothic'
                              }`}
                            style={{
                              fontFamily:
                                fontStyle === 'serif'
                                  ? "'Noto Serif JP', 'Yu Mincho', serif"
                                  : "'Klee One', 'Noto Sans JP', sans-serif"
                            }}
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
                <div
                  className={`w-14 h-14 rounded-2xl bg-[#FAF0E6] border border-[#F4DDD4] flex items-center justify-center text-3xl font-bold text-[#E07A5F] ${fontStyle === 'serif'
                    ? 'font-jp-mincho'
                    : 'font-jp-gothic'
                    }`}
                  style={{
                    fontFamily:
                      fontStyle === 'serif'
                        ? "'Noto Serif JP', 'Yu Mincho', serif"
                        : "'Klee One', 'Noto Sans JP', sans-serif"
                  }}
                >
                  {selectedChar.char}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-black text-[#2D3748]">
                      <span
                        className={fontStyle === 'serif' ? 'font-jp-mincho' : 'font-jp-gothic'}
                        style={{
                          fontFamily:
                            fontStyle === 'serif'
                              ? "'Noto Serif JP', 'Yu Mincho', serif"
                              : "'Klee One', 'Noto Sans JP', sans-serif"
                        }}
                      >
                        {selectedChar.char}
                      </span>{' '}
                      [{selectedChar.koreanSound}]
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

            {/* 탁음인 경우: 청음 ⇄ 탁음 A/B 소리 대조 카드 */}
            {selectedChar.baseChar && (
              <div className="p-3.5 rounded-2xl bg-white border border-[#F4DDD4] shadow-xs space-y-2.5">
                <div className="flex items-center justify-between text-xs font-bold text-[#2D3748]">
                  <span className="flex items-center gap-1.5">
                    <ArrowLeftRight className="w-3.5 h-3.5 text-[#E07A5F]" />
                    <span>소리 변화 귀로 대조하기</span>
                  </span>
                  <span className="text-[10px] text-[#A0AEC0]">
                    {selectedChar.soundType === 'handakuon' ? '맑은 소리 ➔ 팡 터지는 소리' : '맑은 소리 ➔ 목 울리는 소리'}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2 p-2.5 bg-[#FAF0E6]/50 rounded-xl border border-[#F4DDD4]/60">
                  {/* 청음 (원래 글자) */}
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-2xl font-bold text-[#4A5568] ${fontStyle === 'serif' ? 'font-jp-mincho' : 'font-jp-gothic'}`}
                    >
                      {selectedChar.baseChar}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        stopJapaneseSpeech();
                        setPlayingChar(selectedChar.baseChar!);
                        speakJapanese(selectedChar.baseChar!, 0.85, undefined, () => setPlayingChar(null));
                      }}
                      className="px-2 py-1 rounded-lg bg-white hover:bg-stone-50 border border-stone-200 text-[11px] font-bold text-[#4A5568] transition-colors flex items-center gap-1 shadow-2xs"
                    >
                      <Volume2 className="w-3 h-3 text-[#718096]" />
                      <span>{selectedChar.baseChar} (청음)</span>
                    </button>
                  </div>

                  <span className="text-sm font-black text-[#E07A5F]">➔</span>

                  {/* 탁음 (현재 글자) */}
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-2xl font-bold text-[#E07A5F] ${fontStyle === 'serif' ? 'font-jp-mincho' : 'font-jp-gothic'}`}
                    >
                      {selectedChar.char}
                    </span>
                    <button
                      type="button"
                      onClick={() => handlePlayCharSound(selectedChar)}
                      className="px-2 py-1 rounded-lg bg-[#E07A5F] hover:bg-[#C55D42] text-white text-[11px] font-bold transition-colors flex items-center gap-1 shadow-2xs"
                    >
                      <Volume2 className="w-3 h-3" />
                      <span>{selectedChar.char} ({selectedChar.soundType === 'handakuon' ? '반탁음' : '탁음'})</span>
                    </button>
                  </div>
                </div>

                {/* 연달아 비교 재생 버튼 */}
                <button
                  type="button"
                  onClick={() => handlePlayCompareSound(selectedChar.baseChar!, selectedChar.char)}
                  className="w-full py-2 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold border border-amber-300 transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>&apos;{selectedChar.baseChar}&apos; ➔ &apos;{selectedChar.char}&apos; 소리 차이 연달아 듣기</span>
                </button>
              </div>
            )}

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
              <span>&apos;{selectedChar.char}&apos; 캔버스에서 직접 써보기 (Step 2)</span>
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
            <div className="flex items-center justify-between gap-2.5">
              <div className="min-w-0">
                <h2 className="text-sm font-bold text-[#2D3748]">
                  손글씨 캔버스 쓰기 연습
                </h2>
                <p className="text-xs text-[#718096] truncate">
                  가이드 글자 위로 손가락이나 마우스로 직접 획을 그어보세요.
                </p>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => handlePlayCharSound(selectedChar)}
                  className="p-2 rounded-xl bg-stone-100 hover:bg-[#FAF0E6] text-[#718096] hover:text-[#E07A5F] transition-colors shrink-0"
                  title="발음 듣기"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={clearCanvas}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-[#4A5568] text-xs font-bold transition-colors shrink-0 whitespace-nowrap"
                  title="지우기"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>지우기</span>
                </button>
              </div>
            </div>

            {/* 빠른 글자 선택 칩 헤더 & 수집 진행 현황 */}
            <div className="flex items-center justify-between text-xs font-bold text-[#718096] pt-1">
              <span>{category === 'seion' ? '50음도 글자 목록' : '탁음·반탁음 글자 목록'}</span>
              <span className="text-[11px] font-bold text-[#E07A5F] bg-[#FAF0E6] px-2.5 py-0.5 rounded-full border border-[#F4DDD4]">
                완료 {completedChars.filter((c) => currentChars.some((cc) => cc.char === c)).length} / {currentChars.length}
              </span>
            </div>

            {/* 빠른 글자 선택 칩 */}
            <div
              ref={charListScrollRef}
              className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 scroll-smooth"
            >
              {currentChars.map((c) => {
                const isSelected = selectedChar.char === c.char;
                const isDone = completedChars.includes(c.char);
                return (
                  <button
                    key={c.char}
                    type="button"
                    data-active={isSelected}
                    onClick={() => setSelectedChar(c)}
                    className={`relative w-9 h-9 rounded-xl text-sm font-bold shrink-0 transition-all ${isSelected
                      ? 'bg-[#E07A5F] text-white shadow-2xs scale-105'
                      : isDone
                        ? 'bg-amber-50 text-[#8D5B4C] border border-amber-300'
                        : 'bg-stone-50 hover:bg-[#FAF0E6] text-[#4A5568] border border-[#EDE8E1]'
                      } ${fontStyle === 'serif'
                        ? 'font-jp-mincho'
                        : 'font-jp-gothic'
                      }`}
                    style={{
                      fontFamily:
                        fontStyle === 'serif'
                          ? "'Noto Serif JP', 'Yu Mincho', serif"
                          : "'Klee One', 'Noto Sans JP', sans-serif"
                    }}
                  >
                    {c.char}
                    {isDone && (
                      <span
                        className={`absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] font-black shadow-2xs ${isSelected ? 'bg-white text-[#E07A5F]' : 'bg-amber-500 text-white'
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
              className={`relative w-full aspect-square max-w-[340px] mx-auto bg-[#FFFDF9] rounded-3xl overflow-hidden shadow-inner flex items-center justify-center transition-all duration-500 ${isCharCompleted
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
                <span
                  className={`text-[160px] font-bold text-stone-200 leading-none ${fontStyle === 'serif'
                    ? 'font-jp-mincho'
                    : 'font-jp-gothic'
                    }`}
                  style={{
                    fontFamily:
                      fontStyle === 'serif'
                        ? "'Noto Serif JP', 'Yu Mincho', serif"
                        : "'Klee One', 'Noto Sans JP', sans-serif"
                  }}
                >
                  {selectedChar.char}
                </span>
              </div>

              {/* 획순 팁 및 완료 배지 */}
              <div
                className={`absolute top-3 left-3 backdrop-blur-sm px-2.5 py-1 rounded-full text-[11px] font-bold transition-all duration-300 pointer-events-none flex items-center gap-1 shadow-2xs ${isCharCompleted
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
                    <Pencil className="w-3 h-3 text-[#E07A5F]" />
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



            {/* 획순 가이드 단계별 스텝 칩 */}
            {selectedChar.strokeGuide && (() => {
              const steps = selectedChar.strokeGuide
                .split(/➔|->/)
                .map((s) => s.trim())
                .filter(Boolean);

              return (
                <div className="bg-[#FAF9F7] p-3 rounded-2xl border border-[#EDE8E1] space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 font-bold text-[#4A5568]">
                      <Pencil className="w-3.5 h-3.5 text-[#E07A5F]" />
                      <span>획순 가이드</span>
                    </div>
                    <span className="text-[11px] font-bold text-[#A0AEC0]">
                      총 {selectedChar.strokeCount}획
                    </span>
                  </div>

                  <div className="flex items-center flex-wrap gap-1.5 text-xs">
                    {steps.map((step, idx) => (
                      <React.Fragment key={idx}>
                        <span className="inline-flex items-center px-2.5 py-1 bg-white rounded-xl border border-[#EDE8E1] font-bold text-[#4A5568] shadow-2xs whitespace-nowrap text-[11px]">
                          {step}
                        </span>
                        {idx < steps.length - 1 && (
                          <span className="text-[#CBD5E0] text-[10px] font-black shrink-0">➔</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              );
            })()}

          </div>

          {/* 도플갱어 (헷갈리기 쉬운 글자) 대조 카드 */}
          <div className="bg-white rounded-3xl p-5 border border-[#EDE8E1] shadow-xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 shrink-0">
                <Sparkles className="w-4 h-4 text-[#E07A5F]" />
                <h3 className="text-sm font-bold text-[#2D3748] whitespace-nowrap">
                  도플갱어 글자 대조 클리닉
                </h3>
              </div>

              {/* 페어 전환 탭 */}
              <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
                {CONFUSING_PAIRS.map((pair, idx) => (
                  <button
                    key={pair.id}
                    type="button"
                    onClick={() => setSelectedConfusingIndex(idx)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors shrink-0 whitespace-nowrap ${selectedConfusingIndex === idx
                      ? 'bg-[#E07A5F] text-white shadow-2xs'
                      : 'bg-stone-100 text-[#718096] hover:bg-stone-200'
                      }`}
                  >
                    <span
                      className={fontStyle === 'serif' ? 'font-jp-mincho' : 'font-jp-gothic'}
                      style={{
                        fontFamily:
                          fontStyle === 'serif'
                            ? "'Noto Serif JP', 'Yu Mincho', serif"
                            : "'Klee One', 'Noto Sans JP', sans-serif"
                      }}
                    >
                      {pair.char1.char}
                    </span>
                    {' vs '}
                    <span
                      className={fontStyle === 'serif' ? 'font-jp-mincho' : 'font-jp-gothic'}
                      style={{
                        fontFamily:
                          fontStyle === 'serif'
                            ? "'Noto Serif JP', 'Yu Mincho', serif"
                            : "'Klee One', 'Noto Sans JP', sans-serif"
                      }}
                    >
                      {pair.char2.char}
                    </span>
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
                          <span
                            className={`text-3xl font-bold text-[#E07A5F] ${fontStyle === 'serif'
                              ? 'font-jp-mincho'
                              : 'font-jp-gothic'
                              }`}
                            style={{
                              fontFamily:
                                fontStyle === 'serif'
                                  ? "'Noto Serif JP', 'Yu Mincho', serif"
                                  : "'Klee One', 'Noto Sans JP', sans-serif"
                            }}
                          >
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

                  <p className="text-xs text-amber-900 bg-amber-50/80 p-2.5 rounded-xl border border-amber-200/70 leading-relaxed font-medium flex items-start gap-1.5">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>암기 팁:</strong> {currentPair.tip}
                    </span>
                  </p>
                </div>
              );
            })()}
          </div>

          {/* 다음 단계(Step 3 암기 카드) 이동 CTA */}
          <button
            type="button"
            onClick={() => {
              stopJapaneseSpeech();
              setCurrentStep('cards');
            }}
            className="w-full py-3 px-4 rounded-2xl bg-[#2D3748] hover:bg-stone-800 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-xs"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>플래시 암기 카드로 자가 점검하기 (Step 3)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </section>
      )}

      {/* ========================================================
          STEP 3: 플래시 암기 카드 (Active Recall Flashcards)
      ======================================================== */}
      {currentStep === 'cards' && (
        <HiraganaFlashcards
          key={category}
          fontStyle={fontStyle}
          onToggleFontStyle={handleToggleFontStyle}
          category={category}
          onCompleteToNextStep={() => {
            stopJapaneseSpeech();
            setWordsViewMode('cards');
            setCurrentStep('words');
          }}
        />
      )}

      {/* ========================================================
          STEP 4: 미니 단어 (Mini Words) - 암기 카드 & 도감 보기
      ======================================================== */}
      {currentStep === 'words' && (
        <section className="space-y-4">
          {/* 서브 탭: 암기 카드 vs 단어 도감 */}
          <div className="bg-white rounded-3xl p-4 border border-[#EDE8E1] shadow-xs flex items-center justify-between gap-2">
            <div className="min-w-0">
              <h2 className="text-sm font-black text-[#2D3748] truncate">
                배운 글자로 읽는 실생활 미니 단어
              </h2>
              <p className="text-xs text-[#718096] truncate">
                {wordsViewMode === 'cards'
                  ? '카드를 뒤집으며 단어의 뜻과 음절 소리를 외워요.'
                  : '12개 단어를 한눈에 모아보며 발음을 들어봐요.'}
              </p>
            </div>

            {/* 뷰 모드 스위치 */}
            <div className="flex items-center bg-stone-100 p-0.5 rounded-2xl border border-[#EDE8E1] shrink-0">
              <button
                type="button"
                onClick={() => setWordsViewMode('cards')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${wordsViewMode === 'cards'
                  ? 'bg-[#E07A5F] text-white shadow-2xs'
                  : 'text-[#718096] hover:text-[#2D3748]'
                  }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>암기 카드</span>
              </button>
              <button
                type="button"
                onClick={() => setWordsViewMode('grid')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${wordsViewMode === 'grid'
                  ? 'bg-[#2D3748] text-white shadow-2xs'
                  : 'text-[#718096] hover:text-[#2D3748]'
                  }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>도감 보기</span>
              </button>
            </div>
          </div>

          {/* 1) 암기 카드 모드 */}
          {wordsViewMode === 'cards' && (
            <MiniWordFlashcards
              key={category}
              category={category}
              fontStyle={fontStyle}
              onToggleFontStyle={handleToggleFontStyle}
              onCompleteToNextStep={() => {
                stopJapaneseSpeech();
                setCurrentStep('dialogue');
              }}
            />
          )}

          {/* 2) 단어 도감 모드 */}
          {wordsViewMode === 'grid' && (() => {
            const displayedWords = category === 'dakuon' ? DAKUON_MINI_WORDS : SEION_MINI_WORDS;
            return (
              <div className="space-y-4">
                <div className="bg-white rounded-3xl p-5 border border-[#EDE8E1] shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#718096]">
                      {category === 'dakuon'
                        ? `탁음·반탁음 단어 목록 (${displayedWords.length})`
                        : `기본 단어 목록 (${displayedWords.length})`}
                    </span>
                  </div>

                  {/* 미니 단어 그리드 */}
                  <div className="grid grid-cols-2 gap-2.5">
                    {displayedWords.map((word) => {
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
                          className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col gap-2 group relative overflow-hidden ${isSelected
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
                            <span
                              className={`text-lg font-bold text-[#2D3748] tracking-wider group-hover:text-[#E07A5F] transition-colors ${fontStyle === 'serif' ? 'font-jp-mincho' : 'font-jp-gothic'
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
                            className={`p-1.5 rounded-full transition-colors ${isPlaying
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

              {/* 다음 단계(Step 5 첫 발화) 이동 CTA */}
              <button
                type="button"
                onClick={() => {
                  stopJapaneseSpeech();
                  setCurrentStep('dialogue');
                }}
                className="w-full py-3 px-4 rounded-2xl bg-[#2D3748] hover:bg-stone-800 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-xs"
              >
                <Flame className="w-4 h-4 text-amber-400" />
                <span>배운 단어로 첫 인사 발화 연습하기 (Step 5)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })()}
      </section>
      )}

      {/* ========================================================
          STEP 5: 첫 발화 챌린지 (First Dialogue)
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
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border shrink-0 whitespace-nowrap ${showKoreanPronunciation
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
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#E07A5F]">
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>발화 완료!</span>
                        </span>
                      )}
                    </div>

                    {/* 일본어 텍스트 및 발음 */}
                    <div className="space-y-1">
                      <div className="flex items-baseline justify-between">
                        <span
                          className={`text-xl font-black text-[#2D3748] tracking-wider transition-colors ${fontStyle === 'serif' ? 'font-jp-mincho' : 'font-jp-gothic'
                            }`}
                          style={{
                            fontFamily:
                              fontStyle === 'serif'
                                ? "'Noto Serif JP', 'Yu Mincho', serif"
                                : "'Klee One', 'Noto Sans JP', sans-serif"
                          }}
                        >
                          {item.japanese}
                        </span>

                        <button
                          type="button"
                          onClick={() => handlePlayDialogueSound(item)}
                          className={`p-2 rounded-xl transition-all ${isPlaying
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
                        <p className="text-xs font-bold text-[#C45B40]">
                          [{item.koreanPronunciation}] ({item.romaji})
                        </p>
                      )}

                      <p className="text-xs font-semibold text-[#4A5568]">
                        뜻: {item.koreanMeaning}
                      </p>
                    </div>

                    {/* 발화 팁 */}
                    <div className="text-[11px] text-[#718096] bg-[#FAF9F7] p-2.5 rounded-xl border border-[#EDE8E1] flex items-start gap-1.5 leading-relaxed">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                      <span>{item.tip}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 수료 축하 카드 (Lv.0 ➔ Lv.1 코랄 성장 사다리 규격) */}
          <div className="bg-gradient-to-br from-[#FFF9F2] via-[#FAF0E6] to-[#FFF6F1] rounded-3xl p-6 border border-[#F4DDD4] shadow-xs text-center space-y-3">
            <div className="w-12 h-12 bg-white text-[#E07A5F] rounded-full flex items-center justify-center mx-auto shadow-xs border border-[#F4DDD4]">
              <Sparkles className="w-6 h-6 text-[#E07A5F]" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-black text-[#2D3748]">
                축하합니다! 히라가나 첫걸음 완주
              </h3>
              <p className="text-xs text-[#718096] leading-relaxed max-w-sm mx-auto">
                이제 기본 글자를 읽을 수 있는 단단한 기초가 마련되었습니다.
                다음 단계인 <strong className="text-[#E07A5F]">Lv.1 초급 (기본 패턴 & 여행 회화)</strong>으로 나아가 볼까요?
              </p>
            </div>

            <Link
              href="/roadmap"
              className="inline-flex items-center justify-center gap-1.5 py-3 px-6 rounded-2xl bg-[#E07A5F] hover:bg-[#C45B40] text-white text-xs font-black transition-all shadow-xs active:scale-95"
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
