import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb/connection';
import { verifyAdminCredentials, generateToken, verifyToken } from '@/lib/auth/auth';

export async function POST(request: NextRequest) {
  await connectDB();

  const { action } = await request.json();

  if (action === 'login') {
    const { username, password } = await request.json();

    // Verify credentials
    const isValid = await verifyAdminCredentials(username, password);

    if (!isValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = generateToken(username);

    return NextResponse.json({ token, username }, { status: 200 });
  }

  if (action === 'verify') {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json({ error: 'No token' }, { status: 401 });
    }

    const decoded = verifyToken(token);

    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    return NextResponse.json({ valid: true, username: decoded.username }, { status: 200 });
  }

  return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
}
