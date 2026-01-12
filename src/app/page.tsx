'use client';

import { motion } from 'framer-motion';
import Hero from '@/components/Hero';
import FeaturedServices from '@/components/FeaturedServices';
import WhyChooseUs from '@/components/WhyChooseUs';
import Testimonials from '@/components/Testimonials';
import CallToAction from '@/components/CallToAction';
import UniversalSlider from '@/components/UniversalSlider';

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <UniversalSlider />
      <Hero />
      <FeaturedServices />
      <WhyChooseUs />
      <Testimonials />
      <CallToAction />
    </motion.div>
  );
}
