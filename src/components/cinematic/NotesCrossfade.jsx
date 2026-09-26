'use client';

import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';
import Icon from '@/components/mobile/icons';

const HOLD_MS = 7000;
const pad = (number) => String(number).padStart(2, '0');

/**
 * One guest note at a time, cross-fading slowly to the next. It only turns
 * while it is on screen, holds still under the pointer or keyboard focus,
 * and stops for good once someone steps through the notes themselves —
 * the Play/Pause control covers WCAG 2.2.2. Reduced motion: no rotation.
 *
 * @param {Array<{id: string, quote: string, name: string, context: string}>} notes
 */
export default function NotesCrossfade({ notes }) {
  const rootRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isInView, setIsInView] = useState(false);
  const [isHeld, setIsHeld] = useState(false);
  const reduceMotion = usePrefersReducedMotion();
  const isRotating = isPlaying && isInView && !isHeld && !reduceMotion;

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setIsInView(entry.isIntersecting), { threshold: 0.4 });
    observer.observe(rootRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isRotating) return undefined;
    const timer = setTimeout(() => setActiveIndex((index) => (index + 1) % notes.length), HOLD_MS);
    return () => clearTimeout(timer);
  }, [isRotating, activeIndex, notes.length]);

  function showNote(index) {
    setIsPlaying(false);
    setActiveIndex((index + notes.length) % notes.length);
  }

  function handleBlur(event) {
    if (!event.currentTarget.contains(event.relatedTarget)) setIsHeld(false);
  }

  return (
    <div
      ref={rootRef}
      className="lux-notes__stage"
      role="region"
      aria-roledescription="carousel"
      aria-label="Guest notes"
      style={{ '--lux-hold': `${HOLD_MS}ms` }}
      onPointerEnter={() => setIsHeld(true)}
      onPointerLeave={() => setIsHeld(false)}
      onFocus={() => setIsHeld(true)}
      onBlur={handleBlur}
    >
      <div className="lux-notes__quotes" aria-live={isRotating ? 'off' : 'polite'}>
        {notes.map((note, index) => (
          <figure
            key={note.id}
            className={`lux-note mb-0 ${index === activeIndex ? 'is-active' : ''}`}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${notes.length}`}
            aria-hidden={index !== activeIndex}
          >
            <blockquote className="lux-note__quote mb-0">
              <p className="mb-0">{note.quote}</p>
            </blockquote>
            <figcaption className="lux-note__byline">
              {note.name} — {note.context}
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="lux-notes__controls">
        <button type="button" className="lux-notes__button" onClick={() => showNote(activeIndex - 1)} aria-label="Previous note">
          <Icon name="chevronLeft" size={20} />
        </button>
        <p className="lux-notes__count mb-0" aria-hidden="true">
          {pad(activeIndex + 1)} <span>/ {pad(notes.length)}</span>
        </p>
        <span className="lux-notes__timer" aria-hidden="true">
          <span key={`${activeIndex}-${isRotating}`} className={`lux-notes__timer-fill ${isRotating ? 'is-running' : ''}`} />
        </span>
        <button type="button" className="lux-notes__button" onClick={() => showNote(activeIndex + 1)} aria-label="Next note">
          <Icon name="chevronRight" size={20} />
        </button>
        {!reduceMotion && (
          <button type="button" className="lux-notes__toggle" onClick={() => setIsPlaying((playing) => !playing)}>
            {isPlaying ? 'Pause' : 'Play'}
          </button>
        )}
      </div>
    </div>
  );
}
