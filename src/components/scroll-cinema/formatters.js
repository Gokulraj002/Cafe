/**
 * Small, deterministic formatters for the Scroll Cinema sections. They never
 * touch the visitor's locale, so server and client render the same text.
 */

/** Altitudes are drawn on a shared scale, so the four origins compare at a glance. */
export const ALTITUDE_SCALE = { floor: 600, ceiling: 2000 };

/**
 * "1,450–1,600 m" → { low: 1450, high: 1600 }; a single figure such as
 * "1,200 m" gives the same value twice.
 */
export function parseAltitude(text) {
  const [low, high = low] = text.replace(/,/g, '').match(/\d+/g).map(Number);
  return { low, high };
}

/** 2000 → "2,000 m". */
export function formatMetres(metres) {
  return `${String(metres).replace(/\B(?=(\d{3})+(?!\d))/g, ',')} m`;
}

/** Position of an altitude on ALTITUDE_SCALE, from 0 to 1. */
export function altitudeShare(metres) {
  const { floor, ceiling } = ALTITUDE_SCALE;
  return Math.min(Math.max((metres - floor) / (ceiling - floor), 0), 1);
}

const ROAST_LEVELS = { light: 1, 'medium-light': 2, medium: 3, 'medium-dark': 4, dark: 5 };

/** Steps on the roast scale shown on each bag, from light to dark. */
export const ROAST_STEPS = 5;

/**
 * "Medium-light, for filter or espresso" →
 * { level: 2, name: 'Medium-light', use: 'for filter or espresso' }.
 */
export function parseRoast(roast) {
  const [name, ...rest] = roast.split(',');
  return {
    level: ROAST_LEVELS[name.trim().toLowerCase()] ?? 1,
    name: name.trim(),
    use: rest.join(',').trim(),
  };
}

/** 7 → "07". */
export function padNumber(value) {
  return String(value).padStart(2, '0');
}
