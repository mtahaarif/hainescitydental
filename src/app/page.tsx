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
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-dental-blue-50/90 border border-dental-blue-100 rounded-3xl p-6 md:p-8 shadow-sm grid md:grid-cols-4 gap-6">
          {/* Left appointment panel */}
          <aside className="md:col-span-1 flex flex-col items-center text-center gap-4">
            <img src="/images/call.jpg" alt="Call for Appointment" className="w-full h-auto rounded-xl shadow-md" />
            <a href="tel:+18634228338" className="inline-flex items-center justify-center bg-dental-blue-600 text-white px-6 py-3 rounded-full shadow-md hover:shadow-lg transition">
              Call For An Appointment
            </a>
            <a href="/contact" className="inline-flex items-center justify-center text-dental-blue-700 border border-dental-blue-200 bg-white/80 px-4 py-2 rounded-full hover:underline">
              Schedule An Appointment
            </a>
          </aside>

          {/* Main content (Hero + below) */}
          <main className="md:col-span-3">
            <Hero />
            <div className="mt-8">
              <FeaturedServices />
              <WhyChooseUs />
              <Testimonials />
              <CallToAction />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
