'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';

interface Meta {
  title?: string;
  date?: string;
  description?: string;
  content?: string;
}

interface Props {
  images: string[];
  alt?: string;
  meta?: Meta;
}

export default function LightboxGallery({ images, alt, meta }: Props) {
  const [openSrc, setOpenSrc] = useState<string | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenSrc(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  if (!images || images.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {images.map((src) => (
          <button
            key={src}
            onClick={() => setOpenSrc(src)}
            className="rounded-2xl glass overflow-hidden p-0 border-0"
            aria-label={`Open image ${alt ?? ''}`}
          >
            <Image
              src={src}
              alt={alt ?? 'news image'}
              width={640}
              height={480}
              className="object-contain w-full h-auto rounded-2xl"
              loading="lazy"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          </button>
        ))}
      </div>

      {openSrc && typeof document !== 'undefined' ? createPortal(
        <div
          className="fixed inset-0 z-[9999] bg-black/95"
          onClick={() => setOpenSrc(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className="absolute inset-0 flex items-stretch" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setOpenSrc(null)}
              className="absolute right-4 top-4 z-50 p-2 rounded-full bg-white/90 text-gray-800 shadow-lg"
              aria-label="Close image"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex-1 flex items-center justify-center p-6">
              <div className="w-full h-full flex items-center justify-center">
                <Image
                  src={openSrc as string}
                  alt={alt ?? 'news image'}
                  width={1600}
                  height={1200}
                  className="object-contain max-w-full max-h-full"
                  priority
                />
              </div>
            </div>

            <aside className="w-96 bg-white shadow-lg overflow-auto p-6">
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-gray-900">{meta?.title}</h2>
                {meta?.date && <div className="text-sm text-dental-blue-700">{meta.date}</div>}
                {meta?.description && <p className="text-gray-700">{meta.description}</p>}
                {meta?.content && (
                  <div className="prose max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: meta.content }} />
                )}
              </div>
            </aside>
          </div>
        </div>,
        document.body
      ) : null}
    </>
  );
}
