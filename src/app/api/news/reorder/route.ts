import { NextRequest, NextResponse } from 'next/server';
import { validateTokenString } from '@/lib/auth/auth';
import { query } from '@/lib/mysql';

// POST - Reorder news items
export async function POST(request: NextRequest) {
  try {
    const header = request.headers.get('authorization');
    const cookieToken = request.cookies.get('cms_token')?.value;
    const token = header?.startsWith('Bearer ') ? header.substring(7) : cookieToken || null;
    const decoded = token ? validateTokenString(token) : null;
    if (!decoded) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const { orderedIds } = body; // Array of IDs in desired order [id1, id2, id3...]

    if (!Array.isArray(orderedIds)) {
      return NextResponse.json({ error: 'orderedIds must be an array' }, { status: 400 });
    }

    console.log('[API/news/reorder] Reordering news items:', orderedIds);

    // Update display_order for each item
    // Higher display_order = appears first
    const displayOrderStart = 10000; // Start from high number
    for (let i = 0; i < orderedIds.length; i++) {
      const id = orderedIds[i];
      const displayOrder = displayOrderStart - i; // First item gets highest order
      console.log(`[API/news/reorder] Setting ${id} to display_order ${displayOrder}`);
      const updateSql = `UPDATE news SET display_order = ${displayOrder} WHERE id = '${id}'`;
      await query(updateSql);
    }

    console.log('[API/news/reorder] Successfully reordered items');

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[API/news/reorder] Error:', err);
    return NextResponse.json({ 
      error: 'Failed to reorder news', 
      details: String(err) 
    }, { status: 500 });
  }
}
