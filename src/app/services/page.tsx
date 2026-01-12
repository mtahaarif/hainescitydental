'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { 
  Star, Heart, Zap, Shield, Clock, DollarSign, 
  ChevronLeft, ChevronRight 
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Category {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  points: string[];
  image: string;
  icon: LucideIcon;
}

const categories: Category[] = [
  {
    id: 'cosmetic',
    title: 'Cosmetic Dentistry',
    subtitle: 'Transform Your Smile',
    description:
      'Transform your smile with our comprehensive cosmetic dental services. From professional teeth whitening to custom porcelain veneers and smile makeovers, we combine artistry with advanced technology to create beautiful, natural-looking results.',
    points: [
      'White Fillings & Composite Bonding - Tooth-colored restorations that blend seamlessly',
      'Porcelain Veneers - Ultra-thin shells that dramatically enhance your smile',
      'Teeth Whitening - Professional-grade bleaching for a brighter appearance',
      'Smile Makeovers - Complete transformations tailored to your unique goals',
    ],
    image: '/cosmeticdentistry.webp',
    icon: Star,
  },
  {
    id: 'general',
    title: 'General Dentistry',
    subtitle: 'Complete Oral Care',
    description:
      'Comprehensive dental care for patients of all ages. We provide everything from preventive cleanings to advanced restorative treatments, all designed to maintain your optimal oral health in a comfortable environment.',
    points: [
      'Regular Cleanings & Exams - Preventive care every 6 months to catch issues early',
      'Composite White Fillings - Aesthetic, tooth-colored restorations for cavities',
      'Root Canal Therapy - Advanced treatment to save infected or diseased teeth',
      'Oral Cancer Screening - Early detection of cancerous lesions during exams',
    ],
    image: '/generaldentisry.webp',
    icon: Heart,
  },
  {
    id: 'implant',
    title: 'Implant Dentistry',
    subtitle: 'Restore Your Smile',
    description:
      'Missing teeth? Dental implants provide a permanent, natural-looking solution that looks, feels, and functions like your real teeth. Whether you\'re missing one tooth or an entire arch, we have the expertise to restore your smile with lasting results.',
    points: [
      'Single Tooth Implants - Perfect for isolated missing teeth with custom crowns',
      'Full Arch Implants - Solution for multiple missing or all teeth',
      'Implant-Supported Dentures - Combines implants with prosthetics for stability',
      '95%+ Success Rate - Can last a lifetime with proper care',
    ],
    image: '/implantdentistry.webp',
    icon: Zap,
  },
  {
    id: 'periodontal',
    title: 'Periodontal Therapy',
    subtitle: 'Gum Health Management',
    description:
      'Healthy gums are the foundation of a healthy smile. Periodontal disease affects 3 out of 4 adults and is the leading cause of adult tooth loss. We offer advanced soft tissue management to treat gum disease and protect your teeth.',
    points: [
      'Soft Tissue Management - Personalized plan to eliminate gum infection',
      'Therapeutic Scaling - Professional removal of toxins and bacteria',
      'Root Planing - Treatment of diseased root surfaces below the gum line',
      'Periodontal Maintenance - Critical 3-month recare visits to maintain health',
    ],
    image: '/periodontaltherapy.webp',
    icon: Shield,
  },
  {
    id: 'sedation',
    title: 'Sedation Dentistry',
    subtitle: 'Relaxed Dental Care',
    description:
      'Anxious about dental visits? Sedation dentistry allows you to receive comfortable, relaxed care. We use the latest sedation technology to help you feel at ease throughout your procedure.',
    points: [
      'Nitrous Oxide (Laughing Gas) - Works rapidly, reaching the brain in 20 seconds',
      'Euphoric, relaxed feeling that alleviates pain perception',
      'Completely safe with minimal side effects',
      'No hangover effects - safe to drive immediately after treatment',
    ],
    image: '/sedationdentistry.webp',
    icon: Clock,
  },
  {
    id: 'orthodontics',
    title: 'Orthodontics',
    subtitle: 'Straighten Your Teeth',
    description:
      'Achieve the straight smile you\'ve always wanted with modern, discreet orthodontic solutions. Say goodbye to traditional metal braces and embrace the future of teeth straightening with clear aligners.',
    points: [
      'ClearCorrect Invisible Aligners - No wires or brackets, just clear comfort',
      'Custom-made aligners that gradually move teeth into position',
      'Nearly invisible - perfect for professionals and self-conscious patients',
      'Removable for eating and cleaning with typically faster results',
    ],
    image: '/orthodontics.webp',
    icon: DollarSign,
  },
  {
    id: 'snoring',
    title: 'Snoring & Sleep Apnea',
    subtitle: 'Better Sleep Solutions',
    description:
      'Millions suffer from snoring and sleep apnea, but relief doesn\'t require surgery. A custom oral appliance can eliminate snoring and improve your sleep quality, giving you and your loved ones restful nights.',
    points: [
      'Custom Intra-Oral Devices - Innovative, comfortable alternative to CPAP machines',
      'Ready in less than two weeks',
      'No surgery required - extremely comfortable to wear',
      'Repositions jaw to keep airways open for normal, uninterrupted sleep',
    ],
    image: '/repositionsjaw.webp',
    icon: Star,
  },
];

