import { createBrowserClient } from '@supabase/ssr'
import { Database } from '@/types/database.types'

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

  if (!supabaseUrl || !supabasePublishableKey) {
    throw new Error(
      'Supabase URL or Publishable Key is missing. Check your .env.local file.'
    )
  }

  return createBrowserClient<Database>(supabaseUrl, supabasePublishableKey)
}
