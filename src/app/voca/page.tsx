'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { SavedWord, DailyLesson } from '@/types';
import { speakJapanese } from '@/utils/tts';
import { getPronunciation } from '@/utils/japanesePronounce';
import {
  Bookmark,
  Volume2,
  RotateCw,
  CheckCircle2,
  Trash2,
  BookOpen,
  FolderArchive,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export default function VocaPage() {
  // 상단 메인 탭: 단어&표현 vs 보관한 학습자료
  const [mainView, setMainView] = useState<'words' | 'lessons'>('words');

  // 단어 & 표현 상태
  const [words, setWords] = useState<SavedWord[]>([]);
  const [activeWordFilter, setActiveWordFilter] = useState<'all' | 'memorized' | 'learning'>('all');
  const [isFlashcardMode, setIsFlashcardMode] = useState(false);
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // 보관한 레슨 상태
  const [savedLessons, setSavedLessons] = useState<DailyLesson[]>([]);
  const [expandedLessonId, setExpandedLessonId] = useState<string | null>(null);

  // 로컬 스토리지에서 단어 및 보관된 레슨 로드
  useEffect(() => {
    try {
      const savedWordsData = localStorage.getItem('saved_words');
      const savedLessonsData = localStorage.getItem('saved_lessons');

      setTimeout(() => {
        if (savedWordsData) {
          setWords(JSON.parse(savedWordsData));
        }
        if (savedLessonsData) {
          setSavedLessons(JSON.parse(savedLessonsData));
        }
      }, 0);
    } catch {
      // 무시
    }
  }, []);

  // 단어장 업데이트 저장
  const updateWords = (newWords: SavedWord[]) => {
    setWords(newWords);
    try {
      localStorage.setItem('saved_words', JSON.stringify(newWords));
    } catch {
      // 무시
    }
  };

  // 암기 여부 토글
  const handleToggleMemorized = (id: string) => {
    const updated = words.map((w) =>
      w.id === id ? { ...w, isMemorized: !w.isMemorized } : w
    );
    updateWords(updated);
  };

  // 단어 삭제
  const handleDeleteWord = (id: string) => {
    const updated = words.filter((w) => w.id !== id);
    updateWords(updated);
    if (flashcardIndex >= updated.length && updated.length > 0) {
      setFlashcardIndex(updated.length - 1);
    }
  };

  // 보관한 레슨 삭제
  const handleDeleteLesson = (id: string) => {
    const updated = savedLessons.filter((l) => l.id !== id);
    setSavedLessons(updated);
    try {
      localStorage.setItem('saved_lessons', JSON.stringify(updated));
    } catch {
      // 무시
    }
  };

  const [playingId, setPlayingId] = useState<string | null>(null);

  // 발음 재생
  const handlePlay = (e: React.MouseEvent, text: string, id?: string) => {
    e.stopPropagation();
    if (id) setPlayingId(id);
    speakJapanese(
      text,
      0.9,
      () => {
        if (id) setPlayingId(id);
      },
      () => {
        if (id) setPlayingId(null);
      }
    );
  };

  // 필터링된 단어 목록
  const filteredWords = words.filter((w) => {
    if (activeWordFilter === 'memorized') return w.isMemorized;
    if (activeWordFilter === 'learning') return !w.isMemorized;
    return true;
  });

  const currentFlashcard = filteredWords[flashcardIndex];

  // 플래시카드 이전 / 다음 이동
  const handlePrevFlashcard = useCallback(() => {
    if (flashcardIndex > 0) {
      setFlashcardIndex((prev) => prev - 1);
      setIsFlipped(false);
    }
  }, [flashcardIndex]);

  const handleNextFlashcard = useCallback(() => {
    if (flashcardIndex < filteredWords.length - 1) {
      setFlashcardIndex((prev) => prev + 1);
      setIsFlipped(false);
    }
  }, [flashcardIndex, filteredWords.length]);

  // --- 스와이프(좌우 쓸어넘기기) Pointer Events 핸들러 ---
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const pointerStartRef = useRef<{ x: number; y: number } | null>(null);
  const didSwipeRef = useRef(false);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('button')) return;
    if (e.pointerType === 'mouse' && e.button !== 0) return;

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // 무시
    }

    pointerStartRef.current = { x: e.clientX, y: e.clientY };
    setIsDragging(true);
    didSwipeRef.current = false;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !pointerStartRef.current) return;

    const deltaX = e.clientX - pointerStartRef.current.x;
    const deltaY = e.clientY - pointerStartRef.current.y;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      const dampened = Math.max(-120, Math.min(120, deltaX * 0.75));
      setDragOffset(dampened);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !pointerStartRef.current) return;

    const deltaX = e.clientX - pointerStartRef.current.x;
    const deltaY = e.clientY - pointerStartRef.current.y;

    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {
      // 무시
    }

    pointerStartRef.current = null;
    setIsDragging(false);
    setDragOffset(0);

    if (Math.abs(deltaX) > 35 && Math.abs(deltaX) > Math.abs(deltaY)) {
      didSwipeRef.current = true;
      if (deltaX < 0) {
        handleNextFlashcard();
      } else {
        handlePrevFlashcard();
      }
    }
  };

  const handlePointerCancel = (e: React.PointerEvent<HTMLDivElement>) => {
    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {
      // 무시
    }
    pointerStartRef.current = null;
    setIsDragging(false);
    setDragOffset(0);
  };

  const handleCardClick = () => {
    if (didSwipeRef.current) {
      didSwipeRef.current = false;
      return;
    }
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="px-4 pt-4 space-y-5">
      {/* 1. 헤더 인트로 */}
      <section className="bg-gradient-to-br from-[#FAF0E6] to-[#FFF9F2] rounded-3xl p-5 border border-[#F4DDD4]">
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/80 backdrop-blur-sm rounded-full text-[11px] font-bold text-[#E07A5F] border border-[#F4DDD4]">
            <Bookmark className="w-3.5 h-3.5 text-[#E07A5F]" />
            <span>釜山っ子の日本語ノート</span>
          </div>

          {mainView === 'words' && filteredWords.length > 0 && (
            <button
              onClick={() => {
                setIsFlashcardMode(!isFlashcardMode);
                setIsFlipped(false);
                setFlashcardIndex(0);
              }}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#E07A5F] hover:bg-[#D0694E] text-white rounded-xl text-xs font-bold transition-all active:scale-95 shadow-sm shrink-0 whitespace-nowrap"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>{isFlashcardMode ? '一覧で見る' : 'カードで復習'}</span>
            </button>
          )}
        </div>

        <h1 className="text-lg font-black text-[#2D3748] tracking-tight mb-1.5">
          手紙の単語帳 & 学習メモ
        </h1>
        <p className="text-xs text-[#718096] leading-relaxed">
          釜山の街を紹介するお便りを書きながら、一生懸命調べたり勉強した単語や表現たちです。
        </p>
      </section>

      {/* 2. 상단 2단 세그먼트 메인 탭 */}
      <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 rounded-2xl text-xs font-bold">
        <button
          onClick={() => setMainView('words')}
          className={`py-2 px-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 whitespace-nowrap ${
            mainView === 'words'
              ? 'bg-white text-[#2D3748] shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5 text-[#E07A5F] shrink-0" />
          <span>単語・表現 ({words.length})</span>
        </button>

        <button
          onClick={() => setMainView('lessons')}
          className={`py-2 px-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 whitespace-nowrap ${
            mainView === 'lessons'
              ? 'bg-white text-[#2D3748] shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <FolderArchive className="w-3.5 h-3.5 text-[#E07A5F] shrink-0" />
          <span>保存レッスン ({savedLessons.length})</span>
        </button>
      </div>

      {/* 3-A. [단어 & 표현 암기] 뷰 */}
      {mainView === 'words' && (
        <div className="space-y-4">
          {/* 상태 필터 버튼 (전체 / 학습 중 / 암기 완료) */}
          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={() => setActiveWordFilter('all')}
              className={`px-3 py-1.5 rounded-xl font-medium transition-all ${
                activeWordFilter === 'all'
                  ? 'bg-[#2D3748] text-white font-bold'
                  : 'bg-white text-gray-500 border border-[#EDE8E1] hover:bg-gray-50'
              }`}
            >
              すべて ({words.length})
            </button>
            <button
              onClick={() => setActiveWordFilter('learning')}
              className={`px-3 py-1.5 rounded-xl font-medium transition-all ${
                activeWordFilter === 'learning'
                  ? 'bg-[#2D3748] text-white font-bold'
                  : 'bg-white text-gray-500 border border-[#EDE8E1] hover:bg-gray-50'
              }`}
            >
              勉強中 ({words.filter((w) => !w.isMemorized).length})
            </button>
            <button
              onClick={() => setActiveWordFilter('memorized')}
              className={`px-3 py-1.5 rounded-xl font-medium transition-all ${
                activeWordFilter === 'memorized'
                  ? 'bg-[#2D3748] text-white font-bold'
                  : 'bg-white text-gray-500 border border-[#EDE8E1] hover:bg-gray-50'
              }`}
            >
              覚えた！ ({words.filter((w) => w.isMemorized).length})
            </button>
          </div>

          {/* 단어가 없을 때 */}
          {filteredWords.length === 0 ? (
            <div className="bg-white rounded-3xl p-10 text-center border border-[#EDE8E1] space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#FAF0E6] flex items-center justify-center mx-auto text-[#E07A5F]">
                <BookOpen className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-[#2D3748]">まだ保存された単語がありません</h3>
                <p className="text-xs text-gray-400">
                  お便りやデイリーノートからブックマークした単語がここに並びます。
                </p>
              </div>
            </div>
          ) : isFlashcardMode ? (
            /* 플래시카드 암기 모드 */
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-gray-400 px-1">
                <span>進捗: {flashcardIndex + 1} / {filteredWords.length}</span>
                <span>💡 左右スワイプで前・次へ、タップで裏返し</span>
              </div>

              {currentFlashcard && (
                <div
                  className="relative touch-pan-y"
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerCancel={handlePointerCancel}
                  onClick={handleCardClick}
                >
                  <div
                    className="min-h-64 bg-white rounded-3xl p-8 border border-[#EDE8E1] card-shadow cursor-pointer flex flex-col justify-between items-center text-center transition-all hover:border-[#E07A5F]/50 select-none"
                    style={{
                      transform: `translateX(${dragOffset}px) rotate(${dragOffset * 0.04}deg)`,
                      transition: isDragging ? 'none' : 'transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)'
                    }}
                  >
                    <div className="w-full flex justify-between items-center text-gray-400 text-xs">
                      <span className="border border-gray-200 px-2 py-0.5 rounded text-[10px]">
                        {currentFlashcard.partOfSpeech}
                      </span>
                      <button
                        onClick={(e) => handlePlay(e, currentFlashcard.kanji)}
                        className="p-2 rounded-full hover:bg-gray-100 text-gray-600"
                        title="発音を聞く"
                      >
                        <Volume2 className="w-5 h-5" />
                      </button>
                    </div>

                    {!isFlipped ? (
                      /* 앞면 */
                      <div className="space-y-2 my-auto">
                        <p className="text-sm text-gray-400 font-mono">
                          {currentFlashcard.reading}
                        </p>
                        <h2 className="text-2xl font-black text-[#2D3748] tracking-tight leading-snug">
                          {currentFlashcard.kanji}
                        </h2>
                        <p className="text-xs font-bold text-[#E07A5F]">
                          [{getPronunciation(currentFlashcard.kanji, currentFlashcard.reading)}]
                        </p>
                        <p className="text-[11px] text-gray-400 pt-2">
                          タップして意味を確認
                        </p>
                      </div>
                    ) : (
                      /* 뒷면 */
                      <div className="space-y-2 my-auto">
                        <h2 className="text-xl font-black text-[#E07A5F] leading-snug">
                          {currentFlashcard.meaning}
                        </h2>
                        <p className="text-xs text-gray-400 font-mono">
                          {currentFlashcard.kanji} ({currentFlashcard.reading})
                        </p>
                        <p className="text-xs font-semibold text-gray-500">
                          [{getPronunciation(currentFlashcard.kanji, currentFlashcard.reading)}]
                        </p>
                      </div>
                    )}

                    <div className="w-full flex justify-between items-center pt-4 border-t border-gray-100">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleMemorized(currentFlashcard.id);
                        }}
                        className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all ${
                          currentFlashcard.isMemorized
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{currentFlashcard.isMemorized ? '覚えた！' : '勉強中'}</span>
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePrevFlashcard();
                          }}
                          disabled={flashcardIndex === 0}
                          className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 disabled:opacity-30 rounded-xl text-xs font-bold text-gray-600 transition-all"
                        >
                          前へ
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleNextFlashcard();
                          }}
                          disabled={flashcardIndex === filteredWords.length - 1}
                          className="px-3 py-1.5 bg-[#2D3748] hover:bg-black disabled:opacity-30 rounded-xl text-xs font-bold text-white transition-all"
                        >
                          次へ
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* 리스트 모드 */
            <div className="space-y-2">
              {filteredWords.map((word) => (
                <div
                  key={word.id}
                  className="p-3.5 bg-white rounded-2xl border border-[#EDE8E1] card-shadow flex items-center justify-between gap-3 transition-all hover:border-[#E07A5F]/30"
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={(e) => handlePlay(e, word.kanji, word.id)}
                      className={`p-2 rounded-xl border transition-colors ${
                        playingId === word.id
                          ? 'bg-[#FAF0E6] text-[#E07A5F] border-[#E07A5F]'
                          : 'bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100'
                      }`}
                      title="発音を聞く"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[#2D3748]">{word.kanji}</span>
                        <span className="text-xs text-gray-400 font-mono">({word.reading})</span>
                        <span className="text-[11px] font-semibold text-[#E07A5F]">
                          [{getPronunciation(word.kanji, word.reading)}]
                        </span>
                        <span className="text-[9px] text-gray-400 border border-gray-200 px-1 rounded">
                          {word.partOfSpeech}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 mt-0.5">{word.meaning}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleToggleMemorized(word.id)}
                      className={`p-1.5 rounded-lg border transition-all ${
                        word.isMemorized
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-gray-50 text-gray-400 border-gray-200 hover:bg-gray-100'
                      }`}
                      title={word.isMemorized ? '覚えた' : '勉強中'}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleDeleteWord(word.id)}
                      className="p-1.5 rounded-lg border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-200 transition-colors"
                      title="削除"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 3-B. [보관한 학습 자료 (Saved Lessons)] 뷰 */}
      {mainView === 'lessons' && (
        <div className="space-y-3">
          {savedLessons.length === 0 ? (
            <div className="bg-white rounded-3xl p-10 text-center border border-[#EDE8E1] space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#FAF0E6] flex items-center justify-center mx-auto text-[#E07A5F]">
                <FolderArchive className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-[#2D3748]">保存されたレッスンがありません</h3>
                <p className="text-xs text-gray-400">
                  デイリーノートの「レッスン保存」を押すと、ここに保存されます。
                </p>
              </div>
            </div>
          ) : (
            savedLessons.map((lesson) => {
              const isExpanded = expandedLessonId === lesson.id;
              return (
                <div
                  key={lesson.id}
                  className="bg-white rounded-2xl border border-[#EDE8E1] card-shadow overflow-hidden transition-all text-xs"
                >
                  {/* 레슨 헤더 */}
                  <div
                    onClick={() => setExpandedLessonId(isExpanded ? null : lesson.id)}
                    className="p-4 cursor-pointer hover:bg-gray-50/50 flex items-center justify-between gap-2"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded-md bg-[#FAF0E6] text-[#E07A5F] font-bold text-[10px]">
                          {lesson.seriesTitle}
                        </span>
                        <span className="font-bold text-[#2D3748]">
                          {lesson.themeTitle}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-500">
                        {lesson.keyExpression.japanese} ({lesson.keyExpression.korean})
                      </p>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => handlePlay(e, lesson.keyExpression.japanese, `saved-key-${lesson.id}`)}
                        className={`p-1.5 rounded-lg border transition-all ${
                          playingId === `saved-key-${lesson.id}`
                            ? 'bg-[#FAF0E6] text-[#E07A5F] border-[#E07A5F]'
                            : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
                        }`}
                        title="発音を聞く"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteLesson(lesson.id);
                        }}
                        className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-gray-100"
                        title="保存を解除"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="p-1 text-gray-400">
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </div>
                  </div>

                  {/* 펼쳐진 상세 자료 영역 */}
                  {isExpanded && (
                    <div className="p-4 pt-0 border-t border-gray-100 space-y-3 bg-[#FBF9F5]/40">
                      {/* 대화문 */}
                      <div className="space-y-1.5 pt-3">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-gray-500 text-[10px] block">
                            会話シチュエーション:
                          </span>
                          <span className="text-[9px] text-gray-400">
                            スピーカーを押して発音を聞く
                          </span>
                        </div>

                        {lesson.dialogue.map((line, idx) => {
                          const linePlayId = `saved-line-${lesson.id}-${idx}`;
                          const isPlayingLine = playingId === linePlayId;
                          return (
                            <div
                              key={idx}
                              className="bg-white p-3 rounded-xl border border-gray-200 hover:border-[#E07A5F]/40 transition-colors flex items-start justify-between gap-3"
                            >
                              <div className="space-y-0.5">
                                <span className="text-[10px] font-bold text-gray-400 block">
                                  {line.speaker}
                                </span>
                                <p className="font-semibold text-gray-800 text-xs leading-relaxed">
                                  {line.japanese}
                                </p>
                                <p className="text-[11px] font-semibold text-[#E07A5F]">
                                  [{getPronunciation(line.japanese)}]
                                </p>
                                <p className="text-[11px] text-gray-500">
                                  {line.korean}
                                </p>
                              </div>

                              <button
                                onClick={(e) => handlePlay(e, line.japanese, linePlayId)}
                                className={`p-1.5 rounded-lg border shrink-0 transition-colors ${
                                  isPlayingLine
                                    ? 'bg-[#FAF0E6] text-[#E07A5F] border-[#E07A5F]'
                                    : 'bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100'
                                }`}
                                title="대화 음성 듣기"
                              >
                                <Volume2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          );
                        })}
                      </div>

                      {/* 문법 포인트 */}
                      <div className="bg-white p-3 rounded-xl border border-gray-200 space-y-1">
                        <span className="font-bold text-[#2E7D32] text-[10px] block">
                          문법 포인트: {lesson.grammar.title}
                        </span>
                        <p className="text-gray-700 leading-relaxed">
                          {lesson.grammar.explanation}
                        </p>
                      </div>

                      {/* 뉘앙스 팁 */}
                      <div className="bg-[#FAF0E6]/60 p-3 rounded-xl border border-[#F4DDD4] text-[#8C5243]">
                        <span className="font-bold text-[10px] block mb-0.5">
                          원어민 뉘앙스 팁:
                        </span>
                        <p className="leading-relaxed">
                          {lesson.nuanceTip}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
