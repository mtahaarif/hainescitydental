'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { Phone, Calendar, ArrowRight } from 'lucide-react';

export default function CallToAction() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Background gradient card */}
          <div className="absolute inset-0 bg-gradient-to-r from-dental-blue-500 via-dental-blue-600 to-dental-blue-700 rounded-3xl transform rotate-1" />
          
          <div className="glass-strong p-8 sm:p-12 lg:p-16 relative overflow-hidden">
            {/* Decorative elements */}
            <motion.div
              className="absolute top-0 right-0 w-64 h-64 bg-dental-blue-400/20 rounded-full filter blur-3xl"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{ duration: 6, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-0 left-0 w-48 h-48 bg-dental-blue-300/20 rounded-full filter blur-3xl"
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{ duration: 8, repeat: Infinity, delay: 2 }}
            />

            <div className="relative z-10 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6"
              >
                <Calendar className="w-4 h-4 text-dental-blue-600" />
                <span className="text-sm font-medium text-dental-blue-700">Book Your Visit Today</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.3 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
              >
                Ready for a <span className="gradient-text">Brighter Smile</span>?
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.4 }}
                className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto"
              >
                Schedule your appointment today and experience the difference of personalized, 
                compassionate dental care. New patients are always welcome!
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <motion.a
                  href="tel:+18634228338"
                  className="btn-primary inline-flex items-center gap-2 group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Phone className="w-5 h-5" />
                  Call (863) 422-8338
                </motion.a>
                
                <Link href="/contact">
                  <motion.button
                    className="btn-secondary inline-flex items-center gap-2 group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Request Appointment
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </motion.button>
                </Link>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.7 }}
                className="mt-10 pt-8 border-t border-dental-blue-100/50"
              >
                <p className="text-gray-600">
                  <span className="font-semibold">Hours:</span> Mon – Thu: 7:00 AM – 3:00 PM
                </p>
                <p className="text-gray-600 mt-1">
                  <span className="font-semibold">Location:</span> 35914 Highway 27 South, Suite 2B, Haines City, FL 33844
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
