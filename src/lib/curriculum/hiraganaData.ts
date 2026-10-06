export interface HiraganaChar {
  char: string;
  romaji: string;
  koreanSound: string;
  row: string; // あ행, か행 등
  colIndex: number; // 0: a, 1: i, 2: u, 3: e, 4: o
  strokeCount: number;
  strokeGuide?: string; // 획순 팁
  soundTip?: string; // 한국인 발음 팁
  baseChar?: string; // 탁점/반탁점의 원래 청음 글자 (예: が의 baseChar는 か) 또는 요음의 앞글자 (きゃ의 baseChar는 き)
  smallChar?: string; // 요음의 작은 글자 (ゃ, ゅ, ょ)
  separateSound?: string; // 2박자 분리 발음 (예: "き・や [키-야]")
  soundType?: 'seion' | 'dakuon' | 'handakuon' | 'youon'; // 청음, 탁음, 반탁음, 요음
}

export interface HiraganaRow {
  name: string;
  chars: (HiraganaChar | null)[];
}

export interface MiniWord {
  id: string;
  japanese: string;
  romaji: string;
  koreanMeaning: string;
  emoji: string;
  category: string;
  wordType?: 'seion' | 'dakuon' | 'youon'; // 청음(기본) vs 탁음 vs 요음 단어
}

export interface ConfusingPair {
  id: string;
  title: string;
  char1: { char: string; romaji: string; korean: string; feature: string };
  char2: { char: string; romaji: string; korean: string; feature: string };
  char3?: { char: string; romaji: string; korean: string; feature: string };
  tip: string;
}

export interface FirstDialogueItem {
  id: string;
  situation: string;
  japanese: string;
  romaji: string;
  koreanPronunciation: string;
  koreanMeaning: string;
  tip: string;
}

// 50음도 기본 46자
export const HIRAGANA_GRID: HiraganaRow[] = [
  {
    name: 'あ행 (a)',
    chars: [
      { char: 'あ', romaji: 'a', koreanSound: '아', row: 'あ', colIndex: 0, strokeCount: 3, strokeGuide: '가로선 ① ➔ 세로선 ② ➔ 둥근 곡선 ③', soundTip: '한국어 [아]와 같으나 입을 너무 크게 벌리지 않고 부드럽게 냅니다.' },
      { char: 'い', romaji: 'i', koreanSound: '이', row: 'あ', colIndex: 1, strokeCount: 2, strokeGuide: '왼쪽 삐침 ① ➔ 오른쪽 짧은 세로 ②', soundTip: '입꼬리를 양옆으로 당기며 맑게 [이] 소리를 냅니다.' },
      { char: 'う', romaji: 'u', koreanSound: '우', row: 'あ', colIndex: 2, strokeCount: 2, strokeGuide: '상단 짧은 점 ① ➔ 둥근 곡선 ②', soundTip: '입술을 뾰족하게 내밀지 않고, [으]와 [우]의 중간 정도로 편안하게 발음합니다.' },
      { char: 'え', romaji: 'e', koreanSound: '에', row: 'あ', colIndex: 3, strokeCount: 2, strokeGuide: '상단 점 ① ➔ 지그재그 z 곡선 ②', soundTip: '한국어 [에]와 유사하게 턱을 가볍게 내리며 소리 냅니다.' },
      { char: 'お', romaji: 'o', koreanSound: '오', row: 'あ', colIndex: 4, strokeCount: 3, strokeGuide: '가로선 ① ➔ 세로와 둥근 곡선 ② ➔ 오른쪽 점 ③', soundTip: '입술을 둥글게 모으고 깔끔하게 [오] 소리를 냅니다.' },
    ]
  },
  {
    name: 'か행 (k)',
    chars: [
      { char: 'か', romaji: 'ka', koreanSound: '카', row: 'か', colIndex: 0, strokeCount: 3, strokeGuide: '왼쪽 꺾임 ① ➔ 세로선 ② ➔ 오른쪽 점 ③' },
      { char: 'き', romaji: 'ki', koreanSound: '키', row: 'か', colIndex: 1, strokeCount: 4, strokeGuide: '가로선 2개 ①② ➔ 사선 ③ ➔ 하단 둥근 획 ④' },
      { char: 'く', romaji: 'ku', koreanSound: '쿠', row: 'か', colIndex: 2, strokeCount: 1, strokeGuide: '한 획으로 꺾기 <' },
      { char: 'け', romaji: 'ke', koreanSound: '케', row: 'か', colIndex: 3, strokeCount: 3, strokeGuide: '왼쪽 삐침 ① ➔ 가로선 ② ➔ 오른쪽 세로 ③' },
      { char: 'こ', romaji: 'ko', koreanSound: '코', row: 'か', colIndex: 4, strokeCount: 2, strokeGuide: '위 가로선 ① ➔ 아래 가로선 ②' },
    ]
  },
  {
    name: 'さ행 (s)',
    chars: [
      { char: 'さ', romaji: 'sa', koreanSound: '사', row: 'さ', colIndex: 0, strokeCount: 3, strokeGuide: '가로선 ① ➔ 오른쪽 사선 ② ➔ 아래 둥근 획 ③', soundTip: 'ち(치)와 방향이 반대이므로 주의하세요!' },
      { char: 'し', romaji: 'shi', koreanSound: '시', row: 'さ', colIndex: 1, strokeCount: 1, strokeGuide: '낚싯바늘 모양 한 획', soundTip: '입술을 약간 둥글게 하고 부드럽게 [시] 소리를 냅니다.' },
      { char: 'す', romaji: 'su', koreanSound: '스', row: 'さ', colIndex: 2, strokeCount: 2, strokeGuide: '가로선 ① ➔ 세로로 내려오며 돼지꼬리 매듭 ②' },
      { char: 'せ', romaji: 'se', koreanSound: '세', row: 'さ', colIndex: 3, strokeCount: 3, strokeGuide: '가로선 ① ➔ 오른쪽 꺾임 ② ➔ 왼쪽 세로 삐침 ③' },
      { char: 'そ', romaji: 'so', koreanSound: '소', row: 'さ', colIndex: 4, strokeCount: 1, strokeGuide: '한 획으로 지그재그 연결' },
    ]
  },
  {
    name: 'た행 (t)',
    chars: [
      { char: 'た', romaji: 'ta', koreanSound: '타', row: 'た', colIndex: 0, strokeCount: 4, strokeGuide: '가로선 ① ➔ 사선 ② ➔ 오른쪽 こ 모양 ③④' },
      { char: 'ち', romaji: 'chi', koreanSound: '치', row: 'た', colIndex: 1, strokeCount: 2, strokeGuide: '가로선 ① ➔ 5자 모양 곡선 ②', soundTip: 'さ(사)와 반대 방향입니다. 왼쪽으로 볼록합니다!' },
      { char: 'つ', romaji: 'tsu', koreanSound: '츠', row: 'た', colIndex: 2, strokeCount: 1, strokeGuide: '둥근 초승달 모양 한 획', soundTip: '★ 한국인이 가장 틀리기 쉬운 발음! [츠]도 [쓰]도 아닌 혀끝 마찰음입니다.' },
      { char: 'て', romaji: 'te', koreanSound: '테', row: 'た', colIndex: 3, strokeCount: 1, strokeGuide: '가로선 후 부드러운 곡선 한 획' },
      { char: 'と', romaji: 'to', koreanSound: '토', row: 'た', colIndex: 4, strokeCount: 2, strokeGuide: '짧은 사선 ① ➔ 둥근 곡선 C모양 ②' },
    ]
  },
  {
    name: 'な행 (n)',
    chars: [
      { char: 'な', romaji: 'na', koreanSound: '나', row: 'な', colIndex: 0, strokeCount: 4, strokeGuide: '가로선 ① ➔ 사선 ② ➔ 점 ③ ➔ 매듭 곡선 ④' },
      { char: 'に', romaji: 'ni', koreanSound: '니', row: 'な', colIndex: 1, strokeCount: 3, strokeGuide: '왼쪽 세로 ① ➔ 오른쪽 위 가로 ② ➔ 아래 가로 ③' },
      { char: 'ぬ', romaji: 'nu', koreanSound: '누', row: 'な', colIndex: 2, strokeCount: 2, strokeGuide: '왼쪽 사선 ① ➔ 오른쪽에서 감아 돼지꼬리 매듭 ②', soundTip: 'め(메)와 닮았지만 끝에 꼬리가 달렸어요!' },
      { char: 'ね', romaji: 'ne', koreanSound: '네', row: 'な', colIndex: 3, strokeCount: 2, strokeGuide: '왼쪽 곧은 세로 ① ➔ z자 후 오른쪽 꼬리 매듭 ②' },
      { char: 'の', romaji: 'no', koreanSound: '노', row: 'な', colIndex: 4, strokeCount: 1, strokeGuide: '달팽이 모양 한 획' },
    ]
  },
  {
    name: 'は행 (h)',
    chars: [
      { char: 'は', romaji: 'ha', koreanSound: '하', row: 'は', colIndex: 0, strokeCount: 3, strokeGuide: '왼쪽 세로 ① ➔ 가로선 ② ➔ 매듭 곡선 ③', soundTip: 'ほ(호)와 달리 위 획이 튀어나오지 않습니다.' },
      { char: 'ひ', romaji: 'hi', koreanSound: '히', row: 'は', colIndex: 1, strokeCount: 1, strokeGuide: '그릇 모양 한 획' },
      { char: 'ふ', romaji: 'fu', koreanSound: '후', row: 'は', colIndex: 2, strokeCount: 4, strokeGuide: '중앙 점 ① ➔ 둥근 곡선 ② ➔ 좌우 점 ③④', soundTip: '★ 한국인이 어려운 발음! 입술을 붙이지 않고 촛불을 불듯 [후] 소리를 냅니다.' },
      { char: 'へ', romaji: 'he', koreanSound: '헤', row: 'は', colIndex: 3, strokeCount: 1, strokeGuide: '산 모양 한 획 ^' },
      { char: 'ほ', romaji: 'ho', koreanSound: '호', row: 'は', colIndex: 4, strokeCount: 4, strokeGuide: '왼쪽 세로 ① ➔ 상단 가로 ② ➔ 하단 가로 ③ ➔ 꼬리 매듭 ④' },
    ]
  },
  {
    name: 'ま행 (m)',
    chars: [
      { char: 'ま', romaji: 'ma', koreanSound: '마', row: 'ま', colIndex: 0, strokeCount: 3, strokeGuide: '가로선 2개 ①② ➔ 세로 매듭 ③' },
      { char: 'み', romaji: 'mi', koreanSound: '미', row: 'ま', colIndex: 1, strokeCount: 2, strokeGuide: '4자 모양 꺾임 ① ➔ 오른쪽 사선 ②' },
      { char: 'む', romaji: 'mu', koreanSound: '무', row: 'ま', colIndex: 2, strokeCount: 3, strokeGuide: '가로선 ① ➔ 매듭 세로선 ② ➔ 오른쪽 점 ③' },
      { char: 'め', romaji: 'me', koreanSound: '메', row: 'ま', colIndex: 3, strokeCount: 2, strokeGuide: '사선 ① ➔ 둥글게 감아올리는 획 ②', soundTip: 'ぬ(누)와 달리 끝에 꼬리가 없습니다.' },
      { char: 'も', romaji: 'mo', koreanSound: '모', row: 'ま', colIndex: 4, strokeCount: 3, strokeGuide: '세로 낚싯바늘 ① ➔ 가로선 2개 ②③' },
    ]
  },
  {
    name: 'や행 (y)',
    chars: [
      { char: 'や', romaji: 'ya', koreanSound: '야', row: 'や', colIndex: 0, strokeCount: 3, strokeGuide: '둥근 꺾임 ① ➔ 상단 점 ② ➔ 오른쪽 세로 사선 ③' },
      null,
      { char: 'ゆ', romaji: 'yu', koreanSound: '유', row: 'や', colIndex: 2, strokeCount: 2, strokeGuide: '물고기 모양 회전 ① ➔ 가운데 가르는 세로선 ②' },
      null,
      { char: 'よ', romaji: 'yo', koreanSound: '요', row: 'や', colIndex: 4, strokeCount: 2, strokeGuide: '가로선 ① ➔ 세로 내려오며 매듭 ②' },
    ]
  },
  {
    name: 'ら행 (r)',
    chars: [
      { char: 'ら', romaji: 'ra', koreanSound: '라', row: 'ら', colIndex: 0, strokeCount: 2, strokeGuide: '짧은 점 ① ➔ 5자 곡선 ②', soundTip: '혀끝을 입천장에 가볍게 튕기며 [라] 소리를 냅니다.' },
      { char: 'り', romaji: 'ri', koreanSound: '리', row: 'ら', colIndex: 1, strokeCount: 2, strokeGuide: '왼쪽 짧은 획 ① ➔ 오른쪽 긴 획 ②' },
      { char: 'る', romaji: 'ru', koreanSound: '루', row: 'ら', colIndex: 2, strokeCount: 1, strokeGuide: '3자 후 끝에 꼬리 매듭 한 획', soundTip: 'ろ(로)는 꼬리가 없고, る(루)는 동그란 꼬리가 있어요!' },
      { char: 'れ', romaji: 're', koreanSound: '레', row: 'ら', colIndex: 3, strokeCount: 2, strokeGuide: '곧은 세로 ① ➔ z자 후 바깥쪽 삐침 ②' },
      { char: 'ろ', romaji: 'ro', koreanSound: '로', row: 'ら', colIndex: 4, strokeCount: 1, strokeGuide: '숫자 3 모양 한 획' },
    ]
  },
  {
    name: 'わ・ん행 (w/n)',
    chars: [
      { char: 'わ', romaji: 'wa', koreanSound: '와', row: 'わ', colIndex: 0, strokeCount: 2, strokeGuide: '곧은 세로선 ① ➔ 둥근 곡선(안으로 감김) ②' },
      null,
      null,
      null,
      { char: 'ん', romaji: 'n', koreanSound: '응', row: 'わ', colIndex: 4, strokeCount: 1, strokeGuide: '영문 n 모양 부드러운 한 획', soundTip: '받침 소리(ㄴ, ㅁ, ㅇ)이며 단독으로 1박자의 길이를 갖습니다.' },
    ]
  }
];

