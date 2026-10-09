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
    // ム: 무스케이크 (삼각형으로 예쁘게 컷팅한 달콤한 딸기 무스케이크)
    return (
      <svg viewBox="0 0 200 160" className="w-full h-full select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* 접시 베이스 */}
        <ellipse cx="106" cy="138" rx="54" ry="8" fill="#F1F5F9" stroke="#E2E8F0" strokeWidth="1.5" />

        {/* 삼각형 무스케이크 본체 (글자 ム의 삼각형 루프 궤적) */}
        <path
          d="M 106 42 L 148 116 L 68 116 Z"
          fill="#FCE7F3"
          stroke="#F472B6"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {/* 무스 초콜릿 레이어 층 */}
        <path d="M 88 80 L 126 80 L 138 100 L 76 100 Z" fill="#FBCFE8" />

        {/* 상단 블루베리 토핑 (글자 ム 2획 짧은 점 위치) */}
        <circle cx="114" cy="46" r="6" fill="#6366F1" stroke="#4338CA" strokeWidth="1" />
        <circle cx="124" cy="56" r="4.5" fill="#818CF8" />

        {/* 민트 잎 */}
        <path d="M 112 40 Q 106 34 100 36 Q 102 42 108 42" fill="#22C55E" />

        {/* 글자 'ム' 오버레이 */}
        <KatakanaCharOverlay char="ム" fontFamily={fontFamily} x="106" y="118" />
      </svg>
    );
  }

  if (char === 'メ') {
    // メ: 메모 (메모지에 펜으로 비스듬히 체크 X표를 긋는 모습)
    return (
      <svg viewBox="0 0 200 160" className="w-full h-full select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* 노란색 사각 메모지 (Post-it) */}
        <rect x="52" y="36" width="102" height="102" rx="8" fill="#FEF9C3" stroke="#FDE047" strokeWidth="2" />
        <path d="M 136 120 L 154 138 L 136 138 Z" fill="#FACC15" /> {/* 접힌 모서리 */}

        {/* 메모지 줄 노트선 */}
        <line x1="68" y1="56" x2="138" y2="56" stroke="#FEF08A" strokeWidth="1.5" />
        <line x1="68" y1="76" x2="138" y2="76" stroke="#FEF08A" strokeWidth="1.5" />
        <line x1="68" y1="96" x2="138" y2="96" stroke="#FEF08A" strokeWidth="1.5" />

        {/* 사선 교차 체크선 (글자 メ 형태) */}
        <line x1="138" y1="48" x2="74" y2="128" stroke="#EF4444" strokeWidth="6" strokeLinecap="round" />
        <line x1="84" y1="54" x2="128" y2="120" stroke="#EF4444" strokeWidth="6" strokeLinecap="round" />

        {/* 볼펜 팁 */}
        <line x1="138" y1="48" x2="154" y2="30" stroke="#1E293B" strokeWidth="5" strokeLinecap="round" />

        {/* 글자 'メ' 오버레이 */}
        <KatakanaCharOverlay char="メ" fontFamily={fontFamily} x="106" y="118" />
      </svg>
    );
  }

  if (char === 'モ') {
    // モ: 모기 (히라가나 も가 직선화된 거의 동일한 형태 - 2개의 긴 다리와 곧은 주둥이 침)
    return (
      <svg viewBox="0 0 200 160" className="w-full h-full select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* 모기 몸통 (작은 타원형) */}
        <ellipse cx="106" cy="80" rx="14" ry="24" fill="#334155" stroke="#1E293B" strokeWidth="1.8" />

        {/* 얇고 투명한 양 날개 */}
        <ellipse cx="80" cy="62" rx="24" ry="10" transform="rotate(-30 80 62)" fill="#E0F2FE" stroke="#38BDF8" strokeWidth="1.2" opacity="0.8" />
        <ellipse cx="132" cy="62" rx="24" ry="10" transform="rotate(30 132 62)" fill="#E0F2FE" stroke="#38BDF8" strokeWidth="1.2" opacity="0.8" />

        {/* 가로로 뻗은 두 쌍의 긴 다리 (글자 モ의 가로 두 획과 일치) */}
        <line x1="60" y1="58" x2="152" y2="58" stroke="#475569" strokeWidth="3" strokeLinecap="round" />
        <line x1="54" y1="84" x2="158" y2="84" stroke="#475569" strokeWidth="3.5" strokeLinecap="round" />

        {/* 아래로 꼿꼿하게 찌르는 뾰족한 주둥이 침 (글자 モ의 세로 획과 일치) */}
        <line x1="106" y1="46" x2="106" y2="134" stroke="#DC2626" strokeWidth="4.5" strokeLinecap="round" />

        {/* 찔린 곳의 작은 붉은 가려움 포인트 */}
        <circle cx="106" cy="138" r="6" fill="#FCA5A5" opacity="0.7" />
        <circle cx="106" cy="138" r="2" fill="#EF4444" />

        {/* 글자 'モ' 오버레이 */}
        <KatakanaCharOverlay char="モ" fontFamily={fontFamily} x="106" y="118" />
      </svg>
    );
  }

  return null;
}
