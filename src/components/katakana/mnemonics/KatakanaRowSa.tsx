import React from 'react';
import { KatakanaMnemonicSvgChildProps } from './types';
import KatakanaCharOverlay from './KatakanaCharOverlay';

export default function KatakanaRowSa({ char, fontFamily }: KatakanaMnemonicSvgChildProps) {
  if (char === 'サ') {
    // サ: 사다리 (벽에 기댄 3단 나무 사다리 - 중앙 메인 발판과 두 기둥 다리)
    return (
      <svg viewBox="0 0 200 160" className="w-full h-full select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* 사다리 원목 기둥 그라디언트 */}
          <linearGradient id="ladderWoodGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="35%" stopColor="#F59E0B" />
            <stop offset="70%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#92400E" />
          </linearGradient>

          {/* 중앙 메인 발판 윗면 그라디언트 */}
          <linearGradient id="ladderStepGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FEF3C7" />
            <stop offset="30%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>

          {/* 보조 발판(상/하단) 그라디언트 */}
          <linearGradient id="ladderSubStepGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="50%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#92400E" />
          </linearGradient>

          {/* 가로 발판 전면 두께 그라디언트 */}
          <linearGradient id="ladderStepFrontGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#78350F" />
          </linearGradient>

          {/* 하단 고무 패킹 캡 그라디언트 */}
          <linearGradient id="rubberFootGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#64748B" />
            <stop offset="100%" stopColor="#1E293B" />
          </linearGradient>
        </defs>

        {/* 아늑한 원목 마루 바닥 & 그림자 */}
        <ellipse cx="106" cy="144" rx="66" ry="8" fill="#F1F5F9" />
        <ellipse cx="104" cy="143" rx="46" ry="5.2" fill="#E2E8F0" opacity="0.65" />

        {/* 3획: 오른쪽 비스듬한 기둥 다리 (글자 サ의 3획 삐침과 100% 일치) */}
        <g id="ladder-right-stile">
          {/* 3D 깊이감 입체 그림자 */}
          <path
            d="M 127 24 C 128 68 124 106 109 135 L 118 138 C 134 110 137 68 136 24 Z"
            fill="#78350F"
            opacity="0.22"
          />

          {/* 오른쪽 삐침 다리 메인 프레임 (상단까지 길게 뻗은 원목 기둥) */}
          <path
            d="M 124 24 C 125 68 121 106 106 134 C 105 136 107 138 109 138 L 117 138 C 119 138 121 136 122 134 C 135 106 137 68 136 24 C 136 21 133 19 130 19 L 130 19 C 127 19 124 21 124 24 Z"
            fill="url(#ladderWoodGrad)"
            stroke="#B45309"
            strokeWidth="2"
            strokeLinejoin="round"
          />

          {/* 오른쪽 다리 전면 광택 하이라이트 */}
          <path
            d="M 127 28 C 128 70 124 104 110 132"
            stroke="#FFFFFF"
            strokeWidth="1.8"
            strokeLinecap="round"
            opacity="0.8"
            fill="none"
          />

          {/* 하단 미끄럼 방지 고무 패킹 캡 */}
          <path
            d="M 105 132 C 104 134 105 138 108 139 L 119 139 C 121 138 122 134 121 132 Z"
            fill="url(#rubberFootGrad)"
            stroke="#0F172A"
            strokeWidth="1.2"
          />
        </g>

        {/* 2획: 왼쪽 수직 기둥 다리 (글자 サ의 2획 세로선과 100% 일치) */}
        <g id="ladder-left-stile">
          {/* 수직 기둥 바디 (상단까지 길게 뻗은 원목 기둥) */}
          <rect x="84" y="24" width="12" height="106" rx="4" fill="url(#ladderWoodGrad)" stroke="#B45309" strokeWidth="2" />
          {/* 기둥 전면 광택 하이라이트 */}
          <line x1="86.5" y1="28" x2="86.5" y2="124" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" opacity="0.8" />
          {/* 하단 고무 패킹 캡 */}
          <rect x="83" y="125" width="14" height="7" rx="2" fill="url(#rubberFootGrad)" stroke="#0F172A" strokeWidth="1.2" />
        </g>

        {/* [추가 발판 1] 상단 보조 발판 (사다리 형태 완성) */}
        <g id="ladder-top-rung">
          <rect x="82" y="38" width="48" height="7" rx="2.5" fill="url(#ladderSubStepGrad)" stroke="#B45309" strokeWidth="1.5" />
          <line x1="85" y1="39.5" x2="126" y2="39.5" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" opacity="0.85" />
          {/* 상단 리벳 볼트 */}
          <circle cx="88" cy="41.5" r="1.6" fill="#FEF08A" stroke="#B45309" strokeWidth="1" />
          <circle cx="124" cy="41.5" r="1.6" fill="#FEF08A" stroke="#B45309" strokeWidth="1" />
        </g>

        {/* [추가 발판 2] 하단 보조 발판 (사다리 형태 완성) */}
        <g id="ladder-bottom-rung">
          <rect x="81" y="106" width="37" height="7.5" rx="2.5" fill="url(#ladderSubStepGrad)" stroke="#B45309" strokeWidth="1.5" />
          <line x1="84" y1="107.5" x2="114" y2="107.5" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" opacity="0.85" />
          {/* 하단 리벳 볼트 */}
          <circle cx="87" cy="109.8" r="1.6" fill="#FEF08A" stroke="#B45309" strokeWidth="1" />
          <circle cx="113" cy="109.8" r="1.6" fill="#FEF08A" stroke="#B45309" strokeWidth="1" />
        </g>

        {/* [메인 발판] 1획: 중앙 가로 원목 발판 (글자 サ의 1획 가로선과 100% 일치) */}
        <g id="ladder-main-step-rung">
          {/* 가로 메인 발판 본체 */}
          <rect x="64" y="66" width="84" height="11" rx="4" fill="url(#ladderStepGrad)" stroke="#B45309" strokeWidth="2.2" />
          {/* 발판 전면 두께 3D 입체 음영 */}
          <path d="M 65 73 L 147 73 L 147 75.5 C 147 77.5 145 78.5 143 78.5 L 69 78.5 C 67 78.5 65 77.5 65 75.5 Z" fill="url(#ladderStepFrontGrad)" opacity="0.85" />
          {/* 상단 모서리 햇살 하이라이트 */}
          <line x1="68" y1="67.5" x2="144" y2="67.5" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" opacity="0.9" />
          {/* 자연스러운 나뭇결 디테일 */}
          <line x1="98" y1="70.5" x2="118" y2="70.5" stroke="#D97706" strokeWidth="1" strokeLinecap="round" opacity="0.6" strokeDasharray="6 3" />

          {/* 양쪽 결합부 황동 리벳 볼트 */}
          <circle cx="74" cy="71.5" r="2.2" fill="#FEF08A" stroke="#B45309" strokeWidth="1.2" />
          <circle cx="74" cy="71.5" r="0.8" fill="#B45309" />
          <circle cx="138" cy="71.5" r="2.2" fill="#FEF08A" stroke="#B45309" strokeWidth="1.2" />
          <circle cx="138" cy="71.5" r="0.8" fill="#B45309" />
        </g>

        {/* 발판 위 미니 다육이 화분 소품 (따뜻한 감성 디테일) */}
        <g id="mini-plant" transform="translate(68, 52)">
          {/* 테라코타 화분 */}
          <path d="M 2 11 L 3 16.5 L 11 16.5 L 12 11 Z" fill="#EA580C" stroke="#9A3412" strokeWidth="1" />
          <rect x="1" y="9" width="12" height="2.5" rx="1" fill="#FB923C" stroke="#9A3412" strokeWidth="1" />
          {/* 흙 & 새싹 잎 */}
          <ellipse cx="7" cy="10" rx="4" ry="1" fill="#78350F" />
          <path d="M 7 10 C 5 6 3 6 4 3 C 6 4 7 7 7 10 Z" fill="#22C55E" />
          <path d="M 7 10 C 9 6 11 6 10 3 C 8 4 7 7 7 10 Z" fill="#16A34A" />
          <circle cx="7" cy="4" r="1" fill="#86EFAC" />
        </g>

        {/* 아기자기한 데코: 따스한 햇살 반짝임 스파클 */}
        <g id="sparkles">
          {/* 우상단 황금 스파클 */}
          <path d="M 160 38 L 162 30 L 164 38 L 172 40 L 164 42 L 162 50 L 160 42 L 152 40 Z" fill="#F59E0B" />
          <circle cx="162" cy="40" r="1.5" fill="#FFFFFF" />
          {/* 주변 미니 반짝임 */}
          <circle cx="36" cy="116" r="2" fill="#FBBF24" />
          <circle cx="168" cy="112" r="1.8" fill="#F59E0B" />
        </g>

        {/* 글자 'サ' 오버레이 */}
        <KatakanaCharOverlay char="サ" fontFamily={fontFamily} x="106" y="118" />
      </svg>
    );
  }

  if (char === 'シ') {
    // シ: 시(씨)익 (미니멀 스마일 페이스 - 글자 シ 자체가 두 눈과 씨익 올라간 입꼬리를 완성)
    return (
      <svg viewBox="0 0 200 160" className="w-full h-full select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* 스마일 페이스 부드러운 옐로우 그라디언트 */}
          <linearGradient id="shiFaceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FEF9C3" />
            <stop offset="55%" stopColor="#FDE047" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
        </defs>

        {/* 배경 웜톤 후광 효과 */}
        <circle cx="106" cy="88" r="66" fill="#FEF3C7" opacity="0.4" />

        {/* 미니멀 스마일 원형 얼굴 베이스 */}
        <circle cx="106" cy="88" r="58" fill="url(#shiFaceGrad)" stroke="#F59E0B" strokeWidth="2.5" />

        {/* 이마 상단 부드러운 입체 반사광 */}
        <path d="M 80 44 C 92 37 120 37 132 44" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.75" />

        {/* 양 볼 발그레 핑크 블러셔 (얼굴 형태를 살려주어 글자가 눈과 입꼬리로 즉각 인식됨) */}
        <ellipse cx="62" cy="104" rx="9" ry="6" fill="#FB7185" opacity="0.65" />
        <ellipse cx="150" cy="88" rx="9" ry="6" fill="#FB7185" opacity="0.65" />

        {/* 글자 'シ' 오버레이 (두 눈과 씨익 올라간 입꼬리) */}
        <KatakanaCharOverlay char="シ" fontFamily={fontFamily} x="106" y="118" />
      </svg>
    );
  }

  if (char === 'ス') {
    // ス: 스탠드 (책상 위 각도 조절 스탠드 조명 - 꺾인 전등갓, 메인 관절 기둥과 삼각 지지대 다리)
    return (
      <svg viewBox="0 0 200 160" className="w-full h-full select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* 전등갓 옐로우/앰버 그라디언트 */}
          <linearGradient id="standShadeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="30%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>

          {/* 조명 빛(Light Beam) 그라디언트 */}
          <linearGradient id="standLightBeam" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.75" />
            <stop offset="50%" stopColor="#FDE047" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#FEF9C3" stopOpacity="0.03" />
          </linearGradient>

          {/* 바닥 반사광 타원 그라디언트 */}
          <radialGradient id="standFloorGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.7" />
            <stop offset="60%" stopColor="#FDE047" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#FDE047" stopOpacity="0" />
          </radialGradient>

          {/* 관절 프레임 메탈 그라디언트 */}
          <linearGradient id="standMetalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#64748B" />
            <stop offset="45%" stopColor="#334155" />
            <stop offset="100%" stopColor="#1E293B" />
          </linearGradient>

          {/* 골드 힌지 볼트 그라디언트 */}
          <linearGradient id="standGoldHinge" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FEF9C3" />
            <stop offset="40%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>

          {/* 책상 상판 우드 그라디언트 */}
          <linearGradient id="standDeskWood" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F8FAFC" />
            <stop offset="100%" stopColor="#E2E8F0" />
          </linearGradient>
        </defs>

        {/* 1. 배경 분위기: 책상 상판 및 조명 빛무리 */}
        <g id="desk-environment">
          {/* 전등갓 개구부(림)에서 책상으로 쏟아지는 아늑하고 풍성한 원뿔형 빛 (각도 100% 일치) */}
          <polygon points="32,64 8,127 118,127 52,84" fill="url(#standLightBeam)" />

          {/* 책상 위 바닥 반사광 (빛줄기 중심에 맞춰 자연스럽게 배치) */}
          <ellipse cx="62" cy="127" rx="54" ry="8.5" fill="url(#standFloorGlow)" />

          {/* 책상 상판 라인 */}
          <rect x="14" y="127" width="172" height="6.5" rx="2" fill="url(#standDeskWood)" stroke="#CBD5E1" strokeWidth="1.2" />
          {/* 책상 하단 부드러운 그림자 */}
          <line x1="18" y1="134" x2="182" y2="134" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />

          {/* 책상 위 미니 머그잔 소품 (빛을 받아 따뜻한 감성) */}
          <g id="mini-coffee-mug" transform="translate(30, 114)">
            <rect x="0" y="2" width="11" height="11" rx="2.5" fill="#FFFFFF" stroke="#64748B" strokeWidth="1.2" />
            <path d="M 11 4 C 13.5 4 14.5 5.5 14.5 7.5 C 14.5 9.5 13.5 11 11 11" stroke="#64748B" strokeWidth="1.2" strokeLinecap="round" fill="none" />
            {/* 따뜻한 김 한 줄기 */}
            <path d="M 5 0 C 6 -2 4 -3 5 -5" stroke="#FBBF24" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.8" />
          </g>
        </g>

        {/* 2. 스탠드 전원 케이블 (자연스럽게 늘어진 곡선) */}
        <path
          d="M 68 123 C 62 125 56 128 50 128 C 45 128 42 126 38 128"
          stroke="#94A3B8"
          strokeWidth="1.4"
          strokeLinecap="round"
          fill="none"
          strokeDasharray="3 1.5"
          opacity="0.7"
        />

        {/* 3. 글자 'ス'의 1획과 매칭되는 파트 */}
        {/* [1획 대각선 프레임]: (130, 48)에서 (68, 122)로 시원하게 뻗는 메인 관절 기둥 */}
        <g id="stand-main-arm">
          {/* 메인 관절 기둥 바디 */}
          <line x1="129" y1="48" x2="68" y2="122" stroke="url(#standMetalGrad)" strokeWidth="7" strokeLinecap="round" />
          {/* 금속 광택 하이라이트 */}
          <line x1="128" y1="47" x2="69" y2="120" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.75" />

          {/* 스탠드 텐션 스프링 디테일 (제도 스탠드 특유의 감성) */}
          <line x1="122" y1="56" x2="78" y2="108" stroke="#94A3B8" strokeWidth="1.2" strokeDasharray="2.5 2" opacity="0.85" />

          {/* 왼쪽 다리 바닥 접지 고무 패킹 캡 */}
          <ellipse cx="67" cy="123" rx="5.5" ry="3.5" fill="#0F172A" stroke="#334155" strokeWidth="1.2" />
          <ellipse cx="67" cy="122" rx="3.5" ry="1.8" fill="#475569" />
        </g>

        {/* 4. 글자 'ス'의 2획과 매칭되는 파트 */}
        {/* [2획 대각선 프레임]: 기둥 중앙 (98, 85)에서 (142, 122)로 뻗어 바닥을 지지하는 삼각 받침 다리 */}
        <g id="stand-support-leg">
          {/* 보조 지지대 다리 바디 */}
          <line x1="97" y1="86" x2="142" y2="122" stroke="url(#standMetalGrad)" strokeWidth="6.5" strokeLinecap="round" />
          {/* 금속 광택 하이라이트 */}
          <line x1="97" y1="85" x2="141" y2="121" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.75" />

          {/* 중앙 접합부 힌지 볼트 */}
          <circle cx="97" cy="86" r="4.5" fill="url(#standGoldHinge)" stroke="#78350F" strokeWidth="1.2" />
          <circle cx="97" cy="86" r="1.8" fill="#FEF08A" />

          {/* 오른쪽 다리 바닥 접지 고무 패킹 캡 */}
          <ellipse cx="143" cy="123" rx="5.5" ry="3.5" fill="#0F172A" stroke="#334155" strokeWidth="1.2" />
          <ellipse cx="143" cy="122" rx="3.5" ry="1.8" fill="#475569" />
        </g>

        {/* 5. [1획 가로선 & 대형 전등갓 헤드]: 책상을 향해 자연스럽게 고개를 숙인 스탠드 헤드 */}
        <g id="stand-head-and-shade">
          {/* 수평 연결 암 파이프 (글자 1획 가로선과 일치) */}
          <line x1="72" y1="48" x2="129" y2="48" stroke="url(#standMetalGrad)" strokeWidth="6.5" strokeLinecap="round" />
          <line x1="74" y1="47" x2="126" y2="47" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />

          {/* 우측 상단 메인 회전 관절 힌지 (1획의 꺾임 모서리 포인트) */}
          <circle cx="129" cy="48" r="6.5" fill="url(#standGoldHinge)" stroke="#78350F" strokeWidth="1.5" />
          <circle cx="129" cy="48" r="2.8" fill="#FEF08A" />

          {/* 좌측 전등갓 연결 조인트 (헤드 마운트 볼트) */}
          <circle cx="72" cy="48" r="5" fill="url(#standGoldHinge)" stroke="#78350F" strokeWidth="1.4" />
          <circle cx="72" cy="48" r="2" fill="#FEF08A" />

          {/* 각도 조절 손잡이 윙 너트 (상단 후방 레버) */}
          <path d="M 74 43 L 83 37 C 84.5 36 86 37 86.5 38.5 C 87 40 86 41.5 84.5 42.5 L 76 47 Z" fill="url(#standGoldHinge)" stroke="#78350F" strokeWidth="1.2" />

          {/* 전등갓 소켓 하우징 (금속 넥) */}
          <path d="M 64 43 L 73 49 L 68 57 L 59 51 Z" fill="url(#standMetalGrad)" stroke="#1E293B" strokeWidth="1.3" strokeLinejoin="round" />

          {/* [대형 전등갓(Lamp Shade) 본체] - 책상 바닥을 정면으로 조준하는 완벽한 하향 돔 형태 */}
          <g id="shade-bell">
            {/* 큼직한 전등갓 돔/벨 바디 (책상 왼쪽 아래를 향해 숙인 볼륨감) */}
            <path
              d="M 64 45 C 62 40 54 39 47 43 L 33 55 C 31 57 31 60 33 63 L 50 82 C 52 84 55 84 57 82 L 67 70 C 71 64 70 57 66 51 Z"
              fill="url(#standShadeGrad)"
              stroke="#B45309"
              strokeWidth="2.4"
              strokeLinejoin="round"
            />

            {/* 전등갓 방열 슬릿 디테일 3줄 */}
            <line x1="56" y1="47" x2="61" y2="52" stroke="#B45309" strokeWidth="1.6" strokeLinecap="round" />
            <line x1="50" y1="53" x2="55" y2="58" stroke="#B45309" strokeWidth="1.6" strokeLinecap="round" />
            <line x1="44" y1="59" x2="49" y2="64" stroke="#B45309" strokeWidth="1.6" strokeLinecap="round" />

            {/* 전등갓 상단 풍성한 3D 하이라이트 광택선 */}
            <path d="M 47 43 C 40 48 35 55 34 58" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />

            {/* 전등갓 와이드 개구부 림(Rim) - 책상(하향)을 향해 비스듬히 열린 테두리 */}
            <ellipse cx="42" cy="73" rx="7" ry="16" transform="rotate(-43, 42, 73)" fill="#FEF08A" stroke="#B45309" strokeWidth="2" />

            {/* 갓 안쪽 둥글고 밝은 발광 전구(Bulb) */}
            <ellipse cx="44" cy="71" rx="4.5" ry="10" transform="rotate(-43, 44, 71)" fill="#FFFFFF" />
            <circle cx="44" cy="71" r="5.5" fill="#FEF08A" opacity="0.75" />
          </g>
        </g>

        {/* 따뜻한 스탠드 감성 스파클 */}
        <g id="stand-sparkles">
          <circle cx="44" cy="94" r="1.8" fill="#FBBF24" opacity="0.9" />
          <circle cx="85" cy="104" r="1.4" fill="#FDE047" opacity="0.8" />
          <path d="M 20 74 L 21.5 70 L 23 74 L 27 75.5 L 23 77 L 21.5 81 L 20 77 L 16 75.5 Z" fill="#F59E0B" opacity="0.85" />
        </g>

        {/* 글자 'ス' 오버레이 (꺾인 갓/기둥과 지지대 다리 위에 완벽하게 결합) */}
        <KatakanaCharOverlay char="ス" fontFamily={fontFamily} x="106" y="118" />
      </svg>
    );
  }

  if (char === 'セ') {
    // セ: 세발자전거 (★ 상단 핸들바, L자형 조향 및 바닥 프레임, 수직 안장 기둥이 글자 'セ'와 100% 일치!)
    return (
      <svg viewBox="0 0 200 160" className="w-full h-full select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* 자전거 메인 프레임 그라디언트 (산뜻한 스포티 오렌지-코랄) */}
          <linearGradient id="trikeFrameGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FB923C" />
            <stop offset="50%" stopColor="#F97316" />
            <stop offset="100%" stopColor="#EA580C" />
          </linearGradient>

          {/* 안장 가죽 엠보싱 그라디언트 */}
          <linearGradient id="trikeSaddleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FED7AA" />
            <stop offset="40%" stopColor="#FDBA74" />
            <stop offset="100%" stopColor="#EA580C" />
          </linearGradient>

          {/* 메탈 크롬/알루미늄 림 그라디언트 */}
          <linearGradient id="trikeMetalGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E2E8F0" />
            <stop offset="50%" stopColor="#94A3B8" />
            <stop offset="100%" stopColor="#64748B" />
          </linearGradient>
        </defs>

        {/* 바닥 지면 그림자 */}
        <ellipse cx="108" cy="138" rx="60" ry="6" fill="#F1F5F9" />
        <ellipse cx="78" cy="138" rx="18" ry="3.5" fill="#E2E8F0" opacity="0.8" />
        <ellipse cx="138" cy="138" rx="16" ry="3.2" fill="#E2E8F0" opacity="0.8" />

        {/* 1. 뒤쪽 보조 뒷바퀴 (원근감 살짝 뒤편 배치) */}
        <g id="trike-rear-wheel-far">
          <circle cx="146" cy="112" r="14" fill="#F8FAFC" stroke="#64748B" strokeWidth="2.5" />
          <circle cx="146" cy="112" r="8" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="2 2" />
          <circle cx="146" cy="112" r="3.5" fill="#94A3B8" />
          {/* 뒤축 연결 바 */}
          <line x1="138" y1="116" x2="146" y2="112" stroke="#94A3B8" strokeWidth="2.8" strokeLinecap="round" />
        </g>

        {/* 2. 자전거 L자형 메인 차체 프레임 (글자 'セ'의 왼쪽 세로 + 바닥 꺾임 획) */}
        <g id="trike-main-frame">
          {/* 앞바퀴 조향 포크에서 바닥 체인스테이로 이어지는 L자형 두꺼운 튜브 */}
          <path
            d="M 82 64 L 82 116 L 138 116"
            stroke="url(#trikeFrameGrad)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* 프레임 하이라이트 라인 */}
          <path
            d="M 83 66 L 83 115 L 136 115"
            stroke="#FED7AA"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.85"
          />
        </g>

        {/* 3. 안장 기둥 및 안장 (글자 'セ'의 오른쪽 세로 관통 획) */}
        <g id="trike-saddle-assembly">
          {/* 안장 수직 지지 파이프 (핸들 가로선을 가로질러 바닥 프레임까지 곧게 연결) */}
          <line x1="118" y1="52" x2="118" y2="116" stroke="url(#trikeFrameGrad)" strokeWidth="4.8" strokeLinecap="round" />
          <line x1="117.2" y1="54" x2="117.2" y2="114" stroke="#FED7AA" strokeWidth="1.2" strokeLinecap="round" opacity="0.85" />

          {/* 안장 브래킷 클램프 */}
          <rect x="114" y="52" width="8" height="3.5" rx="1" fill="#475569" />

          {/* 도톰하고 푹신한 유아용 안장 (Saddle) */}
          <path
            d="M 104 52 C 104 44 132 44 132 52 C 132 56 125 56 118 56 C 111 56 104 56 104 52 Z"
            fill="url(#trikeSaddleGrad)"
            stroke="#EA580C"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {/* 안장 상단 스티치/하이라이트 */}
          <path d="M 109 48 C 114 46 122 46 127 48" stroke="#FFFFFF" strokeWidth="1.3" strokeLinecap="round" opacity="0.75" />
        </g>

        {/* 4. 앞쪽 메인 바퀴 & 페달 (앞바퀴 구동) */}
        <g id="trike-front-wheel">
          {/* 타이어 고무 외경 */}
          <circle cx="78" cy="116" r="20" fill="#F8FAFC" stroke="#334155" strokeWidth="3.5" />
          {/* 림 (Rim) */}
          <circle cx="78" cy="116" r="14" stroke="#CBD5E1" strokeWidth="1.5" />
          {/* 스포크(바퀴살) */}
          <line x1="64" y1="116" x2="92" y2="116" stroke="#94A3B8" strokeWidth="1" />
          <line x1="78" y1="102" x2="78" y2="130" stroke="#94A3B8" strokeWidth="1" />
          <line x1="68" y1="106" x2="88" y2="126" stroke="#94A3B8" strokeWidth="1" />
          <line x1="68" y1="126" x2="88" y2="106" stroke="#94A3B8" strokeWidth="1" />
          {/* 중앙 허브 캡 */}
          <circle cx="78" cy="116" r="4.5" fill="#F59E0B" stroke="#D97706" strokeWidth="1" />

          {/* 페달 크랭크 축 & 발판 페달 */}
          <line x1="78" y1="116" x2="68" y2="125" stroke="#64748B" strokeWidth="2.5" strokeLinecap="round" />
          <rect x="62" y="123" width="10" height="4.5" rx="1.5" fill="#EA580C" stroke="#C2410C" strokeWidth="0.8" />
        </g>

        {/* 5. 오른쪽 메인 뒷바퀴 */}
        <g id="trike-rear-wheel-near">
          <circle cx="138" cy="118" r="16" fill="#F8FAFC" stroke="#334155" strokeWidth="3.2" />
          <circle cx="138" cy="118" r="10.5" stroke="#CBD5E1" strokeWidth="1.2" />
          {/* 바퀴살 */}
          <line x1="127" y1="118" x2="149" y2="118" stroke="#94A3B8" strokeWidth="1" />
          <line x1="138" y1="107" x2="138" y2="129" stroke="#94A3B8" strokeWidth="1" />
          <circle cx="138" cy="118" r="4" fill="#F59E0B" stroke="#D97706" strokeWidth="1" />
        </g>

        {/* 6. 상단 핸들바 (글자 'セ'의 상단 가로 획과 1:1 완벽 일치) */}
        <g id="trike-handlebar">
          {/* 가로 핸들바 메인 바 */}
          <line x1="66" y1="64" x2="140" y2="64" stroke="url(#trikeMetalGrad)" strokeWidth="4.2" strokeLinecap="round" />
          {/* 왼쪽 고무 핸들 그립 */}
          <rect x="63" y="61" width="11" height="6" rx="2" fill="#F59E0B" stroke="#D97706" strokeWidth="0.8" />
          {/* 오른쪽 고무 핸들 그립 */}
          <rect x="132" y="61" width="11" height="6" rx="2" fill="#F59E0B" stroke="#D97706" strokeWidth="0.8" />

          {/* 중앙 조향 헤드튜브 조인트 */}
          <circle cx="82" cy="64" r="3.8" fill="#475569" />

          {/* 핸들 위 앙증맞은 땡땡이 자전거 벨 */}
          <path d="M 74 61 C 74 55 82 55 82 61 Z" fill="#E2E8F0" stroke="#64748B" strokeWidth="1.2" />
          <line x1="82" y1="58" x2="85" y2="56" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" />
          {/* 벨 반짝임 */}
          <circle cx="72" cy="53" r="1.5" fill="#FBBF24" />
        </g>

        {/* 7. 경쾌하게 앞으로 씽씽 달리는 속도감/바람 효과 */}
        <g id="speed-lines" opacity="0.75">
          <line x1="52" y1="112" x2="42" y2="112" stroke="#93C5FD" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="48" y1="120" x2="34" y2="120" stroke="#93C5FD" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="38" cy="115" r="1.2" fill="#60A5FA" />
        </g>

        {/* 글자 'セ' 오버레이 (핸들 가로선, L자 프레임, 안장 기둥과 1:1 완벽 결합) */}
        <KatakanaCharOverlay char="セ" fontFamily={fontFamily} x="106" y="118" />
      </svg>
    );
  }

  if (char === 'ソ') {
    // ソ: 소뿔 (★ 핵심: 씩씩한 황소의 양쪽 뿔! 1획은 왼쪽 작은 뿔, 2획은 오른쪽으로 길게 뻗은 대장 뿔)
    return (
      <svg viewBox="0 0 200 160" className="w-full h-full select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* 황소 가죽 코트 웜 브라운 그라디언트 */}
          <linearGradient id="bullCoatGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="40%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#92400E" />
          </linearGradient>

          {/* 황소 얼굴 입체감 그라디언트 */}
          <linearGradient id="bullFaceGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FBBF24" />
            <stop offset="50%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>

          {/* 황금빛 소뿔 그라디언트 (우아하고 단단한 상아/골드 텍스처) */}
          <linearGradient id="hornGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFBEB" />
            <stop offset="25%" stopColor="#FEF3C7" />
            <stop offset="60%" stopColor="#FDE047" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>

          {/* 주둥이 크림 베이지 그라디언트 */}
          <linearGradient id="snoutGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFBEB" />
            <stop offset="100%" stopColor="#FEF3C7" />
          </linearGradient>

          {/* 황금 코뚜레 링 그라디언트 */}
          <linearGradient id="goldRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="45%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>
        </defs>

        {/* 1. 바닥 그림자 & 따스한 배경 무드 */}
        <ellipse cx="106" cy="146" rx="64" ry="7.5" fill="#F1F5F9" />
        <ellipse cx="106" cy="145" rx="44" ry="5" fill="#E2E8F0" opacity="0.6" />
        <circle cx="106" cy="88" r="60" fill="#FEF3C7" opacity="0.35" />

        {/* 2. 듬직한 황소 어깨 & 가슴 실루엣 */}
        <g id="bull-body">
          <path
            d="M 64 144 C 64 124 84 116 106 116 C 128 116 148 124 148 144 Z"
            fill="url(#bullCoatGrad)"
            stroke="#78350F"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {/* 가슴 흰색 포인트 털 패치 */}
          <path
            d="M 94 134 C 100 128 112 128 118 134 C 114 142 98 142 94 134 Z"
            fill="#FEF3C7"
            opacity="0.85"
          />
        </g>

        {/* 3. 양쪽 쫑긋한 귀 */}
        <g id="bull-ears">
          {/* 왼쪽 귀 */}
          <g>
            <path
              d="M 76 92 C 58 88 50 98 54 106 C 60 112 74 104 76 98 Z"
              fill="#B45309"
              stroke="#78350F"
              strokeWidth="1.8"
            />
            <path d="M 72 94 C 60 92 56 98 58 103 C 62 106 70 101 72 97 Z" fill="#FDA4AF" />
          </g>

          {/* 오른쪽 귀 */}
          <g>
            <path
              d="M 136 92 C 154 88 162 98 158 106 C 152 112 138 104 136 98 Z"
              fill="#B45309"
              stroke="#78350F"
              strokeWidth="1.8"
            />
            <path d="M 140 94 C 152 92 156 98 154 103 C 150 106 142 101 140 97 Z" fill="#FDA4AF" />
          </g>
        </g>

        {/* 4. 소뿔 (Horns - 가타카나 'ソ'의 획과 1:1 완벽 일치!) */}
        <g id="bull-horns">
          {/* [1획] 왼쪽 뿔: 위로 날렵하게 솟구친 작은 뿔 (글자 ソ의 1획 짧은 점과 100% 매칭) */}
          <g id="horn-left">
            {/* 3D 깊이감 그림자 */}
            <path
              d="M 80 82 C 78 70 85 58 92 52 C 95 60 100 70 98 84 Z"
              fill="#78350F"
              opacity="0.2"
              transform="translate(1.5, 2)"
            />
            {/* 왼쪽 뿔 본체 */}
            <path
              d="M 81 83 C 80 69 86 58 92 52 C 96 60 100 71 97 84 Z"
              fill="url(#hornGrad)"
              stroke="#B45309"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            {/* 왼쪽 뿔 모서리 입체 광택 하이라이트 */}
            <path
              d="M 85 78 C 85 68 89 60 92 54"
              stroke="#FFFFFF"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.85"
            />
            {/* 뿔 마디 가로 결 주름 (단단한 질감) */}
            <line x1="84" y1="73" x2="94" y2="76" stroke="#D97706" strokeWidth="1" strokeLinecap="round" opacity="0.75" />
            <line x1="86" y1="67" x2="92" y2="69" stroke="#D97706" strokeWidth="1" strokeLinecap="round" opacity="0.75" />
          </g>

          {/* [2획] 오른쪽 뿔: 우상단에서부터 머리/뺨을 향해 길게 뻗어 내린 대장 뿔 (글자 ソ의 2획 긴 삐침과 100% 매칭) */}
          <g id="horn-right">
            {/* 3D 깊이감 입체 그림자 */}
            <path
              d="M 128 50 C 134 62 134 82 118 104 C 104 120 90 128 82 132 C 86 128 98 116 110 98 C 122 80 122 62 128 50 Z"
              fill="#78350F"
              opacity="0.2"
              transform="translate(2, 2.5)"
            />
            {/* 오른쪽 대장 뿔 메인 바디 프레임 (우상단 뾰족한 끝 ➔ 좌하단 삐침 궤적과 100% 일치) */}
            <path
              d="M 127 50 C 133 64 131 82 116 102 C 103 118 89 126 82 130 C 86 126 97 115 108 97 C 120 78 120 62 127 50 Z"
              fill="url(#hornGrad)"
              stroke="#B45309"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            {/* 뿔 전면부 매끄러운 골드 광택 하이라이트 곡선 */}
            <path
              d="M 125 54 C 128 66 125 80 113 98 C 102 114 91 122 85 127"
              stroke="#FFFFFF"
              strokeWidth="1.8"
              strokeLinecap="round"
              opacity="0.85"
            />
            {/* 뿔 마디 주름선들 */}
            <line x1="122" y1="68" x2="130" y2="72" stroke="#D97706" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
            <line x1="114" y1="84" x2="124" y2="87" stroke="#D97706" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
            <line x1="102" y1="102" x2="112" y2="105" stroke="#D97706" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
          </g>
        </g>

        {/* 5. 황소 얼굴 본체 (Face) */}
        <g id="bull-face">
          {/* 머리 윤곽 베이스 */}
          <path
            d="M 80 84 C 74 94 74 110 82 120 C 90 128 122 128 130 120 C 138 110 138 94 132 84 C 122 80 90 80 80 84 Z"
            fill="url(#bullFaceGrad)"
            stroke="#78350F"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />

          {/* 이마 위 보슬보슬한 황금빛 털 뭉치 (Fluffy Tuft) */}
          <path
            d="M 97 82 C 95 76 101 72 106 73 C 111 72 117 76 115 82 C 119 84 118 90 113 91 C 109 92 103 92 99 91 C 95 89 95 85 97 82 Z"
            fill="#FEF3C7"
            stroke="#D97706"
            strokeWidth="1.3"
          />

          {/* 듬직하고 초롱초롱한 눈 & 씩씩한 눈썹 */}
          <g id="bull-eyes">
            {/* 눈썹 */}
            <path d="M 87 95 C 90 94 96 97 97 98" stroke="#78350F" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M 125 95 C 122 94 116 97 115 98" stroke="#78350F" strokeWidth="1.8" strokeLinecap="round" />

            {/* 왼쪽 눈 */}
            <circle cx="92" cy="103" r="3.6" fill="#1E293B" />
            <circle cx="91" cy="101.8" r="1.2" fill="#FFFFFF" />
            <circle cx="93.2" cy="104.2" r="0.6" fill="#FFFFFF" />

            {/* 오른쪽 눈 */}
            <circle cx="120" cy="103" r="3.6" fill="#1E293B" />
            <circle cx="119" cy="101.8" r="1.2" fill="#FFFFFF" />
            <circle cx="121.2" cy="104.2" r="0.6" fill="#FFFFFF" />

            {/* 발그레 핑크 볼터치 */}
            <ellipse cx="83" cy="111" rx="5" ry="3.2" fill="#FB7185" opacity="0.65" />
            <ellipse cx="129" cy="111" rx="5" ry="3.2" fill="#FB7185" opacity="0.65" />
          </g>

          {/* 크림색 주둥이 (Snout) & 콧구멍 */}
          <g id="bull-snout">
            <ellipse cx="106" cy="120" rx="19" ry="12.5" fill="url(#snoutGrad)" stroke="#D97706" strokeWidth="1.8" />
            {/* 콧구멍 2개 */}
            <ellipse cx="99.5" cy="117.5" rx="2.5" ry="3.2" fill="#78350F" />
            <ellipse cx="112.5" cy="117.5" rx="2.5" ry="3.2" fill="#78350F" />

            {/* 씩씩한 황금 코뚜레 링 (Golden Nose Ring) */}
            <ellipse cx="106" cy="127" rx="7" ry="6.5" fill="none" stroke="url(#goldRingGrad)" strokeWidth="2.5" />
            <line x1="103" y1="122" x2="109" y2="122" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" opacity="0.8" />
          </g>

          {/* 씩씩하게 뿜어져 나오는 앙증맞은 콧김 (Steam Puffs) */}
          <g id="steam-puffs" opacity="0.75">
            <circle cx="85" cy="123" r="2.5" fill="#E2E8F0" />
            <circle cx="79" cy="125" r="3.5" fill="#E2E8F0" />
            <circle cx="73" cy="126" r="2" fill="#CBD5E1" />

            <circle cx="127" cy="123" r="2.5" fill="#E2E8F0" />
            <circle cx="133" cy="125" r="3.5" fill="#E2E8F0" />
            <circle cx="139" cy="126" r="2" fill="#CBD5E1" />
          </g>
        </g>

        {/* 6. 반짝이는 스파클 데코 (황금빛 기운) */}
        <g id="sparkles">
          {/* 우상단 황금 스파클 (대장 뿔 팁 강조) */}
          <path d="M 148 42 L 150 34 L 152 42 L 160 44 L 152 46 L 150 54 L 148 46 L 140 44 Z" fill="#F59E0B" />
          <circle cx="150" cy="44" r="1.5" fill="#FFFFFF" />

          {/* 좌상단 미니 반짝임 */}
          <circle cx="68" cy="52" r="2" fill="#FBBF24" />
          <circle cx="46" cy="128" r="2.2" fill="#F59E0B" opacity="0.6" />
          <circle cx="166" cy="124" r="2" fill="#F59E0B" opacity="0.6" />
        </g>

        {/* 7. 글자 'ソ' 오버레이 (황소의 양쪽 뿔과 1:1 완벽 결합) */}
        <KatakanaCharOverlay char="ソ" fontFamily={fontFamily} x="106" y="118" />
      </svg>
    );
  }

  return null;
}
