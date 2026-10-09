// 가타카나 커리큘럼 데이터 정의

export interface KatakanaChar {
  char: string;
  romaji: string;
  koreanSound: string;
  row: string; // ア행, カ행 등
  colIndex: number; // 0: a, 1: i, 2: u, 3: e, 4: o
  strokeCount: number;
  strokeGuide?: string; // 획순 팁
  soundTip?: string; // 한국인 발음 팁
  baseChar?: string; // 탁점/반탁점 원래 청음 글자 (예: ガ의 baseChar는 カ) 또는 요음의 앞글자 (キャ의 baseChar는 キ)
  smallChar?: string; // 요음/특수음의 작은 글자 (ャ, ュ, ョ, ィ, ェ 등)
  separateSound?: string; // 2박자 분리 발음 (예: "キ・ヤ [키-야]")
  soundType?: 'seion' | 'dakuon' | 'handakuon' | 'youon' | 'special';
  matchingHiragana?: string; // 대응되는 히라가나 글자 (예: 'あ' ⇄ 'ア')
}

export interface KatakanaRow {
  name: string;
  chars: (KatakanaChar | null)[];
}

// 헷갈리는 가타카나 쌍 (도플갱어 글자)
export interface ConfusingKatakanaPair {
  id: string;
  title: string;
  shortTitle?: string;
  char1: {
    char: string;
    romaji: string;
    korean: string;
    feature: string;
    strokeDirection: string; // 획의 방향/각도
    mnemonic: string; // 암기 비법
  };
  char2: {
    char: string;
    romaji: string;
    korean: string;
    feature: string;
    strokeDirection: string;
    mnemonic: string;
  };
  char3?: {
    char: string;
    romaji: string;
    korean: string;
    feature: string;
    strokeDirection: string;
    mnemonic: string;
  };
  tip: string;
}

// 여행 실전 외래어 단어
export interface KatakanaTravelWord {
  id: string;
  japanese: string; // 표기 (예: コーヒー)
  hiraganaReading?: string; // 히라가나 읽기 (예: こーひー)
  romaji: string; // 로마자
  koreanMeaning: string; // 한국어 의미
  koreanPronunciation: string; // 한국어 발음
  emoji: string;
  category: 'cafe' | 'food' | 'shopping' | 'travel' | 'convenience';
  travelTip: string; // 여행지 실전 팁 (메뉴판 주문 요령 등)
}

// 히라가나 ⇄ 가타카나 매칭 게임용 쌍
export interface KatakanaMatchPair {
  id: string;
  hiragana: string;
  katakana: string;
  romaji: string;
  korean: string;
}

