import Image from 'next/image';
import { Users, Target, Heart, Award, Clock, MapPin } from 'lucide-react';

export default function OurPracticePage() {
  return (
    <div className="min-h-screen text-justify">
      <div className="w-full">
        <div className="bg-dental-blue-50/90 border-y border-dental-blue-100 py-8 px-0 shadow-sm grid md:grid-cols-4 gap-6">

          {/* Main content */}
          <main className="md:col-span-3">
            {/* Header */}
            <div className="mb-8 text-center">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                <span className="gradient-text">Our Practice</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Providing exceptional dental care to our community.
              </p>
              <div className="mt-6 glass p-6 max-w-3xl mx-auto text-justify">
                <p className="text-gray-700 leading-relaxed">
                  Our practice offers comprehensive dental care with an emphasis on prevention, restorative options, and cosmetic dentistry. We never underestimate the importance of serving our patients – from diagnosis to treatment, our team of professionals makes communication with patients a priority. We strive to make our office as warm, friendly, and comfortable. To overcome any anxieties that can often overcome people when visiting the dentist we created very relaxing environment.
                </p>
              </div>
            </div>

            {/* Additional Our Practice images (local copies) */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <figure className="glass p-4 text-center">
                <Image src="/our-practice-1-1536.jpg" alt="Reception area" width={1536} height={1024} className="w-full h-auto object-cover rounded" />
                <figcaption className="text-sm text-gray-600 mt-3">Welcoming reception and comfortable waiting area</figcaption>
              </figure>

              <figure className="glass p-4 text-center">
                <Image src="/our-practice-2.png" alt="Treatment room" width={1536} height={1024} className="w-full h-auto object-cover rounded" />
                <figcaption className="text-sm text-gray-600 mt-3">State-of-the-art treatment rooms with modern equipment</figcaption>
              </figure>

              <figure className="glass p-4 text-center">
                <Image src="/our-practice-3-1536.jpg" alt="Team at work" width={1536} height={1024} className="w-full h-auto object-cover rounded" />
                <figcaption className="text-sm text-gray-600 mt-3">A friendly team dedicated to your comfort and care</figcaption>
              </figure>
            </div>
          </main>

          {/* Right appointment panel (same as homepage) */}
          <aside className="md:col-span-1 flex flex-col items-center text-center gap-4">
            <Image src="/images/call.jpg" alt="Call for Appointment" width={1200} height={800} className="w-full h-auto rounded-xl shadow-md" />
            <a href="/contact" className="inline-flex items-center justify-center bg-dental-blue-600 text-white px-6 py-3 rounded-full shadow-md hover:shadow-lg transition">
              Schedule an appointment
            </a>
          </aside>
        </div>
      </div>
    </div>
  );
}
