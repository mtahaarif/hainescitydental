import Image from 'next/image';
import fs from 'fs';
import path from 'path';
import { Calendar } from 'lucide-react';
import { getAllContent } from '@/lib/content';

const categoryConfig = {
  training: { label: 'Training' },
  community: { label: 'Community' },
  conference: { label: 'Conference' },
  mission: { label: 'Mission' },
};

interface NewsItem {
  slug: string;
  id: string;
  title: string;
  date: string;
  category: 'training' | 'community' | 'conference' | 'mission';
  images?: string[];
  description?: string;
  content?: string;
}

export default async function NewsPage() {
  // Prefer the generated `src/data/news.json` extracted from WordPress
  let sortedNews: NewsItem[] = [];
  try {
    const jsonPath = path.join(process.cwd(), 'src', 'data', 'news.json');
    if (fs.existsSync(jsonPath)) {
      const raw = fs.readFileSync(jsonPath, 'utf8');
      // Try strict JSON parse first; fall back to a tolerant extractor when the
      // JSON is malformed (some exported items contain unescaped double-quotes
      // inside the HTML fields which breaks JSON.parse).
      let parsed: any[] = [];
      try {
        parsed = JSON.parse(raw);
      } catch (parseErr) {
        // Fallback: extract top-level object text chunks from the array and
        // pull the fields we care about (id, title, date, image, images,
        // excerpt). We intentionally ignore the raw `html` field when it's
        // malformed — the `images` array is sufficient to rebuild the page.
        const objects: string[] = [];
        const text = raw;
        let inArray = false;
        let depth = 0;
        let start = -1;
        for (let i = 0; i < text.length; i++) {
          const ch = text[i];
          if (!inArray) {
            if (ch === '[') inArray = true;
            continue;
          }
          if (ch === '{') {
            if (depth === 0) start = i;
            depth++;
            continue;
          }
          if (ch === '}') {
            depth--;
            if (depth === 0 && start !== -1) {
              objects.push(text.substring(start, i + 1));
              start = -1;
            }
            continue;
          }
        }

        for (const objStr of objects) {
          const idMatch = objStr.match(/"id"\s*:\s*"((?:\\.|[^"\\])*)"/);
          const titleMatch = objStr.match(/"title"\s*:\s*"((?:\\.|[^"\\])*)"/);
          const dateMatch = objStr.match(/"date"\s*:\s*"((?:\\.|[^"\\])*)"/);
          const imageMatch = objStr.match(/"image"\s*:\s*"((?:\\.|[^"\\])*)"/);
          const excerptMatch = objStr.match(/"excerpt"\s*:\s*"((?:\\.|[^"\\])*)"/);
          const imagesMatch = objStr.match(/"images"\s*:\s*\[([^\]]*)\]/s);

          const imagesList: string[] = [];
          if (imagesMatch && imagesMatch[1]) {
            const g = imagesMatch[1].matchAll(/"([^\"]+)"/g);
            for (const m of g) {
              if (m && m[1]) imagesList.push(m[1]);
            }
          }

          parsed.push({
            id: idMatch ? idMatch[1] : undefined,
            title: titleMatch ? titleMatch[1] : (idMatch ? idMatch[1] : undefined),
            date: dateMatch ? dateMatch[1] : '',
            image: imageMatch ? imageMatch[1] : '',
            images: imagesList,
            excerpt: excerptMatch ? excerptMatch[1] : '',
            html: '',
          });
        }
      }

      // Map external shape to our NewsItem interface
      const parsedItems: NewsItem[] = parsed.map((it: any, idx: number) => {
        const images = it.images && it.images.length ? it.images : (it.image ? [it.image] : []);
        return {
          slug: it.slug || `news-${idx}`,
          id: it.id || it.slug || `news-${idx}`,
          title: it.title || it.name || `News ${idx + 1}`,
          date: it.date || it.post_date || '',
          category: (it.category && ['training','community','conference','mission'].includes(it.category)) ? it.category : 'community',
          images,
          description: it.excerpt || it.summary || '',
          content: it.html || it.content || '',
        } as NewsItem;
      });



      sortedNews = parsedItems;
    } else {
      // fallback to CMS loader if JSON not present
      const newsItems = (await getAllContent('news')) as NewsItem[];
      sortedNews = newsItems;
    }
  } catch (e) {
    // on error, fallback to content loader
    const newsItems = (await getAllContent('news')) as NewsItem[];
    sortedNews = newsItems;
  }

  // Sort by date if available (newest first)
  sortedNews = sortedNews.sort((a, b) => {
    const ta = a.date ? new Date(a.date).getTime() : 0;
    const tb = b.date ? new Date(b.date).getTime() : 0;
    return tb - ta;
  });
  
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="-mx-4 sm:mx-0 px-4 sm:px-0 bg-dental-blue-50/90 border border-dental-blue-100 sm:rounded-3xl rounded-none p-6 md:p-8 shadow-sm">

          <main>
            {/* Header */}
            <div className="mb-6 text-center">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                <span className="gradient-text">News</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Highlights from our doctors, team, and community service events.
              </p>
            </div>

            {/* News Grid */}
            <div className="space-y-8">
              {sortedNews.map((item, index) => {
                return (
                  <article
                    key={item.id}
                    className="glass-light p-6 sm:p-8 transition-all duration-300 hover:shadow-[0_0_40px_rgba(59,130,246,0.25)] hover:-translate-y-1"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div>
                          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{item.title}</h2>
                        </div>
                      </div>
                      {item.date && (
                        <div className="flex items-center gap-2 text-sm text-dental-blue-700">
                          <Calendar className="w-4 h-4" />
                          <span>{typeof item.date === 'string' ? item.date : new Date(item.date).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>

                    {item.description && (
                      <p className="text-gray-700 leading-relaxed mb-6">
                        {item.description}
                      </p>
                    )}

                    {item.content && (
                      <div
                        className="prose max-w-none mb-6"
                        dangerouslySetInnerHTML={{ __html: item.content }}
                      />
                    )}

                    {item.images && item.images.length > 0 && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {(() => {
                          const imgs: string[] = [];
                          const normalize = (s: string) => {
                            if (!s) return '';
                            if (/^https?:\/\//i.test(s)) return s;
                            if (s.startsWith('/')) {
                              const full = path.join(process.cwd(), 'public', s.replace(/^\//, ''));
                              if (fs.existsSync(full)) return s;
                              return '';
                            }
                            if (/\.(png|jpe?g|jpeg|webp)$/i.test(s)) {
                              const candidate = s.startsWith('news/') ? `/${s}` : `/${s}`;
                              const full = path.join(process.cwd(), 'public', candidate.replace(/^\//, ''));
                              if (fs.existsSync(full)) return candidate;
                              const alt = path.join(process.cwd(), 'public', 'news', path.basename(s));
                              if (fs.existsSync(alt)) return `/news/${path.basename(s)}`;
                            }

                            const baseName = s.includes('/') ? s.split('/').pop() as string : s;
                            const newsDir = path.join(process.cwd(), 'public', 'news');
                            try {
                              if (fs.existsSync(newsDir)) {
                                const files = fs.readdirSync(newsDir);
                                const match = files.find(f => f.toLowerCase().startsWith(baseName.toLowerCase()));
                                if (match) return `/news/${match}`;
                                const match2 = files.find(f => f.toLowerCase().includes(baseName.toLowerCase()));
                                if (match2) return `/news/${match2}`;
                              }
                            } catch (e) {
                              // ignore
                            }

                            return '';
                          };

                          for (const img of item.images) {
                            const src = normalize(img);
                            if (!src) continue;
                            // ensure file exists for local images
                            if (src.startsWith('/')) {
                              const full = path.join(process.cwd(), 'public', src.replace(/^\//, ''));
                              if (!fs.existsSync(full)) continue;
                            }
                            imgs.push(src);
                          }

                          return imgs.map((src) => (
                            <div
                              key={src}
                              className="rounded-2xl glass transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.25)] hover:scale-105"
                            >
                              <Image
                                src={src}
                                alt={item.title}
                                width={640}
                                height={480}
                                className="object-contain w-full h-auto rounded-2xl"
                                loading="lazy"
                                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                              />
                            </div>
                          ));
                        })()}
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}