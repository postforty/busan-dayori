import { getLetters, getDailyLessons } from '@/lib/supabase/queries';
import HomeFeed from '@/components/home/HomeFeed';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const [letters, dailyLessons] = await Promise.all([
    getLetters(),
    getDailyLessons()
  ]);

  return <HomeFeed initialLetters={letters} initialLessons={dailyLessons} />;
}
