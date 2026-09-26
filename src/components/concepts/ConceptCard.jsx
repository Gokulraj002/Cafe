'use client';

import cafeVideos from '@/data/videos';
import VideoStill from '@/components/video/VideoStill';
import Icon from '@/components/mobile/icons';
import conceptNotes from './conceptNotes';
import useFilmScrub, { formatTimecode } from './useFilmScrub';

/**
 * The still is a 3:4 centre crop — the same framing the film shows under
 * `object-fit: cover` — so the film fades in over it without a jump. On
 * phones it cover-fills a taller deck card, hence the wider mobile size.
 */
const STILL_SIZES = '(min-width: 1400px) 312px, (min-width: 992px) 23vw, (min-width: 768px) 46vw, 110vw';

/**
 * One concept: its film frame, name, scroll technique and the way in. The
 * link covers the whole card; the "Open concept" label is its visible face.
 * On a precise pointer, moving across the card scrubs the concept's film.
 */
export default function ConceptCard({ concept, isPriority = false }) {
  const film = cafeVideos[concept.video];
  const { technique, keywords } = conceptNotes[concept.slug];
  const { canScrub, isReady, isLoading, videoRef, surfaceRef, timecodeRef, scrubHandlers } = useFilmScrub(film);

  const titleId = `sel-${concept.slug}-title`;
  const summaryId = `sel-${concept.slug}-summary`;
  const filmState = (isReady && 'has-film') || (isLoading && 'is-loading') || '';

  return (
    <article className={`sel-card ${filmState}`} aria-labelledby={titleId} {...scrubHandlers}>
      <div className="sel-card__media">
        <div ref={surfaceRef} className="sel-card__frame">
          <VideoStill
            video={film}
            aspect="3:4"
            gravity="center"
            sizes={STILL_SIZES}
            priority={isPriority}
            className="sel-card__still"
          />
          {canScrub && (
            <video
              ref={videoRef}
              className="sel-card__film"
              muted
              playsInline
              preload="none"
              aria-hidden="true"
              disablePictureInPicture
            />
          )}

          <span className="sel-card__chip" aria-hidden="true">
            Film · {film.title}
          </span>
          <span className="sel-card__number" aria-hidden="true">
            {concept.number}
          </span>
          <div className="sel-card__scrub" aria-hidden="true">
            <span className="sel-card__scrub-label">{isLoading ? 'Loading film' : 'Scrub'}</span>
            <span className="sel-card__scrub-track">
              <span className="sel-card__scrub-fill" />
            </span>
            <span ref={timecodeRef} className="sel-card__timecode">
              {formatTimecode(film.poster)}
            </span>
          </div>
          <span className="sel-card__focus-hint" aria-hidden="true">
            Press Enter to open
          </span>
        </div>
      </div>

      <div className="sel-card__body">
        <h2 id={titleId} className="sel-card__title">
          <span className="sel-card__index">Concept {concept.number}</span> {concept.title}
        </h2>
        <p className="sel-card__technique">{technique}</p>
        <p id={summaryId} className="sel-card__summary">
          {concept.summary}
        </p>
        <ul className="sel-card__keywords list-unstyled">
          {keywords.map((keyword) => (
            <li key={keyword} className="sel-card__keyword">
              {keyword}
            </li>
          ))}
        </ul>
        <span className="sel-card__open" aria-hidden="true">
          <span className="sel-card__open-label">Open concept</span>
          <Icon name="chevronRight" size={18} className="sel-card__open-icon" />
        </span>
      </div>

      {/* The link lies over the whole card, so focus, its ring and every click take in the full card */}
      <a href={`/${concept.slug}`} className="sel-card__link" aria-describedby={summaryId}>
        <span className="visually-hidden">{`Open concept ${concept.number}, ${concept.title}`}</span>
      </a>
    </article>
  );
}
