import VideoStill from '@/components/video/VideoStill';

/**
 * One paragraph of the space story: a column block beside the plate on
 * desktop, a card sliding under the film on phones.
 *
 * Its film still is only displayed when motion is reduced — the plate is
 * hidden then and each paragraph carries its own picture. The still is lazy,
 * so a display: none frame is never downloaded; the centred 5:4 crop keeps
 * the film's corner mark out of the picture.
 */
export default function SpaceBlock({ beat, film, isActive }) {
  const titleId = `space-${beat.key}-title`;

  return (
    <li className={`ed-space-block ${isActive ? 'is-active' : ''}`}>
      <article className="ed-space-block__card" aria-labelledby={titleId}>
        <div className="ed-space-block__still media-frame">
          <VideoStill
            video={film}
            moment={beat.moment}
            aspect="5:4"
            gravity="center"
            sizes="(min-width: 992px) 50vw, 100vw"
          />
        </div>

        <div className="ed-space-block__body">
          <span className="ed-space-block__numeral" aria-hidden="true">
            {beat.numeral}
          </span>
          <h3 id={titleId} className="ed-space-block__title">
            {beat.title}
          </h3>
          <p className="ed-space-block__text mb-0">{beat.text}</p>
        </div>
      </article>
    </li>
  );
}
