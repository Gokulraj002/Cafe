import Button from '@/components/common/Button';
import VideoStill from '@/components/video/VideoStill';

/**
 * The five chapter captions. Over the film they share one spot — a card
 * above the tab bar on phones, open type in the lower left on desktop — and
 * the stage timeline cross-fades their parts. With reduced motion they
 * become a list of cards, each with its own still from the film.
 */
export default function StageChapters({ film, chapters }) {
  const lastIndex = chapters.length - 1;

  return (
    <ol className="cinema-stage-chapters list-unstyled">
      {chapters.map((chapter, index) => (
        <li key={chapter.key} className="cinema-stage-chapter">
          <div className="cinema-stage-chapter__still media-frame">
            <VideoStill
              video={film}
              moment={chapter.moment}
              aspect="4:3"
              gravity="center"
              sizes="(min-width: 992px) 55vw, 100vw"
            />
          </div>

          <div className="cinema-stage-chapter__body">
            <span className="cinema-stage-chapter__numeral cinema-stage-chapter__part" aria-hidden="true">
              {chapter.number}
            </span>
            <h3 className="cinema-stage-chapter__label cinema-stage-chapter__part type-eyebrow">
              <span className="visually-hidden">Chapter {index + 1}: </span>
              {chapter.label}
            </h3>
            <p className="cinema-stage-chapter__line cinema-stage-chapter__part">{chapter.line}</p>
            <p className="cinema-stage-chapter__fact cinema-stage-chapter__part">{chapter.fact}</p>
            {index === lastIndex && (
              <Button
                href="#reserve"
                variant="text"
                arrow
                className="cinema-stage-chapter__cta cinema-stage-chapter__part"
                data-reserve-sheet
              >
                Reserve a table
              </Button>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
