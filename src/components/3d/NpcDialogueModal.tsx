'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { WorldNpcData } from './types';
import { speakJapanese, stopJapaneseSpeech } from '@/utils/tts';
import {
  Volume2,
  X,
  Mic,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Check
} from 'lucide-react';
import { showGlobalToast } from '@/utils/toast';

interface NpcDialogueModalProps {
  npc: WorldNpcData | null;
  onClose: () => void;
  onCompleteMission: (npcId: string) => void;
  isCompleted?: boolean;
}

export default function NpcDialogueModal({
  npc,
  onClose,
  onCompleteMission,
  isCompleted = false
}: NpcDialogueModalProps) {
  const [activeLineIndex, setActiveLineIndex] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isSpeakingMic, setIsSpeakingMic] = useState(false);
  const [completedLines, setCompletedLines] = useState<number[]>([]);
  const lastSpokenIndexRef = useRef<number>(-1);

  const dialogue = npc?.lessonData?.dialogue || [];
  const currentLine = dialogue[activeLineIndex];
  const isUserTurn = currentLine?.speaker.includes('나') || currentLine?.speaker.includes('아이') || currentLine?.speaker.includes('손님');

  // 대화 시작 시 초기화
  useEffect(() => {
    setActiveLineIndex(0);
    setCompletedLines([]);
    lastSpokenIndexRef.current = -1;
    return () => {
      stopJapaneseSpeech();
    };
  }, [npc]);

  // 턴 전환 시 상대방(NPC) 차례면 자동 TTS 음성 재생
  useEffect(() => {
    if (!npc || !currentLine) return;

    if (!isUserTurn && lastSpokenIndexRef.current !== activeLineIndex) {
      lastSpokenIndexRef.current = activeLineIndex;
      const timer = setTimeout(() => {
        handlePlayAudio(currentLine.japanese);
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [activeLineIndex, npc, isUserTurn, currentLine]);

  // 키보드 Space / Enter / 화살표 키로 다음 대화 넘기기
  useEffect(() => {
    if (!npc) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        handleNextLine();
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        handleNextLine();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        handlePrevLine();
      } else if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLineIndex, dialogue.length, npc]);

  if (!npc || !npc.lessonData || !currentLine) return null;

  const handlePlayAudio = (text: string) => {
    setIsPlayingAudio(true);
    speakJapanese(
      text,
      0.95,
      undefined,
      () => setIsPlayingAudio(false),
      undefined,
      isUserTurn ? 'Puck' : 'Kore'
    );
  };

  const handlePracticeSpeech = () => {
    setIsSpeakingMic(true);
    setTimeout(() => {
      setIsSpeakingMic(false);
      if (!completedLines.includes(activeLineIndex)) {
        const nextCompleted = [...completedLines, activeLineIndex];
        setCompletedLines(nextCompleted);
        showGlobalToast('훌륭해요! 발음 완료 👏');

        if (nextCompleted.length === dialogue.length) {
          onCompleteMission(npc.id);
        }
      }
    }, 1200);
  };

  const handleNextLine = () => {
    if (activeLineIndex < dialogue.length - 1) {
      setActiveLineIndex((prev) => prev + 1);
    } else {
      // 마지막 대화 완료
      onCompleteMission(npc.id);
      showGlobalToast('축하합니다! 대화 미션을 완료했습니다 🎉');
      onClose();
    }
  };

  const handlePrevLine = () => {
    if (activeLineIndex > 0) {
      setActiveLineIndex((prev) => prev - 1);
    }
  };

  const isLineDone = completedLines.includes(activeLineIndex);
  const isLastTurn = activeLineIndex === dialogue.length - 1;

  return (
    <div className="fixed inset-x-0 bottom-[calc(3.75rem+env(safe-area-inset-bottom,0px))] max-w-xl mx-auto px-3 z-40 pointer-events-none">
      <div className="pointer-events-auto bg-white/85 backdrop-blur-md rounded-2xl border border-[#EDE8E1]/90 shadow-xl px-3.5 py-2.5 space-y-2 animate-in slide-in-from-bottom-4 duration-250">
        {/* 상단 화자 및 상태 헤더 (1줄 컴팩트) */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className="relative w-7 h-7 rounded-full overflow-hidden border border-[#E07A5F] shadow-2xs shrink-0">
              <Image
                src={isUserTurn ? '/images/shorts/learner.jpg' : npc.avatarImage}
                alt={isUserTurn ? '나' : npc.name}
                fill
                sizes="28px"
                className="object-cover object-top"
              />
            </div>

            <span
              className={`px-2 py-0.5 rounded-full text-[11px] font-extrabold truncate ${
                isUserTurn
                  ? 'bg-[#E07A5F] text-white'
                  : 'bg-[#FFF6F1] text-[#E07A5F] border border-[#FCE4D8]'
              }`}
            >
              {isUserTurn ? '나 (여행자)' : npc.name}
            </span>

            <span className="text-[11px] font-bold text-[#718096] shrink-0">
              {activeLineIndex + 1}/{dialogue.length}
            </span>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            {isCompleted && (
              <span className="px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold flex items-center gap-0.5">
                <Sparkles className="w-2.5 h-2.5" /> 완료
              </span>
            )}
            <button
              type="button"
              onClick={onClose}
              className="min-w-7 min-h-7 p-1 rounded-full text-[#718096] hover:bg-black/5 active:scale-95 transition-all flex items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E07A5F]"
              title="대화 끝내기"
              aria-label="대화 끝내기"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 대사 본문 (컴팩트) */}
        <div className="space-y-0.5">
          <p className="text-base sm:text-lg font-black text-[#2D3748] tracking-tight leading-snug">
            {currentLine.japanese}
          </p>
          <p className="text-[11px] font-semibold text-[#E07A5F] leading-tight">
            {currentLine.pronunciation}
          </p>
          <p className="text-[11px] text-[#4A5568] leading-tight">
            {currentLine.korean}
          </p>
        </div>

        {/* 하단 인터랙션 컨트롤 바 (아이콘 전용 미니멀) */}
        <div className="flex items-center justify-between gap-2 pt-0.5">
          <div className="flex items-center gap-1.5">
            {/* 원어민 소리 듣기 */}
            <button
              type="button"
              onClick={() => handlePlayAudio(currentLine.japanese)}
              disabled={isPlayingAudio}
              className="min-w-9 min-h-8 px-2.5 py-1.5 rounded-xl bg-white/90 border border-[#EDE8E1] text-[#E07A5F] hover:bg-white active:scale-95 transition-all flex items-center justify-center shadow-2xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E07A5F]"
              title={isPlayingAudio ? '재생 중' : '소리 듣기'}
              aria-label={isPlayingAudio ? '재생 중' : '소리 듣기'}
            >
              <Volume2
                className={`w-4 h-4 ${isPlayingAudio ? 'animate-pulse' : ''}`}
                aria-hidden="true"
              />
            </button>

            {/* 사용자 턴일 때: 따라 말하기 버튼 */}
            {isUserTurn && (
              <button
                type="button"
                onClick={handlePracticeSpeech}
                disabled={isSpeakingMic}
                className={`min-w-9 min-h-8 px-2.5 py-1.5 rounded-xl border active:scale-95 transition-all flex items-center justify-center shadow-2xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E07A5F] ${
                  isLineDone
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-600 hover:bg-emerald-100/70'
                    : 'bg-[#FFF6F1] border-[#FCE4D8] text-[#E07A5F] hover:bg-[#FAF0E6]'
                }`}
                title={isSpeakingMic ? '체크 중' : isLineDone ? '다시 말하기' : '따라 말하기'}
                aria-label={isSpeakingMic ? '체크 중' : isLineDone ? '다시 말하기' : '따라 말하기'}
              >
                <Mic
                  className={`w-4 h-4 ${isSpeakingMic ? 'animate-pulse' : ''}`}
                  aria-hidden="true"
                />
              </button>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            {/* 이전 버튼 (첫 대사가 아닐 때만) */}
            {activeLineIndex > 0 && (
              <button
                type="button"
                onClick={handlePrevLine}
                className="min-w-9 min-h-8 px-2.5 py-1.5 rounded-xl bg-white/90 border border-[#EDE8E1] text-[#718096] hover:bg-white active:scale-95 transition-all flex items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E07A5F]"
                title="이전 대사"
                aria-label="이전 대사"
              >
                <ChevronLeft className="w-4 h-4" aria-hidden="true" />
              </button>
            )}

            {/* 다음 / 완료 버튼 */}
            <button
              type="button"
              onClick={handleNextLine}
              className="min-w-10 min-h-8 px-3 py-1.5 rounded-xl bg-[#E07A5F] text-white hover:bg-[#D46B50] active:scale-95 transition-all flex items-center justify-center shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2D3748]"
              title={isLastTurn ? '완료하기' : '다음'}
              aria-label={isLastTurn ? '완료하기' : '다음'}
            >
              {isLastTurn ? (
                <Check className="w-4 h-4" aria-hidden="true" />
              ) : (
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
