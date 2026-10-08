import React from 'react';
import { KatakanaMnemonicSvgChildProps } from './types';
import KatakanaCharOverlay from './KatakanaCharOverlay';

export default function KatakanaRowTa({ char, fontFamily }: KatakanaMnemonicSvgChildProps) {
  if (char === 'タ') {
    // タ: 타조 (쫑긋한 머리와 긴 목, 달리는 타조의 다리)
    return (
      <svg viewBox="0 0 200 160" className="w-full h-full select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* 지면 그림자 */}
        <ellipse cx="106" cy="142" rx="46" ry="6" fill="#E2E8F0" />

        {/* 타조 몸통 깃털 (글자 タ의 꺾인 외곽선) */}
        <ellipse cx="108" cy="94" rx="26" ry="20" fill="#334155" stroke="#1E293B" strokeWidth="2" />
        {/* 꼬리 날개깃 */}
        <path d="M 132 90 C 146 84 150 96 142 102" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />

        {/* 타조 긴 목과 머리 (글자 タ의 1획과 가로선 연결) */}
        <path d="M 94 94 C 88 74 76 56 68 40" stroke="#FDBA74" strokeWidth="6" strokeLinecap="round" />
        {/* 타조 머리 & 부리 */}
        <circle cx="66" cy="38" r="8" fill="#FDBA74" />
        <polygon points="60,38 50,40 60,44" fill="#F97316" />
        <circle cx="64" cy="36" r="1.5" fill="#1E293B" />

        {/* 타조 다리 (글자 タ 안쪽 대각선 획) */}
        <line x1="104" y1="112" x2="88" y2="140" stroke="#FDBA74" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="114" y1="112" x2="124" y2="140" stroke="#FDBA74" strokeWidth="3.5" strokeLinecap="round" />

        {/* 글자 'タ' 오버레이 */}
        <KatakanaCharOverlay char="タ" fontFamily={fontFamily} x="106" y="118" />
      </svg>
    );
  }

  if (char === 'チ') {
    // チ: 치어리더 (응원 수술 폼폼을 들고 손을 뻗은 치어리더)
    return (
      <svg viewBox="0 0 200 160" className="w-full h-full select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* 무대 바닥 */}
        <line x1="30" y1="140" x2="170" y2="140" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />

        {/* 치어리더 얼굴 & 리본 */}
        <circle cx="106" cy="44" r="14" fill="#FED7AA" stroke="#EA580C" strokeWidth="1.5" />
        <circle cx="101" cy="42" r="1.5" fill="#1E293B" />
        <circle cx="111" cy="42" r="1.5" fill="#1E293B" />
        <path d="M 103 48 Q 106 51 109 48" stroke="#EA580C" strokeWidth="1.2" />

        {/* 뻗은 팔과 가로 획 (글자 チ의 상단 가로 획들) */}
        <line x1="62" y1="48" x2="150" y2="48" stroke="#EA580C" strokeWidth="3" strokeLinecap="round" />
        <line x1="56" y1="74" x2="156" y2="74" stroke="#EA580C" strokeWidth="3.5" strokeLinecap="round" />

        {/* 응원 폼폼 (Pom-poms) */}
        <circle cx="56" cy="48" r="12" fill="#FDE047" stroke="#EAB308" strokeWidth="1.5" />
        <circle cx="152" cy="48" r="12" fill="#FDE047" stroke="#EAB308" strokeWidth="1.5" />

        {/* 몸통 및 원피스 스커트 (글자 チ의 세로 삐침) */}
        <path d="M 94 74 L 118 74 L 126 112 L 86 112 Z" fill="#F43F5E" stroke="#BE123C" strokeWidth="2" />
        <line x1="106" y1="74" x2="102" y2="138" stroke="#EA580C" strokeWidth="4" strokeLinecap="round" />

        {/* 글자 'チ' 오버레이 */}
        <KatakanaCharOverlay char="チ" fontFamily={fontFamily} x="106" y="118" />
      </svg>
    );
  }

  if (char === 'ツ') {
    // ツ: 츠나미 / 침 (★ 핵심: 위에서 아래로 츠! 침 튀기듯 쏟아지는 물방울!)
    return (
      <svg viewBox="0 0 200 160" className="w-full h-full select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* 상단에서 떨어지는 메인 츠나미 물줄기 (글자 ツ의 긴 획 - 위에서 아래로 꽂힘) */}
        <path
          d="M 148 46 C 144 68 128 102 78 136 C 72 134 76 124 86 114 C 114 86 132 60 138 46 Z"
          fill="#0284C7"
          stroke="#0369A1"
          strokeWidth="2"
        />

        {/* 상단에서 나란히 떨어지는 2개의 물방울/침방울 (글자 ツ의 상단 두 점) */}
        <ellipse cx="76" cy="48" rx="4.5" ry="6" fill="#38BDF8" stroke="#0284C7" strokeWidth="1.5" />
        <ellipse cx="106" cy="54" rx="4.5" ry="6" fill="#38BDF8" stroke="#0284C7" strokeWidth="1.5" />

        {/* 바닥 충돌 물보라 */}
        <ellipse cx="78" cy="138" rx="18" ry="4" fill="#BAE6FD" />
        <circle cx="68" cy="130" r="2" fill="#38BDF8" />
        <circle cx="60" cy="136" r="1.5" fill="#38BDF8" />

        {/* ★ 방향성 안내 배지 (위 ➔ 아래) */}
        <g id="direction-hint" transform="translate(142, 98)">
          <rect x="0" y="0" width="46" height="18" rx="9" fill="#0284C7" />
          <text x="23" y="13" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold">▼ 위➔아래</text>
        </g>

        {/* 글자 'ツ' 오버레이 */}
        <KatakanaCharOverlay char="ツ" fontFamily={fontFamily} x="106" y="118" />
      </svg>
    );
  }

  if (char === 'テ') {
    // テ: 테이블 (평평한 2단 상판과 중앙 받침 기둥)
    return (
      <svg viewBox="0 0 200 160" className="w-full h-full select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* 바닥 그림자 */}
        <ellipse cx="106" cy="142" rx="52" ry="7" fill="#E2E8F0" />

        {/* 테이블 상단 1단 받침대 (글자 テ 1획) */}
        <rect x="74" y="44" width="64" height="8" rx="4" fill="#B45309" stroke="#78350F" strokeWidth="1.8" />

        {/* 테이블 메인 상판 (글자 テ 2획) */}
        <rect x="52" y="66" width="108" height="10" rx="5" fill="#D97706" stroke="#92400E" strokeWidth="2" />

        {/* 테이블 중앙 지지 다리 (글자 テ 3획 곡선 삐침) */}
        <path
          d="M 106 76 C 106 98 100 124 74 138"
          stroke="#92400E"
          strokeWidth="6"
          strokeLinecap="round"
        />
        {/* 테이블 베이스 받침판 */}
        <ellipse cx="88" cy="138" rx="28" ry="6" fill="#78350F" />

        {/* 테이블 위 따뜻한 찻잔 */}
        <rect x="126" y="52" width="14" height="12" rx="3" fill="#FFFFFF" stroke="#64748B" strokeWidth="1.2" />
        <path d="M 140 56 Q 144 58 140 62" stroke="#64748B" strokeWidth="1.2" fill="none" />

        {/* 글자 'テ' 오버레이 */}
        <KatakanaCharOverlay char="テ" fontFamily={fontFamily} x="106" y="118" />
      </svg>
    );
  }

  if (char === 'ト') {
    // ト: 토템폴 (우뚝 솟은 수직 기둥과 오른쪽으로 뻗은 날개 가지)
    return (
      <svg viewBox="0 0 200 160" className="w-full h-full select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* 지면 언덕 */}
        <ellipse cx="106" cy="144" rx="56" ry="8" fill="#FEF3C7" />

        {/* 토템폴 수직 원목 기둥 (글자 ト 1획 곧은 세로선) */}
        <rect x="86" y="28" width="22" height="114" rx="6" fill="#92400E" stroke="#451A03" strokeWidth="2.5" />

        {/* 오른쪽으로 비스듬히 뻗은 토템 날개 가지 (글자 ト 2획) */}
        <path
          d="M 106 72 L 152 108 L 144 116 L 106 88 Z"
          fill="#D97706"
          stroke="#78350F"
          strokeWidth="2"
        />

        {/* 토템폴 조각 얼굴 문양 디테일 */}
        <circle cx="97" cy="48" r="4" fill="#FDE047" stroke="#78350F" strokeWidth="1" />
        <circle cx="97" cy="48" r="1.5" fill="#1E293B" />
        <rect x="91" y="58" width="12" height="4" rx="1" fill="#FFFFFF" />

        {/* 상단 깃털 장식 */}
        <path d="M 97 28 L 92 14 L 102 14 Z" fill="#EF4444" stroke="#B91C1C" strokeWidth="1" />

        {/* 글자 'ト' 오버레이 */}
        <KatakanaCharOverlay char="ト" fontFamily={fontFamily} x="106" y="118" />
      </svg>
    );
  }

  return null;
}
