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
  ChevronLeft
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
    <div className="fixed inset-x-0 bottom-[calc(3.8rem+env(safe-area-inset-bottom,0px))] max-w-xl mx-auto px-3.5 z-40 pointer-events-none">
      <div className="pointer-events-auto bg-white/95 backdrop-blur-md rounded-3xl border border-[#EDE8E1] shadow-2xl p-4 sm:p-5 space-y-3.5 animate-in slide-in-from-bottom-4 duration-250">
        {/* 상단 화자 및 상태 헤더 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-[#E07A5F] shadow-xs shrink-0">
              <Image
                src={isUserTurn ? '/images/shorts/learner.jpg' : npc.avatarImage}
                alt={isUserTurn ? '나' : npc.name}
                fill
                sizes="40px"
                className="object-cover object-top"
              />
            </div>

            <div className="flex items-center gap-2">
              <span
                className={`px-3 py-1 rounded-full text-xs font-black shadow-2xs ${
                  isUserTurn
                    ? 'bg-[#E07A5F] text-white'
                    : 'bg-[#FFF6F1] text-[#E07A5F] border border-[#FCE4D8]'
                }`}
              >
                {isUserTurn ? '나 (여행자)' : `${npc.name} (${npc.role})`}
              </span>

              <span className="text-[11px] font-bold text-[#718096]">
                {activeLineIndex + 1} / {dialogue.length}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {isCompleted && (
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> 완료됨
              </span>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-full text-[#718096] hover:bg-black/5 active:scale-95 transition-all"
              title="대화 끝내기"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 대사 본문 (시원하고 직관적인 일본어 및 독음) */}
        <div className="py-1 space-y-1.5 min-h-[70px]">
          <p className="text-lg sm:text-xl font-black text-[#2D3748] tracking-tight leading-snug">
            {currentLine.japanese}
          </p>
          <p className="text-xs font-semibold text-[#E07A5F]">
            {currentLine.pronunciation}
          </p>
          <p className="text-xs text-[#4A5568]">
            {currentLine.korean}
          </p>
        </div>

        {/* 진행 도트 인디케이터 */}
        <div className="flex items-center gap-1.5">
          {dialogue.map((_, idx) => (
            <div
              key={idx}
              className={`h-1 rounded-full transition-all ${
                idx === activeLineIndex
                  ? 'w-6 bg-[#E07A5F]'
                  : completedLines.includes(idx)
                  ? 'w-2 bg-emerald-400'
                  : 'w-2 bg-[#EDE8E1]'
              }`}
            />
          ))}
        </div>

        {/* 하단 인터랙션 컨트롤 바 */}
        <div className="flex items-center gap-2 pt-1 border-t border-[#EDE8E1]">
          {/* 이전 버튼 (첫 대사가 아닐 때만) */}
          {activeLineIndex > 0 && (
            <button
              type="button"
              onClick={handlePrevLine}
              className="p-2.5 rounded-2xl bg-white border border-[#EDE8E1] text-[#718096] hover:bg-black/5 active:scale-95 transition-all"
              title="이전 대사"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}

          {/* 원어민 소리 듣기 */}
          <button
            type="button"
            onClick={() => handlePlayAudio(currentLine.japanese)}
            disabled={isPlayingAudio}
            className="flex-1 py-2.5 px-3 rounded-2xl bg-white border border-[#EDE8E1] text-xs font-bold text-[#2D3748] hover:bg-black/5 active:scale-95 transition-all flex items-center justify-center gap-1.5 shadow-2xs"
          >
            <Volume2 className="w-4 h-4 text-[#E07A5F]" />
            <span>{isPlayingAudio ? '재생 중...' : '소리 듣기'}</span>
          </button>

          {/* 사용자 턴일 때: 따라 말하기 버튼 */}
          {isUserTurn && (
            <button
              type="button"
              onClick={handlePracticeSpeech}
              disabled={isSpeakingMic}
              className="flex-1 py-2.5 px-3 rounded-2xl bg-[#FFF6F1] border border-[#FCE4D8] text-xs font-bold text-[#E07A5F] hover:bg-[#FAF0E6] active:scale-95 transition-all flex items-center justify-center gap-1.5 shadow-2xs"
            >
              <Mic className={`w-4 h-4 ${isSpeakingMic ? 'animate-pulse text-[#E07A5F]' : ''}`} />
              <span>{isSpeakingMic ? '체크 중...' : isLineDone ? '다시 말하기' : '따라 말하기'}</span>
            </button>
          )}

          {/* 다음 대화 넘기기 */}
          <button
            type="button"
            onClick={handleNextLine}
            className="flex-1 py-2.5 px-4 rounded-2xl bg-[#E07A5F] text-white text-xs font-bold hover:bg-[#D46B50] active:scale-95 transition-all flex items-center justify-center gap-1 shadow-xs"
          >
            <span>{isLastTurn ? '완료하기' : '다음'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
