'use client';

import { useRef } from 'react';
import useGsap from '@/hooks/useGsap';
import { fadeReveal } from '@/lib/animations';

/**
 * Fades its content up into place when scrolled into view.
 * With `stagger`, each direct child animates in turn.
 */
export default function FadeReveal({ as: Tag = 'div', stagger = false, y = 36, delay = 0, className = '', children, ...rest }) {
  const ref = useRef(null);

  useGsap(
    ({ reduceMotion }) => {
      if (reduceMotion) return;
      const element = ref.current;
      const targets = stagger ? element.children : element;
      fadeReveal(targets, { trigger: element, y, delay, stagger: stagger ? 0.12 : 0 });
    },
    ref,
  );

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}
