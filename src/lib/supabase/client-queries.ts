import { createClient as createBrowserClient } from './client'
import { Feedback, Question } from '@/types'
import { mapFeedback, mapQuestion } from './mappers'

export async function getFeedbacksByLetterId(letterId: string): Promise<Feedback[]> {
  const supabase = createBrowserClient()
  const { data, error } = await supabase
    .from('feedbacks')
    .select('*')
    .eq('letter_id', letterId)
    .order('created_at', { ascending: false })

  if (error || !data) {
    console.error('Failed to fetch feedbacks:', error)
    return []
  }

  return data.map(mapFeedback)
}

export async function insertFeedback(params: {
  letterId: string
  readerName: string
  naturalness: 'natural' | 'awkward'
  suggestion?: string
  comment?: string
}): Promise<Feedback | null> {
  const supabase = createBrowserClient()
  const { data, error } = await supabase
    .from('feedbacks')
    .insert({
      letter_id: params.letterId,
      reader_name: params.readerName || '匿名の読者さん',
      naturalness: params.naturalness,
      suggestion: params.suggestion || null,
      comment: params.comment || null
    })
    .select()
    .single()

  if (error || !data) {
    console.error('Failed to insert feedback:', error)
    return null
  }

  return mapFeedback(data)
}

export async function fetchClientQuestions(): Promise<Question[]> {
  const supabase = createBrowserClient()
  const { data, error } = await supabase
    .from('questions')
    .select('*')
    .order('created_at', { ascending: false })

  if (error || !data) {
    console.error('Failed to fetch questions:', error)
    return []
  }

  return data.map(mapQuestion)
}

export async function insertQuestion(params: {
  authorName: string
  targetMonth: string
  question: string
}): Promise<Question | null> {
  const supabase = createBrowserClient()
  const { data, error } = await supabase
    .from('questions')
    .insert({
      author_name: params.authorName || '匿名の旅人',
      target_month: params.targetMonth || '時期未定',
      question: params.question,
      answer: 'ご質問ありがとうございます！管理人が日本語で確認次第、心を込めて返信させていただきますね。（少々お待ちください）',
      is_answered: false
    })
    .select()
    .single()

  if (error || !data) {
    console.error('Failed to insert question:', error)
    return null
  }

  return mapQuestion(data)
}

export async function incrementLetterLikes(letterId: string, currentLikes: number): Promise<boolean> {
  const supabase = createBrowserClient()
  const { error } = await supabase
    .from('letters')
    .update({ likes: currentLikes + 1 })
    .eq('id', letterId)

  if (error) {
    console.error('Failed to update likes:', error)
    return false
  }

  return true
}
