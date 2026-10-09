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
    // ン: 응원 (★ 핵심: 승리의 머리띠를 두른 응원단장[1획 점], 아래에서 우상단으로 힘차게 치켜든 응원 깃발[2획 삐침])
    return (
      <svg viewBox="0 0 200 160" className="w-full h-full select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* 응원 깃발 시원한 블루 그라디언트 */}
          <linearGradient id="cheerFlagGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="50%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#0369A1" />
          </linearGradient>

          {/* 깃대 메탈릭 골드 그라디언트 */}
          <linearGradient id="flagPoleGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="45%" stopColor="#FDE047" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>

          {/* 치어리더 유니폼 그라디언트 */}
          <linearGradient id="cheerUniformGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E0F2FE" />
            <stop offset="100%" stopColor="#BAE6FD" />
          </linearGradient>
        </defs>

        {/* 1. 지면 그림자 */}
        <ellipse cx="106" cy="144" rx="58" ry="6.5" fill="#F1F5F9" />
        <ellipse cx="80" cy="144" rx="26" ry="4" fill="#E2E8F0" opacity="0.7" />

        {/* 2. 응원단장 하체 및 유니폼 몸통 (좌하단에서 2획 깃대를 든든하게 받침) */}
        <g id="cheer-body">
          {/* 운동화 & 다리 */}
          <line x1="68" y1="130" x2="68" y2="142" stroke="#64748B" strokeWidth="2.8" strokeLinecap="round" />
          <line x1="78" y1="130" x2="78" y2="142" stroke="#64748B" strokeWidth="2.8" strokeLinecap="round" />
          <ellipse cx="66" cy="142" rx="5" ry="2.8" fill="#EF4444" />
          <ellipse cx="80" cy="142" rx="5" ry="2.8" fill="#EF4444" />

          {/* 파란색 스포티 반바지 */}
          <path d="M 62 118 L 84 118 L 82 130 L 64 130 Z" fill="#0369A1" />

          {/* 유니폼 상의 */}
          <path
            d="M 60 92 L 56 118 L 86 118 L 82 92 Z"
            fill="url(#cheerUniformGrad)"
            stroke="#38BDF8"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          {/* 유니폼 브이넥 포인트 */}
          <path d="M 67 92 L 71 99 L 75 92" stroke="#0284C7" strokeWidth="1.6" fill="none" />

          {/* 깃대를 꽉 쥔 두 손 */}
          <circle cx="76" cy="116" r="4.5" fill="#FED7AA" stroke="#EA580C" strokeWidth="1.2" />
          <circle cx="82" cy="112" r="4.5" fill="#FED7AA" stroke="#EA580C" strokeWidth="1.2" />
        </g>

        {/* 3. [1획과 매칭] 힘차게 "와아~!" 외치는 응원단장 얼굴 & 승리의 빨간 머리띠 */}
        <g id="cheer-head-and-headband">
          {/* 둥근 얼굴 베이스 (글자 1획 왼쪽 뒤에서 자연스럽게 결합) */}
          <circle cx="72" cy="66" r="17" fill="#FFF7ED" stroke="#78716C" strokeWidth="1.6" />

          {/* 승리의 빨간 응원 머리띠 (글자 1획 각도와 자연스러운 호응) */}
          <path d="M 57 60 Q 72 54 87 60" stroke="#EF4444" strokeWidth="4.2" strokeLinecap="round" />
          {/* 뒤로 펄럭이는 머리띠 매듭 꼬리 */}
          <path d="M 57 60 C 48 62 44 70 46 76" stroke="#EF4444" strokeWidth="2.6" strokeLinecap="round" fill="none" />
          <path d="M 56 61 C 46 66 45 74 49 80" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" fill="none" />

          {/* 초롱초롱한 눈 & 눈썹 */}
          <path d="M 64 62 Q 68 59 71 62" stroke="#78716C" strokeWidth="1.4" strokeLinecap="round" fill="none" />
          <circle cx="68" cy="67" r="2.2" fill="#1C1917" />
          <circle cx="67.2" cy="66.2" r="0.8" fill="#FFFFFF" />

          {/* 발그레 핑크 볼터치 */}
          <ellipse cx="66" cy="72" rx="3.5" ry="2.2" fill="#FDA4AF" />

          {/* "와아~!" 크게 응원 구호를 외치는 입 */}
          <ellipse cx="78" cy="71" rx="3.5" ry="4.5" fill="#F43F5E" />
          <ellipse cx="78" cy="73" rx="2" ry="1.5" fill="#FFFFFF" opacity="0.6" />

          {/* 입 앞 작은 소리 울림파 */}
          <path d="M 86 68 C 88 66 89 64 88 62" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <path d="M 90 71 C 93 69 94 65 92 61" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        </g>

        {/* 4. [2획과 매칭] 바닥에서 우상단으로 힘차게 치켜든 응원 깃대 & 대형 응원 깃발 */}
        <g id="cheer-flag-and-pole">
          {/* 힘차게 솟구치는 깃대 (좌하단 손에서 우상단 끝까지 곧게 뻗은 메탈릭 골드 봉) */}
          <line x1="76" y1="122" x2="150" y2="46" stroke="url(#flagPoleGrad)" strokeWidth="6.5" strokeLinecap="round" />
          <line x1="77" y1="121" x2="149" y2="47" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" opacity="0.85" />

          {/* 깃대 꼭대기 황금 피니얼 장식 구슬 */}
          <circle cx="152" cy="44" r="5.5" fill="#FBBF24" stroke="#D97706" strokeWidth="1.5" />
          <circle cx="150.5" cy="42.5" r="1.6" fill="#FFFFFF" />

          {/* 우상단에서 펄럭이는 대형 승리의 응원 깃발 (글자 2획의 솟구침 끝자락에 연결) */}
          <path
            d="M 150 48 C 168 40 182 50 192 42 L 186 76 C 174 82 162 70 144 80 Z"
            fill="url(#cheerFlagGrad)"
            stroke="#0369A1"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          {/* 깃발 펄럭임 명암 하이라이트 */}
          <path
            d="M 152 50 C 168 43 180 52 190 45"
            stroke="#BAE6FD"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
          {/* 깃발 중앙의 빛나는 황금 승리의 별 문양 */}
          <path
            d="M 168 56 L 170 50 L 172 56 L 178 58 L 172 60 L 170 66 L 168 60 L 162 58 Z"
            fill="#FDE047"
            stroke="#F59E0B"
            strokeWidth="0.8"
          />
        </g>

        {/* 5. 우상단 팡팡 터지는 응원 콘페티 & 반짝이 스파클 */}
        <g id="cheer-confetti" opacity="0.85">
          {/* 황금 스파클 */}
          <path d="M 140 28 L 142 22 L 144 28 L 150 30 L 144 32 L 142 38 L 140 32 L 134 30 Z" fill="#F59E0B" />
          <circle cx="142" cy="30" r="1.2" fill="#FFFFFF" />

          {/* 알록달록 날리는 색종이 조각들 */}
          <circle cx="128" cy="42" r="2.2" fill="#38BDF8" />
          <circle cx="160" cy="26" r="2.5" fill="#F43F5E" />
          <rect x="180" y="24" width="4.5" height="3" rx="1" fill="#FBBF24" transform="rotate(25 182 25)" />
          <rect x="188" y="60" width="4" height="4" rx="1" fill="#34D399" transform="rotate(-20 190 62)" />
        </g>

        {/* 6. 글자 'ン' 오버레이 (오직 2개의 획만 깔끔하게 일러스트와 1:1 결합!) */}
        <KatakanaCharOverlay char="ン" fontFamily={fontFamily} x="106" y="118" />
      </svg>
    );
  }

  return null;
}
