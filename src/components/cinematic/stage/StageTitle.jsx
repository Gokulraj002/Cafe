import { Fragment } from 'react';
import cafe from '@/data/cafe';

/**
 * The eyebrow and the page's only h1. Every word sits in its own mask so the
 * stage timeline can raise it into view on its own beat, while the heading
 * still reads as one sentence. The tagline is written in sentence case and
 * set in capitals by CSS, so screen readers say words rather than letters.
 *
 * @param {string} id  Id of the h1, referenced by the section's aria-labelledby
 */
export default function StageTitle({ id }) {
  const words = cafe.tagline.split(' ');

  return (
    <div className="lux-stage__title-block">
      <p className="lux-stage__eyebrow">
        {cafe.name} — Est. {cafe.established}
      </p>
      <h1 id={id} className="lux-stage__title">
        {words.map((word, index) => (
          <Fragment key={word}>
            {index > 0 && ' '}
            <span className="lux-stage__mask">
              <span className="lux-stage__word">{word}</span>
            </span>
          </Fragment>
        ))}
      </h1>
    </div>
  );
}
