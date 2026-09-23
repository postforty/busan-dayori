export interface HangulConsonant {
  char: string;
  name: string; // 한글 이름 (기역)
  katakanaName: string; // キヨク
  romaji: string;
  katakanaSound: string;
  strokeCount: number;
  strokeGuide: string;
  soundTip: string; // 일본인 독자를 위한 발음 팁
  choIndex: number; // 유니코드 초성 인덱스
}

export interface HangulVowel {
  char: string;
  name: string;
  katakanaName: string;
  romaji: string;
  katakanaSound: string;
  strokeCount: number;
  strokeGuide: string;
  soundTip: string;
  jungIndex: number; // 유니코드 중성 인덱스
}

export interface SignQuizItem {
  id: string;
  category: 'gourmet' | 'cafe' | 'traffic' | 'shopping';
  korean: string;
  katakana: string;
  meaning: string;
  emoji: string;
  signType: string; // '식당 간판', '지하철 표지판', '카페 메뉴판' 등
  tip: string; // 부산 현지 실전 팁
  options: {
    text: string;
    katakana: string;
    isCorrect: boolean;
  }[];
}

// 1. 기본 자음 14자
export const HANGUL_CONSONANTS: HangulConsonant[] = [
  {
    char: 'ㄱ',
    name: '기역',
    katakanaName: 'キヨク',
    romaji: 'k / g',
    katakanaSound: 'k / g (カ行/ガ行)',
    strokeCount: 1,
    strokeGuide: '가로로 긋다가 부드럽게 아래로 꺾기 ①',
    soundTip: '単語の先頭では息を抜いた優しい「k」、母音の間では濁音の「g」になります。',
    choIndex: 0
  },
  {
    char: 'ㄴ',
    name: '니은',
    katakanaName: 'ニウン',
    romaji: 'n',
    katakanaSound: 'n (ナ行)',
    strokeCount: 1,
    strokeGuide: '위에서 내려와 오른쪽으로 꺾기 ①',
    soundTip: '日本語の「ナ行」とほぼ同じです。舌先を上の歯茎にしっかり当てて発音します。',
    choIndex: 2
  },
  {
    char: 'ㄷ',
    name: '디귿',
    katakanaName: 'ディグッ',
    romaji: 't / d',
    katakanaSound: 't / d (タ行/ダ行)',
    strokeCount: 2,
    strokeGuide: '위 가로선 ① ➔ ㄴ자처럼 내려와 오른쪽으로 ②',
    soundTip: '単語の先頭では軽い「t」、母音の間では濁音「d」になります。',
    choIndex: 3
  },
  {
    char: 'ㄹ',
    name: '리을',
    katakanaName: 'リウル',
    romaji: 'r / l',
    katakanaSound: 'r / l (ラ行)',
    strokeCount: 3,
    strokeGuide: 'ㄱ 모양 ① ➔ 가로선 ② ➔ ㄴ 모양으로 마무리 ③',
    soundTip: '日本語の「ラ行」より舌先を軽く弾く音です。英語の「R」のように巻き舌にしません。',
    choIndex: 5
  },
  {
    char: 'ㅁ',
    name: '미음',
    katakanaName: 'ミウム',
    romaji: 'm',
    katakanaSound: 'm (マ行)',
    strokeCount: 3,
    strokeGuide: '왼쪽 세로선 ① ➔ ㄱ자 꺾기 ② ➔ 밑변 가로 닫기 ③',
    soundTip: '四角い口の形を模した文字。日本語の「マ行」と同じく唇を閉じて音を出します。',
    choIndex: 6
  },
  {
    char: 'ㅂ',
    name: '비읍',
    katakanaName: 'ピウプ',
    romaji: 'p / b',
    katakanaSound: 'p / b (パ行/バ行)',
    strokeCount: 4,
    strokeGuide: '세로선 둘 ①② ➔ 가로 잇기 ③ ➔ 밑변 가로 닫기 ④',
    soundTip: '単語の先頭では優しい「p」、母音の間では濁音「b」になります。',
    choIndex: 7
  },
  {
    char: 'ㅅ',
    name: '시옷',
    katakanaName: 'シオッ',
    romaji: 's',
    katakanaSound: 's (サ行)',
    strokeCount: 2,
    strokeGuide: '왼쪽 비스듬히 삐침 ① ➔ 오른쪽 빗금 ②',
    soundTip: '日本語の「サ行」に近いです。「ㅣ(i)」と結合した時は「シ」になります。',
    choIndex: 9
  },
  {
    char: 'ㅇ',
    name: '이응',
    katakanaName: 'イウン',
    romaji: 'silent / ng',
    katakanaSound: '無音 (母音そのものの音)',
    strokeCount: 1,
    strokeGuide: '위쪽 중앙에서 반시계 방향으로 동그라미 ①',
    soundTip: '初声（頭）に来るときは音を持たず、母音の音をそのまま発音する記号です！',
    choIndex: 11
  },
  {
    char: 'ㅈ',
    name: '지읒',
    katakanaName: 'チウッ',
    romaji: 'ch / j',
    katakanaSound: 'ch / j (チャ行/ジャ行)',
    strokeCount: 2,
    strokeGuide: '가로선 그은 후 꺾어 왼쪽 삐침 ① ➔ 오른쪽 빗금 ②',
    soundTip: '単語の先頭では軽い「ch(チャ)」、母音の間では濁音「j(ジャ)」になります。',
    choIndex: 12
  },
  {
    char: 'ㅊ',
    name: '치읓',
    katakanaName: 'チウッ (激音)',
    romaji: 'ch’',
    katakanaSound: '強いチャ行 (激音)',
    strokeCount: 3,
    strokeGuide: '맨 위 작은 점/가로 ① ➔ ㅈ 모양 이어쓰기 ②③',
    soundTip: 'ティッシュが揺れるくらい、息を強く吹き出しながら「チャ！」と発音します。',
    choIndex: 14
  },
  {
    char: 'ㅋ',
    name: '키읔',
    katakanaName: 'キウク (激音)',
    romaji: 'k’',
    katakanaSound: '強いカ行 (激音)',
    strokeCount: 2,
    strokeGuide: 'ㄱ 모양 ① ➔ 가운데 가로선 추가 ②',
    soundTip: '息を「カッ！」と強く勢いよく吐き出すカ行の音です。',
    choIndex: 15
  },
  {
    char: 'ㅌ',
    name: '티읕',
    katakanaName: 'ティウッ (激音)',
    romaji: 't’',
    katakanaSound: '強いタ行 (激音)',
    strokeCount: 3,
    strokeGuide: '맨 위 가로선 ① ➔ 가운데 가로선 ② ➔ ㄴ 모양으로 닫기 ③',
    soundTip: '息を強く吐き出すタ行の激音です。「タッ！」と鋭く出します。',
    choIndex: 16
  },
  {
    char: 'ㅍ',
    name: '피읖',
    katakanaName: 'ピウプ (激音)',
    romaji: 'p’',
    katakanaSound: '強いパ行 (激音)',
    strokeCount: 4,
    strokeGuide: '위 가로선 ① ➔ 세로선 둘 ②③ ➔ 밑 가로선 ④',
    soundTip: '唇を破裂させるように強く「パッ！」と息を吹き出します。',
    choIndex: 17
  },
  {
    char: 'ㅎ',
    name: '히읗',
    katakanaName: 'ヒウッ',
    romaji: 'h',
    katakanaSound: 'h (ハ行)',
    strokeCount: 3,
    strokeGuide: '맨 위 짧은 점 ① ➔ 중간 가로선 ② ➔ 동그라미 ㅇ ③',
    soundTip: '日本語の「ハ行」と同じく、息を吐きながら出す音です。',
    choIndex: 18
  }
];

