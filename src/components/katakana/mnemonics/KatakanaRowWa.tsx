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
    // ヲ: 오리 (글자에 가려지지 않도록 대폭 확대한 큼직한 오리: 꽥 벌린 윗부리[1획], 아랫부리[2획 가로], 풍성한 목·가슴[2획 삐침])
    return (
      <svg viewBox="0 0 200 160" className="w-full h-full select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* 오리 깃털 그라데이션 */}
          <linearGradient id="duck-body-grad" x1="100" y1="20" x2="180" y2="140" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FEF9C3" />
            <stop offset="40%" stopColor="#FEF08A" />
            <stop offset="100%" stopColor="#FDE047" />
          </linearGradient>
          {/* 부리 그라데이션 */}
          <linearGradient id="duck-beak-grad" x1="20" y1="35" x2="140" y2="95" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FB923C" />
            <stop offset="100%" stopColor="#EA580C" />
          </linearGradient>
        </defs>

        {/* 1. 호수 수면 및 찰랑이는 물결 배경 */}
        <path d="M 0 134 C 40 131 90 137 140 133 C 170 130 190 134 200 133 L 200 160 L 0 160 Z" fill="#E0F2FE" />
        <path d="M 0 134 C 40 131 90 137 140 133 C 170 130 190 134 200 133" stroke="#38BDF8" strokeWidth="2.5" />
        <ellipse cx="120" cy="138" rx="66" ry="8" fill="#BAE6FD" opacity="0.6" />
        <circle cx="50" cy="136" r="3" fill="#38BDF8" />
        <circle cx="42" cy="142" r="2" fill="#60A5FA" />

        {/* 2. 대형 오리 몸통 & 꼬리 & 날개 (우하단에 꽉 차게 풍성한 실루엣) */}
        {/* 하단 둥근 몸통 베이스 */}
        <path
          d="M 90 125 C 100 110 120 102 155 104 C 178 105 192 110 190 120 C 188 126 178 136 150 138 C 118 140 85 138 72 134 C 74 130 84 128 90 125 Z"
          fill="url(#duck-body-grad)"
          stroke="#EAB308"
          strokeWidth="2.5"
        />
        {/* 쫑긋 솟은 귀여운 꼬리 깃털 */}
        <path
          d="M 180 112 C 194 104 196 114 186 124"
          stroke="#EAB308"
          strokeWidth="2.2"
          fill="#FDE047"
          strokeLinecap="round"
        />
        {/* 큼직하고 둥근 날개 */}
        <path
          d="M 125 110 C 150 106 170 114 166 128 C 155 135 132 134 122 122 C 120 116 122 112 125 110 Z"
          fill="#FACC15"
          stroke="#CA8A04"
          strokeWidth="2"
        />
        <path d="M 140 118 C 152 118 160 124 156 128" stroke="#CA8A04" strokeWidth="1.5" strokeLinecap="round" />

        {/* 3. 큼직한 오리 머리 & 뒤통수 (위/오른쪽으로 시원하게 솟은 대형 헤드) */}
        <path
          d="M 130 38 C 145 20 174 20 182 44 C 188 64 184 86 166 98 C 154 106 138 106 128 100"
          fill="url(#duck-body-grad)"
          stroke="#EAB308"
          strokeWidth="2.5"
        />
        {/* 머리 위 귀여운 깃털 볏 2단 */}
        <path
          d="M 148 24 C 146 10 160 12 156 22 C 162 12 172 16 166 26"
          stroke="#EAB308"
          strokeWidth="2"
          fill="#FEF08A"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 4. 포동포동한 오리 가슴 & 목 (글자 ヲ 삐침선 좌하단으로 시원하게 노출) */}
        <path
          d="M 132 86 C 130 106 112 126 66 135 C 56 132 54 122 66 114 C 82 100 106 90 132 86 Z"
          fill="url(#duck-body-grad)"
          stroke="#EAB308"
          strokeWidth="2.5"
        />
        {/* 가슴 안쪽 결 하이라이트 */}
        <path
          d="M 122 98 C 114 112 96 124 74 130"
          stroke="#FEF08A"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* 5. 꽥! 크게 벌린 오리 입속 (포인트 핑크 & 혀) */}
        <path
          d="M 134 54 L 34 54 C 28 66 32 76 44 76 L 134 76 Z"
          fill="#FDA4AF"
          stroke="#FB7185"
          strokeWidth="1.5"
        />
        <ellipse cx="90" cy="70" rx="14" ry="6" fill="#F43F5E" />

        {/* 6. 오리 윗부리 (대폭 확대: x=30까지 길게 뻗고 위로 도톰하게 솟음) */}
        <path
          d="M 136 34 L 38 34 C 24 34 22 56 38 56 L 136 56 Z"
          fill="url(#duck-beak-grad)"
          stroke="#C2410C"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {/* 윗부리 하이라이트 & 콧구멍 */}
        <path d="M 46 40 L 115 40" stroke="#FDBA74" strokeWidth="2.5" strokeLinecap="round" />
        <ellipse cx="60" cy="46" rx="2" ry="1.2" fill="#9A3412" />

        {/* 7. 오리 아랫부리 (대폭 확대: x=36까지 길게 뻗고 아래로 도톰하게 확장) */}
        <path
          d="M 138 74 L 42 74 C 28 74 28 94 42 94 L 138 94 Z"
          fill="url(#duck-beak-grad)"
          stroke="#C2410C"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <path d="M 48 88 L 115 88" stroke="#FDBA74" strokeWidth="2" strokeLinecap="round" />

        {/* 8. 오리 얼굴 디테일 (대형 초롱초롱 눈망울 & 핑크 볼터치 - 글자 우상단 여백에 온전히 노출) */}
        <g transform="translate(152, 46)">
          <circle cx="0" cy="0" r="7.5" fill="#1C1917" />
          <circle cx="-2.2" cy="-2.5" r="2.8" fill="#FFFFFF" />
          <circle cx="2.5" cy="2.5" r="1.4" fill="#FFFFFF" />
          {/* 눈썹 */}
          <path d="M -5 -9 Q 0 -13 6 -9" stroke="#78716C" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        </g>
        {/* 사랑스러운 핑크 볼터치 */}
        <ellipse cx="162" cy="68" rx="8" ry="5.5" fill="#FCA5A5" opacity="0.85" />

        {/* 9. 꽥꽥! 노래하는 음표 & 반짝이 별 (부리 앞 좌상단) */}
        <g transform="translate(18, 24)">
          <path
            d="M 6 18 L 6 4 L 14 1 L 14 12 M 6 18 A 3 2.5 0 1 1 0 16 A 3 2.5 0 0 1 6 18 M 14 12 A 3 2.5 0 1 1 8 10 A 3 2.5 0 0 1 14 12"
            stroke="#F59E0B"
            strokeWidth="2"
            fill="#F59E0B"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <path d="M 12 12 L 14 6 L 16 12 L 22 14 L 16 16 L 14 22 L 12 16 L 6 14 Z" fill="#FDE047" stroke="#F59E0B" strokeWidth="1" />

        {/* 10. 글자 'ヲ' 오버레이 */}
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