// 탁음(20자) & 반탁음(5자) 총 25자 그리드
export const DAKUON_GRID: HiraganaRow[] = [
  {
    name: 'が행 (g)',
    chars: [
      { char: 'が', romaji: 'ga', koreanSound: '가', row: 'が', colIndex: 0, strokeCount: 5, strokeGuide: 'か 3획 ①②③ ➔ 오른쪽 위 탁점 2획 ④⑤', soundTip: '한국어 [가]보다 부드럽게 목에서 울리며 소리 냅니다.', baseChar: 'か', soundType: 'dakuon' },
      { char: 'ぎ', romaji: 'gi', koreanSound: '기', row: 'が', colIndex: 1, strokeCount: 6, strokeGuide: 'き 4획 ①②③④ ➔ 오른쪽 위 탁점 2획 ⑤⑥', soundTip: '맑은 [키]에서 목을 울려 [기] 소리를 냅니다.', baseChar: 'き', soundType: 'dakuon' },
      { char: 'ぐ', romaji: 'gu', koreanSound: '구', row: 'が', colIndex: 2, strokeCount: 3, strokeGuide: 'く 1획 ① ➔ 오른쪽 위 탁점 2획 ②③', soundTip: '입술을 과하게 내밀지 않고 부드러운 [구]를 냅니다.', baseChar: 'く', soundType: 'dakuon' },
      { char: 'げ', romaji: 'ge', koreanSound: '게', row: 'が', colIndex: 3, strokeCount: 5, strokeGuide: 'け 3획 ①②③ ➔ 오른쪽 위 탁점 2획 ④⑤', soundTip: '한국어 [게]와 유사하게 가볍게 발음합니다.', baseChar: 'け', soundType: 'dakuon' },
      { char: 'ご', romaji: 'go', koreanSound: '고', row: 'が', colIndex: 4, strokeCount: 4, strokeGuide: 'こ 2획 ①② ➔ 오른쪽 위 탁점 2획 ③④', soundTip: '입을 둥글게 모으며 울리는 [고] 소리를 냅니다.', baseChar: 'こ', soundType: 'dakuon' },
    ]
  },
  {
    name: 'ざ행 (z)',
    chars: [
      { char: 'ざ', romaji: 'za', koreanSound: '자', row: 'ざ', colIndex: 0, strokeCount: 5, strokeGuide: 'さ 3획 ①②③ ➔ 오른쪽 위 탁점 2획 ④⑤', soundTip: '★ 한국어 [자]가 아닙니다! 벌이 윙윙거리듯(zzz) 혀끝과 윗니 사이로 마찰을 일으키며 [za] 소리를 냅니다.', baseChar: 'さ', soundType: 'dakuon' },
      { char: 'じ', romaji: 'ji', koreanSound: '지', row: 'ざ', colIndex: 1, strokeCount: 3, strokeGuide: 'し 1획 ① ➔ 오른쪽 위 탁점 2획 ②③', soundTip: '한국어 [지]보다 부드럽게 발음합니다. ぢ와 발음이 같습니다.', baseChar: 'し', soundType: 'dakuon' },
      { char: 'ず', romaji: 'zu', koreanSound: '즈', row: 'ざ', colIndex: 2, strokeCount: 4, strokeGuide: 'す 2획 ①② ➔ 오른쪽 위 탁점 2획 ③④', soundTip: '★ 한국어 [주]가 아닌 [zu]! 혀끝을 윗니 뒤쪽에 대고 진동을 주며 [zu] 소리를 냅니다. (づ와 발음 일치)', baseChar: 'す', soundType: 'dakuon' },
      { char: 'ぜ', romaji: 'ze', koreanSound: '제', row: 'ざ', colIndex: 3, strokeCount: 5, strokeGuide: 'せ 3획 ①②③ ➔ 오른쪽 위 탁점 2획 ④⑤', soundTip: '진동을 느끼며 맑게 [ze] 소리를 냅니다.', baseChar: 'せ', soundType: 'dakuon' },
      { char: 'ぞ', romaji: 'zo', koreanSound: '조', row: 'ざ', colIndex: 4, strokeCount: 3, strokeGuide: 'そ 1획 ① ➔ 오른쪽 위 탁점 2획 ②③', soundTip: '울림을 주며 [zo] 소리를 냅니다.', baseChar: 'そ', soundType: 'dakuon' },
    ]
  },
  {
    name: 'だ행 (d)',
    chars: [
      { char: 'だ', romaji: 'da', koreanSound: '다', row: 'だ', colIndex: 0, strokeCount: 6, strokeGuide: 'た 4획 ①②③④ ➔ 오른쪽 위 탁점 2획 ⑤⑥', soundTip: '한국어 [다]와 유사하게 혀끝을 잇몸에 댔다 떼며 발음합니다.', baseChar: 'た', soundType: 'dakuon' },
      { char: 'ぢ', romaji: 'ji', koreanSound: '지', row: 'だ', colIndex: 1, strokeCount: 4, strokeGuide: 'ち 2획 ①② ➔ 오른쪽 위 탁점 2획 ③④', soundTip: '현대 일본어에서는 じ(ji)와 발음이 100% 동일합니다! 주로 합성어 연탁(예: はなぢ)에 쓰입니다.', baseChar: 'ち', soundType: 'dakuon' },
      { char: 'づ', romaji: 'zu', koreanSound: '즈', row: 'だ', colIndex: 2, strokeCount: 3, strokeGuide: 'つ 1획 ① ➔ 오른쪽 위 탁점 2획 ②③', soundTip: '현대 일본어에서는 ず(zu)와 발음이 100% 동일합니다! (예: つづく: 계속되다)', baseChar: 'つ', soundType: 'dakuon' },
      { char: 'で', romaji: 'de', koreanSound: '데', row: 'だ', colIndex: 3, strokeCount: 3, strokeGuide: 'て 1획 ① ➔ 오른쪽 위 탁점 2획 ②③', soundTip: '한국어 [데]와 비슷하게 부드럽게 발음합니다.', baseChar: 'て', soundType: 'dakuon' },
      { char: 'ど', romaji: 'do', koreanSound: '도', row: 'だ', colIndex: 4, strokeCount: 4, strokeGuide: 'と 2획 ①② ➔ 오른쪽 위 탁점 2획 ③④', soundTip: '한국어 [도]보다 목을 살짝 울려 소리 냅니다.', baseChar: 'と', soundType: 'dakuon' },
    ]
  },
  {
    name: 'ば행 (b)',
    chars: [
      { char: 'ば', romaji: 'ba', koreanSound: '바', row: 'ば', colIndex: 0, strokeCount: 5, strokeGuide: 'は 3획 ①②③ ➔ 오른쪽 위 탁점 2획 ④⑤', soundTip: '양 입술을 붙였다 떼며 [바] 소리를 냅니다.', baseChar: 'は', soundType: 'dakuon' },
      { char: 'び', romaji: 'bi', koreanSound: '비', row: 'ば', colIndex: 1, strokeCount: 3, strokeGuide: 'ひ 1획 ① ➔ 오른쪽 위 탁점 2획 ②③', soundTip: '입술을 붙였다 떼며 맑게 울리는 [비] 소리를 냅니다.', baseChar: 'ひ', soundType: 'dakuon' },
      { char: 'ぶ', romaji: 'bu', koreanSound: '부', row: 'ば', colIndex: 2, strokeCount: 6, strokeGuide: 'ふ 4획 ①②③④ ➔ 오른쪽 위 탁점 2획 ⑤⑥', soundTip: 'ふ와 달리 입술을 확실하게 붙였다 떼며 [부] 소리를 냅니다.', baseChar: 'ふ', soundType: 'dakuon' },
      { char: 'べ', romaji: 'be', koreanSound: '베', row: 'ば', colIndex: 3, strokeCount: 3, strokeGuide: 'へ 1획 ① ➔ 오른쪽 위 탁점 2획 ②③', soundTip: '입술을 뗐다 벌리며 [베] 소리를 냅니다.', baseChar: 'へ', soundType: 'dakuon' },
      { char: 'ぼ', romaji: 'bo', koreanSound: '보', row: 'ば', colIndex: 4, strokeCount: 6, strokeGuide: 'ほ 4획 ①②③④ ➔ 오른쪽 위 탁점 2획 ⑤⑥', soundTip: '입술을 둥글게 모으며 울리는 [보] 소리를 냅니다.', baseChar: 'ほ', soundType: 'dakuon' },
    ]
  },
  {
    name: 'ぱ행 (p / 반탁음)',
    chars: [
      { char: 'ぱ', romaji: 'pa', koreanSound: '파', row: 'ぱ', colIndex: 0, strokeCount: 4, strokeGuide: 'は 3획 ①②③ ➔ 오른쪽 위 반탁점(작은 동그라미) ④', soundTip: '팝콘이 터지듯 양 입술에서 공기를 강하게 뿜으며 [pa] 소리를 냅니다.', baseChar: 'は', soundType: 'handakuon' },
      { char: 'ぴ', romaji: 'pi', koreanSound: '피', row: 'ぱ', colIndex: 1, strokeCount: 2, strokeGuide: 'ひ 1획 ① ➔ 오른쪽 위 반탁점(작은 동그라미) ②', soundTip: '입술을 앙다물고 터뜨리며 [pi] 소리를 냅니다.', baseChar: 'ひ', soundType: 'handakuon' },
      { char: 'ぷ', romaji: 'pu', koreanSound: '푸', row: 'ぱ', colIndex: 2, strokeCount: 5, strokeGuide: 'ふ 4획 ①②③④ ➔ 오른쪽 위 반탁점(작은 동그라미) ⑤', soundTip: '입술을 가볍게 튕기며 [pu] 소리를 냅니다.', baseChar: 'ふ', soundType: 'handakuon' },
      { char: 'ぺ', romaji: 'pe', koreanSound: '페', row: 'ぱ', colIndex: 3, strokeCount: 2, strokeGuide: 'へ 1획 ① ➔ 오른쪽 위 반탁점(작은 동그라미) ②', soundTip: '입술을 터뜨리며 [pe] 소리를 냅니다.', baseChar: 'へ', soundType: 'handakuon' },
      { char: 'ぽ', romaji: 'po', koreanSound: '포', row: 'ぱ', colIndex: 4, strokeCount: 5, strokeGuide: 'ほ 4획 ①②③④ ➔ 오른쪽 위 반탁점(작은 동그라미) ⑤', soundTip: '동그란 입술로 팡 튀기듯 [po] 소리를 냅니다.', baseChar: 'ほ', soundType: 'handakuon' },
    ]
  }
];

