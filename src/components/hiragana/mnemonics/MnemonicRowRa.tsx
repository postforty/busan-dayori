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
    // る: 캥거루 (등뼈와 배주머니 속에 쏙 들어간 아기의 둥근 루프)
    // ⚠️ ろ(롤러스케이트: 루프 없음)와 결정적으로 구별되는 배주머니 속 둥근 아기 루프 고리 강조!
    return (
      <svg
        viewBox="0 0 200 160"
        className="w-full h-full select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 캥거루 귀 & 머리 실루엣 (상단 꺾임 획) */}
        <path
          d="M 76 46 L 132 46 C 114 62 82 82 82 98 C 82 124 136 126 136 104"
          stroke="#D6D3D1"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 캥거루 쫑긋 귀 2개 */}
        <path d="M 130 46 L 138 28 L 144 44" fill="#FEF3C7" stroke="#78716C" strokeWidth="1.4" />
        <path d="M 134 46 L 142 32" stroke="#D97706" strokeWidth="1.2" />

        {/* 캥거루 눈 */}
        <circle cx="128" cy="52" r="1.8" fill="#1C1917" />

        {/* る의 핵심: 배주머니 속에 쏙 들어간 귀여운 아기 캥거루 (둥근 루프 고리, 포인트 베이지) */}
        <circle
          cx="134"
          cy="104"
          r="10"
          fill="#FEF3C7"
          stroke="#D97706"
          strokeWidth="1.8"
        />
        {/* 아기 캥거루 앙증맞은 귀 & 눈 */}
        <path d="M 136 96 L 140 88 M 140 96 L 144 90" stroke="#D97706" strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="132" cy="103" r="1.3" fill="#1C1917" />
        <circle cx="138" cy="103" r="1.3" fill="#1C1917" />

        {/* 튼튼한 캥거루 꼬리 받침 */}
        <path
          d="M 78 116 C 62 118 52 130 48 136"
          stroke="#78716C"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* 글자 'る' 오버레이 */}
        <MnemonicCharOverlay char="る" fontFamily={fontFamily} x="108" y="118" />
      </svg>
    );
  }

  if (char === 'れ') {
    // れ: 애벌레 (나뭇잎 위를 꿈틀꿈틀 기어가는 애벌레의 마디마디 굴곡선)
    return (
      <svg
        viewBox="0 0 200 160"
        className="w-full h-full select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 애벌레가 기어가는 나뭇가지 수직 기둥 (글자 れ 왼쪽 수직선 매칭) */}
        <path
          d="M 68 34 L 68 128"
          stroke="#78716C"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* 싱싱한 연두색 뽕잎 실루엣 */}
        <path
          d="M 70 82 C 114 62 152 74 164 102 C 146 114 108 118 70 108"
          fill="#DCFCE7"
          stroke="#86EFAC"
          strokeWidth="1.5"
        />

        {/* 꿈틀거리는 애벌레 몸통 마디들 (글자 れ 오른쪽 굴곡과 삐침) */}
        <circle cx="94" cy="74" r="10" fill="#FFFFFF" stroke="#78716C" strokeWidth="1.5" />
        <circle cx="112" cy="80" r="10" fill="#FFFFFF" stroke="#78716C" strokeWidth="1.5" />
        <circle cx="130" cy="88" r="9" fill="#FFFFFF" stroke="#78716C" strokeWidth="1.5" />

        {/* 애벌레 얼굴, 더듬이 & 발그레한 볼 (포인트 연홍색) */}
        <circle cx="91" cy="72" r="1.5" fill="#1C1917" />
        <ellipse cx="92" cy="77" rx="2.5" ry="1.8" fill="#FDA4AF" />
        <path d="M 88 66 Q 84 56 78 58" stroke="#78716C" strokeWidth="1.3" strokeLinecap="round" />

        {/* 나뭇잎 갉아먹은 귀여운 홈 */}
        <circle cx="158" cy="94" r="5" fill="#FFFFFF" />

        {/* 글자 'れ' 오버레이 */}
        <MnemonicCharOverlay char="れ" fontFamily={fontFamily} x="108" y="118" />
      </svg>
    );
  }

  if (char === 'ろ') {
    // ろ: 롤러스케이트 (바퀴 2개가 달린 차체 프레임, 고리 없이 시원한 꺾임)
    // ⚠️ る(캥거루: 고리 있음)와 확실히 다르게 하단에 루프가 전혀 없는 깔끔한 마감선 강조!
    return (
      <svg
        viewBox="0 0 200 160"
        className="w-full h-full select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 롤러스케이트 부츠 외곽선 (글자 ろ와 동일한 상단 꺾임 궤적) */}
        <path
          d="M 76 46 L 132 46 C 114 62 82 82 82 98 C 82 122 138 124 146 112"
          stroke="#D6D3D1"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 스케이트 하단 플레이트 바닥선 */}
        <line x1="72" y1="116" x2="148" y2="116" stroke="#78716C" strokeWidth="3" strokeLinecap="round" />

        {/* 롤러스케이트 앞뒤 바퀴 2개 (포인트 스카이블루 휠) */}
        {/* 앞바퀴 */}
        <circle cx="88" cy="130" r="10" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2" />
        <circle cx="88" cy="130" r="3.5" fill="#38BDF8" />

        {/* 뒷바퀴 */}
        <circle cx="132" cy="130" r="10" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2" />
        <circle cx="132" cy="130" r="3.5" fill="#38BDF8" />

        {/* 스케이트 쌩쌩 질주 속도선 */}
        <line x1="50" y1="126" x2="68" y2="126" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" />
        <line x1="56" y1="134" x2="72" y2="134" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" />

        {/* 글자 'ろ' 오버레이 */}
        <MnemonicCharOverlay char="ろ" fontFamily={fontFamily} x="108" y="118" />
      </svg>
    );
  }

  return null;
}
