'use client';

import { useRef } from 'react';
import useGsap from '@/hooks/useGsap';
import { gsap, EASE } from '@/lib/animations';

/** Matches --imm-radius in immersive.css, so the clip and the frame share corners. */
const CORNER = 'round 1.5rem';

/**
 * Opens its content the way the opening film does: a small rounded window
 * that grows to the full frame while the picture inside settles from a zoom.
 * Phones get a shorter, gentler version; reduced motion shows it as is.
 */
export default function FrameReveal({ className = '', children }) {
  const frameRef = useRef(null);

  useGsap(
    ({ isMobile, reduceMotion }) => {
      if (reduceMotion) return;
      const frame = frameRef.current;
      const inset = isMobile ? 6 : 12;

      gsap
        .timeline({ scrollTrigger: { trigger: frame, start: 'top 85%', once: true } })
        .fromTo(
          frame,
          { clipPath: `inset(${inset}% ${inset}% ${inset}% ${inset}% ${CORNER})` },
          { clipPath: `inset(0% 0% 0% 0% ${CORNER})`, duration: 1.4, ease: EASE.cinematic },
        )
        .from(frame.querySelectorAll('img'), { scale: 1.18, duration: 1.8, ease: EASE.cinematic }, 0);
    },
    frameRef,
  );

  return (
    <div ref={frameRef} className={`imm-reveal ${className}`}>
      {children}
    </div>
  );
}
