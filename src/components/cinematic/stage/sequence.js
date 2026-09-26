/**
 * The Unveiling, written as one scroll timeline of SEQUENCE_LENGTH beats.
 *
 * `FILM_CUES` place seconds of film on that timeline: `at` is the beat, `time`
 * the second of film shown there. The stretch between the second and third
 * cue — the steam rising from the cup — gets the most scroll, so it plays in
 * slow motion while the invitation is read. The film stops at 9.2s, short of
 * its final frames.
 */
export const SEQUENCE_LENGTH = 10;

export const FILM_CUES = [
  { at: 0, time: 0.6 }, // through the window
  { at: 3.6, time: 4.3 }, // across the room to the cup
  { at: 8, time: 7.1 }, // the steam, slowed down
  { at: 9.6, time: 9.2 }, // over to the corner by the bar
];

const pad = (value) => String(value).padStart(2, '0');

/** 6 → "00:06" */
export function formatReelTime(seconds) {
  return `${pad(Math.floor(seconds / 60))}:${pad(seconds % 60)}`;
}
