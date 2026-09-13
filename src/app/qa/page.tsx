import { getQuestions } from '@/lib/supabase/queries';
import QAClient from '@/components/qa/QAClient';

export const dynamic = 'force-dynamic';

export default async function QAPage() {
  const questions = await getQuestions();

  return <QAClient initialQuestions={questions} />;
}
