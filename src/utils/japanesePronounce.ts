/**
 * 일본어 발음(후리가나, 히라가나, 가타카나)을 한국어 독음으로 변환해주는 유틸리티
 */

// 1. 기본 가나 -> 한글 음소 맵 (요음 우선 매칭을 위해 복합자 포함)
const KANA_TO_HANGUL: Record<string, string> = {
  // 요음 / 특수 가나 (2글자 조합 우선)
  'きゃ': '캬', 'きゅ': '큐', 'きょ': '쿄',
  'しゃ': '샤', 'しゅ': '슈', 'しょ': '쇼',
  'ちゃ': '챠', 'ちゅ': '츄', 'ちょ': '쵸',
  'にゃ': '냐', 'にゅ': '뉴', 'にょ': '뇨',
  'ひゃ': '햐', 'ひゅ': '휴', 'ひょ': '효',
  'みゃ': '먀', 'みゅ': '뮤', 'みょ': '묘',
  'りゃ': '랴', 'りゅ': '류', 'りょ': '료',
  'ぎゃ': '갸', 'ぎゅ': '규', 'ぎょ': '교',
  'じゃ': '쟈', 'じゅ': '쥬', 'じょ': '죠',
  'びゃ': '뱌', 'びゅ': '뷰', 'びょ': '뵤',
  'ぴゃ': '퍄', 'ぴゅ': '퓨', 'ぴょ': '표',
  'ふぁ': '파', 'ふぃ': '피', 'ふぇ': '페', 'ふぉ': '포',
  'てぃ': '티', 'でぃ': '디',
  'うぃ': '위', 'うぇ': '웨', 'うぉ': '워',

  // 가타카나 요음 / 특수 가나
  'キャ': '캬', 'キュ': '큐', 'キョ': '쿄',
  'シャ': '샤', 'シュ': '슈', 'ショ': '쇼',
  'チャ': '챠', 'チュ': '츄', 'チョ': '쵸',
  'ニャ': '냐', 'ニュ': '뉴', 'ニョ': '뇨',
  'ヒャ': '햐', 'ヒュ': '휴', 'ヒョ': '효',
  'ミャ': '먀', 'ミュ': '뮤', 'ミョ': '묘',
  'リャ': '랴', 'リュ': '류', 'リョ': '료',
  'ギャ': '갸', 'ギュ': '규', 'ギョ': '교',
  'ジャ': '쟈', 'ジュ': '쥬', 'ジョ': '죠',
  'ビャ': '뱌', 'ビュ': '뷰', 'ビョ': '뵤',
  'ピャ': '퍄', 'ピュ': '퓨', 'ピョ': '표',
  'ファ': '파', 'フィ': '피', 'フェ': '페', 'フォ': '포',
  'ティ': '티', 'ディ': '디',
  'ウィ': '위', 'ウェ': '웨', 'ウォ': '워',
  'チェ': '체', 'シェ': '셰', 'ジェ': '제',

  // 기본 히라가나 청음/탁음/반탁음
  'あ': '아', 'い': '이', 'う': '우', 'え': '에', 'お': '오',
  'か': '카', 'き': '키', 'く': '쿠', 'け': '케', 'こ': '코',
  'さ': '사', 'し': '시', 'す': '스', 'せ': '세', 'そ': '소',
  'た': '타', 'ち': '치', 'つ': '츠', 'て': '테', 'と': '토',
  'な': '나', 'に': '니', 'ぬ': '누', 'ね': '네', 'の': '노',
  'は': '하', 'ひ': '히', 'ふ': '후', 'へ': '헤', 'ほ': '호',
  'ま': '마', 'み': '미', 'む': '무', 'め': '메', 'も': '모',
  'や': '야', 'ゆ': '유', 'よ': '요',
  'ら': '라', 'り': '리', 'る': '루', 'れ': '레', 'ろ': '로',
  'わ': '와', 'を': '오', 'ん': 'ㄴ',

  'が': '가', 'ぎ': '기', 'ぐ': '구', 'げ': '게', 'ご': '고',
  'ざ': '자', 'じ': '지', 'ず': '즈', 'ぜ': '제', 'ぞ': '조',
  'だ': '다', 'ぢ': '지', 'づ': '즈', 'で': '데', 'ど': '도',
  'ば': '바', '비': '비', 'ぶ': '부', 'べ': '베', 'ぼ': '보',
  'ぱ': '파', 'ぴ': '피', 'ぷ': '푸', 'ぺ': '페', 'ぽ': '포',

  // 기본 가타카나
  'ア': '아', 'イ': '이', 'ウ': '우', 'エ': '에', 'オ': '오',
  'カ': '카', 'キ': '키', 'ク': '쿠', 'ケ': '케', 'コ': '코',
  'サ': '사', 'シ': '시', 'ス': '스', 'セ': '세', 'ソ': '소',
  'タ': '타', 'チ': '치', 'ツ': '츠', 'テ': '테', 'ト': '토',
  'ナ': '나', 'ニ': '니', 'ヌ': '누', 'ネ': '네', 'ノ': '노',
  'ハ': '하', 'ヒ': '히', 'フ': '후', 'ヘ': '헤', 'ホ': '호',
  'マ': '마', 'ミ': '미', 'ム': '무', 'メ': '메', 'モ': '모',
  'ヤ': '야', 'ユ': '유', 'ヨ': '요',
  'ラ': '라', 'リ': '리', 'ル': '루', 'レ': '레', 'ロ': '로',
  'ワ': '와', 'ヲ': '오', 'ン': 'ㄴ',

  'ガ': '가', 'ギ': '기', 'グ': '구', 'ゲ': '게', 'ゴ': '고',
  'ザ': '자', 'ジ': '지', 'ズ': '즈', 'ゼ': '제', 'ゾ': '조',
  'ダ': '다', 'ヂ': '지', 'ヅ': '즈', 'デ': '데', 'ド': '도',
  'バ': '바', 'ビ': '비', 'ブ': '부', 'ベ': '베', 'ボ': '보',
  'パ': '파', 'ピ': '피', 'プ': '푸', 'ペ': '페', 'ポ': '포',

  // 장음 부호
  'ー': '-'
};

