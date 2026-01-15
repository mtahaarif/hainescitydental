import { verifyToken } from './auth';
import { NextRequest, NextResponse } from 'next/server';

export function withAuth(handler: Function) {
  return async (request: NextRequest, context: any) => {
    const authHeader = request.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized: Missing or invalid token' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);

    if (!decoded) {
      return NextResponse.json(
        { error: 'Unauthorized: Invalid or expired token' },
        { status: 401 }
      );
    }

    return handler(request, context, decoded);
  };
}