// ==========================================
// 1. 기본 46자 (청음 / 清音)
// ==========================================
export const KATAKANA_GRID: KatakanaRow[] = [
  {
    name: 'ア행 (a)',
    chars: [
      { char: 'ア', romaji: 'a', koreanSound: '아', row: 'ア', colIndex: 0, strokeCount: 2, strokeGuide: '가로 꺾임선 ① ➔ 삐침선 ②', soundTip: '한국어 [아]와 같으나 입을 너무 크게 벌리지 않고 단정하게 발음합니다.', matchingHiragana: 'あ' },
      { char: 'イ', romaji: 'i', koreanSound: '이', row: 'ア', colIndex: 1, strokeCount: 2, strokeGuide: '왼쪽 삐침 ① ➔ 곧은 세로선 ②', soundTip: '한자 사람 인(人) 모양과 유사하며 입꼬리를 양옆으로 당깁니다.', matchingHiragana: 'い' },
      { char: 'ウ', romaji: 'u', koreanSound: '우', row: 'ア', colIndex: 2, strokeCount: 3, strokeGuide: '상단 짧은 점 ① ➔ 왼쪽 세로 ② ➔ 꺾임 곡선 ③', soundTip: '한국어 [우]와 [으]의 중간 정도로 편안하게 발음합니다.', matchingHiragana: 'う' },
      { char: 'エ', romaji: 'e', koreanSound: '에', row: 'ア', colIndex: 3, strokeCount: 3, strokeGuide: '상단 가로 ① ➔ 중앙 세로 ② ➔ 하단 가로 ③', soundTip: '한자 장인 공(工) 모양과 같으며 깔끔하게 [에] 소리를 냅니다.', matchingHiragana: 'え' },
      { char: 'オ', romaji: 'o', koreanSound: '오', row: 'ア', colIndex: 4, strokeCount: 3, strokeGuide: '가로선 ① ➔ 세로 삐침 ② ➔ 대각선 삐침 ③', soundTip: '한자 재주 재(才)와 비슷하며 입술을 둥글게 모읍니다.', matchingHiragana: 'お' },
    ]
  },
  {
    name: 'カ행 (ka)',
    chars: [
      { char: 'カ', romaji: 'ka', koreanSound: '카', row: 'カ', colIndex: 0, strokeCount: 2, strokeGuide: '꺾임선 ① ➔ 삐침선 ② (점 없음)', soundTip: '히라가나 か에서 오른쪽 점이 빠진 모양입니다.', matchingHiragana: 'か' },
      { char: 'キ', romaji: 'ki', koreanSound: '키', row: 'カ', colIndex: 1, strokeCount: 3, strokeGuide: '가로선 2개 ①, ② ➔ 대각선 세로 ③', soundTip: '히라가나 き의 윗부분과 동일합니다.', matchingHiragana: 'き' },
      { char: 'ク', romaji: 'ku', koreanSound: '쿠', row: 'カ', colIndex: 2, strokeCount: 2, strokeGuide: '짧은 삐침 ① ➔ 꺾임선 ②', soundTip: '숫자 7과 비슷하게 꺾어 내려씁니다.', matchingHiragana: 'く' },
      { char: 'ケ', romaji: 'ke', koreanSound: '케', row: 'カ', colIndex: 3, strokeCount: 3, strokeGuide: '왼쪽 삐침 ① ➔ 가로선 ② ➔ 긴 세로 삐침 ③', soundTip: '알파벳 대문자 K(케이)를 오른쪽으로 살짝 기울인 모양입니다.', matchingHiragana: 'け' },
      { char: 'コ', romaji: 'ko', koreanSound: '코', row: 'カ', colIndex: 4, strokeCount: 2, strokeGuide: '상단 꺾임 ① ➔ 하단 가로선 ②', soundTip: '따뜻한 코코아 머그잔의 각진 손잡이처럼 디귿(ㄷ)을 뒤집은 형태로 씁니다.', matchingHiragana: 'こ' },
    ]
  },
  {
    name: 'サ행 (sa)',
    chars: [
      { char: 'サ', romaji: 'sa', koreanSound: '사', row: 'サ', colIndex: 0, strokeCount: 3, strokeGuide: '가로선 ① ➔ 왼쪽 세로 ② ➔ 오른쪽 세로 삐침 ③', soundTip: '벽에 기댄 사다리의 가로 발판과 두 기둥 다리(풀 초 艹 머리) 모양입니다.', matchingHiragana: 'さ' },
      { char: 'シ', romaji: 'shi', koreanSound: '시', row: 'サ', colIndex: 1, strokeCount: 3, strokeGuide: '위 점 ① ➔ 아래 점 ② ➔ 아래에서 위로 치켜올리기 ③', soundTip: '★밑에서 위로 삐치는 획! 점들이 세로로 나란히 눕습니다.', matchingHiragana: 'し' },
      { char: 'ス', romaji: 'su', koreanSound: '스', row: 'サ', colIndex: 2, strokeCount: 2, strokeGuide: '가로 꺾임선 ① ➔ 뚫고 나오는 삐침 ②', soundTip: '숫자 7 밑으로 획이 살짝 삐쳐 나옵니다.', matchingHiragana: 'す' },
      { char: 'セ', romaji: 'se', koreanSound: '세', row: 'サ', colIndex: 3, strokeCount: 2, strokeGuide: '가로 꺾임선 ① ➔ 세로 가로선 ②', soundTip: '핸들바와 L자 프레임, 안장 기둥이 달린 세발자전거 모양입니다.', matchingHiragana: 'せ' },
      { char: 'ソ', romaji: 'so', koreanSound: '소', row: 'サ', colIndex: 4, strokeCount: 2, strokeGuide: '짧은 빗금 점 ① ➔ 위에서 아래로 삐침 ②', soundTip: '★위에서 아래로 긁어내리는 획! 각도가 가파릅니다.', matchingHiragana: 'そ' },
    ]
  },
  {
    name: 'タ행 (ta)',
    chars: [
      { char: 'タ', romaji: 'ta', koreanSound: '타', row: 'タ', colIndex: 0, strokeCount: 3, strokeGuide: '짧은 삐침 ① ➔ 꺾임선 ② ➔ 안쪽 점 ③', soundTip: '저녁 석(夕) 모양과 거의 일치합니다.', matchingHiragana: 'た' },
      { char: 'チ', romaji: 'chi', koreanSound: '치', row: 'タ', colIndex: 1, strokeCount: 3, strokeGuide: '짧은 삐침 ① ➔ 가로선 ② ➔ 둥근 세로 곡선 ③', soundTip: '치어리더가 양손에 폼폼을 들고(2획), 하이킥 점프를 뛰는 모습(3획)을 연상해 보세요.', matchingHiragana: 'ち' },
      { char: 'ツ', romaji: 'tsu', koreanSound: '츠', row: 'タ', colIndex: 2, strokeCount: 3, strokeGuide: '왼쪽 점 ① ➔ 오른쪽 점 ② ➔ 위에서 아래로 미끄러지듯 삐침 ③', soundTip: '단정한 셔츠 칼라의 단추 2개와 아래로 떨어지는 앞섶 라인을 연상해 보세요.', matchingHiragana: 'つ' },
      { char: 'テ', romaji: 'te', koreanSound: '테', row: 'タ', colIndex: 3, strokeCount: 3, strokeGuide: '상단 짧은 가로 ① ➔ 가로선 ② ➔ 둥근 삐침 ③', soundTip: '원근감 있는 테이블의 뒤쪽 모서리(1획), 앞쪽 모서리(2획), 꼬깔형 받침 다리(3획)를 연상해 보세요.', matchingHiragana: 'て' },
      { char: 'ト', romaji: 'to', koreanSound: '토', row: 'タ', colIndex: 4, strokeCount: 2, strokeGuide: '곧은 세로선 ① ➔ 오른쪽 대각선 점 ②', soundTip: '우뚝 선 가스 토치 본체(1획)와 우측 사선으로 뻗은 화구 파이프 & 불꽃(2획)을 연상해 보세요.', matchingHiragana: 'と' },
    ]
  },
  {
    name: 'ナ행 (na)',
    chars: [
      { char: 'ナ', romaji: 'na', koreanSound: '나', row: 'ナ', colIndex: 0, strokeCount: 2, strokeGuide: '가로선 ① ➔ 왼쪽 세로 삐침 ②', soundTip: '가로로 쥔 나이프 손잡이(1획)와 아래로 촥 베어 내리는 날렵한 칼날(2획)을 연상해 보세요.', matchingHiragana: 'な' },
      { char: 'ニ', romaji: 'ni', koreanSound: '니', row: 'ナ', colIndex: 1, strokeCount: 2, strokeGuide: '상단 짧은 가로 ① ➔ 하단 긴 가로 ②', soundTip: '위로 힘차게 헤엄쳐 올라가는 주황색 니모(흰동가리)의 머리와 배에 새겨진 하얀 가로 줄무늬 2개(ニ)를 연상해 보세요.', matchingHiragana: 'に' },
      { char: 'ヌ', romaji: 'nu', koreanSound: '누', row: 'ナ', colIndex: 2, strokeCount: 2, strokeGuide: '가로 꺾임선 ① ➔ 교차 삐침선 ②', soundTip: '가로 젓가락(1획 가로)과 반대쪽 젓가락(2획)으로 건져 올린 꼬불꼬불한 누들(Noodles) 면발을 연상해 보세요.', matchingHiragana: 'ぬ' },
      { char: 'ネ', romaji: 'ne', koreanSound: '네', row: 'ナ', colIndex: 3, strokeCount: 4, strokeGuide: '상단 점 ① ➔ 꺾임선 ② ➔ 곧은 세로선 ③ ➔ 우하향 빗금 점 ④', soundTip: '단정한 셔츠 칼라와 매듭, 아래로 곧게 늘어뜨린 네ㄱ타이(Necktie)를 연상해 보세요.', matchingHiragana: 'ね' },
      { char: 'ノ', romaji: 'no', koreanSound: '노', row: 'ナ', colIndex: 4, strokeCount: 1, strokeGuide: '우상단에서 좌하단으로 부드러운 삐침 ①', soundTip: '빗금 하나로 가장 쓰기 쉬운 글자입니다.', matchingHiragana: 'の' },
    ]
  },
  {
    name: 'ハ행 (ha)',
    chars: [
      { char: 'ハ', romaji: 'ha', koreanSound: '하', row: 'ハ', colIndex: 0, strokeCount: 2, strokeGuide: '왼쪽 삐침 ① ➔ 오른쪽 삐침 ②', soundTip: '하와이 해변에 시원하게 八자로 뻗은 두 그루의 쌍둥이 야자수(ハ)를 연상해 보세요.', matchingHiragana: 'は' },
      { char: 'ヒ', romaji: 'hi', koreanSound: '히', row: 'ハ', colIndex: 1, strokeCount: 2, strokeGuide: '가로선 ① ➔ 꺾어 올린 뒤 세로선 ②', soundTip: '붉게 달아오른 상단 석영 열선(1획)과 왼쪽 기둥 및 바닥 프레임(2획)의 클래식 2단 전기 히터(Heater)를 연상해 보세요.', matchingHiragana: 'ひ' },
      { char: 'フ', romaji: 'fu', koreanSound: '후', row: 'ハ', colIndex: 2, strokeCount: 1, strokeGuide: '가로 꺾임선 하나로 완성 ①', soundTip: '히라가나 ふ와 달리 획 하나로 각지게 씁니다.', matchingHiragana: 'ふ' },
      { char: 'ヘ', romaji: 'he', koreanSound: '헤', row: 'ハ', colIndex: 3, strokeCount: 1, strokeGuide: '산 모양으로 꺾어 내림 ①', soundTip: '히라가나 へ와 형태가 똑같습니다.', matchingHiragana: 'へ' },
      { char: 'ホ', romaji: 'ho', koreanSound: '호', row: 'ハ', colIndex: 4, strokeCount: 4, strokeGuide: '가로선 ① ➔ 세로선 ② ➔ 좌우 점 ③, ④', soundTip: '할로윈 호박(Jack-o\'-lantern) 머리 위의 모자 챙(1획)과 고깔 기둥(2획), 양옆 리본과 눈(3·4획)을 연상해 보세요.', matchingHiragana: 'ほ' },
    ]
  },
  {
    name: 'マ행 (ma)',
    chars: [
      { char: 'マ', romaji: 'ma', koreanSound: '마', row: 'マ', colIndex: 0, strokeCount: 2, strokeGuide: '가로 꺾임선 ① ➔ 대각선 점 ②', soundTip: '녹음실에서 노래하는 입 앞의 마이크(1획 바디·스탠드, 2획 조절 핀)를 연상해 보세요.', matchingHiragana: 'ま' },
      { char: 'ミ', romaji: 'mi', koreanSound: '미', row: 'マ', colIndex: 1, strokeCount: 3, strokeGuide: '평행한 빗금 세 줄 ①, ②, ③', soundTip: '석 삼(三)을 대각선으로 기울인 모양입니다.', matchingHiragana: 'み' },
      { char: 'ム', romaji: 'mu', koreanSound: '무', row: 'マ', colIndex: 2, strokeCount: 2, strokeGuide: '삼각형 꺾임선 ① ➔ 짧은 점 ②', soundTip: '오른쪽을 향해 오른팔(1획)을 뻗고 왼팔로 정권 찌르기(2획)를 날리는 무술(ム)을 연상해 보세요.', matchingHiragana: 'む' },
      { char: 'メ', romaji: 'me', koreanSound: '메', row: 'マ', colIndex: 3, strokeCount: 2, strokeGuide: '왼쪽 삐침 ① ➔ 가로지르는 빗금 ②', soundTip: '메모지에 사선으로 쓱 그은 X체크(メ) 표시를 연상해 보세요.', matchingHiragana: 'め' },
      { char: 'モ', romaji: 'mo', koreanSound: '모', row: 'マ', colIndex: 4, strokeCount: 3, strokeGuide: '가로선 2개 ①, ② ➔ 세로 꺾임선 ③', soundTip: '히라가나 も를 각지게 만든 형태입니다.', matchingHiragana: 'も' },
    ]
  },
  {
    name: 'ヤ행 (ya)',
    chars: [
      { char: 'ヤ', romaji: 'ya', koreanSound: '야', row: 'ヤ', colIndex: 0, strokeCount: 2, strokeGuide: '꺾임선 ① ➔ 관통하는 세로선 ②', soundTip: '히라가나 や의 점을 뺀 각진 형태입니다.', matchingHiragana: 'や' },
      null,
      { char: 'ユ', romaji: 'yu', koreanSound: '유', row: 'ヤ', colIndex: 2, strokeCount: 2, strokeGuide: '꺾임선 ① ➔ 가로지르는 긴 가로선 ②', soundTip: '한글 [그]를 연상하면 외우기 쉽습니다.', matchingHiragana: 'ゆ' },
      null,
      { char: 'ヨ', romaji: 'yo', koreanSound: '요', row: 'ヤ', colIndex: 4, strokeCount: 3, strokeGuide: '디귿(ㄷ) 꺾임 ① ➔ 중앙 가로선 ②, ③', soundTip: '영문 E를 좌우 반전한 모양입니다.', matchingHiragana: 'よ' },
    ]
  },
  {
    name: 'ラ행 (ra)',
    chars: [
      { char: 'ラ', romaji: 'ra', koreanSound: '라', row: 'ラ', colIndex: 0, strokeCount: 2, strokeGuide: '상단 짧은 가로 ① ➔ 꺾임 곡선 ②', soundTip: '숫자 5의 윗부분과 유사합니다.', matchingHiragana: 'ら' },
      { char: 'リ', romaji: 'ri', koreanSound: '리', row: 'ラ', colIndex: 1, strokeCount: 2, strokeGuide: '왼쪽 짧은 세로 ① ➔ 오른쪽 긴 세로 삐침 ②', soundTip: '히라가나 り와 거의 같습니다.', matchingHiragana: 'り' },
      { char: 'ル', romaji: 'ru', koreanSound: '루', row: 'ラ', colIndex: 2, strokeCount: 2, strokeGuide: '왼쪽 세로 삐침 ① ➔ 오른쪽 꺾임 치켜올림 ②', soundTip: '다리 모양으로 두 갈래로 갈라집니다.', matchingHiragana: 'る' },
      { char: 'レ', romaji: 're', koreanSound: '레', row: 'ラ', colIndex: 3, strokeCount: 1, strokeGuide: '세로로 내려오다 우상단으로 꺾어 올림 ①', soundTip: '체크 표시(✓) 모양으로 한 번에 씁니다.', matchingHiragana: 'れ' },
      { char: 'ロ', romaji: 'ro', koreanSound: '로', row: 'ラ', colIndex: 4, strokeCount: 3, strokeGuide: '네모 상자 형태로 세 번에 걸쳐 씀 ①, ②, ③', soundTip: '입 구(口) 모양과 100% 동일합니다.', matchingHiragana: 'ろ' },
    ]
  },
  {
    name: 'ワ/ン행',
    chars: [
      { char: 'ワ', romaji: 'wa', koreanSound: '와', row: 'ワ', colIndex: 0, strokeCount: 2, strokeGuide: '왼쪽 세로선 ① ➔ 꺾임선 ②', soundTip: '우(ウ)에서 상단 점이 빠진 모양입니다.', matchingHiragana: 'わ' },
      null,
      null,
      null,
      { char: 'ヲ', romaji: 'wo', koreanSound: '오(워)', row: 'ワ', colIndex: 4, strokeCount: 3, strokeGuide: '가로선 ① ➔ 가로 꺾임 ② ➔ 빗금 삐침 ③', soundTip: '목적격 조사(~을/를)로 주로 쓰이며 발음은 [오]입니다.', matchingHiragana: 'を' },
    ]
  },
  {
    name: '단독 받침 (n)',
    chars: [
      { char: 'ン', romaji: 'n', koreanSound: '응(받침)', row: 'ン', colIndex: 0, strokeCount: 2, strokeGuide: '짧은 빗금 점 ① ➔ 아래에서 위로 치켜올리기 ②', soundTip: '★밑에서 위로 삐치는 획! 소(ソ)보다 완만하게 누워있습니다.', matchingHiragana: 'ん' },
      null,
      null,
      null,
      null
    ]
  }
];

