'use client';

import { useRef } from 'react';
import { stats } from '@/data/content';
import useGsap from '@/hooks/useGsap';
import { gsap } from '@/lib/animations';

/** The four figures that say the most about how the house works, in data order. */
const FEATURED_LABELS = [
  'laminated croissant dough',
  'per roast, never more',
  'of dial-in before the doors open',
  'seats, and no rush to leave them',
];
const figures = stats.filter((stat) => FEATURED_LABELS.includes(stat.label));

/**
 * A ledger of house figures between bronze hairlines. Each number counts up
 * once as the row arrives. The visible digits are decorative — screen
 * readers get the full figure in one piece, never a number mid-count.
 */
export default function HouseFigures() {
  const listRef = useRef(null);

  useGsap(
    ({ reduceMotion }) => {
      if (reduceMotion) return;
      gsap.from(listRef.current.querySelectorAll('.lux-figure__number'), {
        textContent: 0,
        snap: { textContent: 1 },
        duration: 1.8,
        ease: 'power2.out',
        stagger: 0.12,
        // Start as the row enters, so no one reads a zero before it counts.
        scrollTrigger: { trigger: listRef.current, start: 'top 95%', once: true },
      });
    },
    listRef,
  );

  return (
    <ul ref={listRef} className="lux-figures list-unstyled mb-0" aria-label="The house in figures">
      {figures.map((figure) => (
        <li key={figure.label} className="lux-figure">
          <p className="lux-figure__value mb-0" aria-hidden="true">
            <span className="lux-figure__number">{figure.value}</span>
            {figure.unit && <span className="lux-figure__unit">{figure.unit}</span>}
          </p>
          <p className="lux-figure__label mb-0">
            <span className="visually-hidden">
              {figure.value} {figure.unit}{' '}
            </span>
            {figure.label}
          </p>
        </li>
      ))}
    </ul>
  );
}
