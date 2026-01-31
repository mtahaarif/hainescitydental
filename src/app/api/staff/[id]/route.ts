import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth/auth';
import { query } from '@/lib/mysql';


// GET - Fetch single staff by ID
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const rows: any = await query('SELECT * FROM staff WHERE id = ?', [params.id]);
    const staff = rows[0];
    if (!staff) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(staff);
  } catch (error) {
    console.error('Staff fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch staff' }, { status: 500 });
  }
}

// PUT - Update staff (requires auth)
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const token = authHeader.substring(7);
    const decoded = verifyToken(token);
    if (!decoded) return NextResponse.json({ error: 'Invalid token' }, { status: 401 });

    const body = await request.json();
    const { name, role, bio, image, department, experience, order, active } = body;

    await query(
      `UPDATE staff SET name = :name, role = :role, bio = :bio, image = :image, department = :department,
       experience = :experience, \`order\` = :order, active = :active, updatedAt = :updatedAt WHERE id = :id`,
      {
        id: params.id,
        name,
        role,
        bio,
        image,
        department,
        experience,
        order,
        active: active ? 1 : 0,
        updatedAt: new Date(),
      }
    );

    const [updated] = (await query('SELECT * FROM staff WHERE id = ?', [params.id])) as any;
    return NextResponse.json(updated);
  } catch (error) {
    console.error('Staff update error:', error);
    return NextResponse.json({ error: 'Failed to update staff' }, { status: 500 });
  }
}

// DELETE - Delete staff (requires auth)
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const token = authHeader.substring(7);
    const decoded = verifyToken(token);
    if (!decoded) return NextResponse.json({ error: 'Invalid token' }, { status: 401 });

    await query('DELETE FROM staff WHERE id = ?', [params.id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Staff delete error:', error);
    return NextResponse.json({ error: 'Failed to delete staff' }, { status: 500 });
  }
}
