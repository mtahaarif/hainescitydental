"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ImageGallery } from '@/components/ImageGallery';
import { parseImagesArray, triggerRevalidation } from '@/lib/imageHelpers';

export default function NewsEdit() {
  const router = useRouter();
  const params = useParams() as { id: string };
  const id = params?.id;

  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [primaryImages, setPrimaryImages] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    fetchItem();
  }, [id]);

  async function fetchItem() {
    setLoading(true);
    try {
      const res = await fetch(`/api/news/${id}`);
      if (res.ok) {
        const data = await res.json();
        setTitle(data.title || '');
        setDate(data.date ? new Date(data.date).toISOString().slice(0, 10) : '');
        const parsedImages = parseImagesArray(data.images) || [];
        const primary = data.image || parsedImages[0] || null;
        setPrimaryImages(primary ? [primary] : []);
        setDescription(data.description || '');
        setImages(primary ? parsedImages.filter((img) => img !== primary) : parsedImages);
      } else {
        setError('News item not found');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);

    try {
      // Combine primary image with gallery images
      const primaryImage = primaryImages[0] || null;
      const allImages = primaryImage ? [primaryImage, ...images] : images;

      const res = await fetch(`/api/news/${id}`, {
        method: 'PUT',
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
        setError(data.error || 'Update failed');
        return;
      }

      // Revalidate public pages
      await triggerRevalidation(['/news', '/']);

      router.push('/admin');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Network error');
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div>Loading...</div>;

  return (
    <div className="w-full text-justify">
      <h2 className="text-2xl font-bold mb-4">Edit News</h2>
      <form onSubmit={handleSave} className="space-y-6 glass-light p-6 rounded-xl">
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
            disabled={saving || !title.trim()}
            className="px-6 py-2 bg-dental-blue-600 text-white rounded hover:bg-dental-blue-700 disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}

