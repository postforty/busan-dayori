import React from 'react';
import { KatakanaMnemonicSvgChildProps } from './types';
import KatakanaCharOverlay from './KatakanaCharOverlay';

export default function KatakanaRowKa({ char, fontFamily }: KatakanaMnemonicSvgChildProps) {
  if (char === 'カ') {
    // カ: 카메라 (히라가나 か에서 오른쪽 점만 빠진 동일 형태 - 카메라 바디와 렌즈 재활용)
    return (
      <svg viewBox="0 0 200 160" className="w-full h-full select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* 카메라 본체 프레임 */}
        <rect x="38" y="56" width="124" height="76" rx="14" fill="#FAFAF9" stroke="#78716C" strokeWidth="1.8" />
        {/* 상단 셔터 버튼 */}
        <rect x="126" y="46" width="20" height="10" rx="3" fill="#E7E5E4" stroke="#78716C" strokeWidth="1.6" />
        {/* 플래시 창 */}
        <rect x="52" y="66" width="16" height="10" rx="2" fill="#FEF08A" stroke="#78716C" strokeWidth="1.3" />
        {/* 원형 렌즈 림 & 렌즈 반사광 */}
        <circle cx="100" cy="95" r="26" fill="#FFFFFF" stroke="#78716C" strokeWidth="1.8" />
        <circle cx="100" cy="95" r="18" stroke="#D6D3D1" strokeWidth="1.5" />
        <path d="M 92 84 C 104 80 114 88 114 98" stroke="#38BDF8" strokeWidth="2.2" strokeLinecap="round" />

        {/* 글자 'カ' 오버레이 (점 없는 가타카나 カ로 직접 매칭!) */}
        <KatakanaCharOverlay char="カ" fontFamily={fontFamily} x="106" y="118" />
      </svg>
    );
  }

  if (char === 'キ') {
    // キ: 키 / 열쇠 (히라가나 き의 2단 톱니와 곧은 기둥 획과 1:1 완벽 일치하는 황금 열쇠)
    return (
      <svg viewBox="0 0 200 160" className="w-full h-full select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* 자물쇠 구멍 배경 음영 */}
        <path
          d="M 106 48 C 94 48 86 56 86 66 C 86 72 90 78 94 82 L 90 120 C 90 124 94 128 106 128 C 118 128 122 124 122 120 L 118 82 C 122 78 126 72 126 66 C 126 56 118 48 106 48 Z"
          fill="#FEFCE8"
          opacity="0.6"
        />
        {/* 2단 톱니 날 (글자 キ의 가로 두 획과 일치) */}
        <rect x="76" y="58" width="60" height="7" rx="3.5" fill="#FDE047" stroke="#CA8A04" strokeWidth="1.8" />
        <rect x="70" y="78" width="72" height="7" rx="3.5" fill="#FDE047" stroke="#CA8A04" strokeWidth="1.8" />

        {/* 열쇠 중앙 기둥 자루 (글자 キ의 세로 비스듬한 기둥) */}
        <line x1="112" y1="36" x2="98" y2="134" stroke="#CA8A04" strokeWidth="5.5" strokeLinecap="round" />
        <line x1="112" y1="38" x2="98" y2="132" stroke="#FEF08A" strokeWidth="2.5" strokeLinecap="round" />

        {/* 황금빛 반짝임 */}
        <path d="M 148 48 L 150 40 L 152 48 L 160 50 L 152 52 L 150 60 L 148 52 L 140 50 Z" fill="#EAB308" />

        {/* 글자 'キ' 오버레이 */}
        <KatakanaCharOverlay char="キ" fontFamily={fontFamily} x="106" y="118" />
      </svg>
    );
  }

  if (char === 'ク') {
    // ク: 쿠키 (한 입 베어 문 7자 모양의 고소한 초코칩 쿠키 조각)
    return (
      <svg viewBox="0 0 200 160" className="w-full h-full select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* 쿠키 접시 그림자 */}
        <ellipse cx="106" cy="138" rx="48" ry="7" fill="#E2E8F0" />

        {/* 각진 쿠키 본체 (글자 ク의 꺾임선과 대각 획 실루엣) */}
        <path
          d="M 64 54 L 144 54 C 144 74 136 94 92 136 L 76 118 C 96 96 102 78 102 68 L 64 68 Z"
          fill="#FDE68A"
          stroke="#D97706"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {/* 초코칩 토핑들 */}
        <circle cx="86" cy="62" r="3.5" fill="#78350F" />
        <circle cx="120" cy="62" r="4" fill="#78350F" />
        <circle cx="116" cy="84" r="3.5" fill="#78350F" />
        <circle cx="100" cy="106" r="3" fill="#78350F" />

        {/* 글자 'ク' 오버레이 */}
        <KatakanaCharOverlay char="ク" fontFamily={fontFamily} x="106" y="118" />
      </svg>
    );
  }

  if (char === 'ケ') {
    // ケ: 케이크 (칼로 자른 각진 조각 케이크와 생크림 딸기)
    return (
      <svg viewBox="0 0 200 160" className="w-full h-full select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* 접시 베이스 */}
        <ellipse cx="106" cy="136" rx="54" ry="8" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1.5" />

        {/* 조각 케이크 옆면/단면 (글자 ケ의 긴 세로선과 가로 나이프 궤적) */}
        <path
          d="M 72 48 L 144 80 L 144 124 L 72 96 Z"
          fill="#FFFBEB"
          stroke="#F59E0B"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {/* 케이크 윗면 */}
        <path d="M 72 48 L 110 36 L 144 80 Z" fill="#FEE2E2" stroke="#F87171" strokeWidth="2" />

        {/* 상단 딸기 */}
        <circle cx="106" cy="40" r="7" fill="#EF4444" />
        <path d="M 103 33 L 106 30 L 109 33 Z" fill="#16A34A" />

        {/* 자르는 나이프 실루엣 (글자 ケ의 왼쪽 삐침과 가로선 매칭) */}
        <line x1="60" y1="36" x2="82" y2="84" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />
        <line x1="74" y1="62" x2="148" y2="62" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />

        {/* 글자 'ケ' 오버레이 */}
        <KatakanaCharOverlay char="ケ" fontFamily={fontFamily} x="106" y="118" />
      </svg>
    );
  }

  if (char === 'コ') {
    // コ: 코너 (직각으로 꺾인 도로 모퉁이 코너와 코너 표지판)
    return (
      <svg viewBox="0 0 200 160" className="w-full h-full select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* 직각 코너 도로 블록 (글자 コ의 ㄷ자 형태 실루엣) */}
        <path
          d="M 62 48 L 144 48 L 144 80 L 102 80 L 102 108 L 144 108 L 144 136 L 62 136 Z"
          fill="#F1F5F9"
          stroke="#475569"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {/* 노란색 중앙선 코너 회전 궤적 */}
        <path d="M 76 64 L 128 64 L 128 122 L 76 122" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" strokeDasharray="8 5" />

        {/* 코너 회전 알림 화살표 깃발 */}
        <path d="M 148 44 L 162 54 L 148 64 Z" fill="#3B82F6" />

        {/* 글자 'コ' 오버레이 */}
        <KatakanaCharOverlay char="コ" fontFamily={fontFamily} x="106" y="118" />
      </svg>
    );
  }

  return null;
}
