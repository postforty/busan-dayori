import { getLetters } from '@/lib/supabase/queries';
import LettersFeed from '@/components/letters/LettersFeed';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: '釜山ローカル便り | 釜山だより',
  description: '日本語を勉強中の釜山っ子が直接日本語で書いた、リアルな釜山ローカル旅のお便り。'
};

export default async function LettersPage() {
  const letters = await getLetters();

  return <LettersFeed initialLetters={letters} />;
}