// 청음 평탄화 배열 (46자)
export const ALL_KATAKANA_SEION_CHARS: KatakanaChar[] = KATAKANA_GRID.flatMap((r) =>
  r.chars.filter((c): c is KatakanaChar => c !== null)
);

// ==========================================
// 2. 탁음 & 반탁음 (25자 / 濁音・半濁音)
// ==========================================
export const KATAKANA_DAKUON_GRID: KatakanaRow[] = [
  {
    name: 'ガ행 (ga)',
    chars: [
      { char: 'ガ', romaji: 'ga', koreanSound: '가', row: 'ガ', colIndex: 0, strokeCount: 4, baseChar: 'カ', soundType: 'dakuon' },
      { char: 'ギ', romaji: 'gi', koreanSound: '기', row: 'ガ', colIndex: 1, strokeCount: 5, baseChar: 'キ', soundType: 'dakuon' },
      { char: 'グ', romaji: 'gu', koreanSound: '구', row: 'ガ', colIndex: 2, strokeCount: 4, baseChar: 'ク', soundType: 'dakuon' },
      { char: 'ゲ', romaji: 'ge', koreanSound: '게', row: 'ガ', colIndex: 3, strokeCount: 5, baseChar: 'ケ', soundType: 'dakuon' },
      { char: 'ゴ', romaji: 'go', koreanSound: '고', row: 'ガ', colIndex: 4, strokeCount: 4, baseChar: 'コ', soundType: 'dakuon' },
    ]
  },
  {
    name: 'ザ행 (za)',
    chars: [
      { char: 'ザ', romaji: 'za', koreanSound: '자', row: 'ザ', colIndex: 0, strokeCount: 5, baseChar: 'サ', soundType: 'dakuon' },
      { char: 'ジ', romaji: 'ji', koreanSound: '지', row: 'ザ', colIndex: 1, strokeCount: 5, baseChar: 'シ', soundType: 'dakuon' },
      { char: 'ズ', romaji: 'zu', koreanSound: '즈', row: 'ザ', colIndex: 2, strokeCount: 4, baseChar: 'ス', soundType: 'dakuon' },
      { char: 'ゼ', romaji: 'ze', koreanSound: '제', row: 'ザ', colIndex: 3, strokeCount: 4, baseChar: 'セ', soundType: 'dakuon' },
      { char: 'ゾ', romaji: 'zo', koreanSound: '조', row: 'ザ', colIndex: 4, strokeCount: 4, baseChar: 'ソ', soundType: 'dakuon' },
    ]
  },
  {
    name: 'ダ행 (da)',
    chars: [
      { char: 'ダ', romaji: 'da', koreanSound: '다', row: 'ダ', colIndex: 0, strokeCount: 5, baseChar: 'タ', soundType: 'dakuon' },
      { char: 'ヂ', romaji: 'ji', koreanSound: '지(디)', row: 'ダ', colIndex: 1, strokeCount: 5, baseChar: 'チ', soundType: 'dakuon' },
      { char: 'ヅ', romaji: 'zu', koreanSound: '즈(두)', row: 'ダ', colIndex: 2, strokeCount: 5, baseChar: 'ツ', soundType: 'dakuon' },
      { char: 'デ', romaji: 'de', koreanSound: '데', row: 'ダ', colIndex: 3, strokeCount: 5, baseChar: 'テ', soundType: 'dakuon' },
      { char: 'ド', romaji: 'do', koreanSound: '도', row: 'ダ', colIndex: 4, strokeCount: 4, baseChar: 'ト', soundType: 'dakuon' },
    ]
  },
  {
    name: 'バ행 (ba)',
    chars: [
      { char: 'バ', romaji: 'ba', koreanSound: '바', row: 'バ', colIndex: 0, strokeCount: 4, baseChar: 'ハ', soundType: 'dakuon' },
      { char: 'ビ', romaji: 'bi', koreanSound: '비', row: 'バ', colIndex: 1, strokeCount: 4, baseChar: 'ヒ', soundType: 'dakuon' },
      { char: 'ブ', romaji: 'bu', koreanSound: '부', row: 'バ', colIndex: 2, strokeCount: 3, baseChar: 'フ', soundType: 'dakuon' },
      { char: 'ベ', romaji: 'be', koreanSound: '베', row: 'バ', colIndex: 3, strokeCount: 3, baseChar: 'ヘ', soundType: 'dakuon' },
      { char: 'ボ', romaji: 'bo', koreanSound: '보', row: 'バ', colIndex: 4, strokeCount: 6, baseChar: 'ホ', soundType: 'dakuon' },
    ]
  },
  {
    name: 'パ행 (pa - 반탁음)',
    chars: [
      { char: 'パ', romaji: 'pa', koreanSound: '파', row: 'パ', colIndex: 0, strokeCount: 3, baseChar: 'ハ', soundType: 'handakuon' },
      { char: 'ピ', romaji: 'pi', koreanSound: '피', row: 'パ', colIndex: 1, strokeCount: 3, baseChar: 'ヒ', soundType: 'handakuon' },
      { char: 'プ', romaji: 'pu', koreanSound: '푸', row: 'パ', colIndex: 2, strokeCount: 2, baseChar: 'フ', soundType: 'handakuon' },
      { char: 'ペ', romaji: 'pe', koreanSound: '페', row: 'パ', colIndex: 3, strokeCount: 2, baseChar: 'ヘ', soundType: 'handakuon' },
      { char: 'ポ', romaji: 'po', koreanSound: '포', row: 'パ', colIndex: 4, strokeCount: 5, baseChar: 'ホ', soundType: 'handakuon' },
    ]
  }
];

