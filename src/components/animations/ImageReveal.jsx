'use client';

import { useRef } from 'react';
import useGsap from '@/hooks/useGsap';
import { clipReveal, parallax } from '@/lib/animations';
import VideoStill from '@/components/video/VideoStill';

/**
 * A film still that wipes open with clip-path as it enters the viewport,
 * optionally drifting with scroll afterwards.
 *
 * Size the frame with `className` (e.g. "ratio-portrait").
 */
export default function ImageReveal({
  video,
  moment,
  aspect,
  sizes,
  alt,
  priority,
  direction = 'up',
  drift = false,
  className = '',
}) {
  const frameRef = useRef(null);
  const innerRef = useRef(null);

  useGsap(
    ({ reduceMotion }) => {
      if (reduceMotion) return;
      clipReveal(frameRef.current, innerRef.current, { direction });
      if (drift) parallax(innerRef.current, { trigger: frameRef.current, amount: 10 });
    },
    frameRef,
  );

  return (
    <div ref={frameRef} className={`image-reveal media-frame ${className}`}>
      <div ref={innerRef} className={`image-reveal__inner ${drift ? 'image-reveal__inner--drift' : ''}`}>
        <VideoStill video={video} moment={moment} aspect={aspect} sizes={sizes} alt={alt} priority={priority} />
      </div>
    </div>
  );
}
