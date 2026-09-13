import { createClient as createServerClient } from '@/lib/supabase/server'
import { isAdmin } from './auth'
import type { User } from '@supabase/supabase-js'

export { isAdmin }

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
