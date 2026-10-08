export interface KatakanaMnemonicItem {
  char: string;
  word: string;
  highlightIndex: number;
  romaji: string;
  reuseNote?: string; // 히라가나와 형태가 유사하여 모티브를 재사용한 경우 설명
  tip?: string;
}

export interface KatakanaMnemonicSvgChildProps {
  char: string;
  fontFamily: string;
}

export const KATAKANA_MNEMONIC_DATA: Record<string, KatakanaMnemonicItem> = {
  // ア행
  ア: { char: 'ア', word: '아이스크림', highlightIndex: 0, romaji: 'a', tip: '아이스크림 콘의 뾰족한 각 모서리' },
  イ: { char: 'イ', word: '이젤', highlightIndex: 0, romaji: 'i', tip: '화가의 이젤(Easel) 다리와 붓' },
  ウ: { char: 'ウ', word: '우주선', highlightIndex: 0, romaji: 'u', tip: '우주선 상단 안테나와 지붕' },
  エ: { char: 'エ', word: '에ㄹ리베이터', highlightIndex: 0, romaji: 'e', tip: '에ㄹ리베이터 문 / 건축 H빔' },
  オ: { char: 'オ', word: '오토바이', highlightIndex: 0, romaji: 'o', tip: '오토바이 라이더의 핸들과 발' },

  // カ행
  カ: { char: 'カ', word: '카메라', highlightIndex: 0, romaji: 'ka', reuseNote: '히라가나 か에서 점(・)만 빠진 동일 형태', tip: '카메라 셔터 버튼과 사각 프레임' },
  キ: { char: 'キ', word: '키 (열쇠)', highlightIndex: 0, romaji: 'ki', reuseNote: '히라가나 き의 상단과 동일한 황금 열쇠', tip: '열쇠(Key)의 2개 톱니와 곧은 축' },
  ク: { char: 'ク', word: '쿠키', highlightIndex: 0, romaji: 'ku', tip: '한 입 베어 문 각진 7자 쿠키 조각' },
  ケ: { char: 'ケ', word: '케이크', highlightIndex: 0, romaji: 'ke', tip: '케이크를 자르는 각진 나이프 라인' },
  コ: { char: 'コ', word: '코너', highlightIndex: 0, romaji: 'ko', tip: '직각으로 꺾인 길모퉁이 코너(Corner)' },

  // サ행
  サ: { char: 'サ', word: '선인장(사보텐)', highlightIndex: 4, romaji: 'sa', tip: '사막의 십자 선인장(사보텐) 가지' },
  シ: { char: 'シ', word: '시원한 파도', highlightIndex: 0, romaji: 'shi', tip: '★ 아래에서 위로 치솟는 시원한 파도 (윙크)' },
  ス: { char: 'ス', word: '스케이트', highlightIndex: 0, romaji: 'su', tip: '빙판을 지치는 스케이트 날의 꺾임' },
  セ: { char: 'セ', word: '세면대', highlightIndex: 0, romaji: 'se', reuseNote: '히라가나 せ가 직선화된 동일 형태', tip: '세면대 수도꼭지와 물받이 수조' },
  ソ: { char: 'ソ', word: '소나기', highlightIndex: 0, romaji: 'so', tip: '★ 하늘에서 아래로 내리꽂히는 소나기 줄기' },

  // タ행
  タ: { char: 'タ', word: '타조', highlightIndex: 0, romaji: 'ta', tip: '타조의 쫑긋한 머리와 쭉 뻗은 다리' },
  チ: { char: 'チ', word: '치어리더', highlightIndex: 0, romaji: 'chi', tip: '치어리더가 손을 들고 폼폼을 쥔 모습' },
  ツ: { char: 'ツ', word: '츠나미(침)', highlightIndex: 0, romaji: 'tsu', tip: '★ 위에서 아래로 츠(투!) 침 뱉듯 내리꽂히는 물방울' },
  テ: { char: 'テ', word: '테이블', highlightIndex: 0, romaji: 'te', tip: '테이블(Table) 상판과 중앙 받침대' },
  ト: { char: 'ト', word: '토템폴', highlightIndex: 0, romaji: 'to', tip: '곧게 솟은 기둥에 가지가 뻗은 토템폴' },

  // ナ행
  ナ: { char: 'ナ', word: '나이프', highlightIndex: 0, romaji: 'na', tip: '손잡이와 비스듬한 날을 지닌 나이프(Knife)' },
  ニ: { char: 'ニ', word: '니트', highlightIndex: 0, romaji: 'ni', reuseNote: '히라가나 に의 오른쪽 두 가로선과 동일', tip: '니트(Knit) 스웨터의 두 줄 스트라이프' },
  ヌ: { char: 'ヌ', word: '누들', highlightIndex: 0, romaji: 'nu', tip: '젓가락으로 건져 올린 누들(Noodles) 면발' },
  ネ: { char: 'ネ', word: '넥타이', highlightIndex: 0, romaji: 'ne', tip: '셔츠 깃에 단정하게 맨 넥타이(Necktie)' },
  ノ: { char: 'ノ', word: '노 (슬래시)', highlightIndex: 0, romaji: 'no', tip: '배를 젓는 노(Oar)의 날렵한 삐침선' },

  // ハ행
  ハ: { char: 'ハ', word: '하하하 (웃음)', highlightIndex: 0, romaji: 'ha', tip: '하하하 웃을 때 팔자(八)로 올라간 눈썹/수염' },
  ヒ: { char: 'ヒ', word: '히어로', highlightIndex: 0, romaji: 'hi', tip: '망토를 두르고 서 있는 히어로(Hero)' },
  フ: { char: 'フ', word: '후크', highlightIndex: 0, romaji: 'fu', tip: '갈고리 모양의 후크(Hook) 선장 손' },
  ヘ: { char: 'ヘ', word: '헤엄', highlightIndex: 0, romaji: 'he', reuseNote: '히라가나 へ와 100% 동일한 형태', tip: '물살을 가르며 하이 엘보로 헤엄치는 팔' },
  ホ: { char: 'ホ', word: '호롱불', highlightIndex: 0, romaji: 'ho', tip: '스탠드 기둥과 양옆 받침대가 있는 호롱불' },

  // マ행
  マ: { char: 'マ', word: '마이크', highlightIndex: 0, romaji: 'ma', tip: '스탠드에 비스듬히 꽂힌 마이크(Microphone)' },
  ミ: { char: 'ミ', word: '미사일', highlightIndex: 0, romaji: 'mi', tip: '나란히 날아가는 3발의 미사일(Missile)' },
  ム: { char: 'ム', word: '무스케이크', highlightIndex: 0, romaji: 'mu', tip: '삼각형으로 자른 달콤한 무스케이크' },
  メ: { char: 'メ', word: '메모 (체크)', highlightIndex: 0, romaji: 'me', tip: '메모지에 사선으로 쓱 그은 체크(X) 표시' },
  モ: { char: 'モ', word: '모기', highlightIndex: 0, romaji: 'mo', reuseNote: '히라가나 も가 직선화된 동일 형태', tip: '모기의 침과 다리가 뻗은 모티브' },

  // ヤ행
  ヤ: { char: 'ヤ', word: '야구', highlightIndex: 0, romaji: 'ya', reuseNote: '히라가나 や가 각지게 직선화된 동일 형태', tip: '홈플레이트에 비스듬히 세운 야구 배트' },
  ユ: { char: 'ユ', word: '유턴', highlightIndex: 0, romaji: 'yu', tip: '도로의 직각 유턴(U-Turn) 회전 화살표' },
  ヨ: { char: 'ヨ', word: '요트', highlightIndex: 0, romaji: 'yo', tip: '요트(Yacht) 돛대의 3단 가로 프레임' },

  // ラ행
  ラ: { char: 'ラ', word: '라디오', highlightIndex: 0, romaji: 'ra', tip: '라디오(Radio) 본체와 꺾인 금속 안테나' },
  リ: { char: 'リ', word: '리본', highlightIndex: 0, romaji: 'ri', reuseNote: '히라가나 り와 95% 동일한 형태', tip: '양쪽으로 살랑살랑 내려오는 예쁜 리본 끝' },
  ル: { char: 'ル', word: '루비', highlightIndex: 0, romaji: 'ru', tip: '루비(Ruby) 보석을 받치는 두 갈래 다리' },
  レ: { char: 'レ', word: '레몬', highlightIndex: 0, romaji: 're', tip: '초승달 모양으로 꺾인 상큼한 레몬 조각' },
  ロ: { char: 'ロ', word: '로봇', highlightIndex: 0, romaji: 'ro', tip: '네모반듯한 로봇(Robot)의 사각 머리' },

  // ワ·ン
  ワ: { char: 'ワ', word: '와인잔', highlightIndex: 0, romaji: 'wa', tip: '와인잔(Wine)의 사각 테두리 실루엣' },
  ヲ: { char: 'ヲ', word: '워터슬라이드', highlightIndex: 0, romaji: 'wo', tip: '워터파크의 지그재그 슬라이드 레일' },
  ン: { char: 'ン', word: '응차! (들어올리기)', highlightIndex: 0, romaji: 'n', tip: '★ 바닥에서 위로 \"응차!\" 번쩍 들어 올리는 궤적' }
};
