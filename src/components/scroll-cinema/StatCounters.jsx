'use client';

import { useRef } from 'react';
import useGsap from '@/hooks/useGsap';
import { gsap, EASE } from '@/lib/animations';

/**
 * The house figures in a grid. As the grid arrives each figure rises into
 * place and counts up from zero. Screen readers get the final text straight
 * away — the moving digits are hidden from them.
 *
 * @param {{ value: string, unit: string, label: string }[]} stats
 */
export default function StatCounters({ stats }) {
  const listRef = useRef(null);

  useGsap(
    ({ reduceMotion }) => {
      if (reduceMotion) return;

      const list = listRef.current;
      gsap
        .timeline({ scrollTrigger: { trigger: list, start: 'top 80%', once: true } })
        .from(list.children, { autoAlpha: 0, y: 28, duration: 1, ease: EASE.reveal, stagger: 0.08 })
        .from(
          list.querySelectorAll('.cinema-stat__number'),
          { textContent: 0, snap: { textContent: 1 }, duration: 1.8, ease: 'power2.out', stagger: 0.08 },
          0,
        );
    },
    listRef,
  );

  return (
    <ul ref={listRef} className="cinema-stats row gx-4 gx-lg-5 gy-5 list-unstyled mb-0">
      {stats.map((stat) => (
        <li key={stat.label} className="cinema-stat col-6 col-md-4">
          <p className="cinema-stat__value mb-0" aria-hidden="true">
            <span className="cinema-stat__number">{stat.value}</span>
            {stat.unit && <span className="cinema-stat__unit">{stat.unit}</span>}
          </p>
          <p className="cinema-stat__label mb-0">
            <span className="visually-hidden">
              {stat.value} {stat.unit}{' '}
            </span>
            {stat.label}
          </p>
        </li>
      ))}
    </ul>
  );
}
