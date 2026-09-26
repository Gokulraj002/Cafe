import MomentMedia from './MomentMedia';

/**
 * A guest note set like a phone story: a full-height picture of where it
 * happened, segment bars along the top and the quote at the foot.
 */
export default function StoryCard({ index, total, quote, name, context, media }) {
  return (
    <figure className="imm-story mb-0">
      <MomentMedia
        media={media}
        aspect="9:16"
        sizes="(min-width: 992px) 24vw, (min-width: 768px) 36vw, (min-width: 576px) 52vw, 74vw"
        className="imm-story__media"
      />

      <div className="imm-story__segments" aria-hidden="true">
        {Array.from({ length: total }, (_, segment) => (
          <span key={segment} className={`imm-story__segment ${segment <= index ? 'is-seen' : ''}`} />
        ))}
      </div>

      <div className="imm-story__content">
        <blockquote className="imm-story__quote mb-0">
          <p className="mb-0">“{quote}”</p>
        </blockquote>
        <figcaption className="imm-story__caption">
          <span className="imm-story__name">{name}</span> — {context}
        </figcaption>
      </div>
    </figure>
  );
}
