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
  ウ: { char: 'ウ', word: '우주선', highlightIndex: 0, romaji: 'u', tip: '정중앙 안테나와 좌우 대칭 유선형 몸체를 지닌 우주선' },
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
  テ: { char: 'テ', word: '테이블', highlightIndex: 0, romaji: 'te', tip: '원근감 있는 테이블의 뒤쪽 모서리(1획), 앞쪽 모서리(2획), 꼬깔형 받침 다리(3획)' },
  ト: { char: 'ト', word: '토치', highlightIndex: 0, romaji: 'to', tip: '수직 가스 실린더(1획)와 우측 사선으로 뻗은 화구 파이프 & 불꽃(2획)' },
  // ナ행
  ナ: { char: 'ナ', word: '나이프', highlightIndex: 0, romaji: 'na', tip: '가로 손잡이(1획)와 아래로 날렵하게 뻗어 베어 내리는 칼날(2획)의 나이프(Knife)' },
  ニ: { char: 'ニ', word: '니모', highlightIndex: 0, romaji: 'ni', tip: '위로 헤엄쳐 올라가는 니모(흰동가리)의 머리와 배에 새겨진 하얀 가로 줄무늬 2개' },
  ヌ: { char: 'ヌ', word: '누들', highlightIndex: 0, romaji: 'nu', tip: '가로 젓가락(1획 가로)과 반대쪽 젓가락(2획)으로 건져 올린 꼬불꼬불한 누들(Noodles) 면발' },
  ネ: { char: 'ネ', word: '네ㄱ타이', highlightIndex: 0, romaji: 'ne', tip: '단정한 셔츠 칼라와 매듭, 아래로 곧게 늘어뜨린 넥타이' },
  ノ: { char: 'ノ', word: '노 (슬래시)', highlightIndex: 0, romaji: 'no', tip: '배를 젓는 노(Oar)의 날렵한 삐침선' },

  // ハ행
  ハ: { char: 'ハ', word: '하와이', highlightIndex: 0, romaji: 'ha', tip: '하와이 해변에 시원하게 八자로 뻗은 쌍둥이 야자수' },
  ヒ: { char: 'ヒ', word: '히터', highlightIndex: 0, romaji: 'hi', tip: '상단 붉은 석영 열선(1획)과 왼쪽 기둥·하단 받침대(2획)의 2단 전기 히터(Heater)' },
  フ: { char: 'フ', word: '후크', highlightIndex: 0, romaji: 'fu', tip: '갈고리 모양의 후크(Hook) 선장 손' },
  ヘ: { char: 'ヘ', word: '헤엄', highlightIndex: 0, romaji: 'he', reuseNote: '히라가나 へ와 100% 동일한 형태', tip: '물살을 가르며 하이 엘보로 헤엄치는 팔' },
  ホ: { char: 'ホ', word: '호박', highlightIndex: 0, romaji: 'ho', tip: '할로윈 호박(잭오랜턴)의 모자 챙(1획)과 고깔 기둥(2획), 양옆 리본과 눈(3·4획)' },

  // マ행
  マ: { char: 'マ', word: '마이크', highlightIndex: 0, romaji: 'ma', tip: '녹음실에서 헤드폰을 끼고 노래하는 입 앞의 마이크(1획 바디·스탠드, 2획 조절 핀)' },
  ミ: { char: 'ミ', word: '미사일', highlightIndex: 0, romaji: 'mi', tip: '나란히 날아가는 3발의 미사일(Missile)' },
  ム: { char: 'ム', word: '무술', highlightIndex: 0, romaji: 'mu', tip: '오른쪽을 향해 오른팔을 굽혀 뻗고(1획), 왼팔로 날렵하게 찌르는(2획) 무술가' },
  メ: { char: 'メ', word: '메모 (X체크)', highlightIndex: 0, romaji: 'me', tip: '메모지에 크게 쓱 그은 X체크(メ) 표시' },
  モ: { char: 'モ', word: '모기', highlightIndex: 0, romaji: 'mo', reuseNote: '히라가나 も가 직선화된 동일 형태', tip: '모기의 펼쳐진 날개(1·2획)와 콕 찌른 침·오른쪽으로 날렵하게 뻗은 배(3획)' },

  // ヤ행
  ヤ: { char: 'ヤ', word: '야구', highlightIndex: 0, romaji: 'ya', reuseNote: '히라가나 や가 각지게 직선화된 동일 형태', tip: '타자의 호쾌한 스윙 궤적(1획)과 홈플레이트로 내리꽂히는 원목 야구 배트(2획)' },
  ユ: { char: 'ユ', word: '유턴', highlightIndex: 0, romaji: 'yu', tip: '도로의 직각 유턴(U-Turn) 회전 화살표' },
  ヨ: { char: 'ヨ', word: '요트', highlightIndex: 0, romaji: 'yo', tip: '요트(Yacht) 돛대 기둥과 3단 가로 돛(세일) 프레임' },

  // ラ행
  ラ: { char: 'ラ', word: '라멘', highlightIndex: 0, romaji: 'ra', tip: '빨간 젓가락 두 짝(1획·2획 가로)으로 건져 올린 맛있는 라멘 면발(2획 곡선)' },
  リ: { char: 'リ', word: '리본', highlightIndex: 0, romaji: 'ri', reuseNote: '히라가나 り와 95% 동일한 형태', tip: '양쪽으로 살랑살랑 내려오는 예쁜 리본 끝' },
  ル: { char: 'ル', word: '루돌프', highlightIndex: 0, romaji: 'ru', tip: '눈밭을 신나게 달리는 루돌프의 앞다리(1획)와 껑충 뛰는 뒷다리(2획)' },
  レ: { char: 'レ', word: '레이저', highlightIndex: 0, romaji: 're', tip: '수직으로 쏘아진 레이저 빔(1획 세로)이 거울에 반사되어 우상단으로 튕겨 나가는 궤적(1획 삐침)' },
  ロ: { char: 'ロ', word: '로봇', highlightIndex: 0, romaji: 'ro', tip: '네모반듯한 로봇(Robot)의 사각 몸통' },

  // ワ·ン
  ワ: { char: 'ワ', word: '와인', highlightIndex: 0, romaji: 'wa', tip: '와인(Wine)의 사각 테두리 실루엣' },
  ヲ: { char: 'ヲ', word: '오리', highlightIndex: 0, romaji: 'o', tip: '부리를 꽥! 벌린 귀여운 오리의 윗부리(1획)와 아랫부리 및 목선(2획)' },
  ン: { char: 'ン', word: '응원', highlightIndex: 0, romaji: 'n', reuseNote: '히라가나 ん과 동일한 응원 모티브', tip: '승리의 머리띠를 한 응원단(1획)과 우상단으로 힘차게 치켜든 응원 깃발(2획)' }
};
