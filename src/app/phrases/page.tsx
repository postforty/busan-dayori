import { redirect } from 'next/navigation';

export default function PhrasesPage() {
  redirect('/korean?tab=phrases');
}
