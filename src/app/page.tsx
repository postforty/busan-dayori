import { getDailyLessons } from '@/lib/supabase/queries';
import HomeFeed from '@/components/home/HomeFeed';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const dailyLessons = await getDailyLessons();

  return <HomeFeed initialLessons={dailyLessons} />;
}
