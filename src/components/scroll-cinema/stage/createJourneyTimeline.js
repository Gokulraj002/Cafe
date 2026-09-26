import { gsap } from '@/lib/animations';
import { HOLD } from './journey';

/** Length of a caption cross-fade, in stage units. */
const FADE = 0.5;
/** Film scale at each chapter boundary: back from the cherry, into the grinder, back to the machine… */
const DEPTH = [1.1, 1, 1.06, 1, 1.05, 1.12];
/** Vignette per chapter: closest around the machine, opening up in the café. */
const VIGNETTE = [0.5, 0.8, 0.75, 0.6, 0.25];

/**
 * The stage's one scrubbed timeline, measured in stage units (see
 * layoutJourney). A `playhead` travels through the film's seconds, resting
 * on each chapter's key frame; in step with it the captions cross-fade, the
 * chapter rail and story bar fill, and the film breathes in scale and
 * vignette. Every frame, `onUpdate(filmTime, stageTime)` receives the
 * playhead so the caller can hand it to the film.
 *
 * @param {Element} stage  Element containing the stage markup
 * @param {object}  options
 * @param {object[]} options.chapters  From layoutJourney
 * @param {number}   options.length    Stage length, from layoutJourney
 * @param {number}   options.shift     Caption travel in px as it fades
 * @param {number}   options.depthAmount Share of the DEPTH breathing to apply (0–1)
 * @param {object}   options.scrollTrigger
 * @param {(filmTime: number, stageTime: number) => void} options.onUpdate
 */
export default function createJourneyTimeline(stage, { chapters, length, shift, depthAmount, scrollTrigger, onUpdate }) {
  const find = gsap.utils.selector(stage);
  const captions = find('.cinema-stage-chapter');
  const segments = find('.cinema-stage-stories__fill');
  const depth = find('.cinema-stage-film__depth');
  const vignette = find('.cinema-stage-vignette');
  const playhead = { time: 0 };

  gsap.set(vignette, { opacity: VIGNETTE[0] });

  const timeline = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger,
    onUpdate: () => onUpdate(playhead.time, timeline.time()),
  });

  chapters.forEach((chapter, index) => {
    const { enter, hold, exit } = chapter;
    const parts = captions[index].querySelectorAll('.cinema-stage-chapter__part');
    const isFirst = index === 0;

    // The film plays to the chapter's key frame, rests there, then plays on.
    timeline
      .fromTo(playhead, { time: chapter.start }, { time: chapter.keyTime, duration: hold - enter }, enter)
      .fromTo(playhead, { time: chapter.keyTime }, { time: chapter.end, duration: exit - hold - HOLD }, hold + HOLD);

    // Captions hand over at the chapter boundary: the next one rises as the last one clears.
    timeline.fromTo(
      parts,
      { autoAlpha: 0, y: shift },
      { autoAlpha: 1, y: 0, duration: FADE, stagger: 0.04, ease: 'power2.out' },
      isFirst ? 0.1 : enter - FADE * 0.3,
    );
    if (index < chapters.length - 1) {
      timeline.to(parts, { autoAlpha: 0, y: -shift, duration: FADE * 0.6, stagger: 0.03, ease: 'power2.in' }, exit - FADE);
    }

    timeline
      .fromTo(segments[index], { scaleX: 0 }, { scaleX: 1, duration: exit - enter }, enter)
      .fromTo(
        depth,
        { scale: 1 + (DEPTH[index] - 1) * depthAmount },
        { scale: 1 + (DEPTH[index + 1] - 1) * depthAmount, duration: exit - enter, ease: 'sine.inOut' },
        enter,
      );

    if (!isFirst) timeline.to(vignette, { opacity: VIGNETTE[index], duration: FADE }, enter - FADE / 2);
  });

  timeline
    .fromTo(find('.cinema-stage-rail__fill'), { scaleY: 0 }, { scaleY: 1, duration: length }, 0)
    .to(find('.cinema-stage-cue'), { autoAlpha: 0, duration: FADE }, 0.2);

  return timeline;
}

/**
 * Desktop entrance: the stage rises as a rounded screen and opens out to
 * full bleed just as it docks.
 */
export function dockStage(screen, track) {
  return gsap.fromTo(
    screen,
    { clipPath: 'inset(9% 5% 0% round 28px)' },
    {
      clipPath: 'inset(0% 0% 0% round 0px)',
      ease: 'none',
      scrollTrigger: { trigger: track, start: 'top bottom', end: 'top top', scrub: true },
    },
  );
}
