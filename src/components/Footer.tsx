'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter } from 'lucide-react';

const quickLinks = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Meet the Doctors', href: '/doctors' },
  { name: 'About Us', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

const services = [
  { name: 'Cosmetic Dentistry', href: '/services?tab=cosmetic' },
  { name: 'General Dentistry', href: '/services?tab=general' },
  { name: 'Implant Dentistry', href: '/services?tab=implant' },
  { name: 'Sedation Dentistry', href: '/services?tab=sedation' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="glass-strong pt-0 pb-8 md:pb-8 pb-24 px-4 sm:px-6 lg:px-8 mt-2 mx-4 sm:mx-6 lg:mx-8 mb-6 rounded-3xl no-print">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 py-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <Link href="/" className="inline-block">
              <Image
                src="/hainescitydentallogo.png"
                alt="Haines City Dental Logo"
                width={180}
                height={115}
                className="h-28 w-auto object-contain"
              />
            </Link>
            <p className="text-gray-600">
              Providing <span className="text-dental-blue-500 font-semibold">exceptional dental care</span> to 
              our community since <span className="text-dental-blue-500 font-semibold">November 2006</span>.
            </p>
            {/* Social Links */}
            <div className="flex gap-4 pt-2">
              {[
                { icon: Facebook, href: '#' },
                { icon: Instagram, href: '#' },
                { icon: Twitter, href: '#' },
              ].map((social, idx) => (
                <motion.a
                  key={idx}
                  href={social.href}
                  className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-600 hover:text-dental-blue-600 transition-colors"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="font-bold text-gray-900 mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-dental-blue-600 transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-dental-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-bold text-gray-900 mb-4">Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="text-gray-600 hover:text-dental-blue-600 transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-dental-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="font-bold text-gray-900 mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-dental-blue-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600">
                  35914 Highway 27 South, Suite 2B<br />
                  Haines City, FL 33844
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-dental-blue-500 flex-shrink-0" />
                <a href="tel:+18634228338" className="text-gray-600 hover:text-dental-blue-600 transition-colors">
                  (863) 422-8338
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-dental-blue-500 flex-shrink-0" />
                <a href="mailto:office@hainescitydental.com" className="text-gray-600 hover:text-dental-blue-600 transition-colors">
                  office@hainescitydental.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-dental-blue-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600">
                  Mon – Thu: 7:00 AM – 3:00 PM<br />
                  Fri – Sun: Closed
                </span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-dental-blue-100/50 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-center text-gray-600">
              © {currentYear} Haines City Dental. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-gray-500">
              <Link href="/privacy" className="hover:text-dental-blue-600 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-dental-blue-600 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
