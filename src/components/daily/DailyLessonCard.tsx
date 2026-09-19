'use client';

import React, { useState, useEffect } from 'react';
import { DailyLesson, VocabItem, SavedWord } from '@/types';
import { speakJapanese } from '@/utils/tts';
import { getPronunciation, parseRubySegments } from '@/utils/japanesePronounce';
import {
  Volume2,
  Bookmark,
  BookmarkCheck,
  BookOpen,
  BookMarked,
  Sparkles,
  MessageSquare,
  Info,
  CheckCircle2,
  Languages,
  Baby,
  Sprout,
  Flame
} from 'lucide-react';

interface DailyLessonCardProps {
  lesson: DailyLesson;
  isAiGenerated?: boolean;
}

function renderRuby(
  text: string,
  playId?: string,
  activeBoundary?: { id: string; charIndex: number; charLength: number } | null
) {
  const isPlayingThis = Boolean(
    activeBoundary &&
      playId &&
      (activeBoundary.id === playId || (playId === 'key' && activeBoundary.id.startsWith('key-')))
  );

  const activeCharIndex = isPlayingThis && activeBoundary ? activeBoundary.charIndex : -1;
  const segments = parseRubySegments(text);
  let currentOffset = 0;

  return (
    <>
      {segments.map((seg, i) => {
        const segText = seg.text;
        const segStart = currentOffset;
        currentOffset += segText.length;

        if (seg.ruby) {
          const isSegSpoken =
            isPlayingThis &&
            activeCharIndex >= segStart &&
            activeCharIndex < segStart + segText.length;

          return (
            <ruby key={i} className="transition-colors duration-100">
              {seg.text.split('').map((ch, chIdx) => {
                const charGlobalIdx = segStart + chIdx;
                const isThisCharActive = isPlayingThis && charGlobalIdx === activeCharIndex;
                return (
                  <span
                    key={chIdx}
                    className={`transition-colors duration-100 ${
                      isThisCharActive ? 'text-[#E07A5F]' : 'text-[#2D3748]'
                    }`}
                  >
                    {ch}
                  </span>
                );
              })}
              <rp>(</rp>
              <rt
                className={`text-[10px] leading-none transition-colors duration-100 ${
                  isSegSpoken ? 'text-[#E07A5F]' : 'text-[#E07A5F]/70'
                }`}
              >
                {seg.ruby}
              </rt>
              <rp>)</rp>
            </ruby>
          );
        }

        return (
          <span key={i}>
            {segText.split('').map((ch, chIdx) => {
              const charGlobalIdx = segStart + chIdx;
              const isThisCharActive = isPlayingThis && charGlobalIdx === activeCharIndex;
              return (
                <span
                  key={chIdx}
                  className={`transition-colors duration-100 ${
                    isThisCharActive ? 'text-[#E07A5F]' : 'text-[#2D3748]'
                  }`}
                >
                  {ch}
                </span>
              );
            })}
          </span>
        );
      })}
    </>
  );
}

