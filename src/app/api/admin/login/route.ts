import { NextRequest, NextResponse } from 'next/server';
import { generateToken } from '@/lib/auth/auth';

const ADMIN_USERNAME = process.env.CMS_ADMIN_USERNAME || '';
const ADMIN_PASSWORD = process.env.CMS_ADMIN_PASSWORD || '';

// Validate credentials are set
if (!ADMIN_USERNAME || !ADMIN_PASSWORD) {
  console.warn('⚠️ Admin credentials not configured in environment variables');
}

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    // Validate inputs are provided
    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: 'Username and password are required' },
        { status: 400 }
      );
    }

    // Validate credentials
    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      // Log failed attempt (without exposing password)
      console.warn(`[Auth] Failed login attempt for username: ${username}`);
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Generate token
    const token = generateToken(username, '24h');
    const response = NextResponse.json({ success: true });
    
    // Store JWT in httpOnly cookie for server-side protection
    response.cookies.set('cms_token', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24, // 24 hours
    });
    
    console.log(`[Auth] Successful login for username: ${username}`);
    return response;
  } catch (error) {
    console.error('[Auth] Login error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
