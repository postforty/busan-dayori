export interface MnemonicItem {
  char: string;
  word: string;
  highlightIndex: number;
  romaji: string;
}

export interface MnemonicSvgChildProps {
  char: string;
  fontFamily: string;
}

export const MNEMONIC_DATA: Record<string, MnemonicItem> = {
  // あ행
  あ: { char: 'あ', word: '아기', highlightIndex: 0, romaji: 'a' },
  い: { char: 'い', word: '이빨', highlightIndex: 0, romaji: 'i' },
  う: { char: 'う', word: '우산', highlightIndex: 0, romaji: 'u' },
  え: { char: 'え', word: '에어로빅', highlightIndex: 0, romaji: 'e' },
  お: { char: 'お', word: '오리', highlightIndex: 0, romaji: 'o' },

  // か행
  か: { char: 'か', word: '카메라', highlightIndex: 0, romaji: 'ka' },
  き: { char: '키', word: '키 (열쇠)', highlightIndex: 0, romaji: 'ki' },
  く: { char: 'く', word: '쿠키', highlightIndex: 0, romaji: 'ku' },
  け: { char: 'け', word: '케이크', highlightIndex: 0, romaji: 'ke' },
  こ: { char: 'こ', word: '코끼리', highlightIndex: 0, romaji: 'ko' },

  // さ행
  さ: { char: 'さ', word: '사과', highlightIndex: 0, romaji: 'sa' },
  し: { char: 'し', word: '낚시', highlightIndex: 1, romaji: 'shi' },
  す: { char: 'す', word: '스프링', highlightIndex: 0, romaji: 'su' },
  せ: { char: 'せ', word: '세면대', highlightIndex: 0, romaji: 'se' },
  そ: { char: 'そ', word: '소라', highlightIndex: 0, romaji: 'so' },

  // た행
  た: { char: 'た', word: '타조', highlightIndex: 0, romaji: 'ta' },
  ち: { char: 'ち', word: '5·치ㄹ', highlightIndex: 2, romaji: 'chi' },
  つ: { char: 'つ', word: '부츠', highlightIndex: 1, romaji: 'tsu' },
  て: { char: 'て', word: '테이프', highlightIndex: 0, romaji: 'te' },
  と: { char: 'と', word: '토끼', highlightIndex: 0, romaji: 'to' },

  // な행
  な: { char: 'な', word: '나비', highlightIndex: 0, romaji: 'na' },
  に: { char: 'に', word: '니트', highlightIndex: 0, romaji: 'ni' },
  ぬ: { char: 'ぬ', word: '누에', highlightIndex: 0, romaji: 'nu' },
  ね: { char: 'ね', word: '그네', highlightIndex: 1, romaji: 'ne' },
  の: { char: 'の', word: '노래', highlightIndex: 0, romaji: 'no' },

  // は행
  は: { char: 'は', word: '하마', highlightIndex: 0, romaji: 'ha' },
  ひ: { char: 'ひ', word: '히죽', highlightIndex: 0, romaji: 'hi' },
  ふ: { char: 'ふ', word: '후라이팬', highlightIndex: 0, romaji: 'fu' },
  へ: { char: 'へ', word: '헤엄', highlightIndex: 0, romaji: 'he' },
  ほ: { char: 'ほ', word: '호랑이', highlightIndex: 0, romaji: 'ho' },

  // ま행
  ま: { char: 'ま', word: '마술', highlightIndex: 0, romaji: 'ma' },
  み: { char: 'み', word: '미로', highlightIndex: 0, romaji: 'mi' },
  む: { char: 'む', word: '무용', highlightIndex: 0, romaji: 'mu' },
  め: { char: 'め', word: '메기', highlightIndex: 0, romaji: 'me' },
  も: { char: 'も', word: '모기', highlightIndex: 0, romaji: 'mo' },

  // や행
  や: { char: 'や', word: '야구', highlightIndex: 0, romaji: 'ya' },
  ゆ: { char: 'ゆ', word: '유도', highlightIndex: 0, romaji: 'yu' },
  よ: { char: 'よ', word: '요트', highlightIndex: 0, romaji: 'yo' },

  // ら행
  ら: { char: 'ら', word: '라켓', highlightIndex: 0, romaji: 'ra' },
  り: { char: 'り', word: '리본', highlightIndex: 0, romaji: 'ri' },
  る: { char: 'る', word: '캥거루', highlightIndex: 2, romaji: 'ru' },
  れ: { char: 'れ', word: '애벌레', highlightIndex: 2, romaji: 're' },
  ろ: { char: 'ろ', word: '로켓', highlightIndex: 0, romaji: 'ro' },

  // わ·ん
  わ: { char: 'わ', word: '와~', highlightIndex: 0, romaji: 'wa' },
  を: { char: 'を', word: '오징어', highlightIndex: 0, romaji: 'wo' },
  ん: { char: 'ん', word: '응원', highlightIndex: 0, romaji: 'n' }
};
