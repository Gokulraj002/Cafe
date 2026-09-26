'use client';

import { useEffect, useRef } from 'react';
import useActiveSection from '@/components/mobile/useActiveSection';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';

/**
 * The menu's category chips on phones and tablets: a sticky, swipeable index
 * like an ordering app's. The chip of the category being read is marked and
 * centred in the strip — React state changes only when that category changes.
 *
 * @param {Array<{id: string, title: string}>} categories
 * @param {string} idPrefix Each category block on the page has the id `${idPrefix}-${category.id}`
 */
export default function MenuIndex({ categories, idPrefix }) {
  const listRef = useRef(null);
  const reduceMotion = usePrefersReducedMotion();
  const anchorIds = categories.map((category) => `${idPrefix}-${category.id}`);
  const activeId = useActiveSection(anchorIds);

  useEffect(() => {
    const list = listRef.current;
    const chip = list.querySelector('[aria-current="true"]');
    if (!chip || list.scrollWidth <= list.clientWidth) return;
    const chipStart = chip.offsetLeft - list.offsetLeft;
    list.scrollTo({
      left: chipStart - (list.clientWidth - chip.offsetWidth) / 2,
      behavior: reduceMotion ? 'auto' : 'smooth',
    });
  }, [activeId, reduceMotion]);

  return (
    <nav className="ed-menu-index d-lg-none" aria-label="Menu categories">
      <ul ref={listRef} className="ed-menu-index__list list-unstyled mb-0">
        {categories.map((category, index) => (
          <li key={category.id}>
            <a
              href={`#${anchorIds[index]}`}
              className="ed-menu-index__chip"
              aria-current={anchorIds[index] === activeId ? 'true' : undefined}
            >
              {category.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
