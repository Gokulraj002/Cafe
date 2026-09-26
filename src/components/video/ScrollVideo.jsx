'use client';

import { useEffect, useImperativeHandle, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/animations';
import useIntersectionVideo from '@/hooks/useIntersectionVideo';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';
import useScrollVideo from '@/hooks/useScrollVideo';
import VideoStill from './VideoStill';

/** When `load` is left to the component, the film starts downloading a screen before it arrives. */
const LOAD_MARGIN = '100% 0px';

/** Accepts a ref object or an element. */
function resolveElement(target) {
  return target && 'current' in target ? target.current : target;
}

/**
 * A film whose playhead follows scroll (or anything else) instead of the
 * clock. See hooks/useScrollVideo for the engine.
 *
 * Renders a responsive still of the film first — `posterPriority` makes it
 * the page's LCP image — and fades the film in over it once it is ready.
 * With reduced motion the film is never downloaded and the still remains.
 *
 * Two ways to drive it:
 * - `scroll={{ trigger, start, end, range }}` — the component maps its own
 *   ScrollTrigger's progress onto the film, optionally onto only a part of
 *   it (`range: [0.2, 0.6]`). It does not pin: the caller does that. Easing
 *   comes from `smoothing`, not from a GSAP `scrub` lag.
 * - `ref` — `ref.current.setProgress(progress)` from a timeline's onUpdate,
 *   a pointer handler, …  `ref.current.isReady` tells whether the film shows.
 *
 * The component fills its parent when placed in `.video-cover`; otherwise
 * size it through `className`.
 *
 * @param {object}  video         Entry from data/videos.js
 * @param {boolean} [load]        Start downloading; omit to start near the viewport
 * @param {number}  [width]       Rendition width; by default picked from the viewport
 * @param {number}  [smoothing]   Playhead easing, see useScrollVideo
 * @param {string}  [posterMoment] Key of `video.moments` for the still; omit for the poster frame
 * @param {string}  [sizes]       `sizes` of the still
 * @param {string}  [alt]         Alt text of the still — decorative (empty) by default
 */
export default function ScrollVideo({
  video,
  load,
  width,
  smoothing,
  scroll,
  posterMoment,
  posterPriority = false,
  sizes = '100vw',
  alt = '',
  className = '',
  ref,
}) {
  const frameRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { shouldLoad: isNearViewport } = useIntersectionVideo(frameRef, { loadMargin: LOAD_MARGIN });
  const { videoRef, isReady, setProgress } = useScrollVideo(video, {
    load: !prefersReducedMotion && (load ?? isNearViewport),
    width,
    smoothing,
  });

  useImperativeHandle(ref, () => ({ setProgress, isReady }), [setProgress, isReady]);

  const hasScroll = Boolean(scroll);
  const { trigger, start = 'top top', end = 'bottom bottom', range = [0, 1] } = scroll ?? {};
  const [rangeStart, rangeEnd] = range;

  // A passive effect rather than useGsap: a parent's ref (the usual trigger)
  // is attached only after this component's layout effects have run.
  useEffect(() => {
    if (!hasScroll) return undefined;

    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      // The playhead eases itself, so the raw scroll progress is passed on
      // unsmoothed. onRefresh re-syncs it after resizes and re-measures.
      const followScroll = (self) => setProgress(rangeStart + (rangeEnd - rangeStart) * self.progress);

      ScrollTrigger.create({
        trigger: resolveElement(trigger) ?? frameRef.current,
        start,
        end,
        onUpdate: followScroll,
        onRefresh: followScroll,
      });
    });

    return () => media.revert();
  }, [hasScroll, trigger, start, end, rangeStart, rangeEnd, setProgress]);

  return (
    <div ref={frameRef} className={`scroll-video ${isReady ? 'is-ready' : ''} ${className}`}>
      <VideoStill
        video={video}
        moment={posterMoment}
        sizes={sizes}
        priority={posterPriority}
        alt={alt}
        className="scroll-video__still"
      />
      <video
        ref={videoRef}
        className="cafe-video scroll-video__film"
        muted
        playsInline
        preload="none"
        aria-hidden="true"
        disablePictureInPicture
      />
    </div>
  );
}
