'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Trash2, Edit, Plus } from 'lucide-react';
import { toast } from 'react-toastify';
import TeamModal from '../../../components/admin/TeamModal';

interface Team {
  _id: string;
  name: string;
  position: string;
  bio: string;
  active: boolean;
  order: number;
}

export default function TeamPage() {
  const router = useRouter();
  const [teamList, setTeamList] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingTeam, setEditingTeam] = useState<any>(null);
  const [token, setToken] = useState('');

  useEffect(() => {
    const t = localStorage.getItem('adminToken');
    if (!t) {
      router.push('/admin/login');
      return;
    }
    setToken(t);
    fetchTeam(t);
  }, [router]);

  const fetchTeam = async (token: string) => {
    try {
      const response = await fetch('/api/team', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setTeamList(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      toast.error('Failed to fetch team');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this team member?')) return;

    try {
      const response = await fetch(`/api/team/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (response.ok) {
        setTeamList(teamList.filter((t) => t._id !== id));
        toast.success('Team member deleted successfully');
      } else {
        toast.error('Failed to delete team member');
      }
    } catch (error) {
      toast.error('Error deleting team member');
    }
  };

  const handleEdit = (team: Team) => {
    setEditingTeam(team);
    setShowModal(true);
  };

  const handleSubmitTeam = async (data: any) => {
    try {
      const url = editingTeam ? `/api/team/${editingTeam._id}` : '/api/team';
      const method = editingTeam ? 'PUT' : 'POST';

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

      await fetchTeam(token);
      setShowModal(false);
      setEditingTeam(null);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Error saving team member');
      throw error;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Team Management</h1>
          <button
            onClick={() => {
              setEditingTeam(null);
              setShowModal(true);
            }}
            className="flex items-center gap-2 bg-dental-blue-500 hover:bg-dental-blue-600 text-white px-4 py-2 rounded-lg"
          >
            <Plus size={20} />
            Add Team Member
          </button>
        </div>
      </div>

      {/* Team List */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-dental-blue-500 mx-auto"></div>
          </div>
        ) : teamList.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-600">No team members found. Add one!</p>
          </div>
        ) : (
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Order</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Position</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {teamList.map((team) => (
                  <tr key={team._id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-600 text-center">{team.order}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{team.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{team.position}</td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          team.active
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {team.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex gap-3 justify-center">
                        <button
                          onClick={() => handleEdit(team)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(team._id)}
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
        <TeamModal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            setEditingTeam(null);
          }}
          onSubmit={handleSubmitTeam}
          token={token}
          initialData={editingTeam}
        />
      )}
    </div>
  );
}
