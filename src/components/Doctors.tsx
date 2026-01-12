'use client';

import Image from 'next/image';
import { memo } from 'react';

const doctorsData = [
  {
    id: 1,
    name: "Dr. James Sterling",
    specialty: "General Dentistry",
    image: "/images/doctor1.jpg",
    bio: "20+ years of experience in comprehensive dental care"
  },
  {
    id: 2,
    name: "Dr. Sarah Mitchell",
    specialty: "Cosmetic Dentistry",
    image: "/images/doctor2.jpg",
    bio: "Specializes in smile design and aesthetic procedures"
  },
  {
    id: 3,
    name: "Dr. Michael Chen",
    specialty: "Orthodontics",
    image: "/images/doctor3.jpg",
    bio: "Expert in braces and clear aligners for all ages"
  }
];

export default memo(function Doctors() {
  return (
    <div className="py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctorsData.map((doctor) => (
          <div
            key={doctor.id}
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
              <span className="text-blue-600 text-sm font-medium">{doctor.name}</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{doctor.name}</h3>
            <p className="text-blue-600 font-medium mb-2">{doctor.specialty}</p>
            <p className="text-gray-600 text-sm">{doctor.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
});
