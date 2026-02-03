import { NextRequest, NextResponse } from 'next/server';
import { validateTokenString } from '@/lib/auth/auth';
import { query } from '@/lib/mysql';
import { randomUUID } from 'crypto';

// Retry helper with exponential backoff
async function queryWithRetry(sql: string, maxRetries = 3) {
	for (let attempt = 1; attempt <= maxRetries; attempt++) {
		try {
			return await query(sql);
		} catch (err) {
			if (attempt === maxRetries) throw err;
			const delay = Math.min(1000 * Math.pow(2, attempt - 1), 5000); // Max 5s
			console.log(`[API/news] Retry ${attempt}/${maxRetries} after ${delay}ms`);
			await new Promise(resolve => setTimeout(resolve, delay));
		}
	}
}

// GET - Fetch news (public or admin)
export async function GET(request: NextRequest) {
	try {
		const header = request.headers.get('authorization');
		const cookieToken = request.cookies.get('cms_token')?.value;
		const token = header?.startsWith('Bearer ') ? header.substring(7) : cookieToken || null;
		const decoded = token ? validateTokenString(token) : null;

		// Follow HostGator schema: id, title, DATE (uppercase), image, images (json), description
		// Try to use display_order if it exists, fallback to DATE only
		let sql = 'SELECT id, title, `DATE`, image, images, description FROM news ORDER BY `DATE` DESC LIMIT 50';
		try {
			// Check if display_order column exists
			const checkCol = await queryWithRetry('SHOW COLUMNS FROM news LIKE "display_order"');
			if (checkCol && checkCol.length > 0) {
				sql = 'SELECT id, title, `DATE`, image, images, description, display_order FROM news ORDER BY display_order DESC, `DATE` DESC LIMIT 50';
			}
		} catch (err) {
			console.log('[API/news GET] Could not check for display_order column, using fallback query');
		}
		console.log('[API/news GET] Executing SQL');
		
		let rows: any;
		try {
			rows = await queryWithRetry(sql);
		} catch (dbErr) {
			console.error('[API/news GET] Database error after retries:', dbErr instanceof Error ? dbErr.message : String(dbErr));
			return NextResponse.json({ error: 'Database error', details: String(dbErr) }, { status: 500 });
		}
		
		console.log('[API/news GET] Rows returned:', rows?.length || 0);

		const news = (rows || []).map((r: any) => {
			let images: string[] = [];
			if (r.images) {
				if (Array.isArray(r.images)) {
					images = r.images;
				} else if (typeof r.images === 'string' && r.images.trim()) {
					try {
						const parsed = JSON.parse(r.images);
						images = Array.isArray(parsed) ? parsed : [];
					} catch {
						images = [];
					}
				}
			}

			return {
				id: r.id,
				title: r.title,
				date: r.DATE || null,
				image: r.image || null,
				images,
				description: r.description || null,
			};
		});

		console.log('[API/news GET] Returning:', news.length, 'items');
		return NextResponse.json({ news });
	} catch (error) {
		console.error('[API/news GET] Outer error:', error);
		return NextResponse.json({ error: 'Failed to fetch news', details: String(error) }, { status: 500 });
	}
}

// POST - Create new news (requires auth)
export async function POST(request: NextRequest) {
	try {
		const header = request.headers.get('authorization');
		const cookieToken = request.cookies.get('cms_token')?.value;
		const token = header?.startsWith('Bearer ') ? header.substring(7) : cookieToken || null;
		const decoded = token ? validateTokenString(token) : null;
		if (!decoded) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

		const body = await request.json();
		const { title, description, images, date, image } = body;

		if (!title?.trim() || !description?.trim()) {
			return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
		}

		const id = randomUUID();
		const dateParam = date ? new Date(date) : null;

		// Get current max display_order and add 1 so new items appear first
		let displayOrder = 1;
		try {
			const maxResult = await query('SELECT MAX(display_order) as maxOrder FROM news');
			if (maxResult && maxResult[0] && maxResult[0].maxOrder) {
				displayOrder = maxResult[0].maxOrder + 1;
			}
		} catch (err) {
			console.log('[API/news POST] Could not get max display_order, using 1');
		}

		try {
			await query(
				'INSERT INTO news (id, title, `DATE`, image, images, description, display_order) VALUES (:id, :title, :DATE, :image, :images, :description, :displayOrder)',
				{ id, title, DATE: dateParam, image: image || '', images: JSON.stringify(images || []), description, displayOrder }
			);
		} catch (dbErr) {
			console.error('[API/news POST] Database error:', dbErr);
			return NextResponse.json({ error: 'Database error', details: String(dbErr) }, { status: 500 });
		}

		let created: any;
		try {
			const results = await query('SELECT id, title, `DATE`, image, images, description, display_order FROM news WHERE id = ?', [id]);
			created = results[0];
		} catch (dbErr) {
			console.error('[API/news POST] Failed to fetch created:', dbErr);
			created = null;
		}

		let createdImages: string[] = [];
		if (created?.images) {
			if (Array.isArray(created.images)) {
				createdImages = created.images;
			} else if (typeof created.images === 'string' && created.images.trim()) {
				try {
					const parsed = JSON.parse(created.images);
					createdImages = Array.isArray(parsed) ? parsed : [];
				} catch {
					createdImages = [];
				}
			}
		}

		const createdRow = created
			? {
				id: created.id,
				title: created.title,
				date: created.DATE || null,
				image: created.image || null,
				images: createdImages,
				description: created.description || null,
			}
			: null;

		return NextResponse.json({ news: [createdRow] }, { status: 201 });
	} catch (error) {
		console.error('[API/news POST] Error:', error);
		return NextResponse.json({ error: 'Failed to create news', details: String(error) }, { status: 500 });
	}
}


