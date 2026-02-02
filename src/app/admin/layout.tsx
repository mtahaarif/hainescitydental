"use client";

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  function handleLogout() {
    // navigate to login after server clears cookie
    fetch('/api/admin/logout', { method: 'POST' }).finally(() => router.push('/admin/login'));
  }

  const showLogout = pathname !== '/admin/login';

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b p-4 flex items-center justify-between">
        <div className="text-lg font-semibold">Admin Console</div>
        {showLogout ? (
          <div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-dental-blue-600 text-white hover:bg-dental-blue-700"
            >
              Logout
            </button>
          </div>
        ) : null}
      </header>
      <main className="p-6">{children}</main>
    </div>
  );
}
