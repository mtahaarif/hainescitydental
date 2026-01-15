import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth/auth';

// GET - Fetch all active team members sorted by order
export async function GET(request: NextRequest) {
  try {
    const team = await prisma.team.findMany({
      where: { active: true },
      orderBy: { order: 'asc' },
    });
    return NextResponse.json(team);
  } catch (error) {
    console.error('Team fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch team' },
      { status: 500 }
    );
  }
}

// POST - Create new team member (requires auth)
export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const body = await request.json();
    const { name, position, bio, image, order, active } = body;

    if (!name?.trim() || !position?.trim() || !bio?.trim()) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const team = await prisma.team.create({
      data: {
        name,
        position,
        bio,
        image,
        order: order || 0,
        active: active ?? true,
      },
    });

    return NextResponse.json(team, { status: 201 });
  } catch (error) {
    console.error('Team create error:', error);
    return NextResponse.json(
      { error: 'Failed to create team member' },
      { status: 500 }
    );
  }
}
