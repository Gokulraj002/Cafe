'use client';

import { useRef } from 'react';
import concepts from '@/data/concepts';
import useGsap from '@/hooks/useGsap';
import TextReveal from '@/components/animations/TextReveal';
import ConceptDeck from './ConceptDeck';
import { playBoardEntrance, playDeckEntrance, playWallEntrance } from './selectorMotion';

/** The page's first screen: the title, a line on how to preview, and the four concepts. */
export default function ConceptSelector() {
  const scopeRef = useRef(null);

  useGsap(
    ({ isDesktop, isMobile, reduceMotion }) => {
      if (reduceMotion) return;
      if (isDesktop) playWallEntrance();
      else if (isMobile) playDeckEntrance(scopeRef.current);
      else playBoardEntrance();
    },
    scopeRef,
  );

  return (
    <section id="top" ref={scopeRef} className="sel-selector theme-charcoal" aria-labelledby="sel-title">
      <div className="sel-selector__inner container">
        <div className="sel-intro row g-4 align-items-end">
          <div className="col-lg-8">
            <p className="sel-intro__eyebrow type-eyebrow reveal-pending">Homepage concepts · Kela-Cafe</p>
            <TextReveal as="h1" id="sel-title" immediate delay={0.1} className="sel-intro__title">
              Four ways to <em>arrive.</em>
            </TextReveal>
          </div>

          <div className="col-md-9 col-lg-4 d-none d-md-block">
            <div className="sel-intro__aside reveal-pending">
              <p className="sel-intro__lead mb-0">
                One café, four first impressions. Each concept tells the same visit through its own film — and none
                of the films plays by itself. They move only as you scroll.
              </p>
              <p className="sel-intro__hint mb-0">
                <span className="sel-intro__hint-rule" aria-hidden="true" />
                Move across a film to scrub it
              </p>
            </div>
          </div>
        </div>

        <ConceptDeck concepts={concepts} />
      </div>
    </section>
  );
}
