'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { 
  ChevronLeft, ChevronRight 
} from 'lucide-react';

interface Category {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  points: string[];
  image: string;
  iconSrc: string;
}

const categories: Category[] = [
  {
    id: 'cosmetic',
    title: 'Cosmetic Dentistry',
    subtitle: 'Transform Your Smile',
    description:
      'Tooth‑conserving cosmetic care to restore form and esthetics: tooth‑colored composite fillings and bonding, porcelain crowns and veneers, and professional whitening — delivered with conservative techniques and artistic shading for natural, long‑lasting results.',
    points: [
      'Composite Bonding & White Fillings — repair chips, cracks and decay with tooth‑matched restorations',
      'Porcelain Veneers & Crowns — custom restorations for shape, color and symmetry',
      'Professional Teeth Whitening — safe, effective bleaching for brighter smiles',
      'Smile Design & Makeovers — coordinated restorative and cosmetic planning',
    ],
    image: '/cosmeticdentistry.webp',
    iconSrc: '/service_icon1.png',
  },
  {
    id: 'general',
    title: 'General Dentistry',
    subtitle: 'Complete Oral Care',
    description:
      'Complete oral care focused on prevention and durable restorations: routine cleanings and exams, tooth‑colored (composite) fillings, crowns and bridges, root canal therapy, extractions, and removable dentures — with patient education and tailored aftercare for lasting results.',
    points: [
      'Preventive Cleanings & Exams — routine hygiene and early problem detection',
      'Composite (White) Fillings & Bonding — aesthetic repairs for decay and damage',
      'Crowns, Bridges & Fixed Prosthetics — restore function and appearance',
      'Root Canal Therapy, Extractions & Dentures — endodontic and prosthetic solutions',
    ],
    image: '/generaldentisry.webp',
    iconSrc: '/service_icon2.png',
  },
  {
    id: 'implant',
    title: 'Implant Dentistry',
    subtitle: 'Restore Your Smile',
    description:
      'Precision implant solutions to replace single teeth, multiple teeth or full arches. Dental implants restore tooth roots and support ceramic crowns or prostheses for a natural, stable, and long‑term result.',
    points: [
      'Single‑Tooth Implants — lifelike crowns on implant roots',
      'Implant‑Supported Bridges & Full‑Arch Solutions — predictable rehabilitation for multiple missing teeth',
      'Implant‑Retained Dentures — improved retention and chewing function',
      'Long‑Term Success — durable outcomes with proper planning and maintenance',
    ],
    image: '/implantdentistry.webp',
    iconSrc: '/service_icon3.png',
  },
  {
    id: 'periodontal',
    title: 'Periodontal Therapy',
    subtitle: 'Gum Health Management',
    description:
      'Comprehensive periodontal care to diagnose and control gum disease. We provide non‑surgical Soft Tissue Management — therapeutic scaling, root planing, and individualized maintenance — to eliminate infection, reduce pocket depths, preserve bone, and protect teeth.',
    points: [
      'Early diagnosis of gingivitis and periodontitis to prevent progression',
      'Therapeutic Scaling & Gross Debridement — remove toxins and bacterial deposits',
      'Root Planing — detoxify and smooth root surfaces below the gumline',
      '3‑Month Supportive Recare — timed maintenance to disrupt bacterial re‑establishment',
    ],
    image: '/periodontaltherapy.webp',
    iconSrc: '/service_icon4.png',
  },
  {
    id: 'sedation',
    title: 'Sedation Dentistry',
    subtitle: 'Relaxed Dental Care',
    description:
      'Nitrous Oxide (N2O) delivered via nasal hood (commonly ~30% N2O / 70% O2) provides rapid, controllable inhalation sedation. Effects begin within minutes and are reversed by oxygen for quick recovery and minimal side effects — ideal for anxious patients and routine procedures.',
    points: [
      'Rapid onset: relaxation and analgesia within minutes',
      'Administered through a nasal hood; patient breathes normally',
      'Controlled depth of sedation and immediate reversal with oxygen',
      'Modern scavenging systems reduce waste gas exposure to staff',
    ],
    image: '/sedationdentistry.webp',
    iconSrc: '/service_icon5.png',
  },
  {
    id: 'orthodontics',
    title: 'Orthodontics',
    subtitle: 'Straighten Your Teeth',
    description:
      'Modern orthodontic care using discreet, custom aligner systems and appliances to straighten teeth and correct bite issues — comfortable, removable options for adults and teens who want an aesthetic approach to orthodontics.',
    points: [
      'Clear aligner systems — virtually invisible tooth movement',
      'Custom treatment plans with predictable staged movements',
      'Removable for oral hygiene and eating',
      'Options for fixed appliances when needed for complex cases',
    ],
    image: '/orthodontics.webp',
    iconSrc: '/service_icon6.png',
  },
  {
    id: 'snoring',
    title: 'Snoring & Sleep Apnea',
    subtitle: 'Better Sleep Solutions',
    description:
      'Non‑surgical solutions for snoring and mild‑to‑moderate obstructive sleep apnea using custom oral appliances that reposition the jaw to keep airways open — comfortable, easy to use, and an effective alternative for patients who cannot tolerate CPAP.',
    points: [
      'Custom intra‑oral devices designed to improve airway patency',
      'Quick fabrication and fitting with minimal downtime',
      'Comfortable, non‑surgical alternative to CPAP for select patients',
      'Improves sleep quality and reduces disruptive snoring',
    ],
    image: '/repositionsjaw.webp',
    iconSrc: '/service_icon7.png',
  },
];

