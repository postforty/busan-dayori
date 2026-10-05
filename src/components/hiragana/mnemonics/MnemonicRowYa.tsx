import { MnemonicSvgChildProps } from './types';
import MnemonicCharOverlay from './MnemonicCharOverlay';

export default function MnemonicRowYa({ char, fontFamily }: MnemonicSvgChildProps) {
  if (char === 'や') {
    // や: 야구 (홈런을 향해 시원하게 배트를 휘두르는 타자와 날아가는 실밥 선명한 야구공!)
    // ⚠️ 1획은 타자의 호쾌한 풀스윙 회전 궤적(바람 아크),
    //    2획은 헬멧 챙 & 번쩍이는 타격 불꽃 스파크,
    //    3획은 시원하게 내리꽂히는 원목 야구 배트(배럴-그립-노브)와 1:1 완벽 일치!
    return (
      <svg
        viewBox="0 0 200 160"
        className="w-full h-full select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* 야구장 잔디 그라디언트 */}
          <linearGradient id="ya-grass" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#15803D" />
            <stop offset="50%" stopColor="#22C55E" />
            <stop offset="100%" stopColor="#16A34A" />
          </linearGradient>

          {/* 타석 내야 클레이 흙 그라디언트 */}
          <linearGradient id="ya-dirt" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F5D0A9" />
            <stop offset="100%" stopColor="#C2884A" />
          </linearGradient>

          {/* 원목 야구 배트 그라디언트 */}
          <linearGradient id="ya-bat" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="45%" stopColor="#F59E0B" />
            <stop offset="85%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#92400E" />
          </linearGradient>

          {/* 야구공 입체 쉐이딩 그라디언트 */}
          <radialGradient id="ya-ball" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="70%" stopColor="#F8FAFC" />
            <stop offset="100%" stopColor="#CBD5E1" />
          </radialGradient>

          {/* 타자 헬멧 블루 그라디언트 */}
          <linearGradient id="ya-helmet" x1="20%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="50%" stopColor="#1D4ED8" />
            <stop offset="100%" stopColor="#1E3A8A" />
          </linearGradient>

          {/* 스윙 바람 아크 그라디언트 */}
          <linearGradient id="ya-swing" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.85" />
            <stop offset="60%" stopColor="#60A5FA" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#93C5FD" stopOpacity="0.08" />
          </linearGradient>
        </defs>

        {/* 1. 배경: 야구장 그라운드 (푸른 외야 잔디 & 타석 흙 & 홈플레이트) */}
        {/* 외야 잔디 */}
        <path
          d="M 0 134 C 40 128 100 124 200 132 L 200 160 L 0 160 Z"
          fill="url(#ya-grass)"
        />
        {/* 잔디 스트라이프 라인 */}
        <path d="M 15 132 L 40 160 M 75 128 L 100 160 M 135 127 L 160 160" stroke="#166534" strokeWidth="3" opacity="0.35" />

        {/* 내야 타석(배터스 박스) 흙 마운드 */}
        <ellipse cx="102" cy="146" rx="68" ry="14" fill="url(#ya-dirt)" opacity="0.9" />

        {/* 배터스 박스 백선 라인 */}
        <path
          d="M 46 142 C 70 138 134 138 158 142"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeDasharray="6 3"
          strokeLinecap="round"
        />

        {/* 홈플레이트 (오각형 베이스) */}
        <polygon
          points="94,148 110,148 115,153 102,157 89,153"
          fill="#FFFFFF"
          stroke="#94A3B8"
          strokeWidth="1.2"
        />

        {/* 2. 호쾌한 풀스윙 궤적 (Swing Motion Arc) - 글자 や의 1획 루프와 일치 */}
        {/* 굵고 역동적인 스윙 잔상 리본 */}
        <path
          d="M 54 84 C 74 48 126 44 142 68 C 152 86 140 120 114 134"
          stroke="url(#ya-swing)"
          strokeWidth="11"
          strokeLinecap="round"
        />
        {/* 청량한 블루/화이트 스피드 라인 */}
        <path
          d="M 58 86 C 76 54 124 50 138 72 C 146 88 136 116 114 130"
          stroke="#38BDF8"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        <path
          d="M 66 94 C 82 66 118 62 130 80 C 136 94 128 114 112 124"
          stroke="#FFFFFF"
          strokeWidth="1.8"
          strokeDasharray="8 5"
          strokeLinecap="round"
        />

        {/* 3. 타자 (Batter) 실루엣 - 헬멧 & 챙 & 유니폼 */}
        {/* 타자 어깨/등 유니폼 실루엣 */}
        <path
          d="M 64 68 C 70 54 82 50 94 52 C 98 56 100 66 96 76 C 88 82 72 82 64 68 Z"
          fill="#F8FAFC"
          stroke="#64748B"
          strokeWidth="1.6"
        />
        {/* 유니폼 핀스트라이프 */}
        <path d="M 76 56 L 76 74 M 86 54 L 86 76" stroke="#1D4ED8" strokeWidth="1.2" opacity="0.6" />

        {/* 타자 프로 헬멧 (입체감 있는 블루 헬멧) */}
        {/* 헬멧 메인 돔 */}
        <circle cx="86" cy="40" r="14" fill="url(#ya-helmet)" stroke="#1E3A8A" strokeWidth="1.8" />
        {/* 헬멧 광택 하이라이트 */}
        <path d="M 78 34 C 82 30 92 30 96 34" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" />
        {/* 헬멧 앞 챙 (글자 や의 2획 삐침과 매칭되는 날렵한 챙) */}
        <path
          d="M 76 39 L 60 41 C 58 41 62 45 74 44 Z"
          fill="#1D4ED8"
          stroke="#1E3A8A"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        {/* 헬멧 귀덮개 (Ear flap) */}
        <path
          d="M 84 44 C 84 50 88 52 92 50 C 94 48 94 44 92 42 Z"
          fill="#1E3A8A"
          stroke="#1D4ED8"
          strokeWidth="1"
        />
        {/* 헬멧 전면 화이트 스타/로고 마크 */}
        <circle cx="75" cy="38" r="2.5" fill="#FFFFFF" />

        {/* 4. 야구 배트 (Baseball Bat) - 글자 や의 3획 메인 사선과 완벽 일체화! */}
        <g id="baseball-bat">
          {/* 배트 두툼한 타격부 (배럴) - 상단 헤드 */}
          <path
            d="M 78 34 L 86 38 L 106 96 L 100 98 Z"
            fill="url(#ya-bat)"
            stroke="#78350F"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          {/* 배트 헤드 둥근 캡 */}
          <ellipse cx="82" cy="36" rx="4.8" ry="2.6" fill="#FDE68A" stroke="#78350F" strokeWidth="1.5" transform="rotate(24 82 36)" />
          {/* 배트 나뭇결 광택 라인 */}
          <path d="M 83 42 L 102 96" stroke="#FEF3C7" strokeWidth="1.2" strokeLinecap="round" opacity="0.85" />

          {/* 배트 중앙 골드 엠블럼 링 */}
          <ellipse cx="94" cy="70" rx="3.6" ry="1.8" fill="#FDE047" stroke="#B45309" strokeWidth="0.8" transform="rotate(24 94 70)" />

          {/* 배트 손잡이(핸들) & 화이트 배팅 그립 테이프 (지그재그 랩) */}
          <path
            d="M 103 97 L 111 122 L 107 124 L 99 99 Z"
            fill="#FFFFFF"
            stroke="#64748B"
            strokeWidth="1.6"
          />
          {/* 그립 테이프 감은선 */}
          <path d="M 101 103 L 106 105 M 103 109 L 108 111 M 105 115 L 110 117" stroke="#94A3B8" strokeWidth="1.2" strokeLinecap="round" />

          {/* 배트 끝 노브 (Knob) */}
          <ellipse cx="110" cy="123" rx="3.5" ry="2" fill="#78350F" stroke="#451A03" strokeWidth="1.4" transform="rotate(24 110 123)" />

          {/* 배트를 쥐고 있는 타자의 배팅 장갑 (레드 & 화이트 포인트 배팅 글러브) */}
          <ellipse cx="104" cy="106" rx="4.5" ry="3.5" fill="#EF4444" stroke="#991B1B" strokeWidth="1.2" />
          <ellipse cx="107" cy="114" rx="4.5" ry="3.5" fill="#DC2626" stroke="#991B1B" strokeWidth="1.2" />
        </g>

        {/* 5. 타격 임팩트 (CRACK!) 폭발 스파크 & 펑 터지는 충격파 */}
        {/* 타격 충격파 링 */}
        <ellipse cx="132" cy="46" rx="14" ry="7" fill="none" stroke="#FDE047" strokeWidth="1.8" opacity="0.85" transform="rotate(-20 132 46)" />
        {/* 화려한 타격 스파크 별 (Star-burst) */}
        <path
          d="M 132 34 L 135 43 L 144 42 L 137 48 L 142 56 L 133 51 L 126 57 L 129 48 L 121 44 L 130 43 Z"
          fill="#FEF08A"
          stroke="#F59E0B"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        {/* 번쩍이는 광선 파편들 */}
        <path d="M 120 32 L 114 26 M 146 32 L 152 26 M 124 60 L 118 66" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />

        {/* 6. 특대형 시그니처 야구공 (Baseball) - 우측 상단 홈런 타구! */}
        <g id="baseball">
          {/* 야구공 회전 및 비행 스피드 라인 (홈런 타구 속도감) */}
          <path d="M 166 40 L 186 36 M 168 48 L 192 48 M 165 56 L 184 60" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" opacity="0.85" />
          <path d="M 167 44 L 182 42 M 167 52 L 185 54" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />

          {/* 야구공 본체 (크고 입체적인 구형) */}
          <circle cx="150" cy="48" r="14" fill="url(#ya-ball)" stroke="#334155" strokeWidth="1.8" />

          {/* ★ 야구공의 영혼: 선명한 레드 실밥 (Stitches) ★ */}
          {/* 왼쪽 붉은 심(Seam) 곡선 */}
          <path
            d="M 143 36 C 147 42 147 54 143 60"
            stroke="#DC2626"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          {/* 왼쪽 실밥 V자 자수 스티치들 */}
          <path d="M 141 38 L 144 40 L 141 42" stroke="#DC2626" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 143 44 L 146 46 L 143 48" stroke="#DC2626" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 143 50 L 146 52 L 143 54" stroke="#DC2626" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 141 56 L 144 57 L 141 59" stroke="#DC2626" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />

          {/* 오른쪽 붉은 심(Seam) 곡선 */}
          <path
            d="M 157 36 C 153 42 153 54 157 60"
            stroke="#DC2626"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          {/* 오른쪽 실밥 V자 자수 스티치들 */}
          <path d="M 159 38 L 156 40 L 159 42" stroke="#DC2626" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 157 44 L 154 46 L 157 48" stroke="#DC2626" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 157 50 L 154 52 L 157 54" stroke="#DC2626" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 159 56 L 156 57 L 159 59" stroke="#DC2626" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />

          {/* 야구공 광택 하이라이트 */}
          <circle cx="146" cy="42" r="2.5" fill="#FFFFFF" opacity="0.9" />
        </g>

        {/* 7. 글자 'や' 오버레이 */}
        <MnemonicCharOverlay char="や" fontFamily={fontFamily} x="108" y="118" />
      </svg>
    );
  }

  if (char === 'ゆ') {
    // ゆ: 유도 (도복 깃을 맞잡고 상대를 공중으로 들어 메치는 회전축)
    return (
      <svg
        viewBox="0 0 200 160"
        className="w-full h-full select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 공중으로 상대를 넘기는 둥근 메치기 회전 궤적 (글자 ゆ의 둥근 바디) */}
        <path
          d="M 68 56 L 68 104 C 68 132 144 132 144 98 C 144 74 104 68 84 84"
          stroke="#D6D3D1"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 유도 도복 깃 V라인 */}
        <path
          d="M 56 68 L 74 84 L 92 68"
          stroke="#78716C"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* 블랙 유도 띠 (포인트 컬러) */}
        <rect
          x="58"
          y="88"
          width="32"
          height="7"
          rx="2"
          fill="#1C1917"
        />
        <path d="M 72 95 L 68 112 M 76 95 L 80 114" stroke="#1C1917" strokeWidth="2.5" strokeLinecap="round" />

        {/* 매트 위 쿵 떨어지는 다이나믹 충격선 */}
        <path
          d="M 126 126 L 138 134 M 146 116 L 158 122"
          stroke="#F59E0B"
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        {/* 글자 'ゆ' 오버레이 */}
        <MnemonicCharOverlay char="ゆ" fontFamily={fontFamily} x="108" y="118" />
      </svg>
    );
  }

  if (char === 'よ') {
    // よ: 요트 (바람을 머금은 삼각 돛과 둥근 선체 라인)
    return (
      <svg
        viewBox="0 0 200 160"
        className="w-full h-full select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 요트 돛대 마스트 수직 기둥 (글자 よ 수직선 매칭) */}
        <path
          d="M 100 28 L 100 126"
          stroke="#78716C"
          strokeWidth="2.2"
          strokeLinecap="round"
        />

        {/* 삼각 돛 실루엣 (글자 よ 상단 가로 획 및 돛 공간) */}
        <path
          d="M 64 54 L 100 36 L 100 86 Z"
          fill="#E0F2FE"
          stroke="#38BDF8"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* 돛대 꼭대기 오렌지 삼각 깃발 (포인트 컬러) */}
        <path
          d="M 100 28 L 118 34 L 100 40 Z"
          fill="#FB923C"
          stroke="#EA580C"
          strokeWidth="1.2"
        />

        {/* 둥근 선체(배) 바닥 라인 (글자 よ의 하단 둥근 고리) */}
        <path
          d="M 100 88 C 76 88 74 118 98 120 C 122 120 122 96 100 96"
          stroke="#D6D3D1"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* 푸른 바다 물결 라인 */}
        <path
          d="M 44 130 C 64 126 84 134 104 130 C 124 126 144 134 164 130"
          stroke="#60A5FA"
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        {/* 글자 'よ' 오버레이 */}
        <MnemonicCharOverlay char="よ" fontFamily={fontFamily} x="108" y="118" />
      </svg>
    );
  }

  return null;
}
