'use client';

import { useRef } from 'react';
import useGsap from '@/hooks/useGsap';
import { gsap, EASE } from '@/lib/animations';
import { ALTITUDE_SCALE, formatMetres } from './formatters';
import OriginEntry from './OriginEntry';

/**
 * The origins as a numbered list under a legend for the altitude scale.
 * Each entry rises into place as it arrives and its altitude bar then grows
 * from the left — a scaleX, so nothing reflows.
 *
 * @param {object[]} origins `origins` from data/content.js
 */
export default function OriginList({ origins }) {
  const listRef = useRef(null);

  useGsap(
    ({ reduceMotion }) => {
      if (reduceMotion) return;

      listRef.current.querySelectorAll('.cinema-origin').forEach((entry) => {
        gsap
          .timeline({ scrollTrigger: { trigger: entry, start: 'top 85%', once: true } })
          .from(entry, { autoAlpha: 0, y: 32, duration: 1.1, ease: EASE.reveal })
          .from(entry.querySelector('.cinema-altitude__fill'), { scaleX: 0, duration: 1.4, ease: EASE.cinematic }, 0.35);
      });
    },
    listRef,
  );

  return (
    <div ref={listRef}>
      <p className="cinema-origins__legend type-caption" aria-hidden="true">
        <span>Altitude, on one scale</span>
        <span className="cinema-origins__legend-scale">
          {formatMetres(ALTITUDE_SCALE.floor)}
          <span className="cinema-origins__legend-line" />
          {formatMetres(ALTITUDE_SCALE.ceiling)}
        </span>
      </p>

      <ol className="cinema-origins__list list-unstyled mb-0">
        {origins.map((origin, index) => (
          <OriginEntry key={origin.id} origin={origin} number={index + 1} />
        ))}
      </ol>
    </div>
  );
}
