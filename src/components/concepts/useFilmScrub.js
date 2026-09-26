'use client';

import { useRef, useState } from 'react';
import useMediaQuery from '@/hooks/useMediaQuery';
import useScrollVideo from '@/hooks/useScrollVideo';

/** Scrubbing needs a precise pointer that can hover, and a visitor who welcomes motion. */
const SCRUB_QUERY = '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)';
/** A card-sized frame never needs a larger rendition. */
const SCRUB_WIDTH = 640;
/** The last frames of each film carry the generator's mark, so the scrub stops short of them. */
const END_TRIM = 0.8;
/** A touch snappier than on a scroll-driven stage: the hand expects to lead. */
const SCRUB_SMOOTHING = 0.2;
const FILM_FPS = 24;

const pad = (value) => String(value).padStart(2, '0');

/** Editing-room timecode — minutes:seconds:frames at 24 fps, e.g. 6.5 s → "00:06:12". */
export function formatTimecode(seconds) {
  const totalFrames = Math.round(seconds * FILM_FPS);
  const wholeSeconds = Math.floor(totalFrames / FILM_FPS);
  return `${pad(Math.floor(wholeSeconds / 60))}:${pad(wholeSeconds % 60)}:${pad(totalFrames % FILM_FPS)}`;
}

/**
 * Pointer scrubbing for a concept card, on the shared scroll-video engine.
 * Moving across the card moves the film's playhead from its first frame to
 * (nearly) its last; leaving glides it back to the poster frame, so the film
 * and the still beneath it match again.
 *
 * Nothing downloads until a mouse or pen first enters the card. The scrub
 * bar and the timecode are written straight to the DOM — no React state
 * changes while the pointer moves.
 *
 * @param {object} film Entry from data/videos.js
 */
export default function useFilmScrub(film) {
  const canScrub = useMediaQuery(SCRUB_QUERY);
  const [hasEntered, setHasEntered] = useState(false);
  const surfaceRef = useRef(null);
  const timecodeRef = useRef(null);
  const { videoRef, isReady, setProgress } = useScrollVideo(film, {
    load: canScrub && hasEntered,
    width: SCRUB_WIDTH,
    smoothing: SCRUB_SMOOTHING,
  });

  const endProgress = (film.duration - END_TRIM) / film.duration;
  const restProgress = film.poster / film.duration;

  function showProgress(progress) {
    setProgress(progress);
    surfaceRef.current?.style.setProperty('--sel-scrub', (progress / endProgress).toFixed(4));
    if (timecodeRef.current) timecodeRef.current.textContent = formatTimecode(progress * film.duration);
  }

  function handlePointerMove(event) {
    if (!canScrub || event.pointerType === 'touch') return;
    if (!hasEntered) setHasEntered(true);

    const box = surfaceRef.current.getBoundingClientRect();
    const share = Math.min(Math.max((event.clientX - box.left) / box.width, 0), 1);
    showProgress(share * endProgress);
  }

  function handlePointerLeave() {
    if (canScrub) showProgress(restProgress);
  }

  return {
    canScrub,
    isReady,
    isLoading: hasEntered && !isReady,
    videoRef,
    surfaceRef,
    timecodeRef,
    scrubHandlers: {
      onPointerEnter: handlePointerMove,
      onPointerMove: handlePointerMove,
      onPointerLeave: handlePointerLeave,
    },
  };
}