export const ALL_KATAKANA_DAKUON_CHARS: KatakanaChar[] = KATAKANA_DAKUON_GRID.flatMap((r) =>
  r.chars.filter((c): c is KatakanaChar => c !== null)
);

// ==========================================
// 3. 가타카나 요음 (36자 / 拗音)
// ==========================================
export const KATAKANA_YOUON_GRID: KatakanaRow[] = [
  {
    name: 'キャ행 (k-ya)',
    chars: [
      { char: 'キャ', romaji: 'kya', koreanSound: '캬', row: 'キャ', colIndex: 0, strokeCount: 5, baseChar: 'キ', smallChar: 'ャ', separateSound: 'キ・ヤ [키-야]', soundType: 'youon' },
      { char: 'キュ', romaji: 'kyu', koreanSound: '큐', row: 'キャ', colIndex: 1, strokeCount: 5, baseChar: 'キ', smallChar: 'ュ', separateSound: 'キ・ユ [키-유]', soundType: 'youon' },
      { char: 'キョ', romaji: 'kyo', koreanSound: '쿄', row: 'キャ', colIndex: 2, strokeCount: 6, baseChar: 'キ', smallChar: 'ョ', separateSound: 'キ・ヨ [키-요]', soundType: 'youon' },
    ]
  },
  {
    name: 'シャ행 (sh-ya)',
    chars: [
      { char: 'シャ', romaji: 'sha', koreanSound: '샤', row: 'シャ', colIndex: 0, strokeCount: 5, baseChar: 'シ', smallChar: 'ャ', separateSound: 'シ・ヤ [시-야]', soundType: 'youon' },
      { char: 'シュ', romaji: 'shu', koreanSound: '슈', row: 'シャ', colIndex: 1, strokeCount: 5, baseChar: 'シ', smallChar: 'ュ', separateSound: 'シ・ユ [시-유]', soundType: 'youon' },
      { char: 'ショ', romaji: 'sho', koreanSound: '쇼', row: 'シャ', colIndex: 2, strokeCount: 6, baseChar: 'シ', smallChar: 'ョ', separateSound: 'シ・ヨ [시-요]', soundType: 'youon' },
    ]
  },
  {
    name: 'チャ행 (ch-ya)',
    chars: [
      { char: 'チャ', romaji: 'cha', koreanSound: '차', row: 'チャ', colIndex: 0, strokeCount: 5, baseChar: 'チ', smallChar: 'ャ', separateSound: 'チ・ヤ [치-야]', soundType: 'youon' },
      { char: 'チュ', romaji: 'chu', koreanSound: '추', row: 'チャ', colIndex: 1, strokeCount: 5, baseChar: 'チ', smallChar: 'ュ', separateSound: 'チ・ユ [치-유]', soundType: 'youon' },
      { char: 'チョ', romaji: 'cho', koreanSound: '초', row: 'チャ', colIndex: 2, strokeCount: 6, baseChar: 'チ', smallChar: 'ョ', separateSound: 'チ・ヨ [치-요]', soundType: 'youon' },
    ]
  },
  {
    name: 'ニャ행 (n-ya)',
    chars: [
      { char: 'ニャ', romaji: 'nya', koreanSound: '냐', row: 'ニャ', colIndex: 0, strokeCount: 4, baseChar: 'ニ', smallChar: 'ャ', separateSound: 'ニ・ヤ [니-야]', soundType: 'youon' },
      { char: 'ニュ', romaji: 'nyu', koreanSound: '뉴', row: 'ニャ', colIndex: 1, strokeCount: 4, baseChar: 'ニ', smallChar: 'ュ', separateSound: 'ニ・ユ [니-유]', soundType: 'youon' },
      { char: 'ニョ', romaji: 'nyo', koreanSound: '뇨', row: 'ニャ', colIndex: 2, strokeCount: 5, baseChar: 'ニ', smallChar: 'ョ', separateSound: 'ニ・ヨ [니-요]', soundType: 'youon' },
    ]
  },
  {
    name: 'ヒャ행 (h-ya)',
    chars: [
      { char: 'ヒャ', romaji: 'hya', koreanSound: '햐', row: 'ヒャ', colIndex: 0, strokeCount: 4, baseChar: 'ヒ', smallChar: 'ャ', separateSound: 'ヒ・ヤ [히-야]', soundType: 'youon' },
      { char: 'ヒュ', romaji: 'hyu', koreanSound: '휴', row: 'ヒャ', colIndex: 1, strokeCount: 4, baseChar: 'ヒ', smallChar: 'ュ', separateSound: 'ヒ・ユ [히-유]', soundType: 'youon' },
      { char: 'ヒョ', romaji: 'hyo', koreanSound: '효', row: 'ヒャ', colIndex: 2, strokeCount: 5, baseChar: 'ヒ', smallChar: 'ョ', separateSound: 'ヒ・ヨ [히-요]', soundType: 'youon' },
    ]
  },
  {
    name: 'ミャ행 (m-ya)',
    chars: [
      { char: 'ミャ', romaji: 'mya', koreanSound: '먀', row: 'ミャ', colIndex: 0, strokeCount: 5, baseChar: 'ミ', smallChar: 'ャ', separateSound: 'ミ・ヤ [미-야]', soundType: 'youon' },
      { char: 'ミュ', romaji: 'myu', koreanSound: '뮤', row: 'ミャ', colIndex: 1, strokeCount: 5, baseChar: 'ミ', smallChar: 'ュ', separateSound: 'ミ・ユ [미-유]', soundType: 'youon' },
      { char: 'ミョ', romaji: 'myo', koreanSound: '묘', row: 'ミャ', colIndex: 2, strokeCount: 6, baseChar: 'ミ', smallChar: 'ョ', separateSound: 'ミ・ヨ [미-요]', soundType: 'youon' },
    ]
  },
  {
    name: 'リャ행 (r-ya)',
    chars: [
      { char: 'リャ', romaji: 'rya', koreanSound: '랴', row: 'リャ', colIndex: 0, strokeCount: 4, baseChar: 'リ', smallChar: 'ャ', separateSound: 'リ・ヤ [리-야]', soundType: 'youon' },
      { char: 'リュ', romaji: 'ryu', koreanSound: '류', row: 'リャ', colIndex: 1, strokeCount: 4, baseChar: 'リ', smallChar: 'ュ', separateSound: 'リ・ユ [리-유]', soundType: 'youon' },
      { char: 'リョ', romaji: 'ryo', koreanSound: '료', row: 'リャ', colIndex: 2, strokeCount: 5, baseChar: 'リ', smallChar: 'ョ', separateSound: 'リ・ヨ [리-요]', soundType: 'youon' },
    ]
  },
  {
    name: 'ギャ행 (g-ya)',
    chars: [
      { char: 'ギャ', romaji: 'gya', koreanSound: '갸', row: 'ギャ', colIndex: 0, strokeCount: 7, baseChar: 'ギ', smallChar: 'ャ', separateSound: 'ギ・ヤ [기-야]', soundType: 'youon' },
      { char: 'ギュ', romaji: 'gyu', koreanSound: '규', row: 'ギャ', colIndex: 1, strokeCount: 7, baseChar: 'ギ', smallChar: 'ュ', separateSound: 'ギ・ユ [기-유]', soundType: 'youon' },
      { char: 'ギョ', romaji: 'gyo', koreanSound: '교', row: 'ギャ', colIndex: 2, strokeCount: 8, baseChar: 'ギ', smallChar: 'ョ', separateSound: 'ギ・ヨ [기-요]', soundType: 'youon' },
    ]
  },
  {
    name: 'ジャ행 (j-ya)',
    chars: [
      { char: 'ジャ', romaji: 'ja', koreanSound: '자', row: 'ジャ', colIndex: 0, strokeCount: 7, baseChar: 'ジ', smallChar: 'ャ', separateSound: 'ジ・ヤ [지-야]', soundType: 'youon' },
      { char: 'ジュ', romaji: 'ju', koreanSound: '주', row: 'ジャ', colIndex: 1, strokeCount: 7, baseChar: 'ジ', smallChar: 'ュ', separateSound: 'ジ・ユ [지-유]', soundType: 'youon' },
      { char: 'ジョ', romaji: 'jo', koreanSound: '조', row: 'ジャ', colIndex: 2, strokeCount: 8, baseChar: 'ジ', smallChar: 'ョ', separateSound: 'ジ・ヨ [지-요]', soundType: 'youon' },
    ]
  },
  {
    name: 'ビャ행 (b-ya)',
    chars: [
      { char: 'ビャ', romaji: 'bya', koreanSound: '뱌', row: 'ビャ', colIndex: 0, strokeCount: 6, baseChar: 'ビ', smallChar: 'ャ', separateSound: 'ビ・ヤ [비-야]', soundType: 'youon' },
      { char: 'ビュ', romaji: 'byu', koreanSound: '뷰', row: 'ビャ', colIndex: 1, strokeCount: 6, baseChar: 'ビ', smallChar: 'ュ', separateSound: 'ビ・ユ [비-유]', soundType: 'youon' },
      { char: 'ビョ', romaji: 'byo', koreanSound: '뵤', row: 'ビャ', colIndex: 2, strokeCount: 7, baseChar: 'ビ', smallChar: 'ョ', separateSound: 'ビ・ヨ [비-요]', soundType: 'youon' },
    ]
  },
  {
    name: 'ピャ행 (p-ya)',
    chars: [
      { char: 'ピャ', romaji: 'pya', koreanSound: '퍄', row: 'ピャ', colIndex: 0, strokeCount: 5, baseChar: 'ピ', smallChar: 'ャ', separateSound: 'ピ・ヤ [피-야]', soundType: 'youon' },
      { char: 'ピュ', romaji: 'pyu', koreanSound: '퓨', row: 'ピャ', colIndex: 1, strokeCount: 5, baseChar: 'ピ', smallChar: 'ュ', separateSound: 'ピ・ユ [피-유]', soundType: 'youon' },
      { char: 'ピョ', romaji: 'pyo', koreanSound: '표', row: 'ピャ', colIndex: 2, strokeCount: 6, baseChar: 'ピ', smallChar: 'ョ', separateSound: 'ピ・ヨ [피-요]', soundType: 'youon' },
    ]
  }
];

