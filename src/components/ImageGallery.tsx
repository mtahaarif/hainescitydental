"use client";

import { useState } from 'react';
import Image from 'next/image';
import { uploadImage, parseImagesArray } from '@/lib/imageHelpers';
import { X, Upload, Trash2 } from 'lucide-react';

interface ImageGalleryProps {
  images: string[];
  onChange: (images: string[]) => void;
  label?: string;
  maxImages?: number;
}

export function ImageGallery({ images, onChange, label = 'Images', maxImages = 10 }: ImageGalleryProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    if (images.length + files.length > maxImages) {
      setError(`Maximum ${maxImages} images allowed`);
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const uploadedUrls: string[] = [];
      for (const file of files) {
        const url = await uploadImage(file);
        uploadedUrls.push(url);
      }
      onChange([...images, ...uploadedUrls]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    onChange(images.filter((_, i) => i !== index));
  };

  const moveImage = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= images.length) return;
    const newImages = [...images];
    [newImages[fromIndex], newImages[toIndex]] = [newImages[toIndex], newImages[fromIndex]];
    onChange(newImages);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
        <p className="text-xs text-gray-500 mb-3">
          {images.length} of {maxImages} images. Images will be displayed in order.
        </p>

        {/* Upload area */}
        <div className="mb-4">
          <label className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-blue-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition">
            <Upload className="w-4 h-4" />
            <span className="text-sm text-gray-600">
              {uploading ? 'Uploading...' : 'Click to upload images'}
            </span>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
              disabled={uploading || images.length >= maxImages}
              className="hidden"
            />
          </label>
        </div>

        {error && <p className="text-sm text-red-600 mb-3">{error}</p>}

        {/* Image grid */}
        {images.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {images.map((url, index) => (
              <div key={index} className="relative group">
                <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src={url}
                    alt={`Image ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="200px"
                  />
                </div>

                {/* Overlay controls */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2 rounded-lg">
                  {index > 0 && (
                    <button
                      onClick={() => moveImage(index, index - 1)}
                      className="p-1 bg-white rounded hover:bg-gray-200"
                      title="Move left"
                    >
                      ←
                    </button>
                  )}
                  {index < images.length - 1 && (
                    <button
                      onClick={() => moveImage(index, index + 1)}
                      className="p-1 bg-white rounded hover:bg-gray-200"
                      title="Move right"
                    >
                      →
                    </button>
                  )}
                  <button
                    onClick={() => removeImage(index)}
                    className="p-1 bg-red-500 text-white rounded hover:bg-red-600"
                    title="Remove image"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Image number */}
                <div className="absolute top-1 right-1 bg-black/60 text-white text-xs px-2 py-1 rounded">
                  {index + 1}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