function ServicesContent() {
  const searchParams = useSearchParams();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) {
      const index = categories.findIndex(c => c.id === tab);
      if (index !== -1) setActiveIndex(index);
    }
  }, [searchParams]);

  const prev = () => {
    setActiveIndex((i) => (i - 1 + categories.length) % categories.length);
  };

  const next = () => {
    setActiveIndex((i) => (i + 1) % categories.length);
  };

  const currentService = categories[activeIndex];

  return (
    <>
      {/* Service Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((category, index) => (
            <button
              key={category.id}
              onClick={() => setActiveIndex(index)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95 ${
                index === activeIndex
                  ? 'bg-dental-blue-500 text-white shadow-lg'
                  : 'glass hover:bg-dental-blue-50 text-gray-700'
              }`}
            >
              {category.title}
            </button>
          ))}
        </div>
      </div>

      {/* Service Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-strong p-4 sm:p-8 md:p-12 relative overflow-visible lg:overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start">
            {/* Image */}
            <div className="relative h-48 sm:h-64 md:h-80 lg:h-[400px] rounded-2xl overflow-hidden transition-transform duration-300 hover:scale-[1.02]">
              <Image
                src={currentService.image}
                alt={currentService.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>

            {/* Content */}
            <div className="space-y-3 sm:space-y-4 md:space-y-6 pb-16 lg:pb-0">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-dental-blue-400 to-dental-blue-600 flex items-center justify-center transition-transform hover:scale-110 hover:rotate-3 flex-shrink-0">
                  <Image 
                    src={currentService.iconSrc} 
                    alt={currentService.title}
                    width={32}
                    height={32}
                    className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 object-contain brightness-0 invert"
                  />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">{currentService.title}</h2>
                  <p className="text-dental-blue-600 font-medium text-sm sm:text-base">{currentService.subtitle}</p>
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-lg">
                {currentService.description}
              </p>

              <ul className="space-y-2 sm:space-y-3">
                {currentService.points.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2 sm:gap-3">
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-dental-blue-500 mt-1.5 sm:mt-2 flex-shrink-0" />
                    <span className="text-gray-700 text-sm sm:text-base">{point}</span>
                  </li>
                ))}
              </ul>

              <a
                href="tel:+18634228338"
                className="btn-primary inline-flex items-center gap-2 transition-transform hover:scale-105 active:scale-95 text-sm sm:text-base"
              >
                Schedule Consultation
              </a>
            </div>
          </div>

          {/* Navigation */}
          <button
            onClick={prev}
            className="absolute left-2 sm:left-4 top-[120px] sm:top-[160px] lg:top-1/2 lg:-translate-y-1/2 p-2 sm:p-3 glass-light rounded-full shadow-lg transition-transform hover:scale-110 active:scale-90 z-10"
            aria-label="Previous service"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-dental-blue-600" />
          </button>
          
          <button
            onClick={next}
            className="absolute right-2 sm:right-4 top-[120px] sm:top-[160px] lg:top-1/2 lg:-translate-y-1/2 p-2 sm:p-3 glass-light rounded-full shadow-lg transition-transform hover:scale-110 active:scale-90 z-10"
            aria-label="Next service"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-dental-blue-600" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-6 sm:mt-8 max-w-[280px] sm:max-w-none mx-auto">
          {categories.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 hover:scale-125 ${
                index === activeIndex
                  ? 'w-6 sm:w-9 bg-dental-blue-500'
                  : 'w-2.5 sm:w-3 bg-dental-blue-200 hover:bg-dental-blue-300'
              }`}
              aria-label={`Go to service ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-dental-blue-50/90 border border-dental-blue-100 rounded-3xl p-6 md:p-8 shadow-sm">

          <main>
            {/* Header */}
            <div className="mb-8 text-center">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                Comprehensive <span className="gradient-text">Dental Services</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                From routine care to advanced treatments, we offer a full spectrum of dental services.
              </p>
            </div>

            <Suspense fallback={<div className="text-center py-12">Loading services...</div>}>
              <ServicesContent />
            </Suspense>
          </main>
        </div>
      </div>
    </div>
  );
}
