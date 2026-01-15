'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Trash2, Edit, Plus, Eye } from 'lucide-react';
import { toast } from 'react-toastify';
import NewsModal from '../../../components/admin/NewsModal';

interface News {
  _id: string;
  title: string;
  category: string;
  description: string;
  date: string;
  published: boolean;
}

export default function NewsPage() {
  const router = useRouter();
  const [newsList, setNewsList] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingNews, setEditingNews] = useState<any>(null);
  const [token, setToken] = useState('');

  useEffect(() => {
    const t = localStorage.getItem('adminToken');
    if (!t) {
      router.push('/admin/login');
      return;
    }
    setToken(t);
    fetchNews(t);
  }, [router]);

  const fetchNews = async (token: string) => {
    try {
      const response = await fetch('/api/news', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setNewsList(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      toast.error('Failed to fetch news');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this news?')) return;

    try {
      const response = await fetch(`/api/news/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (response.ok) {
        setNewsList(newsList.filter((n) => n._id !== id));
        toast.success('News deleted successfully');
      } else {
        toast.error('Failed to delete news');
      }
    } catch (error) {
      toast.error('Error deleting news');
    }
  };

  const handleEdit = (news: News) => {
    setEditingNews(news);
    setShowModal(true);
  };

  const handleSubmitNews = async (data: any) => {
    try {
      const url = editingNews ? `/api/news/${editingNews._id}` : '/api/news';
      const method = editingNews ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to save');
      }

      await fetchNews(token);
      setShowModal(false);
      setEditingNews(null);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Error saving news');
      throw error;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">News Management</h1>
          <button
            onClick={() => {
              setEditingNews(null);
              setShowModal(true);
            }}
            className="flex items-center gap-2 bg-dental-blue-500 hover:bg-dental-blue-600 text-white px-4 py-2 rounded-lg"
          >
            <Plus size={20} />
            Add News
          </button>
        </div>
      </div>

      {/* News List */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-dental-blue-500 mx-auto"></div>
          </div>
        ) : newsList.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-600">No news articles found. Create one!</p>
          </div>
        ) : (
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Title</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Category</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {newsList.map((news) => (
                  <tr key={news._id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{news.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{news.category}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(news.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          news.published
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {news.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex gap-3 justify-center">
                        <button
                          onClick={() => handleEdit(news)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(news._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <NewsModal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            setEditingNews(null);
          }}
          onSubmit={handleSubmitNews}
          token={token}
          initialData={editingNews}
        />
      )}
    </div>
  );
}
