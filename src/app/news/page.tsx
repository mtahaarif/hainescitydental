"use client";

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Calendar } from 'lucide-react';
import { Lightbox } from '@/components/Lightbox';

type NewsItem = {
  id: string;
  title: string;
  date?: string | null;
  image?: string | null;
  images?: string[];
  description?: string | null;
};

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const [lightbox, setLightbox] = useState<{ isOpen: boolean; itemIndex: number; imageIndex: number }>({
    isOpen: false,
    itemIndex: 0,
    imageIndex: 0,
  });

  useEffect(() => {
    let mounted = true;
    
    const fetchNews = async (attempt = 1) => {
      try {
        const res = await fetch('/api/news');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        
        if (!mounted) return;
        // API returns { news: [...] }
        setNews(Array.isArray(data.news) ? data.news : []);
        setLoading(false);
        setError(null);
      } catch (err) {
        console.error(`[News] Fetch attempt ${attempt} failed:`, err);
        
        if (!mounted) return;
        
        // Retry up to 3 times with exponential backoff
        if (attempt < 3) {
          const delay = Math.min(1000 * Math.pow(2, attempt - 1), 5000);
          console.log(`[News] Retrying in ${delay}ms...`);
          setRetryCount(attempt);
          setTimeout(() => fetchNews(attempt + 1), delay);
        } else {
          console.log('[News] All retries exhausted, reloading page in 2s...');
          setError('Unable to load news. Reloading page...');
          setTimeout(() => window.location.reload(), 2000);
        }
      }
    };
    
    fetchNews();
    
    return () => { mounted = false };
  }, []);

  const openLightbox = (itemIndex: number, imageIndex: number) => {
    setLightbox({ isOpen: true, itemIndex, imageIndex });
  };

  const closeLightbox = () => {
    setLightbox({ isOpen: false, itemIndex: 0, imageIndex: 0 });
  };

  return (
    <div className="min-h-screen text-justify">
      <div className="w-full">
        <div className="bg-dental-blue-50/90 border-y border-dental-blue-100 py-8 px-0 shadow-sm">
          {error && <div className="text-red-600 mb-6">{error}</div>}
          <main>
            <div className="mb-12 text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                <span className="gradient-text">News</span>
              </h1>
              <p className="text-xl text-gray-600 text-center">
                Highlights from our doctors, team, and community service events.
              </p>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="flex items-center gap-3 text-dental-blue-700">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-dental-blue-600 border-t-transparent" />
                  <span className="text-sm font-medium">
                    {retryCount > 0 ? `Retrying connection (${retryCount}/2)...` : 'Loading news...'}
                  </span>
                </div>
              </div>
            ) : (
              <div className="space-y-12">
                {news.map((item, itemIndex) => {
                  const displayImages = item.images && item.images.length > 0 ? item.images : (item.image ? [item.image] : []);
                  const hasMultipleImages = displayImages.length > 1;

                  return (
                    <article key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition">
                      {/* Title + meta comes before images */}
                      <div className="p-6">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-3">{item.title}</h2>

                        {item.date && (
                          <div className="text-sm text-dental-blue-700 mb-4 flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {String(item.date)}
                          </div>
                        )}

                        {item.description && (
                          <p className="text-gray-700 text-base leading-relaxed whitespace-pre-line text-justify">
                            {item.description}
                          </p>
                        )}
                      </div>

                      {/* Image Gallery Section - Small Thumbnails */}
                      {displayImages.length > 0 && (
                        <div className="p-4">
                          <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
                            {displayImages.map((src, imgIndex) => (
                              <button
                                key={imgIndex}
                                onClick={() => openLightbox(itemIndex, imgIndex)}
                                className="relative w-full aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition group"
                              >
                                <Image
                                  src={src}
                                  alt={`${item.title} - Thumbnail ${imgIndex + 1}`}
                                  fill
                                  className="object-cover group-hover:scale-110 transition"
                                  sizes="(max-width: 768px) 25vw, 12.5vw"
                                  loading={itemIndex < 2 && imgIndex < 3 ? "eager" : "lazy"}
                                  priority={itemIndex === 0 && imgIndex === 0}
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition" />
                              </button>
                            ))}
                          </div>
                          <p className="text-xs text-gray-500 mt-2">
                            Click thumbnails to view full size ({displayImages.length} {displayImages.length === 1 ? 'image' : 'images'})
                          </p>
                        </div>
                      )}
                    </article>
                  );
                })}

                {news.length === 0 && !error && (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No news items available</p>
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox.isOpen && (
        <Lightbox
          images={news[lightbox.itemIndex]?.images || (news[lightbox.itemIndex]?.image ? [news[lightbox.itemIndex].image!] : [])}
          title={news[lightbox.itemIndex]?.title || ''}
          initialIndex={lightbox.imageIndex}
          isOpen={lightbox.isOpen}
          onClose={closeLightbox}
        />
      )}
    </div>
  );
}
