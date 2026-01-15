import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb/connection';
import { News } from '@/lib/mongodb/models/News';
import { verifyToken } from '@/lib/auth/auth';

// GET all news or single news
export async function GET(request: NextRequest, { params }: { params: { id?: string } }) {
  await connectDB();

  try {
    const { searchParams } = new URL(request.url);
    const id = params.id || searchParams.get('id');

    if (id) {
      const news = await News.findById(id);
      if (!news) {
        return NextResponse.json({ error: 'News not found' }, { status: 404 });
      }
      return NextResponse.json(news, { status: 200 });
    }

    // Get all published news or all news for admin
    const query = { published: true };
    const allNews = await News.find(query).sort({ date: -1 });

    return NextResponse.json(allNews, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
  }
}

// POST - Create new news (admin only)
export async function POST(request: NextRequest) {
  await connectDB();

  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { title, category, description, content, images, published } = await request.json();

    // Validate required fields
    if (!title || !category || !description || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Generate slug
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

    const news = new News({
      title,
      category,
      description,
      content,
      images: images || [],
      published: published || false,
      slug,
      date: new Date(),
    });

    await news.save();

    return NextResponse.json(news, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create news' }, { status: 500 });
  }
}

// PUT - Update news (admin only)
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();

  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    const { title, category, description, content, images, published } = await request.json();

    const news = await News.findByIdAndUpdate(
      id,
      {
        title,
        category,
        description,
        content,
        images,
        published,
      },
      { new: true }
    );

    if (!news) {
      return NextResponse.json({ error: 'News not found' }, { status: 404 });
    }

    return NextResponse.json(news, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update news' }, { status: 500 });
  }
}

// DELETE - Delete news (admin only)
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();

  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;

    const news = await News.findByIdAndDelete(id);

    if (!news) {
      return NextResponse.json({ error: 'News not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'News deleted' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete news' }, { status: 500 });
  }
}
