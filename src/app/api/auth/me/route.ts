import { NextResponse } from 'next/server'
import { getServerUser } from '@/lib/supabase/server-auth'

export async function GET() {
  const { user, isAdmin } = await getServerUser()

  return NextResponse.json(
    {
      isLoggedIn: !!user,
      isAdmin,
      user: user
        ? {
            id: user.id,
            email: user.email,
            name:
              user.user_metadata?.full_name ||
              user.user_metadata?.name ||
              user.email?.split('@')[0] ||
              null,
          }
        : null,
    },
    {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        Pragma: 'no-cache',
        Expires: '0',
      },
    }
  )
}
