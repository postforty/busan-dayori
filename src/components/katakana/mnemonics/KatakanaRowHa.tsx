import React from 'react';
import { KatakanaMnemonicSvgChildProps } from './types';
import KatakanaCharOverlay from './KatakanaCharOverlay';

export default function KatakanaRowHa({ char, fontFamily }: KatakanaMnemonicSvgChildProps) {
  if (char === 'ハ') {
    // ハ: 하하하 (호탕하게 하하하! 웃는 산타 할아버지의 八자 팔자 수염)
    return (
      <svg viewBox="0 0 200 160" className="w-full h-full select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* 빨간 코와 동그란 볼 */}
        <circle cx="106" cy="56" r="12" fill="#EF4444" stroke="#B91C1C" strokeWidth="2" />
        <ellipse cx="102" cy="52" rx="3.5" ry="2" fill="#FFFFFF" opacity="0.8" />
        {/* 양 볼터치 */}
        <ellipse cx="64" cy="58" rx="6" ry="4" fill="#FDA4AF" opacity="0.7" />
        <ellipse cx="148" cy="58" rx="6" ry="4" fill="#FDA4AF" opacity="0.7" />

        {/* 호탕하게 벌린 입 */}
        <path d="M 88 72 Q 106 94 124 72 Z" fill="#991B1B" stroke="#7F1D1D" strokeWidth="1.5" />
        <path d="M 96 82 Q 106 88 116 82" stroke="#FDA4AF" strokeWidth="2" strokeLinecap="round" />

        {/* 풍성한 八자 하얀 수염 (글자 ハ의 양쪽 대각선 삐침) */}
        <path
          d="M 94 68 C 84 88 74 112 56 138 C 72 136 86 126 98 102 Z"
          fill="#FAFAF9"
          stroke="#78716C"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M 118 68 C 128 88 138 112 156 138 C 140 136 126 126 114 102 Z"
          fill="#FAFAF9"
          stroke="#78716C"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* 글자 'ハ' 오버레이 */}
        <KatakanaCharOverlay char="ハ" fontFamily={fontFamily} x="106" y="118" />
      </svg>
    );
  }

  if (char === 'ヒ') {
    // ヒ: 히어로 (펄럭이는 망토를 두르고 당당히 서 있는 슈퍼 히어로)
    return (
      <svg viewBox="0 0 200 160" className="w-full h-full select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* 붉은 영웅 망토 (글자 ヒ 뒤로 펄럭이는 실루엣) */}
        <path
          d="M 92 48 L 52 74 C 44 98 52 132 40 144 L 92 132 Z"
          fill="#EF4444"
          stroke="#DC2626"
          strokeWidth="2"
        />
        <path d="M 120 48 L 160 84 C 168 108 160 136 172 144 L 120 132 Z" fill="#EF4444" stroke="#DC2626" strokeWidth="2" />

        {/* 히어로 머리와 가면 */}
        <circle cx="106" cy="38" r="14" fill="#FED7AA" stroke="#EA580C" strokeWidth="1.5" />
        <rect x="94" y="34" width="24" height="8" rx="4" fill="#1E293B" />
        <circle cx="100" cy="38" r="1.5" fill="#FFFFFF" />
        <circle cx="112" cy="38" r="1.5" fill="#FFFFFF" />

        {/* 히어로 가슴 엠블럼과 튼튼한 다리 (글자 ヒ의 각진 프레임) */}
        <path
          d="M 68 62 L 144 62 L 144 116 L 82 116 L 82 140"
          stroke="#2563EB"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* 가슴 황금 별 마크 */}
        <polygon points="106,56 109,64 118,64 111,69 113,77 106,72 99,77 101,69 94,64 103,64" fill="#FDE047" stroke="#CA8A04" strokeWidth="1" />

        {/* 글자 'ヒ' 오버레이 */}
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
    // ヘ: 헤엄 (★ 히라가나 へ와 100% 동일한 형태! 물살을 가르며 헤엄치는 수영선수 도안 100% 재활용)
    return (
      <svg viewBox="0 0 200 160" className="w-full h-full select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* 깊은 물속 레이어 */}
        <path d="M 0 114 C 40 108 80 118 120 112 C 160 106 185 116 200 112 L 200 160 L 0 160 Z" fill="#E0F2FE" />
        <path d="M 0 114 C 40 108 80 118 120 112 C 160 106 185 116 200 112" stroke="#0284C7" strokeWidth="2.5" />
        <path d="M 12 136 C 36 132 64 138 90 134" stroke="#38BDF8" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="8 5" />

        {/* 수영 선수 몸통과 수영복 */}
        <path d="M 48 106 C 50 96 62 92 78 92 C 88 92 98 96 100 104 C 100 110 92 116 80 116 C 64 116 52 112 48 106 Z" fill="#FED7AA" stroke="#EA580C" strokeWidth="1.5" />
        <path d="M 48 106 C 50 97 60 94 68 94 C 72 98 74 108 72 114 C 60 116 52 112 48 106 Z" fill="#2563EB" stroke="#1D4ED8" strokeWidth="1.6" />

        {/* 수영모 & 수경 */}
        <circle cx="106" cy="82" r="14" fill="#0284C7" stroke="#0369A1" strokeWidth="1.6" />
        <ellipse cx="108" cy="82" rx="4.5" ry="3.5" fill="#38BDF8" stroke="#0284C7" strokeWidth="1.4" />

        {/* 하이 엘보 팔 스트로크 (글자 ヘ의 산 모양 ^ 궤적과 1:1 완벽 일치!) */}
        <path
          d="M 74 94 C 80 84 92 72 102 62 C 105 59 109 60 111 64 C 122 76 138 92 154 104 C 157 106 156 109 152 110 C 142 104 128 88 116 78 C 110 74 106 74 102 80 C 92 90 84 98 80 102 Z"
          fill="#FED7AA"
          stroke="#EA580C"
          strokeWidth="1.8"
        />

        {/* 물보라 방울들 */}
        <circle cx="105" cy="48" r="2.4" fill="#38BDF8" />
        <circle cx="114" cy="44" r="1.8" fill="#60A5FA" />
        <circle cx="164" cy="98" r="2" fill="#38BDF8" />

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
