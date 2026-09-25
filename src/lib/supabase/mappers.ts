import {
  Letter,
  LetterParagraph,
  DailyLesson,
  Phrase,
  Dialect,
  Question,
  Feedback
} from '@/types'
import { Database } from '@/types/database.types'

type LetterRow = Database['public']['Tables']['letters']['Row']
type DailyLessonRow = Database['public']['Tables']['daily_lessons']['Row']
type PhraseRow = Database['public']['Tables']['phrases']['Row']
type DialectRow = Database['public']['Tables']['dialects']['Row']
type QuestionRow = Database['public']['Tables']['questions']['Row']
type FeedbackRow = Database['public']['Tables']['feedbacks']['Row']

function normalizeLetterContent(rawContent: unknown): LetterParagraph[] {
  if (!Array.isArray(rawContent)) return []
  return rawContent.map((item) => {
    if (typeof item === 'string') {
      return { text: item }
    }
    if (item && typeof item === 'object') {
      const obj = item as Record<string, unknown>
      return {
        text: typeof obj.text === 'string' ? obj.text : '',
        imageUrl:
          typeof obj.imageUrl === 'string' && obj.imageUrl.trim().length > 0
            ? obj.imageUrl.trim()
            : undefined,
      }
    }
    return { text: '' }
  })
}

export function mapLetter(row: LetterRow): Letter {
  return {
    id: row.id,
    title: row.title,
    date: row.date,
    category: row.category as Letter['category'],
    region: row.region,
    imageUrl: row.image_url,
    summary: row.summary,
    content: normalizeLetterContent(row.content),
    studyPoint: (row.study_point as unknown as Letter['studyPoint']) || {
      expression: '',
      meaning: '',
      memo: ''
    },
    placeInfo: (row.place_info as unknown as Letter['placeInfo']) || undefined,
    likes: row.likes
  }
}

export function mapDailyLesson(row: DailyLessonRow): DailyLesson {
  return {
    id: row.id,
    dayNumber: row.day_number ?? 1,
    seriesTitle: row.series_title,
    themeTitle: row.theme_title,
    keyExpression: (row.key_expression as unknown as DailyLesson['keyExpression']) || {
      japanese: '',
      reading: '',
      korean: ''
    },
    dialogue: (row.dialogue as unknown as DailyLesson['dialogue']) || [],
    grammar: (row.grammar as unknown as DailyLesson['grammar']) || {
      title: '',
      structure: '',
      explanation: ''
    },
    vocabulary: (row.vocabulary as unknown as DailyLesson['vocabulary']) || [],
    nuanceTip: row.nuance_tip || '',
    relatedLetterId: row.related_letter_id || undefined
  }
}

export function mapPhrase(row: PhraseRow): Phrase {
  return {
    id: row.id,
    category: row.category as Phrase['category'],
    japanese: row.japanese,
    korean: row.korean,
    pronunciation: row.pronunciation,
    tip: row.tip || undefined
  }
}

export function mapDialect(row: DialectRow): Dialect {
  return {
    id: row.id,
    dialect: row.dialect,
    standard: row.standard,
    japanese: row.japanese,
    situation: row.situation,
    example: row.example
  }
}

export function mapQuestion(row: QuestionRow): Question {
  return {
    id: row.id,
    authorName: row.author_name,
    targetMonth: row.target_month || '',
    question: row.question,
    answer: row.answer || undefined,
    createdAt: new Date(row.created_at).toLocaleDateString('ja-JP').replace(/\//g, '.')
  }
}

export function mapFeedback(row: FeedbackRow): Feedback {
  return {
    id: row.id,
    letterId: row.letter_id,
    readerName: row.reader_name,
    naturalness: row.naturalness as Feedback['naturalness'],
    suggestion: row.suggestion || undefined,
    comment: row.comment || '',
    createdAt: new Date(row.created_at).toLocaleDateString('ja-JP').replace(/\//g, '.')
  }
}
