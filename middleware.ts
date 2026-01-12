import { NextResponse, type NextRequest } from 'next/server';

const AUTH_COOKIE = 'cms_auth';

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const isLogin = pathname.startsWith('/admin/login');
  const isAuthApi = pathname.startsWith('/api/admin');
  const isAuthed = request.cookies.get(AUTH_COOKIE)?.value === 'true';

  if (isAuthApi) {
    return NextResponse.next();
  }

  if (isLogin) {
    if (isAuthed) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
    return NextResponse.next();
  }

  if (!isAuthed) {
    const loginUrl = new URL('/admin/login', request.url);
    if (pathname) {
      loginUrl.searchParams.set('next', `${pathname}${search}`);
    }
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
