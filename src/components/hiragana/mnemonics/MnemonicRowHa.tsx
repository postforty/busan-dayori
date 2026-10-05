import { MnemonicSvgChildProps } from './types';
import MnemonicCharOverlay from './MnemonicCharOverlay';

export default function MnemonicRowHa({ char, fontFamily }: MnemonicSvgChildProps) {
  if (char === 'は') {
    // は: 하마 (시원하게 "하~!" 하고 입을 쩌억 벌린 사랑스러운 하마의 반정면 클로즈업!)
    // ⚠️ 1획은 왼쪽 턱선/볼 윤곽, 2획은 크게 벌린 윗입술·윗니, 3획 세로+루프는 쩌억 벌린 입속과 동그란 혀·엄니와 1:1 완벽 일치!
    return (
      <svg
        viewBox="0 0 200 160"
        className="w-full h-full select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 1. 배경 잔잔한 강물 표면 & 물결 */}
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
          d="M 126 146 C 150 143 174 147 194 144"
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

        {/* 3. 하마 어깨 및 물속 가슴선 (물속에 잠긴 듬직한 실루엣) */}
        <path
          d="M 44 142 C 48 126 62 118 76 116 C 92 116 102 124 108 136 Z"
          fill="#64748B"
          opacity="0.3"
        />
        <path
          d="M 38 142 C 44 122 64 112 82 112 C 104 112 146 122 168 142 Z"
          fill="#94A3B8"
          stroke="#475569"
          strokeWidth="2"
        />

        {/* 4. 하마 얼굴 본체 (클로즈업: 1획과 완벽하게 일치하는 왼쪽 볼·턱 라인!) */}
        <path
          d="M 84 32
             C 72 32 68 45 68 62
             C 68 82 72 104 74 124
             C 74 134 86 138 102 138
             C 126 138 152 134 160 120
             C 168 104 168 70 158 48
             C 150 32 130 28 112 28
             C 98 28 90 32 84 32 Z"
          fill="#94A3B8"
          stroke="#475569"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* 하마 정수리 볼륨 하이라이트 */}
        <path
          d="M 88 34 C 98 31 114 31 126 34"
          stroke="#CBD5E1"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* 1획 가이드 음영 (왼쪽 턱선과 1획의 세로 텐션을 강조하는 볼륨 라인) */}
        <path
          d="M 74 42 C 72 65 72 95 76 124"
          stroke="#64748B"
          strokeWidth="2.2"
          strokeLinecap="round"
        />

        {/* 5. 쫑긋한 두 귀 (양쪽 귓속 핑크 포인트) */}
        {/* 왼쪽 귀 */}
        <path
          d="M 66 35 C 58 24 64 14 74 18 C 78 22 78 30 74 36 Z"
          fill="#94A3B8"
          stroke="#475569"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path d="M 67 31 C 62 25 66 18 72 21 C 74 24 74 29 71 33 Z" fill="#FDA4AF" />

        {/* 오른쪽 귀 */}
        <path
          d="M 142 32 C 148 18 158 16 164 24 C 166 30 160 38 154 38 Z"
          fill="#94A3B8"
          stroke="#475569"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path d="M 147 29 C 151 22 157 20 160 25 C 161 29 158 34 154 34 Z" fill="#FDA4AF" />

        {/* 6. 착하고 순한 눈망울 & 핑크빛 볼터치 */}
        {/* 왼쪽 눈 */}
        <circle cx="82" cy="46" r="6" fill="#FFFDF7" stroke="#475569" strokeWidth="1.4" />
        <circle cx="83" cy="46" r="3.6" fill="#1E293B" />
        <circle cx="84.5" cy="44.5" r="1.3" fill="#FFFFFF" />
        <path d="M 76 38 Q 82 35 88 38" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" />
        <ellipse cx="80" cy="56" rx="5" ry="3" fill="#FDA4AF" opacity="0.8" />

        {/* 오른쪽 눈 */}
        <circle cx="140" cy="42" r="6" fill="#FFFDF7" stroke="#475569" strokeWidth="1.4" />
        <circle cx="139" cy="42" r="3.6" fill="#1E293B" />
        <circle cx="140.5" cy="40.5" r="1.3" fill="#FFFFFF" />
        <path d="M 134 34 Q 140 31 146 34" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" />
        <ellipse cx="146" cy="52" rx="5" ry="3" fill="#FDA4AF" opacity="0.8" />

        {/* 넙적한 콧등 볼륨 & 동그란 두 콧구멍 */}
        <path
          d="M 94 48 C 100 42 130 40 136 46"
          stroke="#64748B"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="106" cy="47" r="2.8" fill="#334155" />
        <circle cx="124" cy="46" r="2.8" fill="#334155" />

        {/* 7. 시원하게 쩌억 벌린 하마 입속 (구강) - ★ 2획 & 3획과 1:1 완벽 일치! */}
        {/* 입속 전체 (핑크빛 구강 바탕) */}
        <path
          d="M 94 56
             C 108 52 134 52 148 56
             C 156 68 156 86 150 102
             C 144 118 134 128 120 128
             C 104 128 94 118 90 102
             C 86 86 86 68 94 56 Z"
          fill="#FFE4E6"
          stroke="#FDA4AF"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* 입속 깊은 목구멍 음영 */}
        <path
          d="M 102 68
             C 112 62 128 62 138 68
             C 140 80 138 90 120 90
             C 102 90 100 80 102 68 Z"
          fill="#FB7185"
          opacity="0.35"
        />

        {/* 도툼한 윗입술 라인 (글자 2획의 수평 궤적과 1:1 일치!) */}
        <path
          d="M 94 56 C 108 52 134 52 148 56"
          stroke="#F43F5E"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* 윗입술 아래 가지런한 하얀 윗니 3개 */}
        <rect x="104" y="55" width="7" height="7" rx="2.5" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="1" />
        <rect x="116" y="54" width="7" height="7.5" rx="2.5" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="1" />
        <rect x="128" y="55" width="7" height="7" rx="2.5" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="1" />

        {/* 도톰하고 둥근 분홍 혀 (★ 글자 3획 루프 안쪽에 1:1 완벽 안착!) */}
        <ellipse
          cx="120"
          cy="110"
          rx="14.5"
          ry="9.5"
          fill="#FB7185"
          stroke="#E11D48"
          strokeWidth="1.8"
        />
        <path d="M 120 104 L 120 114" stroke="#BE123C" strokeWidth="1.6" strokeLinecap="round" />

        {/* 하마의 상징: 위로 솟아오른 튼튼한 하얀 대형 엄니들! */}
        {/* 오른쪽 대형 엄니 (3획 루프 오른쪽 외곽과 완벽 조화) */}
        <path
          d="M 135 116 C 134 98 144 96 146 102 C 147 110 145 118 140 122 Z"
          fill="#FFFFFF"
          stroke="#64748B"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        {/* 왼쪽 보조 엄니 */}
        <path
          d="M 97 118 C 96 104 103 102 105 108 C 106 114 104 118 100 122 Z"
          fill="#FFFFFF"
          stroke="#64748B"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />

        {/* 8. 하마 머리 위에 앙증맞게 앉아있는 노란 하마새 (Oxpecker) */}
        <g id="hippo-bird">
          {/* 노란 통통한 몸체 */}
          <ellipse cx="112" cy="22" rx="5.5" ry="4" fill="#FDE047" stroke="#CA8A04" strokeWidth="1" />
          {/* 둥근 머리 */}
          <circle cx="107" cy="19" r="3.2" fill="#FDE047" stroke="#CA8A04" strokeWidth="1" />
          {/* 주황색 부리 */}
          <polygon points="104,19 99,20 104,22" fill="#F97316" />
          {/* 반짝이는 까만 눈 */}
          <circle cx="106" cy="18.5" r="0.7" fill="#1E293B" />
          {/* 꼬리깃 */}
          <path d="M 117,21 L 121,18 L 119,23 Z" fill="#EAB308" />
          {/* 귀여운 두 다리 */}
          <line x1="110" y1="26" x2="110" y2="29" stroke="#78350F" strokeWidth="0.9" />
          <line x1="114" y1="26" x2="114" y2="29" stroke="#78350F" strokeWidth="0.9" />
        </g>

        {/* 9. 시원하게 "하~" 뿜으며 튀는 맑은 물방울들 */}
        <circle cx="98" cy="40" r="1.8" fill="#38BDF8" />
        <circle cx="102" cy="33" r="2.4" fill="#BAE6FD" />
        <circle cx="130" cy="32" r="2" fill="#38BDF8" />
        <circle cx="158" cy="74" r="2.2" fill="#38BDF8" />
        <circle cx="166" cy="88" r="1.6" fill="#BAE6FD" />
        <circle cx="58" cy="78" r="2" fill="#38BDF8" />
        <circle cx="52" cy="94" r="1.5" fill="#BAE6FD" />

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
    // ほ: 호랑이 (듬직한 어깨와 앞다리, 이마의 王자, 포효하는 입과 쫑긋 귀를 지닌 늠름한 호랑이!)
    // ⚠️ 1획은 어깨에서 땅을 딛는 굵은 앞다리, 2·3획은 이마·뺨의 호피 줄무늬, 4획 상단 삐침은 쫑긋 귀, 하단 루프는 포효하는 입·엄니와 1:1 완벽 일치!
    return (
      <svg
        viewBox="0 0 200 160"
        className="w-full h-full select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 1. 배경 바위 지면 */}
        <path
          d="M 0 134 C 45 130 90 136 140 132 C 170 130 190 134 200 132 L 200 160 L 0 160 Z"
          fill="#F8FAFC"
        />
        <path
          d="M 0 134 C 45 130 90 136 140 132 C 170 130 190 134 200 132"
          stroke="#E2E8F0"
          strokeWidth="2"
        />

        {/* 2. 호랑이 전체 몸통 베이스 (어깨·등·엉덩이·배가 앞다리와 하나로 자연스럽게 연결된 전신!) */}
        <path
          d="M 168 132
             C 176 122 176 98 168 84
             C 158 74 138 72 124 76
             C 106 72 86 54 74 44
             C 68 40 62 44 58 54
             C 56 68 56 94 56 124
             L 56 132
             C 56 136 80 136 80 132
             C 80 120 78 102 80 88
             C 84 94 92 106 96 122
             C 100 134 130 136 168 132 Z"
          fill="#EA580C"
          stroke="#C2410C"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />

        {/* 등 부분 하이라이트 볼륨 */}
        <path
          d="M 128 80 C 144 76 160 84 164 96 C 156 96 142 92 130 86 Z"
          fill="#F97316"
        />
        {/* 등 호피 줄무늬 2개 */}
        <path d="M 142 80 L 146 94 L 138 88 Z" fill="#1E293B" />
        <path d="M 156 86 L 158 100 L 150 94 Z" fill="#1E293B" />

        {/* 살랑살랑 위로 솟은 호랑이 꼬리 (S-Curve Tail) */}
        <path
          d="M 166 104
             C 176 96 182 82 178 72
             C 174 62 164 60 160 66
             C 158 70 162 74 166 72
             C 170 70 172 76 170 82
             C 168 92 162 100 158 104 Z"
          fill="#EA580C"
          stroke="#C2410C"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        {/* 꼬리 끝 검은 털 */}
        <path
          d="M 160 66 C 158 70 162 74 166 72 C 170 70 172 64 164 62 Z"
          fill="#1E293B"
        />
        {/* 꼬리 줄무늬 링 2개 */}
        <path d="M 172 78 L 178 76" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 168 88 L 174 88" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />

        {/* 3. 호랑이 앞가슴 & 어깨 연결 디테일 (다리와 몸통 사이의 완벽한 유기적 연결!) */}
        {/* 어깨 상단 근육 하이라이트 (1획 상단으로 부드럽게 흐르는 어깨 라인) */}
        <path
          d="M 60 52 C 64 44 72 44 80 48 C 90 54 104 68 114 74"
          stroke="#FDBA74"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* 다리 뒤편의 부드럽고 풍성한 하얀 앞가슴 털 (Chest Fur) */}
        <path
          d="M 78 86 C 84 80 92 82 96 86 C 98 96 96 112 92 122 C 86 124 80 120 78 110 Z"
          fill="#FFF7ED"
          stroke="#EA580C"
          strokeWidth="1.2"
        />

        {/* 반대편(오른쪽) 얌전하게 땅을 딛고 있는 앞발 */}
        <path
          d="M 86 124 C 86 120 96 120 98 124 L 98 133 C 98 135 86 135 86 133 Z"
          fill="#FFF7ED"
          stroke="#C2410C"
          strokeWidth="1.4"
        />
        <line x1="92" y1="126" x2="92" y2="133" stroke="#EA580C" strokeWidth="1" />

        {/* 4. 호랑이 1획: 어깨에서 당당하게 뻗어내려 땅을 딛는 왼쪽 앞다리 & 발 (글자 ほ 1획과 완벽 일치!) */}
        {/* 앞다리 전면 밝은 오렌지 하이라이트 톤 */}
        <path
          d="M 60 52 C 58 68 58 94 58 122 L 78 122 C 78 98 76 68 74 48 C 68 44 62 46 60 52 Z"
          fill="#F97316"
        />

        {/* 1획 세로 근육 음영 라인 (1획의 곧은 텐션을 확실하게 살려줌) */}
        <line x1="68" y1="48" x2="68" y2="124" stroke="#EA580C" strokeWidth="1.8" strokeLinecap="round" />

        {/* 둥근 앞발 & 발가락 3개 & 하얀 발톱 */}
        <path
          d="M 54 122 C 52 130 62 135 78 135 C 84 135 84 126 80 120 C 74 120 64 120 54 122 Z"
          fill="#FFF7ED"
          stroke="#C2410C"
          strokeWidth="1.6"
        />
        {/* 발가락 구분선 */}
        <line x1="62" y1="124" x2="62" y2="134" stroke="#EA580C" strokeWidth="1.3" />
        <line x1="70" y1="124" x2="70" y2="134" stroke="#EA580C" strokeWidth="1.3" />
        {/* 발톱 3개 */}
        <path d="M 56 133 L 58 136 L 60 133 Z" fill="#FFFFFF" stroke="#78716C" strokeWidth="0.8" />
        <path d="M 64 133 L 66 136 L 68 133 Z" fill="#FFFFFF" stroke="#78716C" strokeWidth="0.8" />
        <path d="M 72 133 L 74 136 L 76 133 Z" fill="#FFFFFF" stroke="#78716C" strokeWidth="0.8" />

        {/* 앞다리 블랙 호피 줄무늬 3개 (글자 1획의 세로 텐션 보강) */}
        <path d="M 57 70 L 72 68 L 66 74 Z" fill="#1E293B" />
        <path d="M 57 90 L 72 88 L 66 94 Z" fill="#1E293B" />
        <path d="M 57 110 L 70 108 L 65 114 Z" fill="#1E293B" />

        {/* 5. 호랑이 얼굴 & 쫑긋 귀 (4획 상단 삐침과 완벽 일치!) */}
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

        {/* 6. 이마의 상징: 王 (임금 왕) 자 무늬 & 2·3획 호피 줄무늬 */}
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

        {/* 7. 용맹하고 총명한 호랑이 눈 & 눈썹 */}
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

        {/* 8. 4획 하단 루프: "어흥~!" 포효하는 입 & 날카로운 엄니와 핑크빛 혀 (글자 ほ 루프와 완벽 일치!) */}
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

        {/* 9. 포효하는 "어흥!" 음파 라인 (Roar Waves) */}
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
