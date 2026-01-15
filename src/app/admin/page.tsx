'use client';

import { useState } from 'react';
import Link from 'next/link';
import { LogOut } from 'lucide-react';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'news' | 'doctors' | 'staff' | 'team'>('news');

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    window.location.href = '/admin/login';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">CMS Dashboard</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <div className="flex gap-8">
            {['news', 'doctors', 'staff', 'team'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as typeof activeTab)}
                className={`px-4 py-2 font-medium border-b-2 transition ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-6">
          {activeTab === 'news' && (
            <ContentSection
              title="News Articles"
              apiEndpoint="/api/news"
              fields={['title', 'category', 'description', 'published']}
            />
          )}
          {activeTab === 'doctors' && (
            <ContentSection
              title="Doctors"
              apiEndpoint="/api/doctors"
              fields={['name', 'credentials', 'specializations', 'active']}
            />
          )}
          {activeTab === 'staff' && (
            <ContentSection
              title="Staff Members"
              apiEndpoint="/api/staff"
              fields={['name', 'role', 'department', 'active']}
            />
          )}
          {activeTab === 'team' && (
            <ContentSection
              title="Team Members"
              apiEndpoint="/api/team"
              fields={['name', 'position', 'active']}
            />
          )}
        </div>
      </main>
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