// 자주 쓰이는 일상 한자 어휘 발음 사전 (대화문 및 문장 변환 지원)
const KANJI_READING_DICT: Record<string, string> = {
  'お願い': 'おねがい',
  'お願いします': 'おねがいします',
  'お願いできますか': 'おねがいできますか',
  '一つ': 'ひとつ',
  '二つ': 'ふたつ',
  '三つ': 'みっつ',
  '抜き': 'ぬき',
  '抜きで': 'ぬきで',
  '別添え': 'べつぞえ',
  '助かります': 'たすかります',
  '助かる': 'たすかる',
  'ありがとう': 'ありがとう',
  'ありがとうございます': 'ありがとうございます',
  'お会計': 'おかいけい',
  '会計': 'かいけい',
  '別々': 'べつべつ',
  '別々で': 'べつべつで',
  '混雑時': 'こんざつじ',
  '混雑': 'こんざつ',
  'お支払い': 'おしはらい',
  '支払い': 'しはらい',
  '分かりました': 'わかりました',
  'カード': 'カード',
  '払います': 'はらいます',
  '味': 'あじ',
  '脂っこい': 'あぶらっこい',
  '全然': 'ぜんぜん',
  '豚骨': 'とんこつ',
  '評判通り': 'ひょうばんどおり',
  '箸': 'はし',
  '止まらない': 'とまらない',
  '美味しい': 'おいしい',
  '美味しかった': 'おいしかった',
  '一緒': 'いっしょ',
  '昼食': 'ちゅうしょく',
  '食事': 'しょくじ',
  '店': 'みせ',
  '今日': 'きょう',
  '明日': 'あした',
  '友達': 'ともだち',
  '私': 'わたし',
  '僕': 'ぼく'
};

