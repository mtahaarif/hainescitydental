/*
  This page now embeds the external News page HTML from the production site.
  It performs a server-side fetch and injects the returned HTML into the page.
  This keeps the News content identical to the external site; assets and styles
  are served by the fetched HTML unless rewritten locally.
*/

import NewsTicker from '@/components/NewsTicker';
import fs from 'fs/promises';
import path from 'path';

export const revalidate = 3600;

async function readLocalNews() {
  try {
    const p = path.resolve(process.cwd(), 'src', 'data', 'news.json');
    const txt = await fs.readFile(p, 'utf8');
    return JSON.parse(txt);
  } catch (err) {
    return [];
  }
}

export default async function NewsPage() {
  const news = await readLocalNews();

  return (
    <div className="min-h-screen pt-8 pb-16">
      {news && news.length > 0 && <NewsTicker items={news.slice(0, 20)} />}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <h1 className="text-3xl font-bold mb-6">News</h1>
        <div className="space-y-6">
          {news.length === 0 && (
            <p className="text-gray-600">No news available locally. Run <code>node scripts/import-news.js</code> to populate.</p>
          )}
          {news.map((it: any) => (
            <article key={it.id} className="glass-light p-4 rounded-xl">
              <h2 className="text-xl font-semibold">
                {it.href ? <a href={it.href} className="text-dental-blue-700 hover:underline">{it.title}</a> : it.title}
              </h2>
              {it.date && <div className="text-sm text-gray-500 mb-2">{it.date}</div>}
              {it.excerpt && <p className="text-gray-700">{it.excerpt}</p>}
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
