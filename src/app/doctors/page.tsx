'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Users, GraduationCap, Award, Heart } from 'lucide-react';

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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeBioSection, setActiveBioSection] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveBioSection((prev) => {
        const isLastSection = prev === doctors[activeIndex].bioSections.length - 1;
        if (isLastSection) {
          setDirection(1);
          setActiveIndex((prevDoctor) => (prevDoctor + 1) % doctors.length);
          return 0;
        }
        return prev + 1;
      });
    }, 5000);

    return () => clearInterval(timer);
  }, [activeIndex]);

  const prevDoctor = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + doctors.length) % doctors.length);
    setActiveBioSection(0);
  };

  const nextDoctor = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % doctors.length);
    setActiveBioSection(0);
  };

  const currentDoctor = doctors[activeIndex];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  const sectionIcons = [GraduationCap, Award, Heart, Users, Heart];

  return (
    <div ref={ref} className="min-h-screen pt-8 pb-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center"
      >
<h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          Meet The <span className="gradient-text">Doctors</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Our experienced dentists are committed to providing exceptional care with a personal touch.
        </p>
      </motion.div>

      {/* Doctor Carousel */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-strong p-8 sm:p-12 relative overflow-hidden"
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
              className="grid lg:grid-cols-2 gap-12 items-start"
            >
              {/* Image */}
              <div className="flex flex-col items-center">
                <motion.div
                  className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border-4 border-dental-blue-100 shadow-2xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={currentDoctor.image}
                    alt={currentDoctor.name}
                    fill
                    className="object-cover"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-center mt-6"
                >
                  <h2 className="text-3xl font-bold text-gray-900">{currentDoctor.name}</h2>
                  <p className="text-dental-blue-600 text-xl font-medium">{currentDoctor.title}</p>
                </motion.div>
              </div>

              {/* Bio Content */}
              <div className="space-y-6">
                {/* Bio Section Tabs */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {currentDoctor.bioSections.map((section, idx) => {
                    const SectionIcon = sectionIcons[idx % sectionIcons.length];
                    return (
                      <motion.button
                        key={idx}
                        onClick={() => setActiveBioSection(idx)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                          idx === activeBioSection
                            ? 'bg-dental-blue-500 text-white shadow-lg'
                            : 'glass hover:bg-dental-blue-50 text-gray-700'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <SectionIcon className="w-4 h-4" />
                        {section.title}
                      </motion.button>
                    );
                  })}
                </div>

                {/* Bio Content */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeBioSection}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="glass-light p-8 min-h-[200px]"
                  >
                    <h3 className="text-xl font-bold text-dental-blue-600 mb-4">
                      {currentDoctor.bioSections[activeBioSection].title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {currentDoctor.bioSections[activeBioSection].content}
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* Bio Progress */}
                <div className="flex gap-2">
                  {currentDoctor.bioSections.map((_, idx) => (
                    <motion.div
                      key={idx}
                      className={`h-1 rounded-full flex-1 ${
                        idx === activeBioSection ? 'bg-dental-blue-500' : 'bg-dental-blue-100'
                      }`}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <motion.button
            onClick={prevDoctor}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 glass-light rounded-full shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft className="w-6 h-6 text-dental-blue-600" />
          </motion.button>
          
          <motion.button
            onClick={nextDoctor}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 glass-light rounded-full shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight className="w-6 h-6 text-dental-blue-600" />
          </motion.button>
        </motion.div>

        {/* Doctor Selection Dots */}
        <div className="flex justify-center gap-4 mt-8">
          {doctors.map((doctor, index) => (
            <motion.button
              key={doctor.id}
              onClick={() => {
                setDirection(index > activeIndex ? 1 : -1);
                setActiveIndex(index);
                setActiveBioSection(0);
              }}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                index === activeIndex
                  ? 'bg-dental-blue-500 text-white shadow-lg'
                  : 'glass hover:bg-dental-blue-50 text-gray-700'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {doctor.name}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