export default function ServicesPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const searchParams = useSearchParams();
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) {
      const index = categories.findIndex(c => c.id === tab);
      if (index !== -1) setActiveIndex(index);
    }
  }, [searchParams]);

  const prev = () => {
    setDirection(-1);
    setActiveIndex((i) => (i - 1 + categories.length) % categories.length);
  };

  const next = () => {
    setDirection(1);
    setActiveIndex((i) => (i + 1) % categories.length);
  };

  const goToSlide = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  const currentService = categories[activeIndex];
  const Icon = currentService.icon;

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -500 : 500,
      opacity: 0,
    }),
  };

  return (
    <div ref={ref} className="min-h-screen pt-8 pb-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center"
      >
<h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          Comprehensive <span className="gradient-text">Dental Services</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          From routine care to advanced treatments, we offer a full spectrum of dental services.
        </p>
      </motion.div>

      {/* Service Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8"
      >
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              onClick={() => goToSlide(index)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                index === activeIndex
                  ? 'bg-dental-blue-500 text-white shadow-lg'
                  : 'glass hover:bg-dental-blue-50 text-gray-700'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.title}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Service Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-strong p-8 sm:p-12 relative overflow-hidden min-h-[600px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              className="grid lg:grid-cols-2 gap-12 items-center"
            >
              {/* Image */}
              <motion.div
                className="relative h-80 lg:h-[450px] rounded-2xl overflow-hidden"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Image
                  src={currentService.image}
                  alt={currentService.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </motion.div>

              {/* Content */}
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <motion.div
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-dental-blue-400 to-dental-blue-600 flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">{currentService.title}</h2>
                    <p className="text-dental-blue-600 font-medium">{currentService.subtitle}</p>
                  </div>
                </div>

                <p className="text-gray-600 leading-relaxed text-lg">
                  {currentService.description}
                </p>

                <ul className="space-y-3">
                  {currentService.points.map((point, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + idx * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <span className="w-2 h-2 rounded-full bg-dental-blue-500 mt-2 flex-shrink-0" />
                      <span className="text-gray-700">{point}</span>
                    </motion.li>
                  ))}
                </ul>

                <motion.a
                  href="tel:+18634228338"
                  className="btn-primary inline-flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Schedule Consultation
                </motion.a>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <motion.button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 glass-light rounded-full shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft className="w-6 h-6 text-dental-blue-600" />
          </motion.button>
          
          <motion.button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 glass-light rounded-full shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight className="w-6 h-6 text-dental-blue-600" />
          </motion.button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-3 mt-8">
          {categories.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? 'w-9 bg-dental-blue-500'
                  : 'w-3 bg-dental-blue-200 hover:bg-dental-blue-300'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