// 청음 기본 46자
export const ALL_SEION_CHARS: HiraganaChar[] = HIRAGANA_GRID.flatMap((r) =>
  r.chars.filter(Boolean) as HiraganaChar[]
);

// 탁음/반탁음 25자
export const ALL_DAKUON_CHARS: HiraganaChar[] = DAKUON_GRID.flatMap((r) =>
  r.chars.filter(Boolean) as HiraganaChar[]
);

// 요음(拗音) 36자 (12행 × 3컬럼: ゃ, ゅ, ょ)
export const YOUON_GRID: HiraganaRow[] = [
  {
    name: 'きゃ행 (kya / kyu / kyo)',
    chars: [
      { char: 'きゃ', romaji: 'kya', koreanSound: '캬', row: 'きゃ', colIndex: 0, strokeCount: 7, strokeGuide: 'き 4획 ①②③④ ➔ 오른쪽 아래 작은 ゃ 3획 ⑤⑥⑦', soundTip: 'き(키)와 や(야)를 한 박자로 빠르게 연결해 [캬]로 발음합니다.', baseChar: 'き', smallChar: 'ゃ', separateSound: 'き・や (키-야)', soundType: 'youon' },
      { char: 'きゅ', romaji: 'kyu', koreanSound: '큐', row: 'きゃ', colIndex: 1, strokeCount: 6, strokeGuide: 'き 4획 ①②③④ ➔ 오른쪽 아래 작은 ゅ 2획 ⑤⑥', soundTip: 'き 입모양에서 입술을 모으며 [큐]로 1박자에 소리냅니다.', baseChar: 'き', smallChar: 'ゅ', separateSound: 'き・ゆ (키-유)', soundType: 'youon' },
      { char: 'きょ', romaji: 'kyo', koreanSound: '쿄', row: 'きゃ', colIndex: 2, strokeCount: 6, strokeGuide: 'き 4획 ①②③④ ➔ 오른쪽 아래 작은 ょ 2획 ⑤⑥', soundTip: '입을 둥글게 모으며 [쿄] 소리를 1박자에 냅니다.', baseChar: 'き', smallChar: 'ょ', separateSound: 'き・よ (키-요)', soundType: 'youon' },
    ]
  },
  {
    name: 'しゃ행 (sha / shu / sho)',
    chars: [
      { char: 'しゃ', romaji: 'sha', koreanSound: '샤', row: 'しゃ', colIndex: 0, strokeCount: 4, strokeGuide: 'し 1획 ① ➔ 오른쪽 아래 작은 ゃ 3획 ②③④', soundTip: '한국어 [샤]와 동일하게 입술을 살짝 내밀며 [sha] 소리를 냅니다.', baseChar: 'し', smallChar: 'ゃ', separateSound: 'し・や (시-야)', soundType: 'youon' },
      { char: 'しゅ', romaji: 'shu', koreanSound: '슈', row: 'しゃ', colIndex: 1, strokeCount: 3, strokeGuide: 'し 1획 ① ➔ 오른쪽 아래 작은 ゅ 2획 ②③', soundTip: '입술을 둥글게 모으며 부드럽게 [슈] 소리를 냅니다.', baseChar: 'し', smallChar: 'ゅ', separateSound: 'し・ゆ (시-유)', soundType: 'youon' },
      { char: 'しょ', romaji: 'sho', koreanSound: '쇼', row: 'しゃ', colIndex: 2, strokeCount: 3, strokeGuide: 'し 1획 ① ➔ 오른쪽 아래 작은 ょ 2획 ②③', soundTip: '자연스럽게 [쇼] 소리를 냅니다. (사진: しゃしん, 식당: しょくどう)', baseChar: 'し', smallChar: 'ょ', separateSound: 'し・よ (시-요)', soundType: 'youon' },
    ]
  },
  {
    name: 'ちゃ행 (cha / chu / cho)',
    chars: [
      { char: 'ちゃ', romaji: 'cha', koreanSound: '차', row: 'ちゃ', colIndex: 0, strokeCount: 5, strokeGuide: 'ち 2획 ①② ➔ 오른쪽 아래 작은 ゃ 3획 ③④⑤', soundTip: '한국어 [차]와 유사하게 혀를 댔다 떼며 [cha] 소리를 냅니다.', baseChar: 'ち', smallChar: 'ゃ', separateSound: 'ち・や (치-야)', soundType: 'youon' },
      { char: 'ちゅ', romaji: 'chu', koreanSound: '추', row: 'ちゃ', colIndex: 1, strokeCount: 4, strokeGuide: 'ち 2획 ①② ➔ 오른쪽 아래 작은 ゅ 2획 ③④', soundTip: '입술을 모아 [추] 소리를 냅니다.', baseChar: 'ち', smallChar: 'ゅ', separateSound: 'ち・ゆ (치-유)', soundType: 'youon' },
      { char: 'ちょ', romaji: 'cho', koreanSound: '초', row: 'ちゃ', colIndex: 2, strokeCount: 4, strokeGuide: 'ち 2획 ①② ➔ 오른쪽 아래 작은 ょ 2획 ③④', soundTip: '가볍게 [초] 소리를 냅니다. (잠깐만: ちょっと)', baseChar: 'ち', smallChar: 'ょ', separateSound: 'ち・よ (치-요)', soundType: 'youon' },
    ]
  },
  {
    name: 'にゃ행 (nya / nyu / nyo)',
    chars: [
      { char: 'にゃ', romaji: 'nya', koreanSound: '냐', row: 'にゃ', colIndex: 0, strokeCount: 6, strokeGuide: 'に 3획 ①②③ ➔ 오른쪽 아래 작은 ゃ 3획 ④⑤⑥', soundTip: '고양이 울음소리처럼 콧소리를 섞어 [냐] 소리를 냅니다.', baseChar: 'に', smallChar: 'ゃ', separateSound: 'に・や (니-야)', soundType: 'youon' },
      { char: 'にゅ', romaji: 'nyu', koreanSound: '뉴', row: 'にゃ', colIndex: 1, strokeCount: 5, strokeGuide: 'に 3획 ①②③ ➔ 오른쪽 아래 작은 ゅ 2획 ④⑤', soundTip: '코로 울리며 [뉴] 소리를 냅니다. (우유: ぎゅうにゅう)', baseChar: 'に', smallChar: 'ゅ', separateSound: 'に・ゆ (니-유)', soundType: 'youon' },
      { char: 'にょ', romaji: 'nyo', koreanSound: '뇨', row: 'にゃ', colIndex: 2, strokeCount: 5, strokeGuide: 'に 3획 ①②③ ➔ 오른쪽 아래 작은 ょ 2획 ④⑤', soundTip: '입을 모으며 [뇨] 소리를 냅니다.', baseChar: 'に', smallChar: 'ょ', separateSound: 'に・よ (니-요)', soundType: 'youon' },
    ]
  },
  {
    name: 'ひゃ행 (hya / hyu / hyo)',
    chars: [
      { char: 'ひゃ', romaji: 'hya', koreanSound: '햐', row: 'ひゃ', colIndex: 0, strokeCount: 4, strokeGuide: 'ひ 1획 ① ➔ 오른쪽 아래 작은 ゃ 3획 ②③④', soundTip: '입천장에 입김을 스치며 [햐] 소리를 냅니다. (100: ひゃく)', baseChar: 'ひ', smallChar: 'ゃ', separateSound: 'ひ・や (히-야)', soundType: 'youon' },
      { char: 'ひゅ', romaji: 'hyu', koreanSound: '휴', row: 'ひゃ', colIndex: 1, strokeCount: 3, strokeGuide: 'ひ 1획 ① ➔ 오른쪽 아래 작은 ゅ 2획 ②③', soundTip: '입술을 모으며 바람을 불듯 [휴] 소리를 냅니다.', baseChar: 'ひ', smallChar: 'ゅ', separateSound: 'ひ・ゆ (히-유)', soundType: 'youon' },
      { char: 'ひょ', romaji: 'hyo', koreanSound: '효', row: 'ひゃ', colIndex: 2, strokeCount: 3, strokeGuide: 'ひ 1획 ① ➔ 오른쪽 아래 작은 ょ 2획 ②③', soundTip: '입을 오므려 [효] 소리를 냅니다. (표/차트: ひょう)', baseChar: 'ひ', smallChar: 'ょ', separateSound: 'ひ・よ (히-요)', soundType: 'youon' },
    ]
  },
  {
    name: 'みゃ행 (mya / myu / myo)',
    chars: [
      { char: 'みゃ', romaji: 'mya', koreanSound: '먀', row: 'みゃ', colIndex: 0, strokeCount: 5, strokeGuide: 'み 2획 ①② ➔ 오른쪽 아래 작은 ゃ 3획 ③④⑤', soundTip: '입술을 닫았다 떼며 [먀] 소리를 냅니다. (맥박: みゃく)', baseChar: 'み', smallChar: 'ゃ', separateSound: 'み・や (미-야)', soundType: 'youon' },
      { char: 'みゅ', romaji: 'myu', koreanSound: '뮤', row: 'みゃ', colIndex: 1, strokeCount: 4, strokeGuide: 'み 2획 ①② ➔ 오른쪽 아래 작은 ゅ 2획 ③④', soundTip: '입술을 모으며 [뮤] 소리를 냅니다. (뮤직, 뮤지엄)', baseChar: 'み', smallChar: 'ゅ', separateSound: 'み・ゆ (미-유)', soundType: 'youon' },
      { char: 'みょ', romaji: 'myo', koreanSound: '묘', row: 'みゃ', colIndex: 2, strokeCount: 4, strokeGuide: 'み 2획 ①② ➔ 오른쪽 아래 작은 ょ 2획 ③④', soundTip: '입을 모으며 [묘] 소리를 냅니다. (성씨: みょうじ)', baseChar: 'み', smallChar: 'ょ', separateSound: 'み・よ (미-요)', soundType: 'youon' },
    ]
  },
  {
    name: 'りゃ행 (rya / ryu / ryo)',
    chars: [
      { char: 'りゃ', romaji: 'rya', koreanSound: '랴', row: 'りゃ', colIndex: 0, strokeCount: 5, strokeGuide: 'り 2획 ①② ➔ 오른쪽 아래 작은 ゃ 3획 ③④⑤', soundTip: '혀끝을 입천장에 가볍게 튕기며 [랴] 소리를 냅니다.', baseChar: 'り', smallChar: 'ゃ', separateSound: 'り・や (리-야)', soundType: 'youon' },
      { char: 'りゅ', romaji: 'ryu', koreanSound: '류', row: 'りゃ', colIndex: 1, strokeCount: 4, strokeGuide: 'り 2획 ①② ➔ 오른쪽 아래 작은 ゅ 2획 ③④', soundTip: '혀끝을 튕기며 입술을 모아 [류] 소리를 냅니다. (용: りゅう)', baseChar: 'り', smallChar: 'ゅ', separateSound: 'り・ゆ (리-유)', soundType: 'youon' },
      { char: 'りょ', romaji: 'ryo', koreanSound: '료', row: 'りゃ', colIndex: 2, strokeCount: 4, strokeGuide: 'り 2획 ①② ➔ 오른쪽 아래 작은 ょ 2획 ③④', soundTip: '부드럽게 [료] 소리를 냅니다. (여행: りょこう, 요리: りょうり)', baseChar: 'り', smallChar: 'ょ', separateSound: 'り・よ (리-요)', soundType: 'youon' },
    ]
  },
  {
    name: 'ぎゃ행 (gya / gyu / gyo - 탁음)',
    chars: [
      { char: 'ぎゃ', romaji: 'gya', koreanSound: '갸', row: 'ぎゃ', colIndex: 0, strokeCount: 9, strokeGuide: 'ぎ 6획 ①②③④⑤⑥ ➔ 오른쪽 아래 작은 ゃ 3획 ⑦⑧⑨', soundTip: '목을 울리며 굵직하게 [갸] 소리를 냅니다. (반대: ぎゃく)', baseChar: 'ぎ', smallChar: 'ゃ', separateSound: 'ぎ・や (기-야)', soundType: 'youon' },
      { char: 'ぎゅ', romaji: 'gyu', koreanSound: '규', row: 'ぎゃ', colIndex: 1, strokeCount: 8, strokeGuide: 'ぎ 6획 ①②③④⑤⑥ ➔ 오른쪽 아래 작은 ゅ 2획 ⑦⑧', soundTip: '목을 울리며 입술을 모아 [규] 소리를 냅니다. (소고기: ぎゅうにく)', baseChar: 'ぎ', smallChar: 'ゅ', separateSound: 'ぎ・ゆ (기-유)', soundType: 'youon' },
      { char: 'ぎょ', romaji: 'gyo', koreanSound: '교', row: 'ぎゃ', colIndex: 2, strokeCount: 8, strokeGuide: 'ぎ 6획 ①②③④⑤⑥ ➔ 오른쪽 아래 작은 ょ 2획 ⑦⑧', soundTip: '울림을 주며 [교] 소리를 냅니다. (교자/만두: ぎょうざ)', baseChar: 'ぎ', smallChar: 'ょ', separateSound: 'ぎ・よ (기-요)', soundType: 'youon' },
    ]
  },
  {
    name: 'じゃ행 (ja / ju / jo - 탁음)',
    chars: [
      { char: 'じゃ', romaji: 'ja', koreanSound: '자', row: 'じゃ', colIndex: 0, strokeCount: 6, strokeGuide: 'じ 3획 ①②③ ➔ 오른쪽 아래 작은 ゃ 3획 ④⑤⑥', soundTip: '한국어 [자]보다 부드럽게 [ja] 소리를 냅니다. (실례합니다: おじゃまします)', baseChar: 'じ', smallChar: 'ゃ', separateSound: 'じ・や (지-야)', soundType: 'youon' },
      { char: 'じゅ', romaji: 'ju', koreanSound: '주', row: 'じゃ', colIndex: 1, strokeCount: 5, strokeGuide: 'じ 3획 ①②③ ➔ 오른쪽 아래 작은 ゅ 2획 ④⑤', soundTip: '부드럽게 [ju] 소리를 냅니다. (숫자 10: じゅう, 주소: じゅうしょ)', baseChar: 'じ', smallChar: 'ゅ', separateSound: 'じ・ゆ (지-유)', soundType: 'youon' },
      { char: 'じょ', romaji: 'jo', koreanSound: '조', row: 'じゃ', colIndex: 2, strokeCount: 5, strokeGuide: 'じ 3획 ①②③ ➔ 오른쪽 아래 작은 ょ 2획 ④⑤', soundTip: '부드럽게 [jo] 소리를 냅니다. (능숙함: じょうず)', baseChar: 'じ', smallChar: 'ょ', separateSound: 'じ・よ (지-요)', soundType: 'youon' },
    ]
  },
  {
    name: 'ぢゃ행 (ja / ju / jo - だ행 탁음)',
    chars: [
      { char: 'ぢゃ', romaji: 'ja', koreanSound: '자', row: 'ぢゃ', colIndex: 0, strokeCount: 7, strokeGuide: 'ぢ 4획 ①②③④ ➔ 오른쪽 아래 작은 ゃ 3획 ⑤⑥⑦', soundTip: '현대 일본어에서는 じゃ(ja)와 발음이 100% 동일합니다.', baseChar: 'ぢ', smallChar: 'ゃ', separateSound: 'ぢ・や (지-야)', soundType: 'youon' },
      { char: 'ぢゅ', romaji: 'ju', koreanSound: '주', row: 'ぢゃ', colIndex: 1, strokeCount: 6, strokeGuide: 'ぢ 4획 ①②③④ ➔ 오른쪽 아래 작은 ゅ 2획 ⑤⑥', soundTip: '현대 일본어에서는 じゅ(ju)와 발음이 100% 동일합니다.', baseChar: 'ぢ', smallChar: 'ゅ', separateSound: 'ぢ・ゆ (지-유)', soundType: 'youon' },
      { char: 'ぢょ', romaji: 'jo', koreanSound: '조', row: 'ぢゃ', colIndex: 2, strokeCount: 6, strokeGuide: 'ぢ 4획 ①②③④ ➔ 오른쪽 아래 작은 ょ 2획 ⑤⑥', soundTip: '현대 일본어에서는 じょ(jo)와 발음이 100% 동일합니다.', baseChar: 'ぢ', smallChar: 'ょ', separateSound: 'ぢ・よ (지-요)', soundType: 'youon' },
    ]
  },
  {
    name: 'びゃ행 (bya / byu / byo - 탁음)',
    chars: [
      { char: 'びゃ', romaji: 'bya', koreanSound: '뱌', row: 'びゃ', colIndex: 0, strokeCount: 6, strokeGuide: 'び 3획 ①②③ ➔ 오른쪽 아래 작은 ゃ 3획 ④⑤⑥', soundTip: '입술을 붙였다 떼며 울리는 [뱌] 소리를 냅니다. (300: さんびゃく)', baseChar: 'び', smallChar: 'ゃ', separateSound: 'び・や (비-야)', soundType: 'youon' },
      { char: 'びゅ', romaji: 'byu', koreanSound: '뷰', row: 'びゃ', colIndex: 1, strokeCount: 5, strokeGuide: 'び 3획 ①②③ ➔ 오른쪽 아래 작은 ゅ 2획 ④⑤', soundTip: '입술을 모으며 [뷰] 소리를 냅니다.', baseChar: 'び', smallChar: 'ゅ', separateSound: 'び・ゆ (비-유)', soundType: 'youon' },
      { char: 'びょ', romaji: 'byo', koreanSound: '뵤', row: 'びゃ', colIndex: 2, strokeCount: 5, strokeGuide: 'び 3획 ①②③ ➔ 오른쪽 아래 작은 ょ 2획 ④⑤', soundTip: '울림을 주며 [뵤] 소리를 냅니다. (병원: びょういん)', baseChar: 'び', smallChar: 'ょ', separateSound: 'び・よ (비-요)', soundType: 'youon' },
    ]
  },
  {
    name: 'ぴゃ행 (pya / pyu / pyo - 반탁음)',
    chars: [
      { char: 'ぴゃ', romaji: 'pya', koreanSound: '퍄', row: 'ぴゃ', colIndex: 0, strokeCount: 5, strokeGuide: 'ぴ 2획 ①② ➔ 오른쪽 아래 작은 ゃ 3획 ③④⑤', soundTip: '양 입술을 터뜨리며 강하게 [퍄] 소리를 냅니다. (600: ろっぴゃく)', baseChar: 'ぴ', smallChar: 'ゃ', separateSound: 'ぴ・や (피-야)', soundType: 'youon' },
      { char: 'ぴゅ', romaji: 'pyu', koreanSound: '퓨', row: 'ぴゃ', colIndex: 1, strokeCount: 4, strokeGuide: 'ぴ 2획 ①② ➔ 오른쪽 아래 작은 ゅ 2획 ③④', soundTip: '입술을 튕기며 [퓨] 소리를 냅니다.', baseChar: 'ぴ', smallChar: 'ゅ', separateSound: 'ぴ・ゆ (피-유)', soundType: 'youon' },
      { char: 'ぴょ', romaji: 'pyo', koreanSound: '표', row: 'ぴゃ', colIndex: 2, strokeCount: 4, strokeGuide: 'ぴ 2획 ①② ➔ 오른쪽 아래 작은 ょ 2획 ③④', soundTip: '귀엽게 톡 튀기듯 [표] 소리를 냅니다. (깡충깡충: ぴょんぴょん)', baseChar: 'ぴ', smallChar: 'ょ', separateSound: 'ぴ・よ (피-요)', soundType: 'youon' },
    ]
  }
];

