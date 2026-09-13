import { getDialects } from '@/lib/supabase/queries';
import DialectsClient from '@/components/dialects/DialectsClient';

export const dynamic = 'force-dynamic';

export default async function DialectsPage() {
  const dialects = await getDialects();

  return <DialectsClient initialDialects={dialects} />;
}
