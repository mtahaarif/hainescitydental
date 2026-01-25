import React from 'react';
import Link from 'next/link';

type Item = {
  id: string;
  title: string;
  href?: string;
  date?: string;
};

export default function NewsTicker({ items }: { items: Item[] }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="overflow-hidden bg-white/60 py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <div className="whitespace-nowrap animate-marquee will-change-transform">
            {items.map((it) => (
              <span key={it.id} className="inline-flex items-center gap-4 mr-8">
                <span className="text-sm text-dental-blue-600 font-semibold">{it.date ? `${it.date} —` : ''}</span>
                {it.href ? (
                  <Link href={it.href} className="text-sm text-gray-800 hover:text-dental-blue-700">
                    {it.title}
                  </Link>
                ) : (
                  <span className="text-sm text-gray-800">{it.title}</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee { display: inline-block; animation: marquee 18s linear infinite; }
        .animate-marquee:hover { animation-play-state: paused; }
      `}</style>
    </div>
  );
}
