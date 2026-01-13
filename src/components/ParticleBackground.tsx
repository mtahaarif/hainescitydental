'use client';

import { useEffect, useMemo, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import type { ISourceOptions } from '@tsparticles/engine';

export default function ParticleBackground() {
  const [init, setInit] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLowEndDevice, setIsLowEndDevice] = useState(false);

  useEffect(() => {
    // Check if mobile and low-end device
    const checkDevice = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      // Check for low memory device or reduced motion preference
      const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const isLowMemory = (navigator as any).deviceMemory && (navigator as any).deviceMemory <= 4;
      
      setIsLowEndDevice(isReducedMotion || isLowMemory);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    
    // Skip particle initialization on low-end devices
    if (!isLowEndDevice) {
      initParticlesEngine(async (engine) => {
        await loadSlim(engine);
      }).then(() => {
        setInit(true);
      });
    }

    return () => window.removeEventListener('resize', checkDevice);
  }, [isLowEndDevice]);

  const options: ISourceOptions = useMemo(
    () => ({
      background: {
        color: {
          value: 'transparent',
        },
      },
      fpsLimit: isMobile ? 20 : 40, // Reduced FPS for better performance
      interactivity: {
        events: {
          onClick: {
            enable: false, // Disabled for performance
            mode: 'push',
          },
          onHover: {
            enable: !isMobile && !isLowEndDevice, // Disabled on mobile/low-end
            mode: 'grab',
          },
        },
        modes: {
          push: {
            quantity: 2,
          },
          grab: {
            distance: 140,
            links: {
              opacity: 0.5,
            },
          },
        },
      },
      particles: {
        color: {
          value: ['#0ea5e9', '#38bdf8', '#7dd3fc', '#0284c7'],
        },
        links: {
          color: '#0ea5e9',
          distance: 150,
          enable: !isMobile && !isLowEndDevice, // Disabled on mobile/low-end
          opacity: 0.15,
          width: 1,
        },
        move: {
          direction: 'none',
          enable: true,
          outModes: {
            default: 'bounce',
          },
          random: true,
          speed: isMobile ? 0.3 : 0.5, // Further reduced speed
          straight: false,
        },
        number: {
          density: {
            enable: true,
            height: 800,
            width: 800,
          },
          value: isMobile ? 8 : 20, // Significantly reduced particles
        },
        opacity: {
          value: { min: 0.1, max: 0.3 },
          animation: {
            enable: false, // Disabled for better performance
            speed: 0.5,
            sync: false,
          },
        },
        shape: {
          type: 'circle',
        },
        size: {
          value: { min: 1, max: isMobile ? 2 : 3 },
        },
      },
      detectRetina: true,
      smooth: false, // Disabled for better performance
    }),
    [isMobile, isLowEndDevice]
  );

  if (!init || isLowEndDevice) return null;

  return (
    <Particles
      id="tsparticles"
      className="fixed inset-0 -z-20 pointer-events-none"
      options={options}
    />
  );
}
