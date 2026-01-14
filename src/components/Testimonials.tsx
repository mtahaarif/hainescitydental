'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
  name: string;
  content: string;
  rating: number;
  date: string;
  source: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Heidi B.",
    content: "I'm terrified of going to the dentist. Thank goodness I found Dr. Khan the morning I woke up with an infected tooth. Dr. Khan is gentle, kind, and wonderful. I am in the middle of a difficult root canal and I haven't experienced any pain.",
    rating: 5,
    date: "3 weeks ago",
    source: "Google Review"
  },
  {
    name: "Pat R.",
    content: "Just had a tooth extracted by Dr Kahn! No pain, he was so gentle, have been going there for about 20 yrs, am not going anywhere else, even though I drive 2 hrs to get there! Thank you Dr. Kahn!",
    rating: 5,
    date: "6 days ago",
    source: "Google Review"
  },
  {
    name: "Mercedes N.",
    content: "I am so happy that I became a patient at Haines city dental. I am so satisfied with the outcome of my smile. I feel confident and happy to be able to show my smile! Dr.Khan, Dianilda, Anabell, and Jay treated me wonderfully.",
    rating: 5,
    date: "1 month ago",
    source: "Google Review"
  },
  {
    name: "Paul C.",
    content: "Dr. Kahn was amazing! The extraction was done in a quick, painless manner. He is definitely a true professional! Thank you Dr. Kahn and Annabelle for taking such good care of me this morning!",
    rating: 5,
    date: "1 month ago",
    source: "Google Review"
  },
  {
    name: "Tiffany K.",
    content: "I have been coming to Dr Kahn for many years now and even though I now live 2 and a half hours away I still won't go anywhere else! They truly make you feel comfortable here!",
    rating: 5,
    date: "1 month ago",
    source: "Google Review"
  },
  {
    name: "Bruce S.",
    content: "Just had a tooth extraction by Dr Kahn and it was almost a non event. There was no pain during the procedure at all. Everything was fine. Would recommend this practice to everyone.",
    rating: 5,
    date: "2 months ago",
    source: "Google Review"
  },
  {
    name: "Alyssa M.",
    content: "As always, my visit and extractions were done professionally and with the utmost amount of care. Huge shoutout to Dr. Khan and his team!",
    rating: 5,
    date: "4 months ago",
    source: "Google Review"
  },
  {
    name: "Rosita R.",
    content: "Dr. Kahn was amazing! He was attentive and reassuring. The extraction was done in such a manner that I was at ease and shocked by how quickly it was done. He is definitely a true professional!",
    rating: 5,
    date: "5 months ago",
    source: "Google Review"
  },
  {
    name: "Paul C.",
    content: "This is the best service I have ever received from any dentist location. The Doctor and hygienist were spectacular, down to earth. Very friendly and very professional. I would recommend them to anyone.",
    rating: 5,
    date: "8 months ago",
    source: "Google Review"
  },
  {
    name: "B. Vasquez",
    content: "I went today - painless filling, gentle dentist. They treated only the area I needed, aren't money hungry trying to do all at once. Thank you for being so kind and understanding. Will be back for more fillings in the future!",
    rating: 5,
    date: "10 months ago",
    source: "Google Review"
  },
  {
    name: "Fedelyne P.",
    content: "Dr. Khan is an exceptional dentist. I have been suffering with toothache for over a week. I called in yesterday to schedule appointment and today he was able to pull my bad tooth in 5 mins. The price was reasonable. Very funny Doctor!",
    rating: 5,
    date: "11 months ago",
    source: "Google Review"
  },
  {
    name: "Tina J.",
    content: "Absolutely loved this Dental office! They were very quick to assess my issues, listened to my concerns. The Doctor was able to formulate an affordable plan to get my teeth fixed. My extraction was quick and seamless with minimal downtime.",
    rating: 5,
    date: "11 months ago",
    source: "Google Review"
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const difference = touchStartX.current - touchEndX.current;
    const threshold = 50;

    if (Math.abs(difference) > threshold) {
      if (difference > 0) {
        handleNext();
      } else {
        handlePrevious();
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const handlePrevious = () => {
    setActiveIndex((current) => (current - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setActiveIndex((current) => (current + 1) % testimonials.length);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What Our Patients Say
          </h2>
          <p className="text-xl text-gray-600">
            Real Google reviews from real patients
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className="bg-white rounded-2xl shadow-xl p-8 md:p-12 relative"
            >
              <Quote className="absolute top-8 left-8 w-12 h-12 text-blue-100" />

              <div className="relative z-10">
                <div className="flex items-center justify-center mb-6">
                  {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="text-xl text-gray-700 mb-6 leading-relaxed text-center">
                  "{testimonials[activeIndex].content}"
                </p>

                <div className="text-center">
                  <p className="font-semibold text-gray-900 text-lg">
                    {testimonials[activeIndex].name}
                  </p>
                  <p className="text-sm text-blue-600 mt-1">
                    {testimonials[activeIndex].source}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={handlePrevious}
              className="p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === activeIndex ? 'bg-blue-600 w-8' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
