import { Users, Target, Heart, Award, Clock, MapPin } from 'lucide-react';

export default function Hero() {


  return (
    <div className="min-h-screen pt-8 pb-16">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center animate-fade-in">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
        <span className="gradient-text">Haines City Dental</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Providing exceptional dental care to our community.
        </p>
        {/* Inserted Our Practice intro from the client's previous page */}
        <div className="mt-6 glass p-6 max-w-3xl mx-auto text-left">
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Additional Our Practice images (local copies) */}
        <div className="mt-12">
          <figure className="w-full flex justify-center">
            <img
              src="/images/55.jpg"
              alt="Christmas Party — Haines City Dental"
              className="max-w-full h-auto rounded-2xl shadow-lg"
              loading="lazy"
            />
          </figure>
        </div>
      </div>
    </div>
  );
}
