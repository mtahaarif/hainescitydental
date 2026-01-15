'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { LogOut, FileText, Users, Stethoscope, Users2 } from 'lucide-react';
import { toast } from 'react-toastify';

export default function AdminDashboard() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [stats, setStats] = useState({
    news: 0,
    doctors: 0,
    staff: 0,
    team: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const user = localStorage.getItem('adminUsername');

    if (!token) {
      router.push('/admin/login');
      return;
    }

    setUsername(user || 'Admin');
    fetchStats(token);
  }, [router]);

  const fetchStats = async (token: string) => {
    try {
      const [newsRes, doctorsRes, staffRes, teamRes] = await Promise.all([
        fetch('/api/news', { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch('/api/doctors', { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch('/api/staff', { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch('/api/team', { headers: { 'Authorization': `Bearer ${token}` } }),
      ]);

      if (newsRes.ok && doctorsRes.ok && staffRes.ok && teamRes.ok) {
        const news = await newsRes.json();
        const doctors = await doctorsRes.json();
        const staff = await staffRes.json();
        const team = await teamRes.json();

        setStats({
          news: Array.isArray(news) ? news.length : 0,
          doctors: Array.isArray(doctors) ? doctors.length : 0,
          staff: Array.isArray(staff) ? staff.length : 0,
          team: Array.isArray(team) ? team.length : 0,
        });
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUsername');
    toast.success('Logged out successfully');
    router.push('/admin/login');
  };

  const menuItems = [
    {
      title: 'News',
      icon: FileText,
      href: '/admin/news',
      count: stats.news,
      description: 'Manage news articles',
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Doctors',
      icon: Stethoscope,
      href: '/admin/doctors',
      count: stats.doctors,
      description: 'Manage doctors',
      color: 'from-green-500 to-green-600',
    },
    {
      title: 'Staff',
      icon: Users,
      href: '/admin/staff',
      count: stats.staff,
      description: 'Manage staff members',
      color: 'from-purple-500 to-purple-600',
    },
    {
      title: 'Team',
      icon: Users2,
      href: '/admin/team',
      count: stats.team,
      description: 'Manage team members',
      color: 'from-orange-500 to-orange-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Welcome, {username}</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-dental-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading dashboard...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={item.href}>
                    <div className={`bg-gradient-to-br ${item.color} rounded-xl shadow-lg hover:shadow-xl transition cursor-pointer p-6 text-white`}>
                      <div className="flex items-center justify-between mb-4">
                        <Icon size={32} />
                        <div className="text-4xl font-bold opacity-20">{item.count}</div>
                      </div>
                      <h2 className="text-2xl font-bold mb-2">{item.title}</h2>
                      <p className="text-white/90 mb-4">{item.description}</p>
                      <div className="text-sm font-semibold">
                        Total: {item.count} items
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
