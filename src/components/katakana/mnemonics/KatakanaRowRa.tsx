import React from 'react';
import { KatakanaMnemonicSvgChildProps } from './types';
import KatakanaCharOverlay from './KatakanaCharOverlay';

export default function KatakanaRowRa({ char, fontFamily }: KatakanaMnemonicSvgChildProps) {
  if (char === 'ラ') {
    // ラ: 라멘 (빨간 젓가락 두 짝으로 듬뿍 건져 올린 탱글탱글한 라멘 면발!)
    // ⚠️ 1획 상단 가로: 위쪽 빨간 젓가락 (면을 집은 젓가락 상단)
    //    2획 가로선: 아래쪽 빨간 젓가락 (면을 받친 젓가락 하단)
    //    2획 곡선 삐침: 젓가락 사이에서 라멘 그릇으로 주르륵 흘러내리는 쫄깃한 라멘 면발 다발
    return (
      <svg viewBox="0 0 200 160" className="w-full h-full select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* 빨간 옻칠 젓가락 1 (상단) 그라디언트 */}
          <linearGradient id="ra-chopstick-top" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#991B1B" />
            <stop offset="25%" stopColor="#DC2626" />
            <stop offset="65%" stopColor="#EF4444" />
            <stop offset="100%" stopColor="#B91C1C" />
          </linearGradient>

          {/* 빨간 옻칠 젓가락 2 (하단) 그라디언트 */}
          <linearGradient id="ra-chopstick-bottom" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7F1D1D" />
            <stop offset="25%" stopColor="#DC2626" />
            <stop offset="65%" stopColor="#F87171" />
            <stop offset="100%" stopColor="#B91C1C" />
          </linearGradient>

          {/* 젓가락 손잡이 고급 골드 링 그라디언트 */}
          <linearGradient id="ra-gold-band" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>

          {/* 쫄깃한 라면 면발 메인 그라디언트 */}
          <linearGradient id="ra-noodle-main" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="40%" stopColor="#FBBF24" />
            <stop offset="80%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>

          {/* 뜨끈하고 진한 라면 육수 그라디언트 */}
          <radialGradient id="ra-broth-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FEF3C7" />
            <stop offset="45%" stopColor="#FDE68A" />
            <stop offset="85%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#B45309" />
          </radialGradient>

          {/* 일본 전통 라멘 사기그릇 그라디언트 (딥 네이비) */}
          <linearGradient id="ra-bowl-body" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1E3A8A" />
            <stop offset="50%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>

          {/* 반숙 달걀 노른자 그라디언트 */}
          <radialGradient id="ra-egg-yolk" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#EA580C" />
          </radialGradient>
        </defs>

        {/* 1. 배경 온기 & 모락모락 김 (Steam Curls) */}
        <g id="steam-curls" opacity="0.6">
          <path d="M 86 36 Q 80 22 88 10" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" fill="none" strokeDasharray="3 3" />
          <path d="M 124 32 Q 132 18 126 8" stroke="#E2E8F0" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          <path d="M 106 24 Q 100 12 108 4" stroke="#CBD5E1" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.7" />
        </g>

        {/* 2. 하단 라면 그릇 & 육수 & 맛있는 고명 */}
        <g id="ramen-bowl">
          {/* 테이블 그림자 */}
          <ellipse cx="106" cy="154" rx="66" ry="6" fill="#E2E8F0" />

          {/* 도자기 라면 그릇 몸체 */}
          <path d="M 44 130 C 46 153 72 158 106 158 C 140 158 166 153 168 130 Z" fill="url(#ra-bowl-body)" stroke="#0F172A" strokeWidth="1.6" />
          {/* 그릇 받침 굽 */}
          <path d="M 86 157 L 86 160 C 94 161 118 161 126 160 L 126 157 Z" fill="#0F172A" />
          {/* 그릇 외곽 전통 골드 장식 라인 */}
          <path d="M 48 135 C 68 147 144 147 164 135" stroke="url(#ra-gold-band)" strokeWidth="1.2" opacity="0.8" fill="none" />

          {/* 진한 라면 육수 수면 */}
          <ellipse cx="106" cy="130" rx="59" ry="14" fill="url(#ra-broth-glow)" stroke="#B45309" strokeWidth="1.2" />

          {/* 고명 1: 바삭한 김 (Nori) */}
          <path d="M 52 116 L 66 106 L 74 128 L 60 132 Z" fill="#1E293B" stroke="#0F172A" strokeWidth="1" />

          {/* 고명 2: 반숙 아지타마고 (달걀 반쪽) */}
          <g transform="rotate(-12 138 130)">
            <ellipse cx="138" cy="130" rx="14" ry="10" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
            <ellipse cx="137" cy="130" rx="8" ry="6.2" fill="url(#ra-egg-yolk)" />
            <circle cx="135" cy="128" r="2" fill="#FFFFFF" opacity="0.8" />
          </g>

          {/* 고명 3: 나루토마키 (소용돌이 어묵) */}
          <g transform="rotate(8 74 132)">
            <ellipse cx="74" cy="132" rx="11" ry="8" fill="#FFFFFF" stroke="#FECDD3" strokeWidth="1.2" />
            <path d="M 74 132 C 76 129 79 131 78 134 C 76 136 71 135 71 131 C 71 127 78 126 80 130" fill="none" stroke="#F43F5E" strokeWidth="1.6" strokeLinecap="round" />
          </g>

          {/* 고명 4: 송송 썬 대파 (Scallions) */}
          <ellipse cx="94" cy="134" rx="3.5" ry="2" fill="#22C55E" stroke="#15803D" strokeWidth="0.8" transform="rotate(20 94 134)" />
          <ellipse cx="116" cy="136" rx="4" ry="2.2" fill="#4ADE80" stroke="#15803D" strokeWidth="0.8" transform="rotate(-30 116 136)" />
          <ellipse cx="104" cy="140" rx="3.2" ry="1.8" fill="#22C55E" stroke="#15803D" strokeWidth="0.8" />
        </g>

        {/* 3. ★ 쫄깃한 라면 면발 다발 (글자 ラ 2획의 우하단 곡선 궤적과 1:1 완벽 일치) ★ */}
        <g id="noodle-strands">
          {/* 면발 다발 베이스 음영 실루엣 */}
          <path
            d="M 126 68 Q 128 88 116 104 Q 99 120 74 128 L 84 132 Q 107 122 124 104 Q 134 88 132 68 Z"
            fill="url(#ra-noodle-main)"
            stroke="#D97706"
            strokeWidth="1"
          />

          {/* 메인 면발 가닥 1 (라 2획 곡선 중심축) */}
          <path d="M 129 68 Q 127 88 113 105 Q 97 121 75 128" stroke="#F59E0B" strokeWidth="3.4" strokeLinecap="round" fill="none" />
          <path d="M 129 68 Q 127 88 113 105 Q 97 121 75 128" stroke="#FEF08A" strokeWidth="1.5" strokeLinecap="round" fill="none" />

          {/* 메인 면발 가닥 2 (바깥쪽 볼륨) */}
          <path d="M 133 71 Q 131 90 118 107 Q 103 122 82 130" stroke="#D97706" strokeWidth="2.8" strokeLinecap="round" fill="none" />
          <path d="M 133 71 Q 131 90 118 107 Q 103 122 82 130" stroke="#FDE68A" strokeWidth="1.2" strokeLinecap="round" fill="none" />

          {/* 메인 면발 가닥 3 (안쪽 찰랑임) */}
          <path d="M 124 70 Q 122 87 109 103 Q 94 118 70 126" stroke="#F59E0B" strokeWidth="2.6" strokeLinecap="round" fill="none" />

          {/* 젓가락 위로 말려 올라간 탱글탱글한 면발 고리 */}
          <path d="M 118 64 Q 126 59 132 65 Q 136 73 131 82" stroke="#FBBF24" strokeWidth="2.5" strokeLinecap="round" fill="none" />

          {/* 국물 윤기 방울 (Glisten drops) */}
          <circle cx="106" cy="116" r="2" fill="#FDE047" />
          <circle cx="114" cy="98" r="1.6" fill="#FBBF24" />
          <circle cx="88" cy="126" r="1.5" fill="#FEF08A" />
        </g>

        {/* 4. ★ 빨간 옻칠 젓가락 한 쌍 (Chopsticks) - 글자 ラ 1획 및 2획 가로선과 정밀 일치! ★ */}
        <g id="chopsticks">
          {/* 윗쪽 젓가락 (글자 ラ 1획 가로선 매칭) */}
          <g id="chopstick-top">
            <path d="M 52 46 L 152 38 L 151 34 L 52 41 Z" fill="url(#ra-chopstick-top)" stroke="#991B1B" strokeWidth="1" />
            <ellipse cx="52" cy="43.5" rx="2" ry="2.5" fill="#991B1B" />
            {/* 젓가락 광택 하이라이트 */}
            <path d="M 58 43 L 148 36" stroke="#FCA5A5" strokeWidth="1.2" strokeLinecap="round" opacity="0.85" />
            {/* 손잡이 골드 링 장식 */}
            <rect x="64" y="40.5" width="6" height="5" rx="1" fill="url(#ra-gold-band)" stroke="#B45309" strokeWidth="0.6" transform="rotate(-4.5 64 40.5)" />
          </g>

          {/* 아랫쪽 젓가락 (글자 ラ 2획 가로선 매칭) */}
          <g id="chopstick-bottom">
            <path d="M 50 71 L 154 67 L 153 63 L 50 66 Z" fill="url(#ra-chopstick-bottom)" stroke="#991B1B" strokeWidth="1" />
            <ellipse cx="50" cy="68.5" rx="2" ry="2.5" fill="#991B1B" />
            {/* 젓가락 광택 하이라이트 */}
            <path d="M 56 68.5 L 150 65" stroke="#FCA5A5" strokeWidth="1.2" strokeLinecap="round" opacity="0.85" />
            {/* 손잡이 골드 링 장식 */}
            <rect x="62" y="66" width="6" height="5" rx="1" fill="url(#ra-gold-band)" stroke="#B45309" strokeWidth="0.6" transform="rotate(-2.2 62 66)" />
          </g>
        </g>

        {/* 5. 글자 'ラ' 오버레이 (정중앙 투영) */}
        <KatakanaCharOverlay char="ラ" fontFamily={fontFamily} x="106" y="118" />
      </svg>
    );
  }

  if (char === 'リ') {
    // リ: 리본 (★ 히라가나 り와 동일한 선물상자+나비리본 도안 재사용)
    return (
      <svg
        viewBox="0 0 200 160"
        className="w-full h-full select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* 실크 리본 메인 그라디언트 */}
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

          {/* 리본 음영 그라디언트 */}
          <linearGradient id="ri-ribbon-shadow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#881337" />
            <stop offset="100%" stopColor="#BE123C" />
          </linearGradient>

          {/* 선물 상자 본체 그라디언트 */}
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

        {/* 1. 선물 상자 */}
        <rect x="36" y="56" width="128" height="96" rx="8" fill="url(#ri-box-body)" stroke="#FECDD3" strokeWidth="1.4" />
        <rect x="100" y="56" width="16" height="96" fill="url(#ri-gold-band)" opacity="0.85" />
        <line x1="102" y1="56" x2="102" y2="152" stroke="#F59E0B" strokeDasharray="3 2" strokeWidth="0.8" />
        <line x1="114" y1="56" x2="114" y2="152" stroke="#F59E0B" strokeDasharray="3 2" strokeWidth="0.8" />
        <rect x="36" y="56" width="128" height="5" fill="#E11D48" opacity="0.1" />
        <rect x="28" y="38" width="144" height="18" rx="5" fill="url(#ri-box-lid)" stroke="#FDA4AF" strokeWidth="1.6" />
        <rect x="28" y="44" width="144" height="6" fill="url(#ri-gold-band)" opacity="0.85" />
        <rect x="100" y="38" width="16" height="18" fill="url(#ri-gold-band)" opacity="0.95" />

        {/* 2. 선물 태그 */}
        <g id="gift-tag">
          <path d="M 116 42 Q 136 44 144 54" stroke="#D97706" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="2 1.5" />
          <rect x="136" y="52" width="22" height="15" rx="3" fill="#FFF1F2" stroke="#F43F5E" strokeWidth="1.2" transform="rotate(16 136 52)" />
          <circle cx="140" cy="56" r="1.3" fill="#FDA4AF" />
          <path d="M 148 60 C 146 58 144 60 148 64 C 152 60 150 58 148 60 Z" fill="#E11D48" />
        </g>

        {/* 3. 리본 꼬리 (り 1획, 2획 매칭) */}
        <g id="left-streamer">
          <path
            d="M 80 44 L 80 78 C 80 84 76 88 72 88 L 81 83 L 90 92 C 91 88 94 82 94 76 L 94 44 Z"
            fill="url(#ri-ribbon-grad)"
            stroke="#BE123C"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path d="M 86 46 L 86 78 C 86 82 84 84 81 83" stroke="#FFF1F2" strokeWidth="1.6" strokeLinecap="round" opacity="0.9" />
          <path d="M 80 72 C 84 74 88 74 94 71" stroke="#E11D48" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
        </g>
        <g id="right-streamer">
          <path
            d="M 118 45 C 128 52 134 70 134 92 C 134 116 124 130 108 138 L 104 129 L 95 127 C 110 120 117 106 117 88 C 117 70 113 55 106 45 Z"
            fill="url(#ri-ribbon-grad)"
            stroke="#BE123C"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path d="M 124 49 C 126 70 126 92 122 112 C 119 122 113 126 104 129" stroke="#FFF1F2" strokeWidth="2" strokeLinecap="round" opacity="0.9" />
          <path d="M 118 78 C 123 80 128 80 133 79" stroke="#9F1239" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
          <path d="M 115 102 C 119 104 123 104 127 103" stroke="#9F1239" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
        </g>

        {/* 4. 나비 리본 매듭 */}
        <g id="ribbon-bow">
          <path
            d="M 103 36 C 94 16 58 14 44 26 C 32 36 36 50 60 52 C 80 54 98 44 103 39 Z"
            fill="url(#ri-ribbon-loop)"
            stroke="#BE123C"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <ellipse cx="60" cy="36" rx="9.5" ry="6.5" fill="url(#ri-ribbon-shadow)" transform="rotate(-12 60 36)" />
          <path d="M 46 26 C 60 18 82 22 95 32" stroke="#FFF1F2" strokeWidth="2" strokeLinecap="round" />
          <path d="M 94 38 C 82 41 72 44 64 47" stroke="#BE123C" strokeWidth="1.2" strokeLinecap="round" />
          <path
            d="M 113 36 C 122 16 158 14 172 26 C 184 36 180 50 156 52 C 136 54 118 44 113 39 Z"
            fill="url(#ri-ribbon-loop)"
            stroke="#BE123C"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <ellipse cx="156" cy="36" rx="9.5" ry="6.5" fill="url(#ri-ribbon-shadow)" transform="rotate(12 156 36)" />
          <path d="M 170 26 C 156 18 134 22 121 32" stroke="#FFF1F2" strokeWidth="2" strokeLinecap="round" />
          <path d="M 122 38 C 134 41 144 44 152 47" stroke="#BE123C" strokeWidth="1.2" strokeLinecap="round" />
          <rect x="99" y="28" width="18" height="20" rx="5" fill="url(#ri-ribbon-knot)" stroke="#881337" strokeWidth="1.8" />
          <path d="M 104 29 C 103 36 103 42 104 47" stroke="#FFF1F2" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M 112 29 C 113 36 113 42 112 47" stroke="#9F1239" strokeWidth="1.4" strokeLinecap="round" />
        </g>

        {/* 5. 반짝이 스파클 */}
        <g id="sparkles">
          <path d="M 52 74 L 54 66 L 56 74 L 64 76 L 56 78 L 54 86 L 52 78 L 44 76 Z" fill="url(#ri-sparkle)" />
          <path d="M 40 92 L 41.5 88 L 43 92 L 47 93.5 L 43 95 L 41.5 99 L 40 95 L 36 93.5 Z" fill="#FDE047" />
          <path d="M 160 114 L 161.5 109 L 163 114 L 168 115.5 L 163 117 L 161.5 122 L 160 117 L 155 115.5 Z" fill="url(#ri-sparkle)" />
          <circle cx="68" cy="64" r="1.5" fill="#FDE047" />
          <circle cx="152" cy="100" r="1.5" fill="#FDE047" />
          <circle cx="168" cy="128" r="1.2" fill="#FDE047" />
        </g>

        {/* 글자 'リ' 오버레이 */}
        <KatakanaCharOverlay char="リ" fontFamily={fontFamily} x="108" y="118" />
      </svg>
    );
  }

  if (char === 'ル') {
    // ル: 루돌프 (신나게 눈밭을 내달리는 빨간 코 루돌프의 앞다리 1획과 힘차게 차는 뒷다리 2획!)
    // ⚠️ 1획 왼쪽 삐침: 앞으로 시원하게 뻗은 루돌프의 날렵한 앞다리 (발굽)
    //    2획 수직-곡선 치켜올림: 껑충 뛰어오르며 뒤로 힘차게 발길질하는 탄력 있는 뒷다리 (발굽)
    //    상단: 영롱하게 빛나는 루돌프의 상징적인 '빨간 코' & 멋진 뿔 & 방울 목걸이
    return (
      <svg viewBox="0 0 200 160" className="w-full h-full select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* 루돌프 사슴 몸체 웜 브라운 그라디언트 */}
          <linearGradient id="ru-fur-main" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="35%" stopColor="#D97706" />
            <stop offset="85%" stopColor="#B45309" />
            <stop offset="100%" stopColor="#92400E" />
          </linearGradient>

          {/* 루돌프 엉덩이 & 뒷다리 하이라이트 그라디언트 */}
          <linearGradient id="ru-fur-hind" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FBBF24" />
            <stop offset="50%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#92400E" />
          </linearGradient>

          {/* 앞다리 뻗음 그라디언트 */}
          <linearGradient id="ru-fur-front" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FBBF24" />
            <stop offset="60%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>

          {/* 반짝이는 빨간 코 광채 그라디언트 */}
          <radialGradient id="ru-nose-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#EF4444" stopOpacity="0.85" />
            <stop offset="45%" stopColor="#F87171" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#FCA5A5" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="ru-nose-core" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FECDD3" />
            <stop offset="25%" stopColor="#F43F5E" />
            <stop offset="75%" stopColor="#E11D48" />
            <stop offset="100%" stopColor="#9F1239" />
          </radialGradient>

          {/* 루돌프 뿔 (Antlers) 그라디언트 */}
          <linearGradient id="ru-antler" x1="0%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="#92400E" />
            <stop offset="60%" stopColor="#B45309" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>

          {/* 크리스마스 골드 방울 (Bell) 그라디언트 */}
          <radialGradient id="ru-gold-bell" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#B45309" />
          </radialGradient>

          {/* 부드러운 눈밭 (Snow Drift) 그라디언트 */}
          <linearGradient id="ru-snow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F1F5F9" />
            <stop offset="60%" stopColor="#E2E8F0" />
            <stop offset="100%" stopColor="#CBD5E1" />
          </linearGradient>
        </defs>

        {/* 1. 배경 눈밭 & 눈송이 & 달리는 속도감 바람선 */}
        <g id="snow-background">
          {/* 눈 덮인 언덕 베이스 */}
          <path d="M 0 145 C 50 138 120 144 200 138 L 200 160 L 0 160 Z" fill="url(#ru-snow)" opacity="0.95" />
          <path d="M 0 148 C 65 142 140 148 200 142 L 200 160 L 0 160 Z" fill="#E2E8F0" opacity="0.6" />

          {/* 달리는 바람선 (Motion Swishes) */}
          <path d="M 24 64 C 40 60 52 64 62 62" stroke="#CBD5E1" strokeWidth="1.6" strokeLinecap="round" strokeDasharray="3 3" opacity="0.7" />
          <path d="M 18 84 C 32 80 44 83 54 81" stroke="#93C5FD" strokeWidth="1.4" strokeLinecap="round" opacity="0.6" />
          <path d="M 152 74 C 168 70 182 74 192 72" stroke="#CBD5E1" strokeWidth="1.8" strokeLinecap="round" opacity="0.7" />

          {/* 흩날리는 반짝이 눈송이 */}
          <circle cx="36" cy="42" r="2.5" fill="#FFFFFF" opacity="0.9" />
          <circle cx="48" cy="108" r="1.8" fill="#BAE6FD" opacity="0.8" />
          <circle cx="168" cy="48" r="2.2" fill="#FFFFFF" opacity="0.9" />
          <circle cx="178" cy="116" r="1.6" fill="#BAE6FD" opacity="0.8" />
          <circle cx="96" cy="18" r="1.5" fill="#FFFFFF" opacity="0.9" />
          {/* 별빛 스파클 */}
          <path d="M 166 32 L 167.5 27 L 169 32 L 174 33.5 L 169 35 L 167.5 40 L 166 35 L 161 33.5 Z" fill="#FDE047" opacity="0.85" />
        </g>

        {/* 2. 루돌프 몸체 & 등 & 꼬리 (글자 상단 획들을 자연스럽게 이어주는 허리/등선) */}
        <g id="reindeer-body">
          {/* 등 허리선 (어깨에서 엉덩이로 이어지는 활모양 척추) */}
          <path
            d="M 76 52 C 84 46 96 44 106 44 C 112 44 116 48 116 54 C 114 62 102 65 92 64 C 82 63 76 58 76 52 Z"
            fill="url(#ru-fur-main)"
          />
          {/* 배 밑 부드러운 크림색 털 */}
          <path d="M 82 56 C 88 52 98 52 104 54 C 100 60 90 62 82 56 Z" fill="#FEF3C7" opacity="0.85" />

          {/* 쫑긋 세운 앙증맞은 사슴 꼬리 */}
          <path d="M 112 44 C 118 40 124 42 122 47 C 120 50 114 49 112 47 Z" fill="#B45309" />
          <path d="M 114 45 C 118 42 122 43 120 47 Z" fill="#FFFBEB" />
        </g>

        {/* 3. ★ 글자 ル 1획 매칭: 힘차게 앞으로 뻗은 루돌프의 앞다리 & 발굽 ★ */}
        <g id="front-leg">
          {/* 허벅지/어깨 볼륨 */}
          <path
            d="M 74 48 C 82 50 84 62 80 72 C 76 84 72 96 66 110 C 62 118 56 126 50 130 C 47 131 46 128 48 125 C 54 116 62 102 68 88 C 72 76 72 62 70 52 Z"
            fill="url(#ru-fur-front)"
          />
          {/* 1획 중심선 강조 라인 (글자 획 경로 보조) */}
          <path d="M 78 48 Q 72 86 51 128" stroke="#CA8A04" strokeWidth="4.5" strokeLinecap="round" opacity="0.35" />
          <path d="M 78 48 Q 72 86 51 128" stroke="#FEF08A" strokeWidth="1.8" strokeLinecap="round" opacity="0.6" />

          {/* 앞발 발굽 (Dark Hoof at 50, 128) */}
          <path d="M 47 125 L 53 131 L 49 133 L 44 128 Z" fill="#1E293B" />
          {/* 눈 튀김 효과 (발굽 아래) */}
          <circle cx="43" cy="132" r="2" fill="#E0F2FE" />
          <circle cx="39" cy="130" r="1.4" fill="#BAE6FD" />
        </g>

        {/* 4. ★ 글자 ル 2획 매칭: 껑충 뛰어오르며 뒤로 힘차게 발길질하는 뒷다리 & 발굽 ★ */}
        <g id="hind-leg">
          {/* 튼튼한 엉덩이 & 뒷다리 관절 (위에서 곧게 내려오다 아래에서 우상단으로 솟구침) */}
          <path
            d="M 104 42 C 112 44 114 56 112 70 C 110 88 110 106 114 116 C 118 126 130 128 140 114 C 146 104 150 94 150 86 C 148 84 144 87 142 92 C 138 102 132 114 124 118 C 116 118 112 110 106 98 C 102 84 102 66 102 46 Z"
            fill="url(#ru-fur-hind)"
          />
          {/* 2획 중심선 강조 라인 (글자 획 경로 보조: x=105 수직 하강 -> 바닥 둥글림 -> x=146 우상단 삐침) */}
          <path
            d="M 105 42 L 106 96 C 107 114 116 124 128 124 C 137 122 144 110 148 86"
            stroke="#CA8A04"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            opacity="0.35"
          />
          <path
            d="M 105 42 L 106 96 C 107 114 116 124 128 124 C 137 122 144 110 148 86"
            stroke="#FEF08A"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            opacity="0.6"
          />

          {/* 치켜올라간 뒷발 발굽 (Kicking Dark Hoof at 148, 86) */}
          <path d="M 146 84 L 152 87 L 150 93 L 143 89 Z" fill="#1E293B" />
          {/* 뒷발 발길질 광포 효과 / 파티클 */}
          <circle cx="156" cy="85" r="2.2" fill="#FDE047" opacity="0.8" />
          <circle cx="160" cy="91" r="1.5" fill="#FEF08A" opacity="0.7" />
        </g>

        {/* 5. 루돌프 목 & 크리스마스 방울 목걸이 */}
        <g id="reindeer-neck-collar">
          {/* 목선 */}
          <path d="M 76 52 C 73 44 68 38 65 34 C 61 36 60 42 66 50 C 70 54 74 54 76 52 Z" fill="#D97706" />

          {/* 초록색 크리스마스 목줄 리본 */}
          <path d="M 66 45 C 72 49 76 50 78 48" stroke="#15803D" strokeWidth="4" strokeLinecap="round" fill="none" />
          <path d="M 66 45 C 72 49 76 50 78 48" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" fill="none" />

          {/* 딸랑딸랑 황금 방울 */}
          <circle cx="71" cy="51" r="4.5" fill="url(#ru-gold-bell)" stroke="#78350F" strokeWidth="0.8" />
          <circle cx="69.5" cy="49.5" r="1.3" fill="#FFFFFF" opacity="0.9" />
          <line x1="68" y1="52.5" x2="74" y2="52.5" stroke="#78350F" strokeWidth="0.8" />
          <circle cx="71" cy="53" r="0.8" fill="#78350F" />
        </g>

        {/* 6. 루돌프 귀여운 얼굴 & 사슴 뿔 (Antlers) */}
        <g id="reindeer-head">
          {/* 사슴 머리 얼굴형 */}
          <path
            d="M 52 36 C 49 34 50 30 55 28 C 61 26 66 28 68 33 C 70 38 65 42 58 40 C 54 39 52 38 52 36 Z"
            fill="url(#ru-fur-main)"
          />

          {/* 쫑긋한 사슴 귀 */}
          <path d="M 67 29 C 73 23 76 25 74 30 C 72 32 68 31 67 29 Z" fill="#B45309" />
          <path d="M 68 28 C 72 24 74 26 73 29 Z" fill="#FEF3C7" />

          {/* 멋진 사슴 뿔 (Antlers) - 양쪽 가지치기 */}
          {/* 뒤쪽 뿔 */}
          <path d="M 62 26 C 60 18 56 12 52 8" stroke="url(#ru-antler)" strokeWidth="2.8" strokeLinecap="round" fill="none" />
          <path d="M 58 17 C 53 16 50 19 48 20" stroke="url(#ru-antler)" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          {/* 앞쪽 뿔 */}
          <path d="M 65 25 C 67 17 71 10 77 6" stroke="url(#ru-antler)" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M 68 18 C 73 17 76 19 79 17" stroke="url(#ru-antler)" strokeWidth="2.4" strokeLinecap="round" fill="none" />
          <path d="M 70 12 C 74 10 76 7 78 5" stroke="url(#ru-antler)" strokeWidth="2" strokeLinecap="round" fill="none" />

          {/* 반짝이는 초롱초롱한 눈 */}
          <ellipse cx="60" cy="33" rx="2.5" ry="3" fill="#1C1917" />
          <circle cx="59.2" cy="32" r="1" fill="#FFFFFF" />
          <circle cx="61" cy="34" r="0.5" fill="#FFFFFF" />

          {/* 볼 터치 */}
          <ellipse cx="61" cy="37" rx="3.5" ry="2" fill="#F43F5E" opacity="0.35" />
        </g>

        {/* 7. ★ 대망의 눈부신 빨간 코 (Rudolph's Glowing Red Nose) ★ */}
        <g id="glowing-red-nose">
          {/* 코 주변 붉은빛 확산 오라 (Glow Halo) */}
          <circle cx="49" cy="36" r="14" fill="url(#ru-nose-glow)" />

          {/* 빨간 코 본체 */}
          <circle cx="49" cy="36" r="5.5" fill="url(#ru-nose-core)" stroke="#9F1239" strokeWidth="0.8" />

          {/* 영롱한 하이라이트 광택 */}
          <ellipse cx="47.2" cy="34.2" rx="2" ry="1.4" fill="#FFFFFF" opacity="0.9" />
          <circle cx="51" cy="38" r="0.8" fill="#FFFFFF" opacity="0.6" />

          {/* 코에서 뿜어져 나오는 십자 스파클 (Magic Star) */}
          <path d="M 41 36 L 43 34 L 45 36 L 43 38 Z" fill="#FDE047" opacity="0.9" />
          <path d="M 49 26 L 50 23 L 51 26 L 54 27 L 51 28 L 50 31 L 49 28 L 46 27 Z" fill="#FEF08A" opacity="0.85" />
        </g>

        {/* 8. 글자 'ル' 오버레이 (정중앙 투영: 루돌프의 앞다리 1획과 뒷다리 2획과 완벽 조화!) */}
        <KatakanaCharOverlay char="ル" fontFamily={fontFamily} x="106" y="118" />
      </svg>
    );
  }

  if (char === 'レ') {
    // レ: 레이저 (수직으로 쏘아진 거대한 레이저 빔이 광학 반사 거울에 반사되어 우상단으로 뻗어나가는 궤적!)
    // ⚠️ 1획 세로선: 상단 레이저 발사기에서 수직으로 꽂히는 강력한 굵은 입사 레이저 빔
    //    1획 하단 코너: 물리적 반사각(입사각 23° = 반사각 23°)에 맞춰 23도 기울어진 대형 반사경 거울 유닛 & 눈부신 충돌 스파크
    //    1획 우상단 삐침: 거울에 반사되어 타겟을 향해 우상단(46°)으로 강력하게 솟구치는 굵은 네온 레이저 빔
    return (
      <svg viewBox="0 0 200 160" className="w-full h-full select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* 레이저 발사기 건메탈 그라디언트 */}
          <linearGradient id="re-cannon-metal" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="50%" stopColor="#475569" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>

          {/* 대형 반사경 거울 메탈 프레임 그라디언트 */}
          <linearGradient id="re-mirror-frame" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="40%" stopColor="#334155" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>

          {/* 광학 반사 거울 표면 유리 (영롱한 사이언-블루 코팅) */}
          <linearGradient id="re-mirror-glass" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E0F2FE" />
            <stop offset="30%" stopColor="#BAE6FD" />
            <stop offset="70%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#0284C7" />
          </linearGradient>

          {/* 거울 표면 눈부신 반사광 하이라이트 */}
          <linearGradient id="re-glass-glare" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>

          {/* 충돌 스파크 대형 방사형 글로우 */}
          <radialGradient id="re-spark-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="25%" stopColor="#FEF08A" />
            <stop offset="60%" stopColor="#F43F5E" />
            <stop offset="100%" stopColor="#E11D48" stopOpacity="0" />
          </radialGradient>

          {/* 타겟 적중 버스트 글로우 */}
          <radialGradient id="re-target-burst" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="40%" stopColor="#FDA4AF" />
            <stop offset="80%" stopColor="#E11D48" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#9F1239" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* 1. 배경: 하이테크 타겟 레티클 & 조준 그리드 */}
        <g id="re-tech-grid" opacity="0.5">
          {/* 우상단 레이저 타겟 조준원 (반사 빔의 타겟 목표점) */}
          <circle cx="140" cy="62" r="18" stroke="#94A3B8" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="140" cy="62" r="8" stroke="#EF4444" strokeWidth="1.2" />
          <line x1="140" y1="38" x2="140" y2="50" stroke="#94A3B8" strokeWidth="1.4" />
          <line x1="140" y1="74" x2="140" y2="86" stroke="#94A3B8" strokeWidth="1.4" />
          <line x1="116" y1="62" x2="128" y2="62" stroke="#94A3B8" strokeWidth="1.4" />
          <line x1="152" y1="62" x2="164" y2="62" stroke="#94A3B8" strokeWidth="1.4" />

          {/* 바닥 스탠드 베이스 그림자 */}
          <ellipse cx="88" cy="148" rx="46" ry="6.5" fill="#E2E8F0" />
        </g>

        {/* 2. 하단 대형 광학 반사 거울 유닛 (빛의 반사법칙: 입사각 23° = 반사각 23°에 맞춰 약 23도 완만하게 기울인 대형 거울) */}
        <g id="re-corner-reflector">
          {/* 거울 스탠드 하단 메탈 베이스 플레이트 */}
          <path d="M 58 147 L 118 147 L 110 135 L 66 135 Z" fill="url(#re-cannon-metal)" stroke="#0F172A" strokeWidth="1.4" />
          <line x1="68" y1="141" x2="108" y2="141" stroke="#64748B" strokeWidth="1" />

          {/* 스탠드 수직 듀얼 서포트 암 */}
          <path d="M 80 135 L 80 124 L 96 124 L 96 135 Z" fill="url(#re-mirror-frame)" stroke="#0F172A" strokeWidth="1.2" />

          {/* 틸트 각도 조절 힌지 볼트 */}
          <circle cx="88" cy="125" r="6" fill="#475569" stroke="#1E293B" strokeWidth="1.2" />
          <circle cx="88" cy="125" r="2.5" fill="#94A3B8" />

          {/* ★ 대형 반사경 거울 플레이트 (빛의 반사 법칙: 입사광(↓)을 우상단(↗)으로 반사하기 위해 좌상➔우하 방향 +23도 경사) */}
          <g transform="rotate(23 88 116)">
            {/* 거울 백플레이트 하우징 프레임 */}
            <rect x="49" y="109" width="78" height="14" rx="4" fill="url(#re-mirror-frame)" stroke="#0F172A" strokeWidth="1.5" />

            {/* 영롱한 광학 유리 거울면 (우상단을 향해 빛을 반사하는 상단면) */}
            <rect x="52" y="110" width="72" height="6.5" rx="2" fill="url(#re-mirror-glass)" stroke="#38BDF8" strokeWidth="0.8" />

            {/* 거울 유리 표면의 날렵한 글레어 하이라이트 선 */}
            <line x1="56" y1="112" x2="120" y2="112" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" opacity="0.9" />

            {/* 거울 양쪽 코너 고정 볼트 나사 */}
            <circle cx="53" cy="116" r="1.5" fill="#CBD5E1" />
            <circle cx="123" cy="116" r="1.5" fill="#CBD5E1" />
          </g>
        </g>

        {/* 3. 초강력 네온 레이저 빔 (글자 'レ'에 덮이지 않도록 대폭 두껍게 확장된 5단계 레이저 빔) */}
        <g id="re-laser-beam">
          {/* [1단계] 최외곽 거대 네온 플라즈마 필드 (폭 46px - 글자 바깥으로 활활 타오르는 붉은 아우라) */}
          <path
            d="M 88 34 L 88 116 L 138 64"
            stroke="#FDA4AF"
            strokeWidth="46"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.25"
          />

          {/* [2단계] 선명한 네온 블룸 광채 (폭 32px) */}
          <path
            d="M 88 34 L 88 116 L 138 64"
            stroke="#FB7185"
            strokeWidth="32"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.5"
          />

          {/* [3단계] 고에너지 메인 레이저 광선 (폭 20px - 글자의 14px 폭을 압도하며 양옆으로 뿜어져 나옴) */}
          <path
            d="M 88 34 L 88 116 L 138 64"
            stroke="#E11D48"
            strokeWidth="20"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.9"
          />

          {/* [4단계] 핫 핑크 에너지 코어 (폭 11px) */}
          <path
            d="M 88 34 L 88 116 L 138 64"
            stroke="#FDA4AF"
            strokeWidth="11"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* [5단계] 순백 플라즈마 핫라인 (폭 4.5px) */}
          <path
            d="M 88 34 L 88 116 L 138 64"
            stroke="#FFFFFF"
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        {/* 4. 상단 레이저 발사기 (Laser Cannon Emitter) */}
        <g id="re-laser-emitter">
          {/* 천장 고정 마운트 기둥 */}
          <rect x="84" y="12" width="8" height="12" fill="#334155" />

          {/* 발사기 메인 바디 */}
          <rect x="73" y="20" width="30" height="16" rx="4" fill="url(#re-cannon-metal)" stroke="#0F172A" strokeWidth="1.5" />

          {/* 에너지 파워 LED 인디케이터 */}
          <circle cx="80" cy="28" r="2.2" fill="#22C55E" />
          <circle cx="88" cy="28" r="2.2" fill="#EF4444" />
          <circle cx="96" cy="28" r="2.2" fill="#3B82F6" />

          {/* 하단 집광 렌즈 노즐 */}
          <path d="M 79 36 L 97 36 L 93 42 L 83 42 Z" fill="#475569" stroke="#0F172A" strokeWidth="1.2" />

          {/* 발사구 발광 코어 링 & 섬광 */}
          <ellipse cx="88" cy="42" rx="4.5" ry="2" fill="#FFFFFF" />
          <circle cx="88" cy="44" r="5" fill="#FDA4AF" opacity="0.8" />
        </g>

        {/* 5. 거울 반사점 충돌 스파크 & 쇼크웨이브 (거울면 충돌점 (88, 116)) */}
        <g id="re-impact-flash">
          {/* 대형 방사형 충돌 광채 */}
          <circle cx="88" cy="116" r="22" fill="url(#re-spark-glow)" />

          {/* 거울 표면 튀는 8방향 십자 하이퍼 스타 스파크 */}
          <path d="M 88 98 L 88 134" stroke="#FFFFFF" strokeWidth="2.8" strokeLinecap="round" />
          <path d="M 70 116 L 106 116" stroke="#FFFFFF" strokeWidth="2.8" strokeLinecap="round" />
          <path d="M 75 103 L 101 129" stroke="#FEF08A" strokeWidth="2" strokeLinecap="round" />
          <path d="M 75 129 L 101 103" stroke="#FEF08A" strokeWidth="2" strokeLinecap="round" />

          {/* 중심 초고열 화이트 코어 */}
          <circle cx="88" cy="116" r="5" fill="#FFFFFF" />

          {/* 광자 파티클 (Photon Particles) */}
          <circle cx="92" cy="104" r="2.2" fill="#FEF08A" />
          <circle cx="106" cy="94" r="2" fill="#FDE047" />
          <circle cx="120" cy="80" r="2.5" fill="#FDA4AF" />
          <circle cx="74" cy="110" r="1.8" fill="#FFFFFF" />
        </g>

        {/* 6. 우상단 타겟 적중 버스트 (Target Hit Burst) */}
        <g id="re-target-hit">
          <circle cx="138" cy="64" r="14" fill="url(#re-target-burst)" />
          <circle cx="138" cy="64" r="3" fill="#FFFFFF" />
          <path d="M 138 54 L 138 74" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M 128 64 L 148 64" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
        </g>

        {/* 7. 글자 'レ' 오버레이 (정중앙 투영: 입사 빔 1획 세로선 & 반사 빔 1획 삐침과 100% 일치!) */}
        <KatakanaCharOverlay char="レ" fontFamily={fontFamily} x="106" y="118" />

        {/* 8. 글자 위로 솟아오르는 전면 하이라이트 (글자에 완전히 덮이지 않도록 글자 전면에도 빛 효과 오버랩) */}
        <g id="re-front-highlights" opacity="0.85">
          {/* 거울 충돌점 중심 플래시 코어 */}
          <circle cx="88" cy="116" r="3.2" fill="#FFFFFF" />
          {/* 반사 빔을 따라 흐르는 에너지 링 */}
          <ellipse cx="112" cy="90" rx="3.5" ry="6" transform="rotate(45 112 90)" stroke="#FFFFFF" strokeWidth="1.4" fill="none" opacity="0.8" />
          <ellipse cx="128" cy="74" rx="3" ry="5" transform="rotate(45 128 74)" stroke="#FEF08A" strokeWidth="1.4" fill="none" opacity="0.9" />
        </g>
      </svg>
    );
  }

  if (char === 'ロ') {
    // ロ: 로봇 (글자 'ロ'를 튼튼한 사각 몸통으로 하고, 중앙에 에너지 코어와 상단에 귀여운 얼굴을 지닌 꼬마 로봇)
    return (
      <svg viewBox="0 0 200 160" className="w-full h-full select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* 바닥 그림자 */}
        <ellipse cx="106" cy="153" rx="46" ry="4.5" fill="#CBD5E1" opacity="0.6" />

        {/* 로봇 다리 (2개) */}
        <rect x="82" y="116" width="14" height="24" rx="3" fill="#64748B" stroke="#334155" strokeWidth="2" />
        <line x1="82" y1="124" x2="96" y2="124" stroke="#475569" strokeWidth="1.5" />
        <line x1="82" y1="132" x2="96" y2="132" stroke="#475569" strokeWidth="1.5" />
        <path d="M 74 145 C 74 140 100 140 100 145 L 100 149 L 74 149 Z" fill="#334155" />

        <rect x="116" y="116" width="14" height="24" rx="3" fill="#64748B" stroke="#334155" strokeWidth="2" />
        <line x1="116" y1="124" x2="130" y2="124" stroke="#475569" strokeWidth="1.5" />
        <line x1="116" y1="132" x2="130" y2="132" stroke="#475569" strokeWidth="1.5" />
        <path d="M 112 145 C 112 140 138 140 138 145 L 138 149 L 112 149 Z" fill="#334155" />

        {/* 양쪽 팔 & 집게 손 (왼쪽 차렷, 오른쪽 인사) */}
        {/* 왼팔 */}
        <circle cx="64" cy="62" r="5" fill="#94A3B8" stroke="#334155" strokeWidth="2" />
        <path d="M 62 64 L 46 76 L 46 94" stroke="#64748B" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M 38 94 C 36 102 54 102 52 94" stroke="#334155" strokeWidth="3" fill="none" strokeLinecap="round" />

        {/* 오른팔 (손인사 포즈) */}
        <circle cx="148" cy="62" r="5" fill="#94A3B8" stroke="#334155" strokeWidth="2" />
        <path d="M 150 64 L 166 60 L 170 42" stroke="#64748B" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M 163 40 C 161 32 177 30 177 38" stroke="#334155" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M 180 30 C 183 33 184 37 182 41" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" fill="none" />

        {/* 로봇 목 */}
        <rect x="100" y="38" width="12" height="12" rx="2" fill="#64748B" stroke="#334155" strokeWidth="2" />
        <line x1="100" y1="42" x2="112" y2="42" stroke="#475569" strokeWidth="1.5" />
        <line x1="100" y1="46" x2="112" y2="46" stroke="#475569" strokeWidth="1.5" />

        {/* 로봇 머리 & 얼굴 */}
        <line x1="106" y1="12" x2="106" y2="18" stroke="#64748B" strokeWidth="3" strokeLinecap="round" />
        <circle cx="106" cy="10" r="4" fill="#EF4444" />
        <circle cx="104.5" cy="8.5" r="1.2" fill="#FFFFFF" />

        <rect x="84" y="18" width="44" height="24" rx="6" fill="#F1F5F9" stroke="#334155" strokeWidth="2.5" />
        <rect x="79" y="24" width="5" height="12" rx="1.5" fill="#94A3B8" stroke="#475569" strokeWidth="1" />
        <rect x="128" y="24" width="5" height="12" rx="1.5" fill="#94A3B8" stroke="#475569" strokeWidth="1" />

        {/* 귀여운 LED 눈 & 미소 입 */}
        <circle cx="96" cy="28" r="3.5" fill="#38BDF8" stroke="#0284C7" strokeWidth="1" />
        <circle cx="97" cy="27" r="1" fill="#FFFFFF" />
        <circle cx="116" cy="28" r="3.5" fill="#38BDF8" stroke="#0284C7" strokeWidth="1" />
        <circle cx="117" cy="27" r="1" fill="#FFFFFF" />
        <path d="M 102 35 Q 106 38 110 35" stroke="#334155" strokeWidth="1.5" strokeLinecap="round" fill="none" />

        {/* 로봇 사각 몸통 베이스 (글자 ロ와 일치하는 형태) */}
        <rect x="66" y="46" width="80" height="72" rx="8" fill="#F8FAFC" stroke="#334155" strokeWidth="3" />
        <circle cx="72" cy="52" r="1.8" fill="#94A3B8" />
        <circle cx="140" cy="52" r="1.8" fill="#94A3B8" />
        <circle cx="72" cy="112" r="1.8" fill="#94A3B8" />
        <circle cx="140" cy="112" r="1.8" fill="#94A3B8" />

        {/* 몸통 중앙 내부 (글자 ロ의 가운데 빈 공간에 위치하는 에너지 코어 및 콘솔) */}
        <rect x="88" y="66" width="36" height="32" rx="4" fill="#0F172A" />
        <circle cx="106" cy="78" r="7.5" fill="#0284C7" opacity="0.4" />
        <circle cx="106" cy="78" r="5" fill="#38BDF8" stroke="#BAE6FD" strokeWidth="1.2" />
        <circle cx="104.5" cy="76.5" r="1.5" fill="#FFFFFF" />
        <circle cx="95" cy="91" r="2" fill="#EF4444" />
        <circle cx="106" cy="91" r="2" fill="#EAB308" />
        <circle cx="117" cy="91" r="2" fill="#10B981" />

        {/* 글자 'ロ' 오버레이 */}
        <KatakanaCharOverlay char="ロ" fontFamily={fontFamily} x="106" y="118" />
      </svg>
    );
  }

  return null;
}
