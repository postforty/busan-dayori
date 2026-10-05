import { MnemonicSvgChildProps } from './types';
import MnemonicCharOverlay from './MnemonicCharOverlay';

export default function MnemonicRowMa({ char, fontFamily }: MnemonicSvgChildProps) {
  if (char === 'ま') {
    // ま: 마술 (실크햇 모자와 트럼프 카드, 흰 장갑 손의 마술봉에서 터지는 마법 별빛, 뿅! 튀어나온 마술 토끼와 펄럭이는 망토!)
    // ⚠️ 1획은 실크햇 모자 챙·레드 리본·골드 버클, 2획은 흰 장갑이 쥔 마술봉 & 마법 연기 폭발, 3획 상단은 실크햇·트럼프 카드, 3획 루프는 양 앞발을 얹은 마술 토끼, 3획 뻗침은 레드 안감 마술 망토와 완벽 일치!
    return (
      <svg
        viewBox="0 0 200 160"
        className="w-full h-full select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 1. 배경 신비로운 마술 스테이지 조명 (Mystic Magic Stage) */}
        <circle cx="100" cy="80" r="68" fill="#FAF5FF" />
        <circle cx="100" cy="80" r="52" fill="#F3E8FF" opacity="0.6" />
        {/* 바닥 스테이지 원형 조명 */}
        <ellipse cx="100" cy="138" rx="62" ry="7" fill="#E9D5FF" opacity="0.5" />
        <ellipse cx="100" cy="138" rx="44" ry="4" fill="#DDD6FE" opacity="0.7" />

        {/* 2. 상단 마술 실크햇 (Top Hat) & 트럼프 카드 2장 (Playing Cards) */}
        {/* 트럼프 카드 1: 하트(♥) 카드 (왼쪽 뒤로 기울어져 꽂힘) */}
        <g transform="rotate(-22 78 28)">
          <rect x="68" y="14" width="18" height="26" rx="2.5" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.2" />
          {/* 하트 심볼 */}
          <path
            d="M 77 22 C 77 19.5 73.5 19.5 73.5 22 C 73.5 24.5 77 27.5 77 27.5 C 77 27.5 80.5 24.5 80.5 22 C 80.5 19.5 77 19.5 77 22 Z"
            fill="#EF4444"
          />
          <circle cx="71.5" cy="18" r="1.1" fill="#EF4444" />
          <circle cx="82.5" cy="36" r="1.1" fill="#EF4444" />
        </g>

        {/* 트럼프 카드 2: 에이스 스페이드(♠) 카드 (그 앞쪽에 비스듬히 꽂힘) */}
        <g transform="rotate(-6 86 28)">
          <rect x="76" y="14" width="18" height="26" rx="2.5" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="1.2" />
          {/* 스페이드 심볼 */}
          <path
            d="M 85 20 C 85 22.8 81.5 24.5 81.5 26 C 81.5 27.5 83.5 27.5 84 26.8 L 83.5 29 L 86.5 29 L 86 26.8 C 86.5 27.5 88.5 27.5 88.5 26 C 88.5 24.5 85 22.8 85 20 Z"
            fill="#0F172A"
          />
          <circle cx="79.5" cy="18" r="1.1" fill="#0F172A" />
          <circle cx="90.5" cy="36" r="1.1" fill="#0F172A" />
        </g>

        {/* 3획 상단부: 마술사의 대형 블랙 실크햇 (Top Hat 크라운) */}
        {/* 모자 원통 바디 (글자 획보다 훨씬 넓어 좌우로 뚜렷이 보임!) */}
        <path
          d="M 86 48 L 89 18 C 89 14 127 14 127 18 L 130 48 Z"
          fill="#1E293B"
          stroke="#0F172A"
          strokeWidth="1.8"
        />
        {/* 모자 상단 뚜껑 타원 */}
        <ellipse cx="108" cy="18" rx="19" ry="4" fill="#334155" />
        {/* 모자 실크 광택 하이라이트 라인 */}
        <line x1="96" y1="21" x2="94" y2="45" stroke="#64748B" strokeWidth="2" strokeLinecap="round" />

        {/* 3. 글자 'ま' 1획: 와이드 실크햇 모자 챙(Brim) & 레드 리본 & 골드 버클 */}
        {/* 좌우로 100px 시원하게 펼쳐진 타원형 모자 챙 */}
        <path
          d="M 56 50 C 74 43 142 43 160 50 C 148 56 68 56 56 50 Z"
          fill="#0F172A"
        />
        {/* 모자를 두른 선명한 레드 실크 리본 띠 */}
        <path
          d="M 85 47 C 98 44 118 44 131 47"
          stroke="#EF4444"
          strokeWidth="5.5"
          strokeLinecap="round"
        />
        <path
          d="M 87 47 C 99 45 117 45 129 47"
          stroke="#F87171"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        {/* 중앙 황금 버클 (Gold Buckle) */}
        <rect x="104" y="44" width="8" height="6" rx="1.2" fill="#F59E0B" stroke="#D97706" strokeWidth="0.8" />
        <rect x="106" y="45.5" width="4" height="3" rx="0.6" fill="#1E293B" />

        {/* 4. 글자 'ま' 2획: 마술 지팡이(Magic Wand) + 화이트 장갑 손 + 마법 연기 폭발 & 별빛 */}
        {/* 마술 지팡이 본체 (화면을 가로지르는 롱 완드 x=38 ~ 164) */}
        <line x1="38" y1="74" x2="164" y2="74" stroke="#0F172A" strokeWidth="5.2" strokeLinecap="round" />
        {/* 지팡이 양끝 화이트 팁 */}
        <line x1="38" y1="74" x2="48" y2="74" stroke="#F8FAFC" strokeWidth="5.2" strokeLinecap="round" />
        <line x1="154" y1="74" x2="164" y2="74" stroke="#F8FAFC" strokeWidth="5.2" strokeLinecap="round" />
        {/* 골든 악센트 링 */}
        <line x1="48" y1="71" x2="48" y2="77" stroke="#F59E0B" strokeWidth="1.6" />
        <line x1="154" y1="71" x2="154" y2="77" stroke="#F59E0B" strokeWidth="1.6" />

        {/* 4-1. 좌측 (x=40~65): 지팡이를 쥐고 있는 마술사의 화이트 실크 장갑 (White Glove Hand) */}
        {/* 블랙 턱시도 소매 커프스 */}
        <rect x="40" y="66" width="7" height="16" rx="2" fill="#1E293B" stroke="#0F172A" strokeWidth="1" />
        <line x1="47" y1="67" x2="47" y2="81" stroke="#FFFFFF" strokeWidth="1.5" />
        {/* 장갑 낀 손바닥 */}
        <ellipse cx="54" cy="74" rx="7" ry="6.5" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.3" />
        {/* 지팡이를 감싼 손가락들 */}
        <circle cx="58" cy="71" r="3" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.1" />
        <circle cx="60" cy="74" r="3" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.1" />
        <circle cx="58" cy="77" r="3" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.1" />
        <circle cx="53" cy="71" r="2.8" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />

        {/* 4-2. 우측 (x=150~182): 지팡이 끝에서 펑! 터지는 마법 연기 구름 (Magic Smoke Puff) */}
        <circle cx="164" cy="72" r="8.5" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.3" />
        <circle cx="173" cy="67" r="6.5" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.3" />
        <circle cx="174" cy="77" r="7" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.3" />
        <circle cx="160" cy="80" r="5.5" fill="#FFFFFF" opacity="0.9" />

        {/* 4-3. 지팡이 끝 대형 황금 마법 별빛 (Sparkle ✦) */}
        <path
          d="M 170 60 L 172.5 69 L 181 72 L 172.5 75 L 170 84 L 167.5 75 L 159 72 L 167.5 69 Z"
          fill="#F59E0B"
        />
        <path
          d="M 170 64 L 171.8 69.5 L 177 72 L 171.8 74.5 L 170 80 L 168.2 74.5 L 163 72 L 168.2 69.5 Z"
          fill="#FDE047"
        />
        {/* 주변 마법 별빛 & 빛가루 */}
        <path d="M 152 56 L 153.5 60 L 157 61.5 L 153.5 63 L 152 67 L 150.5 63 L 147 61.5 L 150.5 60 Z" fill="#FBBF24" />
        <path d="M 182 86 L 183.5 89 L 187 90.5 L 183.5 92 L 182 95 L 180.5 92 L 177 90.5 L 180.5 89 Z" fill="#FBBF24" />
        <circle cx="162" cy="57" r="1.6" fill="#FDE047" />
        <circle cx="180" cy="58" r="1.8" fill="#F59E0B" />
        <circle cx="158" cy="90" r="1.3" fill="#FBBF24" />

        {/* 5. 글자 'ま' 3획 하단: 모자에서 튀어나와 난간을 쥔 귀여운 마술 토끼 (Magic Rabbit) */}
        {/* 쫑긋한 하얀 두 귀 (위로 높고 시원하게 솟음 y=62~95) */}
        {/* 왼쪽 귀 */}
        <path
          d="M 88 95 C 82 76 86 63 92 65 C 97 66 98 81 96 95 Z"
          fill="#FFFFFF"
          stroke="#CBD5E1"
          strokeWidth="1.6"
        />
        <path d="M 89 92 C 85 78 88 69 92 70 C 94 71 95 82 94 92 Z" fill="#FDA4AF" />
        {/* 오른쪽 귀 */}
        <path
          d="M 118 95 C 120 76 126 63 132 65 C 136 67 132 82 126 95 Z"
          fill="#FFFFFF"
          stroke="#CBD5E1"
          strokeWidth="1.6"
        />
        <path d="M 120 92 C 122 78 126 69 130 70 C 132 72 129 82 124 92 Z" fill="#FDA4AF" />

        {/* 큼직하고 포근한 토끼 얼굴 본체 (글자 루프 바깥으로 뺨이 풍성하게 드러남!) */}
        <ellipse
          cx="106"
          cy="106"
          rx="23"
          ry="19"
          fill="#FFFFFF"
          stroke="#CBD5E1"
          strokeWidth="1.6"
        />

        {/* 똘망똘망한 눈망울 (하이라이트 포함) */}
        <ellipse cx="98" cy="103" rx="2.5" ry="3" fill="#1E293B" />
        <circle cx="97.2" cy="101.8" r="1" fill="#FFFFFF" />
        <ellipse cx="114" cy="103" rx="2.5" ry="3" fill="#1E293B" />
        <circle cx="113.2" cy="101.8" r="1" fill="#FFFFFF" />

        {/* 앙증맞은 핑크 삼각 코 & 'ㅅ'자 웃는 입 */}
        <polygon points="104.5,107 107.5,107 106,109.5" fill="#F43F5E" />
        <path d="M 103 110 Q 106 112 106 109.5 Q 106 112 109 110" stroke="#94A3B8" strokeWidth="1.2" strokeLinecap="round" fill="none" />

        {/* 사랑스러운 핑크 볼터치 */}
        <ellipse cx="93" cy="108" rx="3.5" ry="2" fill="#FDA4AF" />
        <ellipse cx="119" cy="108" rx="3.5" ry="2" fill="#FDA4AF" />

        {/* 뺨 수염 양옆 2줄씩 */}
        <line x1="88" y1="106" x2="80" y2="104" stroke="#CBD5E1" strokeWidth="1" strokeLinecap="round" />
        <line x1="88" y1="109" x2="81" y2="111" stroke="#CBD5E1" strokeWidth="1" strokeLinecap="round" />
        <line x1="124" y1="106" x2="132" y2="104" stroke="#CBD5E1" strokeWidth="1" strokeLinecap="round" />
        <line x1="124" y1="109" x2="131" y2="111" stroke="#CBD5E1" strokeWidth="1" strokeLinecap="round" />

        {/* 토끼의 양 앞발 (글자 루프 테두리를 꼭 쥔 채 고개를 쏙 내민 연출!) */}
        <ellipse cx="85" cy="116" rx="5.5" ry="4" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.3" transform="rotate(-15 85 116)" />
        <line x1="83" y1="116" x2="83" y2="119" stroke="#E2E8F0" strokeWidth="1" />
        <line x1="86" y1="116" x2="86" y2="119" stroke="#E2E8F0" strokeWidth="1" />

        <ellipse cx="127" cy="116" rx="5.5" ry="4" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.3" transform="rotate(15 127 116)" />
        <line x1="126" y1="116" x2="126" y2="119" stroke="#E2E8F0" strokeWidth="1" />
        <line x1="129" y1="116" x2="129" y2="119" stroke="#E2E8F0" strokeWidth="1" />

        {/* 토끼 턱 아래 앙증맞은 레드 나비넥타이 (Bowtie) */}
        <polygon points="101,116 106,119 101,122" fill="#EF4444" />
        <polygon points="111,116 106,119 111,122" fill="#EF4444" />
        <circle cx="106" cy="119" r="2" fill="#DC2626" />

        {/* 6. 글자 'ま' 3획 우하향 뻗침: 펄럭이는 레드 안감의 마술 망토 (Magic Cape) */}
        {/* 망토 블랙 겉감 */}
        <path
          d="M 120 110 C 132 112 148 118 162 128 C 156 136 138 132 122 122 Z"
          fill="#0F172A"
        />
        {/* 망토 선명한 레드 실크 안감 */}
        <path
          d="M 126 114 C 136 118 152 124 164 129 C 158 135 142 133 128 124 Z"
          fill="#EF4444"
        />
        {/* 망토 끝자락 골든 태슬 장식 */}
        <circle cx="164" cy="129" r="2.2" fill="#F59E0B" />
        <line x1="164" y1="129" x2="167" y2="134" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />

        {/* 공중 흩날리는 신비로운 마법 가루 */}
        <circle cx="62" cy="46" r="1.5" fill="#F59E0B" />
        <circle cx="148" cy="38" r="1.5" fill="#FBBF24" />
        <circle cx="76" cy="100" r="1.2" fill="#FDE047" />
        <circle cx="136" cy="102" r="1.2" fill="#FDE047" />

        {/* 글자 'ま' 오버레이 */}
        <MnemonicCharOverlay char="ま" fontFamily={fontFamily} x="108" y="118" />
      </svg>
    );
  }

  if (char === 'み') {
    // み: 미로 (정교하고 촘촘한 미로 보드게임을 단숨에 돌파하여 탈출하는 성공 경로와 결승 깃발!)
    // ⚠️ 1획은 START 입구에서 미로 골목을 통과해 루프를 돌아 GOAL 출구로 빠져나가는 완벽한 탈출 성공 경로, 2획은 출구의 승리 깃대·결승 깃발과 1:1 일치!
    return (
      <svg
        viewBox="0 0 200 160"
        className="w-full h-full select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* 미로 탐험 골든 마블 구슬 입체 그라디언트 */}
          <radialGradient id="miroGoldMarble" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="45%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#B45309" />
          </radialGradient>
          {/* 미로 보드 베이스 그라디언트 */}
          <linearGradient id="miroBoardBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FAF5FF" />
            <stop offset="100%" stopColor="#F3E8FF" />
          </linearGradient>
        </defs>

        {/* 1. 미로 보드 베이스 플랫폼 (와이드 라운드 퍼즐 보드) */}
        {/* 하단 그림자 베이스 */}
        <rect
          x="14"
          y="14"
          width="172"
          height="136"
          rx="14"
          fill="#DDD6FE"
        />
        {/* 메인 보드 상판 (도톰한 라일락/바이올렛 베젤) */}
        <rect
          x="14"
          y="10"
          width="172"
          height="136"
          rx="14"
          fill="url(#miroBoardBg)"
          stroke="#C4B5FD"
          strokeWidth="2.4"
        />
        {/* 미로 내부 플레이 그라운드 홈 */}
        <rect
          x="20"
          y="16"
          width="160"
          height="124"
          rx="10"
          fill="#F8F7FF"
          stroke="#EDE9FE"
          strokeWidth="1.2"
        />

        {/* 미로 바닥 그리드 도트 패턴 (퍼즐 보드게임 질감) */}
        <g opacity="0.35">
          <circle cx="36" cy="32" r="0.9" fill="#9333EA" />
          <circle cx="66" cy="32" r="0.9" fill="#9333EA" />
          <circle cx="96" cy="32" r="0.9" fill="#9333EA" />
          <circle cx="126" cy="32" r="0.9" fill="#9333EA" />
          <circle cx="156" cy="32" r="0.9" fill="#9333EA" />
          <circle cx="36" cy="62" r="0.9" fill="#9333EA" />
          <circle cx="166" cy="62" r="0.9" fill="#9333EA" />
          <circle cx="36" cy="92" r="0.9" fill="#9333EA" />
          <circle cx="166" cy="92" r="0.9" fill="#9333EA" />
          <circle cx="36" cy="122" r="0.9" fill="#9333EA" />
          <circle cx="66" cy="122" r="0.9" fill="#9333EA" />
          <circle cx="96" cy="122" r="0.9" fill="#9333EA" />
          <circle cx="126" cy="122" r="0.9" fill="#9333EA" />
          <circle cx="156" cy="122" r="0.9" fill="#9333EA" />
        </g>

        {/* 2. 글자 'み' 1획 연상: 미로 탈출 성공 경로 (Golden Solution Route) */}
        {/* 바닥에 깔린 화사한 탈출 트랙 (START -> 루프 -> GOAL) */}
        <path
          d="M 57 28
             L 57 42
             L 82 42 
             L 114 52 
             L 74 110 
             C 64 114 64 124 74 126 
             C 84 126 94 116 88 108 
             C 84 104 78 108 78 114 
             L 174 114"
          stroke="#FEF08A"
          strokeWidth="9"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.65"
        />
        {/* 탈출 트랙 중앙 주황색 점선 안내선 */}
        <path
          d="M 57 28 L 57 42 L 82 42 L 114 52 L 74 110 C 64 114 64 124 74 126 C 84 126 94 116 88 108 C 84 104 78 108 78 114 L 174 114"
          stroke="#F59E0B"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="3 4"
        />

        {/* 3. 촘촘하고 규칙적인 미로 벽 시스템 (Maze Walls) */}
        {/* (1) 미로 외곽 벽 (Outer Boundary - START와 GOAL은 시원하게 개방) */}
        {/* 외벽 그림자 */}
        <g stroke="#C4B5FD" strokeWidth="4.6" strokeLinecap="round" strokeLinejoin="round">
          {/* 좌상단 입구 좌측 코너 */}
          <path d="M 23 43 L 23 21 L 47 21" />
          {/* 상단 및 우측 벽 (START 입구 우측부터 출구 상단까지) */}
          <path d="M 67 21 L 177 21 L 177 103" />
          {/* 하단 및 좌측 벽 (출구 하단부터 입구 하단까지 둘러쌈) */}
          <path d="M 177 123 L 177 137 L 23 137 L 23 57" />
        </g>
        {/* 외벽 본체 */}
        <g stroke="#7C3AED" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M 23 41 L 23 19 L 47 19" />
          <path d="M 67 19 L 177 19 L 177 101" />
          <path d="M 177 123 L 177 135 L 23 135 L 23 57" />
        </g>

        {/* (2) 내부 미로 벽면들 (사방을 채워 미로의 복잡한 길과 막다른 골목을 형성) */}
        {/* 벽 하단 입체 그림자 레이어 */}
        <g stroke="#DDD6FE" strokeWidth="4.4" strokeLinecap="round" strokeLinejoin="round">
          {/* 좌측 구역 벽들 */}
          <path d="M 35 19 L 35 45 L 47 45" />
          <path d="M 23 59 L 47 59 L 47 77" />
          <path d="M 35 77 L 35 95 L 49 95" />
          <path d="M 23 111 L 45 111 L 45 125" />
          <path d="M 57 61 L 57 87" />
          <path d="M 45 127 L 59 127 L 59 137" />

          {/* 상단 및 우상단 구역 벽들 */}
          <path d="M 67 33 L 79 33" />
          <path d="M 95 19 L 95 37 L 115 37" />
          <path d="M 129 19 L 129 35 L 145 35" />
          <path d="M 161 19 L 161 47 L 177 47" />
          <path d="M 143 51 L 165 51" />

          {/* 중앙 통로 가이드 및 갈림길 */}
          <path d="M 127 49 L 127 67" />
          <path d="M 147 65 L 147 89 L 165 89" />
          <path d="M 177 73 L 163 73" />
          <path d="M 97 51 L 97 75" />
          <path d="M 77 51 L 77 69 L 89 69" />
          <path d="M 85 85 L 103 85" />

          {/* 하단 및 출구 가이드 벽들 */}
          <path d="M 71 129 L 87 129 L 87 137" />
          <path d="M 99 129 L 115 129 L 115 137" />
          <path d="M 129 127 L 145 127 L 145 137" />
          <path d="M 159 125 L 159 137" />
          <path d="M 135 99 L 163 99 L 163 105" />
          <path d="M 121 95 L 121 109" />
        </g>

        {/* 벽 본체 레이어 (단단하고 또렷한 바이올렛 미로 벽) */}
        <g stroke="#7C3AED" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
          {/* 좌측 구역 벽들 */}
          <path d="M 35 19 L 35 43 L 47 43" />
          <path d="M 23 57 L 47 57 L 47 75" />
          <path d="M 35 75 L 35 93 L 49 93" />
          <path d="M 23 109 L 45 109 L 45 123" />
          <path d="M 57 59 L 57 85" />
          <path d="M 45 125 L 59 125 L 59 135" />

          {/* 상단 및 우상단 구역 벽들 */}
          <path d="M 67 31 L 79 31" />
          <path d="M 95 19 L 95 35 L 115 35" />
          <path d="M 129 19 L 129 33 L 145 33" />
          <path d="M 161 19 L 161 45 L 177 45" />
          <path d="M 143 49 L 165 49" />

          {/* 중앙 통로 가이드 및 갈림길 */}
          <path d="M 127 47 L 127 65" />
          <path d="M 147 63 L 147 87 L 165 87" />
          <path d="M 177 71 L 163 71" />
          <path d="M 97 49 L 97 73" />
          <path d="M 77 49 L 77 67 L 89 67" />
          <path d="M 85 83 L 103 83" />

          {/* 하단 및 출구 가이드 벽들 */}
          <path d="M 71 127 L 87 127 L 87 135" />
          <path d="M 99 127 L 115 127 L 115 135" />
          <path d="M 129 125 L 145 125 L 145 135" />
          <path d="M 159 123 L 159 135" />
          <path d="M 135 97 L 163 97 L 163 103" />
          <path d="M 121 93 L 121 107" />
        </g>

        {/* 미로 벽 교차점/끝단 기둥 볼 (Pegs / Pillars) */}
        <g fill="#6D28D9">
          <circle cx="47" cy="43" r="2.2" />
          <circle cx="47" cy="75" r="2.2" />
          <circle cx="49" cy="93" r="2.2" />
          <circle cx="45" cy="123" r="2.2" />
          <circle cx="79" cy="31" r="2.2" />
          <circle cx="115" cy="35" r="2.2" />
          <circle cx="145" cy="33" r="2.2" />
          <circle cx="165" cy="49" r="2.2" />
          <circle cx="165" cy="87" r="2.2" />
          <circle cx="163" cy="71" r="2.2" />
          <circle cx="89" cy="67" r="2.2" />
          <circle cx="103" cy="83" r="2.2" />
          <circle cx="163" cy="103" r="2.2" />
        </g>

        {/* 막다른 길(Dead ends) 퍼즐 장식 (X 마커 & 보석 아이템) */}
        {/* 우상단 막다른 길 빨간 X */}
        <path d="M 143 23 L 149 29 M 149 23 L 143 29" stroke="#EF4444" strokeWidth="1.6" strokeLinecap="round" />
        {/* 좌측 막다른 길 황금 다이아 보석 */}
        <polygon points="35,82 38,85 35,88 32,85" fill="#F59E0B" stroke="#D97706" strokeWidth="0.8" />
        {/* 우측 막다른 길 빨간 X */}
        <path d="M 169 77 L 175 83 M 175 77 L 169 83" stroke="#EF4444" strokeWidth="1.6" strokeLinecap="round" />

        {/* 4. START (입구 - 좌상단 x=48~66) */}
        {/* 출발 발판 타일 */}
        <rect x="49" y="16" width="16" height="8" rx="2" fill="#DCFCE7" stroke="#86EFAC" strokeWidth="1" />
        {/* START 텍스트 배지 */}
        <rect x="48" y="6" width="18" height="8" rx="2" fill="#15803D" />
        <text x="57" y="12.5" fontSize="5" fontWeight="bold" fill="#FFFFFF" textAnchor="middle" letterSpacing="0.5">
          START
        </text>
        {/* 초록색 출발 깃발 */}
        <line x1="48" y1="20" x2="48" y2="7" stroke="#166534" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M 48 7 L 39 10.5 L 48 14 Z" fill="#22C55E" stroke="#15803D" strokeWidth="0.8" strokeLinejoin="round" />
        <circle cx="48" cy="6.5" r="1.3" fill="#FACC15" />

        {/* 입구 대기 중인 입체 골든 롤링 구슬 (Marble Ball) */}
        <circle cx="57" cy="27" r="4.2" fill="url(#miroGoldMarble)" stroke="#B45309" strokeWidth="0.9" />
        <circle cx="55.5" cy="25.5" r="1.1" fill="#FFFFFF" opacity="0.8" />
        {/* 구슬 아래 그림자 */}
        <ellipse cx="57" cy="31.5" rx="3.2" ry="1.2" fill="#000000" opacity="0.15" />

        {/* 5. GOAL (출구 - 우측 x=174~184, y=103~123) */}
        {/* 결승선 체커보드 바닥 (Racing Finish Line) */}
        <g opacity="0.85">
          <rect x="170" y="105" width="4" height="4.5" fill="#1E293B" />
          <rect x="174" y="105" width="4" height="4.5" fill="#FFFFFF" />
          <rect x="170" y="109.5" width="4" height="4.5" fill="#FFFFFF" />
          <rect x="174" y="109.5" width="4" height="4.5" fill="#1E293B" />
          <rect x="170" y="114" width="4" height="4.5" fill="#1E293B" />
          <rect x="174" y="114" width="4" height="4.5" fill="#FFFFFF" />
          <rect x="170" y="118.5" width="4" height="4.5" fill="#FFFFFF" />
          <rect x="174" y="118.5" width="4" height="4.5" fill="#1E293B" />
        </g>
        {/* GOAL 텍스트 배지 */}
        <rect x="169" y="93" width="16" height="8" rx="2" fill="#DC2626" />
        <text x="177" y="99.5" fontSize="5" fontWeight="bold" fill="#FFFFFF" textAnchor="middle" letterSpacing="0.5">
          GOAL
        </text>
        {/* 출구 탈출 화살표 */}
        <path d="M 179 114 L 187 114 M 184 111 L 187 114 L 184 117" stroke="#EA580C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />

        {/* 6. 글자 'み' 2획 연상: 출구 승리의 깃대 & 펄럭이는 레드 결승 깃발 */}
        {/* 2획 궤적을 이루는 메탈릭 깃대 (우상단 136,70 -> 좌하단 114,128) */}
        <path
          d="M 136 70 L 114 128"
          stroke="#334155"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
        {/* 깃대 꼭대기 골든 피니얼 (볼) */}
        <circle cx="136" cy="69" r="3" fill="#F59E0B" stroke="#D97706" strokeWidth="0.9" />

        {/* 펄럭이는 레드 & 화이트 체크 결승 깃발 (FINISH Flag) */}
        <path
          d="M 136 70 
             C 146 65 156 73 166 68 
             L 158 85 
             C 148 89 138 82 130 87 Z"
          fill="#EF4444"
          stroke="#DC2626"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        {/* 깃발 펄럭임 주름 음영 */}
        <path
          d="M 144 71 C 150 73 158 70 166 68 L 158 85 C 150 87 142 84 136 86 Z"
          fill="#DC2626"
          opacity="0.35"
        />
        {/* 깃발 내부 화이트 체크 장식 포인트 */}
        <path
          d="M 142 70 L 150 68 L 148 76 L 140 78 Z"
          fill="#FFFFFF"
          opacity="0.9"
        />
        <path
          d="M 152 76 L 160 74 L 157 82 L 149 84 Z"
          fill="#FFFFFF"
          opacity="0.9"
        />

        {/* 7. 탈출 축하 반짝이 별빛 & 컨페티 (Victory Sparkles) */}
        <path d="M 172 101 L 174 96 L 176 101 L 181 103 L 176 105 L 174 110 L 172 105 L 167 103 Z" fill="#FBBF24" />
        <path d="M 183 124 L 184.5 121 L 186 124 L 189 125.5 L 186 127 L 184.5 130 L 183 127 L 180 125.5 Z" fill="#F59E0B" />
        <circle cx="166" cy="128" r="1.5" fill="#FDE047" />
        <circle cx="178" cy="88" r="1.4" fill="#38BDF8" />
        <circle cx="186" cy="98" r="1.2" fill="#F472B6" />

        {/* 글자 'み' 오버레이 */}
        <MnemonicCharOverlay char="み" fontFamily={fontFamily} x="108" y="118" />
      </svg>
    );
  }

  if (char === 'む') {
    // む: 무용 (공중으로 우아하게 도약하는 발레리나의 그랑 주테 도약, 풍성한 3단 핑크 튀튀와 토슈즈 실크 리본!)
    // ⚠️ 1획은 양옆으로 펼친 우아한 양팔(Port de bras), 2획 상단은 올림머리·티아라와 코르셋 레오타드, 2획 루프는 무릎을 굽힌 앞다리(Attitude)와 핑크 토슈즈, 2획 우상향 곡선은 공중으로 뻗은 뒷다리(Grand Jeté), 3획은 흩날리는 실크 리본과 꽃잎과 1:1 완벽 일치!
    return (
      <svg
        viewBox="0 0 200 160"
        className="w-full h-full select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 1. 환상적인 무용 무대 스포트라이트 (Ballet Stage Spotlight) */}
        <circle cx="104" cy="84" r="66" fill="#FDF2F8" />
        <circle cx="104" cy="84" r="50" fill="#FCE7F3" opacity="0.65" />
        {/* 무대 바닥 반사광 타원 */}
        <ellipse cx="104" cy="138" rx="62" ry="7" fill="#FBCFE8" opacity="0.45" />
        <ellipse cx="104" cy="138" rx="42" ry="4" fill="#F472B6" opacity="0.3" />

        {/* 2. 발레리나 우아한 올림머리(Bun Hair) & 핑크 티아라 (글자 2획 상단 왼쪽) */}
        {/* 풍성한 번 헤어 */}
        <circle cx="78" cy="27" r="7.5" fill="#78350F" />
        {/* 핑크 발레 티아라 & 골드 큐빅 장식 */}
        <ellipse cx="80" cy="30" rx="6" ry="2" fill="#F472B6" />
        <circle cx="78" cy="27" r="1.5" fill="#FDE047" />

        {/* 발레리나 예쁜 얼굴 윤곽 */}
        <ellipse cx="83" cy="38" rx="9" ry="10" fill="#FFE4E6" stroke="#FDA4AF" strokeWidth="1.2" />
        {/* 밤색 앞머리 & 옆머리 */}
        <path d="M 76 33 C 80 30 88 32 90 37 C 88 38 84 36 78 37 Z" fill="#78350F" />
        {/* 감미롭게 눈을 감고 미소 짓는 표정 */}
        <path d="M 79 38 Q 82 41 84 38" stroke="#881337" strokeWidth="1.2" strokeLinecap="round" fill="none" />
        <line x1="84" y1="38" x2="86" y2="36" stroke="#881337" strokeWidth="1" strokeLinecap="round" />
        <path d="M 80 43 Q 83 45 85 43" stroke="#F43F5E" strokeWidth="1.2" strokeLinecap="round" fill="none" />
        {/* 발그레한 핑크 볼터치 */}
        <ellipse cx="78" cy="41" rx="2.5" ry="1.5" fill="#FDA4AF" opacity="0.85" />

        {/* 가녀린 목선 */}
        <path d="M 82 47 L 82 56 L 87 56 L 87 47 Z" fill="#FFE4E6" />

        {/* 3. 글자 'む' 1획: 우아하게 활짝 펼친 양팔 (Port de bras) */}
        {/* 왼쪽 팔 (위로 부드럽게 곡선을 그리며 들린 팔과 손끝) */}
        <path
          d="M 82 54 C 70 52 56 50 48 46"
          stroke="#FFE4E6"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
        <path
          d="M 48 46 C 44 44 42 42 40 43 C 41 45 44 47 46 48"
          fill="#FFE4E6"
          stroke="#FDA4AF"
          strokeWidth="0.8"
        />
        {/* 왼쪽 손목 핑크 리본 팔찌 */}
        <line x1="46" y1="44" x2="48" y2="48" stroke="#F472B6" strokeWidth="1.6" strokeLinecap="round" />

        {/* 오른쪽 팔 (시원하게 사선으로 뻗은 팔과 섬세한 손끝) */}
        <path
          d="M 86 54 C 100 52 116 53 128 55"
          stroke="#FFE4E6"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
        <path
          d="M 128 55 C 132 56 135 55 137 57"
          stroke="#FDA4AF"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
        <path d="M 78 55 Q 85 58 92 55" stroke="#FDA4AF" strokeWidth="1" fill="none" />

        {/* 4. 코르셋 레오타드 & 화사하고 풍성한 3단 레이스 튀튀 (Tutu 스커트) */}
        {/* 슬림한 핑크 코르셋 상의 (Leotard) */}
        <path
          d="M 80 56 L 80 72 C 80 74 90 74 90 72 L 90 56 Z"
          fill="#F472B6"
          stroke="#DB2777"
          strokeWidth="1.1"
        />
        <ellipse cx="85" cy="57" rx="4" ry="2" fill="#FDF2F8" />

        {/* 3단 튀튀 스커트 - 좌우로 풍성하게 퍼져 글자 밖으로 100% 돋보임! */}
        {/* 1단 하부 쉬폰 프릴 (너비 84px) */}
        <path
          d="M 52 84 C 70 78 108 78 134 84 C 140 90 136 97 124 98 C 98 95 80 95 56 98 C 46 94 46 88 52 84 Z"
          fill="#FFF1F2"
          stroke="#FDA4AF"
          strokeWidth="1.2"
          strokeDasharray="4 2"
        />
        {/* 2단 중간 레이스 튀튀 (너비 74px) */}
        <path
          d="M 58 79 C 72 73 104 73 126 79 C 134 84 130 91 120 92 C 100 89 80 89 62 92 C 54 90 52 82 58 79 Z"
          fill="#FCE7F3"
          stroke="#F472B6"
          strokeWidth="1.3"
        />
        {/* 3단 상단 메인 튀튀 (너비 60px) */}
        <path
          d="M 66 74 C 76 68 96 68 116 74 C 122 78 118 84 112 85 C 96 82 82 82 66 85 C 60 83 60 76 66 74 Z"
          fill="#F472B6"
          stroke="#E11D48"
          strokeWidth="1.3"
        />
        {/* 튀튀 허리 벨트 & 골드 버클 장식 */}
        <polygon points="85,73 82,70 88,70" fill="#BE185D" />
        <circle cx="85" cy="73" r="1.8" fill="#FDE047" />

        {/* 5. 글자 'む' 2획 하단 루프: 우아하게 무릎을 굽힌 앞다리 (Attitude) & 핑크 토슈즈 */}
        {/* 다리 타이즈 (화이트 & 핑크 림) */}
        <path
          d="M 84 88 C 76 96 72 104 72 108 C 72 114 78 116 86 114 C 92 112 94 106 94 98"
          stroke="#FFFFFF"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 84 88 C 76 96 72 104 72 108 C 72 114 78 116 86 114 C 92 112 94 106 94 98"
          stroke="#FDA4AF"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* 앞발 핑크 토슈즈 (Pointe Shoe) */}
        <ellipse cx="86" cy="114" rx="5" ry="3.2" fill="#F472B6" stroke="#E11D48" strokeWidth="1" />
        {/* 발목 X자 새틴 리본끈 */}
        <line x1="80" y1="109" x2="86" y2="114" stroke="#DB2777" strokeWidth="1.2" />
        <line x1="86" y1="109" x2="80" y2="114" stroke="#DB2777" strokeWidth="1.2" />

        {/* 6. 글자 'む' 2획 하단 바닥 ~ 우상향 곡선: 공중으로 솟구친 뒷다리 (Grand Jeté 도약) */}
        <path
          d="M 88 88 C 104 100 120 114 136 102 C 142 98 146 88 148 78"
          stroke="#FFFFFF"
          strokeWidth="5.5"
          strokeLinecap="round"
        />
        <path
          d="M 88 88 C 104 100 120 114 136 102 C 142 98 146 88 148 78"
          stroke="#FDA4AF"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* 뒷발 발끝 포인(Pointe) 핑크 토슈즈 */}
        <path d="M 145 80 L 150 72 L 153 75 L 148 83 Z" fill="#F472B6" stroke="#E11D48" strokeWidth="1" />
        {/* 뒷발목 X자 리본끈 */}
        <line x1="144" y1="83" x2="149" y2="77" stroke="#DB2777" strokeWidth="1.2" />
        <line x1="148" y1="83" x2="143" y2="77" stroke="#DB2777" strokeWidth="1.2" />

        {/* 7. 글자 'む' 3획 우상단 점: 공중에 흩날리는 토슈즈 실크 리본 (Fluttering Ribbon) */}
        <path
          d="M 148 74 C 155 68 152 56 142 54 C 136 52 138 46 146 48"
          stroke="#F472B6"
          strokeWidth="3.2"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 148 74 C 155 68 152 56 142 54"
          stroke="#FDA4AF"
          strokeWidth="1.3"
          strokeLinecap="round"
          fill="none"
        />
        <polygon points="146,48 149,44 144,45" fill="#DB2777" />

        {/* 8. 공중에 흩날리는 벚꽃 꽃잎들과 황금빛 멜로디 음표 */}
        {/* 벚꽃 꽃잎들 */}
        <path d="M 158 50 C 162 46 166 50 162 54 C 158 54 156 52 158 50 Z" fill="#FB7185" />
        <path d="M 64 42 C 67 38 71 41 68 45 C 65 45 63 43 64 42 Z" fill="#FDA4AF" />
        <path d="M 128 122 C 131 119 135 122 132 125 C 129 125 127 124 128 122 Z" fill="#FDA4AF" />

        {/* 황금빛 음표 & 스파클 별빛 */}
        <path d="M 163 93 L 163 83 L 169 81 L 169 85 L 165 86 L 165 93 Z" fill="#F59E0B" />
        <circle cx="161" cy="93" r="2.2" fill="#F59E0B" />
        <path d="M 52 108 L 53.5 104 L 55 108 L 59 109.5 L 55 111 L 53.5 115 L 52 111 L 48 109.5 Z" fill="#FBBF24" />
        <circle cx="154" cy="38" r="1.5" fill="#FBBF24" />

        {/* 글자 'む' 오버레이 */}
        <MnemonicCharOverlay char="む" fontFamily={fontFamily} x="108" y="118" />
      </svg>
    );
  }

  if (char === 'め') {
    // め: 메기 (동글넓적한 머리, 좌우로 낭창낭창 뻗은 시그니처 메기 수염, 활짝 웃는 입과 물살을 가르는 황금빛 꼬리지느러미!)
    // ⚠️ ぬ(누에: 꼬리 매듭 있음)와 완벽히 대비되는 매듭 없이 시원하게 빠지는 꼬리지느러미(め) 강조!
    return (
      <svg
        viewBox="0 0 200 160"
        className="w-full h-full select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 1. 배경: 잔잔한 강물 수중 환경 & 강바닥 조약돌 */}
        {/* 잔잔한 수중 물결 흐름선 */}
        <path
          d="M 28 34 C 52 30 78 36 102 32 C 126 28 152 34 174 30"
          stroke="#BAE6FD"
          strokeWidth="1.6"
          strokeDasharray="8 6"
          strokeLinecap="round"
        />
        <path
          d="M 40 44 C 64 40 90 46 114 42 C 138 38 162 44 182 40"
          stroke="#E0F2FE"
          strokeWidth="1.4"
          strokeDasharray="6 6"
          strokeLinecap="round"
        />

        {/* 강바닥 동글동글 조약돌 (메기는 강바닥을 누비는 저서성 민물고기!) */}
        <ellipse cx="36" cy="144" rx="14" ry="7" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1.2" />
        <ellipse cx="86" cy="148" rx="18" ry="6" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="1.2" />
        <ellipse cx="168" cy="145" rx="15" ry="6.5" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1.2" />

        {/* 좌측 싱그러운 강 수초 줄기 & 잎사귀 */}
        <g id="catfish-seaweed">
          <path
            d="M 18 150 C 10 126 26 104 18 84 C 26 100 18 126 24 150 Z"
            fill="#BBF7D0"
            stroke="#16A34A"
            strokeWidth="1.2"
          />
          <path
            d="M 28 150 C 36 132 28 116 38 102 C 30 118 36 134 32 150 Z"
            fill="#DCFCE7"
            stroke="#22C55E"
            strokeWidth="1"
          />
        </g>

        {/* 2. 메기 본체 실루엣 (둥글넓적한 통통한 체형) */}
        {/* 등지느러미 (머리 위쪽에 쫑긋 솟은 귀여운 지느러미) */}
        <path
          d="M 104 46 C 110 32 124 30 130 42 C 122 44 116 46 112 47 Z"
          fill="#FDE047"
          stroke="#CA8A04"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path d="M 116 36 L 118 44" stroke="#EAB308" strokeWidth="1" strokeLinecap="round" />

        {/* 좌측 가슴지느러미 (Pectoral Fin) */}
        <path
          d="M 54 94 C 36 98 30 114 38 122 C 46 120 52 110 56 102 Z"
          fill="#FEF08A"
          stroke="#CA8A04"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <path d="M 40 114 C 46 110 52 106 55 102" stroke="#EAB308" strokeWidth="1" strokeLinecap="round" />

        {/* 우측 가슴지느러미 (Pectoral Fin) */}
        <path
          d="M 144 92 C 162 94 168 106 162 116 C 154 114 146 106 142 98 Z"
          fill="#FEF08A"
          stroke="#CA8A04"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <path d="M 158 108 C 152 104 146 100 143 96" stroke="#EAB308" strokeWidth="1" strokeLinecap="round" />

        {/* 메기 토실토실한 물고기 몸체 (슬레이트 블루 바디) */}
        <path
          d="M 68 58
             C 88 44 126 44 146 58
             C 166 74 168 104 152 122
             C 136 138 92 140 68 126
             C 46 112 46 76 68 58 Z"
          fill="#94A3B8"
          stroke="#334155"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />

        {/* 밝고 부드러운 메기 배 (Cream Belly) */}
        <path
          d="M 72 82
             C 90 70 124 70 140 82
             C 150 96 142 120 126 128
             C 106 136 84 134 72 122
             C 62 108 62 92 72 82 Z"
          fill="#FEFCE8"
          stroke="#FEF08A"
          strokeWidth="1.5"
        />

        {/* 메기 등 점박이 무늬 (Cute Spots) */}
        <circle cx="98" cy="50" r="2.8" fill="#475569" opacity="0.5" />
        <circle cx="118" cy="48" r="2.2" fill="#475569" opacity="0.5" />
        <circle cx="134" cy="62" r="2" fill="#475569" opacity="0.5" />

        {/* 3. 황금빛 메기 꼬리지느러미 (글자 め 오른쪽 아래 삐침 끝과 완벽 일체화!) */}
        <g id="catfish-tail-fin">
          <path
            d="M 144 122
               C 158 112 178 114 188 124
               C 178 132 178 134 188 142
               C 174 148 156 142 142 128 Z"
            fill="#FDE047"
            stroke="#CA8A04"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          {/* 지느러미 결 라인 3가닥 (Fin Rays) */}
          <path d="M 148 124 C 160 120 174 122 184 125" stroke="#EAB308" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M 148 126 C 162 128 174 132 184 133" stroke="#EAB308" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M 146 127 C 156 136 168 140 182 141" stroke="#EAB308" strokeWidth="1.2" strokeLinecap="round" />
        </g>

        {/* 4. 메기 얼굴 표정 (똘망똘망한 눈, 뻐끔거리는 입, 복숭아 볼터치) */}
        {/* 좌측 눈망울 */}
        <circle cx="72" cy="58" r="6" fill="#FFFFFF" stroke="#334155" strokeWidth="1.5" />
        <circle cx="73" cy="58" r="3.8" fill="#0F172A" />
        <circle cx="74.5" cy="56.5" r="1.4" fill="#FFFFFF" />
        <circle cx="72" cy="60" r="0.7" fill="#FFFFFF" />
        <path d="M 66 50 Q 72 47 78 51" stroke="#334155" strokeWidth="1.4" strokeLinecap="round" />

        {/* 우측 눈망울 */}
        <circle cx="132" cy="56" r="6" fill="#FFFFFF" stroke="#334155" strokeWidth="1.5" />
        <circle cx="131" cy="56" r="3.8" fill="#0F172A" />
        <circle cx="132.5" cy="54.5" r="1.4" fill="#FFFFFF" />
        <circle cx="130" cy="58" r="0.7" fill="#FFFFFF" />
        <path d="M 126 49 Q 132 46 138 50" stroke="#334155" strokeWidth="1.4" strokeLinecap="round" />

        {/* 사랑스러운 복숭아빛 볼터치 */}
        <ellipse cx="64" cy="68" rx="5" ry="3.2" fill="#FDA4AF" opacity="0.85" />
        <ellipse cx="140" cy="66" rx="5" ry="3.2" fill="#FDA4AF" opacity="0.85" />

        {/* 활짝 웃으며 뻐끔거리는 커다란 메기 입 */}
        <path
          d="M 84 74 C 92 86 114 86 122 74"
          stroke="#334155"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        {/* 입안 붉은색 & 앙증맞은 핑크 혓바닥 */}
        <path
          d="M 86 75 C 92 85 114 85 120 75 C 114 80 92 80 86 75 Z"
          fill="#F43F5E"
        />
        <ellipse cx="103" cy="79" rx="4.5" ry="2.2" fill="#FDA4AF" />

        {/* 5. 메기의 시그니처: 좌우로 낭창낭창 뻗은 4가닥 메기 수염 (Iconic Catfish Barbels) */}
        {/* 좌측 긴 윗수염 */}
        <path
          d="M 78 72 C 54 62 34 74 22 92 C 18 98 20 104 25 101"
          stroke="#1E293B"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        {/* 우측 긴 윗수염 */}
        <path
          d="M 126 72 C 148 62 168 74 180 92 C 184 98 182 104 177 101"
          stroke="#1E293B"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        {/* 턱 아래 귀여운 작은 보조 수염 2가닥 */}
        <path
          d="M 88 84 C 80 94 76 104 80 114"
          stroke="#475569"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M 118 84 C 126 94 130 104 126 114"
          stroke="#475569"
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        {/* 6. 메기 입에서 퐁퐁 솟아오르는 투명 물방울 */}
        <g id="catfish-bubbles">
          <circle cx="70" cy="38" r="4" fill="#E0F2FE" stroke="#38BDF8" strokeWidth="1.2" />
          <circle cx="71.5" cy="36.5" r="1.2" fill="#FFFFFF" />
          <circle cx="60" cy="24" r="2.6" fill="#E0F2FE" stroke="#38BDF8" strokeWidth="1" />
          <circle cx="144" cy="34" r="3.4" fill="#E0F2FE" stroke="#38BDF8" strokeWidth="1.1" />
          <circle cx="145.2" cy="32.8" r="1" fill="#FFFFFF" />
          <circle cx="154" cy="22" r="2.2" fill="#E0F2FE" stroke="#38BDF8" strokeWidth="0.9" />
          <circle cx="54" cy="14" r="1.8" fill="#38BDF8" />
        </g>

        {/* 글자 'め' 오버레이 */}
        <MnemonicCharOverlay char="め" fontFamily={fontFamily} x="108" y="118" />
      </svg>
    );
  }

  if (char === 'も') {
    // も: 모기 ("모~~" 하고 앵앵 날아와 뾰족한 침을 콕 찌르고 배가 빵빵해진 귀여운 모기!)
    // ⚠️ 1획은 모기의 세로 주둥이 침 & 우측으로 통통하게 굽어 올라간 줄무늬 배, 2획은 상단 투명 날개 쌍, 3획은 하단 날개 쌍 및 윙윙 날갯짓 바람선과 1:1 완벽 일치!
    return (
      <svg
        viewBox="0 0 200 160"
        className="w-full h-full select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* 모기 날개 투명 하늘빛 그라디언트 */}
          <linearGradient id="moWingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#E0F2FE" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#BAE6FD" stopOpacity="0.85" />
          </linearGradient>
          {/* 피를 꿀꺽 마셔 붉게 차오른 배 그라디언트 */}
          <linearGradient id="moBellyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="50%" stopColor="#BE123C" />
            <stop offset="100%" stopColor="#F43F5E" />
          </linearGradient>
        </defs>

        {/* 1. 배경 은은한 하늘빛 원 & 앵앵 비행 궤적 (Flight Trail) */}
        <circle cx="100" cy="80" r="68" fill="#F0F9FF" />
        <circle cx="100" cy="80" r="50" fill="#E0F2FE" opacity="0.6" />

        {/* 모기가 빙글빙글 날아온 비행 궤적 점선 루프 */}
        <path
          d="M 18 42 C 10 24 32 16 42 28 C 48 38 60 34 72 26 C 78 22 84 25 88 26"
          stroke="#94A3B8"
          strokeWidth="1.3"
          strokeDasharray="3 4"
          strokeLinecap="round"
        />

        {/* "모~♪" 앵앵거리는 소리 앙증맞은 미니 음표 */}
        <path
          d="M 32 24 L 32 17 C 32 15 37 14 39 16"
          stroke="#0284C7"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <ellipse cx="30" cy="24" rx="2.5" ry="1.8" fill="#0284C7" />

        {/* 2. 글자 'も' 3획: 모기 하단 날개 쌍 (Lower Wings) & 날갯짓 바람선 (y=74~84) */}
        {/* 좌측 하단 날개 */}
        <path
          d="M 94 80 C 72 70 44 74 36 80 C 34 84 52 88 94 82 Z"
          fill="url(#moWingGrad)"
          stroke="#38BDF8"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path d="M 90 80 C 70 76 52 78 42 81" stroke="#0284C7" strokeWidth="0.9" strokeLinecap="round" />

        {/* 우측 하단 날개 */}
        <path
          d="M 102 80 C 124 70 152 74 160 80 C 162 84 144 88 102 82 Z"
          fill="url(#moWingGrad)"
          stroke="#38BDF8"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path d="M 106 80 C 126 76 144 78 154 81" stroke="#0284C7" strokeWidth="0.9" strokeLinecap="round" />

        {/* 하단 날갯짓 모션 라인 */}
        <path d="M 40 73 C 50 69 66 71 76 73" stroke="#7DD3FC" strokeWidth="1.2" strokeDasharray="3 3" strokeLinecap="round" />
        <path d="M 156 73 C 146 69 130 71 120 73" stroke="#7DD3FC" strokeWidth="1.2" strokeDasharray="3 3" strokeLinecap="round" />

        {/* 3. 글자 'も' 2획: 모기 메인 상단 날개 쌍 (Upper Wings, y=50~62) */}
        {/* 좌측 메인 날개 (시원하게 뻗은 넓은 날개) */}
        <path
          d="M 94 56 C 70 42 38 46 28 54 C 26 60 48 66 94 58 Z"
          fill="url(#moWingGrad)"
          stroke="#0284C7"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        {/* 좌측 날개 속 정교한 맥 2줄 */}
        <path d="M 90 56 C 68 48 48 51 34 55" stroke="#0284C7" strokeWidth="1.1" strokeLinecap="round" />
        <path d="M 86 57 C 68 55 52 60 40 63" stroke="#38BDF8" strokeWidth="0.9" strokeLinecap="round" />

        {/* 우측 메인 날개 */}
        <path
          d="M 102 56 C 126 42 158 46 168 54 C 170 60 148 66 102 58 Z"
          fill="url(#moWingGrad)"
          stroke="#0284C7"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        {/* 우측 날개 속 정교한 맥 2줄 */}
        <path d="M 106 56 C 128 48 148 51 162 55" stroke="#0284C7" strokeWidth="1.1" strokeLinecap="round" />
        <path d="M 110 57 C 128 55 144 60 156 63" stroke="#38BDF8" strokeWidth="0.9" strokeLinecap="round" />

        {/* 상단 윙윙~ 날갯짓 바람 잔상 */}
        <path d="M 32 46 C 44 41 62 43 76 47" stroke="#38BDF8" strokeWidth="1.3" strokeDasharray="3 3" strokeLinecap="round" />
        <path d="M 164 46 C 152 41 134 43 120 47" stroke="#38BDF8" strokeWidth="1.3" strokeDasharray="3 3" strokeLinecap="round" />

        {/* 4. 글자 'も' 1획: 세로 몸통 + 아래로 뻗은 침(Stinger) + 우측으로 굽어 솟은 줄무늬 배(Abdomen) */}
        {/* 피부 표면 라인 (피부에 콕 내려앉은 연출) */}
        <path
          d="M 64 121 C 82 117 114 118 138 123"
          stroke="#FDBA74"
          strokeWidth="2.2"
          strokeLinecap="round"
        />

        {/* 모기 가슴 몸통 (Thorax) */}
        <ellipse cx="98" cy="67" rx="8" ry="13" fill="#334155" stroke="#0F172A" strokeWidth="1.6" />
        <line x1="96" y1="58" x2="96" y2="76" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" />

        {/* 1획 세로 궤적: 모기의 길고 날렵한 빨대 침 (Stinger / Proboscis) */}
        <path
          d="M 98 78 L 96 114"
          stroke="#0F172A"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
        {/* 침 끝 날카로운 바늘 팁 */}
        <line x1="96.5" y1="110" x2="96" y2="118" stroke="#DC2626" strokeWidth="2.2" strokeLinecap="round" />

        {/* 콕 찌른 자리 앙증맞은 핏방울 하트 & 붉은 스팟 */}
        <circle cx="96" cy="118" r="3.2" fill="#F43F5E" opacity="0.85" />
        <circle cx="96" cy="118" r="1.6" fill="#BE123C" />

        {/* 따끔! 번쩍이는 노란색 별빛 스파크 (✦ Zap Sparkles) */}
        <path
          d="M 87 114 L 89 109 L 91 114 L 96 116 L 91 118 L 89 123 L 87 118 L 82 116 Z"
          fill="#F59E0B"
        />
        <path
          d="M 103 109 L 104.5 105 L 106 109 L 110 110.5 L 106 112 L 104.5 116 L 103 112 L 99 110.5 Z"
          fill="#FDE047"
        />

        {/* 1획 하단 U자 궤적: 모기의 둥글게 치켜올라간 통통한 줄무늬 배 (Abdomen) */}
        {/* 통통한 배 실루엣 */}
        <path
          d="M 98 75
             C 98 100 102 126 116 128
             C 128 130 138 114 134 94
             C 130 92 124 96 122 108
             C 118 120 110 116 106 100
             C 103 88 103 76 98 75 Z"
          fill="url(#moBellyGrad)"
          stroke="#0F172A"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />

        {/* 꿀꺽 마신 피로 빵빵하게 붉어진 배 끝 하이라이트 */}
        <path
          d="M 112 124 C 120 128 132 120 134 98 C 131 95 125 99 122 108 C 117 118 112 118 112 124 Z"
          fill="#F43F5E"
          opacity="0.85"
        />

        {/* 배 마디마디 선명한 차콜 줄무늬 (Abdomen Bands) */}
        <path d="M 100 87 C 104 88 108 89 111 87" stroke="#1E293B" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M 103 99 C 108 102 114 102 118 98" stroke="#1E293B" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M 107 111 C 112 116 121 115 126 107" stroke="#1E293B" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M 115 123 C 121 125 128 121 130 113" stroke="#1E293B" strokeWidth="1.8" strokeLinecap="round" />

        {/* 배 광택 반사광 타원 */}
        <ellipse cx="127" cy="102" rx="2" ry="4" fill="#FFFFFF" opacity="0.6" transform="rotate(25 127 102)" />

        {/* 꺾인 롱 모기 다리 2가닥 */}
        <path d="M 102 74 C 116 64 128 66 140 58" stroke="#334155" strokeWidth="1.4" strokeLinecap="round" fill="none" />
        <path d="M 94 72 C 84 66 74 70 66 65" stroke="#334155" strokeWidth="1.4" strokeLinecap="round" fill="none" />

        {/* 5. 모기 머리 & 사랑스러운 만화 표정 (Head & Face, y=24~38) */}
        {/* 둥근 머리 본체 */}
        <circle cx="98" cy="34" r="11" fill="#475569" stroke="#0F172A" strokeWidth="1.6" />

        {/* 똘망똘망한 커다란 두 눈망울 */}
        {/* 좌측 눈 */}
        <circle cx="94" cy="32" r="5.2" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.3" />
        <circle cx="94.5" cy="32" r="3.3" fill="#0F172A" />
        <circle cx="95.5" cy="30.8" r="1.2" fill="#FFFFFF" />

        {/* 우측 눈 */}
        <circle cx="103" cy="32" r="5.2" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.3" />
        <circle cx="102.5" cy="32" r="3.3" fill="#0F172A" />
        <circle cx="103.5" cy="30.8" r="1.2" fill="#FFFFFF" />

        {/* 사랑스러운 복숭아빛 볼터치 */}
        <ellipse cx="90" cy="37" rx="3.2" ry="2" fill="#FDA4AF" opacity="0.85" />
        <ellipse cx="107" cy="37" rx="3.2" ry="2" fill="#FDA4AF" opacity="0.85" />

        {/* 머리 위 귀여운 코일형 더듬이 2가닥 (Antennae) */}
        <path d="M 94 24 C 90 14 82 16 84 21" stroke="#0F172A" strokeWidth="1.6" strokeLinecap="round" fill="none" />
        <circle cx="84" cy="21" r="1.6" fill="#38BDF8" />

        <path d="M 102 24 C 106 14 114 16 112 21" stroke="#0F172A" strokeWidth="1.6" strokeLinecap="round" fill="none" />
        <circle cx="112" cy="21" r="1.6" fill="#38BDF8" />

        {/* 주변 부유 반짝이 가루 */}
        <circle cx="48" cy="28" r="1.3" fill="#FBBF24" />
        <circle cx="152" cy="32" r="1.5" fill="#38BDF8" />
        <circle cx="168" cy="88" r="1.2" fill="#F43F5E" />

        {/* 글자 'も' 오버레이 */}
        <MnemonicCharOverlay char="も" fontFamily={fontFamily} x="106" y="118" />
      </svg>
    );
  }

  return null;
}
