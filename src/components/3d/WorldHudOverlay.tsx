'use client';

import React, { useState } from 'react';
import { WorldThemeLevel, WorldInteriorId } from './types';
import { WORLD_THEMES, WORLD_INTERIOR_LABELS } from './worldData';
import {
  Compass,
  ChevronDown,
  Volume2,
  VolumeX,
  RotateCcw,
  Sparkles,
  ArrowLeft,
  DoorOpen,
  X
} from 'lucide-react';
import Link from 'next/link';

interface WorldHudOverlayProps {
  currentLevel: WorldThemeLevel;
  activeInterior?: WorldInteriorId | null;
  onSelectLevel: (level: WorldThemeLevel) => void;
  onExitInterior?: () => void;
  onResetCamera: () => void;
  completedMissions: string[];
  totalNpcsCount: number;
  isDialogueActive?: boolean;
}

export default function WorldHudOverlay({
  currentLevel,
  activeInterior = null,
  onSelectLevel,
  onExitInterior,
  onResetCamera,
  completedMissions,
  totalNpcsCount,
  isDialogueActive = false
}: WorldHudOverlayProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [showControlsHint, setShowControlsHint] = useState(true);

  if (isDialogueActive) return null;

  const currentTheme = WORLD_THEMES[currentLevel];

  const levels: WorldThemeLevel[] = ['level0', 'level1', 'level2', 'level3'];

  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col p-2.5 sm:p-3.5 select-none z-30">
      {/* 드롭다운 외부 클릭 시 자동 닫힘 */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-30 pointer-events-auto"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      <div className="flex flex-col gap-2 w-full">
        {/* 1. 상단 바 (1줄 미니멀 HUD) */}
        <div className="flex items-center justify-between w-full pointer-events-auto relative z-40">
          {/* 좌측: 뒤로가기 & 룸 드롭다운 */}
          <div className="relative flex items-center gap-1.5">
            <Link
              href="/"
              className="min-w-8 min-h-8 p-2 rounded-full bg-white/85 backdrop-blur-md border border-[#EDE8E1] text-[#2D3748] hover:bg-white active:scale-95 transition-all shadow-xs flex items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E07A5F]"
              title="홈으로 돌아가기"
              aria-label="홈으로 돌아가기"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>

            {activeInterior ? (
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={onExitInterior}
                  className="px-3 py-1.5 min-h-8 rounded-full bg-[#E07A5F] text-white hover:bg-[#D46B50] active:scale-95 transition-all shadow-xs flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2D3748]"
                  title="야외 거리로 나가기"
                >
                  <DoorOpen className="w-3.5 h-3.5 shrink-0" />
                  <span className="text-xs font-bold whitespace-nowrap">밖으로</span>
                </button>
                <span className="px-3 py-1.5 min-h-8 rounded-full bg-white/85 backdrop-blur-md border border-[#EDE8E1] text-xs font-bold text-[#2D3748] shadow-xs flex items-center whitespace-nowrap">
                  {WORLD_INTERIOR_LABELS[activeInterior]}
                </span>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="px-3 py-1.5 min-h-8 rounded-full bg-white/85 backdrop-blur-md border border-[#EDE8E1] text-[#2D3748] hover:bg-white active:scale-95 transition-all shadow-xs flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E07A5F]"
                aria-expanded={isMenuOpen}
              >
                <Compass className="w-3.5 h-3.5 text-[#E07A5F] shrink-0" />
                <span className="text-xs font-bold text-[#2D3748] whitespace-nowrap">
                  {currentTheme.badge}
                </span>
                <ChevronDown className={`w-3.5 h-3.5 text-[#718096] transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
              </button>
            )}

            {/* 룸 전환 드롭다운 메뉴 */}
            {!activeInterior && isMenuOpen && (
              <div className="absolute top-full left-9 mt-1.5 w-40 bg-white/95 backdrop-blur-md rounded-2xl border border-[#EDE8E1] shadow-xl p-1.5 space-y-1 z-40 animate-in fade-in zoom-in-95 duration-150">
                {levels.map((lvl) => {
                  const theme = WORLD_THEMES[lvl];
                  const isSelected = lvl === currentLevel;
                  return (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => {
                        onSelectLevel(lvl);
                        setIsMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#FFF6F1] text-[#E07A5F] font-black border border-[#FCE4D8]'
                          : 'text-[#4A5568] hover:bg-black/5 font-medium'
                      }`}
                    >
                      <span className="font-bold">{theme.badge}</span>
                      {isSelected && <Sparkles className="w-3.5 h-3.5 text-[#E07A5F]" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* 우측: 통합 미니 캡슐 (진행도 + 사운드 + 시점 초기화) */}
          <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-white/85 backdrop-blur-md border border-[#EDE8E1] shadow-xs">
            <span
              className="px-2 text-[11px] font-bold text-[#718096] whitespace-nowrap"
              title={`완료된 대화 ${completedMissions.length}/${totalNpcsCount}`}
            >
              <span className="text-emerald-600 font-black">{completedMissions.length}</span>
              <span className="mx-0.5 text-[#A0AEC0]">/</span>
              <span>{totalNpcsCount}</span>
            </span>

            <div className="w-[1px] h-3.5 bg-[#EDE8E1]" />

            <button
              type="button"
              onClick={() => setIsAudioMuted(!isAudioMuted)}
              className="min-w-7 min-h-7 p-1.5 rounded-full text-[#718096] hover:text-[#2D3748] hover:bg-black/5 active:scale-95 transition-all flex items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E07A5F]"
              title="사운드 토글"
              aria-label="사운드 토글"
            >
              {isAudioMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>

            <button
              type="button"
              onClick={onResetCamera}
              className="min-w-7 min-h-7 p-1.5 rounded-full text-[#718096] hover:text-[#2D3748] hover:bg-black/5 active:scale-95 transition-all flex items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E07A5F]"
              title="시점 초기화"
              aria-label="시점 초기화"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 2. 상단 조작 안내 문구 (브라우저 화면에서만 표시, 클릭 시 숨김) */}
        {showControlsHint && (
          <div className="hidden sm:flex w-full justify-center">
            <button
              type="button"
              onClick={() => setShowControlsHint(false)}
              className="pointer-events-auto inline-flex items-center gap-1.5 min-h-6 px-3.5 py-1 rounded-full bg-black/45 hover:bg-black/60 backdrop-blur-xs text-[11px] text-white/95 font-medium tracking-tight shadow-xs cursor-pointer active:scale-95 transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E07A5F]"
              title="클릭하여 안내 닫기"
            >
              <span>키보드 WASD / 방향키 · 바닥 클릭으로 이동 · 마우스 드래그로 회전</span>
              <X className="w-3 h-3 text-white/80 shrink-0" aria-hidden="true" />
              <span className="sr-only">안내 닫기</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

