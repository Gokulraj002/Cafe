import Icon from '@/components/mobile/icons';
import { CONTENTS } from './issue';

/**
 * "In this issue" — the table of contents on the cover. Each row jumps to its
 * feature; on phones the rows read like an app's list, with a chevron in
 * place of the folio.
 */
export default function IssueContents({ className = '' }) {
  return (
    <nav className={`ed-contents ${className}`} aria-labelledby="contents-title">
      <h2 id="contents-title" className="ed-contents__heading type-eyebrow">
        In this issue
      </h2>
      <ol className="ed-contents__list list-unstyled mb-0">
        {CONTENTS.map((entry) => (
          <li key={entry.id}>
            <a href={`#${entry.id}`} className="ed-contents__link">
              <span className="ed-contents__number">{entry.number}</span>
              <span className="ed-contents__text">
                <span className="ed-contents__title">{entry.title}</span>
                <span className="ed-contents__line">{entry.line}</span>
              </span>
              <span className="ed-contents__folio" aria-hidden="true">
                p. {entry.folio}
              </span>
              <Icon name="chevronRight" size={18} className="ed-contents__chevron" />
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
