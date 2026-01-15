'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Trash2, Edit, Plus } from 'lucide-react';
import { toast } from 'react-toastify';
import DoctorsModal from '../../../components/admin/DoctorsModal';

interface Doctor {
  _id: string;
  name: string;
  credentials: string;
  bio: string;
  specializations: string[];
  experience: number;
  education: string;
  active: boolean;
}

export default function DoctorsPage() {
  const router = useRouter();
  const [doctorsList, setDoctorsList] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<any>(null);
  const [token, setToken] = useState('');

  useEffect(() => {
    const t = localStorage.getItem('adminToken');
    if (!t) {
      router.push('/admin/login');
      return;
    }
    setToken(t);
    fetchDoctors(t);
  }, [router]);

  const fetchDoctors = async (token: string) => {
    try {
      const response = await fetch('/api/doctors', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setDoctorsList(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      toast.error('Failed to fetch doctors');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this doctor?')) return;

    try {
      const response = await fetch(`/api/doctors/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (response.ok) {
        setDoctorsList(doctorsList.filter((d) => d._id !== id));
        toast.success('Doctor deleted successfully');
      } else {
        toast.error('Failed to delete doctor');
      }
    } catch (error) {
      toast.error('Error deleting doctor');
    }
  };

  const handleEdit = (doctor: Doctor) => {
    setEditingDoctor(doctor);
    setShowModal(true);
  };

  const handleSubmitDoctor = async (data: any) => {
    try {
      const url = editingDoctor ? `/api/doctors/${editingDoctor._id}` : '/api/doctors';
      const method = editingDoctor ? 'PUT' : 'POST';

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

      await fetchDoctors(token);
      setShowModal(false);
      setEditingDoctor(null);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Error saving doctor');
      throw error;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Doctors Management</h1>
          <button
            onClick={() => {
              setEditingDoctor(null);
              setShowModal(true);
            }}
            className="flex items-center gap-2 bg-dental-blue-500 hover:bg-dental-blue-600 text-white px-4 py-2 rounded-lg"
          >
            <Plus size={20} />
            Add Doctor
          </button>
        </div>
      </div>

      {/* Doctors List */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-dental-blue-500 mx-auto"></div>
          </div>
        ) : doctorsList.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-600">No doctors found. Add one!</p>
          </div>
        ) : (
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Credentials</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Specializations</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Experience</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {doctorsList.map((doctor) => (
                  <tr key={doctor._id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{doctor.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{doctor.credentials}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {doctor.specializations?.join(', ') || 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{doctor.experience} years</td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          doctor.active
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {doctor.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex gap-3 justify-center">
                        <button
                          onClick={() => handleEdit(doctor)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(doctor._id)}
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
        <DoctorsModal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            setEditingDoctor(null);
          }}
          onSubmit={handleSubmitDoctor}
          token={token}
          initialData={editingDoctor}
        />
      )}
    </div>
  );
}
