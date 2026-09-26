'use client';

import { useSyncExternalStore } from 'react';

function subscribe(onChange) {
  window.addEventListener('load', onChange);
  return () => window.removeEventListener('load', onChange);
}

const isComplete = () => document.readyState === 'complete';

/**
 * True once the window `load` event has fired. The opening film waits for it,
 * so its download never competes with the poster, fonts and scripts of the
 * first paint.
 */
export default function usePageLoaded() {
  return useSyncExternalStore(subscribe, isComplete, () => false);
}
