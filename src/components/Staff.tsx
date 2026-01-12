'use client';

import { motion } from 'framer-motion';

const staffData = [
  {
    id: 1,
    name: "Emma Rodriguez",
    role: "Dental Hygienist",
    image: "/images/staff1.jpg",
    bio: "Dedicated to patient education and preventive care"
  },
  {
    id: 2,
    name: "David Thompson",
    role: "Dental Assistant",
    image: "/images/staff2.jpg",
    bio: "Ensures smooth operations and patient comfort"
  },
  {
    id: 3,
    name: "Lisa Anderson",
    role: "Office Manager",
    image: "/images/staff3.jpg",
    bio: "Manages appointments and patient relations"
  }
];

export default function Staff() {
  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Staff</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {staffData.map((member) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <div className="w-full h-48 bg-gradient-to-br from-green-100 to-green-200 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-green-600 text-sm font-medium">{member.name}</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
            <p className="text-green-600 font-medium mb-2">{member.role}</p>
            <p className="text-gray-600 text-sm">{member.bio}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
