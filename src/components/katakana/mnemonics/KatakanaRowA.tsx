import React from 'react';
import { KatakanaMnemonicSvgChildProps } from './types';
import KatakanaCharOverlay from './KatakanaCharOverlay';

export default function KatakanaRowA({ char, fontFamily }: KatakanaMnemonicSvgChildProps) {
  if (char === 'ア') {
    // ア: 아이스크림 (각진 와플 콘의 모서리와 달콤한 스트로베리 스쿱)
    return (
      <svg viewBox="0 0 200 160" className="w-full h-full select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* 달콤한 아이스크림 스쿱 */}
        <circle cx="108" cy="46" r="26" fill="#FCE7F3" stroke="#F472B6" strokeWidth="2" />
        <ellipse cx="102" cy="40" rx="8" ry="4" fill="#FFFFFF" opacity="0.6" />
        <circle cx="118" cy="38" r="4.5" fill="#EF4444" /> {/* 체리 토핑 */}

        {/* 와플 콘 (가타카나 ア의 각진 모서리와 빗겨내려오는 획과 일치) */}
        <path
          d="M 68 56 L 148 56 L 102 142 Z"
          fill="#FEF3C7"
          stroke="#D97706"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {/* 콘 격자무늬 */}
        <line x1="80" y1="74" x2="134" y2="74" stroke="#FBBF24" strokeWidth="1.5" />
        <line x1="88" y1="96" x2="122" y2="96" stroke="#FBBF24" strokeWidth="1.5" />
        <line x1="96" y1="118" x2="110" y2="118" stroke="#FBBF24" strokeWidth="1.5" />

        {/* 글자 'ア' 오버레이 */}
        <KatakanaCharOverlay char="ア" fontFamily={fontFamily} x="106" y="118" />
      </svg>
    );
  }

  if (char === 'イ') {
    // イ: 이젤 (Easel - 화가의 나무 이젤과 꼿꼿한 삼각 다리)
    return (
      <svg viewBox="0 0 200 160" className="w-full h-full select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* 이젤 상단 조임 볼트 */}
        <circle cx="106" cy="24" r="5" fill="#78350F" />

        {/* 캔버스 액자 */}
        <rect x="74" y="44" width="68" height="52" rx="4" fill="#F8FAFC" stroke="#64748B" strokeWidth="2" />
        <path d="M 84 82 L 98 64 L 114 78 L 128 60 L 134 82 Z" fill="#E2E8F0" />
        <circle cx="92" cy="58" r="4" fill="#F59E0B" />

        {/* 이젤 다리 프레임 (가타카나 イ의 왼쪽 삐침과 곧은 세로획) */}
        <line x1="106" y1="26" x2="68" y2="140" stroke="#B45309" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="106" y1="26" x2="128" y2="140" stroke="#B45309" strokeWidth="3.5" strokeLinecap="round" />
        {/* 가로 받침목 */}
        <line x1="64" y1="98" x2="148" y2="98" stroke="#92400E" strokeWidth="3" strokeLinecap="round" />

        {/* 글자 'イ' 오버레이 */}
        <KatakanaCharOverlay char="イ" fontFamily={fontFamily} x="106" y="118" />
      </svg>
    );
  }

  if (char === 'ウ') {
    // ウ: 우주선 (중심축 기준 완벽 좌우 대칭의 유선형 메인 동체, 대칭 날개, 중앙 원형 전망창)
    return (
      <svg viewBox="0 0 200 160" className="w-full h-full select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* 유선형 우주선 본체 그라디언트 (산뜻한 실버-아이스 블루) */}
          <linearGradient id="u-hull-sym" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E0F2FE" />
            <stop offset="25%" stopColor="#F0F9FF" />
            <stop offset="50%" stopColor="#FFFFFF" />
            <stop offset="75%" stopColor="#F0F9FF" />
            <stop offset="100%" stopColor="#BAE6FD" />
          </linearGradient>
          {/* 좌우 대칭 날개 그라디언트 */}
          <linearGradient id="u-wing-left" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#E0F2FE" />
            <stop offset="100%" stopColor="#BAE6FD" />
          </linearGradient>
          <linearGradient id="u-wing-right" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E0F2FE" />
            <stop offset="100%" stopColor="#BAE6FD" />
          </linearGradient>
          {/* 중앙 전망창 돔 글래스 그라디언트 */}
          <linearGradient id="u-window-sym" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="60%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#0369A1" />
          </linearGradient>
        </defs>

        {/* 배경: 은은한 메탈릭 별빛 & 미니 행성 (완벽 쿨톤) */}
        <path d="M 24 36 Q 24 42 18 42 Q 24 42 24 48 Q 24 42 30 42 Q 24 42 24 36 Z" fill="#94A3B8" opacity="0.6" />
        <path d="M 178 36 Q 178 42 172 42 Q 178 42 178 48 Q 178 42 184 42 Q 178 42 178 36 Z" fill="#94A3B8" opacity="0.6" />
        <circle cx="184" cy="90" r="1.5" fill="#93C5FD" opacity="0.6" />
        <circle cx="16" cy="90" r="1.5" fill="#93C5FD" opacity="0.6" />

        {/* 1획: 우주선 정중앙 통신 안테나 & 센서 팁 (완벽 대칭 기준선 x=106) */}
        <path d="M 97 12 A 10 10 0 0 1 115 12" stroke="#7DD3FC" strokeWidth="1.5" strokeLinecap="round" opacity="0.75" />
        <path d="M 93 7 A 15 15 0 0 1 119 7" stroke="#BAE6FD" strokeWidth="1.2" strokeLinecap="round" opacity="0.55" />
        <line x1="106" y1="15" x2="106" y2="38" stroke="#0284C7" strokeWidth="2.8" strokeLinecap="round" />
        <circle cx="106" cy="14" r="3.5" fill="#38BDF8" stroke="#0284C7" strokeWidth="1.2" />

        {/* 좌우 대칭 유선형 날개 (Wings / Aerodynamic Fins) */}
        {/* 좌측 날개 */}
        <path
          d="M 86 80 C 80 94 64 110 58 124 C 62 128 76 126 86 124 Z"
          fill="url(#u-wing-left)"
          stroke="#0284C7"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        {/* 우측 날개 (x=106 기준 완벽 대칭) */}
        <path
          d="M 126 80 C 132 94 148 110 154 124 C 150 128 136 126 126 124 Z"
          fill="url(#u-wing-right)"
          stroke="#0284C7"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />

        {/* 좌우 날개 윙팁 항법 비컨 (대칭) */}
        <circle cx="58" cy="124" r="2.2" fill="#EF4444" />
        <circle cx="154" cy="124" r="2.2" fill="#22C55E" />

        {/* 유선형 메인 선체 동체 (완벽 좌우 대칭 유선형 우주선 실루엣) */}
        <path
          d="M 106 36
             C 114 46 122 60 126 80
             C 130 96 130 114 126 124
             L 86 124
             C 82 114 82 96 86 80
             C 90 60 98 46 106 36 Z"
          fill="url(#u-hull-sym)"
          stroke="#0284C7"
          strokeWidth="2.4"
          strokeLinejoin="round"
        />

        {/* 중앙 메탈릭 볼륨 레이스 라인 */}
        <path d="M 104 38 L 104 124 L 108 124 L 108 38 Z" fill="#BAE6FD" opacity="0.4" />

        {/* 유선형 대칭 패널 라인 */}
        <path d="M 94 56 C 96 74 96 102 92 122" stroke="#93C5FD" strokeWidth="1.2" strokeDasharray="3 2" />
        <path d="M 118 56 C 116 74 116 102 120 122" stroke="#93C5FD" strokeWidth="1.2" strokeDasharray="3 2" />

        {/* 대칭 조종석 원형 전망창 (Porthole / Cockpit Window) */}
        <circle cx="106" cy="68" r="14" fill="url(#u-window-sym)" stroke="#0284C7" strokeWidth="2" />
        <circle cx="106" cy="68" r="10" fill="none" stroke="#BAE6FD" strokeWidth="1" opacity="0.6" />
        {/* 전망창 반사광 하이라이트 */}
        <path d="M 98 64 Q 106 60 114 64" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" opacity="0.9" />

        {/* 하단 대칭 엔진 슬러스터 노즐 블록 */}
        <rect x="91" y="124" width="11" height="7" rx="1.5" fill="#334155" stroke="#1E293B" strokeWidth="1.2" />
        <rect x="110" y="124" width="11" height="7" rx="1.5" fill="#334155" stroke="#1E293B" strokeWidth="1.2" />
        <rect x="103" y="124" width="6" height="5" rx="1" fill="#475569" />
        {/* 이온 분사 슬릿 라인 */}
        <line x1="93" y1="131" x2="100" y2="131" stroke="#38BDF8" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="112" y1="131" x2="119" y2="131" stroke="#38BDF8" strokeWidth="1.8" strokeLinecap="round" />

        {/* 글자 'ウ' 오버레이 */}
        <KatakanaCharOverlay char="ウ" fontFamily={fontFamily} x="106" y="118" />
      </svg>
    );
  }

  if (char === 'エ') {
    // エ: 엘리베이터 (철골 H-Beam 구조와 엘리베이터 문 프레임)
    return (
      <svg viewBox="0 0 200 160" className="w-full h-full select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* 엘리베이터 상단 층수 인디케이터 */}
        <rect x="88" y="24" width="36" height="14" rx="3" fill="#1E293B" />
        <text x="106" y="35" textAnchor="middle" fill="#22C55E" fontSize="10" fontWeight="bold">▲ 7F</text>

        {/* 엘리베이터 외곽 프레임 (상단 가로, 하단 가로, 중앙 기둥 = 글자 エ 형태) */}
        <rect x="56" y="44" width="100" height="96" rx="4" fill="#F1F5F9" stroke="#475569" strokeWidth="2.5" />

        {/* 문 틈새 및 손잡이 */}
        <line x1="106" y1="44" x2="106" y2="140" stroke="#94A3B8" strokeWidth="2" strokeDasharray="4 2" />
        <rect x="98" y="86" width="3" height="12" rx="1.5" fill="#64748B" />
        <rect x="111" y="86" width="3" height="12" rx="1.5" fill="#64748B" />

        {/* 위/아래 빔 라인 강조 */}
        <line x1="52" y1="44" x2="160" y2="44" stroke="#334155" strokeWidth="4" strokeLinecap="round" />
        <line x1="52" y1="140" x2="160" y2="140" stroke="#334155" strokeWidth="4" strokeLinecap="round" />

        {/* 글자 'エ' 오버레이 */}
        <KatakanaCharOverlay char="エ" fontFamily={fontFamily} x="106" y="118" />
      </svg>
    );
  }

  if (char === 'オ') {
    // オ: 오토바이 (라이더의 핸들과 뻗은 다리 포즈)
    return (
      <svg viewBox="0 0 200 160" className="w-full h-full select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* 도로 바닥 라인 */}
        <line x1="24" y1="140" x2="176" y2="140" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="8 5" />

        {/* 오토바이 앞뒤 바퀴 */}
        <circle cx="56" cy="120" r="18" fill="#1E293B" stroke="#475569" strokeWidth="2" />
        <circle cx="56" cy="120" r="8" fill="#94A3B8" />
        <circle cx="152" cy="120" r="18" fill="#1E293B" stroke="#475569" strokeWidth="2" />
        <circle cx="152" cy="120" r="8" fill="#94A3B8" />

        {/* 오토바이 프레임 및 핸들 (글자 オ의 가로선과 세로 기둥 일치) */}
        <path d="M 56 120 L 96 74 L 140 74 L 152 120 Z" fill="#FEE2E2" stroke="#DC2626" strokeWidth="2.5" />
        <line x1="126" y1="56" x2="148" y2="74" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" /> {/* 핸들 */}

        {/* 라이더 헬멧 */}
        <circle cx="94" cy="46" r="14" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2" />
        <path d="M 84 48 Q 98 44 104 50" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />

        {/* 스피드 라인 */}
        <line x1="32" y1="88" x2="62" y2="88" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />

        {/* 글자 'オ' 오버레이 */}
        <KatakanaCharOverlay char="オ" fontFamily={fontFamily} x="106" y="118" />
      </svg>
    );
  }

  return null;
}
