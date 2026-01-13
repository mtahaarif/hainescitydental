import dynamic from 'next/dynamic';
import Hero from '@/components/Hero';
import FeaturedServices from '@/components/FeaturedServices';
import UniversalSlider from '@/components/UniversalSlider';

// Lazy load below-the-fold components
const WhyChooseUs = dynamic(() => import('@/components/WhyChooseUs'), {
  loading: () => <div className="h-96" />, // Placeholder
});

const Testimonials = dynamic(() => import('@/components/Testimonials'), {
  loading: () => <div className="h-96" />, // Placeholder
});

const CallToAction = dynamic(() => import('@/components/CallToAction'), {
  loading: () => <div className="h-40" />, // Placeholder
});

export default function Home() {
  return (
    <>
      <UniversalSlider />
      <Hero />
      <FeaturedServices />
      <WhyChooseUs />
      <Testimonials />
      <CallToAction />
    </>
  );
}
