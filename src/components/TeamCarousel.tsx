'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  bio?: string;
  image: string;
  title?: string;
}

interface TeamCarouselProps {
  members: TeamMember[];
}

export default function TeamCarousel({ members }: TeamCarouselProps) {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
      return () => {
        container.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  if (members.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full">
      {/* Carousel Container */}
      <div className="relative">
        {/* Left Arrow */}
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gradient-to-r from-white to-transparent p-2 text-dental-blue-600 hover:text-dental-blue-700 transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Scrollable Content */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-4 scroll-smooth"
          style={{ scrollBehavior: 'smooth' }}
        >
          {members.map((member, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-72 glass-light rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="w-full h-64 bg-gradient-to-br from-dental-blue-100 to-cyan-100 rounded-xl mb-4 flex items-center justify-center overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={320}
                  height={320}
                  className="w-full h-full object-contain"
                  priority={index < 3}
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
              <p className="text-dental-blue-600 font-semibold mb-3">
                {member.title || member.role}
              </p>
              <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                {member.bio}
              </p>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gradient-to-l from-white to-transparent p-2 text-dental-blue-600 hover:text-dental-blue-700 transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Scroll Hint */}
      {members.length > 2 && (
        <p className="text-center text-sm text-gray-500 mt-4">
          Scroll to see more team members →
        </p>
      )}
    </div>
  );
}
