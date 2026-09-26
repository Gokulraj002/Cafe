'use client';

import useGsap from '@/hooks/useGsap';
import { gsap } from '@/lib/animations';
import { FILM_CUES, SEQUENCE_LENGTH, formatReelTime } from './sequence';

/** Catch-up of the scrub, in seconds: silky under a wheel, direct under a thumb. */
const SCRUB = { desktop: 0.9, tablet: 0.6, mobile: 0.35 };
/** The last beats, in which the room dims before the next section arrives. */
const SETTLE_LENGTH = 1.6;

/**
 * One scrubbed timeline for the whole opening, spanning the stage's scroll
 * track (the screen itself stays put with CSS `position: sticky`, so there is
 * no pin and no layout shift).
 *
 * I   — the letterbox parts and the headline resolves word by word.
 * II  — the camera reaches the cup; the steam rises in slow motion while the
 *       line and the invitation arrive.
 * III — the film drifts to the corner and dims, ready for the next section.
 *
 * The film's playhead is a tweened proxy handed to the scroll-video engine on
 * every update; the reel time is written to the DOM only when its second
 * changes. With reduced motion nothing is built and the CSS end state shows.
 *
 * @param {{ current: Element }} stageRef  The section (the scroll track)
 * @param {{ current: { setProgress: (progress: number) => void } }} filmRef
 * @param {object} film  Entry from data/videos.js
 */
export default function useUnveilingTimeline(stageRef, filmRef, film) {
  useGsap(
    ({ isDesktop, isMobile, reduceMotion }) => {
      if (reduceMotion) return;

      const reelTime = stageRef.current.querySelector('.lux-stage__time');
      const playhead = { time: FILM_CUES[0].time };
      let shownSecond = -1;

      const timeline = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: stageRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: isDesktop ? SCRUB.desktop : isMobile ? SCRUB.mobile : SCRUB.tablet,
          invalidateOnRefresh: true,
        },
        onUpdate() {
          filmRef.current?.setProgress(playhead.time / film.duration);

          const second = Math.round(this.progress() * film.duration);
          if (second === shownSecond) return;
          shownSecond = second;
          reelTime.textContent = formatReelTime(second);
        },
      });

      // The reel spans the whole sequence, which also sets the timeline's length.
      timeline.fromTo('.lux-stage__reel-fill', { scaleX: 0 }, { scaleX: 1, duration: SEQUENCE_LENGTH }, 0);

      FILM_CUES.slice(1).forEach((cue, index) => {
        const previous = FILM_CUES[index];
        timeline.fromTo(
          playhead,
          { time: previous.time },
          { time: cue.time, duration: cue.at - previous.at, immediateRender: false },
          previous.at,
        );
      });

      // I — the unveiling
      timeline
        .to('.lux-stage__hint', { opacity: 0, duration: 0.6 }, 0)
        .fromTo('.lux-stage__shade', { opacity: 0.35 }, { opacity: 1, duration: 1.2 }, 0)
        .to('.lux-stage__bar--top', { yPercent: -100, duration: 2.4, ease: 'power2.inOut' }, 0)
        .to('.lux-stage__bar--bottom', { yPercent: 100, duration: 2.4, ease: 'power2.inOut' }, 0)
        .fromTo(
          '.lux-stage__word',
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1.1, stagger: 0.7, ease: 'power3.out' },
          0.6,
        );

      // II — the steam, and the invitation
      timeline
        .fromTo('.lux-stage__lede', { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power2.out' }, 4.2)
        .fromTo('.lux-stage__actions', { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1, ease: 'power2.out' }, 4.8);

      // III — the room settles into the dark
      const settleAt = SEQUENCE_LENGTH - SETTLE_LENGTH;
      timeline.to('.lux-stage__dim', { opacity: 0.45, duration: SETTLE_LENGTH }, settleAt);
      if (isDesktop) {
        timeline.fromTo('.lux-stage__video', { scale: 1 }, { scale: 1.05, duration: SETTLE_LENGTH }, settleAt);
      }

      // Show the first frame of the sequence (not the film's own first frame) as soon as it is ready.
      filmRef.current?.setProgress(playhead.time / film.duration);
    },
    stageRef,
  );
}
