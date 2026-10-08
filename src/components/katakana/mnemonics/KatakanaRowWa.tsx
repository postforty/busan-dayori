import React from 'react';
import { KatakanaMnemonicSvgChildProps } from './types';
import KatakanaCharOverlay from './KatakanaCharOverlay';

export default function KatakanaRowWa({ char, fontFamily }: KatakanaMnemonicSvgChildProps) {
  if (char === 'ワ') {
    // ワ: 와인잔 (네모 각진 볼과 얇은 스템 기둥을 지닌 와인잔)
    return (
      <svg viewBox="0 0 200 160" className="w-full h-full select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* 와인잔 바닥 받침 베이스 */}
        <ellipse cx="106" cy="140" rx="36" ry="7" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1.8" />

        {/* 얇은 와인잔 스템 기둥 */}
        <line x1="106" y1="104" x2="106" y2="140" stroke="#94A3B8" strokeWidth="4" strokeLinecap="round" />

        {/* 붉은 루비빛 레드 와인 액체 */}
        <path d="M 68 76 L 144 76 L 138 102 C 138 108 74 108 74 102 Z" fill="#BE123C" opacity="0.85" />
        <ellipse cx="106" cy="76" rx="38" ry="8" fill="#E11D48" />

        {/* 각진 와인잔 글라스 볼 (글자 ワ의 사각 꺾임과 하단 곡선 실루엣) */}
        <path
          d="M 60 48 L 152 48 L 144 104 C 144 116 68 116 68 104 Z"
          fill="#EFF6FF"
          stroke="#3B82F6"
          strokeWidth="2.5"
          strokeLinejoin="round"
          opacity="0.6"
        />

        {/* 글라스 측면 반사광 */}
        <path d="M 70 54 L 74 98" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />

        {/* 와인잔 짠! 건배 반짝임 */}
        <path d="M 154 42 L 156 34 L 158 42 L 166 44 L 158 46 L 156 54 L 154 46 L 146 44 Z" fill="#FDE047" />

        {/* 글자 'ワ' 오버레이 */}
        <KatakanaCharOverlay char="ワ" fontFamily={fontFamily} x="106" y="118" />
      </svg>
    );
  }

  if (char === 'ヲ') {
    // ヲ: 워터슬라이드 (워터파크의 지그재그 2단 레일과 시원하게 미끄러져 내려오는 튜브)
    return (
      <svg viewBox="0 0 200 160" className="w-full h-full select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* 풀장 수면 배경 */}
        <path d="M 10 134 C 40 130 80 136 120 132 C 160 128 190 132 200 130 L 200 160 L 0 160 Z" fill="#E0F2FE" />
        <path d="M 10 134 C 40 130 80 136 120 132 C 160 128 190 132 200 130" stroke="#0284C7" strokeWidth="2.5" />

        {/* 지그재그 2단 슬라이드 레일 (글자 ヲ의 2개 가로선과 대각선) */}
        {/* 1단 상단 레일 */}
        <rect x="58" y="44" width="94" height="10" rx="5" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2" />
        {/* 2단 중단 레일 */}
        <rect x="66" y="74" width="86" height="10" rx="5" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2" />

        {/* 급커브 하강 튜브 슬라이드 (글자 ヲ 하단 꺾임선) */}
        <path
          d="M 132 74 C 132 94 124 122 84 138"
          stroke="#0284C7"
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* 튜브 타고 미끄러지는 사람 */}
        <circle cx="100" cy="118" r="8" fill="#F97316" stroke="#EA580C" strokeWidth="1.5" />
        <circle cx="100" cy="118" r="4" fill="#FEF08A" />

        {/* 튀는 시원한 물보라 */}
        <circle cx="76" cy="132" r="2.5" fill="#38BDF8" />
        <circle cx="68" cy="138" r="2" fill="#60A5FA" />

        {/* 글자 'ヲ' 오버레이 */}
        <KatakanaCharOverlay char="ヲ" fontFamily={fontFamily} x="106" y="118" />
      </svg>
    );
  }

  if (char === 'ン') {
    // ン: 응차! (★ 핵심: 바닥에서 위로 번쩍 "응차!" 하고 힘차게 들어 올리는 궤적!)
    return (
      <svg viewBox="0 0 200 160" className="w-full h-full select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* 지면 그림자 */}
        <ellipse cx="106" cy="142" rx="54" ry="7" fill="#E2E8F0" />

        {/* 바닥에서 위로 치켜올려지는 힘찬 에너지 궤적 (글자 ン의 긴 획 - 아래에서 위로 솟구침) */}
        <path
          d="M 58 138 C 72 130 98 106 142 52 C 146 46 154 50 152 56 C 142 78 118 116 78 142 Z"
          fill="#F59E0B"
          stroke="#D97706"
          strokeWidth="2.5"
        />

        {/* 첫 번째 점: 힘을 주기 위해 바닥을 딛고 웅크린 점 (글자 ン 1획) */}
        <line x1="68" y1="78" x2="88" y2="98" stroke="#D97706" strokeWidth="6.5" strokeLinecap="round" />

        {/* 번쩍 들어 올린 황금빛 역기/바벨 (또는 보물상자) */}
        <g id="lifted-weight">
          <circle cx="146" cy="48" r="10" fill="#EF4444" stroke="#DC2626" strokeWidth="1.5" />
          <circle cx="146" cy="48" r="4" fill="#FFFFFF" opacity="0.6" />
        </g>

        {/* 파워 에너지 이펙트 (번쩍!) */}
        <path d="M 160 36 L 166 40 L 160 44 L 164 50" stroke="#F59E0B" strokeWidth="2" fill="none" strokeLinecap="round" />

        {/* ★ 방향성 안내 배지 (아래 ➔ 위) */}
        <g id="direction-hint" transform="translate(142, 94)">
          <rect x="0" y="0" width="46" height="18" rx="9" fill="#D97706" />
          <text x="23" y="13" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold">▲ 아래➔위</text>
        </g>

        {/* 글자 'ン' 오버레이 */}
        <KatakanaCharOverlay char="ン" fontFamily={fontFamily} x="106" y="118" />
      </svg>
    );
  }

  return null;
}
