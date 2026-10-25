import { StateGraph, Annotation, END, START } from '@langchain/langgraph';
import { getGeminiModel } from './gemini';
import { generateParagraphPronunciations } from './pronunciation';
import { kanjiToKana } from '@/utils/japanesePronounce';
import { DailyLesson } from '@/types';
import { z } from 'zod';

// Zod 스키마 정의
export const dailyLessonSchema = z.object({
  id: z.string(),
  dayNumber: z.number().default(1),
  seriesTitle: z.string(),
  themeTitle: z.string(),
  pronunciationKorean: z.string().optional(),
  keyExpression: z.object({
    japanese: z.string(),
    reading: z.string(),
    korean: z.string(),
  }),
  dialogue: z.array(
    z.object({
      speaker: z.string(),
      japanese: z.string(),
      pronunciation: z.string().optional(),
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
2. keyExpression:
   - japanese: 핵심 표현 (자연스러운 한자/가나 표기)
   - reading: 반드시 순수 히라가나로만 작성하세요. (알파벳 로마자 Romaji 절대 금지!)
   - korean: 자연스러운 한국어 뜻
3. pronunciationKorean: keyExpression 문장의 100% 한글 발음(독음).
   - 절대 한자나 알파벳, 가나를 섞지 말고 순수한 한국어 한글 발음으로만 작성하세요.
   - 예: "こちらの画面の仕様について、少し確認させていただきたいのですが。" -> "코치라노 가멘노 시요-니 츠이테, 스코시 카쿠닌사세테 이타다키타이노 데스가."
4. dialogue: 2~3턴의 실전 대화문 (A, B의 대화).
   - speaker: "A" 또는 "B"
   - japanese: 일본어 대화 문장 (한자/가나 표기)
   - pronunciation: 문장 전체의 "100% 한글 발음(독음)".
     * 매우 중요: 절대로 한자(漢字)나 알파벳, 가나를 그대로 남기거나 섞어 쓰지 마세요! (예: "[田中산, 오疲れ様데스]"와 같이 한자가 섞이면 절대 안 됩니다!)
     * 문장 내 모든 한자는 일본어 발음에 맞게 한글로 완전히 변환해야 합니다.
     * 예: "田中さん、お疲れ様です。" -> "다나카상, 오츠카레사마데스."
     * 예: "ワイヤーフレームの件で、こちらの画面の仕様について少し確認させていただきたいのですが。" -> "와이야-후레-무노 켄데, 코치라노 가멘노 시요-니 츠이테 스코시 카쿠닌사세테 이타다키타이노 데스가."
   - korean: 자연스러운 한국어 번역
5. grammar: 사용된 주요 문법 포인트의 구조와 친절한 한국어 해설.
6. vocabulary: 대화와 표현에 쓰인 핵심 단어 3~4개 (kanji, reading, meaning, partOfSpeech).
   - reading은 반드시 순수 히라가나로만 작성하세요 (알파벳 로마자 절대 금지).
7. nuanceTip: 한국인이 오해하기 쉬운 직역 투와 실제 원어민 뉘앙스 비교 팁.
8. 이모지는 일체 사용하지 마세요.
9. 반드시 아래 JSON 형식으로만 응답하세요. 다른 설명이나 마크다운 백틱은 붙이지 마세요.

{
  "id": "lesson-${Date.now()}",
  "dayNumber": 1,
  "seriesTitle": "맞춤 실전 일본어",
  "themeTitle": "${state.topic}",
  "keyExpression": {
    "japanese": "こちらの画面の仕様について、少し確認させていただきたいのですが。",
    "reading": "こちらの がめんの しように ついて、すこし かくにん させて いただきたいの ですが。",
    "korean": "이쪽 화면 사양에 대해 조금 확인하고 싶은데요."
  },
  "pronunciationKorean": "코치라노 가멘노 시요-니 츠이테, 스코시 카쿠닌사세테 이타다키타이노 데스가.",
  "dialogue": [
    {
      "speaker": "A",
      "japanese": "田中さん、お疲れ様です。こちらの仕様について確認したいです。",
      "pronunciation": "다나카상, 오츠카레사마데스. 코치라노 시요-니 츠이테 카쿠닌시타이데스.",
      "korean": "다나카 씨, 수고하십니다. 이쪽 사양에 대해 확인하고 싶습니다."
    },
    {
      "speaker": "B",
      "japanese": "はい、どの部分でしょうか？",
      "pronunciation": "하이, 도노 부분데쇼-카?",
      "korean": "네, 어느 부분인가요?"
    }
  ],
  "grammar": { "title": "...", "structure": "...", "explanation": "...", "comparison": "..." },
  "vocabulary": [
    { "id": "v1", "kanji": "仕様", "reading": "しよう", "meaning": "사양, 스펙", "partOfSpeech": "명사" }
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
1. 어색한 직역이나 부자연스러운 일본어 문장이 있다면 가장 자연스러운 현지 표현으로 다듬으세요.
2. 한국어 발음(pronunciationKorean 및 dialogue의 각 pronunciation)에 한자(漢字)나 영문 로마자(Romaji)가 섞여 있는지 엄격히 검수하세요.
   - 만약 한자나 알파벳이 섞여 있다면 반드시 100% 완전한 순수 한글 발음으로 변환하여 수정하세요.
   - reading 필드는 반드시 순수 히라가나여야 합니다 (알파벳 로마자 절대 금지).
3. 이모지는 사용하지 마세요. 오직 순수 JSON 데이터만 반환하세요.

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

// 노드 3: 발음 보정 및 결측치 강화 노드 (한자 혼입/로마자 방지)
async function enrichPronunciationsNode(state: typeof LessonState.State) {
  const lesson = state.finalLesson;
  if (!lesson) return { finalLesson: null };

  const hasKanji = (str?: string) => Boolean(str && /[\u4E00-\u9FAF\u3005]/.test(str));
  const hasAlphabet = (str?: string) => Boolean(str && /[a-zA-Z]/.test(str));

  // 1. keyExpression.reading에 로마자가 들어간 경우 히라가나로 보정
  if (hasAlphabet(lesson.keyExpression.reading)) {
    const fallbackReading = kanjiToKana(lesson.keyExpression.japanese);
    if (!hasAlphabet(fallbackReading)) {
      lesson.keyExpression.reading = fallbackReading;
    }
  }

  // 2. 발음이 누락되었거나 한자/로마자가 섞인 항목 탐지
  const needsKeyPronounce =
    !lesson.pronunciationKorean ||
    hasKanji(lesson.pronunciationKorean) ||
    hasAlphabet(lesson.pronunciationKorean);

  const dialogueIndicesToEnrich: number[] = [];
  lesson.dialogue.forEach((line, idx) => {
    if (!line.pronunciation || hasKanji(line.pronunciation) || hasAlphabet(line.pronunciation)) {
      dialogueIndicesToEnrich.push(idx);
    }
  });

  // 3. 누락되거나 비정상적인 발음이 있는 경우 Gemini 발음 생성기로 일괄 생성
  if (needsKeyPronounce || dialogueIndicesToEnrich.length > 0) {
    const textsToGenerate: string[] = [];
    if (needsKeyPronounce) {
      textsToGenerate.push(lesson.keyExpression.japanese);
    }
    dialogueIndicesToEnrich.forEach((idx) => {
      textsToGenerate.push(lesson.dialogue[idx].japanese);
    });

    try {
      const generated = await generateParagraphPronunciations(textsToGenerate);
      let gIdx = 0;
      if (needsKeyPronounce && generated[gIdx]) {
        lesson.pronunciationKorean = generated[gIdx];
        gIdx++;
      }
      dialogueIndicesToEnrich.forEach((dIdx) => {
        if (generated[gIdx]) {
          lesson.dialogue[dIdx].pronunciation = generated[gIdx];
          gIdx++;
        }
      });
    } catch (err) {
      console.warn('[workflow] 발음 자동 보정 실패 (fallback 유지):', err);
    }
  }

  return { finalLesson: lesson };
}

// StateGraph 워크플로우 구성
const workflow = new StateGraph(LessonState)
  .addNode('generate', generateNode)
  .addNode('review', reviewAndRefineNode)
  .addNode('enrichPronunciations', enrichPronunciationsNode)
  .addEdge(START, 'generate')
  .addEdge('generate', 'review')
  .addEdge('review', 'enrichPronunciations')
  .addEdge('enrichPronunciations', END);

export const lessonGraph = workflow.compile();
