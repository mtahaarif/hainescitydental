import { NextRequest, NextResponse } from 'next/server';

const ADMIN_LOGIN_PATH = '/admin/login';
const ADMIN_ROOT_PATH = '/admin';

export default function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const hasToken = Boolean(request.cookies.get('cms_token')?.value);

  const isAdminRoute = pathname.startsWith('/admin');
  const isLoginRoute = pathname === ADMIN_LOGIN_PATH;
  const isAdminApi = pathname.startsWith('/api/admin');
  const isAuthApi = pathname === '/api/admin/login' || pathname === '/api/admin/logout';

  if (isLoginRoute && hasToken) {
    const url = request.nextUrl.clone();
    url.pathname = ADMIN_ROOT_PATH;
    url.search = '';
    return NextResponse.redirect(url);
  }

  if ((isAdminRoute && !isLoginRoute) || (isAdminApi && !isAuthApi)) {
    if (!hasToken) {
      const url = request.nextUrl.clone();
      url.pathname = ADMIN_LOGIN_PATH;
      url.search = `?next=${encodeURIComponent(pathname + search)}`;
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
