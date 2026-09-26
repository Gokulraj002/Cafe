import LuxMedia from './LuxMedia';

/**
 * One step of the ritual. Below the lg breakpoint it carries its own
 * thumbnail, like a row in an app; on desktop the picture moves to the
 * sticky frame beside the list.
 */
export default function RitualStep({ number, title, text, detail, media }) {
  return (
    <li className="lux-ritual__step">
      <span className="lux-ritual__marker" aria-hidden="true" />
      <div className="lux-ritual__thumb media-frame d-lg-none">
        <LuxMedia media={media} aspect="4:5" sizes="(min-width: 768px) 160px, 104px" />
      </div>
      <div className="lux-ritual__content">
        <p className="lux-ritual__number mb-0" aria-hidden="true">
          {String(number).padStart(2, '0')}
        </p>
        <h3 className="lux-ritual__title type-title mb-0">{title}</h3>
        <p className="lux-ritual__text type-body mb-0">{text}</p>
        <p className="lux-ritual__detail mb-0">{detail}</p>
      </div>
    </li>
  );
}