export default function DailyLessonCard({ lesson, isAiGenerated }: DailyLessonCardProps) {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [activeBoundary, setActiveBoundary] = useState<{ id: string; charIndex: number; charLength: number } | null>(null);
  const [savedWordIds, setSavedWordIds] = useState<Set<string>>(new Set());
  const [isLessonCompleted, setIsLessonCompleted] = useState(false);
  const [isLessonSaved, setIsLessonSaved] = useState(false);
  const [showPronounce, setShowPronounce] = useState(true);

  // 로컬 스토리지에서 저장된 단어 및 학습 완료 여부, 레슨 보관 여부, 발음 모드 로드
  useEffect(() => {
    try {
      const savedPronounce = localStorage.getItem('beginner_pronounce_mode');
      if (savedPronounce !== null) {
        setShowPronounce(savedPronounce === 'true');
      }
    } catch {
      // 무시
    }
  }, []);

  const handleTogglePronounce = () => {
    const nextState = !showPronounce;
    setShowPronounce(nextState);
    try {
      localStorage.setItem('beginner_pronounce_mode', String(nextState));
    } catch {
      // 무시
    }
  };

  // 로컬 스토리지에서 저장된 단어 및 학습 완료 여부, 레슨 보관 여부 로드
  useEffect(() => {
    try {
      const saved = localStorage.getItem('saved_words');
      const completed = localStorage.getItem(`lesson_completed_${lesson.id}`);
      const savedLessons = localStorage.getItem('saved_lessons');

      setTimeout(() => {
        if (saved) {
          const words: SavedWord[] = JSON.parse(saved);
          const ids = new Set<string>();
          words.forEach((w) => {
            ids.add(w.id);
            if (w.lessonId && w.kanji) {
              ids.add(`${w.lessonId}_${w.kanji}`);
            }
          });
          setSavedWordIds(ids);
        }
        setIsLessonCompleted(completed === 'true');

        if (savedLessons) {
          const lessons: DailyLesson[] = JSON.parse(savedLessons);
          setIsLessonSaved(lessons.some((l) => l.id === lesson.id));
        } else {
          setIsLessonSaved(false);
        }
      }, 0);
    } catch {
      // 로컬 스토리지 읽기 에러 무시
    }
  }, [lesson.id]);

  // 발음 듣기 (실시간 글자 경계 추적 지원)
  const handlePlay = (text: string, id: string, rate: number = 0.9) => {
    setPlayingId(id);
    setActiveBoundary({ id, charIndex: 0, charLength: 1 });
    speakJapanese(
      text,
      rate,
      () => {
        setPlayingId(id);
      },
      () => {
        setPlayingId(null);
        setActiveBoundary(null);
      },
      (charIndex) => {
        setActiveBoundary({ id, charIndex, charLength: 1 });
      }
    );
  };

  // 어휘 항목의 고유 ID를 생성하는 헬퍼 (레슨별로 완벽히 격리)
  const getVocabKey = (vocab: VocabItem, idx: number) => {
    if (vocab.id && vocab.id.startsWith(`${lesson.id}_`)) {
      return vocab.id;
    }
    return `${lesson.id}_${vocab.kanji || vocab.id || idx}`;
  };

  // 단어 북마크 토글
  const handleToggleWord = (vocab: VocabItem, idx: number) => {
    const vocabKey = getVocabKey(vocab, idx);
    try {
      const saved = localStorage.getItem('saved_words');
      let words: SavedWord[] = saved ? JSON.parse(saved) : [];

      if (savedWordIds.has(vocabKey)) {
        words = words.filter((w) => w.id !== vocabKey && !(w.lessonId === lesson.id && w.kanji === vocab.kanji));
        const nextSet = new Set(savedWordIds);
        nextSet.delete(vocabKey);
        nextSet.delete(`${lesson.id}_${vocab.kanji}`);
        setSavedWordIds(nextSet);
      } else {
        const newWord: SavedWord = {
          ...vocab,
          id: vocabKey,
          lessonId: lesson.id,
          savedAt: new Date().toISOString(),
          isMemorized: false,
        };
        words.push(newWord);
        const nextSet = new Set(savedWordIds);
        nextSet.add(vocabKey);
        nextSet.add(`${lesson.id}_${vocab.kanji}`);
        setSavedWordIds(nextSet);
      }

      localStorage.setItem('saved_words', JSON.stringify(words));
    } catch {
      // 저장 실패 처리
    }
  };

  // 레슨 전체 보관 토글
  const handleToggleLessonSave = () => {
    try {
      const saved = localStorage.getItem('saved_lessons');
      let lessons: DailyLesson[] = saved ? JSON.parse(saved) : [];

      if (isLessonSaved) {
        lessons = lessons.filter((l) => l.id !== lesson.id);
        setIsLessonSaved(false);
      } else {
        lessons.unshift(lesson);
        setIsLessonSaved(true);
      }
      localStorage.setItem('saved_lessons', JSON.stringify(lessons));
    } catch {
      // 무시
    }
  };

  // 핵심 표현 북마크 토글
  const keyExpressionWordId = `key-${lesson.id}`;
  const isKeyExpressionSaved = savedWordIds.has(keyExpressionWordId);

  const handleToggleKeyExpression = () => {
    try {
      const saved = localStorage.getItem('saved_words');
      let words: SavedWord[] = saved ? JSON.parse(saved) : [];

      if (isKeyExpressionSaved) {
        words = words.filter((w) => w.id !== keyExpressionWordId);
        const nextSet = new Set(savedWordIds);
        nextSet.delete(keyExpressionWordId);
        setSavedWordIds(nextSet);
      } else {
        const newWord: SavedWord = {
          id: keyExpressionWordId,
          kanji: lesson.keyExpression.japanese,
          reading: lesson.keyExpression.reading,
          meaning: lesson.keyExpression.korean,
          partOfSpeech: '핵심표현',
          lessonId: lesson.id,
          savedAt: new Date().toISOString(),
          isMemorized: false,
        };
        words.push(newWord);
        setSavedWordIds(new Set(savedWordIds).add(keyExpressionWordId));
      }
      localStorage.setItem('saved_words', JSON.stringify(words));
    } catch {
      // 무시
    }
  };

  // 학습 완료 토글
  const handleToggleComplete = () => {
    const nextState = !isLessonCompleted;
    setIsLessonCompleted(nextState);
    try {
      localStorage.setItem(`lesson_completed_${lesson.id}`, String(nextState));
    } catch {
      // 무시
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-[#EDE8E1] card-shadow overflow-hidden transition-all">
      {/* 1. 상단 헤더 뱃지 및 레슨 보관 버튼 */}
      <div className="bg-gradient-to-r from-[#FAF0E6] to-[#FFF9F2] px-4 py-3 border-b border-[#F4DDD4] flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 min-w-0">
          {isAiGenerated ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-[11px] font-bold text-emerald-700 border border-emerald-200 whitespace-nowrap shadow-xs shrink-0">
              <Sparkles className="w-3 h-3 text-emerald-600 shrink-0" />
              <span>AIカスタム</span>
            </span>
          ) : lesson.level === 'starter' ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100 text-[11px] font-black text-amber-800 border border-amber-300 whitespace-nowrap shadow-xs shrink-0">
              <Baby className="w-3.5 h-3.5 text-amber-700 shrink-0" />
              <span>Lv.0 유치원생</span>
            </span>
          ) : lesson.level === 'beginner' ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-[11px] font-black text-emerald-800 border border-emerald-300 whitespace-nowrap shadow-xs shrink-0">
              <Sprout className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
              <span>Lv.1 초급</span>
            </span>
          ) : lesson.level === 'intermediate' ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-100 text-[11px] font-black text-blue-800 border border-blue-300 whitespace-nowrap shadow-xs shrink-0">
              <Sparkles className="w-3.5 h-3.5 text-blue-700 shrink-0" />
              <span>Lv.2 중급</span>
            </span>
          ) : lesson.level === 'advanced' ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-100 text-[11px] font-black text-purple-800 border border-purple-300 whitespace-nowrap shadow-xs shrink-0">
              <Flame className="w-3.5 h-3.5 text-purple-700 shrink-0" />
              <span>Lv.3 실전</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white text-[11px] font-bold text-[#E07A5F] border border-[#F4DDD4] whitespace-nowrap shadow-xs shrink-0">
              <Sparkles className="w-3 h-3 text-[#D97706] shrink-0" />
              <span>Day {lesson.dayNumber}</span>
            </span>
          )}

          <span className="text-xs font-bold text-[#2D3748] truncate">
            {lesson.unitTitle || lesson.seriesTitle}
          </span>
        </div>

        <button
          onClick={handleToggleLessonSave}
          className={`px-2.5 py-1 rounded-xl text-[11px] font-bold flex items-center gap-1 transition-all border whitespace-nowrap shrink-0 active:scale-95 ${
            isLessonSaved
              ? 'bg-[#E07A5F] text-white border-[#E07A5F] shadow-sm'
              : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
          }`}
          title={isLessonSaved ? '保存解除' : 'レッスン保存'}
        >
          {isLessonSaved ? (
            <BookmarkCheck className="w-3.5 h-3.5 shrink-0" />
          ) : (
            <Bookmark className="w-3.5 h-3.5 shrink-0" />
          )}
          <span>{isLessonSaved ? '保存済み' : 'レッスン保存'}</span>
        </button>
      </div>

      {/* 2. 초보자 발음 가이드 모드 전용 툴바 (여유로운 독립 행으로 겹침 완벽 방지) */}
      <div className="bg-[#FAF0E6]/40 px-4 py-2 border-b border-[#F4DDD4]/70 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 text-gray-600 text-xs">
          <Languages className="w-3.5 h-3.5 text-[#E07A5F] shrink-0" />
          <span className="text-[11px] font-medium text-gray-600">
            読み仮名 &amp; 発音ガイド
          </span>
        </div>

        <button
          onClick={handleTogglePronounce}
          className={`px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 transition-all border active:scale-95 shrink-0 ${
            showPronounce
              ? 'bg-[#E07A5F] text-white border-[#E07A5F] shadow-xs'
              : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
          }`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${showPronounce ? 'bg-white' : 'bg-gray-300'}`} />
          <span>{showPronounce ? '表示 ON' : '表示 OFF'}</span>
        </button>
      </div>

      <div className="p-5 space-y-6">
        {/* 1. 핵심 표현 (Key Expression) */}
        <section className="bg-[#FBF9F5] rounded-2xl p-5 border border-[#EDE8E1] relative">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold tracking-wider text-gray-400 uppercase">
              今日のキーフレーズ
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={handleToggleKeyExpression}
                className={`p-1.5 rounded-lg border transition-all ${
                  isKeyExpressionSaved
                    ? 'bg-[#FAF0E6] text-[#E07A5F] border-[#E07A5F]'
                    : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
                }`}
                title={isKeyExpressionSaved ? '단어장에서 제거' : '핵심 표현 단어장에 저장'}
              >
                {isKeyExpressionSaved ? (
                  <BookmarkCheck className="w-4 h-4" />
                ) : (
                  <Bookmark className="w-4 h-4" />
                )}
              </button>

              <button
                onClick={() => handlePlay(lesson.keyExpression.japanese, 'key-slowest', 0.65)}
                className={`px-1.5 py-1 rounded-lg border text-[10px] font-medium transition-all ${
                  playingId === 'key-slowest'
                    ? 'bg-[#FAF0E6] text-[#E07A5F] border-[#E07A5F]'
                    : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
                }`}
                title="초저속 따라하기 (0.65x)"
              >
                0.65x
              </button>
              <button
                onClick={() => handlePlay(lesson.keyExpression.japanese, 'key-slow', 0.8)}
                className={`px-1.5 py-1 rounded-lg border text-[10px] font-medium transition-all ${
                  playingId === 'key-slow'
                    ? 'bg-[#FAF0E6] text-[#E07A5F] border-[#E07A5F]'
                    : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
                }`}
                title="천천히 듣기 (0.8x)"
              >
                0.8x
              </button>
              <button
                onClick={() => handlePlay(lesson.keyExpression.japanese, 'key-normal', 0.95)}
                className={`p-1.5 rounded-lg border transition-all ${
                  playingId === 'key-normal'
                    ? 'bg-[#FAF0E6] text-[#E07A5F] border-[#E07A5F]'
                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                }`}
                title="보통 속도 듣기"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 히라가나 읽기 */}
          <p className="text-[11px] text-gray-500 font-medium mb-1">
            {lesson.keyExpression.reading}
          </p>

          {/* 일본어 표기 (루비 지원 & 실시간 볼드 하이라이트) */}
          <h2 className="text-xl font-black text-[#2D3748] tracking-tight leading-snug mb-1.5">
            {renderRuby(lesson.keyExpression.japanese, 'key', activeBoundary)}
          </h2>

          {/* 한글 독음 (왕초보 지원) */}
          {showPronounce && (
            <div className="mb-2">
              <span
                className={`inline-block rounded-md border font-bold ${
                  lesson.level === 'starter'
                    ? 'text-sm font-black text-[#D97706] bg-amber-50 px-2.5 py-1 border-amber-200 shadow-2xs'
                    : 'text-xs text-[#E07A5F] bg-[#FAF0E6] px-2 py-0.5 border-[#F4DDD4]'
                }`}
              >
                [{lesson.pronunciationKorean || getPronunciation(lesson.keyExpression.japanese, lesson.keyExpression.reading)}]
              </span>
            </div>
          )}

          <p className="text-sm font-bold text-[#2D3748]">
            {lesson.keyExpression.korean}
          </p>
        </section>

        {/* 2. 실전 대화문 (Dialogue) */}
        <section className="space-y-2.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#2D3748]">
            <MessageSquare className="w-4 h-4 text-[#E07A5F]" />
            <span>実践カンバセーション</span>
          </div>

          <div className="space-y-2">
            {lesson.dialogue.map((line, idx) => {
              const isPlayingLine = playingId === `line-${idx}`;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl p-3.5 border border-[#EDE8E1] hover:border-[#E07A5F]/40 transition-colors flex items-start justify-between gap-3"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-gray-400 block">
                      {line.speaker}
                    </span>
                    <p className="text-xs font-semibold text-[#2D3748] leading-relaxed">
                      {renderRuby(line.japanese, `line-${idx}`, activeBoundary)}
                    </p>
                    {showPronounce && (
                      <p className="text-[11px] font-semibold text-[#E07A5F] leading-normal">
                        [{getPronunciation(line.japanese)}]
                      </p>
                    )}
                    <p className="text-[11px] text-gray-500 leading-normal">
                      {line.korean}
                    </p>
                  </div>

                  <button
                    onClick={() => handlePlay(line.japanese, `line-${idx}`)}
                    className={`p-1.5 rounded-lg border shrink-0 transition-colors ${
                      isPlayingLine
                        ? 'bg-[#FAF0E6] text-[#E07A5F] border-[#E07A5F]'
                        : 'bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100'
                    }`}
                    title="音声を聞く"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* 3. 핵심 문법 포인트 (Grammar) */}
        <section className="bg-white rounded-2xl p-4 border border-[#EDE8E1] space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#2D3748]">
            <BookOpen className="w-4 h-4 text-[#2E7D32]" />
            <span>文法ポイント: {lesson.grammar.title}</span>
          </div>

          <div className="bg-[#FBF9F5] p-2.5 rounded-xl border border-[#EDE8E1] text-xs font-mono text-gray-700">
            {lesson.grammar.structure}
          </div>

          <p className="text-xs text-[#4A5568] leading-relaxed">
            {lesson.grammar.explanation}
          </p>

          {lesson.grammar.comparison && (
            <div className="text-[11px] text-gray-600 bg-gray-50 p-2.5 rounded-xl border border-gray-100">
              <span className="font-bold text-gray-700 block mb-0.5">ニュアンス比較:</span>
              {lesson.grammar.comparison}
            </div>
          )}
        </section>

        {/* 4. 필수 어휘 리스트 (Vocabulary) */}
        <section className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#2D3748]">
              <BookMarked className="w-4 h-4 text-[#E07A5F]" />
              <span>関連単語・表現 ({lesson.vocabulary.length})</span>
            </div>
            <span className="text-[10px] text-gray-400">ブックマークで単語帳に追加</span>
          </div>

          <div className="grid grid-cols-1 gap-1.5">
            {lesson.vocabulary.map((vocab, idx) => {
              const vocabKey = getVocabKey(vocab, idx);
              const isSaved =
                savedWordIds.has(vocabKey) ||
                savedWordIds.has(`${lesson.id}_${vocab.kanji}`);
              return (
                <div
                  key={vocabKey}
                  className="bg-white rounded-xl p-3 border border-[#EDE8E1] flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handlePlay(vocab.kanji, `vocab-${vocabKey}`)}
                      className="p-1 text-gray-400 hover:text-gray-600"
                      title="発音を聞く"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                    <div>
                      <div className="flex items-baseline gap-1.5 flex-wrap">
                        <span className="font-bold text-[#2D3748]">{vocab.kanji}</span>
                        <span className="text-[10px] text-gray-400 font-mono">({vocab.reading})</span>
                        {showPronounce && (
                          <span className="text-[10px] font-semibold text-[#E07A5F]">
                            [{getPronunciation(vocab.kanji, vocab.reading)}]
                          </span>
                        )}
                        <span className="text-[9px] text-gray-400 border border-gray-200 px-1 rounded">
                          {vocab.partOfSpeech}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-600 mt-0.5">{vocab.meaning}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleToggleWord(vocab, idx)}
                    className={`p-1.5 rounded-lg border transition-all ${
                      isSaved
                        ? 'bg-[#FAF0E6] text-[#E07A5F] border-[#E07A5F]'
                        : 'bg-white text-gray-400 border-gray-200 hover:bg-gray-50'
                    }`}
                    title={isSaved ? '単語帳から解除' : '単語帳に追加'}
                  >
                    {isSaved ? (
                      <BookmarkCheck className="w-3.5 h-3.5" />
                    ) : (
                      <Bookmark className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* 5. 뉘앙스 & 실전 팁 (Nuance Tip) */}
        <section className="bg-[#FAF0E6]/50 rounded-2xl p-4 border border-[#F4DDD4] flex items-start gap-2.5">
          <Info className="w-4 h-4 text-[#E07A5F] shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs">
            <h4 className="font-bold text-[#2D3748]">ニュアンス＆会話のヒント</h4>
            <p className="text-[#718096] leading-relaxed">
              {lesson.nuanceTip}
            </p>
          </div>
        </section>

        {/* 학습 완료 버튼 */}
        <div className="pt-2">
          <button
            onClick={handleToggleComplete}
            className={`w-full py-3 px-4 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-98 ${
              isLessonCompleted
                ? 'bg-[#E8F5E9] text-[#2E7D32] border border-[#C8E6C9]'
                : 'bg-[#2D3748] hover:bg-[#1A202C] text-white shadow-sm'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isLessonCompleted ? '今日の学習完了！' : '今日の学習を完了する'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
