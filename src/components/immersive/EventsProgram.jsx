import { events } from '@/data/content';
import photos from '@/data/images';
import SectionHeading from '@/components/common/SectionHeading';
import FadeReveal from '@/components/animations/FadeReveal';
import EventTicket from './EventTicket';
import FrameReveal from './FrameReveal';
import MomentMedia from './MomentMedia';

/**
 * Workshops and tastings in the roastery room. A photograph holds still on
 * the left while the tickets scroll past on desktop; on phones the tickets
 * stack under a wide picture.
 */
export default function EventsProgram() {
  return (
    <section id="events" className="section imm-events theme-ivory" aria-labelledby="events-title">
      <div className="container">
        <div className="row g-5">
          <div className="col-lg-5">
            <div className="imm-events__aside">
              <SectionHeading
                id="events-title"
                eyebrow="Workshops at the roastery"
                title="Learn the slow way."
                intro="Small classes in the room behind the bar, taught by the people who roast, pour and bake here every day."
              />
              <FrameReveal className="imm-events__photo mt-5">
                <MomentMedia
                  media={{ photo: photos.cuppingPour }}
                  sizes="(min-width: 992px) 38vw, 100vw"
                  className="imm-events__frame"
                />
              </FrameReveal>
            </div>
          </div>

          <div className="col-lg-7">
            <FadeReveal as="ul" stagger className="imm-events__list list-unstyled mb-0">
              {events.map((event) => (
                <li key={event.id}>
                  <EventTicket {...event} />
                </li>
              ))}
            </FadeReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
