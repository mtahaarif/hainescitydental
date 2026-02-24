import { Users, Target, Heart, Award, Clock, MapPin } from 'lucide-react';
import Image from 'next/image';

export default function Hero() {


  return (
    <div className="min-h-screen py-0">
      {/* Header */}
      <div className="w-full px-0 mb-16 text-center animate-fade-in">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
        <span className="gradient-text">Haines City Dental</span>
        </h1>
        <p className="text-xl text-gray-600 text-center">
          Providing exceptional dental care to our community.
        </p>
        {/* Inserted Our Practice intro from the client's previous page */}
        <div className="mt-6 glass p-6 w-full text-left text-justify">
          <p className="text-gray-700 leading-relaxed">
              At Haines City Dental, we are excited to share our passion for oral health with you and your family.
              Our staff members believe in making personal connections with our patients to provide the highest
              level of service. We will answer any questions that you may have, go over all of your options and
              recommend the best course of action for your unique needs.

              If you’ve considered improving your smile, but have never taken that first step, now is the time!
              Contact us to schedule your free consultation.

              Thank you for visiting our website, and please feel free to contact us if you have any questions.          
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full px-0">

        <div className="mt-12 flex justify-center">
          <figure className="max-w-4xl w-full">
            <Image src="/images/55.jpg" alt="Christmas Party — Haines City Dental" width={1200} height={625} className="w-full h-auto rounded-2xl shadow-lg" quality={95} priority />
          </figure>
        </div>
      </div>
    </div>
  );
}
