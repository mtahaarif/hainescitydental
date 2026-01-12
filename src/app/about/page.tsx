'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { Users, Target, Heart, Award, Clock, MapPin } from 'lucide-react';

export default function AboutPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const stats = [
    { value: '20+', label: 'Years of Experience', icon: Clock },
    { value: '5000+', label: 'Happy Patients', icon: Users },
    { value: '7', label: 'Dental Services', icon: Award },
    { value: '1', label: 'Convenient Location', icon: MapPin },
  ];

  return (
    <div ref={ref} className="min-h-screen pt-8 pb-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center"
      >
<h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          About <span className="gradient-text">Haines City Dental</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Providing exceptional dental care to our community since November 2006.
        </p>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <motion.div
              className="glass-strong p-8 relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src="/hainescitydentallogo.png"
                alt="Haines City Dental"
                width={500}
                height={400}
                className="w-full h-auto object-contain"
              />
              {/* Decorative rings */}
              <motion.div
                className="absolute inset-0 border-2 border-dental-blue-200/30 rounded-3xl"
                animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.1, 0.3] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-dental-blue-50 flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-dental-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-xl mb-2">Our Mission</h3>
                  <p className="text-gray-600 leading-relaxed">
                    To provide <span className="text-dental-blue-500 font-semibold">quality dental care</span> with 
                    integrity, compassion, and innovation. We strive to make every patient feel valued and cared for.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-dental-blue-50 flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-dental-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-xl mb-2">Our Values</h3>
                  <p className="text-gray-600 leading-relaxed">
                    <span className="text-dental-blue-500 font-semibold">Patient care</span>, 
                    <span className="text-dental-blue-500 font-semibold"> professional excellence</span>, and 
                    <span className="text-dental-blue-500 font-semibold"> community commitment</span> drive everything we do.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-dental-blue-50 flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-dental-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-xl mb-2">Our Commitment</h3>
                  <p className="text-gray-600 leading-relaxed">
                    We are committed to <span className="text-dental-blue-500 font-semibold">continuous learning</span> and 
                    staying at the forefront of <span className="text-dental-blue-500 font-semibold">dental technology</span> to 
                    provide the best possible care.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass-light p-8 text-center cursor-pointer"
            >
              <motion.div
                className="w-14 h-14 rounded-2xl bg-dental-blue-50 flex items-center justify-center mx-auto mb-4"
                whileHover={{ rotate: 10 }}
              >
                <stat.icon className="w-7 h-7 text-dental-blue-600" />
              </motion.div>
              <motion.p
                className="text-4xl font-bold gradient-text"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.9 + index * 0.1, type: 'spring' }}
              >
                {stat.value}
              </motion.p>
              <p className="text-gray-600 mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* History Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ delay: 0.8 }}
          className="mt-20 glass-strong p-8 sm:p-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Our <span className="gradient-text">Story</span>
          </h2>
          <div className="max-w-4xl mx-auto space-y-6 text-gray-600 leading-relaxed text-lg">
            <p>
              Since <span className="text-dental-blue-500 font-semibold">November 2006</span>, Haines City Dental 
              has been committed to providing exceptional dental care to our community. What started as a small 
              practice has grown into a full-service dental center serving thousands of patients.
            </p>
            <p>
              Our practice combines <span className="text-dental-blue-500 font-semibold">modern technology</span> with 
              <span className="text-dental-blue-500 font-semibold"> compassionate service</span> to ensure every patient 
              receives the best possible treatment. We believe that everyone deserves access to quality dental care 
              in a comfortable, welcoming environment.
            </p>
            <p>
              Today, our team of experienced professionals continues to uphold the same values that founded our 
              practice: <span className="text-dental-blue-500 font-semibold">integrity</span>, 
              <span className="text-dental-blue-500 font-semibold"> excellence</span>, and a genuine 
              <span className="text-dental-blue-500 font-semibold"> care for our patients</span>.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
