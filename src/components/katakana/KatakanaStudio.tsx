'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Link from 'next/link';
import {
  Volume2,
  Sparkles,
  RotateCcw,
  Eraser,
  PenTool,
  CheckCircle2,
  ChevronRight,
  BookOpen,
  ArrowRight,
  Gamepad2,
  Layers,
  ArrowUpRight,
  ArrowDownRight,
  AlertCircle,
  HelpCircle,
  Type,
  ArrowLeft
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
  KatakanaRow,
  ConfusingKatakanaPair,
  playKatakanaAudio
} from '@/lib/curriculum/katakanaData';
import KatakanaMatchGame from '@/components/katakana/KatakanaMatchGame';
import TravelKatakanaWords from '@/components/katakana/TravelKatakanaWords';

export type KatakanaCategory = 'seion' | 'dakuon' | 'youon' | 'special';
export type KatakanaStudioStep = 'sound' | 'confusing' | 'write' | 'match' | 'travel';

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

  // 로컬 스토리지에서 글꼴 상태 로드
  useEffect(() => {
    try {
      const saved = localStorage.getItem('katakana_font_style');
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

  // --- Step 3: 손글씨 캔버스 상태 ---
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  }, []);

  useEffect(() => {
    clearCanvas();
  }, [selectedChar, clearCanvas]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    setHasDrawn(true);
    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineWidth = 12;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#2D3748';
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
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
              <span>{fontStyle === 'sans' ? '정자체' : '명조체'}</span>
            </button>

            {/* 히라가나 스튜디오 이동 링크 */}
            <Link
              href="/hiragana"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-[#FAF9F7] hover:bg-[#FFF6F1] text-[#E07A5F] rounded-full text-xs font-bold border border-[#EDE8E1] hover:border-[#FCE4D8] shadow-2xs transition-all whitespace-nowrap shrink-0 active:scale-95"
              title="히라가나 마스터 스튜디오로 이동"
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

        {/* 학습 모드 5단계 탭 네비게이션 (헤더 카드 내부 통합) */}
        <div className="grid grid-cols-5 gap-1 mt-4 pt-3 border-t border-[#EDE8E1]">
          {[
            { id: 'sound', label: '소리 탐색', shortLabel: '소리 탐색', icon: Volume2 },
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

            {/* 발음 듣기 & 획순 쓰기 바로가기 */}
            <div className="flex sm:flex-col items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => handlePlaySound(selectedChar)}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[#3D5A80] hover:bg-[#2B3E58] text-white font-bold text-xs shadow-sm hover:shadow transition-all active:scale-95"
              >
                <Volume2 className="w-4 h-4" />
                <span>발음 듣기</span>
              </button>
              <button
                onClick={() => setCurrentStep('write')}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-2xl bg-[#F0F7FF] hover:bg-[#E2EFFF] text-[#3D5A80] font-bold text-xs border border-[#C5D9F2] transition-all active:scale-95"
              >
                <PenTool className="w-3.5 h-3.5" />
                <span>직접 써보기</span>
              </button>
            </div>
          </div>

          {/* 그리드 표 렌더링 */}
          <div className="bg-white rounded-3xl p-5 border border-[#EDE8E1] shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-[#2D3748]">
                {category === 'seion'
                  ? '가타카나 50음도 (청음 46자)'
                  : category === 'dakuon'
                    ? '가타카나 탁음·반탁음 (25자)'
                    : category === 'youon'
                      ? '가타카나 요음 표 (36자)'
                      : '가타카나 외래어 특수음 표'}
              </span>
              <span className="text-[11px] text-[#A0AEC0]">
                터치하면 소리와 발음 팁이 함께 울려요
              </span>
            </div>

            <div className="space-y-3">
              {currentGrid.map((rowItem, rIdx) => {
                const colCount = category === 'youon' ? 3 : rowItem.chars.length;
                return (
                  <div key={rIdx} className="space-y-1">
                    <span className="text-[11px] font-bold text-[#718096] block pl-1">
                      {rowItem.name}
                    </span>
                    <div
                      className={`grid gap-2 ${category === 'youon' ? 'grid-cols-3' : 'grid-cols-5'
                        }`}
                    >
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
                              className={`text-xl sm:text-2xl font-bold transition-all ${
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
                              className={`text-[10px] font-medium leading-none mt-1 ${isSelected ? 'text-white/80' : 'text-[#718096]'
                                }`}
                            >
                              {charObj.romaji}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* STEP 2: 도플갱어 집중 비교 훈련 (シ vs ツ, ソ vs ン 등) */}
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
                  className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all border ${isSelected
                      ? 'bg-[#3D5A80] text-white border-[#3D5A80] shadow-sm'
                      : 'bg-white text-[#718096] border-[#EDE8E1] hover:border-[#CBD5E0]'
                    }`}
                >
                  {pair.title}
                </button>
              );
            })}
          </div>

          {/* 도플갱어 1:1 대조 보드 */}
          <div className="bg-white rounded-3xl p-6 border border-[#EDE8E1] shadow-2xs space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-[#3D5A80]" />
                <h3 className="text-base font-black text-[#2D3748]">
                  {selectedPair.title}
                </h3>
              </div>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#F0F7FF] text-[#3D5A80] font-bold border border-[#C5D9F2]">
                완벽 구분 비법
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
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 border border-[#EDE8E1] shadow-2xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-black text-[#2D3748] flex items-center gap-2">
                  <span>캔버스 손글씨 쓰기 연습</span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full bg-[#F0F7FF] text-[#3D5A80] font-bold ${
                      fontStyle === 'serif' ? 'font-jp-mincho' : 'font-jp-gothic'
                    }`}
                    style={{
                      fontFamily:
                        fontStyle === 'serif'
                          ? "'Noto Serif JP', 'Yu Mincho', serif"
                          : "'Klee One', 'Noto Sans JP', sans-serif"
                    }}
                  >
                    {selectedChar.char} ({selectedChar.romaji})
                  </span>
                </h3>
                <p className="text-xs text-[#718096] mt-0.5">
                  점선 가이드를 따라 획순에 맞게 직접 마우스나 손가락으로 글씨를 써보세요.
                </p>
              </div>

              {/* 캔버스 도구 (지우기 / 소리) */}
              <div className="flex items-center gap-2">
                <button
                  onClick={clearCanvas}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FAF9F7] border border-[#EDE8E1] hover:bg-[#F2ECE4] text-xs font-bold text-[#718096] hover:text-[#2D3748] transition-all active:scale-95"
                >
                  <Eraser className="w-3.5 h-3.5" />
                  <span>지우기</span>
                </button>
                <button
                  onClick={() => handlePlaySound(selectedChar)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#3D5A80] hover:bg-[#2B3E58] text-white text-xs font-bold transition-all shadow-2xs active:scale-95"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>소리</span>
                </button>
              </div>
            </div>

            {/* 캔버스 영역 */}
            <div className="flex justify-center">
              <div className="relative w-[320px] h-[320px] sm:w-[380px] sm:h-[380px] rounded-3xl border-2 border-[#CBD5E0] bg-[#FAF9F7] overflow-hidden shadow-inner flex items-center justify-center">
                {/* 배경 십자 가이드선 */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="w-full h-full border-b border-[#E2E8F0] -translate-y-1/2" />
                  <div className="w-full h-full border-r border-[#E2E8F0] -translate-x-1/2" />
                </div>

                {/* 점선 가이드 글자 */}
                <div
                  className={`absolute inset-0 flex items-center justify-center pointer-events-none select-none text-[200px] sm:text-[240px] font-bold text-[#CBD5E0]/40 leading-none ${
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
                </div>

                {/* 실제 드로잉 캔버스 */}
                <canvas
                  ref={canvasRef}
                  width={380}
                  height={380}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                  className="w-full h-full cursor-crosshair touch-none relative z-10"
                />
              </div>
            </div>

            {/* 획순 가이드 설명 팁 */}
            {selectedChar.strokeGuide && (
              <div className="p-4 rounded-2xl bg-[#F0F7FF] border border-[#C5D9F2] text-xs text-[#3D5A80] font-medium leading-relaxed flex items-center gap-2">
                <PenTool className="w-4 h-4 shrink-0 text-[#3D5A80]" />
                <div>
                  <span className="font-bold">올바른 획순: </span>
                  {selectedChar.strokeGuide} (총 {selectedChar.strokeCount}획)
                </div>
              </div>
            )}
          </div>
        </div>
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
