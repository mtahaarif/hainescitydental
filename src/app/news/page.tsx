import Image from 'next/image';
import { Calendar, Newspaper, Globe, Award } from 'lucide-react';
import { getAllContent } from '@/lib/content';

const categoryConfig = {
  training: { icon: Award, color: 'from-blue-500 to-cyan-500', label: 'Training' },
  community: { icon: Globe, color: 'from-green-500 to-emerald-500', label: 'Community' },
  conference: { icon: Newspaper, color: 'from-purple-500 to-violet-500', label: 'Conference' },
  mission: { icon: Globe, color: 'from-orange-500 to-amber-500', label: 'Mission' },
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
  const newsItems = (await getAllContent('news')) as NewsItem[];
  
  // Sort news items by date, newest first
  const sortedNews = newsItems.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA; // Descending order (newest first)
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
          const CategoryIcon = categoryConfig[item.category].icon;
          return (
            <article
              key={item.id}
              className="glass-light p-6 sm:p-8 transition-all duration-300 hover:shadow-[0_0_40px_rgba(59,130,246,0.25)] hover:-translate-y-1"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div
                    className={`p-3 rounded-2xl bg-gradient-to-br ${categoryConfig[item.category].color} text-white transition-transform hover:scale-110`}
                  >
                    <CategoryIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-dental-blue-600">
                      {categoryConfig[item.category].label}
                    </span>
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
                  {item.images.map((img) => (
                    <div
                      key={img}
                      className="relative aspect-square rounded-2xl overflow-hidden glass transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.25)] hover:scale-105"
                    >
                      <Image
                        src={`/${img}.${img.includes('FLAMOM') || img.includes('FNDC') ? 'png' : 'jpg'}`}
                        alt={item.title}
                        fill
                        className="object-cover"
                        loading="lazy"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                    </div>
                  ))}
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}
