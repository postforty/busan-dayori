import React from 'react';
import { KatakanaMnemonicSvgChildProps } from './types';
import KatakanaCharOverlay from './KatakanaCharOverlay';

export default function KatakanaRowYa({ char, fontFamily }: KatakanaMnemonicSvgChildProps) {
  if (char === 'ヤ') {
    // ヤ: 야구 (홈런을 향해 시원하게 배트를 휘두르는 타자와 날아가는 실밥 선명한 야구공!)
    // ⚠️ 1획 가로 및 꺾임: 타자의 호쾌한 풀스윙 궤적(바람 아크) & 헬멧 챙,
    //    2획 메인 기둥: 홈플레이트를 향해 시원하게 내리꽂히는 원목 야구 배트(두툼한 배럴-그립-노브)와 배트를 꽉 쥔 타자의 양손(배팅 장갑 & 팔)
    return (
      <svg viewBox="0 0 200 160" className="w-full h-full select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* 야구장 다이아몬드 천연잔디 그라디언트 */}
          <linearGradient id="katakana-ya-grass" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#15803D" />
            <stop offset="50%" stopColor="#22C55E" />
            <stop offset="100%" stopColor="#16A34A" />
          </linearGradient>

          {/* 타석 내야 클레이 흙 마운드 그라디언트 */}
          <linearGradient id="katakana-ya-dirt" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F5D0A9" />
            <stop offset="100%" stopColor="#C2884A" />
          </linearGradient>

          {/* 최고급 원목 야구 배트 그라디언트 */}
          <linearGradient id="katakana-ya-bat" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="45%" stopColor="#F59E0B" />
            <stop offset="85%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#78350F" />
          </linearGradient>

          {/* 야구공 입체 쉐이딩 그라디언트 */}
          <radialGradient id="katakana-ya-ball" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="70%" stopColor="#F8FAFC" />
            <stop offset="100%" stopColor="#CBD5E1" />
          </radialGradient>

          {/* 타자 블루 프로 헬멧 그라디언트 */}
          <linearGradient id="katakana-ya-helmet" x1="20%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="50%" stopColor="#1D4ED8" />
            <stop offset="100%" stopColor="#1E3A8A" />
          </linearGradient>

          {/* 스윙 바람 아크 그라디언트 */}
          <linearGradient id="katakana-ya-swing" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.85" />
            <stop offset="60%" stopColor="#60A5FA" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#93C5FD" stopOpacity="0.08" />
          </linearGradient>
        </defs>

        {/* 1. 배경: 야구장 그라운드 (푸른 외야 잔디 & 타석 흙 마운드 & 홈플레이트) */}
        {/* 외야 천연잔디 */}
        <path
          d="M 0 134 C 40 128 100 124 200 132 L 200 160 L 0 160 Z"
          fill="url(#katakana-ya-grass)"
        />
        {/* 잔디 스트라이프 결 */}
        <path d="M 15 132 L 38 160 M 70 128 L 94 160 M 142 127 L 166 160" stroke="#166534" strokeWidth="2.8" opacity="0.35" />

        {/* 내야 타석(배터스 박스) 흙 마운드 */}
        <ellipse cx="106" cy="144" rx="68" ry="13" fill="url(#katakana-ya-dirt)" opacity="0.95" />

        {/* 배터스 박스 백선 라인 (흰색 초크선) */}
        <path
          d="M 48 140 C 72 136 138 136 162 140"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeDasharray="6 3"
          strokeLinecap="round"
        />

        {/* 오각형 홈플레이트 베이스 */}
        <polygon
          points="96,143 116,143 121,148 106,153 91,148"
          fill="#FFFFFF"
          stroke="#94A3B8"
          strokeWidth="1.5"
        />

        {/* 2. 호쾌한 풀스윙 궤적 (Swing Motion Arc) - 글자 ヤ의 1획 가로 및 꺾임선과 일치 */}
        <path
          d="M 52 74 C 74 50 124 48 142 66 C 150 78 142 98 126 112"
          stroke="url(#katakana-ya-swing)"
          strokeWidth="10"
          strokeLinecap="round"
        />
        {/* 청량한 블루/화이트 스피드 라인 */}
        <path
          d="M 56 76 C 76 54 122 52 138 70 C 144 82 138 98 124 110"
          stroke="#38BDF8"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M 64 84 C 82 62 116 60 130 76 C 134 86 128 98 118 106"
          stroke="#FFFFFF"
          strokeWidth="1.6"
          strokeDasharray="7 4"
          strokeLinecap="round"
        />

        {/* 3. 타자 상체 & 블루 프로 헬멧 (Batter Silhouette & Helmet) */}
        {/* 타자 어깨/등 깔끔한 유니폼 실루엣 */}
        <path
          d="M 62 62 C 68 52 78 48 88 50 C 92 54 92 62 88 68 C 80 72 70 72 62 62 Z"
          fill="#F8FAFC"
          stroke="#94A3B8"
          strokeWidth="1.4"
        />

        {/* 타자 블루 프로 헬멧 */}
        <circle cx="82" cy="38" r="13" fill="url(#katakana-ya-helmet)" stroke="#1E3A8A" strokeWidth="1.6" />
        {/* 헬멧 광택 하이라이트 */}
        <path d="M 75 32 C 79 28 87 28 91 32" stroke="#93C5FD" strokeWidth="1.8" strokeLinecap="round" />
        {/* 헬멧 챙 (Visor) */}
        <path
          d="M 72 37 L 58 39 C 56 39 60 43 70 42 Z"
          fill="#1D4ED8"
          stroke="#1E3A8A"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
        {/* 헬멧 귀덮개 */}
        <path d="M 80 42 C 80 47 84 49 88 47" stroke="#1D4ED8" strokeWidth="1.4" fill="#1E3A8A" />
        {/* 헬멧 화이트 로고 스타 마크 */}
        <circle cx="72" cy="36" r="2.2" fill="#FFFFFF" />

        {/* 4. ★ 원목 야구 배트 (Baseball Bat) - 글자 ヤ 2획 기둥 축과 1:1 완벽 일치! ★ */}
        <g id="baseball-bat">
          {/* 두툼하고 품격 있는 원목 배럴 (상단 타격부) - 글자 2획 상단을 감싸며 좌우로 노출 */}
          <path
            d="M 83 38 L 101 42 L 109 80 L 93 78 Z"
            fill="url(#katakana-ya-bat)"
            stroke="#78350F"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          {/* 배트 헤드 캡 */}
          <ellipse cx="92" cy="40" rx="9" ry="4.5" fill="#FDE68A" stroke="#78350F" strokeWidth="1.4" transform="rotate(13 92 40)" />
          {/* 배트 나뭇결 광택 하이라이트 */}
          <path d="M 88 44 L 97 78" stroke="#FEF3C7" strokeWidth="1.6" strokeLinecap="round" opacity="0.9" />
          <path d="M 94 44 L 103 78" stroke="#FEF3C7" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
          {/* 배트 골드 엠블럼 링 */}
          <ellipse cx="101" cy="74" rx="7.5" ry="3" fill="#FDE047" stroke="#B45309" strokeWidth="1" transform="rotate(13 101 74)" />

          {/* 배트 손잡이(핸들) & 화이트 배팅 그립 테이프 (글자 2획 하단과 정밀 일치) */}
          <path
            d="M 95 80 L 108 82 L 114 126 L 102 124 Z"
            fill="#FFFFFF"
            stroke="#64748B"
            strokeWidth="1.5"
          />
          {/* 그립 테이프 정갈한 래핑 결 */}
          <path d="M 96 88 L 107 91 M 98 97 L 109 100 M 100 106 L 111 109 M 101 115 L 112 118 M 102 122 L 113 125" stroke="#94A3B8" strokeWidth="1.2" strokeLinecap="round" />

          {/* 배트 끝 원목 노브 (Knob) - 홈플레이트 바로 위(y=128)에서 단단하게 마감 */}
          <ellipse cx="108" cy="128" rx="7" ry="3.5" fill="#78350F" stroke="#451A03" strokeWidth="1.4" transform="rotate(13 108 128)" />
          <ellipse cx="108" cy="128" rx="4" ry="2" fill="#B45309" transform="rotate(13 108 128)" />
        </g>

        {/* 5. 타격 임팩트 (CRACK!) 폭발 스파크 & 충격파 */}
        <ellipse cx="134" cy="48" rx="14" ry="7" fill="none" stroke="#FDE047" strokeWidth="1.8" opacity="0.85" transform="rotate(-20 134 48)" />
        {/* 화려한 타격 스파크 별 (Star-burst) */}
        <path
          d="M 134 36 L 137 45 L 146 44 L 139 50 L 144 58 L 135 53 L 128 59 L 131 50 L 123 46 L 132 45 Z"
          fill="#FEF08A"
          stroke="#F59E0B"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        {/* 번쩍이는 광선 파편들 */}
        <path d="M 122 34 L 116 28 M 148 34 L 154 28 M 126 62 L 120 68" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" />

        {/* 6. 특대형 시그니처 야구공 (Baseball) - 우측 상단으로 뻗어나가는 홈런 타구! */}
        <g id="baseball">
          {/* 야구공 회전 비행 스피드 라인 (홈런 속도감) */}
          <path d="M 172 40 L 192 36 M 174 48 L 196 48 M 171 56 L 190 60" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" opacity="0.85" />
          <path d="M 173 44 L 188 42 M 173 52 L 191 54" stroke="#94A3B8" strokeWidth="1.4" strokeLinecap="round" />

          {/* 야구공 본체 (크고 입체적인 구형) */}
          <circle cx="156" cy="48" r="14" fill="url(#katakana-ya-ball)" stroke="#334155" strokeWidth="1.8" />

          {/* ★ 야구공의 영혼: 선명한 레드 실밥 (Stitches) ★ */}
          {/* 왼쪽 붉은 솔기(Seam) 곡선 */}
          <path
            d="M 149 36 C 153 42 153 54 149 60"
            stroke="#DC2626"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          {/* 왼쪽 실밥 V자 자수 스티치들 */}
          <path d="M 147 38 L 150 40 L 147 42" stroke="#DC2626" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 149 44 L 152 46 L 149 48" stroke="#DC2626" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 149 50 L 152 52 L 149 54" stroke="#DC2626" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 147 56 L 150 57 L 147 59" stroke="#DC2626" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />

          {/* 오른쪽 붉은 솔기(Seam) 곡선 */}
          <path
            d="M 163 36 C 159 42 159 54 163 60"
            stroke="#DC2626"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          {/* 오른쪽 실밥 V자 자수 스티치들 */}
          <path d="M 165 38 L 162 40 L 165 42" stroke="#DC2626" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 163 44 L 160 46 L 163 48" stroke="#DC2626" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 163 50 L 160 52 L 163 54" stroke="#DC2626" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 165 56 L 162 57 L 165 59" stroke="#DC2626" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />

          {/* 야구공 광택 하이라이트 */}
          <circle cx="152" cy="42" r="2.5" fill="#FFFFFF" opacity="0.9" />
        </g>

        {/* 7. 글자 'ヤ' 오버레이 */}
        <KatakanaCharOverlay char="ヤ" fontFamily={fontFamily} x="106" y="118" />
      </svg>
    );
  }

  if (char === 'ユ') {
    // ユ: 유턴 (하단 차선에서 진입하여 우측 코너를 돌아 상단 좌측으로 빠져나가는 직관적인 일체형 U-Turn 화살표)
    return (
      <svg viewBox="0 0 200 160" className="w-full h-full select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* 아스팔트 도로 노면 본체 */}
        <rect x="26" y="24" width="148" height="122" rx="16" fill="#1E293B" stroke="#0F172A" strokeWidth="2.5" />

        {/* 도로 외곽 황색 안전선 (상단/하단 갓길) */}
        <line x1="32" y1="32" x2="168" y2="32" stroke="#F59E0B" strokeWidth="2" opacity="0.4" />
        <line x1="32" y1="138" x2="168" y2="138" stroke="#F59E0B" strokeWidth="2" opacity="0.4" />

        {/* 상/하행 차선 분리 중앙 노면 점선 (유턴 회전 구역 앞까지) */}
        <line x1="34" y1="84" x2="108" y2="84" stroke="#F8FAFC" strokeWidth="3.5" strokeDasharray="9 6" />

        {/* ★ 일체형 대형 노면 유턴 화살표 본체 (하단 진입 → 우측 회전 → 상단 좌측 출구) ★ */}
        <path
          d="M 52 114 L 134 114 L 134 54 L 66 54"
          stroke="#FACC15"
          strokeWidth="15"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 유턴 화살표 중앙 도로 질감 유도 점선 */}
        <path
          d="M 54 114 L 134 114 L 134 54 L 68 54"
          stroke="#FFFFFF"
          strokeWidth="2.2"
          strokeDasharray="6 4"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.9"
        />

        {/* ★ 상단 좌측 출구 대형 유턴 화살표 머리 (Arrowhead: ← 방향) ★ */}
        <polygon
          points="44,54 70,38 70,70"
          fill="#FACC15"
          stroke="#EAB308"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        {/* 화살표 헤드 하이라이트 입체선 */}
        <polygon points="48,54 68,41 68,67" fill="#FDE047" opacity="0.6" />

        {/* 글자 'ユ' 오버레이 */}
        <KatakanaCharOverlay char="ユ" fontFamily={fontFamily} x="106" y="118" />
      </svg>
    );
  }

  if (char === 'ヨ') {
    // ヨ: 요트 (푸른 바다를 가르는 요트의 돛대와 바람을 안은 3단 세일 형태)
    // ⚠️ 메인 기둥 (Mast): 높이 솟은 요트 중심 돛대(x=127)
    //    3단 돛(Sail): 글자 ヨ 모양과 1:1 일치하는 3단 입체 세일 날개
    //      - 1단 상단 돛: 1획 가로선과 일치 (y=52)
    //      - 2단 중단 돛: 2획 중간선과 일치 (y=85)
    //      - 3단 하단 돛 & 붐대: 3획 하단선과 일치 (y=118)
    //    선체(Hull): 물살을 가르며 하얀 물보라를 일으키는 유선형 레이싱 요트 바디
    return (
      <svg
        viewBox="0 0 200 160"
        className="w-full h-full select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* 바다 그라디언트 (청량하고 깊은 코발트 블루) */}
          <linearGradient id="katakana-yo-sea" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0284C7" />
            <stop offset="35%" stopColor="#0369A1" />
            <stop offset="100%" stopColor="#0C4A6E" />
          </linearGradient>

          {/* 파도 포말 및 수면 하이라이트 */}
          <linearGradient id="katakana-yo-wave" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#BAE6FD" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.8" />
          </linearGradient>

          {/* 화이트 요트 선체(Hull) 펄 그라디언트 */}
          <linearGradient id="katakana-yo-hull" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="55%" stopColor="#F8FAFC" />
            <stop offset="85%" stopColor="#E2E8F0" />
            <stop offset="100%" stopColor="#CBD5E1" />
          </linearGradient>

          {/* 메인 3단 세일(주 돛) 입체 쉐이딩 그라디언트 */}
          <linearGradient id="katakana-yo-sail" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="60%" stopColor="#F0F9FF" />
            <stop offset="100%" stopColor="#BAE6FD" />
          </linearGradient>

          {/* 알루미늄 마스트(돛대) 메탈 그라디언트 */}
          <linearGradient id="katakana-yo-mast" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F1F5F9" />
            <stop offset="45%" stopColor="#94A3B8" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>
        </defs>

        {/* 1. 배경 하늘 & 갈매기 & 청량한 바닷바람 */}
        {/* 하늘 뭉게구름 */}
        <path
          d="M 14 26 Q 24 20 34 26 Q 44 22 54 26 L 14 26 Z"
          fill="#F0F9FF"
          opacity="0.85"
        />
        {/* 날아가는 갈매기 실루엣 */}
        <path
          d="M 28 18 C 32 14 36 15 39 19 C 42 15 46 14 50 18"
          stroke="#0284C7"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path
          d="M 166 16 C 170 12 173 13 176 17 C 179 13 182 12 186 16"
          stroke="#0284C7"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.75"
        />
        {/* 청량한 바닷바람 스트림 라인 */}
        <path
          d="M 18 42 C 34 38 58 44 74 40"
          stroke="#38BDF8"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.45"
          strokeDasharray="5 3"
        />
        <path
          d="M 12 70 C 26 66 48 72 64 68"
          stroke="#38BDF8"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.35"
          strokeDasharray="4 3"
        />

        {/* 2. 시원하고 깊은 바다와 출렁이는 파도 수면 */}
        {/* 메인 딥블루 바다 수면 */}
        <path
          d="M 0 128 C 35 122 75 132 115 125 C 150 119 180 128 200 124 L 200 160 L 0 160 Z"
          fill="url(#katakana-yo-sea)"
        />
        {/* 파도 크레스트 포말 라인 */}
        <path
          d="M 0 134 C 40 128 85 138 125 131 C 160 125 185 132 200 130"
          stroke="url(#katakana-yo-wave)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* 하단 잔잔한 물결 텍스처 */}
        <path
          d="M 15 146 C 45 142 80 148 115 144 C 145 140 175 146 195 143"
          stroke="#38BDF8"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.5"
        />

        {/* 3. ★ 대형 ヨ 형태의 3단 펄럭이는 메인 돛 (Enlarged 3-Tier Mainsail Canvas) ★ */}
        {/* 바람을 가득 머금고 왼쪽으로 큼직하고 시원하게 뻗은 3단 입체 세일 */}
        <path
          d="M 127 38
             C 106 36 78 40 54 46
             C 48 48 48 54 54 56
             C 74 62 98 65 114 68
             C 96 72 68 76 44 80
             C 38 82 38 88 44 90
             C 68 95 96 98 114 102
             C 98 106 74 110 50 114
             C 44 116 44 121 50 122
             L 127 122 Z"
          fill="url(#katakana-yo-sail)"
          stroke="#0284C7"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />

        {/* 돛 내부 은은한 바람결 음영선 */}
        <path d="M 127 44 C 100 44 76 48 58 52" stroke="#BAE6FD" strokeWidth="1.6" fill="none" opacity="0.75" />
        <path d="M 114 74 C 90 77 66 81 48 85" stroke="#BAE6FD" strokeWidth="1.6" fill="none" opacity="0.75" />
        <path d="M 114 107 C 92 111 72 115 54 120" stroke="#BAE6FD" strokeWidth="1.6" fill="none" opacity="0.75" />

        {/* 3단 대형 팽팽한 배튼 살대 라인 */}
        {/* 1단 상단 배튼 (y=52) */}
        <line
          x1="54"
          y1="52"
          x2="127"
          y2="52"
          stroke="#38BDF8"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        <circle cx="54" cy="52" r="2.5" fill="#0284C7" />

        {/* 2단 중단 배튼 (y=85) */}
        <line
          x1="44"
          y1="85"
          x2="127"
          y2="85"
          stroke="#38BDF8"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        <circle cx="44" cy="85" r="2.5" fill="#0284C7" />

        {/* 3단 하단 메인 붐대 라인 (y=121) */}
        <line
          x1="50"
          y1="121"
          x2="127"
          y2="121"
          stroke="#0369A1"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <circle cx="50" cy="121" r="3" fill="#0284C7" stroke="#FFFFFF" strokeWidth="1" />

        {/* 4. ★ 세로 메인 돛대 (Mast) ★ */}
        <line
          x1="127"
          y1="32"
          x2="127"
          y2="124"
          stroke="url(#katakana-yo-mast)"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
        {/* 단정하고 심플한 실버 마스트 캡 */}
        <circle cx="127" cy="32" r="2.5" fill="#E2E8F0" stroke="#475569" strokeWidth="1" />
        {/* 돛대 하단 마스트 스텝 고정 소켓 */}
        <rect x="124" y="122" width="6" height="4" rx="1" fill="#334155" />

        {/* 5. 날렵한 유선형 레이싱 요트 선체 (Sleek Hull) */}
        {/* 요트 선체 본체 */}
        <path
          d="M 38 125 C 64 126 140 126 162 127 L 152 143 C 132 145 74 145 54 141 Z"
          fill="url(#katakana-yo-hull)"
          stroke="#0369A1"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        {/* 선체 측면 마린 블루 레이싱 스트라이프 데칼 */}
        <path
          d="M 44 131 C 70 132 136 132 158 133"
          stroke="#0284C7"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M 48 135 C 72 136 132 136 155 137"
          stroke="#38BDF8"
          strokeWidth="1.2"
          strokeLinecap="round"
        />

        {/* 갑판 콕핏 캐빈 및 틴티드 창문 */}
        <polygon
          points="102,125 106,120 140,120 144,125"
          fill="#F8FAFC"
          stroke="#64748B"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <rect
          x="110"
          y="121"
          width="24"
          height="3"
          rx="1"
          fill="#0284C7"
          opacity="0.8"
        />

        {/* 뱃머리(선수) 물보라 & 물방울 (Bow wave splash) */}
        <path
          d="M 34 126 C 40 121 44 128 50 125"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="32" cy="122" r="1.8" fill="#BAE6FD" />
        <circle cx="28" cy="126" r="1.2" fill="#FFFFFF" />
        <circle cx="36" cy="119" r="1.4" fill="#38BDF8" />

        {/* 6. 글자 'ヨ' 오버레이 */}
        <KatakanaCharOverlay char="ヨ" fontFamily={fontFamily} x="106" y="118" />
      </svg>
    );
  }

  return null;
}