// 요음 36자 목록
export const ALL_YOUON_CHARS: HiraganaChar[] = YOUON_GRID.flatMap((r) =>
  r.chars.filter(Boolean) as HiraganaChar[]
);

// 전체 히라가나 107자 (청음 46 + 탁음/반탁음 25 + 요음 36)
export const COMBINED_HIRAGANA_CHARS: HiraganaChar[] = [
  ...ALL_SEION_CHARS,
  ...ALL_DAKUON_CHARS,
  ...ALL_YOUON_CHARS
];

export interface DakuonTransformRule {
  id: string;
  sourceRow: string;
  targetRow: string;
  mark: string; // ゛ or ゜
  markName: string;
  changeFormula: string; // K ➔ G 등
  examplePair: { seion: string; dakuon: string; seionSound: string; dakuonSound: string };
  description: string;
}

export const DAKUON_TRANSFORM_RULES: DakuonTransformRule[] = [
  {
    id: 'k-to-g',
    sourceRow: 'か행 (K)',
    targetRow: 'が행 (G)',
    mark: '゛',
    markName: '탁점 (땡땡)',
    changeFormula: 'K ➔ G',
    examplePair: { seion: 'か', dakuon: 'が', seionSound: 'ka', dakuonSound: 'ga' },
    description: '맑은 K 소리에 탁점(゛)이 붙어 목을 울리는 G 소리로 바뀝니다.'
  },
  {
    id: 's-to-z',
    sourceRow: 'さ행 (S)',
    targetRow: 'ざ행 (Z)',
    mark: '゛',
    markName: '탁점 (땡땡)',
    changeFormula: 'S ➔ Z',
    examplePair: { seion: 'さ', dakuon: 'ざ', seionSound: 'sa', dakuonSound: 'za' },
    description: 'S 소리에 탁점(゛)이 붙어 벌이 윙윙대듯(zzz) 울리는 Z 소리로 바뀝니다. (じ는 ji)'
  },
  {
    id: 't-to-d',
    sourceRow: 'た행 (T)',
    targetRow: 'だ행 (D)',
    mark: '゛',
    markName: '탁점 (땡땡)',
    changeFormula: 'T ➔ D',
    examplePair: { seion: 'た', dakuon: 'だ', seionSound: 'ta', dakuonSound: 'da' },
    description: 'T 소리에 탁점(゛)이 붙어 D 소리로 바뀝니다. (ぢ=ji, づ=zu는 じ, ず와 동음)'
  },
  {
    id: 'h-to-b',
    sourceRow: 'は행 (H)',
    targetRow: 'ば행 (B)',
    mark: '゛',
    markName: '탁점 (땡땡)',
    changeFormula: 'H ➔ B',
    examplePair: { seion: 'は', dakuon: 'ば', seionSound: 'ha', dakuonSound: 'ba' },
    description: '바람 빠지는 H 소리에 탁점(゛)이 붙어 입술을 닫았다 여는 B 소리로 바뀝니다.'
  },
  {
    id: 'h-to-p',
    sourceRow: 'は행 (H)',
    targetRow: 'ぱ행 (P)',
    mark: '゜',
    markName: '반탁점 (동그라미)',
    changeFormula: 'H ➔ P (반탁음)',
    examplePair: { seion: 'は', dakuon: 'ぱ', seionSound: 'ha', dakuonSound: 'pa' },
    description: 'は행에 작은 동그라미(゜)가 붙어 팡 터지는 귀여운 P 소리로 바뀝니다.'
  }
];

