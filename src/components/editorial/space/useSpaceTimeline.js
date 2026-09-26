'use client';

import { useCallback, useRef } from 'react';
import useGsap from '@/hooks/useGsap';
import { gsap } from '@/lib/animations';
import { formatTimecode } from './spaceBeats';

/*
 * Timeline units. Every paragraph owns one unit of scroll: the film rests
 * near its `from` frame on the way in (EDGE, first paragraph only), drifts
 * to `to` while the paragraph is on the reading line (READ), then travels to
 * the next paragraph's `from` (TRAVEL). 0.3 + 5 × 0.4 + 4 × 0.6 + 0.3 = 5.
 */
const EDGE = 0.3;
const READ = 0.4;
const TRAVEL = 0.6;

/**
 * Scrubs the space film with the reader. A single scroll-scrubbed timeline
 * spans the story column and drives, through its onUpdate:
 * - the film's playhead (the engine eases it, so the scrub itself is raw);
 * - the timecode under the plate, written straight to the DOM;
 * - the progress segments, as scaleX fills;
 * - `onBeatChange(index)`, called only when the paragraph on the reading line changes.
 *
 * Nothing is created when motion is reduced: the stills and static text take over.
 *
 * @returns {(index: number) => void} Scrolls the page until that paragraph sits on the reading line
 */
export default function useSpaceTimeline({ scopeRef, storyRef, filmRef, timecodeRef, film, beats, onBeatChange }) {
  const scrollTriggerRef = useRef(null);

  useGsap(
    ({ isDesktop, reduceMotion }) => {
      if (reduceMotion) return undefined;

      // Below lg the film fills the top of the screen, so the reading line sits lower.
      const readingLine = isDesktop ? 'center' : '70%';
      const playhead = { time: beats[0].from };
      let shownTimecode = '';
      let shownBeat = -1;

      // The still under the film shows the first frame: start the film there too.
      filmRef.current?.setProgress(playhead.time / film.duration);

      const timeline = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: storyRef.current,
          start: `top ${readingLine}`,
          end: `bottom ${readingLine}`,
          scrub: true,
          invalidateOnRefresh: true,
        },
        onUpdate() {
          filmRef.current?.setProgress(playhead.time / film.duration);

          const timecode = formatTimecode(playhead.time);
          if (timecode !== shownTimecode && timecodeRef.current) {
            timecodeRef.current.textContent = timecode;
            shownTimecode = timecode;
          }

          const beat = Math.min(Math.floor(this.progress() * beats.length), beats.length - 1);
          if (beat !== shownBeat) {
            shownBeat = beat;
            onBeatChange(beat);
          }
        },
      });

      beats.forEach((beat, index) => {
        timeline
          .to(playhead, { time: beat.from, duration: index === 0 ? EDGE : TRAVEL })
          .to(playhead, { time: beat.to, duration: READ });
      });
      timeline.to({}, { duration: EDGE });

      gsap.utils.toArray('.ed-space-progress__fill').forEach((fill, index) => {
        timeline.fromTo(fill, { scaleX: 0 }, { scaleX: 1, duration: 1 }, index);
      });

      scrollTriggerRef.current = timeline.scrollTrigger;
      return () => {
        scrollTriggerRef.current = null;
      };
    },
    scopeRef,
  );

  return useCallback(
    (index) => {
      const trigger = scrollTriggerRef.current;
      if (!trigger) return;

      const readingPoint = (index + 0.5) / beats.length;
      window.scrollTo({ top: trigger.start + (trigger.end - trigger.start) * readingPoint, behavior: 'smooth' });
    },
    [beats.length],
  );
}
