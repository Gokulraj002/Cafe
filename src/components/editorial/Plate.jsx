'use client';

import { useRef } from 'react';
import Image from 'next/image';
import useGsap from '@/hooks/useGsap';
import { clipReveal, fadeReveal, parallax } from '@/lib/animations';
import VideoStill from '@/components/video/VideoStill';

/**
 * A captioned magazine plate: a photograph from data/images.js or a frame
 * from one of the café films. From tablet up it wipes open with clip-path as
 * it arrives (and, with `drift`, floats gently on desktop); on phones it
 * simply fades up.
 *
 * @param {object} [photo]   Entry from data/images.js
 * @param {{video: object, moment: string, aspect?: string}} [still] Film frame, used when there is no photo
 * @param {string} figure    Figure number printed before the caption
 * @param {string} caption
 * @param {string} [ratio]   Aspect class for the frame (.ratio-* or .ed-ratio-*)
 * @param {string} sizes     `sizes` of the image — keep it accurate
 * @param {'up'|'down'|'left'|'right'} [direction] Direction of the wipe
 */
export default function Plate({
  photo,
  still,
  figure,
  caption,
  ratio = 'ratio-portrait',
  sizes,
  direction = 'up',
  drift = false,
  className = '',
}) {
  const figureRef = useRef(null);
  const frameRef = useRef(null);
  const innerRef = useRef(null);

  useGsap(
    ({ isMobile, isDesktop, reduceMotion }) => {
      if (reduceMotion) return;
      if (isMobile) {
        fadeReveal(figureRef.current, { y: 24 });
        return;
      }
      clipReveal(frameRef.current, innerRef.current, { direction });
      if (drift && isDesktop) parallax(innerRef.current, { trigger: frameRef.current, amount: 10 });
    },
    figureRef,
  );

  return (
    <figure ref={figureRef} className={`ed-plate ${className}`}>
      <div ref={frameRef} className={`ed-plate__frame ${ratio}`}>
        <div ref={innerRef} className={`ed-plate__inner ${drift ? 'ed-plate__inner--drift' : ''}`}>
          {photo ? (
            <Image src={photo.src} alt={photo.alt} fill sizes={sizes} />
          ) : (
            <VideoStill video={still.video} moment={still.moment} aspect={still.aspect} sizes={sizes} />
          )}
        </div>
      </div>
      <figcaption className="ed-plate__caption">
        <span className="ed-plate__figure">Fig. {figure}</span>
        <span>
          {caption}
          <span className="ed-plate__credit">
            {photo ? `Photograph: ${photo.credit.name}` : 'Still from the house film'}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}
