import { MnemonicSvgChildProps } from './types';
import MnemonicCharOverlay from './MnemonicCharOverlay';

export default function MnemonicRowRa({ char, fontFamily }: MnemonicSvgChildProps) {
  if (char === 'ら') {
    // ら: 라켓 (공중에 튄 테니스공과 라켓 손잡이 및 둥근 타원형 헤드 프레임)
    return (
      <svg
        viewBox="0 0 200 160"
        className="w-full h-full select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 스윙 모션 바람선 (경쾌한 스윙 궤적) */}
        <path
          d="M 68 114 C 66 128 78 138 96 138"
          stroke="#93C5FD"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="3 3"
        />
        <path
          d="M 60 106 C 58 126 72 144 102 144"
          stroke="#CBD5E1"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* 라켓 손잡이 그립 (글자 ら 왼쪽 세로 획 매칭) */}
        <rect
          x="79"
          y="48"
          width="10"
          height="32"
          rx="3"
          fill="#F8FAFC"
          stroke="#78716C"
          strokeWidth="1.8"
        />
        {/* 손잡이 상단 마감 칼라링 (포인트 로열블루) */}
        <rect x="78" y="48" width="12" height="4" rx="1.5" fill="#0284C7" />
        {/* 그립 테이프 사선선 */}
        <line x1="79" y1="56" x2="89" y2="53" stroke="#CBD5E1" strokeWidth="1.3" />
        <line x1="79" y1="64" x2="89" y2="61" stroke="#CBD5E1" strokeWidth="1.3" />
        <line x1="79" y1="72" x2="89" y2="69" stroke="#CBD5E1" strokeWidth="1.3" />
        {/* 그립 하단 조인트 */}
        <path d="M 79 80 L 89 80 L 87 84 L 81 84 Z" fill="#475569" stroke="#334155" strokeWidth="1" />

        {/* 라켓 목(Throat) 지지대 */}
        <path d="M 83 83 L 90 92 M 87 83 L 94 92" stroke="#0284C7" strokeWidth="1.8" strokeLinecap="round" />

        {/* 라켓 둥근 타원형 헤드 프레임 (글자 ら 오른쪽 볼록한 둥근 곡선 매칭) */}
        <ellipse
          cx="114"
          cy="98"
          rx="28"
          ry="26"
          fill="#F0F9FF"
          stroke="#0284C7"
          strokeWidth="2.2"
        />
        <ellipse
          cx="114"
          cy="98"
          rx="25.5"
          ry="23.5"
          stroke="#BAE6FD"
          strokeWidth="1"
          strokeDasharray="3 2"
        />

        {/* 격자 스트링 거트망 */}
        {/* 세로 스트링 */}
        <line x1="102" y1="75" x2="102" y2="121" stroke="#38BDF8" strokeWidth="1" opacity="0.75" />
        <line x1="110" y1="73" x2="110" y2="123" stroke="#38BDF8" strokeWidth="1" opacity="0.75" />
        <line x1="118" y1="73" x2="118" y2="123" stroke="#38BDF8" strokeWidth="1" opacity="0.75" />
        <line x1="126" y1="76" x2="126" y2="120" stroke="#38BDF8" strokeWidth="1" opacity="0.75" />
        {/* 가로 스트링 */}
        <line x1="94" y1="86" x2="134" y2="86" stroke="#38BDF8" strokeWidth="1" opacity="0.75" />
        <line x1="89" y1="94" x2="139" y2="94" stroke="#38BDF8" strokeWidth="1" opacity="0.75" />
        <line x1="89" y1="102" x2="139" y2="102" stroke="#38BDF8" strokeWidth="1" opacity="0.75" />
        <line x1="94" y1="110" x2="134" y2="110" stroke="#38BDF8" strokeWidth="1" opacity="0.75" />

        {/* 스위트스팟 로고 포인트 (레드) */}
        <path
          d="M 110 95 L 114 101 L 118 95"
          stroke="#F43F5E"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 날아오는 테니스공 (글자 ら 상단 점/삐침 획과 1:1 완벽 매칭, 포인트 라임옐로우) */}
        <g id="tennis-ball">
          {/* 타격 임팩트 스파크 */}
          <path
            d="M 89 22 L 90.5 18 L 92 22 L 96 23.5 L 92 25 L 90.5 29 L 89 25 L 85 23.5 Z"
            fill="#FACC15"
          />
          {/* 공 바디 */}
          <circle
            cx="103"
            cy="34"
            r="10.5"
            fill="#D9F99D"
            stroke="#65A30D"
            strokeWidth="1.6"
          />
          {/* 테니스공 흰색 솔기 곡선 (Seam) */}
          <path
            d="M 95 30 C 99 32 99 36 95 38"
            stroke="#FFFFFF"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M 111 30 C 107 32 107 36 111 38"
            stroke="#FFFFFF"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          {/* 타격 스피드선 */}
          <path
            d="M 116 26 L 124 21 M 118 33 L 128 33 M 116 40 L 124 45"
            stroke="#F59E0B"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </g>

        {/* 글자 'ら' 오버레이 */}
        <MnemonicCharOverlay char="ら" fontFamily={fontFamily} x="108" y="118" />
      </svg>
    );
  }

  if (char === 'り') {
    // り: 리본 (선물 상자 위에 풍성하게 묶인 사랑스러운 핑크 실크 나비 리본과 글자 획과 1:1로 일치하는 두 가닥 피쉬테일 리본 끈)
    // ⚠️ 1획은 왼쪽으로 살짝 삐쳐 올라간 짧은 리본 꼬리(V자 피쉬테일 컷),
    //    2획은 아래로 유려하게 흘러내리는 긴 실크 리본 꼬리(V자 피쉬테일 컷)와 1:1 완벽 일치!
    return (
      <svg
        viewBox="0 0 200 160"
        className="w-full h-full select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* 실크 리본 메인 그라디언트 (화사하고 사랑스러운 새틴 로즈핑크) */}
          <linearGradient id="ri-ribbon-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDA4AF" />
            <stop offset="35%" stopColor="#FB7185" />
            <stop offset="70%" stopColor="#F43F5E" />
            <stop offset="100%" stopColor="#E11D48" />
          </linearGradient>

          {/* 리본 루프 광택 그라디언트 */}
          <linearGradient id="ri-ribbon-loop" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FECDD3" />
            <stop offset="30%" stopColor="#FB7185" />
            <stop offset="100%" stopColor="#E11D48" />
          </linearGradient>

          {/* 매듭 코어 그라디언트 */}
          <linearGradient id="ri-ribbon-knot" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FB7185" />
            <stop offset="60%" stopColor="#E11D48" />
            <stop offset="100%" stopColor="#BE123C" />
          </linearGradient>

          {/* 리본 깊은 음영 그라디언트 (루프 안쪽 홀) */}
          <linearGradient id="ri-ribbon-shadow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#881337" />
            <stop offset="100%" stopColor="#BE123C" />
          </linearGradient>

          {/* 선물 상자 본체 그라디언트 (고급스러운 파스텔 샴페인 크림) */}
          <linearGradient id="ri-box-body" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF5F5" />
            <stop offset="100%" stopColor="#FFE4E6" />
          </linearGradient>

          {/* 선물 상자 뚜껑 그라디언트 */}
          <linearGradient id="ri-box-lid" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#FFF1F2" />
          </linearGradient>

          {/* 골드 펄 띠 그라디언트 */}
          <linearGradient id="ri-gold-band" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="50%" stopColor="#FDE047" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>

          {/* 골드 스파클 그라디언트 */}
          <linearGradient id="ri-sparkle" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFBEB" />
            <stop offset="40%" stopColor="#FDE047" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
        </defs>

        {/* 1. 배경: 사랑스러운 프리미엄 선물 상자 (Gift Box) */}
        {/* 상자 본체 바디 */}
        <rect
          x="36"
          y="56"
          width="128"
          height="96"
          rx="8"
          fill="url(#ri-box-body)"
          stroke="#FECDD3"
          strokeWidth="1.4"
        />

        {/* 상자 세로 골드 펄 리본 띠 */}
        <rect x="100" y="56" width="16" height="96" fill="url(#ri-gold-band)" opacity="0.85" />
        <line x1="102" y1="56" x2="102" y2="152" stroke="#F59E0B" strokeDasharray="3 2" strokeWidth="0.8" />
        <line x1="114" y1="56" x2="114" y2="152" stroke="#F59E0B" strokeDasharray="3 2" strokeWidth="0.8" />

        {/* 상자 뚜껑 하단 음영 그림자 */}
        <rect x="36" y="56" width="128" height="5" fill="#E11D48" opacity="0.1" />

        {/* 상자 뚜껑 (Lid) */}
        <rect
          x="28"
          y="38"
          width="144"
          height="18"
          rx="5"
          fill="url(#ri-box-lid)"
          stroke="#FDA4AF"
          strokeWidth="1.6"
        />
        {/* 뚜껑 가로 골드 띠 */}
        <rect x="28" y="44" width="144" height="6" fill="url(#ri-gold-band)" opacity="0.85" />
        {/* 뚜껑 세로 교차 띠 */}
        <rect x="100" y="38" width="16" height="18" fill="url(#ri-gold-band)" opacity="0.95" />

        {/* 2. 선물 태그 (Gift Tag with Heart) */}
        <g id="gift-tag">
          {/* 골드 연결 끈 */}
          <path
            d="M 116 42 Q 136 44 144 54"
            stroke="#D97706"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeDasharray="2 1.5"
          />
          {/* 태그 카드 바디 */}
          <rect
            x="136"
            y="52"
            width="22"
            height="15"
            rx="3"
            fill="#FFF1F2"
            stroke="#F43F5E"
            strokeWidth="1.2"
            transform="rotate(16 136 52)"
          />
          {/* 태그 펀치 홀 */}
          <circle cx="140" cy="56" r="1.3" fill="#FDA4AF" />
          {/* 태그 미니 하트 */}
          <path d="M 148 60 C 146 58 144 60 148 64 C 152 60 150 58 148 60 Z" fill="#E11D48" />
        </g>

        {/* 3. 실크 리본 꼬리 끈 (Ribbon Streamers / Tails) - 히라가나 'り'의 1획, 2획과 1:1 완벽 일체화! */}
        {/* [왼쪽 리본 꼬리 (り 1획 매칭)] */}
        <g id="left-streamer">
          {/* 리본 밴드 본체 (아래로 내려오다 끝단에 V자 피쉬테일 컷팅) */}
          <path
            d="M 80 44
               L 80 78
               C 80 84 76 88 72 88
               L 81 83
               L 90 92
               C 91 88 94 82 94 76
               L 94 44 Z"
            fill="url(#ri-ribbon-grad)"
            stroke="#BE123C"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {/* 리본 부드러운 새틴 광택 하이라이트 라인 */}
          <path
            d="M 86 46 L 86 78 C 86 82 84 84 81 83"
            stroke="#FFF1F2"
            strokeWidth="1.6"
            strokeLinecap="round"
            opacity="0.9"
          />
          {/* 리본 접힘 주름 디테일 */}
          <path
            d="M 80 72 C 84 74 88 74 94 71"
            stroke="#E11D48"
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.7"
          />
        </g>

        {/* [오른쪽 리본 꼬리 (り 2획 매칭)] */}
        <g id="right-streamer">
          {/* 유려하게 굽이쳐 흘러내리는 롱 리본 테일 (끝단 V자 피쉬테일 컷팅) */}
          <path
            d="M 118 45
               C 128 52 134 70 134 92
               C 134 116 124 130 108 138
               L 104 129
               L 95 127
               C 110 120 117 106 117 88
               C 117 70 113 55 106 45 Z"
            fill="url(#ri-ribbon-grad)"
            stroke="#BE123C"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {/* 곡선을 타고 흐르는 우아한 실크 광택 하이라이트 스트라이프 */}
          <path
            d="M 124 49
               C 126 70 126 92 122 112
               C 119 122 113 126 104 129"
            stroke="#FFF1F2"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.9"
          />
          {/* 리본 음영 입체 주름선 */}
          <path
            d="M 118 78 C 123 80 128 80 133 79"
            stroke="#9F1239"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.6"
          />
          <path
            d="M 115 102 C 119 104 123 104 127 103"
            stroke="#9F1239"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.6"
          />
        </g>

        {/* 4. 상단 풍성한 실크 리본 나비 매듭 (Big Satin Bow) - 상단에 화려하게 펼쳐지는 나비 루프 */}
        <g id="ribbon-bow">
          {/* 왼쪽 루프 (Left Wing) */}
          <path
            d="M 103 36
               C 94 16 58 14 44 26
               C 32 36 36 50 60 52
               C 80 54 98 44 103 39 Z"
            fill="url(#ri-ribbon-loop)"
            stroke="#BE123C"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          {/* 왼쪽 루프 안쪽 구멍 음영 (리본 볼륨 홀) */}
          <ellipse
            cx="60"
            cy="36"
            rx="9.5"
            ry="6.5"
            fill="url(#ri-ribbon-shadow)"
            transform="rotate(-12 60 36)"
          />
          {/* 왼쪽 루프 광택선 */}
          <path d="M 46 26 C 60 18 82 22 95 32" stroke="#FFF1F2" strokeWidth="2" strokeLinecap="round" />
          {/* 왼쪽 루프 주름 */}
          <path d="M 94 38 C 82 41 72 44 64 47" stroke="#BE123C" strokeWidth="1.2" strokeLinecap="round" />

          {/* 오른쪽 루프 (Right Wing) */}
          <path
            d="M 113 36
               C 122 16 158 14 172 26
               C 184 36 180 50 156 52
               C 136 54 118 44 113 39 Z"
            fill="url(#ri-ribbon-loop)"
            stroke="#BE123C"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          {/* 오른쪽 루프 안쪽 구멍 음영 */}
          <ellipse
            cx="156"
            cy="36"
            rx="9.5"
            ry="6.5"
            fill="url(#ri-ribbon-shadow)"
            transform="rotate(12 156 36)"
          />
          {/* 오른쪽 루프 광택선 */}
          <path d="M 170 26 C 156 18 134 22 121 32" stroke="#FFF1F2" strokeWidth="2" strokeLinecap="round" />
          {/* 오른쪽 루프 주름 */}
          <path d="M 122 38 C 134 41 144 44 152 47" stroke="#BE123C" strokeWidth="1.2" strokeLinecap="round" />

          {/* 중앙 매듭 코어 (Knot) */}
          <rect
            x="99"
            y="28"
            width="18"
            height="20"
            rx="5"
            fill="url(#ri-ribbon-knot)"
            stroke="#881337"
            strokeWidth="1.8"
          />
          {/* 매듭 주름선 & 하이라이트 */}
          <path d="M 104 29 C 103 36 103 42 104 47" stroke="#FFF1F2" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M 112 29 C 113 36 113 42 112 47" stroke="#9F1239" strokeWidth="1.4" strokeLinecap="round" />
        </g>

        {/* 5. 설레는 반짝이 스파클 (Gold Sparkles & Shimmers) */}
        <g id="sparkles">
          {/* 좌측 대형 4각 황금별 */}
          <path
            d="M 52 74 L 54 66 L 56 74 L 64 76 L 56 78 L 54 86 L 52 78 L 44 76 Z"
            fill="url(#ri-sparkle)"
          />
          {/* 좌측 미니 별 */}
          <path
            d="M 40 92 L 41.5 88 L 43 92 L 47 93.5 L 43 95 L 41.5 99 L 40 95 L 36 93.5 Z"
            fill="#FDE047"
          />
          {/* 우측 하단 황금별 */}
          <path
            d="M 160 114 L 161.5 109 L 163 114 L 168 115.5 L 163 117 L 161.5 122 L 160 117 L 155 115.5 Z"
            fill="url(#ri-sparkle)"
          />
          {/* 반짝이 도트들 */}
          <circle cx="68" cy="64" r="1.5" fill="#FDE047" />
          <circle cx="152" cy="100" r="1.5" fill="#FDE047" />
          <circle cx="168" cy="128" r="1.2" fill="#FDE047" />
        </g>

        {/* 글자 'り' 오버레이 */}
        <MnemonicCharOverlay char="り" fontFamily={fontFamily} x="108" y="118" />
      </svg>
    );
  }

  if (char === 'る') {
    // る: 캥거루 (서 있는 엄마 캥거루의 등뼈와 배주머니 속에 쏙 들어간 아기의 둥근 루프 고리!)
    // ⚠️ ろ(로켓: 루프 없음)와 결정적으로 구별되는 배주머니 속 둥근 아기 캥거루 루프 강조!
    return (
      <svg
        viewBox="0 0 200 160"
        className="w-full h-full select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* 엄마 캥거루 따뜻한 골든 카멜 그라디언트 */}
          <linearGradient id="kan-body" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FED7AA" />
            <stop offset="45%" stopColor="#FDBA74" />
            <stop offset="85%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>

          {/* 포근한 가슴 & 배 크림 그라디언트 */}
          <linearGradient id="kan-belly" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="60%" stopColor="#FFFBEB" />
            <stop offset="100%" stopColor="#FEF3C7" />
          </linearGradient>

          {/* 아기 캥거루 (조이) 그라디언트 */}
          <linearGradient id="kan-joey" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFEDD5" />
            <stop offset="50%" stopColor="#FED7AA" />
            <stop offset="100%" stopColor="#FDBA74" />
          </linearGradient>

          {/* 귓속 & 볼터치 살구 핑크 그라디언트 */}
          <linearGradient id="kan-inner-ear" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FECDD3" />
            <stop offset="100%" stopColor="#FDA4AF" />
          </linearGradient>

          {/* 배주머니 안쪽 음영 */}
          <linearGradient id="kan-pouch-shadow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#9A3412" />
            <stop offset="100%" stopColor="#7C2D12" />
          </linearGradient>
        </defs>

        {/* 1. 바닥 그림자 & 초원 잔디 풀잎 */}
        {/* 안정적인 타원 그림자 */}
        <ellipse cx="94" cy="141" rx="66" ry="7" fill="#E2E8F0" opacity="0.65" />

        {/* 꼬리 옆 풀잎 (좌측) */}
        <g id="grass-left">
          <path
            d="M 32 142 C 26 133 30 125 36 124 C 36 131 35 137 38 142"
            fill="#86EFAC"
            stroke="#16A34A"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
          <path
            d="M 38 142 C 41 130 47 126 51 128 C 48 134 44 139 42 142"
            fill="#BBF7D0"
            stroke="#16A34A"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </g>

        {/* 발 앞 풀잎 (우측) */}
        <g id="grass-right">
          <path
            d="M 146 142 C 143 133 148 127 153 125 C 151 132 149 138 150 142"
            fill="#86EFAC"
            stroke="#16A34A"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
          <circle cx="156" cy="126" r="2" fill="#FDE047" />
        </g>

        {/* 2. 캥거루의 시그니처: 굵고 튼튼한 꼬리 (바닥을 짚고 지탱하는 제3의 다리!) */}
        <g id="kangaroo-tail">
          {/* 꼬리 본체 (엉덩이에서 왼쪽 아래 바닥으로 묵직하게 뻗어나감) */}
          <path
            d="M 74 104
               C 56 112 40 123 30 133
               C 25 138 27 141 34 141
               C 46 141 62 133 80 124
               Z"
            fill="url(#kan-body)"
            stroke="#B45309"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {/* 꼬리 윗면 볼륨 하이라이트 */}
          <path
            d="M 68 108 C 52 116 38 126 33 134"
            stroke="#FFEDD5"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </g>

        {/* 3. 튼튼한 뒷다리와 길쭉한 캥거루 발 */}
        <g id="hind-leg">
          {/* 도톰하고 탄탄한 허벅지 근육 */}
          <path
            d="M 72 96
               C 62 106 64 122 72 130
               C 80 136 92 134 96 124
               C 100 114 96 100 86 96
               Z"
            fill="url(#kan-body)"
            stroke="#B45309"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          {/* 바닥을 딛는 길쭉한 발 (Long Kangaroo Foot) */}
          <path
            d="M 76 130
               L 76 138
               C 76 140 78 141 82 141
               L 118 141
               C 122 141 123 137 119 135
               L 92 126
               Z"
            fill="url(#kan-body)"
            stroke="#B45309"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          {/* 발가락 발톱 디테일 */}
          <line x1="112" y1="137" x2="118" y2="137" stroke="#78350F" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="110" y1="140" x2="117" y2="140" stroke="#78350F" strokeWidth="1.5" strokeLinecap="round" />
        </g>

        {/* 4. 엄마 캥거루 본체 실루엣 (머리, 쫑긋한 귀, 우아한 목, 등허리, 둥근 배) */}
        <g id="kangaroo-body">
          {/* 뒤쪽 쫑긋 귀 (왼쪽 귀) */}
          <path
            d="M 129 26 C 127 13 134 7 139 11 C 142 15 139 23 136 28 Z"
            fill="url(#kan-body)"
            stroke="#B45309"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M 131 23 C 130 15 134 11 137 14 C 139 17 137 22 135 25 Z"
            fill="url(#kan-inner-ear)"
          />

          {/* 앞쪽 쫑긋 귀 (오른쪽 메인 귀 - 크고 쫑긋한 캥거루 귀) */}
          <path
            d="M 139 25 C 142 9 150 5 155 10 C 158 15 153 25 147 30 Z"
            fill="url(#kan-body)"
            stroke="#B45309"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M 142 23 C 144 13 149 10 152 13 C 154 17 151 23 147 27 Z"
            fill="url(#kan-inner-ear)"
          />

          {/* 엄마 캥거루 머리~목~등~배 전신 외곽선 */}
          <path
            d="M 136 26
               C 142 27 150 31 155 37
               C 158 41 157 45 152 47
               C 144 50 138 54 136 64
               C 134 76 138 88 140 98
               C 142 110 132 124 116 126
               C 96 128 82 118 74 102
               C 80 82 96 62 116 46
               C 124 40 128 32 136 26 Z"
            fill="url(#kan-body)"
            stroke="#B45309"
            strokeWidth="2"
            strokeLinejoin="round"
          />

          {/* 등/어깨 라인 하이라이트 */}
          <path
            d="M 132 30 C 124 38 108 52 94 72 C 84 86 78 98 76 102"
            stroke="#FFEDD5"
            strokeWidth="1.8"
            strokeLinecap="round"
          />

          {/* 부드러운 머즐/턱 밑 크림 패치 */}
          <path
            d="M 145 38 C 150 40 154 41 154 44 C 151 47 146 48 140 50 C 138 45 141 40 145 38 Z"
            fill="url(#kan-belly)"
          />

          {/* 까만 삼각 코 */}
          <path
            d="M 154 39 C 156 38 158 39 158 41 C 158 43 155 44 153 43 Z"
            fill="#1C1917"
          />

          {/* 초롱초롱하고 순한 눈망울 */}
          <path d="M 140 31 C 143 29 146 30 148 32" stroke="#78350F" strokeWidth="1.2" strokeLinecap="round" />
          <ellipse cx="144" cy="35" rx="3.2" ry="3.8" fill="#1C1917" />
          <circle cx="145.2" cy="33.8" r="1.1" fill="#FFFFFF" />
          <line x1="147" y1="33" x2="149" y2="31" stroke="#1C1917" strokeWidth="1" strokeLinecap="round" />

          {/* 사랑스러운 복숭아빛 볼터치 */}
          <ellipse cx="143" cy="42" rx="4.5" ry="3" fill="#FDA4AF" opacity="0.85" />

          {/* 방긋 미소선 */}
          <path d="M 151 44 C 149 46 146 46 144 45" stroke="#78350F" strokeWidth="1" strokeLinecap="round" />
        </g>

        {/* 5. 포근한 크림색 가슴 & 배 영역 */}
        <g id="kangaroo-chest">
          <path
            d="M 136 64
               C 132 75 133 90 134 104
               C 134 116 124 125 110 125
               C 98 125 90 118 88 110
               C 92 98 102 85 114 74
               C 122 66 128 62 136 64 Z"
            fill="url(#kan-belly)"
            stroke="#FDBA74"
            strokeWidth="1.2"
          />
        </g>

        {/* 6. 가슴 앞에서 아기 주머니를 감싸 안는 앙증맞은 두 앞발 (손) */}
        <g id="front-paws">
          {/* 뒤쪽 앞발 */}
          <path
            d="M 128 66 C 132 66 136 70 135 76 C 134 78 131 79 128 77 C 126 75 126 70 128 66 Z"
            fill="#FDBA74"
            stroke="#B45309"
            strokeWidth="1.4"
          />
          {/* 앞쪽 앞발 */}
          <path
            d="M 134 68
               C 140 70 142 75 140 80
               C 138 83 133 83 131 80
               C 130 76 130 71 134 68 Z"
            fill="url(#kan-body)"
            stroke="#B45309"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <line x1="135" y1="81" x2="138" y2="79" stroke="#78350F" strokeWidth="1" strokeLinecap="round" />
        </g>

        {/* 7. ★★★ 배주머니(Pouch)와 아기 캥거루(Joey) - 글자 'る'의 둥근 루프와 1:1 완벽 일체화! ★★★ */}
        <g id="kangaroo-pouch-and-joey">
          {/* 배주머니 안쪽 깊은 그림자 공간 */}
          <path
            d="M 95 106 C 95 118 103 124 113 124 C 121 124 125 118 125 106 Z"
            fill="url(#kan-pouch-shadow)"
            opacity="0.3"
          />

          {/* 배주머니 속에서 고개를 빼꼼 내민 귀여운 아기 캥거루 (조이) */}
          {/* 아기 캥거루 머리 */}
          <ellipse
            cx="105"
            cy="107"
            rx="8"
            ry="7.5"
            fill="url(#kan-joey)"
            stroke="#B45309"
            strokeWidth="1.5"
          />

          {/* 아기 캥거루 쫑긋 귀 2개 (배주머니 밖으로 뿅 솟아남) */}
          {/* 아기 왼쪽 귀 */}
          <path
            d="M 99 102 L 95 91 C 94 88 98 88 100 91 L 102 102"
            fill="url(#kan-joey)"
            stroke="#B45309"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
          <path d="M 97 100 L 96 92 C 95 90 98 90 99 92 L 100 100" fill="url(#kan-inner-ear)" />

          {/* 아기 오른쪽 귀 */}
          <path
            d="M 107 102 L 111 90 C 112 87 116 88 115 91 L 111 102"
            fill="url(#kan-joey)"
            stroke="#B45309"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
          <path d="M 109 100 L 112 92 C 113 90 115 91 114 93 L 110 100" fill="url(#kan-inner-ear)" />

          {/* 아기 캥거루 똘망똘망한 눈망울 */}
          <circle cx="101.5" cy="106" r="1.3" fill="#1C1917" />
          <circle cx="102" cy="105.4" r="0.4" fill="#FFFFFF" />
          <circle cx="107.5" cy="106" r="1.3" fill="#1C1917" />
          <circle cx="108" cy="105.4" r="0.4" fill="#FFFFFF" />

          {/* 아기 캥거루 크림 머즐 & 까만 코 & 방긋 미소 */}
          <ellipse cx="104.5" cy="109" rx="3.2" ry="2" fill="#FEF3C7" />
          <polygon points="103.8,108 105.2,108 104.5,108.9" fill="#1C1917" />
          <path d="M 103.8 109.5 Q 104.5 110.3 105.2 109.5" stroke="#78350F" strokeWidth="0.7" strokeLinecap="round" />

          {/* 아기 캥거루 발그레 볼터치 */}
          <circle cx="100" cy="108" r="1.2" fill="#FDA4AF" opacity="0.85" />
          <circle cx="109" cy="108" r="1.2" fill="#FDA4AF" opacity="0.85" />

          {/* 배주머니 겉 포켓 라인 (엄마 배주머니 입구 테두리 - 루프와 1:1 완벽 정렬!) */}
          <path
            d="M 94 105
               C 94 118 102 126 114 126
               C 124 126 128 118 126 106"
            stroke="#B45309"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          {/* 주머니 입체 하이라이트 주름 */}
          <path
            d="M 96 108 C 102 115 116 115 122 108"
            stroke="#F59E0B"
            strokeWidth="1.4"
            strokeLinecap="round"
          />

          {/* 배주머니 가장자리를 꼭 잡은 아기의 앙증맞은 두 앞발 */}
          <ellipse cx="99" cy="112" rx="2.2" ry="1.5" fill="#FEF3C7" stroke="#B45309" strokeWidth="1" />
          <ellipse cx="110" cy="112" rx="2.2" ry="1.5" fill="#FEF3C7" stroke="#B45309" strokeWidth="1" />
        </g>

        {/* 8. 따뜻한 사랑 디테일 (아기 머리 위 미니 핑크 하트 & 햇살 스파클) */}
        <g id="decorations">
          {/* 미니 핑크 하트 */}
          <path
            d="M 116 88 C 114 85 111 87 114 91 C 117 87 114 85 116 88 Z"
            fill="#FB7185"
          />
          {/* 햇살 스파클 */}
          <path
            d="M 166 26 L 167.5 22 L 169 26 L 173 27.5 L 169 29 L 167.5 33 L 166 29 L 162 27.5 Z"
            fill="#FDE047"
          />
          <circle cx="174" cy="36" r="1.2" fill="#FDE047" />

          {/* 경쾌한 도약 모션 점선 */}
          <path
            d="M 62 122 C 56 124 52 128 50 132"
            stroke="#CBD5E1"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeDasharray="3 2"
          />
        </g>

        {/* 글자 'る' 오버레이 */}
        <MnemonicCharOverlay char="る" fontFamily={fontFamily} x="108" y="118" />
      </svg>
    );
  }

  if (char === 'れ') {
    // れ: 애벌레 (나뭇가지 기둥과 싱그러운 뽕잎 위를 꿈틀꿈틀 기어가며 아삭아삭 잎을 갉아먹는 귀여운 연두빛 애벌레!)
    // ⚠️ 글자 1획은 수직 나뭇가지 기둥, 2획은 등허리를 둥글게 치켜세우며 꿈틀거리는 통통한 애벌레의 마디마디 굴곡선 및 우측으로 삐친 머리·더듬이와 1:1 완벽 일체화!
    return (
      <svg
        viewBox="0 0 200 160"
        className="w-full h-full select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* 싱그러운 나뭇잎 그라디언트 */}
          <linearGradient id="leaf-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DCFCE7" />
            <stop offset="100%" stopColor="#86EFAC" />
          </linearGradient>

          {/* 애벌레 몸통 입체 그라디언트 (라임 그린) */}
          <linearGradient id="caterpillar-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#86EFAC" />
            <stop offset="60%" stopColor="#4ADE80" />
            <stop offset="100%" stopColor="#22C55E" />
          </linearGradient>

          {/* 애벌레 머리 그라디언트 (화사하고 밝은 애플그린) */}
          <linearGradient id="caterpillar-head" x1="20%" y1="10%" x2="80%" y2="90%">
            <stop offset="0%" stopColor="#BBF7D0" />
            <stop offset="70%" stopColor="#4ADE80" />
            <stop offset="100%" stopColor="#22C55E" />
          </linearGradient>

          {/* 나뭇가지 그라디언트 */}
          <linearGradient id="branch-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#A16207" />
            <stop offset="50%" stopColor="#CA8A04" />
            <stop offset="100%" stopColor="#854D0E" />
          </linearGradient>
        </defs>

        {/* 1. 배경: 부드러운 햇살 & 정원 분위기 */}
        <circle cx="165" cy="30" r="15" fill="#FEF08A" opacity="0.35" />

        {/* 2. 싱싱하고 커다란 나뭇잎 (애벌레가 올라타서 아삭아삭 갉아먹은 홈 자국이 선명한 잎사귀!) */}
        {/* 나뭇잎 그림자 */}
        <path
          d="M 68 85 C 95 62 142 60 176 86 C 162 120 115 130 68 112 Z"
          fill="#E2E8F0"
          opacity="0.3"
        />

        {/* 메인 나뭇잎 바디 (가장자리에 와삭와삭 갉아먹은 반원형 베어문 자국 3곳!) */}
        <path
          d="M 68 82 
             C 92 56 136 54 166 72
             C 163 78 166 84 172 86
             C 167 92 169 99 175 102
             C 158 126 108 128 68 108
             Z"
          fill="url(#leaf-grad)"
          stroke="#4ADE80"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />

        {/* 나뭇잎 섬세한 잎맥 (주 잎맥 & 곁 잎맥) */}
        <path
          d="M 68 86 C 105 84 138 90 168 90"
          stroke="#22C55E"
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity="0.7"
        />
        <path d="M 98 84 C 112 74 126 70 138 70" stroke="#22C55E" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
        <path d="M 116 86 C 130 96 144 102 154 104" stroke="#22C55E" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
        <path d="M 82 85 C 92 78 104 76 112 76" stroke="#22C55E" strokeWidth="1.1" strokeLinecap="round" opacity="0.4" />
        <path d="M 134 89 C 146 82 156 82 164 84" stroke="#22C55E" strokeWidth="1.1" strokeLinecap="round" opacity="0.4" />

        {/* 갉아먹은 잎가에 튄 작은 나뭇잎 부스러기들 */}
        <circle cx="176" cy="80" r="1.5" fill="#4ADE80" />
        <circle cx="178" cy="94" r="1.2" fill="#22C55E" />
        <circle cx="174" cy="108" r="1" fill="#86EFAC" />

        {/* 잎사귀 위 영롱한 아침 이슬방울 */}
        <ellipse cx="94" cy="106" rx="4" ry="3" fill="#FFFFFF" opacity="0.8" />
        <circle cx="93" cy="105" r="1.2" fill="#FFFFFF" />

        {/* 3. 나뭇가지 수직 기둥 (글자 れ 왼쪽 세로 획과 1:1 완벽 정렬!) */}
        {/* 튼튼한 원목 가지 기둥 */}
        <rect
          x="65"
          y="26"
          width="6.5"
          height="114"
          rx="3.2"
          fill="url(#branch-grad)"
          stroke="#78350F"
          strokeWidth="1.5"
        />
        {/* 나뭇가지 마디(나이테 라인) 디테일 */}
        <line x1="65" y1="48" x2="71.5" y2="48" stroke="#78350F" strokeWidth="1" strokeLinecap="round" />
        <line x1="65" y1="112" x2="71.5" y2="112" stroke="#78350F" strokeWidth="1" strokeLinecap="round" />

        {/* 나뭇가지에 돋아난 앙증맞은 어린 새싹 잎 2개 (왼쪽 공간 포인트) */}
        {/* 위쪽 새싹 */}
        <path
          d="M 65 42 C 54 40 48 46 48 52 C 55 54 62 48 65 45"
          fill="#86EFAC"
          stroke="#22C55E"
          strokeWidth="1.2"
        />
        <path d="M 64 43 C 58 46 54 49 50 51" stroke="#16A34A" strokeWidth="0.8" strokeLinecap="round" />
        {/* 아래쪽 새싹 */}
        <path
          d="M 65 120 C 56 122 52 128 54 134 C 60 133 64 127 65 123"
          fill="#BBF7D0"
          stroke="#22C55E"
          strokeWidth="1.2"
        />

        {/* 4. 주인공: 통통하고 귀여운 꿈틀꿈틀 애벌레 (Segmented Chubby Caterpillar) */}
        {/* 애벌레의 꼬물꼬물 아기 발들 (노란 젤리 발 - 나뭇잎을 야무지게 짚고 있음) */}
        <g id="caterpillar-legs">
          <ellipse cx="78" cy="99" rx="3.2" ry="2" fill="#FACC15" stroke="#CA8A04" strokeWidth="1" />
          <ellipse cx="92" cy="86" rx="3.2" ry="2" fill="#FACC15" stroke="#CA8A04" strokeWidth="1" />
          <ellipse cx="125" cy="84" rx="3.2" ry="2" fill="#FACC15" stroke="#CA8A04" strokeWidth="1" />
          {/* 머리 앞쪽 손발 (나뭇잎을 꼭 쥐고 먹는 앞발) */}
          <ellipse cx="142" cy="94" rx="3.5" ry="2.2" fill="#FACC15" stroke="#CA8A04" strokeWidth="1" />
          <ellipse cx="152" cy="94" rx="3.5" ry="2.2" fill="#FACC15" stroke="#CA8A04" strokeWidth="1" />
        </g>

        {/* 통통한 마디마디 몸통 (글자 れ 2획의 지그재그와 둥근 등허리 굴곡을 완벽 추종) */}
        {/* [마디 1] 꼬리 마디 (왼쪽 줄기에서 꿈틀 시작) */}
        <circle cx="78" cy="90" r="10" fill="url(#caterpillar-grad)" stroke="#15803D" strokeWidth="1.6" />
        <circle cx="76" cy="87" r="2" fill="#FEF08A" />

        {/* [마디 2] 등 올라가는 마디 */}
        <circle cx="92" cy="74" r="11.5" fill="url(#caterpillar-grad)" stroke="#15803D" strokeWidth="1.6" />
        <circle cx="90" cy="69" r="2.2" fill="#FEF08A" />

        {/* [마디 3] 꿈틀 치솟은 등허리 꼭대기 아치 정점! (글자 れ 상단 볼록 곡선) */}
        <circle cx="108" cy="58" r="13" fill="url(#caterpillar-grad)" stroke="#15803D" strokeWidth="1.6" />
        <circle cx="106" cy="52" r="2.5" fill="#FEF08A" />
        {/* 등허리 반짝임 하이라이트 */}
        <path d="M 102 50 C 106 48 111 49 114 52" stroke="#DCFCE7" strokeWidth="1.5" strokeLinecap="round" />

        {/* [마디 4] 내려오는 가슴 마디 */}
        <circle cx="128" cy="72" r="12.5" fill="url(#caterpillar-grad)" stroke="#15803D" strokeWidth="1.6" />
        <circle cx="127" cy="66" r="2.4" fill="#FEF08A" />

        {/* [마디 5] 커다랗고 사랑스러운 애벌레 머리 & 얼굴 (오른쪽 잎사귀를 향해 방긋!) */}
        <g id="caterpillar-head-group">
          {/* 머리 위 쫑긋 솟은 앙증맞은 더듬이 2개 (끝에 분홍 방울 팁!) */}
          {/* 왼쪽 더듬이 */}
          <path
            d="M 144 68 C 141 56 135 52 132 53"
            stroke="#15803D"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <circle cx="131" cy="53" r="3" fill="#F43F5E" stroke="#BE123C" strokeWidth="0.8" />
          <circle cx="130" cy="52" r="0.9" fill="#FFFFFF" />

          {/* 오른쪽 더듬이 */}
          <path
            d="M 151 67 C 153 55 161 52 164 54"
            stroke="#15803D"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <circle cx="165" cy="54" r="3" fill="#F43F5E" stroke="#BE123C" strokeWidth="0.8" />
          <circle cx="164" cy="53" r="0.9" fill="#FFFFFF" />

          {/* 둥글둥글 통통한 머리 구체 (표정과 볼살이 풍부하게 드러나는 메인 헤드) */}
          <circle
            cx="148"
            cy="80"
            r="14"
            fill="url(#caterpillar-head)"
            stroke="#15803D"
            strokeWidth="1.8"
          />

          {/* 똘망똘망 반짝이는 까만 두 눈 */}
          {/* 왼쪽 눈 */}
          <circle cx="144.5" cy="76.5" r="2.4" fill="#1C1917" />
          <circle cx="145.3" cy="75.7" r="0.8" fill="#FFFFFF" />
          {/* 오른쪽 눈 */}
          <circle cx="153.5" cy="77.5" r="2.4" fill="#1C1917" />
          <circle cx="154.3" cy="76.7" r="0.8" fill="#FFFFFF" />

          {/* 수줍고 사랑스러운 핑크빛 볼터치 */}
          <ellipse cx="141" cy="83" rx="3.2" ry="2" fill="#FDA4AF" opacity="0.85" />
          <ellipse cx="157" cy="84" rx="3.2" ry="2" fill="#FDA4AF" opacity="0.85" />

          {/* 냠냠 맛있게 방긋 웃는 귀여운 입 */}
          <path
            d="M 146.5 82.5 Q 149.5 87 152.5 82.5"
            stroke="#1C1917"
            strokeWidth="1.4"
            strokeLinecap="round"
            fill="#FB7185"
          />
        </g>

        {/* 5. 감성 디테일 (와삭와삭 행복한 콧노래 & 스파클) */}
        {/* 신난 음표 ♪ */}
        <path
          d="M 168 42 L 174 40 L 174 48 M 168 42 L 168 50"
          stroke="#8B5CF6"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
        <circle cx="166.5" cy="50" r="2" fill="#8B5CF6" />
        <circle cx="172.5" cy="48" r="2" fill="#8B5CF6" />

        {/* 반짝이 별빛 */}
        <path
          d="M 124 38 L 125 35 L 126 38 L 129 39 L 126 40 L 125 43 L 124 40 L 121 39 Z"
          fill="#FDE047"
        />

        {/* 꿈틀거리는 경쾌한 모션 라인 */}
        <path
          d="M 72 80 C 69 76 68 70 71 66"
          stroke="#94A3B8"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeDasharray="2 2"
        />

        {/* 글자 'れ' 오버레이 */}
        <MnemonicCharOverlay char="れ" fontFamily={fontFamily} x="108" y="118" />
      </svg>
    );
  }

  if (char === 'ろ') {
    // ろ: 로켓 (ろ의 상단 획 전체를 감싸는 당당한 우주 로켓 본체와 둥글게 뿜어내는 추진 화염 궤적!)
    // ⚠️ 사용자 피드백 반영: 상단 가로선과 사선 획 전체가 로켓의 뾰족한 노즈콘, 듬직한 메인 동체, 델타 날개와 1:1 완벽 일치!
    // ⚠️ る(캥거루: 동그란 루프 있음)와 확실히 다르게 하단에 루프 없이 시원하게 트인 불꽃 연기 궤적 강조!
    return (
      <svg
        viewBox="0 0 200 160"
        className="w-full h-full select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* 로켓 본체 메탈릭 실버화이트 그라디언트 (풍성한 입체 원통감) */}
          <linearGradient id="ro-body" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E2E8F0" />
            <stop offset="25%" stopColor="#FFFFFF" />
            <stop offset="70%" stopColor="#F1F5F9" />
            <stop offset="100%" stopColor="#CBD5E1" />
          </linearGradient>

          {/* 로켓 노즈콘 & 날개 선명한 루비 레드 그라디언트 */}
          <linearGradient id="ro-red" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FB7185" />
            <stop offset="40%" stopColor="#E11D48" />
            <stop offset="100%" stopColor="#9F1239" />
          </linearGradient>

          {/* 우주선 전망창 사파이어 블루 그라디언트 */}
          <linearGradient id="ro-window" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#BAE6FD" />
            <stop offset="35%" stopColor="#38BDF8" />
            <stop offset="80%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#0369A1" />
          </linearGradient>

          {/* 화염 외곽 그라디언트 (타오르는 네온 오렌지-레드) */}
          <linearGradient id="ro-flame-outer" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F97316" />
            <stop offset="50%" stopColor="#EF4444" />
            <stop offset="100%" stopColor="#DC2626" />
          </linearGradient>

          {/* 화염 중심 코어 그라디언트 (눈부신 레몬 옐로우-화이트) */}
          <linearGradient id="ro-flame-inner" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="35%" stopColor="#FEF08A" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>

          {/* 배기 연기 구름 부드러운 그라디언트 */}
          <linearGradient id="ro-smoke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#E2E8F0" />
          </linearGradient>

          {/* 황금별 그라디언트 */}
          <linearGradient id="ro-star" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFBEB" />
            <stop offset="50%" stopColor="#FDE047" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>

          {/* 토성 미니 행성 그라디언트 */}
          <linearGradient id="ro-planet" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DDD6FE" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>

        {/* 1. 배경: 신비로운 우주 분위기 (토성, 반짝이는 별, 속도선) */}
        {/* 미니 토성 (우측 상단) */}
        <g id="mini-planet">
          <ellipse cx="168" cy="32" rx="8.5" ry="8.5" fill="url(#ro-planet)" />
          {/* 토성 고리 */}
          <ellipse
            cx="168"
            cy="32"
            rx="15"
            ry="4.5"
            fill="none"
            stroke="#C4B5FD"
            strokeWidth="1.8"
            transform="rotate(-22 168 32)"
            strokeLinecap="round"
          />
        </g>

        {/* 미니 초승달 (좌측 상단) */}
        <path
          d="M 40 32 C 40 40 46 46 54 46 C 48 46 44 42 44 36 C 44 32 45 29 47 26 C 42 27 40 29 40 32 Z"
          fill="#FDE047"
          opacity="0.8"
        />

        {/* 반짝이는 4각 황금별들 */}
        {/* 좌측 중간 별 */}
        <path
          d="M 50 76 L 52 69 L 54 76 L 61 78 L 54 80 L 52 87 L 50 80 L 43 78 Z"
          fill="url(#ro-star)"
        />
        {/* 우측 중간 미니 별 */}
        <path
          d="M 164 80 L 165.5 76 L 167 80 L 171 81.5 L 167 83 L 165.5 87 L 164 83 L 160 81.5 Z"
          fill="url(#ro-star)"
        />
        {/* 상단 작은 별 */}
        <path
          d="M 100 20 L 101 17 L 102 20 L 105 21 L 102 22 L 101 25 L 100 22 L 97 21 Z"
          fill="#FDE047"
        />
        {/* 미니 별가루 도트들 */}
        <circle cx="36" cy="62" r="1.3" fill="#FDE047" />
        <circle cx="178" cy="62" r="1.3" fill="#FDE047" />
        <circle cx="152" cy="136" r="1.5" fill="#FDE047" />
        <circle cx="46" cy="116" r="1.2" fill="#CBD5E1" />

        {/* 2. 글자 ろ 상단 가로 획 매칭 가이드라인: 대기권 돌파 음속 스피드 궤적선 */}
        <line x1="64" y1="44" x2="132" y2="44" stroke="#93C5FD" strokeWidth="2.5" strokeDasharray="5 3" strokeLinecap="round" opacity="0.85" />
        <line x1="72" y1="38" x2="116" y2="38" stroke="#BAE6FD" strokeWidth="1.4" strokeLinecap="round" opacity="0.7" />
        <line x1="80" y1="50" x2="124" y2="50" stroke="#BAE6FD" strokeWidth="1.4" strokeLinecap="round" opacity="0.7" />

        {/* 3. ★★★ 글자 ろ 하단 둥근 곡선 매칭 (82, 86 -> 146, 110 -> 88, 134): 추진 화염 및 배기 궤적 ★★★ */}
        {/* ⚠️ る(캥거루)의 닫힌 루프와 달리, 끝단(88, 134)이 꼬이지 않고 시원하게 열려 뒤로 빠지는 형태! */}
        <g id="rocket-flames">
          {/* 외곽 추진 화염 리본 (풍성하고 역동적인 오렌지-레드 화염) */}
          <path
            d="M 82 86
               C 104 84 148 90 148 114
               C 148 132 122 140 88 134
               C 80 132 80 125 86 123
               C 114 126 134 118 134 108
               C 134 96 98 94 82 86 Z"
            fill="url(#ro-flame-outer)"
            stroke="#EA580C"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />

          {/* 내부 코어 화염 (눈부신 황금빛-화이트) */}
          <path
            d="M 83 86
               C 100 86 140 92 140 111
               C 140 124 118 131 94 128
               C 89 126 91 122 96 121
               C 118 121 129 115 128 107
               C 127 97 96 93 83 86 Z"
            fill="url(#ro-flame-inner)"
          />

          {/* 중앙 화염 광택 스트로크 라인 */}
          <path
            d="M 84 87 C 104 89 138 97 138 112 C 138 126 116 131 92 128"
            stroke="#FEF08A"
            strokeWidth="2.2"
            strokeLinecap="round"
            opacity="0.9"
          />

          {/* 화염 끝단 흩어지는 몽글몽글 배기 연기 구름 (루프 없음! 시원하게 개방된 마감) */}
          <ellipse cx="88" cy="133" rx="7.5" ry="6" fill="url(#ro-smoke)" stroke="#CBD5E1" strokeWidth="1" />
          <ellipse cx="77" cy="131" rx="6" ry="4.8" fill="url(#ro-smoke)" stroke="#CBD5E1" strokeWidth="0.9" />
          <ellipse cx="68" cy="134" rx="4.5" ry="3.5" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="0.8" />

          {/* 추진 스파크 불꽃 파편들 */}
          <circle cx="145" cy="128" r="2.4" fill="#F59E0B" />
          <circle cx="151" cy="117" r="1.8" fill="#EF4444" />
          <circle cx="114" cy="138" r="2" fill="#FDE047" />
          <circle cx="60" cy="133" r="1.4" fill="#94A3B8" />
        </g>

        {/* 4. ★★★ 글자 ろ 윗부분 전체 매칭: 당당하고 거대한 우주 로켓 본체! ★★★ */}
        {/* 로켓 본체 그룹 (중심: 104, 65 / 각도: 46도 -> 사선 획 및 상단 가로선과 1:1 완벽 정렬!) */}
        <g transform="translate(104, 65) rotate(46)">
          {/* [1] 좌측 거대 델타 날개 (Big Delta Wing - 글자 ろ의 상단 가로선 76~128과 완벽 일체화!) */}
          <path
            d="M -13 -6
               L -35 8
               C -35 8 -30 16 -13 20
               Z"
            fill="url(#ro-red)"
            stroke="#881337"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          {/* 델타 날개 상단 엣지 하이라이트 (글자 ろ의 상단 가로선 궤적을 밝혀줌) */}
          <path d="M -13 -4 L -33 8" stroke="#FECDD3" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="-13" y1="8" x2="-26" y2="12" stroke="#9F1239" strokeWidth="1.2" strokeLinecap="round" />

          {/* [2] 우측 보조 날개 (Right Wing) */}
          <path
            d="M 13 -6
               L 28 14
               C 28 14 24 18 13 20
               Z"
            fill="url(#ro-red)"
            stroke="#881337"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          {/* 우측 날개 하이라이트 */}
          <path d="M 13 -4 L 26 13" stroke="#FECDD3" strokeWidth="1.4" strokeLinecap="round" />

          {/* [3] 엔진 추진 노즐 (Thruster Nozzle: 글자 ろ의 사선 끝 82, 86에 정확히 장착) */}
          <path
            d="M -9 22 L 9 22 L 12 30 L -12 30 Z"
            fill="#334155"
            stroke="#0F172A"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {/* 노즐 입구 작열하는 오렌지 글로우 */}
          <ellipse cx="0" cy="30" rx="10" ry="3.2" fill="#F97316" stroke="#EA580C" strokeWidth="1" />

          {/* [4] 로켓 메인 듬직한 유선형 원통 동체 (글자 ろ 사선 획을 통째로 품음) */}
          <path
            d="M -13 22
               L -13 -6
               C -13 -18 0 -25 0 -25
               C 0 -25 13 -18 13 -6
               L 13 22
               Z"
            fill="url(#ro-body)"
            stroke="#475569"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />

          {/* 동체 좌측 부드러운 원통형 하이라이트 반사광선 */}
          <path d="M -8 -12 L -8 18" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />

          {/* 동체 하단 레드 & 옐로우 레이싱 스트라이프 밴드 */}
          <rect x="-13" y="14" width="26" height="3.5" fill="#E11D48" />
          <rect x="-13" y="17.5" width="26" height="1.8" fill="#FBBF24" />

          {/* [5] 선단부 뾰족한 로열 레드 노즈콘 (Nose Cone: 글자 ろ 상단 꼭짓점 130, 42를 돌파!) */}
          <path
            d="M -12 -18
               C -8 -30 0 -42 0 -42
               C 0 -42 8 -30 12 -18
               C 6 -16 -6 -16 -12 -18
               Z"
            fill="url(#ro-red)"
            stroke="#881337"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          {/* 노즈콘 입체 광택선 */}
          <path d="M 0 -38 C 3 -28 6 -22 6 -18" stroke="#FECDD3" strokeWidth="1.5" strokeLinecap="round" />

          {/* [6] 중앙 크고 영롱한 우주선 전망창 (Porthole with Chrome Bezel) */}
          <circle cx="0" cy="-3" r="8" fill="#E2E8F0" stroke="#475569" strokeWidth="1.4" />
          <circle cx="0" cy="-3" r="6.2" fill="url(#ro-window)" />
          {/* 전망창 유리 반사광 */}
          <path d="M -3.5 -5.5 A 4.5 4.5 0 0 1 3.5 -5.5" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" fill="none" />
          <circle cx="2.5" cy="-1" r="1.1" fill="#FFFFFF" />

          {/* [7] 중앙 수직 안정핀 (Dorsal Fin) */}
          <rect x="-1.2" y="4" width="2.4" height="15" rx="1.2" fill="#BE123C" />
        </g>

        {/* 5. 우상단 비행 모션 스피드 대시선 (우주로 솟구치는 추진 방향) */}
        <line x1="140" y1="32" x2="156" y2="18" stroke="#FDE047" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3" />
        <line x1="148" y1="44" x2="160" y2="33" stroke="#FDE047" strokeWidth="1.5" strokeLinecap="round" />

        {/* 글자 'ろ' 오버레이 */}
        <MnemonicCharOverlay char="ろ" fontFamily={fontFamily} x="108" y="118" />
      </svg>
    );
  }

  return null;
}
