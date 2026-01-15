'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Trash2, Edit, Plus, GripVertical } from 'lucide-react';
import { toast } from 'react-toastify';
import StaffModal from '../../../components/admin/StaffModal';

interface Staff {
  _id: string;
  name: string;
  role: string;
  bio: string;
  department: string;
  experience: number;
  active: boolean;
  order: number;
}

export default function StaffPage() {
  const router = useRouter();
  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingStaff, setEditingStaff] = useState<any>(null);
  const [token, setToken] = useState('');

  useEffect(() => {
    const t = localStorage.getItem('adminToken');
    if (!t) {
      router.push('/admin/login');
      return;
    }
    setToken(t);
    fetchStaff(t);
  }, [router]);

  const fetchStaff = async (token: string) => {
    try {
      const response = await fetch('/api/staff', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setStaffList(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      toast.error('Failed to fetch staff');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this staff member?')) return;

    try {
      const response = await fetch(`/api/staff/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (response.ok) {
        setStaffList(staffList.filter((s) => s._id !== id));
        toast.success('Staff deleted successfully');
      } else {
        toast.error('Failed to delete staff');
      }
    } catch (error) {
      toast.error('Error deleting staff');
    }
  };

  const handleEdit = (staff: Staff) => {
    setEditingStaff(staff);
    setShowModal(true);
  };

  const handleSubmitStaff = async (data: any) => {
    try {
      const url = editingStaff ? `/api/staff/${editingStaff._id}` : '/api/staff';
      const method = editingStaff ? 'PUT' : 'POST';

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

      await fetchStaff(token);
      setShowModal(false);
      setEditingStaff(null);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Error saving staff');
      throw error;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Staff Management</h1>
          <button
            onClick={() => {
              setEditingStaff(null);
              setShowModal(true);
            }}
            className="flex items-center gap-2 bg-dental-blue-500 hover:bg-dental-blue-600 text-white px-4 py-2 rounded-lg"
          >
            <Plus size={20} />
            Add Staff
          </button>
        </div>
      </div>

      {/* Staff List */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-dental-blue-500 mx-auto"></div>
          </div>
        ) : staffList.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-600">No staff found. Add one!</p>
          </div>
        ) : (
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Order</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Role</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Department</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {staffList.map((staff) => (
                  <tr key={staff._id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-600 text-center">{staff.order}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{staff.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{staff.role}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{staff.department}</td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          staff.active
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {staff.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex gap-3 justify-center">
                        <button
                          onClick={() => handleEdit(staff)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(staff._id)}
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
        <StaffModal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            setEditingStaff(null);
          }}
          onSubmit={handleSubmitStaff}
          token={token}
          initialData={editingStaff}
        />
      )}
    </div>
  );
}
