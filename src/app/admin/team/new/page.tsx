"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TeamNewPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [role, setRole] = useState('Doctor');
  const [bio, setBio] = useState('');
  const [image_url, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, role, bio, image_url }),
      });
      if (!res.ok) throw new Error('Create failed');
      router.push('/admin/team');
    } catch (err) {
      console.error(err);
      alert('Create failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add Team Member</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full rounded px-3 py-2" required />
        </div>

        <div>
          <label className="block text-sm font-medium">Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value)} className="mt-1 w-full rounded px-3 py-2">
            <option>Doctor</option>
            <option>Hygienist</option>
            <option>Staff</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Bio</label>
          <textarea value={bio} onChange={(e) => setBio(e.target.value)} className="mt-1 w-full rounded px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium">Image URL</label>
          <input value={image_url} onChange={(e) => setImageUrl(e.target.value)} className="mt-1 w-full rounded px-3 py-2" />
        </div>

        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? 'Saving...' : 'Save'}
        </button>
      </form>
    </div>
  );
}
