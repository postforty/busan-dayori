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
    // そ: 소라 (나선형 뾰족 꼭지와 지그재그 층, 둥근 입구를 가진 바다 뿔소라!)
    // ⚠️ 글자 'そ'의 Z자 상단과 둥근 하단 곡선이 소라고둥의 나선형 껍데기와 완벽 매칭
    return (
      <svg
        viewBox="0 0 200 160"
        className="w-full h-full select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 바닷가 모래사장 베이스 (은은한 웜베이지) */}
        <path
          d="M 40 136 C 70 132 130 134 165 138"
          stroke="#FDE68A"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* 앙증맞은 미니 불가사리 (좌측 하단 포인트) */}
        <path
          d="M 48 126 L 50 120 L 53 126 L 59 126 L 54 130 L 56 136 L 51 132 L 46 136 L 48 130 L 43 126 Z"
          fill="#FDA4AF"
          stroke="#F43F5E"
          strokeWidth="1"
          strokeLinejoin="round"
        />

        {/* 소라 껍데기 전체 몸체 볼륨 (부드러운 크림 아이보리) */}
        <path
          d="M 124 24 
             C 130 20 136 28 132 34 
             L 142 46 C 146 52 144 58 138 62 
             L 152 76 C 158 84 156 94 148 104 
             C 142 124 116 134 86 132 
             C 62 130 54 110 58 92 
             C 62 76 74 62 88 52 
             L 104 36 
             Z"
          fill="#FFFDF7"
          stroke="#D97706"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* 소라의 지그재그 나선형 층계 라인 (글자 そ의 Z 모양 궤적과 매칭) */}
        {/* 꼭대기 1단 나선 */}
        <path
          d="M 104 36 C 114 38 124 38 132 34"
          stroke="#D97706"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        {/* 2단 나선 */}
        <path
          d="M 88 52 C 104 56 124 56 138 62"
          stroke="#D97706"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        {/* 3단 메인 바디 나선 (글자 중간 가로선 위치) */}
        <path
          d="M 72 78 C 96 82 128 78 152 76"
          stroke="#D97706"
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        {/* 뿔소라의 귀여운 뾰족 돌기들 (소라의 특징적 디테일) */}
        <path d="M 68 66 L 58 64 L 66 74 Z" fill="#FEF3C7" stroke="#D97706" strokeWidth="1.5" />
        <path d="M 58 90 L 48 90 L 58 98 Z" fill="#FEF3C7" stroke="#D97706" strokeWidth="1.5" />
        <path d="M 148 60 L 158 58 L 152 68 Z" fill="#FEF3C7" stroke="#D97706" strokeWidth="1.5" />

        {/* 소라 껍데기 세로 늑골 무늬 (골짜기 라인) */}
        <path
          d="M 116 28 C 112 38 108 46 102 54"
          stroke="#FBBF24"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path
          d="M 128 44 C 122 54 116 66 112 78"
          stroke="#FBBF24"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path
          d="M 76 86 C 80 102 88 116 98 126"
          stroke="#FBBF24"
          strokeWidth="1.4"
          strokeLinecap="round"
        />

        {/* 소라의 둥근 입구 (Aperture: 글자 そ 하단 C곡선 안쪽 살구/피치빛) */}
        <ellipse
          cx="114"
          cy="114"
          rx="26"
          ry="15"
          fill="#FFEDD5"
          stroke="#EA580C"
          strokeWidth="2"
        />
        {/* 입구 안쪽 깊은 소용돌이 음영 */}
        <ellipse
          cx="112"
          cy="114"
          rx="17"
          ry="9"
          fill="#FED7AA"
        />
        <ellipse
          cx="110"
          cy="114"
          rx="9"
          ry="5"
          fill="#FDBA74"
        />

        {/* 맑은 바닷물 방울 / 모래알 반짝임 */}
        <circle cx="162" cy="116" r="2.5" fill="#38BDF8" />
        <circle cx="170" cy="126" r="1.8" fill="#67E8F9" />
        <circle cx="70" cy="132" r="1.5" fill="#FCD34D" />

        {/* 글자 'そ' 오버레이 */}
        <MnemonicCharOverlay char="そ" fontFamily={fontFamily} x="108" y="118" />
      </svg>
    );
  }

  return null;
}
