import Hero from '@/components/Hero';
import FeaturedServices from '@/components/FeaturedServices';
import WhyChooseUs from '@/components/WhyChooseUs';
import Testimonials from '@/components/Testimonials';
import CallToAction from '@/components/CallToAction';
import UniversalSlider from '@/components/UniversalSlider';

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
