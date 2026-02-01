"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function NewsEdit() {
  const router = useRouter();
  const params = useParams() as { id: string };
  const id = params?.id;

  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);

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
        setDate(data.date ? new Date(data.date).toISOString().slice(0,10) : '');
        setImageUrl((data.images && data.images[0]) || data.image_url || '');
        setContent(data.content || '');
      } else alert('Not found');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`/api/news/${id}`, {
        method: 'PUT',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, date, image_url: imageUrl, content, published: 1 }),
      });
      if (res.ok) router.push('/admin/news');
      else {
        const data = await res.json();
        alert(data.error || 'Update failed');
      }
    } catch (err) {
      alert('Network error');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Edit News</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <form onSubmit={handleSave} className="space-y-4 glass-light p-6 rounded-xl">
          <div>
            <label className="block text-sm font-medium">Title</label>
            <input className="w-full px-3 py-2 rounded" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium">Date</label>
            <input type="date" className="w-full px-3 py-2 rounded" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium">Image URL</label>
            <input className="w-full px-3 py-2 rounded" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium">Content</label>
            <textarea rows={8} className="w-full px-3 py-2 rounded" value={content} onChange={(e) => setContent(e.target.value)} />
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" className="btn-secondary" onClick={() => router.push('/admin/news')}>Cancel</button>
            <button className="btn-primary" type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
          </div>
        </form>
      )}
    </div>
  );
}
