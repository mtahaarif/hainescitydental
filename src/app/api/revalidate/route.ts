import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { validateTokenString } from '@/lib/auth/auth';

/**
 * Revalidation endpoint to refresh ISR cache for public pages.
 * Called after CRUD operations in admin to ensure public pages show latest data.
 */
export async function POST(request: NextRequest) {
	try {
		const body = await request.json().catch(() => ({}));
		const { paths, tags } = body;

		// Verify admin token
		const cookieToken = request.cookies.get('cms_token')?.value;
		if (!cookieToken || !validateTokenString(cookieToken)) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		// Revalidate specific paths
		if (paths && Array.isArray(paths)) {
			for (const path of paths) {
				try {
					revalidatePath(path);
					console.log(`[Revalidate] Path: ${path}`);
				} catch (e) {
					console.error(`[Revalidate] Failed for path ${path}:`, e);
				}
			}
		}

		// Revalidate specific tags
		if (tags && Array.isArray(tags)) {
			for (const tag of tags) {
				try {
					revalidateTag(tag);
					console.log(`[Revalidate] Tag: ${tag}`);
				} catch (e) {
					console.error(`[Revalidate] Failed for tag ${tag}:`, e);
				}
			}
		}

		return NextResponse.json({ 
			success: true, 
			message: 'Revalidation triggered',
			paths: paths || [],
			tags: tags || []
		});
	} catch (error) {
		console.error('[Revalidate] Error:', error);
		return NextResponse.json({ 
			error: 'Revalidation failed',
			details: error instanceof Error ? error.message : String(error)
		}, { status: 500 });
	}
}
