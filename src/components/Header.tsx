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

const teamDropdown = [
  { name: 'Meet the Doctors', href: '/doctors' },
  { name: 'Meet the Staff', href: '/staff' },
];

const patientInfoDropdown = [
  { name: 'New Patients', href: '/patient-info?tab=new-patients' },
  { name: 'New Patient Forms', href: '/patient-info?tab=forms' },
  { name: 'HIPAA Forms', href: '/patient-info?tab=hipaa' },
  { name: 'Current Specials', href: '/patient-info?tab=specials' },
];

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Our Practice', href: '/about' },
  { name: 'Services', href: '/services', dropdown: serviceDropdown, clickable: true },
  { name: 'Our Team', href: '/our-team', dropdown: teamDropdown, clickable: true },
  { name: 'Patient Information', href: '/patient-info', dropdown: patientInfoDropdown, clickable: true },
  { name: 'News', href: '/news' },
  { name: 'Contact Us', href: '/contact' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const dropdownVariants = {
    hidden: { 
      opacity: 0, 
      y: -10, 
      scale: 0.95,
      transition: { duration: 0.2 }
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1]
      }
    },
  };

  const mobileMenuVariants = {
    hidden: { 
      opacity: 0, 
      height: 0,
      transition: { duration: 0.3 }
    },
    visible: { 
      opacity: 1, 
      height: 'auto',
      transition: { 
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1]
      }
    },
  };

  return (
    <motion.header
      className={`fixed w-full top-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass-strong shadow-lg' : 'glass'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="grid grid-cols-3 items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative h-32 w-auto"
            >
              <Image
                src="/hainescitydentallogo.png"
                alt="Haines City Dental Logo"
                width={200}
                height={128}
                className="h-32 w-auto object-contain"
                priority
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex gap-8 items-center justify-center col-start-2">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() => link.dropdown && handleMouseEnter(link.name)}
                onMouseLeave={handleMouseLeave}
              >
                {link.dropdown ? (
                  link.clickable ? (
                    <Link
                      href={link.href}
                      className="flex items-center gap-1 text-gray-700 hover:text-dental-blue-600 font-medium transition-colors duration-300"
                    >
                      {link.name}
                      <motion.div
                        animate={{ rotate: activeDropdown === link.name ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </motion.div>
                    </Link>
                  ) : (
                    <button className="flex items-center gap-1 text-gray-700 hover:text-dental-blue-600 font-medium transition-colors duration-300">
                      {link.name}
                      <motion.div
                        animate={{ rotate: activeDropdown === link.name ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </motion.div>
                    </button>
                  )
                ) : (
                  <Link
                    href={link.href}
                    className={`font-medium transition-colors duration-300 inline-block px-2 ${
                      pathname === link.href
                        ? 'text-dental-blue-600 border-b-2 border-dental-blue-600 pb-1'
                        : 'text-gray-700 hover:text-dental-blue-600'
                    }`}
                  >
                    <motion.span
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.2 }}
                      className="inline-block"
                    >
                      {link.name}
                    </motion.span>
                  </Link>
                )}

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {link.dropdown && activeDropdown === link.name && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      className="absolute left-0 mt-2 w-56 glass-light rounded-2xl shadow-xl py-2 z-50 overflow-hidden"
                    >
                      {link.dropdown.map((item, idx) => (
                        <motion.div
                          key={item.name}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                        >
                          <Link
                            href={item.href}
                            className="block px-6 py-2.5 text-gray-700 hover:text-dental-blue-600 hover:bg-dental-blue-50/80 transition-all duration-300"
                          >
                            {item.name}
                          </Link>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <motion.a
            href="tel:+18634228338"
            className="hidden lg:flex items-center gap-2 btn-primary justify-end col-start-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Phone className="w-4 h-4" />
            Call Now
          </motion.a>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden p-2 rounded-lg hover:bg-white/30 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="lg:hidden pb-4 overflow-hidden"
            >
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  {link.dropdown ? (
                    <MobileDropdown link={link} />
                  ) : (
                    <Link
                      href={link.href}
                      className={`block px-4 py-3 text-gray-700 hover:text-dental-blue-600 transition-colors min-h-[48px] flex items-center ${
                        pathname === link.href ? 'text-dental-blue-600 font-semibold' : ''
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </Link>
                  )}
                </motion.div>
              ))}
              <motion.a
                href="tel:+18634228338"
                className="flex items-center justify-center gap-2 mx-4 mt-4 btn-primary"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Phone className="w-4 h-4" />
                Call Now
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}

function MobileDropdown({ link }: { link: typeof navLinks[0] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className="flex items-center">
        {link.clickable ? (
          <Link
            href={link.href}
            className="flex-1 px-4 py-3 text-gray-700 hover:text-dental-blue-600 min-h-[48px] flex items-center"
          >
            {link.name}
          </Link>
        ) : (
          <span className="flex-1 px-4 py-3 text-gray-700 min-h-[48px] flex items-center">
            {link.name}
          </span>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-4 py-3 text-gray-700 hover:text-dental-blue-600 min-h-[48px]"
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </button>
      </div>
      <AnimatePresence>
        {isOpen && link.dropdown && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="glass rounded-2xl mx-2 my-1 py-1">
              {link.dropdown.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-6 py-3 text-gray-700 hover:text-dental-blue-600 hover:bg-dental-blue-50/80 text-sm transition-all duration-300 min-h-[44px] flex items-center"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
