import { dayTimeline } from '@/data/content';
import FadeReveal from '@/components/animations/FadeReveal';

/** "A day in the room" — the café's weekday, hour by hour, set as a timetable. */
export default function DayTimeline({ className = '' }) {
  return (
    <div className={`ed-day ${className}`}>
      <p className="type-eyebrow mb-2">Timetable</p>
      <h3 className="ed-day__title">A day in the room</h3>
      <FadeReveal as="ol" stagger y={16} className="ed-day__list list-unstyled mb-0">
        {dayTimeline.map((entry) => (
          <li key={entry.time} className="ed-day__entry">
            <time className="ed-day__time" dateTime={entry.time}>
              {entry.time}
            </time>
            <div>
              <p className="ed-day__name mb-1">{entry.title}</p>
              <p className="ed-day__line mb-0">{entry.line}</p>
            </div>
          </li>
        ))}
      </FadeReveal>
    </div>
  );
}
