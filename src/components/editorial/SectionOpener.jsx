import FadeReveal from '@/components/animations/FadeReveal';
import TextReveal from '@/components/animations/TextReveal';
import { contentsEntry, sectionLabel } from './issue';

/**
 * A feature's opening page: the label on a hairline with its folio, the bronze
 * section numeral, the headline and a one-paragraph dek — set asymmetrically
 * from lg up.
 *
 * Numbered features pass `section` (an id in `CONTENTS`); unnumbered
 * departments, such as the journal, pass their own `label` instead.
 *
 * @param {string} [section] Id of a numbered section
 * @param {string} [label]   Opener label for an unnumbered department
 * @param {string} titleId   Id of the h2, for the section's aria-labelledby
 */
export default function SectionOpener({ section, label, titleId, title, dek, className = '' }) {
  const entry = section ? contentsEntry(section) : null;

  return (
    <header className={`ed-opener ${className}`}>
      <FadeReveal className="ed-opener__label-row" y={12}>
        <p className="ed-opener__label type-eyebrow mb-0">{entry ? sectionLabel(section) : label}</p>
        <span className="ed-opener__line" aria-hidden="true" />
        {entry && (
          <span className="ed-opener__folio" aria-hidden="true">
            p. {entry.folio}
          </span>
        )}
      </FadeReveal>

      <div className="row gx-lg-5 align-items-end">
        {entry && (
          <div className="col-lg-3">
            <FadeReveal as="span" className="ed-opener__numeral" y={24} aria-hidden="true">
              {entry.number}
            </FadeReveal>
          </div>
        )}
        <div className={entry ? 'col-lg-8 offset-lg-1' : 'col-12'}>
          <TextReveal id={titleId} className="ed-opener__title type-headline">
            {title}
          </TextReveal>
          {dek && (
            <FadeReveal as="p" className="ed-opener__dek type-lead mb-0" delay={0.15}>
              {dek}
            </FadeReveal>
          )}
        </div>
      </div>
    </header>
  );
}
