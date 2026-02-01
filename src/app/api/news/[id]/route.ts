import { NextRequest, NextResponse } from 'next/server';
import { validateTokenString } from '@/lib/auth/auth';
import { query } from '@/lib/mysql';


// GET - Fetch single news by ID
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const rows: any = await query('SELECT * FROM news WHERE id = ?', [params.id]);
    const news = rows[0];
    if (!news) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    // If not published, only return to admin
    const cookieToken = request.cookies.get('cms_token')?.value;
    const header = request.headers.get('authorization');
    const token = header?.startsWith('Bearer ') ? header.substring(7) : cookieToken || null;
    const decoded = token ? validateTokenString(token) : null;
    if (!decoded && Number(news.published) !== 1) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    news.images = news.images ? JSON.parse(news.images) : [];
    return NextResponse.json(news);
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
    const { title, category, description, content: bodyContent, images, date, published } = body;

    await query(
      `UPDATE news SET title = :title, category = :category, description = :description, content = :content,
       images = :images, date = :date, published = :published, updatedAt = :updatedAt WHERE id = :id`,
      {
        id: params.id,
        title,
        category,
        description,
        content: bodyContent,
        images: JSON.stringify(images || []),
        date: date ? new Date(date) : new Date(),
        published: published ? 1 : 0,
        updatedAt: new Date(),
      }
    );

    const [updated] = (await query('SELECT * FROM news WHERE id = ?', [params.id])) as any;
    if (updated) updated.images = updated.images ? JSON.parse(updated.images) : [];
    return NextResponse.json(updated);
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