export const ALL_KATAKANA_YOUON_CHARS: KatakanaChar[] = KATAKANA_YOUON_GRID.flatMap((r) =>
  r.chars.filter((c): c is KatakanaChar => c !== null)
);

// ==========================================
// 4. 외래어 특수음 (12자 / 外来語の特殊音)
// ==========================================
// 현대 일본어 메뉴판, 브랜드, 외래어 표기에 필수적인 글자들
export const KATAKANA_SPECIAL_GRID: KatakanaRow[] = [
  {
    name: '티/디 계열 (t/d)',
    chars: [
      { char: 'ティ', romaji: 'ti', koreanSound: '티', row: 'ティ', colIndex: 0, strokeCount: 5, baseChar: 'テ', smallChar: 'ィ', soundTip: '티(Tea), 파티(パーティー) 등에 사용', soundType: 'special' },
      { char: 'ディ', romaji: 'di', koreanSound: '디', row: 'ディ', colIndex: 1, strokeCount: 7, baseChar: 'デ', smallChar: 'ィ', soundTip: '디스코, 디너(ディナー) 등에 사용', soundType: 'special' },
      { char: 'トゥ', romaji: 'tu', koreanSound: '투', row: 'トゥ', colIndex: 2, strokeCount: 6, baseChar: 'ト', smallChar: 'ゥ', soundTip: '투어, 투스 등에 사용', soundType: 'special' },
    ]
  },
  {
    name: '파/피/페/포 계열 (f)',
    chars: [
      { char: 'ファ', romaji: 'fa', koreanSound: '파', row: 'ファ', colIndex: 0, strokeCount: 3, baseChar: 'フ', smallChar: 'ァ', soundTip: '패션(ファッション), 파이팅 등에 사용', soundType: 'special' },
      { char: 'フィ', romaji: 'fi', koreanSound: '피', row: 'フィ', colIndex: 1, strokeCount: 3, baseChar: 'フ', smallChar: 'ィ', soundTip: '필름, 피쉬(フィッシュ) 등에 사용', soundType: 'special' },
      { char: 'フェ', romaji: 'fe', koreanSound: '페', row: 'フェ', colIndex: 2, strokeCount: 4, baseChar: 'フ', smallChar: 'ェ', soundTip: '카페(カフェ), 페스티벌 등에 사용', soundType: 'special' },
      { char: 'フォ', romaji: 'fo', koreanSound: '포', row: 'フォ', colIndex: 3, strokeCount: 4, baseChar: 'フ', smallChar: 'ォ', soundTip: '포크(フォーク), 포토 등에 사용', soundType: 'special' },
    ]
  },
  {
    name: '위/웨/워/체/제 계열',
    chars: [
      { char: 'ウィ', romaji: 'wi', koreanSound: '위', row: 'ウィ', colIndex: 0, strokeCount: 5, baseChar: 'ウ', smallChar: 'ィ', soundTip: '위스키(ウイスキー) 등에 사용', soundType: 'special' },
      { char: 'ウェ', romaji: 'we', koreanSound: '웨', row: 'ウェ', colIndex: 1, strokeCount: 6, baseChar: 'ウ', smallChar: 'ェ', soundTip: '웨이터, 웨딩 등에 사용', soundType: 'special' },
      { char: 'ウォ', romaji: 'wo', koreanSound: '워', row: 'ウォ', colIndex: 2, strokeCount: 6, baseChar: 'ウ', smallChar: 'ォ', soundTip: '워터(ウォーター) 등에 사용', soundType: 'special' },
      { char: 'チェ', romaji: 'che', koreanSound: '체', row: 'チェ', colIndex: 3, strokeCount: 6, baseChar: 'チ', smallChar: 'ェ', soundTip: '체크(チェック) 등에 사용', soundType: 'special' },
      { char: 'ジェ', romaji: 'je', koreanSound: '제', row: 'ジェ', colIndex: 4, strokeCount: 8, baseChar: 'ジ', smallChar: 'ェ', soundTip: '젤라또, 제트기 등에 사용', soundType: 'special' },
    ]
  }
];

