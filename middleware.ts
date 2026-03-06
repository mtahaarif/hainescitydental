import { NextRequest, NextResponse } from 'next/server';

const ADMIN_LOGIN_PATH = '/admin/login';

export default function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const hasToken = Boolean(request.cookies.get('cms_token')?.value);

  const isLoginRoute = pathname === ADMIN_LOGIN_PATH;
  const isAdminRoute = pathname === '/admin' || pathname.startsWith('/admin/');
  const isAdminApi = pathname.startsWith('/api/admin');
  const isAuthApi = pathname === '/api/admin/login' || pathname === '/api/admin/logout';

  // --- Admin page routes ---
  if (isAdminRoute) {
    // Bare /admin always redirects to a concrete page
    if (pathname === '/admin') {
      const url = request.nextUrl.clone();
      if (hasToken) {
        url.pathname = '/admin/news';
        url.search = '';
      } else {
        url.pathname = ADMIN_LOGIN_PATH;
        url.search = `?next=${encodeURIComponent('/admin/news')}`;
      }
      return NextResponse.redirect(url, 308);
    }

    // Already-authenticated user on login page → send to dashboard
    if (isLoginRoute && hasToken) {
      const url = request.nextUrl.clone();
      url.pathname = '/admin/news';
      url.search = '';
      return NextResponse.redirect(url);
    }

    // Unauthenticated user on any admin page (except login) → require login
    if (!isLoginRoute && !hasToken) {
      const url = request.nextUrl.clone();
      url.pathname = ADMIN_LOGIN_PATH;
      url.search = `?next=${encodeURIComponent(pathname + search)}`;
      return NextResponse.redirect(url);
    }

    // Add cache-busting headers so Vercel CDN never caches admin pages
    const response = NextResponse.next();
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    response.headers.set('x-middleware-cache', 'no-cache');
    return response;
  }

  // --- Admin API routes (except login/logout which are public) ---
  if (isAdminApi && !isAuthApi) {
    if (!hasToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  // Explicitly include bare /admin plus all sub-paths
  matcher: ['/admin', '/admin/:path*', '/api/admin/:path*'],
};
