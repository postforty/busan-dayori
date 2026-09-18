import { getLetters } from '@/lib/supabase/queries';
import LettersFeed from '@/components/letters/LettersFeed';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: '로컬 편지 아카이브 | 釜山だより',
  description: '부산 토박이가 전하는 생생한 맛집과 숨은 명소, 그리고 실전 일본어 표현 아카이브'
};

export default async function LettersPage() {
  const letters = await getLetters();

  return <LettersFeed initialLetters={letters} />;
}
