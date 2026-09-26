'use client';

import { useRef } from 'react';
import { usePathname } from 'next/navigation';
import Logo from '@/components/common/Logo';
import Button from '@/components/common/Button';
import concepts from '@/data/concepts';
import cafe from '@/data/cafe';
import useModalDialog from '@/components/mobile/useModalDialog';

/**
 * Full-screen menu for touch devices. Behaves as a modal dialog: focus moves
 * to the close button on open, Tab is trapped, Escape closes, the page behind
 * is locked, and focus returns to the menu button afterwards.
 */
export default function MobileNav({ id, isOpen, links, homeHref, reserveHref, onClose }) {
  const panelRef = useRef(null);
  const pathname = usePathname();

  useModalDialog(panelRef, isOpen, onClose);

  return (
    <div
      id={id}
      ref={panelRef}
      className={`mobile-nav theme-espresso ${isOpen ? 'is-open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      inert={!isOpen}
    >
      <div className="mobile-nav__header container d-flex align-items-center justify-content-between">
        <Logo href={homeHref} onClick={onClose} />
        <button type="button" className="nav-toggle is-active" onClick={onClose} aria-label="Close site menu" data-autofocus>
          <span className="nav-toggle__bar" />
          <span className="nav-toggle__bar" />
        </button>
      </div>

      <nav className="mobile-nav__body container" aria-label="Mobile">
        <ul className="list-unstyled mb-0">
          {links.map((link, index) => (
            <li key={link.href} className="mobile-nav__item" style={{ '--item-index': index }}>
              <a href={link.href} className="mobile-nav__link" onClick={onClose}>
                <span className="mobile-nav__index type-eyebrow">{String(index + 1).padStart(2, '0')}</span>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <Button href={reserveHref} variant="solid" arrow className="mt-5 w-100" onClick={onClose} data-reserve-sheet>
          Reserve a table
        </Button>
      </nav>

      <div className="mobile-nav__footer container">
        <div className="d-flex align-items-baseline justify-content-between mb-3">
          <p className="type-eyebrow mb-0">Concepts</p>
          <a href="/" className="mobile-nav__all type-caption" onClick={onClose}>
            View all
          </a>
        </div>
        <ul className="mobile-nav__concepts list-unstyled mb-4">
          {concepts.map((concept) => (
            <li key={concept.slug}>
              <a
                href={`/${concept.slug}`}
                className="mobile-nav__concept"
                aria-current={pathname === `/${concept.slug}` ? 'page' : undefined}
                onClick={onClose}
              >
                <span className="mobile-nav__concept-number">{concept.number}</span>
                <span className="mobile-nav__concept-title">{concept.title}</span>
              </a>
            </li>
          ))}
        </ul>
        <p className="type-caption mb-0">
          {cafe.address.street}, {cafe.address.area}
        </p>
      </div>
    </div>
  );
}
