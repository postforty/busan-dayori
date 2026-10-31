'use client';

import React, { useState, useEffect, useRef } from 'react';
import { DailyLesson, VocabItem, SavedWord, WordBreakdown, CurriculumLevel } from '@/types';
import { speakJapanese, stopJapaneseSpeech } from '@/utils/tts';
import { getPronunciation, parseRubySegments } from '@/utils/japanesePronounce';
import {
  Volume2,
  Loader2,
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
  Pencil,
  Zap,
  Flame,
  Play,
  Square,
  Video
} from 'lucide-react';
import { enrichLessonWithCurriculum, findCurriculumUnit } from '@/lib/curriculum/curriculumData';
import { isLevelAllUnitsCompleted, getLevelTestResult } from '@/lib/curriculum/levelQuizData';
import SentenceTutorDrawer from './SentenceTutorDrawer';
import { LessonCompletionStamp } from './LessonCompletionStamp';
import SecretEnvelopeModal from '@/components/curriculum/SecretEnvelopeModal';
import LevelTestModal from '@/components/curriculum/LevelTestModal';
import ShortsModal from './ShortsModal';
import { showGlobalToast } from '@/utils/toast';

interface DailyLessonCardProps {
  lesson: DailyLesson;
  isAiGenerated?: boolean;
  hideAiBadge?: boolean;
  onRewardModalChange?: (isOpen: boolean) => void;
}

function deriveBreakdownFromVocab(
  japanese: string,
  vocabList?: VocabItem[]
): WordBreakdown[] | undefined {
  if (!vocabList || vocabList.length === 0) return undefined;
  const matched = vocabList.filter(
    (v) => v.kanji && japanese.includes(v.kanji)
  );
  if (matched.length === 0) return undefined;
  return matched.map((v) => ({
    word: v.kanji,
    reading: v.reading,
    meaning: v.meaning,
  }));
}

/**
 * 한자/로마자 혼입을 방지하고 유효한 한글 독음을 보장하는 헬퍼
 */
