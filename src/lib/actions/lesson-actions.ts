'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { getServerUser } from '@/lib/supabase/server-auth'
import { mapDailyLesson } from '@/lib/supabase/mappers'
import type { DailyLesson } from '@/types'
import type { Json } from '@/types/database.types'

/**
 * AI 생성 레슨 또는 임시 레슨을 Supabase daily_lessons 테이블에 영구 발행(저장)합니다.
 * (관리자 전용)
 */
export async function publishDailyLesson(lesson: DailyLesson): Promise<{
  success: boolean
  lesson?: DailyLesson
  error?: string
}> {
  try {
    const { user, isAdmin } = await getServerUser()
    if (!user || !isAdmin) {
      return { success: false, error: '공식 레슨을 발행할 수 있는 관리자 권한이 없습니다.' }
    }

    const supabase = await createClient()

    // 1. 기존 daily_lessons의 최대 day_number 확인
    const { data: maxRow, error: maxError } = await supabase
      .from('daily_lessons')
      .select('day_number')
      .order('day_number', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (maxError) {
      console.error('[publishDailyLesson] 최대 day_number 조회 오류:', maxError)
    }

    const currentMaxDay = maxRow?.day_number ?? 0
    const nextDayNumber = currentMaxDay + 1

    // 2. 고유 ID 지정 (lesson-day-{nextDayNumber})
    const finalId = `lesson-day-${nextDayNumber}`

    // 3. daily_lessons 테이블에 INSERT
    const { data: inserted, error: insertError } = await supabase
      .from('daily_lessons')
      .insert({
        id: finalId,
        day_number: nextDayNumber,
        series_title: lesson.seriesTitle?.trim() || 'AI+ 실전 로컬 챌린지',
        theme_title: lesson.themeTitle?.trim() || '새로운 실전 일본어 레슨',
        key_expression: lesson.keyExpression as unknown as Json,
        dialogue: lesson.dialogue as unknown as Json,
        grammar: lesson.grammar as unknown as Json,
        vocabulary: lesson.vocabulary as unknown as Json,
        nuance_tip: lesson.nuanceTip?.trim() || null,
        related_letter_id: lesson.relatedLetterId?.trim() || null,
      })
      .select('*')
      .single()

    if (insertError) {
      console.error('[publishDailyLesson] 레슨 발행 INSERT 실패:', insertError)
      return { success: false, error: `레슨 저장에 실패했습니다: ${insertError.message}` }
    }

    // 4. 관련 페이지 캐시 갱신
    revalidatePath('/')
    revalidatePath('/roadmap')
    revalidatePath('/voca')

    return {
      success: true,
      lesson: mapDailyLesson(inserted),
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.'
    console.error('[publishDailyLesson] 예외 발생:', err)
    return { success: false, error: message }
  }
}

/**
 * 등록된 공식 레슨을 daily_lessons 테이블에서 삭제합니다.
 * (관리자 전용)
 */
export async function deleteDailyLesson(id: string): Promise<{
  success: boolean
  error?: string
}> {
  try {
    const { user, isAdmin } = await getServerUser()
    if (!user || !isAdmin) {
      return { success: false, error: '레슨을 삭제할 수 있는 관리자 권한이 없습니다.' }
    }

    const supabase = await createClient()

    const { error: deleteError } = await supabase
      .from('daily_lessons')
      .delete()
      .eq('id', id)

    if (deleteError) {
      console.error('[deleteDailyLesson] 레슨 삭제 실패:', deleteError)
      return { success: false, error: `레슨 삭제에 실패했습니다: ${deleteError.message}` }
    }

    // 관련 페이지 캐시 갱신
    revalidatePath('/')
    revalidatePath('/roadmap')
    revalidatePath('/voca')

    return { success: true }
  } catch (err) {
    const message = err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.'
    console.error('[deleteDailyLesson] 예외 발생:', err)
    return { success: false, error: message }
  }
}
