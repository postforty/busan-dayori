import { CurriculumLevel, DailyLesson } from '@/types';

export const curriculumLevels: CurriculumLevel[] = [
  {
    level: 'starter',
    badge: 'Lv.0 입문',
    title: '히라가나 & 첫걸음 입문',
    subTitle: '소리 청취·획순 쓰기 연습부터 배운 글자로 직접 읽는 첫인사까지',
    targetAudience: '일본어를 처음 시작하는 입문자 (글자와 소리부터 제대로 배우고 싶은 학습자)',
    color: '#E78B70',
    bgLight: '#FFF6F1',
    borderColor: '#FCE4D8',
    units: [
      {
        id: 'starter-1',
        unitNumber: 1,
        title: '안녕! 고마워! (인사와 부름)',
        description: '하루에 열 번도 더 쓰는 가장 착하고 귀여운 인사말',
        keyPhrase: 'ありがとう！',
        keyPhraseKorean: '고마워요!',
        pronunciationKorean: '아리가토-!',
        lessonId: 'lesson-starter-1',
        lessonData: {
          id: 'lesson-starter-1',
          dayNumber: 0,
          level: 'starter',
          seriesTitle: 'Lv.0 유치원생 입문',
          themeTitle: '안녕! 고마워! (인사와 부름)',
          unitTitle: 'Unit 1: 인사와 부름',
          pronunciationKorean: '아리가토-고자이마스! [고맙습니다!]',
          keyExpression: {
            japanese: 'ありがとう！',
            reading: 'ありがとう',
            korean: '고마워요! (감사합니다)'
          },
          dialogue: [
            {
              speaker: '점원/친구',
              japanese: 'どうぞ！',
              korean: '여기 있어요!'
            },
            {
              speaker: '나 (아이)',
              japanese: 'ありがとう！',
              korean: '고마워요!'
            },
            {
              speaker: '나 (어른에게 정중히)',
              japanese: 'ありがとうございます！',
              korean: '정말 감사합니다!'
            }
          ],
          grammar: {
            title: '유치원 꿀팁: 이렇게 외쳐요!',
            structure: 'ありがとう (친구에게) / ありがとうございます (어른에게)',
            explanation: '선물을 받거나 음식을 받을 때 환하게 웃으며 "아리가토-!"라고 외쳐보세요. 뒤에 "고자이마스"를 붙이면 어른에게도 백 점짜리 인사가 됩니다!'
          },
          vocabulary: [
            {
              id: 'st1-v1',
              kanji: 'ありがとう',
              reading: 'ありがとう',
              meaning: '고마워요',
              partOfSpeech: '감탄사'
            },
            {
              id: 'st1-v2',
              kanji: 'すみません',
              reading: 'すみません',
              meaning: '저기요 / 미안해요',
              partOfSpeech: '감탄사'
            },
            {
              id: 'st1-v3',
              kanji: 'はい',
              reading: 'はい',
              meaning: '네! (씩씩한 대답)',
              partOfSpeech: '감탄사'
            }
          ],
          nuanceTip: '식당이나 가게를 나갈 때 직원과 눈이 마주치면 가볍게 고개를 숙이며 "아리가토-고자이마스!"라고만 해도 최고의 매너가 됩니다.'
        }
      },
      {
        id: 'starter-2',
        unitNumber: 2,
        title: '맘마 냠냠! (이거 주세요 & 맛있어!)',
        description: '손가락으로 콕 짚고 외치면 맛있는 게 뚝딱 나오는 마법 주문',
        keyPhrase: 'これ ください！',
        keyPhraseKorean: '이거 주세요!',
        pronunciationKorean: '코레 쿠다사이!',
        lessonId: 'lesson-starter-2',
        lessonData: {
          id: 'lesson-starter-2',
          dayNumber: 0,
          level: 'starter',
          seriesTitle: 'Lv.0 유치원생 입문',
          themeTitle: '맘마 냠냠! (이거 주세요 & 맛있어!)',
          unitTitle: 'Unit 2: 주문과 맛 표현',
          pronunciationKorean: '코레 쿠다사이! 오이시이-!',
          keyExpression: {
            japanese: 'これ ください！',
            reading: 'これ ください',
            korean: '이거 주세요!'
          },
          dialogue: [
            {
              speaker: '나 (아이)',
              japanese: 'すみません、これ ください！',
              korean: '저기요, 이거 주세요!'
            },
            {
              speaker: '식당 이모님',
              japanese: 'はい、どうぞ！',
              korean: '네, 맛있게 드세요!'
            },
            {
              speaker: '나 (먹고 나서)',
              japanese: 'わぁ、おいしい！',
              korean: '와아, 진짜 맛있다!'
            }
          ],
          grammar: {
            title: '유치원 꿀팁: 손가락 마법 주문!',
            structure: '이름(또는 これ) + ください (쿠다사이)',
            explanation: '메뉴판을 손가락으로 콕 가리키면서 "코레 쿠다사이!"라고만 말하면 주문 끝! 다 먹고 나선 볼을 감싸며 "오이시이~"를 외쳐보세요.'
          },
          vocabulary: [
            {
              id: 'st2-v1',
              kanji: 'これ',
              reading: 'これ',
              meaning: '이것 (가까운 것 가리킬 때)',
              partOfSpeech: '지시대명사'
            },
            {
              id: 'st2-v2',
              kanji: 'ください',
              reading: 'ください',
              meaning: '주세요',
              partOfSpeech: '동사/보조'
            },
            {
              id: 'st2-v3',
              kanji: 'おいしい',
              reading: 'おいしい',
              meaning: '맛있어요',
              partOfSpeech: '형용사'
            }
          ],
          nuanceTip: '식당에서 음식을 다 먹고 계산할 때 "오이시캇타데스(맛있었어요)!"라고 한마디 해주면 점원분의 얼굴에 활짝 미소가 번집니다.'
        }
      },
      {
        id: 'starter-3',
        unitNumber: 3,
        title: '화장실이 어디예요? (생존 SOS)',
        description: '급할 때 당황하지 않고 당당하게 물어보는 생존 질문',
        keyPhrase: 'トイレは どこですか？',
        keyPhraseKorean: '화장실 어디예요?',
        pronunciationKorean: '토이레와 도코데스카?',
        lessonId: 'lesson-starter-3',
        lessonData: {
          id: 'lesson-starter-3',
          dayNumber: 0,
          level: 'starter',
          seriesTitle: 'Lv.0 유치원생 입문',
          themeTitle: '화장실이 어디예요? (생존 SOS)',
          unitTitle: 'Unit 3: 생존 SOS',
          pronunciationKorean: '스미마센, 토이레와 도코데스카?',
          keyExpression: {
            japanese: 'トイレは どこですか？',
            reading: 'トイレは どこですか',
            korean: '화장실은 어디인가요?'
          },
          dialogue: [
            {
              speaker: '나 (급한 표정)',
              japanese: 'あの、すみません！ トイレは どこですか？',
              korean: '저, 죄송한데요! 화장실 어디예요?'
            },
            {
              speaker: '친절한 행인',
              japanese: 'あっちですよ！',
              korean: '저쪽이에요!'
            },
            {
              speaker: '나',
              japanese: '助かりました！ ありがとうございます！',
              korean: '살았어요! 감사합니다!'
            }
          ],
          grammar: {
            title: '유치원 꿀팁: 장소 물어보기',
            structure: '장소 이름 + は どこですか？ (도코데스카?)',
            explanation: '가장 중요한 "토이레(화장실)!" 단어 뒤에 "와 도코데스카?"만 붙이면 됩니다. 너무 급할 땐 "토이레...?"하고 말끝만 올려도 다 알아듣습니다!'
          },
          vocabulary: [
            {
              id: 'st3-v1',
              kanji: 'トイレ',
              reading: 'トイレ',
              meaning: '화장실',
              partOfSpeech: '명사'
            },
            {
              id: 'st3-v2',
              kanji: 'どこ',
              reading: 'どこ',
              meaning: '어디',
              partOfSpeech: '대명사'
            },
            {
              id: 'st3-v3',
              kanji: 'あっち',
              reading: 'あっち',
              meaning: '저쪽',
              partOfSpeech: '지시대명사'
            }
          ],
          nuanceTip: '지하철역이나 백화점에서 화장실을 찾을 땐 인포메이션이나 역무원에게 "토이레와 도코데스카?"라고 공손히 여쭤보세요.'
        }
      },
      {
        id: 'starter-4',
        unitNumber: 4,
        title: '응! 좋아! 괜찮아! (의사표현)',
        description: '싫거나 좋을 때 정확하게 내 뜻을 전달하는 매너 표현',
        keyPhrase: 'だいじょうぶです！',
        keyPhraseKorean: '괜찮아요! (됐어요)',
        pronunciationKorean: '다이죠-부데스!',
        lessonId: 'lesson-starter-4',
        lessonData: {
          id: 'lesson-starter-4',
          dayNumber: 0,
          level: 'starter',
          seriesTitle: 'Lv.0 유치원생 입문',
          themeTitle: '응! 좋아! 괜찮아! (의사표현)',
          unitTitle: 'Unit 4: 의사표현과 거절',
          pronunciationKorean: '다이죠-부데스! [괜찮습니다!]',
          keyExpression: {
            japanese: 'だいじょうぶです！',
            reading: 'だいじょうぶです',
            korean: '괜찮아요! (좋아요 / 사양할게요)'
          },
          dialogue: [
            {
              speaker: '점원',
              japanese: 'ふくろは ご利用ですか？',
              korean: '봉투 필요하신가요?'
            },
            {
              speaker: '나',
              japanese: 'あ、だいじょうぶです！',
              korean: '아, 괜찮습니다! (필요 없어요)'
            },
            {
              speaker: '점원',
              japanese: 'かしこまりました。',
              korean: '알겠습니다.'
            }
          ],
          grammar: {
            title: '유치원 꿀팁: 만능 단어 다이죠-부',
            structure: 'だいじょうぶです (다이죠-부데스)',
            explanation: '다쳤을 때 "나 안 아파, 괜찮아!" 할 때도 쓰고, 편의점에서 "봉투 필요 없어요"라고 부드럽게 거절할 때 손을 가볍게 내저으며 쓰면 만사형통!'
          },
          vocabulary: [
            {
              id: 'st4-v1',
              kanji: 'だいじょうぶ',
              reading: 'だいじょうぶ',
              meaning: '괜찮음, 무사함',
              partOfSpeech: '형용동사'
            },
            {
              id: 'st4-v2',
              kanji: 'いいよ',
              reading: 'いいよ',
              meaning: '좋아! (편한 말투)',
              partOfSpeech: '표현'
            },
            {
              id: 'st4-v3',
              kanji: 'ふくろ',
              reading: 'ふくろ',
              meaning: '봉투, 비닐봉지',
              partOfSpeech: '명사'
            }
          ],
          nuanceTip: '일본 편의점에서 봉투를 사지 않을 때 손을 살짝 저으며 "다이죠-부데스"라고 하면 가장 자연스럽고 정중한 거절이 됩니다.'
        }
      },
      {
        id: 'starter-5',
        unitNumber: 5,
        title: '이게 뭐야? 얼마예요? (쇼핑과 호기심)',
        description: '가게에서 가격을 묻고 계산할 때 쓰는 신나는 주문',
        keyPhrase: 'これ、いくらですか？',
        keyPhraseKorean: '이거 얼마예요?',
        pronunciationKorean: '코레, 이쿠라데스카?',
        lessonId: 'lesson-starter-5',
        lessonData: {
          id: 'lesson-starter-5',
          dayNumber: 0,
          level: 'starter',
          seriesTitle: 'Lv.0 유치원생 입문',
          themeTitle: '이게 뭐야? 얼마예요? (쇼핑과 호기심)',
          unitTitle: 'Unit 5: 쇼핑과 가격 묻기',
          pronunciationKorean: '코레, 이쿠라데스카? [이거 얼마예요?]',
          keyExpression: {
            japanese: 'これ、いくらですか？',
            reading: 'これ いくらですか',
            korean: '이거 얼마예요?'
          },
          dialogue: [
            {
              speaker: '나',
              japanese: 'すみません、これ いくらですか？',
              korean: '저기요, 이거 얼마예요?'
            },
            {
              speaker: '점원',
              japanese: 'せんえんです！',
              korean: '천 엔입니다!'
            },
            {
              speaker: '나',
              japanese: 'じゃあ、これ ください！',
              korean: '그럼 이거 주세요!'
            }
          ],
          grammar: {
            title: '유치원 꿀팁: 가격 묻기',
            structure: '물건 + いくらですか？ (이쿠라데스카?)',
            explanation: '물건을 가리키며 "코레, 이쿠라데스카?"라고 묻기만 하면 점원이 계산기에 숫자를 찍어서 보여줄 거예요!'
          },
          vocabulary: [
            {
              id: 'st5-v1',
              kanji: 'いくら',
              reading: 'いくら',
              meaning: '얼마 (가격)',
              partOfSpeech: '명사'
            },
            {
              id: 'st5-v2',
              kanji: 'せんえん',
              reading: 'せんえん',
              meaning: '천 엔 (약 9천원)',
              partOfSpeech: '명사'
            },
            {
              id: 'st5-v3',
              kanji: 'じゃあ',
              reading: 'じゃあ',
              meaning: '그럼, 그러면',
              partOfSpeech: '접속사'
            }
          ],
          nuanceTip: '가격을 듣고 살 때는 "자-, 코레 쿠다사이(그럼 이거 주세요)", 생각보다 비싸서 안 살 땐 "모스코시 캉가에마스(조금 더 생각해볼게요)"나 "다이죠-부데스"를 쓰시면 됩니다.'
        }
      }
    ]
  },
  {
    level: 'beginner',
    badge: 'Lv.1 초급',
    title: '초등학생/초급 회화 (JLPT N5~N4)',
    subTitle: '히라가나를 읽고, 여행지에서 정중하게 소통하는 기본 패턴',
    targetAudience: '히라가나를 읽을 수 있고 기초 문형을 연습 중인 분',
    color: '#E07A5F',
    bgLight: '#FAF0E6',
    borderColor: '#F4DDD4',
    units: [
      {
        id: 'beginner-1',
        unitNumber: 1,
        title: '정중하게 주문하기 (~をお願いします)',
        description: '식당과 카페에서 가장 품격 있게 음식을 주문하는 법',
        keyPhrase: 'これを お願いします',
        keyPhraseKorean: '이걸로 부탁드립니다',
        pronunciationKorean: '코레오 오네가이시마스',
        lessonId: 'lesson-beginner-1',
        lessonData: {
          id: 'lesson-beginner-1',
          dayNumber: 1,
          level: 'beginner',
          seriesTitle: 'Lv.1 초급 실전 회화',
          themeTitle: '정중하게 주문하기 (~をお願いします)',
          unitTitle: 'Unit 1: 정중한 주문',
          keyExpression: {
            japanese: 'これを お願いします',
            reading: 'これをおねがいします',
            korean: '이걸로 부탁드립니다'
          },
          dialogue: [
            {
              speaker: '손님 (나)',
              japanese: 'すみません、アイスコーヒーを 一つ お願いします。',
              korean: '저기요, 아이스 아메리카노 하나 부탁드립니다.'
            },
            {
              speaker: '점원',
              japanese: 'かしこまりました。店内でお召し上がりですか？',
              korean: '알겠습니다. 매장에서 드시고 가시나요?'
            },
            {
              speaker: '손님 (나)',
              japanese: 'はい、店内で お願いします。',
              korean: '네, 매장에서 마실게요.'
            }
          ],
          grammar: {
            title: '명사 + を + お願いします',
            structure: '명사 + を + お願いします (오네가이시마스)',
            explanation: '"~를 주세요(〜をください)"보다 한 단계 더 공손하고 교양 있는 표준적 주문 표현입니다.'
          },
          vocabulary: [
            {
              id: 'bg1-v1',
              kanji: 'お願いします',
              reading: 'おねがいします',
              meaning: '부탁합니다',
              partOfSpeech: '표현'
            },
            {
              id: 'bg1-v2',
              kanji: '一つ',
              reading: 'ひとつ',
              meaning: '하나 (한 개)',
              partOfSpeech: '수사'
            },
            {
              id: 'bg1-v3',
              kanji: '店内',
              reading: 'てんない',
              meaning: '매장 내',
              partOfSpeech: '명사'
            }
          ],
          nuanceTip: '테이크아웃을 원할 때는 "모치카에리데(持ち帰りで お願いします)"라고 말하면 됩니다.'
        }
      },
      {
        id: 'beginner-2',
        unitNumber: 2,
        title: '결제 수단 묻기 (카드 사용 가능한가요?)',
        description: '현금과 카드를 구분하여 안심하고 결제하는 표현',
        keyPhrase: 'カードは 使えますか？',
        keyPhraseKorean: '카드 사용 가능한가요?',
        pronunciationKorean: '카-도와 츠카에마스카?',
        lessonId: 'lesson-beginner-2'
      },
      {
        id: 'beginner-3',
        unitNumber: 3,
        title: '지하철역과 길 찾기 (~는 어디인가요?)',
        description: '목적지를 물어보고 출구를 확인하는 길 찾기 패턴',
        keyPhrase: '駅は どちらですか？',
        keyPhraseKorean: '역은 어느 쪽인가요?',
        pronunciationKorean: '에키와 도치라데스카?',
        lessonId: 'lesson-beginner-3'
      }
    ]
  },
  {
    level: 'intermediate',
    badge: 'Lv.2 중급',
    title: '자연스러운 일상 소통 (JLPT N3)',
    subTitle: '배려형 완곡 요청과 뉘앙스 차이를 살린 회화',
    targetAudience: '기초 회화가 가능하며 더 일본인다운 표현을 구사하고 싶은 분',
    color: '#C45B40',
    bgLight: '#F7EBE5',
    borderColor: '#ECCDC2',
    units: [
      {
        id: 'intermediate-1',
        unitNumber: 1,
        title: '식당에서 자연스럽게 주문하기 (~でお願いできますか)',
        description: '다대기나 양념을 조절하며 완곡하게 의뢰하는 현지 표현',
        keyPhrase: '〜でお願いできますか',
        keyPhraseKorean: '~로 부탁드려도 될까요?',
        pronunciationKorean: '~데 오네가이데키마스카',
        lessonId: 'lesson-day-1'
      },
      {
        id: 'intermediate-2',
        unitNumber: 2,
        title: '식사 계산과 분할 결제 요청하기 (따로 계산)',
        description: '각자 계산(割り勘) 가능 여부를 정중하게 확인하는 매너 표현',
        keyPhrase: 'お会計、別々でお願いできますか',
        keyPhraseKorean: '계산, 각자 따로 부탁드려도 될까요?',
        pronunciationKorean: '오카이케이, 베츠베츠데 오네가이데키마스카',
        lessonId: 'lesson-day-3'
      }
    ]
  },
  {
    level: 'advanced',
    badge: 'Lv.3 실전',
    title: '원어민 뉘앙스 & 미각 묘사 (JLPT N2)',
    subTitle: '깊은 풍미와 식감, 사회적 에티켓까지 아우르는 실전 일본어',
    targetAudience: '교과서적 표현을 넘어 일본 현지인의 감각을 체득하고 싶은 분',
    color: '#943A25',
    bgLight: '#F4E7E1',
    borderColor: '#E4BFB4',
    units: [
      {
        id: 'advanced-1',
        unitNumber: 1,
        title: '맛과 식감의 미묘한 차이 묘사하기 (コク・さっぱり)',
        description: '담백함과 깊은 감칠맛을 섬세하게 표현하는 고급 묘사',
        keyPhrase: 'さっぱりしていてコクがある',
        keyPhraseKorean: '깔끔하면서도 깊은 감칠맛이 있다',
        pronunciationKorean: '삿파리시테이테 코쿠가 아루',
        lessonId: 'lesson-day-2'
      },
      {
        id: 'advanced-2',
        unitNumber: 2,
        title: '혼잡 시 일괄 결제 및 가게 에티켓 대처하기',
        description: '피크 타임 매장의 안내를 정확히 알아듣고 응대하는 표현',
        keyPhrase: '混雑時はまとめてのお支払いをお願いしております',
        keyPhraseKorean: '혼잡 시에는 일괄 결제를 부탁드리고 있습니다',
        pronunciationKorean: '콘자츠지와 마토메테노 오시하라이오 오네가이시테오리마스',
        lessonId: 'lesson-advanced-2'
      }
    ]
  }
];

