import React from 'react';
import { KatakanaMnemonicSvgChildProps } from './types';
import KatakanaCharOverlay from './KatakanaCharOverlay';

export default function KatakanaRowTa({ char, fontFamily }: KatakanaMnemonicSvgChildProps) {
  if (char === 'タ') {
    // タ: 타조 (목과 머리=1획, 둥근 등과 꼬리깃=2획, 질주하는 다리=3획)
    return (
      <svg viewBox="0 0 200 160" className="w-full h-full select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* 지면 그림자 */}
        <ellipse cx="112" cy="144" rx="44" ry="5" fill="#E2E8F0" />

        {/* 질주 흙먼지 이펙트 (발밑 뒤로 튀는 먼지) */}
        <circle cx="146" cy="138" r="3.5" fill="#CBD5E1" opacity="0.8" />
        <circle cx="154" cy="136" r="2.5" fill="#E2E8F0" opacity="0.85" />
        <circle cx="159" cy="140" r="1.8" fill="#CBD5E1" opacity="0.7" />

        {/* 속도감 바람선 */}
        <line x1="32" y1="40" x2="46" y2="40" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
        <line x1="24" y1="52" x2="42" y2="52" stroke="#E2E8F0" strokeWidth="2" strokeLinecap="round" />

        {/* 타조 몸체 은은한 실루엣 (글자 2획 곡선 안쪽을 받쳐주는 볼륨) */}
        <path d="M 88 64 Q 132 58 136 74 Q 124 104 96 112 Z" fill="#E2E8F0" opacity="0.55" />

        {/* [2획 매칭] 타조 둥근 등 모서리 뒤로 휘날리는 풍성한 꼬리 깃털 */}
        <path d="M 134 52 Q 144 58 138 70 Z" fill="#F8FAFC" />
        <path d="M 136 52 C 152 42 165 46 168 50" stroke="#CBD5E1" strokeWidth="3" strokeLinecap="round" />
        <path d="M 138 58 C 156 56 172 64 168 73" stroke="#94A3B8" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M 134 66 C 150 72 160 84 154 91" stroke="#CBD5E1" strokeWidth="2.5" strokeLinecap="round" />

        {/* [1획 매칭] 앞으로 뻗은 타조의 긴 목 (1획 상단과 연결) */}
        <path d="M 58 32 C 68 34 78 38 88 44" stroke="#FDBA74" strokeWidth="5.5" strokeLinecap="round" />
        {/* 타조 머리 & 부리 & 쫑긋한 깃털 */}
        <circle cx="56" cy="30" r="7.5" fill="#FDBA74" />
        <polygon points="50,29 38,32 50,35" fill="#F97316" />
        <circle cx="54" cy="28.5" r="1.5" fill="#1E293B" />
        <circle cx="53.5" cy="28" r="0.5" fill="#FFFFFF" />
        <path d="M 58 23 Q 63 19 66 21" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" />

        {/* [3획 매칭] 땅을 힘차게 박차는 주 다리 (3획 끝에서 지면으로 연결) */}
        <path d="M 116 106 L 126 124 L 134 142" stroke="#FDBA74" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        {/* 뒷발 발가락 디딤 */}
        <path d="M 134 142 L 140 143 M 134 142 L 132 144" stroke="#EA580C" strokeWidth="2.5" strokeLinecap="round" />

        {/* 보조 앞다리 (공중으로 솟구쳐 달리는 역동적인 다리) */}
        <path d="M 84 98 L 74 114 L 84 125" stroke="#FDBA74" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="84" y1="125" x2="89" y2="124" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" />

        {/* 글자 'タ' 오버레이 */}
        <KatakanaCharOverlay char="タ" fontFamily={fontFamily} x="106" y="118" />
      </svg>
    );
  }

  if (char === 'チ') {
    // チ: 치어리더 (풍성한 황금빛 폼폼 양손 수술=2획, 하이킥과 플리츠 스커트=3획, 포니테일과 왕리본=1획)
    return (
      <svg viewBox="0 0 200 160" className="w-full h-full select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* 1. 부드러운 무대 그림자 (도약하는 치어리더의 공중 바운스감) */}
        <ellipse cx="106" cy="148" rx="46" ry="5.5" fill="#E2E8F0" />

        {/* 2. 응원 별 & 스파클 & 색종이 컨페티 이펙트 */}
        {/* 좌측 골드 스파클 */}
        <path d="M 30 38 L 32 30 L 34 38 L 42 40 L 34 42 L 32 50 L 30 42 L 22 40 Z" fill="#FACC15" />
        <circle cx="24" cy="28" r="1.5" fill="#FDE047" />
        {/* 우측 골드 스파클 */}
        <path d="M 176 40 L 178 32 L 180 40 L 188 42 L 180 44 L 178 52 L 176 44 L 168 42 Z" fill="#FACC15" />
        <circle cx="184" cy="30" r="1.5" fill="#FDE047" />
        {/* 공중 응원 별 & 컨페티 */}
        <polygon points="34,98 36,92 38,98 44,99 39,103 41,109 36,105 31,109 33,103 28,99" fill="#FB7185" opacity="0.85" />
        <polygon points="174,96 176,90 178,96 184,97 179,101 181,107 176,103 171,107 173,101 168,97" fill="#38BDF8" opacity="0.85" />
        <rect x="42" y="24" width="4.5" height="2.2" rx="1" fill="#F43F5E" transform="rotate(25 42 24)" opacity="0.8" />
        <rect x="162" y="24" width="4.5" height="2.2" rx="1" fill="#38BDF8" transform="rotate(-30 162 24)" opacity="0.8" />

        {/* 3. 치어리더 헤어 & 왕리본 (High Ponytail & Cheer Bow) */}
        {/* 포니테일 머리채 (우측으로 생동감 있게 휘날림) */}
        <path d="M 112 24 C 128 18 142 26 138 40 C 132 36 124 30 114 28 Z" fill="#B45309" stroke="#78350F" strokeWidth="1.2" />
        <path d="M 124 26 C 132 30 134 36 132 39" stroke="#D97706" strokeWidth="1" strokeLinecap="round" />

        {/* 시그니처 핑크 왕리본 (Cheer Bow) */}
        <g id="cheer-bow">
          <path d="M 112 21 C 100 13 98 25 111 23 Z" fill="#F43F5E" stroke="#BE123C" strokeWidth="1.2" />
          <path d="M 112 21 C 124 13 126 25 113 23 Z" fill="#F43F5E" stroke="#BE123C" strokeWidth="1.2" />
          <ellipse cx="112" cy="22" rx="3" ry="2.5" fill="#FFFFFF" stroke="#BE123C" strokeWidth="1" />
          <path d="M 111 24 C 108 30 109 35 107 40" stroke="#F43F5E" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M 113 24 C 116 30 118 35 120 39" stroke="#F43F5E" strokeWidth="1.6" strokeLinecap="round" />
        </g>

        {/* 4. 치어리더 머리 & 얼굴 */}
        <circle cx="106" cy="35" r="12.5" fill="#FED7AA" stroke="#EA580C" strokeWidth="1.2" />
        <path d="M 95 32 C 99 28 113 28 117 32 C 113 30 99 30 95 32 Z" fill="#B45309" />
        <circle cx="101" cy="35" r="1.5" fill="#1E293B" />
        <circle cx="101.6" cy="34.4" r="0.5" fill="#FFFFFF" />
        <path d="M 108.5 35 Q 111.5 32 113.5 35.5" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <circle cx="98.5" cy="38.5" r="2.2" fill="#FDA4AF" opacity="0.85" />
        <circle cx="113.5" cy="38.5" r="2.2" fill="#FDA4AF" opacity="0.85" />
        <path d="M 103.5 38.5 Q 106 43.5 108.5 38.5 Z" fill="#E11D48" />

        {/* 목선 */}
        <rect x="103.5" y="46.5" width="5" height="5.5" fill="#FED7AA" />

        {/* 5. 역동적인 하체 다리 & 스포티 니삭스 & 스니커즈 */}
        {/* 왼쪽 다리: [3획 매칭] 글자의 세로 삐침 곡선을 따라 하늘로 시원하게 뻗는 하이킥 다리 */}
        <g id="left-leg-highkick">
          <path d="M 93 106 L 82 118" stroke="#FED7AA" strokeWidth="5.5" strokeLinecap="round" />
          <path d="M 82 118 L 71 130" stroke="#FFFFFF" strokeWidth="5.5" strokeLinecap="round" />
          <path d="M 82 118 L 71 130" stroke="#CBD5E1" strokeWidth="1" strokeLinecap="round" />
          <line x1="77" y1="121" x2="81" y2="124" stroke="#F43F5E" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="74" y1="124" x2="78" y2="127" stroke="#F43F5E" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 71 130 L 63 135 L 67 139 L 74 133 Z" fill="#FFFFFF" stroke="#BE123C" strokeWidth="1.2" strokeLinejoin="round" />
          <path d="M 63 135 L 67 139" stroke="#F43F5E" strokeWidth="2.2" strokeLinecap="round" />
        </g>

        {/* 오른쪽 다리: 무릎 굽혀 바운스 점프를 지탱하는 다리 */}
        <g id="right-leg-support">
          <path d="M 114 106 L 119 120" stroke="#FED7AA" strokeWidth="5.5" strokeLinecap="round" />
          <path d="M 119 120 L 123 136" stroke="#FFFFFF" strokeWidth="5.5" strokeLinecap="round" />
          <path d="M 119 120 L 123 136" stroke="#CBD5E1" strokeWidth="1" strokeLinecap="round" />
          <line x1="117" y1="124" x2="121" y2="124" stroke="#F43F5E" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="118" y1="127" x2="122" y2="127" stroke="#F43F5E" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 123 136 L 129 142 L 124 145 L 120 139 Z" fill="#FFFFFF" stroke="#BE123C" strokeWidth="1.2" strokeLinejoin="round" />
          <path d="M 125 141 L 129 142" stroke="#F43F5E" strokeWidth="2.2" strokeLinecap="round" />
        </g>

        {/* 6. 치어리더 플리츠 스커트 (A라인 주름치마) */}
        <g id="cheer-skirt">
          <path d="M 97 81 L 115 81 L 128 107 L 84 107 Z" fill="#F43F5E" stroke="#BE123C" strokeWidth="1.5" />
          <line x1="93" y1="82" x2="92" y2="107" stroke="#E11D48" strokeWidth="1.2" />
          <line x1="101" y1="82" x2="101" y2="107" stroke="#BE123C" strokeWidth="1.2" />
          <line x1="106" y1="82" x2="108" y2="107" stroke="#BE123C" strokeWidth="1.2" />
          <line x1="111" y1="82" x2="117" y2="107" stroke="#E11D48" strokeWidth="1.2" />
          <line x1="114" y1="82" x2="123" y2="107" stroke="#BE123C" strokeWidth="1.2" />
          {/* 치어리더 스커트 밑단 화이트 & 옐로우 더블 배색 라인 */}
          <path d="M 85 103 L 127 103" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M 84 106 L 128 106" stroke="#FDE047" strokeWidth="1.4" strokeLinecap="round" />
        </g>

        {/* 7. 치어리더 유니폼 상의 (민소매 탑) */}
        <g id="cheer-top">
          <path d="M 96 52 L 116 52 L 115 81 L 97 81 Z" fill="#F43F5E" stroke="#BE123C" strokeWidth="1.5" />
          <polygon points="101,52 106,60 111,52" fill="#FED7AA" />
          <path d="M 98 52 L 106 62 L 114 52" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          {/* 가슴 골드 스타(★) 엠블럼 */}
          <polygon points="106,66 107.5,69 111,69 108,71 109,74 106,72 103,74 104,71 101,69 104.5,69" fill="#FDE047" stroke="#EAB308" strokeWidth="0.6" />
          <rect x="96" y="79" width="20" height="3" fill="#FFFFFF" rx="0.5" />
        </g>

        {/* 8. [2획 매칭] 좌우로 활짝 뻗은 양팔 & 손목 아대 */}
        <path d="M 96 59 L 56 65" stroke="#FED7AA" strokeWidth="5.5" strokeLinecap="round" />
        <path d="M 96 59 L 56 65" stroke="#EA580C" strokeWidth="1" strokeLinecap="round" />
        <rect x="58" y="62" width="6" height="7" rx="2" fill="#F43F5E" stroke="#FFFFFF" strokeWidth="1" />

        <path d="M 116 59 L 156 65" stroke="#FED7AA" strokeWidth="5.5" strokeLinecap="round" />
        <path d="M 116 59 L 156 65" stroke="#EA580C" strokeWidth="1" strokeLinecap="round" />
        <rect x="148" y="62" width="6" height="7" rx="2" fill="#F43F5E" stroke="#FFFFFF" strokeWidth="1" />

        {/* 9. 풍성하고 폭발적인 황금빛 응원 폼폼 (Pom-poms)! */}
        {/* 왼쪽 폼폼 */}
        <g id="left-pom-pom">
          <path d="M 36 46 C 42 40 54 40 60 44" stroke="#FDE047" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 3" />
          <path d="M 46 44 L 52 48 L 58 44 L 60 51 L 68 52 L 64 59 L 70 64 L 64 69 L 68 76 L 60 77 L 58 84 L 52 80 L 46 84 L 44 77 L 36 76 L 40 69 L 34 64 L 40 59 L 36 52 L 44 51 Z" fill="#F59E0B" stroke="#D97706" strokeWidth="1.2" />
          <path d="M 48 48 L 54 51 L 58 49 L 59 54 L 64 56 L 61 61 L 65 64 L 61 67 L 64 72 L 59 74 L 58 79 L 54 77 L 48 80 L 47 75 L 41 74 L 44 69 L 39 64 L 44 59 L 41 54 L 47 53 Z" fill="#FACC15" />
          <circle cx="52" cy="64" r="10" fill="#FDE047" />
          <path d="M 38 56 C 30 52 32 44 26 42" stroke="#FACC15" strokeWidth="2" strokeLinecap="round" />
          <path d="M 34 66 C 26 68 24 74 18 74" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M 40 74 C 34 80 36 88 30 92" stroke="#FDE047" strokeWidth="2" strokeLinecap="round" />
          <path d="M 62 46 C 66 40 72 40 76 36" stroke="#FDE047" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M 64 78 C 70 84 74 86 80 90" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" />
        </g>

        {/* 오른쪽 폼폼 */}
        <g id="right-pom-pom">
          <path d="M 152 44 C 158 40 170 40 176 46" stroke="#FDE047" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 3" />
          <path d="M 166 44 L 172 48 L 178 44 L 180 51 L 188 52 L 184 59 L 190 64 L 184 69 L 188 76 L 180 77 L 178 84 L 172 80 L 166 84 L 164 77 L 156 76 L 160 69 L 154 64 L 160 59 L 156 52 L 164 51 Z" fill="#F59E0B" stroke="#D97706" strokeWidth="1.2" />
          <path d="M 168 48 L 174 51 L 178 49 L 179 54 L 184 56 L 181 61 L 185 64 L 181 67 L 184 72 L 179 74 L 178 79 L 174 77 L 168 80 L 167 75 L 161 74 L 164 69 L 159 64 L 164 59 L 161 54 L 167 53 Z" fill="#FACC15" />
          <circle cx="172" cy="64" r="10" fill="#FDE047" />
          <path d="M 184 56 C 192 52 190 44 196 42" stroke="#FACC15" strokeWidth="2" strokeLinecap="round" />
          <path d="M 188 66 C 196 68 198 74 204 74" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M 182 74 C 188 80 186 88 192 92" stroke="#FDE047" strokeWidth="2" strokeLinecap="round" />
          <path d="M 160 46 C 156 40 150 40 146 36" stroke="#FDE047" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M 158 78 C 152 84 148 86 142 90" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" />
        </g>

        {/* 10. 글자 'チ' 오버레이 */}
        <KatakanaCharOverlay char="チ" fontFamily={fontFamily} x="106" y="118" />
      </svg>
    );
  }

  if (char === 'ツ') {
    // ツ: 셔츠 (옷걸이를 없애고 가슴판을 상단까지 시원하게 채워, 글자가 셔츠에 감각적으로 페인팅된 듯한 일체형 디자인)
    return (
      <svg viewBox="0 0 200 160" className="w-full h-full select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* 셔츠 바디 소프트 스카이블루 프리미엄 그라디언트 */}
          <linearGradient id="tsuShirtBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F0F9FF" />
            <stop offset="40%" stopColor="#E0F2FE" />
            <stop offset="100%" stopColor="#BAE6FD" />
          </linearGradient>

          {/* 셔츠 칼라(깃) 화이트-아이스 펄 그라디언트 */}
          <linearGradient id="tsuCollarGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="70%" stopColor="#F8FAFC" />
            <stop offset="100%" stopColor="#E2E8F0" />
          </linearGradient>

          {/* 3획 앞섶(Placket) 입체 원단 그라디언트 */}
          <linearGradient id="tsuPlacketGrad" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="40%" stopColor="#E0F2FE" />
            <stop offset="100%" stopColor="#7DD3FC" />
          </linearGradient>

          {/* 자개 단추 펄 그라디언트 */}
          <radialGradient id="tsuPearlGrad" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="60%" stopColor="#F8FAFC" />
            <stop offset="100%" stopColor="#CBD5E1" />
          </radialGradient>
        </defs>

        {/* 1. 셔츠 본체 & 소매 (옷걸이 제거 후 상단 끝까지 대폭 확장된 시원한 가슴판 실루엣) */}
        <path
          d="M 72 8 
             L 14 22 
             L -2 46 
             L 16 62 
             L 30 50 
             L 32 160 
             L 180 160 
             L 182 50 
             L 196 62 
             L 214 46 
             L 198 22 
             L 140 8 
             Z"
          fill="url(#tsuShirtBodyGrad)"
          stroke="#38BDF8"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />

        {/* 셔츠 어깨 요크(Yoke) 스티치 라인 */}
        <path d="M 14 22 L 72 8 M 140 8 L 198 22" stroke="#0284C7" strokeWidth="1" strokeDasharray="3 2" opacity="0.6" />

        {/* 2. 셔츠 목둘레 안쪽 넥밴드 (Deep Inner Neckband & Brand Tag) */}
        <path d="M 72 8 C 84 24 128 24 140 8 C 132 30 80 30 72 8 Z" fill="#0369A1" opacity="0.85" />
        <ellipse cx="106" cy="18" rx="20" ry="4.5" fill="#0284C7" opacity="0.5" />
        {/* 미니멀 브랜드 우븐 라벨 */}
        <rect x="100" y="10" width="12" height="6.5" rx="1.5" fill="#FFFFFF" stroke="#0284C7" strokeWidth="0.8" />
        <line x1="103" y1="13.2" x2="109" y2="13.2" stroke="#0284C7" strokeWidth="0.8" />

        {/* 3. 셔츠 칼라(깃, Collar) 날개 (상단으로 정돈되어 글자 윗공간을 시원하게 확보) */}
        {/* 좌측 칼라 깃 */}
        <path
          d="M 72 8 L 36 20 L 78 48 L 104 24 Z"
          fill="url(#tsuCollarGrad)"
          stroke="#0284C7"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path d="M 40 21 L 76 45 L 100 25" stroke="#0284C7" strokeWidth="0.8" strokeDasharray="2 1.5" fill="none" opacity="0.7" />

        {/* 우측 칼라 깃 */}
        <path
          d="M 140 8 L 176 20 L 134 48 L 108 24 Z"
          fill="url(#tsuCollarGrad)"
          stroke="#0284C7"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path d="M 172 21 L 136 45 L 112 25" stroke="#0284C7" strokeWidth="0.8" strokeDasharray="2 1.5" fill="none" opacity="0.7" />

        {/* 오른쪽 가슴 패치 포켓 */}
        <g id="shirt-pocket">
          <path
            d="M 148 68 L 148 94 C 148 97 150 99 153 99 L 169 99 C 172 99 174 97 174 94 L 174 68 Z"
            fill="#FFFFFF"
            stroke="#7DD3FC"
            strokeWidth="1.2"
          />
          <line x1="148" y1="73" x2="174" y2="73" stroke="#0284C7" strokeWidth="1" strokeDasharray="2 1.5" />
          <rect x="157" y="66" width="8" height="4" rx="1" fill="#0284C7" />
        </g>

        {/* 4. [★ 3획 매칭] 셔츠 앞섶(플래킷) 사선 라인 & 입체 스티치 */}
        {/* 글자 3획을 감싸는 우아한 앞섶 원단 밴드 */}
        <path
          d="M 144 48 
             C 140 74 124 102 74 134 
             L 84 138 
             C 134 104 150 74 156 48 
             Z"
          fill="url(#tsuPlacketGrad)"
          stroke="#7DD3FC"
          strokeWidth="1"
          opacity="0.85"
        />
        {/* 앞섶 더블 재봉 스티치 점선 */}
        <path
          d="M 142 50 C 136 74 120 102 76 132"
          stroke="#0284C7"
          strokeWidth="2.2"
          strokeDasharray="3.5 2.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 152 50 C 146 74 130 102 86 132"
          stroke="#38BDF8"
          strokeWidth="1.4"
          strokeDasharray="3 2"
          strokeLinecap="round"
          fill="none"
          opacity="0.75"
        />
        {/* 3획 하단 마무리 자개 단추 */}
        <g id="placket-button-3">
          <circle cx="82" cy="126" r="5.5" fill="url(#tsuPearlGrad)" stroke="#0284C7" strokeWidth="1.4" />
          <circle cx="80.8" cy="124.8" r="0.6" fill="#0369A1" />
          <circle cx="83.2" cy="124.8" r="0.6" fill="#0369A1" />
          <circle cx="80.8" cy="127.2" r="0.6" fill="#0369A1" />
          <circle cx="83.2" cy="127.2" r="0.6" fill="#0369A1" />
          <path d="M 80.8 124.8 L 83.2 127.2 M 83.2 124.8 L 80.8 127.2" stroke="#0284C7" strokeWidth="0.6" />
        </g>

        {/* 5. [★ 1획 & 2획 매칭] 글자 두 점 위치의 칼라 자개 단추 2개 */}
        {/* [1획 매칭] 왼쪽 칼라 고정 자개 단추 */}
        <g id="collar-button-1">
          <ellipse cx="81" cy="60" rx="7.5" ry="7.5" fill="#94A3B8" opacity="0.45" />
          <circle cx="81" cy="58.5" r="7.5" fill="url(#tsuPearlGrad)" stroke="#0284C7" strokeWidth="1.8" />
          <circle cx="81" cy="58.5" r="5.5" stroke="#E2E8F0" strokeWidth="0.8" fill="none" />
          <circle cx="79.2" cy="56.7" r="0.8" fill="#0369A1" />
          <circle cx="82.8" cy="56.7" r="0.8" fill="#0369A1" />
          <circle cx="79.2" cy="60.3" r="0.8" fill="#0369A1" />
          <circle cx="82.8" cy="60.3" r="0.8" fill="#0369A1" />
          <path d="M 79.2 56.7 L 82.8 60.3 M 82.8 56.7 L 79.2 60.3" stroke="#0284C7" strokeWidth="1" />
        </g>

        {/* [2획 매칭] 중앙 넥밴드 자개 단추 */}
        <g id="collar-button-2">
          <ellipse cx="105" cy="64.5" rx="7.5" ry="7.5" fill="#94A3B8" opacity="0.45" />
          <circle cx="105" cy="63" r="7.5" fill="url(#tsuPearlGrad)" stroke="#0284C7" strokeWidth="1.8" />
          <circle cx="105" cy="63" r="5.5" stroke="#E2E8F0" strokeWidth="0.8" fill="none" />
          <circle cx="103.2" cy="61.2" r="0.8" fill="#0369A1" />
          <circle cx="106.8" cy="61.2" r="0.8" fill="#0369A1" />
          <circle cx="103.2" cy="64.8" r="0.8" fill="#0369A1" />
          <circle cx="106.8" cy="64.8" r="0.8" fill="#0369A1" />
          <path d="M 103.2 61.2 L 106.8 64.8 M 106.8 61.2 L 103.2 64.8" stroke="#0284C7" strokeWidth="1" />
        </g>

        {/* 6. 다림질 완료 산뜻한 스파클 (✨) */}
        <path d="M 22 46 L 24 38 L 26 46 L 34 48 L 26 50 L 24 58 L 22 50 L 14 48 Z" fill="#38BDF8" opacity="0.9" />
        <circle cx="16" cy="62" r="1.5" fill="#BAE6FD" />
        <path d="M 182 78 L 184 71 L 186 78 L 193 80 L 186 82 L 184 89 L 182 82 L 175 80 Z" fill="#0284C7" opacity="0.8" />

        {/* 7. 글자 'ツ' 오버레이 (셔츠 가슴판에 멋지게 페인팅된 그래픽처럼 안착) */}
        <KatakanaCharOverlay char="ツ" fontFamily={fontFamily} x="106" y="118" />
      </svg>
    );
  }

  if (char === 'テ') {
    // テ: 테이프 디스펜서 (톱니 커터날=1획, 팽팽하게 당겨진 테이프=2획, 둥글게 풀려나오는 테이프 롤=3획)
    return (
      <svg viewBox="0 0 200 160" className="w-full h-full select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* 디스펜서 본체 프리미엄 민트 그라디언트 */}
          <linearGradient id="tapeBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A7F3D0" />
            <stop offset="40%" stopColor="#34D399" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>

          {/* 투명 테이프 반투명 샤인 그라디언트 */}
          <linearGradient id="tapeStripGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ECFDF5" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#D1FAE5" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#A7F3D0" stopOpacity="0.8" />
          </linearGradient>

          {/* 테이프 롤러 코어 원형 그라디언트 */}
          <radialGradient id="tapeRollGrad" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="65%" stopColor="#E2E8F0" />
            <stop offset="100%" stopColor="#94A3B8" />
          </radialGradient>

          {/* 스테인리스 톱니 커터날 메탈 그라디언트 */}
          <linearGradient id="metalBladeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="40%" stopColor="#E2E8F0" />
            <stop offset="100%" stopColor="#64748B" />
          </linearGradient>
        </defs>

        {/* 1. 바닥 그림자 */}
        <ellipse cx="106" cy="144" rx="62" ry="7" fill="#E2E8F0" />
        <ellipse cx="94" cy="144" rx="42" ry="4.5" fill="#CBD5E1" opacity="0.6" />

        {/* 2. 테이프 디스펜서 본체 (묵직하고 매끄러운 유선형 데스크 디스펜서) */}
        {/* 디스펜서 메인 프레임 바디 */}
        <path
          d="M 46 142 
             C 36 142 32 134 32 118 
             C 32 96 46 82 66 80 
             C 74 79 84 82 92 86 
             L 142 86 
             C 156 86 166 74 168 60 
             L 174 60 
             C 174 88 158 142 144 142 
             Z"
          fill="url(#tapeBodyGrad)"
          stroke="#047857"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />

        {/* 바디 하단 고무 논슬립 패드 베이스 */}
        <path
          d="M 44 140 L 146 140 C 146 143 144 145 141 145 L 49 145 C 46 145 44 143 44 140 Z"
          fill="#065F46"
        />

        {/* 3. [★ 3획 매칭] 둥근 테이프 롤 & 풀려나오는 곡선 (Tape Roll Hub) */}
        {/* 테이프 롤 안착 홀더 홈 */}
        <circle cx="84" cy="108" r="28" fill="#065F46" opacity="0.15" />

        {/* 감겨 있는 반투명 테이프 롤러 휠 */}
        <circle cx="84" cy="108" r="25" fill="#D1FAE5" stroke="#10B981" strokeWidth="1.5" />
        <circle cx="84" cy="108" r="21" fill="#A7F3D0" opacity="0.7" />
        <circle cx="84" cy="108" r="16" fill="url(#tapeRollGrad)" stroke="#64748B" strokeWidth="1.2" />

        {/* 롤러 센터 회전축 핀 */}
        <circle cx="84" cy="108" r="7" fill="#047857" stroke="#FFFFFF" strokeWidth="1.2" />
        <circle cx="84" cy="108" r="3" fill="#FFFFFF" />

        {/* [3획 곡선 삐침 강조] 롤러에서 위로 풀려나와 2획과 만나는 테이프 바깥쪽 둘레 곡선 */}
        <path
          d="M 72 134 C 95 124 105 100 106 74"
          stroke="#059669"
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.45"
        />
        <path
          d="M 72 134 C 95 124 105 100 106 74"
          stroke="#34D399"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* 4. [★ 2획 매칭] 롤에서 커터날까지 팽팽하게 뻗은 가로 테이프 띠 (Tape Strip) */}
        <g id="tape-pulled-strip">
          {/* 테이프 몸체 밴드 */}
          <rect
            x="54"
            y="66"
            width="104"
            height="11"
            rx="2.5"
            fill="url(#tapeStripGrad)"
            stroke="#10B981"
            strokeWidth="1.2"
          />
          {/* 테이프 표면 하이라이트 투명 반사광 */}
          <line x1="58" y1="69" x2="152" y2="69" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" opacity="0.9" />
          <line x1="62" y1="74" x2="148" y2="74" stroke="#6EE7B7" strokeWidth="0.9" strokeDasharray="4 3" opacity="0.8" />
          
          {/* 커터날 너머로 살짝 튀어나와 잡기 쉽게 접힌 테이프 탭(End tab) */}
          <path
            d="M 158 67 L 165 67 L 163 75 L 158 75 Z"
            fill="#6EE7B7"
            stroke="#059669"
            strokeWidth="0.8"
          />
        </g>

        {/* 5. [★ 1획 매칭] 상단 메탈 톱니 커터날 & 커터 브래킷 (Metal Cutter Blade) */}
        <g id="tape-cutter-blade">
          {/* 커터 지지대 헤드 */}
          <rect x="74" y="49" width="60" height="7" rx="1.5" fill="#334155" stroke="#1E293B" strokeWidth="1" />
          
          {/* 메탈 블레이드 베이스 바 (1획 상단 가로선) */}
          <rect
            x="76"
            y="44"
            width="56"
            height="6"
            rx="1.2"
            fill="url(#metalBladeGrad)"
            stroke="#475569"
            strokeWidth="1"
          />

          {/* 스테인리스 날카로운 톱니바퀴 디테일 (Zigzag Teeth) */}
          <path
            d="M 78 44 
               L 80 41 L 82 44 
               L 84 41 L 86 44 
               L 88 41 L 90 44 
               L 92 41 L 94 44 
               L 96 41 L 98 44 
               L 100 41 L 102 44 
               L 104 41 L 106 44 
               L 108 41 L 110 44 
               L 112 41 L 114 44 
               L 116 41 L 118 44 
               L 120 41 L 122 44 
               L 124 41 L 126 44 
               L 128 41 L 130 44"
            stroke="#475569"
            strokeWidth="1"
            fill="#CBD5E1"
            strokeLinejoin="round"
          />

          {/* 메탈 블레이드 반짝이는 크롬 하이라이트 */}
          <line x1="80" y1="46" x2="126" y2="46" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" />
        </g>

        {/* 6. 산뜻하고 경쾌한 데스크 스파클 & 모션 이펙트 (✨) */}
        {/* 커터날 쪽 메탈 샤인 */}
        <path d="M 136 34 L 138 27 L 140 34 L 147 36 L 140 38 L 138 45 L 136 38 L 129 36 Z" fill="#34D399" />
        <circle cx="146" cy="28" r="1.5" fill="#6EE7B7" />

        {/* 테이프 당겨짐 모션 라인 */}
        <path d="M 166 84 C 172 88 174 94 172 100" stroke="#A7F3D0" strokeWidth="1.6" strokeLinecap="round" fill="none" />
        <circle cx="174" cy="92" r="1.2" fill="#34D399" />

        {/* 7. 글자 'テ' 오버레이 (디스펜서와 일체형으로 완벽하게 조화) */}
        <KatakanaCharOverlay char="テ" fontFamily={fontFamily} x="106" y="118" />
      </svg>
    );
  }

  if (char === 'ト') {
    // ト: 토치 (수직 가스 실린더=1획, 우측 사선으로 뻗은 메탈 화구 & 푸른 제트 불꽃=2획)
    return (
      <svg viewBox="0 0 200 160" className="w-full h-full select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* 가스 실린더 메탈릭 코발트 블루 그라디언트 */}
          <linearGradient id="torchCanGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1E3A8A" />
            <stop offset="25%" stopColor="#3B82F6" />
            <stop offset="55%" stopColor="#2563EB" />
            <stop offset="85%" stopColor="#1D4ED8" />
            <stop offset="100%" stopColor="#172554" />
          </linearGradient>

          {/* 캔 상단 메탈 림 그라디언트 */}
          <linearGradient id="torchCanRimGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#94A3B8" />
            <stop offset="50%" stopColor="#F1F5F9" />
            <stop offset="100%" stopColor="#64748B" />
          </linearGradient>

          {/* 토치 헤드 하우징 내열 비비드 오렌지 그라디언트 */}
          <linearGradient id="torchHeadGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FB923C" />
            <stop offset="45%" stopColor="#EA580C" />
            <stop offset="100%" stopColor="#9A3412" />
          </linearGradient>

          {/* 스테인리스 화구 노즐 메탈 크롬 그라디언트 */}
          <linearGradient id="torchNozzleGrad" x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="35%" stopColor="#E2E8F0" />
            <stop offset="70%" stopColor="#94A3B8" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>

          {/* 초고온 제트 코어 불꽃 그라디언트 (화이트 -> 사이언 -> 블루) */}
          <linearGradient id="torchFlameCoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="40%" stopColor="#67E8F9" />
            <stop offset="100%" stopColor="#0284C7" />
          </linearGradient>

          {/* 외부 화염 플레어 그라디언트 (스카이블루 -> 앰버 -> 오렌지) */}
          <linearGradient id="torchFlameOuterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#FBBF24" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#F97316" stopOpacity="0.75" />
          </linearGradient>
        </defs>

        {/* 1. 바닥 그림자 */}
        <ellipse cx="106" cy="144" rx="58" ry="7" fill="#E2E8F0" />
        <ellipse cx="97" cy="144" rx="36" ry="4.5" fill="#CBD5E1" opacity="0.6" />

        {/* 2. [★ 1획 매칭] 우뚝 선 수직 부탄가스 실린더 & 토치 헤드 본체 */}
        {/* 가스 캔 하단 베이스 논슬립 링 */}
        <rect x="85" y="137" width="24" height="5" rx="2" fill="#1E293B" />

        {/* 부탄가스 캔 메인 실린더 바디 */}
        <rect
          x="87"
          y="56"
          width="20"
          height="82"
          rx="3.5"
          fill="url(#torchCanGrad)"
          stroke="#1E3A8A"
          strokeWidth="1.2"
        />

        {/* 가스 캔 표면 하이라이트 샤인 */}
        <line x1="91" y1="58" x2="91" y2="135" stroke="#93C5FD" strokeWidth="1.5" strokeLinecap="round" opacity="0.85" />

        {/* 가스 캔 화이트 브랜드 라벨 밴드 */}
        <rect x="87" y="86" width="20" height="20" fill="#F8FAFC" opacity="0.9" />
        <line x1="88" y1="88" x2="106" y2="88" stroke="#F97316" strokeWidth="1.2" />
        <line x1="88" y1="104" x2="106" y2="104" stroke="#0284C7" strokeWidth="1.2" />
        {/* 라벨 내부 미니 가스 심볼 */}
        <circle cx="97" cy="96" r="3" fill="#EA580C" opacity="0.9" />
        <circle cx="97" cy="96" r="1.2" fill="#FEF08A" />

        {/* 캔 상단 목 결합 림 (Collar Rim) */}
        <rect x="90" y="50" width="14" height="6" rx="1.5" fill="url(#torchCanRimGrad)" stroke="#64748B" strokeWidth="0.8" />

        {/* 토치 헤드 본체 유닛 (내열 오렌지 하우징) */}
        <rect
          x="86"
          y="26"
          width="22"
          height="25"
          rx="4"
          fill="url(#torchHeadGrad)"
          stroke="#9A3412"
          strokeWidth="1.2"
        />

        {/* 토치 후면 황동 화력 조절 밸브 노브 (황동 다이얼) */}
        <rect x="78" y="32" width="8" height="13" rx="2" fill="#F59E0B" stroke="#B45309" strokeWidth="1" />
        <line x1="81" y1="34" x2="81" y2="43" stroke="#92400E" strokeWidth="0.8" />
        <line x1="83" y1="34" x2="83" y2="43" stroke="#92400E" strokeWidth="0.8" />

        {/* 상단 원터치 압전 점화 푸시 버튼 (Piezo Trigger Button) */}
        <rect x="91" y="21" width="12" height="6" rx="2" fill="#334155" stroke="#1E293B" strokeWidth="1" />
        <line x1="94" y1="21" x2="94" y2="18" stroke="#EF4444" strokeWidth="1.8" strokeLinecap="round" />

        {/* 토치 전면 결합 소켓 링 */}
        <circle cx="98" cy="42" r="5" fill="#334155" stroke="#1E293B" strokeWidth="1" />

        {/* 3. [★ 2획 매칭] 우측 사선 스테인리스 화구 노즐 & 힘차게 뿜어내는 푸른 제트 불꽃 */}
        {/* 화구 노즐 연결 지지 암 */}
        <path d="M 97 60 L 105 70" stroke="#475569" strokeWidth="4.5" strokeLinecap="round" />

        {/* 스테인리스 화구 튜브 (각도 38° 우하향 사선) */}
        <polygon
          points="104,65 132,87 127,94 99,72"
          fill="url(#torchNozzleGrad)"
          stroke="#475569"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        {/* 화구 파이프 크롬 반사 하이라이트 */}
        <line x1="102" y1="67" x2="130" y2="89" stroke="#FFFFFF" strokeWidth="1.3" strokeLinecap="round" />

        {/* 노즐 공기 흡입 에어 벤트 홀 */}
        <ellipse cx="110" cy="74" rx="1.5" ry="3" transform="rotate(-38 110 74)" fill="#1E293B" />
        <ellipse cx="116" cy="79" rx="1.5" ry="3" transform="rotate(-38 116 79)" fill="#1E293B" />

        {/* 노즐 앞단 크롬 가드 링 팁 */}
        <line x1="125" y1="96" x2="134" y2="85" stroke="#334155" strokeWidth="2.8" strokeLinecap="round" />

        {/* [화구 끝에서 분사되는 고온 제트 불꽃!] */}
        {/* 바깥쪽 타오르는 외염 (Outer Flame) */}
        <path
          d="M 130 85 
             C 142 87 156 97 163 113 
             C 150 113 138 103 124 95 
             Z"
          fill="url(#torchFlameOuterGrad)"
        />

        {/* 안쪽 초고온 코어 집중 제트 화염 (Core Jet Flame) */}
        <path
          d="M 130 87 
             C 137 89 146 96 150 105 
             C 141 104 133 98 126 93 
             Z"
          fill="url(#torchFlameCoreGrad)"
        />

        {/* 코어 중심 초고온 화이트 빔 */}
        <line x1="128" y1="89" x2="144" y2="101" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" opacity="0.95" />

        {/* 4. 열기 모션 & 불꽃 스파클 (✨) */}
        {/* 화염 끝 튀는 주황빛 불티 & 스파클 */}
        <path d="M 166 104 L 168 98 L 170 104 L 176 106 L 170 108 L 168 114 L 166 108 L 160 106 Z" fill="#F59E0B" />
        <circle cx="174" cy="116" r="1.5" fill="#F97316" />
        <circle cx="158" cy="122" r="1.2" fill="#FB923C" />
        <circle cx="148" cy="80" r="1" fill="#38BDF8" />

        {/* 5. 글자 'ト' 오버레이 (가스 토치 기둥과 화구 불꽃 위에 선명하게 안착) */}
        <KatakanaCharOverlay char="ト" fontFamily={fontFamily} x="106" y="118" />
      </svg>
    );
  }

  return null;
}
