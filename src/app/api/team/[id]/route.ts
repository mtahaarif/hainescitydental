import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/mysql';
import { validateTokenString } from '@/lib/auth/auth';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const rows: any = await query('SELECT id, name, role, bio, image_url, created_at FROM team_members WHERE id = ?', [params.id]);
    const item = rows[0];
    if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(item);
  } catch (err) {
    console.error('Team fetch error', err);
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const header = request.headers.get('authorization');
    const cookieToken = request.cookies.get('cms_token')?.value;
    const token = header?.startsWith('Bearer ') ? header.substring(7) : cookieToken || null;
    const decoded = token ? validateTokenString(token) : null;
    if (!decoded) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const { name, role, bio, image_url } = body;
    await query(
      'UPDATE team_members SET name = :name, role = :role, bio = :bio, image_url = :image_url WHERE id = :id',
      { id: params.id, name, role, bio: bio || '', image_url: image_url || '' }
    );
    const [updated] = await query('SELECT id, name, role, bio, image_url, created_at FROM team_members WHERE id = ?', [params.id]);
    return NextResponse.json(updated);
  } catch (err) {
    console.error('Team update error', err);
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const header = request.headers.get('authorization');
    const cookieToken = request.cookies.get('cms_token')?.value;
    const token = header?.startsWith('Bearer ') ? header.substring(7) : cookieToken || null;
    const decoded = token ? validateTokenString(token) : null;
    if (!decoded) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await query('DELETE FROM team_members WHERE id = ?', [params.id]);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Team delete error', err);
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
