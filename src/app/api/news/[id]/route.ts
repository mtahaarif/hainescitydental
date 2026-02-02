import { NextRequest, NextResponse } from 'next/server';
import { validateTokenString } from '@/lib/auth/auth';
import { query } from '@/lib/mysql';

function parseImages(value: any): string[] {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  if (typeof value === 'string' && value.trim()) {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  return [];
}

// GET - Fetch single news by ID
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const rows: any = await query('SELECT id, title, `DATE`, image, images, description FROM news WHERE id = ?', [params.id]);
    const news = rows[0];
    if (!news) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    return NextResponse.json({
      id: news.id,
      title: news.title,
      date: news.DATE || null,
      image: news.image || null,
      images: parseImages(news.images),
      description: news.description || null,
    });
  } catch (error) {
    console.error('News fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
  }
}

// PUT - Update news (requires auth)
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const header = request.headers.get('authorization');
    const cookieToken = request.cookies.get('cms_token')?.value;
    const token = header?.startsWith('Bearer ') ? header.substring(7) : cookieToken || null;
    const decoded = token ? validateTokenString(token) : null;
    if (!decoded) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const { title, description, images, date, image } = body;

    await query(
      'UPDATE news SET title = :title, `DATE` = :DATE, image = :image, images = :images, description = :description WHERE id = :id',
      {
        id: params.id,
        title,
        DATE: date ? new Date(date) : null,
        image: image || '',
        images: JSON.stringify(images || []),
        description: description || '',
      }
    );

    const [updated] = (await query('SELECT id, title, `DATE`, image, images, description FROM news WHERE id = ?', [params.id])) as any;
    if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    return NextResponse.json({
      id: updated.id,
      title: updated.title,
      date: updated.DATE || null,
      image: updated.image || null,
      images: parseImages(updated.images),
      description: updated.description || null,
    });
  } catch (error) {
    console.error('News update error:', error);
    return NextResponse.json({ error: 'Failed to update news' }, { status: 500 });
  }
}

// DELETE - Delete news (requires auth)
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const header = request.headers.get('authorization');
    const cookieToken = request.cookies.get('cms_token')?.value;
    const token = header?.startsWith('Bearer ') ? header.substring(7) : cookieToken || null;
    const decoded = token ? validateTokenString(token) : null;
    if (!decoded) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await query('DELETE FROM news WHERE id = ?', [params.id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('News delete error:', error);
    return NextResponse.json({ error: 'Failed to delete news' }, { status: 500 });
  }
}
