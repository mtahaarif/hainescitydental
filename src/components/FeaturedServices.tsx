'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

interface Service {
  iconSrc: string;
  title: string;
  description: string;
  href: string;
  color: string;
}

const services: Service[] = [
  {
    iconSrc: '/service_icon1.png',
    title: 'Cosmetic Dentistry',
    description: 'Tooth‑colored composite fillings, porcelain crowns and veneers, and professional whitening to restore form and esthetics — conservative, natural‑looking restorations often completed in one or a few visits to improve function and the appearance of your smile.',
    href: '/services?tab=cosmetic',
    color: 'from-pink-500 to-rose-500',
  },
  {
    iconSrc: '/service_icon2.png',
    title: 'General Dentistry',
    description: 'Complete oral care: preventive cleanings, tooth‑colored (composite) fillings and bonding for chips/cracks, porcelain crowns and fixed bridges, root canal therapy, extractions, and removable dentures — durable, natural‑looking restorations with patient‑focused aftercare.',
    href: '/services?tab=general',
    color: 'from-red-500 to-pink-500',
  },
  {
    iconSrc: '/service_icon3.png',
    title: 'Implant Dentistry',
    description: 'Single-tooth, multiple-tooth and full-arch dental implant solutions that look, feel, and function like natural teeth. Implants replace tooth roots and support ceramic crowns for a long-term, esthetic, and stable result.',
    href: '/services?tab=implant',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    iconSrc: '/service_icon4.png',
    title: 'Periodontal Therapy',
    description: 'Comprehensive periodontal care: diagnosis and non‑surgical Soft Tissue Management including therapeutic scaling and root planing to remove infection, reduce pocket depths, preserve bone, and control gum disease — with ongoing 3‑month supportive recare for long‑term maintenance.',
    href: '/services?tab=periodontal',
    color: 'from-green-500 to-emerald-500',
  },
  {
    iconSrc: '/service_icon5.png',
    title: 'Sedation Dentistry',
    description: "Nitrous Oxide (N2O) — commonly called laughing gas — is delivered through a nasal hood (typically ~30% N2O / 70% O2) to provide rapid, controllable relaxation and pain relief. Effects begin within minutes and are reversed with oxygen for quick recovery and minimal side effects.",
    href: '/services?tab=sedation',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    iconSrc: '/service_icon7.png',
    title: 'Snoring & Sleep Apnea',
    description: "Millions suffer from snoring and sleep apnea, but relief doesn't require surgery. A custom oral appliance can eliminate snoring and improve your sleep quality, giving you and your loved ones restful nights.",
    href: '/services?tab=snoring',
    color: 'from-cyan-400 to-blue-600',
  },
  {
    iconSrc: '/service_icon6.png',
    title: 'Orthodontics',
    description: 'Cosmetic care including tooth‑colored (composite) fillings, porcelain crowns and veneers, and professional whitening to restore form and esthetics — natural‑looking, durable restorations often completed in one or a few visits.',
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
          <p className="text-xl text-gray-600 max-w-2xl mx-auto text-center">
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
                    <Image 
                      src={service.iconSrc} 
                      alt={service.title}
                      width={28}
                      height={28}
                      className="w-7 h-7 object-contain brightness-0 invert"
                    />
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
