/**
 * The site's small line-icon set: 24px grid, 1.5px stroke, round joins.
 * Drawn in-house so the tab bar and rails need no icon library.
 */
const PATHS = {
  home: (
    <>
      <path d="M3.5 10.5 12 4l8.5 6.5" />
      <path d="M5.75 9v11h12.5V9" />
      <path d="M10 20v-5.25h4V20" />
    </>
  ),
  cup: (
    <>
      <path d="M4.5 9.5h12V13a5.5 5.5 0 0 1-5.5 5.5h-1A5.5 5.5 0 0 1 4.5 13V9.5Z" />
      <path d="M16.5 11h1.25a2.25 2.25 0 0 1 0 4.5H16" />
      <path d="M8.5 3.5c-.9 1 .9 2.1 0 3.2M12.5 3.5c-.9 1 .9 2.1 0 3.2" />
      <path d="M4 21h13" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0C18.5 15.4 12 21 12 21Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  path: (
    <>
      <circle cx="6" cy="19" r="2" />
      <circle cx="18" cy="5" r="2" />
      <path d="M8 19h8.5a3.5 3.5 0 0 0 0-7h-9a3.5 3.5 0 0 1 0-7H16" />
    </>
  ),
  door: (
    <>
      <path d="M6 21V4.5A1.5 1.5 0 0 1 7.5 3h9A1.5 1.5 0 0 1 18 4.5V21" />
      <path d="M3.5 21h17" />
      <path d="M14.5 11.5v1.5" />
    </>
  ),
  bean: (
    <>
      <ellipse cx="12" cy="12" rx="6" ry="8.5" transform="rotate(35 12 12)" />
      <path d="M8.6 16.9c1.2-1.9 3.4-2.5 3.4-4.9s2.2-3 3.4-4.9" />
    </>
  ),
  sparkle: (
    <>
      <path d="M11 3c.7 4.2 2.8 6.3 7 7-4.2.7-6.3 2.8-7 7-.7-4.2-2.8-6.3-7-7 4.2-.7 6.3-2.8 7-7Z" />
      <path d="M18.5 16v5M16 18.5h5" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
      <path d="m9.5 15 1.75 1.75L14.75 13" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m14.8 9.2-1.6 4-4 1.6 1.6-4 4-1.6Z" />
    </>
  ),
  close: <path d="M6 6l12 12M18 6 6 18" />,
  chevronLeft: <path d="M14.5 6 8.5 12l6 6" />,
  chevronRight: <path d="m9.5 6 6 6-6 6" />,
};

/** Label keywords → icon, checked in order. */
const LABEL_ICONS = [
  [/menu/i, 'cup'],
  [/visit|find|location/i, 'pin'],
  [/story|journey/i, 'path'],
  [/space|room/i, 'door'],
  [/coffee|bean|origin/i, 'bean'],
  [/moment|experience/i, 'sparkle'],
  [/reserv|book|table/i, 'calendar'],
];

/**
 * Picks an icon for a navigation label, e.g. "Menu" → cup, "Visit" → pin.
 * Falls back to a compass for anything unrecognised.
 */
export function iconForLabel(label) {
  const match = LABEL_ICONS.find(([pattern]) => pattern.test(label));
  return match ? match[1] : 'compass';
}

/**
 * Decorative SVG icon — always `aria-hidden`; give the control around it an
 * accessible name.
 *
 * @param {keyof PATHS} name
 * @param {number} [size] Rendered size in px
 */
export default function Icon({ name, size = 22, className = '' }) {
  return (
    <svg
      className={`icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {PATHS[name] ?? PATHS.compass}
    </svg>
  );
}
