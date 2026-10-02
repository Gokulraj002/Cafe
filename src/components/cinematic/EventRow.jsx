import cafe from '@/data/cafe';
import Button from '@/components/common/Button';
import { formatPrice } from '@/lib/format';

/**
 * One workshop in the roastery room: when it runs, what you learn, who
 * hosts it, and a link that starts an email asking for a place.
 */
export default function EventRow({ title, day, time, duration, price, seats, host, description }) {
  const enquiry = `mailto:${cafe.contact.eventsEmail}?subject=${encodeURIComponent(`${title} — ${day}`)}`;

  return (
    <article className="lux-event">
      <p className="lux-event__when mb-0">
        {day} <span aria-hidden="true">·</span> <time>{time}</time> <span aria-hidden="true">·</span> {duration}
      </p>
      <h3 className="lux-event__title type-title mb-0">{title}</h3>
      <p className="lux-event__description type-body mb-0">{description}</p>
      <dl className="lux-event__facts mb-0">
        <div>
          <dt>Host</dt>
          <dd>{host}</dd>
        </div>
        <div>
          <dt>Places</dt>
          <dd>{seats}</dd>
        </div>
        <div>
          <dt>Per person</dt>
          <dd>{formatPrice(price)}</dd>
        </div>
      </dl>
      <Button href={enquiry} variant="text" arrow>
        Request a place<span className="visually-hidden"> at {title}</span>
      </Button>
    </article>
  );
}
