import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth/auth';

// GET - Fetch all active doctors
export async function GET(request: NextRequest) {
  try {
    const doctors = await prisma.doctor.findMany({
      where: { active: true },
      orderBy: { name: 'asc' },
    });
    return NextResponse.json(doctors);
  } catch (error) {
    console.error('Doctors fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch doctors' },
      { status: 500 }
    );
  }
}

// POST - Create new doctor (requires auth)
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
    const { name, credentials, bio, image, specializations, experience, education, active } = body;

    if (!name?.trim() || !credentials?.trim() || !bio?.trim()) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const doctor = await prisma.doctor.create({
      data: {
        name,
        credentials,
        bio,
        image,
        specializations: specializations || [],
        experience: experience || 0,
        education,
        active: active ?? true,
      },
    });

    return NextResponse.json(doctor, { status: 201 });
  } catch (error) {
    console.error('Doctor create error:', error);
    return NextResponse.json(
      { error: 'Failed to create doctor' },
      { status: 500 }
    );
  }
}
