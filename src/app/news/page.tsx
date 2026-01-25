/*
  This page now embeds the external News page HTML from the production site.
  It performs a server-side fetch and injects the returned HTML into the page.
  This keeps the News content identical to the external site; assets and styles
  are served by the fetched HTML unless rewritten locally.
*/

export const revalidate = 3600;

function stripScripts(text: string) {
  return text.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '');
}

function stripTags(text: string, tagName: string) {
  const re = new RegExp(`<${tagName}[^>]*>|</${tagName}>`, 'gi');
  return text.replace(re, '');
}

export default async function NewsPage() {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);

    const res = await fetch('https://www.hainescitydental.com/news/', {
      cache: 'no-store',
      signal: controller.signal,
      headers: { 'User-Agent': 'HainesCityDentalDev/1.0 (+local)' },
    });
    clearTimeout(timeout);

    if (!res.ok) {
      return (
        <div className="min-h-screen flex items-center justify-center p-8">
          <div className="max-w-2xl text-center">
            <h1 className="text-2xl font-semibold mb-4">News temporarily unavailable</h1>
            <p className="text-gray-600 mb-4">The external news feed could not be loaded (status {res.status}).</p>
            <a className="text-dental-blue-600 underline" href="https://www.hainescitydental.com/news/" target="_blank" rel="noreferrer">Open the news on the live site</a>
          </div>
        </div>
      );
    }

    let html = await res.text();

    // Prefer the main content if present
    const mainMatch = html.match(/<main[\s\S]*?>[\s\S]*?<\/main>/i);
    if (mainMatch) {
      html = mainMatch[0];
    } else {
      // fallback to container with id or class commonly used
      const contentMatch = html.match(/<div[^>]+(?:id|class)=["'](?:content|primary|main|site-content)["'][\s\S]*?>[\s\S]*?<\/div>/i);
      if (contentMatch) html = contentMatch[0];
    }

    // Remove scripts for safety and strip outer html/head/body tags
    html = stripScripts(html);
    html = html.replace(/<\/?(?:html|head|body)[^>]*>/gi, '');

    return (
      <div className="min-h-screen">
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    );
  } catch (err: any) {
    const msg = err?.name === 'AbortError' ? 'timed out' : err?.message || String(err);
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="max-w-2xl text-center">
          <h1 className="text-2xl font-semibold mb-4">News temporarily unavailable</h1>
          <p className="text-gray-600 mb-4">Failed to load external news feed: {msg}</p>
          <a className="text-dental-blue-600 underline" href="https://www.hainescitydental.com/news/" target="_blank" rel="noreferrer">Open the news on the live site</a>
        </div>
      </div>
    );
  }
}
