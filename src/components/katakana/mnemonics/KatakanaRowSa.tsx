import React from 'react';
import { KatakanaMnemonicSvgChildProps } from './types';
import KatakanaCharOverlay from './KatakanaCharOverlay';

export default function KatakanaRowSa({ char, fontFamily }: KatakanaMnemonicSvgChildProps) {
  if (char === 'サ') {
    // サ: 선인장 (사막의 사보텐 - 가로 줄기와 솟아오른 두 가지)
    return (
      <svg viewBox="0 0 200 160" className="w-full h-full select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* 모래 언덕 배경 */}
        <ellipse cx="106" cy="142" rx="60" ry="10" fill="#FEF3C7" />

        {/* 선인장 화분 또는 흙 */}
        <path d="M 80 134 L 86 148 L 126 148 L 132 134 Z" fill="#D97706" />

        {/* 선인장 몸통 및 가지 (글자 サ의 가로선과 두 세로획) */}
        {/* 중앙 곧은 기둥 */}
        <rect x="98" y="44" width="16" height="92" rx="8" fill="#16A34A" stroke="#14532D" strokeWidth="2" />
        {/* 왼쪽 솟은 가지 */}
        <path d="M 72 68 L 72 84 L 98 84" stroke="#16A34A" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
        {/* 오른쪽 솟은 가지 */}
        <path d="M 140 68 L 140 84 L 114 84" stroke="#16A34A" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />

        {/* 노란 선인장 꽃 */}
        <circle cx="106" cy="38" r="6" fill="#FDE047" stroke="#CA8A04" strokeWidth="1.2" />

        {/* 글자 'サ' 오버레이 */}
        <KatakanaCharOverlay char="サ" fontFamily={fontFamily} x="106" y="118" />
      </svg>
    );
  }

  if (char === 'シ') {
    // シ: 시원한 파도 (★ 핵심: 아래에서 위로 시원하게 치솟는 파도 물보라!)
    return (
      <svg viewBox="0 0 200 160" className="w-full h-full select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* 깊은 바다 베이스 */}
        <path d="M 0 134 C 40 130 80 136 120 132 C 160 128 185 132 200 130 L 200 160 L 0 160 Z" fill="#E0F2FE" />

        {/* 아래에서 위로 치솟는 역동적인 파도 궤적 (글자 シ의 긴 획과 방향 일치) */}
        <path
          d="M 54 136 C 68 126 96 110 132 54 C 136 48 144 52 142 58 C 134 78 116 112 78 140 Z"
          fill="#38BDF8"
          stroke="#0284C7"
          strokeWidth="2"
        />
        {/* 파도 하얀 포말 거품 */}
        <circle cx="136" cy="50" r="5" fill="#FFFFFF" stroke="#0284C7" strokeWidth="1.5" />
        <circle cx="146" cy="60" r="3.5" fill="#FFFFFF" stroke="#0284C7" strokeWidth="1.2" />
        <circle cx="128" cy="42" r="3" fill="#BAE6FD" />

        {/* 파도 왼쪽의 튀는 두 물방울 (글자 シ의 왼쪽 두 점과 일치) */}
        <ellipse cx="64" cy="68" rx="4" ry="5" fill="#0284C7" />
        <ellipse cx="74" cy="94" rx="4.5" ry="5.5" fill="#0284C7" />

        {/* ★ 방향성 안내 배지 (아래 ➔ 위) */}
        <g id="direction-hint" transform="translate(142, 92)">
          <rect x="0" y="0" width="46" height="18" rx="9" fill="#0284C7" />
          <text x="23" y="13" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold">▲ 아래➔위</text>
        </g>

        {/* 글자 'シ' 오버레이 */}
        <KatakanaCharOverlay char="シ" fontFamily={fontFamily} x="106" y="118" />
      </svg>
    );
  }

  if (char === 'ス') {
    // ス: 스케이트 (빙판을 질주하는 날렵한 피겨 스케이트 날)
    return (
      <svg viewBox="0 0 200 160" className="w-full h-full select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* 빙판 바닥 & 반사광 */}
        <line x1="20" y1="138" x2="180" y2="138" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" />
        <path d="M 40 144 L 160 144" stroke="#E0F2FE" strokeWidth="3" strokeDasharray="12 6" />

        {/* 스케이트 부츠 (하얀 부츠와 끈) */}
        <path
          d="M 64 62 L 96 62 L 96 88 L 138 98 L 138 116 L 64 116 Z"
          fill="#FFFFFF"
          stroke="#475569"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {/* 빨간 부츠 끈 */}
        <line x1="72" y1="74" x2="88" y2="74" stroke="#EF4444" strokeWidth="2" />
        <line x1="72" y1="84" x2="88" y2="84" stroke="#EF4444" strokeWidth="2" />

        {/* 스케이트 금속 날 (글자 ス의 꺾임과 하단 뻗은 획) */}
        <path
          d="M 52 136 L 152 136 C 158 136 162 130 160 124 L 152 124 L 146 132 L 60 132 L 54 126 Z"
          fill="#94A3B8"
          stroke="#334155"
          strokeWidth="1.8"
        />

        {/* 얼음 파편 스파크 */}
        <circle cx="156" cy="116" r="2" fill="#38BDF8" />
        <circle cx="166" cy="122" r="1.5" fill="#38BDF8" />

        {/* 글자 'ス' 오버레이 */}
        <KatakanaCharOverlay char="ス" fontFamily={fontFamily} x="106" y="118" />
      </svg>
    );
  }

  if (char === 'セ') {
    // セ: 세면대 (히라가나 せ가 직선화된 동일 형태 - 세면대 수조와 수도꼭지 재활용)
    return (
      <svg viewBox="0 0 200 160" className="w-full h-full select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* 벽면 타일 배경 */}
        <line x1="30" y1="40" x2="170" y2="40" stroke="#E2E8F0" strokeWidth="1" />
        <line x1="30" y1="70" x2="170" y2="70" stroke="#E2E8F0" strokeWidth="1" />

        {/* 세면대 도기 수조 (글자 セ의 가로 프레임과 바닥 꺾임) */}
        <rect x="48" y="68" width="104" height="60" rx="12" fill="#F8FAFC" stroke="#64748B" strokeWidth="2.2" />
        <ellipse cx="100" cy="98" rx="38" ry="16" fill="#EFF6FF" stroke="#93C5FD" strokeWidth="1.5" />

        {/* 금속 수도꼭지 (글자 セ 왼쪽 세로 기둥과 일치) */}
        <path d="M 68 68 L 68 46 C 68 38 84 38 84 46 L 84 54" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
        {/* 꼭지 레버 */}
        <line x1="62" y1="46" x2="74" y2="46" stroke="#0284C7" strokeWidth="3" strokeLinecap="round" />

        {/* 떨어지는 물방울 */}
        <circle cx="84" cy="62" r="2.5" fill="#38BDF8" />
        <ellipse cx="100" cy="98" rx="8" ry="4" fill="#38BDF8" opacity="0.6" />

        {/* 글자 'セ' 오버레이 */}
        <KatakanaCharOverlay char="セ" fontFamily={fontFamily} x="106" y="118" />
      </svg>
    );
  }

  if (char === 'ソ') {
    // ソ: 소나기 (★ 핵심: 하늘에서 아래로 내리꽂히는 소나기 빗줄기!)
    return (
      <svg viewBox="0 0 200 160" className="w-full h-full select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* 먹구름 본체 */}
        <path
          d="M 60 46 C 50 46 44 56 50 64 C 44 72 52 82 64 82 L 148 82 C 160 82 166 70 158 62 C 162 52 152 42 140 44 C 134 34 116 34 108 42 C 100 36 84 36 76 44 Z"
          fill="#CBD5E1"
          stroke="#64748B"
          strokeWidth="2"
        />

        {/* 위에서 아래로 세차게 내리꽂히는 메인 소나기 줄기 (글자 ソ의 긴 획) */}
        <line x1="134" y1="52" x2="82" y2="136" stroke="#0284C7" strokeWidth="6" strokeLinecap="round" />
        {/* 왼쪽 짧은 빗방울 점 (글자 ソ의 첫 점) */}
        <line x1="86" y1="58" x2="98" y2="78" stroke="#0284C7" strokeWidth="5.5" strokeLinecap="round" />

        {/* 주변 보조 빗줄기 */}
        <line x1="62" y1="94" x2="52" y2="124" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" strokeDasharray="6 4" />
        <line x1="154" y1="92" x2="144" y2="126" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" strokeDasharray="6 4" />

        {/* ★ 방향성 안내 배지 (위 ➔ 아래) */}
        <g id="direction-hint" transform="translate(14, 96)">
          <rect x="0" y="0" width="46" height="18" rx="9" fill="#0284C7" />
          <text x="23" y="13" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold">▼ 위➔아래</text>
        </g>

        {/* 글자 'ソ' 오버레이 */}
        <KatakanaCharOverlay char="ソ" fontFamily={fontFamily} x="106" y="118" />
      </svg>
    );
  }

  return null;
}
