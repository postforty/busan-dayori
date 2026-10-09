import React from 'react';
import { KatakanaMnemonicSvgChildProps } from './types';
import KatakanaCharOverlay from './KatakanaCharOverlay';

export default function KatakanaRowHa({ char, fontFamily }: KatakanaMnemonicSvgChildProps) {
  if (char === 'ハ') {
    // ハ: 하와이 (하와이 해변에 시원하게 八자로 뻗은 쌍둥이 야자수 = 1획 왼쪽 야자나무, 2획 오른쪽 야자나무)
    return (
      <svg viewBox="0 0 200 160" className="w-full h-full select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* 하와이 트로피컬 석양 태양 그라디언트 */}
          <radialGradient id="hawaiiSunGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.9" />
            <stop offset="45%" stopColor="#FB923C" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#F43F5E" stopOpacity="0" />
          </radialGradient>

          {/* 따뜻한 황금빛 모래사장 그라디언트 */}
          <linearGradient id="hawaiiSandGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FEF3C7" />
            <stop offset="40%" stopColor="#FDE68A" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>

          {/* 왼쪽 야자수 줄기 우드 그라디언트 (1획 궤적) */}
          <linearGradient id="palmTrunkLeftGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D97706" />
            <stop offset="50%" stopColor="#B45309" />
            <stop offset="100%" stopColor="#78350F" />
          </linearGradient>

          {/* 오른쪽 야자수 줄기 우드 그라디언트 (2획 궤적) */}
          <linearGradient id="palmTrunkRightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#B45309" />
            <stop offset="50%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#78350F" />
          </linearGradient>

          {/* 싱그러운 에메랄드 야자수 잎 그라디언트 ① */}
          <linearGradient id="palmFrondGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34D399" />
            <stop offset="50%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>

          {/* 야자수 잎 그라디언트 ② (음영 잎) */}
          <linearGradient id="palmFrondGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#065F46" />
          </linearGradient>

          {/* 잘 익은 코코넛 열매 그라디언트 */}
          <radialGradient id="coconutGrad" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#92400E" />
            <stop offset="60%" stopColor="#78350F" />
            <stop offset="100%" stopColor="#451A03" />
          </radialGradient>
        </defs>

        {/* 1. 배경: 하와이 석양 & 바다 수평선 */}
        {/* 따뜻하게 번지는 트로피컬 태양 */}
        <circle cx="106" cy="68" r="42" fill="url(#hawaiiSunGrad)" />

        {/* 잔잔한 에메랄드빛 바다 잔물결 */}
        <line x1="34" y1="122" x2="176" y2="122" stroke="#38BDF8" strokeWidth="1" strokeDasharray="8 5" opacity="0.55" />
        <line x1="48" y1="126" x2="162" y2="126" stroke="#06B6D4" strokeWidth="0.8" strokeDasharray="10 6" opacity="0.45" />

        {/* 2. 바닥: 포근한 백사장 모래 언덕 (Beach Dunes) */}
        <path
          d="M 22 136 
             Q 64 122 106 120 
             Q 148 122 188 136 
             L 188 156 
             L 22 156 
             Z"
          fill="url(#hawaiiSandGrad)"
          stroke="#F59E0B"
          strokeWidth="0.8"
        />

        {/* 야자수 밑동 그림자 */}
        <ellipse cx="67" cy="120" rx="11" ry="3.5" fill="#D97706" opacity="0.4" />
        <ellipse cx="146" cy="120" rx="11" ry="3.5" fill="#D97706" opacity="0.4" />

        {/* 모래사장 위의 귀여운 핑크 불가사리 & 조개 */}
        {/* 불가사리 (우측) */}
        <g transform="translate(166, 136) scale(0.7)">
          <polygon
            points="0,-8 2.4,-2.5 8,-2.5 3.6,1 5.3,7 0,3.5 -5.3,7 -3.6,1 -8,-2.5 -2.4,-2.5"
            fill="#FB7185"
            stroke="#E11D48"
            strokeWidth="0.7"
          />
        </g>
        {/* 조개껍데기 (좌측) */}
        <ellipse cx="44" cy="138" rx="3.5" ry="2.2" fill="#FFFFFF" stroke="#FDE68A" strokeWidth="0.6" />

        {/* 3. [★ 1획 매칭] 왼쪽 야자나무 줄기 (Left Palm Trunk) */}
        {/* 글자 'ハ' 1획(왼쪽 삐침선)의 궤적과 1:1 완벽 일치하는 줄기 바디 */}
        <path
          d="M 92 56 
             Q 81 87 61 118 
             L 73 118 
             Q 90 87 100 56 
             Z"
          fill="url(#palmTrunkLeftGrad)"
          stroke="#78350F"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        {/* 왼쪽 줄기 마디 라인 (Ring joints) */}
        <path d="M 89 68 Q 94 70 98 68" stroke="#FEF3C7" strokeWidth="0.8" opacity="0.6" />
        <path d="M 84 82 Q 90 84 94 82" stroke="#FEF3C7" strokeWidth="0.8" opacity="0.6" />
        <path d="M 77 96 Q 83 98 88 96" stroke="#FEF3C7" strokeWidth="0.8" opacity="0.6" />
        <path d="M 69 110 Q 76 112 81 110" stroke="#FEF3C7" strokeWidth="0.8" opacity="0.6" />

        {/* 4. [★ 2획 매칭] 오른쪽 야자나무 줄기 (Right Palm Trunk) */}
        {/* 글자 'ハ' 2획(오른쪽 삐침선)의 궤적과 1:1 완벽 일치하는 줄기 바디 */}
        <path
          d="M 112 58 
             Q 127 90 139 118 
             L 153 118 
             Q 138 90 121 58 
             Z"
          fill="url(#palmTrunkRightGrad)"
          stroke="#78350F"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        {/* 오른쪽 줄기 마디 라인 (Ring joints) */}
        <path d="M 114 68 Q 118 70 123 68" stroke="#FEF3C7" strokeWidth="0.8" opacity="0.6" />
        <path d="M 118 82 Q 124 84 129 82" stroke="#FEF3C7" strokeWidth="0.8" opacity="0.6" />
        <path d="M 124 96 Q 131 98 136 96" stroke="#FEF3C7" strokeWidth="0.8" opacity="0.6" />
        <path d="M 132 110 Q 140 112 145 110" stroke="#FEF3C7" strokeWidth="0.8" opacity="0.6" />

        {/* 5. 야자수 풍성한 잎사귀 (Crown Fronds) & 달콤한 코코넛 */}
        {/* [왼쪽 야자수 잎사귀들 - 상단 (96, 56)] */}
        {/* 좌측 메인 잎 1 (좌상단으로 길게 휘어짐) */}
        <path d="M 96 56 Q 72 34 46 44 Q 68 46 96 56 Z" fill="url(#palmFrondGrad1)" stroke="#047857" strokeWidth="0.9" />
        <path d="M 96 56 Q 72 34 46 44" stroke="#065F46" strokeWidth="1" fill="none" />
        {/* 좌측 잎 2 (왼쪽으로 우아하게 처지는 잎) */}
        <path d="M 96 56 Q 66 52 48 70 Q 72 62 96 56 Z" fill="url(#palmFrondGrad2)" stroke="#047857" strokeWidth="0.9" />
        {/* 좌측 잎 3 (위쪽으로 솟구치는 잎) */}
        <path d="M 96 56 Q 84 26 70 28 Q 88 38 96 56 Z" fill="url(#palmFrondGrad1)" stroke="#047857" strokeWidth="0.9" />
        {/* 좌측 잎 4 (중앙 쪽 작은 잎) */}
        <path d="M 96 56 Q 104 38 102 46 Q 98 52 96 56 Z" fill="url(#palmFrondGrad2)" stroke="#047857" strokeWidth="0.7" />

        {/* 왼쪽 야자수 코코넛 열매 2개 */}
        <circle cx="93" cy="60" r="3.8" fill="url(#coconutGrad)" stroke="#451A03" strokeWidth="0.6" />
        <circle cx="98" cy="62" r="3.5" fill="url(#coconutGrad)" stroke="#451A03" strokeWidth="0.6" />
        <circle cx="92" cy="59" r="0.8" fill="#FDE68A" opacity="0.7" />

        {/* [오른쪽 야자수 잎사귀들 - 상단 (116, 58)] */}
        {/* 우측 메인 잎 1 (우상단으로 길게 휘어짐) */}
        <path d="M 116 58 Q 140 34 166 44 Q 144 46 116 58 Z" fill="url(#palmFrondGrad1)" stroke="#047857" strokeWidth="0.9" />
        <path d="M 116 58 Q 140 34 166 44" stroke="#065F46" strokeWidth="1" fill="none" />
        {/* 우측 잎 2 (오른쪽으로 우아하게 처지는 잎) */}
        <path d="M 116 58 Q 146 52 164 70 Q 140 62 116 58 Z" fill="url(#palmFrondGrad2)" stroke="#047857" strokeWidth="0.9" />
        {/* 우측 잎 3 (위쪽으로 솟구치는 잎) */}
        <path d="M 116 58 Q 128 26 142 28 Q 124 38 116 58 Z" fill="url(#palmFrondGrad1)" stroke="#047857" strokeWidth="0.9" />
        {/* 우측 잎 4 (중앙 쪽 작은 잎) */}
        <path d="M 116 58 Q 108 38 110 46 Q 114 52 116 58 Z" fill="url(#palmFrondGrad2)" stroke="#047857" strokeWidth="0.7" />

        {/* 오른쪽 야자수 코코넛 열매 2개 */}
        <circle cx="114" cy="62" r="3.5" fill="url(#coconutGrad)" stroke="#451A03" strokeWidth="0.6" />
        <circle cx="119" cy="60" r="3.8" fill="url(#coconutGrad)" stroke="#451A03" strokeWidth="0.6" />
        <circle cx="118" cy="59" r="0.8" fill="#FDE68A" opacity="0.7" />

        {/* 6. 하와이 휴양지 햇살 스파클 (✨) */}
        <path d="M 106 32 L 108 26 L 110 32 L 116 34 L 110 36 L 108 42 L 106 36 L 100 34 Z" fill="#FDE047" />
        <circle cx="42" cy="34" r="1.5" fill="#FDE047" />
        <circle cx="170" cy="34" r="1.5" fill="#38BDF8" />

        {/* 7. 글자 'ハ' 오버레이 (두 그루의 야자수 기둥과 1:1 완벽 일치) */}
        <KatakanaCharOverlay char="ハ" fontFamily={fontFamily} x="106" y="118" />
      </svg>
    );
  }

  if (char === 'ヒ') {
    // ヒ: 히터 (사진 속 클래식 2단 석영관 전기 히터: 상단 붉은 열선 1획 & 왼쪽 기둥·하단 베이스 2획)
    return (
      <svg viewBox="0 0 200 160" className="w-full h-full select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* 1. 배경 은은한 원적외선 웜 글로우 */}
          <radialGradient id="heaterWarmGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#EA580C" stopOpacity="0.3" />
            <stop offset="45%" stopColor="#FB923C" stopOpacity="0.16" />
            <stop offset="80%" stopColor="#FDBA74" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>

          {/* 2. 히터 화이트 바디 입체 그라디언트 */}
          <linearGradient id="heaterWhiteBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="40%" stopColor="#F8FAFC" />
            <stop offset="100%" stopColor="#E2E8F0" />
          </linearGradient>

          {/* 3. 내부 알루미늄 리플렉터 반사판 그라디언트 */}
          <linearGradient id="heaterReflectorChamberGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#7C2D12" />
            <stop offset="25%" stopColor="#C2410C" />
            <stop offset="50%" stopColor="#EA580C" />
            <stop offset="75%" stopColor="#9A3412" />
            <stop offset="100%" stopColor="#431407" />
          </linearGradient>

          {/* 4. [1획 매칭] 1단 상단 석영관 붉은 발열 코어 그라디언트 */}
          <linearGradient id="quartzGlowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#EF4444" />
            <stop offset="15%" stopColor="#F97316" />
            <stop offset="50%" stopColor="#FBBF24" />
            <stop offset="85%" stopColor="#F97316" />
            <stop offset="100%" stopColor="#EF4444" />
          </linearGradient>

          {/* 5. 크롬 메탈 철망 그릴 그라디언트 */}
          <linearGradient id="chromeGrillGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#CBD5E1" />
            <stop offset="50%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#94A3B8" />
          </linearGradient>
        </defs>

        {/* --- [1. 배경 온기 앰비언트 글로우 & 열기 아지랑이] --- */}
        <ellipse cx="116" cy="74" rx="74" ry="48" fill="url(#heaterWarmGlow)" />

        {/* 상단 및 전면 열기 파동선 (Heat Waves) */}
        <path d="M 104 22 C 108 14 114 14 118 20" stroke="#FB923C" strokeWidth="1.6" strokeLinecap="round" opacity="0.75" />
        <path d="M 126 22 C 130 16 136 16 140 22" stroke="#F97316" strokeWidth="1.8" strokeLinecap="round" opacity="0.8" />
        <path d="M 148 48 C 158 44 164 42 172 46" stroke="#FB923C" strokeWidth="2" strokeLinecap="round" opacity="0.75" />

        {/* 따뜻한 온기 스파클 (✨) */}
        <path d="M 174 38 L 176 32 L 178 38 L 184 40 L 178 42 L 176 48 L 174 42 L 168 40 Z" fill="#F59E0B" />
        <circle cx="180" cy="56" r="1.5" fill="#F97316" />
        <circle cx="94" cy="20" r="1.3" fill="#FBBF24" />

        {/* --- [2. 히터 본체 베이스 하부 다리 받침대 2개] --- */}
        {/* 좌측 다리 (둥근 스탠드 풋) */}
        <rect x="58" y="120" width="22" height="7" rx="3.5" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1.2" />
        <line x1="62" y1="126" x2="76" y2="126" stroke="#0F172A" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />

        {/* 우측 다리 (글자 2획 끝 삐침 받침 역할) */}
        <rect x="146" y="120" width="22" height="7" rx="3.5" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1.2" />
        <line x1="150" y1="126" x2="164" y2="126" stroke="#0F172A" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />

        {/* --- [3. 클래식 2단 히터 화이트 메인 바디] --- */}
        {/* 메인 직사각형 화이트 케이스 */}
        <rect
          x="62"
          y="34"
          width="104"
          height="88"
          rx="6"
          fill="url(#heaterWhiteBodyGrad)"
          stroke="#94A3B8"
          strokeWidth="1.6"
        />

        {/* 상단 메탈 환기 그릴 루버 (Top Wire Mesh) */}
        <path d="M 68 34 L 74 28 L 154 28 L 160 34 Z" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="1.2" strokeLinejoin="round" />
        <line x1="84" y1="31" x2="144" y2="31" stroke="#64748B" strokeWidth="0.9" strokeDasharray="3 2" />

        {/* --- [4. 내부 발열 챔버 & 리플렉터 반사판] --- */}
        {/* 오목한 세로 주름 리플렉터 캐비티 */}
        <rect
          x="80"
          y="44"
          width="68"
          height="68"
          rx="3"
          fill="url(#heaterReflectorChamberGrad)"
          stroke="#78350F"
          strokeWidth="1.4"
        />

        {/* 스테인리스 세로 주름 반사 리지 라인들 */}
        <line x1="86" y1="45" x2="86" y2="111" stroke="#FDBA74" strokeWidth="0.8" opacity="0.5" />
        <line x1="94" y1="45" x2="94" y2="111" stroke="#FDBA74" strokeWidth="0.8" opacity="0.6" />
        <line x1="102" y1="45" x2="102" y2="111" stroke="#FDBA74" strokeWidth="0.8" opacity="0.7" />
        <line x1="110" y1="45" x2="110" y2="111" stroke="#FED7AA" strokeWidth="0.9" opacity="0.8" />
        <line x1="118" y1="45" x2="118" y2="111" stroke="#FED7AA" strokeWidth="0.9" opacity="0.8" />
        <line x1="126" y1="45" x2="126" y2="111" stroke="#FDBA74" strokeWidth="0.8" opacity="0.7" />
        <line x1="134" y1="45" x2="134" y2="111" stroke="#FDBA74" strokeWidth="0.8" opacity="0.6" />
        <line x1="142" y1="45" x2="142" y2="111" stroke="#FDBA74" strokeWidth="0.8" opacity="0.5" />

        {/* --- [5. 하단 2단 석영 발열관 (OFF/은은한 대기 상태)] --- */}
        <rect x="83" y="93" width="62" height="5.5" rx="2.75" fill="#475569" opacity="0.4" />
        <rect x="84" y="92.5" width="60" height="5.5" rx="2.75" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="0.8" />
        <line x1="88" y1="95.2" x2="140" y2="95.2" stroke="#CBD5E1" strokeWidth="1.6" strokeLinecap="round" />
        {/* 하단 관 세라믹 마운트 */}
        <rect x="82" y="91.5" width="3" height="7.5" rx="1" fill="#F8FAFC" stroke="#64748B" strokeWidth="0.8" />
        <rect x="143" y="91.5" width="3" height="7.5" rx="1" fill="#F8FAFC" stroke="#64748B" strokeWidth="0.8" />

        {/* --- [6. ★ 글자 1획 매칭: 상단 1단 석영 발열관 (ON - 강렬한 붉은 발열)] --- */}
        {/* 발열관 주변 타오르는 앰버 글로우 */}
        <ellipse cx="114" cy="66" rx="32" ry="10" fill="#F97316" opacity="0.4" />

        {/* 붉게 달아오른 쿼츠 발열 튜브 (1획 가로선 중심 y=66과 1:1 완벽 일치) */}
        <rect
          x="84"
          y="63.2"
          width="60"
          height="5.8"
          rx="2.9"
          fill="url(#quartzGlowGrad)"
          stroke="#EF4444"
          strokeWidth="0.8"
        />
        {/* 초고온 화이트-골드 코어 발열 빔 */}
        <line x1="88" y1="66.1" x2="140" y2="66.1" stroke="#FEF08A" strokeWidth="2.4" strokeLinecap="round" />
        <line x1="91" y1="66.1" x2="137" y2="66.1" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />

        {/* 상단 관 좌우 화이트 세라믹 소켓 마운트 */}
        <rect x="82" y="62" width="3" height="8" rx="1" fill="#F8FAFC" stroke="#64748B" strokeWidth="0.8" />
        <rect x="143" y="62" width="3" height="8" rx="1" fill="#F8FAFC" stroke="#64748B" strokeWidth="0.8" />

        {/* --- [7. 전면 안전 크롬 철망 그릴 (Wire Safety Grill)] --- */}
        {/* 가로 메탈 지지대 2줄 */}
        <line x1="80" y1="52" x2="148" y2="52" stroke="#E2E8F0" strokeWidth="1.2" strokeLinecap="round" opacity="0.9" />
        <line x1="80" y1="104" x2="148" y2="104" stroke="#E2E8F0" strokeWidth="1.2" strokeLinecap="round" opacity="0.9" />

        {/* 촘촘한 세로 철망 와이어 살 (사진 속 리얼한 안전 철망 재현) */}
        <line x1="85" y1="45" x2="85" y2="111" stroke="#CBD5E1" strokeWidth="0.9" opacity="0.85" />
        <line x1="90" y1="45" x2="90" y2="111" stroke="#E2E8F0" strokeWidth="0.9" opacity="0.85" />
        <line x1="95" y1="45" x2="95" y2="111" stroke="#CBD5E1" strokeWidth="0.9" opacity="0.85" />
        <line x1="100" y1="45" x2="100" y2="111" stroke="#E2E8F0" strokeWidth="0.9" opacity="0.85" />
        <line x1="105" y1="45" x2="105" y2="111" stroke="#CBD5E1" strokeWidth="0.9" opacity="0.85" />
        <line x1="110" y1="45" x2="110" y2="111" stroke="#FFFFFF" strokeWidth="0.9" opacity="0.95" />
        <line x1="115" y1="45" x2="115" y2="111" stroke="#FFFFFF" strokeWidth="0.9" opacity="0.95" />
        <line x1="120" y1="45" x2="120" y2="111" stroke="#E2E8F0" strokeWidth="0.9" opacity="0.85" />
        <line x1="125" y1="45" x2="125" y2="111" stroke="#CBD5E1" strokeWidth="0.9" opacity="0.85" />
        <line x1="130" y1="45" x2="130" y2="111" stroke="#E2E8F0" strokeWidth="0.9" opacity="0.85" />
        <line x1="135" y1="45" x2="135" y2="111" stroke="#CBD5E1" strokeWidth="0.9" opacity="0.85" />
        <line x1="140" y1="45" x2="140" y2="111" stroke="#CBD5E1" strokeWidth="0.9" opacity="0.85" />

        {/* --- [8. 우측 측면 패널 & 빨간색 2단 로커 스위치] --- */}
        {/* 스위치 베젤 박스 */}
        <rect x="153" y="60" width="7" height="18" rx="1.5" fill="#0F172A" />

        {/* 상단 스위치 (1단 켜짐 ON - 선명한 붉은색) */}
        <rect x="154" y="61.5" width="5" height="6.5" rx="1" fill="#EF4444" stroke="#DC2626" strokeWidth="0.5" />
        <circle cx="156.5" cy="64.5" r="0.8" fill="#FFFFFF" opacity="0.9" />

        {/* 하단 스위치 (2단 꺼짐 OFF - 어두운 적색) */}
        <rect x="154" y="70" width="5" height="6.5" rx="1" fill="#7F1D1D" stroke="#450A0A" strokeWidth="0.5" />

        {/* --- [9. 하단 화이트 베이스 & reina 스타일 미니멀 브랜드 로고] --- */}
        {/* 하단 프레임 쉐도우 엣지 */}
        <line x1="64" y1="113" x2="164" y2="113" stroke="#CBD5E1" strokeWidth="1" />
        {/* 미니멀 영문 폰트 브랜드 각인 */}
        <text
          x="114"
          y="119.5"
          textAnchor="middle"
          fontSize="5"
          fontWeight="600"
          letterSpacing="1.5"
          fill="#64748B"
          fontFamily="serif, sans-serif"
        >
          reina
        </text>

        {/* --- [10. 글자 'ヒ' 오버레이 (상단 열선 1획 & 왼쪽 기둥·하단 베이스 2획과 1:1 완벽 일치)] --- */}
        <KatakanaCharOverlay char="ヒ" fontFamily={fontFamily} x="106" y="118" />
      </svg>
    );
  }

  if (char === 'フ') {
    // フ: 후크 (후크 선장의 날카롭게 꺾인 해적 갈고리 손)
    return (
      <svg viewBox="0 0 200 160" className="w-full h-full select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* 해적 소매 깃 & 금빛 버클 */}
        <rect x="42" y="38" width="46" height="32" rx="6" fill="#881337" stroke="#4C0519" strokeWidth="2" />
        <rect x="80" y="44" width="12" height="20" rx="3" fill="#FDE047" stroke="#CA8A04" strokeWidth="1.5" />

        {/* 은빛 후크 갈고리 (글자 フ의 가로선과 꺾여 내려오는 획과 1:1 일치) */}
        <path
          d="M 88 54 L 146 54 C 146 78 136 104 96 138 C 92 142 86 138 88 134 C 114 106 126 84 126 68 L 88 68 Z"
          fill="#F1F5F9"
          stroke="#475569"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {/* 갈고리 끝 뾰족한 포인트 */}
        <circle cx="92" cy="138" r="2" fill="#38BDF8" />

        {/* 번쩍이는 빛 스파크 */}
        <path d="M 152 46 L 154 38 L 156 46 L 164 48 L 156 50 L 154 58 L 152 50 L 144 48 Z" fill="#38BDF8" />

        {/* 글자 'フ' 오버레이 */}
        <KatakanaCharOverlay char="フ" fontFamily={fontFamily} x="106" y="118" />
      </svg>
    );
  }

  if (char === 'ヘ') {
    // ヘ: 헤엄 (★ 히라가나 へ와 100% 동일한 형태! 물살을 가르며 헤엄치는 사랑스럽고 디테일한 수영선수 도안 100% 재활용)
    return (
      <svg
        viewBox="0 0 200 160"
        className="w-full h-full select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 1. 배경 시원한 수영장/바다 물결 */}
        {/* 깊은 물속 레이어 */}
        <path
          d="M 0 114 C 40 108 80 118 120 112 C 160 106 185 116 200 112 L 200 160 L 0 160 Z"
          fill="#E0F2FE"
        />
        <path
          d="M 0 126 C 45 122 90 130 140 124 C 170 120 188 126 200 124 L 200 160 L 0 160 Z"
          fill="#BAE6FD"
          opacity="0.45"
        />
        {/* 수면 메인 웨이브 라인 */}
        <path
          d="M 0 114 C 40 108 80 118 120 112 C 160 106 185 116 200 112"
          stroke="#0284C7"
          strokeWidth="2.5"
        />
        {/* 잔잔한 물결 무늬선 */}
        <path
          d="M 12 136 C 36 132 64 138 90 134"
          stroke="#38BDF8"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeDasharray="8 5"
        />
        <path
          d="M 110 138 C 138 134 168 140 192 135"
          stroke="#38BDF8"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeDasharray="10 5"
        />

        {/* 2. 물속으로 뻗은 반대쪽 앞팔 (물속 글라이딩) */}
        <path
          d="M 92 104 C 108 108 124 112 140 115 C 144 116 146 119 142 121 C 128 122 110 118 94 114 Z"
          fill="#FED7AA"
          opacity="0.7"
          stroke="#EA580C"
          strokeWidth="1"
        />

        {/* 3. 하체 & 다리 & 발차기 (Flutter Kick - 역동적인 수영 전신 표현!) */}
        {/* 물속 아래쪽 다리 */}
        <path
          d="M 54 108 C 44 112 36 118 28 122 C 26 123 27 125 29 125 C 38 122 46 116 56 112 Z"
          fill="#FED7AA"
          opacity="0.8"
          stroke="#EA580C"
          strokeWidth="1.2"
        />
        {/* 물 위쪽 다리 (발끝으로 물을 튕기는 자세) */}
        <path
          d="M 52 104 C 42 102 34 100 24 98 C 22 97 21 100 23 102 C 30 106 40 108 50 108 Z"
          fill="#FED7AA"
          stroke="#EA580C"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        {/* 뒤쪽 발차기 물보라 거품과 튀는 물방울 */}
        <path
          d="M 22 96 C 14 92 8 98 12 104 C 16 108 26 106 28 100 Z"
          fill="#FFFFFF"
          stroke="#38BDF8"
          strokeWidth="1.2"
        />
        <circle cx="14" cy="90" r="2.2" fill="#38BDF8" />
        <circle cx="20" cy="85" r="1.6" fill="#60A5FA" />
        <circle cx="8" cy="98" r="1.8" fill="#BAE6FD" />

        {/* 4. 상체 몸통 & 스포티 수영복 (수면에 안정감 있게 뜬 전신 자세) */}
        {/* 몸통 베이스 (등~허리~엉덩이) */}
        <path
          d="M 48 106 
             C 50 96 62 92 78 92 
             C 88 92 98 96 100 104 
             C 100 110 92 116 80 116 
             C 64 116 52 112 48 106 Z"
          fill="#FED7AA"
          stroke="#EA580C"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        {/* 파란색 스포티 수영복 (Trunks) */}
        <path
          d="M 48 106 
             C 50 97 60 94 68 94 
             C 72 98 74 108 72 114 
             C 60 116 52 112 48 106 Z"
          fill="#2563EB"
          stroke="#1D4ED8"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        {/* 수영복 화이트 레이싱 스트라이프 */}
        <path d="M 54 100 C 58 104 60 110 60 114" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />

        {/* 5. 머리 & 수영모 & 고글 & 숨 내쉬는 귀여운 표정 */}
        {/* 얼굴 옆모습 (어깨 바로 앞 자연스러운 두상) */}
        <path
          d="M 88 88 
             C 88 76 96 70 106 72 
             C 114 74 118 82 116 90 
             C 114 96 106 100 96 98 
             C 90 96 88 92 88 88 Z"
          fill="#FED7AA"
          stroke="#EA580C"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        {/* 마린 블루 수영모 (Swim Cap) */}
        <path
          d="M 88 86 
             C 87 74 95 68 106 70 
             C 115 72 117 78 116 84 
             C 108 78 98 78 88 86 Z"
          fill="#0284C7"
          stroke="#0369A1"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        {/* 수영모 화이트 라인 */}
        <path d="M 94 72 C 102 71 108 74 112 79" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />

        {/* 수경 (Goggles) */}
        <path d="M 90 82 C 96 80 102 80 106 82" stroke="#0F172A" strokeWidth="1.4" strokeLinecap="round" />
        <ellipse cx="108" cy="82" rx="4.5" ry="3.5" fill="#38BDF8" stroke="#0284C7" strokeWidth="1.4" />
        <ellipse cx="109" cy="81" rx="1.5" ry="1" fill="#FFFFFF" opacity="0.9" />

        {/* 표정 디테일: 방긋 웃는 눈 & 볼터치 & 숨을 "파-" 내쉬는 입 */}
        <path d="M 102 87 Q 105 84 108 87" stroke="#1E293B" strokeWidth="1.4" strokeLinecap="round" fill="none" />
        <ellipse cx="104" cy="92" rx="3" ry="1.8" fill="#FDA4AF" />
        <ellipse cx="113" cy="92" rx="2" ry="2.2" fill="#EA580C" />
        {/* 숨 내쉴 때 퐁퐁 나오는 귀여운 물방울 */}
        <circle cx="120" cy="89" r="1.6" fill="#FFFFFF" stroke="#38BDF8" strokeWidth="0.8" />
        <circle cx="126" cy="85" r="2.2" fill="#FFFFFF" stroke="#38BDF8" strokeWidth="0.8" />

        {/* 6. 글자 'ヘ'의 완벽한 궤적: 하이 엘보 리커버리 오른팔 (스트로크) */}
        {/* 어깨(74,94) -> 팔꿈치(105,62) -> 물을 베며 뻗은 손끝(154,106) */}
        <path
          d="M 74 94 
             C 80 84 92 72 102 62 
             C 105 59 109 60 111 64 
             C 122 76 138 92 154 104 
             C 157 106 156 109 152 110 
             C 142 104 128 88 116 78 
             C 110 74 106 74 102 80 
             C 92 90 84 98 80 102 
             C 76 102 72 98 74 94 Z"
          fill="#FED7AA"
          stroke="#EA580C"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        {/* 팔꿈치 꼭대기 하이라이트 광택 */}
        <ellipse cx="106" cy="63" rx="2.5" ry="1.6" fill="#FFFFFF" opacity="0.85" />

        {/* 7. 팔꿈치 위로 튀는 상쾌한 물방울 */}
        <circle cx="105" cy="48" r="2.4" fill="#38BDF8" />
        <circle cx="114" cy="44" r="1.8" fill="#60A5FA" />
        <circle cx="96" cy="52" r="1.6" fill="#BAE6FD" />

        {/* 8. 손끝이 물에 닿는 곳의 하얀 거품 파도 & 물보라 */}
        <path
          d="M 150 106 C 156 100 164 102 168 110 C 160 112 152 110 150 106 Z"
          fill="#FFFFFF"
          stroke="#38BDF8"
          strokeWidth="1.3"
        />
        <circle cx="164" cy="98" r="2" fill="#38BDF8" />
        <circle cx="172" cy="103" r="1.5" fill="#60A5FA" />
        <circle cx="158" cy="95" r="1.8" fill="#BAE6FD" />

        {/* 9. 시원한 속도감을 더해주는 물살 스피드 라인 */}
        <path
          d="M 148 118 C 164 116 182 120 196 118"
          stroke="#0284C7"
          strokeWidth="2.2"
          strokeLinecap="round"
        />

        {/* 글자 'ヘ' 오버레이 */}
        <KatakanaCharOverlay char="ヘ" fontFamily={fontFamily} x="108" y="116" />
      </svg>
    );
  }

  if (char === 'ホ') {
    // ホ: 호롱불 (기둥과 갓, 따스한 불꽃이 피어오르는 전통 호롱불)
    return (
      <svg viewBox="0 0 200 160" className="w-full h-full select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* 바닥 그림자 */}
        <ellipse cx="106" cy="144" rx="48" ry="6" fill="#FEF3C7" />

        {/* 따스한 호롱불 불빛 후광 */}
        <circle cx="106" cy="42" r="24" fill="#FEF08A" opacity="0.6" />
        {/* 피어오르는 붉은 불꽃 */}
        <path d="M 106 28 C 100 36 102 46 106 50 C 110 46 112 36 106 28 Z" fill="#EF4444" stroke="#DC2626" strokeWidth="1.5" />
        <circle cx="106" cy="42" r="3.5" fill="#FBBF24" />

        {/* 호롱불 상단 가로 받침 갓 (글자 ホ 1획) */}
        <rect x="62" y="52" width="88" height="10" rx="5" fill="#78350F" stroke="#451A03" strokeWidth="1.8" />

        {/* 호롱불 중앙 기둥 (글자 ホ 2획 세로 기둥) */}
        <rect x="98" y="52" width="16" height="88" rx="4" fill="#92400E" stroke="#451A03" strokeWidth="2" />

        {/* 양옆 받침 다리 날개 (글자 ホ의 좌우 3, 4획) */}
        <line x1="84" y1="84" x2="68" y2="128" stroke="#B45309" strokeWidth="5.5" strokeLinecap="round" />
        <line x1="128" y1="84" x2="144" y2="128" stroke="#B45309" strokeWidth="5.5" strokeLinecap="round" />

        {/* 기둥 밑둥 받침대 */}
        <ellipse cx="106" cy="140" rx="36" ry="6" fill="#78350F" stroke="#451A03" strokeWidth="1.5" />

        {/* 글자 'ホ' 오버레이 */}
        <KatakanaCharOverlay char="ホ" fontFamily={fontFamily} x="106" y="118" />
      </svg>
    );
  }

  return null;
}
