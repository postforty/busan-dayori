'use client';

import React, { useState, useEffect } from 'react';
import { WorldNpcData } from './types';
import { speakJapanese, stopJapaneseSpeech } from '@/utils/tts';
import { Volume2, X, CheckCircle2, Mic, Sparkles, MessageSquare } from 'lucide-react';
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

  useEffect(() => {
    setActiveLineIndex(0);
    setCompletedLines([]);
    return () => {
      stopJapaneseSpeech();
    };
  }, [npc]);

  if (!npc || !npc.lessonData) return null;

  const dialogue = npc.lessonData.dialogue || [];
  const currentLine = dialogue[activeLineIndex];

  const handlePlayAudio = (text: string) => {
    setIsPlayingAudio(true);
    speakJapanese(
      text,
      0.95,
      undefined,
      () => setIsPlayingAudio(false),
      undefined,
      activeLineIndex % 2 === 0 ? 'Puck' : 'Kore'
    );
  };

  const handlePracticeSpeech = () => {
    // 음성 발화 시뮬레이션 및 완료 처리
    setIsSpeakingMic(true);
    setTimeout(() => {
      setIsSpeakingMic(false);
      if (!completedLines.includes(activeLineIndex)) {
        const nextCompleted = [...completedLines, activeLineIndex];
        setCompletedLines(nextCompleted);
        showGlobalToast('잘하셨어요! 발음 연습 완료 🎉');

        // 모든 대화 연습 완료 시 미션 완료 처리
        if (nextCompleted.length === dialogue.length) {
          onCompleteMission(npc.id);
        }
      }
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl border border-[#EDE8E1] shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* 상단 헤더 */}
        <div className="px-5 py-3.5 bg-gradient-to-r from-[#FFF6F1] to-[#FAF0E6] border-b border-[#FCE4D8] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#E07A5F] text-white flex items-center justify-center font-bold text-sm shadow-xs">
              {npc.name.slice(0, 1)}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white/80 text-[#E07A5F] border border-[#FCE4D8]">
                  {npc.role}
                </span>
                <span className="text-sm font-bold text-[#2D3748]">{npc.name}</span>
              </div>
              <p className="text-[11px] text-[#718096] truncate max-w-[200px]">
                {npc.lessonData.themeTitle}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#718096] hover:bg-black/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 본문 대화 목록 */}
        <div className="p-4 overflow-y-auto space-y-3 flex-1">
          {dialogue.map((item, idx) => {
            const isActive = idx === activeLineIndex;
            const isDone = completedLines.includes(idx);

            return (
              <div
                key={idx}
                onClick={() => setActiveLineIndex(idx)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#FFF9F5] border-[#E07A5F] shadow-xs ring-1 ring-[#E07A5F]/20'
                    : 'bg-white border-[#EDE8E1] hover:border-[#F4DDD4]'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1 flex-1">
                    <span className="text-[11px] font-bold text-[#E07A5F]">
                      {item.speaker}
                    </span>
                    <p className="text-base font-bold text-[#2D3748] tracking-wide">
                      {item.japanese}
                    </p>
                    <p className="text-xs text-[#718096] font-medium">
                      {item.pronunciation}
                    </p>
                    <p className="text-xs text-[#4A5568]">
                      {item.korean}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 shrink-0 pt-1">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePlayAudio(item.japanese);
                      }}
                      className="p-2 rounded-xl bg-white border border-[#EDE8E1] text-[#E07A5F] hover:bg-[#FAF0E6] transition-all"
                      title="소리 듣기"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    {isDone && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 하단 인터랙션 컨트롤 바 */}
        <div className="p-4 bg-[#FAF0E6]/50 border-t border-[#EDE8E1] space-y-2">
          {currentLine && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handlePlayAudio(currentLine.japanese)}
                disabled={isPlayingAudio}
                className="flex-1 py-3 px-3 rounded-2xl bg-white border border-[#EDE8E1] text-xs font-bold text-[#2D3748] hover:bg-white/80 active:scale-95 transition-all flex items-center justify-center gap-1.5 shadow-2xs"
              >
                <Volume2 className="w-4 h-4 text-[#E07A5F]" />
                {isPlayingAudio ? '듣는 중...' : '원어민 소리 듣기'}
              </button>

              <button
                type="button"
                onClick={handlePracticeSpeech}
                disabled={isSpeakingMic}
                className="flex-1 py-3 px-3 rounded-2xl bg-[#E07A5F] text-white text-xs font-bold hover:bg-[#D46B50] active:scale-95 transition-all flex items-center justify-center gap-1.5 shadow-xs"
              >
                <Mic className={`w-4 h-4 ${isSpeakingMic ? 'animate-pulse text-yellow-200' : ''}`} />
                {isSpeakingMic ? '발음 체크 중...' : '따라 말하기'}
              </button>
            </div>
          )}

          {isCompleted && (
            <div className="text-center py-1 flex items-center justify-center gap-1.5 text-xs font-bold text-emerald-600">
              <Sparkles className="w-3.5 h-3.5" />
              이 장소의 대화 미션을 완료했습니다!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

