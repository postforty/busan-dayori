import React from 'react';
import { KatakanaMnemonicSvgChildProps } from './types';
import KatakanaCharOverlay from './KatakanaCharOverlay';

export default function KatakanaRowNa({ char, fontFamily }: KatakanaMnemonicSvgChildProps) {
  if (char === 'ナ') {
    // ナ: 나이프 (손잡이와 비스듬하게 뻗은 날렵한 나이프 날)
    return (
      <svg viewBox="0 0 200 160" className="w-full h-full select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* 나이프 가로 손잡이/가드 (글자 ナ 1획) */}
        <rect x="52" y="56" width="108" height="12" rx="6" fill="#334155" stroke="#1E293B" strokeWidth="2" />
        <circle cx="68" cy="62" r="2.5" fill="#94A3B8" />

        {/* 비스듬한 나이프 칼날 (글자 ナ 2획 삐침) */}
        <path
          d="M 106 68 C 106 90 98 122 70 142 L 84 142 C 114 122 120 90 120 68 Z"
          fill="#F1F5F9"
          stroke="#64748B"
          strokeWidth="2"
        />
        {/* 칼날 날카로운 엣지 반사광 */}
        <path d="M 88 136 C 106 116 112 90 112 72" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />

        {/* 반짝임 포인트 */}
        <path d="M 148 44 L 150 36 L 152 44 L 160 46 L 152 48 L 150 56 L 148 48 L 140 46 Z" fill="#38BDF8" />

        {/* 글자 'ナ' 오버레이 */}
        <KatakanaCharOverlay char="ナ" fontFamily={fontFamily} x="106" y="118" />
      </svg>
    );
  }

  if (char === 'ニ') {
    // ニ: 니트 (히라가나 に의 오른쪽 두 가로선과 동일 - 따뜻한 니트 스웨터의 두 줄 스트라이프)
    return (
      <svg viewBox="0 0 200 160" className="w-full h-full select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* 니트 스웨터 배경 몸통 */}
        <rect x="42" y="36" width="124" height="106" rx="16" fill="#FEF2F2" stroke="#FECACA" strokeWidth="2" />

        {/* 니트 털실 텍스처 무늬 */}
        <path d="M 46 62 Q 54 58 62 62 Q 70 58 78 62" stroke="#FCA5A5" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M 130 62 Q 138 58 146 62 Q 154 58 162 62" stroke="#FCA5A5" strokeWidth="1.2" strokeLinecap="round" />

        {/* 포근한 두 줄 스트라이프 (글자 ニ의 위아래 가로선과 일치) */}
        <rect x="68" y="58" width="76" height="12" rx="6" fill="#EF4444" stroke="#DC2626" strokeWidth="1.8" />
        <rect x="58" y="98" width="96" height="14" rx="7" fill="#EF4444" stroke="#DC2626" strokeWidth="1.8" />

        {/* 털실 뭉치 & 대바늘 */}
        <circle cx="150" cy="120" r="14" fill="#F87171" stroke="#DC2626" strokeWidth="1.5" />
        <line x1="136" y1="134" x2="164" y2="106" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" />

        {/* 글자 'ニ' 오버레이 */}
        <KatakanaCharOverlay char="ニ" fontFamily={fontFamily} x="106" y="118" />
      </svg>
    );
  }

  if (char === 'ヌ') {
    // ヌ: 누들 (젓가락으로 집어 올린 맛있는 누들 면발의 꺾임)
    return (
      <svg viewBox="0 0 200 160" className="w-full h-full select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* 라멘/국수 볼 그릇 */}
        <path d="M 46 112 C 50 144 156 144 160 112 Z" fill="#F8FAFC" stroke="#64748B" strokeWidth="2" />
        <ellipse cx="103" cy="112" rx="57" ry="12" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1.5" />

        {/* 나무 젓가락 (상단 가로) */}
        <line x1="38" y1="46" x2="164" y2="52" stroke="#B45309" strokeWidth="4.5" strokeLinecap="round" />
        <line x1="38" y1="56" x2="164" y2="60" stroke="#B45309" strokeWidth="4.5" strokeLinecap="round" />

        {/* 젓가락에 걸려 올라간 꼬불꼬불 면발 (글자 ヌ 형태) */}
        <path
          d="M 68 56 L 140 56 L 86 116 L 132 136"
          stroke="#F59E0B"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* 교차 점 (글자 ヌ 2획) */}
        <line x1="84" y1="84" x2="128" y2="124" stroke="#D97706" strokeWidth="5.5" strokeLinecap="round" />

        {/* 모락모락 김 */}
        <path d="M 96 38 Q 92 28 98 22" stroke="#93C5FD" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M 116 38 Q 112 28 118 22" stroke="#93C5FD" strokeWidth="1.8" strokeLinecap="round" />

        {/* 글자 'ヌ' 오버레이 */}
        <KatakanaCharOverlay char="ヌ" fontFamily={fontFamily} x="106" y="118" />
      </svg>
    );
  }

  if (char === 'ネ') {
    // ネ: 넥타이 (단정하게 맨 셔츠 칼라와 넥타이의 매듭)
    return (
      <svg viewBox="0 0 200 160" className="w-full h-full select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* 셔츠 깃 (칼라) */}
        <path d="M 64 36 L 106 58 L 148 36" stroke="#475569" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 64 36 L 88 64 L 106 58 L 124 64 L 148 36 Z" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="1.5" />

        {/* 넥타이 매듭 (글자 ネ 상단 점과 꺾임부) */}
        <polygon points="100,58 112,58 116,72 96,72" fill="#2563EB" stroke="#1D4ED8" strokeWidth="1.5" />

        {/* 넥타이 본체 (글자 ネ의 곧은 세로 기둥과 우측 삐침선) */}
        <path
          d="M 96 72 L 116 72 L 126 130 L 106 146 L 86 130 Z"
          fill="#3B82F6"
          stroke="#1D4ED8"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {/* 사선 스트라이프 패턴 */}
        <line x1="94" y1="88" x2="118" y2="80" stroke="#93C5FD" strokeWidth="2" />
        <line x1="90" y1="108" x2="122" y2="98" stroke="#93C5FD" strokeWidth="2" />

        {/* 글자 'ネ' 오버레이 */}
        <KatakanaCharOverlay char="ネ" fontFamily={fontFamily} x="106" y="118" />
      </svg>
    );
  }

  if (char === 'ノ') {
    // ノ: 노 (보트를 젓는 노의 매끄러운 대각선 슬래시)
    return (
      <svg viewBox="0 0 200 160" className="w-full h-full select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* 잔잔한 호수 물결 */}
        <path d="M 20 128 C 60 124 100 132 140 126 C 165 124 185 128 190 126" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" />
        <path d="M 30 142 C 70 138 110 144 150 140" stroke="#BAE6FD" strokeWidth="1.5" strokeLinecap="round" />

        {/* 나무 노 손잡이와 깃 (글자 ノ의 우상단에서 좌하단으로 뻗는 곡선 삐침) */}
        <path
          d="M 148 32 C 136 62 108 106 62 138 L 52 128 C 96 98 124 56 136 28 Z"
          fill="#D97706"
          stroke="#92400E"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {/* 물을 가르는 노 깃 블레이드 */}
        <ellipse cx="62" cy="132" rx="14" ry="8" transform="rotate(-35 62 132)" fill="#B45309" stroke="#78350F" strokeWidth="1.5" />

        {/* 물 튀김 방울 */}
        <circle cx="48" cy="120" r="2.5" fill="#38BDF8" />
        <circle cx="40" cy="128" r="2" fill="#60A5FA" />

        {/* 글자 'ノ' 오버레이 */}
        <KatakanaCharOverlay char="ノ" fontFamily={fontFamily} x="106" y="118" />
      </svg>
    );
  }

  return null;
}
