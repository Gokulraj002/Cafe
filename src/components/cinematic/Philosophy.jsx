'use client';

import { useRef } from 'react';
import cafe from '@/data/cafe';
import useGsap from '@/hooks/useGsap';
import { gsap, EASE } from '@/lib/animations';
import SectionHeading from '@/components/common/SectionHeading';

const NUMERALS = ['I', 'II', 'III'];

/**
 * The three principles as columns divided by bronze hairlines (stacked
 * rows on phones). Each hairline draws first, then its numeral rises from
 * behind a mask and the words follow. On desktop the columns go in turn.
 */
export default function Philosophy() {
  const sectionRef = useRef(null);
  const listRef = useRef(null);

  useGsap(
    ({ isDesktop, reduceMotion }) => {
      if (reduceMotion) return;
      listRef.current.querySelectorAll('.lux-principle').forEach((principle, index) => {
        // Side by side on desktop, the columns start one after another.
        const offset = isDesktop ? index * 0.18 : 0;
        gsap
          .timeline({ scrollTrigger: { trigger: principle, start: 'top 85%', once: true } })
          .from(
            principle.querySelector('.lux-principle__rule'),
            { [isDesktop ? 'scaleY' : 'scaleX']: 0, duration: 1.4, ease: EASE.cinematic },
            offset,
          )
          .from(principle.querySelector('.lux-principle__numeral span'), { yPercent: 110, duration: 1.4, ease: EASE.cinematic }, offset + 0.1)
          .from(
            principle.querySelectorAll('.lux-principle__body > *'),
            { autoAlpha: 0, y: 20, duration: 1, ease: EASE.reveal, stagger: 0.1 },
            offset + 0.4,
          );
      });
    },
    sectionRef,
  );

  return (
    <section ref={sectionRef} id="philosophy" className="section lux-philosophy theme-coffee" aria-labelledby="philosophy-title">
      <div className="container">
        <SectionHeading
          id="philosophy-title"
          eyebrow="Café philosophy"
          title="Three things we never hurry."
          align="center"
          className="lux-philosophy__heading"
        />

        <ol ref={listRef} className="lux-philosophy__list row gx-0 list-unstyled mb-0">
          {cafe.philosophy.map((principle, index) => (
            <li key={principle.title} className="lux-principle col-lg-4">
              <span className="lux-principle__rule" aria-hidden="true" />
              <p className="lux-principle__numeral mb-0" aria-hidden="true">
                <span>{NUMERALS[index]}</span>
              </p>
              <div className="lux-principle__body">
                <h3 className="type-title mb-0">{principle.title}</h3>
                <p className="type-body mb-0">{principle.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
