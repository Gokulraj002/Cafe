import cafe from '@/data/cafe';
import { formatPrice } from '@/lib/format';

/**
 * One workshop, laid out like a ticket stub: when on the left, what in the
 * middle, the price and a request link on the tear-off. Requests go to the
 * events inbox until a booking system exists.
 */
export default function EventTicket({ title, day, time, duration, price, seats, host, description }) {
  const requestHref = `mailto:${cafe.contact.eventsEmail}?subject=${encodeURIComponent(`Seat request — ${title}`)}`;

  return (
    <article className="imm-ticket">
      <div className="imm-ticket__when">
        <p className="imm-ticket__day mb-1">{day}</p>
        <p className="imm-ticket__time mb-0">
          <time dateTime={time}>{time}</time>
        </p>
      </div>

      <div className="imm-ticket__main">
        <h3 className="type-title mb-2">{title}</h3>
        <p className="type-body mb-3">{description}</p>
        <ul className="imm-ticket__facts list-unstyled mb-0">
          <li>{duration}</li>
          <li>{seats} seats</li>
          <li>With {host}</li>
        </ul>
      </div>

      <div className="imm-ticket__stub">
        <p className="imm-ticket__price mb-0">
          {formatPrice(price)}
          <span className="imm-ticket__per"> per guest</span>
        </p>
        <a href={requestHref} className="btn-cafe imm-btn" aria-label={`Request a seat at ${title}`}>
          Request a seat
        </a>
      </div>
    </article>
  );
}
