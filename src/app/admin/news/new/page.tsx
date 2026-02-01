"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewsCreate() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('General');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [publishing, setPublishing] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPublishing(true);
    try {
      const res = await fetch('/api/news', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, date, image_url: imageUrl, content, published: 1 }),
      });
      if (res.ok) {
        router.push('/admin/news');
      } else {
        const data = await res.json();
        alert(data.error || 'Create failed');
      }
    } catch (err) {
      alert('Network error');
    } finally {
      setPublishing(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create News</h2>
      <form onSubmit={handleSubmit} className="space-y-4 glass-light p-6 rounded-xl">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input className="w-full px-3 py-2 rounded" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium">Category</label>
          <input className="w-full px-3 py-2 rounded" value={category} onChange={(e) => setCategory(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea className="w-full px-3 py-2 rounded" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium">Content</label>
          <textarea rows={8} className="w-full px-3 py-2 rounded" value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <div className="flex justify-end">
          <button className="btn-primary" type="submit" disabled={publishing}>{publishing ? 'Saving...' : 'Create'}</button>
        </div>
      </form>
    </div>
  );
}
