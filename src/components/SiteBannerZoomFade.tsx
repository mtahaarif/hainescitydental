"use client";

import { useEffect, useRef, useState } from 'react';

interface Props {
  images?: string[];
  height?: number;
}

const DEFAULT_IMAGES = [
  '/banner01-1536x768.jpg',
  '/banner02-1536x768.jpg',
  '/banner03-1536x768.jpg',
  '/banner04-1536x736.jpg',
  '/banner05-1536x768.jpg',
];

export default function SiteBannerZoomFade({ images, height = 260 }: Props) {
  const imgs = (images && images.length) ? images.slice(0, 6) : DEFAULT_IMAGES;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<number | null>(null);
  const currentRef = useRef<number>(0);
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const slides = Array.from(container.querySelectorAll('.sbzf-slide')) as HTMLElement[];
    const dots = Array.from(container.querySelectorAll('.sbzf-dot')) as HTMLElement[];

    function show(index: number) {
      const safeIndex = ((index % slides.length) + slides.length) % slides.length;
      if (safeIndex === currentRef.current) return;
      slides.forEach((s, i) => {
        s.classList.toggle('sbzf-active', i === safeIndex);
        if (dots[i]) dots[i].classList.toggle('sbzf-active', i === safeIndex);
      });
      currentRef.current = safeIndex;
      setCurrent(safeIndex);
    }

    function next() {
      show(currentRef.current + 1);
    }

    // Start autoplay
    function start() {
      stop();
      // 5000ms animation + 2000ms pause after animation + 1000ms transition
      // total cycle = 8000ms
      timerRef.current = window.setInterval(next, 8000);
    }
    function stop() {
      if (timerRef.current) { window.clearInterval(timerRef.current); timerRef.current = null; }
    }

    // Initialize
    slides.forEach((s) => s.classList.remove('sbzf-active'));
    if (slides[0]) slides[0].classList.add('sbzf-active');
    if (dots[0]) dots[0].classList.add('sbzf-active');
    currentRef.current = 0;
    start();

    // Pause on hover
    const onEnter = () => { stop(); setIsPaused(true); };
    const onLeave = () => { start(); setIsPaused(false); };
    container.addEventListener('mouseenter', onEnter);
    container.addEventListener('mouseleave', onLeave);

    // Wire up controls and dots
    const prevBtn = container.querySelector('.sbzf-prev');
    const nextBtn = container.querySelector('.sbzf-next');
    const onPrev = (e: Event) => { e.preventDefault(); stop(); show(currentRef.current - 1); start(); };
    const onNext = (e: Event) => { e.preventDefault(); stop(); show(currentRef.current + 1); start(); };
    if (prevBtn) prevBtn.addEventListener('click', onPrev);
    if (nextBtn) nextBtn.addEventListener('click', onNext);
    const dotHandlers: Array<() => void> = [];
    dots.forEach((d, idx) => {
      const handler = () => { stop(); show(idx); start(); };
      dotHandlers.push(handler);
      d.addEventListener('click', handler);
    });

    return () => {
      stop();
      container.removeEventListener('mouseenter', onEnter);
      container.removeEventListener('mouseleave', onLeave);
      if (prevBtn) prevBtn.removeEventListener('click', onPrev);
      if (nextBtn) nextBtn.removeEventListener('click', onNext);
      dots.forEach((d, idx) => d.removeEventListener('click', dotHandlers[idx]));
    };
    // we intentionally omit dependencies to avoid re-creating timer on every render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRef]);

  if (!imgs.length) return null;

  return (
    <div
      id="sbzf-banner"
      style={{ ['--sbzf-height' as any]: `${height}px`, marginTop: '70px' }}
      className="w-full"
    >
      <style>{`
        /* local styles for banner */
        /* keep banner behind header/dropdowns (header uses z-50) */
        #sbzf-banner { position: relative; width: 100%; z-index: 10; }
        #sbzf-banner .sbzf-inner { max-width: 1600px; margin: 0 auto; position: relative; height: clamp(140px, 18vw, var(--sbzf-height)); overflow: hidden; }
        .sbzf-slider { position: relative; height: 100%; width: 100%; }
        .sbzf-slide { position: absolute; inset: 0; opacity: 0; transition: opacity 1000ms cubic-bezier(.2,.8,.2,1), transform 1000ms cubic-bezier(.2,.8,.2,1); display: flex; align-items: center; justify-content: center; transform-origin: center center; will-change: opacity, transform; }
        .sbzf-slide img { width: 100%; height: 100%; object-fit: cover; display: block; backface-visibility: hidden; }
        .sbzf-slide.sbzf-active { opacity: 1; z-index: 2; animation: sbzf-zoomout 5s cubic-bezier(.2,.8,.2,1) forwards; }
        @keyframes sbzf-zoomout { 0% { transform: scale(1.06); } 60% { transform: scale(1.01); } 100% { transform: scale(1); } }
        .sbzf-controls { position: absolute; inset: 0; pointer-events: none; z-index: 3; }
        .sbzf-arrow { pointer-events: auto; position: absolute; top: 50%; transform: translateY(-50%); width: 48px; height: 48px; border-radius: 9999px; background: rgba(255,255,255,0.95); color: #187EC2; display: flex; align-items: center; justify-content: center; cursor: pointer; margin: 0 8px; box-shadow: 0 6px 18px rgba(0,0,0,0.12); transition: transform .16s ease, background .12s ease, color .12s ease; }
        .sbzf-arrow:hover { transform: translateY(-50%) scale(1.06); }
        .sbzf-arrow.sbzf-prev { left: 16px; }
        .sbzf-arrow.sbzf-next { right: 16px; }
        .sbzf-pagination { position: absolute; bottom: 12px; left: 50%; transform: translateX(-50%); display:flex; gap:6px; pointer-events: auto; z-index: 4; }
        /* Visual dot kept small but button has larger hit area for accessibility */
        .sbzf-dot { background: transparent; border: 0; padding: 8px; display: inline-flex; align-items: center; justify-content: center; cursor: pointer; }
        .sbzf-dot:focus { outline: none; }
        /* SVG-based visual for crisper dots */
        .sbzf-dot-visual { width: 6px; height: 6px; display: block; }
        .sbzf-dot-visual circle { fill: rgba(255,255,255,0.75); transition: transform .18s ease, fill .18s ease; transform-origin: center center; }
        .sbzf-dot.sbzf-active .sbzf-dot-visual circle { fill: #187EC2; transform: scale(1.6); }
        @media (max-width: 900px) { .sbzf-arrow { width:40px; height:40px; } .sbzf-dot { padding:6px; } .sbzf-dot-visual { width:5px; height:5px; } }
        @media (max-width: 640px) { .sbzf-arrow { width:34px; height:34px; } .sbzf-dot { padding:5px; } .sbzf-dot-visual { width:4px; height:4px; } .sbzf-pagination { gap:4px; bottom:8px; } }
      `}</style>

      <div className="sbzf-inner" role="region" aria-label="Site banner slideshow">
        <div className="sbzf-slider" role="list" ref={containerRef}>
          {imgs.map((src, i) => {
            // derive base name from filename, strip size suffix if present
            const filename = src.split('/').pop() || src;
            const base = filename.replace(/-\d+x\d+\.(jpg|jpeg|png)$/i, '').replace(/\.(jpg|jpeg|png)$/i, '');
            const sizes = [480, 768, 1024, 1536];
            const webpSrcSet = sizes.map(w => `/${base}-${w}.webp ${w}w`).join(', ');
            const jpgSrcSet = sizes.map(w => `/${base}-${w}.jpg ${w}w`).join(', ');
            return (
              <div id={`sbzf-slide-${i}`} className="sbzf-slide" role="listitem" aria-hidden={i !== 0} key={i}>
                <picture>
                  <source type="image/webp" srcSet={webpSrcSet} sizes="(max-width: 1024px) 100vw, 1600px" />
                  <img src={src} srcSet={jpgSrcSet} sizes="(max-width: 1024px) 100vw, 1600px" alt={`Banner slide ${i + 1}`} loading={i === 0 ? 'eager' : 'lazy'} decoding="async" />
                </picture>
              </div>
            );
          })}

          <div className="sbzf-controls" aria-hidden="false">
            <button className="sbzf-arrow sbzf-prev" aria-label="Previous slide">‹</button>
            <button className="sbzf-arrow sbzf-next" aria-label="Next slide">›</button>

            <div className="sbzf-pagination" role="tablist" aria-label="Slide navigation">
              {imgs.map((_, i) => (
                <button key={i} className="sbzf-dot" role="tab" aria-selected={i === 0} aria-controls={`sbzf-slide-${i}`} aria-label={`Go to slide ${i + 1}`}>
                  <svg className="sbzf-dot-visual" viewBox="0 0 10 10" width="10" height="10" aria-hidden="true" focusable="false">
                    <circle cx="5" cy="5" r="5" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
