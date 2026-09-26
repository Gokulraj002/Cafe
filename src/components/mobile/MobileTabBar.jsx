'use client';

import { useCallback, useEffect, useState } from 'react';
import ReservationForm from '@/components/sections/ReservationForm';
import BottomSheet from './BottomSheet';
import Icon, { iconForLabel } from './icons';
import useActiveSection from './useActiveSection';

const MAX_SECTION_TABS = 3;
const ESSENTIAL_LABEL = /menu|visit/i;
const TAB_BAR_QUERY = '(max-width: 991.98px)';

/**
 * Up to three of the page's section links. Menu and Visit always make the
 * cut (they are what people open a café site for on a phone); the rest fill
 * in page order.
 */
function pickSectionTabs(links) {
  const candidates = links.filter((link) => link.href.startsWith('#') && !['#top', '#reserve'].includes(link.href));
  const essential = candidates.filter((link) => ESSENTIAL_LABEL.test(link.label));
  const others = candidates.filter((link) => !ESSENTIAL_LABEL.test(link.label));
  const chosen = new Set([...essential, ...others].slice(0, MAX_SECTION_TABS));
  return candidates.filter((link) => chosen.has(link));
}

/**
 * Floating bottom tab bar for phones and tablets (hidden from lg up).
 * Home + up to three section tabs follow the section in view; the primary
 * "Reserve" tab opens the reservation form in a bottom sheet.
 *
 * Any link on the page marked `data-reserve-sheet` opens the same sheet while
 * the tab bar is showing, and stays a normal link (e.g. to #reserve) above it.
 *
 * @param {Array<{label: string, href: string}>} links Same links as the Navbar
 * @param {'dark'|'light'} [theme]
 * @param {boolean} [isCompact] Tuck the labels away while the page scrolls down
 */
export default function MobileTabBar({ links, theme = 'dark', isCompact = false }) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const closeSheet = useCallback(() => setIsSheetOpen(false), []);

  useEffect(() => {
    function handleReserveClick(event) {
      const trigger = event.target instanceof Element && event.target.closest('[data-reserve-sheet]');
      if (!trigger || !window.matchMedia(TAB_BAR_QUERY).matches) return;
      event.preventDefault();
      setIsSheetOpen(true);
    }

    document.addEventListener('click', handleReserveClick);
    return () => document.removeEventListener('click', handleReserveClick);
  }, []);

  const tabs = [
    { label: 'Home', href: '#top', icon: 'home' },
    ...pickSectionTabs(links).map((link) => ({ ...link, icon: iconForLabel(link.label) })),
  ];
  const activeId = useActiveSection(tabs.map((tab) => tab.href.slice(1)));
  const activeIndex = Math.max(0, tabs.findIndex((tab) => tab.href === `#${activeId}`));

  const isLight = theme === 'light';
  const barClasses = ['tabbar', 'd-lg-none', isLight ? 'theme-ivory' : 'theme-espresso', isCompact && 'is-compact'];

  return (
    <>
      <nav className={barClasses.filter(Boolean).join(' ')} aria-label="Quick links">
        <div className="tabbar__track" style={{ '--tab-count': tabs.length, '--tab-active': activeIndex }}>
          <span className="tabbar__indicator" aria-hidden="true" />
          <ul className="tabbar__tabs list-unstyled mb-0">
            {tabs.map((tab, index) => (
              <li key={tab.href}>
                <a href={tab.href} className="tabbar__item" aria-current={index === activeIndex ? 'true' : undefined}>
                  <Icon name={tab.icon} className="tabbar__icon" />
                  <span className="tabbar__label">{tab.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          className="tabbar__item tabbar__reserve"
          aria-haspopup="dialog"
          aria-expanded={isSheetOpen}
          onClick={() => setIsSheetOpen(true)}
        >
          <Icon name="calendar" className="tabbar__icon" />
          <span className="tabbar__label">Reserve</span>
        </button>
      </nav>

      <BottomSheet
        isOpen={isSheetOpen}
        onClose={closeSheet}
        eyebrow="Reservations"
        title="Your table is waiting."
        theme={isLight ? 'theme-ivory' : 'theme-coffee'}
      >
        <ReservationForm idPrefix="sheet-reserve" compact />
      </BottomSheet>
    </>
  );
}
