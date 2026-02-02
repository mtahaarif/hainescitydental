import { NextRequest, NextResponse } from 'next/server';
import { validateTokenString } from '@/lib/auth/auth';
import { query } from '@/lib/mysql';

// POST - Add display_order columns (admin only, one-time setup)
export async function POST(request: NextRequest) {
  try {
    const header = request.headers.get('authorization');
    const cookieToken = request.cookies.get('cms_token')?.value;
    const token = header?.startsWith('Bearer ') ? header.substring(7) : cookieToken || null;
    const decoded = token ? validateTokenString(token) : null;
    if (!decoded) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    console.log('[API/setup-order] Adding display_order columns...');

    // Add display_order column to news table
    try {
      await query('ALTER TABLE news ADD COLUMN display_order INT DEFAULT 0');
      console.log('[API/setup-order] Added display_order to news table');
    } catch (err: any) {
      // Column might already exist
      if (err.message && err.message.includes('Duplicate column name')) {
        console.log('[API/setup-order] display_order already exists in news table');
      } else {
        throw err;
      }
    }

    // Add display_order column to staff table
    try {
      await query('ALTER TABLE staff ADD COLUMN display_order INT DEFAULT 0');
      console.log('[API/setup-order] Added display_order to staff table');
    } catch (err: any) {
      // Column might already exist
      if (err.message && err.message.includes('Duplicate column name')) {
        console.log('[API/setup-order] display_order already exists in staff table');
      } else {
        throw err;
      }
    }

    // Initialize display_order values for existing records
    // Set them based on current ID order (higher ID = newer = higher display_order)
    await query('UPDATE news SET display_order = id WHERE display_order = 0');
    await query('UPDATE staff SET display_order = id WHERE display_order = 0');

    console.log('[API/setup-order] Initialized display_order values');

    return NextResponse.json({ 
      success: true, 
      message: 'Display order columns added and initialized successfully' 
    });
  } catch (err) {
    console.error('[API/setup-order] Error:', err);
    return NextResponse.json({ 
      error: 'Failed to setup display order', 
      details: String(err) 
    }, { status: 500 });
  }
}
