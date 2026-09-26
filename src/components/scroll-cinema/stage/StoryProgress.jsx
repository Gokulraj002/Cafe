/**
 * Phones and tablets: a story-style progress bar across the top of the
 * stage, one segment per chapter. The stage timeline fills each segment as
 * its chapter plays; a tap jumps to that chapter.
 *
 * @param {object[]} chapters     From layoutJourney
 * @param {number}   activeIndex
 * @param {(index: number) => void} onSelect
 */
export default function StoryProgress({ chapters, activeIndex, onSelect }) {
  return (
    <nav className="cinema-stage-stories" aria-label="Film chapters">
      <ol className="cinema-stage-stories__segments list-unstyled mb-0">
        {chapters.map((chapter, index) => (
          <li key={chapter.key} className="cinema-stage-stories__item">
            <button
              type="button"
              className="cinema-stage-stories__segment"
              aria-current={index === activeIndex ? 'step' : undefined}
              onClick={() => onSelect(index)}
            >
              <span className="visually-hidden">
                Chapter {index + 1}: {chapter.label}
              </span>
              <span className="cinema-stage-stories__bar" aria-hidden="true">
                <span className="cinema-stage-stories__fill" />
              </span>
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
}
