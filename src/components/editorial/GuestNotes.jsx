import { guestNotes } from '@/data/content';
import SwipeRail from '@/components/mobile/SwipeRail';

/**
 * "Overheard" — short notes from guests, as pull quotes. A swipe rail with
 * dots on phones and tablets, a staggered three-column page on desktop.
 */
export default function GuestNotes() {
  return (
    <div className="ed-notes">
      <div className="container">
        <header className="ed-subhead">
          <p className="type-eyebrow mb-0">Overheard</p>
          <h3 className="ed-subhead__title">Notes from the window bench.</h3>
        </header>
      </div>

      <SwipeRail label="Guest notes" progress="dots" className="ed-notes__rail ed-grid-rail">
        {guestNotes.map((note) => (
          <figure key={note.id} className="ed-note mb-0">
            <span className="ed-note__mark" aria-hidden="true">
              “
            </span>
            <blockquote className="ed-note__quote mb-0">
              <p className="mb-0">{note.quote}</p>
            </blockquote>
            <figcaption className="ed-note__source">
              {note.name} — {note.context}
            </figcaption>
          </figure>
        ))}
      </SwipeRail>
    </div>
  );
}
