import Image from 'next/image';
import { Users, Target, Heart, Award, Clock, MapPin } from 'lucide-react';

export default function AboutPage() {


  return (
    <div className="min-h-screen pt-8 pb-16">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center animate-fade-in">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
        <span className="gradient-text">Our Practice</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Providing exceptional dental care to our community.
        </p>
        {/* Inserted Our Practice intro from the client's previous page */}
        <div className="mt-6 glass p-6 max-w-3xl mx-auto text-left">
          <p className="text-gray-700 leading-relaxed">
            Our practice offers comprehensive dental care with an emphasis on prevention, restorative options, and cosmetic dentistry. We never underestimate the importance of serving our patients – from diagnosis to treatment, our team of professionals makes communication with patients a priority. We strive to make our office as warm, friendly, and comfortable. To overcome any anxieties that can often overcome people when visiting the dentist we created very relaxing environment.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Additional Our Practice images (local copies) */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <figure className="glass p-4 text-center">
            <picture>
              <source srcSet="/our-practice-1-480.webp 480w, /our-practice-1-768.webp 768w, /our-practice-1-1024.webp 1024w, /our-practice-1-1536.webp 1536w" type="image/webp" />
              <img src="/our-practice-1.jpg" srcSet="/our-practice-1-480.jpg 480w, /our-practice-1-768.jpg 768w, /our-practice-1-1024.jpg 1024w, /our-practice-1-1536.jpg 1536w" sizes="(max-width: 1024px) 100vw, 33vw" alt="Reception area" className="w-full h-auto object-cover rounded" />
            </picture>
            <figcaption className="text-sm text-gray-600 mt-3">Welcoming reception and comfortable waiting area</figcaption>
          </figure>
          <figure className="glass p-4 text-center">
            <picture>
              <source srcSet="/our-practice-2-480.webp 480w, /our-practice-2-768.webp 768w, /our-practice-2-1024.webp 1024w, /our-practice-2-1536.webp 1536w" type="image/webp" />
              <img src="/our-practice-2.jpg" srcSet="/our-practice-2-480.jpg 480w, /our-practice-2-768.jpg 768w, /our-practice-2-1024.jpg 1024w, /our-practice-2-1536.jpg 1536w" sizes="(max-width: 1024px) 100vw, 33vw" alt="Treatment room" className="w-full h-auto object-cover rounded" />
            </picture>
            <figcaption className="text-sm text-gray-600 mt-3">State-of-the-art treatment rooms with modern equipment</figcaption>
          </figure>
          <figure className="glass p-4 text-center">
            <picture>
              <source srcSet="/our-practice-3-480.webp 480w, /our-practice-3-768.webp 768w, /our-practice-3-1024.webp 1024w, /our-practice-3-1536.webp 1536w" type="image/webp" />
              <img src="/our-practice-3.jpg" srcSet="/our-practice-3-480.jpg 480w, /our-practice-3-768.jpg 768w, /our-practice-3-1024.jpg 1024w, /our-practice-3-1536.jpg 1536w" sizes="(max-width: 1024px) 100vw, 33vw" alt="Team at work" className="w-full h-auto object-cover rounded" />
            </picture>
            <figcaption className="text-sm text-gray-600 mt-3">A friendly team dedicated to your comfort and care</figcaption>
          </figure>
        </div>
      </div>
    </div>
  );
}