export const ALL_KATAKANA_SPECIAL_CHARS: KatakanaChar[] = KATAKANA_SPECIAL_GRID.flatMap((r) =>
  r.chars.filter((c): c is KatakanaChar => c !== null)
);

// 전체 가타카나 모음 (청음 + 탁음 + 요음 + 특수음)
export const ALL_KATAKANA_CHARS: KatakanaChar[] = [
  ...ALL_KATAKANA_SEION_CHARS,
  ...ALL_KATAKANA_DAKUON_CHARS,
  ...ALL_KATAKANA_YOUON_CHARS,
  ...ALL_KATAKANA_SPECIAL_CHARS
];

// ==========================================
// 5. 헷갈리는 가타카나 쌍 (도플갱어 글자)
// ==========================================
export const CONFUSING_KATAKANA_PAIRS: ConfusingKatakanaPair[] = [
  {
    id: 'shi-vs-tsu',
    title: '시(シ) vs 츠(ツ)',
    shortTitle: '시(シ) vs 츠(ツ)',
    char1: {
      char: 'シ',
      romaji: 'shi',
      korean: '시',
      feature: '밑에서 위로 쓱! 치켜올려 쓰는 획',
      strokeDirection: '좌하단 ➔ 우상단 (↗ 방향 치켜올림)',
      mnemonic: '앞의 두 점이 세로로 눕고, 마지막 획이 아래에서 위로 "시원하게" 올라갑니다.'
    },
    char2: {
      char: 'ツ',
      romaji: 'tsu',
      korean: '츠',
      feature: '위에서 아래로 팍! 내리꽂는 획',
      strokeDirection: '우상단 ➔ 좌하단 (↙ 방향 내리꽂음)',
      mnemonic: '단정한 셔츠 칼라의 단추 2개와 아래로 떨어지는 앞섶 라인처럼, 위에서 아래로(↙) 내리꽂힙니다.'
    },
    tip: '시(シ)는 히라가나 し처럼 둥글게 치켜올리고, 츠(ツ)는 히라가나 つ처럼 위에서부터 시작해 내리끕니다.'
  },
  {
    id: 'so-vs-n',
    title: '소(ソ) vs 응(ン)',
    shortTitle: '소(ソ) vs 응(ン)',
    char1: {
      char: 'ソ',
      romaji: 'so',
      korean: '소',
      feature: '위에서 아래로 가파르게 내리꽂음',
      strokeDirection: '우상단 ➔ 좌하단 (가파른 빗금 ↙)',
      mnemonic: '첫 번째 점이 꼿꼿이 서 있고, 긴 획이 황소의 날렵한 "소뿔"처럼 뻗어 있습니다.'
    },
    char2: {
      char: 'ン',
      romaji: 'n',
      korean: '응(받침)',
      feature: '아래에서 위로 완만하게 퍼올림',
      strokeDirection: '좌하단 ➔ 우상단 (완만한 빗금 ↗)',
      mnemonic: '첫 번째 점이 옆으로 눕고, 긴 획이 바닥에서 위로 "응차!" 하고 퍼올려집니다.'
    },
    tip: '소(ソ)는 츠(ツ)와 친구(위에서 아래), 응(ン)은 시(シ)와 친구(아래에서 위)입니다!'
  },
  {
    id: 'a-vs-ma',
    title: '아(ア) vs 마(マ)',
    shortTitle: '아(ア) vs 마(マ)',
    char1: {
      char: 'ア',
      romaji: 'a',
      korean: '아',
      feature: '꺾임선 아래로 긴 세로 삐침',
      strokeDirection: '가로 꺾임 ➔ 왼쪽 삐침',
      mnemonic: '위쪽에 모서리가 있고 아래로 길게 삐칩니다.'
    },
    char2: {
      char: 'マ',
      romaji: 'ma',
      korean: '마',
      feature: '꺾임선 밑에 대각선 받침 점',
      strokeDirection: '가로 꺾임 ➔ 우하단 짧은 점',
      mnemonic: '끝이 삐치지 않고 짧은 점으로 맺어집니다 (마침표).'
    },
    tip: '아(ア)는 밖으로 삐치고, 마(マ)는 안으로 점을 찍습니다.'
  },
  {
    id: 'nu-vs-su',
    title: '누(ヌ) vs 스(ス)',
    shortTitle: '누(ヌ) vs 스(ス)',
    char1: {
      char: 'ヌ',
      romaji: 'nu',
      korean: '누',
      feature: '두 획이 교차하여 오른쪽으로 점이 삐침',
      strokeDirection: '꺾임 ➔ 교차 빗금 점',
      mnemonic: '또 우(又) 한자처럼 두 선이 겹쳐 누워있습니다.'
    },
    char2: {
      char: 'ス',
      romaji: 'su',
      korean: '스',
      feature: '숫자 7 밑으로 한 줄기 선만 삐침',
      strokeDirection: '꺾임 ➔ 단일 삐침',
      mnemonic: '스피드하게 심플한 형태! 교차점이 없습니다.'
    },
    tip: '교차하여 점이 있으면 누(ヌ), 단순 7 모양이면 스(ス)입니다.'
  }
];

// ==========================================
// 6. 히라가나 ⇄ 가타카나 짝맞추기 게임용 데이터
// ==========================================
export const KATAKANA_MATCH_PAIRS: KatakanaMatchPair[] = [
  { id: 'pair-a', hiragana: 'あ', katakana: 'ア', romaji: 'a', korean: '아' },
  { id: 'pair-i', hiragana: 'い', katakana: 'イ', romaji: 'i', korean: '이' },
  { id: 'pair-u', hiragana: 'う', katakana: 'ウ', romaji: 'u', korean: '우' },
  { id: 'pair-e', hiragana: 'え', katakana: 'エ', romaji: 'e', korean: '에' },
  { id: 'pair-o', hiragana: 'お', katakana: 'オ', romaji: 'o', korean: '오' },
  { id: 'pair-ka', hiragana: 'か', katakana: 'カ', romaji: 'ka', korean: '카' },
  { id: 'pair-ki', hiragana: 'き', katakana: 'キ', romaji: 'ki', korean: '키' },
  { id: 'pair-ku', hiragana: 'く', katakana: 'ク', romaji: 'ku', korean: '쿠' },
  { id: 'pair-ke', hiragana: 'け', katakana: 'ケ', romaji: 'ke', korean: '케' },
  { id: 'pair-ko', hiragana: 'こ', katakana: 'コ', romaji: 'ko', korean: '코' },
  { id: 'pair-sa', hiragana: 'さ', katakana: 'サ', romaji: 'sa', korean: '사' },
  { id: 'pair-shi', hiragana: 'し', katakana: 'シ', romaji: 'shi', korean: '시' },
  { id: 'pair-su', hiragana: 'す', katakana: 'ス', romaji: 'su', korean: '스' },
  { id: 'pair-se', hiragana: 'せ', katakana: 'セ', romaji: 'se', korean: '세' },
  { id: 'pair-so', hiragana: 'そ', katakana: 'ソ', romaji: 'so', korean: '소' },
  { id: 'pair-ta', hiragana: 'た', katakana: 'タ', romaji: 'ta', korean: '타' },
  { id: 'pair-chi', hiragana: 'ち', katakana: 'チ', romaji: 'chi', korean: '치' },
  { id: 'pair-tsu', hiragana: 'つ', katakana: 'ツ', romaji: 'tsu', korean: '츠' },
  { id: 'pair-te', hiragana: 'て', katakana: 'テ', romaji: 'te', korean: '테' },
  { id: 'pair-to', hiragana: 'と', katakana: 'ト', romaji: 'to', korean: '토' },
  { id: 'pair-na', hiragana: 'な', katakana: 'ナ', romaji: 'na', korean: '나' },
  { id: 'pair-ni', hiragana: 'に', katakana: 'ニ', romaji: 'ni', korean: '니' },
  { id: 'pair-nu', hiragana: 'ぬ', katakana: 'ヌ', romaji: 'nu', korean: '누' },
  { id: 'pair-ne', hiragana: 'ね', katakana: 'ネ', romaji: 'ne', korean: '네' },
  { id: 'pair-no', hiragana: 'の', katakana: 'ノ', romaji: 'no', korean: '노' },
  { id: 'pair-ha', hiragana: 'は', katakana: 'ハ', romaji: 'ha', korean: '하' },
  { id: 'pair-hi', hiragana: 'ひ', katakana: 'ヒ', romaji: 'hi', korean: '히' },
  { id: 'pair-fu', hiragana: 'ふ', katakana: 'フ', romaji: 'fu', korean: '후' },
  { id: 'pair-he', hiragana: 'へ', katakana: 'ヘ', romaji: 'he', korean: '헤' },
  { id: 'pair-ho', hiragana: 'ほ', katakana: 'ホ', romaji: 'ho', korean: '호' },
  { id: 'pair-ma', hiragana: 'ま', katakana: 'マ', romaji: 'ma', korean: '마' },
  { id: 'pair-mi', hiragana: 'み', katakana: 'ミ', romaji: 'mi', korean: '미' },
  { id: 'pair-mu', hiragana: 'む', katakana: 'ム', romaji: 'mu', korean: '무' },
  { id: 'pair-me', hiragana: 'め', katakana: 'メ', romaji: 'me', korean: '메' },
  { id: 'pair-mo', hiragana: 'も', katakana: 'モ', romaji: 'mo', korean: '모' },
  { id: 'pair-ya', hiragana: 'や', katakana: 'ヤ', romaji: 'ya', korean: '야' },
  { id: 'pair-yu', hiragana: 'ゆ', katakana: 'ユ', romaji: 'yu', korean: '유' },
  { id: 'pair-yo', hiragana: 'よ', katakana: 'ヨ', romaji: 'yo', korean: '요' },
  { id: 'pair-ra', hiragana: 'ら', katakana: 'ラ', romaji: 'ra', korean: '라' },
  { id: 'pair-ri', hiragana: 'り', katakana: 'リ', romaji: 'ri', korean: '리' },
  { id: 'pair-ru', hiragana: 'る', katakana: 'ル', romaji: 'ru', korean: '루' },
  { id: 'pair-re', hiragana: 'れ', katakana: 'レ', romaji: 're', korean: '레' },
  { id: 'pair-ro', hiragana: 'ろ', katakana: 'ロ', romaji: 'ro', korean: '로' },
  { id: 'pair-wa', hiragana: 'わ', katakana: 'ワ', romaji: 'wa', korean: '와' },
  { id: 'pair-n', hiragana: 'ん', katakana: 'ン', romaji: 'n', korean: '응' },
];

