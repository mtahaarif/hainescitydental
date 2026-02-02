import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/mysql';
import { validateTokenString } from '@/lib/auth/auth';
import { randomUUID } from 'crypto';

// GET - fetch public team members
export async function GET() {
  try {
    // Try to use display_order if it exists, fallback to department/name only
    let sql = 'SELECT id, `NAME`, role, bio, department, image FROM staff ORDER BY department, `NAME`';
    try {
      // Check if display_order column exists
      const checkCol = await query('SHOW COLUMNS FROM staff LIKE "display_order"');
      if (checkCol && checkCol.length > 0) {
        sql = 'SELECT id, `NAME`, role, bio, department, image, display_order FROM staff ORDER BY display_order DESC, department, `NAME`';
      }
    } catch (err) {
      console.log('[API/team GET] Could not check for display_order column, using fallback query');
    }
    console.log('[API/team GET] Executing SQL');
    
    let rows: any;
    try {
      rows = await query(sql);
    } catch (dbErr) {
      console.error('[API/team GET] Database error:', dbErr instanceof Error ? dbErr.message : String(dbErr));
      return NextResponse.json({ error: 'Database error', details: String(dbErr) }, { status: 500 });
    }
    
    console.log('[API/team GET] Rows returned:', rows?.length || 0);

    // Normalize DB column names to friendly JSON keys
    const team = (rows || []).map((r: any) => ({
      id: r.id,
      name: r.NAME,
      role: r.role,
      bio: r.bio,
      department: r.department,
      image: r.image,
    }));

    console.log('[API/team GET] Returning:', team.length, 'items');
    return NextResponse.json({ team });
  } catch (err) {
    console.error('[API/team GET] Outer error:', err);
    return NextResponse.json({ error: 'Failed to fetch team', details: String(err) }, { status: 500 });
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
    const { name, role, bio, image, department } = body;
    if (!name || !role) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });

    const id = randomUUID();
    
    // Get current max display_order and add 1 so new items appear first
    let displayOrder = 1;
    try {
      const maxResult = await query('SELECT MAX(display_order) as maxOrder FROM staff');
      if (maxResult && maxResult[0] && maxResult[0].maxOrder) {
        displayOrder = maxResult[0].maxOrder + 1;
      }
    } catch (err) {
      console.log('[API/team POST] Could not get max display_order, using 1');
    }

    try {
      await query(
        'INSERT INTO staff (id, `NAME`, role, bio, department, image, display_order) VALUES (:id, :NAME, :role, :bio, :department, :image, :displayOrder)',
        { id, NAME: name, role, bio: bio || '', department: department || '', image: image || '', displayOrder }
      );
    } catch (dbErr) {
      console.error('[API/team POST] Database error:', dbErr);
      return NextResponse.json({ error: 'Database error', details: String(dbErr) }, { status: 500 });
    }

    let created: any;
    try {
      const results = await query('SELECT id, `NAME`, role, bio, department, image, display_order FROM staff WHERE id = ?', [id]);
      created = results[0];
    } catch (dbErr) {
      console.error('[API/team POST] Failed to fetch created:', dbErr);
      created = null;
    }

    const createdRow = created
      ? {
          id: created.id,
          name: created.NAME,
          role: created.role,
          bio: created.bio,
          department: created.department,
          image: created.image,
        }
      : null;
    
    return NextResponse.json({ team: [createdRow] }, { status: 201 });
  } catch (err) {
    console.error('[API/team POST] Error:', err);
    return NextResponse.json({ error: 'Failed to create', details: String(err) }, { status: 500 });
  }
}
