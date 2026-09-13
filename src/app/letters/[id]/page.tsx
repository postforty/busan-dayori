import { notFound } from 'next/navigation';
import { getLetterById } from '@/lib/supabase/queries';
import LetterDetailView from '@/components/letters/LetterDetailView';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function LetterDetailPage({ params }: PageProps) {
  const { id } = await params;
  const letter = await getLetterById(id);

  if (!letter) {
    return notFound();
  }

  return <LetterDetailView letter={letter} />;
}
