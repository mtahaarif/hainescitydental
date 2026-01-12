'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Users } from 'lucide-react';

interface StaffMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
}

const staffMembers: StaffMember[] = [
  {
    id: 'danyelle',
    name: 'Danyelle',
    role: 'Office Manager',
    bio: 'Danyelle has worked in dentistry for over 13 years. She attained her Expanded Functions certificate and Radiology license at the University of Florida and has been employed at Haines City Dental for the past 10 years.',
    image: '/Danyelle.jpg',
  },
  {
    id: 'heather',
    name: 'Heather',
    role: 'Patient Coordinator',
    bio: 'Heather has worked for Haines City Dental since August 2011. She brings a positive attitude and a warm smile to every patient interaction. In her spare time, she works in ministry at her church and enjoys church functions and spending time with family and friends.',
    image: '/Heather.jpg',
  },
  {
    id: 'decole',
    name: 'Decole',
    role: 'Patient Relationship',
    bio: 'Decole has worked for Haines City Dental since 2011 and is an integral part of our team. She truly loves her job because the office staff functions like one big family. Outside of work, Decole enjoys spending quality time with family and friends.',
    image: '/Decole.jpg',
  },
  {
    id: 'debbie',
    name: 'Debbie',
    role: 'Dental Hygienist RDH',
    bio: 'Debbie has worked in dentistry for over 25 years, bringing extensive experience and dedication to patient care. She attended Valencia Community College and graduated in 2002 with an associate degree in dental hygiene. Debbie has been employed at Haines City Dental for the past 11 years.',
    image: '/Debbie.jpg',
  },
  {
    id: 'dani',
    name: 'Dani',
    role: 'Dental Hygienist RDH, BASDH',
    bio: 'Dani has been a dedicated dental hygienist at Haines City Dental since May 2008. She graduated from Valencia College with her Associates of Applied Science Degree and completed her Bachelor\'s of Applied Science in Dental Hygiene from St. Petersburg College in 2011.',
    image: '/Dani.jpg',
  },
  {
    id: 'tonya',
    name: 'Tonya',
    role: 'Dental Assistant',
    bio: 'Tonya has been a dental assistant for 8 years and is deeply committed to patient care. Raised in Haines City, she brings a strong sense of community and focuses on making every patient feel comfortable and secure in our office.',
    image: '/Tonya.jpg',
  },
  {
    id: 'kristina',
    name: 'Kristina',
    role: 'Dental Assistant',
    bio: 'Kristina has been in dentistry for 9 years and received her Expanded Functions certification and Radiology license from Concorde/PHCC in 2004. She is dedicated to providing excellent patient care and support.',
    image: '/Kristina.jpg',
  },
  {
    id: 'dianilda',
    name: 'Dianilda',
    role: 'Dental Assistant',
    bio: 'Dianilda has worked in dentistry for over 15 years and brings extensive experience to the team. She obtained her Expanded Functions certification and Radiology at Miami Institute and oversees the office instruments.',
    image: '/Dianilda.jpg',
  },
  {
    id: 'karen',
    name: 'Karen',
    role: 'Dental Assistant',
    bio: 'Karen is a vibrant and bilingual dental assistant who brings energy and enthusiasm to the office. With extensive experience in dentistry, she is dedicated to helping others and providing exceptional patient care.',
    image: '/Karen.jpg',
  },
];

export default function StaffPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % staffMembers.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const prev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + staffMembers.length) % staffMembers.length);
  };

  const next = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % staffMembers.length);
  };

  const currentStaff = staffMembers[activeIndex];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.9,
    }),
  };

  return (
    <div ref={ref} className="min-h-screen pt-8 pb-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center"
      >
<h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          Meet The <span className="gradient-text">Staff</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Our dedicated staff is the heart of our practice, committed to providing exceptional patient care.
        </p>
      </motion.div>

      {/* Staff Carousel */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-strong p-8 sm:p-12 relative overflow-hidden min-h-[500px]"
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              className="flex flex-col items-center text-center"
            >
              {/* Image */}
              <motion.div
                className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-full overflow-hidden border-4 border-dental-blue-100 shadow-2xl mb-8"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={currentStaff.image}
                  alt={currentStaff.name}
                  fill
                  className="object-cover"
                />
              </motion.div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-4"
              >
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">{currentStaff.name}</h2>
                  <p className="text-dental-blue-600 text-xl font-medium">{currentStaff.role}</p>
                </div>
                
                <p className="text-gray-700 leading-relaxed text-lg max-w-2xl">
                  {currentStaff.bio}
                </p>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <motion.button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 glass-light rounded-full shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft className="w-6 h-6 text-dental-blue-600" />
          </motion.button>
          
          <motion.button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 glass-light rounded-full shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight className="w-6 h-6 text-dental-blue-600" />
          </motion.button>
        </motion.div>

        {/* Staff Grid Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 grid grid-cols-5 sm:grid-cols-9 gap-2"
        >
          {staffMembers.map((staff, index) => (
            <motion.button
              key={staff.id}
              onClick={() => {
                setDirection(index > activeIndex ? 1 : -1);
                setActiveIndex(index);
              }}
              className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden transition-all ${
                index === activeIndex 
                  ? 'ring-4 ring-dental-blue-500 scale-110' 
                  : 'opacity-60 hover:opacity-100'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Image
                src={staff.image}
                alt={staff.name}
                fill
                className="object-cover"
              />
            </motion.button>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
