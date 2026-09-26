import Image from 'next/image';
import cafe from '@/data/cafe';
import Button from '@/components/common/Button';

/**
 * A workshop drawn as a ticket: poster, showtime and host, what happens in
 * the room, then a perforated stub with seats, price and a request button
 * that opens an email to the events team.
 *
 * @param {object} event  Entry from `events` in data/content.js
 * @param {object} poster Photo entry from data/images.js
 */
export default function WorkshopTicket({ event, poster }) {
  const subject = `Workshop request: ${event.title} (${event.day}, ${event.time})`;
  const requestHref = `mailto:${cafe.contact.eventsEmail}?subject=${encodeURIComponent(subject)}`;

  return (
    <article className="cinema-ticket">
      <div className="cinema-ticket__head">
        <div className="cinema-ticket__poster media-frame">
          <Image src={poster.src} alt={poster.alt} fill sizes="(min-width: 576px) 112px, 88px" />
        </div>
        <div>
          <p className="cinema-ticket__when mb-2">
            {event.day} <span aria-hidden="true">·</span> <time>{event.time}</time>
          </p>
          <h3 className="type-title mb-2">{event.title}</h3>
          <p className="cinema-ticket__host mb-0">
            With {event.host} <span aria-hidden="true">·</span> {event.duration}
          </p>
        </div>
      </div>

      <p className="cinema-ticket__description type-body mb-0">{event.description}</p>

      <div className="cinema-ticket__stub">
        <dl className="cinema-ticket__facts mb-0">
          <div>
            <dt>Seats</dt>
            <dd>{event.seats}</dd>
          </div>
          <div>
            <dt>Per person</dt>
            <dd>{event.price}</dd>
          </div>
        </dl>
        <Button href={requestHref} variant="outline" className="cinema-ticket__cta">
          Request a seat<span className="visually-hidden"> at {event.title}</span>
        </Button>
      </div>
    </article>
  );
}
