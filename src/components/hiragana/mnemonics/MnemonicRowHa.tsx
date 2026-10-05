import { MnemonicSvgChildProps } from './types';
import MnemonicCharOverlay from './MnemonicCharOverlay';

export default function MnemonicRowHa({ char, fontFamily }: MnemonicSvgChildProps) {
  if (char === 'は') {
    // は: 하마 (목 없이 어깨에 큼직한 머리가 바로 얹힌 통통하고 듬직한 하마!)
    // ⚠️ 1획은 하마의 기둥 같은 굵은 앞다리와 어깨, 2획은 윗턱선, 3획 루프는 둥근 아랫턱과 혀·엄니와 완벽 일치!
    return (
      <svg
        viewBox="0 0 200 160"
        className="w-full h-full select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 1. 배경 강물 표면 & 잔잔한 물결 */}
        <path
          d="M 0 132 C 45 128 95 136 145 130 C 175 126 190 132 200 130 L 200 160 L 0 160 Z"
          fill="#E0F2FE"
        />
        <path
          d="M 0 132 C 45 128 95 136 145 130 C 175 126 190 132 200 130"
          stroke="#38BDF8"
          strokeWidth="2"
        />
        <path
          d="M 14 146 C 40 142 68 146 94 144"
          stroke="#0284C7"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeDasharray="8 5"
        />
        <path
          d="M 116 146 C 142 143 170 147 192 144"
          stroke="#0284C7"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeDasharray="10 5"
        />

        {/* 2. 강물 위의 싱그러운 수련 잎 & 연꽃 (좌측 하단) */}
        <g id="water-lily">
          <path
            d="M 22 144 C 12 144 8 149 14 154 C 20 158 34 158 38 153 C 40 149 34 146 28 148 L 24 144 Z"
            fill="#86EFAC"
            stroke="#16A34A"
            strokeWidth="1.2"
          />
          <circle cx="18" cy="146" r="2" fill="#FDE047" />
          <path d="M 18 141 C 15 145 21 145 18 141 Z" fill="#F472B6" stroke="#DB2777" strokeWidth="0.8" />
          <path d="M 14 145 C 18 143 18 148 14 145 Z" fill="#F472B6" stroke="#DB2777" strokeWidth="0.8" />
          <path d="M 22 145 C 18 143 18 148 22 145 Z" fill="#F472B6" stroke="#DB2777" strokeWidth="0.8" />
        </g>

        {/* 3. 하마 전체 본체 (듬직하고 둥글넙적한 몸통 + 굵은 앞다리 + 목 없이 바로 붙은 거대한 머리!) */}
        {/* 엉덩이(x=24) -> 듬직한 등(x=50) -> 어깨(x=78) -> 윗머리(x=105) -> 콧등 -> 주둥이 -> 턱 -> 앞다리(x=72~86) */}
        <path
          d="M 24 134 
             C 20 110 28 86 46 70 
             C 58 60 72 56 86 56 
             C 96 44 104 38 116 38 
             C 128 38 144 44 158 50 
             C 166 54 166 64 158 68 
             C 146 70 128 70 114 68 
             C 102 70 98 84 102 96 
             C 106 112 118 126 136 126 
             C 148 126 154 116 144 106 
             C 134 100 118 102 108 112 
             C 98 120 90 102 88 88 
             L 88 134 
             C 88 138 68 138 68 134 
             L 68 106 
             C 55 110 38 120 24 134 Z"
          fill="#94A3B8"
          stroke="#475569"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />

        {/* 앙증맞은 하마 꼬리 (엉덩이 끝) */}
        <path
          d="M 24 100 C 17 104 16 110 19 114"
          stroke="#475569"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <circle cx="19" cy="114" r="1.5" fill="#475569" />

        {/* 앞다리 굵은 근육 음영선 (1획과 완벽 일치하는 수직 라인) */}
        <line x1="68" y1="82" x2="68" y2="134" stroke="#64748B" strokeWidth="1.8" strokeLinecap="round" />
        {/* 앞다리 둥근 발톱 3개 */}
        <circle cx="72" cy="134" r="2.5" fill="#FFFFFF" stroke="#64748B" strokeWidth="0.8" />
        <circle cx="78" cy="134" r="2.5" fill="#FFFFFF" stroke="#64748B" strokeWidth="0.8" />
        <circle cx="84" cy="134" r="2.5" fill="#FFFFFF" stroke="#64748B" strokeWidth="0.8" />

        {/* 하마 등과 윗머리 부드러운 볼륨 하이라이트 */}
        <path
          d="M 36 110 C 44 88 60 68 78 62 C 90 58 102 46 116 44 C 128 44 142 48 152 54"
          stroke="#CBD5E1"
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        {/* 4. 시원하게 벌린 하마 입속 (핑크빛 연코랄) */}
        <path
          d="M 114 68 
             C 130 70 146 70 158 68 
             C 152 82 144 96 144 106 
             C 134 110 120 110 110 102 
             C 98 94 100 78 114 68 Z"
          fill="#FFE4E6"
          stroke="#FDA4AF"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />

        {/* 도톰하고 둥근 분홍 혀 (글자 3획 루프 안쪽과 1:1 완벽 일치!) */}
        <ellipse
          cx="122"
          cy="98"
          rx="13"
          ry="8.5"
          fill="#FB7185"
          stroke="#E11D48"
          strokeWidth="1.5"
        />
        <path d="M 122 93 L 122 101" stroke="#BE123C" strokeWidth="1.2" strokeLinecap="round" />

        {/* 튼튼한 하얀 이빨 & 하마의 상징 대형 엄니! */}
        {/* 윗니 (작고 둥근 이빨) */}
        <rect x="138" y="67" width="7" height="8" rx="3" fill="#FFFFFF" stroke="#64748B" strokeWidth="1.2" />
        {/* 아랫니 대형 엄니 (위로 쑥 솟아오른 둥근 엄니) */}
        <path
          d="M 136 108 C 136 94 144 92 146 96 C 147 102 146 110 143 114 Z"
          fill="#FFFFFF"
          stroke="#64748B"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />

        {/* 5. 하마 얼굴 디테일 (정확한 옆모습) */}
        {/* 뒤쪽 귀 */}
        <ellipse cx="102" cy="36" rx="4.5" ry="6" fill="#64748B" stroke="#475569" strokeWidth="1.2" />
        {/* 앞쪽 귀 (쫑긋한 핑크 귓속) */}
        <ellipse cx="114" cy="34" rx="5.5" ry="7.5" fill="#94A3B8" stroke="#475569" strokeWidth="1.5" />
        <ellipse cx="114" cy="35" rx="3" ry="4.5" fill="#FDA4AF" />

        {/* 맑고 착한 눈망울 (Eye) */}
        <circle cx="122" cy="46" r="5" fill="#FFFDF7" stroke="#475569" strokeWidth="1.2" />
        <circle cx="123" cy="46" r="3" fill="#1E293B" />
        <circle cx="124" cy="45" r="1" fill="#FFFFFF" />
        {/* 온화한 눈썹 */}
        <path d="M 118 40 Q 123 38 127 40" stroke="#475569" strokeWidth="1.2" strokeLinecap="round" />
        {/* 핑크빛 볼터치 */}
        <ellipse cx="116" cy="54" rx="4.5" ry="2.8" fill="#FDA4AF" opacity="0.8" />

        {/* 두툼한 콧망울과 동그란 콧구멍 */}
        <circle cx="154" cy="56" r="2.4" fill="#334155" />
        {/* 콧구멍에서 뿜어 나오는 시원한 물방울 */}
        <circle cx="166" cy="50" r="2.4" fill="#38BDF8" />
        <circle cx="172" cy="45" r="1.8" fill="#BAE6FD" />

        {/* 6. 듬직한 등판 위에 편안하게 앉아있는 귀여운 노란 하마새 (Oxpecker) */}
        <g id="hippo-bird">
          {/* 노란 통통한 몸체 */}
          <ellipse cx="56" cy="56" rx="6" ry="4.5" fill="#FDE047" stroke="#CA8A04" strokeWidth="1" />
          {/* 둥근 머리 */}
          <circle cx="52" cy="53" r="3.5" fill="#FDE047" stroke="#CA8A04" strokeWidth="1" />
          {/* 주황색 부리 */}
          <polygon points="49,53 44,54 49,56" fill="#F97316" />
          {/* 반짝이는 까만 눈 */}
          <circle cx="51" cy="52" r="0.8" fill="#1E293B" />
          {/* 쫑긋한 꼬리깃 */}
          <path d="M 62 55 L 66 52 L 64 57 Z" fill="#EAB308" />
          {/* 얇고 귀여운 두 다리 */}
          <line x1="54" y1="60" x2="54" y2="64" stroke="#78350F" strokeWidth="1" />
          <line x1="58" y1="60" x2="58" y2="64" stroke="#78350F" strokeWidth="1" />
        </g>

        {/* 7. 시원하게 튀는 맑은 물방울들 */}
        <circle cx="48" cy="80" r="2" fill="#38BDF8" />
        <circle cx="42" cy="98" r="1.6" fill="#BAE6FD" />
        <circle cx="164" cy="76" r="2.2" fill="#38BDF8" />
        <circle cx="170" cy="90" r="1.8" fill="#BAE6FD" />
        <circle cx="156" cy="120" r="2.2" fill="#38BDF8" />

        {/* 글자 'は' 오버레이 */}
        <MnemonicCharOverlay char="は" fontFamily={fontFamily} x="108" y="118" />
      </svg>
    );
  }

  if (char === 'ひ') {
    // ひ: 히죽 (기분 좋게 싱글벙글, 선하고 해맑게 "히죽~" 웃는 아이의 따뜻한 미소!)
    // ⚠️ 글자 'ひ' 자체가 활짝 웃는 U자 입모양이 되며, 오른쪽 위로 솟은 곡선이 미소 보조개선과 1:1 완벽 일치!
    return (
      <svg
        viewBox="0 0 200 160"
        className="w-full h-full select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 1. 바닥 미세 그림자 */}
        <ellipse cx="104" cy="142" rx="46" ry="6" fill="#F1F5F9" />

        {/* 2. 양쪽 귀 (스킨톤 + 핑크 귓바퀴 라인) */}
        <g id="ears">
          {/* 왼쪽 귀 */}
          <ellipse cx="44" cy="74" rx="7" ry="10" fill="#FFFBEB" stroke="#F59E0B" strokeWidth="2" />
          <path d="M 44 70 C 42 74 44 78 46 76" stroke="#FDA4AF" strokeWidth="1.5" strokeLinecap="round" />
          {/* 오른쪽 귀 */}
          <ellipse cx="164" cy="74" rx="7" ry="10" fill="#FFFBEB" stroke="#F59E0B" strokeWidth="2" />
          <path d="M 164 70 C 166 74 164 78 162 76" stroke="#FDA4AF" strokeWidth="1.5" strokeLinecap="round" />
        </g>

        {/* 3. 얼굴 본체 (볼살이 통통하고 사랑스러운 둥근 얼굴) */}
        <path
          d="M 50 72 
             C 48 38 72 24 104 24 
             C 136 24 160 38 158 72 
             C 158 106 142 136 104 136 
             C 66 136 50 106 50 72 Z"
          fill="#FFFBEB"
          stroke="#F59E0B"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* 4. 귀여운 헤어스타일 (정수리 삐죽 솟은 머리 2가닥) */}
        <g id="hair">
          <path
            d="M 100 24 C 96 12 106 10 109 16 C 113 9 124 12 118 24 Z"
            fill="#78350F"
            stroke="#451A03"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </g>

        {/* 5. 선한 웃음: 온화하고 부드러운 눈썹 & 해맑은 반달 눈웃음 */}
        {/* 온화하고 다정한 눈썹 (양쪽 대칭의 편안한 아치형) */}
        <path
          d="M 72 36 Q 82 30 92 35"
          stroke="#78350F"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <path
          d="M 116 35 Q 126 30 136 36"
          stroke="#78350F"
          strokeWidth="2.4"
          strokeLinecap="round"
        />

        {/* 선하고 다정한 반달 눈웃음 (해맑고 순수한 미소) */}
        <path
          d="M 72 49 Q 82 40 92 49"
          stroke="#78350F"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        <path
          d="M 116 49 Q 126 40 136 49"
          stroke="#78350F"
          strokeWidth="2.8"
          strokeLinecap="round"
        />

        {/* 앙증맞은 작은 코 */}
        <path
          d="M 103 52 Q 105 54 107 52"
          stroke="#B45309"
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        {/* 6. 부드러운 미소 입모양 바탕 (글자 ひ의 U자 굴곡을 받쳐주는 깔끔하고 따뜻한 연분홍) */}
        <path
          d="M 80 62 
             C 78 88 84 114 104 114 
             C 122 114 128 90 128 62 
             C 114 58 94 58 80 62 Z"
          fill="#FFE4E6"
          stroke="#FDA4AF"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* 7. 양 볼의 화사하고 사랑스러운 복숭아빛 볼터치 */}
        {/* 왼쪽 볼 */}
        <circle cx="62" cy="74" r="9" fill="#FDA4AF" opacity="0.7" />
        {/* 오른쪽 볼 */}
        <circle cx="146" cy="74" r="9" fill="#FDA4AF" opacity="0.7" />

        {/* 오른쪽 입꼬리 자연스러운 미소 보조개선 (글자 ひ 우측 곡선과 연결) */}
        <path
          d="M 136 64 C 143 70 143 80 138 86"
          stroke="#FDA4AF"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* 8. 기분 좋은 미소를 나타내는 따뜻한 황금빛 반짝이 */}
        <path
          d="M 166 28 Q 166 33 171 33 Q 166 33 166 38 Q 166 33 161 33 Q 166 33 166 28 Z"
          fill="#F59E0B"
        />
        <circle cx="174" cy="26" r="1.2" fill="#FBBF24" />

        {/* 글자 'ひ' 오버레이 (정중앙에서 활짝 웃는 미소 입 완성) */}
        <MnemonicCharOverlay char="ひ" fontFamily={fontFamily} x="108" y="118" />
      </svg>
    );
  }

  if (char === 'ふ') {
    // ふ: 후라이팬 (차콜 블랙 무쇠 팬, 튼튼한 원목 손잡이, 지글지글 써니 사이드 업 계란 프라이와 '후~' 부는 김!)
    // ⚠️ 1획은 모락모락 피어오르는 김, 2획은 탱글탱글한 계란 노른자와 흰자위 곡선, 3획은 프라이팬 손잡이와 1:1 완벽 일치!
    return (
      <svg
        viewBox="0 0 200 160"
        className="w-full h-full select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 1. 바닥 입체 그림자 */}
        <ellipse cx="112" cy="138" rx="54" ry="8" fill="#CBD5E1" opacity="0.6" />

        {/* 2. 프라이팬 튼튼한 원목 손잡이 (Wooden Handle - 글자 3획 좌측 삐침과 1:1 일치!) */}
        {/* 원목 손잡이 본체 (좌하단으로 뻗음) */}
        <path
          d="M 72 98 L 36 116 C 32 118 30 124 34 128 C 38 132 44 130 48 126 L 80 108 Z"
          fill="#92400E"
          stroke="#451A03"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        {/* 손잡이 상단 원목 광택 라인 */}
        <path
          d="M 68 100 L 40 114"
          stroke="#F59E0B"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* 손잡이 끝의 금속 걸이 구멍 (Hanging hole) */}
        <circle cx="38" cy="123" r="3.2" fill="#F1F5F9" stroke="#451A03" strokeWidth="1.4" />
        {/* 팬과 손잡이를 고정하는 금속 브래킷 & 리벳 볼트 2개 */}
        <path d="M 74 97 L 82 93 L 88 105 L 80 109 Z" fill="#64748B" stroke="#334155" strokeWidth="1" />
        <circle cx="78" cy="100" r="1.2" fill="#E2E8F0" />
        <circle cx="82" cy="105" r="1.2" fill="#E2E8F0" />

        {/* 3. 프라이팬 본체 (Frying Pan Body - 차콜 블랙 무쇠 팬 & 림) */}
        {/* 팬 외곽 원형 본체 (도톰하고 묵직한 볼륨감) */}
        <ellipse
          cx="116"
          cy="94"
          rx="52"
          ry="37"
          fill="#1E293B"
          stroke="#0F172A"
          strokeWidth="2.5"
        />
        {/* 팬 상단 도톰한 림 금속 반사광 */}
        <path
          d="M 74 88 C 88 64 144 64 164 86"
          stroke="#64748B"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* 팬 안쪽 조리 바닥면 (Cooking Surface) */}
        <ellipse
          cx="116"
          cy="96"
          rx="45"
          ry="29"
          fill="#334155"
          stroke="#1E293B"
          strokeWidth="1.5"
        />

        {/* 4. 지글지글 써니 사이드 업 계란 프라이 (Fried Egg - 글자 2획·4획과 일치!) */}
        {/* 부드럽고 노릇노릇하게 익은 계란 흰자위 */}
        <path
          d="M 88 94 
             C 88 80 114 74 136 78 
             C 150 82 154 100 144 112 
             C 132 124 104 124 94 114 
             C 86 106 88 100 88 94 Z"
          fill="#FFFFFF"
          stroke="#FDE68A"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {/* 흰자위 안쪽 음영 */}
        <path
          d="M 94 96 C 96 86 116 80 132 84 C 144 88 146 102 138 110 C 128 118 106 118 98 110 Z"
          fill="#F8FAFC"
        />

        {/* 탱글탱글하고 신선한 황금빛 계란 노른자 (Egg Yolk) */}
        <circle
          cx="116"
          cy="95"
          r="14"
          fill="#F59E0B"
          stroke="#D97706"
          strokeWidth="2"
        />
        {/* 노른자 입체 하이라이트 광택 */}
        <ellipse
          cx="112"
          cy="91"
          rx="4.5"
          ry="2.5"
          fill="#FEF08A"
          transform="rotate(-25 112 91)"
        />
        <circle cx="117" cy="89" r="1.2" fill="#FFFFFF" />

        {/* 지글지글 튀는 고소한 기름 방울들 (Sizzling oil bubbles) */}
        <circle cx="148" cy="92" r="2" fill="#FDE047" />
        <circle cx="142" cy="116" r="1.6" fill="#FDE047" />
        <circle cx="86" cy="108" r="1.6" fill="#FDE047" />

        {/* 5. 모락모락 피어오르는 뜨거운 김 ('후~' 불어 식히는 바람 - 글자 1획과 1:1 완벽 일치!) */}
        {/* 1획 상단 삐침선 뒤로 솟아오르는 메인 김 라인 */}
        <path
          d="M 112 60 C 110 48 118 42 116 32"
          stroke="#60A5FA"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* 보조 스팀 라인 */}
        <path
          d="M 124 58 C 128 48 126 40 132 34"
          stroke="#93C5FD"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeDasharray="6 3"
        />
        <circle cx="118" cy="26" r="1.5" fill="#BAE6FD" />

        {/* 글자 'ふ' 오버레이 */}
        <MnemonicCharOverlay char="ふ" fontFamily={fontFamily} x="108" y="118" />
      </svg>
    );
  }

  if (char === 'へ') {
    // へ: 헤엄 (파란 수영복을 입고 시원하게 물살을 가르며 헤엄치는 자연스럽고 귀여운 수영선수!)
    // ⚠️ 글자 'へ'의 산 모양(^) 궤적과 수영선수의 솟구친 하이 엘보 팔 스트로크가 1:1 완벽 일치!
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

        {/* 6. 글자 'へ'의 완벽한 궤적: 하이 엘보 리커버리 오른팔 (스트로크) */}
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

        {/* 글자 'へ' 오버레이 */}
        <MnemonicCharOverlay char="へ" fontFamily={fontFamily} x="108" y="116" />
      </svg>
    );
  }

  if (char === 'ほ') {
    // ほ: 호랑이 (늠름한 앞다리와 이마의 王자, 포효하는 입과 쫑긋 귀를 지닌 멋진 호랑이!)
    // ⚠️ 1획은 땅을 딛는 굵은 앞다리, 2·3획은 이마·뺨의 호피 줄무늬, 4획 상단 삐침은 쫑긋 귀, 하단 루프는 포효하는 입·엄니와 1:1 완벽 일치!
    return (
      <svg
        viewBox="0 0 200 160"
        className="w-full h-full select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 1. 배경 대나무 숲 잎사귀 포인트 & 바위 지면 */}
        {/* 좌상단 싱그러운 대나무 잎 */}
        <g id="bamboo-leaves" opacity="0.85">
          <path d="M 18 20 C 30 18 44 26 50 34 C 38 32 26 28 18 20 Z" fill="#4ADE80" stroke="#16A34A" strokeWidth="1" />
          <path d="M 28 26 C 42 26 54 36 58 46 C 46 42 34 36 28 26 Z" fill="#22C55E" stroke="#15803D" strokeWidth="1" />
          <path d="M 12 28 C 22 32 30 42 32 52 C 24 46 18 38 12 28 Z" fill="#86EFAC" stroke="#16A34A" strokeWidth="1" />
        </g>
        {/* 하단 지면 바위 라인 */}
        <path
          d="M 10 134 C 45 130 90 136 140 132 C 170 130 190 134 200 132 L 200 160 L 0 160 L 0 134 Z"
          fill="#F8FAFC"
        />
        <path
          d="M 10 134 C 45 130 90 136 140 132 C 170 130 190 134 200 132"
          stroke="#E2E8F0"
          strokeWidth="2"
        />

        {/* 2. 호랑이 몸통 & 등 & 살랑이는 줄무늬 꼬리 (우측 뒤편) */}
        {/* 몸통 (등과 엉덩이) */}
        <path
          d="M 128 78 C 146 76 166 84 172 100 C 176 112 174 126 168 132 C 158 134 144 132 136 128 Z"
          fill="#EA580C"
          stroke="#C2410C"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        {/* 등 부분 하이라이트 톤 */}
        <path
          d="M 132 82 C 146 80 160 86 166 98 C 158 98 144 94 134 88 Z"
          fill="#F97316"
        />
        {/* 등 호피 줄무늬 2개 */}
        <path d="M 144 80 L 148 94 L 140 88 Z" fill="#1E293B" />
        <path d="M 158 86 L 160 102 L 152 96 Z" fill="#1E293B" />

        {/* 살랑살랑 위로 솟은 호랑이 꼬리 (S-Curve Tail) */}
        <path
          d="M 168 106 
             C 178 98 184 84 180 72 
             C 176 62 166 60 162 66 
             C 160 70 164 74 168 72 
             C 172 70 174 76 172 82 
             C 170 92 164 100 160 106 Z"
          fill="#EA580C"
          stroke="#C2410C"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        {/* 꼬리 끝 검은 털 */}
        <path
          d="M 162 66 C 160 70 164 74 168 72 C 172 70 174 64 166 62 Z"
          fill="#1E293B"
        />
        {/* 꼬리 줄무늬 링 2개 */}
        <path d="M 174 78 L 180 76" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 170 88 L 176 88" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />

        {/* 3. 호랑이 1획: 늠름하게 땅을 딛고 선 왼쪽 앞다리 & 발 (글자 ほ 1획과 완벽 일치!) */}
        {/* 어깨에서 발바닥까지 단단하게 뻗은 앞다리 기둥 */}
        <path
          d="M 62 46 
             C 60 62 58 86 58 116 
             C 58 122 56 128 58 132 
             C 62 134 76 134 78 130 
             C 78 122 78 96 78 68 
             C 78 54 74 46 68 44 Z"
          fill="#F97316"
          stroke="#C2410C"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {/* 둥근 앞발 & 발가락 3개 & 하얀 발톱 */}
        <path
          d="M 56 124 C 54 132 64 135 78 135 C 84 135 84 126 80 122 C 74 122 66 122 56 124 Z"
          fill="#FFF7ED"
          stroke="#C2410C"
          strokeWidth="1.6"
        />
        {/* 발가락 구분선 */}
        <line x1="64" y1="126" x2="64" y2="134" stroke="#EA580C" strokeWidth="1.3" />
        <line x1="72" y1="126" x2="72" y2="134" stroke="#EA580C" strokeWidth="1.3" />
        {/* 발톱 3개 */}
        <path d="M 58 133 L 60 136 L 62 133 Z" fill="#FFFFFF" stroke="#78716C" strokeWidth="0.8" />
        <path d="M 66 133 L 68 136 L 70 133 Z" fill="#FFFFFF" stroke="#78716C" strokeWidth="0.8" />
        <path d="M 74 133 L 76 136 L 78 133 Z" fill="#FFFFFF" stroke="#78716C" strokeWidth="0.8" />
        {/* 앞다리 블랙 호피 줄무늬 3개 (글자 1획의 세로 텐션 보강) */}
        <path d="M 59 72 L 72 70 L 68 76 Z" fill="#1E293B" />
        <path d="M 58 92 L 72 90 L 67 96 Z" fill="#1E293B" />
        <path d="M 58 110 L 70 108 L 66 114 Z" fill="#1E293B" />

        {/* 4. 호랑이 얼굴 & 쫑긋 귀 (4획 상단 삐침과 완벽 일치!) */}
        {/* 왼쪽 귀 */}
        <path
          d="M 94 48 C 90 34 98 26 106 32 C 110 36 108 46 104 50 Z"
          fill="#F97316"
          stroke="#C2410C"
          strokeWidth="1.8"
        />
        <path d="M 97 44 C 95 36 100 32 104 36 C 105 40 103 45 101 46 Z" fill="#FED7AA" />

        {/* 오른쪽 귀 (★ ほ 글자의 4획 상단 삐침 x=118, y=24~48과 1:1 완벽 일치!) */}
        <path
          d="M 116 46 C 114 30 124 22 132 28 C 138 34 134 46 128 50 Z"
          fill="#F97316"
          stroke="#C2410C"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {/* 오른쪽 귀 안쪽 핑크/화이트 솜털 */}
        <path d="M 120 42 C 119 32 126 28 130 32 C 132 36 130 42 126 44 Z" fill="#FED7AA" />
        {/* 호랑이 귀 뒤쪽 시그니처 흰 반점(호안반) 느낌의 림 */}
        <circle cx="127" cy="27" r="1.8" fill="#FFFFFF" />

        {/* 얼굴 메인 헤드 베이스 (골든 오렌지 털) */}
        <path
          d="M 98 52 
             C 108 46 128 46 138 52 
             C 148 58 152 70 148 84 
             C 144 94 134 100 124 102 
             C 112 102 100 98 94 86 
             C 90 74 92 58 98 52 Z"
          fill="#F97316"
          stroke="#C2410C"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* 양 볼의 풍성한 하얀 볼 털 (Fluffy Cheeks) */}
        <path
          d="M 92 78 C 84 82 82 92 88 98 C 96 104 104 102 106 96 C 98 96 94 88 92 78 Z"
          fill="#FFF7ED"
          stroke="#EA580C"
          strokeWidth="1.2"
        />
        <path
          d="M 146 78 C 154 82 156 92 150 98 C 142 104 134 102 132 96 C 140 96 144 88 146 78 Z"
          fill="#FFF7ED"
          stroke="#EA580C"
          strokeWidth="1.2"
        />

        {/* 5. 이마의 상징: 王 (임금 왕) 자 무늬 & 2·3획 호피 줄무늬 */}
        {/* 이마 중앙 王자 무늬 */}
        <g id="tiger-king-mark">
          {/* 상단 가로선 (2획 부근) */}
          <line x1="112" y1="52" x2="126" y2="52" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
          {/* 중간 가로선 */}
          <line x1="114" y1="58" x2="124" y2="58" stroke="#1E293B" strokeWidth="2.2" strokeLinecap="round" />
          {/* 세로 기둥 (4획 세로축과 연결) */}
          <line x1="119" y1="50" x2="119" y2="65" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
          {/* 하단 가로선 */}
          <line x1="110" y1="65" x2="128" y2="65" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
        </g>

        {/* 뺨 양쪽의 블랙 타이거 쐐기 줄무늬 (2획, 3획 레벨과 조화) */}
        {/* 왼쪽 볼 줄무늬 */}
        <path d="M 92 68 L 104 70 L 96 74 Z" fill="#1E293B" />
        <path d="M 90 82 L 102 82 L 94 86 Z" fill="#1E293B" />
        {/* 오른쪽 볼 줄무늬 */}
        <path d="M 144 68 L 132 70 L 140 74 Z" fill="#1E293B" />
        <path d="M 146 82 L 134 82 L 142 86 Z" fill="#1E293B" />

        {/* 6. 용맹하고 총명한 호랑이 눈 & 눈썹 */}
        {/* 눈썹 위 하얀 반점 포인트 */}
        <ellipse cx="106" cy="62" rx="3.5" ry="2" fill="#FFF7ED" />
        <ellipse cx="132" cy="62" rx="3.5" ry="2" fill="#FFF7ED" />
        {/* 왼쪽 눈 (골드 홍채 + 블랙 동공 + 하이라이트) */}
        <ellipse cx="106" cy="70" rx="4.5" ry="3.5" fill="#FBBF24" stroke="#1E293B" strokeWidth="1.5" />
        <circle cx="106" cy="70" r="2" fill="#0F172A" />
        <circle cx="107.5" cy="68.5" r="0.9" fill="#FFFFFF" />
        {/* 오른쪽 눈 */}
        <ellipse cx="132" cy="70" rx="4.5" ry="3.5" fill="#FBBF24" stroke="#1E293B" strokeWidth="1.5" />
        <circle cx="132" cy="70" r="2" fill="#0F172A" />
        <circle cx="133.5" cy="68.5" r="0.9" fill="#FFFFFF" />

        {/* 핑크빛 삼각형 코 & 하얀 주둥이 패드 */}
        <path
          d="M 113 78 C 113 75 125 75 125 78 C 125 82 119 86 119 86 C 119 86 113 82 113 78 Z"
          fill="#FB7185"
          stroke="#E11D48"
          strokeWidth="1.2"
        />
        {/* 하얀 수염 패드 (Whiskers Pad) */}
        <path
          d="M 112 85 C 106 85 104 92 110 95 C 115 97 119 93 119 88 C 119 93 123 97 128 95 C 134 92 132 85 126 85 Z"
          fill="#FFF7ED"
          stroke="#EA580C"
          strokeWidth="1"
        />
        {/* 빳빳한 하얀 호랑이 수염 */}
        <path d="M 108 90 L 88 88" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M 108 93 L 86 96" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M 130 90 L 150 88" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M 130 93 L 152 96" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />

        {/* 7. 4획 하단 루프: "어흥~!" 포효하는 입 & 날카로운 엄니와 핑크빛 혀 (글자 ほ 루프와 완벽 일치!) */}
        {/* 쩌억 벌린 둥근 입속 챔버 (루프 궤적과 일치) */}
        <path
          d="M 112 94 
             C 104 98 100 110 106 120 
             C 112 128 126 128 132 120 
             C 138 110 134 98 126 94 Z"
          fill="#881337"
          stroke="#C2410C"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {/* 입속 핑크빛 볼록한 혓바닥 */}
        <path
          d="M 110 116 C 114 112 124 112 128 116 C 126 124 112 124 110 116 Z"
          fill="#FB7185"
        />
        {/* 상단 날카로운 하얀 송곳니 2개 (엄니) */}
        <path d="M 112 95 L 115 104 L 118 95 Z" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="0.6" />
        <path d="M 120 95 L 123 104 L 126 95 Z" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="0.6" />
        {/* 하단 송곳니 2개 */}
        <path d="M 110 120 L 113 114 L 116 120 Z" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="0.6" />
        <path d="M 122 120 L 125 114 L 128 120 Z" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="0.6" />
        {/* 둥근 아래턱 하얀 턱 털 */}
        <path
          d="M 106 120 C 112 128 126 128 132 120 C 130 126 108 126 106 120 Z"
          fill="#FFF7ED"
        />

        {/* 8. 포효하는 "어흥!" 음파 라인 (Roar Waves) */}
        <path
          d="M 140 114 C 146 110 152 114 156 112"
          stroke="#F97316"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M 142 122 C 150 118 158 124 164 120"
          stroke="#FB923C"
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        {/* 글자 'ほ' 오버레이 */}
        <MnemonicCharOverlay char="ほ" fontFamily={fontFamily} x="108" y="118" />
      </svg>
    );
  }

  return null;
}
