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
  Layers
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

  // --- Step 2: 손글씨 캔버스 쓰기 상태 ---
  const [writingTargetType, setWritingTargetType] = useState<'consonant' | 'vowel'>('consonant');
  const [writingConsonant, setWritingConsonant] = useState<HangulConsonant>(HANGUL_CONSONANTS[0]);
  const [writingVowel, setWritingVowel] = useState<HangulVowel>(HANGUL_VOWELS[0]);
  const currentWritingChar =
    writingTargetType === 'consonant' ? writingConsonant.char : writingVowel.char;
  const currentWritingGuide =
    writingTargetType === 'consonant' ? writingConsonant : writingVowel;

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  const getCoordinates = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    if ('touches' in e) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
      };
    }
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const startDrawing = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const { x, y } = getCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 14;
    ctx.strokeStyle = '#E07A5F';
    setIsDrawing(true);
    setHasDrawn(true);
  };

  const draw = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const { x, y } = getCoordinates(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  // 글자 변경 시 캔버스 초기화
  useEffect(() => {
    clearCanvas();
  }, [currentWritingChar]);

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
          className={`flex flex-col items-center py-2.5 px-1 rounded-xl text-xs font-bold transition-all ${
            currentStep === 'combine'
              ? 'bg-white text-[#E07A5F] shadow-sm'
              : 'text-[#718096] hover:text-[#2D3748]'
          }`}
        >
          <div className="flex items-center gap-1">
            <Layers className="w-3.5 h-3.5" />
            <span>1. 音と合体</span>
          </div>
          <span className="text-[10px] font-normal text-gray-500 mt-0.5">
            組み合わせの仕組み
          </span>
        </button>

        <button
          onClick={() => {
            setCurrentStep('write');
            stopKoreanSpeech();
          }}
          className={`flex flex-col items-center py-2.5 px-1 rounded-xl text-xs font-bold transition-all ${
            currentStep === 'write'
              ? 'bg-white text-[#E07A5F] shadow-sm'
              : 'text-[#718096] hover:text-[#2D3748]'
          }`}
        >
          <div className="flex items-center gap-1">
            <Pencil className="w-3.5 h-3.5" />
            <span>2. なぞり書き</span>
          </div>
          <span className="text-[10px] font-normal text-gray-500 mt-0.5">
            書き順と練習
          </span>
        </button>

        <button
          onClick={() => {
            setCurrentStep('quiz');
            stopKoreanSpeech();
          }}
          className={`flex flex-col items-center py-2.5 px-1 rounded-xl text-xs font-bold transition-all ${
            currentStep === 'quiz'
              ? 'bg-white text-[#E07A5F] shadow-sm'
              : 'text-[#718096] hover:text-[#2D3748]'
          }`}
        >
          <div className="flex items-center gap-1">
            <Award className="w-3.5 h-3.5" />
            <span>3. 看板クイズ</span>
          </div>
          <span className="text-[10px] font-normal text-gray-500 mt-0.5">
            実戦！街のハングル
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

          {/* 중앙: 실시간 합체 프리뷰 카드 */}
          <div className="bg-gradient-to-br from-[#2D3748] to-[#1A202C] text-white rounded-3xl p-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#E07A5F]/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex items-center justify-between text-xs text-gray-300 mb-2">
              <span className="flex items-center gap-1 font-medium">
                <span className="w-2 h-2 rounded-full bg-[#E07A5F] animate-pulse" />
                リアルタイム合体プレビュー
              </span>
              <span className="text-gray-400">
                {selectedConsonant.romaji} + {selectedVowel.romaji}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-around gap-6 py-4">
              {/* 결합 수식 표시 */}
              <div className="flex items-center gap-3">
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-extrabold text-[#E07A5F]">
                    {selectedConsonant.char}
                  </span>
                  <span className="text-[11px] text-gray-400 mt-1">
                    {selectedConsonant.katakanaName}
                  </span>
                </div>
                <span className="text-2xl text-gray-500 font-light">+</span>
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-extrabold text-[#38B2AC]">
                    {selectedVowel.char}
                  </span>
                  <span className="text-[11px] text-gray-400 mt-1">
                    {selectedVowel.katakanaName}
                  </span>
                </div>
                <span className="text-2xl text-gray-500 font-light">=</span>
              </div>

              {/* 완성된 글자 및 발음 버튼 */}
              <div className="flex items-center gap-4">
                <div className="w-24 h-24 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex flex-col items-center justify-center shadow-inner">
                  <span className="text-5xl font-black text-white tracking-tight">
                    {combinedChar}
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => handlePlayCombined(combinedChar)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#E07A5F] hover:bg-[#C8654B] text-white font-bold text-xs shadow-md transition-all active:scale-95"
                  >
                    <Volume2 className={`w-4 h-4 ${isPlayingAudio ? 'animate-bounce' : ''}`} />
                    <span>発音を聞く</span>
                  </button>
                  <span className="text-[11px] text-gray-300">
                    読み: <strong className="text-white">{combinedChar}</strong>
                  </span>
                </div>
              </div>
            </div>

            {/* 발음 팁 메모 */}
            <div className="mt-3 pt-3 border-t border-white/10 text-xs text-gray-300 flex items-start gap-2">
              <span className="px-1.5 py-0.5 rounded bg-[#E07A5F]/20 text-[#E07A5F] text-[10px] font-bold shrink-0">
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
            <div className="flex items-center gap-2 overflow-x-auto pb-1.5 pt-0.5 px-0.5 scrollbar-none snap-x touch-pan-x">
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

            <p className="text-[11px] text-gray-600 bg-[#FBF9F5] p-2.5 rounded-xl border border-[#EDE8E1] leading-relaxed">
              💡 <strong className="text-[#2D3748]">{selectedConsonant.char} ({selectedConsonant.katakanaName})</strong>: {selectedConsonant.soundTip}
            </p>
          </div>

          {/* 모음 10자 가로 1줄 스크롤 */}
          <div className="bg-white rounded-3xl p-4 border border-[#EDE8E1] shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-[#2D3748] flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#38B2AC]" />
                ② 母音 (10個) を選ぶ
              </h4>
              <span className="text-[11px] text-gray-500 font-medium">
                選択中: <strong className="text-[#38B2AC] font-bold text-xs">{selectedVowel.char}</strong> ({selectedVowel.katakanaName})
              </span>
            </div>

            {/* 가로 스크롤 1줄 컨테이너 */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1.5 pt-0.5 px-0.5 scrollbar-none snap-x touch-pan-x">
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
                        ? 'bg-[#38B2AC] text-white border-[#38B2AC] shadow-md font-black scale-105 ring-2 ring-[#38B2AC]/20'
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

            <p className="text-[11px] text-gray-600 bg-[#FBF9F5] p-2.5 rounded-xl border border-[#EDE8E1] leading-relaxed">
              💡 <strong className="text-[#2D3748]">{selectedVowel.char} ({selectedVowel.katakanaName})</strong>: {selectedVowel.soundTip}
            </p>
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
                      ? 'bg-white text-[#38B2AC] shadow-sm'
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

            {/* 가로 스크롤 자모 선택 바 */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {writingTargetType === 'consonant'
                ? HANGUL_CONSONANTS.map((c) => (
                    <button
                      key={c.char}
                      onClick={() => setWritingConsonant(c)}
                      className={`w-11 h-11 shrink-0 rounded-xl flex flex-col items-center justify-center border font-bold text-sm transition-all ${
                        writingConsonant.char === c.char
                          ? 'bg-[#E07A5F] text-white border-[#E07A5F] shadow-md scale-105'
                          : 'bg-[#FBF9F5] text-gray-700 border-[#EDE8E1]'
                      }`}
                    >
                      <span>{c.char}</span>
                      <span className="text-[8px] opacity-75">{c.katakanaName.slice(0, 2)}</span>
                    </button>
                  ))
                : HANGUL_VOWELS.map((v) => (
                    <button
                      key={v.char}
                      onClick={() => setWritingVowel(v)}
                      className={`w-11 h-11 shrink-0 rounded-xl flex flex-col items-center justify-center border font-bold text-sm transition-all ${
                        writingVowel.char === v.char
                          ? 'bg-[#38B2AC] text-white border-[#38B2AC] shadow-md scale-105'
                          : 'bg-[#FBF9F5] text-gray-700 border-[#EDE8E1]'
                      }`}
                    >
                      <span>{v.char}</span>
                      <span className="text-[8px] opacity-75">{v.katakanaName}</span>
                    </button>
                  ))}
            </div>

            {/* 획순 가이드 팁 */}
            <div className="p-3 bg-[#FAF0E6] rounded-2xl border border-[#E07A5F]/20 text-xs flex items-center justify-between">
              <div>
                <span className="font-bold text-[#E07A5F] block">
                  {currentWritingGuide.char}（{currentWritingGuide.katakanaName}）
                </span>
                <span className="text-gray-600 text-[11px]">
                  総画数: <strong>{currentWritingGuide.strokeCount}画</strong> | 書き順: {currentWritingGuide.strokeGuide}
                </span>
              </div>
              <button
                onClick={clearCanvas}
                className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-xl bg-white border border-[#EDE8E1] text-gray-600 hover:text-black font-medium transition-colors shadow-2xs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>消去</span>
              </button>
            </div>

            {/* 손글씨 캔버스 영역 */}
            <div className="relative w-full aspect-square max-w-[320px] mx-auto bg-[#FDFCF7] border-2 border-dashed border-[#EDE8E1] rounded-3xl overflow-hidden shadow-inner flex items-center justify-center select-none touch-none">
              {/* 배경 십자 보조선 */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <div className="w-full h-px bg-gray-200" />
                <div className="absolute h-full w-px bg-gray-200" />
              </div>

              {/* 반투명 가이드 글자 */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <span className="text-[160px] font-black text-gray-200/80 leading-none select-none">
                  {currentWritingChar}
                </span>
              </div>

              {/* 실제 드로잉 캔버스 */}
              <canvas
                ref={canvasRef}
                width={320}
                height={320}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
                className="w-full h-full cursor-crosshair z-10"
              />

              {!hasDrawn && (
                <div className="absolute bottom-4 pointer-events-none flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 text-white text-[11px] backdrop-blur-xs">
                  <Pencil className="w-3 h-3 text-[#E07A5F]" />
                  <span>指やマウスでなぞってみよう</span>
                </div>
              )}
            </div>

            {/* 하단 완료 및 다음 글자 이동 */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-gray-400">
                {hasDrawn ? '✨ 上手に書けました！' : 'なぞり書きで形を覚えましょう'}
              </span>
              <button
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
                className="flex items-center gap-1 text-xs px-3 py-2 rounded-xl bg-[#2D3748] hover:bg-black text-white font-bold transition-all"
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
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            {[
              { id: 'all', label: 'すべて' },
              { id: 'gourmet', label: '🍲 グルメ' },
              { id: 'cafe', label: '☕ カフェ' },
              { id: 'traffic', label: '🚇 街・交通' },
              { id: 'shopping', label: '💳 買い物' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setQuizCategory(cat.id as any);
                  setCurrentQuizIndex(0);
                  setIsAnswered(false);
                  setSelectedOptionIndex(null);
                }}
                className={`px-3 py-1.5 rounded-full shrink-0 font-bold transition-all ${
                  quizCategory === cat.id
                    ? 'bg-[#E07A5F] text-white shadow-sm'
                    : 'bg-white text-gray-600 border border-[#EDE8E1] hover:bg-gray-50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* 간판 스타일 대형 퀴즈 카드 */}
          <div className="bg-gradient-to-br from-[#1A202C] via-[#2D3748] to-[#1A202C] text-white rounded-3xl p-6 shadow-xl border-2 border-white/10 relative overflow-hidden text-center">
            {/* 상단 태그 */}
            <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
              <span className="px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md text-amber-300 font-semibold border border-white/10">
                {currentQuiz.signType}
              </span>
              <button
                onClick={() => speakKorean(currentQuiz.korean, 0.85)}
                className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-gray-200 transition-colors"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>発音</span>
              </button>
            </div>

            {/* 실제 간판 느낌의 거대한 한글 글씨 */}
            <div className="py-6 my-2">
              <span className="text-4xl sm:text-5xl font-black text-amber-100 tracking-wider drop-shadow-md block font-mono">
                {currentQuiz.korean}
              </span>
              <span className="text-xs text-gray-400 mt-2 block">
                この看板やメニューは何と読むでしょう？
              </span>
            </div>

            {/* 정답 발표 시 나타나는 발음 뱃지 */}
            {isAnswered && (
              <div className="mt-2 py-2 px-3 rounded-2xl bg-white/10 backdrop-blur-md inline-flex items-center gap-2 animate-in zoom-in-95 duration-200">
                <span className="text-sm font-bold text-amber-300">
                  読み: {currentQuiz.katakana}
                </span>
                <span className="text-gray-400 text-xs">（{currentQuiz.meaning}）</span>
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
                <span className="text-lg">{currentQuiz.emoji}</span>
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
                <span className="text-[11px] text-gray-500">
                  {selectedOptionIndex !== null && currentQuiz.options[selectedOptionIndex]?.isCorrect
                    ? '🎉 正解です！素晴らしい！'
                    : '💡 間違えても大丈夫！何度も見て覚えましょう'}
                </span>
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
