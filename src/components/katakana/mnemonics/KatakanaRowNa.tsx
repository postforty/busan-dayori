import React from 'react';
import { KatakanaMnemonicSvgChildProps } from './types';
import KatakanaCharOverlay from './KatakanaCharOverlay';

export default function KatakanaRowNa({ char, fontFamily }: KatakanaMnemonicSvgChildProps) {
  if (char === 'ナ') {
    // ナ: 나이프 (가로 손잡이=1획 & 상단 브래킷, 아래로 날렵하게 뻗어 베어 내리는 은빛 칼날=2획)
    return (
      <svg viewBox="0 0 200 160" className="w-full h-full select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* 가로 손잡이 본체 그라디언트 (고급스러운 텍티컬 다크 슬레이트 & 레더 질감) */}
          <linearGradient id="naHandleBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="35%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>

          {/* 메탈 볼스터 & 폼멜 캡 그라디언트 */}
          <linearGradient id="naMetalCapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F8FAFC" />
            <stop offset="40%" stopColor="#CBD5E1" />
            <stop offset="100%" stopColor="#64748B" />
          </linearGradient>

          {/* 스테인리스 스틸 칼날 메탈 그라디언트 */}
          <linearGradient id="naBladeSteelGrad" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="30%" stopColor="#F1F5F9" />
            <stop offset="70%" stopColor="#CBD5E1" />
            <stop offset="100%" stopColor="#94A3B8" />
          </linearGradient>

          {/* 칼날 날카로운 베벨 반사광 그라디언트 */}
          <linearGradient id="naBladeBevelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E0F2FE" />
            <stop offset="50%" stopColor="#BAE6FD" />
            <stop offset="100%" stopColor="#38BDF8" />
          </linearGradient>

          {/* 칼날 표면 사선 하이라이트 쉰(Sheen) */}
          <linearGradient id="naBladeSheenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* 1. 바닥 은은한 그림자 */}
        <ellipse cx="98" cy="148" rx="48" ry="5.5" fill="#E2E8F0" opacity="0.75" />

        {/* 2. 날렵한 궤적 절삭 잔상 (Slash Motion Blur Line) */}
        <path
          d="M 126 56 C 122 88 106 128 58 146"
          stroke="#BAE6FD"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeDasharray="4 3"
          opacity="0.65"
        />

        {/* 3. [★ 2획 매칭] 손잡이 아래로 날렵하게 뻗어 내려가는 은빛 곡선 칼날 (Curved Steel Blade) */}
        <g id="knife-curved-blade">
          {/* 칼날 본체 (글자 2획 궤적을 풍성하고 예리하게 감싸는 스테인리스 스틸) */}
          <path
            d="M 96 68 
               C 96 88 88 116 66 142 
               C 74 142 88 138 98 126 
               C 116 106 124 86 124 68 
               Z"
            fill="url(#naBladeSteelGrad)"
            stroke="#475569"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />

          {/* 칼날 중앙 융기 능선 (Bevel Ridge Line) */}
          <path
            d="M 108 68 C 108 88 98 118 66 142"
            stroke="#64748B"
            strokeWidth="1.4"
            strokeLinecap="round"
          />

          {/* 칼날 절삭면(Edge) 차가운 푸른빛 반사광 */}
          <path
            d="M 97 74 C 97 92 88 116 68 140"
            stroke="url(#naBladeBevelGrad)"
            strokeWidth="2.2"
            strokeLinecap="round"
          />

          {/* 칼날 표면 날렵한 혈조(Fuller Groove) */}
          <path
            d="M 116 70 C 116 84 108 102 96 114"
            stroke="#94A3B8"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.8"
          />

          {/* 메탈릭 표면 빛 반사 쉰 */}
          <polygon points="106,72 114,72 96,112 90,112" fill="url(#naBladeSheenGrad)" opacity="0.35" />

          {/* 칼날 뿌리 초일(Choil) 가공 홈 */}
          <circle cx="96" cy="68" r="2.2" fill="#334155" />
        </g>

        {/* 4. [★ 1획 & 빨간 박스 매칭] 단단하게 쥐는 프리미엄 가로 손잡이 (Tactical Grip Handle) */}
        <g id="knife-horizontal-handle">
          {/* [2획 상단 솟은 머리 매칭] 손잡이 중앙 메탈 체결 브래킷 & 폼멜 링 */}
          <path
            d="M 104 56 L 107 38 C 108 33 116 33 117 38 L 120 56 Z"
            fill="url(#naMetalCapGrad)"
            stroke="#334155"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          {/* 상단 락킹 핀 볼트 */}
          <circle cx="112" cy="42" r="3.2" fill="#1E293B" stroke="#94A3B8" strokeWidth="1.2" />
          <circle cx="112" cy="41.5" r="1.2" fill="#F8FAFC" />
          {/* 엄지 지지대 미끄럼 방지 그루브 (Jimping) */}
          <line x1="107" y1="46" x2="117" y2="46" stroke="#64748B" strokeWidth="1" />
          <line x1="106" y1="50" x2="118" y2="50" stroke="#64748B" strokeWidth="1" />

          {/* 가로 손잡이 메인 바디 (1획 가로선 매칭) */}
          <rect
            x="50"
            y="54"
            width="112"
            height="16"
            rx="8"
            fill="url(#naHandleBodyGrad)"
            stroke="#0F172A"
            strokeWidth="2"
          />

          {/* 손잡이 상단 하이라이트 림 */}
          <line x1="56" y1="56.5" x2="156" y2="56.5" stroke="#64748B" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />

          {/* 인체공학적 그립 홈 & 가죽 랩핑 밴드 */}
          <line x1="68" y1="55" x2="68" y2="69" stroke="#475569" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="82" y1="55" x2="82" y2="69" stroke="#475569" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="130" y1="55" x2="130" y2="69" stroke="#475569" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="144" y1="55" x2="144" y2="69" stroke="#475569" strokeWidth="1.6" strokeLinecap="round" />

          {/* 황동 골드 리벳 징 (손잡이 고정 볼트) */}
          <circle cx="75" cy="62" r="2.8" fill="#F59E0B" stroke="#B45309" strokeWidth="0.8" />
          <circle cx="75" cy="61.5" r="1" fill="#FEF08A" />
          <circle cx="137" cy="62" r="2.8" fill="#F59E0B" stroke="#B45309" strokeWidth="0.8" />
          <circle cx="137" cy="61.5" r="1" fill="#FEF08A" />

          {/* 좌측 메탈 엔드 캡 & 랜야드 홀 (Lanyard Hole) */}
          <rect x="48" y="54" width="10" height="16" rx="5" fill="url(#naMetalCapGrad)" stroke="#334155" strokeWidth="1.5" />
          <circle cx="53" cy="62" r="2.4" fill="#0F172A" stroke="#64748B" strokeWidth="1" />

          {/* 우측 메탈 팁 볼스터 */}
          <rect x="154" y="54" width="10" height="16" rx="5" fill="url(#naMetalCapGrad)" stroke="#334155" strokeWidth="1.5" />
          <circle cx="159" cy="62" r="1.5" fill="#64748B" />

          {/* 칼날-손잡이 하단 결합 칼라(Collar Guard) */}
          <rect x="100" y="66" width="20" height="4" rx="2" fill="url(#naMetalCapGrad)" stroke="#334155" strokeWidth="1" />
        </g>

        {/* 5. 날카로운 칼끝 및 하이라이트 스파클 (✨) */}
        {/* 칼끝 섬광 */}
        <path
          d="M 64 142 L 66 133 L 68 142 L 77 144 L 68 146 L 66 155 L 64 146 L 55 144 Z"
          fill="#38BDF8"
        />
        <circle cx="66" cy="144" r="1.6" fill="#FFFFFF" />

        {/* 우측 볼스터 반짝임 */}
        <path
          d="M 160 50 L 161.5 44 L 163 50 L 169 51.5 L 163 53 L 161.5 59 L 160 53 L 154 51.5 Z"
          fill="#38BDF8"
          opacity="0.85"
        />
        <circle cx="161.5" cy="51.5" r="1" fill="#FFFFFF" />

        {/* 6. 글자 'ナ' 오버레이 (손잡이와 칼날 위에 완벽 안착) */}
        <KatakanaCharOverlay char="ナ" fontFamily={fontFamily} x="106" y="118" />
      </svg>
    );
  }

  if (char === 'ニ') {
    // ニ: 니모 (위로 힘차게 헤엄쳐 올라가는 주황색 니모의 머리와 배에 새겨진 2개의 하얀 줄무늬)
    return (
      <svg viewBox="0 0 200 160" className="w-full h-full select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* 청량하고 맑은 바닷속 그라디언트 */}
          <linearGradient id="niOceanBgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#E0F2FE" />
            <stop offset="50%" stopColor="#F0FDFA" />
            <stop offset="100%" stopColor="#EFF6FF" />
          </linearGradient>

          {/* 니모 몸통 볼륨감 있는 오렌지 그라디언트 */}
          <linearGradient id="niNemoBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFA066" />
            <stop offset="35%" stopColor="#F97316" />
            <stop offset="85%" stopColor="#EA580C" />
            <stop offset="100%" stopColor="#C2410C" />
          </linearGradient>

          {/* 지느러미 투명한 오렌지 그라디언트 */}
          <linearGradient id="niNemoFinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDBA74" />
            <stop offset="100%" stopColor="#EA580C" />
          </linearGradient>

          {/* 흰동가리 특유의 입체적인 화이트 스트라이프 */}
          <linearGradient id="niStripeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="70%" stopColor="#F8FAFC" />
            <stop offset="100%" stopColor="#E2E8F0" />
          </linearGradient>

          {/* 투명한 물방울 하이라이트 */}
          <radialGradient id="niBubbleGrad" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="40%" stopColor="#BAE6FD" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.3" />
          </radialGradient>
        </defs>

        {/* 1. 바닷속 라운드 프레임 배경 */}
        <rect x="24" y="14" width="152" height="132" rx="18" fill="url(#niOceanBgGrad)" stroke="#BAE6FD" strokeWidth="1.5" />

        {/* 바닥의 부드러운 산호/말미잘 촉수 (니모의 서식지 분위기) */}
        <path d="M 28 146 Q 32 130 42 128 Q 50 132 54 146 Z" fill="#FDA4AF" opacity="0.55" />
        <path d="M 44 146 Q 52 124 64 126 Q 74 132 72 146 Z" fill="#FECDD3" opacity="0.65" />
        <path d="M 148 146 Q 154 126 164 128 Q 172 134 172 146 Z" fill="#FECDD3" opacity="0.65" />
        <path d="M 134 146 Q 140 130 148 132 Q 152 140 154 146 Z" fill="#FDA4AF" opacity="0.55" />

        {/* 2. 뽀글뽀글 상승 버블 🫧 (위로 헤엄치는 생동감) */}
        {/* 좌측 버블군 */}
        <circle cx="44" cy="46" r="4.5" fill="url(#niBubbleGrad)" stroke="#38BDF8" strokeWidth="0.8" />
        <circle cx="42.5" cy="44.5" r="1.2" fill="#FFFFFF" />
        <circle cx="36" cy="76" r="3" fill="url(#niBubbleGrad)" stroke="#38BDF8" strokeWidth="0.6" />
        <circle cx="50" cy="98" r="2.2" fill="url(#niBubbleGrad)" stroke="#38BDF8" strokeWidth="0.5" />
        <circle cx="38" cy="28" r="2.5" fill="url(#niBubbleGrad)" stroke="#38BDF8" strokeWidth="0.5" />

        {/* 우측 버블군 */}
        <circle cx="162" cy="40" r="4.2" fill="url(#niBubbleGrad)" stroke="#38BDF8" strokeWidth="0.8" />
        <circle cx="160.5" cy="38.5" r="1.2" fill="#FFFFFF" />
        <circle cx="168" cy="70" r="2.8" fill="url(#niBubbleGrad)" stroke="#38BDF8" strokeWidth="0.6" />
        <circle cx="158" cy="92" r="3.2" fill="url(#niBubbleGrad)" stroke="#38BDF8" strokeWidth="0.6" />

        {/* 수중 상승 물살선 (다이내믹한 궤적) */}
        <path d="M 52 114 Q 46 84 56 60" stroke="#7DD3FC" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 4" opacity="0.5" />
        <path d="M 154 114 Q 160 84 150 60" stroke="#7DD3FC" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 4" opacity="0.5" />

        {/* 3. 꼬리지느러미 (하단에서 물살을 차며 위로 솟구침) */}
        <path
          d="M 94 122 C 84 134 76 142 82 147 C 92 150 106 140 106 134 C 106 140 120 150 130 147 C 136 142 128 134 118 122 Z"
          fill="url(#niNemoFinGrad)"
          stroke="#EA580C"
          strokeWidth="1.5"
        />
        {/* 꼬리지느러미 끝 검은 엣지 라인 & 화이트 팁 */}
        <path d="M 82 147 Q 106 138 130 147" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
        <path d="M 84 148 Q 106 140 128 148" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" opacity="0.8" />
        {/* 꼬리 결 라인 */}
        <line x1="94" y1="126" x2="90" y2="144" stroke="#C2410C" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
        <line x1="106" y1="124" x2="106" y2="135" stroke="#C2410C" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
        <line x1="118" y1="126" x2="122" y2="144" stroke="#C2410C" strokeWidth="1" strokeLinecap="round" opacity="0.5" />

        {/* 4. 좌우 가슴지느러미 (양옆으로 활짝 펼친 헤엄 포즈) */}
        {/* 좌측 가슴지느러미 */}
        <path
          d="M 72 74 C 52 70 44 82 54 94 C 64 100 74 94 76 86 Z"
          fill="url(#niNemoFinGrad)"
          stroke="#EA580C"
          strokeWidth="1.2"
        />
        <path d="M 46 76 C 42 84 50 93 56 95" stroke="#0F172A" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M 48 76 C 44 84 52 93 58 95" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" />

        {/* 우측 가슴지느러미 */}
        <path
          d="M 140 74 C 160 70 168 82 158 94 C 148 100 138 94 136 86 Z"
          fill="url(#niNemoFinGrad)"
          stroke="#EA580C"
          strokeWidth="1.2"
        />
        <path d="M 166 76 C 170 84 162 93 156 95" stroke="#0F172A" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M 164 76 C 168 84 160 93 154 95" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" />

        {/* 5. 니모 몸통 본체 (위로 헤엄치는 유선형 오렌지 바디) */}
        <path
          d="M 106 25
             C 86 26 74 44 72 66
             C 70 80 62 92 62 104
             C 62 116 80 124 94 124
             L 118 124
             C 132 124 150 116 150 104
             C 150 92 142 80 140 66
             C 138 44 126 26 106 25 Z"
          fill="url(#niNemoBodyGrad)"
          stroke="#EA580C"
          strokeWidth="2"
        />

        {/* 꼬리 앞 미니 3번째 띠 */}
        <rect x="94" y="117" width="24" height="4.5" rx="2.2" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1" />

        {/* 6. ★ [글자 ニ 매칭] 흰동가리 특유의 2대 화이트 스트라이프! ★ */}

        {/* [1획 매칭] 니모의 머리 뒤쪽 1번째 줄무늬 (상단 짧은 가로선) */}
        <g id="nemo-stripe-top">
          <rect
            x="72"
            y="56"
            width="68"
            height="13.5"
            rx="6.5"
            fill="url(#niStripeGrad)"
            stroke="#0F172A"
            strokeWidth="1.8"
          />
          {/* 스트라이프 상단 은은한 하이라이트 광택 */}
          <line x1="77" y1="58.5" x2="135" y2="58.5" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.9" />
        </g>

        {/* [2획 매칭] 니모의 배/몸통 중앙 2번째 줄무늬 (하단 긴 가로선) */}
        <g id="nemo-stripe-bottom">
          <rect
            x="58"
            y="97"
            width="96"
            height="15.5"
            rx="7.5"
            fill="url(#niStripeGrad)"
            stroke="#0F172A"
            strokeWidth="1.8"
          />
          {/* 스트라이프 상단 은은한 하이라이트 광택 */}
          <line x1="64" y1="99.5" x2="148" y2="99.5" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.9" />
        </g>

        {/* 7. 깜찍한 니모 얼굴 표정 (상단 이마/얼굴) */}
        {/* 앙증맞은 입 */}
        <path d="M 103 26 Q 106 23 109 26" stroke="#9A3412" strokeWidth="2" strokeLinecap="round" />

        {/* 왼쪽 눈 */}
        <circle cx="89" cy="38" r="5.5" fill="#FFFFFF" stroke="#C2410C" strokeWidth="1.2" />
        <circle cx="89.5" cy="37.5" r="3.4" fill="#0F172A" />
        <circle cx="88.2" cy="36.2" r="1.3" fill="#FFFFFF" />

        {/* 오른쪽 눈 */}
        <circle cx="123" cy="38" r="5.5" fill="#FFFFFF" stroke="#C2410C" strokeWidth="1.2" />
        <circle cx="122.5" cy="37.5" r="3.4" fill="#0F172A" />
        <circle cx="121.2" cy="36.2" r="1.3" fill="#FFFFFF" />

        {/* 사랑스러운 볼터치 */}
        <ellipse cx="80" cy="46" rx="4" ry="2.5" fill="#F43F5E" opacity="0.4" />
        <ellipse cx="132" cy="46" rx="4" ry="2.5" fill="#F43F5E" opacity="0.4" />

        {/* 8. 글자 'ニ' 오버레이 (두 줄무늬 위에 정확히 안착) */}
        <KatakanaCharOverlay char="ニ" fontFamily={fontFamily} x="106" y="118" />
      </svg>
    );
  }

  if (char === 'ヌ') {
    // ヌ: 누들 (1획 가로선 = 젓가락 한 짝, 2획 대각선 = 반대쪽 젓가락 한 짝, 꺾여 내려오는 선 = 꼬불꼬불한 라면 누들 면발!)
    return (
      <svg viewBox="0 0 200 160" className="w-full h-full select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* 나무 젓가락 본체 원목 그라디언트 */}
          <linearGradient id="nuChopstickBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#D97706" />
            <stop offset="40%" stopColor="#B45309" />
            <stop offset="100%" stopColor="#78350F" />
          </linearGradient>

          {/* 젓가락 붉은 옻칠 밴드 그라디언트 */}
          <linearGradient id="nuChopstickBandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EF4444" />
            <stop offset="50%" stopColor="#DC2626" />
            <stop offset="100%" stopColor="#991B1B" />
          </linearGradient>

          {/* 꼬불꼬불 누들 면발 황금빛 입체 그라디언트 */}
          <linearGradient id="nuCurlyNoodleGrad" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="25%" stopColor="#F59E0B" />
            <stop offset="75%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>
        </defs>

        {/* 1. 모락모락 피어오르는 부드러운 김 (Steam) */}
        <path d="M 88 36 C 84 26 94 22 88 14" stroke="#93C5FD" strokeWidth="1.8" strokeLinecap="round" opacity="0.6" fill="none" />
        <path d="M 112 34 C 108 24 118 20 114 12" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" opacity="0.8" fill="none" />
        <path d="M 134 38 C 130 28 140 24 136 16" stroke="#93C5FD" strokeWidth="1.6" strokeLinecap="round" opacity="0.5" fill="none" />

        {/* 2. [★ 2획 매칭: 반대쪽 젓가락 한 짝] 대각선으로 비스듬히 뻗은 두 번째 젓가락 */}
        <g id="chopstick-opposite-stroke2">
          {/* 젓가락 본체 (테이퍼드 원목) */}
          <polygon
            points="91,79 152,133 147,139 87,83"
            fill="url(#nuChopstickBodyGrad)"
            stroke="#78350F"
            strokeWidth="0.8"
          />
          {/* 젓가락 윗면 골드 하이라이트 라인 */}
          <line x1="90" y1="80.5" x2="151" y2="134.5" stroke="#FDE68A" strokeWidth="0.9" strokeLinecap="round" opacity="0.9" />

          {/* 손잡이 쪽 붉은 옻칠 밴드 장식 (가로 젓가락과 일치하는 짝꿍 디자인) */}
          <polygon
            points="136,119 148,130 144,136 131,124"
            fill="url(#nuChopstickBandGrad)"
            stroke="#7F1D1D"
            strokeWidth="0.8"
          />
          <line x1="134" y1="121" x2="138" y2="125" stroke="#FDE047" strokeWidth="1.2" />
          <line x1="144" y1="130" x2="148" y2="134" stroke="#FDE047" strokeWidth="1.2" />

          {/* 젓가락 끝 골드 캡 마감 */}
          <line x1="88" y1="80" x2="90" y2="82" stroke="#FDE047" strokeWidth="1" strokeLinecap="round" />
        </g>

        {/* 3. [★ 1획 꺾임선 매칭: 라면 면가락처럼 구블구블한 누들 면발!] */}
        <g id="curly-ramen-noodles-stroke1">
          {/* (1) 서브 꼬불 면발 (안쪽에서 함께 찰랑이며 얽힌 면발) */}
          <path
            d="M 133 53 C 139 56 137 63 129 69 C 119 77 133 85 124 93 C 112 101 123 109 113 117 C 101 124 111 130 97 134 C 84 137 73 133 60 134"
            stroke="#92400E"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <path
            d="M 133 53 C 139 56 137 63 129 69 C 119 77 133 85 124 93 C 112 101 123 109 113 117 C 101 124 111 130 97 134 C 84 137 73 133 60 134"
            stroke="url(#nuCurlyNoodleGrad)"
            strokeWidth="4.5"
            strokeLinecap="round"
          />
          <path
            d="M 132 54 C 138 57 136 63 128 69 C 118 77 132 85 123 93 C 111 101 122 109 112 117 C 100 124 110 130 96 134 C 83 137 72 133 60 134"
            stroke="#FFFFFF"
            strokeWidth="1.3"
            strokeLinecap="round"
            opacity="0.8"
          />

          {/* (2) 메인 꼬불 면발 (젓가락에 걸려 구블구블 탄력 있게 흘러내리는 굵은 라면 가닥) */}
          {/* 외곽 섀도우 림 */}
          <path
            d="M 137 52 C 144 54 144 61 138 68 C 127 76 142 84 132 92 C 119 100 133 108 122 116 C 109 123 120 129 105 133 C 89 137 77 131 65 136"
            stroke="#92400E"
            strokeWidth="7.5"
            strokeLinecap="round"
          />
          {/* 황금빛 라면 면발 본체 */}
          <path
            d="M 137 52 C 144 54 144 61 138 68 C 127 76 142 84 132 92 C 119 100 133 108 122 116 C 109 123 120 129 105 133 C 89 137 77 131 65 136"
            stroke="url(#nuCurlyNoodleGrad)"
            strokeWidth="5.5"
            strokeLinecap="round"
          />
          {/* 구블구블한 곡선마다 빛나는 찰랑찰랑 윤기 하이라이트 코어 라인 */}
          <path
            d="M 136 53 C 142 55 142 61 137 67 C 126 75 141 83 131 91 C 118 99 132 107 121 115 C 108 122 119 128 104 132 C 88 136 76 130 65 135"
            stroke="#FFFFFF"
            strokeWidth="1.8"
            strokeLinecap="round"
            opacity="0.9"
          />

          {/* 면발 끝에 맺힌 영롱한 육수 방울 2개 */}
          <circle cx="65" cy="138" r="2.2" fill="#F59E0B" stroke="#B45309" strokeWidth="0.8" />
          <circle cx="64.3" cy="137.3" r="0.8" fill="#FFFFFF" />
          <circle cx="60" cy="136" r="1.6" fill="#F59E0B" stroke="#B45309" strokeWidth="0.7" />
          <circle cx="59.5" cy="135.5" r="0.6" fill="#FFFFFF" />
        </g>

        {/* 4. [★ 1획 가로선 매칭: 젓가락 한 짝] 수평으로 놓인 메인 나무 젓가락 */}
        <g id="chopstick-horizontal-stroke1">
          {/* 젓가락 본체 (단일 젓가락) */}
          <polygon
            points="60,53 168,50 168,56 60,57"
            fill="url(#nuChopstickBodyGrad)"
            stroke="#78350F"
            strokeWidth="0.8"
          />
          {/* 젓가락 윗면 골드 하이라이트 라인 */}
          <line x1="61" y1="53.8" x2="167" y2="50.8" stroke="#FDE68A" strokeWidth="0.9" strokeLinecap="round" opacity="0.9" />

          {/* 젓가락 손잡이 붉은 옻칠 밴드 장식 */}
          <polygon
            points="146,50.2 166,49.8 166,56.2 146,56.8"
            fill="url(#nuChopstickBandGrad)"
            stroke="#7F1D1D"
            strokeWidth="0.8"
          />
          <line x1="149" y1="50" x2="149" y2="57" stroke="#FDE047" strokeWidth="1.2" />
          <line x1="163" y1="49.5" x2="163" y2="56.5" stroke="#FDE047" strokeWidth="1.2" />

          {/* 젓가락 끝(집게 팁) 골드 포인트 */}
          <line x1="61" y1="53" x2="61" y2="57" stroke="#FDE047" strokeWidth="1" strokeLinecap="round" />
        </g>

        {/* 5. 맛있는 디테일 (대파 고명 & 볶은 참깨 & 반짝임 스파클) */}
        {/* 가로 젓가락과 꼬불꼬불 면발이 만나는 꺾임부에 얹힌 향긋한 초록 대파 슬라이스 */}
        <g transform="translate(136, 56) rotate(15)">
          <ellipse cx="0" cy="0" rx="4.8" ry="3.2" fill="#22C55E" stroke="#15803D" strokeWidth="1.2" />
          <ellipse cx="0" cy="0" rx="2.5" ry="1.6" fill="#86EFAC" />
        </g>

        {/* 고소한 볶은 참깨 알갱이 */}
        <ellipse cx="120" cy="94" rx="1.6" ry="2.6" transform="rotate(25 120 94)" fill="#FEF3C7" stroke="#D97706" strokeWidth="0.7" />
        <ellipse cx="106" cy="116" rx="1.6" ry="2.6" transform="rotate(-20 106 116)" fill="#FEF3C7" stroke="#D97706" strokeWidth="0.7" />

        {/* 젓가락 꺾임부 윤기 반짝임 스파클 (✨) */}
        <path d="M 140 44 L 142 38 L 144 44 L 150 46 L 144 48 L 142 54 L 140 48 L 134 46 Z" fill="#FDE047" opacity="0.9" />
        <circle cx="142" cy="46" r="1" fill="#FFFFFF" />

        {/* 6. 글자 'ヌ' 오버레이 (젓가락 두 짝 + 꼬불꼬불 면발 위에 완벽 안착) */}
        <KatakanaCharOverlay char="ヌ" fontFamily={fontFamily} x="106" y="118" />
      </svg>
    );
  }

  if (char === 'ネ') {
    // ネ: 네트 (미니멀: 테니스 네트 상공의 공, 상단 캔버스 밴드, 중앙 센터 스트랩)
    return (
      <svg viewBox="0 0 200 160" className="w-full h-full select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* 미니멀 코트 배경 그라디언트 (청량한 스카이 & 딥블루 하드코트) */}
          <linearGradient id="nePerspectiveCourtGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#BAE6FD" />
            <stop offset="40%" stopColor="#E0F2FE" />
            <stop offset="40%" stopColor="#0369A1" />
            <stop offset="70%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#075985" />
          </linearGradient>

          {/* 깔끔한 와이드 네트 그물망 패턴 */}
          <pattern id="neWideMeshPattern" width="6" height="6" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="6" y2="6" stroke="#FFFFFF" strokeWidth="0.7" opacity="0.6" />
            <line x1="6" y1="0" x2="0" y2="6" stroke="#FFFFFF" strokeWidth="0.7" opacity="0.6" />
          </pattern>

          {/* 네트 상단 캔버스 헤드밴드 그라디언트 */}
          <linearGradient id="neHeadbandGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="65%" stopColor="#F8FAFC" />
            <stop offset="100%" stopColor="#CBD5E1" />
          </linearGradient>

          {/* 중앙 센터 스트랩 캔버스 그라디언트 */}
          <linearGradient id="neCenterStrapGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E2E8F0" />
            <stop offset="25%" stopColor="#FFFFFF" />
            <stop offset="75%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#CBD5E1" />
          </linearGradient>

          {/* 미니멀 테니스공 구형 그라디언트 */}
          <radialGradient id="neTennisBallGrad" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="25%" stopColor="#FACC15" />
            <stop offset="65%" stopColor="#84CC16" />
            <stop offset="100%" stopColor="#3F6212" />
          </radialGradient>
        </defs>

        {/* 1. 심플한 코트 배경 */}
        <rect x="0" y="0" width="200" height="160" rx="14" fill="url(#nePerspectiveCourtGrad)" />

        {/* 단정한 코트 바닥 수평선 하나만 유지 */}
        <line x1="12" y1="138" x2="188" y2="138" stroke="#FFFFFF" strokeWidth="2.5" opacity="0.85" strokeLinecap="round" />

        {/* 2. 와이드 네트 그물망 본체 */}
        {/* 네트 그림자 */}
        <polygon
          points="10,64 190,64 190,126 10,126"
          fill="#0C4A6E"
          opacity="0.35"
        />
        {/* 화이트 격자 메시 그물망 */}
        <polygon
          points="10,64 190,64 190,126 10,126"
          fill="url(#neWideMeshPattern)"
        />
        {/* 네트 하단 와이어 라인 */}
        <line x1="10" y1="126" x2="190" y2="126" stroke="#1E293B" strokeWidth="1.2" opacity="0.7" />

        {/* 3. 2획 매칭: 네트 상단 캔버스 헤드밴드 (화면을 가로지르는 팽팽한 흰색 밴드) */}
        <path
          d="M 8 61 L 192 61 L 192 67 L 8 67 Z"
          fill="url(#neHeadbandGrad)"
          stroke="#94A3B8"
          strokeWidth="1"
        />
        {/* 헤드밴드 바느질 스티치 점선 */}
        <line x1="10" y1="62.5" x2="190" y2="62.5" stroke="#64748B" strokeWidth="0.7" strokeDasharray="2.5 1.5" opacity="0.6" />
        <line x1="10" y1="65.5" x2="190" y2="65.5" stroke="#64748B" strokeWidth="0.7" strokeDasharray="2.5 1.5" opacity="0.6" />

        {/* 4. 3획 매칭: 네트 중앙 화이트 센터 스트랩 (Center Strap) */}
        <g>
          {/* 센터 스트랩 본체 (폭 10px, y=61 ~ 138) */}
          <rect
            x="101"
            y="61"
            width="10"
            height="77"
            rx="1.5"
            fill="url(#neCenterStrapGrad)"
            stroke="#64748B"
            strokeWidth="1.2"
          />
          {/* 스트랩 바느질 점선 */}
          <line x1="103" y1="62" x2="103" y2="136" stroke="#94A3B8" strokeWidth="0.6" strokeDasharray="2 1.5" />
          <line x1="109" y1="62" x2="109" y2="136" stroke="#94A3B8" strokeWidth="0.6" strokeDasharray="2 1.5" />

          {/* 중앙 입체 하이라이트 림 */}
          <line x1="106" y1="62" x2="106" y2="136" stroke="#FFFFFF" strokeWidth="1" opacity="0.8" />

          {/* 바닥 코트 앵커 플레이트 & 버클 */}
          <rect x="100" y="134" width="12" height="5" rx="1.5" fill="#D97706" stroke="#92400E" strokeWidth="1" />
          <circle cx="106" cy="136.5" r="1.2" fill="#FEF08A" />
        </g>

        {/* 5. 1획 매칭: 네트 상공의 단정한 테니스공 */}
        <g>
          {/* 테니스공 본체 */}
          <circle
            cx="108"
            cy="42"
            r="13"
            fill="url(#neTennisBallGrad)"
            stroke="#15803D"
            strokeWidth="1.6"
          />

          {/* 테니스공 흰색 곡선 심(Seam) 2개 */}
          <path
            d="M 98 34 C 102 41 106 43 105 52"
            stroke="#FFFFFF"
            strokeWidth="1.6"
            strokeLinecap="round"
            fill="none"
            opacity="0.95"
          />
          <path
            d="M 118 34 C 114 41 110 43 111 52"
            stroke="#FFFFFF"
            strokeWidth="1.6"
            strokeLinecap="round"
            fill="none"
            opacity="0.95"
          />

          {/* 테니스공 은은한 하이라이트 */}
          <circle cx="104" cy="37" r="2.6" fill="#FFFFFF" opacity="0.85" />
        </g>

        {/* 6. 글자 'ネ' 오버레이 (단정한 네트와 테니스공 위에 깨끗하게 안착) */}
        <KatakanaCharOverlay char="ネ" fontFamily={fontFamily} x="106" y="118" />
      </svg>
    );
  }

  if (char === 'ノ') {
    // ノ: 노 (상단 50% 거대한 배 선체 클로즈업 + 하단 50% 푸른 수면 + 화면 밖에서부터 힘차게 저어 내려오는 노)
    return (
      <svg viewBox="0 0 200 160" className="w-full h-full select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* 배 선체(상단 50%) 원목 판자 깊은 그라디언트 */}
          <linearGradient id="noBigBoatGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#D97706" />
            <stop offset="35%" stopColor="#B45309" />
            <stop offset="75%" stopColor="#92400E" />
            <stop offset="100%" stopColor="#78350F" />
          </linearGradient>

          {/* 하단 수면(하단 50%) 깊은 호수 그라디언트 */}
          <linearGradient id="noWaterBaseGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0284C7" />
            <stop offset="30%" stopColor="#0EA5E9" />
            <stop offset="70%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#7DD3FC" />
          </linearGradient>

          {/* 노 자루(Shaft) 프리미엄 원목 그라디언트 */}
          <linearGradient id="noOarShaftGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FEF3C7" />
            <stop offset="30%" stopColor="#FDE047" />
            <stop offset="70%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#92400E" />
          </linearGradient>

          {/* 노 깃(Blade) 물속 입체 음영 그라디언트 */}
          <linearGradient id="noBladeGrad" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#D97706" />
            <stop offset="50%" stopColor="#B45309" />
            <stop offset="100%" stopColor="#78350F" />
          </linearGradient>
        </defs>

        {/* ======================================================== */}
        {/* [하단 50%] 푸른 호수 수면 베이스 (y ≈ 74 ~ 160)            */}
        {/* ======================================================== */}
        <rect x="0" y="70" width="200" height="90" fill="url(#noWaterBaseGrad)" />

        {/* 배 바로 아래 짙은 수면 그림자 (선체 그림자) */}
        <path
          d="M 0 72 Q 100 80 200 75 L 200 88 Q 100 94 0 86 Z"
          fill="#0369A1"
          opacity="0.6"
        />

        {/* 잔잔하게 일렁이는 호수 물결선들 */}
        <path d="M 10 98 C 50 94 90 102 130 96 C 160 94 185 98 195 96" stroke="#BAE6FD" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
        <path d="M 20 118 C 65 114 115 122 165 116 C 180 115 190 117 195 116" stroke="#E0F2FE" strokeWidth="1.8" strokeLinecap="round" opacity="0.7" />
        <path d="M 5 142 C 55 138 105 146 155 140 C 175 139 190 142 195 141" stroke="#BAE6FD" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />

        {/* ======================================================== */}
        {/* [상단 50%] 거대한 배 선체 (클로즈업) (y ≈ 0 ~ 76)         */}
        {/* ======================================================== */}
        <g id="big-boat-hull">
          {/* 배 선체 본체 (클로즈업된 둥근 목선 바닥 & 측면) */}
          <path
            d="M 0 0 
               L 200 0 
               L 200 75 
               C 150 82 70 80 0 72 
               Z"
            fill="url(#noBigBoatGrad)"
          />

          {/* 나무 판자 이음선 (Plank Seams) - 배 선체의 입체적인 곡면 표현 */}
          {/* 1번 판자 (상단) */}
          <line x1="0" y1="24" x2="200" y2="24" stroke="#78350F" strokeWidth="1.8" />
          <line x1="0" y1="25" x2="200" y2="25" stroke="#FDE68A" strokeWidth="0.8" opacity="0.4" />

          {/* 2번 판자 (중단) */}
          <path d="M 0 48 C 60 52 140 52 200 49" stroke="#78350F" strokeWidth="1.8" />
          <path d="M 0 49 C 60 53 140 53 200 50" stroke="#FDE68A" strokeWidth="0.8" opacity="0.4" />

          {/* 3번 판자 (하단 선저 bilge 라인) */}
          <path d="M 0 68 C 70 74 150 74 200 68" stroke="#451A03" strokeWidth="2" opacity="0.7" />

          {/* 배 선체 나무 못(Rivet) 디테일 */}
          <circle cx="35" cy="24" r="1.5" fill="#451A03" />
          <circle cx="85" cy="24" r="1.5" fill="#451A03" />
          <circle cx="135" cy="24" r="1.5" fill="#451A03" />
          <circle cx="185" cy="24" r="1.5" fill="#451A03" />

          <circle cx="45" cy="48" r="1.5" fill="#451A03" />
          <circle cx="95" cy="48" r="1.5" fill="#451A03" />
          <circle cx="145" cy="48" r="1.5" fill="#451A03" />

          {/* 배가 수면과 맞닿는 하얀 물거품 경계선 (Waterline Froth) */}
          <path
            d="M 0 72 C 70 80 150 82 200 75"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.9"
          />
          <path
            d="M 0 73 C 70 81 150 83 200 76"
            stroke="#BAE6FD"
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0.5"
          />

          {/* 배 난간의 노걸이(Rowlock / Oarlock) - 노를 지지하는 은빛 금속 소켓 */}
          <g transform="translate(142, 28)">
            <rect x="-4" y="-3" width="8" height="6" rx="2" fill="#E2E8F0" stroke="#475569" strokeWidth="1.2" />
            <path d="M -3 -3 C -3 -9 3 -9 3 -3" stroke="#94A3B8" strokeWidth="1.8" strokeLinecap="round" fill="none" />
            <circle cx="0" cy="0" r="1.2" fill="#1E293B" />
          </g>
        </g>

        {/* ======================================================== */}
        {/* [노(Oar)] 화면 밖(우상단)에서부터 좌하단 물속으로 힘차게 뻗는 노  */}
        {/* ======================================================== */}
        <g id="rowing-oar">
          {/* 노 그림자 (배 선체 및 수면 위에 지는 부드러운 그림자) */}
          <path
            d="M 166 -10 
               C 152 38 120 90 74 136 
               L 65 127 
               C 112 80 142 30 156 -10 Z"
            fill="#0F172A"
            opacity="0.25"
          />

          {/* 노 자루 본체 - 글자 'ノ'의 궤적과 일치하는 미려한 나무 자루 */}
          <path
            d="M 162 -10 
               C 148 38 116 90 70 134 
               L 59 124 
               C 107 78 138 28 152 -10 Z"
            fill="url(#noOarShaftGrad)"
            stroke="#78350F"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />

          {/* 노 자루 밝은 하이라이트 능선 */}
          <path
            d="M 158 -10 C 144 36 112 86 65 128"
            stroke="#FFFFFF"
            strokeWidth="1.4"
            strokeLinecap="round"
            opacity="0.85"
          />

          {/* 노 깃 (Paddle Blade): 물속으로 파고드는 넓은 주걱형 패들 */}
          <path
            d="M 70 124 
               C 58 133 44 144 34 148 
               C 28 150 26 146 29 140 
               C 35 128 48 116 60 116 
               C 66 116 68 119 70 124 Z"
            fill="url(#noBladeGrad)"
            stroke="#78350F"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />

          {/* 노 깃 중앙 등뼈 융기선 (Blade Spine) */}
          <path
            d="M 65 121 C 52 132 40 142 32 144"
            stroke="#92400E"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* 노 깃 모서리 하이라이트 */}
          <path
            d="M 60 117 C 49 117 37 127 30 138"
            stroke="#FDE68A"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.9"
          />
        </g>

        {/* ======================================================== */}
        {/* [물살 및 물보라] 노가 물을 밀어낼 때의 역동적인 파문과 물방울 */}
        {/* ======================================================== */}
        {/* 노가 입수하는 지점의 수면 파문 링 */}
        <ellipse cx="48" cy="136" rx="26" ry="8" transform="rotate(-15 48 136)" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="36 14" fill="none" opacity="0.9" />
        <ellipse cx="46" cy="138" rx="16" ry="5" transform="rotate(-15 46 138)" stroke="#E0F2FE" strokeWidth="1.6" fill="none" opacity="0.95" />

        {/* 힘차게 튀어오르는 물방울 스플래시 */}
        <circle cx="28" cy="125" r="3" fill="#FFFFFF" />
        <circle cx="22" cy="135" r="2.2" fill="#BAE6FD" />
        <circle cx="38" cy="114" r="2" fill="#FFFFFF" />
        <circle cx="62" cy="146" r="1.8" fill="#E0F2FE" />
        <circle cx="18" cy="122" r="1.5" fill="#38BDF8" />

        {/* ======================================================== */}
        {/* [글자 'ノ' 오버레이] 노의 궤적 중앙에 완벽히 안착           */}
        {/* ======================================================== */}
        <KatakanaCharOverlay char="ノ" fontFamily={fontFamily} x="106" y="118" />
      </svg>
    );
  }

  return null;
}
