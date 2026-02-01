import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/mysql';
import { validateTokenString } from '@/lib/auth/auth';
import { randomUUID } from 'crypto';

// GET - fetch public team members
export async function GET() {
  try {
    const rows: any = await query('SELECT id, name, role, bio, image_url, created_at FROM team_members ORDER BY created_at DESC');
    return NextResponse.json(rows);
  } catch (err) {
    console.error('Team fetch error', err);
    return NextResponse.json({ error: 'Failed to fetch team' }, { status: 500 });
  }
}

// POST - create team member (admin)
export async function POST(request: NextRequest) {
  try {
    const header = request.headers.get('authorization');
    const cookieToken = request.cookies.get('cms_token')?.value;
    const token = header?.startsWith('Bearer ') ? header.substring(7) : cookieToken || null;
    const decoded = token ? validateTokenString(token) : null;
    if (!decoded) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const { name, role, bio, image_url } = body;
    if (!name || !role) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });

    const id = randomUUID();
    const created_at = new Date();
    await query(
      'INSERT INTO team_members (id, name, role, bio, image_url, created_at) VALUES (:id, :name, :role, :bio, :image_url, :created_at)',
      { id, name, role, bio: bio || '', image_url: image_url || '', created_at }
    );

    const [created] = await query('SELECT id, name, role, bio, image_url, created_at FROM team_members WHERE id = ?', [id]);
    return NextResponse.json(created, { status: 201 });
  } catch (err) {
    console.error('Team create error', err);
    return NextResponse.json({ error: 'Failed to create' }, { status: 500 });
  }
}
