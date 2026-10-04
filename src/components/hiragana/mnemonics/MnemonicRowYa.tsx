import { MnemonicSvgChildProps } from './types';
import MnemonicCharOverlay from './MnemonicCharOverlay';

export default function MnemonicRowYa({ char, fontFamily }: MnemonicSvgChildProps) {
  if (char === 'や') {
    // や: 야구 (배트를 휘두르는 타자의 팔 각도와 날아오는 야구공)
    return (
      <svg
        viewBox="0 0 200 160"
        className="w-full h-full select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 야구 배트 궤적 실루엣 (글자 や 메인 곡선과 일치) */}
        <path
          d="M 62 76 C 88 56 128 54 136 78 C 142 98 128 126 122 134"
          stroke="#D6D3D1"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* 타자 모자 캡 & 얼굴 */}
        <circle cx="98" cy="46" r="12" fill="#FFFFFF" stroke="#78716C" strokeWidth="1.6" />
        <path d="M 88 42 L 76 44" stroke="#1D4ED8" strokeWidth="2.5" strokeLinecap="round" />

        {/* 날아오는 하얀 야구공 & 레드 실밥 (포인트 컬러: 우측 상단 삐침 획 위치) */}
        <g id="baseball">
          <circle cx="152" cy="48" r="9" fill="#FFFFFF" stroke="#78716C" strokeWidth="1.6" />
          <path d="M 148 41 C 150 45 150 51 148 55" stroke="#EF4444" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M 156 41 C 154 45 154 51 156 55" stroke="#EF4444" strokeWidth="1.2" strokeLinecap="round" />
        </g>

        {/* 배트 스윙 모션 바람선 */}
        <path
          d="M 52 92 Q 62 108 82 118"
          stroke="#93C5FD"
          strokeWidth="1.6"
          strokeLinecap="round"
        />

        {/* 글자 'や' 오버레이 */}
        <MnemonicCharOverlay char="や" fontFamily={fontFamily} x="108" y="118" />
      </svg>
    );
  }

  if (char === 'ゆ') {
    // ゆ: 유도 (도복 깃을 맞잡고 상대를 공중으로 들어 메치는 회전축)
    return (
      <svg
        viewBox="0 0 200 160"
        className="w-full h-full select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 공중으로 상대를 넘기는 둥근 메치기 회전 궤적 (글자 ゆ의 둥근 바디) */}
        <path
          d="M 68 56 L 68 104 C 68 132 144 132 144 98 C 144 74 104 68 84 84"
          stroke="#D6D3D1"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 유도 도복 깃 V라인 */}
        <path
          d="M 56 68 L 74 84 L 92 68"
          stroke="#78716C"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* 블랙 유도 띠 (포인트 컬러) */}
        <rect
          x="58"
          y="88"
          width="32"
          height="7"
          rx="2"
          fill="#1C1917"
        />
        <path d="M 72 95 L 68 112 M 76 95 L 80 114" stroke="#1C1917" strokeWidth="2.5" strokeLinecap="round" />

        {/* 매트 위 쿵 떨어지는 다이나믹 충격선 */}
        <path
          d="M 126 126 L 138 134 M 146 116 L 158 122"
          stroke="#F59E0B"
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        {/* 글자 'ゆ' 오버레이 */}
        <MnemonicCharOverlay char="ゆ" fontFamily={fontFamily} x="108" y="118" />
      </svg>
    );
  }

  if (char === 'よ') {
    // よ: 요트 (바람을 머금은 삼각 돛과 둥근 선체 라인)
    return (
      <svg
        viewBox="0 0 200 160"
        className="w-full h-full select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 요트 돛대 마스트 수직 기둥 (글자 よ 수직선 매칭) */}
        <path
          d="M 100 28 L 100 126"
          stroke="#78716C"
          strokeWidth="2.2"
          strokeLinecap="round"
        />

        {/* 삼각 돛 실루엣 (글자 よ 상단 가로 획 및 돛 공간) */}
        <path
          d="M 64 54 L 100 36 L 100 86 Z"
          fill="#E0F2FE"
          stroke="#38BDF8"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* 돛대 꼭대기 오렌지 삼각 깃발 (포인트 컬러) */}
        <path
          d="M 100 28 L 118 34 L 100 40 Z"
          fill="#FB923C"
          stroke="#EA580C"
          strokeWidth="1.2"
        />

        {/* 둥근 선체(배) 바닥 라인 (글자 よ의 하단 둥근 고리) */}
        <path
          d="M 100 88 C 76 88 74 118 98 120 C 122 120 122 96 100 96"
          stroke="#D6D3D1"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* 푸른 바다 물결 라인 */}
        <path
          d="M 44 130 C 64 126 84 134 104 130 C 124 126 144 134 164 130"
          stroke="#60A5FA"
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        {/* 글자 'よ' 오버레이 */}
        <MnemonicCharOverlay char="よ" fontFamily={fontFamily} x="108" y="118" />
      </svg>
    );
  }

  return null;
}
