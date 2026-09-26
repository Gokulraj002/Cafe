import FrameReveal from './FrameReveal';
import MomentMedia from './MomentMedia';

/**
 * A drink and the plate we would put beside it: the cup in a tall frame,
 * the pastry in a small one tucked against its corner.
 */
export default function PairingCard({ number, name, description, pairing, pairingNote, price, platePrice, drink, plate }) {
  return (
    <article className="imm-pairing">
      <div className="imm-pairing__media">
        <FrameReveal>
          <MomentMedia
            media={drink}
            aspect="4:5"
            sizes="(min-width: 992px) 24vw, (min-width: 768px) 44vw, (min-width: 576px) 60vw, 82vw"
            className="ratio-portrait"
          />
        </FrameReveal>
        <MomentMedia
          media={plate}
          aspect="1:1"
          sizes="(min-width: 992px) 10vw, (min-width: 768px) 18vw, 34vw"
          className="imm-pairing__plate ratio-square"
        />
      </div>

      <p className="type-eyebrow mt-4 mb-2">No. {String(number).padStart(2, '0')}</p>
      <h3 className="type-title mb-3">
        {name} <span className="imm-pairing__amp">&amp;</span> {pairing}
      </h3>
      <p className="type-body mb-3">{description}</p>
      <p className="imm-pairing__note type-italic mb-3">{pairingNote}</p>

      <dl className="imm-pairing__prices mb-0">
        <div>
          <dt>Cup</dt>
          <dd>{price}</dd>
        </div>
        <div>
          <dt>Plate</dt>
          <dd>{platePrice}</dd>
        </div>
      </dl>
    </article>
  );
}
