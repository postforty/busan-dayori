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
    // ち: 5·치ㄹ (왼쪽 히라가나 'ち'(5 모양) + 오른쪽에 심플하고 귀여운 3D 입체 숫자 7 피규어 나란히 배치)
    // ⚠️ 글자 'ち' 자체가 숫자 5를 닮았으므로 군더더기 요소를 배제하고, 오른쪽에만 3D 숫자 7을 깔끔하게 배치하여 "5, 칠(치)!" 연상 극대화!
    return (
      <svg
        viewBox="0 0 200 160"
        className="w-full h-full select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* 숫자 7 메인 코랄 오렌지 그라디언트 (하단 테마 포인트 컬러와 완벽 일치) */}
          <linearGradient id="num7-main" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FED7AA" />
            <stop offset="45%" stopColor="#FB923C" />
            <stop offset="90%" stopColor="#F97316" />
            <stop offset="100%" stopColor="#EA580C" />
          </linearGradient>

          {/* 숫자 7 입체 그림자 / 3D 두께 그라디언트 */}
          <linearGradient id="num7-depth" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#EA580C" />
            <stop offset="100%" stopColor="#C2410C" />
          </linearGradient>

          {/* 광택 하이라이트 그라디언트 */}
          <linearGradient id="num7-shine" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* 1. 바닥 그림자 (왼쪽 글자 'ち' 아래 & 오른쪽 숫자 '7' 아래) */}
        <ellipse cx="68" cy="132" rx="32" ry="5" fill="#E2E8F0" opacity="0.65" />
        <ellipse cx="138" cy="132" rx="26" ry="5" fill="#E2E8F0" opacity="0.65" />

        {/* 2. 우측: 심플하고 볼륨감 넘치는 3D 입체 숫자 7 피규어 (치!) */}
        <g id="number-7-figure">
          {/* 3D 깊이감(입체 두께) 레이어 */}
          <path
            d="M 120 52
               C 117 52 116 56 116 59
               C 116 62 118 66 122 66
               L 146 66
               L 126 126
               C 124 131 128 136 134 136
               C 139 136 142 132 144 128
               L 168 68
               C 172 67 174 62 174 58
               C 174 54 170 52 166 52
               Z"
            fill="url(#num7-depth)"
          />

          {/* 메인 숫자 7 페이스 (상쾌하고 도톰한 볼륨감의 코랄 오렌지 바디) */}
          <path
            d="M 120 48
               C 117 48 116 52 116 55
               C 116 58 118 62 122 62
               L 146 62
               L 126 122
               C 124 127 128 132 134 132
               C 139 132 142 128 144 124
               L 168 64
               C 172 63 174 58 174 54
               C 174 50 170 48 166 48
               Z"
            fill="url(#num7-main)"
            stroke="#EA580C"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />

          {/* 상단 가로바 화이트 샤인 하이라이트 (Glossy Line) */}
          <path
            d="M 122 52 L 164 52"
            stroke="url(#num7-shine)"
            strokeWidth="2.6"
            strokeLinecap="round"
          />

          {/* 대각선 기둥 볼륨 하이라이트 광택선 */}
          <path
            d="M 164 62 L 142 120"
            stroke="url(#num7-shine)"
            strokeWidth="2.4"
            strokeLinecap="round"
          />

          {/* 둥근 유리알 반사광 스팟 */}
          <circle cx="163" cy="53" r="2" fill="#FFFFFF" opacity="0.9" />
          <circle cx="156" cy="74" r="1.3" fill="#FFFFFF" opacity="0.75" />

          {/* 앙증맞은 핑크 볼터치 */}
          <ellipse cx="140" cy="116" rx="4" ry="2.2" fill="#FDA4AF" opacity="0.6" />
        </g>

        {/* 3. 좌측: 글자 'ち' 오버레이 (숫자 5를 닮은 글자 본체) */}
        <MnemonicCharOverlay char="ち" fontFamily={fontFamily} x="68" y="118" />
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
