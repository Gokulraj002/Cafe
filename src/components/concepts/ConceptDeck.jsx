'use client';

import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';
import Icon from '@/components/mobile/icons';
import ConceptCard from './ConceptCard';

const pad = (number) => String(number).padStart(2, '0');

/**
 * The four concepts as one list. On phones it is a full-height swipe deck:
 * native scroll-snap, one card per screen with the next one peeking in,
 * dots to jump between cards and a polite announcement of each new card.
 * From tablets up the same list is a plain board (see concepts.css), and
 * the deck controls are hidden.
 */
export default function ConceptDeck({ concepts }) {
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasSwiped, setHasSwiped] = useState(false);
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    const track = trackRef.current;
    let frame = 0;

    // Read once per frame; React state changes only when the card in front changes.
    function measure() {
      frame = 0;
      const [first, second] = track.children;
      const stride = second.offsetLeft - first.offsetLeft;
      const index = Math.round(track.scrollLeft / Math.max(stride, 1));
      setActiveIndex(Math.min(Math.max(index, 0), track.children.length - 1));
      if (track.scrollLeft > 8) setHasSwiped(true);
    }

    function handleScroll() {
      if (!frame) frame = requestAnimationFrame(measure);
    }

    track.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener('scroll', handleScroll);
    };
  }, []);

  function showConcept(index) {
    const track = trackRef.current;
    const left = track.children[index].offsetLeft - track.children[0].offsetLeft;
    track.scrollTo({ left, behavior: reduceMotion ? 'auto' : 'smooth' });
  }

  const activeConcept = concepts[activeIndex];

  return (
    <div className="sel-deck">
      <ol ref={trackRef} className="sel-deck__track list-unstyled mb-0" aria-label="Homepage concepts">
        {concepts.map((concept, index) => (
          <li
            key={concept.slug}
            className={`sel-deck__item reveal-pending ${index === activeIndex ? 'is-active' : ''}`}
          >
            {/* All four stills belong to the first screen: the wall on desktop, the deck's row on phones */}
            <ConceptCard concept={concept} isPriority />
          </li>
        ))}
      </ol>

      <div className="sel-deck__nav reveal-pending">
        <div className="sel-deck__dots" role="group" aria-label="Choose a concept">
          {concepts.map((concept, index) => (
            <button
              key={concept.slug}
              type="button"
              className="sel-deck__dot"
              aria-label={`Show concept ${concept.number}, ${concept.title}`}
              aria-current={index === activeIndex ? 'true' : undefined}
              onClick={() => showConcept(index)}
            />
          ))}
        </div>

        <div className={`sel-deck__status ${hasSwiped ? 'has-swiped' : ''}`} aria-hidden="true">
          <span className="sel-deck__hint">
            Swipe
            <Icon name="chevronRight" size={16} className="sel-deck__hint-icon" />
          </span>
          <span className="sel-deck__count">
            {pad(activeIndex + 1)} <span className="sel-deck__total">/ {pad(concepts.length)}</span>
          </span>
        </div>
      </div>

      <p className="visually-hidden" aria-live="polite">
        {hasSwiped ? `Concept ${activeIndex + 1} of ${concepts.length}: ${activeConcept.title}` : ''}
      </p>
    </div>
  );
}
