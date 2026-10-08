import React from 'react';
import { KatakanaMnemonicSvgChildProps } from './types';
import KatakanaCharOverlay from './KatakanaCharOverlay';

export default function KatakanaRowKa({ char, fontFamily }: KatakanaMnemonicSvgChildProps) {
  if (char === 'カ') {
    // カ: 카메라 (히라가나 か에서 오른쪽 점만 빠진 동일 형태 - 카메라 바디와 렌즈 재활용)
    return (
      <svg viewBox="0 0 200 160" className="w-full h-full select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* 카메라 본체 프레임 */}
        <rect x="38" y="56" width="124" height="76" rx="14" fill="#FAFAF9" stroke="#78716C" strokeWidth="1.8" />
        {/* 상단 셔터 버튼 */}
        <rect x="126" y="46" width="20" height="10" rx="3" fill="#E7E5E4" stroke="#78716C" strokeWidth="1.6" />
        {/* 플래시 창 */}
        <rect x="52" y="66" width="16" height="10" rx="2" fill="#FEF08A" stroke="#78716C" strokeWidth="1.3" />
        {/* 원형 렌즈 림 & 렌즈 반사광 */}
        <circle cx="100" cy="95" r="26" fill="#FFFFFF" stroke="#78716C" strokeWidth="1.8" />
        <circle cx="100" cy="95" r="18" stroke="#D6D3D1" strokeWidth="1.5" />
        <path d="M 92 84 C 104 80 114 88 114 98" stroke="#38BDF8" strokeWidth="2.2" strokeLinecap="round" />

        {/* 글자 'カ' 오버레이 (점 없는 가타카나 カ로 직접 매칭!) */}
        <KatakanaCharOverlay char="カ" fontFamily={fontFamily} x="106" y="118" />
      </svg>
    );
  }

  if (char === 'キ') {
    // キ: 키 / 열쇠 (상단 황금 손잡이 링, 2단 톱니 날, 곧은 축으로 구성된 완벽한 황금 열쇠)
    return (
      <svg viewBox="0 0 200 160" className="w-full h-full select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* 배경 앤틱 에스커천 (열쇠 구멍 장식 플레이트) */}
        <rect
          x="54"
          y="20"
          width="104"
          height="124"
          rx="22"
          fill="#FFFDF5"
          stroke="#FDE68A"
          strokeWidth="1.5"
          strokeDasharray="4 3"
          opacity="0.85"
        />
        {/* 클래식 열쇠 구멍(Keyhole) 깊이감 있는 음영 */}
        <path
          d="M 106 50 C 95 50 87 58 87 68 C 87 74 91 80 95 84 L 91 116 C 91 121 95 125 106 125 C 117 125 121 121 121 116 L 117 84 C 121 80 125 74 125 68 C 125 58 117 50 106 50 Z"
          fill="#FEF3C7"
          stroke="#FCD34D"
          strokeWidth="1.5"
        />
        <circle cx="106" cy="68" r="9" fill="#FDE68A" opacity="0.6" />

        {/* 열쇠 상단 앤틱 황금 손잡이 헤드 (Bow - 삼엽문 트레포일 디자인) */}
        <g id="key-head">
          {/* 손잡이 최상단 작은 걸이용 고리 */}
          <circle cx="112" cy="7" r="5" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1.5" />
          <circle cx="112" cy="7" r="2.2" fill="#FFFDF5" stroke="#CA8A04" strokeWidth="1.2" />

          {/* 앤틱 삼엽문 헤드 외곽 루프들 */}
          {/* 좌측 루프 */}
          <circle cx="100" cy="21" r="8" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1.8" />
          <circle cx="100" cy="21" r="4" fill="#FFFDF5" stroke="#CA8A04" strokeWidth="1.2" />
          {/* 우측 루프 */}
          <circle cx="124" cy="21" r="8" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1.8" />
          <circle cx="124" cy="21" r="4" fill="#FFFDF5" stroke="#CA8A04" strokeWidth="1.2" />
          {/* 중앙 메인 링 */}
          <circle cx="112" cy="21" r="12" fill="#FDE047" stroke="#CA8A04" strokeWidth="2" />
          <circle cx="112" cy="21" r="6" fill="#FFFDF5" stroke="#CA8A04" strokeWidth="1.5" />
          {/* 손잡이 하단 연결 칼라 (글자 세로획 시작점으로 매끄럽게 연결) */}
          <rect x="106" y="32" width="12" height="5" rx="1.5" fill="#FACC15" stroke="#CA8A04" strokeWidth="1.5" />
        </g>

        {/* 열쇠 중앙 기둥 자루 (글자 キ의 세로 비스듬한 기둥과 정확히 일치) */}
        <line x1="112" y1="36" x2="98" y2="134" stroke="#CA8A04" strokeWidth="6" strokeLinecap="round" />
        <line x1="112" y1="37" x2="98" y2="133" stroke="#FEF08A" strokeWidth="2.8" strokeLinecap="round" />

        {/* 하단 끝단 팁 볼 (Tip) */}
        <circle cx="98" cy="136" r="5" fill="#FACC15" stroke="#CA8A04" strokeWidth="1.8" />
        <circle cx="96.5" cy="134.5" r="1.5" fill="#FFFFFF" />

        {/* 1단 상단 톱니 날 (글자 キ의 첫 번째 가로 획 매칭) */}
        <g id="key-bit-top">
          {/* 기본 가로 바디 */}
          <rect x="74" y="58" width="70" height="7.5" rx="3" fill="#FDE047" stroke="#CA8A04" strokeWidth="1.8" />
          {/* 좌측 둥근 캡 포인트 */}
          <circle cx="74" cy="61.7" r="3" fill="#FACC15" stroke="#CA8A04" strokeWidth="1.5" />
          {/* 우측 톱니 이빨 (Key Teeth Cuts) */}
          <rect x="134" y="52" width="7" height="7" rx="1.5" fill="#FDE047" stroke="#CA8A04" strokeWidth="1.5" />
          <rect x="125" y="64" width="6" height="6" rx="1.5" fill="#FDE047" stroke="#CA8A04" strokeWidth="1.5" />
          {/* 톱니 홈 디테일 */}
          <rect x="131" y="58" width="4" height="4" fill="#FFFFFF" stroke="#CA8A04" strokeWidth="1" />
        </g>

        {/* 2단 하단 톱니 날 (글자 キ의 두 번째 가로 획 매칭) */}
        <g id="key-bit-bottom">
          {/* 기본 가로 바디 (상단보다 약간 더 김) */}
          <rect x="68" y="78" width="80" height="7.5" rx="3" fill="#FDE047" stroke="#CA8A04" strokeWidth="1.8" />
          {/* 좌측 둥근 캡 포인트 */}
          <circle cx="68" cy="81.7" r="3" fill="#FACC15" stroke="#CA8A04" strokeWidth="1.5" />
          {/* 우측 메인 톱니 이빨 (Double Step Teeth) */}
          <rect x="142" y="72" width="7" height="8" rx="1.5" fill="#FDE047" stroke="#CA8A04" strokeWidth="1.5" />
          <rect x="132" y="84" width="7" height="6" rx="1.5" fill="#FDE047" stroke="#CA8A04" strokeWidth="1.5" />
          <rect x="147" y="78" width="4" height="8" rx="1" fill="#FDE047" stroke="#CA8A04" strokeWidth="1.2" />
          {/* 톱니 홈 디테일 */}
          <rect x="138" y="78" width="5" height="4" fill="#FFFFFF" stroke="#CA8A04" strokeWidth="1" />
        </g>

        {/* 영롱한 황금빛 반짝임 별빛 (Sparkles) */}
        <g id="sparkle-1">
          <path d="M 154 42 L 156 34 L 158 42 L 166 44 L 158 46 L 156 54 L 154 46 L 146 44 Z" fill="#F59E0B" />
          <circle cx="156" cy="44" r="1.6" fill="#FFFFFF" />
        </g>
        <g id="sparkle-2">
          <path d="M 68 34 L 69 29 L 70 34 L 75 35 L 70 36 L 69 41 L 68 36 L 63 35 Z" fill="#FACC15" />
        </g>
        <circle cx="156" cy="98" r="2.2" fill="#FACC15" />

        {/* 글자 'キ' 오버레이 */}
        <KatakanaCharOverlay char="キ" fontFamily={fontFamily} x="106" y="118" />
      </svg>
    );
  }

  if (char === 'ク') {
    // ク: 쿠폰 (COUPON - 가위 ✂️로 점선을 따라 각지게 싹둑 오려내는 할인 쿠폰 티켓)
    return (
      <svg viewBox="0 0 200 160" className="w-full h-full select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* 바닥 부드러운 그림자 */}
        <ellipse cx="102" cy="144" rx="72" ry="8" fill="#F1F5F9" />

        {/* 쿠폰 티켓 본체 프레임 (양옆에 반원 펀칭 홈이 있는 클래식 쿠폰) */}
        <path
          d="M 38 34 
             L 166 34 
             C 172 34 176 38 176 44 
             L 176 72 
             C 168 72 162 76 162 82 
             C 162 88 168 92 176 92 
             L 176 122 
             C 176 128 172 132 166 132 
             L 38 132 
             C 32 132 28 128 28 122 
             L 28 92 
             C 36 92 42 88 42 82 
             C 42 76 36 72 28 72 
             L 28 44 
             C 28 38 32 34 38 34 Z"
          fill="#FFF7ED"
          stroke="#F97316"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />

        {/* 내부 점선 장식 테두리 */}
        <path
          d="M 44 40 L 160 40 L 160 126 L 44 126 Z"
          stroke="#FDBA74"
          strokeWidth="1.2"
          strokeDasharray="4 3"
        />

        {/* 상단 쿠폰 타이틀 헤더 */}
        <g id="coupon-header">
          <rect x="48" y="44" width="56" height="14" rx="3" fill="#FFEDD5" />
          <text x="76" y="54" fill="#C2410C" fontSize="8.5" fontWeight="900" textAnchor="middle" letterSpacing="0.8px">
            COUPON
          </text>
          {/* 우측 50% OFF 뱃지 */}
          <rect x="126" y="43" width="32" height="15" rx="3.5" fill="#EA580C" />
          <text x="142" y="54" fill="#FFFFFF" fontSize="8.5" fontWeight="900" textAnchor="middle">
            50%
          </text>
        </g>

        {/* 하단 바코드 & 쿠폰 코드 */}
        <g id="coupon-barcode">
          <line x1="48" y1="114" x2="48" y2="124" stroke="#9A3412" strokeWidth="1.8" />
          <line x1="52" y1="114" x2="52" y2="124" stroke="#9A3412" strokeWidth="1" />
          <line x1="55" y1="114" x2="55" y2="124" stroke="#9A3412" strokeWidth="2.5" />
          <line x1="60" y1="114" x2="60" y2="124" stroke="#9A3412" strokeWidth="1.2" />
          <line x1="64" y1="114" x2="64" y2="124" stroke="#9A3412" strokeWidth="2" />
          <line x1="68" y1="114" x2="68" y2="124" stroke="#9A3412" strokeWidth="1" />
          <line x1="72" y1="114" x2="72" y2="124" stroke="#9A3412" strokeWidth="2.2" />
          <text x="82" y="122" fill="#EA580C" fontSize="7.5" fontWeight="bold">
            ★ KU-777 ★
          </text>
        </g>

        {/* 글자 ク 모양의 각진 절취선 배경 섀도우 / 티켓 조각 */}
        <path
          d="M 74 54 L 140 56 C 144 76 136 102 88 130 C 96 104 100 80 74 54 Z"
          fill="#FED7AA"
          opacity="0.5"
        />

        {/* ク 모양을 따르는 또렷한 오렌지 절취 점선들 (Perforations) */}
        {/* 1획 삐침 절취선 */}
        <line
          x1="98"
          y1="50"
          x2="74"
          y2="82"
          stroke="#EA580C"
          strokeWidth="2.4"
          strokeDasharray="4 3"
          strokeLinecap="round"
        />
        {/* 2획 가로 & 우하향 곡선 절취선 */}
        <path
          d="M 74 62 L 136 62 C 140 84 132 108 84 130"
          stroke="#EA580C"
          strokeWidth="2.8"
          strokeDasharray="5 3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 오려내는 가위 (Scissors ✂️) 아이콘 */}
        <g id="scissors" transform="translate(142, 54) rotate(-25)">
          {/* 가위 날 1 */}
          <line x1="0" y1="2" x2="16" y2="-4" stroke="#64748B" strokeWidth="2" strokeLinecap="round" />
          {/* 가위 날 2 */}
          <line x1="0" y1="-2" x2="16" y2="4" stroke="#64748B" strokeWidth="2" strokeLinecap="round" />
          {/* 중심 조임 볼트 */}
          <circle cx="5" cy="0" r="1.5" fill="#EA580C" />
          {/* 손잡이 링 1 */}
          <ellipse cx="-4" cy="5" rx="4" ry="3" fill="#FED7AA" stroke="#EA580C" strokeWidth="1.5" />
          {/* 손잡이 링 2 */}
          <ellipse cx="-4" cy="-5" rx="4" ry="3" fill="#FED7AA" stroke="#EA580C" strokeWidth="1.5" />
        </g>

        {/* 반짝임 별빛 (Sparkles) */}
        <path d="M 154 84 L 155 80 L 156 84 L 160 85 L 156 86 L 155 90 L 154 86 L 150 85 Z" fill="#F97316" />
        <circle cx="134" cy="116" r="1.5" fill="#F97316" />

        {/* 글자 'ク' 오버레이 */}
        <KatakanaCharOverlay char="ク" fontFamily={fontFamily} x="106" y="118" />
      </svg>
    );
  }

  if (char === 'ケ') {
    // ケ: 케이크 (칼로 자른 각진 조각 케이크와 생크림 딸기)
    return (
      <svg viewBox="0 0 200 160" className="w-full h-full select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* 접시 베이스 */}
        <ellipse cx="106" cy="136" rx="54" ry="8" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1.5" />

        {/* 조각 케이크 옆면/단면 (글자 ケ의 긴 세로선과 가로 나이프 궤적) */}
        <path
          d="M 72 48 L 144 80 L 144 124 L 72 96 Z"
          fill="#FFFBEB"
          stroke="#F59E0B"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {/* 케이크 윗면 */}
        <path d="M 72 48 L 110 36 L 144 80 Z" fill="#FEE2E2" stroke="#F87171" strokeWidth="2" />

        {/* 상단 딸기 */}
        <circle cx="106" cy="40" r="7" fill="#EF4444" />
        <path d="M 103 33 L 106 30 L 109 33 Z" fill="#16A34A" />

        {/* 자르는 나이프 실루엣 (글자 ケ의 왼쪽 삐침과 가로선 매칭) */}
        <line x1="60" y1="36" x2="82" y2="84" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />
        <line x1="74" y1="62" x2="148" y2="62" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />

        {/* 글자 'ケ' 오버레이 */}
        <KatakanaCharOverlay char="ケ" fontFamily={fontFamily} x="106" y="118" />
      </svg>
    );
  }

  if (char === 'コ') {
    // コ: 코너 (직각으로 꺾인 도로 모퉁이 코너와 코너 표지판)
    return (
      <svg viewBox="0 0 200 160" className="w-full h-full select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* 직각 코너 도로 블록 (글자 コ의 ㄷ자 형태 실루엣) */}
        <path
          d="M 62 48 L 144 48 L 144 80 L 102 80 L 102 108 L 144 108 L 144 136 L 62 136 Z"
          fill="#F1F5F9"
          stroke="#475569"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {/* 노란색 중앙선 코너 회전 궤적 */}
        <path d="M 76 64 L 128 64 L 128 122 L 76 122" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" strokeDasharray="8 5" />

        {/* 코너 회전 알림 화살표 깃발 */}
        <path d="M 148 44 L 162 54 L 148 64 Z" fill="#3B82F6" />

        {/* 글자 'コ' 오버레이 */}
        <KatakanaCharOverlay char="コ" fontFamily={fontFamily} x="106" y="118" />
      </svg>
    );
  }

  return null;
}
