import { NextRequest, NextResponse } from 'next/server';
import { generateToken } from '@/lib/auth/auth';

const ADMIN_USERNAME = process.env.CMS_ADMIN_USERNAME || 'hainescitydental123';
const ADMIN_PASSWORD = process.env.CMS_ADMIN_PASSWORD || 'hainescitydental123';
const AUTH_COOKIE = 'cms_auth';

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const token = generateToken(username, '24h');
    const response = NextResponse.json({ success: true });
    // store JWT in an httpOnly cookie for server-side protection
    response.cookies.set('cms_token', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 12, // 12 hours
    });
    return response;
  }

  return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
}