function resolveHangulPronounce(
  explicitPronounce?: string,
  japaneseFallback: string = '',
  customReading?: string
): string {
  // 1. explicitPronounce가 있고, 한자가 없으며, 영문/로마자가 아닌 경우 유효한 한글 발음으로 채택
  if (
    explicitPronounce &&
    !/[\u4E00-\u9FAF\u3005]/.test(explicitPronounce) &&
    !/^[a-zA-Z\s.,!?'-]+$/.test(explicitPronounce.trim())
  ) {
    return explicitPronounce;
  }

  // 2. 누락되었거나 한자/로마자가 포함된 경우 getPronunciation을 통해 안전하게 변환
  return getPronunciation(japaneseFallback || explicitPronounce || '', customReading);
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

export default function DailyLessonCard({
  lesson,
  isAiGenerated,
  hideAiBadge,
  onRewardModalChange
}: DailyLessonCardProps) {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [activeBoundary, setActiveBoundary] = useState<{ id: string; charIndex: number; charLength: number } | null>(null);
  const [savedWordIds, setSavedWordIds] = useState<Set<string>>(new Set());
  const [isLessonCompleted, setIsLessonCompleted] = useState(false);
  const [showRewardStamp, setShowRewardStamp] = useState(false);
  const [pendingSecretEnvelopeLevel, setPendingSecretEnvelopeLevel] = useState<CurriculumLevel | null>(null);
  const [secretEnvelopeLevel, setSecretEnvelopeLevel] = useState<CurriculumLevel | null>(null);
  const [activeTestLevel, setActiveTestLevel] = useState<CurriculumLevel | null>(null);
  const [isLessonSaved, setIsLessonSaved] = useState(false);
  const [showPronounce, setShowPronounce] = useState(true);

  // 학습 완료 스탬프 / 비밀 편지 / 레벨 테스트 모달 활성화 여부 부모 통지
  const isAnyRewardModalOpen = Boolean(
    showRewardStamp || pendingSecretEnvelopeLevel || secretEnvelopeLevel || activeTestLevel
  );

  useEffect(() => {
    onRewardModalChange?.(isAnyRewardModalOpen);
  }, [isAnyRewardModalOpen, onRewardModalChange]);
  const [activeTutorSentence, setActiveTutorSentence] = useState<{
    japanese: string;
    korean: string;
    speaker: string;
    pronunciation?: string;
    breakdown?: WordBreakdown[];
  } | null>(null);
  const [isPlayingAllDialogue, setIsPlayingAllDialogue] = useState(false);
  const [isShortsModalOpen, setIsShortsModalOpen] = useState(false);
  const dialogueSessionRef = useRef<number>(0);
  const [keyPlaybackSpeed, setKeyPlaybackSpeed] = useState<number>(0.95);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const speedMenuRef = useRef<HTMLDivElement | null>(null);
  const longPressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isLongPressTriggeredRef = useRef(false);

  // 롱프레스 터치/마우스 시작 (450ms 이상 길게 누르면 배속 팝오버 노출)
  const handlePressStart = () => {
    isLongPressTriggeredRef.current = false;
    if (longPressTimerRef.current) clearTimeout(longPressTimerRef.current);
    longPressTimerRef.current = setTimeout(() => {
      isLongPressTriggeredRef.current = true;
      setShowSpeedMenu(true);
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        try {
          navigator.vibrate(25);
        } catch {
          // ignore
        }
      }
    }, 450);
  };

  // 롱프레스 터치/마우스 종료
  const handlePressEnd = () => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  };

  // 스피커 클릭 시 일반 재생 (롱프레스 후 손을 뗀 경우 클릭 이벤트 무시)
  const handleKeySpeakerClick = () => {
    if (isLongPressTriggeredRef.current) {
      isLongPressTriggeredRef.current = false;
      return;
    }
    handlePlay(lesson.keyExpression.japanese, 'key', keyPlaybackSpeed);
  };

  // 속도 팝오버 외부 클릭/터치 시 닫기
  useEffect(() => {
    if (!showSpeedMenu) return;
    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (speedMenuRef.current && !speedMenuRef.current.contains(e.target as Node)) {
        setShowSpeedMenu(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('touchstart', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, [showSpeedMenu]);

  const [isTitleExpanded, setIsTitleExpanded] = useState(false);

  // 레슨 변경 시 상태 초기화
  useEffect(() => {
    setIsTitleExpanded(false);
    setActiveTutorSentence(null);
    setShowSpeedMenu(false);
    setPendingSecretEnvelopeLevel(null);
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  }, [lesson.id]);

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

  // 로컬 스토리지에서 저장된 단어 및 학습 완료 여부, 레슨 보관 여부 로드 및 유닛 전환 시 상태 초기화
  useEffect(() => {
    // 유닛(레슨) 전환 시 열려 있던 과외 창 닫기 및 재생 중인 음성 정지
    dialogueSessionRef.current++;
    setIsPlayingAllDialogue(false);
    setActiveTutorSentence(null);
    stopJapaneseSpeech();
    setLoadingId(null);
    setPlayingId(null);
    setActiveBoundary(null);

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

    return () => {
      dialogueSessionRef.current++;
      stopJapaneseSpeech();
    };
  }, [lesson.id]);

  // 대화문 전체 연속 재생 정지
  const stopAllDialogue = () => {
    dialogueSessionRef.current++;
    stopJapaneseSpeech();
    setIsPlayingAllDialogue(false);
    setLoadingId(null);
    setPlayingId(null);
    setActiveBoundary(null);
  };

  // 키프레이즈 1:1 과외 바텀 시트 토글
  const handleToggleKeyTutor = () => {
    if (isPlayingAllDialogue) {
      stopAllDialogue();
    }
    setActiveTutorSentence((prev) =>
      prev?.speaker === '핵심 표현'
        ? null
        : {
            japanese: lesson.keyExpression.japanese,
            korean: lesson.keyExpression.korean,
            speaker: '핵심 표현',
            pronunciation: resolveHangulPronounce(
              lesson.pronunciationKorean,
              lesson.keyExpression.japanese,
              lesson.keyExpression.reading
            ),
            breakdown:
              lesson.keyExpression.breakdown ||
              deriveBreakdownFromVocab(lesson.keyExpression.japanese, lesson.vocabulary),
          }
    );
  };

  // 대화문 전체 연속 재생 토글
  const handleTogglePlayAllDialogue = async () => {
    if (isPlayingAllDialogue) {
      stopAllDialogue();
      return;
    }

    if (!lesson.dialogue || lesson.dialogue.length === 0) return;

    // 기존 재생 중인 음성 정지
    stopJapaneseSpeech();
    setLoadingId(null);
    setPlayingId(null);
    setActiveBoundary(null);

    const currentSession = ++dialogueSessionRef.current;
    setIsPlayingAllDialogue(true);

    for (let idx = 0; idx < lesson.dialogue.length; idx++) {
      if (dialogueSessionRef.current !== currentSession) break;

      const line = lesson.dialogue[idx];
      const lineId = `line-${idx}`;

      // 문장 발음 재생 대기
      await new Promise<void>((resolve) => {
        let isResolved = false;
        const finish = () => {
          if (!isResolved) {
            isResolved = true;
            resolve();
          }
        };

        const timeoutId = setTimeout(finish, 15000);

        setLoadingId(lineId);

        speakJapanese(
          line.japanese,
          0.9,
          () => {
            if (dialogueSessionRef.current !== currentSession) {
              clearTimeout(timeoutId);
              finish();
              return;
            }
            setLoadingId(null);
            setPlayingId(lineId);
            setActiveBoundary({ id: lineId, charIndex: 0, charLength: 1 });
          },
          () => {
            clearTimeout(timeoutId);
            finish();
          },
          (charIndex) => {
            if (dialogueSessionRef.current !== currentSession) return;
            setLoadingId(null);
            setActiveBoundary({ id: lineId, charIndex, charLength: 1 });
          }
        );
      });

      if (dialogueSessionRef.current !== currentSession) break;

      setLoadingId(null);
      setPlayingId(null);
      setActiveBoundary(null);

      // 마지막 문장이 아니면 화자 간 자연스러운 대화 텀(0.65초) 부여
      if (idx < lesson.dialogue.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, 650));
      }
    }

    // 정상 완료 시 상태 리셋
    if (dialogueSessionRef.current === currentSession) {
      setIsPlayingAllDialogue(false);
      setLoadingId(null);
      setPlayingId(null);
      setActiveBoundary(null);
    }
  };

  // 발음 듣기 (실시간 글자 경계 추적 지원 및 비동기 로딩 딜레이 격리)
  const handlePlay = (text: string, id: string, rate: number = 0.9) => {
    if (isPlayingAllDialogue) {
      dialogueSessionRef.current++;
      setIsPlayingAllDialogue(false);
    }

    if (playingId === id || loadingId === id) {
      stopJapaneseSpeech();
      setLoadingId(null);
      setPlayingId(null);
      setActiveBoundary(null);
      return;
    }

    setLoadingId(id);
    speakJapanese(
      text,
      rate,
      () => {
        setLoadingId(null);
        setPlayingId(id);
        setActiveBoundary({ id, charIndex: 0, charLength: 1 });
      },
      () => {
        setLoadingId(null);
        setPlayingId(null);
        setActiveBoundary(null);
      },
      (charIndex) => {
        setLoadingId(null);
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

  // 레슨 전체(상황 대화) 보관 토글
  const handleToggleLessonSave = () => {
    try {
      const saved = localStorage.getItem('saved_lessons');
      let lessons: DailyLesson[] = saved ? JSON.parse(saved) : [];

      if (isLessonSaved) {
        lessons = lessons.filter((l) => l.id !== lesson.id);
        setIsLessonSaved(false);
        showGlobalToast('북마크를 해제했습니다.', { icon: 'info' });
      } else {
        lessons.unshift(lesson);
        setIsLessonSaved(true);
        showGlobalToast('이 레슨이 북마크에 추가되었습니다.', { icon: 'check' });
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

    if (nextState) {
      // 로컬스토리지에 현재 레슨 완료 즉시 저장
      try {
        localStorage.setItem(`lesson_completed_${lesson.id}`, 'true');
      } catch {}

      // 현재 레슨의 커리큘럼 정보 조회
      const curriculumInfo = findCurriculumUnit(lesson.id);
      if (curriculumInfo) {
        const targetLevel = curriculumInfo.level;
        const isAllUnitsDone = isLevelAllUnitsCompleted(targetLevel.level, [lesson.id]);
        const currentResult = getLevelTestResult(targetLevel.level);
        const hasPassed = currentResult?.isPassed;

        // 레벨의 모든 유닛이 완료되었고, 아직 테스트를 통과하지 않은 경우:
        // 스탬프 모달을 먼저 표시하고, 사용자가 확인을 누르면 비밀 편지 봉투가 열리도록 예약
        if (isAllUnitsDone && !hasPassed) {
          setPendingSecretEnvelopeLevel(targetLevel);
        } else {
          setPendingSecretEnvelopeLevel(null);
        }
      } else {
        setPendingSecretEnvelopeLevel(null);
      }

      // 레벨 완주 여부와 무관하게 항상 스탬프 모달을 먼저 띄워 도장 쾅 성취감 부여
      setShowRewardStamp(true);
    } else {
      setPendingSecretEnvelopeLevel(null);
      try {
        localStorage.removeItem(`lesson_completed_${lesson.id}`);
      } catch {}
    }

    try {
      localStorage.setItem(`lesson_completed_${lesson.id}`, String(nextState));
      // 전역 레슨 완료 상태 변경 알림 이벤트 전파
      window.dispatchEvent(
        new CustomEvent('busan-lesson-completed-changed', {
          detail: { lessonId: lesson.id, isCompleted: nextState }
        })
      );
    } catch {
      // 무시
    }
  };

  const effectiveLesson = enrichLessonWithCurriculum(lesson);
  const fullTitle = effectiveLesson.unitTitle || effectiveLesson.themeTitle || effectiveLesson.seriesTitle;

  return (
    <div className="bg-white rounded-3xl border border-[#EDE8E1] card-shadow overflow-hidden transition-all">
      {/* 1. 상단 헤더 뱃지 및 레슨 보관 버튼 */}
      <div className="bg-gradient-to-r from-[#FAF0E6] to-[#FFF9F2] px-4 py-3 border-b border-[#F4DDD4]">
        <div className="flex items-center justify-between gap-2">
          <div
            onClick={isTitleExpanded ? () => setIsTitleExpanded(false) : undefined}
            className={`flex items-center gap-1.5 min-w-0 flex-1 ${
              isTitleExpanded ? 'cursor-pointer active:opacity-75' : ''
            }`}
            title={isTitleExpanded ? '제목 접기 (클릭)' : undefined}
          >
            {isAiGenerated ? (
              !hideAiBadge && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#EBF3FB] text-[11px] font-black text-[#3D5A80] border border-[#C5D9F2] whitespace-nowrap shadow-2xs shrink-0">
                  <Sparkles className="w-3 h-3 text-[#3D5A80] shrink-0" />
                  <span>AI 맞춤</span>
                </span>
              )
            ) : effectiveLesson.level === 'starter' ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FFF2EA] text-[11px] font-black text-[#D96B4F] border border-[#FCDCCE] whitespace-nowrap shadow-xs shrink-0">
                <Baby className="w-3.5 h-3.5 text-[#E78B70] shrink-0" />
                <span>Lv.0 입문</span>
              </span>
            ) : effectiveLesson.level === 'beginner' ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FAF0E6] text-[11px] font-black text-[#E07A5F] border border-[#F4DDD4] whitespace-nowrap shadow-xs shrink-0">
                <Sparkles className="w-3.5 h-3.5 text-[#E07A5F] shrink-0" />
                <span>Lv.1 초급</span>
              </span>
            ) : effectiveLesson.level === 'intermediate' ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#F7EBE5] text-[11px] font-black text-[#C45B40] border border-[#ECCDC2] whitespace-nowrap shadow-xs shrink-0">
                <Zap className="w-3.5 h-3.5 text-[#C45B40] shrink-0" />
                <span>Lv.2 중급</span>
              </span>
            ) : effectiveLesson.level === 'advanced' ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#F4E7E1] text-[11px] font-black text-[#943A25] border border-[#E4BFB4] whitespace-nowrap shadow-xs shrink-0">
                <Flame className="w-3.5 h-3.5 text-[#943A25] shrink-0" />
                <span>Lv.3 실전</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FAF0E6] text-[11px] font-bold text-[#E07A5F] border border-[#F4DDD4] whitespace-nowrap shadow-xs shrink-0">
                <Sparkles className="w-3 h-3 text-[#D97706] shrink-0" />
                <span>추천 레슨</span>
              </span>
            )}

            {/* 접혀 있을 때: 뱃지 옆에 한 줄로 콤팩트하게 말줄임 표시 */}
            {!isTitleExpanded && (
              <button
                type="button"
                onClick={() => setIsTitleExpanded(true)}
                className="text-left min-w-0 cursor-pointer active:opacity-75 focus:outline-none flex-1"
                title="전체 제목 보기 (클릭)"
                aria-expanded={false}
              >
                <span className="text-xs font-bold text-[#2D3748] truncate block hover:text-[#E07A5F] transition-colors">
                  {fullTitle}
                </span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {/* 발음 가이드 ON/OFF 토글 버튼 (아이콘 전용) */}
            <button
              type="button"
              onClick={handleTogglePronounce}
              className={`w-7 h-7 rounded-xl flex items-center justify-center transition-all border active:scale-95 shrink-0 cursor-pointer ${
                showPronounce
                  ? 'bg-[#FFF2EA] text-[#E07A5F] border-[#FCDCCE] shadow-2xs'
                  : 'bg-white/60 text-gray-400 border-[#EDE8E1] hover:bg-white hover:text-gray-500'
              }`}
              title={showPronounce ? '발음 가이드 끄기' : '발음 가이드 켜기'}
              aria-label={showPronounce ? '발음 켜짐' : '발음 꺼짐'}
            >
              <Languages className="w-3.5 h-3.5" />
            </button>

            {/* 레슨 북마크 토글 버튼 (아이콘 전용으로 규격 통일) */}
            <button
              type="button"
              onClick={handleToggleLessonSave}
              className={`w-7 h-7 rounded-xl flex items-center justify-center transition-all border shrink-0 active:scale-95 cursor-pointer ${
                isLessonSaved
                  ? 'bg-[#E07A5F] text-white border-[#E07A5F] shadow-sm'
                  : 'bg-white text-[#718096] border-[#EDE8E1] hover:bg-gray-50 hover:text-[#2D3748]'
              }`}
              title={isLessonSaved ? '북마크 해제' : '이 레슨 북마크하기'}
              aria-label={isLessonSaved ? '북마크됨' : '북마크'}
            >
              {isLessonSaved ? (
                <BookmarkCheck className="w-3.5 h-3.5 shrink-0" />
              ) : (
                <Bookmark className="w-3.5 h-3.5 shrink-0" />
              )}
            </button>
          </div>
        </div>

        {/* 펼쳐졌을 때: 카드 가로 전체 너비(100%)를 온전히 사용하여 시원하게 노출 */}
        {isTitleExpanded && (
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setIsTitleExpanded(false)}
              className="text-left w-full cursor-pointer active:opacity-75 focus:outline-none"
              title="제목 접기 (클릭)"
              aria-expanded={true}
            >
              <span className="text-xs font-bold text-[#2D3748] whitespace-normal break-words leading-relaxed block hover:text-[#E07A5F] transition-colors">
                {fullTitle}
              </span>
            </button>
          </div>
        )}
      </div>

      <div className="p-5 space-y-6">
        {/* 1. 핵심 표현 (Key Expression) */}
        <section className="bg-[#FBF9F5] rounded-2xl p-5 border border-[#EDE8E1] relative">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold tracking-wider text-gray-400 uppercase">
              今日のキーフレーズ
            </span>
            <div className="relative">
              {/* 속도 선택 미니 팝오버 (롱프레스 또는 우클릭 시 노출) */}
              {showSpeedMenu && (
                <div
                  ref={speedMenuRef}
                  className="absolute right-0 bottom-full mb-1.5 z-20 flex items-center gap-1 p-1 bg-white rounded-xl shadow-lg border border-[#EDE8E1] animate-in fade-in zoom-in-95 duration-150 whitespace-nowrap"
                >
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setKeyPlaybackSpeed(0.95);
                      setShowSpeedMenu(false);
                      showGlobalToast('⚡ 1.0x 배속으로 재생합니다');
                      handlePlay(lesson.keyExpression.japanese, 'key', 0.95);
                    }}
                    className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-colors cursor-pointer ${
                      keyPlaybackSpeed === 0.95
                        ? 'bg-[#FAF0E6] text-[#E07A5F] font-black'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    1.0x
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setKeyPlaybackSpeed(0.5);
                      setShowSpeedMenu(false);
                      showGlobalToast('🐢 0.5x 배속으로 재생합니다');
                      handlePlay(lesson.keyExpression.japanese, 'key', 0.5);
                    }}
                    className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-colors cursor-pointer ${
                      keyPlaybackSpeed === 0.5
                        ? 'bg-[#FAF0E6] text-[#E07A5F] font-black'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    0.5x
                  </button>
                </div>
              )}

              {/* 핵심 표현 재생 버튼 (클릭 시 재생, 길게 누르면 배속 팝오버) */}
              <div className="relative inline-flex items-center">
                <button
                  type="button"
                  onClick={handleKeySpeakerClick}
                  onMouseDown={handlePressStart}
                  onMouseUp={handlePressEnd}
                  onMouseLeave={handlePressEnd}
                  onTouchStart={handlePressStart}
                  onTouchEnd={handlePressEnd}
                  onTouchCancel={handlePressEnd}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    setShowSpeedMenu(true);
                  }}
                  className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                    playingId === 'key' || loadingId === 'key'
                      ? 'bg-[#FAF0E6] text-[#E07A5F] border-[#E07A5F]'
                      : keyPlaybackSpeed === 0.5
                      ? 'bg-[#FFF8F3] text-[#E07A5F] border-[#FCE4D8] hover:bg-[#FAF0E6]'
                      : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                  }`}
                  title="핵심 표현 듣기 (길게 누르면 0.5배속 조절)"
                  aria-label="핵심 표현 듣기 (길게 누르면 0.5배속 조절)"
                >
                  {loadingId === 'key' ? (
                    <Loader2 className="w-4 h-4 animate-spin text-[#E07A5F]" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </button>

                {/* 0.5배속 활성화 상태 표시 배지 (클릭 시 1.0x 즉시 복귀) */}
                {keyPlaybackSpeed === 0.5 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setKeyPlaybackSpeed(0.95);
                      showGlobalToast('⚡ 기본 속도(1.0x)로 전환되었습니다');
                    }}
                    className="absolute -top-1.5 -right-2 px-1 py-0.2 bg-[#E07A5F] text-white text-[8px] font-bold rounded-full shadow-2xs cursor-pointer hover:bg-[#c96348] transition-colors leading-tight"
                    title="현재 0.5배속 (클릭 시 1.0x로 복귀)"
                  >
                    0.5x
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* 키프레이즈 문장 영역: 클릭 시 다요리 센세 1:1 과외 창 토글 */}
          <div
            role="button"
            tabIndex={0}
            onClick={handleToggleKeyTutor}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleToggleKeyTutor();
              }
            }}
            className="group cursor-pointer select-text transition-all rounded-xl -m-2 p-2 hover:bg-[#FAF0E6]/50 active:bg-[#FAF0E6] focus:outline-none"
            title="클릭하여 다요리 센세 1:1 해설 보기"
          >
            {/* 일본어 표기 (루비 지원 & 실시간 볼드 하이라이트) */}
            <h2 className="text-xl font-black text-[#2D3748] tracking-tight leading-snug mb-1.5 group-hover:text-[#E07A5F] transition-colors">
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
                  [{resolveHangulPronounce(
                    lesson.pronunciationKorean,
                    lesson.keyExpression.japanese,
                    lesson.keyExpression.reading
                  )}]
                </span>
              </div>
            )}

            <p className="text-sm font-bold text-[#2D3748]">
              {lesson.keyExpression.korean}
            </p>
          </div>
        </section>

        {/* 2. 실전 대화문 (Dialogue) */}
        <section className="space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#2D3748]">
              <MessageSquare className="w-4 h-4 text-[#E07A5F]" />
              <span>実践カンバセーション</span>
            </div>

            {lesson.dialogue && lesson.dialogue.length > 0 && (
              <div className="flex items-center gap-1.5 mr-3.5">
                <button
                  type="button"
                  onClick={() => setIsShortsModalOpen(true)}
                  className="p-1.5 rounded-lg border border-[#FCE4D8] bg-[#FFF6F1] text-[#E07A5F] hover:bg-[#FAF0E6] hover:border-[#E07A5F] hover:shadow-2xs transition-all flex items-center justify-center shrink-0"
                  title="대화 숏츠 영상으로 보기"
                  aria-label="대화 숏츠 영상으로 보기"
                >
                  <Video className="w-3.5 h-3.5 text-[#E07A5F]" />
                </button>

                <button
                  type="button"
                  onClick={handleTogglePlayAllDialogue}
                  className={`p-1.5 rounded-lg border transition-all flex items-center justify-center shrink-0 ${
                    isPlayingAllDialogue
                      ? 'bg-[#E07A5F] text-white border-[#E07A5F] shadow-2xs'
                      : 'bg-[#FFF6F1] text-[#E07A5F] border-[#FCE4D8] hover:bg-[#FAF0E6] hover:border-[#E07A5F]'
                  }`}
                  title={isPlayingAllDialogue ? '전체 대화 멈추기' : '전체 대화 연속 듣기'}
                  aria-label={isPlayingAllDialogue ? '전체 대화 멈추기' : '전체 대화 연속 듣기'}
                >
                  {isPlayingAllDialogue ? (
                    <Square className="w-3.5 h-3.5 fill-current" />
                  ) : (
                    <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                  )}
                </button>
              </div>
            )}
          </div>

          <div className="space-y-2">
            {lesson.dialogue.map((line, idx) => {
              const isPlayingLine = playingId === `line-${idx}`;
              const isLoadingLine = loadingId === `line-${idx}`;
              return (
                <div
                  key={idx}
                  className={`rounded-xl p-3.5 border transition-all flex items-start justify-between gap-3 ${
                    isPlayingLine
                      ? 'bg-[#FFFDF9] border-[#E07A5F] shadow-xs ring-2 ring-[#E07A5F]/20'
                      : 'bg-white border-[#EDE8E1] hover:border-[#E07A5F]/40'
                  }`}
                >
                  {/* 대화문 텍스트 영역: 클릭 시 다요리 센세 1:1 과외 바텀 시트 열기 */}
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => {
                      if (isPlayingAllDialogue) {
                        stopAllDialogue();
                      }
                      setActiveTutorSentence({
                        japanese: line.japanese,
                        korean: line.korean,
                        speaker: line.speaker,
                        pronunciation: resolveHangulPronounce(line.pronunciation, line.japanese),
                        breakdown:
                          line.breakdown ||
                          deriveBreakdownFromVocab(line.japanese, lesson.vocabulary),
                      });
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        if (isPlayingAllDialogue) stopAllDialogue();
                        setActiveTutorSentence({
                          japanese: line.japanese,
                          korean: line.korean,
                          speaker: line.speaker,
                          pronunciation: resolveHangulPronounce(line.pronunciation, line.japanese),
                          breakdown:
                            line.breakdown ||
                            deriveBreakdownFromVocab(line.japanese, lesson.vocabulary),
                        });
                      }
                    }}
                    className="space-y-1 min-w-0 flex-1 cursor-pointer select-text group/line -m-1 p-1 rounded-lg hover:bg-[#FAF0E6]/30 active:bg-[#FAF0E6]/50 transition-colors focus:outline-none"
                    title="클릭하여 다요리 센세 1:1 해설 보기"
                  >
                    <span className="text-[10px] font-bold text-gray-400 block">
                      {line.speaker}
                    </span>
                    <p className="text-xs font-semibold text-[#2D3748] leading-relaxed group-hover/line:text-[#E07A5F] transition-colors">
                      {renderRuby(line.japanese, `line-${idx}`, activeBoundary)}
                    </p>
                    {showPronounce && (
                      <p className="text-[11px] font-semibold text-[#E07A5F] leading-normal">
                         [{resolveHangulPronounce(line.pronunciation, line.japanese)}]
                      </p>
                    )}
                    <p className="text-[11px] text-gray-500 leading-normal">
                      {line.korean}
                    </p>
                  </div>

                  {/* 우측 발음 듣기 버튼 단독 배치 (반짝이 AI 버튼 제거됨) */}
                  <div className="flex items-center shrink-0 self-center">
                    <button
                      type="button"
                      onClick={() => handlePlay(line.japanese, `line-${idx}`)}
                      className={`p-1.5 rounded-lg border shrink-0 transition-colors cursor-pointer ${
                        isPlayingLine || isLoadingLine
                          ? 'bg-[#FAF0E6] text-[#E07A5F] border-[#E07A5F]'
                          : 'bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100'
                      }`}
                      title="발음 듣기"
                    >
                      {isLoadingLine ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-[#E07A5F]" />
                      ) : (
                        <Volume2 className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 3. 핵심 문법 포인트 (Grammar) */}
        <section className="bg-white rounded-2xl p-4 border border-[#EDE8E1] space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#2D3748]">
            <BookOpen className="w-4 h-4 text-[#2E7D32]" />
            <span>文法ポイント: {lesson.grammar.title.replace(/^유치원 꿀팁:\s*/, '')}</span>
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
              const isLoadingVocab = loadingId === `vocab-${vocabKey}`;
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
                      {isLoadingVocab ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-[#E07A5F]" />
                      ) : (
                        <Volume2 className="w-3.5 h-3.5" />
                      )}
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

      {/* 다요리 센세 1:1 과외 바텀 시트 모달 */}
      {activeTutorSentence && (
        <SentenceTutorDrawer
          key={`${lesson.id}-${activeTutorSentence.speaker}-${activeTutorSentence.japanese}`}
          sentence={activeTutorSentence}
          context={{
            level: effectiveLesson.level,
            themeTitle: effectiveLesson.themeTitle,
            unitTitle: effectiveLesson.unitTitle,
          }}
          onClose={() => setActiveTutorSentence(null)}
        />
      )}

      {/* 학습 완료 참 잘했어요 스탬프 보상 모달 */}
      <LessonCompletionStamp
        isOpen={showRewardStamp}
        onClose={() => {
          setShowRewardStamp(false);
          // 레벨 완주 후 확인을 눌렀을 경우, 여유로운 호흡(650ms)을 두고 비밀 편지 봉투 모달 깜짝 오픈
          if (pendingSecretEnvelopeLevel) {
            const nextLevel = pendingSecretEnvelopeLevel;
            setPendingSecretEnvelopeLevel(null);
            setTimeout(() => {
              setSecretEnvelopeLevel(nextLevel);
            }, 650);
          }
        }}
        lessonTitle={lesson.themeTitle || lesson.unitTitle}
      />

      {/* 레벨 완주 시 동봉된 비밀 편지 봉투 모달 */}
      {secretEnvelopeLevel && (
        <SecretEnvelopeModal
          isOpen={!!secretEnvelopeLevel}
          level={secretEnvelopeLevel}
          onClose={() => setSecretEnvelopeLevel(null)}
          onOpenTest={() => {
            const lvl = secretEnvelopeLevel;
            setSecretEnvelopeLevel(null);
            setActiveTestLevel(lvl);
          }}
        />
      )}

      {/* 회화 마스터 테스트 모달 */}
      {activeTestLevel && (
        <LevelTestModal
          isOpen={!!activeTestLevel}
          level={activeTestLevel}
          onClose={() => setActiveTestLevel(null)}
          onPassSuccess={() => {
            window.dispatchEvent(new CustomEvent('busan-lesson-completed-changed'));
          }}
        />
      )}

      {/* 상황별 대화 숏츠 모달 */}
      {isShortsModalOpen && (
        <ShortsModal
          isOpen={isShortsModalOpen}
          onClose={() => setIsShortsModalOpen(false)}
          lesson={effectiveLesson}
        />
      )}
    </div>
  );
}