// ==========================================
// 7. 여행 실전 외래어 단어장 (38선)
// ==========================================
export const KATAKANA_TRAVEL_WORDS: KatakanaTravelWord[] = [
  // --- 카페 & 음료 (cafe) ---
  {
    id: 'tw-coffee',
    japanese: 'コーヒー',
    hiraganaReading: 'こーひー',
    romaji: 'kōhī',
    koreanMeaning: '커피',
    koreanPronunciation: '코-히-',
    emoji: '☕',
    category: 'cafe',
    travelTip: '장음 기호(ー)를 길게 늘여 발음해요. 차가운 것은 앞에 아이스(アイス)를 붙여 "아이스 코-히-"라고 합니다.'
  },
  {
    id: 'tw-cafelatte',
    japanese: 'カフェラテ',
    hiraganaReading: 'かふぇらて',
    romaji: 'kaferate',
    koreanMeaning: '카페라테',
    koreanPronunciation: '카페라테',
    emoji: '🥛',
    category: 'cafe',
    travelTip: '외래어 특수음 フェ(페)가 들어간 대표 단어예요. 보통 핫(ホット) 또는 아이스(アイス)를 선택합니다.'
  },
  {
    id: 'tw-juice',
    japanese: 'ジュース',
    hiraganaReading: 'じゅーす',
    romaji: 'jūsu',
    koreanMeaning: '주스',
    koreanPronunciation: '쥬-스',
    emoji: '🧃',
    category: 'cafe',
    travelTip: '과일 주스 전반을 부르며, 오렌지 주스는 "오렌지 쥬-스(オレンジジュース)"입니다.'
  },
  {
    id: 'tw-tea',
    japanese: 'ミルクティー',
    hiraganaReading: 'みるくてぃー',
    romaji: 'mirukutī',
    koreanMeaning: '밀크티',
    koreanPronunciation: '미루쿠티-',
    emoji: '🧋',
    category: 'cafe',
    travelTip: '특수음 ティ(티)가 들어가며, 편의점 인기 음료인 오후의 홍차(午後の紅茶) 주문 때 자주 씁니다.'
  },
  {
    id: 'tw-ice',
    japanese: 'アイスクリーム',
    hiraganaReading: 'あいすくりーむ',
    romaji: 'aisukurīmu',
    koreanMeaning: '아이스크림',
    koreanPronunciation: '아이스쿠리-무',
    emoji: '🍦',
    category: 'cafe',
    travelTip: '줄여서 단순히 "아이스(アイス)"라고 부르기도 합니다.'
  },
  {
    id: 'tw-cake',
    japanese: 'ケーキ',
    hiraganaReading: 'けーき',
    romaji: 'kēki',
    koreanMeaning: '케이크',
    koreanPronunciation: '케-키',
    emoji: '🍰',
    category: 'cafe',
    travelTip: '디저트 카페나 베이커리에서 쇼트케이크(ショートケーキ) 등을 고를 때 씁니다.'
  },

  // --- 식당 & 주문 (food) ---
  {
    id: 'tw-beer',
    japanese: 'ビール',
    hiraganaReading: 'びーる',
    romaji: 'bīru',
    koreanMeaning: '맥주',
    koreanPronunciation: '비-루',
    emoji: '🍺',
    category: 'food',
    travelTip: '이자카야 첫 주문 국룰! "나마비-루 히토츠 쿠다사이(生ビールひとつください, 생맥주 하나 주세요)"'
  },
  {
    id: 'tw-ramen',
    japanese: 'ラーメン',
    hiraganaReading: 'らーめん',
    romaji: 'rāmen',
    koreanMeaning: '라멘',
    koreanPronunciation: '라-멘',
    emoji: '🍜',
    category: 'food',
    travelTip: '일본 대표 면 요리. 돈코츠(とんこつ), 소유(しょうゆ), 미소(みそ) 라멘이 있어요.'
  },
  {
    id: 'tw-menu',
    japanese: 'メニュー',
    hiraganaReading: 'めにゅー',
    romaji: 'menyū',
    koreanMeaning: '메뉴판',
    koreanPronunciation: '메뉴-',
    emoji: '📜',
    category: 'food',
    travelTip: '식당 착석 후 "메뉴- 오네가이시마스(メニューお願いします, 메뉴판 부탁드립니다)"'
  },
  {
    id: 'tw-spoon',
    japanese: 'スプーン',
    hiraganaReading: 'すぷーん',
    romaji: 'supūn',
    koreanMeaning: '숟가락 / 스푼',
    koreanPronunciation: '스푸-응',
    emoji: '🥄',
    category: 'food',
    travelTip: '국물 요리나 디저트 먹을 때 추가로 요청할 수 있어요.'
  },
  {
    id: 'tw-fork',
    japanese: 'フォーク',
    hiraganaReading: 'ふぉーく',
    romaji: 'fōku',
    koreanMeaning: '포크',
    koreanPronunciation: '포-쿠',
    emoji: '🍴',
    category: 'food',
    travelTip: '특수음 フォ(포)가 사용된 대표 단어로 젓가락이 불편할 때 부탁해보세요.'
  },
  {
    id: 'tw-set',
    japanese: 'セット',
    hiraganaReading: 'せっと',
    romaji: 'setto',
    koreanMeaning: '세트 (정식 메뉴)',
    koreanPronunciation: '셋토',
    emoji: '🍱',
    category: 'food',
    travelTip: '단품보다 밥과 장국이 함께 나오는 세트 메뉴를 주문할 때 유용해요.'
  },
  {
    id: 'tw-pasta',
    japanese: 'パスタ',
    hiraganaReading: 'ぱすた',
    romaji: 'pasuta',
    koreanMeaning: '파스타',
    koreanPronunciation: '파스타',
    emoji: '🍝',
    category: 'food',
    travelTip: '양식당이나 패밀리 레스토랑의 대표 인기 메뉴예요.'
  },
  {
    id: 'tw-pizza',
    japanese: 'ピザ',
    hiraganaReading: 'ぴざ',
    romaji: 'piza',
    koreanMeaning: '피자',
    koreanPronunciation: '피자',
    emoji: '🍕',
    category: 'food',
    travelTip: '반탁음 ピ(피)와 탁음 ザ(자)가 결합된 단어입니다.'
  },

  // --- 편의점 & 쇼핑 (convenience / shopping) ---
  {
    id: 'tw-konbini',
    japanese: 'コンビニ',
    hiraganaReading: 'こんびに',
    romaji: 'konbini',
    koreanMeaning: '편의점 (콘비니)',
    koreanPronunciation: '콘비니',
    emoji: '🏪',
    category: 'convenience',
    travelTip: 'Convenience store의 일본식 줄임말. 로손, 세븐일레븐, 패밀리마트가 대표적입니다.'
  },
  {
    id: 'tw-receipt',
    japanese: 'レシート',
    hiraganaReading: 'れしーと',
    romaji: 'reshīto',
    koreanMeaning: '영수증',
    koreanPronunciation: '레시-토',
    emoji: '🧾',
    category: 'convenience',
    travelTip: '계산대에서 직원이 "레시-토와 이리카마스카?(영수증 필요하세요?)"라고 물어봅니다.'
  },
  {
    id: 'tw-bag',
    japanese: 'レジ袋', // 레지부쿠로 (봉투) - 가타카나 단독인 'ビニール袋' 또는 'バック'
    hiraganaReading: 'れじぶくろ',
    romaji: 'reji-bukuro',
    koreanMeaning: '비닐봉지 (봉투)',
    koreanPronunciation: '레지부쿠로',
    emoji: '🛍️',
    category: 'convenience',
    travelTip: '계산대(레지) 봉투. 유료이므로 필요할 때 "레지부쿠로 오네가이시마스"라고 말해요.'
  },
  {
    id: 'tw-size',
    japanese: 'サイズ',
    hiraganaReading: 'さいず',
    romaji: 'saizu',
    koreanMeaning: '사이즈 (크기)',
    koreanPronunciation: '사이즈',
    emoji: '📏',
    category: 'shopping',
    travelTip: 'S, M, L 옷이나 음료 컵 크기를 고를 때 자주 확인하는 단어예요.'
  },
  {
    id: 'tw-sale',
    japanese: 'セール',
    hiraganaReading: 'せーる',
    romaji: 'sēru',
    koreanMeaning: '세일 (할인)',
    koreanPronunciation: '세-루',
    emoji: '🏷️',
    category: 'shopping',
    travelTip: '백화점이나 쇼핑몰 간판에 빨간색으로 크게 적혀 있는 쇼핑 필수 단어!'
  },
  {
    id: 'tw-passport',
    japanese: 'パスポート',
    hiraganaReading: 'ぱすぽーと',
    romaji: 'pasupōto',
    koreanMeaning: '여권 (패스포트)',
    koreanPronunciation: '파스포-토',
    emoji: '🛂',
    category: 'shopping',
    travelTip: '면세(Tax Free) 혜택을 받을 때 "파스포-토 오네가이시마스(여권 부탁드립니다)"에 제시합니다.'
  },
  {
    id: 'tw-card',
    japanese: 'カード',
    hiraganaReading: 'かーど',
    romaji: 'kādo',
    koreanMeaning: '카드 (신용카드)',
    koreanPronunciation: '카-도',
    emoji: '💳',
    category: 'shopping',
    travelTip: '"카-도데 하라이마스(카드로 결제할게요)"'
  },

  // --- 교통 & 호텔 (travel) ---
  {
    id: 'tw-hotel',
    japanese: 'ホテル',
    hiraganaReading: 'ほてる',
    romaji: 'hoteru',
    koreanMeaning: '호텔',
    koreanPronunciation: '호테루',
    emoji: '🏨',
    category: 'travel',
    travelTip: '체크인(チェックイン)과 체크아웃(チェックアウト) 때 안내 데스크에서 씁니다.'
  },
  {
    id: 'tw-bus',
    japanese: 'バス',
    hiraganaReading: 'ばす',
    romaji: 'basu',
    koreanMeaning: '버스',
    koreanPronunciation: '바스',
    emoji: '🚌',
    category: 'travel',
    travelTip: '버스 터미널은 "바스 타-미나루(バスターミナル)"입니다.'
  },
  {
    id: 'tw-taxi',
    japanese: 'タクシー',
    hiraganaReading: 'たくしー',
    romaji: 'takushī',
    koreanMeaning: '택시',
    koreanPronunciation: '타쿠시-',
    emoji: '🚕',
    category: 'travel',
    travelTip: '일본 택시는 문이 자동으로 열리고 닫히니 직접 손잡이를 잡지 않아도 돼요.'
  },
  {
    id: 'tw-toilet',
    japanese: 'トイレ',
    hiraganaReading: 'といれ',
    romaji: 'toire',
    koreanMeaning: '화장실 (토일렛)',
    koreanPronunciation: '토이레',
    emoji: '🚻',
    category: 'travel',
    travelTip: '가장 급할 때 필수! "토이레와 도코데스카?(トイレはどこですか, 화장실은 어디인가요?)"'
  },
  {
    id: 'tw-ticket',
    japanese: 'チケット',
    hiraganaReading: 'ちけっと',
    romaji: 'chiketto',
    koreanMeaning: '티켓 (입장권/승차권)',
    koreanPronunciation: '치켓토',
    emoji: '🎟️',
    category: 'travel',
    travelTip: '전망대, 공연, 테마파크 매표소에서 사용되는 외래어입니다.'
  },
  {
    id: 'tw-elevator',
    japanese: 'エレベーター',
    hiraganaReading: 'えれべーたー',
    romaji: 'erebētā',
    koreanMeaning: '엘리베이터',
    koreanPronunciation: '에레베-타-',
    emoji: '🛗',
    category: 'travel',
    travelTip: '지하철역이나 백화점에서 휠체어/캐리어 이동 시 안내판을 찾을 때 확인하세요.'
  },
  {
    id: 'tw-escalator',
    japanese: 'エスカレーター',
    hiraganaReading: 'えすかれーたー',
    romaji: 'esukarētā',
    koreanMeaning: '에스컬레이터',
    koreanPronunciation: '에스카레-타-',
    emoji: '🪜',
    category: 'travel',
    travelTip: '도쿄는 왼쪽에 서고 오사카/간사이는 오른쪽에 서는 문화가 있습니다.'
  },
  {
    id: 'tw-wifi',
    japanese: 'ワイファイ',
    hiraganaReading: 'わいふぁい',
    romaji: 'waifai',
    koreanMeaning: '와이파이 (Wi-Fi)',
    koreanPronunciation: '와이파이',
    emoji: '📶',
    category: 'travel',
    travelTip: '카페나 호텔에서 "와이파이노 파스와-도와 난데스카?(비밀번호는 무엇인가요?)"'
  },
  {
    id: 'tw-camera',
    japanese: 'カメラ',
    hiraganaReading: 'かめら',
    romaji: 'kamera',
    koreanMeaning: '카메라',
    koreanPronunciation: '카메라',
    emoji: '📷',
    category: 'travel',
    travelTip: '사진을 부탁할 때 요긴해요.'
  }
];

// 음성 발음 재생 헬퍼 (Web Speech API)
export function playKatakanaAudio(text: string) {
  if (typeof window === 'undefined') return;
  const synth = window.speechSynthesis;
  if (!synth) return;

  synth.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ja-JP';
  utterance.rate = 0.85; // 입문자용 적정 속도
  synth.speak(utterance);
}
