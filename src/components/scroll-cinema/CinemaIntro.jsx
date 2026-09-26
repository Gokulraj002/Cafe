'use client';

import { useRef } from 'react';
import useGsap from '@/hooks/useGsap';
import { gsap, EASE } from '@/lib/animations';
import VideoStill from '@/components/video/VideoStill';
import TextReveal from '@/components/animations/TextReveal';
import { padNumber } from './formatters';

/**
 * A 16:9 frame covering a portrait screen is drawn much wider than the
 * viewport, so the still asks for the width it is really painted at.
 */
const STILL_SIZES = '(max-aspect-ratio: 16/9) 178vh, 100vw';

/**
 * Opening title card: the film's first shot, dimmed like a cinema before the
 * lights go down, with the five chapters listed like a programme.
 *
 * Phones keep the copy low, in thumb reach, and simply fade it in. From
 * tablet up the card is centred, and as the stage scrolls up underneath, the
 * title lifts away while the frame pushes in.
 *
 * @param {object} film Entry from data/videos.js with `chapters`
 */
export default function CinemaIntro({ film }) {
  const introRef = useRef(null);

  useGsap(
    ({ isMobile, reduceMotion }) => {
      if (reduceMotion) return;

      gsap.fromTo(
        '.cinema-intro__reveal',
        { autoAlpha: 0, y: 20 },
        { autoAlpha: 1, y: 0, duration: 1.2, ease: EASE.reveal, stagger: 0.12, delay: 0.5 },
      );

      if (isMobile) return;

      const scrollOut = { trigger: introRef.current, start: 'top top', end: 'bottom top', scrub: true };
      gsap.to('.cinema-intro__copy', { yPercent: -18, autoAlpha: 0, ease: 'none', scrollTrigger: scrollOut });
      gsap.to('.cinema-intro__still', { scale: 1.08, ease: 'none', scrollTrigger: scrollOut });
    },
    introRef,
  );

  return (
    <section ref={introRef} id="top" className="cinema-intro theme-charcoal" aria-labelledby="top-title">
      <div className="cinema-intro__still">
        <VideoStill video={film} moment="cherry" sizes={STILL_SIZES} priority />
      </div>

      <div className="cinema-intro__copy container">
        <p className="cinema-intro__reveal reveal-pending type-eyebrow mb-3 mb-md-4">Kela-Cafe presents</p>
        <TextReveal as="h1" id="top-title" immediate className="cinema-intro__title type-display">
          From cherry to cup.
        </TextReveal>
        <p className="cinema-intro__line cinema-intro__reveal reveal-pending type-lead mt-3 mt-md-4 mb-0">
          A ten-second film in five chapters, played at the speed you scroll.
        </p>

        <ol className="cinema-intro__chapters cinema-intro__reveal reveal-pending list-unstyled" aria-label="Chapters">
          {film.chapters.map((chapter, index) => (
            <li key={chapter.key}>
              <span className="cinema-intro__chapter-number">{padNumber(index + 1)}</span>
              {chapter.label}
            </li>
          ))}
        </ol>
      </div>

      <a href="#journey" className="cinema-intro__hint cinema-intro__reveal reveal-pending">
        Scroll to begin
        <span className="cinema-intro__drip" aria-hidden="true" />
      </a>
    </section>
  );
}
