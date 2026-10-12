import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { text, lang = 'ja', voice = 'Kore', style } = body;

    if (!text || typeof text !== 'string' || text.trim() === '') {
      return NextResponse.json(
        { error: '텍스트를 입력해주세요.' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'GEMINI_API_KEY가 설정되지 않았습니다.' },
        { status: 500 }
      );
    }

    const defaultStyle = lang === 'ja'
      ? 'clear, gentle and friendly pronunciation for language learners'
      : 'friendly and clear pronunciation';

    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/interactions', {
      method: 'POST',
      headers: {
        'x-goog-api-key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gemini-3.8-flash-lite-tts',
        input: [{
          type: 'user_input',
          content: [{
            type: 'text',
            text: text.trim(),
            annotations: [{
              type: 'speech_metadata',
              style: style || defaultStyle,
            }],
          }],
        }],
        response_format: { type: 'audio' },
        generation_config: {
          speech_config: [
            { voice: voice || 'Kore' },
          ],
        },
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.warn(`[Gemini TTS Error] Status: ${response.status}, Details: ${errText}`);
      return NextResponse.json(
        { error: 'Gemini TTS generation failed', details: errText },
        { status: response.status }
      );
    }

    const data = await response.json();

    // REST API 반환값에서 audio data 추출
    // 구조 1: data.steps[].content[].data (select type == 'audio')
    // 구조 2: data.output_audio.data
    let audioBase64: string | undefined = data.output_audio?.data;

    if (!audioBase64 && Array.isArray(data.steps)) {
      for (const step of data.steps) {
        if (Array.isArray(step.content)) {
          for (const item of step.content) {
            if (item.type === 'audio' && typeof item.data === 'string') {
              audioBase64 = item.data;
            }
          }
        }
      }
    }

    if (!audioBase64) {
      return NextResponse.json(
        { error: '생성된 오디오 데이터를 찾을 수 없습니다.' },
        { status: 502 }
      );
    }

    const audioBuffer = Buffer.from(audioBase64, 'base64');

    return new Response(audioBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'audio/wav',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error: unknown) {
    console.error('[Gemini TTS Route Exception]:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '서버 내부 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