export interface YouonTransformRule {
  id: string;
  name: string;
  smallChar: string; // ゃ, ゅ, ょ
  vowelSound: string; // a, u, o
  changeFormula: string;
  examplePair: { base: string; small: string; youon: string; separateSound: string; youonSound: string };
  description: string;
}

export const YOUON_TRANSFORM_RULES: YouonTransformRule[] = [
  {
    id: 'ya-rule',
    name: '작은 ゃ (-ya)',
    smallChar: 'ゃ',
    vowelSound: 'a',
    changeFormula: 'i단 + ゃ ➔ [ya]',
    examplePair: { base: 'き', small: 'ゃ', youon: 'きゃ', separateSound: 'ki・ya (키-야)', youonSound: 'kya (캬)' },
    description: '앞 글자의 자음에 [ya] 모음이 합쳐져 1박자로 소리 납니다. (예: き+ゃ ➔ きゃ 캬)'
  },
  {
    id: 'yu-rule',
    name: '작은 ゅ (-yu)',
    smallChar: 'ゅ',
    vowelSound: 'u',
    changeFormula: 'i단 + ゅ ➔ [yu]',
    examplePair: { base: 'き', small: 'ゅ', youon: 'きゅ', separateSound: 'ki・yu (키-유)', youonSound: 'kyu (큐)' },
    description: '앞 글자의 자음에 [yu] 모음이 합쳐져 입술을 모으며 1박자로 발음합니다. (예: き+ゅ ➔ きゅ 큐)'
  },
  {
    id: 'yo-rule',
    name: '작은 ょ (-yo)',
    smallChar: 'ょ',
    vowelSound: 'o',
    changeFormula: 'i단 + ょ ➔ [yo]',
    examplePair: { base: 'き', small: 'ょ', youon: 'きょ', separateSound: 'ki・yo (키-요)', youonSound: 'kyo (쿄)' },
    description: '앞 글자의 자음에 [yo] 모음이 합쳐져 입을 둥글게 모으며 1박자로 발음합니다. (예: き+ょ ➔ きょ 쿄)'
  }
];

