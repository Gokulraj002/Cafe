'use client';

import { useRef } from 'react';
import { beans, origins } from '@/data/content';
import photos from '@/data/images';
import useGsap from '@/hooks/useGsap';
import { gsap, EASE } from '@/lib/animations';
import { formatPrice } from '@/lib/format';
import SectionHeading from '@/components/common/SectionHeading';
import RevealFrame from './RevealFrame';
import OriginEntry from './OriginEntry';

const lowestBagPrice = Math.min(...beans.map((bag) => Number(bag.price)));

/**
 * The page's one ivory interlude: the season's four coffees set out like a
 * wine list. Each entry draws its hairline and then settles into place.
 */
export default function OriginsLedger() {
  const sectionRef = useRef(null);
  const ledgerRef = useRef(null);

  useGsap(
    ({ reduceMotion }) => {
      if (reduceMotion) return;
      ledgerRef.current.querySelectorAll('.lux-origin').forEach((entry) => {
        gsap
          .timeline({ scrollTrigger: { trigger: entry, start: 'top 85%', once: true } })
          .from(entry.querySelector('.lux-origin__rule'), { scaleX: 0, duration: 1.4, ease: EASE.cinematic })
          .from(entry.querySelectorAll('.lux-origin__content > *'), { autoAlpha: 0, y: 24, duration: 1, ease: EASE.reveal, stagger: 0.1 }, 0.15);
      });
    },
    sectionRef,
  );

  return (
    <section ref={sectionRef} id="origins" className="section lux-origins theme-ivory" aria-labelledby="origins-title">
      <div className="container">
        <div className="lux-origins__intro row gy-5 align-items-end">
          <div className="col-lg-6">
            <SectionHeading
              id="origins-title"
              eyebrow="Origins"
              title="Four growers, one harvest."
              intro="Every coffee on the bar this season, and the people who grew it. We buy from estates and cooperatives we know by name, pay well above the market rate and roast within the week it arrives."
            />
          </div>
          <div className="col-lg-5 offset-lg-1">
            <RevealFrame
              media={photos.coffeeCherries}
              sizes="(min-width: 992px) 38vw, 100vw"
              direction="left"
              className="lux-origins__banner"
              drift
            />
          </div>
        </div>

        <ol ref={ledgerRef} className="lux-origins__ledger list-unstyled mb-0">
          {origins.map((origin, index) => (
            <OriginEntry key={origin.id} number={index + 1} {...origin} />
          ))}
        </ol>

        <p className="lux-origins__footnote type-caption mb-0">
          Roasted every week, and sold at the bar in {beans[0].weight} bags from {formatPrice(lowestBagPrice)}.
        </p>
      </div>
    </section>
  );
}
