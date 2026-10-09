import React from 'react';
import { KatakanaMnemonicSvgChildProps } from './types';
import KatakanaCharOverlay from './KatakanaCharOverlay';

export default function KatakanaRowMa({ char, fontFamily }: KatakanaMnemonicSvgChildProps) {
  if (char === 'マ') {
    // マ: 마이크 (음향 녹음실에서 헤드폰을 끼고 노래하는 입 앞의 스튜디오 마이크)
    return (
      <svg viewBox="0 0 200 160" className="w-full h-full select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* 가수 얼굴 부드러운 웜 옐로우/오렌지 그라디언트 (이모지 감성) */}
          <linearGradient id="maSingerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="45%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#F97316" />
          </linearGradient>

          {/* 스튜디오 콘덴서 마이크 바디 실버 메탈릭 그라디언트 */}
          <linearGradient id="maMicBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#94A3B8" />
            <stop offset="35%" stopColor="#CBD5E1" />
            <stop offset="70%" stopColor="#64748B" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>

          {/* 마이크 그릴 헤드 크롬 그라디언트 */}
          <linearGradient id="maMicGrillGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#64748B" />
            <stop offset="30%" stopColor="#E2E8F0" />
            <stop offset="70%" stopColor="#94A3B8" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>

          {/* 스탠드 관절 조절 볼트 노브 골드 그라디언트 */}
          <linearGradient id="maKnobGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="45%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>

          {/* 스튜디오 부스 은은한 조명 후광 */}
          <radialGradient id="maStudioGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* 1. 스튜디오 녹음실 분위기: 우상단 [● REC] 인디케이터 */}
        <rect x="150" y="14" width="38" height="15" rx="4" fill="#0F172A" stroke="#334155" strokeWidth="1" />
        <circle cx="159" cy="21.5" r="3" fill="#EF4444" />
        <circle cx="159" cy="21.5" r="1.5" fill="#FCA5A5" />
        <text x="175" y="25" fill="#EF4444" fontSize="8" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">REC</text>

        {/* 마이크 주변 사운드 후광 */}
        <circle cx="80" cy="56" r="32" fill="url(#maStudioGlow)" />

        {/* 2. [★ 가수] 녹음실에서 헤드폰을 끼고 열창하는 귀여운 가수 (사용자 스케치 완벽 반영) */}
        <g id="singer-group">
          {/* 얼굴 그림자 */}
          <ellipse cx="68" cy="142" rx="20" ry="4" fill="#E2E8F0" />

          {/* 동그란 얼굴 본체 */}
          <circle cx="68" cy="116" r="23" fill="url(#maSingerGrad)" stroke="#F59E0B" strokeWidth="1.2" />

          {/* 양 볼 발그레 핑크 블러셔 */}
          <ellipse cx="54" cy="120" rx="4" ry="2.5" fill="#FB7185" opacity="0.65" />
          <ellipse cx="82" cy="120" rx="4" ry="2.5" fill="#FB7185" opacity="0.65" />

          {/* 열창하는 초롱초롱한 눈 (사용자 스케치 싱크로) */}
          <g id="eyes">
            {/* 왼쪽 눈 */}
            <circle cx="60" cy="108" r="4.8" fill="#FFFFFF" />
            <circle cx="60.5" cy="108" r="3" fill="#1E293B" />
            <circle cx="62" cy="106.5" r="1.2" fill="#FFFFFF" />

            {/* 오른쪽 눈 */}
            <circle cx="76" cy="108" r="4.8" fill="#FFFFFF" />
            <circle cx="76.5" cy="108" r="3" fill="#1E293B" />
            <circle cx="78" cy="106.5" r="1.2" fill="#FFFFFF" />
          </g>

          {/* 'O' 모양으로 크게 벌린 열창 입 (사용자 스케치 싱크로) */}
          <ellipse cx="68" cy="126" rx="5.5" ry="7.5" fill="#831843" stroke="#BE185D" strokeWidth="1.2" />
          <ellipse cx="68" cy="129.5" rx="3.6" ry="3.2" fill="#F43F5E" />

          {/* 프로 모니터링 헤드폰 */}
          <path d="M 46 114 C 44 86 92 86 90 114" stroke="#334155" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <path d="M 48 112 C 48 91 88 91 88 112" stroke="#64748B" strokeWidth="1.5" fill="none" />
          {/* 왼쪽 이어패드 */}
          <rect x="42" y="105" width="7" height="19" rx="3.5" fill="#1E293B" stroke="#0F172A" strokeWidth="1" />
          <circle cx="45.5" cy="114.5" r="2" fill="#94A3B8" />
          {/* 오른쪽 이어패드 (반대편) */}
          <rect x="87" y="105" width="6" height="18" rx="3" fill="#1E293B" opacity="0.85" />
        </g>

        {/* 3. 노래 음표 & 가창 사운드 웨이브 (입에서 마이크로 흘러가는 멜로디) */}
        <g id="melody-wave">
          {/* 음파 아크 라인 */}
          <path d="M 68 98 Q 72 84 80 74" stroke="#38BDF8" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="3 3" opacity="0.8" />
          {/* 8분음표 (♪) */}
          <circle cx="78" cy="88" r="2.8" fill="#F59E0B" />
          <path d="M 80.8 88 L 80.8 77 C 84 77 87 79 87 81" stroke="#F59E0B" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          {/* 16분음표 (♫) */}
          <circle cx="94" cy="38" r="2.2" fill="#F59E0B" />
          <circle cx="102" cy="36" r="2.2" fill="#F59E0B" />
          <path d="M 96.2 38 L 96.2 29 L 104.2 27 L 104.2 36" stroke="#F59E0B" strokeWidth="1.4" fill="none" />
          <path d="M 96.2 32 L 104.2 30" stroke="#F59E0B" strokeWidth="1.2" />
        </g>

        {/* 4. [★ 1획 가로선 매칭: 마이크 헤드 & 바디] 입 바로 앞을 향해 뻗은 스튜디오 콘덴서 마이크 */}
        <g id="mic-body">
          {/* 마이크 바디 메인 실린더 */}
          <rect x="80" y="51" width="56" height="10" rx="3" fill="url(#maMicBodyGrad)" stroke="#334155" strokeWidth="1" />
          {/* 마이크 골드 림 악센트 링 */}
          <line x1="88" y1="51" x2="88" y2="61" stroke="#F59E0B" strokeWidth="1.5" />
          <line x1="126" y1="51" x2="126" y2="61" stroke="#F59E0B" strokeWidth="1.5" />
          {/* 마이크 둥근 그릴 헤드 (가수의 입을 똑바로 향함) */}
          <ellipse cx="80" cy="56" rx="8" ry="6.5" fill="url(#maMicGrillGrad)" stroke="#334155" strokeWidth="1.2" />
          <line x1="77" y1="52" x2="77" y2="60" stroke="#CBD5E1" strokeWidth="1" strokeLinecap="round" />
          <line x1="80" y1="51" x2="80" y2="61" stroke="#CBD5E1" strokeWidth="1" strokeLinecap="round" />
          <line x1="83" y1="52" x2="83" y2="60" stroke="#CBD5E1" strokeWidth="1" strokeLinecap="round" />
        </g>

        {/* 5. [★ 1획 대각선 매칭: 붐암 스탠드 기둥] 꺾여 내려오는 스탠드 조인트 암 */}
        <g id="mic-arm">
          {/* 꺾임 조인트 피벗 힌지 (1획 꺾임 코너) */}
          <circle cx="136" cy="56" r="6" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
          <circle cx="136" cy="56" r="2.5" fill="#94A3B8" />

          {/* 대각선 붐암 스탠드 기둥 */}
          <line x1="136" y1="56" x2="96" y2="108" stroke="#334155" strokeWidth="5.5" strokeLinecap="round" />
          <line x1="136" y1="56" x2="96" y2="108" stroke="#64748B" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* 6. [★ 2획 점 매칭: 조절 노브 볼트] 붐암 각도를 조여주는 조절 볼트 핸들 */}
        <g id="mic-knob">
          <line x1="106" y1="88" x2="128" y2="108" stroke="url(#maKnobGrad)" strokeWidth="6" strokeLinecap="round" />
          {/* 조임 볼트 헤드 캡 */}
          <circle cx="127" cy="107" r="3.5" fill="#B45309" stroke="#FDE68A" strokeWidth="1" />
        </g>

        {/* 7. 글자 'マ' 오버레이 (마이크 가로 바디·스탠드 암·조절 볼트 위에 완벽하게 일치) */}
        <KatakanaCharOverlay char="マ" fontFamily={fontFamily} x="106" y="118" />
      </svg>
    );
  }

  if (char === 'ミ') {
    // ミ: 미사일 (나란히 대각선으로 힘차게 날아가는 3발의 미사일)
    return (
      <svg viewBox="0 0 200 160" className="w-full h-full select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* 푸른 하늘 배경 & 구름 */}
        <ellipse cx="160" cy="130" rx="36" ry="14" fill="#F1F5F9" />

        {/* 1번 미사일 (상단 - 글자 ミ 1획) */}
        <g id="missile-1">
          <line x1="68" y1="52" x2="136" y2="46" stroke="#2563EB" strokeWidth="6.5" strokeLinecap="round" />
          <polygon points="144,45 134,40 134,50" fill="#EF4444" />
          <path d="M 60 53 Q 50 51 44 54" stroke="#CBD5E1" strokeWidth="2.5" strokeLinecap="round" />
        </g>

        {/* 2번 미사일 (중앙 - 글자 ミ 2획) */}
        <g id="missile-2">
          <line x1="72" y1="82" x2="140" y2="76" stroke="#2563EB" strokeWidth="6.5" strokeLinecap="round" />
          <polygon points="148,75 138,70 138,80" fill="#EF4444" />
          <path d="M 64 83 Q 54 81 48 84" stroke="#CBD5E1" strokeWidth="2.5" strokeLinecap="round" />
        </g>

        {/* 3번 미사일 (하단 - 글자 ミ 3획) */}
        <g id="missile-3">
          <line x1="78" y1="112" x2="148" y2="106" stroke="#2563EB" strokeWidth="7" strokeLinecap="round" />
          <polygon points="156,105 146,100 146,110" fill="#EF4444" />
          <path d="M 70 113 Q 58 111 52 114" stroke="#CBD5E1" strokeWidth="2.5" strokeLinecap="round" />
        </g>

        {/* 글자 'ミ' 오버레이 */}
        <KatakanaCharOverlay char="ミ" fontFamily={fontFamily} x="106" y="118" />
      </svg>
    );
  }

  if (char === 'ム') {
    // ム: 무술 (오른쪽을 바라보며 오른팔을 굽혀 뻗고(1획), 왼팔로 날렵하게 찌르는(2획) 무술가)
    return (
      <svg viewBox="0 0 200 160" className="w-full h-full select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* 도복 순백/음영 그라디언트 */}
          <linearGradient id="muGiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="60%" stopColor="#F8FAFC" />
            <stop offset="100%" stopColor="#E2E8F0" />
          </linearGradient>

          {/* 피부 웜톤 그라디언트 */}
          <linearGradient id="muSkinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FED7AA" />
            <stop offset="100%" stopColor="#FDBA74" />
          </linearGradient>

          {/* 붉은 투혼 헤드밴드 그라디언트 */}
          <linearGradient id="muHeadbandGrad" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#EF4444" />
            <stop offset="50%" stopColor="#DC2626" />
            <stop offset="100%" stopColor="#991B1B" />
          </linearGradient>

          {/* 검은 띠(Black Belt) 그라디언트 */}
          <linearGradient id="muBeltGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="50%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>

          {/* 찌르기 충격파 방사형 그라디언트 */}
          <radialGradient id="muPunchGrad" cx="40%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.95" />
            <stop offset="45%" stopColor="#F59E0B" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#EA580C" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* 1. 도장 바닥 및 발밑 안정적 타원 그림자 */}
        <ellipse cx="94" cy="144" rx="64" ry="6.5" fill="#E2E8F0" opacity="0.85" />
        {/* 뒷발에서 일어나는 추진력 스텝 먼지 */}
        <path d="M 40 140 Q 32 134 40 130 Q 48 130 48 138" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1" opacity="0.8" />

        {/* 2. 무술가 하체: 자연스럽고 역동적인 앞굽이 자세 (다리 사이에 어색한 수평 연결선 일체 없음) */}
        <g id="mu-legs">
          {/* 뒷다리 (왼다리: 뒤로 곧게 뻗어 중심을 잡는 도복 바지) */}
          <path
            d="M 82 96 L 46 136 L 56 140 L 92 102 Z"
            fill="url(#muGiGrad)"
            stroke="#94A3B8"
            strokeWidth="1.2"
          />
          {/* 왼발 (뒤꿈치를 바닥에 붙인 검은 무술 단화) */}
          <ellipse cx="46" cy="139" rx="8" ry="4.5" fill="#1E293B" stroke="#0F172A" strokeWidth="1" />

          {/* 앞다리 (오른다리: 앞쪽으로 굽혀 체중을 실은 당당한 앞굽이 무릎) */}
          <path
            d="M 90 98 L 130 114 L 132 140 L 122 140 L 120 120 L 84 104 Z"
            fill="url(#muGiGrad)"
            stroke="#94A3B8"
            strokeWidth="1.2"
          />
          {/* 오른발 (앞쪽을 단단히 디딘 검은 무술 단화) */}
          <ellipse cx="128" cy="142" rx="9" ry="5" fill="#1E293B" stroke="#0F172A" strokeWidth="1" />
        </g>

        {/* 3. 무술가 상체 몸통 (오른쪽 측면 프로필) */}
        <g id="mu-torso">
          {/* 도복 상체 */}
          <path
            d="M 86 56 L 106 58 L 100 98 L 80 96 Z"
            fill="url(#muGiGrad)"
            stroke="#94A3B8"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {/* 도복 깃 측면 여밈선 */}
          <path d="M 102 56 L 104 78 L 94 96" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />

          {/* 허리 검은 띠 (Black Belt) */}
          <rect x="80" y="92" width="22" height="6" rx="2" fill="url(#muBeltGrad)" stroke="#0F172A" strokeWidth="1" />
          {/* 뒤(왼쪽)로 촥! 펄럭이는 띠 꼬리 2가닥 */}
          <path d="M 82 94 Q 68 96 58 104" stroke="url(#muBeltGrad)" strokeWidth="4" strokeLinecap="round" />
          <path d="M 82 96 Q 66 104 62 114" stroke="url(#muBeltGrad)" strokeWidth="3" strokeLinecap="round" />
        </g>

        {/* 4. 오른쪽을 바라보는 무술가 얼굴 & 붉은 헤드밴드 */}
        <g id="mu-head-profile">
          {/* 얼굴 측면 윤곽 */}
          <path
            d="M 90 34 Q 100 32 105 38 Q 107 42 104 45 Q 106 48 102 52 Q 95 55 88 50 Z"
            fill="url(#muSkinGrad)"
            stroke="#EA580C"
            strokeWidth="1.2"
          />
          {/* 오른쪽을 예리하게 노려보는 측면 눈 */}
          <polygon points="101,40 105,42 101,43" fill="#1E293B" />
          {/* 다부지게 다문 입 */}
          <line x1="101" y1="48" x2="104" y2="48" stroke="#991B1B" strokeWidth="1.5" strokeLinecap="round" />

          {/* 붉은 투혼 헤드밴드 */}
          <path d="M 86 36 L 104 38" stroke="url(#muHeadbandGrad)" strokeWidth="5.5" strokeLinecap="round" />
          {/* 뒤로 길게 펄럭이는 띠 꼬리 */}
          <path d="M 86 36 Q 68 30 56 35" stroke="url(#muHeadbandGrad)" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M 86 38 Q 70 40 60 48" stroke="url(#muHeadbandGrad)" strokeWidth="2.8" strokeLinecap="round" />
        </g>

        {/* 5. [★ 1획 매칭: 오른쪽 팔 모양] (어깨에서 팔꿈치 꺾임까지만 자연스럽게 도복 소매로 표현, 아래쪽 어색한 가로 막대 패스 완전 제거!) */}
        <g id="mu-right-arm-match-stroke1">
          {/* 상완: 어깨(위 104,44)에서 팔꿈치(좌하단 68,112)로 내려오는 도복 소매 */}
          <path
            d="M 104 46 L 68 112 L 76 116 L 112 56 Z"
            fill="url(#muGiGrad)"
            stroke="#94A3B8"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          {/* 팔꿈치 접힘 주름선 */}
          <path d="M 72 104 L 80 110" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />

          {/* 오른손 끝단: 글자 1획 꼬리 끝(x ≈ 144, y ≈ 112)에서 오른손 주먹/손날 포인트 */}
          <ellipse cx="144" cy="112" rx="6.5" ry="5" fill="url(#muSkinGrad)" stroke="#EA580C" strokeWidth="1.2" />
          <line x1="142" y1="109" x2="146" y2="109" stroke="#C2410C" strokeWidth="1" strokeLinecap="round" />
          <line x1="142" y1="112" x2="146" y2="112" stroke="#C2410C" strokeWidth="1" strokeLinecap="round" />
        </g>

        {/* 6. [★ 2획 매칭: 왼쪽 팔 찌르기 (PUNCH)] (글자 2획 앞쪽으로 당당하게 돌출된 정권 주먹과 강력한 타격 스피드선) */}
        <g id="mu-left-arm-punch-match-stroke2">
          {/* 찌르는 팔 도복 소매: 가슴에서 우하향(2획 궤적 방향)으로 곧게 뻗음 */}
          <path
            d="M 98 70 L 126 82 L 122 90 L 94 78 Z"
            fill="url(#muGiGrad)"
            stroke="#94A3B8"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
          {/* 손목 흰색 붕대(핸드랩) */}
          <rect x="122" y="80" width="5.5" height="8.5" rx="1" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="1" transform="rotate(28 124 84)" />

          {/* [★ 핵심 수정: 글자 2획 끝 바로 앞(x=132, y=88)으로 선명하게 돌출된 강력한 정권 주먹!] */}
          <g id="punch-fist">
            {/* 정권 주먹 본체 */}
            <ellipse cx="132" cy="88" rx="7" ry="6" fill="url(#muSkinGrad)" stroke="#EA580C" strokeWidth="1.4" />
            {/* 굳게 쥔 4개 너클 손가락 마디선 */}
            <line x1="130" y1="84" x2="135" y2="85" stroke="#C2410C" strokeWidth="1.3" strokeLinecap="round" />
            <line x1="130" y1="88" x2="136" y2="89" stroke="#C2410C" strokeWidth="1.3" strokeLinecap="round" />
            <line x1="129" y1="92" x2="134" y2="92" stroke="#C2410C" strokeWidth="1.3" strokeLinecap="round" />
            {/* 엄지손가락 마디 */}
            <path d="M 127 88 Q 129 93 133 93" stroke="#EA580C" strokeWidth="1.2" fill="none" />
          </g>

          {/* [★ 핵심 수정: 주먹 끝에서 터져나가는 선명한 타격 임팩트 & 바람선] */}
          {/* 타격 에너지 스파크 글로우 */}
          <circle cx="140" cy="88" r="13" fill="url(#muPunchGrad)" />
          {/* 앞으로 뻗어나가는 날카로운 찌르기 스피드선 (슉-!) */}
          <line x1="138" y1="83" x2="152" y2="81" stroke="#F59E0B" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="141" y1="88" x2="158" y2="88" stroke="#EF4444" strokeWidth="2.8" strokeLinecap="round" />
          <line x1="138" y1="93" x2="152" y2="95" stroke="#F59E0B" strokeWidth="2.2" strokeLinecap="round" />
          {/* 반짝이는 십자 타격 스타 */}
          <polygon points="144,83 145.5,87 149,88 145.5,89 144,93 142.5,89 139,88 142.5,87" fill="#FEF08A" stroke="#F59E0B" strokeWidth="0.5" />
        </g>

        {/* 7. 글자 'ム' 오버레이 (오른팔 1획, 왼팔 찌르기 2획 위에 완벽하게 일체화) */}
        <KatakanaCharOverlay char="ム" fontFamily={fontFamily} x="106" y="118" />
      </svg>
    );
  }

  if (char === 'メ') {
    // メ: 메모 X체크 (포스트잇 메모지 위에 깔끔하게 그은 X체크 형태)
    return (
      <svg viewBox="0 0 200 160" className="w-full h-full select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* 포스트잇 메모지 은은한 입체 그라디언트 */}
          <linearGradient id="memoPaperGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FEFCE8" />
            <stop offset="35%" stopColor="#FEF9C3" />
            <stop offset="100%" stopColor="#FEF08A" />
          </linearGradient>

          {/* 상단 반투명 마스킹 테이프 그라디언트 */}
          <linearGradient id="memoTapeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#BAE6FD" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#7DD3FC" stopOpacity="0.85" />
          </linearGradient>

          {/* 종이 드롭 섀도우 */}
          <filter id="memoShadow" x="-15%" y="-15%" width="135%" height="135%" filterUnits="userSpaceOnUse">
            <feDropShadow dx="0" dy="5" stdDeviation="4.5" floodColor="#64748B" floodOpacity="0.22" />
          </filter>
        </defs>

        {/* 1. 포스트잇 메모지 본체 (은은한 그림자와 부드러운 라운딩) */}
        <rect
          x="46"
          y="22"
          width="116"
          height="116"
          rx="7"
          fill="url(#memoPaperGrad)"
          stroke="#FACC15"
          strokeWidth="1.2"
          filter="url(#memoShadow)"
        />

        {/* 2. 상단 중앙 고정 마스킹 테이프 (반투명 파스텔 테이프 디테일) */}
        <rect
          x="88"
          y="16"
          width="32"
          height="13"
          rx="2"
          fill="url(#memoTapeGrad)"
          stroke="#38BDF8"
          strokeWidth="0.8"
        />

        {/* 3. [요구사항 반영] 메모지 위 다른 요소 일체 배제, 오직 글자 'メ'만 펜으로 쓱 그은 X체크처럼 단독 표시 */}
        <KatakanaCharOverlay char="メ" fontFamily={fontFamily} x="104" y="115" />
      </svg>
    );
  }

  if (char === 'モ') {
    // モ: 모기 ("모~~" 하고 날아와 뾰족한 침을 콕 찌르고 오른쪽으로 배가 빵빵해진 귀여운 모기!)
    // ⚠️ 1획은 상단 투명 날개 쌍, 2획은 하단 날개 쌍 및 중간 다리, 3획은 아래로 콕 찌른 날렵한 침 & 오른쪽으로 뻗은 빵빵한 줄무늬 배와 1:1 완벽 일치!
    return (
      <svg viewBox="0 0 200 160" className="w-full h-full select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* 모기 투명 하늘빛 날개 그라디언트 */}
          <linearGradient id="kataMoWingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#E0F2FE" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#BAE6FD" stopOpacity="0.85" />
          </linearGradient>
          {/* 피를 꿀꺽 마셔 붉게 차오른 배 그라디언트 */}
          <linearGradient id="kataMoBellyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="50%" stopColor="#BE123C" />
            <stop offset="100%" stopColor="#F43F5E" />
          </linearGradient>
        </defs>

        {/* 1. 배경 은은한 하늘빛 원 & 앵앵 비행 궤적 */}
        <circle cx="100" cy="80" r="68" fill="#F0F9FF" />
        <circle cx="100" cy="80" r="50" fill="#E0F2FE" opacity="0.6" />

        {/* 모기가 빙글빙글 날아온 비행 궤적 점선 루프 */}
        <path
          d="M 22 38 C 14 20 36 14 46 26 C 52 36 66 32 78 24 C 84 20 92 23 96 25"
          stroke="#94A3B8"
          strokeWidth="1.3"
          strokeDasharray="3 4"
          strokeLinecap="round"
        />

        {/* "모~♪" 앵앵거리는 미니 음표 */}
        <path d="M 36 22 L 36 15 C 36 13 41 12 43 14" stroke="#0284C7" strokeWidth="1.4" strokeLinecap="round" />
        <ellipse cx="34" cy="22" rx="2.5" ry="1.8" fill="#0284C7" />

        {/* 2. 글자 'モ' 1획 (상단 가로): 모기 메인 상단 날개 쌍 (Upper Wings, y=50~60) */}
        {/* 좌측 상단 날개 */}
        <path
          d="M 104 54 C 78 40 42 44 32 52 C 30 58 54 64 104 56 Z"
          fill="url(#kataMoWingGrad)"
          stroke="#0284C7"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path d="M 100 54 C 76 46 54 49 38 53" stroke="#0284C7" strokeWidth="1.1" strokeLinecap="round" />
        <path d="M 96 55 C 76 53 58 58 46 61" stroke="#38BDF8" strokeWidth="0.9" strokeLinecap="round" />

        {/* 우측 상단 날개 */}
        <path
          d="M 108 54 C 134 40 170 44 180 52 C 182 58 158 64 108 56 Z"
          fill="url(#kataMoWingGrad)"
          stroke="#0284C7"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path d="M 112 54 C 136 46 158 49 174 53" stroke="#0284C7" strokeWidth="1.1" strokeLinecap="round" />
        <path d="M 116 55 C 136 53 154 58 166 61" stroke="#38BDF8" strokeWidth="0.9" strokeLinecap="round" />

        {/* 상단 윙윙 날갯짓 바람선 */}
        <path d="M 36 44 C 48 39 68 41 82 45" stroke="#38BDF8" strokeWidth="1.3" strokeDasharray="3 3" strokeLinecap="round" />
        <path d="M 176 44 C 164 39 144 41 130 45" stroke="#38BDF8" strokeWidth="1.3" strokeDasharray="3 3" strokeLinecap="round" />

        {/* 3. 글자 'モ' 2획 (중단 가로): 모기 하단 날개 쌍 (Lower Wings, y=78~86) */}
        {/* 좌측 하단 날개 */}
        <path
          d="M 104 82 C 78 72 48 76 38 82 C 36 86 56 90 104 84 Z"
          fill="url(#kataMoWingGrad)"
          stroke="#38BDF8"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path d="M 100 82 C 76 78 56 80 44 83" stroke="#0284C7" strokeWidth="0.9" strokeLinecap="round" />

        {/* 우측 하단 날개 */}
        <path
          d="M 108 82 C 134 72 164 76 174 82 C 176 86 156 90 108 84 Z"
          fill="url(#kataMoWingGrad)"
          stroke="#38BDF8"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path d="M 112 82 C 136 78 156 80 168 83" stroke="#0284C7" strokeWidth="0.9" strokeLinecap="round" />

        {/* 하단 날갯짓 바람선 */}
        <path d="M 44 75 C 56 71 74 73 86 75" stroke="#7DD3FC" strokeWidth="1.2" strokeDasharray="3 3" strokeLinecap="round" />
        <path d="M 168 75 C 156 71 138 73 126 75" stroke="#7DD3FC" strokeWidth="1.2" strokeDasharray="3 3" strokeLinecap="round" />

        {/* 모기 가슴 몸통 (Thorax) */}
        <ellipse cx="106" cy="66" rx="8" ry="14" fill="#334155" stroke="#0F172A" strokeWidth="1.6" />
        <line x1="104" y1="58" x2="104" y2="76" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" />

        {/* 꺾인 롱 모기 관절 다리들 */}
        {/* 앞다리 쌍 */}
        <path d="M 100 62 C 84 56 70 62 58 68" stroke="#334155" strokeWidth="1.4" strokeLinecap="round" fill="none" />
        <path d="M 112 62 C 128 56 142 62 154 68" stroke="#334155" strokeWidth="1.4" strokeLinecap="round" fill="none" />
        {/* 뒷다리 쌍 */}
        <path d="M 102 78 C 86 86 72 96 64 112" stroke="#334155" strokeWidth="1.4" strokeLinecap="round" fill="none" />
        <path d="M 110 78 C 126 86 140 96 150 110" stroke="#334155" strokeWidth="1.4" strokeLinecap="round" fill="none" />

        {/* 4. 피부 표면 라인 & 콕 물린 자리 연출 */}
        <path d="M 52 125 C 76 122 136 122 160 126" stroke="#FDBA74" strokeWidth="2.5" strokeLinecap="round" />

        {/* 물린 자리 붉은 스팟 & 핏방울 하트 */}
        <circle cx="106" cy="125" r="4.2" fill="#F43F5E" opacity="0.85" />
        <circle cx="106" cy="125" r="2" fill="#BE123C" />

        {/* 따끔! 번쩍이는 노란색 별빛 스파크 */}
        <path
          d="M 96 122 L 98 117 L 100 122 L 105 124 L 100 126 L 98 131 L 96 126 L 91 124 Z"
          fill="#F59E0B"
        />
        <path
          d="M 114 118 L 115.5 114 L 117 118 L 121 119.5 L 117 121 L 115.5 125 L 114 121 L 110 119.5 Z"
          fill="#FDE047"
        />

        {/* 5. 글자 'モ' 3획 세로선: 모기의 길고 날렵한 빨대 침 (Stinger / Proboscis) */}
        <path d="M 106 76 L 106 122" stroke="#0F172A" strokeWidth="3.2" strokeLinecap="round" />
        <line x1="106" y1="116" x2="106" y2="124" stroke="#DC2626" strokeWidth="2.2" strokeLinecap="round" />

        {/* 6. 글자 'モ' 3획 꺾임 및 오른쪽 수평선: 피를 마셔 빵빵해진 통통한 줄무늬 배 (Abdomen) */}
        {/* 통통한 배 실루엣 (오른쪽으로 길고 둥글게 뻗어나간 형태) */}
        <path
          d="M 106 80
             C 106 98 110 116 122 118
             C 134 119 146 116 148 106
             C 148 95 134 92 120 88
             C 113 86 109 82 106 80 Z"
          fill="url(#kataMoBellyGrad)"
          stroke="#0F172A"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />

        {/* 꿀꺽 마신 피로 빵빵하게 붉어진 배 끝 하이라이트 */}
        <path
          d="M 124 117 C 134 118 145 115 147 106 C 147 98 136 94 125 93 C 123 102 122 110 124 117 Z"
          fill="#F43F5E"
          opacity="0.85"
        />

        {/* 배 마디마디 선명한 차콜 줄무늬 (Abdomen Bands) */}
        <path d="M 112 87 C 114 94 115 103 113 113" stroke="#1E293B" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M 122 91 C 124 98 125 106 123 115" stroke="#1E293B" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M 132 94 C 135 100 135 106 133 112" stroke="#1E293B" strokeWidth="1.8" strokeLinecap="round" />

        {/* 배 광택 반사광 타원 */}
        <ellipse cx="138" cy="103" rx="2" ry="4" fill="#FFFFFF" opacity="0.6" transform="rotate(25 138 103)" />

        {/* 7. 모기 머리 & 사랑스러운 만화 표정 (Head & Face, y=24~38) */}
        {/* 둥근 머리 본체 */}
        <circle cx="106" cy="33" r="10.5" fill="#475569" stroke="#0F172A" strokeWidth="1.6" />

        {/* 똘망똘망한 커다란 두 눈망울 */}
        {/* 좌측 눈 */}
        <circle cx="102" cy="31" r="5" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.3" />
        <circle cx="102.5" cy="31" r="3.2" fill="#0F172A" />
        <circle cx="103.5" cy="29.8" r="1.2" fill="#FFFFFF" />

        {/* 우측 눈 */}
        <circle cx="110" cy="31" r="5" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.3" />
        <circle cx="109.5" cy="31" r="3.2" fill="#0F172A" />
        <circle cx="110.5" cy="29.8" r="1.2" fill="#FFFFFF" />

        {/* 사랑스러운 복숭아빛 볼터치 */}
        <ellipse cx="98" cy="36" rx="3" ry="1.9" fill="#FDA4AF" opacity="0.85" />
        <ellipse cx="114" cy="36" rx="3" ry="1.9" fill="#FDA4AF" opacity="0.85" />

        {/* 머리 위 귀여운 코일형 더듬이 2가닥 (Antennae) */}
        <path d="M 102 23 C 98 13 90 15 92 20" stroke="#0F172A" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <path d="M 110 23 C 114 13 122 15 120 20" stroke="#0F172A" strokeWidth="1.5" strokeLinecap="round" fill="none" />

        {/* 글자 'モ' 오버레이 (날개 쌍, 침 및 우측으로 뻗은 배와 완벽 일치) */}
        <KatakanaCharOverlay char="モ" fontFamily={fontFamily} x="106" y="118" />
      </svg>
    );
  }

  return null;
}
