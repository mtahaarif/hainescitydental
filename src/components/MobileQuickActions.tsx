'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Phone, MapPin } from 'lucide-react';

export default function MobileQuickActions() {
  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="fixed bottom-0 left-0 right-0 z-50 lg:hidden"
    >
      {/* Gradient fade effect */}
      <div className="absolute inset-x-0 -top-6 h-6 bg-gradient-to-t from-white/80 to-transparent pointer-events-none" />
      
      <div className="bg-white/95 backdrop-blur-xl border-t border-gray-200/50 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] safe-area-bottom">
        <div className="flex items-center justify-around py-2 px-4">
          {/* Call Button */}
          <motion.a
            href="tel:+18634228338"
            className="flex flex-col items-center gap-1 py-2 px-6 rounded-xl active:bg-dental-blue-50 transition-colors"
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/30">
              <Phone className="w-6 h-6 text-white" />
            </div>
            <span className="text-xs font-semibold text-gray-700">Call Now</span>
          </motion.a>

          {/* Schedule Button */}
          <motion.div whileTap={{ scale: 0.95 }}>
            <Link
              href="/contact"
              className="flex flex-col items-center gap-1 py-2 px-4"
            >
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-dental-blue-500 to-dental-blue-600 flex items-center justify-center shadow-lg shadow-dental-blue-500/30 ring-4 ring-dental-blue-100">
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-xs font-bold text-dental-blue-600">Book Now</span>
            </Link>
          </motion.div>

          {/* Directions Button */}
          <motion.a
            href="https://maps.google.com/?q=Haines+City+Dental+Florida"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1 py-2 px-6 rounded-xl active:bg-dental-blue-50 transition-colors"
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <span className="text-xs font-semibold text-gray-700">Directions</span>
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}
