import { MnemonicSvgChildProps } from './types';
import MnemonicCharOverlay from './MnemonicCharOverlay';

export default function MnemonicRowSa({ char, fontFamily }: MnemonicSvgChildProps) {
  if (char === 'さ') {
    // さ: 사과 (꼭지와 연초록 잎사귀, 오른쪽으로 감기는 사과의 둥근 볼)
    // ⚠️ ち(치약, 왼쪽으로 감김)와 명확히 반대 방향인 오른쪽 만곡선 강조!
    return (
      <svg
        viewBox="0 0 200 160"
        className="w-full h-full select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 사과 몸체 은은한 실루엣 */}
        <path
          d="M 104 46 C 138 46 156 74 156 102 C 156 132 128 138 104 136 C 80 138 52 132 52 102 C 52 74 70 46 104 46 Z"
          fill="#FFF1F2"
          opacity="0.6"
          stroke="#FECDD3"
          strokeWidth="1.5"
        />

        {/* 사과 꼭지 나뭇가지 */}
        <path
          d="M 104 46 C 104 32 114 26 118 24"
          stroke="#78716C"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* 사과 나뭇잎 (포인트 컬러: 연초록) */}
        <path
          d="M 106 36 C 120 30 134 34 136 44 C 122 46 112 42 106 36 Z"
          fill="#86EFAC"
          stroke="#16A34A"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />

        {/* 사과 우측 둥근 볼 라인 (글자 さ의 하단 획과 완벽 조화: 오른쪽으로 둥글게 열림) */}
        <path
          d="M 88 94 C 98 126 142 126 148 98"
          stroke="#F43F5E"
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        {/* 사과 광택 하이라이트 */}
        <path
          d="M 66 84 C 64 96 70 108 76 114"
          stroke="#FDA4AF"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* 글자 'さ' 오버레이 */}
        <MnemonicCharOverlay char="さ" fontFamily={fontFamily} x="108" y="120" />
      </svg>
    );
  }

  if (char === 'し') {
    // し: 낚시 (낚싯줄에서 내려와 둥글게 굽은 낚싯바늘 끝에 펄떡이는 물고기가 걸린 모습!)
    // ⚠️ 글자 'し' 자체가 완벽한 낚싯바늘(Fish hook)의 곡선을 이룸
    return (
      <svg
        viewBox="0 0 200 160"
        className="w-full h-full select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 잔잔한 수면 물결선 (하단 배경) */}
        <path
          d="M 40 138 C 65 135 75 141 100 138 C 125 135 135 141 160 138"
          stroke="#E0F2FE"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M 60 146 C 80 144 90 148 110 146 C 130 144 140 148 150 146"
          stroke="#BAE6FD"
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        {/* 상단 낚싯줄 (위에서 팽팽하게 내려오는 라인) */}
        <line
          x1="88"
          y1="8"
          x2="88"
          y2="38"
          stroke="#94A3B8"
          strokeWidth="1.8"
          strokeDasharray="4 3"
        />

        {/* 낚싯줄에 달린 앙증맞은 찌 (오렌지/화이트 낚시 찌) */}
        <circle cx="88" cy="22" r="6" fill="#F97316" stroke="#EA580C" strokeWidth="1.2" />
        <path
          d="M 82 22 A 6 6 0 0 0 94 22 Z"
          fill="#FFFFFF"
          stroke="#EA580C"
          strokeWidth="1"
        />
        <circle cx="88" cy="16" r="1.5" fill="#334155" />

        {/* 낚싯바늘 상단 고리 (바늘 귀, Eyelet) */}
        <circle
          cx="88"
          cy="38"
          r="4.5"
          fill="#F1F5F9"
          stroke="#64748B"
          strokeWidth="2"
        />
        <circle cx="88" cy="38" r="1.8" fill="#FFFFFF" />

        {/* 낚싯바늘 은빛 바디 섀도우 (글자 し 뒤편을 은은하게 받쳐주어 메탈 바늘 입체감 부여) */}
        <path
          d="M 88 42 L 88 92 C 88 126 132 126 142 102"
          stroke="#CBD5E1"
          strokeWidth="8"
          strokeLinecap="round"
          opacity="0.6"
        />

        {/* 낚싯바늘 끝 날카로운 미늘 (Barb) - 글자 し 끝단(142, 102)과 맞물림 */}
        <path
          d="M 142 102 L 146 95 L 140 97"
          stroke="#64748B"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 바늘 끝에 걸려 펄떡 솟아오르는 귀여운 물고기 */}
        <g transform="rotate(-25 152 108)">
          {/* 물고기 꼬리지느러미 */}
          <path
            d="M 172 108 L 184 100 C 182 108 182 108 184 116 Z"
            fill="#38BDF8"
            stroke="#0284C7"
            strokeWidth="1.2"
          />

          {/* 물고기 몸통 */}
          <path
            d="M 144 108 C 148 98 164 96 174 108 C 164 120 148 118 144 108 Z"
            fill="#60A5FA"
            stroke="#2563EB"
            strokeWidth="1.5"
          />

          {/* 물고기 아가미 라인 */}
          <path
            d="M 152 102 C 154 105 154 111 152 114"
            stroke="#93C5FD"
            strokeWidth="1.2"
            strokeLinecap="round"
          />

          {/* 물고기 등지느러미 */}
          <path
            d="M 156 100 C 160 95 166 96 168 101"
            fill="#93C5FD"
            stroke="#2563EB"
            strokeWidth="1"
          />

          {/* 물고기 눈 */}
          <circle cx="149" cy="105" r="2.2" fill="#FFFFFF" />
          <circle cx="148.5" cy="105" r="1.2" fill="#0F172A" />
        </g>

        {/* 튀어오르는 물방울 (Splash) */}
        <circle cx="132" cy="84" r="2.5" fill="#38BDF8" />
        <circle cx="144" cy="74" r="3.5" fill="#7DD3FC" stroke="#0284C7" strokeWidth="1" />
        <circle cx="158" cy="80" r="2" fill="#38BDF8" />
        <circle cx="166" cy="92" r="1.5" fill="#BAE6FD" />

        {/* 글자 'し' 오버레이 */}
        <MnemonicCharOverlay char="し" fontFamily={fontFamily} x="108" y="118" />
      </svg>
    );
  }

  if (char === 'す') {
    // す: 스프링 (수직 기둥에서 둥근 링 루프로 꼬여 튕겨나가는 용수철)
    return (
      <svg
        viewBox="0 0 200 160"
        className="w-full h-full select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 상단 스프링 고정대 */}
        <rect
          x="88"
          y="28"
          width="24"
          height="8"
          rx="2"
          fill="#E7E5E4"
          stroke="#78716C"
          strokeWidth="1.5"
        />

        {/* 탄성 스프링 루프 궤적 (글자 す의 둥근 고리와 매칭) */}
        <path
          d="M 100 36 L 100 78 C 100 86 114 96 114 86 C 114 74 86 74 86 88 C 86 104 102 120 106 132"
          stroke="#D6D3D1"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 스프링 루프 강조 링 (연파랑 포인트) */}
        <circle
          cx="100"
          cy="85"
          r="12"
          fill="#E0F2FE"
          stroke="#38BDF8"
          strokeWidth="1.8"
        />

        {/* 튕김 탄성 모션 효과선 */}
        <path
          d="M 126 78 Q 134 85 126 92"
          stroke="#60A5FA"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M 132 74 Q 142 85 132 96"
          stroke="#93C5FD"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* 글자 'す' 오버레이 */}
        <MnemonicCharOverlay char="す" fontFamily={fontFamily} x="106" y="120" />
      </svg>
    );
  }

  if (char === 'せ') {
    // せ: 세면대 (아치형 거울, 둥근 세라믹 볼과 크롬 수전, 비누 받침대가 놓인 세면대)
    // ⚠️ 글자 'せ'의 가로선은 세면대 상판, 세로선들은 수전 및 레버, 하단 굽은 곡선은 세면볼과 절묘하게 매칭!
    return (
      <svg
        viewBox="0 0 200 160"
        className="w-full h-full select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 상단 욕실 아치형 거울 (은은한 스카이 배경) */}
        <rect
          x="72"
          y="14"
          width="68"
          height="64"
          rx="34"
          fill="#F0F9FF"
          stroke="#BAE6FD"
          strokeWidth="1.5"
        />
        {/* 거울 광택 하이라이트 사선 */}
        <path
          d="M 96 22 L 86 42"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M 104 22 L 98 34"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* 세면대 도자기 볼 본체 (하단 라운드) */}
        <path
          d="M 46 84 C 46 130 166 130 166 84 Z"
          fill="#F8FAFC"
          stroke="#CBD5E1"
          strokeWidth="2"
        />
        {/* 세면볼 내부 찰랑이는 맑은 물 */}
        <path
          d="M 58 92 C 58 124 154 124 154 92 Z"
          fill="#E0F2FE"
          opacity="0.8"
        />
        {/* 세면대 상판 테두리 림 (Rim) 타원 */}
        <ellipse
          cx="106"
          cy="84"
          rx="60"
          ry="12"
          fill="#FFFFFF"
          stroke="#94A3B8"
          strokeWidth="2"
        />

        {/* 세면대 배수구 구멍 (Drain) */}
        <ellipse
          cx="106"
          cy="118"
          rx="7"
          ry="3"
          fill="#94A3B8"
          stroke="#64748B"
          strokeWidth="1.2"
        />
        <ellipse cx="106" cy="118" rx="3.5" ry="1.5" fill="#475569" />

        {/* 크롬 수도꼭지 (수전 본체: 구스넥 아치 파이프) */}
        <path
          d="M 98 84 L 98 46 C 98 34 116 34 116 46 L 116 54"
          stroke="#64748B"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        {/* 수전 입구 노즐 링 */}
        <rect
          x="112"
          y="54"
          width="8"
          height="3"
          rx="1"
          fill="#475569"
        />

        {/* 온/냉수 조절 손잡이 레버 (글자 せ의 오른쪽 세로획 뒤) */}
        <path
          d="M 126 80 L 126 56"
          stroke="#64748B"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <circle cx="126" cy="54" r="2.5" fill="#94A3B8" stroke="#64748B" strokeWidth="1" />

        {/* 수도꼭지에서 쫄쫄 흘러나오는 맑은 물줄기 */}
        <path
          d="M 116 58 L 116 94"
          stroke="#38BDF8"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeDasharray="5 3"
        />
        {/* 세면대 물에 떨어져 튀는 물방울 */}
        <circle cx="116" cy="98" r="2.5" fill="#60A5FA" />
        <circle cx="124" cy="93" r="1.8" fill="#38BDF8" />
        <circle cx="108" cy="95" r="1.8" fill="#93C5FD" />

        {/* 세면대 우측 사이드: 비누 받침대와 핑크 비누 */}
        <ellipse
          cx="152"
          cy="82"
          rx="11"
          ry="4.5"
          fill="#E2E8F0"
          stroke="#94A3B8"
          strokeWidth="1.2"
        />
        <rect
          x="145"
          y="76"
          width="14"
          height="7"
          rx="3.5"
          fill="#FDA4AF"
          stroke="#F43F5E"
          strokeWidth="1"
        />
        {/* 비누 거품 몽글 방울 */}
        <circle cx="160" cy="74" r="2" fill="#FFFFFF" stroke="#93C5FD" strokeWidth="0.8" />
        <circle cx="163" cy="78" r="1.4" fill="#FFFFFF" stroke="#93C5FD" strokeWidth="0.8" />

        {/* 글자 'せ' 오버레이 */}
        <MnemonicCharOverlay char="せ" fontFamily={fontFamily} x="106" y="120" />
      </svg>
    );
  }

  if (char === 'そ') {
    // そ: 소라 (위에서 아래로 꼬불꼬불 나사처럼 회전하며 층층이 감겨 내려오는 나사고둥!)
    // ⚠️ 글자 'そ'의 지그재그 꺾임(──, ／, ──)과 하단 둥근 곡선(︶)이 나사산(Screw Thread)의 회전 마디와 1:1 완벽 일치!
    return (
      <svg
        viewBox="0 0 200 160"
        className="w-full h-full select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* 나사 소라 메인 바디 부드러운 크림 & 웜 골드 그라디언트 */}
          <linearGradient id="so-screw-body" x1="10%" y1="10%" x2="90%" y2="90%">
            <stop offset="0%" stopColor="#FFFDF7" />
            <stop offset="25%" stopColor="#FEF3C7" />
            <stop offset="65%" stopColor="#FDE68A" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>

          {/* 꼭대기 팁 하이라이트 그라디언트 */}
          <linearGradient id="so-screw-tip" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#FEF9C3" />
            <stop offset="100%" stopColor="#FDE68A" />
          </linearGradient>

          {/* 소라 입구 (Aperture) 살구빛 진주광택 그라디언트 */}
          <radialGradient id="so-screw-aperture" cx="42%" cy="40%" r="58%">
            <stop offset="0%" stopColor="#FFF1F2" />
            <stop offset="35%" stopColor="#FFE4E6" />
            <stop offset="75%" stopColor="#FECDD3" />
            <stop offset="100%" stopColor="#FB7185" />
          </radialGradient>

          {/* 소라 입구 테두리 (Lip) 코랄 오렌지 그라디언트 */}
          <linearGradient id="so-screw-lip" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFEDD5" />
            <stop offset="50%" stopColor="#FDBA74" />
            <stop offset="100%" stopColor="#EA580C" />
          </linearGradient>

          {/* 신비로운 진주 구슬 입체 그라디언트 */}
          <radialGradient id="so-screw-pearl" cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="45%" stopColor="#FDF2F8" />
            <stop offset="80%" stopColor="#E0E7FF" />
            <stop offset="100%" stopColor="#C7D2FE" />
          </radialGradient>

          {/* 귀여운 아기 불가사리 그라디언트 */}
          <linearGradient id="so-screw-star" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDA4AF" />
            <stop offset="100%" stopColor="#F43F5E" />
          </linearGradient>

          {/* 맑고 투명한 바닷물 방울 그라디언트 */}
          <radialGradient id="so-screw-drop" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#E0F2FE" />
            <stop offset="60%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#0284C7" />
          </radialGradient>
        </defs>

        {/* 1. 바닷가 모래사장 베이스 언덕 & 부드러운 그림자 */}
        <ellipse cx="106" cy="140" rx="66" ry="7.5" fill="#E2E8F0" opacity="0.55" />
        <path
          d="M 30 142 C 65 136 145 137 178 143"
          stroke="#FDE68A"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M 54 148 C 82 144 128 145 154 148"
          stroke="#FEF08A"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* 
          2. 꼬불꼬불 나사 모양 소라 (Screw Shell) 층계별 나선 구조
          - 꼭대기부터 아래로 점점 커지며 나사산처럼 꼬여 내려오는 4단 회전 링
        */}

        {/* 꼭대기 나사 뾰족 팁 (Apex Tip) */}
        <path
          d="M 112 12
             C 117 12 122 15 120 22
             C 116 26 106 26 102 22
             C 102 16 107 12 112 12 Z"
          fill="url(#so-screw-tip)"
          stroke="#78716C"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M 112 13 C 114 16 113 19 110 21"
          stroke="#D97706"
          strokeWidth="1.3"
          strokeLinecap="round"
        />

        {/* 1단 나사 링 (글자 상단 가로선 획과 싱크로: x: 84~134, y: 22~42) */}
        <path
          d="M 98 22
             C 106 20 126 20 134 25
             C 142 30 142 38 136 42
             C 126 48 94 46 84 40
             C 80 34 86 26 98 22 Z"
          fill="url(#so-screw-body)"
          stroke="#78716C"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        {/* 1단 나사산 홈 라인 */}
        <path
          d="M 86 38 C 104 44 124 44 136 38"
          stroke="#D97706"
          strokeWidth="1.6"
          strokeLinecap="round"
        />

        {/* 2단 나사 링 (글자의 대각선 꺾임과 싱크로: 134에서 72로 비스듬히 감김) */}
        <path
          d="M 84 40
             C 96 46 130 44 142 48
             C 152 54 150 64 140 70
             C 126 76 80 72 70 66
             C 64 58 72 48 84 40 Z"
          fill="url(#so-screw-body)"
          stroke="#78716C"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        {/* 2단 나사산 홈 라인 */}
        <path
          d="M 72 64 C 92 72 126 72 142 66"
          stroke="#D97706"
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        {/* 3단 나사 링 (글자의 중간 가로선 획과 싱크로: 72에서 130으로 감겨 나감) */}
        <path
          d="M 70 66
             C 84 72 130 70 146 76
             C 160 84 158 96 146 104
             C 130 112 70 108 58 98
             C 50 88 58 76 70 66 Z"
          fill="url(#so-screw-body)"
          stroke="#78716C"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        {/* 3단 나사산 홈 라인 */}
        <path
          d="M 60 96 C 82 106 128 106 148 98"
          stroke="#D97706"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* 4단 메인 체층 (글자의 하단 둥근 C곡선과 싱크로: 130에서 둥글게 돌아 입구로 이어짐) */}
        <path
          d="M 58 98
             C 72 110 126 108 148 104
             C 162 112 158 128 142 134
             C 122 140 74 138 56 124
             C 46 114 50 104 58 98 Z"
          fill="url(#so-screw-body)"
          stroke="#78716C"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />

        {/* 3. 나사산 회전 늑골 세로선 (Screw Ribs & Grooves) */}
        {/* 1단 나사선 결 */}
        <path d="M 94 24 C 92 32 90 38 88 42" stroke="#FBBF24" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M 112 24 C 110 32 108 38 106 42" stroke="#FBBF24" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M 126 26 C 124 34 122 40 120 44" stroke="#FBBF24" strokeWidth="1.3" strokeLinecap="round" />

        {/* 2단 나사선 결 */}
        <path d="M 80 44 C 76 54 74 62 72 68" stroke="#FBBF24" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M 102 46 C 98 56 96 64 94 70" stroke="#FBBF24" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M 124 48 C 120 58 118 66 116 72" stroke="#FBBF24" strokeWidth="1.4" strokeLinecap="round" />

        {/* 3단 나사선 결 */}
        <path d="M 68 72 C 64 82 62 92 60 98" stroke="#FBBF24" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M 92 74 C 88 84 86 94 84 102" stroke="#FBBF24" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M 118 76 C 114 86 112 96 110 104" stroke="#FBBF24" strokeWidth="1.4" strokeLinecap="round" />

        {/* 4. 소라의 둥근 입구 (Aperture) - 글자 そ 하단 C곡선 안쪽에 착 안착 */}
        <path
          d="M 96 104
             C 112 98 140 100 146 114
             C 150 126 134 138 110 138
             C 90 138 84 124 90 114
             C 92 110 94 106 96 104 Z"
          fill="url(#so-screw-aperture)"
          stroke="url(#so-screw-lip)"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />

        {/* 입구 안쪽으로 빨려들어가는 부드러운 소용돌이 음영 */}
        <path
          d="M 114 106
             C 124 106 136 112 134 122
             C 132 128 122 132 112 130
             C 104 128 106 118 112 114
             C 116 112 120 114 118 118"
          stroke="#E11D48"
          strokeWidth="1.4"
          strokeLinecap="round"
          fill="none"
          opacity="0.5"
        />

        {/* 입구 안쪽의 신비로운 하얀 진주 (Pearl) 알 포인트 */}
        <circle cx="118" cy="118" r="4.8" fill="url(#so-screw-pearl)" stroke="#C7D2FE" strokeWidth="0.8" />
        <circle cx="116.5" cy="116.5" r="1.5" fill="#FFFFFF" />

        {/* 5. 좌하단 귀여운 아기 불가사리 (Pink Starfish) */}
        <g transform="translate(40, 120)">
          <path
            d="M 10 0
               L 13 6 L 19 7 L 14 12 L 16 18
               L 10 14 L 4 18 L 6 12 L 1 7
               L 7 6 Z"
            fill="url(#so-screw-star)"
            stroke="#BE123C"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          {/* 불가사리 똘망한 눈망울 & 미소 */}
          <circle cx="8.5" cy="8.5" r="0.9" fill="#1C1917" />
          <circle cx="11.5" cy="8.5" r="0.9" fill="#1C1917" />
          <path
            d="M 9.2 10.5 Q 10 11.5 10.8 10.5"
            stroke="#BE123C"
            strokeWidth="0.8"
            strokeLinecap="round"
          />
          {/* 발그레 볼터치 */}
          <circle cx="7" cy="9.8" r="0.8" fill="#FFFFFF" opacity="0.8" />
          <circle cx="13" cy="9.8" r="0.8" fill="#FFFFFF" opacity="0.8" />
        </g>

        {/* 6. 맑고 청량한 바닷물 방울 & 반짝이 스파클 */}
        <circle cx="166" cy="116" r="3" fill="url(#so-screw-drop)" stroke="#0284C7" strokeWidth="0.8" />
        <circle cx="165" cy="114.8" r="0.9" fill="#FFFFFF" />
        <circle cx="174" cy="126" r="2" fill="#7DD3FC" />
        <circle cx="158" cy="130" r="1.5" fill="#BAE6FD" />

        {/* 햇살 반짝이 별 (Sparkle) */}
        <path
          d="M 152 40 L 154 35 L 156 40 L 161 42 L 156 44 L 154 49 L 152 44 L 147 42 Z"
          fill="#FBBF24"
        />
        <circle cx="74" cy="138" r="1.5" fill="#FCD34D" />
        <circle cx="140" cy="142" r="1.2" fill="#FCD34D" />

        {/* 글자 'そ' 오버레이 */}
        <MnemonicCharOverlay char="そ" fontFamily={fontFamily} x="108" y="118" />
      </svg>
    );
  }

  return null;
}
