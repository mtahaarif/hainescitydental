import Hero from '@/components/Hero';
import Image from 'next/image';
import Link from 'next/link';
import TestimonialsCompact from '@/components/TestimonialsCompact';

export default function Home() {
  return (
    <div className="min-h-screen text-justify">
      <div className="w-full">
        <div className="bg-dental-blue-50/90 border-y border-dental-blue-100 py-8 px-0 shadow-sm grid md:grid-cols-4 gap-6">
          {/* Main content (Hero + below) */}
          <main className="md:col-span-3">
            <Hero />
          </main>

          {/* Right appointment panel */}
          <aside className="md:col-span-1 flex flex-col items-center text-center gap-4">
            <Image src="/images/call.jpg" alt="Call for Appointment" width={1200} height={800} className="w-full h-auto rounded-xl shadow-md" />
            <Link href="/contact" className="inline-flex items-center justify-center bg-dental-blue-600 text-white px-6 py-3 rounded-full shadow-md hover:shadow-lg transition">
              Schedule an appointment
            </Link>

            {/* Reviews carousel */}
            <div className="w-full mt-4">
              <TestimonialsCompact />
            </div>

            {/* Additional Info Images */}
            <div className="w-full mt-4 flex flex-col gap-4">
              <Image src="/images/nitrous.png" alt="Nitrous Oxide Sedation" width={300} height={200} className="w-full h-auto rounded-xl shadow-md" />
              <Image src="/images/snoring.png" alt="Snoring & Sleep Apnea Solutions" width={300} height={200} className="w-full h-auto rounded-xl shadow-md" />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
