'use client';

import { useRef } from 'react';
import { signatures } from '@/data/content';
import photos from '@/data/images';
import useGsap from '@/hooks/useGsap';
import { gsap, EASE } from '@/lib/animations';
import SectionHeading from '@/components/common/SectionHeading';
import Button from '@/components/common/Button';
import SwipeRail from '@/components/mobile/SwipeRail';
import SignatureCard from './SignatureCard';

/** The photograph that sells each drink, keyed by signature id. */
const SIGNATURE_MEDIA = {
  'kela-latte': photos.latteGreenCup,
  'flat-white': photos.latteArtPour,
  siphon: photos.chemexSlowBar,
  'elaichi-cortado': photos.espressoExtraction,
};

const drinks = signatures.map((drink, index) => ({ ...drink, number: index + 1, media: SIGNATURE_MEDIA[drink.id] }));

/**
 * The four signature drinks. Desktop sets them in one staggered row whose
 * frames wipe open in turn; phones and tablets swipe through them as cards.
 * Both layouts are rendered and CSS shows one, so nothing shifts on load.
 */
export default function SignatureCoffee() {
  const sectionRef = useRef(null);
  const rowRef = useRef(null);

  useGsap(
    ({ isDesktop, reduceMotion }) => {
      if (!isDesktop || reduceMotion) return;
      const row = rowRef.current;

      gsap
        .timeline({ scrollTrigger: { trigger: row, start: 'top 75%', once: true } })
        .fromTo(
          row.querySelectorAll('.lux-signature__media'),
          { clipPath: 'inset(100% 0% 0% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: EASE.cinematic, stagger: 0.15 },
        )
        .from(row.querySelectorAll('.lux-signature__zoom'), { scale: 1.2, duration: 1.8, ease: EASE.cinematic, stagger: 0.15 }, 0)
        .from(row.querySelectorAll('.lux-signature__body'), { autoAlpha: 0, y: 24, duration: 1.1, ease: EASE.reveal, stagger: 0.15 }, 0.35);
    },
    sectionRef,
  );

  return (
    <section ref={sectionRef} id="signature" className="section lux-signature theme-espresso" aria-labelledby="signature-title">
      <div className="container">
        <SectionHeading
          id="signature-title"
          eyebrow="Signature coffee"
          title="Four reasons to slow down."
          intro="The cups our regulars order without opening the menu — each with the one thing we would eat beside it."
          className="lux-signature__heading"
        />
      </div>

      <div className="container d-none d-lg-block">
        <ul ref={rowRef} className="lux-signature__row row gx-4 list-unstyled mb-0">
          {drinks.map((drink) => (
            <li key={drink.id} className="col-3">
              <SignatureCard {...drink} sizes="(min-width: 1400px) 306px, 22vw" />
            </li>
          ))}
        </ul>
      </div>

      <SwipeRail label="Signature drinks" className="lux-signature__rail d-lg-none">
        {drinks.map((drink) => (
          <SignatureCard key={drink.id} {...drink} sizes="(min-width: 768px) 44vw, (min-width: 576px) 60vw, 82vw" />
        ))}
      </SwipeRail>

      <div className="container">
        <div className="lux-signature__footer">
          <p className="type-caption mb-0">Full-cream, oat or almond milk in any of them, at no extra cost.</p>
          <Button href="#menu" variant="text" arrow>
            See the full menu
          </Button>
        </div>
      </div>
    </section>
  );
}
