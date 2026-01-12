'use client';

import { useEffect, useMemo, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import type { ISourceOptions } from '@tsparticles/engine';

export default function ParticleBackground() {
  const [init, setInit] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile for performance optimization
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const options: ISourceOptions = useMemo(
    () => ({
      background: {
        color: {
          value: 'transparent',
        },
      },
      fpsLimit: isMobile ? 30 : 60,
      interactivity: {
        events: {
          onClick: {
            enable: !isMobile,
            mode: 'push',
          },
          onHover: {
            enable: !isMobile,
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
          enable: !isMobile,
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
          speed: isMobile ? 0.5 : 0.8,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            height: 800,
            width: 800,
          },
          value: isMobile ? 15 : 35,
        },
        opacity: {
          value: { min: 0.1, max: 0.3 },
          animation: {
            enable: !isMobile,
            speed: 0.5,
            sync: false,
          },
        },
        shape: {
          type: 'circle',
        },
        size: {
          value: { min: 1, max: isMobile ? 3 : 4 },
        },
      },
      detectRetina: true,
      smooth: true,
    }),
    [isMobile]
  );

  if (!init) return null;

  return (
    <Particles
      id="tsparticles"
      className="fixed inset-0 -z-20 pointer-events-none"
      options={options}
    />
  );
}
