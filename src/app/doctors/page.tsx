'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, GraduationCap, Award, Heart, Users } from 'lucide-react';

interface DoctorSection {
  title: string;
  content: string;
}

interface Doctor {
  id: string;
  name: string;
  title: string;
  image: string;
  bioSections: DoctorSection[];
}

const doctors: Doctor[] = [
  {
    id: 'sohail-khan',
    name: 'Dr. Sohail Khan',
    title: 'DMD',
    image: '/dr-sohail-khan.jpg',
    bioSections: [
      {
        title: 'Education',
        content: 'Dr. Sohail Khan earned his Doctor of Dental Medicine degree from the prestigious Boston University, Henry M. Goldman School of Dental Medicine. During dental school, he volunteered his time working with the "Special Olympics."',
      },
      {
        title: 'Training',
        content: 'After receiving his degree, Dr. Khan enrolled in a residency program to further advance his training—an AEGD (Advanced Education in General Dentistry) through Lutheran Medical Center in New York.',
      },
      {
        title: 'Specializations',
        content: 'Dr. Khan\'s commitment to lifelong learning and continuing education has led him to pursue specialized training in Implant Dentistry, participating in a year-long MCG/Maxi course for Implant Dentistry with Georgia Health Science University College of Dental Medicine.',
      },
      {
        title: 'Professional Involvement',
        content: 'He is an active member of the American Academy of General Dentistry. Dr. Khan cares deeply about his patients and finds great satisfaction in helping them achieve healthy smiles. He enjoys incorporating his artistic talent into his dental work.',
      },
      {
        title: 'Personal Interests',
        content: 'Outside of dentistry, Dr. Khan\'s interests include traveling, sports, and photography.',
      },
    ],
  },
  {
    id: 'linda-park',
    name: 'Dr. Linda Park',
    title: 'DDS',
    image: '/dr-linda-park.jpg',
    bioSections: [
      {
        title: 'Education',
        content: 'Dr. Linda Park earned her Doctor of Dental Surgery degree in 2005 from Loma Linda University School of Dentistry in Loma Linda, California. During her dental education, she was actively involved in dental mission service work in Peru and Southern California.',
      },
      {
        title: 'Continuing Education',
        content: 'Since graduating, Dr. Park has actively pursued continuing education, with highlights including advanced education courses from the Pankey Institute, a leader in dental education and training.',
      },
      {
        title: 'Professional Memberships',
        content: 'She is an active member of both the American Dental Association and the Florida Dental Association, and continues to stay involved in dental missions through local volunteer dental programs in Florida.',
      },
      {
        title: 'Patient Care Philosophy',
        content: 'Dr. Park is dedicated to providing compassionate care and staying current with the latest dental advancements to best serve her patients.',
      },
      {
        title: 'Personal Interests',
        content: 'Outside of dentistry, Dr. Park\'s interests include spending time with family and friends, playing the piano, reading, sewing, and gardening.',
      },
    ],
  },
];

export default function DoctorsPage() {
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
        <div className="glass-strong p-8 sm:p-12 relative overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Image */}
            <div className="flex flex-col items-center">
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border-4 border-dental-blue-100 shadow-2xl hover:scale-[1.02] transition-transform duration-300">
                <Image
                  src={currentDoctor.image}
                  alt={currentDoctor.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="text-center mt-6">
                <h2 className="text-3xl font-bold text-gray-900">{currentDoctor.name}</h2>
                <p className="text-dental-blue-600 text-xl font-medium">{currentDoctor.title}</p>
              </div>
            </div>

            {/* Bio Content */}
            <div className="space-y-6">
              {/* Bio Section Tabs */}
              <div className="flex flex-wrap gap-2 mb-6">
                {currentDoctor.bioSections.map((section, idx) => {
                  const SectionIcon = sectionIcons[idx % sectionIcons.length];
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveBioSection(idx)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95 ${
                        idx === activeBioSection
                          ? 'bg-dental-blue-500 text-white shadow-lg'
                          : 'glass hover:bg-dental-blue-50 text-gray-700'
                      }`}
                    >
                      <SectionIcon className="w-4 h-4" />
                      {section.title}
                    </button>
                  );
                })}
              </div>

              {/* Bio Content */}
              <div className="glass-light p-8 min-h-[200px] transition-all duration-300">
                <h3 className="text-xl font-bold text-dental-blue-600 mb-4">
                  {currentDoctor.bioSections[activeBioSection].title}
                </h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {currentDoctor.bioSections[activeBioSection].content}
                </p>
              </div>

              {/* Bio Progress */}
              <div className="flex gap-2">
                {currentDoctor.bioSections.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1 rounded-full flex-1 transition-colors duration-300 ${
                      idx === activeBioSection ? 'bg-dental-blue-500' : 'bg-dental-blue-100'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <button
            onClick={prevDoctor}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 glass-light rounded-full shadow-lg hover:scale-110 active:scale-90 transition-transform"
            aria-label="Previous doctor"
          >
            <ChevronLeft className="w-6 h-6 text-dental-blue-600" />
          </button>
          
          <button
            onClick={nextDoctor}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 glass-light rounded-full shadow-lg hover:scale-110 active:scale-90 transition-transform"
            aria-label="Next doctor"
          >
            <ChevronRight className="w-6 h-6 text-dental-blue-600" />
          </button>
        </div>

        {/* Doctor Selection Dots */}
        <div className="flex justify-center gap-4 mt-8">
          {doctors.map((doctor, index) => (
            <button
              key={doctor.id}
              onClick={() => {
                setActiveIndex(index);
                setActiveBioSection(0);
              }}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95 ${
                index === activeIndex
                  ? 'bg-dental-blue-500 text-white shadow-lg'
                  : 'glass hover:bg-dental-blue-50 text-gray-700'
              }`}
            >
              {doctor.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
