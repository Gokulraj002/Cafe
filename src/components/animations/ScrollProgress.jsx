'use client';

import { useRef } from 'react';
import useGsap from '@/hooks/useGsap';
import { gsap } from '@/lib/animations';

/** Thin caramel line along the top edge that tracks reading progress. */
export default function ScrollProgress() {
  const ref = useRef(null);

  useGsap(() => {
    gsap.to(ref.current, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: { trigger: document.documentElement, start: 'top top', end: 'bottom bottom', scrub: 0.3 },
    });
  }, ref);

  return <div ref={ref} className="scroll-progress" aria-hidden="true" />;
}
