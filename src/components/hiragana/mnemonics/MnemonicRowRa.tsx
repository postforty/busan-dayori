import { MnemonicSvgChildProps } from './types';
import MnemonicCharOverlay from './MnemonicCharOverlay';

export default function MnemonicRowRa({ char, fontFamily }: MnemonicSvgChildProps) {
  if (char === 'ら') {
    // ら: 라디오 (상단 접이식 안테나 손잡이 점과 사각 본체의 둥근 곡선)
    return (
      <svg
        viewBox="0 0 200 160"
        className="w-full h-full select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 라디오 상단 접이식 안테나 (글자 ら 상단 점/삐침 획과 매칭) */}
        <path
          d="M 88 42 L 108 26"
          stroke="#78716C"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle cx="109" cy="25" r="3" fill="#38BDF8" />

        {/* 라디오 본체 사각 프레임 실루엣 */}
        <rect
          x="62"
          y="56"
          width="88"
          height="74"
          rx="12"
          fill="#FAFAF9"
          stroke="#D6D3D1"
          strokeWidth="1.8"
        />

        {/* 라디오 둥근 스피커 그릴 */}
        <circle cx="106" cy="95" r="22" fill="#FFFFFF" stroke="#A8A29E" strokeWidth="1.6" />
        <circle cx="106" cy="95" r="14" stroke="#D6D3D1" strokeWidth="1.2" strokeDasharray="3 3" />
        <circle cx="106" cy="95" r="4" fill="#78716C" />

        {/* 주파수 튜닝 다이얼 (포인트 연파랑) */}
        <ellipse cx="80" cy="72" rx="6" ry="6" fill="#E0F2FE" stroke="#38BDF8" strokeWidth="1.4" />
        <line x1="80" y1="68" x2="80" y2="76" stroke="#0284C7" strokeWidth="1.5" strokeLinecap="round" />

        {/* 라디오 전파 파동선 */}
        <path
          d="M 124 24 Q 134 30 128 38 M 134 18 Q 148 26 138 42"
          stroke="#38BDF8"
          strokeWidth="1.6"
          strokeLinecap="round"
        />

        {/* 글자 'ら' 오버레이 */}
        <MnemonicCharOverlay char="ら" fontFamily={fontFamily} x="108" y="118" />
      </svg>
    );
  }

  if (char === 'り') {
    // り: 리본 (선물 상자에 묶여 아래로 살랑살랑 늘어뜨려진 두 가닥 리본 끈)
    return (
      <svg
        viewBox="0 0 200 160"
        className="w-full h-full select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 상단 선물 상자 테두리 */}
        <path
          d="M 46 44 L 154 44"
          stroke="#E7E5E4"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* 상단 핑크 리본 나비 매듭 (포인트 컬러) */}
        <g id="ribbon-bow">
          <circle cx="100" cy="44" r="5" fill="#F472B6" />
          <path
            d="M 100 44 C 84 34 82 48 98 46 Z"
            fill="#FCE7F3"
            stroke="#F472B6"
            strokeWidth="1.4"
          />
          <path
            d="M 100 44 C 116 34 118 48 102 46 Z"
            fill="#FCE7F3"
            stroke="#F472B6"
            strokeWidth="1.4"
          />
        </g>

        {/* 왼쪽 짧은 리본 가닥 궤적 (글자 り 왼쪽 획 매칭) */}
        <path
          d="M 80 50 L 80 84 C 80 92 84 94 88 94"
          stroke="#D6D3D1"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* 오른쪽 긴 리본 가닥 궤적 (글자 り 오른쪽 유려한 곡선 매칭) */}
        <path
          d="M 124 48 L 124 104 C 124 128 108 132 102 128"
          stroke="#D6D3D1"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* 흩날리는 반짝이 포인트 */}
        <path
          d="M 64 68 L 66 62 L 68 68 L 74 70 L 68 72 L 66 78 L 64 72 L 58 70 Z"
          fill="#FDE047"
        />

        {/* 글자 'り' 오버레이 */}
        <MnemonicCharOverlay char="り" fontFamily={fontFamily} x="108" y="118" />
      </svg>
    );
  }

  if (char === 'る') {
    // る: 캥거루 (등뼈와 배주머니 속에 쏙 들어간 아기의 둥근 루프)
    // ⚠️ ろ(롤러스케이트: 루프 없음)와 결정적으로 구별되는 배주머니 속 둥근 아기 루프 고리 강조!
    return (
      <svg
        viewBox="0 0 200 160"
        className="w-full h-full select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 캥거루 귀 & 머리 실루엣 (상단 꺾임 획) */}
        <path
          d="M 76 46 L 132 46 C 114 62 82 82 82 98 C 82 124 136 126 136 104"
          stroke="#D6D3D1"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 캥거루 쫑긋 귀 2개 */}
        <path d="M 130 46 L 138 28 L 144 44" fill="#FEF3C7" stroke="#78716C" strokeWidth="1.4" />
        <path d="M 134 46 L 142 32" stroke="#D97706" strokeWidth="1.2" />

        {/* 캥거루 눈 */}
        <circle cx="128" cy="52" r="1.8" fill="#1C1917" />

        {/* る의 핵심: 배주머니 속에 쏙 들어간 귀여운 아기 캥거루 (둥근 루프 고리, 포인트 베이지) */}
        <circle
          cx="134"
          cy="104"
          r="10"
          fill="#FEF3C7"
          stroke="#D97706"
          strokeWidth="1.8"
        />
        {/* 아기 캥거루 앙증맞은 귀 & 눈 */}
        <path d="M 136 96 L 140 88 M 140 96 L 144 90" stroke="#D97706" strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="132" cy="103" r="1.3" fill="#1C1917" />
        <circle cx="138" cy="103" r="1.3" fill="#1C1917" />

        {/* 튼튼한 캥거루 꼬리 받침 */}
        <path
          d="M 78 116 C 62 118 52 130 48 136"
          stroke="#78716C"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* 글자 'る' 오버레이 */}
        <MnemonicCharOverlay char="る" fontFamily={fontFamily} x="108" y="118" />
      </svg>
    );
  }

  if (char === 'れ') {
    // れ: 애벌레 (나뭇잎 위를 꿈틀꿈틀 기어가는 애벌레의 마디마디 굴곡선)
    return (
      <svg
        viewBox="0 0 200 160"
        className="w-full h-full select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 애벌레가 기어가는 나뭇가지 수직 기둥 (글자 れ 왼쪽 수직선 매칭) */}
        <path
          d="M 68 34 L 68 128"
          stroke="#78716C"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* 싱싱한 연두색 뽕잎 실루엣 */}
        <path
          d="M 70 82 C 114 62 152 74 164 102 C 146 114 108 118 70 108"
          fill="#DCFCE7"
          stroke="#86EFAC"
          strokeWidth="1.5"
        />

        {/* 꿈틀거리는 애벌레 몸통 마디들 (글자 れ 오른쪽 굴곡과 삐침) */}
        <circle cx="94" cy="74" r="10" fill="#FFFFFF" stroke="#78716C" strokeWidth="1.5" />
        <circle cx="112" cy="80" r="10" fill="#FFFFFF" stroke="#78716C" strokeWidth="1.5" />
        <circle cx="130" cy="88" r="9" fill="#FFFFFF" stroke="#78716C" strokeWidth="1.5" />

        {/* 애벌레 얼굴, 더듬이 & 발그레한 볼 (포인트 연홍색) */}
        <circle cx="91" cy="72" r="1.5" fill="#1C1917" />
        <ellipse cx="92" cy="77" rx="2.5" ry="1.8" fill="#FDA4AF" />
        <path d="M 88 66 Q 84 56 78 58" stroke="#78716C" strokeWidth="1.3" strokeLinecap="round" />

        {/* 나뭇잎 갉아먹은 귀여운 홈 */}
        <circle cx="158" cy="94" r="5" fill="#FFFFFF" />

        {/* 글자 'れ' 오버레이 */}
        <MnemonicCharOverlay char="れ" fontFamily={fontFamily} x="108" y="118" />
      </svg>
    );
  }

  if (char === 'ろ') {
    // ろ: 롤러스케이트 (바퀴 2개가 달린 차체 프레임, 고리 없이 시원한 꺾임)
    // ⚠️ る(캥거루: 고리 있음)와 확실히 다르게 하단에 루프가 전혀 없는 깔끔한 마감선 강조!
    return (
      <svg
        viewBox="0 0 200 160"
        className="w-full h-full select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 롤러스케이트 부츠 외곽선 (글자 ろ와 동일한 상단 꺾임 궤적) */}
        <path
          d="M 76 46 L 132 46 C 114 62 82 82 82 98 C 82 122 138 124 146 112"
          stroke="#D6D3D1"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 스케이트 하단 플레이트 바닥선 */}
        <line x1="72" y1="116" x2="148" y2="116" stroke="#78716C" strokeWidth="3" strokeLinecap="round" />

        {/* 롤러스케이트 앞뒤 바퀴 2개 (포인트 스카이블루 휠) */}
        {/* 앞바퀴 */}
        <circle cx="88" cy="130" r="10" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2" />
        <circle cx="88" cy="130" r="3.5" fill="#38BDF8" />

        {/* 뒷바퀴 */}
        <circle cx="132" cy="130" r="10" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2" />
        <circle cx="132" cy="130" r="3.5" fill="#38BDF8" />

        {/* 스케이트 쌩쌩 질주 속도선 */}
        <line x1="50" y1="126" x2="68" y2="126" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" />
        <line x1="56" y1="134" x2="72" y2="134" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" />

        {/* 글자 'ろ' 오버레이 */}
        <MnemonicCharOverlay char="ろ" fontFamily={fontFamily} x="108" y="118" />
      </svg>
    );
  }

  return null;
}
