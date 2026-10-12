import { NextRequest, NextResponse } from 'next/server';
import { createClient as createServerClient } from '@/lib/supabase/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { text, lang = 'ja', voice = 'Charon', style } = body;
    const targetVoice = voice || 'Charon';

    if (!text || typeof text !== 'string' || text.trim() === '') {
      return NextResponse.json(
        { error: '텍스트를 입력해주세요.' },
        { status: 400 }
      );
    }

    const trimmedText = text.trim();

    // 보안 검증 1: 학습용 단어/단문 최대 100자 제한 (악의적 장문 공격 및 Gemini API 토큰 고갈 방지)
    if (trimmedText.length > 100) {
      return NextResponse.json(
        { error: '음성 생성은 최대 100자 이하의 단어 및 문장만 지원합니다.' },
        { status: 400 }
      );
    }

    // 보안 검증 2: 허용된 언어 코드만 처리 (ja, ko)
    if (lang !== 'ja' && lang !== 'ko') {
      return NextResponse.json(
        { error: '지원하지 않는 언어입니다 (ja, ko만 허용).' },
        { status: 400 }
      );
    }

    // 보안 검증 3: 허용된 모델 음성만 처리
    const allowedVoices = ['Charon', 'Puck', 'Kore'];
    if (!allowedVoices.includes(targetVoice)) {
      return NextResponse.json(
        { error: '유효하지 않은 보이스입니다.' },
        { status: 400 }
      );
    }

    const supabase = await createServerClient();

    // 1. Supabase 영구 오디오 캐시 확인 (누구나 조회 가능, 0ms 즉시 반환 & API 쿼터 절약)
    try {
      const { data: cached } = await supabase
        .from('tts_audio_cache')
        .select('audio_base64')
        .eq('text', trimmedText)
        .eq('lang', lang)
        .eq('voice', targetVoice)
        .maybeSingle();

      if (cached?.audio_base64) {
        const audioBuffer = Buffer.from(cached.audio_base64, 'base64');
        return new Response(audioBuffer, {
          status: 200,
          headers: {
            'Content-Type': 'audio/wav',
            'X-TTS-Cache': 'HIT',
            'Cache-Control': 'public, max-age=31536000, immutable',
          },
        });
      }
    } catch (cacheErr) {
      console.warn('[Supabase TTS Cache Read Warning]:', cacheErr);
    }

    // 2. Gemini API 호출
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
            text: trimmedText,
            annotations: [{
              type: 'speech_metadata',
              style: style || defaultStyle,
            }],
          }],
        }],
        response_format: { type: 'audio' },
        generation_config: {
          speech_config: [
            { voice: targetVoice },
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

    // 3. 로그인 사용자(관리자 등)인 경우에만 Supabase DB에 영구 캐시 저장
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        await supabase
          .from('tts_audio_cache')
          .upsert(
            {
              text: trimmedText,
              lang,
              voice: targetVoice,
              audio_base64: audioBase64,
            },
            { onConflict: 'text,lang,voice' }
          );
      }
    } catch (err: unknown) {
      console.warn('[Supabase TTS Cache Save Warning]:', err);
    }

    const audioBuffer = Buffer.from(audioBase64, 'base64');
    return new Response(audioBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'audio/wav',
        'X-TTS-Cache': 'MISS',
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