// 2. 기본 모음 10자 (일본인 학습자 관점의 핵심 발음 팁 포함)
export const HANGUL_VOWELS: HangulVowel[] = [
  {
    char: 'ㅏ',
    name: '아',
    katakanaName: 'ア',
    romaji: 'a',
    katakanaSound: 'ア (a)',
    strokeCount: 2,
    strokeGuide: '긴 세로선 ① ➔ 오른쪽 짧은 가로 ②',
    soundTip: '日本語の「ア」より少し口を縦に大きく開いて発音します。',
    jungIndex: 0
  },
  {
    char: 'ㅑ',
    name: '야',
    katakanaName: 'ヤ',
    romaji: 'ya',
    katakanaSound: 'ヤ (ya)',
    strokeCount: 3,
    strokeGuide: '긴 세로선 ① ➔ 오른쪽 가로선 둘 ②③',
    soundTip: '日本語の「ヤ」と同じように明るく声を出します。',
    jungIndex: 2
  },
  {
    char: 'ㅓ',
    name: '어',
    katakanaName: 'オ (開いたオ)',
    romaji: 'eo',
    katakanaSound: 'オ (口を縦に開ける)',
    strokeCount: 2,
    strokeGuide: '왼쪽 짧은 가로 ① ➔ 긴 세로선 ②',
    soundTip: '★超重要★ 日本語の「ア」の口の形のまま「オ」と発音する、日本語にない音です！',
    jungIndex: 4
  },
  {
    char: 'ㅕ',
    name: '여',
    katakanaName: 'ヨ (開いたヨ)',
    romaji: 'yeo',
    katakanaSound: 'ヨ (口を縦に開ける)',
    strokeCount: 3,
    strokeGuide: '왼쪽 가로선 둘 ①② ➔ 긴 세로선 ③',
    soundTip: '「ㅓ」と同じく、口を縦に大きく開けたまま「ヨ」と発音します。',
    jungIndex: 6
  },
  {
    char: 'ㅗ',
    name: '오',
    katakanaName: '오 (丸いオ)',
    romaji: 'o',
    katakanaSound: 'オ (唇をすぼめる)',
    strokeCount: 2,
    strokeGuide: '위 짧은 세로 ① ➔ 아래 긴 가로선 ②',
    soundTip: '唇をタコの口のように「チュッ」と丸くすぼめて「オ」と出します。',
    jungIndex: 8
  },
  {
    char: 'ㅛ',
    name: '요',
    katakanaName: 'ヨ (丸いヨ)',
    romaji: 'yo',
    katakanaSound: 'ヨ (唇をすぼめる)',
    strokeCount: 3,
    strokeGuide: '위 짧은 세로 둘 ①② ➔ 아래 긴 가로선 ③',
    soundTip: '唇を丸く突き出しながら「ヨ」と発音します。',
    jungIndex: 12
  },
  {
    char: 'ㅜ',
    name: '우',
    katakanaName: 'ウ (突き出すウ)',
    romaji: 'u',
    katakanaSound: 'ウ (唇をすぼめる)',
    strokeCount: 2,
    strokeGuide: '위 긴 가로선 ① ➔ 아래 짧은 세로 ②',
    soundTip: '唇を前に突き出して丸くすぼめながら発音する「ウ」です。',
    jungIndex: 13
  },
  {
    char: 'ㅠ',
    name: '유',
    katakanaName: 'ユ (突き出すユ)',
    romaji: 'yu',
    katakanaSound: 'ユ (唇をすぼめる)',
    strokeCount: 3,
    strokeGuide: '위 긴 가로선 ① ➔ 아래 짧은 세로 둘 ②③',
    soundTip: '唇を前にしっかり突き出しながら「ユ」と出します。',
    jungIndex: 17
  },
  {
    char: 'ㅡ',
    name: '으',
    katakanaName: 'ウ (横に引くウ)',
    romaji: 'eu',
    katakanaSound: 'ウ (唇を横に引く)',
    strokeCount: 1,
    strokeGuide: '왼쪽에서 오른쪽으로 평평한 가로선 ①',
    soundTip: '★超重要★ 口を「イ」の形に横に平たく引いたまま「ウ」と発音します。日本語の「ウ」に一番近い音です！',
    jungIndex: 18
  },
  {
    char: 'ㅣ',
    name: '이',
    katakanaName: 'イ',
    romaji: 'i',
    katakanaSound: 'イ (i)',
    strokeCount: 1,
    strokeGuide: '위에서 아래로 쭉 내리는 세로선 ①',
    soundTip: '日本語の「イ」と同じく、口を横に引いてハッキリ発音します。',
    jungIndex: 20
  }
];

