"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { triggerRevalidation } from '@/lib/imageHelpers';
import { ImageGallery } from '@/components/ImageGallery';

export default function TeamEditPage() {
  const router = useRouter();
  const params = useParams() as { id: string };
  const id = params?.id;

  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [department, setDepartment] = useState('Doctors');
  const [bio, setBio] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    fetchItem();
  }, [id]);

  async function fetchItem() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/team/${id}`);
      if (!res.ok) throw new Error('Not found');
      const data = await res.json();
      setName(data.name || '');
      setRole(data.role || '');
      setDepartment(data.department || 'Doctors');
      setBio(data.bio || '');
      setImages(data.image ? [data.image] : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Team member not found');
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
      if (!name.trim()) {
        setError('Name is required');
        return;
      }

      const res = await fetch(`/api/team/${id}`, {
        method: 'PUT',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          role: role.trim() || undefined,
          department: department.trim() || undefined,
          bio: bio.trim() || undefined,
          image: images[0] || undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Update failed');
        return;
      }

      // Revalidate public pages
      await triggerRevalidation(['/team', '/our-team', '/']);

      router.push('/admin/team');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Network error');
      console.error(err);
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div>Loading...</div>;

  return (
    <div className="w-full text-justify">
      <h2 className="text-2xl font-bold mb-6">Edit Team Member</h2>
      <form onSubmit={handleSave} className="space-y-6 glass-light p-6 rounded-xl">
        {error && <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}

        <div>
          <label className="block text-sm font-medium mb-2">Name *</label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-dental-blue-500"
            placeholder="Team member name"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Department</label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-dental-blue-500"
            >
              <option value="Doctors">Doctors</option>
              <option value="Hygienist">Hygienist</option>
              <option value="Staff">Staff</option>
              <option value="Assistant">Assistant</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Role</label>
            <input
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-dental-blue-500"
              placeholder="e.g., DDS, RDH"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-dental-blue-500"
            placeholder="Team member biography"
          />
        </div>

        <ImageGallery
          images={images}
          onChange={setImages}
          label="Profile Image (optional)"
          maxImages={1}
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
            disabled={saving || !name.trim()}
            className="px-6 py-2 bg-dental-blue-600 text-white rounded hover:bg-dental-blue-700 disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}

