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
    // ウ: 우산 (활짝 펼쳐진 각진 우산 꼭지와 돔 지붕, J자 손잡이)
    return (
      <svg viewBox="0 0 200 160" className="w-full h-full select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* 하늘에서 떨어지는 경쾌한 빗방울 포인트 */}
        <ellipse cx="36" cy="46" rx="2" ry="4" fill="#60A5FA" opacity="0.65" transform="rotate(-15 36 46)" />
        <ellipse cx="172" cy="50" rx="2" ry="4" fill="#60A5FA" opacity="0.65" transform="rotate(-15 172 50)" />
        <ellipse cx="44" cy="120" rx="1.8" ry="3.5" fill="#93C5FD" opacity="0.55" transform="rotate(-10 44 120)" />
        <ellipse cx="164" cy="116" rx="2" ry="4" fill="#93C5FD" opacity="0.55" transform="rotate(-10 164 116)" />

        {/* 우산 꼭대기 팁/꼭지 (글자 점 획과 일치) */}
        <line x1="106" y1="16" x2="106" y2="34" stroke="#3D5A80" strokeWidth="3" strokeLinecap="round" />
        <circle cx="106" cy="15" r="3.5" fill="#3D5A80" />
        <ellipse cx="106" cy="34" rx="6" ry="2.5" fill="#64748B" />

        {/* 우산 돔 캐노피 천 (글자 ウ의 갓머리 지붕선과 매칭) */}
        <path
          d="M 52 84 C 58 44 106 34 106 34 C 106 34 154 44 160 84 C 144 78 126 80 106 76 C 86 80 68 78 52 84 Z"
          fill="#EBF3FB"
          stroke="#3D5A80"
          strokeWidth="2.4"
          strokeLinejoin="round"
        />

        {/* 우산 살대 라인 */}
        <path d="M 106 34 Q 80 56 52 84" stroke="#93C5FD" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="106" y1="34" x2="106" y2="76" stroke="#93C5FD" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M 106 34 Q 132 56 160 84" stroke="#93C5FD" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M 106 34 Q 93 54 80 81" stroke="#BFDBFE" strokeWidth="1.2" strokeDasharray="3 2" />
        <path d="M 106 34 Q 119 54 132 81" stroke="#BFDBFE" strokeWidth="1.2" strokeDasharray="3 2" />

        {/* 우산대 샤프트 */}
        <line x1="106" y1="76" x2="106" y2="128" stroke="#475569" strokeWidth="2.8" strokeLinecap="round" />

        {/* 우산 J자 곡선 손잡이 (글자 ウ의 삐침 곡선 흐름과 조화) */}
        <path
          d="M 106 126 C 106 142 86 144 78 134 C 70 124 80 114 88 116"
          stroke="#3D5A80"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="88" cy="116" r="2.5" fill="#F59E0B" />

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
