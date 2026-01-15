import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb/connection';
import { Staff } from '@/lib/mongodb/models/Staff';
import { verifyToken } from '@/lib/auth/auth';

export async function GET(request: NextRequest) {
  await connectDB();

  try {
    const staff = await Staff.find({ active: true }).sort({ order: 1 });
    return NextResponse.json(staff, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch staff' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  await connectDB();

  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { name, role, bio, image, experience, department } = await request.json();

    if (!name || !role || !bio || !image || !department) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const staff = new Staff({
      name,
      role,
      bio,
      image,
      experience: experience || 0,
      department,
      active: true,
      order: 0,
    });

    await staff.save();
    return NextResponse.json(staff, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create staff' }, { status: 500 });
  }
}
