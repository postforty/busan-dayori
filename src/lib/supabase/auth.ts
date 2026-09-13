import { createClient as createBrowserClient } from '@/lib/supabase/client'

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