// 3. 자음과 모음 결합으로 유니코드 한글 글자 생성
export function combineHangul(consonant: HangulConsonant, vowel: HangulVowel): string {
  const code = 0xac00 + (consonant.choIndex * 21 + vowel.jungIndex) * 28;
  return String.fromCharCode(code);
}

// 4. 부산 여행 실전 간판 및 메뉴판 퀴즈 단어장 (16선)
export const SIGN_QUIZ_LIST: SignQuizItem[] = [
  // --- グルメ (맛집/음식) ---
  {
    id: 'quiz-gourmet-1',
    category: 'gourmet',
    korean: '돼지국밥',
    katakana: 'テジクッパ',
    meaning: '豚クッパ (釜山名物ソウルフード)',
    emoji: '🍲',
    signType: '식당 간판 (食堂の看板)',
    tip: '釜山の街を歩くと一番よく見かける看板！「원조(元祖)」や「할매(おばあちゃん)」と書いてあれば名店の証です。',
    options: [
      { text: '豚クッパ (豚骨スープご飯)', katakana: 'テジクッパ', isCorrect: true },
      { text: '牛カルビチゲ', katakana: 'ソカルビチゲ', isCorrect: false },
      { text: '海鮮チヂミ', katakana: 'ヘムルパジョン', isCorrect: false },
      { text: 'サムギョプサル', katakana: 'サムギョプサル', isCorrect: false }
    ]
  },
  {
    id: 'quiz-gourmet-2',
    category: 'gourmet',
    korean: '밀면',
    katakana: 'ミルミョン',
    meaning: '小麦冷麺 (釜山の夏の名物)',
    emoji: '🍜',
    signType: '메뉴판 (メニュー)',
    tip: '一般的な冷麺は蕎麦粉ですが、釜山のミルミョンは小麦粉麺！ハサミで1〜2回切ってから食べます。',
    options: [
      { text: 'ジャージャー麺', katakana: 'チャジャンミョン', isCorrect: false },
      { text: '小麦冷麺 (ミルミョン)', katakana: 'ミルミョン', isCorrect: true },
      { text: 'カルグクス (温うどん)', katakana: 'カルグクス', isCorrect: false },
      { text: 'チャンポン', katakana: 'チャンポン', isCorrect: false }
    ]
  },
  {
    id: 'quiz-gourmet-3',
    category: 'gourmet',
    korean: '김밥',
    katakana: 'キンパ',
    meaning: '韓国風海苔巻き',
    emoji: '🍙',
    signType: '분식집 간판 (軽食店)',
    tip: '街中の「김밥천국(キンパ天国)」や「고봉민김밥」は、一人旅でも入りやすい定番の味方です！',
    options: [
      { text: 'トッポッキ', katakana: 'トッポッキ', isCorrect: false },
      { text: '韓国おでん', katakana: 'オムク', isCorrect: false },
      { text: '韓国風海苔巻き (キンパ)', katakana: 'キンパ', isCorrect: true },
      { text: '焼き餃子', katakana: 'マンドゥ', isCorrect: false }
    ]
  },
  {
    id: 'quiz-gourmet-4',
    category: 'gourmet',
    korean: '삼겹살',
    katakana: 'サムギョプサル',
    meaning: '豚バラ肉の焼肉',
    emoji: '🥩',
    signType: '식당 간판 (焼肉店)',
    tip: '「삼(3)・겹(層)・살(肉)」という漢字語由来の言葉。2人前以上から注文可能な店が多いので要チェック！',
    options: [
      { text: '牛プルコギ', katakana: 'プルコギ', isCorrect: false },
      { text: '豚バラ焼肉 (サムギョプサル)', katakana: 'サムギョプサル', isCorrect: true },
      { text: 'タッカルビ', katakana: 'タッカルビ', isCorrect: false },
      { text: 'ユッケ', katakana: 'ユッケ', isCorrect: false }
    ]
  },
  {
    id: 'quiz-gourmet-5',
    category: 'gourmet',
    korean: '어묵',
    katakana: 'オムク',
    meaning: '練り物・釜山おでん',
    emoji: '🍢',
    signType: '시장 간판 (南浦洞・国際市場)',
    tip: '釜山といえば「釜山オムク(부산어묵)」。屋台で立ち食いするとき、紙コップに熱い出汁(スープ)を汲んで一緒に飲むのが現地流！',
    options: [
      { text: '釜山名物 練り物・おでん', katakana: 'オムク', isCorrect: true },
      { text: 'ホットク', katakana: 'ホットク', isCorrect: false },
      { text: 'スンデ (春雨ソーセージ)', katakana: 'スンデ', isCorrect: false },
      { text: 'チヂミ', katakana: 'パジョン', isCorrect: false }
    ]
  },
  {
    id: 'quiz-gourmet-6',
    category: 'gourmet',
    korean: '비빔밥',
    katakana: 'ビビンバ',
    meaning: '混ぜご飯',
    emoji: '🥗',
    signType: '식당 메뉴 (食堂メニュー)',
    tip: '「비비다(混ぜる)」+「밥(ご飯)」の組み合わせ。しっかりスプーンで均等に混ぜて食べるのが一番美味しい秘訣！',
    options: [
      { text: '石焼きチャーハン', katakana: 'ポックンパ', isCorrect: false },
      { text: '混ぜご飯 (ビビンバ)', katakana: 'ビビンバ', isCorrect: true },
      { text: 'クッパ (スープご飯)', katakana: 'クッパ', isCorrect: false },
      { text: 'お粥', katakana: 'チュク', isCorrect: false }
    ]
  },

  // --- カフェ (カフェ) ---
  {
    id: 'quiz-cafe-1',
    category: 'cafe',
    korean: '아메리카노',
    katakana: 'アメリカーノ',
    meaning: 'アメリカーノ (韓国カフェの国民的定番)',
    emoji: '☕',
    signType: '카페 메뉴판 (カフェメニュー)',
    tip: '韓国人は真冬でも「아아(ア・ア = アイスアメリカーノ)」を飲む人が多数！「アイス」は「아이스」です。',
    options: [
      { text: 'カフェラテ', katakana: 'カフェラテ', isCorrect: false },
      { text: 'アメリカーノ', katakana: 'アメリカーノ', isCorrect: true },
      { text: '抹茶フラペチーノ', katakana: 'マルチャラテ', isCorrect: false },
      { text: 'レモネード', katakana: 'レモネイド', isCorrect: false }
    ]
  },
  {
    id: 'quiz-cafe-2',
    category: 'cafe',
    korean: '포장',
    katakana: 'ポジャン',
    meaning: '持ち帰り・テイクアウト',
    emoji: '🛍️',
    signType: '키오스크 / 계산대 (キオスク注文)',
    tip: 'キオスク（タッチパネル注文機）で必ず聞かれます。「매장(店内)」か「포장(テイクアウト)」を選びましょう！',
    options: [
      { text: '店内で飲食 (店内)', katakana: 'メジャン', isCorrect: false },
      { text: '持ち帰り (テイクアウト)', katakana: 'ポジャン', isCorrect: true },
      { text: '注文キャンセル', katakana: 'チュソ', isCorrect: false },
      { text: 'ポイント積立', katakana: 'チョクリプ', isCorrect: false }
    ]
  },
  {
    id: 'quiz-cafe-3',
    category: 'cafe',
    korean: '와이파이',
    katakana: 'ワイパイ',
    meaning: 'Wi-Fi (無料Wi-Fi)',
    emoji: '📶',
    signType: '벽면 부착 안내판 (カフェの壁やレシート)',
    tip: 'カフェのレシートの下部や壁に「와이파이(Wi-Fi)」とパスワード(비밀번호 / PW)が必ず書かれています。',
    options: [
      { text: '無料Wi-Fi', katakana: 'ワイパイ', isCorrect: true },
      { text: 'コンセント充電器', katakana: 'チュンジョンギ', isCorrect: false },
      { text: '営業時間', katakana: 'ヨンオプシガン', isCorrect: false },
      { text: '禁煙席', katakana: 'クミョンソク', isCorrect: false }
    ]
  },

  // --- 街・交通 (街・交通) ---
  {
    id: 'quiz-traffic-1',
    category: 'traffic',
    korean: '화장실',
    katakana: 'ファジャンシル',
    meaning: 'お手洗い・トイレ',
    emoji: '🚻',
    signType: '공공 표지판 (案内標識)',
    tip: '旅行中に一番探す看板！カフェやビルのトイレには暗証番号(PW)が必要な場合が多いのでレシートを確認！',
    options: [
      { text: 'お手洗い・トイレ', katakana: 'ファジャンシル', isCorrect: true },
      { text: '非常口', katakana: 'ピサンク', isCorrect: false },
      { text: 'エレベーター', katakana: 'エルレビト', isCorrect: false },
      { text: '案内所 (インフォメーション)', katakana: 'アンネソ', isCorrect: false }
    ]
  },
  {
    id: 'quiz-traffic-2',
    category: 'traffic',
    korean: '출구',
    katakana: 'チュルグ',
    meaning: '出口',
    emoji: '🚪',
    signType: '지하철 표지판 (地下鉄の標識)',
    tip: '数字と組み合わせて「1번 출구 (1番出口)」のように使われます。反対の入口は「입구(イプク)」です。',
    options: [
      { text: '入口', katakana: 'イプク', isCorrect: false },
      { text: '出口', katakana: 'チュルグ', isCorrect: true },
      { text: '乗り換え', katakana: 'ファンスン', isCorrect: false },
      { text: '切符売り場', katakana: 'ピョパヌンゴッ', isCorrect: false }
    ]
  },
  {
    id: 'quiz-traffic-3',
    category: 'traffic',
    korean: '지하철',
    katakana: 'チハチョル',
    meaning: '地下鉄・メトロ',
    emoji: '🚇',
    signType: '교통 표지판 (メトロ入口)',
    tip: '釜山旅行の頼れる足！1号線(オレンジ)から4号線まで分かりやすく色分けされています。',
    options: [
      { text: 'タクシー乗り場', katakana: 'テクシ', isCorrect: false },
      { text: '地下鉄 (メトロ)', katakana: 'チハチョル', isCorrect: true },
      { text: '市内バス停', katakana: 'ポス', isCorrect: false },
      { text: 'KTX高速鉄道', katakana: 'ケイティエクス', isCorrect: false }
    ]
  },
  {
    id: 'quiz-traffic-4',
    category: 'traffic',
    korean: '부산역',
    katakana: 'プサニョク',
    meaning: '釜山駅 (KTX・地下鉄)',
    emoji: '🚉',
    signType: '역명판 (駅の看板)',
    tip: '「부산(釜山)」+「역(駅)」。連音化（リエゾン）して「プサン・ヨク」ではなく「プサニョク」と発音します。',
    options: [
      { text: '西面駅 (ソミョン駅)', katakana: 'ソミョニョク', isCorrect: false },
      { text: '海雲台駅 (ヘウンデ駅)', katakana: 'ヘウンデヨク', isCorrect: false },
      { text: '釜山駅 (プサン駅)', katakana: 'プサニョク', isCorrect: true },
      { text: '南浦駅 (ナンポ駅)', katakana: 'ナンポヨク', isCorrect: false }
    ]
  },
  {
    id: 'quiz-traffic-5',
    category: 'traffic',
    korean: '약국',
    katakana: 'ヤックク',
    meaning: '薬局・ドラッグストア',
    emoji: '💊',
    signType: '거리 간판 (街の看板)',
    tip: '赤い十字マークに大きく「약(ヤク)」と一文字だけ書いてある看板が目印です！',
    options: [
      { text: '病院・クリニック', katakana: 'ピョンウォン', isCorrect: false },
      { text: '薬局 (ドラッグストア)', katakana: 'ヤックク', isCorrect: true },
      { text: 'スーパーマーケット', katakana: 'マート', isCorrect: false },
      { text: '両替所', katakana: 'ファンジョンソ', isCorrect: false }
    ]
  },

  // --- 買い物・実戦 (ショッピング/お会計) ---
  {
    id: 'quiz-shopping-1',
    category: 'shopping',
    korean: '계산',
    katakana: 'ケサン',
    meaning: 'お会計・精算',
    emoji: '💳',
    signType: '카운터 안내판 (レジカウンター)',
    tip: 'レジで「계산해 주세요 (ケサネ ジュセヨ = お会計お願いします)」と言えれば完璧です！',
    options: [
      { text: 'お会計・精算', katakana: 'ケサン', isCorrect: true },
      { text: '返品・交換', katakana: 'パンプム', isCorrect: false },
      { text: '領収書', katakana: 'ヨンステンス', isCorrect: false },
      { text: '予約確認', katakana: 'イェヤク', isCorrect: false }
    ]
  },
  {
    id: 'quiz-shopping-2',
    category: 'shopping',
    korean: '편의점',
    katakana: 'ピョニジョム',
    meaning: 'コンビニ (GS25, CU等)',
    emoji: '🏪',
    signType: '거리 간판 (街の看板)',
    tip: '漢字「便宜店」の韓国語読み。T-moneyカードのチャージや深夜の買い物に必須です。',
    options: [
      { text: '大型スーパー', katakana: 'テヒョンマート', isCorrect: false },
      { text: 'コンビニ (편의점)', katakana: 'ピョニジョム', isCorrect: true },
      { text: 'パン屋さん', katakana: 'パンチプ', isCorrect: false },
      { text: 'カフェ', katakana: 'カペ', isCorrect: false }
    ]
  }
];
