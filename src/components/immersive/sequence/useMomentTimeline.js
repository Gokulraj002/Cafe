'use client';

import { gsap } from '@/lib/animations';
import useGsap from '@/hooks/useGsap';
import {
  BEATS,
  FULL_BLEED,
  cameraPan,
  filmSecondsAt,
  filmStartScale,
  largeInset,
  printInset,
} from './choreography';

/** Scroll distance of the pinned stage, in screens. */
const PIN_SCREENS = { desktop: 3.4, tablet: 2.6, mobile: 2 };
/**
 * Scrub lag in seconds. The film follows the timeline exactly (the engine's
 * own smoothing is switched off), so this is the one easing everything shares.
 */
const SCRUB_LAG = { desktop: 0.8, tablet: 0.5, mobile: 0.4 };
const GROW_EASE = 'power2.inOut';

/** Headline parts rise one after another; the second sentence waits a beat. */
const headlineStagger = (index) => index * 0.16 + (index >= 2 ? 0.4 : 0);

/**
 * Pins the stage and plays the whole Moment from one scrubbed timeline:
 * the print grows to full bleed, the note and the headline come and go, the
 * film dims and the invitation arrives. The film's playhead is read off the
 * same timeline (see `filmSecondsAt`), so picture and motion never drift.
 *
 * Reduced motion: nothing is created and the CSS static layout stands.
 *
 * @param {{ current: HTMLElement | null }} stageRef  The pinned stage
 * @param {{ current: { setProgress: (progress: number) => void } | null }} filmRef  ScrollVideo handle
 * @param {object} film  Entry from data/videos.js
 */
export default function useMomentTimeline(stageRef, filmRef, film) {
  useGsap(({ isDesktop, isTablet, reduceMotion }) => {
    if (reduceMotion) return;

    const stage = stageRef.current;
    const frame = stage.querySelector('.imm-seq__frame');
    const camera = stage.querySelector('.imm-seq__camera');
    const print = stage.querySelector('.imm-seq__print');
    const size = isDesktop ? 'desktop' : isTablet ? 'tablet' : 'mobile';

    const showFilmAt = (time) => filmRef.current?.setProgress(filmSecondsAt(time) / film.duration);
    const midScale = () => gsap.utils.interpolate(filmStartScale(stage), 1, 0.5);

    const timeline = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: stage,
        start: 'top top',
        end: () => `+=${window.innerHeight * PIN_SCREENS[size]}`,
        pin: true,
        anticipatePin: 1,
        scrub: SCRUB_LAG[size],
        invalidateOnRefresh: true,
        onRefresh: (self) => self.animation && showFilmAt(self.animation.time()),
      },
      onUpdate() {
        showFilmAt(this.time());
      },
    });

    // 1 · Frame — the print grows small → large → full bleed while the film settles to its natural size.
    timeline
      .to('.imm-seq__label, .imm-seq__cue', { autoAlpha: 0, y: 24, duration: 0.6, ease: 'power1.in' }, BEATS.frame)
      .to(print, { autoAlpha: 0, duration: 0.5 }, BEATS.frame)
      .fromTo(
        frame,
        { clipPath: () => printInset(stage, print) },
        { clipPath: () => largeInset(stage), duration: BEATS.large - BEATS.frame, ease: GROW_EASE },
        BEATS.frame,
      )
      .fromTo(
        frame,
        { clipPath: () => largeInset(stage) },
        { clipPath: FULL_BLEED, duration: BEATS.fullBleed - BEATS.large, ease: GROW_EASE, immediateRender: false },
        BEATS.large,
      )
      .fromTo(
        camera,
        { scale: () => filmStartScale(stage) },
        { scale: midScale, duration: BEATS.large - BEATS.frame, ease: GROW_EASE },
        BEATS.frame,
      )
      .fromTo(
        camera,
        { scale: midScale },
        { scale: 1, duration: BEATS.fullBleed - BEATS.large, ease: GROW_EASE, immediateRender: false },
        BEATS.large,
      );

    // 2 · Full bleed — a note on the milk while the rosetta forms.
    timeline
      .fromTo(
        '.imm-seq__note > *',
        { autoAlpha: 0, y: 24 },
        { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.12, ease: 'power2.out' },
        BEATS.fullBleed + 0.3,
      )
      .to('.imm-seq__note > *', { autoAlpha: 0, y: -16, duration: 0.4, ease: 'power2.in' }, BEATS.stay - 0.5);

    // 3 · Stay — the film dims, the headline rises line by line, the camera follows the cup.
    timeline
      .to('.imm-seq__shade', { opacity: 0.8, duration: 0.7 }, BEATS.stay)
      .fromTo(
        '.imm-seq__headline .imm-seq__line',
        { y: 0, yPercent: 110 },
        { yPercent: 0, duration: 0.8, stagger: headlineStagger, ease: 'power3.out' },
        BEATS.stay + 0.2,
      )
      .fromTo(
        camera,
        { x: 0 },
        { x: () => cameraPan(stage, camera), duration: BEATS.end - BEATS.stay - 1, ease: 'power1.inOut', immediateRender: false },
        BEATS.stay,
      )
      .to(
        '.imm-seq__headline .imm-seq__line',
        { yPercent: -110, duration: 0.6, stagger: 0.06, ease: 'power2.in' },
        BEATS.table - 0.4,
      );

    // 4 · Table — darker still, and the invitation. The button can only be pressed once it shows.
    timeline
      .to('.imm-seq__shade', { opacity: 1, duration: 0.6 }, BEATS.table)
      .fromTo(
        '.imm-seq__finale .imm-seq__line',
        { y: 0, yPercent: 110 },
        { yPercent: 0, duration: 0.8, stagger: 0.14, ease: 'power3.out' },
        BEATS.table + 0.4,
      )
      .fromTo(
        '.imm-seq__reveal',
        { autoAlpha: 0, y: 16 },
        { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.5, ease: 'power2.out' },
        BEATS.table + 0.3,
      )
      // Hold the invitation on screen before the page moves on.
      .set({}, {}, BEATS.end);

    showFilmAt(timeline.time());
  }, stageRef);
}
