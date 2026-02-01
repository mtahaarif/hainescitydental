"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface NewsItem {
  id: string;
  title: string;
  description: string;
  date?: string;
}

export default function NewsAdminList() {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Rely on httpOnly cookie set by server. Middleware protects /admin.
    fetchList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchList() {
    setLoading(true);
    try {
      const res = await fetch('/api/news');
      if (res.ok) {
        const data = await res.json();
        setItems(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function goNew() {
    router.push('/admin/news/new');
  }

  function goEdit(id: string) {
    router.push(`/admin/news/${id}`);
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this news?')) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/news/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      await fetchList();
    } catch (err) {
      console.error(err);
      alert('Delete failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">News</h2>
        <div>
          <button onClick={goNew} className="btn-primary">New</button>
        </div>
      </div>

      {loading && <div>Loading...</div>}

      <div className="space-y-4">
        {items.map((it) => (
          <div key={it.id} className="glass-light p-4 rounded-lg flex items-center justify-between">
            <div>
              <div className="font-medium">{it.title}</div>
              <div className="text-sm text-gray-500">{it.description}</div>
            </div>
            <div className="flex items-center gap-2">
              <button className="btn-secondary" onClick={() => goEdit(it.id)}>Edit</button>
              <button className="btn-secondary" onClick={() => handleDelete(it.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
