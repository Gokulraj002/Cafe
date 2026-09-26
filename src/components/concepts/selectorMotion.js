/**
 * Entrance choreography for the concept selector, one recipe per layout.
 * Each runs inside useGsap, so selector strings are scoped to the section and
 * everything is reverted when the breakpoint or motion preference changes.
 */
import { gsap, EASE } from '@/lib/animations';

const INTRO_COPY = ['.sel-intro__eyebrow', '.sel-intro__aside'];

/** Desktop: each frame wipes up from its baseline while its still settles from a slow zoom. */
export function playWallEntrance() {
  const items = gsap.utils.toArray('.sel-deck__item');
  const intro = gsap.timeline({ defaults: { ease: EASE.reveal, duration: 1.1 } });

  intro.fromTo(INTRO_COPY, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, stagger: 0.45 }, 0);

  // Visibility returns at once so the cards stay in the tab order; clip-path
  // and opacity carry the entrance.
  gsap.set(items, { visibility: 'visible' });

  items.forEach((item, index) => {
    const position = 0.55 + index * 0.12;
    intro
      .fromTo(
        item.querySelector('.sel-card__media'),
        { clipPath: 'inset(100% 0% 0% 0%)', y: 64 },
        { clipPath: 'inset(0% 0% 0% 0%)', y: 0, duration: 1.5, ease: EASE.cinematic, clearProps: 'clipPath,transform' },
        position,
      )
      .fromTo(
        item.querySelector('.sel-card__still'),
        { scale: 1.22 },
        { scale: 1, duration: 2, ease: EASE.cinematic, clearProps: 'transform' },
        position,
      )
      .fromTo(
        item.querySelector('.sel-card__body'),
        { autoAlpha: 0, y: 20 },
        { autoAlpha: 1, y: 0, clearProps: 'all' },
        position + 0.45,
      );
  });
}

/** Tablet: the intro fades up, then each card rises as it scrolls into view. */
export function playBoardEntrance() {
  const items = gsap.utils.toArray('.sel-deck__item');

  gsap.fromTo(INTRO_COPY, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.2, ease: EASE.reveal });

  // Opacity rather than autoAlpha: cards still waiting below the fold stay in the tab order.
  gsap.set(items, { visibility: 'visible' });
  items.forEach((item) =>
    gsap.fromTo(
      item,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: EASE.reveal,
        clearProps: 'opacity,transform',
        scrollTrigger: { trigger: item, start: 'top 92%', once: true },
      },
    ),
  );
}

/**
 * Phones: the cards deal in from the right, then the row nudges once to show
 * there is more to the side — never repeated, and skipped if the visitor has
 * already swiped.
 *
 * @param {Element} scope The selector section
 */
export function playDeckEntrance(scope) {
  const track = scope.querySelector('.sel-deck__track');
  const cards = gsap.utils.toArray('.sel-card');
  const intro = gsap.timeline({ defaults: { ease: EASE.reveal } });

  gsap.set(['.sel-deck__item', '.sel-deck__nav'], { visibility: 'visible' });

  intro
    .fromTo('.sel-intro__eyebrow', { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.9 }, 0)
    .fromTo(cards, { autoAlpha: 0, x: 56 }, { autoAlpha: 1, x: 0, duration: 1, stagger: 0.08, clearProps: 'all' }, 0.15)
    .fromTo('.sel-deck__nav', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6 }, 0.7)
    .add(() => {
      if (track.scrollLeft > 4) intro.kill();
    }, '+=0.9')
    .to(cards, { x: -14, duration: 0.45, ease: EASE.smooth, yoyo: true, repeat: 1, clearProps: 'transform' });
}
