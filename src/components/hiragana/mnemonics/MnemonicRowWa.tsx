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
    // ん: 응가 (양변기에 앉아 배에 힘을 주며 웅크린 아이의 허리와 다리 굴곡 각도)
    return (
      <svg
        viewBox="0 0 200 160"
        className="w-full h-full select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 양변기 실루엣 */}
        <path
          d="M 64 88 L 64 126 L 146 126"
          stroke="#E2E8F0"
          strokeWidth="3"
          strokeLinecap="round"
        />
        {/* 변기 물탱크 */}
        <rect
          x="52"
          y="62"
          width="20"
          height="54"
          rx="4"
          fill="#F8FAFC"
          stroke="#CBD5E1"
          strokeWidth="1.5"
        />
        {/* 변기 물 내림 메탈릭 레버 (포인트 메탈) */}
        <rect
          x="58"
          y="54"
          width="8"
          height="8"
          rx="2"
          fill="#94A3B8"
          stroke="#64748B"
          strokeWidth="1.2"
        />
        <line x1="62" y1="58" x2="72" y2="58" stroke="#475569" strokeWidth="2" strokeLinecap="round" />

        {/* 변기에 앉아 웅크린 아이의 등-엉덩이-다리 굴곡 (글자 ん의 N자 유려한 굴곡과 일치) */}
        <path
          d="M 80 58 L 80 94 C 80 118 126 126 142 88"
          stroke="#D6D3D1"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 아이 머리 & 끙차 힘주는 표정 */}
        <circle cx="86" cy="46" r="11" fill="#FFFFFF" stroke="#78716C" strokeWidth="1.5" />
        <path d="M 82 46 Q 86 42 90 46" stroke="#78716C" strokeWidth="1.5" strokeLinecap="round" />
        <ellipse cx="88" cy="51" rx="2.5" ry="1.8" fill="#FDA4AF" />
        {/* 땀방울 */}
        <ellipse cx="74" cy="42" rx="1.8" ry="2.5" fill="#38BDF8" />

        {/* 힘차게 집중하는 집중선 */}
        <line x1="98" y1="36" x2="104" y2="30" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="102" y1="44" x2="110" y2="42" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />

        {/* 글자 'ん' 오버레이 */}
        <MnemonicCharOverlay char="ん" fontFamily={fontFamily} x="108" y="118" />
      </svg>
    );
  }

  return null;
}
