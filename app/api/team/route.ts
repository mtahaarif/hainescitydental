import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb/connection';
import { Team } from '@/lib/mongodb/models/Team';
import { verifyToken } from '@/lib/auth/auth';

export async function GET(request: NextRequest) {
  await connectDB();

  try {
    const team = await Team.find({ active: true }).sort({ order: 1 });
    return NextResponse.json(team, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch team' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  await connectDB();

  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { name, position, bio, image } = await request.json();

    if (!name || !position || !bio || !image) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const team = new Team({
      name,
      position,
      bio,
      image,
      active: true,
      order: 0,
    });

    await team.save();
    return NextResponse.json(team, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create team member' }, { status: 500 });
  }
}
