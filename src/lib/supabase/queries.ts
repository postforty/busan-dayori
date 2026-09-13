import { createClient as createServerClient } from './server'
import {
  Letter,
  DailyLesson,
  Phrase,
  Dialect,
  Question
} from '@/types'
import {
  mapLetter,
  mapDailyLesson,
  mapPhrase,
  mapDialect,
  mapQuestion
} from './mappers'

export async function getLetters(): Promise<Letter[]> {
  const supabase = await createServerClient()
  const { data, error } = await supabase
    .from('letters')
    .select('*')
    .order('created_at', { ascending: false })

  if (error || !data) {
    console.error('Failed to fetch letters:', error)
    return []
  }

  return data.map(mapLetter)
}

export async function getLetterById(id: string): Promise<Letter | null> {
  const supabase = await createServerClient()
  const { data, error } = await supabase
    .from('letters')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) {
    return null
  }

  return mapLetter(data)
}

export async function getDailyLessons(): Promise<DailyLesson[]> {
  const supabase = await createServerClient()
  const { data, error } = await supabase
    .from('daily_lessons')
    .select('*')
    .order('day_number', { ascending: true })

  if (error || !data) {
    console.error('Failed to fetch daily lessons:', error)
    return []
  }

  return data.map(mapDailyLesson)
}

export async function getPhrases(): Promise<Phrase[]> {
  const supabase = await createServerClient()
  const { data, error } = await supabase
    .from('phrases')
    .select('*')
    .order('sort_order', { ascending: true })

  if (error || !data) {
    console.error('Failed to fetch phrases:', error)
    return []
  }

  return data.map(mapPhrase)
}

export async function getDialects(): Promise<Dialect[]> {
  const supabase = await createServerClient()
  const { data, error } = await supabase
    .from('dialects')
    .select('*')
    .order('sort_order', { ascending: true })

  if (error || !data) {
    console.error('Failed to fetch dialects:', error)
    return []
  }

  return data.map(mapDialect)
}

export async function getQuestions(): Promise<Question[]> {
  const supabase = await createServerClient()
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
