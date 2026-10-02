import { events } from '@/data/content';
import photos from '@/data/images';
import SectionHeading from '@/components/common/SectionHeading';
import FadeReveal from '@/components/animations/FadeReveal';
import WorkshopTicket from './WorkshopTicket';
import PrivateScreening from './PrivateScreening';

/** The photograph printed on each ticket, by event id. */
const POSTERS = {
  'espresso-at-home': photos.portafilterDose,
  'filter-side-by-side': photos.chemexSlowBar,
  'sunday-cupping': photos.cuppingPour,
  'three-day-croissant': photos.painAuChocolat,
};

const classSizes = events.map((event) => event.seats);

/**
 * Workshops listed like showtimes: one ticket per class, stacked like passes
 * in a wallet on phones and two to a row from tablet up — then the whole
 * room, for a private screening.
 */
export default function Workshops() {
  return (
    <section id="workshops" className="section cinema-workshops theme-coffee" aria-labelledby="workshops-title">
      <div className="container">
        <div className="row gy-4 align-items-end mb-5">
          <div className="col-lg-7">
            <SectionHeading
              id="workshops-title"
              eyebrow="Showtimes — Workshops"
              title="Learn it at the bar."
              intro="Small classes in the roastery room behind the bar, taught by the people who make your coffee every morning."
            />
          </div>
          <div className="col-lg-4 offset-lg-1">
            <FadeReveal as="p" className="cinema-workshops__note type-caption mb-0">
              {Math.min(...classSizes)} to {Math.max(...classSizes)} seats a class. Write to us and we reply within the
              day.
            </FadeReveal>
          </div>
        </div>

        <FadeReveal as="ul" stagger className="row g-4 list-unstyled mb-5">
          {events.map((event) => (
            <li key={event.id} className="col-md-6">
              <WorkshopTicket event={event} poster={POSTERS[event.id]} />
            </li>
          ))}
        </FadeReveal>

        <PrivateScreening />
      </div>
    </section>
  );
}
