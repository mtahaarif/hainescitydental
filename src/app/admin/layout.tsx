"use client";

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const INACTIVITY_LIMIT_MS = 15 * 60 * 1000;
  const isLoginRoute = pathname === '/admin/login';
  const [authChecked, setAuthChecked] = useState(false);

  // Client-side auth guard: verify auth via server since cms_token is httpOnly.
  useEffect(() => {
    if (isLoginRoute) {
      setAuthChecked(true);
      return;
    }
    fetch('/api/admin/check', { credentials: 'same-origin' })
      .then(res => {
        if (res.ok) {
          setAuthChecked(true);
        } else {
          router.replace(`/admin/login?next=${encodeURIComponent(pathname)}`);
        }
      })
      .catch(() => {
        router.replace(`/admin/login?next=${encodeURIComponent(pathname)}`);
      });
  }, [isLoginRoute, pathname, router]);

  const handleLogout = useCallback(() => {
    // navigate to login after server clears cookie
    fetch('/api/admin/logout', { method: 'POST' }).finally(() => router.push('/admin/login'));
  }, [router]);

  const showLogout = !isLoginRoute;

  const resetInactivityTimer = useCallback(() => {
    if (!showLogout) return;
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      handleLogout();
    }, INACTIVITY_LIMIT_MS);
  }, [handleLogout, showLogout]);

  useEffect(() => {
    if (!showLogout) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    resetInactivityTimer();

    const events: Array<keyof WindowEventMap> = [
      'mousemove',
      'mousedown',
      'keydown',
      'touchstart',
      'scroll',
      'wheel',
      'focus',
    ];

    const handleActivity = () => resetInactivityTimer();

    events.forEach((event) => window.addEventListener(event, handleActivity, { passive: true }));

    return () => {
      events.forEach((event) => window.removeEventListener(event, handleActivity));
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [resetInactivityTimer, showLogout]);

  if (!authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-gray-500">Verifying authentication...</p>
      </div>
    );
  }

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
