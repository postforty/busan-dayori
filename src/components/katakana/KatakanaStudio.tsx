'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Link from 'next/link';
import {
  Volume2,
  Sparkles,
  RotateCcw,
  PenTool,
  CheckCircle2,
  ChevronRight,
  BookOpen,
  ArrowRight,
  Gamepad2,
  Layers,
  AlertCircle,
  HelpCircle,
  Type,
  ArrowLeft,
  Pencil
} from 'lucide-react';
import {
  KATAKANA_GRID,
  KATAKANA_DAKUON_GRID,
  KATAKANA_YOUON_GRID,
  KATAKANA_SPECIAL_GRID,
  ALL_KATAKANA_SEION_CHARS,
  ALL_KATAKANA_DAKUON_CHARS,
  ALL_KATAKANA_YOUON_CHARS,
  ALL_KATAKANA_SPECIAL_CHARS,
  ALL_KATAKANA_CHARS,
  CONFUSING_KATAKANA_PAIRS,
  KatakanaChar,
  ConfusingKatakanaPair,
  playKatakanaAudio
} from '@/lib/curriculum/katakanaData';
import KatakanaMatchGame from '@/components/katakana/KatakanaMatchGame';
import TravelKatakanaWords from '@/components/katakana/TravelKatakanaWords';
import KatakanaFlashcards from '@/components/katakana/KatakanaFlashcards';

export type KatakanaCategory = 'seion' | 'dakuon' | 'youon' | 'special';
export type KatakanaStudioStep = 'sound' | 'cards' | 'confusing' | 'write' | 'match' | 'travel';

interface KatakanaStudioProps {
  initialStep?: KatakanaStudioStep;
  initialChar?: string;
  initialCategory?: KatakanaCategory;
}

