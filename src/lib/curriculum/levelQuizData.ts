import { LessonLevel, LevelQuizQuestion, LevelTestResult, CurriculumLevel } from '@/types';
import { getCurriculumLevels } from './curriculumData';

export const LEVEL_QUIZ_DATA: Record<LessonLevel, LevelQuizQuestion[]> = {
  starter: [
    {
      id: 'starter-q1',
      scenario: '자갈치 시장에서 상인분이 따끈한 씨앗호떡을 건네며 환하게 웃으며 "どうぞ！(여기 있어요!)"라고 말했습니다. 어른에게 건넬 가장 정중하고 올바른 감사의 인사는?',
      situationTag: '인사와 감사',
      speakerAudioText: 'どうぞ！',
      speakerAudioLabel: '상인: どうぞ！(여기 있어요!)',
      options: [
        {
          text: 'ありがとう！',
          reading: 'ありがとう',
          isCorrect: false,
          explanation: '친구에게 쓰는 반말 인사예요. 어른이나 처음 뵙는 분께는 정중한 존댓말이 필요해요.'
        },
        {
          text: 'ありがとうございます！',
          reading: 'ありがとうございます',
          isCorrect: true,
          explanation: '정답! 어른이나 직원분에게 건네는 가장 품격 있고 완벽한 감사 인사입니다.'
        },
        {
          text: 'すみません！',
          reading: 'すみません',
          isCorrect: false,
          explanation: '‘저기요/미안해요’라는 뜻으로 감사 인사로는 어색해요.'
        },
        {
          text: 'だいじょうぶです！',
          reading: 'だいじょうぶです',
          isCorrect: false,
          explanation: '‘괜찮아요’라는 뜻으로 호떡을 건네받을 때 하는 감사의 인사가 아닙니다.'
        }
      ],
      tip: '식당이나 가게에서 계산을 마치거나 음식을 받을 때 환하게 웃으며 "아리가토-고자이마스!"라고만 해도 최고의 매너가 됩니다.',
      relatedUnitTitle: 'Unit 1: 인사와 부름'
    },
    {
      id: 'starter-q2',
      scenario: '남포동 분식집에 들어와 메뉴판의 떡볶이를 손가락으로 가리키며 "저기요, 이거 주세요!"라고 씩씩하고 확실하게 주문하는 표현은?',
      situationTag: '음식 주문',
      speakerAudioText: 'はい、ご注文は？',
      speakerAudioLabel: '식당 이모님: はい、ご注文は？ (네, 주문하시겠어요?)',
      options: [
        {
          text: 'すみません、これ ください！',
          reading: 'すみません、これ ください',
          isCorrect: true,
          explanation: '정답! "스미마센(저기요)"으로 부르고 "코레 쿠다사이(이거 주세요)"라고 손가락으로 가리키면 주문이 완벽히 해결됩니다.'
        },
        {
          text: 'これ どこですか？',
          reading: 'これ どこですか',
          isCorrect: false,
          explanation: '‘이거 어디예요?’라는 위치를 묻는 질문이에요.'
        },
        {
          text: 'これ いくらですか？',
          reading: 'これ いくらですか',
          isCorrect: false,
          explanation: '‘이거 얼마예요?’라는 가격을 묻는 질문이에요.'
        },
        {
          text: 'わぁ、おいしい！',
          reading: 'わぁ、おいしい',
          isCorrect: false,
          explanation: '음식을 먹고 난 뒤 감탄하는 표현이에요. 주문할 때 쓰는 말이 아닙니다.'
        }
      ],
      tip: '이모님이 "주문하시겠어요?(ご注文は？)"라고 물을 때 메뉴판을 콕 가리키며 "코레 쿠다사이!"라고 외치면 바로 주문 완료! 음식이 나올 땐 이모님이 "はい、どうぞ！(여기 있어요!)"라고 하실 거예요.',
      relatedUnitTitle: 'Unit 2: 주문과 맛 표현'
    },
    {
      id: 'starter-q3',
      scenario: '해운대 골목길을 걷다 급하게 화장실을 찾아야 합니다. 지나가는 친절한 행인에게 공손하게 말을 건네며 "저, 실례합니다! 화장실 어디예요?"라고 묻는 가장 적절한 질문은?',
      situationTag: '생존 SOS',
      speakerAudioText: 'はい、何でしょうか？',
      speakerAudioLabel: '친절한 행인: はい、何でしょうか？ (네, 무슨 일이세요?)',
      options: [
        {
          text: 'あの、すみません！ トイレは どこですか？',
          reading: 'あの、すみません！ トイレは どこですか',
          isCorrect: true,
          explanation: '정답! "아노, 스미마센!"으로 부드럽게 말을 트고 화장실 위치를 묻는 생존 필수 완벽 문장이에요.'
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
          explanation: '‘화장실 얼마예요?’라는 엉뚱한 가격 질문이에요.'
        },
        {
          text: 'トイレ、これ ください！',
          reading: 'トイレ、これ ください',
          isCorrect: false,
          explanation: '‘화장실 이거 주세요’라는 말이 되지 않는 조합입니다.'
        }
      ],
      tip: '누군가에게 길이나 위치를 물을 때는 먼저 "스미마센(실례합니다)"을 살짝 숙이며 말하는 것이 일본어 매너의 핵심입니다.',
      relatedUnitTitle: 'Unit 3: 생존 SOS'
    },
    {
      id: 'starter-q4',
      scenario: '광안리 편의점에서 생수를 계산하는데, 직원이 봉투를 가리키며 "ふくろ、いりますか？(봉투 필요하세요?)"라고 묻습니다. 가방이 있어 손을 가볍게 내저으며 정중하게 "아, 괜찮습니다!(필요 없어요)"라고 사양하는 표현은?',
      situationTag: '의사표현과 거절',
      speakerAudioText: 'ふくろ、いりますか？',
      speakerAudioLabel: '직원: ふくろ、いりますか？ (봉투, 필요하세요?)',
      options: [
        {
          text: 'あ、だいじょうぶです！',
          reading: 'あ、だいじょうぶです',
          isCorrect: true,
          explanation: '정답! 손을 가볍게 내저으며 "아, 다이죠-부데스!"라고 하면 "필요 없습니다/괜찮습니다"라는 뜻으로 매우 정중하게 전달됩니다.'
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
          text: 'ふくろ、ください！',
          reading: 'ふくろ、ください',
          isCorrect: false,
          explanation: '‘봉투 주세요!’라는 뜻으로 사양이 아닌 봉투를 요청하는 말이에요.'
        }
      ],
      tip: '편의점에서 봉투나 영수증을 권할 때 "다이죠-부데스(괜찮아요)" 한마디면 깔끔하고 세련되게 사양할 수 있어요.',
      relatedUnitTitle: 'Unit 4: 의사표현과 거절'
    },
    {
      id: 'starter-q5',
      scenario: '국제시장 기념품 가게에서 마음에 쏙 드는 귀여운 자석을 발견했습니다. 점원에게 다가가 "저기요, 이거 얼마예요?"라고 가격을 물어보는 가장 정확한 표현은?',
      situationTag: '쇼핑과 가격',
      speakerAudioText: 'いらっしゃいませ！',
      speakerAudioLabel: '점원: いらっしゃいませ！ (어서오세요!)',
      options: [
        {
          text: 'すみません、これ いくらですか？',
          reading: 'すみません、これ いくらですか',
          isCorrect: true,
          explanation: '정답! "스미마센, 코레 이쿠라데스카?"는 쇼핑할 때 가격을 묻는 가장 기본적이고 확실한 필수 표현입니다.'
        },
        {
          text: 'これ、どこですか？',
          reading: 'これ、どこですか',
          isCorrect: false,
          explanation: '‘이거 어디예요?’라는 위치를 묻는 표현이에요.'
        },
        {
          text: 'せんえん、ください！',
          reading: 'せんえん、ください',
          isCorrect: false,
          explanation: '‘천 엔 주세요!’라는 뜻으로 손님이 점원에게 돈을 달라는 말이 됩니다.'
        },
        {
          text: 'じゃあ、さようなら！',
          reading: 'じゃあ、さようなら',
          isCorrect: false,
          explanation: '‘그럼 안녕히 가세요!’라는 작별 인사입니다.'
        }
      ],
      tip: '가격이 궁금할 땐 물건을 가리키며 "코레, 이쿠라데스카?(이거 얼마예요?)"를 외쳐보세요. 점원이 계산기나 금액(예: 센엔=1000엔)으로 친절히 알려줍니다.',
      relatedUnitTitle: 'Unit 5: 쇼핑과 가격 묻기'
    }
  ],
  beginner: [
    {
      id: 'beginner-q1',
      scenario: '영도 카페 카운터에서 직원이 주문을 받으려고 기다리고 있습니다. "저기요, 아이스 아메리카노 하나 부탁드립니다"라고 품격 있고 공손하게 주문하는 문장은?',
      situationTag: '음료 주문',
      speakerAudioText: 'ご注文は お決まりですか？',
      speakerAudioLabel: '직원: ご注文は お決まりですか？ (주문 결정하셨나요?)',
      options: [
        {
          text: 'すみません、アイスコーヒーを 一つ お願いします。',
          reading: 'すみません、アイスコーヒーを ひとつ おねがいします',
          isCorrect: true,
          explanation: '정답! 초급에서 배운 품격 있는 주문 공식: [명사] + を お願いします(〜를 부탁드립니다)와 수량 표현 一つ(ひとつ)가 완벽하게 들어맞는 문장입니다.'
        },
        {
          text: 'アイスコーヒー いち ください！',
          reading: 'アイスコーヒー いち ください',
          isCorrect: false,
          explanation: '음료를 셀 때 숫자 "1(이치)"를 그대로 쓰면 어색합니다. "하나"는 "ひとつ(히토츠)"입니다.'
        },
        {
          text: 'アイスコーヒー これ どこですか？',
          reading: 'アイスコーヒー これ どこですか',
          isCorrect: false,
          explanation: '커피 위치를 묻는 엉뚱한 표현입니다.'
        },
        {
          text: 'アイスコーヒーを ふたつ お願いします。',
          reading: 'アイスコーヒーを ふたつ おねがいします',
          isCorrect: false,
          explanation: '"ふたつ(후타츠)"는 2개입니다. 1개는 "ひとつ(히토츠)"입니다.'
        }
      ],
      tip: '초급 수준의 세련된 주문을 할 때는 단순한 "~쿠다사이"보다 "~오네가이시마스(~를 부탁드립니다)"를 쓰면 훨씬 정중한 인상을 줍니다.',
      relatedUnitTitle: 'Unit 1: 정중한 주문'
    },
    {
      id: 'beginner-q2',
      scenario: '카페에서 주문을 마치자 직원이 "店内でお召し上がりですか？(매장에서 드시고 가시나요?)"라고 묻습니다. 자리에 앉아 마시고 가기 위해 "네, 매장에서 마실게요(매장으로 부탁합니다)"라고 화답하는 표현은?',
      situationTag: '매장 이용',
      speakerAudioText: '店内でお召し上がりですか？',
      speakerAudioLabel: '직원: 店内でお召し上がりですか？ (매장에서 드시고 가시나요?)',
      options: [
        {
          text: 'はい、店内で お願いします。',
          reading: 'はい、てんないで おねがいします',
          isCorrect: true,
          explanation: '정답! "하이, 텐나이데 오네가이시마스"는 카페나 패스트푸드점에서 매장 내 취식을 요청하는 표준적이고 정중한 표현입니다.'
        },
        {
          text: 'いいえ、店内で 食べます。',
          reading: 'いいえ、てんないで たべます',
          isCorrect: false,
          explanation: '매장에서 먹을 것인데 "아니요(いいえ)"로 거절하여 모순된 문장입니다.'
        },
        {
          text: '店内に 行きますか？',
          reading: 'てんないに いきますか',
          isCorrect: false,
          explanation: '‘매장 안으로 가나요?’라는 뜻의 어색한 질문입니다.'
        },
        {
          text: '店内の これ ください！',
          reading: 'てんないの これ ください',
          isCorrect: false,
          explanation: '매장의 이것을 달라는 엉뚱한 주문입니다.'
        }
      ],
      tip: '일본 카페에서는 테이크아웃(持ち帰り: 모치카에리)과 매장 이용(店内: 텐나이)에 따라 소비세율이 다르므로 점원이 자주 확인합니다.',
      relatedUnitTitle: 'Unit 1: 정중한 주문'
    },
    {
      id: 'beginner-q3',
      scenario: '식사를 마치고 계산대에 섰습니다. 점원이 금액을 안내할 때, 신용카드 결제가 가능한지 공손하게 물어보는 가장 알맞은 표현은?',
      situationTag: '결제 수단',
      speakerAudioText: 'お会計ですね。',
      speakerAudioLabel: '점원: お会計ですね。 (계산이시군요)',
      options: [
        {
          text: 'すみません、カードは 使えますか？',
          reading: 'すみません、カードは つかえますか',
          isCorrect: true,
          explanation: '정답! [명사] + は 使えますか？(~는 쓸 수 있나요?)는 여행 중 현금 전용 매장인지 카드 결제가 가능한지 확인할 때 필수적인 핵심 표현입니다.'
        },
        {
          text: 'カード、ありますか？',
          reading: 'カード、ありますか',
          isCorrect: false,
          explanation: '‘카드 있나요?’라는 뜻으로 점원에게 카드가 있냐고 묻는 말이 돼요.'
        },
        {
          text: 'カードは いくらですか？',
          reading: 'カードは いくらですか',
          isCorrect: false,
          explanation: '‘카드는 얼마예요?’라는 카드 자체 가격을 묻는 질문입니다.'
        },
        {
          text: 'これで だめです！',
          reading: 'これで だめです',
          isCorrect: false,
          explanation: '‘이걸로는 안 됩니다!’라는 부정적인 표현입니다.'
        }
      ],
      tip: '일본에서는 현금 전용 매장이 여전히 존재하므로 결제 전 "카-도와 츠카에마스카?"를 물어보는 습관이 좋습니다.',
      relatedUnitTitle: 'Unit 2: 결제 수단 확인'
    },
    {
      id: 'beginner-q4',
      scenario: '낯선 거리를 걷다 지하철역을 찾아야 합니다. 지나가는 행인에게 다가가 "실례합니다, 역은 어느 쪽인가요?"라고 공손하게 위치를 물어보는 가장 올바른 표현은?',
      situationTag: '길 찾기',
      speakerAudioText: 'はい、何でしょうか？',
      speakerAudioLabel: '행인: はい、何でしょうか？ (네, 무슨 일이신가요?)',
      options: [
        {
          text: 'すみません、駅は どちらですか？',
          reading: 'すみません、えきは どちらですか',
          isCorrect: true,
          explanation: '정답! [장소] + は どちらですか？는 どこ(어디)보다 한층 더 정중하고 공손하게 방향과 위치를 묻는 품격 있는 표현입니다.'
        },
        {
          text: 'おい、駅は どこだ？',
          reading: 'おい、えきは どこだ',
          isCorrect: false,
          explanation: '처음 보는 사람에게 반말로 묻는 매우 무례한 말투입니다.'
        },
        {
          text: '駅を 一つ お願いします。',
          reading: 'えきを ひとつ おねがいします',
          isCorrect: false,
          explanation: '역을 하나 부탁한다는 말이 되지 않는 주문식 표현입니다.'
        },
        {
          text: '駅は 使えますか？',
          reading: 'えきは つかえますか',
          isCorrect: false,
          explanation: '역을 쓸 수 있냐는 어색한 결제/사용 질문입니다.'
        }
      ],
      tip: '길을 물을 때 "도코(어디)" 대신 "도치라(어느 쪽)"를 쓰면 듣는 상대방이 훨씬 기분 좋게 친절히 안내해 줍니다.',
      relatedUnitTitle: 'Unit 3: 지하철역과 길 찾기'
    },
    {
      id: 'beginner-q5',
      scenario: '행인에게 길을 묻자 손가락으로 앞을 가리키며 "あちらです。まっすぐ 行ってください。(저쪽입니다. 곧장 가세요)"라고 친절히 알려주셨습니다. 감사한 마음을 담아 건넬 가장 완벽한 인사는?',
      situationTag: '길 안내 화답',
      speakerAudioText: 'あちらです。まっすぐ 行ってください。',
      speakerAudioLabel: '행인: あちらです。まっすぐ 行ってください。 (저쪽입니다. 곧장 가세요.)',
      options: [
        {
          text: '分かりました、ありがとうございます！',
          reading: 'わかりました、ありがとうございます',
          isCorrect: true,
          explanation: '정답! "잘 알겠습니다, 대단히 감사합니다!"라며 안내를 이해했음을 밝히고 감사를 전하는 완벽한 화답입니다.'
        },
        {
          text: 'すみません、違います。',
          reading: 'すみません、ちがいます',
          isCorrect: false,
          explanation: '친절히 알려준 사람에게 ‘죄송하지만 틀렸습니다’라고 부정하는 무례한 말입니다.'
        },
        {
          text: 'まっすぐ どこですか？',
          reading: 'まっすぐ どこですか',
          isCorrect: false,
          explanation: '방향을 알려주었는데 ‘곧장이 어디예요?’라고 묻는 어색한 문장입니다.'
        },
        {
          text: 'これ ください！',
          reading: 'これ ください',
          isCorrect: false,
          explanation: '길을 알려준 사람에게 ‘이거 주세요’라는 엉뚱한 주문입니다.'
        }
      ],
      tip: '상대방의 길 안내를 듣고 나면 "와카리마시타, 아리가토-고자이마스!"라고 고개를 가볍게 숙이며 화답해 보세요.',
      relatedUnitTitle: 'Unit 3: 지하철역과 길 찾기'
    }
  ],
  intermediate: [
    {
      id: 'intermediate-q1',
      scenario: '부산의 명물 돼지국밥 식당에 방문했습니다. 매운 양념을 잘 못 먹어 "저기요, 돼지국밥 하나, 다대기 빼고 부탁드려도 될까요?"라고 완곡하고 정중하게 요청하는 표현은?',
      situationTag: '주문과 양념 조절',
      speakerAudioText: 'いらっしゃいませ！ご注文をどうぞ。',
      speakerAudioLabel: '점원: いらっしゃいませ！ ご注文をどうぞ。 (어서오세요! 주문 말씀하세요.)',
      options: [
        {
          text: 'すみません、テジクッパ一つ、タテギ抜きでお願いできますか？',
          reading: 'すみません、テジクッパひとつ、タテギぬきでおねがいできますか',
          isCorrect: true,
          explanation: '정답! [명사] + でお願いできますか(~로 부탁드려도 될까요?)와 제외를 뜻하는 抜き(ぬき)를 조합한 완벽하고 자연스러운 현지식 주문 표현입니다.'
        },
        {
          text: 'テジクッパ、タテギは だめ！',
          reading: 'テジクッパ、タテギは だめ',
          isCorrect: false,
          explanation: '‘다대기는 안 돼!’라는 반말 금지 표현으로 식당 직원에게 매우 무례합니다.'
        },
        {
          text: 'タテギを もっと ください！',
          reading: 'タテギを もっと ください',
          isCorrect: false,
          explanation: '다대기를 더 달라는 요청으로, 빼달라는 뜻과 반대입니다.'
        },
        {
          text: 'テジクッパは どこですか？',
          reading: 'テジクッパは どこですか',
          isCorrect: false,
          explanation: '돼지국밥이 어디 있냐는 단순 위치 질문입니다.'
        }
      ],
      tip: '특정 재료나 양념을 빼고 싶을 때는 "[재료이름] + 抜きで(누키데)"를 기억하세요. (예: 와사비 빼고=わさび抜きで, 다대기 빼고=タテギ抜きで)',
      relatedUnitTitle: 'Unit 1: 식당에서 자연스럽게 주문하기'
    },
    {
      id: 'intermediate-q2',
      scenario: '다대기를 빼달라고 하자 직원이 메모하며 "はい、かしこまりました。タテギは別添えにいたしますね。(네, 알겠습니다. 다대기는 따로 담아 드릴게요)"라고 친절히 배려해 주었습니다. "감사합니다(덕분에 살았어요)! 고맙습니다!"라고 기분 좋게 화답하는 표현은?',
      situationTag: '배려에 대한 감사',
      speakerAudioText: 'はい、かしこまりました。タテギは別添えにいたしますね。',
      speakerAudioLabel: '점원: はい、かしこまりました。タテギは別添えにいたしますね。',
      options: [
        {
          text: '助かります。ありがとうございます！',
          reading: 'たすかります。ありがとうございます',
          isCorrect: true,
          explanation: '정답! 상대방이 나를 위해 편의를 봐주거나 배려해 주었을 때 "助かります(도움이 됩니다/살았습니다)"를 덧붙이면 원어민다운 깊은 감사의 뉘앙스가 전달됩니다.'
        },
        {
          text: 'かしこまりました！',
          reading: 'かしこまりました',
          isCorrect: false,
          explanation: '‘잘 알겠습니다’는 주문을 받는 점원의 수락 표현입니다. 손님이 점원에게 쓰는 표현이 아닙니다.'
        },
        {
          text: '別添えは 嫌です。',
          reading: 'べつぞえは いやです',
          isCorrect: false,
          explanation: '따로 담아주는 게 싫다는 불평입니다.'
        },
        {
          text: 'お会計、お願いします。',
          reading: 'おかいけい、おねがいします',
          isCorrect: false,
          explanation: '음식을 받기도 전에 계산하겠다는 어색한 말입니다.'
        }
      ],
      tip: '상대방이 배려나 도움을 주었을 때 "타스카리마스(助かります)"를 쓰면 단순한 "아리가토-"보다 훨씬 성숙하고 따뜻한 유대감이 형성됩니다.',
      relatedUnitTitle: 'Unit 1: 식당에서 자연스럽게 주문하기'
    },
    {
      id: 'intermediate-q3',
      scenario: '친구와 함께 식사를 기분 좋게 마쳤습니다. 계산대에서 직원에게 "잘 먹었습니다. 계산 각자 따로 부탁드려도 될까요?"라고 정중하게 분할 결제를 문의하는 표현은?',
      situationTag: '분할 결제 문의',
      speakerAudioText: 'ありがとうございました！お会計ですか？',
      speakerAudioLabel: '점원: ありがとうございました！ お会計ですか？ (감사합니다! 계산이신가요?)',
      options: [
        {
          text: 'ごちそうさまでした。お会計、別々でお願いできますか？',
          reading: 'ごちそうさまでした。おかいけい、べつべつでおねがいできますか',
          isCorrect: true,
          explanation: '정답! 식사 감사 인사(ごちそうさまでした)와 함께 "각자 따로"를 뜻하는 別々で(베츠베츠데)를 활용한 완벽한 매너 질문입니다.'
        },
        {
          text: 'お金、半分ずつ 払え！',
          reading: 'おかね、はんぶんずつ はらえ',
          isCorrect: false,
          explanation: '‘돈 반씩 내라!’라는 무례한 명령조입니다.'
        },
        {
          text: 'お会計は いくらですか？',
          reading: 'おかいけいは いくらですか',
          isCorrect: false,
          explanation: '단순히 총금액을 묻는 질문이며, 따로 결제할 수 있는지 묻는 표현이 아닙니다.'
        },
        {
          text: 'カードは どこですか？',
          reading: 'カードは どこですか',
          isCorrect: false,
          explanation: '카드가 어디 있냐는 엉뚱한 질문입니다.'
        }
      ],
      tip: '각자 계산(더치페이)을 요청할 때는 "베츠베츠데 오네가이데키마스카?(각자 따로 부탁드려도 될까요?)"라고 공손히 확인해 보세요.',
      relatedUnitTitle: 'Unit 2: 식사 계산과 분할 결제 요청하기'
    },
    {
      id: 'intermediate-q4',
      scenario: '점심시간 붐비는 식당에서 따로 계산을 문의하자, 직원이 양해를 구하며 "申し訳ありません、混雑時はまとめてのお支払いをお願いしております。(죄송합니다, 혼잡 시에는 일괄 결제를 부탁드리고 있습니다)"라고 안내합니다. 쿨하고 매너 있게 "아, 알겠습니다. 그럼 카드로 한꺼번에 결제할게요"라고 응대하는 문장은?',
      situationTag: '가게 규칙 수용',
      speakerAudioText: '申し訳ありません、混雑時はまとめてのお支払いをお願いしております。',
      speakerAudioLabel: '점원: 申し訳ありません、混雑時はまとめてのお支払いをお願いしております。',
      options: [
        {
          text: 'あ、分かりました。じゃあカードでまとめて払いますね。',
          reading: 'あ、わかりました。じゃあカードでまとめてはらいますね',
          isCorrect: true,
          explanation: '정답! 점원의 안내를 유연하게 이해하고 "한꺼번에"를 뜻하는 まとめて(마토메테)를 사용하여 대표로 결제하겠다는 센스 있는 답변입니다.'
        },
        {
          text: '絶対に 嫌です！',
          reading: 'ぜったいに いやです',
          isCorrect: false,
          explanation: '‘절대 싫습니다!’라는 거친 항의 표현입니다.'
        },
        {
          text: '混雑時は どこですか？',
          reading: 'こんざつじは どこですか',
          isCorrect: false,
          explanation: '혼잡 시간이 어디냐는 엉뚱한 질문입니다.'
        },
        {
          text: '現金、これ ください！',
          reading: 'げんきん、これ ください',
          isCorrect: false,
          explanation: '현금 이거 달라는 말이 되지 않는 요구입니다.'
        }
      ],
      tip: '일본의 인기 식당에서는 피크 타임에 "마토메테(한꺼번에 일괄)" 결제를 요청하는 경우가 많으니 "와카리마시타, 마토메테 하라이마스"로 유연하게 대처해 보세요.',
      relatedUnitTitle: 'Unit 2: 식사 계산과 분할 결제 요청하기'
    },
    {
      id: 'intermediate-q5',
      scenario: '식당이나 카페에서 소스나 반찬을 요리 위에 얹지 말고 "따로 곁들여서(따로 담아서)" 달라고 부탁할 때 사용하는 가장 정확한 단어는?',
      situationTag: '핵심 어휘',
      options: [
        {
          text: '別添え (べつぞえ)',
          reading: 'べつぞえ',
          isCorrect: true,
          explanation: '정답! "別添え(베츠조에)"는 소스, 드레싱, 다대기 등을 메인 요리에 섞지 않고 별도의 종지에 따로 담아내는 것을 뜻하는 실전 고급 단어입니다.'
        },
        {
          text: '混雑時 (こんざつじ)',
          reading: 'こんざつじ',
          isCorrect: false,
          explanation: '‘혼잡할 때, 붐비는 시간’을 뜻하는 단어입니다.'
        },
        {
          text: '抜き (ぬき)',
          reading: 'ぬき',
          isCorrect: false,
          explanation: '‘제외함, 뺌’을 뜻하며, 아예 넣지 말아 달라는 뜻입니다.'
        },
        {
          text: '会計 (かいけい)',
          reading: 'かいけい',
          isCorrect: false,
          explanation: '‘계산, 지불’을 뜻합니다.'
        }
      ],
      tip: '소스를 찍먹으로 즐기거나 매운 양념을 직접 조절하고 싶을 때는 "[소스이름]은 別添え(베츠조에)로 부탁드립니다"라고 해보세요.',
      relatedUnitTitle: 'Unit 1: 식당에서 자연스럽게 주문하기'
    }
  ],
  advanced: [
    {
      id: 'advanced-q1',
      scenario: '유명 맛집에서 식사 중 친구가 "スープの味はどう？脂っこくない？(국물 맛 어때? 기름지지 않아?)"라고 묻습니다. "전혀! 담백하고 깔끔한데, 돼지 뼈의 깊은 맛이 제대로 살아있어"라고 원어민처럼 풍부하게 미각을 묘사하는 답변은?',
      situationTag: '미각과 식감 묘사',
      speakerAudioText: 'スープの味はどう？脂っこくない？',
      speakerAudioLabel: '친구: スープの味はどう？脂っこくない？ (국물 맛 어때? 기름지지 않아?)',
      options: [
        {
          text: '全然！さっぱりしているのに、豚骨のコクがしっかりあるよ。',
          reading: 'ぜんぜん！さっぱりしているのに、とんこつのこくがしっかりあるよ',
          isCorrect: true,
          explanation: '정답! "さっぱり(깔끔함)"와 "コク(깊은 맛/풍미)"을 접속조사 "〜のに(〜인데도)"로 연결하여 상반된 복합 풍미를 섬세하게 묘사한 고급 일본어입니다.'
        },
        {
          text: 'まあまあ、脂っこいよ。',
          reading: 'まあまあ、あぶらっこいよ',
          isCorrect: false,
          explanation: '‘그저 그렇고, 느끼해’라는 부정적인 평가입니다.'
        },
        {
          text: 'スープは いくらですか？',
          reading: 'スープは いくらですか',
          isCorrect: false,
          explanation: '국물이 얼마냐는 엉뚱한 가격 질문입니다.'
        },
        {
          text: '美味しくないから 嫌だ。',
          reading: 'おいしくないから いやだ',
          isCorrect: false,
          explanation: '맛없어서 싫다는 극단적인 불평입니다.'
        }
      ],
      tip: '상반된 두 가지 맛이 절묘하게 조화를 이룰 때는 "~しているのに、〜がある(깔끔한데도 깊은 맛이 있다)" 구문을 활용해 보세요.',
      relatedUnitTitle: 'Unit 1: 맛과 식감의 미묘한 차이 묘사하기'
    },
    {
      id: 'advanced-q2',
      scenario: '일본 요리 방송이나 미식가들이 깊고 진하게 우러난 감칠맛과 풍미를 칭찬할 때 빠짐없이 사용하는 단어로, "さっぱり(개운함)"와 대조되는 핵심 명사는?',
      situationTag: '미식 핵심 어휘',
      options: [
        {
          text: 'コク (こく)',
          reading: 'こく',
          isCorrect: true,
          explanation: '정답! "コク(코쿠)"는 육수나 소스의 농후한 깊은 맛, 감칠맛, 풍미를 뜻하는 일본 미식 문화의 대표적 키워드입니다.'
        },
        {
          text: '脂っこい (あぶらっこい)',
          reading: 'あぶらっこい',
          isCorrect: false,
          explanation: '‘기름지다, 느끼하다’라는 뜻의 형용사입니다.'
        },
        {
          text: '箸 (はし)',
          reading: 'はし',
          isCorrect: false,
          explanation: '‘젓가락’을 뜻합니다.'
        },
        {
          text: 'スープ',
          reading: 'スープ',
          isCorrect: false,
          explanation: '‘국물, 수프’를 뜻합니다.'
        }
      ],
      tip: '라멘이나 찌개, 카레의 국물이 깊고 진할 때 "코쿠가 아루!(コクがある: 깊은 감칠맛이 있어!)"라고 감탄해 보세요.',
      relatedUnitTitle: 'Unit 1: 맛과 식감의 미묘한 차이 묘사하기'
    },
    {
      id: 'advanced-q3',
      scenario: '유명 맛집에서 함께 식사하던 친구가 "우와, 진짜 맛있다! 어때?"라며 감탄합니다. 이에 맞장구치며 "소문대로네! 젓가락을 멈출 수가 없어(너무 맛있어서 계속 손이 가네)"라고 자연스럽게 감탄사를 건네는 문장은?',
      situationTag: '식사 감탄 표현',
      speakerAudioText: 'うわ、本当においしいね！どう？',
      speakerAudioLabel: '친구: うわ、本当においしいね！ どう？ (우와, 진짜 맛있다! 어때?)',
      options: [
        {
          text: '評判通りだね。箸が止まらないよ。',
          reading: 'ひょうばんどおりだね。はしがとまらないよ',
          isCorrect: true,
          explanation: '정답! "評判通り(소문대로, 명성 그대로)"와 관용구 "箸が止まらない(젓가락이 멈추지 않는다)"를 능숙하게 결합한 실전 감탄 표현입니다.'
        },
        {
          text: '評判は どこですか？',
          reading: 'ひょうばんは どこですか',
          isCorrect: false,
          explanation: '평판이 어디 있냐는 어색한 문장입니다.'
        },
        {
          text: '箸を 捨てて ください。',
          reading: 'はしを すてて ください',
          isCorrect: false,
          explanation: '젓가락을 버려달라는 엉뚱한 요청입니다.'
        },
        {
          text: '早く 会計して！',
          reading: 'はやく かいけいして',
          isCorrect: false,
          explanation: '빨리 계산하라는 엉뚱한 요구입니다.'
        }
      ],
      tip: '맛있는 음식을 먹을 때 "효-반도-리다네, 하시가 토마라나이요!(소문대로네, 젓가락이 안 멈춰!)"는 최고의 찬사입니다.',
      relatedUnitTitle: 'Unit 1: 맛과 식감의 미묘한 차이 묘사하기'
    },
    {
      id: 'advanced-q4',
      scenario: '인기 맛집에서 점원이 양해를 구하며 "恐れ入りますが、混雑時はまとめてのお支払いをお願いしております。(송구스럽습니다만, 혼잡 시에는 일괄 결제를 부탁드리고 있습니다)"라고 안내했습니다. 점원이 요청한 내용의 정확한 뜻은?',
      situationTag: '접객 안내 이해',
      speakerAudioText: '恐れ入りますが、混雑時はまとめてのお支払いをお願いしております。',
      speakerAudioLabel: '점원: 恐れ入りますが、混雑時はまとめてのお支払いをお願いしております。',
      options: [
        {
          text: '붐비는 시간에는 각자 따로 계산하지 말고 일괄(한꺼번에) 결제를 부탁한다는 뜻',
          isCorrect: true,
          explanation: '정답! 混雑時(붐비는 시간)와 まとめてのお支払い(한꺼번에 일괄 결제)라는 비즈니스 접객 안내 표현을 정확히 파악해야 합니다.'
        },
        {
          text: '가게가 붐비니 지금 당장 퇴장해 달라는 뜻',
          isCorrect: false,
          explanation: '퇴장 요구가 아닌 결제 방식에 대한 안내입니다.'
        },
        {
          text: '현금 결제만 가능하고 카드는 절대 쓸 수 없다는 뜻',
          isCorrect: false,
          explanation: '결제 수단이 아닌 개별/일괄 방식에 대한 안내입니다.'
        },
        {
          text: '추가 주문을 더 이상 받지 않겠다는 뜻',
          isCorrect: false,
          explanation: '주문 마감이 아닌 계산 일괄 결제 요청입니다.'
        }
      ],
      tip: '피크 타임 일본 식당에서는 "마토메테노 오시하라이(일괄 결제)" 요청이 자주 있으므로 당황하지 않고 대표 한 명이 계산하면 됩니다.',
      relatedUnitTitle: 'Unit 2: 혼잡 시 일괄 결제 및 가게 에티켓 대처하기'
    },
    {
      id: 'advanced-q5',
      scenario: '점원의 일괄 결제 안내를 듣고, 일행을 대표하여 "아, 잘 알겠습니다. 그럼 제가 대표로 결제할게요"라고 품격 있게 화답하는 가장 모범적인 일본어 문장은?',
      situationTag: '가게 에티켓 응대',
      speakerAudioText: '恐れ入りますが、まとめてのお支払いをお願いできますか？',
      speakerAudioLabel: '점원: 恐れ入りますが、まとめてのお支払いをお願いできますか？ (송구스럽지만, 일괄 결제를 부탁드려도 될까요?)',
      options: [
        {
          text: 'あ、承知しました。じゃあ私が代表で支払います。',
          reading: 'あ、しょうちしました。じゃあわたしがだいひょうでしはらいます',
          isCorrect: true,
          explanation: '정답! 상대방의 정중한 요청에 "承知しました(잘 알겠습니다/수락합니다)"로 공손히 받고, "私が代表で支払います(제가 대표로 결제할게요)"로 깔끔하게 정리하는 품격 있는 화답입니다.'
        },
        {
          text: '断固として 別々で 払う！',
          reading: 'だんことして べつべつで はらう',
          isCorrect: false,
          explanation: '‘단호하게 따로따로 내겠다!’라는 비매너적인 억지입니다.'
        },
        {
          text: 'お金は ありません。',
          reading: 'おかねは ありません',
          isCorrect: false,
          explanation: '돈이 없다는 무책임한 말입니다.'
        },
        {
          text: '代表は 誰ですか？',
          reading: 'だいひょうは だれですか',
          isCorrect: false,
          explanation: '대표가 누구냐고 되묻는 어색한 질문입니다.'
        }
      ],
      tip: '요청이나 안내를 수용할 때 "쇼-치시마시타(承知しました: 잘 알겠습니다)"를 쓰면 매우 신뢰감 있고 정중한 인상을 줍니다.',
      relatedUnitTitle: 'Unit 2: 혼잡 시 일괄 결제 및 가게 에티켓 대처하기'
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
