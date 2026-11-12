'use client';

import React, { useState } from 'react';
import { WorldThemeLevel, WorldNpcData } from './types';
import { WORLD_THEMES } from './worldData';
import {
  Compass,
  ChevronDown,
  Volume2,
  VolumeX,
  RotateCcw,
  Sparkles,
  MessageCircle,
  ArrowLeft,
  Smile,
  X
} from 'lucide-react';
import Link from 'next/link';

interface WorldHudOverlayProps {
  currentLevel: WorldThemeLevel;
  onSelectLevel: (level: WorldThemeLevel) => void;
  nearbyNpc: WorldNpcData | null;
  onOpenDialogue: (npc: WorldNpcData) => void;
  onTriggerBow: () => void;
  onResetCamera: () => void;
  completedMissions: string[];
  totalNpcsCount: number;
}

export default function WorldHudOverlay({
  currentLevel,
  onSelectLevel,
  nearbyNpc,
  onOpenDialogue,
  onTriggerBow,
  onResetCamera,
  completedMissions,
  totalNpcsCount
}: WorldHudOverlayProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [showControlsHint, setShowControlsHint] = useState(true);

  const currentTheme = WORLD_THEMES[currentLevel];

  const levels: WorldThemeLevel[] = ['level1', 'level2', 'level3'];

  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-3 sm:p-4 select-none z-30">
      <div className="flex flex-col gap-2.5 w-full">
        {/* 1. 상단 바 (산사 스타일 채널/룸 셀렉터) */}
        <div className="flex items-center justify-between w-full pointer-events-auto">
        {/* 좌측: 뒤로가기 & 룸 드롭다운 */}
        <div className="relative flex items-center gap-1.5">
          <Link
            href="/"
            className="p-2.5 rounded-2xl bg-white/90 backdrop-blur-md border border-[#EDE8E1] text-[#2D3748] hover:bg-white active:scale-95 transition-all shadow-xs"
            title="홈으로 돌아가기"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>

          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="px-3.5 py-2 rounded-2xl bg-white/90 backdrop-blur-md border border-[#EDE8E1] text-[#2D3748] hover:bg-white active:scale-95 transition-all shadow-xs flex items-center gap-2"
          >
            <Compass className="w-4 h-4 text-[#E07A5F]" />
            <div className="text-left">
              <span className="text-[10px] text-[#718096] font-bold block leading-none">
                3D 町歩き (마을 산책)
              </span>
              <span className="text-xs font-black text-[#2D3748]">
                {currentTheme.name}
              </span>
            </div>
            <ChevronDown className={`w-3.5 h-3.5 text-[#718096] transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* 룸 전환 드롭다운 메뉴 */}
          {isMenuOpen && (
            <div className="absolute top-full left-10 mt-2 w-56 bg-white/95 backdrop-blur-md rounded-2xl border border-[#EDE8E1] shadow-xl p-1.5 space-y-1 z-40 animate-in fade-in zoom-in-95 duration-150">
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
                    <div>
                      <span className="block font-bold">{theme.name}</span>
                      <span className="text-[10px] opacity-75">{theme.badge}</span>
                    </div>
                    {isSelected && <Sparkles className="w-3.5 h-3.5 text-[#E07A5F]" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* 우측: 미션 진행도 & 사운드/시점 리셋 */}
        <div className="flex items-center gap-1.5">
          <div className="px-3 py-1.5 rounded-2xl bg-white/90 backdrop-blur-md border border-[#EDE8E1] text-xs font-bold text-[#2D3748] shadow-xs flex items-center gap-1.5">
            <span className="text-emerald-500 font-black">
              {completedMissions.length}
            </span>
            <span className="text-[#A0AEC0]">/</span>
            <span className="text-[#718096]">{totalNpcsCount} 완료</span>
          </div>

          <button
            type="button"
            onClick={() => setIsAudioMuted(!isAudioMuted)}
            className="p-2.5 rounded-2xl bg-white/90 backdrop-blur-md border border-[#EDE8E1] text-[#718096] hover:text-[#2D3748] hover:bg-white active:scale-95 transition-all shadow-xs"
            title="사운드 토글"
          >
            {isAudioMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <button
            type="button"
            onClick={onResetCamera}
            className="p-2.5 rounded-2xl bg-white/90 backdrop-blur-md border border-[#EDE8E1] text-[#718096] hover:text-[#2D3748] hover:bg-white active:scale-95 transition-all shadow-xs"
            title="시점 초기화"
          >
            <RotateCcw className="w-4 h-4" />
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

      {/* 3. 하단 인터랙션 영역 */}
      <div className="w-full flex flex-col items-center gap-2.5 pb-2">
        {/* NPC 근접 시 상호작용 알림 버튼 */}
        {nearbyNpc && (
          <div className="pointer-events-auto animate-in slide-in-from-bottom-2 duration-200">
            <button
              type="button"
              onClick={() => onOpenDialogue(nearbyNpc)}
              className="px-5 py-3 rounded-2xl bg-[#E07A5F] text-white text-sm font-black shadow-lg hover:bg-[#D46B50] active:scale-95 transition-all flex items-center gap-2 ring-4 ring-[#E07A5F]/20"
            >
              <MessageCircle className="w-4 h-4" />
              <span>
                <kbd className="hidden sm:inline-block px-1.5 py-0.5 mr-1.5 bg-black/20 rounded-md text-[10px] font-mono">
                  E
                </kbd>
                {nearbyNpc.name}와 일본어 대화하기
              </span>
            </button>
          </div>
        )}

        {/* 하단 미니 액션 바 */}
        <div className="pointer-events-auto flex items-center gap-2 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-[#EDE8E1] shadow-md">
          <button
            type="button"
            onClick={onTriggerBow}
            className="px-3 py-1.5 rounded-xl text-xs font-bold text-[#2D3748] hover:bg-black/5 active:scale-95 transition-all flex items-center gap-1.5"
            title="인사하기 (Space)"
          >
            <Smile className="w-3.5 h-3.5 text-[#E07A5F]" />
            <span>인사 (お辞儀)</span>
            <kbd className="hidden sm:inline-block text-[10px] text-[#A0AEC0] font-mono ml-0.5">
              Space
            </kbd>
          </button>

          <div className="w-[1px] h-3 bg-[#EDE8E1]" />

          <button
            type="button"
            onClick={onResetCamera}
            className="px-3 py-1.5 rounded-xl text-xs font-bold text-[#718096] hover:bg-black/5 active:scale-95 transition-all flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>정면 보기</span>
          </button>
        </div>
      </div>
    </div>
  );
}

