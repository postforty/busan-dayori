import { MnemonicSvgChildProps } from './types';
import MnemonicCharOverlay from './MnemonicCharOverlay';

export default function MnemonicRowTa({ char, fontFamily }: MnemonicSvgChildProps) {
  if (char === 'た') {
    // た: 타조 (긴 목과 몸체, 힘차게 질주하는 두 다리와 노란 부리)
    return (
      <svg
        viewBox="0 0 200 160"
        className="w-full h-full select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 타조 몸통 실루엣 (우측 가로 두 획 영역) */}
        <ellipse
          cx="124"
          cy="92"
          rx="24"
          ry="16"
          fill="#F5F5F4"
          stroke="#D6D3D1"
          strokeWidth="1.5"
        />

        {/* 타조 긴 목 (글자 た 왼쪽 긴 세로 획 매칭) */}
        <path
          d="M 68 44 C 68 76 74 104 78 126"
          stroke="#78716C"
          strokeWidth="2.2"
          strokeLinecap="round"
        />

        {/* 타조 둥근 머리 */}
        <circle cx="68" cy="40" r="10" fill="#FFFFFF" stroke="#78716C" strokeWidth="1.6" />
        {/* 타조 눈 */}
        <circle cx="66" cy="38" r="1.5" fill="#1C1917" />

        {/* 타조 노란 부리 (포인트 컬러) */}
        <path
          d="M 58 40 L 46 43 L 58 45 Z"
          fill="#FBBF24"
          stroke="#D97706"
          strokeWidth="1.2"
        />

        {/* 타조 질주하는 두 다리 */}
        <path
          d="M 116 108 L 110 134 M 132 108 L 140 132"
          stroke="#A8A29E"
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        {/* 달리는 속도감 라인 */}
        <line x1="148" y1="84" x2="162" y2="84" stroke="#E7E5E4" strokeWidth="2" strokeLinecap="round" />
        <line x1="152" y1="94" x2="168" y2="94" stroke="#E7E5E4" strokeWidth="2" strokeLinecap="round" />

        {/* 글자 'た' 오버레이 */}
        <MnemonicCharOverlay char="た" fontFamily={fontFamily} x="108" y="118" />
      </svg>
    );
  }

  if (char === 'ち') {
    // ち: 치약 (칫솔 위에 상쾌하고 도톰하게 둥글게 짜 올려진 3D 민트 치약 젤과 미니 치약 튜브, 몽글몽글 거품 방울!)
    // ⚠️ 글자 'ち'의 가로선·세로선(치약 튜브 노즐과 흘러내리는 치약 줄기) 및 둥근 곡선(칫솔모 위에 둥글게 소용돌이치며 얹힌 치약 젤 덩어리)과 1:1 완벽 일체화!
    return (
      <svg
        viewBox="0 0 200 160"
        className="w-full h-full select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* 상쾌한 아쿠아 민트 치약 젤 그라디언트 */}
          <linearGradient id="tp-mint" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A7F3D0" />
            <stop offset="40%" stopColor="#34D399" />
            <stop offset="85%" stopColor="#059669" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>

          {/* 청량한 스카이 블루 스트라이프 그라디언트 */}
          <linearGradient id="tp-blue" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#BAE6FD" />
            <stop offset="50%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#0284C7" />
          </linearGradient>

          {/* 깨끗한 펄 화이트 치약 스트라이프 그라디언트 */}
          <linearGradient id="tp-white" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="60%" stopColor="#F8FAFC" />
            <stop offset="100%" stopColor="#E2E8F0" />
          </linearGradient>

          {/* 파스텔 치약 튜브 바디 그라디언트 */}
          <linearGradient id="tube-body" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#67E8F9" />
            <stop offset="50%" stopColor="#06B6D4" />
            <stop offset="100%" stopColor="#0891B2" />
          </linearGradient>

          {/* 칫솔 헤드 & 손잡이 파스텔 바이올렛/블루 그라디언트 */}
          <linearGradient id="tb-handle" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DDD6FE" />
            <stop offset="50%" stopColor="#A78BFA" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>

          {/* 칫솔 미끄럼방지 러버 패드 */}
          <linearGradient id="tb-rubber" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F472B6" />
            <stop offset="100%" stopColor="#DB2777" />
          </linearGradient>

          {/* 싱그러운 민트 잎 그린 그라디언트 */}
          <linearGradient id="mint-leaf-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#86EFAC" />
            <stop offset="60%" stopColor="#22C55E" />
            <stop offset="100%" stopColor="#15803D" />
          </linearGradient>

          {/* 투명 비누 거품 그라디언트 */}
          <radialGradient id="bubble-grad" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#E0F2FE" stopOpacity="0.5" />
            <stop offset="85%" stopColor="#BAE6FD" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#7DD3FC" stopOpacity="0.6" />
          </radialGradient>
        </defs>

        {/* 1. 바닥 그림자 & 세면대 환경 */}
        <ellipse cx="106" cy="144" rx="64" ry="6.5" fill="#E2E8F0" opacity="0.6" />

        {/* 2. 칫솔 (Toothbrush) - 아래에서 든든하게 받쳐주는 프레임 */}
        <g id="toothbrush">
          {/* 칫솔 손잡이 (왼쪽 아래로 부드럽게 뻗어나가는 인체공학적 곡선) */}
          <path
            d="M 22 138
               C 32 132 46 128 62 126
               C 74 124 84 126 96 128
               L 96 135
               C 82 134 70 133 58 136
               C 42 139 30 144 22 138 Z"
            fill="url(#tb-handle)"
            stroke="#6D28D9"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          {/* 손잡이 핑크 고무 그립 패드 (Rubber Grip) */}
          <path
            d="M 38 133 C 48 130 58 130 68 131 C 66 134 56 135 44 135 Z"
            fill="url(#tb-rubber)"
          />

          {/* 칫솔 헤드 바디 (Brush Head) - 치약 아래를 받침 */}
          <path
            d="M 92 127
               C 92 124 100 122 116 122
               C 134 122 146 125 146 128
               C 146 132 134 135 116 135
               C 98 135 92 131 92 127 Z"
            fill="url(#tb-handle)"
            stroke="#6D28D9"
            strokeWidth="1.8"
          />

          {/* 칫솔모 블록 (White Bristles with Aqua accent) */}
          {/* 칫솔모 기본 흰색 층 */}
          <path
            d="M 96 122
               L 96 112
               C 96 110 102 109 116 109
               C 130 109 142 110 142 112
               L 142 122
               Z"
            fill="#FFFFFF"
            stroke="#CBD5E1"
            strokeWidth="1.2"
          />
          {/* 칫솔모 섬세한 세로 미세모 결 라인 */}
          <line x1="104" y1="110" x2="104" y2="122" stroke="#E2E8F0" strokeWidth="1.2" />
          <line x1="112" y1="109" x2="112" y2="122" stroke="#38BDF8" strokeWidth="1.5" />
          <line x1="120" y1="109" x2="120" y2="122" stroke="#38BDF8" strokeWidth="1.5" />
          <line x1="128" y1="109" x2="128" y2="122" stroke="#38BDF8" strokeWidth="1.5" />
          <line x1="135" y1="110" x2="135" y2="122" stroke="#E2E8F0" strokeWidth="1.2" />
        </g>

        {/* 3. 귀여운 미니 치약 튜브 (Toothpaste Tube - 왼쪽 상단) */}
        <g id="toothpaste-tube">
          {/* 튜브 본체 (세련된 아쿠아 시안 튜브) */}
          <path
            d="M 28 34
               L 68 44
               C 74 46 76 50 74 54
               C 72 58 66 60 60 58
               L 24 46
               Z"
            fill="url(#tube-body)"
            stroke="#0E7490"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          {/* 튜브 끝 밀봉 주름 (Crimp seal) */}
          <line x1="24" y1="46" x2="28" y2="34" stroke="#0E7490" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="26" y1="47" x2="30" y2="35" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" />

          {/* 튜브 전면 하얀 스트라이프 & 민트 로고 라벨 */}
          <path d="M 38 39 L 58 44 L 56 52 L 36 47 Z" fill="#FFFFFF" opacity="0.9" />
          <path d="M 44 42 L 52 44 L 51 47 L 43 45 Z" fill="#06B6D4" />

          {/* 튜브 숄더 & 노즐 목 */}
          <path
            d="M 68 44 L 76 46 L 75 52 L 67 50 Z"
            fill="#E2E8F0"
            stroke="#64748B"
            strokeWidth="1.4"
          />
          {/* 나사산 노즐 팁 */}
          <rect
            x="76"
            y="47"
            width="8"
            height="5"
            rx="1.5"
            fill="#FFFFFF"
            stroke="#64748B"
            strokeWidth="1.4"
            transform="rotate(14 76 47)"
          />
        </g>

        {/* 4. ★★★ 메인: 글자 'ち'와 1:1 완벽 일체화되는 상쾌한 치약 젤 (Toothpaste Swirl) ★★★ */}
        {/* 상단 가로선 & 세로선 흐름: 노즐에서 나와 칫솔 위로 주르륵 이어지는 치약 줄기 */}
        <g id="toothpaste-flow">
          {/* 치약 상단 가로 흐름 (글자 'ち' 가로선 영역) */}
          <path
            d="M 76 56
               C 88 56 102 55 116 57
               C 123 58 126 62 122 65
               C 114 67 98 67 84 66
               Z"
            fill="url(#tp-mint)"
            stroke="#047857"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          {/* 가로 흐름 속 화이트 스트라이프 */}
          <path
            d="M 80 58 C 92 58 106 57 118 59"
            stroke="url(#tp-white)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* 세로 줄기 흐름 (글자 'ち' 세로 획 영역 관통) */}
          <path
            d="M 92 58
               C 92 68 94 76 96 84
               C 98 88 104 88 104 82
               C 102 74 100 66 98 58
               Z"
            fill="url(#tp-mint)"
            stroke="#047857"
            strokeWidth="1.6"
          />
        </g>

        {/* ★★★ 칫솔모 위에 둥글게 소용돌이치며 얹혀진 거대한 치약 젤 덩어리 (글자 'ち' 하단 둥근 만곡선과 1:1 완벽 일치!) ★★★ */}
        <g id="toothpaste-dollop">
          {/* 치약 젤 메인 볼륨 (아쿠아 민트 베이스) */}
          <path
            d="M 94 78
               C 112 74 136 82 140 100
               C 143 116 132 130 116 130
               C 102 130 94 123 96 114
               C 98 106 108 100 114 94
               C 118 90 114 84 106 82
               C 100 81 96 80 94 78 Z"
            fill="url(#tp-mint)"
            stroke="#047857"
            strokeWidth="2"
            strokeLinejoin="round"
          />

          {/* 치약 특유의 스카이 블루 스트라이프 (중간 곡선) */}
          <path
            d="M 100 82
               C 116 80 134 88 136 102
               C 138 116 128 126 114 126
               C 104 126 98 120 100 113"
            stroke="url(#tp-blue)"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />

          {/* 치약 특유의 순백 펄 화이트 스트라이프 (중심 곡선) */}
          <path
            d="M 104 84
               C 118 83 131 90 133 103
               C 134 114 125 122 114 122
               C 106 122 102 117 103 112"
            stroke="url(#tp-white)"
            strokeWidth="3.2"
            strokeLinecap="round"
            fill="none"
          />

          {/* 탱글탱글한 치약 윗면의 영롱한 유리알 광택 하이라이트 (Gloss shine) */}
          <path
            d="M 112 86 C 124 90 132 98 131 108"
            stroke="#FFFFFF"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <circle cx="114" cy="87" r="1.4" fill="#FFFFFF" />

          {/* 치약 끝부분 앙증맞은 말림 스월 팁 (Swirl Tip) */}
          <path
            d="M 96 114 C 94 118 98 124 106 125 C 112 126 115 123 114 119"
            stroke="#A7F3D0"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        {/* 5. 싱그러운 민트 잎 2장 (Fresh Mint Leaves) */}
        <g id="mint-leaves">
          {/* 큰 민트 잎 */}
          <path
            d="M 144 124
               C 152 118 162 120 166 128
               C 162 134 152 136 144 128
               Z"
            fill="url(#mint-leaf-grad)"
            stroke="#15803D"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
          {/* 민트 잎맥 */}
          <path d="M 146 126 C 153 124 162 126 164 128" stroke="#DCFCE7" strokeWidth="1" strokeLinecap="round" />

          {/* 작은 곁 잎 */}
          <path
            d="M 148 132
               C 155 130 161 133 163 138
               C 158 141 152 140 148 135
               Z"
            fill="url(#mint-leaf-grad)"
            stroke="#15803D"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </g>

        {/* 6. 몽글몽글 투명 비누/치약 거품 방울 (Soap Bubbles) */}
        <g id="foam-bubbles">
          {/* 우측 상단 큰 거품 */}
          <circle cx="156" cy="88" r="9" fill="url(#bubble-grad)" stroke="#BAE6FD" strokeWidth="1" />
          <ellipse cx="153" cy="84" rx="3" ry="1.8" fill="#FFFFFF" opacity="0.8" transform="rotate(-30 153 84)" />

          {/* 우측 중간 작은 거품 */}
          <circle cx="164" cy="106" r="6" fill="url(#bubble-grad)" stroke="#BAE6FD" strokeWidth="0.8" />
          <circle cx="162" cy="104" r="1.5" fill="#FFFFFF" opacity="0.85" />

          {/* 좌측 하단 거품 */}
          <circle cx="72" cy="116" r="5" fill="url(#bubble-grad)" stroke="#BAE6FD" strokeWidth="0.8" />
          <circle cx="70.5" cy="114.5" r="1.2" fill="#FFFFFF" opacity="0.85" />

          {/* 미니 퐁퐁 방울들 */}
          <circle cx="146" cy="74" r="3.2" fill="url(#bubble-grad)" stroke="#BAE6FD" strokeWidth="0.6" />
          <circle cx="170" cy="94" r="2.5" fill="url(#bubble-grad)" />
          <circle cx="82" cy="122" r="2.2" fill="url(#bubble-grad)" />
        </g>

        {/* 7. 깨끗함과 상쾌함을 빛내는 반짝이 별빛 (Sparkles ✦) */}
        <g id="sparkles">
          {/* 우측 상단 골드/시안 다이아몬드 별 */}
          <path
            d="M 152 50 Q 152 58 160 58 Q 152 58 152 66 Q 152 58 144 58 Q 152 58 152 50 Z"
            fill="#FACC15"
          />
          <circle cx="152" cy="58" r="1.5" fill="#FFFFFF" />

          {/* 중앙 상단 미니 별 */}
          <path
            d="M 136 38 Q 136 43 141 43 Q 136 43 136 48 Q 136 43 131 43 Q 136 43 136 38 Z"
            fill="#38BDF8"
          />

          {/* 좌상단 튜브 근처 미니 별 */}
          <path
            d="M 82 34 Q 82 38 86 38 Q 82 38 82 42 Q 82 38 78 38 Q 82 38 82 34 Z"
            fill="#FACC15"
          />
        </g>

        {/* 8. 글자 'ち' 오버레이 (정중앙 완벽 배치) */}
        <MnemonicCharOverlay char="ち" fontFamily={fontFamily} x="108" y="118" />
      </svg>
    );
  }

  if (char === 'つ') {
    // つ: 부츠 (발목 털트림과 금색 버클, 둥근 앞코와 도톰한 굽을 가진 안정적인 비율의 부츠!)
    // ⚠️ 글자 'つ'의 둥근 만곡선이 부츠의 발등에서 둥근 앞코(Toe), 밑창으로 이어지는 곡선과 완벽 일치
    return (
      <svg
        viewBox="0 0 200 160"
        className="w-full h-full select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 부츠 본체 (발목 폭을 널찍하고 안정감 있게 확장) */}
        <path
          d="M 44 28 
             L 44 108 
             L 86 108 
             L 142 94 
             C 154 90 156 68 142 54 
             L 110 50 
             L 86 56 
             L 86 28 
             Z"
          fill="#FEF08A"
          stroke="#B45309"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* 발목 상단 뽀송뽀송한 양털 카라 (Fur Trim - 널찍하게 확장) */}
        <rect
          x="36"
          y="18"
          width="56"
          height="14"
          rx="7"
          fill="#FFFFFF"
          stroke="#B45309"
          strokeWidth="1.8"
        />
        {/* 털 텍스처 디테일 */}
        <path
          d="M 44 25 C 47 23 51 23 54 25 C 57 23 61 23 64 25 C 67 23 71 23 74 25 C 77 23 81 23 84 25"
          stroke="#CBD5E1"
          strokeWidth="1.2"
          strokeLinecap="round"
        />

        {/* 발목 가죽 벨트 스트랩 & 골드 버클 */}
        <path
          d="M 44 58 L 86 62"
          stroke="#D97706"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        {/* 골드 사각 버클 */}
        <rect
          x="60"
          y="56"
          width="9"
          height="9"
          rx="1.5"
          fill="#FDE047"
          stroke="#B45309"
          strokeWidth="1.2"
        />
        <rect x="63" y="58.5" width="3" height="4" fill="#D97706" />

        {/* 발등 스티치 라인 (점선) */}
        <path
          d="M 88 64 C 98 62 116 58 132 58"
          stroke="#D97706"
          strokeWidth="1.4"
          strokeDasharray="3 2"
          strokeLinecap="round"
        />

        {/* 둥근 앞코 반짝임 광택선 */}
        <path
          d="M 136 58 C 146 66 146 76 138 84"
          stroke="#FFFFFF"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* 뒤꿈치 보강 가죽 패치 라인 */}
        <path
          d="M 44 86 C 58 86 64 96 64 108"
          stroke="#D97706"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* 글자 'つ' 오버레이 */}
        <MnemonicCharOverlay char="つ" fontFamily={fontFamily} x="110" y="116" />
      </svg>
    );
  }

  if (char === 'て') {
    // て: 테이프 (롤 테이프 디스펜서에서 팽팽하게 뽑아져 나온 투명 테이프와 둥근 롤 바디!)
    // ⚠️ 글자 'て'의 상단 가로선은 뽑혀 나온 테이프 띠, 하단 곡선은 둥글게 감긴 테이프 롤과 완벽 일치
    return (
      <svg
        viewBox="0 0 200 160"
        className="w-full h-full select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 바닥 그림자 */}
        <ellipse cx="106" cy="132" rx="46" ry="5" fill="#E2E8F0" opacity="0.7" />

        {/* 롤 테이프 디스펜서 본체 (산뜻한 파스텔 민트 바디) */}
        <path
          d="M 64 124 
             C 50 114 48 86 62 70 
             C 70 60 84 56 102 56 
             L 142 46 
             C 146 45 148 48 147 52 
             L 142 66 
             C 134 76 138 96 148 108 
             C 152 114 148 124 138 124 
             Z"
          fill="#D1FAE5"
          stroke="#059669"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* 디스펜서 우측 상단 메탈 톱니 커터 날 (Metal Cutter Blade) */}
        <path
          d="M 142 44 L 145 47 L 142 50 L 145 53 L 142 56 L 145 59 L 141 62"
          stroke="#475569"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 둥글게 감겨 있는 투명 롤 테이프 본체 (Tape Roll) */}
        <circle
          cx="96"
          cy="92"
          r="28"
          fill="#A7F3D0"
          stroke="#10B981"
          strokeWidth="2"
        />
        {/* 겹겹이 감긴 롤 테이프 레이어 선 */}
        <circle cx="96" cy="92" r="22" stroke="#059669" strokeWidth="1" strokeDasharray="4 2" opacity="0.6" />
        <circle cx="96" cy="92" r="16" stroke="#059669" strokeWidth="1" opacity="0.4" />

        {/* 롤 테이프 중심 플라스틱 심지 (Core Hub) */}
        <circle cx="96" cy="92" r="10" fill="#FFFFFF" stroke="#059669" strokeWidth="1.8" />
        <circle cx="96" cy="92" r="4" fill="#CBD5E1" />

        {/* 롤에서 쫘-악 풀려나와 커터 날로 이어지는 팽팽한 테이프 띠 (글자 て 상단 가로선) */}
        <path
          d="M 68 56 L 142 48"
          stroke="#34D399"
          strokeWidth="6"
          strokeLinecap="round"
          opacity="0.8"
        />
        <path
          d="M 68 56 L 142 48"
          stroke="#059669"
          strokeWidth="1.2"
          strokeLinecap="round"
        />

        {/* 테이프 표면 투명 광택 반사광 (반짝임) */}
        <path
          d="M 82 52 L 108 48"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M 130 68 L 132 62 L 134 68 L 140 70 L 134 72 L 132 78 L 130 72 L 124 70 Z"
          fill="#FDE047"
        />

        {/* 글자 'て' 오버레이 */}
        <MnemonicCharOverlay char="て" fontFamily={fontFamily} x="108" y="118" />
      </svg>
    );
  }

  if (char === 'と') {
    // と: 토끼 (쫑긋한 분홍 귀, 앙증맞은 표정으로 당근을 쥔 사랑스러운 아기 토끼!)
    // ⚠️ 글자 'と'의 위 삐침은 토끼의 귀, 둥근 하단 곡선은 통통하고 둥근 토끼 엉덩이 라인과 일체화
    return (
      <svg
        viewBox="0 0 200 160"
        className="w-full h-full select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 바닥 그림자 */}
        <ellipse cx="106" cy="130" rx="46" ry="6" fill="#E2E8F0" opacity="0.6" />

        {/* 몽실몽실 구름 솜꼬리 (엉덩이 뒤쪽) */}
        <path
          d="M 136 104 
             C 134 98 142 94 146 97 
             C 152 95 156 101 154 106 
             C 158 111 152 118 147 116 
             C 142 119 135 114 136 108 Z"
          fill="#FFFFFF"
          stroke="#78716C"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />

        {/* 토끼 뒤쪽 귀 (살짝 비스듬히 솟은 귀) */}
        <path
          d="M 90 62 L 98 26 C 100 20 108 22 106 28 L 98 64"
          fill="#FFFDF7"
          stroke="#78716C"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M 94 56 L 100 28 C 101 24 105 25 104 29 L 98 58"
          stroke="#F472B6"
          strokeWidth="2.2"
          strokeLinecap="round"
        />

        {/* 토끼 전체 몸체 실루엣 (찹쌀떡처럼 통통하고 둥근 화이트 바디) */}
        <path
          d="M 76 68 
             C 86 64 132 68 140 92 
             C 144 108 138 124 116 126 
             C 92 128 72 124 64 112 
             C 54 98 56 78 76 68 Z"
          fill="#FFFDF7"
          stroke="#78716C"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* 토끼 앞쪽 쫑긋 귀 (글자 と 1획과 나란히 서 있는 메인 귀) */}
        <path
          d="M 76 68 L 84 22 C 86 16 95 18 94 24 L 86 70"
          fill="#FFFDF7"
          stroke="#78716C"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {/* 귀 안쪽 부드러운 핑크빛 */}
        <path
          d="M 80 60 L 86 24 C 87 20 92 21 91 26 L 85 64"
          stroke="#FDA4AF"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* 앙증맞은 토끼 얼굴 표정 */}
        {/* 반짝이는 까만 눈 */}
        <circle cx="68" cy="84" r="2.8" fill="#1E293B" />
        <circle cx="67.2" cy="83.2" r="1" fill="#FFFFFF" />

        {/* 핑크빛 삼각 코 & ㅅ자 입 */}
        <polygon points="59,88 63,88 61,90" fill="#F43F5E" />
        <path
          d="M 59 91 C 60 93 61 93 61 91 C 61 93 62 93 63 91"
          stroke="#78716C"
          strokeWidth="1.2"
          strokeLinecap="round"
        />

        {/* 통통한 복숭아빛 볼터치 */}
        <ellipse cx="69" cy="91" rx="4.5" ry="3" fill="#FDA4AF" opacity="0.7" />

        {/* 가느다란 수염 */}
        <line x1="56" y1="88" x2="50" y2="87" stroke="#A8A29E" strokeWidth="1" strokeLinecap="round" />
        <line x1="56" y1="91" x2="49" y2="93" stroke="#A8A29E" strokeWidth="1" strokeLinecap="round" />

        {/* 품에 꼬옥 쥐고 있는 미니 당근 (오렌지 포인트 컬러) */}
        <g id="mini-carrot">
          {/* 당근 초록 잎사귀 */}
          <path
            d="M 82 100 C 84 94 90 95 86 100 C 90 97 94 102 88 102"
            fill="#86EFAC"
            stroke="#16A34A"
            strokeWidth="1"
            strokeLinejoin="round"
          />
          {/* 당근 몸통 (통통한 미니 삼각 당근) */}
          <path
            d="M 82 101 C 85 99 87 101 86 104 L 78 116 C 76 117 74 116 75 113 Z"
            fill="#FB923C"
            stroke="#EA580C"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          {/* 당근 가로 주름선 */}
          <line x1="80" y1="105" x2="83" y2="104" stroke="#EA580C" strokeWidth="1" strokeLinecap="round" />
          <line x1="77" y1="110" x2="80" y2="109" stroke="#EA580C" strokeWidth="1" strokeLinecap="round" />

          {/* 당근을 감싸 쥔 앙증맞은 흰색 솜발 (앞발 2개) */}
          <circle cx="78" cy="104" r="3.2" fill="#FFFDF7" stroke="#78716C" strokeWidth="1.4" />
          <circle cx="84" cy="107" r="3" fill="#FFFDF7" stroke="#78716C" strokeWidth="1.4" />
        </g>

        {/* 통통한 뒷다리 솜발 */}
        <ellipse cx="88" cy="124" rx="9" ry="5" fill="#FFFDF7" stroke="#78716C" strokeWidth="1.6" />

        {/* 글자 'と' 오버레이 */}
        <MnemonicCharOverlay char="と" fontFamily={fontFamily} x="108" y="118" />
      </svg>
    );
  }

  return null;
}
