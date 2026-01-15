import { prisma } from '@/lib/prisma';
import { generateToken, verifyAdminCredentials } from '@/lib/auth/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, username, password } = body;

    if (!action || !username || !password) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (action === 'login') {
      const isValid = await verifyAdminCredentials(username, password);

      if (!isValid) {
        return NextResponse.json(
          { error: 'Invalid username or password' },
          { status: 401 }
        );
      }

      const token = generateToken(username);
      return NextResponse.json({ success: true, token });
    }

    if (action === 'verify') {
      // Token is verified by middleware in protected routes
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
