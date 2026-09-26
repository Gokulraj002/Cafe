'use client';

import { useEffect, useState } from 'react';

// A thin band just above the middle of the screen: whichever section crosses
// it is the one being read.
const READING_LINE = '-42% 0px -57% 0px';

/**
 * Scroll-spy: returns the id of the section currently crossing the reading
 * line. State changes only when that id changes, never per scroll frame.
 *
 * @param {string[]} ids Section ids in page order; the first is the default
 */
export default function useActiveSection(ids) {
  const [activeId, setActiveId] = useState(ids[0]);
  const idList = ids.join(' ');

  useEffect(() => {
    const sections = idList
      .split(' ')
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (sections.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: READING_LINE },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [idList]);

  return activeId;
}
