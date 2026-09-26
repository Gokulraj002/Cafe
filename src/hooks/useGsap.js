'use client';

import { useEffect, useLayoutEffect } from 'react';
import { gsap, MOTION_QUERIES } from '@/lib/animations';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/**
 * Runs GSAP setup code scoped to `scopeRef`. The setup re-runs whenever the
 * breakpoint or the reduced-motion preference changes, and everything created
 * inside it — tweens, ScrollTriggers, SplitText — is reverted on unmount.
 *
 * @param {(conditions: {isDesktop: boolean, isTablet: boolean, isMobile: boolean, reduceMotion: boolean}) => void | (() => void)} setup
 * @param {{ current: Element | null }} scopeRef  Selector text inside setup is scoped to this element
 * @param {Array} [deps]
 */
export default function useGsap(setup, scopeRef, deps = []) {
  useIsomorphicLayoutEffect(() => {
    const media = gsap.matchMedia(scopeRef?.current ?? undefined);
    media.add(MOTION_QUERIES, (context) => setup(context.conditions));
    return () => media.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
