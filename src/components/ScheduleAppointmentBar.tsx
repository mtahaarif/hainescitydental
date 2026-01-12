'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, Phone, ArrowRight } from 'lucide-react';

export default function ScheduleAppointmentBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
      className="flex justify-center px-4 py-6 mt-[80px]"
    >
      <div className="w-[90%] lg:w-[85%] xl:w-[80%]">
        <motion.div
          className="glass-strong p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          whileHover={{ 
            boxShadow: '0 0 40px rgba(59, 130, 246, 0.25)',
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Left Content */}
          <div className="flex items-center gap-4">
            <motion.div
              className="w-12 h-12 rounded-full bg-gradient-to-br from-dental-blue-400 to-dental-blue-600 flex items-center justify-center shadow-lg"
              animate={{ 
                scale: [1, 1.1, 1],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Calendar className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                Ready for Your <span className="gradient-text">Best Smile</span>?
              </h3>
              <p className="text-sm text-gray-600 hidden sm:block">
                Schedule your appointment today and experience exceptional dental care
              </p>
            </div>
          </div>

          {/* Right Content - Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            {/* Call Button */}
            <motion.a
              href="tel:+18634228338"
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/80 border border-dental-blue-200 text-dental-blue-600 font-semibold hover:bg-dental-blue-50 transition-all w-full sm:w-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Phone className="w-4 h-4" />
              <span>(863) 422-8338</span>
            </motion.a>

            {/* Schedule Button */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-dental-blue-500 to-dental-blue-600 text-white font-semibold shadow-lg shadow-dental-blue-300/30 hover:shadow-dental-blue-400/40 transition-all w-full"
              >
                <span>Schedule Appointment</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
