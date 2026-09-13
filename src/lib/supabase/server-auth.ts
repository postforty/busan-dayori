import { createClient as createServerClient } from '@/lib/supabase/server'
import type { User } from '@supabase/supabase-js'

/**
 * 서버 전용: 관리자 이메일 목록에 포함되어 있는지 엄격히 검사합니다.
 * ADMIN_EMAILS 환경변수에 등록된 이메일만 허용합니다.
 */
export function isAdmin(email?: string | null): boolean {
  if (!email) return false
  const adminEmailsStr = process.env.ADMIN_EMAILS || ''
  const adminEmails = adminEmailsStr
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean)

  return adminEmails.includes(email.toLowerCase())
}

/**
 * 서버 컴포넌트/서버 액션: 현재 세션 유저 및 관리자 여부 조회
 */
export async function getServerUser(): Promise<{
  user: User | null
  isAdmin: boolean
}> {
  const supabase = await createServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return {
    user,
    isAdmin: isAdmin(user?.email),
  }
}

