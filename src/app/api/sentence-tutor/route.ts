import { NextRequest, NextResponse } from 'next/server';
import { getGeminiModel } from '@/lib/ai/gemini';
import { SystemMessage, HumanMessage, AIMessage } from '@langchain/core/messages';

interface SentenceTutorRequest {
  sentence: {
    japanese: string;
    korean: string;
    speaker: string;
    pronunciation?: string;
  };
  context?: {
    level?: string;
    themeTitle?: string;
    unitTitle?: string;
  };
  question: string;
  history?: {
    role: 'user' | 'assistant';
    content: string;
  }[];
}

export async function POST(req: NextRequest) {
  try {
    const body: SentenceTutorRequest = await req.json();
    const { sentence, context, question, history = [] } = body;

    if (!sentence || !question?.trim()) {
      return NextResponse.json(
        { error: '문장 정보와 질문 내용을 모두 제공해주세요.' },
        { status: 400 }
      );
    }

    // Gemini 모델 인스턴스 획득
    const model = getGeminiModel();

    // API 키 미설정 시 초보자 친화적 Fallback 과외 응답
    if (!model) {
      let fallbackAnswer = `선생님이에요 🌸 현재 AI 체험 모드로 동작 중입니다.\n\n「${sentence.japanese}」(${sentence.korean})는 ${sentence.speaker}가 사용하는 중요한 표현이에요.`;
      if (question.includes('쪼개') || question.includes('부품') || question.includes('단어')) {
        fallbackAnswer = `💡 [단어 부품 분해]\n「${sentence.japanese}」는 주요 어휘와 조사, 그리고 공손한 어미가 결합된 형태입니다. 문맥상 ${sentence.speaker}의 감정과 역할이 잘 드러나는 문장이에요!`;
      } else if (question.includes('뉘앙스') || question.includes('팁')) {
        fallbackAnswer = `🗣️ [실전 뉘앙스 팁]\n이 표현은 일본 현지에서 ${sentence.speaker}가 자연스럽게 건네는 말투입니다. 말끝을 부드럽게 내리거나 올리는 억양에 주의해 보세요!`;
      }

      return NextResponse.json({
        answer: fallbackAnswer,
        isFallback: true,
      });
    }

    // 전문 일본어 교육학적 시스템 프롬프트 구성
    const systemPrompt = `당신은 일본어 학습 서비스 '부산다요리'의 다정하고 친절한 1:1 전담 과외 선생님 '다요리 센세(お便り先生)'입니다.
현재 학습자가 공부하고 있는 특정 대화 문장에 대해 질문을 던졌습니다.

[학습자 문맥 정보]
- 학습 레벨: ${context?.level || '초급/입문'}
- 단원 주제: ${context?.themeTitle || '일상 회화'}
- 화자: ${sentence.speaker}
- 대상 일본어 문장: ${sentence.japanese}
- 한국어 번역: ${sentence.korean}
${sentence.pronunciation ? `- 한글 독음/발음: [${sentence.pronunciation}]` : ''}

[선생님의 답변 지도 원칙]
1. 학습자의 학습 레벨(${context?.level || '입문'})을 배려하여, 어려운 학술 문법 용어(연용형, 사역수동 등)를 피하고 초보자 눈높이에서 쉽고 직관적으로 설명하세요.
2. 단어나 문장을 쪼개서 질문받은 경우, [어근 (뜻)] + [조사/어미 (문법 기능)] 형태의 블록 부품화 방식으로 시각적으로 분해해 보여주세요. (예: [助かり (살았음/도움)] + [ました (공손 과거)])
3. 한자가 들어간 일본어 어휘를 인용할 때는 반드시 괄호 안에 히라가나 읽기나 한글 발음을 함께 적어주세요.
4. 화자(${sentence.speaker})의 역할(내가 직접 말해야 하는 산출 표현인지, 점원/상대방의 말을 듣고 이해해야 하는 수용 표현인지)을 명확히 짚어주세요.
5. 모바일 화면에서 한눈에 쏙 들어오도록 불필요한 서론을 빼고 핵심을 3~5문장 내외로 명쾌하게 정리한 뒤, 다정한 격려 이모지와 함께 마무리하세요.`;

    // LangChain 메시지 체인 생성
    const messages = [
      new SystemMessage(systemPrompt),
      ...history.slice(-4).map((msg) =>
        msg.role === 'user' ? new HumanMessage(msg.content) : new AIMessage(msg.content)
      ),
      new HumanMessage(question.trim()),
    ];

    const response = await model.invoke(messages);
    const answer = typeof response.content === 'string' ? response.content : JSON.stringify(response.content);

    return NextResponse.json({
      answer,
      isFallback: false,
    });
  } catch (error: unknown) {
    console.error('[Sentence Tutor API Error]:', error);
    return NextResponse.json(
      {
        answer: '죄송해요, 선생님이 잠시 생각을 정리하는 중 문제가 발생했어요 💦 잠시 후 다시 질문해 주세요!',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
