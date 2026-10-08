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
