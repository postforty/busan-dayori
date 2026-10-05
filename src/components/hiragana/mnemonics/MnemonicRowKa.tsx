import { MnemonicSvgChildProps } from './types';
import MnemonicCharOverlay from './MnemonicCharOverlay';

export default function MnemonicRowKa({ char, fontFamily }: MnemonicSvgChildProps) {
  if (char === 'か') {
    // か: 카메라 (사각 바디와 렌즈, 상단 셔터 버튼)
    return (
      <svg
        viewBox="0 0 200 160"
        className="w-full h-full select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 카메라 본체 프레임 */}
        <rect
          x="38"
          y="56"
          width="124"
          height="76"
          rx="14"
          fill="#FAFAF9"
          stroke="#78716C"
          strokeWidth="1.8"
        />

        {/* 상단 셔터 버튼 (글자 か 오른쪽 상단 삐침과 매칭) */}
        <rect
          x="126"
          y="46"
          width="20"
          height="10"
          rx="3"
          fill="#E7E5E4"
          stroke="#78716C"
          strokeWidth="1.6"
        />

        {/* 플래시 창 */}
        <rect
          x="52"
          y="66"
          width="16"
          height="10"
          rx="2"
          fill="#FEF08A"
          stroke="#78716C"
          strokeWidth="1.3"
        />

        {/* 원형 렌즈 림 & 렌즈 반사광 (포인트 블루) */}
        <circle
          cx="100"
          cy="95"
          r="26"
          fill="#FFFFFF"
          stroke="#78716C"
          strokeWidth="1.8"
        />
        <circle cx="100" cy="95" r="18" stroke="#D6D3D1" strokeWidth="1.5" />
        <path
          d="M 92 84 C 104 80 114 88 114 98"
          stroke="#38BDF8"
          strokeWidth="2.2"
          strokeLinecap="round"
        />

        {/* 글자 'か' 오버레이 */}
        <MnemonicCharOverlay char="か" fontFamily={fontFamily} x="106" y="118" />
      </svg>
    );
  }

  if (char === 'き') {
    // き: 키 / 열쇠 (Key - 앤틱 황금 열쇠의 2개 톱니 이빨, 기둥 자루, 둥근 손잡이 링)
    return (
      <svg
        viewBox="0 0 200 160"
        className="w-full h-full select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 1. 은은한 자물쇠 구멍(Keyhole) 배경 실루엣 */}
        <path
          d="M 106 50 C 96 50 88 58 88 68 C 88 74 92 80 96 84 L 92 118 C 92 122 96 126 106 126 C 116 126 120 122 120 118 L 116 84 C 120 80 124 74 124 68 C 124 58 116 50 106 50 Z"
          fill="#FEFCE8"
          opacity="0.6"
        />

        {/* 2. 열쇠 하단 둥근 손잡이 링 (Bow - 글자 き 하단 둥근 곡선과 완벽 일치) */}
        <ellipse
          cx="106"
          cy="116"
          rx="28"
          ry="18"
          fill="#FEF9C3"
          stroke="#CA8A04"
          strokeWidth="2"
        />
        {/* 손잡이 내부 앤틱 구멍 */}
        <ellipse
          cx="106"
          cy="116"
          rx="14"
          ry="8"
          fill="#FFFFFF"
          stroke="#CA8A04"
          strokeWidth="1.5"
        />
        {/* 손잡이 상단 연결 장식 크라운 */}
        <rect
          x="100"
          y="98"
          width="12"
          height="6"
          rx="2"
          fill="#FDE047"
          stroke="#CA8A04"
          strokeWidth="1.4"
        />

        {/* 3. 열쇠 곧은 기둥 자루 (Stem - 글자 き 세로 기둥 획 매칭) */}
        <line
          x1="106"
          y1="34"
          x2="106"
          y2="100"
          stroke="#CA8A04"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <line
          x1="106"
          y1="36"
          x2="106"
          y2="98"
          stroke="#FEF08A"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* 열쇠 상단 팁 볼 */}
        <circle
          cx="106"
          cy="32"
          r="4.5"
          fill="#FACC15"
          stroke="#CA8A04"
          strokeWidth="1.5"
        />

        {/* 4. 열쇠 2개의 톱니 이빨 (Bits - 글자 き 가로 2획과 완벽 일치) */}
        {/* 첫 번째 톱니 (상단 가로 획 위치) */}
        <g id="key-bit-1">
          <rect
            x="106"
            y="53"
            width="36"
            height="8"
            rx="2"
            fill="#FEF08A"
            stroke="#CA8A04"
            strokeWidth="1.6"
          />
          {/* 톱니 홈 디테일 */}
          <rect x="124" y="53" width="6" height="5" fill="#FFFFFF" stroke="#CA8A04" strokeWidth="1" />
        </g>

        {/* 두 번째 톱니 (하단 가로 획 위치) */}
        <g id="key-bit-2">
          <rect
            x="106"
            y="75"
            width="40"
            height="8"
            rx="2"
            fill="#FEF08A"
            stroke="#CA8A04"
            strokeWidth="1.6"
          />
          {/* 톱니 홈 디테일 */}
          <rect x="130" y="75" width="6" height="5" fill="#FFFFFF" stroke="#CA8A04" strokeWidth="1" />
        </g>

        {/* 5. 황금빛 영롱한 반짝임 별빛 (✨ 골드 포인트 컬러) */}
        <g id="key-sparkle">
          <path
            d="M 152 46 L 154 38 L 156 46 L 164 48 L 156 50 L 154 58 L 152 50 L 144 48 Z"
            fill="#F59E0B"
          />
          <circle cx="154" cy="48" r="1.5" fill="#FFFFFF" />
        </g>
        <circle cx="68" cy="116" r="2" fill="#FACC15" />

        {/* 6. 글자 'き' 오버레이 (열쇠 톱니와 자루, 손잡이와 100% 일체화) */}
        <MnemonicCharOverlay char="き" fontFamily={fontFamily} x="108" y="120" />
      </svg>
    );
  }

  if (char === 'く') {
    // く: 쿠키 (왼쪽의 둥근 초코칩 쿠키를 오른쪽에서 '와삭' 베어 문 < 모양의 베어 문 자국)
    return (
      <svg
        viewBox="0 0 200 160"
        className="w-full h-full select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 1. 도톰하고 노릇노릇한 쿠키 본체 (왼쪽 둥근 몸체, 오른쪽이 < 모양으로 깊게 베어 물림) */}
        <path
          d="M 142 42 C 104 22 46 44 46 82 C 46 120 104 142 142 122 C 114 104 94 92 72 82 C 94 72 114 60 142 42 Z"
          fill="#FEF3C7"
          stroke="#D97706"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* 베어 문 단면의 바삭한 음영 텍스처 */}
        <path
          d="M 140 46 C 114 62 96 74 76 82 C 96 90 114 102 140 118"
          stroke="#FDE68A"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 2. 쿠키 본체에 콕콕 박힌 달콤한 다크 초콜릿 칩들 */}
        {/* 초코칩 1 (상단) */}
        <ellipse cx="80" cy="58" rx="4.5" ry="3.5" fill="#78350F" />
        <ellipse cx="78" cy="57" rx="1.5" ry="1" fill="#92400E" />

        {/* 초코칩 2 (좌측 중앙) */}
        <ellipse cx="64" cy="80" rx="5" ry="4" fill="#78350F" />
        <ellipse cx="62" cy="79" rx="1.8" ry="1.2" fill="#92400E" />

        {/* 초코칩 3 (하단) */}
        <ellipse cx="84" cy="106" rx="4.5" ry="3.5" fill="#78350F" />
        <ellipse cx="82" cy="105" rx="1.5" ry="1" fill="#92400E" />

        {/* 초코칩 4 (중앙 안쪽) */}
        <ellipse cx="102" cy="80" rx="4" ry="3" fill="#78350F" />

        {/* 초코칩 5 (하단 안쪽) */}
        <ellipse cx="112" cy="106" rx="3.5" ry="3" fill="#78350F" />

        {/* 3. 와삭 베어 물며 우측으로 튄 바삭한 쿠키 부스러기들 */}
        <circle cx="152" cy="70" r="2.5" fill="#D97706" />
        <circle cx="160" cy="84" r="2" fill="#D97706" />
        <circle cx="148" cy="94" r="1.5" fill="#D97706" />
        <circle cx="162" cy="76" r="1.8" fill="#78350F" />

        {/* 4. 글자 'く' 오버레이 (베어 문 꺾임선과 100% 일체화) */}
        <MnemonicCharOverlay char="く" fontFamily={fontFamily} x="112" y="118" />
      </svg>
    );
  }

  if (char === 'け') {
    // け: 케이크 (케이크 상단에 꽂혀 따뜻하게 타오르는 촛불과 달콤한 케이크 바디)
    return (
      <svg
        viewBox="0 0 200 160"
        className="w-full h-full select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 1. 먹음직스러운 생일 케이크 본체 (하단 전체를 풍성하게 받쳐줌) */}
        {/* 케이크 원형 상판 크림 돔 */}
        <ellipse
          cx="108"
          cy="82"
          rx="58"
          ry="15"
          fill="#FFFBEB"
          stroke="#FDE68A"
          strokeWidth="1.8"
        />

        {/* 케이크 도톰한 옆면 바디 */}
        <path
          d="M 50 82 L 50 120 C 50 134 166 134 166 120 L 166 82"
          fill="#FFFBEB"
          stroke="#FDE68A"
          strokeWidth="1.8"
        />

        {/* 케이크 층마다 흐르는 부드러운 딸기 크림 웨이브 */}
        <path
          d="M 50 102 C 78 108 138 108 166 102"
          stroke="#FDA4AF"
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        {/* 2. 케이크 윗면에 튼튼하게 꽂힌 생일 촛불 (글자 け 왼쪽 긴 수직 획과 완벽 일치) */}
        {/* 촛불 몸통 (케이크 상판 안쪽으로 쏙 꽂혀 있음) */}
        <rect
          x="72"
          y="46"
          width="8"
          height="38"
          rx="4"
          fill="#FDE047"
          stroke="#78716C"
          strokeWidth="1.6"
        />
        {/* 촛불 심지 */}
        <line x1="76" y1="46" x2="76" y2="38" stroke="#78716C" strokeWidth="1.5" strokeLinecap="round" />

        {/* 따뜻한 주황빛 촛불 불꽃 (포인트 컬러) */}
        <path
          d="M 76 24 C 71 30 73 38 76 38 C 79 38 81 30 76 24 Z"
          fill="#FB923C"
          stroke="#EA580C"
          strokeWidth="1.3"
        />
        {/* 촛불 온기 작은 후광 */}
        <circle cx="76" cy="31" r="9" fill="#FEF08A" opacity="0.4" />

        {/* 3. 케이크 윗면의 달콤한 과일 토핑들 (체리/딸기) */}
        {/* 토핑 1 (중앙) */}
        <circle cx="118" cy="74" r="5.5" fill="#EF4444" />
        <path d="M 120 70 Q 124 64 128 65" stroke="#78716C" strokeWidth="1.2" strokeLinecap="round" />

        {/* 토핑 2 (우측) */}
        <circle cx="146" cy="76" r="4.5" fill="#EF4444" />
        <path d="M 147 73 Q 150 68 154 69" stroke="#78716C" strokeWidth="1.2" strokeLinecap="round" />

        {/* 몽글몽글한 생크림 뿔 장식 */}
        <circle cx="96" cy="76" r="3.5" fill="#FFFFFF" stroke="#FDE68A" strokeWidth="1" />
        <circle cx="132" cy="76" r="3.5" fill="#FFFFFF" stroke="#FDE68A" strokeWidth="1" />

        {/* 4. 글자 'け' 오버레이 (촛불과 케이크에 100% 일체화) */}
        <MnemonicCharOverlay char="け" fontFamily={fontFamily} x="108" y="120" />
      </svg>
    );
  }

  if (char === 'こ') {
    // こ: 코끼리 (바닥에 든든히 선 아기 코끼리: 둥근 등선의 위 획, 길게 뻗은 코의 아래 획, 통통한 다리와 큰 귀)
    return (
      <svg
        viewBox="0 0 200 160"
        className="w-full h-full select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 1. 바닥 그림자 (안정적인 접지감) */}
        <ellipse cx="96" cy="132" rx="46" ry="6" fill="#E2E8F0" opacity="0.6" />

        {/* 2. 코끼리 통통한 기둥 다리 2개 (앞다리 & 뒷다리) */}
        {/* 뒷다리 */}
        <rect
          x="50"
          y="98"
          width="18"
          height="32"
          rx="6"
          fill="#F1F5F9"
          stroke="#78716C"
          strokeWidth="1.8"
        />
        {/* 앞다리 */}
        <rect
          x="78"
          y="100"
          width="18"
          height="30"
          rx="6"
          fill="#F1F5F9"
          stroke="#78716C"
          strokeWidth="1.8"
        />
        {/* 발끝 앙증맞은 발톱선 */}
        <circle cx="56" cy="126" r="1.5" fill="#CBD5E1" />
        <circle cx="62" cy="126" r="1.5" fill="#CBD5E1" />
        <circle cx="84" cy="126" r="1.5" fill="#CBD5E1" />
        <circle cx="90" cy="126" r="1.5" fill="#CBD5E1" />

        {/* 3. 살랑살랑 매달린 앙증맞은 꼬리 */}
        <path
          d="M 44 86 Q 36 94 38 106"
          stroke="#78716C"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <circle cx="38" cy="107" r="2.5" fill="#78716C" />

        {/* 4. 코끼리 둥근 몸체 & 머리-코 실루엣 (위 획=등선, 아래 획=길게 뻗은 코) */}
        <path
          d="M 48 94 C 44 76 56 54 78 52 C 94 48 112 48 122 56 C 118 66 116 74 126 78 C 138 81 152 83 163 84 C 168 85 168 91 161 93 C 148 94 135 96 124 99 C 112 103 94 106 72 106 C 52 106 46 104 48 94 Z"
          fill="#F8FAFC"
          stroke="#78716C"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />

        {/* 5. 펄럭이는 커다랗고 둥근 부채 귀 (좌측 큰 귀 & 핑크 안감) */}
        <path
          d="M 72 46 C 42 44 32 78 46 100 C 56 112 70 108 74 96 C 78 84 76 52 72 46 Z"
          fill="#F1F5F9"
          stroke="#78716C"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        {/* 귀 안쪽 사랑스러운 소프트 핑크 안감 */}
        <path
          d="M 66 52 C 46 52 40 76 50 92 C 58 100 66 96 68 88 Z"
          fill="#FFE4E6"
        />

        {/* 6. 길게 뻗은 코의 자연스러운 주름선 디테일 */}
        <path
          d="M 137 83 C 138 86 139 90 141 93"
          stroke="#CBD5E1"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M 148 85 C 149 88 150 90 151 93"
          stroke="#CBD5E1"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* 7. 앙증맞고 하얀 꼬마 상아 (코 옆에서 앞으로 삐죽 솟음) */}
        <path
          d="M 102 96 C 116 94 126 86 122 78 C 114 82 106 88 102 96 Z"
          fill="#FFFFFF"
          stroke="#78716C"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* 8. 똘망똘망하고 사랑스러운 눈망울 & 눈썹 */}
        <circle cx="102" cy="66" r="3.5" fill="#1C1917" />
        <circle cx="103.5" cy="64.5" r="1.2" fill="#FFFFFF" />
        <path
          d="M 98 60 Q 102 57 106 60"
          stroke="#78716C"
          strokeWidth="1.4"
          strokeLinecap="round"
        />

        {/* 발그레한 핑크 볼터치 */}
        <ellipse cx="96" cy="76" rx="4.5" ry="3" fill="#FDA4AF" opacity="0.85" />

        {/* 9. 코 끝에서 뿜어져 나오는 시원한 물방울 분수 (스카이블루 포인트) */}
        <circle cx="171" cy="74" r="3.2" fill="#38BDF8" />
        <circle cx="180" cy="62" r="2.4" fill="#38BDF8" />
        <circle cx="186" cy="75" r="1.8" fill="#38BDF8" />

        {/* 10. 글자 'こ' 오버레이 (등선과 길게 뻗은 코 라인에 완벽히 일체화) */}
        <MnemonicCharOverlay char="こ" fontFamily={fontFamily} x="108" y="118" />
      </svg>
    );
  }

  return null;
}
