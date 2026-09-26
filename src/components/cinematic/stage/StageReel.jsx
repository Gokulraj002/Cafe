import { formatReelTime } from './sequence';

/**
 * The bronze hairline along the foot of the stage that fills as the film
 * unveils, with the reel time beside it. The stage timeline writes the time
 * straight into `.lux-stage__time`; screen readers skip it.
 *
 * @param {string} title     Short caption, e.g. "Chapter I — Arrive"
 * @param {number} duration  Length of the film in seconds
 */
export default function StageReel({ title, duration }) {
  return (
    <div className="lux-stage__reel" aria-hidden="true">
      <span className="lux-stage__reel-title d-none d-md-inline">{title}</span>
      <span className="lux-stage__reel-line">
        <span className="lux-stage__reel-fill" />
      </span>
      <span className="lux-stage__reel-time">
        <span className="lux-stage__time">{formatReelTime(0)}</span> / {formatReelTime(duration)}
      </span>
    </div>
  );
}
