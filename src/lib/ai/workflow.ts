import { StateGraph, Annotation, END, START } from '@langchain/langgraph';
import { getGeminiModel } from './gemini';
import { DailyLesson } from '@/types';
import { z } from 'zod';

// Zod 스키마 정의
export const dailyLessonSchema = z.object({
  id: z.string(),
  dayNumber: z.number().default(1),
  seriesTitle: z.string(),
  themeTitle: z.string(),
  keyExpression: z.object({
    japanese: z.string(),
    reading: z.string(),
    korean: z.string(),
  }),
  dialogue: z.array(
    z.object({
      speaker: z.string(),
      japanese: z.string(),
      korean: z.string(),
    })
  ),
  grammar: z.object({
    title: z.string(),
    structure: z.string(),
    explanation: z.string(),
    comparison: z.string().optional(),
  }),
  vocabulary: z.array(
    z.object({
      id: z.string(),
      kanji: z.string(),
      reading: z.string(),
      meaning: z.string(),
      partOfSpeech: z.string(),
    })
  ),
  nuanceTip: z.string(),
});

// LangGraph 상태 정의
export const LessonState = Annotation.Root({
  topic: Annotation<string>(),
  draftJson: Annotation<string>(),
  finalLesson: Annotation<DailyLesson | null>(),
});

// 노드 1: 초안 생성 노드
async function generateNode(state: typeof LessonState.State) {
  const model = getGeminiModel();
  if (!model) {
    throw new Error('GEMINI_API_KEY가 설정되지 않았습니다.');
  }

  const prompt = `당신은 실전 일본어 전문 교육 튜터입니다.
학습자가 요청한 상황/주제에 맞는 고품질의 일본어 데일리 학습 콘텐츠를 작성하세요.

주제/상황: "${state.topic}"

[요구사항]
1. 일본 현지에서 실제로 자주 쓰는 자연스러운 구어체 표현이어야 합니다.
2. keyExpression: 핵심 표현(한자 표기), reading(히라가나 발음), korean(자연스러운 한국어 뜻).
3. dialogue: 2~3턴의 실전 대화문 (A, B의 대화).
4. grammar: 사용된 주요 문법 포인트의 구조와 친절한 한국어 해설.
5. vocabulary: 대화와 표현에 쓰인 핵심 단어 3~4개 (kanji, reading, meaning, partOfSpeech).
6. nuanceTip: 한국인이 오해하기 쉬운 직역 투와 실제 원어민 뉘앙스 비교 팁.
7. 이모지는 일체 사용하지 마세요.
8. 반드시 아래 JSON 형식으로만 응답하세요. 다른 설명이나 마크다운 백틱은 붙이지 마세요.

{
  "id": "lesson-${Date.now()}",
  "dayNumber": 1,
  "seriesTitle": "맞춤 실전 일본어",
  "themeTitle": "${state.topic}",
  "keyExpression": { "japanese": "...", "reading": "...", "korean": "..." },
  "dialogue": [
    { "speaker": "A", "japanese": "...", "korean": "..." },
    { "speaker": "B", "japanese": "...", "korean": "..." }
  ],
  "grammar": { "title": "...", "structure": "...", "explanation": "...", "comparison": "..." },
  "vocabulary": [
    { "id": "v1", "kanji": "...", "reading": "...", "meaning": "...", "partOfSpeech": "..." }
  ],
  "nuanceTip": "..."
}`;

  const response = await model.invoke(prompt);
  const content = typeof response.content === 'string' ? response.content : JSON.stringify(response.content);
  return { draftJson: content };
}

// 노드 2: 원어민 뉘앙스 검수 및 스키마 검증 노드
async function reviewAndRefineNode(state: typeof LessonState.State) {
  const model = getGeminiModel();
  if (!model) {
    throw new Error('GEMINI_API_KEY가 설정되지 않았습니다.');
  }

  const reviewPrompt = `다음 일본어 학습 콘텐츠 초안을 원어민 감수자 입장에서 검수하여,
어색한 직역이나 부자연스러운 일본어 문장이 있다면 가장 자연스러운 현지 표현으로 다듬은 최종 JSON을 출력하세요.
이모지는 사용하지 마세요. 오직 순수 JSON 데이터만 반환하세요.

[초안]
${state.draftJson}`;

  const response = await model.invoke(reviewPrompt);
  let cleaned = typeof response.content === 'string' ? response.content.trim() : JSON.stringify(response.content);

  // 마크다운 코드블록 제거
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.replace(/^```json/, '').replace(/```$/, '').trim();
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```/, '').replace(/```$/, '').trim();
  }

  try {
    const parsed = JSON.parse(cleaned);
    const validated = dailyLessonSchema.parse(parsed) as DailyLesson;
    const finalWithUniqueIds: DailyLesson = {
      ...validated,
      vocabulary: validated.vocabulary.map((v, idx) => ({
        ...v,
        id: `${validated.id}_v${idx + 1}`
      }))
    };
    return { finalLesson: finalWithUniqueIds };
  } catch {
    // JSON 파싱 실패 시 초안에서 재시도
    const rawCleaned = state.draftJson
      .replace(/^```json/, '')
      .replace(/^```/, '')
      .replace(/```$/, '')
      .trim();
    const fallbackParsed = JSON.parse(rawCleaned);
    const fallbackValidated = dailyLessonSchema.parse(fallbackParsed) as DailyLesson;
    const fallbackWithUniqueIds: DailyLesson = {
      ...fallbackValidated,
      vocabulary: fallbackValidated.vocabulary.map((v, idx) => ({
        ...v,
        id: `${fallbackValidated.id}_v${idx + 1}`
      }))
    };
    return { finalLesson: fallbackWithUniqueIds };
  }
}

// StateGraph 워크플로우 구성
const workflow = new StateGraph(LessonState)
  .addNode('generate', generateNode)
  .addNode('review', reviewAndRefineNode)
  .addEdge(START, 'generate')
  .addEdge('generate', 'review')
  .addEdge('review', END);

export const lessonGraph = workflow.compile();
