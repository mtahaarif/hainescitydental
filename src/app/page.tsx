import dynamic from 'next/dynamic';
import Hero from '@/components/Hero';
import FeaturedServices from '@/components/FeaturedServices';
// UniversalSlider removed — replaced by site-wide banner component in layout

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
      <Hero />
    </>
  );
}
