import React from 'react';
import Image from 'next/image';
import { ParsedSpeaker } from './types';

interface ShortsCharacterProps {
  speaker: ParsedSpeaker;
  isActive: boolean;
  isSpeaking: boolean;
}

export default function ShortsCharacter({ speaker, isActive, isSpeaking }: ShortsCharacterProps) {
  const { role, emotion, displayName, subNote } = speaker;

  // 역할에 따른 지브리 수채화풍 이미지 에셋 매핑
  const imageSrc =
    role === 'clerk'
      ? '/images/shorts/clerk.jpg'
      : '/images/shorts/learner.jpg';

  return (
    <div
      className={`flex flex-col items-center transition-all duration-500 transform ${isActive
          ? 'scale-105 opacity-100 z-10'
          : 'scale-90 opacity-40 z-0 grayscale-[35%]'
        }`}
    >
      {/* 캐릭터 주변 음성 파동(Pulse) 링 (말하고 있을 때만 동작) */}
      <div className="relative flex items-center justify-center">
        {isActive && isSpeaking && (
          <>
            <span className="absolute -inset-3 rounded-full bg-[#E07A5F]/25 animate-ping" />
            <span className="absolute -inset-6 rounded-full bg-[#E07A5F]/15 animate-pulse" />
          </>
        )}

        {/* 캐릭터 메인 원형 일러스트 프레임 */}
        <div
          className={`relative w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden bg-slate-900 shadow-2xl border-4 transition-all duration-300 flex items-center justify-center ${isActive
              ? 'border-[#E07A5F] shadow-[#E07A5F]/40 ring-4 ring-[#E07A5F]/30 scale-100'
              : 'border-white/50 shadow-md'
            }`}
        >
          <Image
            src={imageSrc}
            alt={displayName}
            fill
            sizes="176px"
            className={`object-cover object-top transition-transform duration-500 ${isSpeaking ? 'scale-105' : 'scale-100'
              }`}
            priority
          />

          {/* 감정/리액션 플로팅 뱃지 */}
          {isActive && (
            <div className="absolute top-2 right-2 z-10 bg-white/95 rounded-full px-2 py-0.5 shadow-lg border border-[#F4DDD4] text-xs font-bold animate-bounce select-none">
              {emotion === 'giving' && '🎁'}
              {emotion === 'joy' && '✨'}
              {emotion === 'bowing' && '🙇'}
              {emotion === 'smile' && '😊'}
              {emotion === 'panicked' && '💦'}
              {emotion === 'grateful' && '🙏'}
              {emotion === 'default' && '💬'}
            </div>
          )}
        </div>
      </div>

      {/* 화자 이름 및 지문 태그 */}
      <div className="mt-3 flex flex-col items-center">
        <span
          className={`px-3 py-1 rounded-full text-xs font-bold transition-all shadow-md ${isActive
              ? 'bg-[#E07A5F] text-white shadow-[#E07A5F]/30 scale-105'
              : 'bg-black/50 text-white/80 backdrop-blur-xs'
            }`}
        >
          {displayName}
        </span>
        {subNote && (
          <span className="mt-1 text-[11px] font-medium text-white/95 bg-black/40 backdrop-blur-xs px-2.5 py-0.5 rounded-full border border-white/10 shadow-xs">
            {subNote}
          </span>
        )}
      </div>
    </div>
  );
}
