'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { pickScrubWidth, scrubVideoUrl } from '@/lib/cloudinary';

/** Mid-glide seeks closer together than this are skipped — less than one frame of 24 fps film. */
const MIN_SEEK_STEP = 1 / 40;
/** Seeking to the very last instant shows a blank frame in some browsers. */
const END_MARGIN = 0.05;
/** The glide snaps onto its target once it is this close, in seconds. */
const SETTLE_DISTANCE = 0.005;
const FRAME_MS = 1000 / 60;

/**
 * Runs `callback` once the main thread is idle and returns a canceller. The
 * delay also means React strict mode's mount → unmount → mount starts ONE
 * download, not two.
 */
function whenIdle(callback) {
  if ('requestIdleCallback' in window) {
    const handle = window.requestIdleCallback(callback, { timeout: 1000 });
    return () => window.cancelIdleCallback(handle);
  }
  const handle = window.setTimeout(callback, 50);
  return () => window.clearTimeout(handle);
}

/**
 * Glides a video's playhead toward a target progress, one animation frame at
 * a time. A new seek is issued only after the previous one has painted, and
 * the loop stops as soon as the playhead has arrived — an idle film costs
 * nothing.
 */
function createPlayhead() {
  let element = null;
  let duration = 0;
  let target = 0; // progress 0–1, remembered even before the film is ready
  let displayed = 0; // seconds, eases toward the target
  let requested = 0; // seconds, the last value handed to the element
  let smoothing = 0.15;
  let frame = 0;
  let lastTimestamp = 0;

  const targetTime = () => Math.min(Math.max(target, 0), 1) * Math.max(duration - END_MARGIN, 0);

  function seek(time) {
    requested = time;
    element.currentTime = time;
  }

  function tick(timestamp) {
    frame = 0;
    const elapsed = lastTimestamp ? timestamp - lastTimestamp : FRAME_MS;
    lastTimestamp = timestamp;

    // Frame-rate independent easing: the same glide on 60 Hz and 120 Hz screens.
    const goal = targetTime();
    displayed += (goal - displayed) * (1 - (1 - smoothing) ** (elapsed / FRAME_MS));
    const hasArrived = Math.abs(goal - displayed) < SETTLE_DISTANCE;
    if (hasArrived) displayed = goal;

    if (!element.seeking) {
      const step = Math.abs(displayed - requested);
      if (step > MIN_SEEK_STEP || (hasArrived && step > 0)) {
        seek(displayed);
      } else if (hasArrived) {
        lastTimestamp = 0;
        return;
      }
    }
    frame = requestAnimationFrame(tick);
  }

  function start() {
    if (element && !frame && !document.hidden) frame = requestAnimationFrame(tick);
  }

  function stop() {
    cancelAnimationFrame(frame);
    frame = 0;
    lastTimestamp = 0;
  }

  return {
    start,
    stop,
    setTarget(progress) {
      target = progress;
      start();
    },
    setSmoothing(value) {
      smoothing = Math.min(Math.max(value, 0.01), 1);
    },
    /** Takes over a primed element and jumps straight to the current target — it is still hidden. */
    attach(videoElement) {
      element = videoElement;
      duration = element.duration;
      displayed = targetTime();
      seek(displayed);
    },
    detach() {
      stop();
      element = null;
    },
  };
}

/**
 * Drives a Cloudinary film's playhead from a progress value (0–1) instead of
 * the clock — the engine behind every scroll-played film on the site.
 *
 * - Nothing downloads until `load` is true. The scrub rendition is then
 *   fetched whole into a Blob, so seeks never wait on the network (the
 *   direct URL is used if the fetch fails).
 * - `setProgress` is stable and cheap: call it from any scroll or pointer
 *   handler. It only records a target; an animation-frame loop glides the
 *   playhead there and stops once it arrives.
 * - React state changes once, when the film is ready to be shown.
 *
 * @param {object} video  Entry from data/videos.js
 * @param {object} [options]
 * @param {boolean} [options.load=true]  Start downloading the film
 * @param {number} [options.width]       Rendition width; by default picked from the viewport
 * @param {number} [options.smoothing=0.15] Share of the remaining distance covered per 60 Hz frame (1 = no easing)
 * @returns {{ videoRef: object, isReady: boolean, setProgress: (progress: number) => void }}
 */
export default function useScrollVideo(video, { load = true, width, smoothing = 0.15 } = {}) {
  const videoRef = useRef(null);
  const [playhead] = useState(createPlayhead);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    playhead.setSmoothing(smoothing);
  }, [playhead, smoothing]);

  useEffect(() => {
    function handleVisibilityChange() {
      if (document.hidden) playhead.stop();
      else playhead.start();
    }

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [playhead]);

  useEffect(() => {
    const element = videoRef.current;
    if (!load || !element) return undefined;

    const url = scrubVideoUrl(video, { width: width ?? pickScrubWidth(window.innerWidth) });
    const controller = new AbortController();
    const { signal } = controller;
    let objectUrl = null;

    function attachSource(source) {
      if (signal.aborted) return;
      element.preload = 'auto';
      element.src = source;
    }

    function handleFilmPrimed() {
      if (signal.aborted) return;
      element.pause();
      playhead.attach(element);
      setIsReady(true);
    }

    // iOS Safari only paints seeked frames once the element has played, and
    // may hold back 'loadeddata' until playback is requested — so prime the
    // decoder with a silent play/pause as soon as the metadata is in. If
    // playback is refused (iOS Low Power Mode) the still simply stays.
    function handleMetadata() {
      element.muted = true;
      element.play().then(handleFilmPrimed, () => {});
    }

    element.addEventListener('loadedmetadata', handleMetadata, { once: true });

    const cancelDownload = whenIdle(() => {
      fetch(url, { signal })
        .then((response) => {
          if (!response.ok) throw new Error(`Film request failed with status ${response.status}`);
          return response.blob();
        })
        .then((blob) => {
          if (signal.aborted) return;
          objectUrl = URL.createObjectURL(blob);
          attachSource(objectUrl);
        })
        // Stream the file directly instead: seeks may wait on the network, but the film still plays its part.
        .catch(() => attachSource(url));
    });

    return () => {
      cancelDownload();
      controller.abort();
      element.removeEventListener('loadedmetadata', handleMetadata);
      playhead.detach();
      if (element.hasAttribute('src')) {
        element.removeAttribute('src');
        element.load();
      }
      if (objectUrl) URL.revokeObjectURL(objectUrl);
      setIsReady(false);
    };
  }, [load, video, width, playhead]);

  const setProgress = useCallback((progress) => playhead.setTarget(progress), [playhead]);

  return { videoRef, isReady, setProgress };
}
