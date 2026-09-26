import { events } from '@/data/content';
import photos from '@/data/images';
import SectionHeading from '@/components/common/SectionHeading';
import FadeReveal from '@/components/animations/FadeReveal';
import RevealFrame from './RevealFrame';
import EventRow from './EventRow';
import PrivateHire from './PrivateHire';

/**
 * Workshops in the roastery room: the heading and a slow-bar photograph on
 * one side, the season's classes as a list on the other, and the
 * private-hire offer underneath.
 */
export default function Events() {
  return (
    <section id="events" className="section lux-events theme-coffee" aria-labelledby="events-title">
      <div className="container">
        <div className="row gy-5 gx-lg-5">
          <div className="col-lg-4">
            <SectionHeading
              id="events-title"
              eyebrow="At the roastery"
              title="Evenings behind the bar."
              intro="Small classes in the roastery room, taught by the people who roast and bake for the café. Every place includes what you make."
            />
            <RevealFrame
              media={photos.pourOverKettle}
              sizes="(min-width: 1400px) 410px, (min-width: 992px) 30vw, 100vw"
              className="lux-events__photo"
              drift
            />
          </div>

          <div className="col-lg-7 offset-lg-1">
            <ul className="lux-events__list list-unstyled mb-0">
              {events.map((event) => (
                <FadeReveal key={event.id} as="li" y={24}>
                  <EventRow {...event} />
                </FadeReveal>
              ))}
            </ul>
          </div>
        </div>

        <PrivateHire />
      </div>
    </section>
  );
}
