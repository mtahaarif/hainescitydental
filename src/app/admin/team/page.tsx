"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { triggerRevalidation } from '@/lib/imageHelpers';
import { GripVertical } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  role?: string;
  bio?: string;
  department?: string;
  image?: string;
}

export default function TeamAdminList() {
  const [items, setItems] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchList();
  }, []);

  async function fetchList() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/team');
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const data = await res.json();
      const list = Array.isArray(data.team) ? data.team : [];
      setItems(list);
    } catch (err) {
      console.error('Failed to fetch team:', err);
      setError(err instanceof Error ? err.message : 'Failed to load team');
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  function goNew() {
    router.push('/admin/team/new');
  }

  function goEdit(id: string) {
    router.push(`/admin/team/${id}`);
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this team member? This action cannot be undone.')) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/team/${id}`, { method: 'DELETE', credentials: 'same-origin' });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Delete failed');
      }

      // Revalidate public pages
      await triggerRevalidation(['/team', '/our-team', '/']);

      // Refresh list
      await fetchList();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function handleDragStart(index: number) {
    setDraggedIndex(index);
  }

  function handleDragOver(e: React.DragEvent, index: number) {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    // Reorder array
    const newItems = [...items];
    const draggedItem = newItems[draggedIndex];
    newItems.splice(draggedIndex, 1);
    newItems.splice(index, 0, draggedItem);
    
    setItems(newItems);
    setDraggedIndex(index);
  }

  function handleDragEnd() {
    setDraggedIndex(null);
  }

  async function handleDrop() {
    if (draggedIndex === null) return;
    setDraggedIndex(null);

    // Save new order to backend
    try {
      const orderedIds = items.map(item => item.id);
      const res = await fetch('/api/team/reorder', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderedIds }),
      });

      if (!res.ok) {
        throw new Error('Failed to save order');
      }

      // Revalidate public pages
      await triggerRevalidation(['/team', '/our-team', '/']);
    } catch (err) {
      console.error('Failed to save order:', err);
      setError('Failed to save new order');
      // Refresh to get correct order
      await fetchList();
    }
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Team Members</h2>
        <button onClick={goNew} className="px-4 py-2 bg-dental-blue-600 text-white rounded hover:bg-dental-blue-700">
          + Add New
        </button>
      </div>

      {error && <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded mb-6">{error}</div>}

      {loading ? (
        <div className="text-gray-500">Loading...</div>
      ) : items.length === 0 ? (
        <div className="text-gray-500 text-center py-12">No team members yet</div>
      ) : (
        <div className="space-y-4">
          {items.map((it, index) => (
            <div 
              key={it.id}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
              onDrop={handleDrop}
              className={`glass-light p-4 rounded-lg flex items-center justify-between hover:shadow-md transition cursor-move ${
                draggedIndex === index ? 'opacity-50' : ''
              }`}
            >
              <div className="flex items-center gap-3 flex-1">
                <GripVertical className="text-gray-400 flex-shrink-0" size={20} />
                <div className="flex-1">
                  <div className="font-semibold text-lg">{it.name}</div>
                  <div className="flex gap-4 text-sm text-gray-600">
                    {it.department && <span>{it.department}</span>}
                    {it.role && <span>{it.role}</span>}
                  </div>
                  {it.bio && <div className="text-sm text-gray-600 line-clamp-1 mt-1">{it.bio}</div>}
                </div>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <button
                  onClick={() => goEdit(it.id)}
                  className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(it.id)}
                  disabled={loading}
                  className="px-3 py-1 border border-red-300 text-red-600 rounded hover:bg-red-50 text-sm disabled:opacity-50"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
