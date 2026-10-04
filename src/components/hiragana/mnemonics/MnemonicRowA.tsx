import { MnemonicSvgChildProps } from './types';
import MnemonicCharOverlay from './MnemonicCharOverlay';

export default function MnemonicRowA({ char, fontFamily }: MnemonicSvgChildProps) {
  if (char === 'あ') {
    return (
      <svg
        viewBox="0 0 200 160"
        className="w-full h-full select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 1. 포대기에 싸인 둥근 아기 실루엣 */}
        <path
          d="M 48 76 C 36 106 66 134 114 134 C 150 134 168 112 154 90 C 140 72 118 70 102 76"
          fill="#FAFAF9"
          stroke="#A8A29E"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M 72 78 C 88 94 110 100 130 92"
          stroke="#D6D3D1"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* 2. 아기 얼굴 */}
        <circle
          cx="62"
          cy="60"
          r="22"
          fill="#FFFFFF"
          stroke="#78716C"
          strokeWidth="1.8"
        />

        {/* 배냇머리 삐침 */}
        <path
          d="M 62 38 C 60 28 68 28 67 34 C 66 36 64 37 62 38"
          fill="#78716C"
          stroke="#78716C"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 감은 눈 */}
        <path
          d="M 51 56 Q 55 52 59 56"
          stroke="#78716C"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
        <path
          d="M 65 56 Q 69 52 73 56"
          stroke="#78716C"
          strokeWidth="1.7"
          strokeLinecap="round"
        />

        {/* 볼터치 (소프트 핑크) */}
        <ellipse cx="50" cy="62" rx="3.5" ry="2.5" fill="#FDA4AF" opacity="0.8" />
        <ellipse cx="74" cy="62" rx="3.5" ry="2.5" fill="#FDA4AF" opacity="0.8" />

        {/* 3. 쪽쪽이 */}
        <g id="pacifier">
          <rect
            x="56"
            y="66"
            width="12"
            height="7"
            rx="3.5"
            fill="#FEF08A"
            stroke="#78716C"
            strokeWidth="1.3"
          />
          <circle cx="62" cy="69.5" r="1.5" fill="#EAB308" />
          <path
            d="M 59 73 C 59 77.5 65 77.5 65 73"
            stroke="#78716C"
            strokeWidth="1.3"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        {/* 4. 글자 오버레이 */}
        <MnemonicCharOverlay char="あ" fontFamily={fontFamily} />
      </svg>
    );
  }

  if (char === 'い') {
    // い: 이빨 (활짝 "이~" 하고 웃을 때 드러나는 두 개의 깨끗한 앞니 기둥)
    return (
      <svg
        viewBox="0 0 200 160"
        className="w-full h-full select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 1. 활짝 "이~" 하고 웃는 입속 배경 (부드러운 핑크빛) */}
        <path
          d="M 38 68 C 50 128 150 128 162 68 C 140 84 60 84 38 68 Z"
          fill="#FFF1F2"
          stroke="#FDA4AF"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />

        {/* 2. 상단 핑크 잇몸 (두 앞니 뿌리를 볼록하게 감싸는 아치형) */}
        <path
          d="M 48 66 C 58 64 64 50 84 50 C 100 50 103 58 105 62 C 107 58 112 52 128 52 C 144 52 148 64 154 66 C 158 52 144 42 128 42 C 114 42 108 46 105 46 C 102 46 96 40 84 40 C 62 40 50 52 48 66 Z"
          fill="#FFE4E6"
          stroke="#FDA4AF"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* 3. 가지런하고 큼직한 두 개의 앞니 (글자 い의 좌우 획과 완벽 일치) */}
        {/* 왼쪽 앞니 (글자 い의 긴 세로획을 기둥처럼 완벽히 감쌈) */}
        <path
          d="M 66 50 C 72 48 96 48 102 50 L 102 110 C 102 116 94 118 86 118 C 76 118 66 114 66 106 Z"
          fill="#FFFFFF"
          stroke="#78716C"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        {/* 왼쪽 치아 표면 광택선 */}
        <path
          d="M 72 58 L 72 102"
          stroke="#F1F5F9"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* 오른쪽 앞니 (글자 い의 오른쪽 획을 완벽히 감쌈) */}
        <path
          d="M 108 52 C 114 50 138 50 144 52 L 144 92 C 144 98 136 100 128 100 C 120 100 108 96 108 90 Z"
          fill="#FFFFFF"
          stroke="#78716C"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        {/* 오른쪽 치아 표면 광택선 */}
        <path
          d="M 114 60 L 114 88"
          stroke="#F1F5F9"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* 두 치아 사이의 세로 경계 분리선 */}
        <line
          x1="105"
          y1="50"
          x2="105"
          y2="108"
          stroke="#E2E8F0"
          strokeWidth="1.6"
          strokeLinecap="round"
        />

        {/* 4. 활짝 웃는 입술 미소 곡선 */}
        <path
          d="M 40 68 Q 105 78 160 68"
          stroke="#F43F5E"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M 42 70 C 58 126 142 126 158 70"
          stroke="#F43F5E"
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        {/* 5. 양쪽 입꼬리 미소 & 볼터치 */}
        <path d="M 36 62 Q 38 70 44 72" stroke="#FB7185" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M 164 62 Q 162 70 156 72" stroke="#FB7185" strokeWidth="1.6" strokeLinecap="round" />
        <ellipse cx="32" cy="74" rx="4.5" ry="3" fill="#FDA4AF" opacity="0.8" />
        <ellipse cx="168" cy="74" rx="4.5" ry="3" fill="#FDA4AF" opacity="0.8" />

        {/* 6. 치아의 깨끗한 반짝임 별빛 (✨ 스카이블루 포인트) */}
        <g id="teeth-sparkle">
          <path
            d="M 148 44 L 150 36 L 152 44 L 160 46 L 152 48 L 150 56 L 148 48 L 140 46 Z"
            fill="#38BDF8"
          />
          <circle cx="150" cy="46" r="1.5" fill="#FFFFFF" />
        </g>

        {/* 7. 글자 'い' 오버레이 (두 앞니 기둥에 완벽하게 일체화) */}
        <MnemonicCharOverlay char="い" fontFamily={fontFamily} x="105" y="118" />
      </svg>
    );
  }

  if (char === 'う') {
    // う: 우산 (우산 꼭지와 아래로 둥글게 굽어내려오는 우산 손잡이)
    return (
      <svg
        viewBox="0 0 200 160"
        className="w-full h-full select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 우산 꼭대기 팁 캡 */}
        <path
          d="M 105 24 L 105 32"
          stroke="#0284C7"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx="105" cy="22" r="2.5" fill="#0284C7" />

        {/* 우산 돔 천 실루엣 (반투명 파스텔 스카이) */}
        <path
          d="M 46 72 C 55 36 145 36 160 72 C 142 66 125 70 105 65 C 85 70 65 66 46 72 Z"
          fill="#E0F2FE"
          stroke="#38BDF8"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        {/* 우산 살 라인 */}
        <path
          d="M 105 32 Q 105 52 105 65"
          stroke="#BAE6FD"
          strokeWidth="1.4"
          strokeLinecap="round"
        />

        {/* 우산대 및 굽은 J자 손잡이 (글자 う의 굽은 획과 매칭) */}
        <path
          d="M 105 65 L 105 110 C 105 128 88 132 82 124 C 76 116 84 108 90 110"
          stroke="#78716C"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 앙증맞은 빗방울 포인트 */}
        <ellipse cx="40" cy="98" rx="2" ry="3.5" fill="#7DD3FC" />
        <ellipse cx="168" cy="92" rx="2" ry="3.5" fill="#7DD3FC" />

        {/* 글자 'う' 오버레이 */}
        <MnemonicCharOverlay char="う" fontFamily={fontFamily} x="108" y="118" />
      </svg>
    );
  }

  if (char === 'え') {
    // え: 에어로빅 (민트 헤어밴드를 두르고 팔다리를 신나게 뻗는 에어로빅 체조 스텝)
    return (
      <svg
        viewBox="0 0 200 160"
        className="w-full h-full select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 1. 바닥 리듬 스텝 라인 (바운스 파동선) */}
        <path
          d="M 52 130 C 80 126 124 126 164 130"
          stroke="#E2E8F0"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* 2. 에어로빅 레오타드 몸통 & 다리 실루엣 (글자 え의 대각선 및 하단 스텝과 일치) */}
        <path
          d="M 100 66 L 86 102 C 84 108 88 114 96 114 L 142 122 C 148 123 150 118 146 114 L 116 100 L 112 66 Z"
          fill="#F0FDFA"
          stroke="#99F6E4"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* 발목 레그워머 (오른쪽 뻗은 다리 발목에 주름진 핑크 워머) */}
        <g id="leg-warmer">
          <rect
            x="132"
            y="112"
            width="14"
            height="10"
            rx="3"
            fill="#FCE7F3"
            stroke="#F472B6"
            strokeWidth="1.4"
          />
          <line x1="135" y1="116" x2="143" y2="116" stroke="#F472B6" strokeWidth="1" strokeLinecap="round" />
          {/* 운동화 슈즈 */}
          <path
            d="M 144 120 C 152 120 156 125 150 127 C 144 127 138 126 138 123 Z"
            fill="#FFFFFF"
            stroke="#78716C"
            strokeWidth="1.3"
          />
        </g>

        {/* 3. 역동적으로 뻗은 양팔 & 손목 아대 (에어로빅 동작) */}
        {/* 왼쪽 팔 (옆으로 힘차게 찌르기) */}
        <path
          d="M 94 66 L 56 58"
          stroke="#78716C"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        {/* 왼쪽 손목 핑크 아대 */}
        <rect
          x="54"
          y="53"
          width="7"
          height="10"
          rx="2"
          fill="#F472B6"
          stroke="#DB2777"
          strokeWidth="1.2"
        />

        {/* 오른쪽 팔 (하늘로 번쩍 찌르기) */}
        <path
          d="M 116 64 L 150 48"
          stroke="#78716C"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        {/* 오른쪽 손목 핑크 아대 */}
        <rect
          x="142"
          y="43"
          width="10"
          height="7"
          rx="2"
          transform="rotate(-20 147 46)"
          fill="#F472B6"
          stroke="#DB2777"
          strokeWidth="1.2"
        />

        {/* 4. 에어로빅 선수의 얼굴 & 머리 (글자 え 상단 점 바로 위에 안정적으로 안착) */}
        {/* 동그란 얼굴 */}
        <circle
          cx="108"
          cy="34"
          r="14"
          fill="#FFFFFF"
          stroke="#78716C"
          strokeWidth="1.8"
        />

        {/* 찰랑이는 포니테일 묶음 머리 */}
        <path
          d="M 118 24 C 130 18 136 24 132 32 C 128 34 122 30 118 27 Z"
          fill="#78716C"
        />

        {/* 에어로빅의 핵심: 이마에 두른 민트색 헤어밴드 (포인트 컬러) */}
        <rect
          x="94"
          y="28"
          width="28"
          height="7"
          rx="3.5"
          fill="#2DD4BF"
          stroke="#0F766E"
          strokeWidth="1.5"
        />

        {/* 미소 짓는 눈 & 윙크 */}
        <path d="M 102 36 Q 105 33 108 36" stroke="#78716C" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="114" cy="35" r="1.5" fill="#1C1917" />
        {/* 양 볼터치 (소프트 핑크) */}
        <ellipse cx="100" cy="40" rx="3" ry="2" fill="#FDA4AF" opacity="0.8" />
        <ellipse cx="116" cy="40" rx="3" ry="2" fill="#FDA4AF" opacity="0.8" />

        {/* 5. 운동 열기 & 에너지 효과 (땀방울 & 신나는 비트 음표) */}
        {/* 땀방울 */}
        <ellipse cx="86" cy="30" rx="2" ry="3" fill="#38BDF8" />

        {/* 신나는 8분음표 (음악 리듬) */}
        <g id="rhythm-note">
          <circle cx="166" cy="32" r="3" fill="#F59E0B" />
          <line x1="169" y1="32" x2="169" y2="20" stroke="#F59E0B" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M 169 20 C 173 20 176 23 175 25" stroke="#F59E0B" strokeWidth="1.3" strokeLinecap="round" />
        </g>

        {/* 6. 글자 'え' 오버레이 (인체 포즈와 자연스럽게 결합) */}
        <MnemonicCharOverlay char="え" fontFamily={fontFamily} x="108" y="120" />
      </svg>
    );
  }

  if (char === 'お') {
    // お: 오리 (둥근 머리와 활짝 편 날개깃, 통통한 가슴과 둥근 부리)
    return (
      <svg
        viewBox="0 0 200 160"
        className="w-full h-full select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 오리 둥근 머리 */}
        <circle
          cx="72"
          cy="52"
          r="16"
          fill="#FFFFFF"
          stroke="#78716C"
          strokeWidth="1.8"
        />
        {/* 앙증맞은 오리 눈 */}
        <circle cx="68" cy="50" r="2" fill="#1C1917" />

        {/* 오렌지색 둥근 부리 (포인트 컬러) */}
        <path
          d="M 56 50 C 44 49 42 58 56 57 Z"
          fill="#FB923C"
          stroke="#EA580C"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />

        {/* 둥근 통통한 가슴과 등/날개 실루엣 */}
        <path
          d="M 68 68 C 50 82 54 116 88 126 C 120 134 154 114 142 86 C 136 74 122 72 108 76"
          fill="#FAFAF9"
          stroke="#A8A29E"
          strokeWidth="1.6"
          strokeLinecap="round"
        />

        {/* 물결 라인 (호수 위 오리) */}
        <path
          d="M 42 130 C 58 126 74 134 90 130 C 106 126 122 134 138 130 C 154 126 166 132 172 130"
          stroke="#93C5FD"
          strokeWidth="1.6"
          strokeLinecap="round"
        />

        {/* 튀는 물방울 */}
        <circle cx="152" cy="72" r="2.5" fill="#60A5FA" />

        {/* 글자 'お' 오버레이 */}
        <MnemonicCharOverlay char="お" fontFamily={fontFamily} x="112" y="120" />
      </svg>
    );
  }

  return null;
}
