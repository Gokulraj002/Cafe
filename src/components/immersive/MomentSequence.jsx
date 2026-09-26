'use client';

import { useRef } from 'react';
import cafeVideos from '@/data/videos';
import ScrollVideo from '@/components/video/ScrollVideo';
import MaskedLines from './sequence/MaskedLines';
import MomentInvitation from './sequence/MomentInvitation';
import MomentWall from './sequence/MomentWall';
import useMomentTimeline from './sequence/useMomentTimeline';

const film = cafeVideos.concept4;
const HEADLINE = [
  ['Come for the', 'coffee.'],
  ['Stay for the', 'moment.'],
];
/** The still is the LCP image; it never needs to be sharper than the film that replaces it. */
const STILL_SIZES = '(max-aspect-ratio: 1/1) 540px, (min-width: 1280px) 1280px, 100vw';

/**
 * Concept 04 opens with "The Moment": a small print of a latte being poured
 * hangs on a dark wall. Scrolling plays the pour and grows the print until it
 * fills the screen; then the film dims, the headline rises and the table is
 * offered. The choreography lives in sequence/useMomentTimeline.
 */
export default function MomentSequence() {
  const stageRef = useRef(null);
  const filmRef = useRef(null);

  useMomentTimeline(stageRef, filmRef, film);

  return (
    <section id="top" className="imm-seq theme-charcoal" aria-labelledby="imm-seq-title">
      <div ref={stageRef} id="moment" className="imm-seq__stage">
        <div className="imm-seq__print" aria-hidden="true" />

        <div className="imm-seq__frame">
          <div className="imm-seq__camera">
            <ScrollVideo
              ref={filmRef}
              video={film}
              smoothing={1}
              posterMoment="pitcher"
              posterPriority
              sizes={STILL_SIZES}
              alt={film.moments.pitcher.alt}
              className="imm-seq__film"
            />
          </div>
          <div className="imm-seq__shade" />
        </div>

        <div className="imm-seq__copy">
          <h1 id="imm-seq-title" className="imm-seq__headline">
            <MaskedLines sentences={HEADLINE} />
          </h1>
          <MomentInvitation />
        </div>

        <MomentWall />
      </div>
    </section>
  );
}
