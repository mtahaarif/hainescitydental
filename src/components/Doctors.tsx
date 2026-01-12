'use client';

import { motion } from 'framer-motion';

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

export default function Doctors() {
  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Doctors</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctorsData.map((doctor) => (
          <motion.div
            key={doctor.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-blue-600 text-sm font-medium">{doctor.name}</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{doctor.name}</h3>
            <p className="text-blue-600 font-medium mb-2">{doctor.specialty}</p>
            <p className="text-gray-600 text-sm">{doctor.bio}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
