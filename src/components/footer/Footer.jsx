import cafe from '@/data/cafe';
import concepts from '@/data/concepts';
import Logo from '@/components/common/Logo';

/** Shared footer: brand, visit details, the four concepts and social links. */
export default function Footer({ theme = 'theme-charcoal', homeHref = '#top' }) {
  const { address, hours, contact, social } = cafe;

  return (
    <footer className={`site-footer ${theme}`}>
      <div className="container">
        <div className="row g-5 pb-5">
          <div className="col-lg-4">
            <Logo href={homeHref} />
            <p className="site-footer__tagline type-lead mt-4 mb-0">{cafe.tagline}</p>
          </div>

          <div className="col-6 col-lg-2 offset-lg-1">
            <h2 className="type-eyebrow mb-3">Visit</h2>
            <p className="mb-0">
              {address.street}
              <br />
              {address.area}
              <br />
              {address.city}
            </p>
          </div>

          <div className="col-6 col-lg-2">
            <h2 className="type-eyebrow mb-3">Hours</h2>
            <ul className="list-unstyled mb-0">
              {hours.map((entry) => (
                <li key={entry.days}>
                  <span className="site-footer__muted">{entry.days}</span>
                  <br />
                  {entry.time}
                </li>
              ))}
            </ul>
          </div>

          <div className="col-6 col-lg-3">
            <h2 className="type-eyebrow mb-3">Concepts</h2>
            <ul className="list-unstyled mb-0">
              {concepts.map((concept) => (
                <li key={concept.slug}>
                  <a href={`/${concept.slug}`} className="site-footer__link">
                    {concept.number} — {concept.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="site-footer__base d-flex flex-column flex-md-row justify-content-between gap-3 pt-4">
          <p className="mb-0">
            © {cafe.established} {cafe.name}. <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </p>
          <ul className="list-unstyled d-flex gap-4 mb-0">
            {social.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="site-footer__link" target="_blank" rel="noopener noreferrer">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
