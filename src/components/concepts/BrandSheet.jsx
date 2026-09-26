import cafe from '@/data/cafe';
import FadeReveal from '@/components/animations/FadeReveal';

/** The seven colours of the house, as named in the brief. Swatches paint from the live tokens. */
const PALETTE = [
  { name: 'Charcoal', token: '--charcoal', hex: '#151311' },
  { name: 'Espresso', token: '--espresso', hex: '#241A16' },
  { name: 'Dark Coffee', token: '--dark-coffee', hex: '#34241E' },
  { name: 'Muted Bronze', token: '--bronze', hex: '#8C6A4D' },
  { name: 'Caramel', token: '--caramel', hex: '#A97852' },
  { name: 'Cream', token: '--cream', hex: '#F5EFE6' },
  { name: 'Warm Ivory', token: '--ivory', hex: '#FAF7F1' },
];

/** Palette and type specimen shared by all four concepts. */
export default function BrandSheet() {
  return (
    <div className="sel-sheet row g-5">
      <FadeReveal className="col-lg-7">
        <h3 className="sel-sheet__label">Palette</h3>
        <ul className="sel-swatches list-unstyled mb-0">
          {PALETTE.map(({ name, token, hex }) => (
            <li key={token} className="sel-swatch">
              <span className="sel-swatch__chip" style={{ backgroundColor: `var(${token})` }} aria-hidden="true" />
              <span className="sel-swatch__name">{name}</span>
              <span className="sel-swatch__hex">{hex}</span>
            </li>
          ))}
        </ul>
      </FadeReveal>

      <FadeReveal className="col-lg-5" delay={0.15}>
        <h3 className="sel-sheet__label">Type</h3>
        <figure className="sel-specimen">
          <p className="sel-specimen__display mb-0">{cafe.tagline}</p>
          <figcaption className="sel-specimen__caption">Cormorant Garamond — display, light and italic</figcaption>
        </figure>
        <figure className="sel-specimen mb-0">
          <p className="sel-specimen__text mb-0">{cafe.manifesto}</p>
          <figcaption className="sel-specimen__caption">Manrope — text, 400 to 600</figcaption>
        </figure>
      </FadeReveal>
    </div>
  );
}
