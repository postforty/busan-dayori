import { LessonLevel, LevelQuizQuestion, LevelTestResult, CurriculumLevel } from '@/types';
import { getCurriculumLevels } from './curriculumData';

export const LEVEL_QUIZ_DATA: Record<LessonLevel, LevelQuizQuestion[]> = {
  starter: [
    {
      id: 'starter-q1',
      scenario: '자갈치 시장에서 상인분이 따끈한 씨앗호떡을 건네며 환하게 웃으며 "どうぞ！(여기 있어요)"라고 말했습니다. 어른에게 건넬 가장 정중하고 예의 바른 감사의 인사는?',
      situationTag: '인사와 감사',
      speakerAudioText: 'どうぞ！',
      speakerAudioLabel: '상인: どうぞ！(여기 있어요!)',
      options: [
        {
          text: 'ありがと！',
          reading: 'ありがと',
          isCorrect: false,
          explanation: '친구에게 쓰는 반말 인사예요. 어른이나 처음 뵙는 분께는 정중한 표현이 필요해요.'
        },
        {
          text: 'ありがとう ございます！',
          reading: 'ありがとう ございます',
          isCorrect: true,
          explanation: '정답! 어른이나 직원분에게 건네는 가장 품격 있고 완벽한 감사 인사입니다.'
        },
        {
          text: 'すみません！',
          reading: 'すみません',
          isCorrect: false,
          explanation: '‘저기요/죄송합니다’라는 뜻으로 감사 인사로는 다소 어색해요.'
        },
        {
          text: 'だいじょうぶ です！',
          reading: 'だいじょうぶ です',
          isCorrect: false,
          explanation: '‘괜찮아요’라는 뜻으로 호떡을 건네받을 때 하는 인사가 아닙니다.'
        }
      ],
      tip: '식당이나 가게에서 계산을 마치거나 음식을 받을 때 환하게 웃으며 "아리가토-고자이마스!"라고만 해도 최고의 매너가 됩니다.',
      relatedUnitTitle: 'Unit 1: 인사와 부름'
    },
    {
      id: 'starter-q2',
      scenario: '남포동 분식집에 들어가 자리에 앉자 점원이 밝은 목소리로 "ご注文は？(주문하시겠어요?)"라고 묻습니다. 메뉴판의 떡볶이를 손가락으로 가리키며 "이거 주세요!"라고 주문하는 가장 확실한 표현은?',
      situationTag: '음식 주문',
      speakerAudioText: 'ご注文は？',
      speakerAudioLabel: '점원: ご注文は？ (주문하시겠어요?)',
      options: [
        {
          text: 'これ ください！',
          reading: 'これ ください',
          isCorrect: true,
          explanation: '정답! 메뉴판이나 진열대를 손가락으로 가리키며 "코레 쿠다사이!"라고만 외치면 어떤 주문도 바로 해결됩니다.'
        },
        {
          text: 'これ どこですか？',
          reading: 'これ どこですか',
          isCorrect: false,
          explanation: '‘이거 어디예요?’라는 위치를 묻는 표현이에요.'
        },
        {
          text: 'これ いくらですか？',
          reading: 'これ いくらですか',
          isCorrect: false,
          explanation: '‘이거 얼마예요?’라는 가격을 묻는 질문이에요.'
        },
        {
          text: 'これ おいしい！',
          reading: 'これ おいしい',
          isCorrect: false,
          explanation: '‘이거 맛있다!’라는 맛의 감탄 표현입니다.'
        }
      ],
      tip: '메뉴 이름을 몰라도 당황하지 마세요! 메뉴판이나 실물을 콕 가리키며 "코레 쿠다사이!"만 기억하면 주문이 끝납니다.',
      relatedUnitTitle: 'Unit 2: 주문과 필요 표현'
    },
    {
      id: 'starter-q3',
      scenario: '해운대 골목길을 걷다 급하게 화장실을 찾아야 합니다. 지나가는 친절한 행인에게 공손하게 말을 건네며 위치를 묻는 가장 적절한 질문은?',
      situationTag: '생존 SOS',
      options: [
        {
          text: 'すみません、トイレは どこですか？',
          reading: 'すみません、トイレは どこですか',
          isCorrect: true,
          explanation: '정답! "스미마센(저기요/실례합니다)"으로 부드럽게 말을 트고 화장실 위치를 묻는 완벽한 문장이에요.'
        },
        {
          text: 'おい、トイレ！',
          reading: 'おい、トイレ',
          isCorrect: false,
          explanation: '매우 무례한 반말 표현입니다.'
        },
        {
          text: 'トイレ、いくらですか？',
          reading: 'トイレ、いくらですか',
          isCorrect: false,
          explanation: '‘화장실 얼마예요?’라는 어색한 가격 질문이에요.'
        },
        {
          text: 'トイレ、これ ください！',
          reading: 'トイレ、これ ください',
          isCorrect: false,
          explanation: '‘화장실 이거 주세요’라는 말이 되지 않는 조합입니다.'
        }
      ],
      tip: '누군가에게 길이나 위치를 물을 때는 먼저 "스미마센(실례합니다)"을 살짝 숙이며 말하는 것이 일본어 매너의 핵심입니다.',
      relatedUnitTitle: 'Unit 3: 길 찾기와 위치'
    },
    {
      id: 'starter-q4',
      scenario: '광안리 편의점에서 생수를 계산하는데, 직원이 비닐봉투를 가리키며 "袋、いりますか？(봉투 필요하신가요?)"라고 물어봅니다. 가방이 있어 정중하게 "괜찮아요(필요 없어요)"라고 사양하는 표현은?',
      situationTag: '편의점 계산',
      speakerAudioText: '袋、いりますか？',
      speakerAudioLabel: '직원: 袋、いりますか？ (봉투 필요하신가요?)',
      options: [
        {
          text: '大丈夫です！',
          reading: 'だいじょうぶ です',
          isCorrect: true,
          explanation: '정답! 손을 가볍게 내저으며 "다이죠-부데스"라고 하면 "필요 없습니다/괜찮습니다"라는 뜻으로 매우 정중하게 전달됩니다.'
        },
        {
          text: 'ダメです！',
          reading: 'ダメです',
          isCorrect: false,
          explanation: '‘안 됩니다!’라는 금지의 강한 표현으로 사양할 때 쓰면 어색하고 무례할 수 있어요.'
        },
        {
          text: 'ごめんなさい！',
          reading: 'ごめんなさい',
          isCorrect: false,
          explanation: '사과할 때 쓰는 표현이에요. 사양의 뜻이 아닙니다.'
        },
        {
          text: '袋、ください！',
          reading: 'ふくろ、ください',
          isCorrect: false,
          explanation: '‘봉투 주세요!’라는 뜻으로 사양이 아닌 봉투를 요청하는 말이에요.'
        }
      ],
      tip: '편의점에서 봉투나 영수증을 권할 때 "다이죠-부데스(괜찮아요)" 한마디면 깔끔하고 세련되게 거절할 수 있어요.',
      relatedUnitTitle: 'Unit 4: 편의점과 쇼핑'
    },
    {
      id: 'starter-q5',
      scenario: '전포 카페거리의 아기자기한 소품샵 문을 열고 들어가자, 매장 점원이 문 쪽을 보며 "いらっしゃいませ！(어서오세요!)"라고 상냥하게 인사합니다. 이때 눈을 마주치며 화답할 가장 자연스러운 태도는?',
      situationTag: '입장 매너',
      speakerAudioText: 'いらっしゃいませ！',
      speakerAudioLabel: '점원: いらっしゃいませ！ (어서오세요!)',
      options: [
        {
          text: '가볍게 목례를 하거나 살짝 미소 짓기 (또는 こんにちは)',
          isCorrect: true,
          explanation: '정답! 일본에서는 점원의 환영 인사에 가볍게 고개를 끄덕이거나 낮 시간엔 "콘니치와" 정도로 가볍게 화답하는 것이 가장 자연스럽습니다.'
        },
        {
          text: '큰 소리로 "いらっしゃいませ！"라고 똑같이 따라 하기',
          isCorrect: false,
          explanation: '‘어서오세요’는 손님을 맞이하는 주인의 인사말이므로 손님이 똑같이 외치면 어색합니다.'
        },
        {
          text: '"さようなら！(안녕히 가세요!)"라고 외치기',
          isCorrect: false,
          explanation: '헤어질 때 쓰는 작별 인사예요.'
        },
        {
          text: '"すみません、いくらですか？"부터 다급하게 외치기',
          isCorrect: false,
          explanation: '가게에 들어서자마자 가격부터 외치면 당황스러울 수 있어요.'
        }
      ],
      tip: '일본 상점에서는 눈이 마주쳤을 때 가벼운 눈인사(목례)만으로도 서로 기분 좋은 존중의 시작이 됩니다.',
      relatedUnitTitle: 'Unit 1: 인사와 부름'
    }
  ],
  beginner: [
    {
      id: 'beginner-q1',
      scenario: '영도 카페 카운터에서 직원이 "ご注文は お決まりですか？(주문 결정하셨나요?)"라고 묻습니다. 시원한 아이스커피 1잔을 주문할 때 정확한 수량 표현은?',
      situationTag: '음료 주문',
      speakerAudioText: 'ご注文は お決まりですか？',
      speakerAudioLabel: '직원: ご注文は お決まりですか？',
      options: [
        {
          text: 'アイスコーヒー ひとつ ください！',
          reading: 'アイスコーヒー ひとつ ください',
          isCorrect: true,
          explanation: '정답! 사물이나 음료 1개를 셀 때는 "하나"를 뜻하는 "ひとつ(히토츠)"를 사용합니다.'
        },
        {
          text: 'アイスコーヒー いち ください！',
          reading: 'アイスコーヒー いち ください',
          isCorrect: false,
          explanation: '숫자 "1(이치)"를 그대로 쓰면 어색합니다. 물건을 셀 때는 "히토츠"를 씁니다.'
        },
        {
          text: 'アイスコーヒー ふたつ ください！',
          reading: 'アイスコーヒー ふたつ ください',
          isCorrect: false,
          explanation: '"ふたつ(후타츠)"는 2개입니다.'
        },
        {
          text: 'アイスコーヒー これ どこですか？',
          reading: 'アイスコーヒー これ どこですか',
          isCorrect: false,
          explanation: '위치를 묻는 엉뚱한 표현입니다.'
        }
      ],
      tip: '수량 세기: 1개=ひとつ(히토츠), 2개=ふたつ(후타츠), 3개=みっつ(밋츠). 이것만 알아도 주문 마스터!',
      relatedUnitTitle: 'Unit 5: 수량과 단위'
    },
    {
      id: 'beginner-q2',
      scenario: '식사를 마치고 계산대에 섰습니다. 점원이 영수증을 보여주며 "お会計ですね。(계산이시군요)"라고 할 때, 신용카드 결제가 가능한지 공손하게 물어보는 표현은?',
      situationTag: '결제 수단',
      speakerAudioText: 'お会計ですね。',
      speakerAudioLabel: '점원: お会計ですね。(계산이시군요)',
      options: [
        {
          text: 'カード、使えますか？',
          reading: 'カード、つかえますか',
          isCorrect: true,
          explanation: '정답! "카-도, 츠카에마스카?(카드 쓸 수 있나요?)"는 일본 여행에서 가장 유용한 결제 질문입니다.'
        },
        {
          text: 'カード、ありますか？',
          reading: 'カード、ありますか',
          isCorrect: false,
          explanation: '‘카드 가지고 있나요?’라는 뜻으로 점원에게 카드가 있냐고 묻는 말이 돼요.'
        },
        {
          text: 'カード、いくらですか？',
          reading: 'カード、いくらですか',
          isCorrect: false,
          explanation: '‘카드 얼마예요?’라는 가격 질문입니다.'
        },
        {
          text: 'カード、これ ください！',
          reading: 'カード、これ ください',
          isCorrect: false,
          explanation: '카드를 달라는 주문이 되어버립니다.'
        }
      ],
      tip: '일본 로컬 식당 중에는 현금 전용(Cash only) 매장이 종종 있으므로 "카-도 츠카에마스카?"는 필수 질문입니다.',
      relatedUnitTitle: 'Unit 6: 결제와 계산'
    },
    {
      id: 'beginner-q3',
      scenario: '베이커리 매장에서 빵 종류가 너무 많아 고민됩니다. 점원에게 "이 가게에서 가장 추천하는 메뉴는 무엇인가요?"라고 물어보고 싶을 때 올바른 표현은?',
      situationTag: '추천 요청',
      options: [
        {
          text: 'おすすめは 何ですか？',
          reading: 'おすすめは なんですか',
          isCorrect: true,
          explanation: '정답! "오스스메와 난데스카?(추천은 무엇인가요?)"는 로컬 맛집에서 실패 없는 선택을 돕는 마법의 표현입니다.'
        },
        {
          text: 'これ、おいしいですか？',
          reading: 'これ、おいしいですか',
          isCorrect: false,
          explanation: '‘이거 맛있어요?’도 물어볼 수 있지만 대표 추천 메뉴를 묻는 표현은 ‘오스스메’입니다.'
        },
        {
          text: 'メニュー、ありますか？',
          reading: 'メニュー、ありますか',
          isCorrect: false,
          explanation: '메뉴판이 있는지 묻는 말입니다.'
        },
        {
          text: 'お会計、おねがいします。',
          reading: 'おかいけい、おねがいします',
          isCorrect: false,
          explanation: '계산을 요청하는 표현입니다.'
        }
      ],
      tip: '"오스스메(추천)"를 외우면 식당, 이자카야, 디저트 가게 어디서든 최고의 시그니처 메뉴를 맛볼 수 있습니다.',
      relatedUnitTitle: 'Unit 7: 취향과 추천'
    },
    {
      id: 'beginner-q4',
      scenario: '기념품 매장에서 마음에 드는 가방을 발견했습니다. 점원이 다가와 "何か お探しですか？(무언가 찾으시나요?)"라고 묻습니다. "다른 색상도 있나요?"라고 물어보는 표현은?',
      situationTag: '쇼핑 질문',
      speakerAudioText: '何か お探しですか？',
      speakerAudioLabel: '점원: 何か お探しですか？',
      options: [
        {
          text: '他の 色は ありますか？',
          reading: 'ほかの いろは ありますか',
          isCorrect: true,
          explanation: '정답! "호카노 이로와 아리마스카?(다른 색은 있나요?)"로 재고나 옵션을 확인할 때 쓰는 정확한 표현입니다.'
        },
        {
          text: 'これ、いくらですか？',
          reading: 'これ、いくらですか',
          isCorrect: false,
          explanation: '가격 질문입니다.'
        },
        {
          text: '色、きれいですね！',
          reading: 'いろ、きれいですね',
          isCorrect: false,
          explanation: '색상이 예쁘다는 칭찬 표현입니다.'
        },
        {
          text: 'これ、違います。',
          reading: 'これ、ちがいます',
          isCorrect: false,
          explanation: '‘이거 틀렸습니다/아닙니다’라는 부정 표현입니다.'
        }
      ],
      tip: '"호카노(다른 것)"를 기억해두면 "호카노 사이즈(다른 사이즈)", "호카노 모노(다른 물건)" 등으로 다양하게 응용할 수 있습니다.',
      relatedUnitTitle: 'Unit 8: 쇼핑과 확인'
    },
    {
      id: 'beginner-q5',
      scenario: '길을 물었더니 현지 주민이 손가락으로 가리키며 "まっすぐ 行って、右です。(곧장 가서 오른쪽입니다)"라고 친절히 알려주셨습니다. 이해했다는 뜻과 함께 전할 가장 적절한 대답은?',
      situationTag: '길 안내 화답',
      speakerAudioText: 'まっすぐ 行って、右です。',
      speakerAudioLabel: '주민: まっすぐ 行って、右です。',
      options: [
        {
          text: '分かりました、ありがとうございます！',
          reading: 'わかりました、ありがとうございます',
          isCorrect: true,
          explanation: '정답! "알겠습니다, 감사합니다!"라는 깔끔하고 예의 바른 완벽한 화답입니다.'
        },
        {
          text: 'すみません、違います。',
          reading: 'すみません、ちがいます',
          isCorrect: false,
          explanation: '‘틀렸습니다’라고 상대방의 안내를 반박하는 엉뚱한 말입니다.'
        },
        {
          text: 'まっすぐ どこですか？',
          reading: 'まっすぐ どこですか',
          isCorrect: false,
          explanation: '방향을 안내받고 다시 되묻는 불완전한 문장입니다.'
        },
        {
          text: 'これ ください！',
          reading: 'これ ください',
          isCorrect: false,
          explanation: '주문 표현입니다.'
        }
      ],
      tip: '길 안내를 받았을 때는 "와카리마시타(알겠습니다)"와 "아리가토-고자이마스"를 함께 전하면 서로 따뜻한 여행이 됩니다.',
      relatedUnitTitle: 'Unit 3: 길 찾기와 위치'
    }
  ],
  intermediate: [
    {
      id: 'intermediate-q1',
      scenario: '초밥집에서 직원이 주문을 받기 전 "わさびは 大丈夫ですか？(와사비는 괜찮으신가요?)"라고 묻습니다. 와사비를 못 먹어서 "와사비 빼고 부탁드릴 수 있을까요?"라고 정중하게 요청하는 표현은?',
      situationTag: '식사 요청',
      speakerAudioText: 'わさびは 大丈夫ですか？',
      speakerAudioLabel: '직원: わさびは 大丈夫ですか？',
      options: [
        {
          text: 'わさび抜きで お願いできますか？',
          reading: 'わさびぬきで おねがいできますか',
          isCorrect: true,
          explanation: '정답! ‘~누키(빼기)’와 공손한 의뢰형 ‘오네가이 데키마스카’를 결합한 완벽한 문장입니다.'
        },
        {
          text: 'わさび、だめ！',
          reading: 'わさび、だめ',
          isCorrect: false,
          explanation: '반말이자 너무 직설적인 거절입니다.'
        },
        {
          text: 'わさび、もっと ください！',
          reading: 'わさび、もっと ください',
          isCorrect: false,
          explanation: '오히려 와사비를 더 달라는 뜻이 됩니다.'
        },
        {
          text: 'わさびは どこですか？',
          reading: 'わさびは どこですか',
          isCorrect: false,
          explanation: '와사비가 어디 있는지 묻는 질문입니다.'
        }
      ],
      tip: '‘재료 + 抜き(누키)’ 패턴은 일본 식당에서 못 먹는 식재료를 뺄 때 필수적인 실전 패턴입니다.',
      relatedUnitTitle: 'Unit 9: 정중한 부탁과 요청'
    },
    {
      id: 'intermediate-q2',
      scenario: '지하철 승강장에서 열차를 기다리는데 행선지가 헷갈립니다. 역무원에게 다가가 이 열차가 부산역(목적지)으로 가는지 정중히 확인할 때 알맞은 질문은?',
      situationTag: '교통 확인',
      options: [
        {
          text: 'すみません、この電車は 釜山駅に 行きますか？',
          reading: 'すみません、この でんしゃは ぷさんえきに いきますか',
          isCorrect: true,
          explanation: '정답! "코노 덴샤와 ~니 이키마스카?(이 전철은 ~에 가나요?)"로 노선 오탑승을 예방하는 핵심 문장입니다.'
        },
        {
          text: '釜山駅は いくらですか？',
          reading: 'ぷさんえきは いくらですか',
          isCorrect: false,
          explanation: '부산역이 얼마냐는 말이 안 되는 질문입니다.'
        },
        {
          text: '電車を ください！',
          reading: 'でんしゃを ください',
          isCorrect: false,
          explanation: '전철을 달라는 뜻입니다.'
        },
        {
          text: 'ここは 釜山駅ですか？',
          reading: 'ここは ぷさんえきですか',
          isCorrect: false,
          explanation: '여기가 부산역인지 묻는 표현으로, 타고 갈 열차의 행선지를 묻는 말이 아닙니다.'
        }
      ],
      tip: '일본의 복잡한 지하철/기차 시스템에서는 탈 열차가 목적지에 정차하는지 물어볼 때 "~니 이키마스카?"를 적극 활용하세요.',
      relatedUnitTitle: 'Unit 10: 대중교통과 환승'
    },
    {
      id: 'intermediate-q3',
      scenario: '호텔 체크인 시간(오후 3시)보다 일찍 도착했습니다. 프런트 직원에게 "체크인 전까지 짐을 맡아주실 수 있나요?"라고 품격 있게 부탁하고 싶습니다. 가장 알맞은 표현은?',
      situationTag: '호텔 서비스',
      speakerAudioText: 'いらっしゃいませ。ご宿泊ですか？',
      speakerAudioLabel: '직원: いらっしゃいませ。ご宿泊ですか？',
      options: [
        {
          text: 'チェックインまで 荷物を 預かっていただけますか？',
          reading: 'チェックインまで にもつを あずかっていただけますか',
          isCorrect: true,
          explanation: '정답! ‘짐을 맡아주시다(預かっていただく)’의 가능형 정중 의뢰로, 호텔에서 감탄하는 고급 회화 표현입니다.'
        },
        {
          text: '荷物、置いていくよ！',
          reading: 'にもつ、おいていくよ',
          isCorrect: false,
          explanation: '‘짐 두고 간다!’라는 반말 통보입니다.'
        },
        {
          text: '荷物は いくらですか？',
          reading: 'にもつは いくらですか',
          isCorrect: false,
          explanation: '짐 가격을 묻는 엉뚱한 말입니다.'
        },
        {
          text: '早く チェックイン して！',
          reading: 'はやく チェックイン して',
          isCorrect: false,
          explanation: '빨리 체크인하라는 명령형 표현입니다.'
        }
      ],
      tip: '"~테 이타다케마스카?(~해 주실 수 있나요?)"는 상대방에게 배려를 구할 때 가장 신사적인 최고 수준의 의뢰 표현입니다.',
      relatedUnitTitle: 'Unit 11: 호텔과 숙박 에티켓'
    },
    {
      id: 'intermediate-q4',
      scenario: '사전 예약한 식당에 도착하자 직원이 "ご予約の お名前を お願いします。(예약자 성함을 부탁드립니다)"라고 물어봅니다. "7시에 예약한 김(Kim)이라고 합니다"라고 명확히 밝히는 문장은?',
      situationTag: '예약 확인',
      speakerAudioText: 'ご予約の お名前を お願いします。',
      speakerAudioLabel: '직원: ご予約の お名前を お願いします。',
      options: [
        {
          text: '7時に 予約した キムと 申します。',
          reading: 'しちじに よやくした キムと もうします',
          isCorrect: true,
          explanation: '정답! 자신의 이름을 낮추어 말하는 겸양 표현 ‘~토 모-시마스(~라고 합니다)’를 사용하여 매우 단정하고 격식 있는 문장입니다.'
        },
        {
          text: 'キム様だ！',
          reading: 'キムさまだ',
          isCorrect: false,
          explanation: '자신에게 존칭인 ‘사마(님)’를 붙이는 치명적인 실수입니다.'
        },
        {
          text: '7時は いくらですか？',
          reading: 'しちじは いくらですか',
          isCorrect: false,
          explanation: '시간 가격을 묻는 어색한 표현입니다.'
        },
        {
          text: '予約を ください！',
          reading: 'よやくを ください',
          isCorrect: false,
          explanation: '예약을 달라는 부자연스러운 문장입니다.'
        }
      ],
      tip: '비즈니스나 예약 시 자신을 소개할 때는 ‘~데스’보다 ‘~토 모-시마스’를 쓰면 상대방에게 매우 신뢰감을 줍니다.',
      relatedUnitTitle: 'Unit 12: 예약과 시간 표현'
    },
    {
      id: 'intermediate-q5',
      scenario: '택시를 타고 이동 중 목적지 근처에 다다랐습니다. 기사님에게 "저 앞 신호등 근처에서 내려주세요"라고 정중히 하차 위치를 알릴 때 올바른 문장은?',
      situationTag: '택시 하차',
      options: [
        {
          text: 'あの 信号の ところで 降ろして ください。',
          reading: 'あの しんごうの ところで おろして ください',
          isCorrect: true,
          explanation: '정답! ‘내려주세요(おろしてください)’를 사용하여 원하는 지점을 정확히 지정하는 표현입니다.'
        },
        {
          text: 'ここで 止まれ！',
          reading: 'ここで とまれ',
          isCorrect: false,
          explanation: '강한 명령조(멈춰라!)로 절대 써서는 안 됩니다.'
        },
        {
          text: '信号、いくらですか？',
          reading: 'しんごう、いくらですか',
          isCorrect: false,
          explanation: '신호등 가격을 묻는 질문입니다.'
        },
        {
          text: 'タクシー、これ ください！',
          reading: 'タクシー、これ ください',
          isCorrect: false,
          explanation: '택시를 달라는 엉뚱한 주문입니다.'
        }
      ],
      tip: '택시에서 내릴 때 "여기서 내려주세요"는 "코코데 오로시테 쿠다사이"라고 말하면 충분합니다.',
      relatedUnitTitle: 'Unit 10: 대중교통과 환승'
    }
  ],
  advanced: [
    {
      id: 'advanced-q1',
      scenario: '부산 전통 다도 카페에서 장인 주인이 따뜻한 차를 내어주며 "釜山の 旅は 楽しんで いらっしゃいますか？(부산 여행은 즐겁게 즐기고 계신가요?)"라고 다정하게 물어보셨습니다. 진심을 담아 풍부하게 교감하는 최적의 답변은?',
      situationTag: '문화 교류와 환대',
      speakerAudioText: '釜山の 旅は 楽しんで いらっしゃいますか？',
      speakerAudioLabel: '주인: 釜山の 旅は 楽しんで いらっしゃいますか？',
      options: [
        {
          text: 'はい、海の 景色も 素晴らしくて、温かい 方ばかりで 最高の 思い出に なっています。',
          reading: 'はい、うみの けしきも すばらしくて、あたたかい かたばかりで さいこうの おもいでに なっています',
          isCorrect: true,
          explanation: '정답! 풍경과 사람들의 친절함에 감사를 표하며 감동을 주는 최고 수준의 교류 회화입니다.'
        },
        {
          text: 'まあまあです。',
          reading: 'まあまあです',
          isCorrect: false,
          explanation: '‘그저 그래요’라는 뜻으로 환대해 준 호스트의 호의에 찬물을 끼얹는 표현입니다.'
        },
        {
          text: 'お茶、いくらですか？',
          reading: 'おちゃ、いくらですか',
          isCorrect: false,
          explanation: '분위기를 깨고 갑자기 차 가격을 묻는 말입니다.'
        },
        {
          text: '楽しくないです。',
          reading: 'たのしくないです',
          isCorrect: false,
          explanation: '재미없다는 부정적 표현입니다.'
        }
      ],
      tip: '현지인과의 대화에서는 단순한 "하이/이이에"를 넘어 감사와 느낌을 덧붙이면 깊은 유대감이 형성됩니다.',
      relatedUnitTitle: 'Unit 13: 깊은 감상과 문화 교류'
    },
    {
      id: 'advanced-q2',
      scenario: '숙소 객실에 들어왔는데 에어컨에서 찬 바람이 나오지 않고 소음이 심합니다. 프런트에 전화해 직원에게 상황을 조리 있게 설명하고 확인을 부탁하는 가장 교양 있는 표현은?',
      situationTag: '트러블 대처',
      options: [
        {
          text: '恐れ入りますが、エアコンの 調子が 悪いようなので、一度 ご確認 いただけますでしょうか？',
          reading: 'おそれいりますが、エアコンの ちょうしが わるいようなので、いちど ごかくにん いただけますでしょうか',
          isCorrect: true,
          explanation: '정답! "오소레이리마스가(송구스럽습니다만)" 쿠션어와 "~요-나노데(~인 것 같아서)", 완곡한 의뢰형을 조화롭게 사용한 최상급 호텔 회화입니다.'
        },
        {
          text: 'エアコン 壊れた！ 弁償しろ！',
          reading: 'エアコン こわれた！ べんしょうしろ！',
          isCorrect: false,
          explanation: '‘에어컨 고장 났다! 물어내라!’라는 공격적이고 거친 표현입니다.'
        },
        {
          text: '新しい 部屋、これ ください！',
          reading: 'あたらしい へや、これ ください',
          isCorrect: false,
          explanation: '상황 설명 없이 방을 달라는 어색한 표현입니다.'
        },
        {
          text: 'エアコンは いくらですか？',
          reading: 'エアコンは いくらですか',
          isCorrect: false,
          explanation: '에어컨 기기 가격을 묻는 엉뚱한 말입니다.'
        }
      ],
      tip: '문제를 제기할 때 "오소레이리마스가(황송합니다만)"라는 쿠션어를 서두에 붙이면 상대방이 훨씬 적극적이고 정성껏 해결해 줍니다.',
      relatedUnitTitle: 'Unit 14: 문제 해결과 쿠션어'
    },
    {
      id: 'advanced-q3',
      scenario: '현지 파트너와의 비즈니스 미팅 자리입니다. 상대방 대표가 "本日は お忙しい中、お越しいただき ありがとうございます。(오늘 바쁘신 와중에 발걸음해 주셔서 감사합니다)"라고 인사할 때, 그에 걸맞은 격식 있는 비즈니스 화답은?',
      situationTag: '비즈니스 에티켓',
      speakerAudioText: '本日は お忙しい中、お越しいただき ありがとうございます。',
      speakerAudioLabel: '상대방: 本日は お忙しい中、お越しいただき ありがとうございます。',
      options: [
        {
          text: 'こちらこそ、お時間を いただき ありがとうございます。本日は よろしく お願いいたします。',
          reading: 'こちらこそ、おじかんを いただき ありがとうございます。ほんじつは よろしく おねがいいたします',
          isCorrect: true,
          explanation: '정답! "코치라코소(오히려 저희 쪽이야말로)"로 감사를 되돌리고, 시간을 내어주심에 감사를 표하는 완벽한 비즈니스 매너입니다.'
        },
        {
          text: 'どういたしまして！',
          reading: 'どういたしまして',
          isCorrect: false,
          explanation: '비즈니스 자리에서 상대방의 정중한 감사에 "천만에요"는 다소 위에서 내려다보는 듯한 뉘앙스를 줄 수 있어 지양해야 합니다.'
        },
        {
          text: 'いいえ、暇でした。',
          reading: 'いいえ、ひまでした',
          isCorrect: false,
          explanation: '‘아니요, 한가했어요’라는 불필요하고 경박해 보일 수 있는 표현입니다.'
        },
        {
          text: 'お疲れ様でした！',
          reading: 'おつかれさまでした',
          isCorrect: false,
          explanation: '미팅을 시작할 때가 아닌 일이 끝났을 때 하는 인사입니다.'
        }
      ],
      tip: '상대방의 정중한 환대에는 "코치라코소(오히려 저희 쪽이야말로)"로 받는 것이 일본 비즈니스의 황금률입니다.',
      relatedUnitTitle: 'Unit 15: 비즈니스와 정중 어법'
    },
    {
      id: 'advanced-q4',
      scenario: '부산 전통 공예 워크숍을 성공적으로 마친 후 장인 선생님이 소감을 물으셨습니다. "직접 체험해보니 전통의 깊이와 정교함에 감동받았습니다"라고 격조 높은 일본어로 소감을 전할 때 알맞은 문장은?',
      situationTag: '소감과 피드백',
      options: [
        {
          text: '実際に 体験させて いただき、伝統工芸の 繊細さと 奥深さに 心から 感銘を 受けました。',
          reading: 'じっさいに たいけんさせて いただき、でんとうこうげいの せんさいさと おくぶかさに こころから かんめいを うけました',
          isCorrect: true,
          explanation: '정답! 사역 수수 표현(体験させていただき)과 감명(感銘)이라는 어휘를 적절히 구사한 감동적인 고급 감상문입니다.'
        },
        {
          text: 'まあ、面白かったよ。',
          reading: 'まあ、おもしろかったよ',
          isCorrect: false,
          explanation: '‘뭐 재미있었어’라는 가벼운 반말 평가입니다.'
        },
        {
          text: 'これは いくらで 売れますか？',
          reading: 'これは いくらで うれますか',
          isCorrect: false,
          explanation: '얼마에 팔 수 있냐고 상업적으로 묻는 무례한 질문입니다.'
        },
        {
          text: '難しすぎて 嫌でした。',
          reading: 'むずかしすぎて いやでした',
          isCorrect: false,
          explanation: '너무 어려워서 싫었다는 불평입니다.'
        }
      ],
      tip: '상대방의 배려로 기회를 얻었을 때 "~사세테 이타다키(~해 볼 수 있게 해주셔서)"를 쓰면 깊은 존경의 마음이 전달됩니다.',
      relatedUnitTitle: 'Unit 13: 깊은 감상과 문화 교류'
    }
  ],
  ai: []
};

