import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { isAdmin } from '@/lib/supabase/server-auth'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      // 로그인한 유저의 관리자 권한 확인
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user || !isAdmin(user.email)) {
        console.warn(`[Auth] 비인가 사용자 로그인 시도 차단: ${user?.email}`)
        await supabase.auth.signOut()
        return NextResponse.redirect(`${origin}/?auth_error=unauthorized`)
      }

      const forwardedHost = request.headers.get('x-forwarded-host')
      const isLocalEnv = process.env.NODE_ENV === 'development'
      if (isLocalEnv) {
        return NextResponse.redirect(`${origin}${next}`)
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`)
      } else {
        return NextResponse.redirect(`${origin}${next}`)
      }
    }
  }

  // 오류 발생 시 홈으로 리다이렉트
  return NextResponse.redirect(`${origin}/?auth_error=true`)
}
