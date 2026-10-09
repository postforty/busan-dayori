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
    // ユ: 유턴 (도로 위의 각진 U-Turn 회전 화살표와 유턴 표지판)
    return (
      <svg viewBox="0 0 200 160" className="w-full h-full select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* 아스팔트 도로 노면 */}
        <rect x="36" y="34" width="128" height="110" rx="12" fill="#334155" stroke="#1E293B" strokeWidth="2" />

        {/* 흰색 노면 차선 표시 */}
        <line x1="100" y1="38" x2="100" y2="140" stroke="#F8FAFC" strokeWidth="3" strokeDasharray="8 6" />

        {/* 도로 바닥 각진 유턴 화살표 (글자 ユ의 꺾임과 하단 수평 라인) */}
        <path
          d="M 80 54 L 80 114 L 140 114"
          stroke="#FACC15"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* 유턴 화살표 머리 팁 */}
        <polygon points="144,114 130,104 130,124" fill="#FACC15" />

        {/* 유턴 가로 보조선 (글자 ユ 상단) */}
        <line x1="80" y1="54" x2="134" y2="54" stroke="#FACC15" strokeWidth="7" strokeLinecap="round" />

        {/* 도로 유턴 표지판 아이콘 */}
        <circle cx="152" cy="46" r="14" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2" />
        <path d="M 148 40 L 148 50 L 156 50" stroke="#FFFFFF" strokeWidth="2" fill="none" strokeLinecap="round" />

        {/* 글자 'ユ' 오버레이 */}
        <KatakanaCharOverlay char="ユ" fontFamily={fontFamily} x="106" y="118" />
      </svg>
    );
  }

  if (char === 'ヨ') {
    // ヨ: 요트 (파도를 가르는 요트의 돛대와 3단 수평 프레임)
    return (
      <svg viewBox="0 0 200 160" className="w-full h-full select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* 시원한 바다 파도 */}
        <path d="M 10 134 C 40 130 80 136 120 132 C 160 128 190 132 200 130 L 200 160 L 0 160 Z" fill="#E0F2FE" />
        <path d="M 10 134 C 40 130 80 136 120 132 C 160 128 190 132 200 130" stroke="#0284C7" strokeWidth="2.5" />

        {/* 요트 선체 바디 (Hull) */}
        <path d="M 48 132 L 158 132 L 144 144 L 62 144 Z" fill="#FFFFFF" stroke="#0369A1" strokeWidth="2" />

        {/* 세로 메인 돛대 기둥 (글자 ヨ 오른쪽 세로선) */}
        <line x1="134" y1="36" x2="134" y2="134" stroke="#475569" strokeWidth="6" strokeLinecap="round" />

        {/* 삼각 메인 세일 돛 (하얀 돛) */}
        <path d="M 130 44 L 72 120 L 130 120 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />

        {/* 요트 3단 수평 붐대 프레임 (글자 ヨ의 3개 가로 획) */}
        <line x1="72" y1="52" x2="134" y2="52" stroke="#0284C7" strokeWidth="6" strokeLinecap="round" />
        <line x1="84" y1="86" x2="134" y2="86" stroke="#0284C7" strokeWidth="6" strokeLinecap="round" />
        <line x1="68" y1="120" x2="134" y2="120" stroke="#0284C7" strokeWidth="6" strokeLinecap="round" />

        {/* 펄럭이는 돛대 꼭대기 깃발 */}
        <polygon points="134,36 150,42 134,48" fill="#EF4444" />

        {/* 글자 'ヨ' 오버레이 */}
        <KatakanaCharOverlay char="ヨ" fontFamily={fontFamily} x="106" y="118" />
      </svg>
    );
  }

  return null;
}
