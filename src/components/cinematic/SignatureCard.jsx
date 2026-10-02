import { formatPrice } from '@/lib/format';
import LuxMedia from './LuxMedia';

/**
 * One signature drink: a photograph that settles closer on hover (mouse
 * only), its number, name and price, how it tastes, and what we would eat
 * beside it.
 */
export default function SignatureCard({ number, name, price, description, pairing, pairingNote, media, sizes }) {
  return (
    <article className="lux-signature__card">
      <div className="lux-signature__media media-frame">
        <div className="lux-signature__zoom">
          <LuxMedia media={media} sizes={sizes} />
        </div>
        <span className="lux-signature__number" aria-hidden="true">
          No. {String(number).padStart(2, '0')}
        </span>
      </div>

      <div className="lux-signature__body">
        <div className="lux-signature__title-row">
          <h3 className="type-title mb-0">{name}</h3>
          <p className="lux-signature__price mb-0">
            <span className="visually-hidden">Price </span>
            {formatPrice(price)}
          </p>
        </div>
        <p className="lux-signature__description mb-0">{description}</p>
        <p className="lux-signature__pairing mb-0">
          <span className="lux-signature__pairing-label">Pairs with</span>
          <span className="lux-signature__pairing-name">{pairing}</span>
          <span className="lux-signature__pairing-note">{pairingNote}</span>
        </p>
      </div>
    </article>
  );
}
