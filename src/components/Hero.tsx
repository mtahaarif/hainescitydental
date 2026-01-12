'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Award, Users, ArrowRight } from 'lucide-react';

export default function Hero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <section ref={ref} className="pt-8 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="space-y-8"
          >
            <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900">
              Your <span className="gradient-text">Smile</span>,<br />
              <span className="gradient-text">Our Priority</span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-lg text-gray-600 leading-relaxed max-w-xl">
              Experience <span className="text-dental-blue-500 font-semibold">modern dental care</span> with 
              state-of-the-art technology and <span className="text-dental-blue-500 font-semibold">compassionate service</span>. 
              We&apos;re dedicated to creating <span className="text-dental-blue-500 font-semibold">beautiful, healthy smiles</span> for 
              the entire family.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/contact" className="btn-primary inline-flex items-center gap-2 group">
                  Schedule Appointment
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/services" className="btn-secondary inline-flex items-center gap-2">
                  Explore Services
                </Link>
              </motion.div>
            </motion.div>

            {/* Stats */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-6 pt-8">
              <motion.div
                className="glass-light p-6 cursor-pointer"
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: '0 0 40px rgba(59,130,246,0.25)',
                }}
                transition={{ duration: 0.3 }}
              >
                <Award className="w-8 h-8 text-dental-blue-600 mb-3" />
                <p className="font-semibold text-gray-900">Award Winning</p>
                <p className="text-sm text-gray-600">Trusted care</p>
              </motion.div>
              <motion.div
                className="glass-light p-6 cursor-pointer"
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: '0 0 40px rgba(59,130,246,0.25)',
                }}
                transition={{ duration: 0.3 }}
              >
                <Users className="w-8 h-8 text-dental-blue-600 mb-3" />
                <p className="font-semibold text-gray-900">5000+ Patients</p>
                <p className="text-sm text-gray-600">Happy smiles</p>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            className="hidden lg:flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.div
              variants={floatingVariants}
              animate="animate"
              className="relative"
            >
              <motion.div
                className="glass-strong p-12 w-full h-96 flex items-center justify-center relative overflow-hidden"
                whileHover={{ 
                  boxShadow: '0 0 50px rgba(59,130,246,0.3)',
                }}
                transition={{ duration: 0.5 }}
              >
                {/* Animated rings */}
                <motion.div
                  className="absolute inset-0 border-2 border-dental-blue-200/30 rounded-3xl"
                  animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.1, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <motion.div
                  className="absolute inset-4 border-2 border-dental-blue-300/20 rounded-3xl"
                  animate={{ scale: [1, 1.05, 1], opacity: [0.2, 0.1, 0.2] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                />
                
                <Image
                  src="/hainescitydentallogo.png"
                  alt="Haines City Dental Logo"
                  width={400}
                  height={300}
                  className="w-full h-full object-contain relative z-10"
                  priority
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <motion.div
        className="absolute top-20 right-10 w-72 h-72 bg-dental-blue-200/30 rounded-full mix-blend-multiply filter blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute -bottom-8 left-20 w-72 h-72 bg-dental-blue-100/40 rounded-full mix-blend-multiply filter blur-3xl"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, delay: 2 }}
      />
    </section>
  );
}
