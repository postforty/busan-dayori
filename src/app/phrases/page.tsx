import { getPhrases } from '@/lib/supabase/queries';
import PhrasesClient from '@/components/phrases/PhrasesClient';

export const dynamic = 'force-dynamic';

export default async function PhrasesPage() {
  const phrases = await getPhrases();

  return <PhrasesClient initialPhrases={phrases} />;
}
