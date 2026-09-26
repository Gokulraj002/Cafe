'use client';

import { Children, useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';
import Icon from './icons';

const INTERACTIVE_SELECTOR = 'a, button, input, select, textarea, summary, label';

const EDGE_TOLERANCE = 2; // px — sub-pixel scroll positions still count as the edge

const pad = (number) => String(number).padStart(2, '0');

/**
 * Horizontal, scroll-snapping rail for cards and galleries — native momentum
 * scrolling on touch, arrow buttons on mouse/trackpad devices, arrow keys
 * once the rail has focus. Each child becomes one slide.
 *
 * Full-bleed by default: place it outside `.container` and the first slide
 * lines up with the container's content edge while the rest bleed off-screen.
 * Size slides with `--rail-item-width` / `--rail-gap` (see mobile.css).
 *
 * @param {string} label  Accessible name, e.g. "Signature drinks"
 * @param {'bar'|'dots'|'none'} [progress] Indicator under the rail
 * @param {boolean} [contained] Rail sits inside a container/column: no bleed
 * @param {string} [itemClassName] Extra class on every slide wrapper
 */
export default function SwipeRail({ label, progress = 'bar', contained = false, className = '', itemClassName = '', style, children }) {
  const rootRef = useRef(null);
  const trackRef = useRef(null);
  const slides = Children.toArray(children);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    let frame = 0;

    // Continuous progress goes straight to CSS variables; React state only
    // changes when the slide index or an edge flag actually flips.
    function measure() {
      frame = 0;
      const maxScroll = track.scrollWidth - track.clientWidth;
      const scrolled = Math.min(Math.max(track.scrollLeft, 0), maxScroll);
      const [first, second] = track.children;
      const stride = second ? second.offsetLeft - first.offsetLeft : track.clientWidth;
      const isEnd = scrolled >= maxScroll - EDGE_TOLERANCE;

      root.style.setProperty('--rail-progress', maxScroll > 0 ? (scrolled / maxScroll).toFixed(4) : '0');
      root.style.setProperty('--rail-visible', maxScroll > 0 ? (track.clientWidth / track.scrollWidth).toFixed(4) : '1');
      setActiveIndex(isEnd ? track.children.length - 1 : Math.round(scrolled / Math.max(stride, 1)));
      setIsAtStart(scrolled <= EDGE_TOLERANCE);
      setIsAtEnd(isEnd);
    }

    function scheduleMeasure() {
      if (!frame) frame = requestAnimationFrame(measure);
    }

    const resizeObserver = new ResizeObserver(scheduleMeasure);
    resizeObserver.observe(track);
    track.addEventListener('scroll', scheduleMeasure, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      track.removeEventListener('scroll', scheduleMeasure);
    };
  }, [slides.length]);

  function scrollBySlide(direction) {
    const track = trackRef.current;
    const [first, second] = track.children;
    const stride = second ? second.offsetLeft - first.offsetLeft : track.clientWidth;
    track.scrollBy({ left: direction * stride, behavior: reduceMotion ? 'auto' : 'smooth' });
  }

  // The track is focusable so keyboard users can scroll it, but a tap or click
  // on a card must not focus it: mobile browsers scroll a focused element fully
  // into view, which made the page jump whenever a card was touched.
  function handleTrackMouseDown(event) {
    if (!event.target.closest(INTERACTIVE_SELECTOR)) event.preventDefault();
  }

  const rootClasses = ['swipe-rail', contained && 'swipe-rail--contained', `swipe-rail--${progress}`, className];

  return (
    <div ref={rootRef} className={rootClasses.filter(Boolean).join(' ')} style={style}>
      <div
        ref={trackRef}
        className="swipe-rail__track"
        role="region"
        aria-roledescription="carousel"
        aria-label={label}
        tabIndex={0}
        onMouseDown={handleTrackMouseDown}
      >
        {slides.map((slide, index) => (
          <div
            key={slide.key ?? index}
            className={`swipe-rail__item ${itemClassName}`}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${slides.length}`}
          >
            {slide}
          </div>
        ))}
      </div>

      <div className="swipe-rail__footer">
        {progress === 'bar' && (
          <div className="swipe-rail__progress" aria-hidden="true">
            <span className="swipe-rail__count">
              {pad(activeIndex + 1)} / {pad(slides.length)}
            </span>
            <span className="swipe-rail__bar">
              <span className="swipe-rail__thumb" />
            </span>
          </div>
        )}

        {progress === 'dots' && (
          <div className="swipe-rail__dots" aria-hidden="true">
            {slides.map((slide, index) => (
              <span key={slide.key ?? index} className={`swipe-rail__dot ${index === activeIndex ? 'is-active' : ''}`} />
            ))}
          </div>
        )}

        <div className="swipe-rail__arrows">
          <button
            type="button"
            className="swipe-rail__arrow"
            onClick={() => scrollBySlide(-1)}
            disabled={isAtStart}
            aria-label={`Scroll ${label} back`}
          >
            <Icon name="chevronLeft" size={20} />
          </button>
          <button
            type="button"
            className="swipe-rail__arrow"
            onClick={() => scrollBySlide(1)}
            disabled={isAtEnd}
            aria-label={`Scroll ${label} forward`}
          >
            <Icon name="chevronRight" size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
