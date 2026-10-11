'use client';

import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useSoundManager } from '@/utils/soundManager';

interface SoundToggleButtonProps {
  variant?: 'header' | 'studio' | 'flashcard' | 'badge' | 'compact';
  theme?: 'coral' | 'slate';
  showLabel?: boolean;
  className?: string;
}

/**
 * Busan Dayori DESIGN.md 규격에 맞춘 전역/스튜디오 사운드 토글 버튼
 * - Warm Canvas & Dual-Script Theming (히라가나 Coral / 가타카나 Slate Navy) 완벽 지원
 * - 최소 터치 타깃 36px 확보 및 부드러운 스케일 축소 인터랙션 (active:scale-95)
 */
export default function SoundToggleButton({
  variant = 'header',
  theme = 'coral',
  showLabel = false,
  className = ''
}: SoundToggleButtonProps) {
  const { isSoundEnabled, isMuted, toggleSound, mounted } = useSoundManager();

  // SSR Hydration 불일치 방지용 기본 렌더
  const activeSound = mounted ? isSoundEnabled : true;
  const activeMuted = mounted ? isMuted : false;

  const tooltipText = activeSound
    ? '전체 소리 끄기 (현재 소리 켬)'
    : '전체 소리 켜기 (현재 음소거)';
  const ariaLabel = activeSound ? '소리 끄기' : '소리 켜기';

  // 1. 헤더용 원형 아이콘 버튼
  if (variant === 'header') {
    return (
      <button
        type="button"
        onClick={toggleSound}
        className={`p-2 rounded-full transition-all border active:scale-95 shrink-0 flex items-center justify-center cursor-pointer ${
          activeMuted
            ? 'bg-[#F7EBE5] text-[#C45B40] border-[#ECCDC2] shadow-2xs hover:bg-[#F2DDD3]'
            : 'bg-[#FAF9F7] text-[#718096] hover:text-[#E07A5F] hover:bg-[#FAF0E6] border-[#EDE8E1] hover:border-[#F4DDD4]'
        } ${className}`}
        title={tooltipText}
        aria-label={ariaLabel}
      >
        {activeMuted ? (
          <VolumeX className="w-4 h-4 text-[#C45B40]" />
        ) : (
          <Volume2 className="w-4 h-4 text-[#E07A5F]" />
        )}
      </button>
    );
  }

  // 2. 플래시카드 & 스튜디오 툴바용 컴팩트 버튼 (라벨 포함 가능)
  const isSlate = theme === 'slate';

  return (
    <button
      type="button"
      onClick={toggleSound}
      className={`px-2 py-1 sm:px-2.5 sm:py-1 rounded-xl text-[11px] sm:text-xs font-bold transition-all border flex items-center gap-1 active:scale-95 cursor-pointer shadow-2xs shrink-0 ${
        activeMuted
          ? 'bg-[#F7EBE5] text-[#C45B40] border-[#ECCDC2] hover:bg-[#F2DDD3]'
          : isSlate
          ? 'bg-[#EBF3FB] text-[#3D5A80] border-[#C5D9F2] hover:bg-[#DEEAF7]'
          : 'bg-[#FAF0E6] text-[#E07A5F] border-[#F4DDD4] hover:bg-[#F4E3D4]'
      } ${className}`}
      title={tooltipText}
      aria-label={ariaLabel}
    >
      {activeMuted ? (
        <VolumeX className="w-3.5 h-3.5 shrink-0 text-[#C45B40]" />
      ) : (
        <Volume2
          className={`w-3.5 h-3.5 shrink-0 ${
            isSlate ? 'text-[#3D5A80]' : 'text-[#E07A5F]'
          }`}
        />
      )}
      {(showLabel || variant === 'flashcard' || variant === 'studio') && (
        <span className="hidden sm:inline">
          {activeMuted ? '음소거' : '소리 켬'}
        </span>
      )}
    </button>
  );
}
