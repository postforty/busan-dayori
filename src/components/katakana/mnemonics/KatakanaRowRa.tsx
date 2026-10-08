import React from 'react';
import { KatakanaMnemonicSvgChildProps } from './types';
import KatakanaCharOverlay from './KatakanaCharOverlay';

export default function KatakanaRowRa({ char, fontFamily }: KatakanaMnemonicSvgChildProps) {
  if (char === 'ラ') {
    // ラ: 라디오 (휴대용 레트로 라디오 본체와 꺾여 뻗은 금속 안테나)
    return (
      <svg viewBox="0 0 200 160" className="w-full h-full select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* 라디오 상단 꺾인 안테나 (글자 ラ 1획 및 상단 프레임) */}
        <line x1="126" y1="24" x2="80" y2="52" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
        <circle cx="126" cy="24" r="3.5" fill="#EF4444" />
        {/* 안테나 전파 이펙트 */}
        <path d="M 134 16 C 142 22 142 28 134 34" stroke="#38BDF8" strokeWidth="1.8" fill="none" strokeLinecap="round" />

        {/* 라디오 본체 바디 (글자 ラ의 하단 꺾임과 곡선 실루엣) */}
        <rect x="52" y="58" width="108" height="78" rx="14" fill="#F8FAFC" stroke="#475569" strokeWidth="2.5" />

        {/* 대형 스피커 그릴 원 */}
        <circle cx="86" cy="98" r="24" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="2" />
        <circle cx="86" cy="98" r="14" stroke="#CBD5E1" strokeWidth="1.5" />
        <circle cx="86" cy="98" r="4" fill="#64748B" />

        {/* 주파수 튜닝 다이얼 창 */}
        <rect x="122" y="74" width="28" height="14" rx="3" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1.2" />
        <circle cx="136" cy="108" r="8" fill="#64748B" />

        {/* 글자 'ラ' 오버레이 */}
        <KatakanaCharOverlay char="ラ" fontFamily={fontFamily} x="106" y="118" />
      </svg>
    );
  }

  if (char === 'リ') {
    // リ: 리본 (★ 히라가나 り와 95% 동일한 형태! 살랑살랑 내려오는 예쁜 리본 도안 100% 재활용)
    return (
      <svg viewBox="0 0 200 160" className="w-full h-full select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* 중앙 리본 매듭 */}
        <circle cx="106" cy="46" r="10" fill="#F43F5E" stroke="#BE123C" strokeWidth="2" />
        <ellipse cx="103" cy="43" rx="3.5" ry="2" fill="#FFFFFF" opacity="0.8" />

        {/* 양옆 풍성한 리본 날개 루프 */}
        <path d="M 98 44 C 64 24 50 56 96 52 Z" fill="#FDA4AF" stroke="#E11D48" strokeWidth="1.8" />
        <path d="M 114 44 C 148 24 162 56 116 52 Z" fill="#FDA4AF" stroke="#E11D48" strokeWidth="1.8" />

        {/* 아래로 길게 내려오는 두 갈래 리본 꼬리 (글자 リ의 좌우 두 세로획과 1:1 일치!) */}
        {/* 왼쪽 짧은 리본 꼬리 (글자 1획) */}
        <path
          d="M 88 52 C 86 78 84 94 76 108 L 86 106 C 94 94 96 76 96 52 Z"
          fill="#FB7185"
          stroke="#E11D48"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        {/* 오른쪽 길게 늘어진 리본 꼬리 (글자 2획) */}
        <path
          d="M 118 52 C 122 78 126 112 136 138 L 146 136 C 136 108 130 76 126 52 Z"
          fill="#FB7185"
          stroke="#E11D48"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />

        {/* 반짝임 별빛 */}
        <path d="M 152 40 L 154 34 L 156 40 L 162 42 L 156 44 L 154 50 L 152 44 L 146 42 Z" fill="#FDE047" />

        {/* 글자 'リ' 오버레이 */}
        <KatakanaCharOverlay char="リ" fontFamily={fontFamily} x="106" y="118" />
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
