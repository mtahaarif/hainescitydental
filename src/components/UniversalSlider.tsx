'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

interface Slide {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  color: string;
}

export default function UniversalSlider() {
  const slides: Slide[] = [
    {
      id: 'services',
      title: 'Comprehensive Dental Care',
      subtitle: 'State-of-the-art treatments for your smile',
      image: '/banner31-1297x300.jpg',
      color: 'from-dental-blue-400 to-dental-blue-700',
    },
    {
      id: 'team',
      title: 'Expert Dental Professionals',
      subtitle: 'Your health and comfort are our priority',
      image: '/banner51-1297x300.jpg',
      color: 'from-cyan-400 to-blue-600',
    },
    {
      id: 'experience',
      title: '20+ Years of Excellence',
      subtitle: 'Trusted by thousands of happy patients',
      image: '/banner61-1297x300.jpg',
      color: 'from-blue-300 to-cyan-500',
    },
    {
      id: 'community',
      title: 'Community Focused',
      subtitle: 'Giving back through dental missions',
      image: '/banner71-1297x300.jpg',
      color: 'from-blue-600 to-blue-800',
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [direction, setDirection] = useState(1);

  const goToNext = useCallback(() => {
    setDirection(1);
    setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
  }, [slides.length]);

  const goToPrevious = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
    setAutoPlay(false);
  }, [slides.length]);

  const goToSlide = useCallback((index: number) => {
    if (index === activeIndex) return;
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
    setAutoPlay(false);
  }, [activeIndex]);

  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      goToNext();
    }, 6000);

    return () => clearInterval(interval);
  }, [autoPlay, goToNext]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95,
    }),
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3,
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  return (
    <div className="flex justify-center pt-4 sm:pt-6 pb-6 sm:pb-8 px-4 sm:px-0">
      <div className="w-full sm:w-[90%] lg:w-[85%] xl:w-[80%] relative group">
        {/* Slide Container */}
        <motion.div
          className="relative w-full aspect-[4/3] sm:aspect-[16/7] lg:aspect-[1297/300] rounded-2xl sm:rounded-3xl overflow-hidden glass-strong"
          whileHover={{ 
            boxShadow: '0 0 60px rgba(59, 130, 246, 0.3)',
          }}
          transition={{ duration: 0.5 }}
        >
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.4 },
                scale: { duration: 0.4 },
              }}
              className="absolute inset-0"
            >
              {/* Background Image */}
              <Image
                src={slides[activeIndex].image}
                alt={slides[activeIndex].title}
                fill
                className="object-cover"
                priority
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/20" />
              
              {/* Animated Gradient Accent */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-r ${slides[activeIndex].color} opacity-20`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.2 }}
                transition={{ duration: 0.8 }}
              />

              {/* Content */}
              <motion.div
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                className="absolute inset-0 flex flex-col items-center justify-center px-8 sm:px-12"
              >
                <motion.h2
                  className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold text-white text-center mb-2 sm:mb-3 leading-tight"
                  style={{
                    textShadow: '0 4px 20px rgba(0,0,0,0.5)',
                  }}
                >
                  {slides[activeIndex].title}
                </motion.h2>
                <motion.p
                  className="text-xs sm:text-sm md:text-base lg:text-xl text-white/90 text-center"
                  style={{
                    textShadow: '0 2px 10px rgba(0,0,0,0.4)',
                  }}
                >
                  {slides[activeIndex].subtitle}
                </motion.p>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Left Arrow */}
          <motion.button
            onClick={goToPrevious}
            onMouseEnter={() => setAutoPlay(false)}
            onMouseLeave={() => setAutoPlay(true)}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full glass opacity-70 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300 active:scale-95"
            whileHover={{ scale: 1.1, x: -2 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white drop-shadow-lg" />
          </motion.button>

          {/* Right Arrow */}
          <motion.button
            onClick={() => { goToNext(); setAutoPlay(false); }}
            onMouseEnter={() => setAutoPlay(false)}
            onMouseLeave={() => setAutoPlay(true)}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full glass opacity-70 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300 active:scale-95"
            whileHover={{ scale: 1.1, x: 2 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white drop-shadow-lg" />
          </motion.button>

          {/* Dot Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300">
            {slides.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToSlide(index)}
                className={`!min-h-0 !p-0 rounded-full transition-all duration-500 ${
                  index === activeIndex
                    ? 'w-6 h-2 bg-white shadow-lg'
                    : 'w-2 h-2 bg-white/50 hover:bg-white/80'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
            <motion.div
              className="h-full bg-gradient-to-r from-dental-blue-400 to-dental-blue-600"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 6, ease: 'linear' }}
              key={activeIndex}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
