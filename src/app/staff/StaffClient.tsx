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

  if (!staffMembers || staffMembers.length === 0) return null;

  const prev = () => setActiveIndex((i) => (i - 1 + staffMembers.length) % staffMembers.length);
  const next = () => setActiveIndex((i) => (i + 1) % staffMembers.length);

  const current = staffMembers[activeIndex];

  return (
    <section className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-dental-blue-50/90 border border-dental-blue-100 rounded-3xl p-6 md:p-8 shadow-sm grid md:grid-cols-4 gap-6">

          <main className="md:col-span-3">
            <div className="mb-8 text-center">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                Meet The <span className="gradient-text">Staff</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Our dedicated staff is the heart of our practice, committed to providing exceptional patient care.
              </p>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="glass-strong p-4 sm:p-8 md:p-12 relative overflow-visible sm:overflow-hidden">
                <div className="flex flex-col items-center text-center pb-8">
                  <div className="relative w-36 h-36 sm:w-48 sm:h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-dental-blue-100 shadow-2xl mb-4 sm:mb-6 md:mb-8">
                    <Image src={current.image} alt={current.name} fill className="object-cover" priority />
                  </div>

                  <p className="text-dental-blue-600 text-base sm:text-lg md:text-xl font-medium">{current.role}</p>
                  <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mt-2">{current.name}</h2>
                  <p className="text-gray-700 mt-4 max-w-prose mx-auto">{current.bio}</p>
                </div>

                <div className="mt-8 flex items-center justify-center gap-4">
                  <button
                    aria-label="Previous staff"
                    onClick={prev}
                    className="inline-flex items-center justify-center rounded-full bg-white p-2 shadow hover:bg-gray-50"
                  >
                    <ChevronLeft />
                  </button>
                  <div className="flex items-center gap-2">
                    {staffMembers.map((s, idx) => (
                      <button
                        key={s.name + idx}
                        onClick={() => setActiveIndex(idx)}
                        aria-current={idx === activeIndex}
                        className={`w-10 h-10 rounded-full overflow-hidden border ${
                          idx === activeIndex ? 'border-dental-blue-600' : 'border-gray-200'
                        }`}
                      >
                        <Image src={s.image} alt={s.name} width={40} height={40} className="object-cover" />
                      </button>
                    ))}
                  </div>
                  <button
                    aria-label="Next staff"
                    onClick={next}
                    className="inline-flex items-center justify-center rounded-full bg-white p-2 shadow hover:bg-gray-50"
                  >
                    <ChevronRight />
                  </button>
                </div>
              </div>
            </div>
          </main>

          <aside className="hidden md:block">
            <div className="sticky top-24">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Our Practice</h3>
              <p className="text-gray-600">Learn more about our team and approach to patient care.</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
 
