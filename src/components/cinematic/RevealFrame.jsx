'use client';

import { useRef } from 'react';
import useGsap from '@/hooks/useGsap';
import { clipReveal, parallax } from '@/lib/animations';
import LuxMedia from './LuxMedia';

/**
 * A photo or film still that wipes open as it enters the viewport and, with
 * `drift`, glides inside its frame on tablet and desktop. The shared
 * ImageReveal does the same for film stills only.
 *
 * Size the frame with `className` (e.g. "ratio-portrait").
 */
export default function RevealFrame({ media, aspect, sizes, direction = 'up', drift = false, className = '' }) {
  const frameRef = useRef(null);
  const innerRef = useRef(null);

  useGsap(
    ({ isMobile, reduceMotion }) => {
      // A frame in a layout hidden at this breakpoint (display: none) has no
      // box to measure: its once-only trigger would fire and remove itself
      // mid-refresh. The setup re-runs when the breakpoint changes.
      const isRendered = frameRef.current.getClientRects().length > 0;
      if (reduceMotion || !isRendered) return;
      clipReveal(frameRef.current, innerRef.current, { direction });
      if (drift && !isMobile) parallax(innerRef.current, { trigger: frameRef.current, amount: 10 });
    },
    frameRef,
  );

  return (
    <div ref={frameRef} className={`image-reveal media-frame ${className}`}>
      <div ref={innerRef} className={`image-reveal__inner ${drift ? 'image-reveal__inner--drift' : ''}`}>
        <LuxMedia media={media} aspect={aspect} sizes={sizes} />
      </div>
    </div>
  );
}