// 배운 글자로 바로 읽는 실생활 미니 단어 세트 (50음도 46자 + 조사 を, 받침 ん 전수 포함)
export const MINI_WORDS: MiniWord[] = [
  // --- 음식 ---
  { id: 'mw-1', japanese: 'すし', romaji: 'su-shi', koreanMeaning: '초밥', emoji: '🍣', category: '음식', wordType: 'seion' },
  { id: 'mw-2', japanese: 'にく', romaji: 'ni-ku', koreanMeaning: '고기', emoji: '🥩', category: '음식', wordType: 'seion' },
  { id: 'mw-3', japanese: 'たこ', romaji: 'ta-ko', koreanMeaning: '문어', emoji: '🐙', category: '음식', wordType: 'seion' },
  { id: 'mw-4', japanese: 'もも', romaji: 'mo-mo', koreanMeaning: '복숭아', emoji: '🍑', category: '음식', wordType: 'seion' },
  { id: 'mw-5', japanese: 'みかん', romaji: 'mi-ka-n', koreanMeaning: '귤', emoji: '🍊', category: '음식', wordType: 'seion' },

  // --- 동물 ---
  { id: 'mw-6', japanese: 'いぬ', romaji: 'i-nu', koreanMeaning: '강아지', emoji: '🐶', category: '동물', wordType: 'seion' },
  { id: 'mw-7', japanese: 'ねこ', romaji: 'ne-ko', koreanMeaning: '고양이', emoji: '🐱', category: '동물', wordType: 'seion' },
  { id: 'mw-8', japanese: 'くま', romaji: 'ku-ma', koreanMeaning: '곰', emoji: '🐻', category: '동물', wordType: 'seion' },
  { id: 'mw-9', japanese: 'きつね', romaji: 'ki-tsu-ne', koreanMeaning: '여우', emoji: '🦊', category: '동물', wordType: 'seion' },
  { id: 'mw-10', japanese: 'とり', romaji: 'to-ri', koreanMeaning: '새', emoji: '🐦', category: '동물', wordType: 'seion' },
  { id: 'mw-11', japanese: 'はち', romaji: 'ha-chi', koreanMeaning: '꿀벌', emoji: '🐝', category: '동물' },

  // --- 자연 ---
  { id: 'mw-12', japanese: 'うみ', romaji: 'u-mi', koreanMeaning: '바다', emoji: '🌊', category: '자연' },
  { id: 'mw-13', japanese: 'やま', romaji: 'ya-ma', koreanMeaning: '산', emoji: '⛰️', category: '자연' },
  { id: 'mw-14', japanese: 'かわ', romaji: 'ka-wa', koreanMeaning: '강 (river)', emoji: '🏞️', category: '자연' },
  { id: 'mw-15', japanese: 'そら', romaji: 'so-ra', koreanMeaning: '하늘', emoji: '🌤️', category: '자연' },
  { id: 'mw-16', japanese: 'ゆき', romaji: 'yu-ki', koreanMeaning: '눈 (snow)', emoji: '❄️', category: '자연' },
  { id: 'mw-17', japanese: 'つき', romaji: 'tsu-ki', koreanMeaning: '달 (moon)', emoji: '🌙', category: '자연' },
  { id: 'mw-18', japanese: 'ほし', romaji: 'ho-shi', koreanMeaning: '별 (star)', emoji: '⭐', category: '자연' },
  { id: 'mw-19', japanese: 'はな', romaji: 'ha-na', koreanMeaning: '꽃', emoji: '🌸', category: '자연' },
  { id: 'mw-20', japanese: 'さくら', romaji: 'sa-ku-ra', koreanMeaning: '벚꽃', emoji: '🌸', category: '자연' },
  { id: 'mw-21', japanese: 'たけ', romaji: 'ta-ke', koreanMeaning: '대나무', emoji: '🎋', category: '자연' },
  { id: 'mw-22', japanese: 'せみ', romaji: 'se-mi', koreanMeaning: '매미', emoji: '🦗', category: '자연' },

  // --- 물건 ---
  { id: 'mw-23', japanese: 'かさ', romaji: 'ka-sa', koreanMeaning: '우산', emoji: '☂️', category: '물건' },
  { id: 'mw-24', japanese: 'ほん', romaji: 'ho-n', koreanMeaning: '책', emoji: '📖', category: '물건' },
  { id: 'mw-25', japanese: 'ぬの', romaji: 'nu-no', koreanMeaning: '천 / 패브릭', emoji: '🧶', category: '물건' },
  { id: 'mw-26', japanese: 'ふね', romaji: 'fu-ne', koreanMeaning: '배 (선박)', emoji: '🚢', category: '물건' },

  // --- 시간 ---
  { id: 'mw-27', japanese: 'あさ', romaji: 'a-sa', koreanMeaning: '아침', emoji: '🌅', category: '시간' },
  { id: 'mw-28', japanese: 'よる', romaji: 'yo-ru', koreanMeaning: '밤', emoji: '🌙', category: '시간' },
  { id: 'mw-29', japanese: 'なつ', romaji: 'na-tsu', koreanMeaning: '여름', emoji: '🌻', category: '시간' },

  // --- 일상 ---
  { id: 'mw-30', japanese: 'えき', romaji: 'e-ki', koreanMeaning: '기차역 / 지하철역', emoji: '🚉', category: '일상' },
  { id: 'mw-31', japanese: 'おと', romaji: 'o-to', koreanMeaning: '소리', emoji: '🎵', category: '일상' },
  { id: 'mw-32', japanese: 'へや', romaji: 'he-ya', koreanMeaning: '방 (room)', emoji: '🚪', category: '일상' },
  { id: 'mw-33', japanese: 'て', romaji: 'te', koreanMeaning: '손', emoji: '✋', category: '일상' },
  { id: 'mw-34', japanese: 'ひと', romaji: 'hi-to', koreanMeaning: '사람', emoji: '👤', category: '일상' },
  { id: 'mw-35', japanese: 'あめ', romaji: 'a-me', koreanMeaning: '비 / 사탕', emoji: '🍬', category: '일상' },
  { id: 'mw-36', japanese: 'けむり', romaji: 'ke-mu-ri', koreanMeaning: '연기', emoji: '💨', category: '일상' },
  { id: 'mw-37', japanese: 'これ', romaji: 'ko-re', koreanMeaning: '이것', emoji: '👈', category: '일상' },
  { id: 'mw-38', japanese: 'しろ', romaji: 'shi-ro', koreanMeaning: '하양 / 성(城)', emoji: '🏯', category: '일상' },

  // --- 감정 ---
  { id: 'mw-39', japanese: 'あい', romaji: 'a-i', koreanMeaning: '사랑', emoji: '❤️', category: '감정' },

  // --- 표현 (조사 を) ---
  { id: 'mw-40', japanese: 'ほんを', romaji: 'ho-n-wo', koreanMeaning: '책을 (조사 を)', emoji: '🎯', category: '표현' },

  // --- 탁음 / 반탁음 실생활 단어 (15개) ---
  { id: 'mw-d1', japanese: 'りんご', romaji: 'ri-n-go', koreanMeaning: '사과', emoji: '🍎', category: '음식 (탁음)', wordType: 'dakuon' },
  { id: 'mw-d2', japanese: 'たまご', romaji: 'ta-ma-go', koreanMeaning: '달걀 / 계란', emoji: '🥚', category: '음식 (탁음)', wordType: 'dakuon' },
  { id: 'mw-d3', japanese: 'みず', romaji: 'mi-zu', koreanMeaning: '물', emoji: '💧', category: '일상 (탁음)', wordType: 'dakuon' },
  { id: 'mw-d4', japanese: 'かぜ', romaji: 'ka-ze', koreanMeaning: '바람 / 감기', emoji: '🍃', category: '자연 (탁음)', wordType: 'dakuon' },
  { id: 'mw-d5', japanese: 'かばん', romaji: 'ka-ba-n', koreanMeaning: '가방', emoji: '🎒', category: '물건 (탁음)', wordType: 'dakuon' },
  { id: 'mw-d6', japanese: 'かぎ', romaji: 'ka-gi', koreanMeaning: '열쇠', emoji: '🔑', category: '물건 (탁음)', wordType: 'dakuon' },
  { id: 'mw-d7', japanese: 'きっぷ', romaji: 'ki-p-pu', koreanMeaning: '표 / 승차권 (반탁음 ぷ)', emoji: '🎫', category: '여행 (탁음)', wordType: 'dakuon' },
  { id: 'mw-d8', japanese: 'てんぷら', romaji: 'te-n-pu-ra', koreanMeaning: '튀김 (반탁음 ぷ)', emoji: '🍤', category: '음식 (탁음)', wordType: 'dakuon' },
  { id: 'mw-d9', japanese: 'えんぴつ', romaji: 'e-n-pi-tsu', koreanMeaning: '연필 (반탁음 ぴ)', emoji: '✏️', category: '물건 (탁음)', wordType: 'dakuon' },
  { id: 'mw-d10', japanese: 'さんぽ', romaji: 'sa-n-po', koreanMeaning: '산책 (반탁음 ぽ)', emoji: '🚶', category: '일상 (탁음)', wordType: 'dakuon' },
  { id: 'mw-d11', japanese: 'かんぱい', romaji: 'ka-n-pa-i', koreanMeaning: '건배 (반탁음 ぱ)', emoji: '🍻', category: '표현 (탁음)', wordType: 'dakuon' },
  { id: 'mw-d12', japanese: 'ともだち', romaji: 'to-mo-da-chi', koreanMeaning: '친구 (탁음 だ)', emoji: '🤝', category: '일상 (탁음)', wordType: 'dakuon' },
  { id: 'mw-d13', japanese: 'かぞく', romaji: 'ka-zo-ku', koreanMeaning: '가족 (탁음 ぞ)', emoji: '👨‍👩‍👧', category: '일상 (탁음)', wordType: 'dakuon' },
  { id: 'mw-d14', japanese: 'ひだり', romaji: 'hi-da-ri', koreanMeaning: '왼쪽 (탁음 だ)', emoji: '⬅️', category: '일상 (탁음)', wordType: 'dakuon' },
  { id: 'mw-d15', japanese: 'みぎ', romaji: 'mi-gi', koreanMeaning: '오른쪽 (탁음 ぎ)', emoji: '➡️', category: '일상 (탁음)', wordType: 'dakuon' },

  // --- 요음 실생활 단어 (36개 전수 매칭) ---
  // きゃ행 (3개)
  { id: 'mw-y1', japanese: 'きゃべつ', romaji: 'kya-be-tsu', koreanMeaning: '양배추 (きゃ)', emoji: '🥬', category: '음식 (요음)', wordType: 'youon' },
  { id: 'mw-y2', japanese: 'きゅうり', romaji: 'kyu-u-ri', koreanMeaning: '오이 (きゅ)', emoji: '🥒', category: '음식 (요음)', wordType: 'youon' },
  { id: 'mw-y3', japanese: 'きょう', romaji: 'kyo-u', koreanMeaning: '오늘 (きょ)', emoji: '📅', category: '시간 (요음)', wordType: 'youon' },

  // しゃ행 (3개)
  { id: 'mw-y4', japanese: 'しゃしん', romaji: 'sha-shi-n', koreanMeaning: '사진 (しゃ)', emoji: '📷', category: '물건 (요음)', wordType: 'youon' },
  { id: 'mw-y5', japanese: 'しゅみ', romaji: 'shu-mi', koreanMeaning: '취미 (しゅ)', emoji: '🎨', category: '일상 (요음)', wordType: 'youon' },
  { id: 'mw-y6', japanese: 'しょくどう', romaji: 'sho-ku-do-u', koreanMeaning: '식당 (しょ)', emoji: '🍽️', category: '장소 (요음)', wordType: 'youon' },

  // ちゃ행 (3개)
  { id: 'mw-y7', japanese: 'おちゃ', romaji: 'o-cha', koreanMeaning: '차 / 녹차 (ちゃ)', emoji: '🍵', category: '음식 (요음)', wordType: 'youon' },
  { id: 'mw-y8', japanese: 'ちゅうしゃ', romaji: 'chu-u-sha', koreanMeaning: '주사 (ちゅ)', emoji: '💉', category: '일상 (요음)', wordType: 'youon' },
  { id: 'mw-y9', japanese: 'ちょっと', romaji: 'cho-t-to', koreanMeaning: '잠깐만 / 조금 (ちょ)', emoji: '🤏', category: '표현 (요음)', wordType: 'youon' },

  // にゃ행 (3개)
  { id: 'mw-y10', japanese: 'にゃんこ', romaji: 'nya-n-ko', koreanMeaning: '야옹이 / 고양이 (にゃ)', emoji: '🐱', category: '동물 (요음)', wordType: 'youon' },
  { id: 'mw-y11', japanese: 'ぎゅうにゅう', romaji: 'gyu-u-nyu-u', koreanMeaning: '우유 (にゅ)', emoji: '🥛', category: '음식 (요음)', wordType: 'youon' },
  { id: 'mw-y12', japanese: 'にょきにょき', romaji: 'nyo-ki-nyo-ki', koreanMeaning: '쑥쑥 자람 (にょ)', emoji: '🌱', category: '자연 (요음)', wordType: 'youon' },

  // ひゃ행 (3개)
  { id: 'mw-y13', japanese: 'ひゃく', romaji: 'hya-ku', koreanMeaning: '백 / 100 (ひゃ)', emoji: '💯', category: '숫자 (요음)', wordType: 'youon' },
  { id: 'mw-y14', japanese: 'ひゅうひゅう', romaji: 'hyu-u-hyu-u', koreanMeaning: '쌩쌩 바람 소리 (ひゅ)', emoji: '🌬️', category: '자연 (요음)', wordType: 'youon' },
  { id: 'mw-y15', japanese: 'ひょう', romaji: 'hyo-u', koreanMeaning: '표 / 차트 (ひょ)', emoji: '📊', category: '물건 (요음)', wordType: 'youon' },

  // みゃ행 (3개)
  { id: 'mw-y16', japanese: 'みゃく', romaji: 'mya-ku', koreanMeaning: '맥박 / 맥 (みゃ)', emoji: '💓', category: '일상 (요음)', wordType: 'youon' },
  { id: 'mw-y17', japanese: 'みゅーじあむ', romaji: 'myu-u-ji-a-mu', koreanMeaning: '박물관 (みゅ)', emoji: '🏛️', category: '장소 (요음)', wordType: 'youon' },
  { id: 'mw-y18', japanese: 'みょうじ', romaji: 'myo-u-ji', koreanMeaning: '성씨 / 성 (みょ)', emoji: '🏷️', category: '일상 (요음)', wordType: 'youon' },

  // りゃ행 (3개)
  { id: 'mw-y19', japanese: 'りゃくご', romaji: 'rya-ku-go', koreanMeaning: '줄임말 / 약어 (りゃ)', emoji: '✂️', category: '표현 (요음)', wordType: 'youon' },
  { id: 'mw-y20', japanese: 'りゅう', romaji: 'ryu-u', koreanMeaning: '용 (Dragon) (りゅ)', emoji: '🐉', category: '자연 (요음)', wordType: 'youon' },
  { id: 'mw-y21', japanese: 'りょこう', romaji: 'ryo-ko-u', koreanMeaning: '여행 (りょ)', emoji: '✈️', category: '여행 (요음)', wordType: 'youon' },

  // ぎゃ행 (3개)
  { id: 'mw-y22', japanese: 'ぎゃく', romaji: 'gya-ku', koreanMeaning: '반대 / 역 (ぎゃ)', emoji: '🔄', category: '일상 (요음)', wordType: 'youon' },
  { id: 'mw-y23', japanese: 'ぎゅうにく', romaji: 'gyu-u-ni-ku', koreanMeaning: '소고기 (ぎゅ)', emoji: '🥩', category: '음식 (요음)', wordType: 'youon' },
  { id: 'mw-y24', japanese: 'ぎょうざ', romaji: 'gyo-u-za', koreanMeaning: '교자 / 만두 (ぎょ)', emoji: '🥟', category: '음식 (요음)', wordType: 'youon' },

  // じゃ행 (3개)
  { id: 'mw-y25', japanese: 'じゃがいも', romaji: 'ja-ga-i-mo', koreanMeaning: '감자 (じゃ)', emoji: '🥔', category: '음식 (요음)', wordType: 'youon' },
  { id: 'mw-y26', japanese: 'じゅう', romaji: 'ju-u', koreanMeaning: '숫자 10 (じゅ)', emoji: '🔟', category: '숫자 (요음)', wordType: 'youon' },
  { id: 'mw-y27', japanese: 'じょうず', romaji: 'jo-u-zu', koreanMeaning: '능숙함 / 잘함 (じょ)', emoji: '👍', category: '표현 (요음)', wordType: 'youon' },

  // ぢゃ행 (3개)
  { id: 'mw-y28', japanese: 'はなぢゃ', romaji: 'ha-na-ja', koreanMeaning: '코피야 (ぢゃ: じゃ와 동음)', emoji: '🩸', category: '일상 (요음)', wordType: 'youon' },
  { id: 'mw-y29', japanese: 'ちぢゅく', romaji: 'chi-ju-ku', koreanMeaning: '줄어들다 (ぢゅ: じゅ와 동음)', emoji: '📉', category: '일상 (요음)', wordType: 'youon' },
  { id: 'mw-y30', japanese: 'もみぢょ', romaji: 'mo-mi-jo', koreanMeaning: '단풍잎 (ぢょ: じょ와 동음)', emoji: '🍁', category: '자연 (요음)', wordType: 'youon' },

  // びゃ행 (3개)
  { id: 'mw-y31', japanese: 'さんびゃく', romaji: 'sa-n-bya-ku', koreanMeaning: '삼백 / 300 (びゃ)', emoji: '💯', category: '숫자 (요음)', wordType: 'youon' },
  { id: 'mw-y32', japanese: 'びゅうびゅう', romaji: 'byu-u-byu-u', koreanMeaning: '쌩쌩 거센 바람 (びゅ)', emoji: '💨', category: '자연 (요음)', wordType: 'youon' },
  { id: 'mw-y33', japanese: 'びょういん', romaji: 'byo-u-i-n', koreanMeaning: '병원 (びょ)', emoji: '🏥', category: '장소 (요음)', wordType: 'youon' },

  // ぴゃ행 (3개)
  { id: 'mw-y34', japanese: 'ろっぴゃく', romaji: 'ro-p-pya-ku', koreanMeaning: '육백 / 600 (ぴゃ)', emoji: '💯', category: '숫자 (요음)', wordType: 'youon' },
  { id: 'mw-y35', japanese: 'ぴゅうぴゅう', romaji: 'pyu-u-pyu-u', koreanMeaning: '휘이익 바람 (ぴゅ)', emoji: '🌪️', category: '자연 (요음)', wordType: 'youon' },
  { id: 'mw-y36', japanese: 'ぴょんぴょん', romaji: 'pyo-n-pyo-n', koreanMeaning: '깡충깡충 토끼 (ぴょ)', emoji: '🐇', category: '동물 (요음)', wordType: 'youon' },
];

