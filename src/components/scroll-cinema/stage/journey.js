import { chapterNotes } from '@/data/content';

/**
 * How long the film rests on each chapter's key frame while its caption is
 * read, in stage units (one unit = one second of film).
 */
export const HOLD = 0.9;

const FRAMES_PER_SECOND = 24;

const pad = (value) => String(value).padStart(2, '0');

/** 4.5 → "00:04:12" (minutes, seconds, frames). */
export function formatTimecode(seconds) {
  const whole = Math.floor(seconds);
  const frames = Math.min(Math.floor((seconds - whole) * FRAMES_PER_SECOND), FRAMES_PER_SECOND - 1);
  return `${pad(Math.floor(whole / 60))}:${pad(whole % 60)}:${pad(frames)}`;
}

/**
 * Lays the film's chapters out along the stage. Each chapter plays from its
 * start to its key frame (the chapter's `moment`), rests there for a HOLD,
 * then plays on to its end.
 *
 * Positions are in stage units: `enter` is where the chapter begins, `hold`
 * where the film reaches its key frame, `exit` where the next one takes over.
 *
 * @param {object} film Entry from data/videos.js with `chapters` and `moments`
 * @returns {{ chapters: object[], length: number }}
 */
export function layoutJourney(film) {
  let cursor = 0;

  const chapters = film.chapters.map((chapter, index) => {
    const keyTime = film.moments[chapter.moment].offset;
    const enter = cursor;
    const hold = enter + (keyTime - chapter.start);
    cursor = hold + HOLD + (chapter.end - keyTime);

    return {
      ...chapter,
      ...chapterNotes[chapter.key],
      number: pad(index + 1),
      keyTime,
      enter,
      hold,
      exit: cursor,
    };
  });

  return { chapters, length: cursor };
}

/** Index of the chapter showing at a point of the stage. */
export function chapterIndexAt(chapters, stageTime) {
  return Math.max(0, chapters.findLastIndex((chapter) => stageTime >= chapter.enter));
}

/** Point of the stage to jump to for a chapter: its key frame, mid-rest. */
export function chapterRestPoint(chapter) {
  return chapter.hold + HOLD / 2;
}
