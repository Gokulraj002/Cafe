import MomentMedia from './MomentMedia';

/**
 * One hour of the café's day: a tick on the timeline, the time, a picture
 * and a line about what happens then.
 */
export default function DayCard({ time, title, line, media }) {
  return (
    <article className="imm-day-card">
      <span className="imm-day-card__tick" aria-hidden="true" />
      <p className="imm-day-card__time mb-3">
        <time dateTime={time}>{time}</time>
      </p>
      <MomentMedia
        media={media}
        aspect="4:5"
        sizes="(min-width: 992px) 22vw, (min-width: 768px) 44vw, (min-width: 576px) 60vw, 82vw"
        className="imm-day-card__media"
      />
      <h3 className="type-title mt-4 mb-2">{title}</h3>
      <p className="type-body mb-0">{line}</p>
    </article>
  );
}
