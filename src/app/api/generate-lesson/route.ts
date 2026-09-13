import { NextRequest, NextResponse } from 'next/server';
import { lessonGraph } from '@/lib/ai/workflow';
import { getDailyLessons } from '@/lib/supabase/queries';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const topic = body.topic?.trim();

    if (!topic) {
      return NextResponse.json(
        { error: '학습을 원하는 상황 또는 주제를 입력해주세요.' },
        { status: 400 }
      );
    }

    // API 키 존재 여부 확인
    if (!process.env.GEMINI_API_KEY) {
      const dbLessons = await getDailyLessons();
      const defaultLesson = dbLessons[0];
      const fallback = defaultLesson ? {
        ...defaultLesson,
        id: `demo-${Date.now()}`,
        themeTitle: `${topic} (데모 모드)`
      } : null;

      return NextResponse.json({
        lesson: fallback,
        isFallback: true,
        message: 'GEMINI_API_KEY가 설정되지 않아 기본 레슨을 제공합니다.'
      });
    }

    // LangGraph 워크플로우 실행
    const result = await lessonGraph.invoke({
      topic,
      draftJson: '',
      finalLesson: null,
    });

    if (!result.finalLesson) {
      throw new Error('레슨 생성 결과를 파싱하지 못했습니다.');
    }

    return NextResponse.json({
      lesson: result.finalLesson,
      isFallback: false,
    });
  } catch (error: unknown) {
    console.error('Lesson Generation Error:', error);
    const dbLessons = await getDailyLessons();
    const fallback = dbLessons[0] || null;

    return NextResponse.json(
      {
        lesson: fallback,
        isFallback: true,
        error: error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.',
      },
      { status: 200 }
    );
  }
}
