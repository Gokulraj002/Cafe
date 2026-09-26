import { guestNotes } from '@/data/content';
import SectionHeading from '@/components/common/SectionHeading';
import SwipeRail from '@/components/mobile/SwipeRail';
import NotesCrossfade from './NotesCrossfade';

/**
 * What guests say on the way out. From tablet up one note at a time
 * cross-fades in large italic type; phones swipe through them as cards.
 */
export default function GuestNotes() {
  return (
    <section id="notes" className="section lux-notes theme-espresso" aria-labelledby="notes-title">
      <div className="container">
        <SectionHeading
          id="notes-title"
          eyebrow="Guest notes"
          title="Overheard on the way out."
          align="center"
          className="lux-notes__heading"
        />
        <div className="d-none d-md-block">
          <NotesCrossfade notes={guestNotes} />
        </div>
      </div>

      <SwipeRail label="Guest notes" progress="dots" className="lux-notes__rail d-md-none">
        {guestNotes.map((note) => (
          <figure key={note.id} className="lux-note-card mb-0">
            <span className="lux-note-card__mark" aria-hidden="true">
              “
            </span>
            <blockquote className="lux-note-card__quote mb-0">
              <p className="mb-0">{note.quote}</p>
            </blockquote>
            <figcaption className="lux-note-card__byline">
              {note.name} — {note.context}
            </figcaption>
          </figure>
        ))}
      </SwipeRail>
    </section>
  );
}
