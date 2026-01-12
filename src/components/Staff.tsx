'use client';

import { memo } from 'react';

const staffData = [
  {
    id: 1,
    name: "Danyelle",
    role: "Office Manager",
    image: "/Danyelle.jpg",
    bio: "13+ years in dentistry with Expanded Functions and Radiology licenses from University of Florida. Team leader for 10+ years."
  },
  {
    id: 2,
    name: "Debbie",
    role: "Dental Hygienist RDH",
    image: "/Debbie.jpg",
    bio: "25+ years experience. Valencia Community College graduate (2002). Dedicated to preventive care and patient education."
  },
  {
    id: 3,
    name: "Dani",
    role: "Dental Hygienist RDH, BASDH",
    image: "/Dani.jpg",
    bio: "At Haines City Dental since 2008. Valencia College and St. Petersburg College graduate with Bachelor's in Dental Hygiene."
  }
];

export default memo(function Staff() {
  return (
    <div className="py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {staffData.map((member) => (
          <div
            key={member.id}
            className="glass-light rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="w-full h-56 bg-gradient-to-br from-dental-blue-100 to-cyan-100 rounded-xl mb-4 flex items-center justify-center overflow-hidden text-gray-500 text-sm font-medium">
              {member.name}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
            <p className="text-dental-blue-600 font-semibold mb-3">{member.role}</p>
            <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
});
