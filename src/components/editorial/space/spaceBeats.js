import { spaceStory } from '@/data/content';

/**
 * Where each paragraph of the space story sits in the Concept 3 film, in
 * seconds. While a paragraph is being read the film drifts slowly from
 * `from` to `to`; between paragraphs it travels on to the next `from`, so
 * the room keeps building but never races ahead of the text.
 *
 * `moment` is the film still that stands in for the film when motion is
 * reduced (a key of `cafeVideos.concept3.moments`).
 */
const FILM_BEATS = {
  lamp: { from: 0.6, to: 0.9, moment: 'lamp' },
  table: { from: 1.1, to: 1.8, moment: 'breakfast' },
  glass: { from: 2.5, to: 3.3, moment: 'frame' },
  room: { from: 4.1, to: 5.1, moment: 'atrium' },
  light: { from: 8.8, to: 9.4, moment: 'hall' },
};

/*
 * The paragraphs are numbered in lower-case roman, so they never read as the
 * magazine's section numbers (01–05) printed around them.
 */
const NUMERALS = ['i', 'ii', 'iii', 'iv', 'v'];

/** The five paragraphs, numbered and paired with their stretch of film. */
export const spaceBeats = spaceStory.map((paragraph, index) => ({
  ...paragraph,
  ...FILM_BEATS[paragraph.key],
  numeral: NUMERALS[index],
}));

/** Film time as a running counter, e.g. 3.25 → "00:03.3". */
export function formatTimecode(seconds) {
  const [whole, tenths] = seconds.toFixed(1).split('.');
  return `00:${whole.padStart(2, '0')}.${tenths}`;
}
