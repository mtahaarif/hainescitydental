"use client";

import { useState, useEffect } from 'react';
import NewsAdminList from './news/page';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'news' | 'team'>('news');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">CMS Dashboard</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <div className="flex gap-8">
            {['news', 'team'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as 'news' | 'team')}
                className={`px-4 py-2 font-medium border-b-2 transition ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab === 'team' ? 'Our Team' : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {activeTab === 'news' && <NewsAdminList />}
          {activeTab === 'team' && <TeamListInline />}
        </div>
      </main>
    </div>
  );
}

function TeamListInline() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchList() {
    setLoading(true);
    try {
      const res = await fetch('/api/team');
      if (res.ok) setItems(await res.json());
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
              <div className="font-medium">{it.name} <span className="text-sm text-gray-500">({it.role || it.position || 'Staff'})</span></div>
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

function ContentSection({
  title,
  apiEndpoint,
  fields,
}: {
  title: string;
  apiEndpoint: string;
  fields: string[];
}) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        <a
          href={`/admin/${apiEndpoint.split('/').pop()}/new`}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Add New
        </a>
      </div>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          API Endpoint: <code className="font-mono">{apiEndpoint}</code>
        </p>
      </div>
      <div className="mt-4 text-gray-600">
        <p>Manage {title.toLowerCase()} via API or database directly.</p>
        <p className="text-sm mt-2">Fields: {fields.join(', ')}</p>
      </div>
    </div>
  );
}
