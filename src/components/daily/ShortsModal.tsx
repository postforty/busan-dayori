'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { DailyLesson, DialogueLine } from '@/types';
import { speakJapanese, stopJapaneseSpeech } from '@/utils/tts';
import { parseRubySegments, getPronunciation } from '@/utils/japanesePronounce';
import {
  X,
  Play,
  Pause,
  Eye,
  EyeOff,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import ShortsBackground from './shorts/ShortsBackground';
import ShortsCharacter from './shorts/ShortsCharacter';
import { parseSpeakerText } from './shorts/speakerParser';

interface ShortsModalProps {
  isOpen: boolean;
  onClose: () => void;
  lesson: DailyLesson;
}

export default function ShortsModal({ isOpen, onClose, lesson }: ShortsModalProps) {
  const dialogue: DialogueLine[] = useMemo(() => lesson?.dialogue || [], [lesson?.dialogue]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [activeCharIndex, setActiveCharIndex] = useState<number>(-1);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [showKoreanSubtitle, setShowKoreanSubtitle] = useState<boolean>(true);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const sessionRef = useRef<number>(0);
  const playTurnRef = useRef<(index: number) => void>(() => {});
  const currentLine = dialogue[currentIndex];

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
    setActiveCharIndex(-1);
  }, []);

  // 특정 대화 턴 재생 함수
  const playTurn = useCallback(
    (index: number) => {
      if (index >= dialogue.length) {
        setIsFinished(true);
        setIsPlaying(false);
        stopAll();
        return;
      }

      setIsFinished(false);
      setCurrentIndex(index);
      setIsPlaying(true);
      stopAll();

      const line = dialogue[index];
      if (!line) return;

      const currentSession = ++sessionRef.current;
      setIsSpeaking(true);

      speakJapanese(
        line.japanese,
        playbackSpeed,
        () => {
          if (sessionRef.current !== currentSession) return;
          setIsSpeaking(true);
          setActiveCharIndex(0);
        },
        () => {
          if (sessionRef.current !== currentSession) return;
          setIsSpeaking(false);
          setActiveCharIndex(-1);

          // 자연스러운 대화 호흡(500ms 딜레이) 후 다음 대사 자동 이동
          setTimeout(() => {
            if (sessionRef.current === currentSession) {
              playTurnRef.current(index + 1);
            }
          }, 500);
        },
        (charIndex) => {
          if (sessionRef.current !== currentSession) return;
          setActiveCharIndex(charIndex);
        }
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

  // 한글 독음
  const hangulPronounce = currentLine
    ? currentLine.pronunciation || getPronunciation(currentLine.japanese)
    : '';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md transition-opacity">
      {/* 9:16 모바일 숏츠 뷰어 컨테이너 */}
      <div
        onClick={handleTogglePlay}
        className="relative w-full h-full max-w-[420px] max-h-[880px] md:h-[94vh] md:rounded-3xl overflow-hidden shadow-2xl bg-slate-950 flex flex-col justify-between cursor-pointer select-none border border-white/10"
      >
        {/* 상황별 배경 (Ken Burns 효과) */}
        <ShortsBackground isPlaying={isPlaying} />

        {/* ================= 1. 상단 인디케이터 & 헤더 ================= */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative z-20 pt-4 px-4 pb-2 bg-gradient-to-b from-black/80 to-transparent"
        >
          {/* 인스타그램 스토리 형태 진행 바 */}
          <div className="flex items-center gap-1.5 w-full">
            {dialogue.map((line, idx) => {
              const isCompleted = isFinished || idx < currentIndex;
              const isCurrent = idx === currentIndex;

              let widthClass = 'w-0';
              let customStyle: React.CSSProperties | undefined = undefined;

              if (isCompleted) {
                widthClass = 'w-full';
              } else if (isCurrent) {
                if (isSpeaking && activeCharIndex >= 0) {
                  // 글자 음성 싱크에 따른 실시간 진행률
                  const totalChars = Math.max(1, line.japanese.length);
                  const progressPct = Math.min(
                    100,
                    Math.max(15, Math.round(((activeCharIndex + 1) / totalChars) * 100))
                  );
                  customStyle = { width: `${progressPct}%` };
                } else if (isPlaying) {
                  widthClass = 'w-1/3';
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
                    className={`h-full bg-[#E07A5F] rounded-full transition-all duration-150 ${widthClass}`}
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

          {/* 일시정지 상태 안내 오버레이 (완료 상태가 아닐 때만 은은하게 노출) */}
          {!isPlaying && !isFinished && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
              <div className="w-16 h-16 rounded-full bg-white/20 border border-white/40 flex items-center justify-center text-white backdrop-blur-md shadow-2xl">
                <Play className="w-8 h-8 fill-current ml-1 text-white" />
              </div>
            </div>
          )}
        </div>

        {/* ================= 3. 하단 숏츠 대형 자막 및 컨트롤 ================= */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative z-20 pb-6 pt-3 px-5 bg-gradient-to-t from-black via-black/90 to-transparent flex flex-col gap-3"
        >
          {/* 숏츠 대형 자막 (현재 발음 중인 글자 하이라이트) */}
          {currentLine && (
            <div className="flex flex-col items-center text-center">
              {/* 1행: 일본어 원문 (루비 후리가나 및 글자별 싱크 하이라이트) */}
              <div className="text-2xl md:text-3xl font-black tracking-wide text-white drop-shadow-md">
                {renderShortsRuby(currentLine.japanese, activeCharIndex)}
              </div>

              {/* 2행: 한글 발음 (소리 표기) */}
              {hangulPronounce && (
                <div className="mt-1 text-sm md:text-base font-bold text-[#F4A261] tracking-wider drop-shadow-sm">
                  [{hangulPronounce}]
                </div>
              )}

              {/* 3행: 한국어 뜻 (토글 가능) */}
              {showKoreanSubtitle && (
                <div className="mt-1.5 text-xs md:text-sm font-semibold text-white/90 bg-white/10 backdrop-blur-xs px-3 py-1 rounded-full border border-white/15">
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

            {/* 우측: 배속 & 한글 자막 토글 */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleSpeedToggle}
                className={`px-2 py-1 rounded-lg text-xs font-bold transition-all ${
                  playbackSpeed === 0.5
                    ? 'bg-[#E07A5F]/30 text-[#F4A261] border border-[#E07A5F]/50 shadow-2xs'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
                title={playbackSpeed === 1.0 ? '0.5배속(느리게)으로 전환' : '1.0배속(기본)으로 전환'}
              >
                {playbackSpeed.toFixed(1)}x
              </button>

              <button
                type="button"
                onClick={() => setShowKoreanSubtitle(!showKoreanSubtitle)}
                className={`p-2 rounded-full transition-all ${
                  showKoreanSubtitle
                    ? 'bg-white/10 text-white hover:bg-white/20'
                    : 'bg-[#E07A5F]/30 text-[#E07A5F] border border-[#E07A5F]'
                }`}
                title={showKoreanSubtitle ? '한글 해석 숨기기' : '한글 해석 보이기'}
                aria-label={showKoreanSubtitle ? '한글 해석 숨기기' : '한글 해석 보이기'}
              >
                {showKoreanSubtitle ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** 숏츠용 루비(후리가나) 및 실시간 글자 단위 하이라이트 렌더러 */
function renderShortsRuby(text: string, activeCharIndex: number) {
  const segments = parseRubySegments(text);
  let currentOffset = 0;

  return (
    <span className="inline-flex items-end flex-wrap justify-center gap-x-1">
      {segments.map((seg, i) => {
        const segText = seg.text;
        const segStart = currentOffset;
        currentOffset += segText.length;

        if (seg.ruby) {
          return (
            <ruby key={i} className="leading-tight">
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
              <rt className="text-[11px] font-normal text-white/70 select-none">{seg.ruby}</rt>
            </ruby>
          );
        }

        return (
          <span key={i} className="inline-flex">
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
