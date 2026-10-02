import photos from '@/data/images';

/**
 * "The Slow Issue" — the magazine frame of Concept 03. The masthead's table of
 * contents, the numbered section openers and the running heads all read from
 * here, so a section's number, title and folio never disagree.
 */
export const ISSUE = {
  title: 'The Slow Issue',
  number: '01',
  season: 'October 2026',
};

/**
 * One entry per numbered section, in page order. `folio` is the (imaginary)
 * magazine page the feature starts on.
 */
export const CONTENTS = [
  { id: 'space', number: '01', title: 'The Space', line: 'A room that built itself around a lamp', folio: '04' },
  { id: 'coffee', number: '02', title: 'The Coffee', line: 'Four hills, one bar, and no shortcuts', folio: '18' },
  { id: 'menu', number: '03', title: 'The Menu', line: 'A short menu, read slowly', folio: '32' },
  { id: 'experience', number: '04', title: 'The Experience', line: 'The people, the regulars, the hours', folio: '44' },
  { id: 'visit', number: '05', title: 'Visit', line: 'Your table is waiting', folio: '60' },
];

/** @param {string} id Section id, e.g. 'coffee' */
export function contentsEntry(id) {
  return CONTENTS.find((entry) => entry.id === id);
}

/** The opener label of a numbered section, e.g. '02 — THE COFFEE'. */
export function sectionLabel(id) {
  const { number, title } = contentsEntry(id);
  return `${number} — ${title.toUpperCase()}`;
}

/** Every photograph printed in this issue, for the colophon's credits. */
export const ISSUE_PHOTOS = [
  photos.goldenHourRoom,
  photos.roasteryDrum,
  photos.cherryHarvest,
  photos.latteArtPour,
  photos.windowBar,
  photos.bookAndLatte,
  photos.roasterCoolingTray,
  photos.croissantsBakingTray,
  photos.coffeeCherries,
];
