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
      const parsed = JSON.parse(raw);
      // Map external shape to our NewsItem interface
      sortedNews = parsed.map((it: any, idx: number) => {
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
    <div className="min-h-screen pt-8 pb-16">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          News & <span className="gradient-text">Community</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Highlights from our doctors, team, and community service events.
        </p>
      </div>

      {/* News Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {sortedNews.map((item, index) => {
          // no icons — we only display the category label
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

              {item.images && item.images.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {item.images.map((img) => {
                    // normalize image string to a usable src and try to resolve existing files under public/news
                    const normalize = (s: string) => {
                      if (!s) return '';
                      if (s.startsWith('/')) {
                        // verify exists
                        const full = path.join(process.cwd(), 'public', s.replace(/^\//, ''));
                        if (fs.existsSync(full)) return s;
                      }
                      if (/^https?:\/\//i.test(s)) return s;
                      // if includes extension and file exists under public/news or public
                      if (/\.(png|jpe?g|webp)$/i.test(s)) {
                        const candidate = s.startsWith('news/') ? `/${s}` : `/${s}`;
                        const full = path.join(process.cwd(), 'public', candidate.replace(/^\//, ''));
                        if (fs.existsSync(full)) return candidate;
                        // try news/ prefix
                        const alt = path.join(process.cwd(), 'public', 'news', path.basename(s));
                        if (fs.existsSync(alt)) return `/news/${path.basename(s)}`;
                      }

                      // no extension: look for files in public/news that match the base name
                      const baseName = s.includes('/') ? s.split('/').pop() as string : s;
                      const newsDir = path.join(process.cwd(), 'public', 'news');
                      try {
                        if (fs.existsSync(newsDir)) {
                          const files = fs.readdirSync(newsDir);
                          // prefer exact prefix matches (case-insensitive)
                          const match = files.find(f => f.toLowerCase().startsWith(baseName.toLowerCase()));
                          if (match) return `/news/${match}`;
                          // fallback: find file that contains the basename
                          const match2 = files.find(f => f.toLowerCase().includes(baseName.toLowerCase()));
                          if (match2) return `/news/${match2}`;
                        }
                      } catch (e) {
                        // ignore
                      }

                      // fallback: infer extension and put under /news/
                      const ext = /FLAMOM|FNDC/i.test(s) ? 'png' : 'jpg';
                      const p = s.includes('/') ? s : `news/${s}`;
                      return `/${p}.${ext}`;
                    };
                    const src = normalize(img);
                    return (
                      <div
                        key={img}
                        className="relative aspect-square rounded-2xl overflow-hidden glass transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.25)] hover:scale-105"
                      >
                        <Image
                          src={src}
                          alt={item.title}
                          fill
                          className="object-cover"
                          loading="lazy"
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}