import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { getServerUser } from '@/lib/supabase/server-auth'

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params
  const { user, isAdmin } = await getServerUser()

  if (!user || !isAdmin) {
    return NextResponse.json(
      { error: '글을 삭제할 수 있는 관리자 권한이 없습니다.' },
      { status: 403 }
    )
  }

  const supabase = await createClient()

  // 1. feedbacks 삭제 (외래키 제약조건)
  await supabase.from('feedbacks').delete().eq('letter_id', id)

  // 2. daily_lessons에서 related_letter_id 참조 해제
  await supabase
    .from('daily_lessons')
    .update({ related_letter_id: null })
    .eq('related_letter_id', id)

  // 3. letters 삭제
  const { error } = await supabase.from('letters').delete().eq('id', id)

  if (error) {
    console.error('편지 삭제 DB 에러:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  revalidatePath('/')
  revalidatePath('/letters')

  return NextResponse.json({ success: true })
}
