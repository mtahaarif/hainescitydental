import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth/auth';
import { query } from '@/lib/mysql';


// GET - Fetch single news by ID
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const rows: any = await query('SELECT * FROM news WHERE id = ?', [params.id]);
    const news = rows[0];
    if (!news) return NextResponse.json({ error: 'Not found' }, { status: 404 });
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
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const token = authHeader.substring(7);
    const decoded = verifyToken(token);
    if (!decoded) return NextResponse.json({ error: 'Invalid token' }, { status: 401 });

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
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const token = authHeader.substring(7);
    const decoded = verifyToken(token);
    if (!decoded) return NextResponse.json({ error: 'Invalid token' }, { status: 401 });

    await query('DELETE FROM news WHERE id = ?', [params.id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('News delete error:', error);
    return NextResponse.json({ error: 'Failed to delete news' }, { status: 500 });
  }
}
