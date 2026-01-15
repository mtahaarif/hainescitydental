import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb/connection';
import { Doctor } from '@/lib/mongodb/models/Doctor';
import { verifyToken } from '@/lib/auth/auth';

export async function GET(request: NextRequest) {
  await connectDB();

  try {
    const doctors = await Doctor.find({ active: true }).sort({ name: 1 });
    return NextResponse.json(doctors, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch doctors' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  await connectDB();

  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { name, credentials, bio, image, specializations, experience, education } = await request.json();

    if (!name || !credentials || !bio || !image || !education) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const doctor = new Doctor({
      name,
      credentials,
      bio,
      image,
      specializations: specializations || [],
      experience: experience || 0,
      education,
      active: true,
    });

    await doctor.save();
    return NextResponse.json(doctor, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create doctor' }, { status: 500 });
  }
}