export function getCurriculumLevels(): CurriculumLevel[] {
  return curriculumLevels;
}

export function findCurriculumUnit(lessonId: string): { unit: CurriculumLevel['units'][0]; level: CurriculumLevel } | null {
  for (const lvl of curriculumLevels) {
    for (const u of lvl.units) {
      if (u.lessonId === lessonId) {
        return { unit: u, level: lvl };
      }
    }
  }
  return null;
}

export function enrichLessonWithCurriculum(lesson: DailyLesson): DailyLesson {
  const found = findCurriculumUnit(lesson.id);
  if (!found) {
    return lesson;
  }
  const { unit, level } = found;
  return {
    ...lesson,
    level: lesson.level || level.level,
    unitTitle: lesson.unitTitle || `Unit ${unit.unitNumber}: ${unit.title}`,
    seriesTitle: lesson.seriesTitle || `${level.badge} ${level.title}`,
    themeTitle: lesson.themeTitle || unit.title,
    pronunciationKorean: lesson.pronunciationKorean || unit.pronunciationKorean,
  };
}

export interface FlatCurriculumUnit {
  unit: CurriculumLevel['units'][0];
  level: CurriculumLevel;
}

export function getAllCurriculumUnits(): FlatCurriculumUnit[] {
  const list: FlatCurriculumUnit[] = [];
  for (const lvl of curriculumLevels) {
    for (const u of lvl.units) {
      list.push({ unit: u, level: lvl });
    }
  }
  return list;
}

