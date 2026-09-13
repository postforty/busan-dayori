import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { Database } from '@/types/database.types'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

  if (!supabaseUrl || !supabasePublishableKey) {
    return supabaseResponse
  }

  const supabase = createServerClient<Database>(supabaseUrl, supabasePublishableKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet, headers) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
        supabaseResponse = NextResponse.next({
          request,
        })
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        )
        Object.entries(headers).forEach(([key, value]) =>
          supabaseResponse.headers.set(key, value)
        )
      },
    },
  })

  // IMPORTANT: getClaims validates and refreshes the user token if needed
  const { data: claimsData } = await supabase.auth.getClaims()
  const userEmail = claimsData?.claims?.email as string | undefined

  // 관리자 전용 경로 가드
  const pathname = request.nextUrl.pathname
  const isAdminRoute =
    pathname === '/letters/new' ||
    (pathname.startsWith('/letters/') && pathname.endsWith('/edit'))

  if (isAdminRoute) {
    const adminEmailsStr = process.env.ADMIN_EMAILS || ''
    const adminEmails = adminEmailsStr
      .split(',')
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean)

    const isUserAdmin = userEmail ? adminEmails.includes(userEmail.toLowerCase()) : false

    if (!isUserAdmin) {
      const url = request.nextUrl.clone()
      url.pathname = '/'
      url.searchParams.set('auth_error', 'admin_required')
      const redirectResponse = NextResponse.redirect(url)
      supabaseResponse.cookies.getAll().forEach((cookie) => {
        redirectResponse.cookies.set(cookie)
      })
      return redirectResponse
    }
  }

  return supabaseResponse
}
