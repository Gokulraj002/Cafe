import { formatPrice } from '@/lib/format';

/** One line of the menu: name, dotted leader, price, description. */
export default function MenuItem({ name, description, price, signature = false }) {
  return (
    <li className="menu-item">
      <div className="menu-item__row">
        <span className="menu-item__name">
          {name}
          {signature && <span className="menu-item__badge">Signature</span>}
        </span>
        <span className="menu-item__leader" aria-hidden="true" />
        <span className="menu-item__price">{formatPrice(price)}</span>
      </div>
      <p className="menu-item__description mb-0">{description}</p>
    </li>
  );
}
