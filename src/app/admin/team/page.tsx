"use client";

import React, { useEffect, useState } from 'react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio?: string;
  image_url?: string;
}

export default function TeamAdminList() {
  const [items, setItems] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchList() {
    setLoading(true);
    try {
      const res = await fetch('/api/team');
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
    window.location.href = '/admin/team/new';
  }

  function goEdit(id: string) {
    window.location.href = `/admin/team/${id}`;
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this member?')) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/team/${id}`, { method: 'DELETE' });
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
        <h2 className="text-2xl font-bold">Team Members</h2>
        <div>
          <button onClick={goNew} className="btn-primary">Add New</button>
        </div>
      </div>

      {loading && <div>Loading...</div>}

      <div className="space-y-4">
        {items.map((it) => (
          <div key={it.id} className="glass-light p-4 rounded-lg flex items-center justify-between">
            <div>
              <div className="font-medium">{it.name} <span className="text-sm text-gray-500">({it.role})</span></div>
              <div className="text-sm text-gray-500">{it.bio}</div>
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