const COMPLETED_TESTS_KEY = 'busan_completed_level_tests';

export function isLevelAllUnitsCompleted(
  level: LessonLevel | CurriculumLevel | string,
  completedLessons?: string[]
): boolean {
  const levelKey = typeof level === 'object' && level !== null ? (level as CurriculumLevel).level : level;
  if (!levelKey || levelKey === 'ai') return false;

  const allLevels = getCurriculumLevels();
  const targetLevel = allLevels.find(l => l.level === levelKey);
  if (!targetLevel || targetLevel.units.length === 0) return false;

  const completedSet = new Set<string>(completedLessons || []);

  if (typeof window !== 'undefined') {
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('lesson_completed_')) {
          if (localStorage.getItem(key) === 'true') {
            completedSet.add(key.replace('lesson_completed_', ''));
          }
        }
      }
      const raw = localStorage.getItem('busan_completed_lessons');
      if (raw) {
        const legacyList = JSON.parse(raw);
        if (Array.isArray(legacyList)) {
          legacyList.forEach((id: string) => completedSet.add(id));
        }
      }
    } catch {
      // 무시
    }
  }

  // targetLevel의 모든 units가 completedSet에 들어있는지 확인
  return targetLevel.units.every(unit => 
    completedSet.has(unit.lessonId) ||
    completedSet.has(unit.id) ||
    Array.from(completedSet).some(id => id.includes(unit.id) || id.includes(unit.lessonId))
  );
}

export function getAllLevelTestResults(): Record<string, LevelTestResult> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(COMPLETED_TESTS_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Record<string, LevelTestResult>;
  } catch {
    return {};
  }
}

export function getLevelTestResult(level: LessonLevel | CurriculumLevel | string): LevelTestResult | null {
  if (typeof window === 'undefined') return null;
  const levelKey = typeof level === 'object' && level !== null ? (level as CurriculumLevel).level : level;
  try {
    const raw = localStorage.getItem(COMPLETED_TESTS_KEY);
    if (!raw) return null;
    const map = JSON.parse(raw) as Record<string, LevelTestResult>;
    return map[levelKey] || null;
  } catch {
    return null;
  }
}

export function saveLevelTestResult(result: LevelTestResult): void {
  if (typeof window === 'undefined') return;
  try {
    const raw = localStorage.getItem(COMPLETED_TESTS_KEY);
    const map = raw ? (JSON.parse(raw) as Record<string, LevelTestResult>) : {};
    map[result.level] = result;
    localStorage.setItem(COMPLETED_TESTS_KEY, JSON.stringify(map));
  } catch (e) {
    console.error('Failed to save level test result:', e);
  }
}