export default function KatakanaStudio({
  initialStep = 'sound',
  initialChar = 'ア',
  initialCategory = 'seion'
}: KatakanaStudioProps) {
  const [currentStep, setCurrentStep] = useState<KatakanaStudioStep>(initialStep);
  const [category, setCategory] = useState<KatakanaCategory>(initialCategory);
  const [fontStyle, setFontStyle] = useState<'sans' | 'serif'>('sans');

  const handleToggleFontStyle = useCallback(() => {
    setFontStyle((prev) => {
      const next = prev === 'sans' ? 'serif' : 'sans';
      try {
        localStorage.setItem('katakana_font_style', next);
      } catch {
        // 무시
      }
      return next;
    });
  }, []);

  // 현재 카테고리에 맞는 그리드 및 글자 리스트
  const currentGrid = useMemo(() => {
    switch (category) {
      case 'dakuon':
        return KATAKANA_DAKUON_GRID;
      case 'youon':
        return KATAKANA_YOUON_GRID;
      case 'special':
        return KATAKANA_SPECIAL_GRID;
      case 'seion':
      default:
        return KATAKANA_GRID;
    }
  }, [category]);

  const currentChars = useMemo(() => {
    switch (category) {
      case 'dakuon':
        return ALL_KATAKANA_DAKUON_CHARS;
      case 'youon':
        return ALL_KATAKANA_YOUON_CHARS;
      case 'special':
        return ALL_KATAKANA_SPECIAL_CHARS;
      case 'seion':
      default:
        return ALL_KATAKANA_SEION_CHARS;
    }
  }, [category]);

  // 선택된 글자 상태
  const [selectedChar, setSelectedChar] = useState<KatakanaChar>(() => {
    const found = ALL_KATAKANA_CHARS.find((c) => c.char === initialChar);
    if (found) return found;
    return ALL_KATAKANA_SEION_CHARS[0];
  });
  const [playingChar, setPlayingChar] = useState<string | null>(null);

  // 카테고리 변경 시 글자 재설정
  const handleSelectCategory = (newCat: KatakanaCategory) => {
    setCategory(newCat);
    if (newCat === 'seion') {
      setSelectedChar(ALL_KATAKANA_SEION_CHARS[0]);
    } else if (newCat === 'dakuon') {
      setSelectedChar(ALL_KATAKANA_DAKUON_CHARS[0]);
    } else if (newCat === 'youon') {
      setSelectedChar(ALL_KATAKANA_YOUON_CHARS[0]);
    } else if (newCat === 'special') {
      setSelectedChar(ALL_KATAKANA_SPECIAL_CHARS[0]);
    }
  };

  const handlePlaySound = useCallback((char: KatakanaChar) => {
    setPlayingChar(char.char);
    playKatakanaAudio(char.char);
    setTimeout(() => {
      setPlayingChar(null);
    }, 600);
  }, []);

  // --- Step 2: 도플갱어 비교 모드 상태 ---
  const [selectedPair, setSelectedPair] = useState<ConfusingKatakanaPair>(
    CONFUSING_KATAKANA_PAIRS[0]
  );

  // --- Step 3: 손글씨 캔버스 쓰기 상태 (히라가나 마스터 동등 엔진) ---
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const charListScrollRef = useRef<HTMLDivElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const penColor = '#3D5A80'; // 가타카나 테마 인디고 블루 색상
  const strokeWidth = 10; // 기본 '보통' 두께
  const [drawnStrokes, setDrawnStrokes] = useState<number>(0);
  const [isCharCompleted, setIsCharCompleted] = useState<boolean>(false);
  const [completedChars, setCompletedChars] = useState<string[]>([]);
  const autoNextTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 로컬 스토리지에서 글꼴 및 완료 글자 상태 동기화 (SSR Hydration Mismatch 방지)
  useEffect(() => {
    try {
      const savedFont = localStorage.getItem('katakana_font_style');
      if (savedFont === 'sans' || savedFont === 'serif') {
        queueMicrotask(() => setFontStyle(savedFont));
      }
      const savedChars = localStorage.getItem('katakana_completed_chars');
      if (savedChars) {
        queueMicrotask(() => setCompletedChars(JSON.parse(savedChars)));
      }
    } catch {
      // 무시
    }
  }, []);

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
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#000000';

    if (selectedChar.soundType === 'youon' && selectedChar.baseChar && selectedChar.smallChar) {
      ctx.font = `bold 115px ${fontFam}`;
      ctx.fillText(selectedChar.baseChar, width * 0.38, height / 2);
      ctx.font = `bold 72px ${fontFam}`;
      ctx.fillText(selectedChar.smallChar, width * 0.78, height / 2 + 15);
    } else if (selectedChar.char.length > 1) {
      ctx.font = `bold 100px ${fontFam}`;
      ctx.fillText(selectedChar.char, width / 2, height / 2);
    } else {
      ctx.font = `bold 160px ${fontFam}`;
      ctx.fillText(selectedChar.char, width / 2, height / 2);
    }

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
      setCompletedChars((prev) => {
        const updated = prev.includes(selectedChar.char) ? prev : [...prev, selectedChar.char];
        try {
          localStorage.setItem('katakana_completed_chars', JSON.stringify(updated));
        } catch {
          // 무시
        }
        return updated;
      });

      // 완성 순간 해당 글자의 일본어 원어민 발음 자동 재생
      playKatakanaAudio(selectedChar.char);

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
    <div className="max-w-xl mx-auto px-4 pt-4 pb-28 min-h-screen space-y-6">
      {/* 1. 상단 안내 헤더 & 히라가나 ⇄ 가타카나 브릿지 배너 */}
      <section className="bg-white rounded-3xl p-5 border border-[#EDE8E1] shadow-2xs relative overflow-hidden">
        <div className="flex items-center justify-between gap-2 mb-3">
          {/* 뒤로가기 네비게이션 */}
          <Link
            href="/roadmap"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#718096] hover:text-[#3D5A80] bg-[#FAF9F7] hover:bg-white px-2.5 py-1.5 rounded-full border border-[#EDE8E1] hover:border-[#CBD5E0] transition-all shadow-2xs whitespace-nowrap shrink-0 active:scale-95"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#3D5A80] shrink-0" />
            <span>
              로드맵<span className="hidden sm:inline">으로 돌아가기</span>
            </span>
          </Link>

          {/* 우측 유틸리티 & 전환 도구 */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* 전체 글꼴 토글 버튼 */}
            <button
              type="button"
              onClick={handleToggleFontStyle}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-bold text-[#4A5568] hover:text-[#2D3748] bg-[#FAF9F7] hover:bg-white border border-[#EDE8E1] hover:border-[#CBD5E0] transition-all shadow-2xs whitespace-nowrap shrink-0 active:scale-95"
              title="글꼴 변경: 또박또박한 정자체(고딕) ⇄ 붓글씨 느낌 명조체"
            >
              <Type className="w-3.5 h-3.5 text-[#3D5A80] shrink-0" />
              <span suppressHydrationWarning>{fontStyle === 'sans' ? '정자체' : '명조체'}</span>
            </button>

            {/* 히라가나 마스터 이동 링크 */}
            <Link
              href="/hiragana"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-[#FAF9F7] hover:bg-[#FFF6F1] text-[#E07A5F] rounded-full text-xs font-bold border border-[#EDE8E1] hover:border-[#FCE4D8] shadow-2xs transition-all whitespace-nowrap shrink-0 active:scale-95"
              title="히라가나 마스터로 이동"
            >
              <span>히라가나</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0" />
            </Link>
          </div>
        </div>

        {/* 타이틀 및 레벨 뱃지 */}
        <div className="mb-2">
          <div className="inline-flex items-center px-2 py-0.5 mb-1.5 rounded-full bg-[#F0F7FF] text-[#3D5A80] font-black text-[10px] border border-[#C5D9F2] tracking-wider">
            Lv.0 외래어
          </div>
          <h1 className="text-xl font-black text-[#2D3748] tracking-tight leading-snug">
            カタカナ マスター
            <br />
            <span className="text-[#3D5A80] text-lg">외래어로 쉽게 익히는 가타카나</span>
          </h1>
        </div>
        <p className="text-xs text-[#718096] leading-relaxed">
          외래어 표기, 카페 메뉴판, 여행지 간판의 필수 문자! 헷갈리는 글자 완벽 비교와 짝맞추기 게임으로 완성해요.
        </p>

        {/* 학습 모드 6단계 탭 네비게이션 (헤더 카드 내부 통합) */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 mt-4 pt-3 border-t border-[#EDE8E1]">
          {[
            { id: 'sound', label: '소리 탐색', shortLabel: '소리 탐색', icon: Volume2 },
            { id: 'cards', label: '암기 카드', shortLabel: '암기 카드', icon: Sparkles },
            { id: 'confusing', label: '도플갱어 비교', shortLabel: '도플갱어', icon: HelpCircle },
            { id: 'write', label: '획순 쓰기', shortLabel: '획순 쓰기', icon: PenTool },
            { id: 'match', label: '짝맞추기 게임', shortLabel: '짝맞추기', icon: Gamepad2 },
            { id: 'travel', label: '여행 외래어', shortLabel: '여행 단어', icon: BookOpen },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = currentStep === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setCurrentStep(tab.id as KatakanaStudioStep)}
                className={`flex flex-col items-center justify-center py-2 px-0.5 rounded-2xl text-[10px] sm:text-[11px] font-bold transition-all relative group ${
                  isActive
                    ? 'bg-[#3D5A80] text-white shadow-xs scale-[1.02]'
                    : 'bg-[#FAF9F7] text-[#718096] hover:bg-white hover:text-[#2D3748] border border-[#EDE8E1]'
                }`}
              >
                <Icon
                  className={`w-3.5 h-3.5 mb-0.5 shrink-0 ${
                    isActive ? 'text-white' : 'text-[#718096] group-hover:text-[#3D5A80]'
                  }`}
                />
                <span className="truncate w-full text-center px-0.5">
                  <span className="sm:hidden">{tab.shortLabel}</span>
                  <span className="hidden sm:inline">{tab.label}</span>
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* ============================================================== */}
      {/* STEP 1: 소리 탐색 & 가타카나 표 (청음 / 탁음 / 요음 / 외래어 특수음) */}
      {/* ============================================================== */}
      {currentStep === 'sound' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* 가타카나 4단계 레벨업 스위처 */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: 'seion', label: '청음 46자', desc: '기본 ア~ン', badge: '기본' },
              { id: 'dakuon', label: '탁음 25자', desc: 'ガ·ザ·ダ·バ·パ', badge: '탁음' },
              { id: 'youon', label: '요음 36자', desc: 'キャ·シュ·チョ', badge: '요음' },
              { id: 'special', label: '특수음 12자', desc: 'ティ·ファ·フェ', badge: '특수음' },
            ].map((tab) => {
              const isSelected = category === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleSelectCategory(tab.id as KatakanaCategory)}
                  className={`p-3 rounded-2xl text-left border transition-all ${isSelected
                      ? 'bg-[#3D5A80] text-white border-[#3D5A80] shadow-sm'
                      : 'bg-white text-[#4A5568] border-[#EDE8E1] hover:border-[#CBD5E0] hover:bg-[#FAF9F7]'
                    }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-black">{tab.label}</span>
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold ${isSelected
                          ? 'bg-white/20 text-white'
                          : 'bg-[#F0F4F8] text-[#3D5A80]'
                        }`}
                    >
                      {tab.badge}
                    </span>
                  </div>
                  <div className={`text-[11px] ${isSelected ? 'text-white/80' : 'text-[#A0AEC0]'}`}>
                    {tab.desc}
                  </div>
                </button>
              );
            })}
          </div>

          {/* 선택 글자 상세 카드 & 발음 듣기 */}
          <div className="bg-white rounded-3xl p-6 border border-[#EDE8E1] shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              {/* 대형 글자 박스 */}
              <div
                className="w-28 h-28 rounded-3xl bg-[#F0F7FF] border-2 border-[#3D5A80]/30 flex flex-col items-center justify-center shadow-inner relative"
              >
                <span
                  className={`text-5xl font-bold text-[#2D3748] transition-all ${
                    fontStyle === 'serif' ? 'font-jp-mincho' : 'font-jp-gothic'
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
                <span className="text-xs font-bold text-[#3D5A80] mt-1">
                  {selectedChar.romaji}
                </span>

                {/* 대응 히라가나 뱃지 */}
                {selectedChar.matchingHiragana && (
                  <span
                    className={`absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-[#3D5A80] text-white text-[10px] font-black shadow-2xs ${
                      fontStyle === 'serif' ? 'font-jp-mincho' : 'font-jp-gothic'
                    }`}
                    style={{
                      fontFamily:
                        fontStyle === 'serif'
                          ? "'Noto Serif JP', 'Yu Mincho', serif"
                          : "'Klee One', 'Noto Sans JP', sans-serif"
                    }}
                    title="대응 히라가나"
                  >
                    히라: {selectedChar.matchingHiragana}
                  </span>
                )}
              </div>

              {/* 글자 설명 & 한국어 독음 */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-black text-[#2D3748]">
                    [{selectedChar.koreanSound}]
                  </span>
                  <span className="text-xs text-[#718096]">
                    총 {selectedChar.strokeCount}획
                  </span>
                </div>
                {selectedChar.strokeGuide && (
                  <p className="text-xs text-[#4A5568]">
                    <span className="font-bold text-[#3D5A80]">획순: </span>
                    {selectedChar.strokeGuide}
                  </p>
                )}
                {selectedChar.soundTip && (
                  <p className="text-xs text-[#718096] max-w-md">
                    <span className="font-bold text-[#3D5A80]">팁: </span>
                    {selectedChar.soundTip}
                  </p>
                )}
              </div>
            </div>

            {/* 발음 듣기 & 암기 카드 & 획순 쓰기 바로가기 */}
            <div className="flex sm:flex-col items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => handlePlaySound(selectedChar)}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 sm:px-5 py-2.5 sm:py-3 rounded-2xl bg-[#3D5A80] hover:bg-[#2B3E58] text-white font-bold text-xs shadow-sm hover:shadow transition-all active:scale-95 whitespace-nowrap"
              >
                <Volume2 className="w-4 h-4 shrink-0" />
                <span>발음</span>
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep('cards')}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2.5 rounded-2xl bg-[#EBF3FB] hover:bg-[#DCEBFA] text-[#3D5A80] font-bold text-xs border border-[#C5D9F2] transition-all active:scale-95 whitespace-nowrap"
              >
                <Sparkles className="w-3.5 h-3.5 shrink-0" />
                <span>암기 카드</span>
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep('write')}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2.5 rounded-2xl bg-[#FAF9F7] hover:bg-white text-[#718096] hover:text-[#2D3748] font-bold text-xs border border-[#EDE8E1] transition-all active:scale-95 whitespace-nowrap"
              >
                <PenTool className="w-3.5 h-3.5 shrink-0" />
                <span>써보기</span>
              </button>
            </div>
          </div>

          {/* 그리드 표 렌더링 */}
          <div className="bg-white rounded-3xl p-5 border border-[#EDE8E1] shadow-2xs space-y-4">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs sm:text-sm font-black text-[#2D3748] whitespace-nowrap">
                {category === 'seion'
                  ? '가타카나 50음도'
                  : category === 'dakuon'
                    ? '가타카나 탁음·반탁음'
                    : category === 'youon'
                      ? '가타카나 요음'
                      : '외래어 특수음'}
              </span>
              <span className="text-[11px] text-[#A0AEC0] font-medium whitespace-nowrap hidden sm:inline">
                터치하면 소리와 발음 팁이 함께 울려요
              </span>
            </div>

            {category === 'special' ? (
              /* 특수음: 비정형 외래어 블록형 레이아웃 */
              <div className="space-y-3">
                {currentGrid.map((rowItem, rIdx) => (
                  <div key={rIdx} className="space-y-1">
                    <span className="text-[11px] font-bold text-[#718096] block pl-1">
                      {rowItem.name}
                    </span>
                    <div className="grid gap-2 grid-cols-3 sm:grid-cols-5">
                      {rowItem.chars.map((charObj, cIdx) => {
                        if (!charObj) {
                          return (
                            <div
                              key={cIdx}
                              className="aspect-square rounded-2xl bg-[#FAF9F7]/60 border border-dashed border-[#EDE8E1]"
                            />
                          );
                        }

                        const isSelected = selectedChar.char === charObj.char;
                        const isPlaying = playingChar === charObj.char;

                        return (
                          <button
                            key={cIdx}
                            onClick={() => {
                              setSelectedChar(charObj);
                              handlePlaySound(charObj);
                            }}
                            className={`aspect-square rounded-2xl p-1.5 flex flex-col items-center justify-center transition-all relative group select-none ${isSelected
                                ? 'bg-[#3D5A80] text-white shadow-sm ring-2 ring-[#3D5A80]/30 scale-100'
                                : 'bg-[#FAF9F7] text-[#2D3748] border border-[#EDE8E1] hover:border-[#3D5A80] hover:bg-white'
                              } ${isPlaying ? 'ring-4 ring-[#3D5A80]' : ''}`}
                          >
                            <span
                              className={`text-lg sm:text-xl font-bold transition-all ${
                                fontStyle === 'serif' ? 'font-jp-mincho' : 'font-jp-gothic'
                              }`}
                              style={{
                                fontFamily:
                                  fontStyle === 'serif'
                                    ? "'Noto Serif JP', 'Yu Mincho', serif"
                                    : "'Klee One', 'Noto Sans JP', sans-serif"
                              }}
                            >
                              {charObj.char}
                            </span>
                            <span
                              className={`text-[9px] sm:text-[10px] font-medium leading-none mt-1 ${isSelected ? 'text-white/80' : 'text-[#718096]'
                                }`}
                            >
                              {charObj.romaji}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* 청음, 탁음, 요음: 히라가나와 동일한 정통 행/열 매트릭스 테이블 구조 */
              <div className="space-y-2">
                {/* 열 헤더 (단) */}
                <div className="flex items-center gap-2">
                  <span className="w-12 sm:w-14 shrink-0" aria-hidden="true" />
                  <div className={`grid ${category === 'youon' ? 'grid-cols-3' : 'grid-cols-5'} gap-1.5 flex-1`}>
                    {(category === 'youon'
                      ? ['ャ (ya) 컬럼', 'ュ (yu) 컬럼', 'ョ (yo) 컬럼']
                      : ['ア단 (a)', 'イ단 (i)', 'ウ단 (u)', 'エ단 (e)', 'オ단 (o)']
                    ).map((dan) => (
                      <span
                        key={dan}
                        className="text-center text-[10px] sm:text-[11px] font-extrabold text-[#A0AEC0]"
                      >
                        {dan}
                      </span>
                    ))}
                  </div>
                </div>

                {currentGrid.map((rowItem, rIdx) => (
                  <div key={rIdx} className="flex items-center gap-2">
                    <span className="w-12 sm:w-14 text-[11px] font-extrabold text-[#A0AEC0] shrink-0 text-right pr-1">
                      {rowItem.name.split(' ')[0]}
                    </span>

                    <div className={`grid ${category === 'youon' ? 'grid-cols-3' : 'grid-cols-5'} gap-1.5 flex-1`}>
                      {rowItem.chars.map((charObj, cIdx) => {
                        if (!charObj) {
                          return (
                            <div
                              key={cIdx}
                              className="aspect-square rounded-2xl bg-[#FAF9F7]/60 border border-dashed border-[#EDE8E1]"
                            />
                          );
                        }

                        const isSelected = selectedChar.char === charObj.char;
                        const isPlaying = playingChar === charObj.char;

                        return (
                          <button
                            key={cIdx}
                            onClick={() => {
                              setSelectedChar(charObj);
                              handlePlaySound(charObj);
                            }}
                            className={`aspect-square rounded-2xl p-1 sm:p-1.5 flex flex-col items-center justify-center transition-all relative group select-none ${isSelected
                                ? 'bg-[#3D5A80] text-white shadow-sm ring-2 ring-[#3D5A80]/30 scale-100 z-10'
                                : 'bg-[#FAF9F7] text-[#2D3748] border border-[#EDE8E1] hover:border-[#3D5A80] hover:bg-white'
                              } ${isPlaying ? 'ring-4 ring-[#3D5A80]' : ''}`}
                          >
                            <span
                              className={`${category === 'youon' ? 'text-base sm:text-lg' : 'text-lg sm:text-xl'} font-bold transition-all ${
                                fontStyle === 'serif' ? 'font-jp-mincho' : 'font-jp-gothic'
                              }`}
                              style={{
                                fontFamily:
                                  fontStyle === 'serif'
                                    ? "'Noto Serif JP', 'Yu Mincho', serif"
                                    : "'Klee One', 'Noto Sans JP', sans-serif"
                              }}
                            >
                              {charObj.char}
                            </span>
                            <span
                              className={`text-[9px] sm:text-[10px] font-medium leading-none mt-0.5 sm:mt-1 ${isSelected ? 'text-white/80' : 'text-[#718096]'
                                }`}
                            >
                              {charObj.romaji}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* STEP 2: 암기 카드 (가타카나 ⇄ 히라가나 Mnemonic 연계 브릿지 플래시카드) */}
      {/* ============================================================== */}
      {currentStep === 'cards' && (
        <KatakanaFlashcards
          category={category}
          fontStyle={fontStyle}
          onToggleFontStyle={handleToggleFontStyle}
          onCompleteToNextStep={() => setCurrentStep('confusing')}
        />
      )}

      {/* ============================================================== */}
      {/* STEP 3: 도플갱어 집중 비교 훈련 (シ vs ツ, ソ vs ン 등) */}
      {/* ============================================================== */}
      {currentStep === 'confusing' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* 비교 세트 선택 탭 */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {CONFUSING_KATAKANA_PAIRS.map((pair) => {
              const isSelected = selectedPair.id === pair.id;
              return (
                <button
                  key={pair.id}
                  onClick={() => setSelectedPair(pair)}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all border shrink-0 ${isSelected
                      ? 'bg-[#3D5A80] text-white border-[#3D5A80] shadow-sm'
                      : 'bg-white text-[#718096] border-[#EDE8E1] hover:border-[#CBD5E0]'
                    }`}
                >
                  {pair.shortTitle || pair.title}
                </button>
              );
            })}
          </div>

          {/* 도플갱어 1:1 대조 보드 */}
          <div className="bg-white rounded-3xl p-6 border border-[#EDE8E1] shadow-2xs space-y-6">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <AlertCircle className="w-5 h-5 text-[#3D5A80] shrink-0" />
                <h3 className="text-base font-black text-[#2D3748] break-keep">
                  {selectedPair.title}
                </h3>
              </div>
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#F0F7FF] text-[#3D5A80] font-bold border border-[#C5D9F2] shrink-0 whitespace-nowrap">
                구분 비법
              </span>
            </div>

            {/* 양자 비교 카드 (왼쪽 vs 오른쪽) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 왼쪽 글자 */}
              <div className="bg-[#FAF9F7] rounded-3xl p-5 border border-[#EDE8E1] space-y-4 hover:border-[#3D5A80] transition-all">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span
                        className={`text-5xl font-bold text-[#2D3748] transition-all ${
                          fontStyle === 'serif' ? 'font-jp-mincho' : 'font-jp-gothic'
                        }`}
                        style={{
                          fontFamily:
                            fontStyle === 'serif'
                              ? "'Noto Serif JP', 'Yu Mincho', serif"
                              : "'Klee One', 'Noto Sans JP', sans-serif"
                        }}
                      >
                        {selectedPair.char1.char}
                      </span>
                      <span className="text-base font-bold text-[#3D5A80]">
                        {selectedPair.char1.romaji}
                      </span>
                      <span className="text-sm text-[#718096]">
                        [{selectedPair.char1.korean}]
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => playKatakanaAudio(selectedPair.char1.char)}
                    className="p-2.5 rounded-2xl bg-white border border-[#EDE8E1] text-[#3D5A80] hover:bg-[#F0F7FF] transition-all shadow-2xs active:scale-95"
                    title="소리 듣기"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-3 rounded-2xl bg-white border border-[#EDE8E1]">
                    <span className="text-[11px] font-bold text-[#3D5A80] block mb-1">
                      획의 궤적 & 방향
                    </span>
                    <p className="text-[#2D3748] font-medium leading-relaxed">
                      {selectedPair.char1.strokeDirection}
                    </p>
                  </div>
                  <div className="p-3 rounded-2xl bg-white border border-[#EDE8E1]">
                    <span className="text-[11px] font-bold text-[#3D5A80] block mb-1">
                      기억하기 쉬운 연상 암기법
                    </span>
                    <p className="text-[#4A5568] leading-relaxed">
                      {selectedPair.char1.mnemonic}
                    </p>
                  </div>
                </div>
              </div>

              {/* 오른쪽 글자 */}
              <div className="bg-[#FAF9F7] rounded-3xl p-5 border border-[#EDE8E1] space-y-4 hover:border-[#3D5A80] transition-all">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span
                        className={`text-5xl font-bold text-[#2D3748] transition-all ${
                          fontStyle === 'serif' ? 'font-jp-mincho' : 'font-jp-gothic'
                        }`}
                        style={{
                          fontFamily:
                            fontStyle === 'serif'
                              ? "'Noto Serif JP', 'Yu Mincho', serif"
                              : "'Klee One', 'Noto Sans JP', sans-serif"
                        }}
                      >
                        {selectedPair.char2.char}
                      </span>
                      <span className="text-base font-bold text-[#3D5A80]">
                        {selectedPair.char2.romaji}
                      </span>
                      <span className="text-sm text-[#718096]">
                        [{selectedPair.char2.korean}]
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => playKatakanaAudio(selectedPair.char2.char)}
                    className="p-2.5 rounded-2xl bg-white border border-[#EDE8E1] text-[#3D5A80] hover:bg-[#F0F7FF] transition-all shadow-2xs active:scale-95"
                    title="소리 듣기"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-3 rounded-2xl bg-white border border-[#EDE8E1]">
                    <span className="text-[11px] font-bold text-[#3D5A80] block mb-1">
                      획의 궤적 & 방향
                    </span>
                    <p className="text-[#2D3748] font-medium leading-relaxed">
                      {selectedPair.char2.strokeDirection}
                    </p>
                  </div>
                  <div className="p-3 rounded-2xl bg-white border border-[#EDE8E1]">
                    <span className="text-[11px] font-bold text-[#3D5A80] block mb-1">
                      기억하기 쉬운 연상 암기법
                    </span>
                    <p className="text-[#4A5568] leading-relaxed">
                      {selectedPair.char2.mnemonic}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 핵심 총정리 팁 */}
            <div className="p-4 rounded-2xl bg-[#F0F7FF] border border-[#C5D9F2] flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-[#3D5A80] shrink-0 mt-0.5" />
              <p className="text-xs text-[#2B3E58] font-medium leading-relaxed">
                <span className="font-bold text-[#3D5A80]">핵심 꿀팁: </span>
                {selectedPair.tip}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* STEP 3: 획순 쓰기 (손글씨 캔버스) */}
      {/* ============================================================== */}
      {currentStep === 'write' && (
        <section className="space-y-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-5 border border-[#EDE8E1] shadow-xs space-y-4">
            <div className="flex items-center justify-between gap-2.5">
              <h2 className="text-sm font-bold text-[#2D3748] min-w-0">
                손글씨 캔버스 쓰기 연습
              </h2>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => handlePlaySound(selectedChar)}
                  className="p-2 rounded-xl bg-stone-100 hover:bg-[#F0F7FF] text-[#718096] hover:text-[#3D5A80] transition-colors shrink-0"
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

            {/* 가타카나 4단계 분류 스위처 (청음 / 탁음 / 요음 / 특수음) */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
              {[
                { id: 'seion', label: '청음 46자' },
                { id: 'dakuon', label: '탁음 25자' },
                { id: 'youon', label: '요음 36자' },
                { id: 'special', label: '특수음 12자' }
              ].map((tab) => {
                const isCatActive = category === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => handleSelectCategory(tab.id as KatakanaCategory)}
                    className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all shrink-0 whitespace-nowrap ${
                      isCatActive
                        ? 'bg-[#3D5A80] text-white shadow-2xs'
                        : 'bg-stone-100 hover:bg-[#F0F7FF] text-[#718096]'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* 빠른 글자 선택 칩 헤더 & 수집 진행 현황 */}
            <div className="flex items-center justify-between text-xs font-bold text-[#718096] pt-1">
              <span>
                {category === 'seion'
                  ? '가타카나 청음 글자 목록'
                  : category === 'dakuon'
                  ? '탁음·반탁음 글자 목록'
                  : category === 'youon'
                  ? '요음 36자 목록'
                  : '외래어 특수음 글자 목록'}
              </span>
              <span className="text-[11px] font-bold text-[#3D5A80] bg-[#F0F7FF] px-2.5 py-0.5 rounded-full border border-[#C5D9F2]">
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
                    className={`relative w-9 h-9 rounded-xl text-sm font-bold shrink-0 transition-all ${
                      isSelected
                        ? 'bg-[#3D5A80] text-white shadow-2xs scale-105'
                        : isDone
                        ? 'bg-[#F0F7FF] text-[#2B3E58] border border-[#C5D9F2]'
                        : 'bg-stone-50 hover:bg-[#F0F7FF] text-[#4A5568] border border-[#EDE8E1]'
                    } ${
                      fontStyle === 'serif'
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
                        className={`absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] font-black shadow-2xs ${
                          isSelected ? 'bg-white text-[#3D5A80]' : 'bg-[#3D5A80] text-white'
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
                  : 'border-2 border-dashed border-[#CBD5E0]'
              }`}
            >
              {/* 십자 가이드 보조선 */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <div className="w-full h-[1px] bg-stone-200/60" />
                <div className="absolute h-full w-[1px] bg-stone-200/60" />
              </div>

              {/* 배경 연한 가이드 텍스트 (요음/특수음인 경우 2칸 분할 비율 가이드) */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none px-4">
                {selectedChar.soundType === 'youon' && selectedChar.baseChar && selectedChar.smallChar ? (
                  <div className="flex items-baseline justify-center gap-1 w-full">
                    {/* 앞 글자 (큰 글자 1.0) */}
                    <div className="flex-1 flex flex-col items-center justify-center">
                      <span
                        className={`text-[115px] font-bold text-stone-200 leading-none ${
                          fontStyle === 'serif' ? 'font-jp-mincho' : 'font-jp-gothic'
                        }`}
                        style={{
                          fontFamily:
                            fontStyle === 'serif'
                              ? "'Noto Serif JP', 'Yu Mincho', serif"
                              : "'Klee One', 'Noto Sans JP', sans-serif"
                        }}
                      >
                        {selectedChar.baseChar}
                      </span>
                      <span className="text-[9px] font-extrabold text-[#A0AEC0] mt-1">큰 글자 (1.0)</span>
                    </div>

                    {/* 작은 ャ/ュ/ョ (작은 글자 0.7) */}
                    <div className="w-[95px] flex flex-col items-center justify-center translate-y-3">
                      <span
                        className={`text-[72px] font-bold text-stone-300 leading-none ${
                          fontStyle === 'serif' ? 'font-jp-mincho' : 'font-jp-gothic'
                        }`}
                        style={{
                          fontFamily:
                            fontStyle === 'serif'
                              ? "'Noto Serif JP', 'Yu Mincho', serif"
                              : "'Klee One', 'Noto Sans JP', sans-serif"
                        }}
                      >
                        {selectedChar.smallChar}
                      </span>
                      <span className="text-[9px] font-extrabold text-[#3D5A80] mt-1">작은 글자 (0.7)</span>
                    </div>
                  </div>
                ) : (
                  <span
                    className={`text-[160px] font-bold text-stone-200 leading-none ${
                      fontStyle === 'serif'
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
                )}
              </div>

              {/* 획순 팁 및 완료 배지 */}
              <div
                className={`absolute top-3 left-3 backdrop-blur-sm px-2.5 py-1 rounded-full text-[11px] font-bold transition-all duration-300 pointer-events-none flex items-center gap-1 shadow-2xs ${
                  isCharCompleted
                    ? 'bg-amber-100 text-amber-900 border border-amber-300 animate-pulse ring-2 ring-amber-400/40'
                    : 'bg-white/90 text-[#3D5A80] border border-[#C5D9F2]'
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
                    <Pencil className="w-3 h-3 text-[#3D5A80]" />
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
                <div className="bg-[#FAF9F7] p-3.5 rounded-2xl border border-[#EDE8E1] space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 font-bold text-[#4A5568]">
                      <Pencil className="w-3.5 h-3.5 text-[#3D5A80]" />
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

            {/* 선택 글자 상세 정보 카드 (한국어 독음, 로마자, 대응 히라가나, 팁) */}
            <div className="p-4 rounded-2xl bg-[#F0F7FF] border border-[#C5D9F2] text-xs text-[#3D5A80] font-medium leading-relaxed flex items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-sm text-[#2D3748]">
                    {selectedChar.char} [{selectedChar.koreanSound}]
                  </span>
                  <span className="text-[11px] text-[#718096]">
                    {selectedChar.romaji}
                  </span>
                  {selectedChar.matchingHiragana && (
                    <span className="px-2 py-0.5 rounded-md bg-white text-[#3D5A80] text-[10px] font-bold border border-[#C5D9F2]">
                      히라가나: {selectedChar.matchingHiragana}
                    </span>
                  )}
                </div>
                {selectedChar.soundTip && (
                  <p className="text-[11px] text-[#556987]">
                    {selectedChar.soundTip}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => handlePlaySound(selectedChar)}
                className="shrink-0 p-2.5 rounded-xl bg-white hover:bg-[#E2EFFF] text-[#3D5A80] border border-[#C5D9F2] transition-colors shadow-2xs active:scale-95"
                title="발음 듣기"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ============================================================== */}
      {/* STEP 4: 짝맞추기 게임 (<KatakanaMatchGame />) */}
      {/* ============================================================== */}
      {currentStep === 'match' && (
        <div className="animate-in fade-in duration-200">
          <KatakanaMatchGame fontStyle={fontStyle} />
        </div>
      )}

      {/* ============================================================== */}
      {/* STEP 5: 여행 실전 외래어 단어장 (<TravelKatakanaWords />) */}
      {/* ============================================================== */}
      {currentStep === 'travel' && (
        <div className="animate-in fade-in duration-200">
          <TravelKatakanaWords fontStyle={fontStyle} />
        </div>
      )}
    </div>
  );
}
