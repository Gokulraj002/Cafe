'use client';

import { useRef } from 'react';
import useGsap from '@/hooks/useGsap';
import { clipReveal, parallax } from '@/lib/animations';

/**
 * Wipes its image open with clip-path as it enters the viewport — any image:
 * a photograph through next/image or a film still. On desktop, `drift` lets
 * the image float slightly against the scroll afterwards.
 *
 * Size the frame through `className` (e.g. "ratio-portrait"); the image
 * inside should use `fill`.
 *
 * @param {'up'|'down'|'left'|'right'} [direction]
 * @param {boolean} [drift]
 */
export default function RevealFrame({ direction = 'up', drift = false, className = '', children }) {
  const frameRef = useRef(null);
  const innerRef = useRef(null);

  useGsap(
    ({ isDesktop, reduceMotion }) => {
      if (reduceMotion) return;
      clipReveal(frameRef.current, innerRef.current, { direction });
      if (drift && isDesktop) parallax(innerRef.current, { trigger: frameRef.current, amount: 10 });
    },
    frameRef,
  );

  return (
    <div ref={frameRef} className={`image-reveal media-frame ${className}`}>
      <div ref={innerRef} className={`image-reveal__inner ${drift ? 'image-reveal__inner--drift' : ''}`}>
        {children}
      </div>
    </div>
  );
}
