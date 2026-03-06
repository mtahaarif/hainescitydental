import { NextRequest, NextResponse } from 'next/server';
import { validateTokenString } from '@/lib/auth/auth';

export async function GET(request: NextRequest) {
  const token = request.cookies.get('cms_token')?.value;
  const decoded = token ? validateTokenString(token) : null;

  if (!decoded) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({ authenticated: true });
}
