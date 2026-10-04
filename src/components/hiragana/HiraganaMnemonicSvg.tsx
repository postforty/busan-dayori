import React from 'react';
import { MNEMONIC_DATA } from './mnemonics/types';
import MnemonicRowA from './mnemonics/MnemonicRowA';
import MnemonicRowKa from './mnemonics/MnemonicRowKa';
import MnemonicRowSa from './mnemonics/MnemonicRowSa';
import MnemonicRowTa from './mnemonics/MnemonicRowTa';
import MnemonicRowNa from './mnemonics/MnemonicRowNa';
import MnemonicRowHa from './mnemonics/MnemonicRowHa';
import MnemonicRowMa from './mnemonics/MnemonicRowMa';
import MnemonicRowYa from './mnemonics/MnemonicRowYa';
import MnemonicRowRa from './mnemonics/MnemonicRowRa';
import MnemonicRowWa from './mnemonics/MnemonicRowWa';

interface HiraganaMnemonicSvgProps {
  char: string;
  koreanSound?: string;
  romaji?: string;
  fontStyle?: 'sans' | 'serif';
  className?: string;
}

/**
 * 히라가나 50음도 연상 기억법(Visual Mnemonic) SVG 그림 카드 메인 컴포넌트
 * - 행 단위로 모듈화된 서브 SVG 컴포넌트를 호출
 * - 통일된 카드 프레임과 직관적인 단어 강조 라벨 제공
 */
export default function HiraganaMnemonicSvg({
  char,
  fontStyle = 'sans',
  className = ''
}: HiraganaMnemonicSvgProps) {
  const item = MNEMONIC_DATA[char];
  if (!item) return null;

  const fontFamily =
    fontStyle === 'serif'
      ? "'Noto Serif JP', 'Yu Mincho', serif"
      : "'Klee One', 'Noto Sans JP', sans-serif";

  // 행별 컴포넌트 렌더링 함수
  const renderSvgContent = () => {
    // あ행
    if (['あ', 'い', 'う', 'え', 'お'].includes(char)) {
      return <MnemonicRowA char={char} fontFamily={fontFamily} />;
    }
    // か행
    if (['か', 'き', 'く', 'け', 'こ'].includes(char)) {
      return <MnemonicRowKa char={char} fontFamily={fontFamily} />;
    }
    // さ행
    if (['さ', 'し', 'す', 'せ', 'そ'].includes(char)) {
      return <MnemonicRowSa char={char} fontFamily={fontFamily} />;
    }
    // た행
    if (['た', 'ち', 'つ', 'て', 'と'].includes(char)) {
      return <MnemonicRowTa char={char} fontFamily={fontFamily} />;
    }
    // な행
    if (['な', 'に', 'ぬ', 'ね', 'の'].includes(char)) {
      return <MnemonicRowNa char={char} fontFamily={fontFamily} />;
    }
    // は행
    if (['は', 'ひ', 'ふ', 'へ', 'ほ'].includes(char)) {
      return <MnemonicRowHa char={char} fontFamily={fontFamily} />;
    }
    // ま행
    if (['ま', 'み', 'む', 'め', 'も'].includes(char)) {
      return <MnemonicRowMa char={char} fontFamily={fontFamily} />;
    }
    // や행
    if (['や', 'ゆ', 'よ'].includes(char)) {
      return <MnemonicRowYa char={char} fontFamily={fontFamily} />;
    }
    // ら행
    if (['ら', 'り', 'る', 'れ', 'ろ'].includes(char)) {
      return <MnemonicRowRa char={char} fontFamily={fontFamily} />;
    }
    // わ·ん
    if (['わ', 'を', 'ん'].includes(char)) {
      return <MnemonicRowWa char={char} fontFamily={fontFamily} />;
    }
    return null;
  };

  const svgContent = renderSvgContent();
  if (!svgContent) return null;

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      {/* 미니멀 연상 일러스트 카드 */}
      <div className="relative w-56 h-40 sm:w-64 sm:h-44 rounded-2xl bg-white border border-stone-200/90 shadow-2xs flex items-center justify-center overflow-hidden">
        {svgContent}
      </div>

      {/* 미니멀 라벨: 연상 단어 중 발음 음절에만 테마 포인트 컬러 적용 */}
      <div className="mt-2.5 flex items-center justify-center">
        <span className="text-base font-bold tracking-wider">
          {item.word.split('').map((letter, idx) => (
            <span
              key={idx}
              className={
                idx === item.highlightIndex
                  ? 'text-[#E07A5F] font-black text-lg'
                  : 'text-stone-500 font-semibold'
              }
            >
              {letter}
            </span>
          ))}
        </span>
      </div>
    </div>
  );
}
