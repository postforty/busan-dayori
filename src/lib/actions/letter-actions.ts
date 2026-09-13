'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getServerUser } from '@/lib/supabase/server-auth'
import type { Category, SoloFriendly, SpicyLevel } from '@/types'
import type { Database, Json } from '@/types/database.types'

type LetterUpdate = Database['public']['Tables']['letters']['Update']

export interface LetterFormData {
  id?: string
  title: string
  date: string
  category: Category
  region: string
  imageUrl: string
  summary: string
  content: string[] // 단락 배열
  studyPoint: {
    expression: string
    meaning: string
    memo: string
  }
  placeInfo?: {
    koreanName: string
    katakanaName: string
    address: string
    subway: string
    hours: string
    closedDay: string
    soloFriendly: SoloFriendly
    spicyLevel: SpicyLevel
    cardOk: boolean
    naverMapUrl: string
    googleMapUrl: string
  }
}

/**
 * 새 편지(아티클) 생성
 */
export async function createLetter(data: LetterFormData) {
  const { user, isAdmin } = await getServerUser()
  if (!user || !isAdmin) {
    throw new Error('새 글을 작성할 수 있는 관리자 권한이 없습니다.')
  }

  const supabase = await createClient()

  // slug ID 생성 (지정되지 않았으면 제목 기반 또는 타임스탬프 기반)
  const slugId =
    data.id?.trim() ||
    `letter-${Date.now()}`

  const { error } = await supabase.from('letters').insert({
    id: slugId,
    title: data.title.trim(),
    date: data.date || new Date().toISOString().slice(0, 10).replace(/-/g, '.'),
    category: data.category,
    region: data.region.trim(),
    image_url: data.imageUrl.trim() || 'https://images.unsplash.com/photo-1578637387939-43c525550085?auto=format&fit=crop&w=800&q=80',
    summary: data.summary.trim(),
    content: data.content.filter((p) => p.trim().length > 0) as unknown as Json,
    study_point: data.studyPoint as unknown as Json,
    place_info: data.placeInfo ? (data.placeInfo as unknown as Json) : null,
    likes: 0,
  })

  if (error) {
    console.error('편지 생성 DB 에러:', error)
    throw new Error(`편지 생성 실패: ${error.message}`)
  }

  revalidatePath('/')
  revalidatePath('/letters')
  revalidatePath(`/letters/${slugId}`)

  return { success: true, id: slugId }
}

/**
 * 편지 수정
 */
export async function updateLetter(id: string, data: Partial<LetterFormData>) {
  const { user, isAdmin } = await getServerUser()
  if (!user || !isAdmin) {
    throw new Error('글을 수정할 수 있는 관리자 권한이 없습니다.')
  }

  const supabase = await createClient()

  const updatePayload: LetterUpdate = {
    updated_at: new Date().toISOString(),
  }

  if (data.title !== undefined) updatePayload.title = data.title.trim()
  if (data.date !== undefined) updatePayload.date = data.date
  if (data.category !== undefined) updatePayload.category = data.category
  if (data.region !== undefined) updatePayload.region = data.region.trim()
  if (data.imageUrl !== undefined) updatePayload.image_url = data.imageUrl.trim()
  if (data.summary !== undefined) updatePayload.summary = data.summary.trim()
  if (data.content !== undefined) {
    updatePayload.content = data.content.filter((p) => p.trim().length > 0) as unknown as Json
  }
  if (data.studyPoint !== undefined) {
    updatePayload.study_point = data.studyPoint as unknown as Json
  }
  if (data.placeInfo !== undefined) {
    updatePayload.place_info = data.placeInfo ? (data.placeInfo as unknown as Json) : null
  }

  const { error } = await supabase
    .from('letters')
    .update(updatePayload)
    .eq('id', id)

  if (error) {
    console.error('편지 수정 DB 에러:', error)
    throw new Error(`편지 수정 실패: ${error.message}`)
  }

  revalidatePath('/')
  revalidatePath('/letters')
  revalidatePath(`/letters/${id}`)

  return { success: true, id }
}

/**
 * 편지 삭제
 */
export async function deleteLetter(id: string) {
  const { user, isAdmin } = await getServerUser()
  if (!user || !isAdmin) {
    throw new Error('글을 삭제할 수 있는 관리자 권한이 없습니다.')
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
    throw new Error(`편지 삭제 실패: ${error.message}`)
  }

  revalidatePath('/')
  revalidatePath('/letters')

  redirect('/')
}
