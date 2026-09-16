'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { getServerUser } from '@/lib/supabase/server-auth'
import { extractStoragePath } from '@/utils/image'
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
 * @param previousImageUrl 수정 전 원본 이미지 URL (폼에서 명시적으로 전달, 모바일 호환성 보장)
 */
export async function updateLetter(
  id: string,
  data: Partial<LetterFormData>,
  previousImageUrl?: string
) {
  const { user, isAdmin } = await getServerUser()
  if (!user || !isAdmin) {
    throw new Error('글을 수정할 수 있는 관리자 권한이 없습니다.')
  }

  const supabase = await createClient()

  // 1. 이미지가 변경되는 경우, 기존 image_url 조회 (성공적인 DB 업데이트 후 Storage 정리용)
  let oldImageUrl: string | null = null
  if (data.imageUrl !== undefined) {
    const { data: existingLetter } = await supabase
      .from('letters')
      .select('image_url')
      .eq('id', id)
      .single()
    oldImageUrl = existingLetter?.image_url || null
  }

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

  // 2. DB 업데이트 성공 후, 기존 이미지가 교체되었다면 Storage에서 삭제
  //    삭제 대상: (a) 폼에서 명시적으로 전달된 previousImageUrl, (b) DB에서 조회한 oldImageUrl
  const newImageUrl = data.imageUrl?.trim() || ''
  const urlsToDelete = new Set<string>()

  // (a) 폼에서 전달된 원본 이미지 URL (모바일 호환 — 가장 신뢰할 수 있는 소스)
  if (previousImageUrl && previousImageUrl !== newImageUrl) {
    const path = extractStoragePath(previousImageUrl)
    if (path) urlsToDelete.add(path)
  }
  // (b) DB에서 직접 조회한 기존 이미지 URL (추가 안전망)
  if (oldImageUrl && oldImageUrl !== newImageUrl) {
    const path = extractStoragePath(oldImageUrl)
    if (path) urlsToDelete.add(path)
  }

  for (const storagePath of urlsToDelete) {
    try {
      const { error: removeError } = await supabase.storage
        .from('letter-images')
        .remove([storagePath])
      if (removeError) {
        console.warn(`[updateLetter] Storage 삭제 실패 (${storagePath}):`, removeError)
      } else {
        console.log(`[updateLetter] Storage 삭제 완료: ${storagePath}`)
      }
    } catch (storageErr) {
      console.warn(`[updateLetter] Storage 삭제 예외 (${storagePath}):`, storageErr)
    }
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

  // 1. 삭제 전 기존 대표 이미지 URL 조회
  const { data: targetLetter } = await supabase
    .from('letters')
    .select('image_url')
    .eq('id', id)
    .single()
  const targetImageUrl = targetLetter?.image_url

  // 2. feedbacks 삭제 (외래키 제약조건)
  await supabase.from('feedbacks').delete().eq('letter_id', id)

  // 3. daily_lessons에서 related_letter_id 참조 해제
  await supabase
    .from('daily_lessons')
    .update({ related_letter_id: null })
    .eq('related_letter_id', id)

  // 4. letters 삭제
  const { error } = await supabase.from('letters').delete().eq('id', id)

  if (error) {
    console.error('편지 삭제 DB 에러:', error)
    throw new Error(`편지 삭제 실패: ${error.message}`)
  }

  // 5. DB 삭제 성공 후, 연결되어 있던 Storage 이미지 삭제 (fire-and-forget)
  if (targetImageUrl) {
    const storagePath = extractStoragePath(targetImageUrl)
    if (storagePath) {
      try {
        const { error: removeError } = await supabase.storage
          .from('letter-images')
          .remove([storagePath])
        if (removeError) {
          console.warn('삭제된 편지의 이미지 Storage 삭제 실패 (경고만 기록):', removeError)
        }
      } catch (storageErr) {
        console.warn('삭제된 편지의 이미지 Storage 삭제 중 예외 발생:', storageErr)
      }
    }
  }

  revalidatePath('/')
  revalidatePath('/letters')

  return { success: true }
}

