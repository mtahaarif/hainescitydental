import { redirect } from 'next/navigation';

// Force dynamic so Vercel never caches this route as a static asset
export const dynamic = 'force-dynamic';

export default function AdminPage() {
  redirect('/admin/news');
}
