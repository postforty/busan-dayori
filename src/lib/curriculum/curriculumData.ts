import { CurriculumLevel, DailyLesson } from '@/types';
import { kanjiToKana } from '@/utils/japanesePronounce';

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
          pronunciationKorean: '아리가토-!',
          keyExpression: {
            japanese: 'ありがとう！',
            reading: 'ありがとう',
            korean: '고마워요! (감사합니다)',
            breakdown: [
              { pronunciation: '아리가토-', word: 'ありがとう', reading: 'ありがとう', meaning: '고마워요 (친구/반말)' }
            ]
          },
          dialogue: [
            {
              speaker: '점원/친구',
              japanese: 'どうぞ！',
              korean: '여기 있어요!',
              pronunciation: '도-조!',
              breakdown: [
                { pronunciation: '도-조', word: 'どうぞ', reading: 'どうぞ', meaning: '여기 있어요 / 어서 드세요' }
              ]
            },
            {
              speaker: '나 (아이)',
              japanese: 'ありがとう！',
              korean: '고마워요!',
              pronunciation: '아리가토-!',
              breakdown: [
                { pronunciation: '아리가토-', word: 'ありがとう', reading: 'ありがとう', meaning: '고마워요' }
              ]
            },
            {
              speaker: '나 (어른에게 정중히)',
              japanese: 'ありがとうございます！',
              korean: '정말 감사합니다!',
              pronunciation: '아리가토-고자이마스!',
              breakdown: [
                { pronunciation: '아리가토-', word: 'ありがとう', reading: 'ありがとう', meaning: '고마워요' },
                { pronunciation: '고자이마스', word: 'ございます', reading: 'ございます', meaning: '~합니다 (정중한 존댓말)' }
              ]
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
          pronunciationKorean: '코레 쿠다사이!',
          keyExpression: {
            japanese: 'これ ください！',
            reading: 'これ ください',
            korean: '이거 주세요!',
            breakdown: [
              { pronunciation: '코레', word: 'これ', reading: 'これ', meaning: '이것 (손가락으로 가리킬 때)' },
              { pronunciation: '쿠다사이', word: 'ください', reading: 'ください', meaning: '주세요' }
            ]
          },
          dialogue: [
            {
              speaker: '나 (아이)',
              japanese: 'すみません、これ ください！',
              korean: '저기요, 이거 주세요!',
              pronunciation: '스미마센, 코레 쿠다사이!',
              breakdown: [
                { pronunciation: '스미마센', word: 'すみません', reading: 'すみません', meaning: '저기요 / 실례합니다' },
                { pronunciation: '코레', word: 'これ', reading: 'これ', meaning: '이것' },
                { pronunciation: '쿠다사이', word: 'ください', reading: 'ください', meaning: '주세요' }
              ]
            },
            {
              speaker: '식당 이모님',
              japanese: 'はい、どうぞ！',
              korean: '네, 맛있게 드세요!',
              pronunciation: '하이, 도-조!',
              breakdown: [
                { pronunciation: '하이', word: 'はい', reading: 'はい', meaning: '네' },
                { pronunciation: '도-조', word: 'どうぞ', reading: 'どうぞ', meaning: '여기 있어요 (맛있게 드세요)' }
              ]
            },
            {
              speaker: '나 (먹고 나서)',
              japanese: 'わぁ、おいしい！',
              korean: '와아, 진짜 맛있다!',
              pronunciation: '와-, 오이시이!',
              breakdown: [
                { pronunciation: '와-', word: 'わぁ', reading: 'わぁ', meaning: '와아 (감탄사)' },
                { pronunciation: '오이시이', word: 'おいしい', reading: 'おいしい', meaning: '맛있다' }
              ]
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
          pronunciationKorean: '토이레와 도코데스카?',
          keyExpression: {
            japanese: 'トイレは どこですか？',
            reading: 'トイレは どこですか',
            korean: '화장실은 어디인가요?',
            breakdown: [
              { pronunciation: '토이레', word: 'トイレ', reading: 'トイレ', meaning: '화장실' },
              { pronunciation: '와', word: 'は', reading: 'は', meaning: '~은/는 (주제 조사)' },
              { pronunciation: '도코', word: 'どこ', reading: 'どこ', meaning: '어디' },
              { pronunciation: '데스카', word: 'ですか', reading: 'ですか', meaning: '~인가요? (질문 어미)' }
            ]
          },
          dialogue: [
            {
              speaker: '나 (급한 표정)',
              japanese: 'あの、すみません！ トイレは どこですか？',
              korean: '저, 죄송한데요! 화장실 어디예요?',
              pronunciation: '아노, 스미마센! 토이레와 도코데스카?',
              breakdown: [
                { pronunciation: '아노', word: 'あの', reading: 'あの', meaning: '저기 (말 꺼낼 때)' },
                { pronunciation: '스미마센', word: 'すみません', reading: 'すみません', meaning: '실례합니다 / 죄송합니다' },
                { pronunciation: '토이레', word: 'トイレ', reading: 'トイレ', meaning: '화장실' },
                { pronunciation: '와', word: 'は', reading: 'は', meaning: '~은/는' },
                { pronunciation: '도코', word: 'どこ', reading: 'どこ', meaning: '어디' },
                { pronunciation: '데스카', word: 'ですか', reading: 'ですか', meaning: '~인가요?' }
              ]
            },
            {
              speaker: '친절한 행인',
              japanese: 'あっちですよ！',
              korean: '저쪽이에요!',
              pronunciation: '앗치데스요!',
              breakdown: [
                { pronunciation: '앗치', word: 'あっち', reading: 'あっち', meaning: '저쪽' },
                { pronunciation: '데스요', word: 'ですよ', reading: 'ですよ', meaning: '~예요 / ~입니다 (알려줄 때)' }
              ]
            },
            {
              speaker: '나 (안도하며)',
              japanese: 'あ、ありがとうございます！',
              korean: '아, 정말 감사합니다!',
              pronunciation: '아, 아리가토-고자이마스!',
              breakdown: [
                { pronunciation: '아', word: 'あ', reading: 'あ', meaning: '아 (감탄사)' },
                { pronunciation: '아리가토-고자이마스', word: 'ありがとうございます', reading: 'ありがとうございます', meaning: '정말 감사합니다' }
              ]
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
          nuanceTip: '친절하게 길을 알려준 분에게 Unit 1에서 배운 "아리가토-고자이마스(정말 감사합니다)!"로 기분 좋게 감사 인사를 전해보세요.'
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
          pronunciationKorean: '다이죠-부데스!',
          keyExpression: {
            japanese: 'だいじょうぶです！',
            reading: 'だいじょうぶです',
            korean: '괜찮아요! (좋아요 / 사양할게요)',
            breakdown: [
              { pronunciation: '다이죠-부', word: 'だいじょうぶ', reading: 'だいじょうぶ', meaning: '괜찮음, 문제없음' },
              { pronunciation: '데스', word: 'です', reading: 'です', meaning: '~입니다 / ~해요' }
            ]
          },
          dialogue: [
            {
              speaker: '점원 (물건을 담으며)',
              japanese: 'ふくろ、いりますか？',
              korean: '봉투, 필요하세요?',
              pronunciation: '후쿠로, 이리마스카?',
              breakdown: [
                { pronunciation: '후쿠로', word: 'ふくろ', reading: 'ふくろ', meaning: '봉투, 비닐봉지' },
                { pronunciation: '이리마스카', word: 'いりますか', reading: 'いりますか', meaning: '필요하신가요?' }
              ]
            },
            {
              speaker: '나 (손을 살짝 저으며)',
              japanese: 'あ、だいじょうぶです！',
              korean: '아, 괜찮습니다! (필요 없어요)',
              pronunciation: '아, 다이죠-부데스!',
              breakdown: [
                { pronunciation: '다이죠-부데스', word: 'だいじょうぶです', reading: 'だいじょうぶです', meaning: '괜찮아요 (사양할게요 / 됐어요)' }
              ]
            },
            {
              speaker: '점원 (공손히)',
              japanese: 'かしこまりました。',
              korean: '알겠습니다.',
              pronunciation: '카시코마리마시타.',
              breakdown: [
                { pronunciation: '카시코마리마시타', word: 'かしこまりました', reading: 'かしこまりました', meaning: '잘 알겠습니다 (정중한 수락)' }
              ]
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
              kanji: 'ふくろ',
              reading: 'ふくろ',
              meaning: '봉투, 비닐봉지',
              partOfSpeech: '명사'
            },
            {
              id: 'st4-v3',
              kanji: 'いる',
              reading: 'いる',
              meaning: '필요하다',
              partOfSpeech: '동사'
            }
          ],
          nuanceTip: '💡 [듣기 전용 꿀팁] 마지막에 점원이 말하는 "카시코마리마시타(かしこまりました)"는 손님에게 공손히 "잘 알겠습니다"라고 답하는 전형적인 일본 점원의 접객어입니다. 학습자가 직접 외워서 말할 필요는 전혀 없으며, 편의점이나 식당에서 들리기만 하면 "아, 내 말을 알아들었구나!" 하고 끄덕이시면 됩니다.'
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
          pronunciationKorean: '코레, 이쿠라데스카?',
          keyExpression: {
            japanese: 'これ、いくらですか？',
            reading: 'これ いくらですか',
            korean: '이거 얼마예요?',
            breakdown: [
              { pronunciation: '코레', word: 'これ', reading: 'これ', meaning: '이것' },
              { pronunciation: '이쿠라', word: 'いくら', reading: 'いくら', meaning: '얼마' },
              { pronunciation: '데스카', word: 'ですか', reading: 'ですか', meaning: '~입니까?' }
            ]
          },
          dialogue: [
            {
              speaker: '나',
              japanese: 'すみません、これ いくらですか？',
              korean: '저기요, 이거 얼마예요?',
              pronunciation: '스미마센, 코레 이쿠라데스카?',
              breakdown: [
                { pronunciation: '스미마센', word: 'すみません', reading: 'すみません', meaning: '저기요 / 실례합니다' },
                { pronunciation: '코레', word: 'これ', reading: 'これ', meaning: '이것' },
                { pronunciation: '이쿠라', word: 'いくら', reading: 'いくら', meaning: '얼마' },
                { pronunciation: '데스카', word: 'ですか', reading: 'ですか', meaning: '~인가요?' }
              ]
            },
            {
              speaker: '점원',
              japanese: 'せんえんです！',
              korean: '천 엔입니다!',
              pronunciation: '센엔데스!',
              breakdown: [
                { pronunciation: '센엔', word: 'せんえん', reading: 'せんえん', meaning: '천 엔 (약 9천 원)' },
                { pronunciation: '데스', word: 'です', reading: 'です', meaning: '~입니다' }
              ]
            },
            {
              speaker: '나',
              japanese: 'じゃあ、これ ください！',
              korean: '그럼 이거 주세요!',
              pronunciation: '쟈-, 코레 쿠다사이!',
              breakdown: [
                { pronunciation: '쟈-', word: 'じゃあ', reading: 'じゃあ', meaning: '그럼, 그러면' },
                { pronunciation: '코레', word: 'これ', reading: 'これ', meaning: '이것' },
                { pronunciation: '쿠다사이', word: 'ください', reading: 'ください', meaning: '주세요' }
              ]
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
            korean: '이걸로 부탁드립니다',
            breakdown: [
              { pronunciation: '코레', word: 'これ', reading: 'これ', meaning: '이것' },
              { pronunciation: '오', word: 'を', reading: 'を', meaning: '~을/를' },
              { pronunciation: '오네가이시마스', word: 'お願いします', reading: 'おねがいします', meaning: '부탁합니다 (정중한 주문)' }
            ]
          },
          dialogue: [
            {
              speaker: '손님 (나)',
              japanese: 'すみません、アイスコーヒーを 一つ お願いします。',
              korean: '저기요, 아이스 아메리카노 하나 부탁드립니다.',
              pronunciation: '스미마센, 아이스코-히-오 히토츠 오네가이시마스.',
              breakdown: [
                { pronunciation: '스미마센', word: 'すみません', reading: 'すみません', meaning: '저기요 / 실례합니다' },
                { pronunciation: '아이스코-히-', word: 'アイスコーヒー', reading: 'アイスコーヒー', meaning: '아이스 아메리카노 / 아이스 커피' },
                { pronunciation: '오', word: 'を', reading: 'を', meaning: '~을/를' },
                { pronunciation: '히토츠', word: '一つ', reading: 'ひとつ', meaning: '하나, 한 개' },
                { pronunciation: '오네가이시마스', word: 'お願いします', reading: 'おねがいします', meaning: '부탁드립니다' }
              ]
            },
            {
              speaker: '점원',
              japanese: 'かしこまりました。店内でお召し上がりですか？',
              korean: '알겠습니다. 매장에서 드시고 가시나요?',
              pronunciation: '카시코마리마시타. 텐나이데 오메시아가리데스카?',
              breakdown: [
                { pronunciation: '카시코마리마시타', word: 'かしこまりました', reading: 'かしこまりました', meaning: '잘 알겠습니다' },
                { pronunciation: '텐나이', word: '店内', reading: 'てんない', meaning: '가게 안, 매장' },
                { pronunciation: '데', word: 'で', reading: 'で', meaning: '~에서 (장소 조사)' },
                { pronunciation: '오메시아가리', word: 'お召し上がり', reading: 'おめしあがり', meaning: '\'드시다\'의 높인말' },
                { pronunciation: '데스카', word: 'ですか', reading: 'ですか', meaning: '~입니까?' }
              ]
            },
            {
              speaker: '손님 (나)',
              japanese: 'はい、店内で お願いします。',
              korean: '네, 매장에서 마실게요.',
              pronunciation: '하이, 텐나이데 오네가이시마스.',
              breakdown: [
                { pronunciation: '하이', word: 'はい', reading: 'はい', meaning: '네' },
                { pronunciation: '텐나이', word: '店内', reading: 'てんない', meaning: '가게 안, 매장' },
                { pronunciation: '데', word: 'で', reading: 'で', meaning: '~에서 (장소 조사)' },
                { pronunciation: '오네가이시마스', word: 'お願いします', reading: 'おねがいします', meaning: '부탁합니다 / ~로 할게요' }
              ]
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
          nuanceTip: '💡 [듣기 팁] 점원이 말하는 "店内でお召し上がりですか？(텐나이데 오메시아가리데스카?)"는 "매장에서 드시나요?"라는 전형적인 접객 경어입니다. 학습자가 이 문장을 외울 필요는 없으며, 매장에서 마실 땐 "はい、店内で(네, 매장에서요)", 포장해 갈 땐 "持ち帰りで(모치카에리데)"라고만 간단히 말하면 됩니다.'
        }
      },
      {
        id: 'beginner-2',
        unitNumber: 2,
        title: '결제 수단 묻기 (카드 사용 가능한가요?)',
        description: '현금과 카드를 구분하여 안심하고 결제하는 표현',
        keyPhrase: 'カードは 使えますか？',
        keyPhraseReading: 'カードは つかえますか？',
        keyPhraseKorean: '카드 사용 가능한가요?',
        pronunciationKorean: '카-도와 츠카에마스카?',
        lessonId: 'lesson-beginner-2',
        lessonData: {
          id: 'lesson-beginner-2',
          dayNumber: 2,
          level: 'beginner',
          seriesTitle: 'Lv.1 초급 실전 회화',
          themeTitle: '결제 수단 묻기 (카드 사용 가능한가요?)',
          unitTitle: 'Unit 2: 결제 수단 확인',
          keyExpression: {
            japanese: 'カードは 使えますか？',
            reading: 'カードは つかえますか？',
            korean: '카드 사용 가능한가요?',
            breakdown: [
              { pronunciation: '카-도', word: 'カード', reading: 'カード', meaning: '카드 (신용카드 등)' },
              { pronunciation: '와', word: 'は', reading: 'は', meaning: '~은/는' },
              { pronunciation: '츠카에마스카', word: '使えますか', reading: 'つかえますか', meaning: '사용할 수 있나요? / 쓸 수 있습니까?' }
            ]
          },
          dialogue: [
            {
              speaker: '손님 (나)',
              japanese: 'すみません、カードは 使えますか？',
              korean: '저기요, 카드 사용 가능한가요?',
              pronunciation: '스미마센, 카-도와 츠카에마스카?',
              breakdown: [
                { pronunciation: '스미마센', word: 'すみません', reading: 'すみません', meaning: '저기요 / 실례합니다' },
                { pronunciation: '카-도', word: 'カード', reading: 'カード', meaning: '카드' },
                { pronunciation: '와', word: 'は', reading: 'は', meaning: '~은/는' },
                { pronunciation: '츠카에마스카', word: '使えますか', reading: 'つかえますか', meaning: '쓸 수 있나요?' }
              ]
            },
            {
              speaker: '점원',
              japanese: 'はい、使えますよ。どうぞ！',
              korean: '네, 사용 가능합니다. 이쪽으로 주세요!',
              pronunciation: '하이, 츠카에마스요. 도-조!',
              breakdown: [
                { pronunciation: '하이', word: 'はい', reading: 'はい', meaning: '네' },
                { pronunciation: '츠카에마스요', word: '使えますよ', reading: 'つかえますよ', meaning: '사용할 수 있어요' },
                { pronunciation: '도-조', word: 'どうぞ', reading: 'どうぞ', meaning: '이쪽으로 주세요' }
              ]
            },
            {
              speaker: '손님 (나)',
              japanese: 'これで お願いします。',
              korean: '이걸로 부탁드립니다.',
              pronunciation: '코레데 오네가이시마스.',
              breakdown: [
                { pronunciation: '코레', word: 'これ', reading: 'これ', meaning: '이것' },
                { pronunciation: '데', word: 'で', reading: 'で', meaning: '~로 (수단/방법)' },
                { pronunciation: '오네가이시마스', word: 'お願いします', reading: 'おねがいします', meaning: '부탁드립니다' }
              ]
            }
          ],
          grammar: {
            title: '[명사] + は + 使えますか？',
            structure: '[결제 수단] + は (은/는) + 使えますか (쓸 수 있습니까?)',
            explanation: '가게나 식당에서 특정 결제 수단(신용카드, 교통카드 등)을 사용할 수 있는지 사전에 확인하는 정중한 의문 패턴입니다.'
          },
          vocabulary: [
            {
              id: 'bg2-v1',
              kanji: 'カード',
              reading: 'カード',
              meaning: '카드 (신용카드 등)',
              partOfSpeech: '명사'
            },
            {
              id: 'bg2-v2',
              kanji: '使える',
              reading: 'つかえる',
              meaning: '사용할 수 있다, 쓸 수 있다',
              partOfSpeech: '동사'
            },
            {
              id: 'bg2-v3',
              kanji: '現金',
              reading: 'げんきん',
              meaning: '현금',
              partOfSpeech: '명사'
            }
          ],
          nuanceTip: '일본의 일부 노포나 소규모 매장은 현금 결제(現金のみ, 겐킨노미)만 가능한 경우가 많습니다. 식사 전이나 주문 전에 "カードは 使えますか？"라고 미리 확인하면 당황하지 않고 결제할 수 있습니다.'
        }
      },
      {
        id: 'beginner-3',
        unitNumber: 3,
        title: '지하철역과 길 찾기 (~는 어디인가요?)',
        description: '목적지를 물어보고 출구를 확인하는 길 찾기 패턴',
        keyPhrase: '駅は どちらですか？',
        keyPhraseReading: 'えきは どちらですか？',
        keyPhraseKorean: '역은 어느 쪽인가요?',
        pronunciationKorean: '에키와 도치라데스카?',
        lessonId: 'lesson-beginner-3',
        lessonData: {
          id: 'lesson-beginner-3',
          dayNumber: 3,
          level: 'beginner',
          seriesTitle: 'Lv.1 초급 실전 회화',
          themeTitle: '지하철역과 길 찾기 (~는 어디인가요?)',
          unitTitle: 'Unit 3: 지하철역과 길 찾기',
          keyExpression: {
            japanese: '駅は どちらですか？',
            reading: 'えきは どちらですか？',
            korean: '역은 어느 쪽인가요?',
            breakdown: [
              { pronunciation: '에키', word: '駅', reading: 'えき', meaning: '역 (지하철역/기차역)' },
              { pronunciation: '와', word: 'は', reading: 'は', meaning: '~은/는' },
              { pronunciation: '도치라', word: 'どちら', reading: 'どちら', meaning: '어느 쪽, 어디 (공손한 표현)' },
              { pronunciation: '데스카', word: 'ですか', reading: 'ですか', meaning: '~입니까?' }
            ]
          },
          dialogue: [
            {
              speaker: '나',
              japanese: 'すみません、駅は どちらですか？',
              korean: '실례합니다, 역은 어느 쪽인가요?',
              pronunciation: '스미마센, 에키와 도치라데스카?',
              breakdown: [
                { pronunciation: '스미마센', word: 'すみません', reading: 'すみません', meaning: '실례합니다' },
                { pronunciation: '에키', word: '駅', reading: 'えき', meaning: '역' },
                { pronunciation: '와', word: 'は', reading: 'は', meaning: '~은/는' },
                { pronunciation: '도치라', word: 'どちら', reading: 'どちら', meaning: '어느 쪽' },
                { pronunciation: '데스카', word: 'ですか', reading: 'ですか', meaning: '~입니까?' }
              ]
            },
            {
              speaker: '행인',
              japanese: 'あちらです。まっすぐ 行ってください。',
              korean: '저쪽입니다. 곧장(쭉) 가세요.',
              pronunciation: '아치라데스. 맛스구 잇테쿠다사이.',
              breakdown: [
                { pronunciation: '아치라', word: 'あちら', reading: 'あちら', meaning: '저쪽, 저편' },
                { pronunciation: '데스', word: 'です', reading: 'です', meaning: '~입니다' },
                { pronunciation: '맛스구', word: 'まっすぐ', reading: 'まっすぐ', meaning: '곧장, 똑바로' },
                { pronunciation: '잇테쿠다사이', word: '行ってください', reading: 'いってください', meaning: '가세요 (가주세요)' }
              ]
            },
            {
              speaker: '나',
              japanese: 'ありがとうございます！',
              korean: '감사합니다!',
              pronunciation: '아리가토-고자이마스!',
              breakdown: [
                { pronunciation: '아리가토-고자이마스', word: 'ありがとうございます', reading: 'ありがとうございます', meaning: '감사합니다' }
              ]
            }
          ],
          grammar: {
            title: '[장소] + は + どちらですか？',
            structure: '[장소] + は (은/는) + どちらですか (어느 쪽인가요?)',
            explanation: '목적지 명사 뒤에 조사 「は(은/는)」를 붙여 방향과 위치를 정중하게 묻는 길 찾기 대표 패턴입니다. 「どこ(어디)」보다 공손하고 교양 있는 표현으로, 장소 단어만 바꾸면 어디서든 길을 물을 수 있습니다.'
          },
          vocabulary: [
            {
              id: 'bg3-v1',
              kanji: '駅',
              reading: 'えき',
              meaning: '역 (지하철역, 기차역)',
              partOfSpeech: '명사'
            },
            {
              id: 'bg3-v2',
              kanji: 'どちら',
              reading: 'どちら',
              meaning: '어느 쪽, 어디 (공손한 표현)',
              partOfSpeech: '대명사'
            },
            {
              id: 'bg3-v3',
              kanji: 'あちら',
              reading: 'あちら',
              meaning: '저쪽, 저편',
              partOfSpeech: '대명사'
            },
            {
              id: 'bg3-v4',
              kanji: 'まっすぐ',
              reading: 'まっすぐ',
              meaning: '곧장, 똑바로',
              partOfSpeech: '부사'
            }
          ],
          nuanceTip: '친구 사이에서는 "駅は どこ？(역 어디야?)"라고 가볍게 묻지만, 길거리에서 낯선 행인이나 역무원에게 물어볼 때는 방향을 가리키는 정중한 표현인 "どちら(어느 쪽)"를 사용하는 것이 일본 매너에 훨씬 잘 맞습니다.'
        }
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
        keyPhraseReading: '〜でおねがいできますか',
        keyPhraseKorean: '~로 부탁드려도 될까요?',
        pronunciationKorean: '~데 오네가이데키마스카',
        lessonId: 'lesson-day-1',
        lessonData: {
          id: 'lesson-day-1',
          dayNumber: 1,
          level: 'intermediate',
          seriesTitle: 'Lv.2 중급 실전 일본어',
          themeTitle: '식당에서 자연스럽게 주문하기 (~でお願いできますか)',
          unitTitle: 'Unit 1: 식당에서 자연스럽게 주문하기',
          pronunciationKorean: '~데 오네가이데키마스카',
          keyExpression: {
            japanese: '〜でお願いできますか',
            reading: '〜でおねがいできますか',
            korean: '〜로 부탁드려도 될까요?',
            breakdown: [
              { pronunciation: '데', word: 'で', reading: 'で', meaning: '~로 (수단/방법)' },
              { pronunciation: '오네가이데키마스카', word: 'お願いできますか', reading: 'おねがいできますか', meaning: '부탁드려도 될까요? (완곡하고 정중한 요청)' }
            ]
          },
          dialogue: [
            {
              speaker: '손님 (나)',
              japanese: 'すみません、テジクッパ一つ、タテギ抜きでお願いできますか？',
              korean: '저기요, 돼지국밥 하나, 다대기 빼고 부탁드려도 될까요?',
              pronunciation: '스미마센, 테지쿱파 히토츠, 타테기 누키데 오네가이데키마스카?',
              breakdown: [
                { pronunciation: '스미마센', word: 'すみません', reading: 'すみません', meaning: '저기요 / 실례합니다' },
                { pronunciation: '테지쿱파', word: 'テジクッパ', reading: 'テジクッパ', meaning: '돼지국밥' },
                { pronunciation: '히토츠', word: '一つ', reading: 'ひとつ', meaning: '하나, 한 그릇' },
                { pronunciation: '타테기', word: 'タテギ', reading: 'タテギ', meaning: '다대기 (양념장)' },
                { pronunciation: '누키', word: '抜き', reading: 'ぬき', meaning: '뺌, 제외' },
                { pronunciation: '데', word: 'で', reading: 'で', meaning: '~로' },
                { pronunciation: '오네가이데키마스카', word: 'お願いできますか', reading: 'おねがいできますか', meaning: '부탁드려도 될까요?' }
              ]
            },
            {
              speaker: '점원 (메모하며)',
              japanese: 'はい、かしこまりました。タテギは別添えにいたしますね。',
              korean: '네, 잘 알겠습니다. 다대기는 따로 담아 드릴게요.',
              pronunciation: '하이, 카시코마리마시타. 타테기와 베츠조에니 이타시마스네.',
              breakdown: [
                { pronunciation: '카시코마리마시타', word: 'かしこまりました', reading: 'かしこまりました', meaning: '잘 알겠습니다' },
                { pronunciation: '타테기', word: 'タテギ', reading: 'タテギ', meaning: '다대기' },
                { pronunciation: '베츠조에', word: '別添え', reading: 'べつぞえ', meaning: '따로 곁들임 / 따로 담음' },
                { pronunciation: '니 이타시마스네', word: 'にいたしますね', reading: 'にいたしますね', meaning: '~로 해드릴게요 (겸양 표현)' }
              ]
            },
            {
              speaker: '손님 (나)',
              japanese: '助かります。ありがとうございます！',
              korean: '감사합니다(덕분에 살았어요)! 고맙습니다!',
              pronunciation: '타스카리마스. 아리가토-고자이마스!',
              breakdown: [
                { pronunciation: '타스카리마스', word: '助かります', reading: 'たすかります', meaning: '감사합니다 (도움이 됩니다 / 덕분에 살았어요)' },
                { pronunciation: '아리가토-고자이마스', word: 'ありがとうございます', reading: 'ありがとうございます', meaning: '고맙습니다' }
              ]
            }
          ],
          grammar: {
            title: '명사 + で + お願いできますか',
            structure: '명사 + で + お願いできますか (또는 동사て形 + いただけますか)',
            explanation: '단순히 "~를 주세요(〜をください)"라고 요구하기보다 상대방의 입장을 배려하여 완곡하게 요청하는 정중한 표현입니다.'
          },
          vocabulary: [
            {
              id: 'it1-v1',
              kanji: '別添え',
              reading: 'べつぞえ',
              meaning: '따로 곁들임, 따로 담음',
              partOfSpeech: '명사'
            },
            {
              id: 'it1-v2',
              kanji: '抜き',
              reading: 'ぬき',
              meaning: '뺌, 제외함',
              partOfSpeech: '명사'
            },
            {
              id: 'it1-v3',
              kanji: '助かる',
              reading: 'たすかる',
              meaning: '도움이 되다, 다행이다',
              partOfSpeech: '동사'
            }
          ],
          nuanceTip: '💡 [언어 부품 꿀팁: 助かる vs かしこまる]\n손님이 말한 "助かります(타스카리마스: 도움이 됩니다/살았습니다)"와 점원이 말한 "かしこまりました(카시코마리마시타: 잘 알겠습니다)"는 끝부분이 비슷하게 들리지만 완전히 다른 부품입니다!\n- [助かり] + [ます / ました] = (도움/구원) + (합니다/했습니다)\n- [かしこまり] + [ました] = (삼가 수락) + (했습니다)\n상대방이 배려해 주었을 때는 "助かります!"라고 가볍게 웃으며 답해보세요.'
        }
      },
      {
        id: 'intermediate-2',
        unitNumber: 2,
        title: '식사 계산과 분할 결제 요청하기 (따로 계산)',
        description: '각자 계산(割り勘) 가능 여부를 정중하게 확인하는 매너 표현',
        keyPhrase: 'お会計、別々でお願いできますか',
        keyPhraseReading: 'おかいけい、べつべつでおねがいできますか',
        keyPhraseKorean: '계산, 각자 따로 부탁드려도 될까요?',
        pronunciationKorean: '오카이케이, 베츠베츠데 오네가이데키마스카',
        lessonId: 'lesson-day-3',
        lessonData: {
          id: 'lesson-day-3',
          dayNumber: 2,
          level: 'intermediate',
          seriesTitle: 'Lv.2 중급 실전 일본어',
          themeTitle: '식사 계산과 분할 결제 요청하기 (따로 계산)',
          unitTitle: 'Unit 2: 식사 계산과 분할 결제 요청하기',
          pronunciationKorean: '오카이케이, 베츠베츠데 오네가이데키마스카',
          keyExpression: {
            japanese: 'お会計、別々でお願いできますか',
            reading: 'おかいけい、べつべつでおねがいできますか',
            korean: '계산, 각자 따로 부탁드려도 될까요?',
            breakdown: [
              { pronunciation: '오카이케이', word: 'お会計', reading: 'おかいけい', meaning: '계산, 지불' },
              { pronunciation: '베츠베츠', word: '別々', reading: 'べつべつ', meaning: '각자 따로' },
              { pronunciation: '데', word: 'で', reading: 'で', meaning: '~로' },
              { pronunciation: '오네가이데키마스카', word: 'お願いできますか', reading: 'おねがいできますか', meaning: '부탁드려도 될까요?' }
            ]
          },
          dialogue: [
            {
              speaker: '손님 (나)',
              japanese: 'ごちそうさまでした。お会計、別々でお願いできますか？',
              korean: '잘 먹었습니다. 계산 각자 따로 부탁드려도 될까요?',
              pronunciation: '고치소-사마데시타. 오카이케이, 베츠베츠데 오네가이데키마스카?',
              breakdown: [
                { pronunciation: '고치소-사마데시타', word: 'ごちそうさまでした', reading: 'ごちそうさまでした', meaning: '잘 먹었습니다' },
                { pronunciation: '오카이케이', word: 'お会計', reading: 'おかいけい', meaning: '계산' },
                { pronunciation: '베츠베츠데', word: '別々で', reading: 'べつべつで', meaning: '각자 따로' },
                { pronunciation: '오네가이데키마스카', word: 'お願いできますか', reading: 'おねがいできますか', meaning: '부탁드릴 수 있나요?' }
              ]
            },
            {
              speaker: '점원 (양해를 구하며)',
              japanese: '申し訳ありません、混雑時はまとめてのお支払いをお願いしております。',
              korean: '죄송합니다, 혼잡 시간대에는 일괄 결제를 부탁드리고 있습니다.',
              pronunciation: '모-시와케 아리마센, 콘자츠지와 마토메테노 오시하라이오 오네가이시테오리마스.',
              breakdown: [
                { pronunciation: '모-시와케 아리마센', word: '申し訳ありません', reading: 'もうしわけありません', meaning: '죄송합니다' },
                { pronunciation: '콘자츠지', word: '混雑時', reading: 'こんざつじ', meaning: '혼잡할 때, 붐비는 시간' },
                { pronunciation: '마토메테', word: 'まとめて', reading: 'まとめて', meaning: '한꺼번에, 모아서' },
                { pronunciation: '오시하라이', word: 'お支払い', reading: 'おしはらい', meaning: '결제, 지불' },
                { pronunciation: '오네가이시테오리마스', word: 'お願いしております', reading: 'おねがいしております', meaning: '부탁드리고 있습니다' }
              ]
            },
            {
              speaker: '손님 (나)',
              japanese: 'あ、分かりました。じゃあカードでまとめて払いますね。',
              korean: '아, 알겠습니다. 그럼 카드로 한꺼번에 결제할게요.',
              pronunciation: '아, 와카리마시타. 쟈- 카-도데 마토메테 하라이마스네.',
              breakdown: [
                { pronunciation: '와카리마시타', word: '分かりました', reading: 'わかりました', meaning: '알겠습니다' },
                { pronunciation: '카-도데', word: 'カードで', reading: 'カードで', meaning: '카드로' },
                { pronunciation: '마토메테', word: 'まとめて', reading: 'まとめて', meaning: '한꺼번에' },
                { pronunciation: '하라이마스네', word: '払いますね', reading: 'はらいますね', meaning: '결제할게요' }
              ]
            }
          ],
          grammar: {
            title: '명사 + で (수단·상태의 조사 で)',
            structure: '別々 + で (각자 따로) / まとめて + お支払い (한꺼번에 결제)',
            explanation: '지불 방식이나 인원 구분을 나타낼 때 조사 で를 사용합니다. 각자 계산은 "別々で(베츠베츠데)", 일괄 결제는 "まとめて(마토메테)"로 표현합니다.'
          },
          vocabulary: [
            {
              id: 'it2-v1',
              kanji: '会計',
              reading: 'かいけい',
              meaning: '계산, 지불',
              partOfSpeech: '명사'
            },
            {
              id: 'it2-v2',
              kanji: '混雑時',
              reading: 'こんざつじ',
              meaning: '혼잡할 때, 붐비는 시간',
              partOfSpeech: '명사'
            },
            {
              id: 'it2-v3',
              kanji: 'まとめて',
              reading: 'まとめて',
              meaning: '한꺼번에, 모아서',
              partOfSpeech: '부사'
            }
          ],
          nuanceTip: '점원이 "まとめてのお支払いをお願いしております(일괄 결제를 부탁드립니다)"라고 정중히 거절할 경우, 억지로 분할 결제를 요구하지 않고 "分かりました(알겠습니다)"라며 한 명이 대표로 결제하는 것이 성숙한 일본 식당 매너입니다.'
        }
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
        keyPhraseReading: 'さっぱりしていてコクがある',
        keyPhraseKorean: '깔끔하면서도 깊은 감칠맛이 있다',
        pronunciationKorean: '삿파리시테이테 코쿠가 아루',
        lessonId: 'lesson-day-2',
        lessonData: {
          id: 'lesson-day-2',
          dayNumber: 1,
          level: 'advanced',
          seriesTitle: 'Lv.3 실전 일본어',
          themeTitle: '맛과 식감의 미묘한 차이 묘사하기 (コク・さっぱり)',
          unitTitle: 'Unit 1: 맛과 식감의 미묘한 차이 묘사하기',
          pronunciationKorean: '삿파리시테이테 코쿠가 아루',
          keyExpression: {
            japanese: 'さっぱりしていてコクがある',
            reading: 'さっぱりしていてこくがある',
            korean: '깔끔하면서도 깊은 감칠맛이 있다',
            breakdown: [
              { pronunciation: '삿파리시테이테', word: 'さっぱりしていて', reading: 'さっぱりしていて', meaning: '깔끔하면서도, 개운하고' },
              { pronunciation: '코쿠', word: 'コク', reading: 'こく', meaning: '깊은 맛, 감칠맛' },
              { pronunciation: '가 아루', word: 'がある', reading: 'がある', meaning: '~이/가 있다' }
            ]
          },
          dialogue: [
            {
              speaker: '친구',
              japanese: 'スープの味はどう？脂っこくない？',
              korean: '국물 맛 어때? 기름지지 않아?',
              pronunciation: '스-푸노 아지와 도-? 아부랏코쿠나이?',
              breakdown: [
                { pronunciation: '스-푸', word: 'スープ', reading: 'スープ', meaning: '국물' },
                { pronunciation: '아지', word: '味', reading: 'あじ', meaning: '맛' },
                { pronunciation: '도-', word: 'どう', reading: 'どう', meaning: '어때' },
                { pronunciation: '아부랏코쿠나이', word: '脂っこくない', reading: 'あぶらっこくない', meaning: '기름지지 않아?' }
              ]
            },
            {
              speaker: '나 (감탄하며)',
              japanese: '全然！さっぱりしているのに、豚骨のコクがしっかりあるよ。',
              korean: '전혀! 담백하고 깔끔한데, 돼지 뼈의 깊은 맛이 제대로 살아있어.',
              pronunciation: '젠젠! 삿파리시테이루노니, 톤코츠노 코쿠가 싯카리 아루요.',
              breakdown: [
                { pronunciation: '젠젠', word: '全然', reading: 'ぜんぜん', meaning: '전혀' },
                { pronunciation: '삿파리시테이루노니', word: 'さっぱりしているのに', reading: 'さっぱりしているのに', meaning: '담백하고 깔끔한데' },
                { pronunciation: '톤코츠', word: '豚骨', reading: 'とんこつ', meaning: '돼지 뼈 (돈골)' },
                { pronunciation: '코쿠', word: 'コク', reading: 'こく', meaning: '깊은 맛, 감칠맛' },
                { pronunciation: '싯카리 아루요', word: 'しっかりあるよ', reading: 'しっかりあるよ', meaning: '제대로 살아있어' }
              ]
            },
            {
              speaker: '친구',
              japanese: '評判通りだね。箸が止まらないよ。',
              korean: '소문대로네. 젓가락을 멈출 수가 없어.',
              pronunciation: '효-반도-리다네. 하시가 토마라나이요.',
              breakdown: [
                { pronunciation: '효-반도-리', word: '評判通り', reading: 'ひょうばんどおり', meaning: '소문대로, 명성 그대로' },
                { pronunciation: '하시', word: '箸', reading: 'はし', meaning: '젓가락' },
                { pronunciation: '토마라나이요', word: '止まらないよ', reading: 'とまらないよ', meaning: '멈추질 않아' }
              ]
            }
          ],
          grammar: {
            title: '형용사 연결형 (~くて / ~で / ~のに)',
            structure: 'さっぱりしている(깔끔하다) + のに(하지만) + コクがある(깊은 맛이 있다)',
            explanation: '상반되거나 복합적인 음식의 풍미를 연결할 때 사용하는 고급 미각 묘사 구문입니다.'
          },
          vocabulary: [
            {
              id: 'ad1-v1',
              kanji: '脂っこい',
              reading: 'あぶらっこい',
              meaning: '기름지다, 느끼하다',
              partOfSpeech: '형용사'
            },
            {
              id: 'ad1-v2',
              kanji: 'コク',
              reading: 'こく',
              meaning: '깊은 맛, 감칠맛, 풍미',
              partOfSpeech: '명사'
            },
            {
              id: 'ad1-v3',
              kanji: '評判通り',
              reading: 'ひょうばんどおり',
              meaning: '소문대로, 명성 그대로',
              partOfSpeech: '부사/명사'
            }
          ],
          nuanceTip: '일본 미식 문화에서 "코쿠(コク)"는 단순한 짠맛이나 단맛이 아니라 오랫동안 우려낸 깊은 감칠맛을 뜻합니다. "삿파리(깔끔함)"와 대조하여 쓰면 현지인도 감탄하는 고급스러운 맛 표현이 됩니다.'
        }
      },
      {
        id: 'advanced-2',
        unitNumber: 2,
        title: '혼잡 시 일괄 결제 및 가게 에티켓 대처하기',
        description: '피크 타임 매장의 안내를 정확히 알아듣고 응대하는 표현',
        keyPhrase: '混雑時はまとめてのお支払いをお願いしております',
        keyPhraseReading: 'こんざつじは まとめての おしはらいを おねがいしております',
        keyPhraseKorean: '혼잡 시에는 일괄 결제를 부탁드리고 있습니다',
        pronunciationKorean: '콘자츠지와 마토메테노 오시하라이오 오네가이시테오리마스',
        lessonId: 'lesson-advanced-2',
        lessonData: {
          id: 'lesson-advanced-2',
          dayNumber: 2,
          level: 'advanced',
          seriesTitle: 'Lv.3 실전 일본어',
          themeTitle: '혼잡 시 일괄 결제 및 가게 에티켓 대처하기',
          unitTitle: 'Unit 2: 혼잡 시 일괄 결제 및 가게 에티켓 대처하기',
          pronunciationKorean: '콘자츠지와 마토메테노 오시하라이오 오네가이시테오리마스',
          keyExpression: {
            japanese: '混雑時はまとめてのお支払いをお願いしております',
            reading: 'こんざつじは まとめての おしはらいを おねがいしております',
            korean: '혼잡 시에는 일괄 결제를 부탁드리고 있습니다',
            breakdown: [
              { pronunciation: '콘자츠지', word: '混雑時', reading: 'こんざつじ', meaning: '혼잡 시, 붐비는 시간' },
              { pronunciation: '마토메테', word: 'まとめて', reading: 'まとめて', meaning: '일괄, 한꺼번에' },
              { pronunciation: '오시하라이', word: 'お支払い', reading: 'おしはらい', meaning: '결제' },
              { pronunciation: '오네가이시테오리마스', word: 'お願いしております', reading: 'おねがいしております', meaning: '부탁드리고 있습니다' }
            ]
          },
          dialogue: [
            {
              speaker: '점원 (양해를 구하며)',
              japanese: '恐れ入りますが、混雑時はまとめてのお支払いをお願いしております。',
              korean: '송구스럽습니다만, 혼잡 시에는 일괄 결제를 부탁드리고 있습니다.',
              pronunciation: '오소레이리마스가, 콘자츠지와 마토메테노 오시하라이오 오네가이시테오리마스.',
              breakdown: [
                { pronunciation: '오소레이리마스가', word: '恐れ入りますが', reading: 'おそれいりますが', meaning: '송구스럽습니다만' },
                { pronunciation: '콘자츠지', word: '混雑時', reading: 'こんざつじ', meaning: '혼잡할 때' },
                { pronunciation: '마토메테', word: 'まとめて', reading: 'まとめて', meaning: '한꺼번에' },
                { pronunciation: '오시하라이', word: 'お支払い', reading: 'おしはらい', meaning: '결제' },
                { pronunciation: '오네가이시테오리마스', word: 'お願いしております', reading: 'おねがいしております', meaning: '부탁드리고 있습니다' }
              ]
            },
            {
              speaker: '손님 (나)',
              japanese: 'あ、承知しました。じゃあ私が代表で支払います。',
              korean: '아, 잘 알겠습니다. 그럼 제가 대표로 결제할게요.',
              pronunciation: '아, 쇼-치시마시타. 쟈- 와타시가 다이효-데 시하라이마스.',
              breakdown: [
                { pronunciation: '쇼-치시마시타', word: '承知しました', reading: 'しょうちしました', meaning: '잘 알겠습니다' },
                { pronunciation: '와타시', word: '私', reading: 'わたし', meaning: '나, 저' },
                { pronunciation: '다이효-데', word: '代表で', reading: 'だいひょうで', meaning: '대표로' },
                { pronunciation: '시하라이마스', word: '支払います', reading: 'しはらいます', meaning: '결제할게요' }
              ]
            },
            {
              speaker: '점원 (미소 지으며)',
              japanese: 'ご協力ありがとうございます！',
              korean: '협조해 주셔서 대단히 감사합니다!',
              pronunciation: '고쿄-료쿠 아리가토-고자이마스!',
              breakdown: [
                { pronunciation: '고쿄-료쿠', word: 'ご協力', reading: 'ごきょうりょく', meaning: '협조' },
                { pronunciation: '아리가토-고자이마스', word: 'ありがとうございます', reading: 'ありがとうございます', meaning: '대단히 감사합니다' }
              ]
            }
          ],
          grammar: {
            title: 'お + 동사 연용형 + しております (겸양 정중 표현)',
            structure: 'お + 支払い + を + お願いしております',
            explanation: '가게 직원이 손님에게 협조나 규칙을 정중하게 요청할 때 사용하는 공식적인 일본 비즈니스 접객 패턴입니다.'
          },
          vocabulary: [
            {
              id: 'ad2-v1',
              kanji: '恐れ入ります',
              reading: 'おそれいります',
              meaning: '송구스럽습니다, 죄송합니다',
              partOfSpeech: '표현'
            },
            {
              id: 'ad2-v2',
              kanji: '代表',
              reading: 'だいひょう',
              meaning: '대표',
              partOfSpeech: '명사'
            },
            {
              id: 'ad2-v3',
              kanji: 'ご協力',
              reading: 'ごきょうりょく',
              meaning: '협력, 협조',
              partOfSpeech: '명사'
            }
          ],
          nuanceTip: '💡 [듣기 및 대응 팁] 점원이 "まとめてのお支払い(일괄 결제)"를 요청할 때, 당황하지 않고 "承知しました(쇼-치시마시타: 잘 알겠습니다)"나 "私が代表で支払います(제가 대표로 낼게요)"라고 유연하게 응대하면 최고의 일본 식당 에티켓을 발휘할 수 있습니다.'
        }
      }
    ]
  },
  {
    level: 'ai',
    badge: 'AI+',
    title: 'AI+ 실전 로컬 챌린지',
    subTitle: '일본인 친구에게 들려주고 싶은 나만의 부산 이야기를 AI와 함께 실전 일본어로 기록하고 차곡차곡 채워갑니다.',
    targetAudience: '부산 여행과 일상에서 마주치는 나만의 상황을 AI로 만들고 무제한으로 확장하는 학습자',
    color: '#E07A5F',
    bgLight: '#FAF0E6',
    borderColor: '#F4DDD4',
    units: []
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
        const kanaReading = u.keyPhraseReading || kanjiToKana(u.keyPhrase);
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
            reading: kanaReading,
            korean: u.keyPhraseKorean
          },
          dialogue: [
            {
              speaker: '나',
              japanese: u.keyPhrase,
              korean: u.keyPhraseKorean,
              pronunciation: u.pronunciationKorean
            },
            {
              speaker: '상대방',
              japanese: 'かしこまりました。どうぞ！',
              korean: '알겠습니다. 여기 있습니다!',
              pronunciation: '카시코마리마시타. 도-조!'
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
              reading: kanaReading,
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

