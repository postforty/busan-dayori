import React from 'react';
import { KatakanaMnemonicSvgChildProps } from './types';
import KatakanaCharOverlay from './KatakanaCharOverlay';

export default function KatakanaRowA({ char, fontFamily }: KatakanaMnemonicSvgChildProps) {
  if (char === 'ア') {
    // ア: 아이스크림 (각진 와플 콘의 모서리와 달콤한 스트로베리 스쿱)
    return (
      <svg viewBox="0 0 200 160" className="w-full h-full select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* 달콤한 아이스크림 스쿱 */}
        <circle cx="108" cy="46" r="26" fill="#FCE7F3" stroke="#F472B6" strokeWidth="2" />
        <ellipse cx="102" cy="40" rx="8" ry="4" fill="#FFFFFF" opacity="0.6" />
        <circle cx="118" cy="38" r="4.5" fill="#EF4444" /> {/* 체리 토핑 */}

        {/* 와플 콘 (가타카나 ア의 각진 모서리와 빗겨내려오는 획과 일치) */}
        <path
          d="M 68 56 L 148 56 L 102 142 Z"
          fill="#FEF3C7"
          stroke="#D97706"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {/* 콘 격자무늬 */}
        <line x1="80" y1="74" x2="134" y2="74" stroke="#FBBF24" strokeWidth="1.5" />
        <line x1="88" y1="96" x2="122" y2="96" stroke="#FBBF24" strokeWidth="1.5" />
        <line x1="96" y1="118" x2="110" y2="118" stroke="#FBBF24" strokeWidth="1.5" />

        {/* 글자 'ア' 오버레이 */}
        <KatakanaCharOverlay char="ア" fontFamily={fontFamily} x="106" y="118" />
      </svg>
    );
  }

  if (char === 'イ') {
    // イ: 이젤 (Easel - 화가의 나무 이젤과 꼿꼿한 삼각 다리)
    return (
      <svg viewBox="0 0 200 160" className="w-full h-full select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* 이젤 상단 조임 볼트 */}
        <circle cx="106" cy="24" r="5" fill="#78350F" />

        {/* 캔버스 액자 */}
        <rect x="74" y="44" width="68" height="52" rx="4" fill="#F8FAFC" stroke="#64748B" strokeWidth="2" />
        <path d="M 84 82 L 98 64 L 114 78 L 128 60 L 134 82 Z" fill="#E2E8F0" />
        <circle cx="92" cy="58" r="4" fill="#F59E0B" />

        {/* 이젤 다리 프레임 (가타카나 イ의 왼쪽 삐침과 곧은 세로획) */}
        <line x1="106" y1="26" x2="68" y2="140" stroke="#B45309" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="106" y1="26" x2="128" y2="140" stroke="#B45309" strokeWidth="3.5" strokeLinecap="round" />
        {/* 가로 받침목 */}
        <line x1="64" y1="98" x2="148" y2="98" stroke="#92400E" strokeWidth="3" strokeLinecap="round" />

        {/* 글자 'イ' 오버레이 */}
        <KatakanaCharOverlay char="イ" fontFamily={fontFamily} x="106" y="118" />
      </svg>
    );
  }

  if (char === 'ウ') {
    // ウ: 우주선 (우주선 상단 안테나 점과 돔 캡슐 본체)
    return (
      <svg viewBox="0 0 200 160" className="w-full h-full select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* 별빛 우주 배경 미니 포인트 */}
        <circle cx="48" cy="36" r="1.5" fill="#93C5FD" />
        <circle cx="160" cy="42" r="2" fill="#FDE047" />

        {/* 상단 안테나 (글자 점 획과 일치) */}
        <line x1="106" y1="20" x2="106" y2="38" stroke="#0284C7" strokeWidth="3" strokeLinecap="round" />
        <circle cx="106" cy="18" r="4" fill="#38BDF8" />

        {/* 우주선 돔 본체 (글자 ウ의 갓머리 지붕선과 매칭) */}
        <path
          d="M 64 68 C 64 48 148 48 148 68 L 142 126 C 142 134 70 134 70 126 Z"
          fill="#EFF6FF"
          stroke="#2563EB"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {/* 조종석 원형 창문 */}
        <circle cx="106" cy="80" r="15" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1.8" />
        <ellipse cx="103" cy="76" rx="4" ry="2" fill="#FFFFFF" />

        {/* 하단 추진 불꽃 */}
        <path d="M 88 134 L 106 152 L 124 134 Z" fill="#F97316" />

        {/* 글자 'ウ' 오버레이 */}
        <KatakanaCharOverlay char="ウ" fontFamily={fontFamily} x="106" y="118" />
      </svg>
    );
  }

  if (char === 'エ') {
    // エ: 엘리베이터 (철골 H-Beam 구조와 엘리베이터 문 프레임)
    return (
      <svg viewBox="0 0 200 160" className="w-full h-full select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* 엘리베이터 상단 층수 인디케이터 */}
        <rect x="88" y="24" width="36" height="14" rx="3" fill="#1E293B" />
        <text x="106" y="35" textAnchor="middle" fill="#22C55E" fontSize="10" fontWeight="bold">▲ 7F</text>

        {/* 엘리베이터 외곽 프레임 (상단 가로, 하단 가로, 중앙 기둥 = 글자 エ 형태) */}
        <rect x="56" y="44" width="100" height="96" rx="4" fill="#F1F5F9" stroke="#475569" strokeWidth="2.5" />

        {/* 문 틈새 및 손잡이 */}
        <line x1="106" y1="44" x2="106" y2="140" stroke="#94A3B8" strokeWidth="2" strokeDasharray="4 2" />
        <rect x="98" y="86" width="3" height="12" rx="1.5" fill="#64748B" />
        <rect x="111" y="86" width="3" height="12" rx="1.5" fill="#64748B" />

        {/* 위/아래 빔 라인 강조 */}
        <line x1="52" y1="44" x2="160" y2="44" stroke="#334155" strokeWidth="4" strokeLinecap="round" />
        <line x1="52" y1="140" x2="160" y2="140" stroke="#334155" strokeWidth="4" strokeLinecap="round" />

        {/* 글자 'エ' 오버레이 */}
        <KatakanaCharOverlay char="エ" fontFamily={fontFamily} x="106" y="118" />
      </svg>
    );
  }

  if (char === 'オ') {
    // オ: 오토바이 (라이더의 핸들과 뻗은 다리 포즈)
    return (
      <svg viewBox="0 0 200 160" className="w-full h-full select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* 도로 바닥 라인 */}
        <line x1="24" y1="140" x2="176" y2="140" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="8 5" />

        {/* 오토바이 앞뒤 바퀴 */}
        <circle cx="56" cy="120" r="18" fill="#1E293B" stroke="#475569" strokeWidth="2" />
        <circle cx="56" cy="120" r="8" fill="#94A3B8" />
        <circle cx="152" cy="120" r="18" fill="#1E293B" stroke="#475569" strokeWidth="2" />
        <circle cx="152" cy="120" r="8" fill="#94A3B8" />

        {/* 오토바이 프레임 및 핸들 (글자 オ의 가로선과 세로 기둥 일치) */}
        <path d="M 56 120 L 96 74 L 140 74 L 152 120 Z" fill="#FEE2E2" stroke="#DC2626" strokeWidth="2.5" />
        <line x1="126" y1="56" x2="148" y2="74" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" /> {/* 핸들 */}

        {/* 라이더 헬멧 */}
        <circle cx="94" cy="46" r="14" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2" />
        <path d="M 84 48 Q 98 44 104 50" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />

        {/* 스피드 라인 */}
        <line x1="32" y1="88" x2="62" y2="88" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />

        {/* 글자 'オ' 오버레이 */}
        <KatakanaCharOverlay char="オ" fontFamily={fontFamily} x="106" y="118" />
      </svg>
    );
  }

  return null;
}
