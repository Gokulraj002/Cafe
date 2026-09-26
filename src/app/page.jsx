import '@/styles/concepts.css';
import cafe from '@/data/cafe';
import Logo from '@/components/common/Logo';
import ConceptSelector from '@/components/concepts/ConceptSelector';
import CommonGround from '@/components/concepts/CommonGround';

export const metadata = {
  title: 'Homepage concepts',
  description:
    'Four homepage concepts for Kela-Cafe — four films that play as you scroll, four ways to arrive, discover, craft, indulge and stay.',
};

/** The studio's presentation of the four homepage concepts. */
export default function HomePage() {
  return (
    <div className="sel-page">
      <header className="sel-header theme-charcoal">
        <div className="sel-header__inner container d-flex align-items-center justify-content-between">
          <Logo href="#top" />
          <p className="sel-header__meta mb-0">
            Concepts <span className="sel-header__year">{cafe.established}</span>
          </p>
        </div>
      </header>

      <main id="main">
        <ConceptSelector />
        <CommonGround />
      </main>

      <footer className="sel-footer theme-ivory">
        <div className="container d-flex flex-column flex-md-row justify-content-between gap-2">
          <p className="type-caption mb-0">
            © {cafe.established} {cafe.name} · {cafe.tagline}
          </p>
          <p className="type-caption mb-0">Films delivered by Cloudinary · Photography from Unsplash</p>
        </div>
      </footer>
    </div>
  );
}
