'use client';

import { useCallback, useRef, useState } from 'react';
import useGsap from '@/hooks/useGsap';
import { ScrollTrigger } from '@/lib/animations';
import Logo from '@/components/common/Logo';
import MobileTabBar from '@/components/mobile/MobileTabBar';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';

const SOLID_AFTER = 60;
const HIDE_AFTER = 480;

/**
 * Site header shared by all four concepts.
 *
 * Transparent over the opening film, solid once the page scrolls, and tucked
 * away while scrolling down so pinned film sequences get the whole screen.
 * React state changes only when one of those states flips — never per frame.
 *
 * Below the lg breakpoint the header is a slim app bar (logo + menu button)
 * and the page gets a floating bottom tab bar, so concept pages need no
 * extra wiring for mobile navigation.
 *
 * @param {Array<{label: string, href: string}>} links
 * @param {'dark'|'light'} [theme] Colour of the page the bar sits on
 */
export default function Navbar({ links, theme = 'dark', homeHref = '#top', reserveHref = '#reserve' }) {
  const headerRef = useRef(null);
  const [isSolid, setIsSolid] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useGsap(() => {
    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate(self) {
        const scrollY = self.scroll();
        setIsSolid(scrollY > SOLID_AFTER);
        setIsHidden(self.direction === 1 && scrollY > HIDE_AFTER);
      },
    });
  }, headerRef);

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  const themeClass = theme === 'light' ? 'theme-ivory' : 'theme-espresso';
  const stateClasses = [isSolid && 'is-solid', isHidden && !isMenuOpen && 'is-hidden'].filter(Boolean).join(' ');

  // The mobile menu and tab bar are siblings of <header>: the header's
  // backdrop-filter and transform would otherwise trap fixed overlays inside it.
  return (
    <>
      <header ref={headerRef} className={`navbar-cafe ${themeClass} ${stateClasses}`}>
        <nav className="container d-flex align-items-center justify-content-between" aria-label="Main">
          <Logo href={homeHref} />

          <DesktopNav links={links} reserveHref={reserveHref} />

          <button
            type="button"
            className="nav-toggle d-lg-none"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
            aria-label="Open site menu"
            onClick={() => setIsMenuOpen(true)}
          >
            <span className="nav-toggle__bar" />
            <span className="nav-toggle__bar" />
          </button>
        </nav>
      </header>

      <MobileNav
        id="mobile-nav"
        isOpen={isMenuOpen}
        links={links}
        homeHref={homeHref}
        reserveHref={reserveHref}
        onClose={closeMenu}
      />

      <MobileTabBar links={links} theme={theme} isCompact={isHidden} />
    </>
  );
}
