'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Heidi B.',
    content: "I'm terrified of going to the dentist. Thank goodness I found Dr. Khan the morning I woke up with an infected tooth. Dr. Khan is gentle, kind, and wonderful. I am in the middle of a difficult root canal and I haven't experienced any pain.",
    rating: 5,
    source: 'Google Review',
  },
  {
    name: 'Pat R.',
    content: 'Just had a tooth extracted by Dr Kahn! No pain, he was so gentle, have been going there for about 20 yrs, am not going anywhere else, even though I drive 2 hrs to get there! Thank you Dr. Kahn!',
    rating: 5,
    source: 'Google Review',
  },
  {
    name: 'Mercedes N.',
    content: 'I am so happy that I became a patient at Haines city dental. I am so satisfied with the outcome of my smile. I feel confident and happy to be able to show my smile! Dr.Khan, Dianilda, Anabell, and Jay treated me wonderfully.',
    rating: 5,
    source: 'Google Review',
  },
  {
    name: 'Paul C.',
    content: 'Dr. Kahn was amazing! The extraction was done in a quick, painless manner. He is definitely a true professional! Thank you Dr. Kahn and Annabelle for taking such good care of me this morning!',
    rating: 5,
    source: 'Google Review',
  },
  {
    name: 'Tiffany K.',
    content: 'I have been coming to Dr Kahn for many years now and even though I now live 2 and a half hours away I still won\'t go anywhere else! They truly make you feel comfortable here!',
    rating: 5,
    source: 'Google Review',
  },
  {
    name: 'Bruce S.',
    content: 'Just had a tooth extraction by Dr Kahn and it was almost a non event. There was no pain during the procedure at all. Everything was fine. Would recommend this practice to everyone.',
    rating: 5,
    source: 'Google Review',
  },
  {
    name: 'Alyssa M.',
    content: 'As always, my visit and extractions were done professionally and with the utmost amount of care. Huge shoutout to Dr. Khan and his team!',
    rating: 5,
    source: 'Google Review',
  },
  {
    name: 'Rosita R.',
    content: 'Dr. Kahn was amazing! He was attentive and reassuring. The extraction was done in such a manner that I was at ease and shocked by how quickly it was done. He is definitely a true professional!',
    rating: 5,
    source: 'Google Review',
  },
  {
    name: 'Paul C.',
    content: 'This is the best service I have ever received from any dentist location. The Doctor and hygienist were spectacular, down to earth. Very friendly and very professional. I would recommend them to anyone.',
    rating: 5,
    source: 'Google Review',
  },
  {
    name: 'B. Vasquez',
    content: 'I went today - painless filling, gentle dentist. They treated only the area I needed, aren\'t money hungry trying to do all at once. Thank you for being so kind and understanding. Will be back for more fillings in the future!',
    rating: 5,
    source: 'Google Review',
  },
  {
    name: 'Fedelyne P.',
    content: 'Dr. Khan is an exceptional dentist. I have been suffering with toothache for over a week. I called in yesterday to schedule appointment and today he was able to pull my bad tooth in 5 mins. The price was reasonable. Very funny Doctor!',
    rating: 5,
    source: 'Google Review',
  },
  {
    name: 'Tina J.',
    content: 'Absolutely loved this Dental office! They were very quick to assess my issues, listened to my concerns. The Doctor was able to formulate an affordable plan to get my teeth fixed. My extraction was quick and seamless with minimal downtime.',
    rating: 5,
    source: 'Google Review',
  },
];

export default function TestimonialsCompact() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setIndex((i) => (i + 1) % testimonials.length);

  const t = testimonials[index];

  return (
    <div className="w-full bg-white/90 border border-dental-blue-100 rounded-2xl shadow-md p-4">
      <div className="text-center mb-3">
        <h3 className="text-lg font-semibold text-gray-900">What Our Patients Say</h3>
        <p className="text-xs text-gray-500">Real Google reviews</p>
      </div>

      <div className="flex items-center justify-center mb-2">
        {[...Array(t.rating)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        ))}
      </div>

      <p className="text-sm text-gray-700 text-center leading-relaxed min-h-[84px]">
        “{t.content}”
      </p>

      <div className="text-center mt-3">
        <div className="text-sm font-semibold text-gray-900">{t.name}</div>
        <div className="text-xs text-dental-blue-600">{t.source}</div>
      </div>

      <div className="flex items-center justify-center gap-3 mt-4">
        <button
          onClick={prev}
          aria-label="Previous review"
          className="p-2 rounded-full border border-dental-blue-200 hover:bg-dental-blue-50"
        >
          <ChevronLeft className="w-4 h-4 text-dental-blue-600" />
        </button>
        <div className="text-xs text-gray-500">
          {index + 1} / {testimonials.length}
        </div>
        <button
          onClick={next}
          aria-label="Next review"
          className="p-2 rounded-full border border-dental-blue-200 hover:bg-dental-blue-50"
        >
          <ChevronRight className="w-4 h-4 text-dental-blue-600" />
        </button>
      </div>
    </div>
  );
}
