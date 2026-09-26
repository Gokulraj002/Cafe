import { ISSUE, contentsEntry } from './issue';

/**
 * The rotated running head down the left margin of a spread — magazine name,
 * issue and folio. Decorative and shown on wide screens only (see
 * editorial.css), so it is hidden from assistive technology.
 *
 * @param {string} section Id of a numbered section in `CONTENTS`
 */
export default function RunningHead({ section }) {
  const { number, title, folio } = contentsEntry(section);

  return (
    <p className="ed-running-head" aria-hidden="true">
      <span>Kela</span>
      <span>{ISSUE.title}</span>
      <span>
        {number} {title}
      </span>
      <span>p. {folio}</span>
    </p>
  );
}
