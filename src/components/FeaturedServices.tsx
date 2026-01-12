'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { Heart, Zap, Shield, Clock, Smile, ArrowRight, Star } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  color: string;
}

const services: Service[] = [
  {
    icon: Star,
    title: 'Cosmetic Dentistry',
    description: 'Transform your smile with professional whitening, veneers, and smile makeovers.',
    href: '/services?tab=cosmetic',
    color: 'from-pink-500 to-rose-500',
  },
  {
    icon: Heart,
    title: 'General Dentistry',
    description: 'Comprehensive care including cleanings, fillings, and preventive treatments.',
    href: '/services?tab=general',
    color: 'from-red-500 to-pink-500',
  },
  {
    icon: Zap,
    title: 'Implant Dentistry',
    description: 'Permanent solutions for missing teeth with natural-looking dental implants.',
    href: '/services?tab=implant',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    icon: Shield,
    title: 'Periodontal Therapy',
    description: 'Expert gum disease treatment and soft tissue management.',
    href: '/services?tab=periodontal',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Clock,
    title: 'Sedation Dentistry',
    description: 'Relaxed, anxiety-free dental care with safe sedation options.',
    href: '/services?tab=sedation',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Smile,
    title: 'Orthodontics',
    description: 'Achieve straighter teeth with ClearCorrect invisible aligners.',
    href: '/services?tab=orthodontics',
    color: 'from-purple-500 to-violet-500',
  },
];

export default function FeaturedServices() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  return (
    <section ref={ref} className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
<h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Comprehensive <span className="gradient-text">Dental Care</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From routine check-ups to advanced procedures, we offer a full range of 
            dental services to keep your smile healthy and beautiful.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="group"
            >
              <Link href={service.href}>
                <div className="glass-light p-8 h-full transition-all duration-500 group-hover:shadow-[0_0_40px_rgba(59,130,246,0.25)] relative overflow-hidden">
                  {/* Gradient overlay on hover */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  />
                  
                  {/* Icon */}
                  <motion.div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 relative z-10`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <service.icon className="w-7 h-7 text-white" />
                  </motion.div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-dental-blue-600 transition-colors relative z-10">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 relative z-10">
                    {service.description}
                  </p>

                  <motion.div
                    className="flex items-center gap-2 text-dental-blue-600 font-medium relative z-10"
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                  >
                    Learn more
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </motion.div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <Link href="/services">
            <motion.button
              className="btn-secondary inline-flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Services
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
