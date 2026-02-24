import Hero from '@/components/Hero';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen text-justify">
      <div className="w-full">
        <div className="bg-dental-blue-50/90 border-y border-dental-blue-100 py-8 px-0 shadow-sm grid md:grid-cols-5 gap-6 items-start">
          {/* Main content (Hero + below) */}
          <main className="md:col-span-4">
            <Hero />
          </main>

          {/* Right appointment panel */}
          <aside className="md:col-span-1 flex flex-col items-center text-center gap-2.5">
            <div className="w-4/5 md:w-4/5">
              <Image src="/images/call.jpg" alt="Call for Appointment" width={600} height={400} className="w-full h-auto rounded-lg shadow-md" quality={90} />
            </div>
            <Link href="/contact" className="w-4/5 md:w-4/5 inline-flex items-center justify-center bg-dental-blue-600 text-white px-3 py-2 rounded-full shadow-md hover:shadow-lg transition text-xs">
              Schedule an appointment
            </Link>

            {/* Additional Info Images */}
            <div className="w-3/4 md:w-3/4 flex flex-col gap-2.5 items-center">
              <div className="w-full">
                <Image src="/nitrousoxide.webp" alt="Nitrous Oxide Sedation" width={200} height={150} className="w-full h-auto rounded-lg shadow-md" quality={90} />
                <p className="text-[10px] text-center text-gray-700 mt-1 font-medium">Nitrous Oxide Sedation</p>
              </div>
              <div className="w-full">
                <Image src="/snoring devices.webp" alt="Snoring & Sleep Apnea Solutions" width={200} height={150} className="w-full h-auto rounded-lg shadow-md" quality={90} />
                <p className="text-[10px] text-center text-gray-700 mt-1 font-medium">Snoring Devices</p>
              </div>
            </div>

            {/* Testimonials image */}
            <div className="w-3/4 md:w-3/4">
              <Link href="/testimonials">
                <Image 
                  src="/test1.png" 
                  alt="Patient Testimonials" 
                  width={300} 
                  height={200} 
                  className="w-full h-auto rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer" 
                  quality={90}
                />
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
