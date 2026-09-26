/**
 * The five steps of the film as a segmented bar. Each segment fills while its
 * paragraph is read (scaleX, driven by the stage timeline) and jumps to that
 * paragraph when pressed. On desktop the segments carry their titles, like a
 * contents line under the plate; on phones they sit over the top of the film
 * as story-style bars and the titles are read out only.
 */
export default function SpaceProgress({ beats, activeIndex, onSelect }) {
  return (
    <ol className="ed-space-progress list-unstyled mb-0" aria-label="The room, step by step">
      {beats.map((beat, index) => {
        const isActive = index === activeIndex;

        return (
          <li key={beat.key} className="ed-space-progress__step">
            <button
              type="button"
              className={`ed-space-progress__button ${isActive ? 'is-active' : ''}`}
              aria-current={isActive ? 'step' : undefined}
              onClick={() => onSelect(index)}
            >
              <span className="ed-space-progress__track" aria-hidden="true">
                <span className="ed-space-progress__fill" />
              </span>
              <span className="ed-space-progress__label">
                <span className="ed-space-progress__numeral">{beat.numeral}</span> {beat.title}
              </span>
            </button>
          </li>
        );
      })}
    </ol>
  );
}
