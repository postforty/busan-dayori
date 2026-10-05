import { MnemonicSvgChildProps } from './types';
import MnemonicCharOverlay from './MnemonicCharOverlay';

export default function MnemonicRowWa({ char, fontFamily }: MnemonicSvgChildProps) {
  if (char === 'わ') {
    // わ: 와~ (감탄하며 입을 크게 벌리고 "와~" 소리 내는 아이의 둥근 볼선)
    // ⚠️ ね(고리 있음), れ(삐침)와 다른 시원하고 둥근 열린 만곡선 강조!
    return (
      <svg
        viewBox="0 0 200 160"
        className="w-full h-full select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 아이의 똑바른 등뼈/몸체 라인 (글자 わ 왼쪽 수직 획 매칭) */}
        <path
          d="M 68 34 L 68 128"
          stroke="#78716C"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* 크게 벌린 입술 & 둥근 볼 실루엣 (글자 わ 오른쪽의 시원한 둥근 만곡선) */}
        <path
          d="M 70 82 C 108 52 164 74 154 116 C 146 136 102 136 78 124"
          fill="#FFF1F2"
          stroke="#FDA4AF"
          strokeWidth="1.8"
        />

        {/* 활짝 벌린 입속 (포인트 연핑크) */}
        <ellipse cx="118" cy="98" rx="16" ry="22" fill="#F43F5E" opacity="0.8" />
        <ellipse cx="118" cy="106" rx="10" ry="8" fill="#FDA4AF" />

        {/* 감탄하는 초롱초롱한 눈 */}
        <circle cx="106" cy="62" r="3" fill="#1C1917" />
        <circle cx="107" cy="61" r="1" fill="#FFFFFF" />

        {/* 감탄 느낌표 & 반짝이 포인트 */}
        <path
          d="M 152 46 L 154 36 M 153 52 L 153 53"
          stroke="#F59E0B"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M 164 58 L 166 54 L 168 58 L 172 60 L 168 62 L 166 66 L 164 62 L 160 60 Z"
          fill="#FDE047"
        />

        {/* 글자 'わ' 오버레이 */}
        <MnemonicCharOverlay char="わ" fontFamily={fontFamily} x="108" y="118" />
      </svg>
    );
  }

  if (char === '를' || char === 'を') {
    // を: 오징어 (세모난 머리 지느러미와 아래로 굽이치며 뻗은 유려한 다리 곡선)
    return (
      <svg
        viewBox="0 0 200 160"
        className="w-full h-full select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 오징어 삼각 머리 지느러미 (글자 を 상단 획과 매칭, 포인트 코랄) */}
        <path
          d="M 104 28 L 74 54 L 134 54 Z"
          fill="#FFE4E6"
          stroke="#FB7185"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />

        {/* 오징어 눈 2개 */}
        <circle cx="92" cy="62" r="2.5" fill="#1C1917" />
        <circle cx="116" cy="62" r="2.5" fill="#1C1917" />

        {/* 아래로 굽이치며 뻗은 오징어 다리 곡선들 (글자 を의 교차 곡선) */}
        <path
          d="M 72 72 C 104 68 136 68 142 82 C 146 94 116 102 96 98 C 76 94 82 122 134 126"
          stroke="#D6D3D1"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 출렁이는 파도 및 오징어 먹물 방울 */}
        <circle cx="146" cy="116" r="3" fill="#475569" />
        <circle cx="156" cy="112" r="2" fill="#475569" />

        {/* 글자 'を' 오버레이 */}
        <MnemonicCharOverlay char="を" fontFamily={fontFamily} x="108" y="118" />
      </svg>
    );
  }

  if (char === 'ん') {
    // ん: 응원 (열정적인 응원단장의 파이팅과 공중으로 힘차게 솟구쳐 휘날리는 응원 리본 궤적)
    return (
      <svg
        viewBox="0 0 200 160"
        className="w-full h-full select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* 활기찬 응원 리본 그라데이션 */}
          <linearGradient id="n-ribbon-grad" x1="80" y1="60" x2="150" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FDA4AF" />
            <stop offset="50%" stopColor="#F43F5E" />
            <stop offset="100%" stopColor="#FB7185" />
          </linearGradient>
        </defs>

        {/* 1. 응원단장 꼬마 캐릭터 (왼쪽 1획 지지 라인) */}
        {/* 다리 & 운동화 */}
        <line x1="56" y1="112" x2="56" y2="128" stroke="#78716C" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="64" y1="112" x2="64" y2="128" stroke="#78716C" strokeWidth="2.5" strokeLinecap="round" />
        <ellipse cx="54" cy="130" rx="4.5" ry="2.5" fill="#EF4444" />
        <ellipse cx="66" cy="130" rx="4.5" ry="2.5" fill="#EF4444" />

        {/* 유니폼 몸통 (스포티한 상큼한 티셔츠) */}
        <path
          d="M 52 64 L 46 96 L 74 96 L 68 64 Z"
          fill="#E0F2FE"
          stroke="#38BDF8"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        {/* 반바지 */}
        <path d="M 46 96 L 74 96 L 72 112 L 48 112 Z" fill="#0284C7" />

        {/* 얼굴 & 귀여운 표정 */}
        <circle cx="60" cy="46" r="13" fill="#FFF7ED" stroke="#78716C" strokeWidth="1.5" />
        {/* 승리의 빨간 응원 머리띠 & 펄럭이는 꼬리 */}
        <path d="M 47 43 Q 60 38 73 43" stroke="#EF4444" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M 47 44 C 40 46 36 54 38 60" stroke="#EF4444" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M 46 45 C 38 50 36 58 40 64" stroke="#EF4444" strokeWidth="1.8" strokeLinecap="round" />

        {/* 웃으며 외치는 눈 & 볼터치 & 입 */}
        <path d="M 53 47 Q 56 44 59 47" stroke="#1C1917" strokeWidth="1.5" strokeLinecap="round" />
        <ellipse cx="55" cy="51" rx="2.5" ry="1.8" fill="#FDA4AF" />
        {/* 크게 와아~! 외치는 입 */}
        <ellipse cx="66" cy="50" rx="3" ry="4" fill="#F43F5E" />

        {/* 2. 메가폰 (확성기 - 승리의 응원 소리 발사!) */}
        <path
          d="M 68 50 L 82 42 L 85 58 L 70 56 Z"
          fill="#FDE047"
          stroke="#F59E0B"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <ellipse cx="84" cy="50" rx="2.5" ry="8" fill="#F59E0B" />
        <line x1="72" y1="56" x2="72" y2="64" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="72" cy="62" r="3" fill="#FFF7ED" stroke="#78716C" strokeWidth="1.2" />

        {/* 함성 사운드 웨이브 (와아~!) */}
        <path d="M 90 44 C 94 42 96 38 94 34" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M 96 48 C 102 46 104 40 101 32" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />

        {/* 3. 공중으로 휘날리는 대형 응원 리본 띠 (글자 'ん'의 둥근 산과 꼬리 곡선 매칭) */}
        {/* 리본 그림자 / 은은한 바탕 */}
        <path
          d="M 80 114 C 82 76 96 52 110 52 C 132 52 146 110 122 122 C 104 128 126 104 154 70"
          stroke="#FFE4E6"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* 리본 본체 라인 */}
        <path
          d="M 80 114 C 82 76 96 52 110 52 C 132 52 146 110 122 122 C 104 128 126 104 154 70"
          stroke="url(#n-ribbon-grad)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* 펄럭이는 리본 끝자락 V자 꼬리 (우상단) */}
        <path
          d="M 152 74 L 162 66 L 158 74 L 164 80 L 152 78 Z"
          fill="#F43F5E"
        />

        {/* 4. 응원 콘페티 & 반짝이 축제 효과 */}
        {/* 반짝이 별 */}
        <path
          d="M 168 44 L 170 38 L 172 44 L 178 46 L 172 48 L 170 54 L 168 48 L 162 46 Z"
          fill="#FDE047"
        />
        <path
          d="M 40 32 L 41 28 L 42 32 L 46 33 L 42 34 L 41 38 L 40 34 L 36 33 Z"
          fill="#FDE047"
        />
        {/* 날리는 색종이 조각들 (Confetti) */}
        <circle cx="124" cy="36" r="2.5" fill="#38BDF8" />
        <circle cx="144" cy="46" r="2" fill="#F472B6" />
        <rect x="156" y="96" width="4" height="4" rx="1" fill="#34D399" transform="rotate(25 158 98)" />
        <rect x="88" y="132" width="5" height="3" rx="1" fill="#F59E0B" transform="rotate(-15 90 133)" />

        {/* 글자 'ん' 오버레이 */}
        <MnemonicCharOverlay char="ん" fontFamily={fontFamily} x="108" y="118" />
      </svg>
    );
  }

  return null;
}
