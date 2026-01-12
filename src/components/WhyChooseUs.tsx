'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Shield, Clock, Award, Heart, Users, Zap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: Shield,
    title: 'Advanced Technology',
    description: 'State-of-the-art equipment for precise diagnoses and comfortable treatments.',
  },
  {
    icon: Clock,
    title: 'Convenient Hours',
    description: 'Flexible scheduling with early morning appointments to fit your busy life.',
  },
  {
    icon: Award,
    title: '20+ Years Experience',
    description: 'Our skilled team has been serving the community since November 2006.',
  },
  {
    icon: Heart,
    title: 'Patient-Centered Care',
    description: 'Your comfort and well-being are our top priorities at every visit.',
  },
  {
    icon: Users,
    title: 'Family Friendly',
    description: 'Welcoming patients of all ages, from children to seniors.',
  },
  {
    icon: Zap,
    title: 'Emergency Services',
    description: 'Same-day emergency appointments available when you need them most.',
  },
];

export default function WhyChooseUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-dental-blue-100/30 rounded-full filter blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-dental-blue-200/20 rounded-full filter blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            x: [0, -30, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, delay: 2 }}
        />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
          >
<h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Exceptional Care for <span className="gradient-text">Exceptional Smiles</span>
            </h2>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              At Haines City Dental, we combine <span className="text-dental-blue-500 font-semibold">advanced dental technology</span> with 
              <span className="text-dental-blue-500 font-semibold"> personalized care</span> to ensure every patient receives 
              the best possible treatment in a comfortable environment.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {[
                { value: '20+', label: 'Years' },
                { value: '5000+', label: 'Patients' },
                { value: '98%', label: 'Satisfaction' },
              ].map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.4 + idx * 0.1 }}
                  className="text-center"
                >
                  <motion.p
                    className="text-3xl sm:text-4xl font-bold gradient-text"
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ delay: 0.6 + idx * 0.1, type: 'spring' }}
                  >
                    {stat.value}
                  </motion.p>
                  <p className="text-gray-600 text-sm mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Features Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.03, y: -5 }}
                className="glass-light p-6 group cursor-pointer"
              >
                <motion.div
                  className="w-12 h-12 rounded-xl bg-dental-blue-50 flex items-center justify-center mb-4 group-hover:bg-dental-blue-100 transition-colors"
                  whileHover={{ rotate: 10 }}
                >
                  <feature.icon className="w-6 h-6 text-dental-blue-600" />
                </motion.div>
                <h3 className="font-bold text-gray-900 mb-2 group-hover:text-dental-blue-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
