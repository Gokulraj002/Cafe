import { Fragment } from 'react';

/**
 * Text written as sentences of short parts, each part wrapped in a mask so
 * it can rise into view. On phones every part is its own line; from tablet
 * up a sentence's parts share one line (see immersive-sequence.css).
 *
 * The spaces between parts are real text, so assistive technology reads the
 * sentences as written.
 *
 * @param {string[][]} sentences  e.g. [['Come for the', 'coffee.']]
 */
export default function MaskedLines({ sentences }) {
  return sentences.map((parts) => (
    <Fragment key={parts.join(' ')}>
      <span className="imm-seq__sentence">
        {parts.map((part) => (
          <Fragment key={part}>
            <span className="imm-seq__mask">
              <span className="imm-seq__line">{part}</span>
            </span>{' '}
          </Fragment>
        ))}
      </span>{' '}
    </Fragment>
  ));
}
