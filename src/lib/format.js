/**
 * Display formatting for prices and dates, in Indian conventions.
 * Formatters are created once and shared; the date formatter is pinned to
 * the café's time zone so server and browser render the same day.
 */
const priceFormat = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 });

const dateFormat = new Intl.DateTimeFormat('en-IN', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: 'Asia/Kolkata',
});

/**
 * A rupee price with Indian digit grouping: `'1500'` → `'₹1,500'`.
 *
 * @param {number | string} value Whole rupees, as a number or a numeric string.
 * @returns {string} The formatted price, or `''` when there is no value.
 */
export function formatPrice(value) {
  if (value === '' || value === null || value === undefined) return '';
  return `₹${priceFormat.format(Number(value))}`;
}

/**
 * A calendar date in en-IN style: `'2026-09-18'` → `'18 Sept 2026'`.
 *
 * @param {string | Date} isoOrDate An ISO date string or a Date.
 * @returns {string} The formatted date.
 */
export function formatDate(isoOrDate) {
  return dateFormat.format(new Date(isoOrDate));
}