/**
 * 한글 받침 붙이기 헬퍼 함수
 */
function attachBatchim(syllable: string, batchim: 'ㄴ' | 'ㄱ' | 'ㅅ' | 'ㅂ' | 'ㅁ' | 'ㅇ'): string {
  if (!syllable || syllable.length === 0) return syllable;
  const charCode = syllable.charCodeAt(0);
  // 한글 음절 범위: 0xAC00 ~ 0xD7A3
  if (charCode < 0xAC00 || charCode > 0xD7A3) return syllable;

  const base = charCode - 0xAC00;
  const initial = Math.floor(base / 588);
  const medial = Math.floor((base % 588) / 28);
  const final = base % 28;

  // 이미 받침이 있다면 그대로 반환
  if (final !== 0) return syllable;

  const batchimMap: Record<string, number> = {
    'ㄱ': 1,
    'ㄴ': 4,
    'ㄷ': 7,
    'ㄹ': 8,
    'ㅁ': 16,
    'ㅂ': 17,
    'ㅅ': 19,
    'ㅇ': 21
  };

  const batchimCode = batchimMap[batchim];
  if (!batchimCode) return syllable;

  return String.fromCharCode(0xAC00 + (initial * 588) + (medial * 28) + batchimCode);
}

/**
 * 가나 문자열(히라가나, 가타카나)을 자연스러운 한글 발음으로 변환
 */
export function kanaToHangul(text: string): string {
  if (!text) return '';

  let result = '';
  let i = 0;
  const len = text.length;

  while (i < len) {
    const ch = text[i];
    const nextCh = text[i + 1] || '';

    // 1. 공백, 기호 등은 그대로 유지
    if (ch === ' ' || ch === '　' || ch === '、' || ch === '。' || ch === '！' || ch === '？' || ch === '~' || ch === '〜' || ch === '!') {
      result += ch === '、' ? ', ' : ch === '。' ? '. ' : ch;
      i++;
      continue;
    }

    // 2. 촉음 (っ, ッ) 처리 -> 다음 글자의 초성에 따라 받침 부여
    if (ch === 'っ' || ch === 'ッ') {
      let nextKana = '';
      if (i + 2 < len && KANA_TO_HANGUL[text.substr(i + 1, 2)]) {
        nextKana = KANA_TO_HANGUL[text.substr(i + 1, 2)];
      } else if (i + 1 < len && KANA_TO_HANGUL[nextCh]) {
        nextKana = KANA_TO_HANGUL[nextCh];
      }

      if (nextKana) {
        let batchim: 'ㄱ' | 'ㅅ' | 'ㅂ' = 'ㅅ';
        if (['카', '키', '쿠', '케', '코'].includes(nextKana)) batchim = 'ㄱ';
        else if (['파', '피', '푸', '페', '포'].includes(nextKana)) batchim = 'ㅂ';

        if (result.length > 0) {
          const lastChar = result[result.length - 1];
          const combined = attachBatchim(lastChar, batchim);
          if (combined !== lastChar) {
            result = result.slice(0, -1) + combined;
          } else {
            result += (batchim === 'ㄱ' ? '윽' : batchim === 'ㅂ' ? '읍' : '읏');
          }
        }
      }
      i++;
      continue;
    }

    // 3. 발음 (ん, ン) 처리 -> 앞 글자 받침으로 붙이기
    if (ch === 'ん' || ch === 'ン') {
      if (result.length > 0) {
        const lastChar = result[result.length - 1];
        let batchim: 'ㄴ' | 'ㅁ' | 'ㅇ' = 'ㄴ';
        if (['ば', 'び', 'ぶ', 'べ', 'ぼ', 'ぱ', 'ぴ', 'ぷ', 'ぺ', 'ぽ', 'ま', 'み', 'む', 'め', 'も'].includes(nextCh)) {
          batchim = 'ㅁ';
        } else if (['か', 'き', 'く', 'け', 'こ', 'が', 'ぎ', 'ぐ', 'げ', 'ご'].includes(nextCh)) {
          batchim = 'ㅇ';
        }

        const combined = attachBatchim(lastChar, batchim);
        if (combined !== lastChar) {
          result = result.slice(0, -1) + combined;
        } else {
          result += 'ㄴ';
        }
      } else {
        result += '응';
      }
      i++;
      continue;
    }

    // 4. 장음 부호 (ー) 처리
    if (ch === 'ー') {
      result += '-';
      i++;
      continue;
    }

    // 5. 2글자 요음 확인 (きゃ, チュ 등)
    const twoChars = text.substr(i, 2);
    if (KANA_TO_HANGUL[twoChars]) {
      result += KANA_TO_HANGUL[twoChars];
      i += 2;
      continue;
    }

    // 6. 1글자 가나 확인
    if (KANA_TO_HANGUL[ch]) {
      result += KANA_TO_HANGUL[ch];
      i++;
      continue;
    }

    // 7. 한자나 기타 문자
    result += ch;
    i++;
  }

  return result.trim();
}

