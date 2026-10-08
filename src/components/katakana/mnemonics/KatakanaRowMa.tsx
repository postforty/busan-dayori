import React from 'react';
import { KatakanaMnemonicSvgChildProps } from './types';
import KatakanaCharOverlay from './KatakanaCharOverlay';

export default function KatakanaRowMa({ char, fontFamily }: KatakanaMnemonicSvgChildProps) {
  if (char === 'マ') {
    // マ: 마이크 (스탠드 홀더에 비스듬히 꽂힌 마이크 헤드와 각도)
    return (
      <svg viewBox="0 0 200 160" className="w-full h-full select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* 마이크 스탠드 기둥 */}
        <line x1="68" y1="140" x2="106" y2="92" stroke="#475569" strokeWidth="6" strokeLinecap="round" />
        <ellipse cx="68" cy="142" rx="28" ry="6" fill="#1E293B" />

        {/* 둥근 마이크 그릴 헤드 (글자 マ 1획 꺾임의 꼭짓점 위치) */}
        <ellipse cx="128" cy="52" rx="20" ry="16" transform="rotate(-30 128 52)" fill="#94A3B8" stroke="#334155" strokeWidth="2" />
        <ellipse cx="128" cy="52" rx="14" ry="10" transform="rotate(-30 128 52)" fill="#CBD5E1" />

        {/* 마이크 몸체 바디 (글자 マ 1획 수평선과 대각선) */}
        <path
          d="M 68 56 L 132 56 L 94 104"
          stroke="#0284C7"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* 마이크 보조선 (글자 マ 2획 짧은 점) */}
        <line x1="104" y1="88" x2="128" y2="108" stroke="#0284C7" strokeWidth="6" strokeLinecap="round" />

        {/* 노래 음표 이펙트 */}
        <circle cx="156" cy="40" r="3" fill="#F59E0B" />
        <path d="M 159 40 L 159 28 C 163 28 167 31 166 33" stroke="#F59E0B" strokeWidth="1.5" fill="none" strokeLinecap="round" />

        {/* 글자 'マ' 오버레이 */}
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
