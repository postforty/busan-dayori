import React from 'react';

interface HangulIconProps {
  className?: string;
}

/**
 * 한글의 첫 음절이자 배움의 시작을 상징하는 '가' 모던 블록 SVG 아이콘
 * Lucide React 규격(viewBox 0 0 24 24, strokeWidth 2, stroke currentColor)과 완벽히 호환됩니다.
 */
export default function HangulIcon({ className = 'w-5 h-5' }: HangulIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* 라운드 스퀘어 프레임 타일 */}
      <rect x="3" y="3" width="18" height="18" rx="4.5" />
      {/* 한글 자음 ㄱ */}
      <path d="M7.5 9h5v5.5" />
      {/* 한글 모음 ㅏ */}
      <path d="M16 7.5v9" />
      <path d="M16 12h2.5" />
    </svg>
  );
}
