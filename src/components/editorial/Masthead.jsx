'use client';

import { useRef } from 'react';
import Image from 'next/image';
import cafe from '@/data/cafe';
import photos from '@/data/images';
import useGsap from '@/hooks/useGsap';
import { gsap, EASE, SplitText } from '@/lib/animations';
import Button from '@/components/common/Button';
import TextReveal from '@/components/animations/TextReveal';
import IssueContents from './IssueContents';
import { ISSUE } from './issue';

const COVER = photos.goldenHourRoom;

/**
 * The cover of The Slow Issue: the issue line, the oversized KELA wordmark,
 * the cover plate, the cover story (the page's h1) and the contents.
 *
 * On load the wordmark rises letter by letter while the plate settles; on
 * desktop the wordmark then trails the page as the cover scrolls away. The
 * plate is the LCP image, so it is only eased in — never hidden.
 */
export default function Masthead() {
  const rootRef = useRef(null);

  useGsap(
    ({ isDesktop, reduceMotion }) => {
      if (reduceMotion) return;
      const wordmark = rootRef.current.querySelector('.ed-mast__wordmark');
      const { chars } = SplitText.create(wordmark, { type: 'chars', mask: 'chars' });
      gsap.set(wordmark, { autoAlpha: 1 });

      gsap
        .timeline({ defaults: { ease: EASE.cinematic } })
        .from(chars, { yPercent: 110, duration: 1.6, stagger: 0.07 }, 0.1)
        .fromTo('.ed-mast__plate', { clipPath: 'inset(4% 4% 4% 4%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.8 }, 0)
        .from('.ed-mast__plate img', { scale: 1.12, duration: 2.4 }, 0)
        .from('.ed-mast__rise', { autoAlpha: 0, y: 18, duration: 1.1, ease: EASE.reveal, stagger: 0.08 }, 0.45);

      if (isDesktop) {
        gsap.to(wordmark, {
          yPercent: 24,
          ease: 'none',
          scrollTrigger: { trigger: rootRef.current, start: 'top top', end: 'bottom top', scrub: true },
        });
      }
    },
    rootRef,
  );

  return (
    <section ref={rootRef} id="top" className="ed-mast theme-ivory" aria-labelledby="top-title">
      <div className="container">
        <div className="ed-mast__folio ed-mast__rise reveal-pending">
          <span>
            Issue {ISSUE.number} · {ISSUE.season}
          </span>
          <span className="d-none d-md-inline">Coffee, conversation &amp; quiet moments</span>
          <span>Roasting since {cafe.roastingSince}</span>
        </div>

        <p className="ed-mast__wordmark reveal-pending" aria-hidden="true">
          Kela
        </p>

        <div className="row gx-lg-5 gy-4 ed-mast__row">
          <div className="col-lg-4 ed-mast__story">
            <p className="ed-mast__issue ed-mast__rise reveal-pending">{ISSUE.title}</p>
            <TextReveal as="h1" id="top-title" immediate delay={0.3} className="ed-mast__headline">
              A café built slowly, around a single lamp.
            </TextReveal>
            <p className="ed-mast__dek ed-mast__rise reveal-pending">
              Inside: the room, four coffees from the southern hills, a menu without hurry, the people behind the bar —
              and a table waiting for you.
            </p>
            <div className="ed-mast__actions ed-mast__rise reveal-pending">
              <Button href="#space" variant="solid" arrow>
                Start reading
              </Button>
              <Button href="#reserve" variant="text" data-reserve-sheet>
                Reserve a table
              </Button>
            </div>
          </div>

          <figure className="col-lg-5 order-first order-lg-0 mb-0">
            <div className="ed-mast__plate">
              <Image src={COVER.src} alt={COVER.alt} fill priority sizes="(min-width: 992px) 40vw, 100vw" />
            </div>
            <figcaption className="ed-mast__caption">
              On the cover: the room at golden hour. Photograph: {COVER.credit.name}
            </figcaption>
          </figure>

          <div className="col-lg-3">
            <IssueContents className="ed-mast__rise reveal-pending" />
          </div>
        </div>
      </div>
    </section>
  );
}
