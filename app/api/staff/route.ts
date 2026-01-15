import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth/auth';

// GET - Fetch all active staff sorted by order
export async function GET(request: NextRequest) {
  try {
    const staff = await prisma.staff.findMany({
      where: { active: true },
      orderBy: { order: 'asc' },
    });
    return NextResponse.json(staff);
  } catch (error) {
    console.error('Staff fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch staff' },
      { status: 500 }
    );
  }
}

// POST - Create new staff (requires auth)
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
    const { name, role, bio, image, department, experience, order, active } = body;

    if (!name?.trim() || !role?.trim() || !bio?.trim()) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const staff = await prisma.staff.create({
      data: {
        name,
        role,
        bio,
        image,
        department,
        experience: experience || 0,
        order: order || 0,
        active: active ?? true,
      },
    });

    return NextResponse.json(staff, { status: 201 });
  } catch (error) {
    console.error('Staff create error:', error);
    return NextResponse.json(
      { error: 'Failed to create staff' },
      { status: 500 }
    );
  }
}
