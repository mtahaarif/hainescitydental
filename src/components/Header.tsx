'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, Phone } from 'lucide-react';

const serviceDropdown = [
  { name: 'Cosmetic Dentistry', href: '/services?tab=cosmetic' },
  { name: 'General Dentistry', href: '/services?tab=general' },
  { name: 'Implant Dentistry', href: '/services?tab=implant' },
  { name: 'Periodontal Therapy', href: '/services?tab=periodontal' },
  { name: 'Sedation Dentistry', href: '/services?tab=sedation' },
  { name: 'Orthodontics', href: '/services?tab=orthodontics' },
  { name: 'Snoring & Sleep Apnea', href: '/services?tab=snoring' },
];

// team dropdown removed since Meet the Doctors/Staff pages were deleted
const teamDropdown: any[] = [];

const patientInfoDropdown = [
  { name: 'New Patients', href: '/patient-info?tab=new-patients' },
  { name: 'New Patient Forms', href: '/patient-info?tab=forms' },
  { name: 'HIPAA Forms', href: '/patient-info?tab=hipaa' },
];

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Our Practice', href: '/our-practice' },
  { name: 'Services', href: '/services', dropdown: serviceDropdown, clickable: true },
  { name: 'Our Team', href: '/our-team' },
  { name: 'Patient Information', href: '/patient-info', dropdown: patientInfoDropdown, clickable: true },
  { name: 'News', href: '/news' },
  { name: 'Contact Us', href: '/contact' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileOpenDropdowns, setMobileOpenDropdowns] = useState<Record<string, boolean>>({});
  const pathname = usePathname();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  const handleMouseEnter = (name: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(name);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  return (
    <motion.header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled ? 'glass-strong shadow-lg' : 'glass'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full px-6 lg:px-12">
        <nav className="flex items-center justify-between h-20">
          
          {/* Logo Section - Increased size by 400% */}
          <Link href="/" className="logo-link flex items-center flex-shrink-0 mr-4 no-underline hover:no-underline focus:no-underline active:no-underline">
            <Image
              src="/hainescitydentallogo.png"
              alt="Haines City Dental Logo"
              width={560}
              height={192}
              className="h-[192px] w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex gap-5 xl:gap-8 items-center justify-center">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() => link.dropdown && handleMouseEnter(link.name)}
                onMouseLeave={handleMouseLeave}
              >
                {link.dropdown ? (
                  <Link
                    href={link.href}
                    className="flex items-center gap-1 px-1 py-2 text-sm font-medium tracking-wide whitespace-nowrap text-gray-700 hover:text-dental-blue-600 transition-colors"
                  >
                    {link.name}
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform ${
                        activeDropdown === link.name ? 'rotate-180' : ''
                      }`}
                    />
                  </Link>
                ) : (
                  <Link
                    href={link.href}
                    className={`px-1 py-2 text-sm font-medium tracking-wide whitespace-nowrap transition-colors ${
                      pathname === link.href
                        ? 'text-dental-blue-600 border-b-2 border-dental-blue-600'
                        : 'text-dental-blue-600/90 hover:text-dental-blue-700'
                    }`}
                  >
                    {link.name}
                  </Link>
                )}

                {/* Dropdown */}
                <AnimatePresence>
                  {link.dropdown && activeDropdown === link.name && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute left-1/2 -translate-x-1/2 mt-1 w-56 glass-light rounded-2xl shadow-xl py-2 z-50"
                    >
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="block px-6 py-2.5 text-sm whitespace-nowrap text-gray-700 hover:text-dental-blue-600 hover:bg-dental-blue-50/80 transition-all"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="flex items-center justify-end gap-3 flex-shrink-0 ml-4">
            <motion.a
              href="tel:+18634228338"
              className="hidden lg:inline-flex items-center gap-2 bg-dental-blue-600 text-white px-5 py-2 rounded-full shadow-sm whitespace-nowrap"
              style={{ height: 40 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Phone className="w-3.5 h-3.5 text-white" />
              <span className="text-sm font-semibold">(863) 422-8338</span>
            </motion.a>

            {/* Mobile Controls */}
            <div className="lg:hidden flex items-center gap-2">
              <a
                href="tel:+18634228338"
                className="flex items-center justify-center h-10 w-10 p-2 rounded-full bg-dental-blue-600 text-white shadow-sm"
                aria-label="Call"
              >
                <Phone className="w-5 h-5 text-white" />
              </a>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg hover:bg-white/30"
                aria-label="Menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden pb-4 overflow-hidden"
            >
              {navLinks.map((link) => (
                <div key={link.name} className="border-b border-gray-100 last:border-0">
                  <div className="flex items-center justify-between">
                    <Link
                      href={link.href}
                      onClick={() => {
                        setIsOpen(false);
                        setMobileOpenDropdowns((prev) => ({ ...prev, [link.name]: false }));
                      }}
                      className="block px-4 py-3 text-dental-blue-600 hover:text-dental-blue-700"
                    >
                      {link.name}
                    </Link>

                    {link.dropdown && (
                      <button
                        onClick={() =>
                          setMobileOpenDropdowns((prev) => ({ ...prev, [link.name]: !prev[link.name] }))
                        }
                        aria-expanded={!!mobileOpenDropdowns[link.name]}
                        className="p-3"
                      >
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${mobileOpenDropdowns[link.name] ? 'rotate-180' : ''}`}
                        />
                      </button>
                    )}
                  </div>

                  <AnimatePresence>
                    {link.dropdown && mobileOpenDropdowns[link.name] && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="pl-6 overflow-hidden"
                      >
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className="block px-4 py-2 text-sm text-dental-blue-500 hover:text-dental-blue-700"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}