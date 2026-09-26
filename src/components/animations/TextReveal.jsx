'use client';

import { useRef } from 'react';
import useGsap from '@/hooks/useGsap';
import { textReveal } from '@/lib/animations';

/**
 * Headline that rises line by line from behind a mask.
 *
 * `immediate` plays on page load instead of on scroll — use it for hero copy.
 * The text starts hidden (see .reveal-pending) so there is no flash of the
 * final state before the animation begins.
 */
export default function TextReveal({ as: Tag = 'h2', immediate = false, delay = 0, className = '', children, ...rest }) {
  const ref = useRef(null);

  useGsap(
    ({ reduceMotion }) => {
      if (reduceMotion) return;
      textReveal(ref.current, { onScroll: !immediate, delay });
    },
    ref,
  );

  return (
    <Tag ref={ref} className={`text-reveal ${immediate ? 'reveal-pending' : ''} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
