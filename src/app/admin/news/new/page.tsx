"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ImageGallery } from '@/components/ImageGallery';
import { triggerRevalidation } from '@/lib/imageHelpers';

export default function NewsCreate() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [primaryImages, setPrimaryImages] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [publishing, setPublishing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setPublishing(true);

    try {
      // Combine primary image with gallery images
      const primaryImage = primaryImages[0] || null;
      const allImages = primaryImage ? [primaryImage, ...images] : images;

      const res = await fetch('/api/news', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          date,
          image: primaryImage,
          images: allImages,
          description,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Create failed');
        return;
      }

      // Revalidate public pages
      await triggerRevalidation(['/news', '/']);

      router.push('/admin/news');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Network error');
    } finally {
      setPublishing(false);
    }
  }

  return (
    <div className="w-full text-justify">
      <h2 className="text-2xl font-bold mb-4">Create News</h2>
      <form onSubmit={handleSubmit} className="space-y-6 glass-light p-6 rounded-xl">
        {error && <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}

        <div>
          <label className="block text-sm font-medium">Title *</label>
          <input
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-dental-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Description (optional)</label>
          <textarea
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-dental-blue-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Date</label>
          <input
            type="date"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-dental-blue-500"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        {/* Primary Image Upload */}
        <ImageGallery
          images={primaryImages}
          onChange={setPrimaryImages}
          label="Primary Image (optional)"
          maxImages={1}
        />

        {/* Image Gallery Component */}
        <ImageGallery
          images={images}
          onChange={setImages}
          label="Gallery Images"
          maxImages={20}
        />

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={publishing || !title.trim()}
            className="px-6 py-2 bg-dental-blue-600 text-white rounded hover:bg-dental-blue-700 disabled:opacity-50"
          >
            {publishing ? 'Creating...' : 'Create News'}
          </button>
        </div>
      </form>
    </div>
  );
}

