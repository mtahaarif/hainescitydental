/**
 * Image management utilities for admin forms.
 * Handles upload, parsing, and validation of images.
 */

export async function uploadImage(file: File): Promise<string> {
  // Send raw file bytes in the request body and pass filename in query
  const filename = encodeURIComponent(file.name || `upload-${Date.now()}`);

  const response = await fetch(`/api/upload?filename=${filename}`, {
    method: 'POST',
    // Use the File object directly as the body (raw bytes)
    body: file,
    // Set content-type to the file's MIME type when available
    headers: {
      'Content-Type': file.type || 'application/octet-stream',
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Upload failed');
  }

  const data = await response.json();
  return data.url;
}

export function parseImagesArray(input: string | string[] | null): string[] {
  if (!input) return [];
  
  if (Array.isArray(input)) {
    return input.filter(url => typeof url === 'string' && url.trim());
  }

  if (typeof input === 'string') {
    // Try parsing as JSON array
    if (input.trim().startsWith('[')) {
      try {
        const parsed = JSON.parse(input);
        if (Array.isArray(parsed)) {
          return parsed.filter(url => typeof url === 'string' && url.trim());
        }
      } catch {
        // Fall through to line-separated parsing
      }
    }

    // Parse as newline or comma separated URLs
    return input
      .split(/[\n,]/)
      .map(url => url.trim())
      .filter(url => url.length > 0);
  }

  return [];
}

export async function triggerRevalidation(paths: string[] = [], tags: string[] = []) {
  try {
    const response = await fetch('/api/revalidate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ paths, tags }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('[Revalidate] Error:', error);
      return false;
    }

    console.log('[Revalidate] Success');
    return true;
  } catch (error) {
    console.error('[Revalidate] Failed:', error);
    return false;
  }
}
