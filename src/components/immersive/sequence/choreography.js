/**
 * The script of "The Moment": where each beat sits on the scrubbed timeline
 * (in timeline seconds, not film seconds) and the geometry of the growing
 * frame.
 *
 * The small "print" is laid out by CSS (immersive-sequence.css), so the first
 * paint is already correct before any JavaScript runs. The helpers below read
 * that layout back, so the timeline starts exactly where the page left off.
 */

export const BEATS = {
  /** The print starts to grow the moment the page scrolls. */
  frame: 0,
  /** A large screen, the wall still visible around it. */
  large: 1.8,
  /** Edge to edge — the rosetta forms. */
  fullBleed: 3.2,
  /** Dim, the headline rises, the cup is set down. */
  stay: 5.4,
  /** The headline gives way to the invitation. */
  table: 8.2,
  /** The invitation holds before the page moves on. */
  end: 10.4,
};

/**
 * Timeline position → second of film, joined by straight lines. The latte art
 * (2.4–4.3 s) gets the most scroll per second of film: it is the shot.
 */
const FILM_CUES = [
  [BEATS.frame, 0.6], // the pitcher tilts over the cup — also the poster frame
  [BEATS.fullBleed, 2.4], // the pour begins
  [BEATS.stay, 4.3], // the rosetta is finished
  [BEATS.table, 6.4], // the cup is set down beside the croissant
  [9.4, 7.5], // steam over the table
];

/** Second of film to show at `time` on the timeline. */
export function filmSecondsAt(time) {
  const nextIndex = FILM_CUES.findIndex(([cueTime]) => cueTime > time);
  if (nextIndex === 0) return FILM_CUES[0][1];
  if (nextIndex === -1) return FILM_CUES[FILM_CUES.length - 1][1];

  const [fromTime, fromSeconds] = FILM_CUES[nextIndex - 1];
  const [toTime, toSeconds] = FILM_CUES[nextIndex];
  return fromSeconds + ((time - fromTime) / (toTime - fromTime)) * (toSeconds - fromSeconds);
}

/** Size of the middle "large screen" state, as a share of the stage. */
const LARGE_SCREEN = {
  landscape: { width: 0.8, height: 0.74 },
  portrait: { width: 0.88, height: 0.66 },
};

export const PRINT_RADIUS = 2;
const LARGE_RADIUS = 20;

export const FULL_BLEED = 'inset(0px 0px 0px 0px round 0px)';

const px = (value) => `${Math.round(value * 10) / 10}px`;

function insetValue(top, right, bottom, left, radius) {
  return `inset(${px(top)} ${px(right)} ${px(bottom)} ${px(left)} round ${px(radius)})`;
}

/** clip-path that shows only the print — the element CSS placed on the wall. */
export function printInset(stage, print) {
  const box = stage.getBoundingClientRect();
  const rect = print.getBoundingClientRect();
  return insetValue(rect.top - box.top, box.right - rect.right, box.bottom - rect.bottom, rect.left - box.left, PRINT_RADIUS);
}

/** clip-path of the large, centred screen between the print and full bleed. */
export function largeInset(stage) {
  const { width, height } = stage.getBoundingClientRect();
  const share = width < height ? LARGE_SCREEN.portrait : LARGE_SCREEN.landscape;
  const x = (width * (1 - share.width)) / 2;
  const y = (height * (1 - share.height)) / 2;
  return insetValue(y, x, y, x, LARGE_RADIUS);
}

/**
 * Scale of the film while it sits in the print. It is set in CSS
 * (`--imm-seq-film-from`) so the print shows the whole pour — pitcher and
 * cup — rather than a fragment of a screen-sized frame.
 */
export function filmStartScale(stage) {
  return parseFloat(getComputedStyle(stage).getPropertyValue('--imm-seq-film-from')) || 1;
}

/** Share of the film's width the camera drifts right on portrait screens, following the cup. */
const PORTRAIT_PAN = 0.14;

/** Horizontal camera drift in px: only portrait screens crop the film enough to need it. */
export function cameraPan(stage, film) {
  const stageWidth = stage.clientWidth;
  if (stageWidth >= stage.clientHeight) return 0;
  const room = (film.offsetWidth - stageWidth) / 2;
  return -Math.min(film.offsetWidth * PORTRAIT_PAN, Math.max(room, 0));
}
