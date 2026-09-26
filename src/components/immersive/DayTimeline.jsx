'use client';

import { useRef } from 'react';
import { dayTimeline } from '@/data/content';
import photos from '@/data/images';
import cafeVideos from '@/data/videos';
import useGsap from '@/hooks/useGsap';
import { gsap, ScrollTrigger } from '@/lib/animations';
import SectionHeading from '@/components/common/SectionHeading';
import SwipeRail from '@/components/mobile/SwipeRail';
import DayCard from './DayCard';

/** The picture for each hour — photographs mixed with frames from the café films. */
const MEDIA_BY_TIME = {
  '06:15': { photo: photos.espressoExtraction },
  '07:00': { photo: photos.croissantsBakingTray },
  '09:30': { photo: photos.pourOverKettle },
  '12:30': { video: cafeVideos.concept1, moment: 'room' },
  '15:00': { photo: photos.bookAndLatte },
  '17:30': { video: cafeVideos.concept3, moment: 'lamp' },
  '18:30': { photo: photos.latteArtPour },
};

const hours = dayTimeline.map((hour) => ({ ...hour, media: MEDIA_BY_TIME[hour.time] }));
const firstTime = hours[0].time;
const lastTime = hours[hours.length - 1].time;

/**
 * "A day at Kela-Cafe". Everywhere it is a swipeable rail; on desktop
 * (with motion allowed) the section holds still and vertical scroll walks
 * the same rail sideways through the day, with a clock that follows along.
 */
export default function DayTimeline() {
  const sectionRef = useRef(null);

  useGsap(
    ({ isDesktop, reduceMotion }) => {
      if (!isDesktop || reduceMotion) return undefined;

      const section = sectionRef.current;
      const track = section.querySelector('.swipe-rail__track');
      const clockTime = section.querySelector('.imm-day__clock-now');
      const clockFill = section.querySelector('.imm-day__clock-fill');
      let shownIndex = 0;

      // How far the track travels: until the last card sits at the right gutter.
      const distance = () => {
        const lastCard = track.lastElementChild;
        const gutter = parseFloat(getComputedStyle(track).paddingLeft);
        return Math.max(0, lastCard.offsetLeft + lastCard.offsetWidth + gutter - track.clientWidth);
      };

      // The stage is CSS-sticky (see .imm-day.is-pinned): the section grows by
      // the travel so one pixel of scroll moves the track one pixel. Sticky
      // needs no pin-spacer, so nothing jumps when the stage takes hold.
      const setTravel = () => section.style.setProperty('--imm-day-travel', `${distance()}px`);
      section.classList.add('is-pinned');
      setTravel();
      ScrollTrigger.addEventListener('refreshInit', setTravel);

      const travel = gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          invalidateOnRefresh: true,
          scrub: 0.6,
          onUpdate(self) {
            clockFill.style.transform = `scaleX(${self.progress})`;
            const index = Math.round(self.progress * (hours.length - 1));
            if (index === shownIndex) return;
            shownIndex = index;
            clockTime.textContent = hours[index].time;
          },
        },
      });

      // Each picture drifts inside its frame as its card crosses the screen.
      gsap.utils.toArray('.imm-day-card', section).forEach((card) => {
        gsap.fromTo(
          card.querySelector('.imm-frame__image'),
          { xPercent: 6 },
          {
            xPercent: -6,
            ease: 'none',
            scrollTrigger: { trigger: card, containerAnimation: travel, start: 'left right', end: 'right left', scrub: true },
          },
        );
      });

      return () => {
        ScrollTrigger.removeEventListener('refreshInit', setTravel);
        section.classList.remove('is-pinned');
        section.style.removeProperty('--imm-day-travel');
      };
    },
    sectionRef,
  );

  return (
    <section ref={sectionRef} id="day" className="section imm-day theme-espresso" aria-labelledby="day-title">
      <div className="imm-day__stage">
        <div className="container">
          <div className="imm-day__header">
            <SectionHeading
              id="day-title"
              eyebrow="A day at Kela-Cafe"
              title="From first grind to last pour."
              intro="A weekday at the café, hour by hour — the same slow pace from the morning dial-in to the final cup."
            />
            <div className="imm-day__clock" aria-hidden="true">
              <span className="imm-day__clock-now">{firstTime}</span>
              <span className="imm-day__clock-track">
                <span className="imm-day__clock-fill" />
              </span>
              <span className="imm-day__clock-end">{lastTime}</span>
            </div>
          </div>
        </div>

        <SwipeRail label="A day at Kela-Cafe, hour by hour" className="imm-day__rail">
          {hours.map((hour) => (
            <DayCard key={hour.time} {...hour} />
          ))}
        </SwipeRail>
      </div>
    </section>
  );
}
