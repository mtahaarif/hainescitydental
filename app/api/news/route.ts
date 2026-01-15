import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth/auth';

// GET - Fetch all published news
export async function GET(request: NextRequest) {
  try {
    const news = await prisma.news.findMany({
      where: { published: true },
      orderBy: { date: 'desc' },
      take: 50,
    });
    return NextResponse.json(news);
  } catch (error) {
    console.error('News fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch news' },
      { status: 500 }
    );
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
    const { title, category, description, content, images, date, published } = body;

    if (!title?.trim() || !category || !description?.trim() || !content?.trim()) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
    const news = await prisma.news.create({
      data: {
        title,
        category,
        description,
        content,
        images: images || [],
        date: date ? new Date(date) : new Date(),
        slug,
        published: published || false,
      },
    });

    return NextResponse.json(news, { status: 201 });
  } catch (error) {
    console.error('News create error:', error);
    return NextResponse.json(
      { error: 'Failed to create news' },
      { status: 500 }
    );
  }
}