/**
 * 한자가 포함된 일본어 텍스트를 후리가나/가나 텍스트로 치환 후 한글 독음 생성
 */
export function getPronunciation(japaneseText: string, customReading?: string): string {
  if (customReading) {
    return kanaToHangul(customReading);
  }

  if (!japaneseText) return '';

  let converted = japaneseText;
  // 사전 기반 한자 치환
  for (const [kanji, reading] of Object.entries(KANJI_READING_DICT)) {
    if (converted.includes(kanji)) {
      converted = converted.split(kanji).join(reading);
    }
  }

  return kanaToHangul(converted);
}

/**
 * 주요 한자에 루비(후리가나) 정보를 분해해주는 헬퍼
 */
export interface RubySegment {
  text: string;
  ruby?: string;
}

export function parseRubySegments(text: string): RubySegment[] {
  if (!text) return [];

  const segments: RubySegment[] = [];
  let remaining = text;

  const patterns = [
    { kanji: '混雑時', ruby: 'こんざつじ' },
    { kanji: '評判通り', ruby: 'ひょうばんどおり' },
    { kanji: '別添え', ruby: 'べつぞえ' },
    { kanji: 'お会計', ruby: 'おかいけい' },
    { kanji: '会計', ruby: 'かいけい' },
    { kanji: '豚骨', ruby: 'とんこつ' },
    { kanji: '別々', ruby: 'べつべつ' },
    { kanji: '願', ruby: 'ねが' },
    { kanji: '抜', ruby: 'ぬ' },
    { kanji: '助', ruby: 'たす' },
    { kanji: '払', ruby: 'はら' },
    { kanji: '脂', ruby: 'あぶら' },
    { kanji: '箸', ruby: 'はし' },
    { kanji: '一', ruby: 'ひと' },
    { kanji: '分', ruby: 'わ' }
  ];

  while (remaining.length > 0) {
    let matched = false;
    for (const p of patterns) {
      const idx = remaining.indexOf(p.kanji);
      if (idx === 0) {
        segments.push({ text: p.kanji, ruby: p.ruby });
        remaining = remaining.substring(p.kanji.length);
        matched = true;
        break;
      }
    }

    if (!matched) {
      let minIdx = -1;
      for (const p of patterns) {
        const idx = remaining.indexOf(p.kanji);
        if (idx > 0 && (minIdx === -1 || idx < minIdx)) {
          minIdx = idx;
        }
      }

      if (minIdx !== -1) {
        segments.push({ text: remaining.substring(0, minIdx) });
        remaining = remaining.substring(minIdx);
      } else {
        segments.push({ text: remaining });
        break;
      }
    }
  }

  return segments;
}
