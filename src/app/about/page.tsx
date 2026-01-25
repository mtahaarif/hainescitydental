import Image from 'next/image';
import { Users, Target, Heart, Award, Clock, MapPin } from 'lucide-react';

export default function AboutPage() {
  const stats = [
    { value: '20+', label: 'Years of Experience', icon: Clock },
    { value: '5000+', label: 'Happy Patients', icon: Users },
    { value: '7', label: 'Dental Services', icon: Award },
    { value: '1', label: 'Convenient Location', icon: MapPin },
  ];

  return (
    <div className="min-h-screen pt-8 pb-16">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center animate-fade-in">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          About <span className="gradient-text">Haines City Dental</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Providing exceptional dental care to our community since November 2006.
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
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Image */}
          <div className="relative">
            <div className="glass-strong p-8 relative overflow-hidden hover:scale-[1.02] transition-transform duration-300">
              <Image
                src="/hainescitydentallogo.png"
                alt="Haines City Dental"
                width={500}
                height={400}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-dental-blue-50 flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-dental-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-xl mb-2">Our Mission</h3>
                  <p className="text-gray-600 leading-relaxed">
                    To provide <span className="text-dental-blue-500 font-semibold">quality dental care</span> with 
                    integrity, compassion, and innovation. We strive to make every patient feel valued and cared for.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-dental-blue-50 flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-dental-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-xl mb-2">Our Values</h3>
                  <p className="text-gray-600 leading-relaxed">
                    <span className="text-dental-blue-500 font-semibold">Patient care</span>, 
                    <span className="text-dental-blue-500 font-semibold"> professional excellence</span>, and 
                    <span className="text-dental-blue-500 font-semibold"> community commitment</span> drive everything we do.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-dental-blue-50 flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-dental-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-xl mb-2">Our Commitment</h3>
                  <p className="text-gray-600 leading-relaxed">
                    We are committed to <span className="text-dental-blue-500 font-semibold">continuous learning</span> and 
                    staying at the forefront of <span className="text-dental-blue-500 font-semibold">dental technology</span> to 
                    provide the best possible care.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="glass-light p-8 text-center hover:scale-105 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              <div className="w-14 h-14 rounded-2xl bg-dental-blue-50 flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-7 h-7 text-dental-blue-600" />
              </div>
              <p className="text-4xl font-bold gradient-text">{stat.value}</p>
              <p className="text-gray-600 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Additional Our Practice images (local copies) */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <figure className="glass p-4 text-center">
            <picture>
              <source srcSet="/our-practice-1.webp" type="image/webp" />
              <img src="/our-practice-1.jpg" alt="Reception area" className="w-full h-auto object-cover rounded" />
            </picture>
            <figcaption className="text-sm text-gray-600 mt-3">Welcoming reception and comfortable waiting area</figcaption>
          </figure>
          <figure className="glass p-4 text-center">
            <picture>
              <source srcSet="/our-practice-2.webp" type="image/webp" />
              <img src="/our-practice-2.jpg" alt="Treatment room" className="w-full h-auto object-cover rounded" />
            </picture>
            <figcaption className="text-sm text-gray-600 mt-3">State-of-the-art treatment rooms with modern equipment</figcaption>
          </figure>
          <figure className="glass p-4 text-center">
            <picture>
              <source srcSet="/our-practice-3.webp" type="image/webp" />
              <img src="/our-practice-3.jpg" alt="Team at work" className="w-full h-auto object-cover rounded" />
            </picture>
            <figcaption className="text-sm text-gray-600 mt-3">A friendly team dedicated to your comfort and care</figcaption>
          </figure>
        </div>

        {/* History Section */}
        <div className="mt-20 glass-strong p-8 sm:p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Our <span className="gradient-text">Story</span>
          </h2>
          <div className="max-w-4xl mx-auto space-y-6 text-gray-600 leading-relaxed text-lg">
            <p>
              Since <span className="text-dental-blue-500 font-semibold">November 2006</span>, Haines City Dental 
              has been committed to providing exceptional dental care to our community. What started as a small 
              practice has grown into a full-service dental center serving thousands of patients.
            </p>
            <p>
              Our practice combines <span className="text-dental-blue-500 font-semibold">modern technology</span> with 
              <span className="text-dental-blue-500 font-semibold"> compassionate service</span> to ensure every patient 
              receives the best possible treatment. We believe that everyone deserves access to quality dental care 
              in a comfortable, welcoming environment.
            </p>
            <p>
              Today, our team of experienced professionals continues to uphold the same values that founded our 
              practice: <span className="text-dental-blue-500 font-semibold">integrity</span>, 
              <span className="text-dental-blue-500 font-semibold"> excellence</span>, and a genuine 
              <span className="text-dental-blue-500 font-semibold"> care for our patients</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
