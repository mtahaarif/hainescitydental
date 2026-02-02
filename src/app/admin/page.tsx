"use client";

import { useState } from 'react';
import NewsAdminList from './news/page';
import TeamAdminList from './team/page';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'news' | 'team'>('news');
  const [setupStatus, setSetupStatus] = useState<string | null>(null);
  const [isSettingUp, setIsSettingUp] = useState(false);

  async function setupDisplayOrder() {
    if (!confirm('This will add display_order columns to the database if they don\'t exist. Continue?')) return;
    
    setIsSettingUp(true);
    setSetupStatus(null);

    try {
      const res = await fetch('/api/setup-order', {
        method: 'POST',
        credentials: 'same-origin',
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Setup failed');
      }

      const data = await res.json();
      setSetupStatus(data.message || 'Setup completed successfully!');
    } catch (err) {
      setSetupStatus(err instanceof Error ? err.message : 'Setup failed');
    } finally {
      setIsSettingUp(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 text-justify">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="w-full px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">CMS Dashboard</h1>
          <button
            onClick={setupDisplayOrder}
            disabled={isSettingUp}
            className="px-3 py-1.5 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 disabled:opacity-50"
          >
            {isSettingUp ? 'Setting up...' : 'Setup Display Order'}
          </button>
        </div>
      </header>

      {setupStatus && (
        <div className="w-full px-4 sm:px-6 lg:px-8 pt-4">
          <div className="p-3 bg-blue-100 border border-blue-400 text-blue-700 rounded">
            {setupStatus}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="w-full px-4 py-8 sm:px-6 lg:px-8">
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
          {activeTab === 'team' && <TeamAdminList />}
        </div>
      </main>
    </div>
  );
}
