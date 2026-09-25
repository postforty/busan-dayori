import { getGeminiModel } from './gemini';
import { getPronunciation } from '@/utils/japanesePronounce';

/**
 * Gemini AI 모델을 활용하여 일본어 단락들의 문맥 기반 한국어 발음(독음)을 생성합니다.
 * AI 모델 호출 실패 또는 API 키 부재 시 기존 규칙 기반 getPronunciation으로 안전하게 Fallback합니다.
 *
 * @param paragraphs 일본어 단락 텍스트 배열
 * @returns 단락별 한국어 독음 배열
 */
export async function generateParagraphPronunciations(
  paragraphs: string[]
): Promise<string[]> {
  if (!paragraphs || paragraphs.length === 0) {
    return [];
  }

  // 1. Fallback 함수: 규칙 기반 발음 생성
  const fallbackPronunciations = () =>
    paragraphs.map((p) => (p.trim() ? getPronunciation(p.trim()) : ''));

  // 2. Gemini 모델 인스턴스 획득 (API 키가 없으면 null 반환됨)
  const model = getGeminiModel();
  if (!model) {
    console.warn('[Pronunciation] GEMINI_API_KEY 미설정으로 규칙 기반 독음을 사용합니다.');
    return fallbackPronunciations();
  }

  // 모든 단락이 비어있는 경우 즉시 반환
  const hasText = paragraphs.some((p) => p.trim().length > 0);
  if (!hasText) {
    return paragraphs.map(() => '');
  }

  try {
    const prompt = `당신은 일본어-한국어 전문 언어학자 및 통번역가입니다.
주어진 일본어 단락들의 문맥을 정확히 파악하여, 한국인이 읽을 수 있는 가장 자연스럽고 정확한 "한국어 발음(한글 독음)"으로 변환하세요.

[규칙]
1. 한자(Kanji)는 문맥에 맞는 일본어 발음(음독/훈독/고유명사)을 정확히 파악하여 한글로 표기하세요.
   - 예: "ソク代理と一緒に…" -> "소쿠 다이리토 잇쇼니…" (직책 代理 = だいり)
   - 예: "石代理のうどんをごちそうになった。" -> "이시 다이리노 우돈오 고치소우니 낫타." (성씨 石 = いし)
   - 예: "海雲台に行きました。" -> "해운대니 이키마시타." 또는 "카이운다이니 이키마시타."
2. 장음, 촉음, 비음(ん)의 한국어 받침 규칙을 자연스럽게 반영하세요.
3. 입력된 단락 배열의 순서와 길이를 반드시 1:1로 유지하세요.
4. 오직 마크다운 코드블록이나 불필요한 설명 없이 순수 JSON 문자열 배열(["발음1", "발음2", ...]) 형태로만 응답하세요.

[입력 일본어 단락 배열]
${JSON.stringify(paragraphs, null, 2)}`;

    const response = await model.invoke(prompt);
    let content =
      typeof response.content === 'string'
        ? response.content.trim()
        : JSON.stringify(response.content);

    // 마크다운 코드블록 제거
    if (content.startsWith('```json')) {
      content = content.replace(/^```json/, '').replace(/```$/, '').trim();
    } else if (content.startsWith('```')) {
      content = content.replace(/^```/, '').replace(/```$/, '').trim();
    }

    const parsed = JSON.parse(content);
    if (Array.isArray(parsed) && parsed.length === paragraphs.length) {
      return parsed.map((item, idx) =>
        typeof item === 'string' && item.trim().length > 0
          ? item.trim()
          : paragraphs[idx].trim()
          ? getPronunciation(paragraphs[idx].trim())
          : ''
      );
    }

    console.warn('[Pronunciation] AI 응답 배열 길이가 일치하지 않아 Fallback합니다.');
    return fallbackPronunciations();
  } catch (err) {
    console.error('[Pronunciation] Gemini 발음 생성 오류 (Fallback 적용):', err);
    return fallbackPronunciations();
  }
}
