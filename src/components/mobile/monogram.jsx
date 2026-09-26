/**
 * The "KC" monogram drawn for app icons (rendered by next/og in
 * app/icon.jsx and app/apple-icon.jsx). Brand hex values are repeated here
 * because image routes cannot read the CSS tokens.
 */
const ESPRESSO = '#241a16';
const CREAM = '#f5efe6';
const CARAMEL = '#cda883';

/**
 * @param {number} size Output size in px
 * @param {object} [options]
 * @param {boolean} [options.rounded] Rounded-square tile (browser tabs); home
 *   screen icons stay square because the OS applies its own mask
 */
export default function monogramArt(size, { rounded = false } = {}) {
  // Below 64px the ring disappears and the letters grow so they stay legible.
  const isTiny = size < 64;

  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        background: ESPRESSO,
        borderRadius: rounded ? '22%' : 0,
      }}
    >
      <svg width={size} height={size} viewBox="0 0 100 100">
        {!isTiny && <circle cx="50" cy="50" r="31" fill="none" stroke={CARAMEL} strokeWidth="1.1" />}
        <g
          transform={isTiny ? 'translate(50 50) scale(1.55) translate(-49.5 -50)' : undefined}
          fill="none"
          stroke={CREAM}
          strokeWidth={isTiny ? 3.6 : 1.9}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M35 40V60M48 40 35.5 51.5M40 47.5 49 60" />
          <path d="M67 44.5A9.5 10 0 1 0 67 55.5" />
        </g>
      </svg>
    </div>
  );
}
