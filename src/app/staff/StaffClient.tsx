"use client";

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
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="-mx-4 sm:mx-0 px-4 sm:px-0 bg-dental-blue-50/90 border border-dental-blue-100 sm:rounded-3xl rounded-none p-6 md:p-8 shadow-sm grid md:grid-cols-4 gap-6">
          <main className="md:col-span-3">
            <div className="mb-8 text-center">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                Meet The <span className="gradient-text">Staff</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto text-center">
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
                  <h3 className="text-2xl sm:text-3xl font-semibold text-gray-900 mt-2">{current.name}</h3>
                  <p className="mt-4 text-gray-600 max-w-2xl">{current.bio}</p>

                  <div className="mt-6 flex items-center gap-4">
                    <button onClick={prev} aria-label="Previous" className="p-2 rounded-full bg-white/60 hover:bg-white">
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button onClick={next} aria-label="Next" className="p-2 rounded-full bg-white/60 hover:bg-white">
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </div>
                </div>

                {/* Thumbnails */}
                <div className="mt-8 flex items-center justify-center gap-3 flex-wrap">
                  {staffMembers.map((s, idx) => (
                    <button
                      key={s.name + idx}
                      onClick={() => setActiveIndex(idx)}
                      className={`w-16 h-16 rounded-full overflow-hidden border-2 ${
                        idx === activeIndex ? 'border-dental-blue-600' : 'border-transparent'
                      }`}
                      aria-label={`Show ${s.name}`}
                    >
                      <Image src={s.image} alt={s.name} width={64} height={64} className="object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </main>

          {/* Sidebar or placeholder column for additional info if needed */}
          <aside className="hidden md:block md:col-span-1">
            {/* reserved for contact or scheduling CTA */}
            <div className="p-4 rounded-xl bg-white/60 h-full flex items-center justify-center">Contact our office to schedule</div>
          </aside>
        </div>
      </div>
    </section>
  );
}