export function getAdjacentCurriculumUnits(currentLessonId: string): {
  prev: FlatCurriculumUnit | null;
  current: FlatCurriculumUnit | null;
  next: FlatCurriculumUnit | null;
  currentIndex: number;
  totalUnits: number;
} {
  const allUnits = getAllCurriculumUnits();
  const currentIndex = allUnits.findIndex((item) => item.unit.lessonId === currentLessonId);

  return {
    prev: currentIndex > 0 ? allUnits[currentIndex - 1] : null,
    current: currentIndex >= 0 ? allUnits[currentIndex] : null,
    next: currentIndex >= 0 && currentIndex < allUnits.length - 1 ? allUnits[currentIndex + 1] : null,
    currentIndex: currentIndex >= 0 ? currentIndex + 1 : 1,
    totalUnits: allUnits.length,
  };
}

export function getLessonByIdFromCurriculum(lessonId: string): DailyLesson | null {
  for (const lvl of curriculumLevels) {
    for (const u of lvl.units) {
      if (u.lessonId === lessonId) {
        if (u.lessonData) {
          return enrichLessonWithCurriculum(u.lessonData);
        }
        // lessonData가 없는 유닛을 위한 완성형 대체 레슨
        return {
          id: u.lessonId,
          dayNumber: u.unitNumber,
          level: lvl.level,
          seriesTitle: `${lvl.badge} ${lvl.title}`,
          themeTitle: u.title,
          unitTitle: `Unit ${u.unitNumber}: ${u.title}`,
          pronunciationKorean: u.pronunciationKorean,
          keyExpression: {
            japanese: u.keyPhrase,
            reading: u.keyPhrase,
            korean: u.keyPhraseKorean
          },
          dialogue: [
            {
              speaker: '나',
              japanese: u.keyPhrase,
              korean: u.keyPhraseKorean
            },
            {
              speaker: '상대방',
              japanese: 'かしこまりました。どうぞ！',
              korean: '알겠습니다. 여기 있습니다!'
            }
          ],
          grammar: {
            title: `핵심 표현: ${u.keyPhrase}`,
            structure: u.keyPhrase,
            explanation: u.description
          },
          vocabulary: [
            {
              id: `${u.id}-v1`,
              kanji: u.keyPhrase.split(' ')[0] || u.keyPhrase,
              reading: u.keyPhrase.split(' ')[0] || u.keyPhrase,
              meaning: u.keyPhraseKorean,
              partOfSpeech: '표현'
            }
          ],
          nuanceTip: u.description
        };
      }
    }
  }
  return null;
}

