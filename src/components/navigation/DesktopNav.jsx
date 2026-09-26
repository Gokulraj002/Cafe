import Link from 'next/link';
import Button from '@/components/common/Button';

/** Inline links for large screens (hidden below the lg breakpoint). */
export default function DesktopNav({ links, reserveHref }) {
  return (
    <div className="desktop-nav d-none d-lg-flex align-items-center gap-5">
      <ul className="desktop-nav__links list-unstyled d-flex align-items-center gap-4 mb-0">
        {links.map((link) => (
          <li key={link.href}>
            <a href={link.href} className="nav-link-cafe">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
      <div className="d-flex align-items-center gap-4">
        <Link href="/" className="nav-link-cafe nav-link-cafe--muted">
          Concepts
        </Link>
        <Button href={reserveHref} variant="outline" className="navbar-cafe__cta">
          Reserve
        </Button>
      </div>
    </div>
  );
}
