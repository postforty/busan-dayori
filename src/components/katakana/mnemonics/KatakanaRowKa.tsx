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
    // キ: 키 / 열쇠 (하단 황금 손잡이 링, 2단 톱니 날, 곧은 축으로 구성된 완벽한 황금 열쇠)
    return (
      <svg viewBox="0 0 200 160" className="w-full h-full select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* 배경 앤틱 에스커천 (열쇠 구멍 장식 플레이트) */}
        <rect
          x="52"
          y="16"
          width="106"
          height="140"
          rx="22"
          fill="#FFFDF5"
          stroke="#FDE68A"
          strokeWidth="1.5"
          strokeDasharray="4 3"
          opacity="0.85"
        />
        {/* 클래식 열쇠 구멍(Keyhole) 깊이감 있는 음영 */}
        <path
          d="M 104 46 C 94 46 86 54 86 64 C 86 70 90 75 94 79 L 91 106 C 91 110 95 114 104 114 C 113 114 117 110 117 106 L 114 79 C 118 75 122 70 122 64 C 122 54 114 46 104 46 Z"
          fill="#FEF3C7"
          stroke="#FCD34D"
          strokeWidth="1.5"
        />
        <circle cx="104" cy="64" r="8" fill="#FDE68A" opacity="0.6" />

        {/* 열쇠 상단 끝단 팁 크라운 & 볼 (Tip) */}
        <g id="key-tip">
          {/* 팁 베이스 칼라 */}
          <rect
            x="95"
            y="30"
            width="10"
            height="4"
            rx="1.5"
            fill="#FACC15"
            stroke="#CA8A04"
            strokeWidth="1.4"
          />
          {/* 상단 팁 볼 */}
          <circle cx="100" cy="27" r="4.5" fill="#FACC15" stroke="#CA8A04" strokeWidth="1.8" />
          <circle cx="98.5" cy="25.5" r="1.4" fill="#FFFFFF" />
        </g>

        {/* 열쇠 중앙 기둥 자루 (상단 팁에서 하단 손잡이까지 キ의 세로획 매칭 - 기울기 반대 방향) */}
        <line x1="100" y1="32" x2="110" y2="121" stroke="#CA8A04" strokeWidth="6" strokeLinecap="round" />
        <line x1="100" y1="33" x2="110" y2="120" stroke="#FEF08A" strokeWidth="2.8" strokeLinecap="round" />

        {/* 열쇠 하단 앤틱 황금 손잡이 헤드 (Bow - 삼엽문 트레포일 디자인) */}
        <g id="key-head">
          {/* 손잡이 상단 연결 칼라 (글자 세로획 끝부분과 매끄럽게 연결) */}
          <rect
            x="103"
            y="120"
            width="14"
            height="5"
            rx="1.5"
            fill="#FACC15"
            stroke="#CA8A04"
            strokeWidth="1.5"
          />

          {/* 앤틱 삼엽문 헤드 루프들 */}
          {/* 좌측 루프 */}
          <circle cx="100" cy="136" r="8" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1.8" />
          <circle cx="100" cy="136" r="4" fill="#FFFDF5" stroke="#CA8A04" strokeWidth="1.2" />
          {/* 우측 루프 */}
          <circle cx="124" cy="136" r="8" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1.8" />
          <circle cx="124" cy="136" r="4" fill="#FFFDF5" stroke="#CA8A04" strokeWidth="1.2" />
          {/* 중앙 메인 링 */}
          <circle cx="112" cy="136" r="12" fill="#FDE047" stroke="#CA8A04" strokeWidth="2" />
          <circle cx="112" cy="136" r="6" fill="#FFFDF5" stroke="#CA8A04" strokeWidth="1.5" />

          {/* 손잡이 최하단 팁 볼 */}
          <circle cx="112" cy="150" r="4" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1.4" />
          <circle cx="112" cy="150" r="1.8" fill="#FFFDF5" stroke="#CA8A04" strokeWidth="1" />
        </g>

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
          <path d="M 66 36 L 67 31 L 68 36 L 73 37 L 68 38 L 67 43 L 66 38 L 61 37 Z" fill="#FACC15" />
        </g>
        <circle cx="154" cy="112" r="2.2" fill="#FACC15" />
        <circle cx="56" cy="120" r="1.8" fill="#FACC15" />

        {/* 글자 'キ' 오버레이 */}
        <KatakanaCharOverlay char="キ" fontFamily={fontFamily} x="106" y="118" />
      </svg>
    );
  }

  if (char === 'ク') {
    // ク: 쿠폰 (COUPON - 글자 ク의 획에 맞춰 우상향 각도로 비스듬히 놓인 할인 쿠폰 티켓)
    return (
      <svg viewBox="0 0 200 160" className="w-full h-full select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* 바닥 부드러운 원근 그림자 */}
        <ellipse cx="102" cy="144" rx="68" ry="7.5" fill="#F1F5F9" />

        {/* 우상향으로 비스듬히 기울어진 쿠폰 티켓 본체 그룹 (글자 ク의 우상향 획과 완벽 조화) */}
        <g id="coupon-ticket-body" transform="rotate(-13, 101, 82)">
          {/* 티켓 은은한 드롭 섀도우 */}
          <path
            d="M 44 48 L 158 48 C 164 48 168 52 168 58 L 168 78 C 161 78 156 82 156 87 C 156 92 161 96 168 96 L 168 116 C 168 122 164 126 158 126 L 44 126 C 38 126 34 122 34 116 L 34 96 C 41 96 46 92 46 87 C 46 82 41 78 34 78 L 34 58 C 34 52 38 48 44 48 Z"
            fill="#FDBA74"
            opacity="0.25"
          />

          {/* 쿠폰 티켓 본체 프레임 (양옆 반원 펀칭 홈이 있는 클래식 티켓) */}
          <path
            d="M 44 44 
               L 158 44 
               C 164 44 168 48 168 54 
               L 168 74 
               C 161 74 156 78 156 83 
               C 156 88 161 92 168 92 
               L 168 112 
               C 168 118 164 122 158 122 
               L 44 122 
               C 38 122 34 118 34 112 
               L 34 92 
               C 41 92 46 88 46 83 
               C 46 78 41 74 34 74 
               L 34 54 
               C 34 48 38 44 44 44 Z"
            fill="#FFF7ED"
            stroke="#F97316"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />

          {/* 내부 점선 장식 테두리 */}
          <rect
            x="40"
            y="50"
            width="122"
            height="66"
            rx="4"
            stroke="#FDBA74"
            strokeWidth="1.2"
            strokeDasharray="4 3"
            fill="none"
          />

          {/* 상단 쿠폰 타이틀 헤더 */}
          <g id="coupon-header">
            <rect x="46" y="55" width="52" height="13" rx="3" fill="#FFEDD5" />
            <text x="72" y="64.5" fill="#C2410C" fontSize="8" fontWeight="900" textAnchor="middle" letterSpacing="0.8px">
              COUPON
            </text>
            {/* 우측 50% OFF 뱃지 */}
            <rect x="120" y="54" width="36" height="15" rx="3.5" fill="#EA580C" />
            <text x="138" y="64.5" fill="#FFFFFF" fontSize="8" fontWeight="900" textAnchor="middle">
              50% OFF
            </text>
          </g>

          {/* 하단 바코드 & 쿠폰 코드 */}
          <g id="coupon-barcode">
            <line x1="46" y1="106" x2="46" y2="116" stroke="#9A3412" strokeWidth="1.8" />
            <line x1="50" y1="106" x2="50" y2="116" stroke="#9A3412" strokeWidth="1" />
            <line x1="53" y1="106" x2="53" y2="116" stroke="#9A3412" strokeWidth="2.4" />
            <line x1="58" y1="106" x2="58" y2="116" stroke="#9A3412" strokeWidth="1.2" />
            <line x1="62" y1="106" x2="62" y2="116" stroke="#9A3412" strokeWidth="2" />
            <line x1="66" y1="106" x2="66" y2="116" stroke="#9A3412" strokeWidth="1" />
            <line x1="70" y1="106" x2="70" y2="116" stroke="#9A3412" strokeWidth="2.2" />
            <text x="78" y="114" fill="#EA580C" fontSize="7.2" fontWeight="bold">
              ★ KU-777 ★
            </text>
          </g>
        </g>

        {/* 글자 ク 모양의 각진 절취선 배경 섀도우 (글자의 우상향 획 궤적 매칭) */}
        <path
          d="M 76 56 L 132 44 C 138 68 130 98 84 128 C 96 100 98 76 76 56 Z"
          fill="#FED7AA"
          opacity="0.45"
        />

        {/* ク 모양을 따르는 또렷한 오렌지 절취 점선들 (Perforations) */}
        {/* 1획 삐침 절취선 */}
        <line
          x1="98"
          y1="40"
          x2="74"
          y2="80"
          stroke="#EA580C"
          strokeWidth="2.5"
          strokeDasharray="4 3"
          strokeLinecap="round"
        />
        {/* 2획 우상향 가로 & 곡선 절취선 (우상향 가로선과 아래로 뻗는 곡선) */}
        <path
          d="M 76 56 L 130 44 C 136 68 128 98 84 128"
          stroke="#EA580C"
          strokeWidth="2.8"
          strokeDasharray="5 3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 오려내는 가위 (Scissors ✂️) 아이콘 - 우상단 꺾임점에 세련되게 배치 */}
        <g id="scissors" transform="translate(136, 40) rotate(-35)">
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

        {/* 글자 'ク' 오버레이 */}
        <KatakanaCharOverlay char="ク" fontFamily={fontFamily} x="106" y="118" />
      </svg>
    );
  }

  if (char === 'ケ') {
    // ケ: 케이 / 알파벳 K (정확한 알파벳 대문자 K를 그린 후 오른쪽으로 살짝 기울여 ケ와 매칭)
    const kPath = `
      M 74 48
      C 74 45 76 43 80 43
      L 92 43
      C 96 43 98 45 98 48
      L 98 76
      L 124 47
      C 127 44 131 44 134 47
      L 141 54
      C 144 57 144 61 141 64
      L 112 92
      L 142 121
      C 145 124 145 128 142 131
      L 134 139
      C 131 142 127 142 124 139
      L 98 108
      L 98 131
      C 98 134 96 136 92 136
      L 80 136
      C 76 136 74 134 74 131
      Z
    `;

    return (
      <svg viewBox="0 0 200 160" className="w-full h-full select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="kBlockGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F0F9FF" />
            <stop offset="100%" stopColor="#BAE6FD" />
          </linearGradient>
        </defs>

        {/* 바닥 그림자 (기우뚱 기울어진 블록의 원근 그림자) */}
        <ellipse cx="106" cy="144" rx="60" ry="7.5" fill="#F1F5F9" />
        <ellipse cx="102" cy="143" rx="42" ry="5" fill="#E2E8F0" opacity="0.6" />

        {/* 틸트 회전 가이드 궤적 (K가 오른쪽으로 기우뚱 기울어졌음을 직관적으로 보여주는 점선 호와 화살표) */}
        <g id="tilt-guide" opacity="0.8">
          {/* 원래 똑바로 서 있던 K의 은은한 고스트 실루엣 (점선) */}
          <path
            d={kPath}
            fill="none"
            stroke="#CBD5E1"
            strokeWidth="1.6"
            strokeDasharray="4 3"
            opacity="0.6"
          />

          {/* 시계방향 회전 가이드 호 (Curve Arrow ↷) */}
          <path d="M 86 33 C 95 28 105 29 112 34" stroke="#0284C7" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          <path d="M 110 30 L 114 36 L 107 36 Z" fill="#0284C7" />

          {/* 상단 틸트 뱃지 태그 */}
          <rect x="20" y="16" width="54" height="17" rx="4" fill="#F0F9FF" stroke="#7DD3FC" strokeWidth="1.2" />
          <text x="47" y="27.5" fill="#0369A1" fontSize="8" fontWeight="800" textAnchor="middle" letterSpacing="0.4px">
            K ↷ TILT
          </text>
        </g>

        {/* 오른쪽으로 살짝 기울인(17°) 정확한 알파벳 K 입체 블록 (눈/얼굴 없이 순수 그래픽) */}
        <g id="tilted-letter-k" transform="rotate(17, 106, 90)">
          {/* 3D 깊이감 입체 그림자 면 */}
          <path
            d={kPath}
            transform="translate(4, 4.5)"
            fill="#0284C7"
            opacity="0.22"
          />

          {/* 정통 알파벳 K 메인 블록 바디 */}
          <path
            d={kPath}
            fill="url(#kBlockGrad)"
            stroke="#0284C7"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {/* 깔끔한 모서리 광택 하이라이트 (기둥 & 상/하단 날개) */}
          <line x1="79" y1="50" x2="79" y2="129" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" opacity="0.9" />
          <line x1="104" y1="71" x2="132" y2="52" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" opacity="0.9" />
          <line x1="117" y1="96" x2="135" y2="116" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" opacity="0.8" />
        </g>

        {/* 아기자기한 데코: 스파클 반짝임 */}
        <g id="sparkles">
          {/* 우상단 황금 스파클 */}
          <path d="M 160 46 L 162 38 L 164 46 L 172 48 L 164 50 L 162 58 L 160 50 L 152 48 Z" fill="#F59E0B" />
          <circle cx="162" cy="48" r="1.6" fill="#FFFFFF" />
          {/* 좌하단 스카이블루 미니 스타 */}
          <circle cx="48" cy="118" r="2.2" fill="#38BDF8" />
          <circle cx="164" cy="112" r="1.8" fill="#F59E0B" />
        </g>

        {/* 글자 'ケ' 오버레이 */}
        <KatakanaCharOverlay char="ケ" fontFamily={fontFamily} x="106" y="118" />
      </svg>
    );
  }

  if (char === 'コ') {
    // コ: 코코아 (따뜻한 코코아 머그잔의 각진 직각 손잡이와 달콤한 마시멜로)
    return (
      <svg viewBox="0 0 200 160" className="w-full h-full select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* 머그잔 본체 세라믹 그라데이션 (따뜻한 피치/크림 톤) */}
          <linearGradient id="cocoaMugGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFEDD5" />
            <stop offset="100%" stopColor="#FDBA74" />
          </linearGradient>

          {/* 직각 손잡이 그라데이션 */}
          <linearGradient id="cocoaHandleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FED7AA" />
            <stop offset="100%" stopColor="#FB923C" />
          </linearGradient>

          {/* 진한 핫 코코아 초콜릿 음료 그라데이션 */}
          <linearGradient id="cocoaLiquidGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#78350F" />
            <stop offset="100%" stopColor="#451A03" />
          </linearGradient>
        </defs>

        {/* 바닥 원근 그림자 */}
        <ellipse cx="88" cy="144" rx="66" ry="7.5" fill="#F1F5F9" />
        <ellipse cx="52" cy="143" rx="32" ry="5" fill="#E2E8F0" opacity="0.65" />

        {/* 원목 머그 컵받침(Saucer/Coaster) */}
        <ellipse cx="52" cy="135" rx="34" ry="7" fill="#FDE68A" stroke="#D97706" strokeWidth="1.5" />
        <ellipse cx="52" cy="135" rx="27" ry="4.5" fill="none" stroke="#F59E0B" strokeWidth="1" strokeDasharray="3 2" />

        {/* 각진 직각 세라믹 손잡이 본체 (글자 コ의 획과 1:1 완벽 일치) */}
        <path
          d="M 72 40 L 142 40 Q 148 40 148 46 L 148 122 Q 148 128 142 128 L 72 128 L 72 110 L 124 110 Q 128 110 128 106 L 128 62 Q 128 58 124 58 L 72 58 Z"
          fill="url(#cocoaHandleGrad)"
          stroke="#C2410C"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />

        {/* 손잡이 모서리 세라믹 광택 하이라이트 (Glossy White) */}
        <path
          d="M 76 45 L 142 45 Q 144 45 144 47 L 144 122"
          stroke="#FFFFFF"
          strokeWidth="2.2"
          strokeLinecap="round"
          opacity="0.85"
          fill="none"
        />
        <line x1="76" y1="123" x2="140" y2="123" stroke="#FED7AA" strokeWidth="1.8" strokeLinecap="round" opacity="0.8" />

        {/* 머그컵 본통 (원통형 세라믹 바디) */}
        <path
          d="M 27 44 L 31 126 C 31 131 38 134 52 134 C 66 134 73 131 73 126 L 77 44 Z"
          fill="url(#cocoaMugGrad)"
          stroke="#C2410C"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />

        {/* 컵 전면 세로 하이라이트 빛반사 */}
        <path d="M 33 54 L 36 120" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" opacity="0.75" />

        {/* 컵 전면 빈티지 라벨 뱃지 (COCOA) */}
        <g id="cocoa-label">
          <rect x="36" y="74" width="32" height="17" rx="3.5" fill="#FFFBEB" stroke="#EA580C" strokeWidth="1.2" />
          <text x="52" y="85.5" fill="#9A3412" fontSize="7.2" fontWeight="900" textAnchor="middle" letterSpacing="0.4px">
            COCOA
          </text>
          {/* 미니 초코 하트 포인트 */}
          <path
            d="M 52 89 C 50.8 87.5 49 88.5 50.2 90.2 L 52 92 L 53.8 90.2 C 55 88.5 53.2 87.5 52 89 Z"
            fill="#EA580C"
          />
        </g>

        {/* 컵 윗면 림(Rim) & 내부 진한 핫코코아 음료 */}
        <ellipse cx="52" cy="44" rx="25" ry="7.5" fill="#FFEDD5" stroke="#C2410C" strokeWidth="2.2" />
        <ellipse cx="52" cy="45" rx="22" ry="6" fill="url(#cocoaLiquidGrad)" />

        {/* 퐁당 빠진 통통한 마시멜로 2개 */}
        {/* 마시멜로 1 (좌측) */}
        <g id="marshmallow-1">
          <rect x="38" y="38" width="13" height="10" rx="3.5" fill="#FFFFFF" stroke="#D97706" strokeWidth="1.2" />
          {/* 톡톡 뿌려진 코코아 파우더 가루 */}
          <circle cx="42" cy="42" r="0.8" fill="#78350F" />
          <circle cx="46" cy="41" r="0.8" fill="#78350F" />
          <circle cx="44" cy="45" r="0.7" fill="#78350F" />
        </g>

        {/* 마시멜로 2 (우측) */}
        <g id="marshmallow-2">
          <rect x="54" y="40" width="12" height="9" rx="3" fill="#FFFBEB" stroke="#D97706" strokeWidth="1.2" />
          <circle cx="58" cy="43" r="0.8" fill="#78350F" />
          <circle cx="62" cy="45" r="0.7" fill="#78350F" />
        </g>

        {/* 모락모락 피어오르는 따뜻한 김 (Warm Steam) */}
        <path d="M 44 32 C 41 24 47 20 44 14" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.85" />
        <path d="M 58 34 C 55 26 61 22 58 16" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.85" />

        {/* 아기자기한 데코: 따스한 반짝임 스파클 */}
        <g id="sparkles">
          {/* 우상단 황금 스파클 */}
          <path d="M 166 40 L 168 32 L 170 40 L 178 42 L 170 44 L 168 52 L 166 44 L 158 42 Z" fill="#F59E0B" />
          <circle cx="168" cy="42" r="1.5" fill="#FFFFFF" />
          {/* 주변 미니 반짝임 */}
          <circle cx="20" cy="118" r="2" fill="#F59E0B" />
          <circle cx="166" cy="112" r="1.8" fill="#F97316" />
        </g>

        {/* 글자 'コ' 오버레이 */}
        <KatakanaCharOverlay char="コ" fontFamily={fontFamily} x="106" y="118" />
      </svg>
    );
  }

  return null;
}
