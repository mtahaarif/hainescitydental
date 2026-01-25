'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, GraduationCap, Award, Heart, Users } from 'lucide-react';

interface DoctorSection {
  title: string;
  content: string;
}

interface Doctor {
  name: string;
  title: string;
  image: string;
  bioSections: DoctorSection[];
}

interface DoctorsClientProps {
  doctors: Doctor[];
}

export default function DoctorsClient({ doctors }: DoctorsClientProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeBioSection, setActiveBioSection] = useState(0);

  const prevDoctor = () => {
    setActiveIndex((prev) => (prev - 1 + doctors.length) % doctors.length);
    setActiveBioSection(0);
  };

  const nextDoctor = () => {
    setActiveIndex((prev) => (prev + 1) % doctors.length);
    setActiveBioSection(0);
  };

  const currentDoctor = doctors[activeIndex];
  const sectionIcons = [GraduationCap, Award, Heart, Users, Heart];

  return (
    <div className="min-h-screen pt-8 pb-16">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          Meet The <span className="gradient-text">Doctors</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Our experienced dentists are committed to providing exceptional care with a personal touch.
        </p>
      </div>

      {/* Doctor Carousel */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-strong p-4 sm:p-8 md:p-12 relative overflow-visible lg:overflow-hidden">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start pb-16 lg:pb-0">
            {/* Image */}
            <div className="flex flex-col items-center w-full">
              <div className="relative w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-dental-blue-100 shadow-2xl hover:scale-[1.02] transition-transform duration-300">
                <Image
                  src={currentDoctor.image}
                  alt={currentDoctor.name}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="text-center mt-4 sm:mt-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{currentDoctor.name}</h2>
                <p className="text-dental-blue-600 text-lg sm:text-xl font-medium">{currentDoctor.title}</p>
              </div>
            </div>

            {/* Bio Content */}
            <div className="space-y-4 sm:space-y-6 w-full">
              {/* Bio Section Tabs */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-4 sm:mb-6">
                {currentDoctor.bioSections.map((section, idx) => {
                  const SectionIcon = sectionIcons[idx % sectionIcons.length];
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveBioSection(idx)}
                      className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95 ${
                        idx === activeBioSection
                          ? 'bg-dental-blue-500 text-white shadow-lg'
                          : 'glass hover:bg-dental-blue-50 text-gray-700'
                      }`}
                    >
                      <SectionIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                      {section.title}
                    </button>
                  );
                })}
              </div>

              {/* Bio Section Content */}
              <div className="glass-light p-4 sm:p-6 rounded-2xl">
                <h3 className="text-lg sm:text-xl font-bold text-dental-blue-600 mb-3 sm:mb-4">
                  {currentDoctor.bioSections[activeBioSection].title}
                </h3>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                  {currentDoctor.bioSections[activeBioSection].content}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          {doctors.length > 1 && (
            <>
              <button
                onClick={prevDoctor}
                className="absolute left-2 sm:left-4 top-[100px] sm:top-[140px] lg:top-1/2 lg:-translate-y-1/2 p-2 sm:p-3 glass-light rounded-full shadow-lg transition-transform hover:scale-110 active:scale-90 z-10"
                aria-label="Previous doctor"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-dental-blue-600" />
              </button>

              <button
                onClick={nextDoctor}
                className="absolute right-2 sm:right-4 top-[100px] sm:top-[140px] lg:top-1/2 lg:-translate-y-1/2 p-2 sm:p-3 glass-light rounded-full shadow-lg transition-transform hover:scale-110 active:scale-90 z-10"
                aria-label="Next doctor"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-dental-blue-600" />
              </button>
            </>
          )}
        </div>

        {/* Navigation Dots */}
        {doctors.length > 1 && (
          <div className="flex justify-center gap-3 mt-8">
            {doctors.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveIndex(index);
                  setActiveBioSection(0);
                }}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? 'w-9 bg-dental-blue-500'
                    : 'w-3 bg-dental-blue-200 hover:bg-dental-blue-300'
                }`}
                aria-label={`View ${doctors[index].name}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
