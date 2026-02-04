"use client";

import React, { useCallback, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const INACTIVITY_LIMIT_MS = 5 * 60 * 1000;

  const sendLogoutRequest = useCallback(() => {
    if (typeof navigator !== 'undefined' && 'sendBeacon' in navigator) {
      const blob = new Blob([], { type: 'application/json' });
      navigator.sendBeacon('/api/admin/logout', blob);
      return;
    }
    fetch('/api/admin/logout', { method: 'POST', keepalive: true });
  }, []);

  const handleLogout = useCallback(() => {
    // navigate to login after server clears cookie
    fetch('/api/admin/logout', { method: 'POST' }).finally(() => router.push('/admin/login'));
  }, [router]);

  const showLogout = pathname !== '/admin/login';

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

  useEffect(() => {
    if (!showLogout) return;
    return () => {
      sendLogoutRequest();
    };
  }, [sendLogoutRequest, showLogout]);

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