// 청음 기본 단어 목록 (40개)
export const SEION_MINI_WORDS: MiniWord[] = MINI_WORDS.filter((w) => w.wordType !== 'dakuon' && w.wordType !== 'youon');

// 탁음·반탁음 단어 목록 (15개)
export const DAKUON_MINI_WORDS: MiniWord[] = MINI_WORDS.filter((w) => w.wordType === 'dakuon');

// 요음 실생활 단어 목록 (36개)
export const YOUON_MINI_WORDS: MiniWord[] = MINI_WORDS.filter((w) => w.wordType === 'youon');

// 도플갱어 (헷갈리는 글자) 대조 훈련 데이터
export const CONFUSING_PAIRS: ConfusingPair[] = [
  {
    id: 'cp-1',
    title: '곡선 방향이 정반대인 도플갱어',
    char1: { char: 'さ', romaji: 'sa', korean: '사', feature: '아래 둥근 부분이 오른쪽을 향함' },
    char2: { char: 'ち', romaji: 'chi', korean: '치', feature: '아래 둥근 부분이 왼쪽을 향함 (5자 모양)' },
    tip: 'さ(사)는 사이다 따를 때 오른쪽 거품, ち(치)는 숫자 5처럼 왼쪽으로 불룩해요!'
  },
  {
    id: 'cp-2',
    title: '마무리 꼬임이 다른 3형제',
    char1: { char: 'れ', romaji: 're', korean: '레', feature: '마지막 획이 바깥쪽으로 시원하게 삐침' },
    char2: { char: 'わ', romaji: 'wa', korean: '와', feature: '마지막 획이 안쪽으로 둥글게 말려 끝남' },
    char3: { char: 'ね', romaji: 'ne', korean: '네', feature: '마지막 획 끝에 동그란 돼지꼬리 매듭' },
    tip: 'れ는 레슬러 발차기(삐침), わ는 와인잔 둥근 엉덩이, ね는 네모 돼지꼬리 매듭!'
  },
  {
    id: 'cp-3',
    title: '지붕 삐침 유무 대조',
    char1: { char: 'は', romaji: 'ha', korean: '하', feature: '세로선 위로 지붕이 튀어나오지 않음' },
    char2: { char: 'ほ', romaji: 'ho', korean: '호', feature: '가로선이 위로 삐죽 모자를 쓰고 있음' },
    tip: 'ほ(호)는 모자 쓴 호빵맨, は(하)는 모자가 벗겨져 하하하 웃어요!'
  },
  {
    id: 'cp-4',
    title: '돼지꼬리 매듭 유무 대조',
    char1: { char: 'め', romaji: 'me', korean: '메', feature: '둥글게 깔끔하게 마무리' },
    char2: { char: 'ぬ', romaji: 'nu', korean: '누', feature: '끝에 작은 꼬리가 묶여 있음' },
    tip: 'め는 눈(目:메)처럼 동그랗고, ぬ는 꼬리 달린 누에고치예요!'
  }
];

