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
    // ゆ: 유도 (도복 깃을 맞잡고 상대를 공중으로 번쩍 들어 메치는 시원한 업어치기 한판!)
    // ⚠️ 1획 왼쪽 기둥: 백색 도복에 검은 띠를 동여매고 축을 지탱하는 유도 선수,
    //    1획 회전 루프: 공중에 붕 떠서 거꾸로 휙 날아가는 청색 도복의 상대 선수 & 회전 바람 궤적,
    //    2획 수직 직선: 상대를 매트로 쾅! 메다꽂는 시원한 수직 축과 다다미 매트 바닥 충격파와 1:1 완벽 일치!
    return (
      <svg
        viewBox="0 0 200 160"
        className="w-full h-full select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* 유도 경기장 다다미 그린 매트 그라디언트 */}
          <linearGradient id="yu-tatami" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#15803D" />
            <stop offset="50%" stopColor="#16A34A" />
            <stop offset="100%" stopColor="#15803D" />
          </linearGradient>

          {/* 백색 유도복 입체 쉐이딩 그라디언트 */}
          <linearGradient id="yu-white-gi" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="60%" stopColor="#F1F5F9" />
            <stop offset="100%" stopColor="#CBD5E1" />
          </linearGradient>

          {/* 청색 유도복 (상대 선수) 로열 블루 그라디언트 */}
          <linearGradient id="yu-blue-gi" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="40%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>

          {/* 청색 유도복 짙은 음영 그라디언트 */}
          <linearGradient id="yu-blue-gi-dark" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#1E3A8A" />
          </linearGradient>

          {/* 유단자 블랙 벨트 (검은 띠) 그라디언트 */}
          <linearGradient id="yu-black-belt" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="50%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>

          {/* 업어치기 회전 바람 아크 그라디언트 */}
          <linearGradient id="yu-throw-arc" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.85" />
            <stop offset="60%" stopColor="#60A5FA" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#93C5FD" stopOpacity="0.08" />
          </linearGradient>
        </defs>

        {/* 1. 배경: 유도 경기장 (공식 다다미 매트 & 위험 경계 적색선) */}
        {/* 다다미 매트 베이스 */}
        <path
          d="M 0 134 C 40 130 160 130 200 134 L 200 160 L 0 160 Z"
          fill="url(#yu-tatami)"
        />
        {/* 다다미 돗자리 질감 격자선 */}
        <path
          d="M 20 135 L 35 160 M 60 133 L 75 160 M 100 132 L 115 160 M 140 133 L 155 160 M 180 135 L 195 160"
          stroke="#14532D"
          strokeWidth="1.2"
          opacity="0.4"
        />
        {/* 유도 경기장 안전/위험 경계선 (레드 존 라인) */}
        <path
          d="M 0 135 C 50 131 150 131 200 135"
          stroke="#DC2626"
          strokeWidth="2.5"
          opacity="0.85"
        />

        {/* 2. 업어치기 회전 바람 궤적 (글자 ゆ의 1획 둥근 바디와 일치) */}
        <path
          d="M 66 102 C 64 128 136 134 144 98 C 150 70 124 50 96 56 C 80 60 72 74 74 88"
          stroke="url(#yu-throw-arc)"
          strokeWidth="11"
          strokeLinecap="round"
        />
        <path
          d="M 68 104 C 68 126 134 130 142 96 C 146 72 124 54 98 60"
          stroke="#38BDF8"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
        <path
          d="M 72 108 C 76 122 130 126 138 94 C 142 74 122 58 102 64"
          stroke="#FFFFFF"
          strokeWidth="1.8"
          strokeDasharray="7 4"
          strokeLinecap="round"
        />

        {/* 3. 공중으로 날아가는 상대 선수 (청색 도복 Blue Gi - 유도 올림픽 공식 대결!) */}
        <g id="judo-blue-opponent">
          {/* 휘날리는 도복 바지 (양 다리 공중 회전) */}
          <path
            d="M 134 52 C 148 46 162 50 168 58 C 164 64 152 66 138 62 Z"
            fill="url(#yu-blue-gi-dark)"
            stroke="#1E3A8A"
            strokeWidth="1.6"
          />
          <path
            d="M 132 58 C 144 64 154 74 156 84 C 150 86 142 80 134 72 Z"
            fill="url(#yu-blue-gi)"
            stroke="#1E3A8A"
            strokeWidth="1.6"
          />
          {/* 공중에 뜬 상대 선수의 양 발 (맨발 투혼) */}
          <ellipse cx="170" cy="59" rx="4" ry="2.4" fill="#FED7AA" stroke="#9A3412" strokeWidth="1" transform="rotate(-15 170 59)" />
          <ellipse cx="158" cy="85" rx="3.5" ry="2.4" fill="#FED7AA" stroke="#9A3412" strokeWidth="1" transform="rotate(30 158 85)" />

          {/* 공중에서 거꾸로 넘겨지는 청색 도복 상체 */}
          <path
            d="M 88 56 C 102 44 124 42 136 50 C 142 56 140 68 134 76 C 122 82 102 78 88 66 Z"
            fill="url(#yu-blue-gi)"
            stroke="#1E3A8A"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          {/* 청색 도복 빳빳한 옷깃 라인 */}
          <path d="M 94 58 L 110 52 M 98 64 L 114 58" stroke="#93C5FD" strokeWidth="1.5" strokeLinecap="round" />

          {/* 상대 선수의 흩날리는 검은 띠 */}
          <path
            d="M 116 68 C 126 78 128 92 124 100"
            stroke="#0F172A"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </g>

        {/* 4. 메치는 유도 선수 (Tori - 백색 도복 & 검은 띠, 'ゆ' 1획 왼쪽 기둥) */}
        <g id="judo-white-player">
          {/* 듬직한 머리와 결의에 찬 눈매 */}
          <circle cx="75" cy="38" r="9.5" fill="#FED7AA" stroke="#78350F" strokeWidth="1.5" />
          {/* 검은 숏컷 스포츠 머리 */}
          <path
            d="M 67 38 C 67 29 73 27 82 29 C 85 33 85 37 84 39 C 80 33 72 33 67 38 Z"
            fill="#1E293B"
          />
          {/* 기합 넣는 날카로운 눈썹과 눈 */}
          <path d="M 75 38 L 81 37" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" />
          {/* 흩뿌려지는 열정의 땀방울 */}
          <circle cx="65" cy="34" r="1.6" fill="#38BDF8" />
          <circle cx="90" cy="35" r="1.2" fill="#BAE6FD" />

          {/* 탄탄한 백색 유도복 상체 (등으로 업어 매치는 묵직한 실루엣) */}
          <path
            d="M 58 52 C 70 46 84 46 90 54 C 94 68 91 92 87 112 C 84 126 78 134 68 134 C 58 134 54 122 54 104 C 54 82 54 64 58 52 Z"
            fill="url(#yu-white-gi)"
            stroke="#475569"
            strokeWidth="2"
            strokeLinejoin="round"
          />

          {/* ★ 유도 도복의 핵심: 두툼한 옷깃 (V자 라펠 카라) ★ */}
          <path
            d="M 66 50 L 76 86 L 82 86 L 72 48 Z"
            fill="#FFFFFF"
            stroke="#334155"
            strokeWidth="1.6"
          />
          <path
            d="M 84 50 L 74 86 L 68 86 L 78 48 Z"
            fill="#F1F5F9"
            stroke="#334155"
            strokeWidth="1.6"
          />
          {/* 옷깃 안쪽 목선 V-라인 */}
          <path d="M 72 48 L 75 60 L 78 48" stroke="#64748B" strokeWidth="1.5" fill="#FED7AA" />

          {/* 가슴 유도 패치 (대한민국/국제 유도 마크) */}
          <rect x="61" y="66" width="6.5" height="8.5" rx="1.5" fill="#FFFFFF" stroke="#DC2626" strokeWidth="1" />
          <circle cx="64.2" cy="70.2" r="2" fill="#DC2626" />

          {/* ★ 유도의 영혼: 블랙 벨트 (검은 띠, Black Belt) & 매듭 & 띠 자락 ★ */}
          {/* 허리를 단단하게 감싼 띠 */}
          <rect
            x="56"
            y="86"
            width="32"
            height="8.5"
            rx="2"
            fill="url(#yu-black-belt)"
            stroke="#0F172A"
            strokeWidth="1.5"
          />
          {/* 중앙 스퀘어 매듭 (Knot) */}
          <rect
            x="70"
            y="85"
            width="8"
            height="9.5"
            rx="2"
            fill="#0F172A"
            stroke="#475569"
            strokeWidth="1.2"
          />
          {/* 휘날리는 두 가닥 띠 끝자락 (금색 단수 자수 라인 포함) */}
          <path
            d="M 72 94.5 C 70 105 65 113 61 121"
            stroke="#0F172A"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          <path
            d="M 76 94.5 C 77 105 83 113 85 123"
            stroke="#0F172A"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          {/* 금색 유단자 자수 줄무늬 */}
          <line x1="62" y1="118" x2="64" y2="120" stroke="#F59E0B" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="83" y1="120" x2="85" y2="122" stroke="#F59E0B" strokeWidth="2.2" strokeLinecap="round" />

          {/* 상대 깃과 소매를 강하게 틀어쥔 손 (쿠미카타 그립 & 테이핑) */}
          <ellipse cx="89" cy="62" rx="4.8" ry="3.6" fill="#FED7AA" stroke="#9A3412" strokeWidth="1.2" />
          <path d="M 87 61 L 91 63" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
        </g>

        {/* 5. 메치기 수직 낙하 축 (글자 ゆ의 2획 수직선과 일치) */}
        {/* 상대를 바닥으로 메다꽂는 시원한 수직 스피드 스트로크 */}
        <path
          d="M 112 36 L 106 128"
          stroke="#38BDF8"
          strokeWidth="2.2"
          strokeDasharray="9 4"
          strokeLinecap="round"
          opacity="0.75"
        />
        <path d="M 104 68 L 102 116" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" opacity="0.85" />
        <path d="M 116 72 L 114 118" stroke="#60A5FA" strokeWidth="1.6" strokeLinecap="round" opacity="0.6" />

        {/* 6. 다다미 매트 위 한판! (IPPON) 폭발 충격파 & 스파크 */}
        {/* 폭발 충격파 링 */}
        <ellipse cx="134" cy="136" rx="22" ry="8" fill="none" stroke="#FDE047" strokeWidth="2.4" opacity="0.9" />
        <ellipse cx="134" cy="136" rx="34" ry="12" fill="none" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.7" />
        {/* 쾅-! 터지는 한판 스파크 별 (Star-burst) */}
        <polygon
          points="134,124 137,133 146,131 139,137 144,145 135,140 128,146 131,137 123,133 132,132"
          fill="#FEF08A"
          stroke="#F59E0B"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        {/* 바닥으로 뻗어나가는 충격 에너지선 */}
        <path d="M 118 138 L 106 142 M 150 134 L 164 132 M 146 144 L 158 152 M 122 146 L 112 154" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" />

        {/* 7. 글자 'ゆ' 오버레이 */}
        <MnemonicCharOverlay char="ゆ" fontFamily={fontFamily} x="108" y="118" />
      </svg>
    );
  }

  if (char === 'よ') {
    // よ: 요트 (푸른 바다를 시원하게 가르는 하얀 세일링 요트!)
    // ⚠️ 1획 가로선: 메인 세일(Mainsail)의 팽팽한 수평 배튼(Batten 살대) & 가로 붐 라인,
    //    2획 수직선: 하늘 높이 솟은 요트 중심 돛대(마스트 Mast)와 펄럭이는 삼각 페넌트 깃발,
    //    2획 하단 루프: 요트 선체 콕핏에 걸린 선명한 마린 구명환(Lifebuoy 튜브) 및 물살을 가르는 유선형 선체(Hull)와 1:1 완벽 일치!
    return (
      <svg
        viewBox="0 0 200 160"
        className="w-full h-full select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* 바다 그라디언트 (깊고 청량한 코발트 블루) */}
          <linearGradient id="yo-sea" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0284C7" />
            <stop offset="35%" stopColor="#0369A1" />
            <stop offset="100%" stopColor="#0C4A6E" />
          </linearGradient>

          {/* 파도 거품 및 수면 하이라이트 그라디언트 */}
          <linearGradient id="yo-wave" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#BAE6FD" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.8" />
          </linearGradient>

          {/* 날렵한 화이트 요트 선체(Hull) 펄 그라디언트 */}
          <linearGradient id="yo-hull" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="55%" stopColor="#F8FAFC" />
            <stop offset="85%" stopColor="#E2E8F0" />
            <stop offset="100%" stopColor="#CBD5E1" />
          </linearGradient>

          {/* 메인 세일(주 돛) 입체 쉐이딩 그라디언트 */}
          <linearGradient id="yo-sail-main" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="60%" stopColor="#F0F9FF" />
            <stop offset="100%" stopColor="#BAE6FD" />
          </linearGradient>

          {/* 앞돛 (지브 세일 Jib Sail) 청량한 스카이블루 그라디언트 */}
          <linearGradient id="yo-sail-jib" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#E0F2FE" />
            <stop offset="50%" stopColor="#BAE6FD" />
            <stop offset="100%" stopColor="#7DD3FC" />
          </linearGradient>

          {/* 견고한 마스트(돛대) 알루미늄 메탈 그라디언트 */}
          <linearGradient id="yo-mast" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F1F5F9" />
            <stop offset="50%" stopColor="#94A3B8" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>

          {/* 펄럭이는 삼각 깃발 오렌지/레드 그라디언트 */}
          <linearGradient id="yo-flag" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#EA580C" />
            <stop offset="100%" stopColor="#FB923C" />
          </linearGradient>
        </defs>

        {/* 1. 배경 하늘 & 자유로운 갈매기 & 바람결 */}
        {/* 하늘 잔잔한 뭉게구름 */}
        <path
          d="M 16 34 Q 28 28 40 34 Q 50 30 62 34 L 16 34 Z"
          fill="#F0F9FF"
          opacity="0.8"
        />
        {/* 날아가는 하얀 갈매기 (좌측 상단 & 우측 상단) */}
        <path
          d="M 26 25 C 31 20 37 22 40 26 C 43 22 49 20 54 25"
          stroke="#0284C7"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M 164 19 C 168 15 173 17 176 20 C 179 17 184 15 188 19"
          stroke="#0284C7"
          strokeWidth="1.4"
          strokeLinecap="round"
          opacity="0.8"
        />
        {/* 청량한 바닷바람 흐름선 (Wind lines) */}
        <path
          d="M 18 50 C 38 46 68 52 88 47"
          stroke="#38BDF8"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.5"
          strokeDasharray="6 4"
        />
        <path
          d="M 12 76 C 30 72 58 78 78 72"
          stroke="#38BDF8"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.4"
          strokeDasharray="5 3"
        />

        {/* 2. 바다와 출렁이는 파도 수면 */}
        {/* 메인 딥블루 바다 수면 */}
        <path
          d="M 0 126 C 35 120 75 130 115 123 C 150 117 180 128 200 122 L 200 160 L 0 160 Z"
          fill="url(#yo-sea)"
        />
        {/* 중간 넘실거리는 파도 레이어 */}
        <path
          d="M 0 136 C 40 130 85 140 130 133 C 165 128 190 136 200 132 L 200 160 L 0 160 Z"
          fill="#0369A1"
          opacity="0.75"
        />
        {/* 앞쪽 찰랑이는 파도 물결선 */}
        <path
          d="M 0 148 C 45 144 95 152 145 146 C 175 142 190 148 200 145"
          stroke="url(#yo-wave)"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <path
          d="M 18 155 C 48 152 78 156 108 154 M 132 154 C 158 152 182 156 196 154"
          stroke="#E0F2FE"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.8"
        />

        {/* 3. 팽팽한 리깅 와이어 (마스트에서 선수/선미로 연결) */}
        {/* 앞쪽 포스테이 (Forestay Wire) */}
        <line x1="104" y1="24" x2="44" y2="108" stroke="#94A3B8" strokeWidth="1.2" opacity="0.85" />
        {/* 뒤쪽 백스테이 (Backstay Wire) */}
        <line x1="104" y1="24" x2="170" y2="114" stroke="#94A3B8" strokeWidth="1.2" opacity="0.85" />

        {/* 4. 삼각 돛 (Sails - 바람을 가득 머금은 풍성한 곡면) */}
        {/* 앞돛 (지브 세일 Jib Sail / Genoa - 좌측 삼각 돛) */}
        <g id="yo-jib-sail">
          <path
            d="M 103 34 C 84 52 64 78 46 106 C 70 106 90 104 103 98 Z"
            fill="url(#yo-sail-jib)"
            stroke="#0284C7"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          {/* 지브 세일 패널 재봉선 */}
          <path d="M 103 56 C 88 68 76 84 62 106" stroke="#38BDF8" strokeWidth="1.3" strokeLinecap="round" opacity="0.75" />
          <path d="M 103 76 C 94 86 86 96 78 105" stroke="#38BDF8" strokeWidth="1.1" strokeLinecap="round" opacity="0.7" />
          {/* 햇살 투과 광택 하이라이트 */}
          <path d="M 98 42 C 86 58 74 78 60 98" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.65" />
        </g>

        {/* 주 돛 (메인 세일 Mainsail - 우측 삼각 돛) */}
        {/* ⚠️ 글자 よ의 1획 가로선(y: 55)과 세일의 수평 배튼(Batten) 라인이 1:1 완벽 일치! */}
        <g id="yo-main-sail">
          {/* 바람을 머금고 뒤쪽으로 부풀어 오른 메인 세일 바디 */}
          <path
            d="M 106 26 C 128 36 156 58 156 90 L 106 90 Z"
            fill="url(#yo-sail-main)"
            stroke="#0284C7"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          {/* 세일 코너 모서리 보강 패치 */}
          <polygon points="106,26 114,34 106,38" fill="#38BDF8" opacity="0.4" />
          <polygon points="156,90 144,88 150,80" fill="#38BDF8" opacity="0.4" />
          <polygon points="106,90 114,84 106,80" fill="#38BDF8" opacity="0.4" />

          {/* ★ 글자 よ의 1획과 일치하는 메인 세일 중심 배튼(Batten 살대) 라인 ★ */}
          <path d="M 106 55 L 148 56" stroke="#0284C7" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M 106 53 L 142 53" stroke="#BAE6FD" strokeWidth="1.2" strokeLinecap="round" />

          {/* 상하단 보조 배튼 라인 */}
          <path d="M 106 40 L 128 42" stroke="#38BDF8" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
          <path d="M 106 72 L 152 74" stroke="#38BDF8" strokeWidth="1.4" strokeLinecap="round" opacity="0.7" />

          {/* 요트 세일 엠블럼 마크 (블루 요트 서클 로고) */}
          <circle cx="128" cy="68" r="6" fill="none" stroke="#2563EB" strokeWidth="1.2" opacity="0.6" />
          <path d="M 128 64 L 128 72 M 125 66 L 131 70" stroke="#2563EB" strokeWidth="1" strokeLinecap="round" opacity="0.6" />

          {/* 세일 하단 가로 붐대 (Boom) */}
          <path d="M 105 92 L 158 92" stroke="#64748B" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="158" cy="92" r="2.2" fill="#475569" />
        </g>

        {/* 5. 요트 중심 돛대 (마스트 Mast - 글자 よ의 2획 수직 기둥과 일치) */}
        <g id="yo-mast-group">
          {/* 견고한 알루미늄 마스트 기둥 */}
          <rect x="103.5" y="22" width="3.2" height="90" rx="1.6" fill="url(#yo-mast)" stroke="#334155" strokeWidth="1" />
          {/* 돛대 꼭대기 풍향계 & 캡 */}
          <circle cx="105.1" cy="22" r="2.4" fill="#F59E0B" stroke="#B45309" strokeWidth="0.8" />
          <line x1="105.1" y1="22" x2="105.1" y2="15" stroke="#64748B" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="100" y1="17" x2="110" y2="17" stroke="#EA580C" strokeWidth="1.2" strokeLinecap="round" />
          {/* 돛대 꼭대기 오렌지 삼각 페넌트 깃발 (Burgee) */}
          <path
            d="M 106.5 22 L 126 27 L 106.5 32 Z"
            fill="url(#yo-flag)"
            stroke="#C2410C"
            strokeWidth="1"
            strokeLinejoin="round"
          />
        </g>

        {/* 6. 요트 선체 (Sleek Hull & Deck - 물 위에 당당히 뜬 레이싱 요트 바디!) */}
        <g id="yo-boat-hull">
          {/* 갑판 위 날렵한 선실(Cabin) 루프 */}
          <path
            d="M 72 110 L 82 103 L 138 103 L 146 111 Z"
            fill="#E2E8F0"
            stroke="#64748B"
            strokeWidth="1.4"
          />
          {/* 틴팅된 선실 유리창 (윈드실드) */}
          <polygon points="84,105 96,105 94,109 82,109" fill="#0284C7" opacity="0.85" />
          <polygon points="100,105 116,105 116,109 98,109" fill="#0284C7" opacity="0.85" />
          <polygon points="120,105 134,105 132,109 119,109" fill="#0284C7" opacity="0.85" />

          {/* 날렵한 선체 본체 (Bow 선수 ~ Stern 선미) */}
          <path
            d="M 32 110
               C 70 112 130 112 174 114
               C 168 126 148 134 116 134
               C 80 134 45 126 32 110 Z"
            fill="url(#yo-hull)"
            stroke="#475569"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />

          {/* 선체 바닥 킬 음영 라인 */}
          <path
            d="M 46 127 C 78 135 120 135 166 124"
            stroke="#64748B"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.8"
          />

          {/* ★ 세련된 마린 스트라이프 (로열 블루 & 골드) ★ */}
          <path
            d="M 38 116 C 75 115 125 116 171 118"
            stroke="#1D4ED8"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
          <path
            d="M 44 120 C 78 119 122 120 166 122"
            stroke="#F59E0B"
            strokeWidth="1"
            strokeLinecap="round"
          />

          {/* 선수 안전 난간 (Bow Pulpit) 실버 파이프 */}
          <path
            d="M 32 110 L 34 100 L 48 102 L 48 110"
            stroke="#94A3B8"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </g>

        {/* 7. ★ 클래식 마린 구명환 (Lifebuoy 튜브) - 글자 よ의 2획 하단 루프와 1:1 완벽 일치! ★ */}
        <g id="yo-lifebuoy">
          {/* 구명환 외곽 굵은 화이트 베이스 링 (루프 위치: cx 90, cy 106) */}
          <circle cx="90" cy="106" r="15" fill="#FFFFFF" stroke="#334155" strokeWidth="1.8" />
          {/* 구명환 중앙 구멍 안쪽 */}
          <circle cx="90" cy="106" r="7.5" fill="#E0F2FE" stroke="#334155" strokeWidth="1.8" />

          {/* 4방향 세일러 레드 반사 밴드 */}
          {/* 상단 밴드 */}
          <path d="M 87 91.5 C 89 91.2 91 91.2 93 91.5 L 92 98.8 C 91 98.6 89 98.6 88 98.8 Z" fill="#EF4444" stroke="#B91C1C" strokeWidth="0.7" />
          {/* 하단 밴드 */}
          <path d="M 87 120.5 C 89 120.8 91 120.8 93 120.5 L 92 113.2 C 91 113.4 89 113.4 88 113.2 Z" fill="#EF4444" stroke="#B91C1C" strokeWidth="0.7" />
          {/* 좌측 밴드 */}
          <path d="M 75.5 103 C 75.2 105 75.2 107 75.5 109 L 82.8 108 C 82.6 107 82.6 105 82.8 104 Z" fill="#EF4444" stroke="#B91C1C" strokeWidth="0.7" />
          {/* 우측 밴드 */}
          <path d="M 104.5 103 C 104.8 105 104.8 107 104.5 109 L 97.2 108 C 97.4 107 97.4 105 97.2 104 Z" fill="#EF4444" stroke="#B91C1C" strokeWidth="0.7" />

          {/* 둘레를 감싸는 골드 구명 로프 (Lifeline grab rope) */}
          <circle cx="90" cy="106" r="17.5" fill="none" stroke="#F59E0B" strokeWidth="1.1" strokeDasharray="5 3" />
          {/* 로프 고정 스트랩 핀들 */}
          <circle cx="90" cy="88.5" r="1.2" fill="#B45309" />
          <circle cx="90" cy="123.5" r="1.2" fill="#B45309" />
          <circle cx="72.5" cy="106" r="1.2" fill="#B45309" />
          <circle cx="107.5" cy="106" r="1.2" fill="#B45309" />
        </g>

        {/* 8. 글자 よ의 루프 끝 꼬리(x: 106->136, y: 114->120)와 매칭되는 선미 물살 & 방향타 트림 라인 */}
        <path
          d="M 98 116 C 112 118 126 118 138 114"
          stroke="#1D4ED8"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M 102 119 C 116 121 128 120 140 116"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.9"
        />

        {/* 9. 역동적인 물보라 스플래시 & 항적 포말 (Bow Wave Splash & Wake) */}
        {/* 선수가 파도를 가르며 튀어오르는 물보라 */}
        <path
          d="M 28 112 C 24 116 26 122 34 120 C 38 116 36 110 32 108 Z"
          fill="#FFFFFF"
          stroke="#38BDF8"
          strokeWidth="1"
          opacity="0.9"
        />
        {/* 튀어오르는 상쾌한 물방울들 */}
        <circle cx="24" cy="110" r="2.2" fill="#E0F2FE" />
        <circle cx="20" cy="116" r="1.6" fill="#BAE6FD" />
        <circle cx="27" cy="105" r="1.3" fill="#FFFFFF" />
        <circle cx="36" cy="104" r="1.8" fill="#E0F2FE" />

        {/* 선체를 감싸며 뒤로 길게 퍼지는 하얀 거품 항적(Wake) */}
        <path
          d="M 38 126 C 60 128 110 134 174 126"
          stroke="#FFFFFF"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeDasharray="8 4"
          opacity="0.85"
        />
        <path
          d="M 52 130 C 85 133 135 137 182 128"
          stroke="#BAE6FD"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray="6 3"
          opacity="0.75"
        />

        {/* 반짝이는 햇살 바다 윤슬 (Sun glints) */}
        <path d="M 54 144 L 56 142 L 58 144 L 56 146 Z" fill="#FFFFFF" opacity="0.9" />
        <path d="M 152 142 L 154 140 L 156 142 L 154 144 Z" fill="#FFFFFF" opacity="0.9" />
        <path d="M 120 152 L 121.5 150.5 L 123 152 L 121.5 153.5 Z" fill="#FFFFFF" opacity="0.8" />

        {/* 10. 글자 'よ' 오버레이 */}
        <MnemonicCharOverlay char="よ" fontFamily={fontFamily} x="108" y="118" />
      </svg>
    );
  }

  return null;
}
