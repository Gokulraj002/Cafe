/**
 * Desktop chapter rail: a vertical line down the right of the stage with a
 * labelled marker where each chapter begins. The stage timeline scales the
 * fill; a marker jumps to its chapter.
 *
 * @param {object[]} chapters     From layoutJourney
 * @param {number}   length       Stage length, to place the markers
 * @param {number}   activeIndex
 * @param {(index: number) => void} onSelect
 */
export default function ChapterRail({ chapters, length, activeIndex, onSelect }) {
  return (
    <nav className="cinema-stage-rail" aria-label="Film chapters">
      <span className="cinema-stage-rail__track" aria-hidden="true">
        <span className="cinema-stage-rail__fill" />
      </span>

      <ol className="cinema-stage-rail__markers list-unstyled mb-0">
        {chapters.map((chapter, index) => {
          const isActive = index === activeIndex;

          return (
            <li key={chapter.key} className="cinema-stage-rail__marker" style={{ '--marker-at': chapter.enter / length }}>
              <button
                type="button"
                className={`cinema-stage-rail__button ${isActive ? 'is-active' : ''} ${index < activeIndex ? 'is-past' : ''}`}
                aria-current={isActive ? 'step' : undefined}
                onClick={() => onSelect(index)}
              >
                <span className="cinema-stage-rail__number">{chapter.number}</span>
                {chapter.label}
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
