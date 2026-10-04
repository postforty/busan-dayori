import React from 'react';

interface MnemonicCharOverlayProps {
  char: string;
  fontFamily: string;
  x?: string | number;
  y?: string | number;
  fontSize?: string | number;
}

/**
 * 히라가나 획과 연상 일러스트의 조화를 위한 공통 글자 오버레이 컴포넌트
 * - 흰색 외곽선(paintOrder: 'stroke fill')으로 일러스트 배경 위에서도 100% 가독성을 보장
 */
export default function MnemonicCharOverlay({
  char,
  fontFamily,
  x = '110',
  y = '120',
  fontSize = '114'
}: MnemonicCharOverlayProps) {
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      fill="#1C1917"
      fontSize={fontSize}
      fontWeight="bold"
      style={{
        fontFamily,
        paintOrder: 'stroke fill',
        stroke: '#FFFFFF',
        strokeWidth: '6px',
        strokeLinejoin: 'round'
      }}
    >
      {char}
    </text>
  );
}
