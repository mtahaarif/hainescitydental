import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { NextRequest, NextResponse } from 'next/server';
import { validateTokenString } from '@/lib/auth/auth';

/**
 * Image upload endpoint using Vercel Blob client-side uploads.
 * The browser uploads directly to Vercel Blob storage after obtaining
 * a short-lived token from this route.
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = (await request.json()) as HandleUploadBody;

    const jsonResponse = await handleUpload({
      body,
      request,
      token: process.env.BLOB_READ_WRITE_TOKEN,
      onBeforeGenerateToken: async () => {
        // Verify admin authentication before issuing an upload token
        const cookieToken = request.cookies.get('cms_token')?.value;
        if (!cookieToken || !validateTokenString(cookieToken)) {
          throw new Error('Unauthorized');
        }
        return {
          allowedContentTypes: [
            'image/jpeg',
            'image/png',
            'image/gif',
            'image/webp',
            'image/svg+xml',
          ],
          maximumSizeInBytes: 10 * 1024 * 1024, // 10 MB
        };
      },
      onUploadCompleted: async ({ blob }) => {
        console.log('[Upload] Completed:', blob.url);
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    console.error('[Upload] Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Upload failed' },
      { status: 400 },
    );
  }
}
