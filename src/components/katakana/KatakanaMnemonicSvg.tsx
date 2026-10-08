import React from 'react';
import { KATAKANA_MNEMONIC_DATA } from './mnemonics/types';
import KatakanaRowA from './mnemonics/KatakanaRowA';
import KatakanaRowKa from './mnemonics/KatakanaRowKa';
import KatakanaRowSa from './mnemonics/KatakanaRowSa';
import KatakanaRowTa from './mnemonics/KatakanaRowTa';
import KatakanaRowNa from './mnemonics/KatakanaRowNa';
import KatakanaRowHa from './mnemonics/KatakanaRowHa';
import KatakanaRowMa from './mnemonics/KatakanaRowMa';
import KatakanaRowYa from './mnemonics/KatakanaRowYa';
import KatakanaRowRa from './mnemonics/KatakanaRowRa';
import KatakanaRowWa from './mnemonics/KatakanaRowWa';

interface KatakanaMnemonicSvgProps {
  char: string;
  koreanSound?: string;
  romaji?: string;
  fontStyle?: 'sans' | 'serif';
  className?: string;
}

/**
 * 가타카나 46자 전용 연상 기억법(Visual Mnemonic) SVG 그림 카드 컴포넌트
 * - 가타카나 고유의 직선적 외형과 획 방향(시/츠, 소/응)을 시각화
 * - 히라가나와 형태가 일치/유사한 글자는 모티브를 효과적으로 재사용하여 연계 학습 촉진
 */
export default function KatakanaMnemonicSvg({
  char,
  romaji,
  fontStyle = 'sans',
  className = ''
}: KatakanaMnemonicSvgProps) {
  const item = KATAKANA_MNEMONIC_DATA[char];
  if (!item) return null;

  const displayRomaji = romaji || item.romaji;

  const fontFamily =
    fontStyle === 'serif'
      ? "'Noto Serif JP', 'Yu Mincho', serif"
      : "'Klee One', 'Noto Sans JP', sans-serif";

  // 행별 컴포넌트 분기
  const renderSvgContent = () => {
    // ア행
    if (['ア', 'イ', 'ウ', 'エ', 'オ'].includes(char)) {
      return <KatakanaRowA char={char} fontFamily={fontFamily} />;
    }
    // カ행
    if (['カ', 'キ', 'ク', 'ケ', 'コ'].includes(char)) {
      return <KatakanaRowKa char={char} fontFamily={fontFamily} />;
    }
    // サ행
    if (['サ', 'シ', 'ス', 'セ', 'ソ'].includes(char)) {
      return <KatakanaRowSa char={char} fontFamily={fontFamily} />;
    }
    // タ행
    if (['タ', 'チ', 'ツ', 'テ', 'ト'].includes(char)) {
      return <KatakanaRowTa char={char} fontFamily={fontFamily} />;
    }
    // ナ행
    if (['ナ', 'ニ', 'ヌ', 'ネ', 'ノ'].includes(char)) {
      return <KatakanaRowNa char={char} fontFamily={fontFamily} />;
    }
    // ハ행
    if (['ハ', 'ヒ', 'フ', 'ヘ', 'ホ'].includes(char)) {
      return <KatakanaRowHa char={char} fontFamily={fontFamily} />;
    }
    // マ행
    if (['マ', 'ミ', 'ム', 'メ', 'モ'].includes(char)) {
      return <KatakanaRowMa char={char} fontFamily={fontFamily} />;
    }
    // ヤ행
    if (['ヤ', 'ユ', 'ヨ'].includes(char)) {
      return <KatakanaRowYa char={char} fontFamily={fontFamily} />;
    }
    // ラ행
    if (['ラ', 'リ', 'ル', 'レ', 'ロ'].includes(char)) {
      return <KatakanaRowRa char={char} fontFamily={fontFamily} />;
    }
    // ワ·ヲ·ン
    if (['ワ', 'ヲ', 'ン'].includes(char)) {
      return <KatakanaRowWa char={char} fontFamily={fontFamily} />;
    }
    return null;
  };

  const svgContent = renderSvgContent();
  if (!svgContent) return null;

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      {/* 미니멀 연상 일러스트 카드 */}
      <div className="relative w-56 h-40 sm:w-64 sm:h-44 rounded-2xl bg-white border border-stone-200/90 shadow-2xs flex items-center justify-center overflow-hidden pointer-events-none select-none">
        {svgContent}
      </div>

      {/* 미니멀 라벨: 연상 단어 중 발음 음절에만 가타카나 테마 컬러 적용 + 로마자 표기 */}
      <div className="mt-2.5 flex items-center justify-center gap-1.5">
        <span className="text-base font-bold tracking-wider">
          {item.word.split('').map((letter, idx) => (
            <span
              key={idx}
              className={
                idx === item.highlightIndex
                  ? 'text-[#3D5A80] font-black text-lg'
                  : 'text-stone-500 font-semibold'
              }
            >
              {letter}
            </span>
          ))}
        </span>
        {displayRomaji && (
          <span className="text-sm font-semibold text-stone-400">
            ({displayRomaji})
          </span>
        )}
      </div>
    </div>
  );
}
