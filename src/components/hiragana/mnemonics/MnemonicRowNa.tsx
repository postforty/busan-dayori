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
    // に: 바구니 (아치형 손잡이와 땋은 라탄 몸체, 탐스러운 사과와 바게트가 담긴 피크닉 바구니!)
    // ⚠️ 글자 'に'의 왼쪽 세로획은 손잡이 기둥, 오른쪽 두 가로획은 바구니 속 과일과 하단 라탄 띠와 완벽 일치
    return (
      <svg
        viewBox="0 0 200 160"
        className="w-full h-full select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 바닥 그림자 */}
        <ellipse cx="106" cy="130" rx="52" ry="6" fill="#E2E8F0" opacity="0.7" />

        {/* 바구니 우아한 아치형 손잡이 (Handle - 글자 に 1획과 일체화) */}
        <path
          d="M 76 80 L 76 46 C 76 26 146 26 146 46 L 146 76"
          stroke="#D97706"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        {/* 손잡이 땋은 라탄 텍스처 (나선형 스트라이프) */}
        <path
          d="M 76 80 L 76 46 C 76 26 146 26 146 46 L 146 76"
          stroke="#FEF3C7"
          strokeWidth="1.5"
          strokeDasharray="4 3"
          strokeLinecap="round"
        />

        {/* 바구니 속 풍성한 피크닉 소품들 (상단) */}
        {/* 1. 노릇노릇한 바게트 빵 */}
        <g id="picnic-baguette">
          <path
            d="M 132 64 L 144 38 C 146 34 152 36 150 42 L 142 68 Z"
            fill="#FDE68A"
            stroke="#B45309"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {/* 바게트 빵 칼집 주름선 */}
          <line x1="138" y1="46" x2="144" y2="44" stroke="#B45309" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="136" y1="54" x2="142" y2="52" stroke="#B45309" strokeWidth="1.2" strokeLinecap="round" />
        </g>

        {/* 2. 탐스러운 빨간 사과 (글자 2획 뒤) */}
        <g id="picnic-apple">
          {/* 사과 꼭지 & 초록 잎사귀 */}
          <path d="M 118 46 C 118 40 122 38 123 36" stroke="#78716C" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M 120 40 C 126 36 130 39 128 44 Z" fill="#86EFAC" stroke="#16A34A" strokeWidth="1" />
          {/* 빨간 사과 몸통 */}
          <circle cx="118" cy="52" r="11" fill="#F43F5E" stroke="#E11D48" strokeWidth="1.5" />
          {/* 사과 하이라이트 광택 */}
          <circle cx="114" cy="48" r="2" fill="#FFFFFF" opacity="0.8" />
        </g>

        {/* 3. 앙증맞은 오렌지 한 알 */}
        <circle cx="98" cy="62" r="8" fill="#FB923C" stroke="#EA580C" strokeWidth="1.2" />

        {/* 4. 바구니 가장자리로 흘러내린 레드 깅엄 체크 냅킨 */}
        <path
          d="M 64 74 L 88 74 L 84 94 L 62 90 Z"
          fill="#FEE2E2"
          stroke="#EF4444"
          strokeWidth="1.2"
        />
        {/* 체크무늬 라인들 */}
        <line x1="72" y1="74" x2="70" y2="92" stroke="#EF4444" strokeWidth="1" strokeDasharray="2 2" />
        <line x1="80" y1="74" x2="78" y2="93" stroke="#EF4444" strokeWidth="1" strokeDasharray="2 2" />
        <line x1="63" y1="82" x2="86" y2="82" stroke="#EF4444" strokeWidth="1" strokeDasharray="2 2" />

        {/* 바구니 몸체 본체 (따뜻한 허니 라탄 베이지) */}
        <path
          d="M 58 74 
             C 58 72 152 72 152 74 
             L 146 122 
             C 146 126 64 126 64 122 
             Z"
          fill="#FEF3C7"
          stroke="#B45309"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* 바구니 상단 도톰한 림 (Braided Rim) */}
        <ellipse cx="105" cy="74" rx="47" ry="5.5" fill="#FDE68A" stroke="#B45309" strokeWidth="1.8" />

        {/* 바구니 표면 라탄 격자 짜임새 (Wicker Weave) */}
        {/* 가로 밴드 (글자 に 3획과 어우러지는 하단 띠) */}
        <path d="M 62 98 C 88 99 122 99 148 98" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
        <path d="M 63 112 C 88 113 122 113 147 112" stroke="#D97706" strokeWidth="1.6" strokeLinecap="round" />

        {/* 세로/대각선 라탄 엮음 살들 */}
        <line x1="82" y1="79" x2="78" y2="122" stroke="#D97706" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="98" y1="79" x2="96" y2="122" stroke="#D97706" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="114" y1="79" x2="114" y2="122" stroke="#D97706" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="130" y1="79" x2="132" y2="122" stroke="#D97706" strokeWidth="1.2" strokeLinecap="round" />

        {/* 글자 'に' 오버레이 */}
        <MnemonicCharOverlay char="に" fontFamily={fontFamily} x="108" y="118" />
      </svg>
    );
  }

  if (char === 'ぬ') {
    // ぬ: 누에 (뽕잎 위에서 통통한 몸을 둥글게 말아 황금빛 누에고치 실을 잣는 아기 누에벌레!)
    // ⚠️ 글자 'ぬ'의 둥근 몸통 곡선과 끝단의 둥근 매듭 루프(누에고치)가 완벽히 일치! (め와의 명확한 구분점)
    return (
      <svg
        viewBox="0 0 200 160"
        className="w-full h-full select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 싱그러운 초록 뽕잎 (하단 베이스: 갉아먹은 자국 포함) */}
        <path
          d="M 40 128 
             C 52 112 60 114 68 116 
             C 72 110 80 112 86 116 
             C 114 110 152 114 168 126 
             C 142 140 76 142 40 128 Z"
          fill="#DCFCE7"
          stroke="#16A34A"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        {/* 뽕잎 중심 잎맥 및 잔잎맥 */}
        <path
          d="M 46 128 C 96 120 138 122 164 126"
          stroke="#86EFAC"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line x1="88" y1="123" x2="100" y2="118" stroke="#86EFAC" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="114" y1="123" x2="128" y2="119" stroke="#86EFAC" strokeWidth="1.2" strokeLinecap="round" />

        {/* 꼬리 끝 누에고치 (글자 ぬ 꼬리 루프 매듭과 일체화) */}
        <g id="silkworm-cocoon">
          {/* 황금빛 누에고치 본체 */}
          <ellipse
            cx="136"
            cy="114"
            rx="12"
            ry="9"
            fill="#FEF08A"
            stroke="#EAB308"
            strokeWidth="2"
          />
          {/* 비단 실이 칭칭 감긴 실타래 텍스처 */}
          <path
            d="M 128 110 C 134 108 142 112 144 116"
            stroke="#CA8A04"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <path
            d="M 130 118 C 136 120 142 116 144 112"
            stroke="#CA8A04"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          {/* 반짝이는 황금 비단실 뿜어나옴 */}
          <path
            d="M 144 108 C 156 98 152 82 162 76"
            stroke="#EAB308"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeDasharray="4 2"
          />
          <circle cx="162" cy="76" r="1.5" fill="#CA8A04" />
        </g>

        {/* 누에벌레 통통한 몸체 (크림 화이트 바디) */}
        {/* 왼쪽으로 둥글게 굽은 배와 등허리 */}
        <path
          d="M 118 42 
             C 110 52 84 56 68 76 
             C 56 92 60 114 78 122 
             C 96 128 118 122 128 112 
             C 120 102 110 88 112 70 
             C 114 56 124 50 126 42 
             Z"
          fill="#FFFDF7"
          stroke="#78716C"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* 누에 애벌레의 마디마디 주름선 (Chubby segments) */}
        <path d="M 64 88 C 74 92 84 90 92 84" stroke="#A8A29E" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M 68 102 C 78 106 88 104 96 98" stroke="#A8A29E" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M 80 114 C 88 116 98 114 104 108" stroke="#A8A29E" strokeWidth="1.4" strokeLinecap="round" />

        {/* 누에의 귀여운 꼬물꼬물 아기 발들 (노란 발 3개) */}
        <circle cx="72" cy="118" r="3" fill="#FDE047" stroke="#CA8A04" strokeWidth="1" />
        <circle cx="84" cy="122" r="3" fill="#FDE047" stroke="#CA8A04" strokeWidth="1" />
        <circle cx="96" cy="122" r="3" fill="#FDE047" stroke="#CA8A04" strokeWidth="1" />

        {/* 누에 귀여운 머리와 얼굴 (상단) */}
        <circle cx="122" cy="38" r="8" fill="#FFFDF7" stroke="#78716C" strokeWidth="1.8" />
        {/* 머리 위 작은 귀여운 뿔 */}
        <path d="M 120 30 C 119 26 122 25 124 28" stroke="#78716C" strokeWidth="1.4" strokeLinecap="round" />
        {/* 반짝이는 까만 눈 */}
        <circle cx="125" cy="37" r="1.8" fill="#1E293B" />
        <circle cx="125.5" cy="36.5" r="0.6" fill="#FFFFFF" />
        {/* 복숭아빛 볼터치 */}
        <ellipse cx="123" cy="41" rx="2.5" ry="1.6" fill="#FDA4AF" opacity="0.8" />
        {/* 앙증맞은 입 */}
        <path d="M 126 40 C 128 41 127 43 125 42" stroke="#78716C" strokeWidth="1" strokeLinecap="round" />

        {/* 글자 'ぬ' 오버레이 */}
        <MnemonicCharOverlay char="ぬ" fontFamily={fontFamily} x="108" y="118" />
      </svg>
    );
  }

  if (char === 'ね') {
    // ね: 그네 (A자형 프레임, 상단 가랜드, 양쪽 튼튼한 밧줄, 원목 널빤지와 둥근 매듭 루프가 글자 'ね'와 1:1 완벽 일치!)
    // ⚠️ 글자 1획은 왼쪽 밧줄, 2획 수직부는 오른쪽 밧줄, 2획 우하단 매듭은 둥글게 감긴 밧줄 고리와 일체화!
    return (
      <svg
        viewBox="0 0 200 160"
        className="w-full h-full select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 1. 배경 잔디 언덕 & 지면 그림자 */}
        {/* 부드러운 초록 잔디 언덕 */}
        <path
          d="M 0 148 C 50 140 150 140 200 148 L 200 160 L 0 160 Z"
          fill="#DCFCE7"
        />
        <path
          d="M 0 148 C 50 140 150 140 200 148"
          stroke="#86EFAC"
          strokeWidth="1.5"
        />
        {/* 잔디밭에 핀 앙증맞은 노란 들꽃들 */}
        <g id="grass-flowers">
          <circle cx="28" cy="144" r="2.5" fill="#FDE047" stroke="#EAB308" strokeWidth="0.8" />
          <circle cx="26" cy="142" r="1.5" fill="#FFFFFF" />
          <circle cx="30" cy="142" r="1.5" fill="#FFFFFF" />
          <circle cx="28" cy="146" r="1.5" fill="#FFFFFF" />

          <circle cx="172" cy="144" r="2.5" fill="#FDE047" stroke="#EAB308" strokeWidth="0.8" />
          <circle cx="170" cy="142" r="1.5" fill="#FFFFFF" />
          <circle cx="174" cy="142" r="1.5" fill="#FFFFFF" />
          <circle cx="172" cy="146" r="1.5" fill="#FFFFFF" />
        </g>
        {/* 그네 널빤지의 지면 그림자 (타원) */}
        <ellipse cx="110" cy="145" rx="46" ry="5.5" fill="#94A3B8" opacity="0.3" />

        {/* 2. 놀이터 A자형 그네 프레임 (누가 봐도 한눈에 '그네'로 알아보는 상징적 구조!) */}
        {/* 좌측 A자 지지대 다리 2개 & 보강 빔 */}
        <line x1="38" y1="28" x2="16" y2="150" stroke="#0F766E" strokeWidth="4.5" strokeLinecap="round" />
        <line x1="38" y1="28" x2="16" y2="150" stroke="#14B8A6" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="42" y1="28" x2="36" y2="150" stroke="#0F766E" strokeWidth="4" strokeLinecap="round" />
        <line x1="42" y1="28" x2="36" y2="150" stroke="#2DD4BF" strokeWidth="2" strokeLinecap="round" />
        {/* 좌측 A자 다리 가로 버팀목 */}
        <line x1="22" y1="112" x2="36" y2="112" stroke="#0F766E" strokeWidth="3" strokeLinecap="round" />
        <line x1="22" y1="112" x2="36" y2="112" stroke="#14B8A6" strokeWidth="1.5" strokeLinecap="round" />

        {/* 우측 A자 지지대 다리 2개 & 보강 빔 */}
        <line x1="162" y1="28" x2="184" y2="150" stroke="#0F766E" strokeWidth="4.5" strokeLinecap="round" />
        <line x1="162" y1="28" x2="184" y2="150" stroke="#14B8A6" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="158" y1="28" x2="164" y2="150" stroke="#0F766E" strokeWidth="4" strokeLinecap="round" />
        <line x1="158" y1="28" x2="164" y2="150" stroke="#2DD4BF" strokeWidth="2" strokeLinecap="round" />
        {/* 우측 A자 다리 가로 버팀목 */}
        <line x1="164" y1="112" x2="178" y2="112" stroke="#0F766E" strokeWidth="3" strokeLinecap="round" />
        <line x1="164" y1="112" x2="178" y2="112" stroke="#14B8A6" strokeWidth="1.5" strokeLinecap="round" />

        {/* 상단 굵고 튼튼한 메인 가로 크로스바 (Main Beam) */}
        <rect x="24" y="24" width="152" height="9" rx="4.5" fill="#0D9488" stroke="#0F766E" strokeWidth="1.5" />
        <rect x="28" y="25.5" width="144" height="3" rx="1.5" fill="#5EEAD4" opacity="0.6" />
        {/* 좌우 마감 캡 & 볼트 */}
        <circle cx="28" cy="28.5" r="2" fill="#E2E8F0" stroke="#475569" strokeWidth="1" />
        <circle cx="172" cy="28.5" r="2" fill="#E2E8F0" stroke="#475569" strokeWidth="1" />

        {/* 상단에 매달린 귀여운 놀이터 삼각 가랜드 (Pennant Bunting) */}
        <path d="M 44 33 Q 62 40 82 33 Q 110 42 138 33 Q 148 39 156 33" stroke="#94A3B8" strokeWidth="1" fill="none" />
        {/* 미니 플래그들 */}
        <polygon points="52,36 60,37 56,46" fill="#F43F5E" />
        <polygon points="68,38 76,37 72,47" fill="#FBBF24" />
        <polygon points="94,38 102,39 98,48" fill="#38BDF8" />
        <polygon points="110,39 118,38 114,48" fill="#A855F7" />
        <polygon points="126,37 134,36 130,46" fill="#34D399" />
        <polygon points="142,35 150,34 146,44" fill="#F43F5E" />

        {/* 3. 그네 상단 메탈 행거 섀클 고리 (Hanger Brackets) */}
        {/* 왼쪽 섀클 고리 (x=82) */}
        <rect x="78" y="31" width="8" height="6" rx="2" fill="#94A3B8" stroke="#475569" strokeWidth="1" />
        <circle cx="82" cy="39" r="3" stroke="#64748B" strokeWidth="2" />
        {/* 오른쪽 섀클 고리 (x=138) */}
        <rect x="134" y="31" width="8" height="6" rx="2" fill="#94A3B8" stroke="#475569" strokeWidth="1" />
        <circle cx="138" cy="39" r="3" stroke="#64748B" strokeWidth="2" />

        {/* 4. 그네 밧줄 2가닥 (Twisted Ropes - 글자 1획 및 2획 수직선과 1:1 완벽 일치!) */}
        {/* 왼쪽 밧줄: 1획 뒤편 (x=82, y=41 ~ 120) */}
        <line x1="82" y1="41" x2="82" y2="120" stroke="#B45309" strokeWidth="4.5" strokeLinecap="round" />
        <line x1="82" y1="41" x2="82" y2="120" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
        {/* 밧줄 꼬임 하이라이트 질감 */}
        <line x1="82" y1="41" x2="82" y2="120" stroke="#FEF3C7" strokeWidth="1.5" strokeDasharray="3 3" />

        {/* 오른쪽 밧줄: 2획 수직부 뒤편 (x=138, y=41 ~ 118) */}
        <line x1="138" y1="41" x2="138" y2="118" stroke="#B45309" strokeWidth="4.5" strokeLinecap="round" />
        <line x1="138" y1="41" x2="138" y2="118" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
        {/* 밧줄 꼬임 하이라이트 질감 */}
        <line x1="138" y1="41" x2="138" y2="118" stroke="#FEF3C7" strokeWidth="1.5" strokeDasharray="3 3" />

        {/* 5. 역동적인 스윙 모션 & 바람선 (Swing Motion Arcs) */}
        {/* 앞뒤로 슝슝 날아오르는 바람을 가르는 궤적선 */}
        <path
          d="M 148 68 C 166 78 168 98 158 114"
          stroke="#38BDF8"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeDasharray="16 4"
        />
        <path
          d="M 156 78 C 172 88 172 106 164 118"
          stroke="#BAE6FD"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        {/* 바람에 흩날리는 나뭇잎들 */}
        <path d="M 166 64 C 172 62 174 66 170 70 C 166 68 164 64 166 64 Z" fill="#86EFAC" stroke="#16A34A" strokeWidth="0.8" />
        <path d="M 64 88 C 68 84 72 88 68 92 C 64 90 62 86 64 88 Z" fill="#86EFAC" stroke="#16A34A" strokeWidth="0.8" />

        {/* 6. 그네 원목 널빤지 (Wood Swing Board - 넓고 도톰한 원목 좌판) */}
        {/* 판자 본체 (x=64 ~ 156, y=118 ~ 128, 두께 10px, rx=5) */}
        <rect
          x="64"
          y="118"
          width="92"
          height="10"
          rx="5"
          fill="#F59E0B"
          stroke="#B45309"
          strokeWidth="2"
        />
        {/* 판자 상단 원목 광택 하이라이트 */}
        <rect x="67" y="119.5" width="86" height="3" rx="1.5" fill="#FEF3C7" opacity="0.7" />
        {/* 판자 하단 입체 그림자 띠 */}
        <rect x="66" y="125" width="88" height="2" rx="1" fill="#92400E" opacity="0.4" />
        {/* 판자 표면 나뭇결 디테일 */}
        <line x1="90" y1="123" x2="114" y2="123" stroke="#B45309" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
        <line x1="120" y1="123" x2="132" y2="123" stroke="#B45309" strokeWidth="1" strokeLinecap="round" opacity="0.6" />

        {/* 판자 양쪽 밧줄 관통 금속 아일렛 홀 */}
        <circle cx="82" cy="123" r="3" fill="#D97706" stroke="#78350F" strokeWidth="1.2" />
        <circle cx="82" cy="123" r="1.5" fill="#451A03" />
        <circle cx="138" cy="123" r="3" fill="#D97706" stroke="#78350F" strokeWidth="1.2" />
        <circle cx="138" cy="123" r="1.5" fill="#451A03" />

        {/* 왼쪽 밧줄 하단 단단한 묶음 매듭 */}
        <ellipse cx="82" cy="130" rx="3.5" ry="3" fill="#D97706" stroke="#92400E" strokeWidth="1.2" />
        <path d="M 82 133 L 81 138 M 83 133 L 84 137" stroke="#B45309" strokeWidth="1.2" strokeLinecap="round" />

        {/* 7. 우하단 둥근 밧줄 매듭 루프 (Loop Knot - 글자 'ね'의 2획 우하단 둥근 고리와 1:1 완벽 일치!) */}
        <g id="rope-knot-loop">
          {/* 널빤지를 감아 둥글게 원형 루프를 튼 도톰한 밧줄 똬리 */}
          <ellipse
            cx="136"
            cy="114"
            rx="11"
            ry="9.5"
            fill="#FEF3C7"
            stroke="#B45309"
            strokeWidth="3.2"
          />
          {/* 매듭 꼬임선 텍스처 */}
          <path
            d="M 128 111 C 132 108 140 110 144 115"
            stroke="#D97706"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 130 118 C 134 120 142 118 144 113"
            stroke="#D97706"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* 매듭 중앙 고리 구멍 (음영) */}
          <circle cx="136" cy="114" r="3.2" fill="#78350F" />
          {/* 둥근 루프 아래로 찰랑이는 밧줄 술(Tassel) 끝자락 */}
          <path
            d="M 140 123 C 144 128 148 132 150 134"
            stroke="#B45309"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M 142 124 C 146 128 152 130 154 132"
            stroke="#F59E0B"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </g>

        {/* 8. 널빤지 좌측에 묶여 바람에 펄럭이는 예쁜 리본 (바람의 상쾌함을 더해줌) */}
        <g id="swing-ribbon">
          <circle cx="78" cy="118" r="2.5" fill="#F43F5E" />
          <path
            d="M 77 119 C 72 122 66 120 62 123"
            stroke="#F43F5E"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 76 120 C 70 125 64 126 58 128"
            stroke="#FB7185"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </g>

        {/* 글자 'ね' 오버레이 */}
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
