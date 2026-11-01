'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { DailyLesson, DialogueLine } from '@/types';
import { speakJapanese, stopJapaneseSpeech, TtsVoice } from '@/utils/tts';
import { parseRubySegments, getPronunciation } from '@/utils/japanesePronounce';
import {
  X,
  Play,
  Pause,
  Subtitles,
  Languages,
  CaptionsOff,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import ShortsBackground from './shorts/ShortsBackground';
import ShortsCharacter from './shorts/ShortsCharacter';
import { parseSpeakerText } from './shorts/speakerParser';
import { resolveShortsTheme } from './shorts/themeResolver';

interface ShortsModalProps {
  isOpen: boolean;
  onClose: () => void;
  lesson: DailyLesson;
}

export type SubtitleMode = 'all' | 'meaning' | 'none';

const SHORTS_SUBTITLE_STORAGE_KEY = 'shorts_subtitle_mode';

const getInitialSubtitleMode = (): SubtitleMode => {
  if (typeof window === 'undefined') return 'none';
  try {
    const saved = localStorage.getItem(SHORTS_SUBTITLE_STORAGE_KEY);
    if (saved === 'all' || saved === 'meaning' || saved === 'none') {
      return saved as SubtitleMode;
    }
  } catch {
    // 무시
  }
  return 'none';
};

export default function ShortsModal({ isOpen, onClose, lesson }: ShortsModalProps) {
  const dialogue: DialogueLine[] = useMemo(() => lesson?.dialogue || [], [lesson?.dialogue]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [activeCharIndex, setActiveCharIndex] = useState<number>(-1);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [subtitleMode, setSubtitleMode] = useState<SubtitleMode>(() => getInitialSubtitleMode());
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [isTurnTransitioning, setIsTurnTransitioning] = useState<boolean>(false);

  const sessionRef = useRef<number>(0);
  const playTurnRef = useRef<(index: number) => void>(() => {});
  const currentLine = dialogue[currentIndex];

  // 유닛의 상황에 맞는 4대 배경 테마 도출
  const shortsTheme = useMemo(() => resolveShortsTheme(lesson), [lesson]);

  // 전체 대화에서 상대방 화자와 나(학습자) 화자 결정
  const otherSpeakerRaw = useMemo(
    () => dialogue.find((d) => !d.speaker.includes('나') && !d.speaker.includes('손님'))?.speaker || '점원',
    [dialogue]
  );
  const learnerSpeakerRaw = useMemo(
    () => dialogue.find((d) => d.speaker.includes('나') || d.speaker.includes('손님'))?.speaker || '나',
    [dialogue]
  );

  const otherParsed = useMemo(() => parseSpeakerText(otherSpeakerRaw), [otherSpeakerRaw]);
  const learnerParsed = useMemo(() => parseSpeakerText(learnerSpeakerRaw), [learnerSpeakerRaw]);

  // 현재 라인의 화자가 '나/손님' 계열인지 여부
  const isLearnerTurn = Boolean(
    currentLine?.speaker.includes('나') || currentLine?.speaker.includes('손님')
  );

  // 현재 발화자의 지문/감정 파싱
  const currentParsed = useMemo(
    () => (currentLine ? parseSpeakerText(currentLine.speaker) : null),
    [currentLine]
  );

  // 음성 정지 및 상태 초기화
  const stopAll = useCallback(() => {
    sessionRef.current++;
    stopJapaneseSpeech();
    setIsSpeaking(false);
    setIsTurnTransitioning(false);
    setActiveCharIndex(-1);
  }, []);

  // 특정 대화 턴 재생 함수
  const playTurn = useCallback(
    (index: number) => {
      if (index >= dialogue.length) {
        setIsFinished(true);
        setIsPlaying(false);
        setIsTurnTransitioning(false);
        stopAll();
        return;
      }

      setIsFinished(false);
      setIsTurnTransitioning(false);
      setCurrentIndex(index);
      setIsPlaying(true);
      stopAll();

      const line = dialogue[index];
      if (!line) return;

      const currentSession = ++sessionRef.current;
      setIsSpeaking(true);

      // 화자 역할에 따른 듀얼 보이스 지정 (상대방 4대 캐릭터는 모두 여성 Kore 보이스 매핑)
      const speakerInfo = parseSpeakerText(line.speaker);
      const isFemaleSpeaker =
        speakerInfo.role === 'clerk' ||
        speakerInfo.role === 'auntie' ||
        speakerInfo.role === 'passerby' ||
        speakerInfo.role === 'friend';
      const voice: TtsVoice = isFemaleSpeaker ? 'Kore' : 'Puck';

      speakJapanese(
        line.japanese,
        playbackSpeed,
        () => {
          if (sessionRef.current !== currentSession) return;
          setIsSpeaking(true);
          setIsTurnTransitioning(false);
          setActiveCharIndex(0);
        },
        () => {
          if (sessionRef.current !== currentSession) return;
          setIsSpeaking(false);
          // 발화 종료 즉시 현재 프로그레스 바를 100%로 고정 (뒤로 후퇴 방지)
          setIsTurnTransitioning(true);
          setActiveCharIndex(-1);

          // 자연스러운 대화 호흡(500ms 딜레이) 동안 100% 상태를 유지한 후 다음 대사 이동
          setTimeout(() => {
            if (sessionRef.current === currentSession) {
              setIsTurnTransitioning(false);
              playTurnRef.current(index + 1);
            }
          }, 500);
        },
        (charIndex) => {
          if (sessionRef.current !== currentSession) return;
          setActiveCharIndex(charIndex);
        },
        voice
      );
    },
    [dialogue, playbackSpeed, stopAll]
  );

  // playTurnRef 항상 최신 함수로 유지
  useEffect(() => {
    playTurnRef.current = playTurn;
  }, [playTurn]);

  // 모달 오픈 시 첫 번째 문장 자동 재생
  useEffect(() => {
    if (!isOpen || dialogue.length === 0) return;

    const timer = setTimeout(() => {
      setCurrentIndex(0);
      setIsFinished(false);
      playTurnRef.current(0);
    }, 300);

    return () => {
      clearTimeout(timer);
      stopJapaneseSpeech();
    };
  }, [isOpen, dialogue.length]);

  if (!isOpen || dialogue.length === 0) return null;

  // 재생/일시정지 토글
  const handleTogglePlay = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (isFinished) {
      playTurn(0);
      return;
    }

    if (isPlaying) {
      stopAll();
      setIsPlaying(false);
    } else {
      playTurn(currentIndex);
    }
  };

  // 이전 문장 이동
  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (currentIndex > 0) {
      playTurn(currentIndex - 1);
    }
  };

  // 다음 문장 이동
  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (currentIndex < dialogue.length - 1) {
      playTurn(currentIndex + 1);
    } else {
      setIsFinished(true);
      setIsPlaying(false);
      stopAll();
    }
  };

  // 배속 전환 (1.0x ↔ 0.5x)
  const handleSpeedToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextSpeed = playbackSpeed === 1.0 ? 0.5 : 1.0;
    setPlaybackSpeed(nextSpeed);
  };

  // 자막 모드 3단계 순환 (전체 → 뜻만 → 숨김)
  const handleSubtitleModeCycle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSubtitleMode((prev) => {
      const next: SubtitleMode = prev === 'all' ? 'meaning' : prev === 'meaning' ? 'none' : 'all';
      try {
        localStorage.setItem(SHORTS_SUBTITLE_STORAGE_KEY, next);
      } catch {
        // 무시
      }
      return next;
    });
  };

  // 한글 독음
  const hangulPronounce = currentLine
    ? currentLine.pronunciation || getPronunciation(currentLine.japanese)
    : '';

  // 일본어 텍스트 길이에 따른 최적 폰트 크기 계산 (긴 문장의 화면 좌우 넘침 방지)
  const japaneseLength = currentLine?.japanese?.length || 0;
  const japaneseFontSize =
    japaneseLength > 22
      ? 'text-lg md:text-xl'
      : japaneseLength > 13
      ? 'text-xl md:text-2xl'
      : 'text-2xl md:text-3xl';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md transition-opacity">
      {/* 9:16 모바일 숏츠 뷰어 컨테이너 */}
      <div
        onClick={handleTogglePlay}
        className="relative w-full h-full max-w-[420px] max-h-[880px] md:h-[94vh] md:rounded-3xl overflow-hidden shadow-2xl bg-slate-950 flex flex-col justify-between cursor-pointer select-none border border-white/10"
      >
        {/* 상황별 배경 (Ken Burns 효과) */}
        <ShortsBackground isPlaying={isPlaying} theme={shortsTheme} />

        {/* ================= 1. 상단 인디케이터 & 헤더 ================= */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative z-20 pt-4 px-4 pb-2 bg-gradient-to-b from-black/80 to-transparent"
        >
          {/* 인스타그램 스토리 형태 진행 바 */}
          <div className="flex items-center gap-1.5 w-full">
            {dialogue.map((line, idx) => {
              // 1. 전체 완료되었거나, 이미 지난 턴이거나, 현재 턴 발화가 끝나고 다음 턴 대기 중일 때는 항상 100% 유지 (뒤로 후퇴 방지)
              const isTurnCompleted =
                isFinished || idx < currentIndex || (idx === currentIndex && isTurnTransitioning);
              const isCurrent = idx === currentIndex;

              let widthClass = 'w-0';
              let customStyle: React.CSSProperties | undefined = undefined;

              if (isTurnCompleted) {
                widthClass = 'w-full';
              } else if (isCurrent) {
                if (isSpeaking && activeCharIndex >= 0) {
                  // 글자 음성 싱크에 따른 실시간 단조 증가 진행률
                  const totalChars = Math.max(1, line.japanese.length);
                  const progressPct = Math.min(
                    100,
                    Math.max(10, Math.round(((activeCharIndex + 1) / totalChars) * 100))
                  );
                  customStyle = { width: `${progressPct}%` };
                } else if (isPlaying) {
                  // 소리 시작 직전 찰나의 로딩 순간에는 5%로 안정 대기 (33%로 튀지 않음)
                  customStyle = { width: '5%' };
                } else {
                  widthClass = 'w-0';
                }
              }

              return (
                <div
                  key={idx}
                  onClick={() => playTurn(idx)}
                  className="h-1.5 flex-1 rounded-full bg-white/30 overflow-hidden cursor-pointer"
                >
                  <div
                    style={customStyle}
                    className={`h-full bg-[#E07A5F] rounded-full transition-[width] duration-150 ease-out ${widthClass}`}
                  />
                </div>
              );
            })}
          </div>

          {/* Unit 제목 & 닫기 버튼 */}
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md bg-[#E07A5F] text-white text-[11px] font-black tracking-wide">
                SHORTS
              </span>
              <span className="text-xs font-bold text-white/90 truncate max-w-[220px]">
                {lesson.unitTitle || lesson.themeTitle}
              </span>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-full bg-black/40 text-white/90 hover:bg-black/70 hover:text-white transition-colors"
              aria-label="닫기"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ================= 2. 중앙 화자 및 비주얼 영역 ================= */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4">
          <div className="w-full flex items-center justify-around">
            {/* 대화 상황에 따라 두 캐릭터가 마주보는 구도 */}
            {/* 1) 상대방(점원/친구/행인) 캐릭터 */}
            <ShortsCharacter
              speaker={!isLearnerTurn && currentParsed ? currentParsed : otherParsed}
              isActive={!isLearnerTurn && !isFinished}
              isSpeaking={!isLearnerTurn && isSpeaking}
            />

            {/* 2) 나(학습자 / 손님 / 아이) 캐릭터 */}
            <ShortsCharacter
              speaker={isLearnerTurn && currentParsed ? currentParsed : learnerParsed}
              isActive={isLearnerTurn && !isFinished}
              isSpeaking={isLearnerTurn && isSpeaking}
            />
          </div>
        </div>

        {/* ================= 3. 하단 숏츠 대형 자막 및 컨트롤 ================= */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative z-20 pb-6 pt-3 px-5 bg-gradient-to-t from-black via-black/90 to-transparent flex flex-col gap-3"
        >
          {/* 숏츠 대형 자막 (현재 발음 중인 글자 하이라이트) */}
          {currentLine && (
            <div className="flex flex-col items-center text-center w-full px-2">
              {/* 1행: 일본어 원문 (루비 후리가나 및 글자별 싱크 하이라이트) */}
              <div
                className={`${japaneseFontSize} font-black tracking-normal text-white drop-shadow-md leading-relaxed w-full max-w-full break-words`}
              >
                {renderShortsRuby(currentLine.japanese, activeCharIndex)}
              </div>

              {/* 2행: 한글 발음 (소리 표기 - 'all' 모드에서만 표시) */}
              {subtitleMode === 'all' && hangulPronounce && (
                <div className="mt-1 text-xs md:text-sm font-bold text-[#F4A261] tracking-wide drop-shadow-sm transition-opacity duration-150 max-w-full break-keep-all">
                  [{hangulPronounce}]
                </div>
              )}

              {/* 3행: 한국어 뜻 ('all' 또는 'meaning' 모드에서 표시) */}
              {subtitleMode !== 'none' && (
                <div className="mt-1.5 text-xs md:text-sm font-semibold text-white/90 bg-white/10 backdrop-blur-xs px-3 py-1 rounded-full border border-white/15 transition-opacity duration-150 max-w-full break-keep-all">
                  &ldquo;{currentLine.korean}&rdquo;
                </div>
              )}
            </div>
          )}

          {/* 하단 제어 버튼 바 */}
          <div className="flex items-center justify-between pt-2 border-t border-white/15">
            {/* 좌측: 이전 / 다음 버튼 */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="p-2 rounded-full bg-white/10 text-white/80 hover:bg-white/20 disabled:opacity-30 disabled:pointer-events-none transition-all"
                title="이전 대화"
                aria-label="이전 대화"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={currentIndex >= dialogue.length - 1}
                className="p-2 rounded-full bg-white/10 text-white/80 hover:bg-white/20 disabled:opacity-30 disabled:pointer-events-none transition-all"
                title="다음 대화"
                aria-label="다음 대화"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* 중앙: 재생 / 일시정지 버튼 (완료 시에도 재생 아이콘 표시) */}
            <button
              type="button"
              onClick={handleTogglePlay}
              className="p-3 rounded-full bg-[#E07A5F] text-white shadow-lg hover:scale-105 active:scale-95 transition-transform"
              title={isPlaying ? '일시정지' : '재생'}
              aria-label={isPlaying ? '일시정지' : '재생'}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 fill-current" />
              ) : (
                <Play className="w-5 h-5 fill-current ml-0.5" />
              )}
            </button>

            {/* 우측: 배속 & 3단계 자막 모드 토글 (높이 h-7로 일치) */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleSpeedToggle}
                className={`h-7 px-2 flex items-center justify-center rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  playbackSpeed === 0.5
                    ? 'bg-[#E07A5F]/30 text-[#F4A261] border border-[#E07A5F]/50 shadow-2xs'
                    : 'bg-white/10 hover:bg-white/20 text-white border border-transparent'
                }`}
                title={playbackSpeed === 1.0 ? '0.5배속(느리게)으로 전환' : '1.0배속(기본)으로 전환'}
              >
                {playbackSpeed.toFixed(1)}x
              </button>

              {/* 자막 모드 3단계 동적 아이콘 버튼 (배속 버튼과 동일한 h-7 높이 및 rounded-lg 적용) */}
              <button
                type="button"
                onClick={handleSubtitleModeCycle}
                className={`h-7 w-7 flex items-center justify-center rounded-lg transition-all cursor-pointer ${
                  subtitleMode === 'all'
                    ? 'bg-[#E07A5F]/30 text-[#F4A261] border border-[#E07A5F]/60 shadow-2xs hover:bg-[#E07A5F]/40'
                    : subtitleMode === 'meaning'
                    ? 'bg-white/20 text-white border border-white/30 shadow-2xs hover:bg-white/30'
                    : 'bg-white/10 text-white/40 hover:bg-white/20 hover:text-white/70 border border-transparent'
                }`}
                title={
                  subtitleMode === 'all'
                    ? '자막: 전체 표시 (클릭 시 뜻만 표시)'
                    : subtitleMode === 'meaning'
                    ? '자막: 뜻만 표시 (클릭 시 모두 숨김)'
                    : '자막: 모두 숨김 (클릭 시 전체 표시)'
                }
                aria-label={
                  subtitleMode === 'all'
                    ? '자막 전체 표시'
                    : subtitleMode === 'meaning'
                    ? '자막 뜻만 표시'
                    : '자막 모두 숨김'
                }
              >
                {subtitleMode === 'all' ? (
                  <Subtitles className="w-4 h-4" />
                ) : subtitleMode === 'meaning' ? (
                  <Languages className="w-4 h-4" />
                ) : (
                  <CaptionsOff className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** 숏츠용 루비(후리가나) 및 실시간 글자 단위 하이라이트 렌더러 (자동 줄바꿈 및 화면 넘침 방지) */
function renderShortsRuby(text: string, activeCharIndex: number) {
  const segments = parseRubySegments(text);
  let currentOffset = 0;

  return (
    <span className="inline leading-relaxed break-words [word-break:break-word] text-center">
      {segments.map((seg, i) => {
        const segText = seg.text;
        const segStart = currentOffset;
        currentOffset += segText.length;

        if (seg.ruby) {
          return (
            <ruby
              key={i}
              className="[ruby-align:center] [ruby-position:over] transition-colors duration-100"
            >
              {seg.text.split('').map((ch, chIdx) => {
                const charGlobalIdx = segStart + chIdx;
                const isActive = charGlobalIdx === activeCharIndex;
                return (
                  <span
                    key={chIdx}
                    className={`transition-all duration-100 ${
                      isActive
                        ? 'text-[#FDE047] scale-110 drop-shadow-[0_0_8px_rgba(253,224,71,0.8)] inline-block'
                        : 'text-white'
                    }`}
                  >
                    {ch}
                  </span>
                );
              })}
              <rp>(</rp>
              <rt className="text-[10px] md:text-[11px] font-normal text-white/80 select-none leading-none text-center">
                {seg.ruby}
              </rt>
              <rp>)</rp>
            </ruby>
          );
        }

        return (
          <span key={i} className="inline">
            {seg.text.split('').map((ch, chIdx) => {
              const charGlobalIdx = segStart + chIdx;
              const isActive = charGlobalIdx === activeCharIndex;
              return (
                <span
                  key={chIdx}
                  className={`transition-all duration-100 ${
                    isActive
                      ? 'text-[#FDE047] scale-110 drop-shadow-[0_0_8px_rgba(253,224,71,0.8)] inline-block'
                      : 'text-white'
                  }`}
                >
                  {ch}
                </span>
              );
            })}
          </span>
        );
      })}
    </span>
  );
}
