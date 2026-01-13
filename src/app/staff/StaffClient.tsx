'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface StaffMember {
  name: string;
  role: string;
  bio: string;
  image: string;
}

interface StaffClientProps {
  staffMembers: StaffMember[];
}

export default function StaffClient({ staffMembers }: StaffClientProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const prev = () => {
    setActiveIndex((prev) => (prev - 1 + staffMembers.length) % staffMembers.length);
  };

  const next = () => {
    setActiveIndex((prev) => (prev + 1) % staffMembers.length);
  };

  const currentStaff = staffMembers[activeIndex];

  return (
    <div className="min-h-screen pt-8 pb-16">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          Meet The <span className="gradient-text">Staff</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Our dedicated staff is the heart of our practice, committed to providing exceptional patient care.
        </p>
      </div>

      {/* Staff Carousel */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-strong p-8 sm:p-12 relative overflow-hidden h-[580px]">
          <div className="flex flex-col items-center text-center">
            {/* Image */}
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-full overflow-hidden border-4 border-dental-blue-100 shadow-2xl mb-8 hover:scale-[1.02] transition-transform duration-300">
              <Image
                src={currentStaff.image}
                alt={currentStaff.name}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Content */}
            <div className="space-y-4">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">{currentStaff.name}</h2>
                <p className="text-dental-blue-600 text-xl font-medium">{currentStaff.role}</p>
              </div>
              
              <p className="text-gray-700 leading-relaxed text-lg max-w-2xl">
                {currentStaff.bio}
              </p>
            </div>
          </div>

          {/* Navigation */}
          {staffMembers.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 glass-light rounded-full shadow-lg hover:scale-110 active:scale-90 transition-transform"
                aria-label="Previous staff member"
              >
                <ChevronLeft className="w-6 h-6 text-dental-blue-600" />
              </button>
              
              <button
                onClick={next}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 glass-light rounded-full shadow-lg hover:scale-110 active:scale-90 transition-transform"
                aria-label="Next staff member"
              >
                <ChevronRight className="w-6 h-6 text-dental-blue-600" />
              </button>
            </>
          )}
        </div>

        {/* Staff Grid Preview */}
        {staffMembers.length > 1 && (
          <div className="mt-8 grid grid-cols-5 sm:grid-cols-9 gap-2">
            {staffMembers.map((staff, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden transition-all duration-200 hover:scale-110 active:scale-90 ${
                  index === activeIndex 
                    ? 'ring-4 ring-dental-blue-500 scale-110' 
                    : 'opacity-60 hover:opacity-100'
                }`}
              >
                <Image
                  src={staff.image}
                  alt={staff.name}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
