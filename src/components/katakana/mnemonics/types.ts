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
  ウ: { char: 'ウ', word: '우산', highlightIndex: 0, romaji: 'u', reuseNote: '히라가나 う(접힌 우산)에 이어 활짝 펼쳐진 각진 우산', tip: '비 올 때 활짝 펼친 각진 우산 꼭지와 지붕선' },
  エ: { char: 'エ', word: '에ㄹ리베이터', highlightIndex: 0, romaji: 'e', tip: '에ㄹ리베이터 문 / 건축 H빔' },
  オ: { char: 'オ', word: '오토바이', highlightIndex: 0, romaji: 'o', tip: '오토바이 라이더의 핸들과 발' },

  // カ행
  カ: { char: 'カ', word: '카메라', highlightIndex: 0, romaji: 'ka', reuseNote: '히라가나 か에서 점(・)만 빠진 동일 형태', tip: '카메라 셔터 버튼과 사각 프레임' },
  キ: { char: 'キ', word: '키 (열쇠)', highlightIndex: 0, romaji: 'ki', reuseNote: '히라가나 き와 마찬가지로 찬란한 황금 열쇠', tip: '하단 손잡이와 2개의 톱니 날을 지닌 황금 열쇠(Key)' },
  ク: { char: 'ク', word: '쿠폰', highlightIndex: 0, romaji: 'ku', tip: '글자 획을 따라 우상향으로 비스듬히 놓인 할인 쿠폰(Coupon)' },
  ケ: { char: 'ケ', word: '케이 (K)', highlightIndex: 0, romaji: 'ke', tip: '오른쪽으로 살짝 기울인 알파벳 K(케이)' },
  コ: { char: 'コ', word: '코코아', highlightIndex: 0, romaji: 'ko', tip: '따뜻한 코코아 머그잔의 각진 손잡이' },

  // サ행
  サ: { char: 'サ', word: '사다리', highlightIndex: 0, romaji: 'sa', tip: '나무 사다리의 가로 발판(중앙)과 두 기둥 다리' },
  シ: { char: 'シ', word: '시(씨)익', highlightIndex: 0, romaji: 'shi', tip: '동그란 얼굴 속 두 눈과 씨익 올라간 입꼬리' },
  ス: { char: 'ス', word: '스탠드', highlightIndex: 0, romaji: 'su', tip: '책상 위 조명 스탠드의 꺾인 갓과 삼각 지지대 다리' },
  セ: { char: 'セ', word: '세발자전거', highlightIndex: 0, romaji: 'se', tip: '핸들바와 L자 프레임, 안장 기둥으로 달리는 세발자전거' },
  ソ: { char: 'ソ', word: '소뿔', highlightIndex: 0, romaji: 'so', tip: '황소의 양쪽 뿔(왼쪽 작은 뿔과 오른쪽으로 길게 뻗은 뿔)' },

  // タ행
  タ: { char: 'タ', word: '타조', highlightIndex: 0, romaji: 'ta', tip: '타조의 앞으로 숙인 목(1획), 둥근 등과 깃털(2획), 땅을 박차는 다리(3획)' },
  チ: { char: 'チ', word: '치어리더', highlightIndex: 0, romaji: 'chi', tip: '치어리더가 양손에 폼폼(수술)을 들고(2획), 하이킥 점프를 뛰는 모습(3획)' },
  ツ: { char: 'ツ', word: '셔츠', highlightIndex: 1, romaji: 'tsu', tip: '단정한 셔츠 칼라의 단추 2개(1, 2획)와 비스듬히 떨어지는 앞섶 라인(3획)' },
  ト: { char: 'ト', word: '토치', highlightIndex: 0, romaji: 'to', tip: '수직 가스 실린더(1획)와 우측 사선으로 뻗은 화구 파이프 & 불꽃(2획)' },
  // ナ행
  ナ: { char: 'ナ', word: '나이프', highlightIndex: 0, romaji: 'na', tip: '가로 손잡이(1획)와 아래로 날렵하게 뻗어 베어 내리는 칼날(2획)의 나이프(Knife)' },
  ニ: { char: 'ニ', word: '니모', highlightIndex: 0, romaji: 'ni', tip: '위로 헤엄쳐 올라가는 니모(흰동가리)의 머리와 배에 새겨진 하얀 가로 줄무늬 2개' },
  ヌ: { char: 'ヌ', word: '누들', highlightIndex: 0, romaji: 'nu', tip: '가로 젓가락(1획 가로)과 반대쪽 젓가락(2획)으로 건져 올린 꼬불꼬불한 누들(Noodles) 면발' },
  ネ: { char: 'ネ', word: '네트', highlightIndex: 0, romaji: 'ne', tip: '테니스 네트 상공의 공(1획), 상단 밴드(2획), 중앙 센터 스트랩(3획)' },
  ノ: { char: 'ノ', word: '노 (슬래시)', highlightIndex: 0, romaji: 'no', tip: '배를 젓는 노(Oar)의 날렵한 삐침선' },

  // ハ행
  ハ: { char: 'ハ', word: '하와이', highlightIndex: 0, romaji: 'ha', tip: '하와이 해변에 시원하게 八자로 뻗은 쌍둥이 야자수' },
  ヒ: { char: 'ヒ', word: '히터', highlightIndex: 0, romaji: 'hi', tip: '상단 붉은 석영 열선(1획)과 왼쪽 기둥·하단 받침대(2획)의 2단 전기 히터(Heater)' },
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
