'use client';

import { useRef } from 'react';
import cafe from '@/data/cafe';
import photos from '@/data/images';
import cafeVideos from '@/data/videos';
import useGsap from '@/hooks/useGsap';
import { parallax } from '@/lib/animations';
import SectionHeading from '@/components/common/SectionHeading';
import Button from '@/components/common/Button';
import FadeReveal from '@/components/animations/FadeReveal';
import RevealFrame from './RevealFrame';
import HouseFigures from './HouseFigures';

const STEAM_STILL = { video: cafeVideos.concept1, moment: 'steam' };

/**
 * The founding line set large, then a morning photograph inside a bronze
 * offset frame with a still from the opening film laid over its corner —
 * the same cup, a moment later. On desktop the small frame floats up faster
 * than the page. The house figures close the section.
 */
export default function BrandStory() {
  const sectionRef = useRef(null);
  const detailRef = useRef(null);
  const [statement, approach] = cafe.story;

  useGsap(
    ({ isDesktop, reduceMotion }) => {
      if (!isDesktop || reduceMotion) return;
      parallax(detailRef.current, { trigger: sectionRef.current, amount: -30 });
    },
    sectionRef,
  );

  return (
    <section ref={sectionRef} id="story" className="section lux-story theme-charcoal" aria-labelledby="story-title">
      <div className="container">
        <SectionHeading
          id="story-title"
          eyebrow="The house"
          title={statement}
          titleClassName="type-headline lux-story__statement"
          className="lux-story__heading"
        />

        <div className="lux-story__body row gy-5 gx-lg-5 align-items-end">
          <div className="col-lg-6">
            <div className="lux-story__media">
              <span className="lux-story__outline" aria-hidden="true" />
              <RevealFrame
                media={photos.morningCup}
                sizes="(min-width: 992px) 38vw, 75vw"
                className="ratio-portrait"
                drift
              />
              <div ref={detailRef} className="lux-story__detail">
                <RevealFrame
                  media={STEAM_STILL}
                  aspect="4:5"
                  direction="right"
                  sizes="(min-width: 992px) 20vw, 38vw"
                  className="ratio-portrait"
                />
              </div>
            </div>
          </div>

          <div className="col-lg-5 offset-lg-1">
            <FadeReveal stagger className="lux-story__aside">
              <p className="type-lead mb-0">{approach}</p>
              <p className="type-body mb-0">{cafe.manifesto}</p>
              <p className="lux-story__signoff mb-0">
                Roasting since {cafe.roastingSince} <span aria-hidden="true">·</span> Café est. {cafe.established}{' '}
                <span aria-hidden="true">·</span> {cafe.address.city}
              </p>
              <div>
                <Button href="#signature" variant="text" arrow>
                  Our signature cups
                </Button>
              </div>
            </FadeReveal>
          </div>
        </div>

        <HouseFigures />
      </div>
    </section>
  );
}
