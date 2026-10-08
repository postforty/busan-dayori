import React from 'react';
import { KatakanaMnemonicSvgChildProps } from './types';
import KatakanaCharOverlay from './KatakanaCharOverlay';

export default function KatakanaRowYa({ char, fontFamily }: KatakanaMnemonicSvgChildProps) {
  if (char === 'ヤ') {
    // ヤ: 야구 (히라가나 や가 각지게 직선화된 거의 동일한 형태 - 야구 배트와 홈플레이트 재활용)
    return (
      <svg viewBox="0 0 200 160" className="w-full h-full select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* 그라운드 흙 베이스 */}
        <ellipse cx="106" cy="140" rx="60" ry="10" fill="#FEF3C7" />

        {/* 홈플레이트 오각형 */}
        <polygon points="106,146 84,136 84,124 128,124 128,136" fill="#FFFFFF" stroke="#64748B" strokeWidth="2" />

        {/* 야구공 (빨간 스티치 실밥) */}
        <circle cx="146" cy="52" r="12" fill="#FFFFFF" stroke="#475569" strokeWidth="1.5" />
        <path d="M 142 43 C 146 48 146 56 142 61" stroke="#EF4444" strokeWidth="1.2" fill="none" />
        <path d="M 150 43 C 146 48 146 56 150 61" stroke="#EF4444" strokeWidth="1.2" fill="none" />

        {/* 비스듬히 세워진 나무 야구 배트 (글자 ヤ의 꺾임과 세로 기둥 획) */}
        <path
          d="M 64 62 L 136 62 L 132 94 L 98 136"
          stroke="#D97706"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* 배트 손잡이 끈 (글자 ヤ 2획 삐침) */}
        <line x1="88" y1="74" x2="108" y2="124" stroke="#B45309" strokeWidth="5.5" strokeLinecap="round" />

        {/* 글자 'ヤ' 오버레이 */}
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
