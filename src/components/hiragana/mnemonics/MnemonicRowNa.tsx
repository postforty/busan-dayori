import { MnemonicSvgChildProps } from './types';
import MnemonicCharOverlay from './MnemonicCharOverlay';

export default function MnemonicRowNa({ char, fontFamily }: MnemonicSvgChildProps) {
  if (char === 'な') {
    // な: 나비 (1·2획은 왼쪽 날개, 3획은 오른쪽 앞날개 무늬 띠, 4획 루프와 꼬리는 오른쪽 뒷날개 안상무늬 & 제비꼬리와 1:1 완벽 일치!)
    return (
      <svg
        viewBox="0 0 200 160"
        className="w-full h-full select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* 날개 은은한 파스텔 라벤더-퍼플 그라데이션 */}
          <linearGradient id="na-wing-left" x1="50" y1="40" x2="100" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FAF5FF" />
            <stop offset="60%" stopColor="#F3E8FF" />
            <stop offset="100%" stopColor="#E9D5FF" />
          </linearGradient>
          <linearGradient id="na-wing-right-top" x1="115" y1="40" x2="165" y2="70" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FAF5FF" />
            <stop offset="50%" stopColor="#F3E8FF" />
            <stop offset="100%" stopColor="#E9D5FF" />
          </linearGradient>
          <linearGradient id="na-wing-right-bot" x1="110" y1="80" x2="155" y2="125" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FAF5FF" />
            <stop offset="60%" stopColor="#F3E8FF" />
            <stop offset="100%" stopColor="#DDD6FE" />
          </linearGradient>
          {/* 가녀리고 우아한 나비 몸통 그라데이션 */}
          <linearGradient id="na-body-grad" x1="110" y1="40" x2="105" y2="90" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#C084FC" />
            <stop offset="50%" stopColor="#9333EA" />
            <stop offset="100%" stopColor="#7E22CE" />
          </linearGradient>
          {/* 4획 루프와 1:1 싱크로되는 신비로운 공작나비 안상무늬 */}
          <radialGradient id="na-eyespot-grad" cx="114" cy="107" r="9" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#581C87" />
            <stop offset="45%" stopColor="#7E22CE" />
            <stop offset="70%" stopColor="#C084FC" />
            <stop offset="90%" stopColor="#FDF4FF" />
            <stop offset="100%" stopColor="#F472B6" />
          </radialGradient>
        </defs>

        {/* 배경 은은한 나비 비행 아우라 */}
        <ellipse cx="108" cy="80" rx="66" ry="52" fill="#FAF5FF" opacity="0.6" />

        {/* 1. 좌하단 봄꽃 (나비가 찾아온 향기로운 꽃송이) */}
        <g id="na-flower-group">
          {/* 싱그러운 꽃잎 잎사귀 */}
          <path d="M 34 132 C 24 128 24 138 32 140 Z" fill="#BBF7D0" stroke="#22C55E" strokeWidth="0.9" />
          <path d="M 48 136 C 54 144 44 146 42 138 Z" fill="#BBF7D0" stroke="#22C55E" strokeWidth="0.9" />
          {/* 벚꽃 느낌의 화사한 핑크 꽃잎 5장 */}
          <circle cx="40" cy="128" r="5" fill="#FCE7F3" stroke="#F472B6" strokeWidth="1" />
          <circle cx="48" cy="126" r="5" fill="#FCE7F3" stroke="#F472B6" strokeWidth="1" />
          <circle cx="46" cy="134" r="5" fill="#FCE7F3" stroke="#F472B6" strokeWidth="1" />
          <circle cx="36" cy="134" r="5" fill="#FCE7F3" stroke="#F472B6" strokeWidth="1" />
          <circle cx="34" cy="127" r="5" fill="#FCE7F3" stroke="#F472B6" strokeWidth="1" />
          {/* 꽃술 화심 */}
          <circle cx="41" cy="130" r="3.2" fill="#FDE047" stroke="#EAB308" strokeWidth="0.8" />
          <circle cx="41" cy="130" r="1.2" fill="#CA8A04" />
        </g>

        {/* 2. 나비 왼쪽 날개 (글자 な 1획 가로선 & 2획 곡선과 완벽 일체화) */}
        {/* 왼쪽 날개 외곽선: 1획 상단선을 따라 뻗고, 2획 곡선을 감싸며 우아하게 마감 */}
        <path
          d="M 106 52 
             C 88 48 64 48 46 60 
             C 36 68 38 82 48 94 
             C 58 106 72 108 80 102 
             C 88 94 98 86 104 74 Z"
          fill="url(#na-wing-left)"
          stroke="#A855F7"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        {/* 왼쪽 날개 내부 시맥 (방사형 날개맥: 1획과 2획의 방향을 자연스럽게 보조) */}
        <path d="M 102 56 C 82 54 62 58 48 66" stroke="#C084FC" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M 98 64 C 78 68 58 78 50 88" stroke="#C084FC" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M 92 76 C 80 84 68 94 62 98" stroke="#D8B4FE" strokeWidth="1" strokeLinecap="round" />
        {/* 날개 가장자리 앙증맞은 화이트 레이스 무늬 */}
        <circle cx="44" cy="68" r="2" fill="#FFFFFF" opacity="0.8" />
        <circle cx="42" cy="78" r="2.2" fill="#FFFFFF" opacity="0.8" />
        <circle cx="46" cy="88" r="2" fill="#FFFFFF" opacity="0.8" />

        {/* 3. 나비 오른쪽 앞날개 (글자 な 3획 대각선 점과 완벽 일치!) */}
        <path
          d="M 112 50 
             C 126 36 156 36 166 48 
             C 174 58 168 74 154 82 
             C 142 86 128 82 114 68 Z"
          fill="url(#na-wing-right-top)"
          stroke="#A855F7"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        {/* 3획 위치를 아름답게 강조하는 날개 띠 무늬 (x=134~150, y=58~74) */}
        <path
          d="M 132 54 C 140 60 148 66 156 74"
          stroke="#F472B6"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.85"
        />
        <circle cx="158" cy="54" r="3.5" fill="#FCE7F3" stroke="#F472B6" strokeWidth="1" />
        <circle cx="158" cy="54" r="1.5" fill="#E11D48" />

        {/* 4. 나비 오른쪽 뒷날개 (글자 な 4획 루프 & 꼬리와 1:1 완벽 정렬!) */}
        {/* 뒷날개 본체: 4획 루프(cx=114, cy=107)를 감싸고, 우측 꼬리(x=142)를 향해 제비나비 꼬리 날개로 뻗음 */}
        <path
          d="M 110 74 
             C 122 76 138 80 148 92 
             C 158 104 156 120 144 126 
             C 134 130 118 126 106 118 
             C 98 108 102 88 110 74 Z"
          fill="url(#na-wing-right-bot)"
          stroke="#A855F7"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        {/* 제비나비 우아한 꼬리 날개 돌기 (4획 끝 삐침 방향과 일치: x=142~158) */}
        <path
          d="M 144 118 C 152 120 156 124 158 128 C 154 130 146 128 140 125"
          fill="#DDD6FE"
          stroke="#A855F7"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* ★ 핵심 싱크로: 4획 루프 중심의 신비로운 안상 무늬 (Eye-spot, cx=114, cy=107) */}
        <circle cx="114" cy="107" r="8.5" fill="url(#na-eyespot-grad)" stroke="#C084FC" strokeWidth="1" />
        <circle cx="114" cy="107" r="4.2" fill="#581C87" />
        <circle cx="112.5" cy="105.5" r="1.3" fill="#FFFFFF" />

        {/* 5. 부드럽고 가녀린 나비 몸통 (글자 획을 가리지 않고 틈새에 자연스럽게 안착) */}
        {/* 몸통 본체: 1획과 2획 사이에서 4획으로 이어지는 대각선 흐름(10° 기울기)을 따라 배치 */}
        <path
          d="M 111 46 
             C 113 46 114 54 113 68 
             C 112 80 108 88 105 92 
             C 103 92 103 88 105 76 
             C 107 64 109 46 111 46 Z"
          fill="url(#na-body-grad)"
          stroke="#7E22CE"
          strokeWidth="1"
        />
        {/* 몸통 마디 주름선 */}
        <line x1="108" y1="58" x2="112" y2="59" stroke="#E9D5FF" strokeWidth="1" strokeLinecap="round" />
        <line x1="106" y1="68" x2="110" y2="69" stroke="#E9D5FF" strokeWidth="1" strokeLinecap="round" />
        <line x1="104" y1="78" x2="108" y2="79" stroke="#E9D5FF" strokeWidth="1" strokeLinecap="round" />

        {/* 나비 귀여운 머리 */}
        <circle cx="111" cy="44" r="3" fill="#9333EA" stroke="#7E22CE" strokeWidth="0.8" />
        <circle cx="110" cy="43.5" r="0.8" fill="#FFFFFF" opacity="0.8" />

        {/* 우아한 더듬이 (글자 위쪽 빈 공간으로 뻗어 획과 전혀 간섭하지 않음) */}
        <path
          d="M 110 42 C 107 32 99 26 95 24"
          stroke="#7E22CE"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="95" cy="24" r="2" fill="#F472B6" stroke="#DB2777" strokeWidth="0.6" />

        <path
          d="M 112 42 C 115 32 123 26 128 24"
          stroke="#7E22CE"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="128" cy="24" r="2" fill="#F472B6" stroke="#DB2777" strokeWidth="0.6" />

        {/* 6. 흩날리는 꽃가루 & 반짝이 스파클 (나풀나풀 살아있는 생동감) */}
        <path d="M 166 40 L 167.5 36 L 169 40 L 173 41.5 L 169 43 L 167.5 47 L 166 43 L 162 41.5 Z" fill="#FDE047" />
        <circle cx="152" cy="30" r="1.5" fill="#F472B6" />
        <circle cx="174" cy="54" r="1.2" fill="#C084FC" />
        <circle cx="68" cy="120" r="1.5" fill="#FDE047" />
        <circle cx="58" cy="112" r="1.2" fill="#C084FC" />

        {/* 글자 'な' 오버레이 */}
        <MnemonicCharOverlay char="な" fontFamily={fontFamily} x="108" y="118" />
      </svg>
    );
  }

  if (char === 'に') {
    // に: 니트 (단추를 쪼르르 잠그고 두 개의 포근한 주머니가 달린 따뜻한 니트 스웨터 한 벌!)
    // ⚠️ 글자 'に'의 1획(왼쪽 세로)은 세로 단추 여밈선, 2·3획(오른쪽 가로 두 줄)은 위아래 두 개의 포켓(주머니)과 완벽 일치!
    return (
      <svg
        viewBox="0 0 200 160"
        className="w-full h-full select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* 니트 몸체 그라디언트 (포근하고 따뜻한 크림 피치) */}
          <linearGradient id="ni-sweater-body-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFF5F5" />
            <stop offset="100%" stopColor="#FFE4E6" />
          </linearGradient>
        </defs>

        {/* 1. 바닥 그림자 */}
        <ellipse cx="106" cy="138" rx="60" ry="7" fill="#F1F5F9" opacity="0.85" />

        {/* 2. 배경 포근한 온기 글로우 */}
        <circle cx="108" cy="85" r="54" fill="#FFF1F2" opacity="0.7" />

        {/* 3. ★ 니트 스웨터 한 벌 전체 실루엣 (Body & Sleeves) */}
        <g id="knit-sweater">
          {/* 스웨터 전체 외곽 (소매와 몸통이 자연스럽게 이어지는 귀여운 오버핏 실루엣) */}
          <path
            d="M 88 38 
               C 76 42 54 54 42 68 
               C 38 72 40 102 44 110 
               L 58 106 
               C 58 96 64 78 68 76 
               L 68 126 
               C 68 130 148 130 148 126 
               L 148 76 
               C 152 78 158 96 158 106 
               L 172 110 
               C 176 102 178 72 174 68 
               C 162 54 140 42 128 38 
               Z"
            fill="url(#ni-sweater-body-grad)"
            stroke="#FDA4AF"
            strokeWidth="2"
            strokeLinejoin="round"
          />

          {/* 왼쪽 소매 골지 커프스 (Rib Cuff) */}
          <path
            d="M 44 110 L 58 106 L 56 114 L 42 118 Z"
            fill="#FECDD3"
            stroke="#FB7185"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          {/* 오른쪽 소매 골지 커프스 (Rib Cuff) */}
          <path
            d="M 172 110 L 158 106 L 160 114 L 174 118 Z"
            fill="#FECDD3"
            stroke="#FB7185"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />

          {/* 스웨터 밑단 골지 시보리 (Rib Hem, y=122~131) */}
          <rect
            x="68"
            y="122"
            width="80"
            height="9"
            rx="3"
            fill="#FECDD3"
            stroke="#FB7185"
            strokeWidth="1.2"
          />
          {/* 밑단 골지 세로 주름들 */}
          <line x1="78" y1="122" x2="78" y2="131" stroke="#F43F5E" strokeWidth="1" strokeLinecap="round" />
          <line x1="88" y1="122" x2="88" y2="131" stroke="#F43F5E" strokeWidth="1" strokeLinecap="round" />
          <line x1="98" y1="122" x2="98" y2="131" stroke="#F43F5E" strokeWidth="1" strokeLinecap="round" />
          <line x1="108" y1="122" x2="108" y2="131" stroke="#F43F5E" strokeWidth="1" strokeLinecap="round" />
          <line x1="118" y1="122" x2="118" y2="131" stroke="#F43F5E" strokeWidth="1" strokeLinecap="round" />
          <line x1="128" y1="122" x2="128" y2="131" stroke="#F43F5E" strokeWidth="1" strokeLinecap="round" />
          <line x1="138" y1="122" x2="138" y2="131" stroke="#F43F5E" strokeWidth="1" strokeLinecap="round" />

          {/* 목둘레 라운드넥 골지 칼라 (Rib Collar, x=88~128, y=34~46) */}
          <path
            d="M 88 38 C 92 48 124 48 128 38 C 122 34 94 34 88 38 Z"
            fill="#FECDD3"
            stroke="#FB7185"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {/* 네크라인 안쪽 브랜드 라벨 태그 */}
          <rect x="103" y="32" width="10" height="6" rx="1" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="0.8" />
          <line x1="105" y1="35" x2="111" y2="35" stroke="#FB7185" strokeWidth="0.8" />

          {/* 스웨터 표면 포근한 V자 니트 스티치 패턴 */}
          <g opacity="0.6">
            <path d="M 94 62 L 96 65 L 98 62" stroke="#FB7185" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 94 76 L 96 79 L 98 76" stroke="#FB7185" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 94 90 L 96 93 L 98 90" stroke="#FB7185" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 94 104 L 96 107 L 98 104" stroke="#FB7185" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </g>

        {/* 4. ★ 핵심 싱크로 1: 글자 'に' 1획과 1:1 일치하는 세로 단추 여밈선 (Button Placket) */}
        <g id="ni-center-placket">
          {/* 세로 여밈 밴드 베이스 (글자 1획 궤적: x=74~78, y=36~124) */}
          <path
            d="M 74 36 L 74 118 C 74 124 78 128 82 126"
            stroke="#FDA4AF"
            strokeWidth="7"
            strokeLinecap="round"
          />
          {/* 여밈 밴드 골지 윤곽선 */}
          <path
            d="M 74 36 L 74 118 C 74 124 78 128 82 126"
            stroke="#FB7185"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* 밴드 하이라이트 */}
          <path
            d="M 75 38 L 75 116"
            stroke="#FFFFFF"
            strokeWidth="1.2"
            opacity="0.8"
            strokeLinecap="round"
          />

          {/* 또르르 달린 귀여운 원목 단추 3개 */}
          {/* 상단 단추 (y=50) */}
          <circle cx="74" cy="50" r="3.2" fill="#FDE68A" stroke="#B45309" strokeWidth="1" />
          <circle cx="73" cy="49.5" r="0.5" fill="#78350F" />
          <circle cx="75" cy="50.5" r="0.5" fill="#78350F" />
          {/* 중간 단추 (y=84) */}
          <circle cx="74" cy="84" r="3.2" fill="#FDE68A" stroke="#B45309" strokeWidth="1" />
          <circle cx="73" cy="83.5" r="0.5" fill="#78350F" />
          <circle cx="75" cy="84.5" r="0.5" fill="#78350F" />
          {/* 하단 단추 (y=112) */}
          <circle cx="74" cy="112" r="3.2" fill="#FDE68A" stroke="#B45309" strokeWidth="1" />
          <circle cx="73" cy="111.5" r="0.5" fill="#78350F" />
          <circle cx="75" cy="112.5" r="0.5" fill="#78350F" />
        </g>

        {/* 5. ★ 핵심 싱크로 2: 글자 'に' 2획과 1:1 일치하는 오른쪽 가슴 주머니 (Upper Pocket) */}
        <g id="ni-pocket-top">
          {/* 주머니 본체 (x=110~146, y=61~78) */}
          <path
            d="M 110 61 L 110 78 C 110 82 146 82 146 78 L 146 63 Z"
            fill="#FFF1F2"
            stroke="#FDA4AF"
            strokeWidth="1.2"
          />
          {/* 주머니 안쪽 V자 자수 */}
          <path d="M 126 68 L 128 72 L 130 68" stroke="#FB7185" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />

          {/* ★ 2획과 완벽 일치: 주머니 상단 도톰한 골지 입구 밴드 (x=108~150, y=61) */}
          <path
            d="M 108 61 C 118 57 136 57 150 63"
            stroke="#FDA4AF"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            d="M 108 61 C 118 57 136 57 150 63"
            stroke="#F43F5E"
            strokeWidth="2.2"
            strokeDasharray="4 2"
            strokeLinecap="round"
          />
          <path
            d="M 110 60 C 120 56 134 56 148 62"
            stroke="#FFFFFF"
            strokeWidth="1.2"
            opacity="0.8"
            strokeLinecap="round"
          />
        </g>

        {/* 6. ★ 핵심 싱크로 3: 글자 'に' 3획과 1:1 일치하는 오른쪽 아래 주머니 (Lower Pocket) */}
        <g id="ni-pocket-bottom">
          {/* 주머니 본체 (x=108~150, y=107~120) */}
          <path
            d="M 108 107 L 108 120 C 108 124 150 124 150 120 L 150 108 Z"
            fill="#FFF1F2"
            stroke="#FDA4AF"
            strokeWidth="1.2"
          />

          {/* ★ 3획과 완벽 일치: 주머니 상단 도톰한 골지 입구 밴드 (x=106~152, y=107) */}
          <path
            d="M 106 107 C 118 114 136 114 152 107"
            stroke="#FDA4AF"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            d="M 106 107 C 118 114 136 114 152 107"
            stroke="#F43F5E"
            strokeWidth="2.2"
            strokeDasharray="4 2"
            strokeLinecap="round"
          />
          <path
            d="M 108 108 C 120 115 134 115 150 108"
            stroke="#FFFFFF"
            strokeWidth="1.2"
            opacity="0.8"
            strokeLinecap="round"
          />
        </g>

        {/* 7. 아기자기한 감성 포인트: 미니 하트 & 스파클 반짝이 */}
        <g id="sparkles">
          {/* 가슴 쪽 미니 하트 와펜 (포인트 자수) */}
          <path
            d="M 94 48 C 94 45 90 43 88 45 C 86 43 82 45 82 48 C 82 52 88 56 88 56 C 88 56 94 52 94 48 Z"
            fill="#FB7185"
            opacity="0.85"
          />
          {/* 온기 스파클 */}
          <path d="M 166 40 L 167.5 36 L 169 40 L 173 41.5 L 169 43 L 167.5 47 L 166 43 L 162 41.5 Z" fill="#FDE047" />
          <circle cx="34" cy="80" r="1.5" fill="#FDA4AF" />
          <circle cx="174" cy="56" r="1.5" fill="#FDA4AF" />
          <circle cx="98" cy="132" r="1.5" fill="#FDE047" />
        </g>

        {/* 글자 'に' 오버레이 */}
        <MnemonicCharOverlay char="に" fontFamily={fontFamily} x="108" y="118" />
      </svg>
    );
  }

  if (char === 'ぬ') {
    // ぬ: 누에 (글자 'ぬ'의 굵은 획을 따라 온몸을 둥글게 만 포동포동 귀여운 젤리 아기 누에벌레!)
    // ⚠️ 1획은 뽕나무 가지, 2획은 머리(좌측)→배→등허리(상단 아치)→엉덩이→꼬리 루프(우하단 매듭)와 1:1 완벽 일치!
    return (
      <svg
        viewBox="0 0 200 160"
        className="w-full h-full select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* 누에의 포동포동하고 부드러운 젤리 바디 그라데이션 */}
          <linearGradient id="nu-body-grad" x1="70" y1="40" x2="160" y2="120" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="40%" stopColor="#FFFDF5" />
            <stop offset="85%" stopColor="#FEF3C7" />
            <stop offset="100%" stopColor="#FDE68A" />
          </linearGradient>
          {/* 황금빛 누에고치 그라데이션 */}
          <radialGradient id="nu-cocoon-grad" cx="134" cy="112" r="10" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FEF9C3" />
            <stop offset="60%" stopColor="#FDE047" />
            <stop offset="100%" stopColor="#EAB308" />
          </radialGradient>
        </defs>

        {/* 1. 배경 은은한 숲속 힐링 그린 아우라 */}
        <ellipse cx="110" cy="88" rx="64" ry="52" fill="#F0FDF4" opacity="0.75" />

        {/* 2. 싱그러운 초록 뽕잎 (하단 베이스: 아기 누에가 갉아먹은 둥근 홈 포함) */}
        <g id="mulberry-leaf">
          <path
            d="M 30 130 
               C 42 116 54 116 64 121 
               C 68 114 78 115 84 122 
               C 114 112 154 114 174 128 
               C 152 144 72 146 30 130 Z"
            fill="#DCFCE7"
            stroke="#16A34A"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          {/* 뽕잎 주 잎맥 및 잔 잎맥 */}
          <path
            d="M 36 130 C 88 122 138 123 170 128"
            stroke="#86EFAC"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path d="M 80 124 C 92 120 102 118 108 120" stroke="#86EFAC" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M 122 124 C 134 120 144 121 150 125" stroke="#86EFAC" strokeWidth="1.2" strokeLinecap="round" />
        </g>

        {/* 3. ★ 핵심 싱크로 1: 글자 'ぬ' 1획과 1:1 일치하는 뽕나무 어린 가지 (Mulberry Twig) */}
        <g id="mulberry-twig">
          {/* 도톰한 나뭇가지 본체 (1획 빗금 궤적: x=84, y=44 -> x=98, y=122) */}
          <path
            d="M 84 44 L 98 122"
            stroke="#B45309"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <path
            d="M 85 45 L 98 121"
            stroke="#FDE68A"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          {/* 가지 상단의 앙증맞은 어린 뽕잎 새싹 */}
          <path
            d="M 83 44 C 75 38 77 30 85 32 C 87 38 85 43 83 44 Z"
            fill="#86EFAC"
            stroke="#16A34A"
            strokeWidth="1.2"
          />
        </g>

        {/* 4. ★ 핵심 싱크로 2: 글자 'ぬ' 2획 전체를 두툼하게 형성하는 포동포동 젤리 누에 (Chubby Silkworm) */}
        <g id="silkworm-body-group">
          {/* (1) 둥글고 두툼한 메인 몸체 (좌측 U자 배 → 솟아오른 등허리 아치 → 우측 엉덩이 굴곡) */}
          <path
            d="M 74 74 
               C 62 86 60 106 72 118 
               C 84 128 102 120 108 102 
               C 112 86 114 62 128 44 
               C 140 32 160 40 168 62 
               C 176 84 172 108 158 124 
               C 144 134 126 130 118 116 
               C 112 104 120 94 134 94 
               C 146 94 152 104 148 116 
               C 144 124 134 124 128 118 
               C 124 112 128 104 134 104 
               C 140 104 142 110 138 114 
               C 150 102 152 80 144 64 
               C 134 46 118 50 106 68 
               C 96 82 92 106 82 108 
               C 74 110 70 98 76 86 
               Z"
            fill="url(#nu-body-grad)"
            stroke="#78716C"
            strokeWidth="2"
            strokeLinejoin="round"
          />

          {/* (2) 올록볼록 엠보싱 마디 주름선 (Chubby Jelly Segments) */}
          {/* 앞배 마디 주름선 */}
          <path d="M 64 96 C 72 100 80 98 86 92" stroke="#A8A29E" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M 68 108 C 76 112 86 110 94 104" stroke="#A8A29E" strokeWidth="1.4" strokeLinecap="round" />
          {/* 등허리 마디 주름선 (2획 상단 아치) */}
          <path d="M 124 42 C 122 52 120 60 116 66" stroke="#A8A29E" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M 144 44 C 140 54 136 62 132 68" stroke="#A8A29E" strokeWidth="1.4" strokeLinecap="round" />
          {/* 우측 엉덩이 마디 주름선 (2획 우측 곡선) */}
          <path d="M 170 82 C 160 84 152 82 144 80" stroke="#A8A29E" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M 166 100 C 156 102 148 100 140 98" stroke="#A8A29E" strokeWidth="1.4" strokeLinecap="round" />

          {/* (3) 누에 특유의 귀여운 초승달/별빛 숨구멍 무늬 (Cute Spot Patterns) */}
          <circle cx="126" cy="50" r="1.6" fill="#FDE047" opacity="0.9" />
          <circle cx="144" cy="54" r="1.6" fill="#FDE047" opacity="0.9" />
          <circle cx="162" cy="74" r="1.6" fill="#FDE047" opacity="0.9" />
          <circle cx="158" cy="92" r="1.6" fill="#FDE047" opacity="0.9" />

          {/* (4) 꼬물꼬물 앙증맞은 노란색 젤리 발 (Cute Prolegs) */}
          <circle cx="70" cy="120" r="3.2" fill="#FDE047" stroke="#CA8A04" strokeWidth="1.1" />
          <circle cx="82" cy="122" r="3.2" fill="#FDE047" stroke="#CA8A04" strokeWidth="1.1" />
          <circle cx="94" cy="120" r="3.2" fill="#FDE047" stroke="#CA8A04" strokeWidth="1.1" />
          <circle cx="156" cy="122" r="3.2" fill="#FDE047" stroke="#CA8A04" strokeWidth="1.1" />

          {/* (5) 2획 시작점에 자리 잡은 사랑스러운 아기 누에 머리 & 표정 */}
          <g id="silkworm-head">
            {/* 동글동글 볼살 통통한 얼굴 베이스 */}
            <circle cx="72" cy="70" r="11" fill="#FFFDF7" stroke="#78716C" strokeWidth="1.8" />
            {/* 머리 위 앙증맞은 미니 더듬이 뿔 2개 */}
            <path d="M 67 60 C 65 54 69 53 71 57" stroke="#78716C" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M 75 60 C 77 54 81 55 79 58" stroke="#78716C" strokeWidth="1.5" strokeLinecap="round" />
            {/* 반짝반짝 호기심 가득한 까만 눈 */}
            <circle cx="75" cy="68" r="2" fill="#1E293B" />
            <circle cx="75.7" cy="67.3" r="0.7" fill="#FFFFFF" />
            {/* 복숭아빛 생기 볼터치 */}
            <ellipse cx="73" cy="74" rx="3.2" ry="2" fill="#FDA4AF" opacity="0.85" />
            {/* 뽕잎을 보고 신난 방긋 미소 입 */}
            <path d="M 77 71 C 80 73 79 75 76 74" stroke="#78716C" strokeWidth="1.2" strokeLinecap="round" />
          </g>
        </g>

        {/* 5. ★ 핵심 싱크로 3: 글자 'ぬ' 우하단 루프 매듭 속 황금 누에고치 & 비단실 */}
        <g id="silkworm-cocoon">
          {/* 황금빛 비단 누에고치 본체 (루프 매듭 x=136, y=114에 쏙 안착) */}
          <ellipse
            cx="136"
            cy="114"
            rx="11.5"
            ry="8.5"
            fill="url(#nu-cocoon-grad)"
            stroke="#CA8A04"
            strokeWidth="1.8"
          />
          {/* 칭칭 감긴 비단실 텍스처 */}
          <path
            d="M 129 110 C 135 107 142 110 144 115"
            stroke="#B45309"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <path
            d="M 131 117 C 136 119 141 116 143 112"
            stroke="#B45309"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          {/* 꼬리 끝에서 사르르 뿜어나오는 황금 비단실 점선 */}
          <path
            d="M 146 126 C 158 122 164 110 172 106 C 178 102 180 92 178 84"
            stroke="#F59E0B"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="4 2"
          />
          <circle cx="178" cy="84" r="2" fill="#F59E0B" />
          {/* 반짝이는 실크 스파클 (별빛 2개) */}
          <path d="M 172 100 L 173.5 96 L 175 100 L 179 101.5 L 175 103 L 173.5 107 L 172 103 L 168 101.5 Z" fill="#FDE047" />
          <circle cx="184" cy="94" r="1.4" fill="#FDE047" />
        </g>

        {/* 글자 'ぬ' 오버레이 */}
        <MnemonicCharOverlay char="ぬ" fontFamily={fontFamily} x="108" y="118" />
      </svg>
    );
  }

  if (char === 'ね') {
    // ね: 그네 (글자 'ね' 모양 자체가 곧 '그네' 그 자체!)
    // ⚠️ 1획은 그네 기둥, 2획 상단은 가로보 & 지지대, 2획 곡선은 둥글게 흔들리는 그네 밧줄, 우하단 루프는 그네의 원목 좌판 & 매듭으로 완벽 일체화!
    return (
      <svg
        viewBox="0 0 200 160"
        className="w-full h-full select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* 부드러운 산들바람 아우라 그라데이션 */}
          <radialGradient id="ne-sky-glow" cx="50%" cy="45%" r="55%">
            <stop offset="0%" stopColor="#F0F9FF" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#E0F2FE" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#E0F2FE" stopOpacity="0" />
          </radialGradient>

          {/* 원목 기둥 입체 그라데이션 (견고하고 따뜻한 원목 기둥) */}
          <linearGradient id="ne-wood-pole-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#78350F" />
            <stop offset="30%" stopColor="#B45309" />
            <stop offset="70%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#92400E" />
          </linearGradient>

          {/* 원목 좌판 그라데이션 (2획 루프 좌판) */}
          <linearGradient id="ne-wood-seat-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FEF3C7" />
            <stop offset="35%" stopColor="#F59E0B" />
            <stop offset="75%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#92400E" />
          </linearGradient>
        </defs>

        {/* 1. 배경 하늘빛 아우라 & 부드러운 잔디 언덕 */}
        <ellipse cx="112" cy="85" rx="76" ry="60" fill="url(#ne-sky-glow)" />

        {/* 부드러운 초록 잔디 언덕 */}
        <path
          d="M 0 144 C 55 137 145 137 200 144 L 200 160 L 0 160 Z"
          fill="#DCFCE7"
        />
        <path
          d="M 0 144 C 55 137 145 137 200 144"
          stroke="#86EFAC"
          strokeWidth="1.5"
        />

        {/* 잔디밭 앙증맞은 노란 들꽃들 */}
        <g id="ne-grass-flowers">
          <circle cx="28" cy="144" r="2.2" fill="#FDE047" stroke="#EAB308" strokeWidth="0.7" />
          <circle cx="26" cy="142" r="1.3" fill="#FFFFFF" />
          <circle cx="30" cy="142" r="1.3" fill="#FFFFFF" />
          <circle cx="42" cy="147" r="1.8" fill="#FDE047" stroke="#EAB308" strokeWidth="0.6" />

          <circle cx="174" cy="144" r="2.2" fill="#FDE047" stroke="#EAB308" strokeWidth="0.7" />
          <circle cx="172" cy="142" r="1.3" fill="#FFFFFF" />
          <circle cx="176" cy="142" r="1.3" fill="#FFFFFF" />
          <circle cx="186" cy="147" r="1.8" fill="#FDE047" stroke="#EAB308" strokeWidth="0.6" />
        </g>

        {/* 그네 좌판 아래 잔디에 드리운 부드러운 그림자 */}
        <ellipse cx="128" cy="146" rx="22" ry="4.5" fill="#94A3B8" opacity="0.25" />

        {/* 2. 기둥 상단 뒤편 싱그러운 숲속 나뭇잎 가지 (자연 속 그네 분위기) */}
        <g id="ne-tree-leaves" opacity="0.85">
          <path
            d="M 68 32 C 54 20 74 10 90 18 C 104 8 126 16 122 30 C 114 40 82 42 68 32 Z"
            fill="#BBF7D0"
            stroke="#4ADE80"
            strokeWidth="1.2"
          />
          <path d="M 80 18 C 92 14 106 18 108 26" stroke="#22C55E" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
          <circle cx="68" cy="24" r="2.5" fill="#86EFAC" stroke="#16A34A" strokeWidth="0.7" />
          <circle cx="118" cy="20" r="2" fill="#86EFAC" stroke="#16A34A" strokeWidth="0.7" />
        </g>

        {/* 3. ★ [그네의 기둥 = 1획]: 그네를 지탱하는 든든한 메인 원목 기둥 & 상단 가로보 */}
        <g id="ne-swing-pole-group">
          {/* 상단 가로 빔 (기둥 꼭대기에서 오른쪽으로 시원하게 뻗은 그네 걸이 암, x=80~126, y=36) */}
          <path
            d="M 80 36 L 126 36"
            stroke="#78350F"
            strokeWidth="9"
            strokeLinecap="round"
          />
          <path
            d="M 80 36 L 126 36"
            stroke="#D97706"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <path
            d="M 82 34.5 L 124 34.5"
            stroke="#FEF3C7"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.85"
          />

          {/* 가로보 끝 메탈 섀클 & 행거 링 (그네 줄이 걸려 시작되는 지점) */}
          <rect x="117" y="32" width="6" height="6" rx="1.5" fill="#94A3B8" stroke="#475569" strokeWidth="1" />
          <circle cx="120" cy="42" r="3" fill="none" stroke="#64748B" strokeWidth="1.8" />
          <circle cx="120" cy="42" r="1.2" fill="#334155" />

          {/* ★ 1획 메인 기둥 본체: x1=86, y1=34 -> x2=73, y2=138 (1획 선과 완벽 1:1 일치!) */}
          <line
            x1="86"
            y1="34"
            x2="73"
            y2="138"
            stroke="#78350F"
            strokeWidth="14"
            strokeLinecap="round"
          />
          <line
            x1="86"
            y1="34"
            x2="73"
            y2="138"
            stroke="url(#ne-wood-pole-grad)"
            strokeWidth="10"
            strokeLinecap="round"
          />
          {/* 기둥 상단 원목 광택 하이라이트선 */}
          <line
            x1="87.5"
            y1="36"
            x2="75.5"
            y2="136"
            stroke="#FEF3C7"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.8"
          />
          {/* 기둥 표면 자연스러운 나뭇결 & 옹이 디테일 */}
          <path d="M 83 60 C 81 72 80 82 78 94" stroke="#78350F" strokeWidth="1.2" strokeLinecap="round" opacity="0.45" />
          <ellipse cx="77.5" cy="106" rx="2" ry="1.4" fill="#78350F" opacity="0.4" />

          {/* 기둥 상단 모서리 금속 T자 보강 조인트 브래킷 */}
          <circle cx="86" cy="36" r="4.5" fill="#94A3B8" stroke="#475569" strokeWidth="1" />
          <circle cx="86" cy="36" r="1.5" fill="#1E293B" />

          {/* 기둥 바닥 잔디 고정 마운트 플랜지 & 작은 풀잎 */}
          <ellipse cx="73" cy="139" rx="8" ry="3" fill="#0F766E" opacity="0.7" />
          <path d="M 66 137 C 62 132 60 138 65 140 Z" fill="#86EFAC" stroke="#16A34A" strokeWidth="0.8" />
          <path d="M 80 138 C 84 133 86 139 81 141 Z" fill="#86EFAC" stroke="#16A34A" strokeWidth="0.8" />
        </g>

        {/* 4. ★ [그네 상단 지지대 = 2획 상단 꺾임]: 기둥과 가로보를 연결하는 45도 보강 지지대 (Diagonal Brace) */}
        <g id="ne-swing-brace">
          {/* 2획 상단 꺾임선 (x=74, y=58 -> x=94, y=54 -> x=80, y=86)과 정확히 일치하는 지지 프레임 */}
          <path
            d="M 74 58 L 94 54 L 80 86"
            stroke="#78350F"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 74 58 L 94 54 L 80 86"
            stroke="#D97706"
            strokeWidth="3.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 74 58 L 94 54 L 80 86"
            stroke="#FEF3C7"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.8"
          />
          {/* 조인트 볼트 */}
          <circle cx="94" cy="54" r="2" fill="#E2E8F0" stroke="#475569" strokeWidth="0.8" />
        </g>

        {/* 5. ★ [그네 밧줄 = 2획 메인 곡선]: 상단 빔에서 내려와 둥글게 흔들리는 도톰한 꼬임 밧줄 (Swinging Hemp Rope) */}
        <g id="ne-swing-rope-group">
          {/* 허공을 가르는 시원한 산들바람 스윙 궤적선 */}
          <path
            d="M 148 54 C 168 66 172 88 164 108"
            stroke="#38BDF8"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeDasharray="14 4"
            opacity="0.85"
          />
          <path
            d="M 154 64 C 170 76 172 96 166 114"
            stroke="#BAE6FD"
            strokeWidth="1.6"
            strokeLinecap="round"
            opacity="0.75"
          />
          {/* 바람에 흩날리는 나뭇잎들 */}
          <path d="M 170 50 C 176 48 178 52 174 56 C 170 54 168 50 170 50 Z" fill="#86EFAC" stroke="#16A34A" strokeWidth="0.8" />
          <path d="M 166 116 C 171 112 174 116 170 120 C 166 118 164 115 166 116 Z" fill="#86EFAC" stroke="#16A34A" strokeWidth="0.8" />

          {/* ★ 2획 큰 아치 곡선 본체: 도톰한 황금빛 그네 밧줄 */}
          <path
            d="M 80 86 C 104 52 122 46 134 48 C 148 50 156 74 146 102"
            stroke="#78350F"
            strokeWidth="9"
            strokeLinecap="round"
          />
          <path
            d="M 80 86 C 104 52 122 46 134 48 C 148 50 156 74 146 102"
            stroke="#F59E0B"
            strokeWidth="6"
            strokeLinecap="round"
          />
          {/* 밧줄 꼬임 하이라이트 질감 대시선 */}
          <path
            d="M 80 86 C 104 52 122 46 134 48 C 148 50 156 74 146 102"
            stroke="#FEF3C7"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeDasharray="4 3"
          />
        </g>

        {/* 6. ★ [그네 좌판 = 2획 우하단 루프]: 그네 줄 끝에 매달려 둥글게 매듭진 도톰한 원목 그네 좌판 (Wooden Swing Seat) */}
        <g id="ne-swing-seat-and-knot">
          {/* (1) 밧줄이 감겨 도는 도톰한 원형 매듭 똬리 (외곽 루프 rx=14, ry=12, 중심 cx=128, cy=109) */}
          <ellipse
            cx="128"
            cy="109"
            rx="14"
            ry="12"
            fill="#FEF3C7"
            stroke="#78350F"
            strokeWidth="3"
          />
          {/* 밧줄 똬리 질감 */}
          <path d="M 119 104 C 124 100 133 100 137 104" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
          <path d="M 120 114 C 125 117 132 117 136 114" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />

          {/* ★ (2) 글자 'ね' 루프 구멍과 1:1 일치하는 안쪽 뚫린 고리 (Inner Loop Hole) */}
          <ellipse
            cx="128"
            cy="109"
            rx="6.5"
            ry="5.5"
            fill="#F0F9FF"
            stroke="#78350F"
            strokeWidth="1.8"
          />

          {/* ★ (3) 그네의 핵심 상징: 그네 줄 끝에 매달린 원목 널빤지 좌판 (Wood Swing Board) */}
          {/* 좌판 위치: 루프 아래쪽 cx=128, y=114~124에 도톰하고 뚜렷하게 안착! */}
          <g id="ne-wooden-board-seat">
            {/* 판자 본체 (x=106 ~ 150, width=44, height=10, rx=4) */}
            <rect
              x="106"
              y="115"
              width="44"
              height="10"
              rx="4"
              fill="url(#ne-wood-seat-grad)"
              stroke="#78350F"
              strokeWidth="2"
            />
            {/* 판자 상단 원목 광택선 */}
            <rect x="108" y="116.5" width="40" height="2.5" rx="1.2" fill="#FEF3C7" opacity="0.85" />
            {/* 판자 하단 볼륨 음영 */}
            <rect x="108" y="121" width="40" height="2" rx="1" fill="#78350F" opacity="0.35" />
            {/* 판자 표면 나뭇결 디테일 */}
            <line x1="116" y1="120" x2="138" y2="120" stroke="#78350F" strokeWidth="1" strokeLinecap="round" opacity="0.5" />

            {/* 판자 양쪽 밧줄 관통 금속 아일렛 홀 */}
            <circle cx="113" cy="120" r="2.5" fill="#D97706" stroke="#451A03" strokeWidth="1" />
            <circle cx="113" cy="120" r="1.2" fill="#451A03" />
            <circle cx="143" cy="120" r="2.5" fill="#D97706" stroke="#451A03" strokeWidth="1" />
            <circle cx="143" cy="120" r="1.2" fill="#451A03" />
          </g>

          {/* (4) 좌판 상단 밧줄 고정 매듭 (x=141, y=104) */}
          <ellipse cx="141" cy="104" rx="3.5" ry="2.6" fill="#D97706" stroke="#78350F" strokeWidth="1.2" />
          <circle cx="141" cy="104" r="1" fill="#451A03" />

          {/* ★ (5) [그네 밧줄 술 = 2획 끝 꼬리]: 좌판 아래로 찰랑찰랑 빠져나온 밧줄 술 (Tassel / Fringe) */}
          <path
            d="M 138 120 C 142 123 146 126 150 128"
            stroke="#78350F"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          <path
            d="M 138 120 C 142 123 146 126 150 128"
            stroke="#F59E0B"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* 가느다란 술 가닥들 */}
          <path d="M 140 121 C 144 125 148 127 153 129" stroke="#D97706" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M 137 122 C 140 127 144 130 148 133" stroke="#B45309" strokeWidth="1.4" strokeLinecap="round" />

          {/* (6) 좌판 좌측에 예쁘게 묶인 핑크빛 바람 리본 */}
          <g id="ne-seat-ribbon">
            <circle cx="106" cy="116" r="2.2" fill="#F43F5E" />
            <path
              d="M 105 117 C 100 119 96 117 92 121"
              stroke="#F43F5E"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <path
              d="M 105 118 C 101 123 96 124 91 126"
              stroke="#FB7185"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </g>
        </g>

        {/* 7. 햇살 반짝임 스파클 (상쾌한 맑은 날) */}
        <g id="ne-sun-sparkles">
          <path d="M 166 40 L 167.5 36 L 169 40 L 173 41.5 L 169 43 L 167.5 47 L 166 43 L 162 41.5 Z" fill="#FDE047" />
          <circle cx="152" cy="32" r="1.5" fill="#38BDF8" opacity="0.8" />
          <circle cx="176" cy="50" r="1.3" fill="#FDE047" />
        </g>

        {/* 글자 'ね' 오버레이 - 글자 획 자체가 곧 그네의 기둥, 가로보, 밧줄, 좌판과 완벽 일치! */}
        <MnemonicCharOverlay char="ね" fontFamily={fontFamily} x="108" y="118" />
      </svg>
    );
  }

  if (char === 'の') {
    // の: 노래 (헤드폰을 끼고 두 눈을 감은 채 동그랗게 입을 모아 "노~♪" 노래를 부르는 사랑스러운 얼굴!)
    // ⚠️ 둥근 얼굴 윤곽선과 동그랗게 벌린 노래 입(O-Mouth) 모양이 글자 'の'의 궤적과 1:1 완벽 일치!
    return (
      <svg
        viewBox="0 0 200 160"
        className="w-full h-full select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 1. 배경 은은한 감성 핑크 글로우 */}
        <circle cx="108" cy="88" r="56" fill="#FFF1F2" opacity="0.65" />
        <circle cx="112" cy="84" r="42" fill="#FDF2F8" opacity="0.5" />

        {/* 2. 헤드폰 밴드 & 이어패드 (음악에 몰입한 싱어의 헤드폰) */}
        {/* 헤드폰 밴드 아치 */}
        <path
          d="M 68 86 C 66 48 88 32 114 32 C 140 32 158 50 156 86"
          stroke="#0284C7"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M 72 82 C 70 52 90 36 114 36 C 138 36 154 54 152 82"
          stroke="#BAE6FD"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        {/* 왼쪽 이어패드 (x=58) */}
        <rect x="58" y="76" width="13" height="24" rx="6.5" fill="#38BDF8" stroke="#0284C7" strokeWidth="1.5" />
        {/* 오른쪽 이어패드 (x=151) */}
        <rect x="151" y="76" width="13" height="24" rx="6.5" fill="#38BDF8" stroke="#0284C7" strokeWidth="1.5" />

        {/* 3. 둥근 얼굴 본체 (글자 'の'의 커다란 둥근 외곽 윤곽선과 1:1 완벽 일치!) */}
        {/* 얼굴 피부 베이스 */}
        <path
          d="M 72 76 
             C 70 102 82 128 108 130 
             C 134 128 148 106 146 80 
             C 144 64 132 50 114 48 
             C 94 50 74 62 72 76 Z"
          fill="#FED7AA"
          stroke="#EA580C"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* 귀여운 앞머리 (찰랑이는 숏컷 헤어) */}
        <path
          d="M 72 74 
             C 74 54 90 42 112 42 
             C 134 42 150 54 152 74 
             C 144 68 136 68 128 72 
             C 120 66 110 66 102 72 
             C 94 66 84 66 72 74 Z"
          fill="#334155"
        />

        {/* 4. 감미롭게 노래에 취한 표정 (Facial Features) */}
        {/* 노래의 감동에 젖어 살포시 감은 두 눈 (^ ^) */}
        {/* 왼쪽 눈 */}
        <path d="M 86 73 Q 92 67 98 73" stroke="#1E293B" strokeWidth="2.2" strokeLinecap="round" fill="none" />
        <line x1="97" y1="71" x2="100" y2="69" stroke="#1E293B" strokeWidth="1.4" strokeLinecap="round" />
        {/* 오른쪽 눈 */}
        <path d="M 116 71 Q 122 65 128 71" stroke="#1E293B" strokeWidth="2.2" strokeLinecap="round" fill="none" />
        <line x1="127" y1="69" x2="130" y2="67" stroke="#1E293B" strokeWidth="1.4" strokeLinecap="round" />

        {/* 깜찍한 콧날 */}
        <path d="M 106 75 Q 108 78 106 80" stroke="#EA580C" strokeWidth="1.5" strokeLinecap="round" fill="none" />

        {/* 발그레 상기된 사랑스러운 복숭아빛 볼터치 */}
        <ellipse cx="84" cy="83" rx="5" ry="3.2" fill="#FDA4AF" />
        <ellipse cx="132" cy="81" rx="5" ry="3.2" fill="#FDA4AF" />

        {/* 5. 글자 'の'의 핵심: 동그랗게 모아 "노~♪" 하고 노래하는 입 (Singing O-Mouth) */}
        {/* 입술 외곽 (도톰하고 사랑스러운 핑크 입술) */}
        <ellipse
          cx="104"
          cy="98"
          rx="10"
          ry="12.5"
          fill="#F43F5E"
          stroke="#E11D48"
          strokeWidth="2"
        />
        {/* 입속 챔버 (동그랗게 울리는 입속) */}
        <ellipse
          cx="104"
          cy="98"
          rx="7"
          ry="9"
          fill="#881337"
        />
        {/* 입속 앙증맞은 분홍빛 혀 */}
        <path
          d="M 99 102 C 101 99 107 99 109 102 C 108 106 100 106 99 102 Z"
          fill="#FB7185"
        />

        {/* 6. 입에서 피어오르는 달콤한 노랫소리 음표들과 하트 (Melody Notes & Hearts) */}
        {/* 입가에서 나오는 사랑의 핑크 미니 하트 */}
        <path
          d="M 122 88 C 120 84 116 85 116 88 C 116 91 122 94 122 94 C 122 94 128 91 128 88 C 128 85 124 84 122 88 Z"
          fill="#F43F5E"
        />

        {/* 춤추는 8분음표 (♫, x=138, y=52) */}
        <g id="singing-note-1">
          <ellipse cx="138" cy="56" rx="3.8" ry="2.8" fill="#F43F5E" transform="rotate(-15 138 56)" />
          <line x1="141" y1="55" x2="141" y2="43" stroke="#F43F5E" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M 141 43 C 146 44 149 48 147 52" stroke="#F43F5E" strokeWidth="1.5" strokeLinecap="round" />
        </g>

        {/* 춤추는 4분음표 (♩, x=156, y=66) */}
        <g id="singing-note-2">
          <ellipse cx="156" cy="68" rx="3.2" ry="2.4" fill="#8B5CF6" transform="rotate(-15 156 68)" />
          <line x1="158.5" y1="67" x2="158.5" y2="55" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" />
        </g>

        {/* 반짝이는 황금빛 멜로디 별빛 */}
        <path d="M 152 40 L 153.5 36 L 155 40 L 159 41.5 L 155 43 L 153.5 47 L 152 43 L 148 41.5 Z" fill="#F59E0B" />
        <circle cx="163" cy="54" r="1.6" fill="#FBBF24" />

        {/* 글자 'の' 오버레이 */}
        <MnemonicCharOverlay char="の" fontFamily={fontFamily} x="108" y="118" />
      </svg>
    );
  }

  return null;
}
