'use client';

import { useRef } from 'react';
import { ritual } from '@/data/content';
import photos from '@/data/images';
import cafeVideos from '@/data/videos';
import useGsap from '@/hooks/useGsap';
import { gsap, ScrollTrigger, EASE, fadeReveal } from '@/lib/animations';
import SectionHeading from '@/components/common/SectionHeading';
import LuxMedia from './LuxMedia';
import RitualStep from './RitualStep';

/** The picture for each step — photographs, and two frames from the films. */
const STEP_MEDIA = {
  select: photos.cuppingPour,
  roast: photos.roasteryDrum,
  rest: photos.beansSack,
  'dial-in': { video: cafeVideos.concept2, moment: 'extraction' },
  steam: photos.milkPourBar,
  serve: { video: cafeVideos.concept1, moment: 'cup' },
};

const steps = ritual.map((step, index) => ({ ...step, number: index + 1, media: STEP_MEDIA[step.id] }));
const pad = (number) => String(number).padStart(2, '0');

/**
 * Six steps from green bean to cup. On desktop a sticky frame holds the
 * pictures and cross-fades to each step as it reaches the reading line,
 * while a bronze line fills beside the list. Below lg every step carries a
 * thumbnail and simply fades up. No pinning — the frame is CSS sticky.
 */
export default function Ritual() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const listRef = useRef(null);

  useGsap(
    ({ isDesktop, reduceMotion }) => {
      const items = gsap.utils.toArray(listRef.current.children);

      if (!isDesktop) {
        if (!reduceMotion) items.forEach((item) => fadeReveal(item, { y: 24 }));
        return undefined;
      }

      const layers = gsap.utils.toArray(stageRef.current.children);
      const duration = reduceMotion ? 0 : 0.9;

      function showStep(activeIndex) {
        items.forEach((item, index) => item.classList.toggle('is-active', index === activeIndex));
        layers.forEach((layer, index) => {
          gsap.to(layer, { autoAlpha: index === activeIndex ? 1 : 0, duration, overwrite: 'auto' });
        });
        if (!reduceMotion) {
          gsap.fromTo(layers[activeIndex].firstChild, { scale: 1.08 }, { scale: 1, duration: 1.8, ease: EASE.cinematic });
        }
      }

      items[0].classList.add('is-active');
      items.forEach((item, index) => {
        ScrollTrigger.create({
          trigger: item,
          start: 'top 60%',
          end: 'bottom 60%',
          onToggle: (self) => self.isActive && showStep(index),
        });
      });

      if (!reduceMotion) {
        gsap.fromTo(
          '.lux-ritual__progress',
          { scaleY: 0 },
          { scaleY: 1, ease: 'none', scrollTrigger: { trigger: listRef.current, start: 'top 60%', end: 'bottom 60%', scrub: true } },
        );
      }

      return () => items.forEach((item) => item.classList.remove('is-active'));
    },
    sectionRef,
  );

  return (
    <section ref={sectionRef} id="ritual" className="section lux-ritual theme-charcoal" aria-labelledby="ritual-title">
      <div className="container">
        <SectionHeading
          id="ritual-title"
          eyebrow="The ritual"
          title="Six steps between a green bean and your cup."
          intro="None of them can be hurried, and each one is measured. This is what happens before anything reaches your table."
          className="lux-ritual__heading"
        />

        <div className="row gx-lg-5">
          <div className="col-lg-5 d-none d-lg-block">
            <div ref={stageRef} className="lux-ritual__stage media-frame">
              {steps.map((step) => (
                <div key={step.id} className="lux-ritual__layer">
                  <div className="lux-ritual__picture">
                    <LuxMedia media={step.media} aspect="4:5" sizes="(min-width: 1400px) 530px, 38vw" />
                  </div>
                  <p className="lux-ritual__slate mb-0" aria-hidden="true">
                    {pad(step.number)} <span>/ {pad(steps.length)}</span> {step.title}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="col-lg-6 offset-lg-1">
            <div className="lux-ritual__track">
              <span className="lux-ritual__progress d-none d-lg-block" aria-hidden="true" />
              <ol ref={listRef} className="lux-ritual__steps list-unstyled mb-0">
                {steps.map((step) => (
                  <RitualStep key={step.id} {...step} />
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
