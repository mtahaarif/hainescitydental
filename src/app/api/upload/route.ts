import { NextRequest, NextResponse } from 'next/server';
import { validateTokenString } from '@/lib/auth/auth';
import { put } from '@vercel/blob';

/**
 * Image upload endpoint using Vercel Blob storage.
 * Expects: POST /api/upload?filename=yourfile.jpg with raw body as the file bytes.
 * Returns: { url: string } (frontend expects a JSON object with `url`)
 */
export async function POST(request: NextRequest) {
  try {
    // Verify admin token
    const cookieToken = request.cookies.get('cms_token')?.value;
    if (!cookieToken || !validateTokenString(cookieToken)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Filename provided via query param
    const filename = request.nextUrl.searchParams.get('filename') || `upload-${Date.now()}`;

    const token = process.env.BLOB_READ_WRITE_TOKEN;
    if (!token) {
      console.error('[Upload] BLOB_READ_WRITE_TOKEN not configured');
      return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });
    }

    // Read raw request body as bytes
    const arrayBuffer = await request.arrayBuffer();
    const bytes = new Uint8Array(arrayBuffer);

    // Upload to Vercel Blob
    // Note: pass the token explicitly so the library can authenticate
    // @ts-ignore - library types may be loose
    const blob = await put(filename, bytes, { access: 'public', token });

    // blob usually contains a url/publicUrl property; normalize response to { url }
    const blobAny: any = blob;
    const url = blobAny?.url ?? blobAny?.publicUrl ?? blobAny?.blobUrl ?? null;

    if (!url) {
      console.warn('[Upload] Unexpected blob response:', blob);
      // Return the raw blob object as a fallback (stringified)
      return NextResponse.json({ url: typeof blob === 'string' ? blob : JSON.stringify(blob) }, { status: 200 });
    }

    return NextResponse.json({ url }, { status: 200 });
  } catch (error) {
    console.error('[Upload] Error uploading to Vercel Blob:', error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}
