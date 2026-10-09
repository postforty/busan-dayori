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
    // ル: 루비 (영롱한 붉은 루비 보석을 양쪽에서 받치는 두 갈래 다리 프레임)
    return (
      <svg viewBox="0 0 200 160" className="w-full h-full select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* 영롱하게 빛나는 루비 보석 상단 */}
        <polygon points="106,32 136,46 128,72 84,72 76,46" fill="#EF4444" stroke="#B91C1C" strokeWidth="2" />
        <polygon points="106,32 128,72 84,72" fill="#F87171" opacity="0.6" />
        <circle cx="106" cy="46" r="3" fill="#FFFFFF" opacity="0.8" />

        {/* 루비 보석을 받쳐 올린 황금빛 두 갈래 다리 스탠드 (글자 ル 형태) */}
        {/* 왼쪽 다리 (글자 1획) */}
        <line x1="84" y1="72" x2="68" y2="136" stroke="#CA8A04" strokeWidth="6" strokeLinecap="round" />
        {/* 오른쪽 곡선 굽은 다리 (글자 2획) */}
        <path
          d="M 126 72 L 126 120 C 126 136 138 136 148 126"
          stroke="#CA8A04"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />

        {/* 보석 광채 스파크 */}
        <path d="M 68 40 L 70 34 L 72 40 L 78 42 L 72 44 L 70 50 L 68 44 L 62 42 Z" fill="#FDE047" />
        <path d="M 148 38 L 150 32 L 152 38 L 158 40 L 152 42 L 150 48 L 148 42 L 142 40 Z" fill="#FDE047" />

        {/* 글자 'ル' 오버레이 */}
        <KatakanaCharOverlay char="ル" fontFamily={fontFamily} x="106" y="118" />
      </svg>
    );
  }

  if (char === 'レ') {
    // レ: 레몬 (초승달 모양으로 꺾인 상큼한 노란 레몬 조각)
    return (
      <svg viewBox="0 0 200 160" className="w-full h-full select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* 접시 베이스 */}
        <ellipse cx="106" cy="140" rx="56" ry="8" fill="#F1F5F9" />

        {/* 초승달 웨지 모양 레몬 슬라이스 껍질 (글자 レ의 세로선과 하단 꺾임과 일치) */}
        <path
          d="M 74 38 C 72 74 76 116 86 134 C 104 136 136 128 152 108 L 140 102 C 124 116 102 122 92 120 C 86 106 84 74 86 38 Z"
          fill="#FDE047"
          stroke="#EAB308"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* 상큼한 레몬 과육 알갱이 부채꼴 섹션 */}
        <path d="M 88 56 C 88 84 94 104 128 108 C 112 88 100 68 88 56 Z" fill="#FEF9C3" stroke="#FDE047" strokeWidth="1.2" />

        {/* 튀는 레몬 과즙 방울 */}
        <circle cx="146" cy="92" r="3" fill="#FACC15" />
        <circle cx="158" cy="100" r="2" fill="#FDE047" />
        <circle cx="64" cy="52" r="2.5" fill="#FDE047" />

        {/* 글자 'レ' 오버레이 */}
        <KatakanaCharOverlay char="レ" fontFamily={fontFamily} x="106" y="118" />
      </svg>
    );
  }

  if (char === 'ロ') {
    // ロ: 로봇 (네모반듯한 사각 얼굴을 지닌 귀여운 깡통 로봇 머리)
    return (
      <svg viewBox="0 0 200 160" className="w-full h-full select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* 로봇 정수리 안테나 */}
        <line x1="106" y1="20" x2="106" y2="38" stroke="#64748B" strokeWidth="4" strokeLinecap="round" />
        <circle cx="106" cy="18" r="5" fill="#EF4444" />

        {/* 네모반듯한 로봇 사각 얼굴 본체 (글자 ロ와 100% 일치하는 사각형) */}
        <rect x="54" y="40" width="104" height="96" rx="10" fill="#F1F5F9" stroke="#334155" strokeWidth="3" />

        {/* 양쪽 귀 볼트 나사 */}
        <rect x="44" y="76" width="10" height="24" rx="3" fill="#94A3B8" stroke="#475569" strokeWidth="1.5" />
        <rect x="158" y="76" width="10" height="24" rx="3" fill="#94A3B8" stroke="#475569" strokeWidth="1.5" />

        {/* 동그란 두 눈 & LED 점멸 */}
        <circle cx="82" cy="74" r="12" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="2" />
        <circle cx="82" cy="74" r="5" fill="#1D4ED8" />
        <circle cx="130" cy="74" r="12" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="2" />
        <circle cx="130" cy="74" r="5" fill="#1D4ED8" />

        {/* 귀여운 격자 입 */}
        <rect x="86" y="104" width="40" height="12" rx="3" fill="#334155" />
        <line x1="96" y1="104" x2="96" y2="116" stroke="#64748B" strokeWidth="1.5" />
        <line x1="106" y1="104" x2="106" y2="116" stroke="#64748B" strokeWidth="1.5" />
        <line x1="116" y1="104" x2="116" y2="116" stroke="#64748B" strokeWidth="1.5" />

        {/* 글자 'ロ' 오버레이 */}
        <KatakanaCharOverlay char="ロ" fontFamily={fontFamily} x="106" y="118" />
      </svg>
    );
  }

  return null;
}
