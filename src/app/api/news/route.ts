import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth/auth';
import { query } from '@/lib/mysql';
import { randomUUID } from 'crypto';

// GET - Fetch all published news
export async function GET(request: NextRequest) {
  try {
    const rows: any = await query(
      `SELECT id, title, category, description, content, images, date, slug, published, createdAt, updatedAt
       FROM news WHERE published = 1 ORDER BY date DESC LIMIT 50`
    );

    // parse JSON columns
    const news = rows.map((r: any) => ({
      ...r,
      images: r.images ? JSON.parse(r.images) : [],
    }));

    return NextResponse.json(news);
  } catch (error) {
    console.error('News fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
  }
}

// POST - Create new news (requires auth)
export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const body = await request.json();
    const { title, category, description, content: bodyContent, images, date, published } = body;

    if (!title?.trim() || !category || !description?.trim() || !bodyContent?.trim()) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
    const id = randomUUID();
    const createdAt = new Date();
    const updatedAt = createdAt;

    await query(
      `INSERT INTO news (id, title, category, description, content, images, date, slug, published, createdAt, updatedAt)
       VALUES (:id, :title, :category, :description, :content, :images, :date, :slug, :published, :createdAt, :updatedAt)`,
      {
        id,
        title,
        category,
        description,
        content: bodyContent,
        images: JSON.stringify(images || []),
        date: date ? new Date(date) : createdAt,
        slug,
        published: published ? 1 : 0,
        createdAt,
        updatedAt,
      }
    );

    const [created] = (await query('SELECT * FROM news WHERE id = ?', [id])) as any;
    if (created) created.images = created.images ? JSON.parse(created.images) : [];

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error('News create error:', error);
    return NextResponse.json({ error: 'Failed to create news' }, { status: 500 });
  }
}
