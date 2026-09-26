'use client';

import { useRef } from 'react';
import useGsap from '@/hooks/useGsap';
import { clipReveal } from '@/lib/animations';
import ScrollVideo from '@/components/video/ScrollVideo';
import SpaceProgress from './SpaceProgress';
import { formatTimecode } from './spaceBeats';

/*
 * The 16:9 still is cropped to the plate with object-fit: cover, so its
 * rendered width follows the plate's HEIGHT (about 1.8 × of it), not the
 * column's width.
 */
const STILL_SIZES = '(min-width: 992px) 140vh, (min-width: 768px) 85vh, 78vh';

/**
 * The framed film plate of "01 — The Space". It stays in view (CSS sticky,
 * set on its column) while the story scrolls past, and the stage timeline
 * scrubs the film through `filmRef` and writes the running time into
 * `timecodeRef`.
 */
export default function SpacePlate({ film, beats, activeIndex, filmRef, timecodeRef, onSelect }) {
  const plateRef = useRef(null);
  const activeBeat = beats[activeIndex];

  useGsap(
    ({ reduceMotion }) => {
      if (reduceMotion) return;
      const frame = plateRef.current.querySelector('.ed-space-plate__film');
      clipReveal(frame, frame.children, { start: 'top 85%' });
    },
    plateRef,
  );

  return (
    <figure ref={plateRef} className="ed-space-plate mb-0">
      <p className="ed-space-plate__folio mb-0" aria-hidden="true">
        <span>01 — The Space</span>
        <span>The Slow Issue</span>
      </p>

      <div className="ed-space-plate__window">
        <ScrollVideo
          ref={filmRef}
          video={film}
          posterMoment="lamp"
          sizes={STILL_SIZES}
          alt={film.moments.lamp.alt}
          className="ed-space-plate__film"
        />
        <p key={activeBeat.key} className="ed-space-plate__now mb-0" aria-hidden="true">
          <span className="ed-space-plate__now-numeral">{activeBeat.numeral}</span> {activeBeat.title}
        </p>
      </div>

      <figcaption className="ed-space-plate__caption">
        <span>
          <em className="ed-space-plate__fig">Fig. 1</em> — The room, assembling itself
        </span>
        <span className="ed-space-plate__timecode" aria-hidden="true">
          <span ref={timecodeRef}>{formatTimecode(beats[0].from)}</span> / {formatTimecode(film.duration)}
        </span>
      </figcaption>

      <SpaceProgress beats={beats} activeIndex={activeIndex} onSelect={onSelect} />
    </figure>
  );
}
