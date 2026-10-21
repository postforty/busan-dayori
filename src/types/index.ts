export type Category = 'all' | 'gourmet' | 'cafe' | 'walk' | 'daily';

export type SoloFriendly = 'welcome' | 'possible' | 'difficult';
export type SpicyLevel = 0 | 1 | 2 | 3; // 0: 전혀 안매움, 1: 살짝 매움, 2: 신라면 수준, 3: 매움 주의

export interface PlaceInfo {
  koreanName: string;
  katakanaName: string;
  address: string;
  subway: string;
  hours: string;
  closedDay: string;
  soloFriendly: SoloFriendly;
  spicyLevel: SpicyLevel;
  cardOk: boolean;
  naverMapUrl: string;
  kakaoMapUrl?: string;
  googleMapUrl: string;
}

export interface LetterParagraph {
  text: string;
  imageUrl?: string;
  pronunciation?: string;
}

export interface Letter {
  id: string;
  title: string;
  date: string;
  category: Category;
  region: string;
  imageUrl: string;
  summary: string;
  content: LetterParagraph[]; // 단락별 일본어 본문 및 선택적 이미지
  studyPoint: {
    expression: string;
    meaning: string;
    memo: string;
  };
  placeInfo?: PlaceInfo;
  likes: number;
}

export interface Feedback {
  id: string;
  letterId: string;
  readerName: string;
  naturalness: 'natural' | 'awkward';
  suggestion?: string;
  comment: string;
  createdAt: string;
}

export interface Phrase {
  id: string;
  category: 'order' | 'spicy' | 'pay' | 'taxi' | 'convenience';
  japanese: string;
  korean: string;
  pronunciation: string; // 카타카나 발음
  tip?: string;
}

export interface Dialect {
  id: string;
  dialect: string;
  standard: string;
  japanese: string;
  situation: string;
  example: string;
}

export interface Question {
  id: string;
  authorName: string;
  targetMonth: string;
  question: string;
  answer?: string;
  createdAt: string;
}

export interface VocabItem {
  id: string;
  kanji: string;
  reading: string;
  meaning: string;
  partOfSpeech: string;
}

export interface GrammarPoint {
  title: string;
  structure: string;
  explanation: string;
  comparison?: string;
}

export interface WordBreakdown {
  word: string;           // 표기 (예: 店内, はい)
  reading?: string;       // 히라가나 읽기 (예: てんない)
  pronunciation?: string; // 한글 발음 (예: 텐나이)
  meaning: string;        // 한국어 뜻 (예: 가게 안, 매장)
}

export interface DialogueLine {
  speaker: string;
  japanese: string;
  korean: string;
  pronunciation?: string;
  breakdown?: WordBreakdown[];
}

export type LessonLevel = 'starter' | 'beginner' | 'intermediate' | 'advanced' | 'ai';
// starter: Lv.0 입문 | beginner: Lv.1 초급 | intermediate: Lv.2 중급 | advanced: Lv.3 실전 | ai: AI+ 실전 로컬 챌린지

export interface DailyLesson {
  id: string;
  dayNumber: number;
  seriesTitle: string;
  themeTitle: string;
  level?: LessonLevel;
  unitTitle?: string;
  pronunciationKorean?: string; // Lv.0용 한글 소리 표기
  keyExpression: {
    japanese: string;
    reading: string;
    korean: string;
    breakdown?: WordBreakdown[];
  };
  dialogue: DialogueLine[];
  grammar: GrammarPoint;
  vocabulary: VocabItem[];
  nuanceTip: string;
  relatedLetterId?: string;
}

export interface CurriculumUnit {
  id: string;
  unitNumber: number;
  title: string;
  description: string;
  keyPhrase: string;
  keyPhraseReading?: string;
  keyPhraseKorean: string;
  pronunciationKorean?: string;
  lessonId: string;
  lessonData?: DailyLesson;
}

export interface CurriculumLevel {
  level: LessonLevel;
  badge: string;
  title: string;
  subTitle: string;
  targetAudience: string;
  color: string;
  bgLight: string;
  borderColor: string;
  units: CurriculumUnit[];
}

export interface SavedWord extends VocabItem {
  lessonId: string;
  savedAt: string;
  isMemorized: boolean;
}

export interface SavedLesson {
  lesson: DailyLesson;
  savedAt: string;
}


