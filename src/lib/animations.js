/**
 * GSAP setup and the reusable reveal/motion recipes used across concepts.
 * Only transform, opacity and clip-path are animated — never layout.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText);
  // Mobile address bars resize the viewport while scrolling; refreshing on
  // every show/hide would make pinned film sequences jump.
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export { gsap, ScrollTrigger, SplitText };

/** Conditions handed to every `useGsap` setup function. */
export const MOTION_QUERIES = {
  isDesktop: '(min-width: 992px)',
  isTablet: '(min-width: 768px) and (max-width: 991.98px)',
  isMobile: '(max-width: 767.98px)',
  reduceMotion: '(prefers-reduced-motion: reduce)',
};

export const EASE = {
  reveal: 'power3.out',
  cinematic: 'expo.out',
  smooth: 'power2.inOut',
};

/** Fade + rise, triggered once when the trigger enters the viewport. */
export function fadeReveal(targets, { trigger, y = 36, stagger = 0.1, delay = 0, start = 'top 85%' } = {}) {
  // Skip elements that are not rendered at this breakpoint (display: none).
  const visibleTargets = gsap.utils.toArray(targets).filter((element) => element.getClientRects().length > 0);
  if (!visibleTargets.length) return null;

  return gsap.from(visibleTargets, {
    autoAlpha: 0,
    y,
    duration: 1.1,
    ease: EASE.reveal,
    stagger,
    delay,
    scrollTrigger: { trigger: trigger ?? visibleTargets[0], start, once: true },
  });
}

/**
 * Line-by-line masked text reveal. Lines re-split automatically when fonts
 * load or the viewport resizes.
 *
 * @param {Element} element
 * @param {object}  [options]
 * @param {boolean} [options.onScroll=true] false plays immediately (hero copy)
 */
export function textReveal(element, { onScroll = true, delay = 0, stagger = 0.09, start = 'top 85%' } = {}) {
  gsap.set(element, { autoAlpha: 1 });

  return SplitText.create(element, {
    type: 'lines',
    linesClass: 'line',
    mask: 'lines',
    autoSplit: true,
    onSplit(self) {
      return gsap.from(self.lines, {
        yPercent: 110,
        duration: 1.3,
        ease: EASE.cinematic,
        stagger,
        delay,
        scrollTrigger: onScroll ? { trigger: element, start, once: true } : undefined,
      });
    },
  });
}

/** Clip-path wipe on the frame with a settling zoom on the image inside. */
export function clipReveal(frame, inner, { direction = 'up', start = 'top 80%' } = {}) {
  const hidden = {
    up: 'inset(100% 0% 0% 0%)',
    down: 'inset(0% 0% 100% 0%)',
    left: 'inset(0% 0% 0% 100%)',
    right: 'inset(0% 100% 0% 0%)',
  }[direction];

  const timeline = gsap.timeline({ scrollTrigger: { trigger: frame, start, once: true } });
  timeline
    .fromTo(frame, { clipPath: hidden }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: EASE.cinematic })
    .from(inner, { scale: 1.25, duration: 1.8, ease: EASE.cinematic }, 0);

  return timeline;
}

/** Scrubbed vertical drift, for layered depth. */
export function parallax(target, { trigger, amount = 12 } = {}) {
  return gsap.fromTo(
    target,
    { yPercent: -amount / 2 },
    {
      yPercent: amount / 2,
      ease: 'none',
      scrollTrigger: { trigger: trigger ?? target, start: 'top bottom', end: 'bottom top', scrub: true },
    },
  );
}