// 첫 발화 챌린지 데이터
export const FIRST_DIALOGUE_LIST: FirstDialogueItem[] = [
  {
    id: 'fd-1',
    situation: '친구나 점원에게 따뜻한 감사를 전할 때',
    japanese: 'ありがとう！',
    romaji: 'a-ri-ga-to-o',
    koreanPronunciation: '아리가토-!',
    koreanMeaning: '고마워요!',
    tip: '끝의 う는 길게 끄는 장음이에요. [아리가토-]하고 살짝 늘여주면 아주 자연스러워요.'
  },
  {
    id: 'fd-2',
    situation: '식당에서 직원을 부르거나, 길을 지나갈 때',
    japanese: 'すみません',
    romaji: 'su-mi-ma-se-n',
    koreanPronunciation: '스미마센',
    koreanMeaning: '저기요 / 미안합니다 / 감사합니다',
    tip: '일본에서 가장 유용한 만능 표현! 말끝을 살짝 올리며 [스미마센~] 부르면 백 점 만점!'
  },
  {
    id: 'fd-3',
    situation: '메뉴판을 가리키며 음식을 주문할 때',
    japanese: 'これ ください！',
    romaji: 'ko-re ku-da-sa-i',
    koreanPronunciation: '코레 쿠다사이!',
    koreanMeaning: '이거 주세요!',
    tip: '손가락으로 콕 짚으며 말해보세요. 이것 하나면 일본 여행 주문 100% 성공!'
  },
  {
    id: 'fd-4',
    situation: '식사 전 두 손을 모으고 예의 바르게 인사할 때',
    japanese: 'いただきます！',
    romaji: 'i-ta-da-ki-ma-su',
    koreanPronunciation: '이타다키마스!',
    koreanMeaning: '잘 먹겠습니다!',
    tip: '탁음 だ(da)가 들어간 대표 인사말! 밥 먹기 전 두 손을 모으고 씩씩하게 외쳐보세요.'
  },
  {
    id: 'fd-5',
    situation: '길을 묻거나 물건/장소가 어디 있는지 물을 때',
    japanese: 'どこですか？',
    romaji: 'do-ko-de-su-ka',
    koreanPronunciation: '도코데스카?',
    koreanMeaning: '어디인가요?',
    tip: '탁음 ど(do)로 시작하는 필수 여행 회화! 역(えき)이나 화장실(トイレ) 뒤에 붙여 말해보세요.'
  },
  {
    id: 'fd-6',
    situation: '카페나 식당에서 따뜻한 차를 주문할 때',
    japanese: 'おちゃ、ください！',
    romaji: 'o-cha ku-da-sa-i',
    koreanPronunciation: '오차, 쿠다사이!',
    koreanMeaning: '차(녹차) 주세요!',
    tip: '요음 ちゃ(cha)가 들어간 대표 필수 표현! 식당에서 물(みず) 대신 차(おちゃ)를 요청할 때도 써보세요.'
  },
  {
    id: 'fd-7',
    situation: '관광 명소나 식당에서 사진 촬영을 정중히 요청할 때',
    japanese: 'しゃしん、いいですか？',
    romaji: 'sha-shi-n i-i-de-su-ka',
    koreanPronunciation: '샤신, 이이데스카?',
    koreanMeaning: '사진 찍어도 될까요?',
    tip: '요음 しゃ(sha)가 들어간 여행 황금 표현! 카메라나 스마트폰을 살짝 가리키며 말하면 찰떡같이 통해요.'
  }
];
