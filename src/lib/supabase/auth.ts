import { createClient as createBrowserClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

/**
 * 관리자 이메일 목록에 포함되어 있는지 검사합니다.
 * NEXT_PUBLIC_ADMIN_EMAILS 환경변수가 비어있고 개발 환경(development)인 경우 편의를 위해 true를 반환합니다.
 */
export function isAdmin(email?: string | null): boolean {
  if (!email) return false
  const adminEmailsStr = process.env.NEXT_PUBLIC_ADMIN_EMAILS || ''
  const adminEmails = adminEmailsStr
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean)

  if (adminEmails.length > 0) {
    return adminEmails.includes(email.toLowerCase())
  }

  // 관리자 환경변수가 설정되지 않은 개발 모드에서는 로그인한 계정을 임시 관리자로 허용
  if (process.env.NODE_ENV === 'development') {
    return true
  }

  return false
}

/**
 * 브라우저 클라이언트: 구글 OAuth 로그인 요청
 */
export async function signInWithGoogle(redirectTo?: string) {
  const supabase = createBrowserClient()
  const redirectUrl =
    redirectTo ||
    `${window.location.origin}/auth/callback?next=${encodeURIComponent(
      window.location.pathname + window.location.search
    )}`

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: redirectUrl,
    },
  })

  if (error) {
    console.error('Google 로그인 오류:', error.message)
    throw error
  }

  return data
}

/**
 * 브라우저 클라이언트: 로그아웃
 */
export async function signOut() {
  const supabase = createBrowserClient()
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.error('로그아웃 오류:', error.message)
    throw error
  }
}

/**
 * 브라우저 클라이언트: 현재 유저 및 관리자 여부 조회
 */
export async function getClientUser(): Promise<{
  user: User | null
  isAdmin: boolean
}> {
  const supabase = createBrowserClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return {
    user,
    isAdmin: isAdmin(user?.email),
  }
}
