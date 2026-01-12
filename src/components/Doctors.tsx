'use client';

import Image from 'next/image';
import { memo } from 'react';
import Link from 'next/link';

const doctorsData = [
  {
    id: 1,
    name: "Dr. Sohail Khan",
    specialty: "DMD",
    image: "/dr-sohail-khan.jpg",
    bio: "Implant specialist trained at Georgia Health Science University. Boston University graduate and member of American Academy of General Dentistry."
  },
  {
    id: 2,
    name: "Dr. Linda Park",
    specialty: "DDS",
    image: "/dr-linda-park.jpg",
    bio: "Loma Linda University graduate with advanced training from Pankey Institute. Active in community dental missions and patient care."
  }
];

export default memo(function Doctors() {
  return (
    <div className="py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {doctorsData.map((doctor) => (
          <div
            key={doctor.id}
            className="glass-light rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="w-full h-64 bg-gradient-to-br from-dental-blue-100 to-cyan-100 rounded-xl mb-4 flex items-center justify-center overflow-hidden">
              <Image
                src={doctor.image}
                alt={doctor.name}
                width={300}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{doctor.name}</h3>
            <p className="text-dental-blue-600 font-semibold mb-3">{doctor.specialty}</p>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">{doctor.bio}</p>
            <Link href="/doctors" className="text-dental-blue-600 hover:text-dental-blue-700 font-semibold text-sm inline-flex items-center gap-1 group">
              Learn More →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
});
