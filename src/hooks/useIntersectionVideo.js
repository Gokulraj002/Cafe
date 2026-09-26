'use client';

import { useEffect, useState } from 'react';

/**
 * Tracks a video container against the viewport.
 *
 * - `shouldLoad` flips to true once the element comes within `loadMargin`
 *   of the viewport, and stays true. Use it to attach sources lazily.
 * - `isInView` follows visibility, so playback can pause off-screen.
 */
export default function useIntersectionVideo(targetRef, { eager = false, loadMargin = '400px 0px', threshold = 0.2 } = {}) {
  const [shouldLoad, setShouldLoad] = useState(eager);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = targetRef.current;
    if (!element) return undefined;

    const loadObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldLoad(true);
        loadObserver.disconnect();
      },
      { rootMargin: loadMargin },
    );

    const viewObserver = new IntersectionObserver(([entry]) => setIsInView(entry.isIntersecting), { threshold });

    if (!eager) loadObserver.observe(element);
    viewObserver.observe(element);

    return () => {
      loadObserver.disconnect();
      viewObserver.disconnect();
    };
  }, [targetRef, eager, loadMargin, threshold]);

  return { shouldLoad, isInView };
}
