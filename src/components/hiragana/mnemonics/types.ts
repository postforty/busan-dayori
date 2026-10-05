export interface MnemonicItem {
  char: string;
  word: string;
  highlightIndex: number;
}

export interface MnemonicSvgChildProps {
  char: string;
  fontFamily: string;
}

export const MNEMONIC_DATA: Record<string, MnemonicItem> = {
  // あ행
  あ: { char: 'あ', word: '아기', highlightIndex: 0 },
  い: { char: 'い', word: '이빨', highlightIndex: 0 },
  う: { char: 'う', word: '우산', highlightIndex: 0 },
  え: { char: 'え', word: '에어로빅', highlightIndex: 0 },
  お: { char: 'お', word: '오리', highlightIndex: 0 },

  // か행
  か: { char: 'か', word: '카메라', highlightIndex: 0 },
  き: { char: 'き', word: '키 (열쇠)', highlightIndex: 0 },
  く: { char: 'く', word: '쿠키', highlightIndex: 0 },
  け: { char: 'け', word: '케이크', highlightIndex: 0 },
  こ: { char: 'こ', word: '코끼리', highlightIndex: 0 },

  // さ행
  さ: { char: 'さ', word: '사과', highlightIndex: 0 },
  し: { char: 'し', word: '낚시', highlightIndex: 1 },
  す: { char: 'す', word: '스프링', highlightIndex: 0 },
  せ: { char: 'せ', word: '세면대', highlightIndex: 0 },
  そ: { char: 'そ', word: '소라', highlightIndex: 0 },

  // た행
  た: { char: 'た', word: '타조', highlightIndex: 0 },
  ち: { char: 'ち', word: '치약', highlightIndex: 0 },
  つ: { char: 'つ', word: '부츠', highlightIndex: 1 },
  て: { char: 'て', word: '테이프', highlightIndex: 0 },
  と: { char: 'と', word: '토끼', highlightIndex: 0 },

  // な행
  な: { char: 'な', word: '나비', highlightIndex: 0 },
  に: { char: 'に', word: '니트', highlightIndex: 0 },
  ぬ: { char: 'ぬ', word: '누에', highlightIndex: 0 },
  ね: { char: 'ね', word: '그네', highlightIndex: 1 },
  の: { char: 'の', word: '노래', highlightIndex: 0 },

  // は행
  は: { char: 'は', word: '하마', highlightIndex: 0 },
  ひ: { char: 'ひ', word: '히죽', highlightIndex: 0 },
  ふ: { char: 'ふ', word: '후라이팬', highlightIndex: 0 },
  へ: { char: 'へ', word: '헤엄', highlightIndex: 0 },
  ほ: { char: 'ほ', word: '호랑이', highlightIndex: 0 },

  // ま행
  ま: { char: 'ま', word: '마술', highlightIndex: 0 },
  み: { char: 'み', word: '미로', highlightIndex: 0 },
  む: { char: 'む', word: '무용', highlightIndex: 0 },
  め: { char: 'め', word: '메기', highlightIndex: 0 },
  も: { char: 'も', word: '모기', highlightIndex: 0 },

  // や행
  や: { char: 'や', word: '야구', highlightIndex: 0 },
  ゆ: { char: 'ゆ', word: '유도', highlightIndex: 0 },
  よ: { char: 'よ', word: '요트', highlightIndex: 0 },

  // ら행
  ら: { char: 'ら', word: '라켓', highlightIndex: 0 },
  り: { char: 'り', word: '리본', highlightIndex: 0 },
  る: { char: 'る', word: '캥거루', highlightIndex: 2 },
  れ: { char: 'れ', word: '애벌레', highlightIndex: 2 },
  ろ: { char: 'ろ', word: '로켓', highlightIndex: 0 },

  // わ·ん
  わ: { char: 'わ', word: '와~', highlightIndex: 0 },
  を: { char: 'を', word: '오징어', highlightIndex: 0 },
  ん: { char: 'ん', word: '응원', highlightIndex: 0 }
};
