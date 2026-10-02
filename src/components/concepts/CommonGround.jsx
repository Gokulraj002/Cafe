import concepts from '@/data/concepts';
import cafeVideos from '@/data/videos';
import TextReveal from '@/components/animations/TextReveal';
import FadeReveal from '@/components/animations/FadeReveal';
import BrandSheet from './BrandSheet';
import PhotoRail from './PhotoRail';

/** The five beats every concept walks a guest through, in order. */
const VISIT = [
  { step: 'Arrive', line: 'Morning light, the door, the first cup.' },
  { step: 'Discover', line: 'The room, the bar and the people behind it.' },
  { step: 'Craft', line: 'Cherry, roast, grind and pour — shown, not told.' },
  { step: 'Indulge', line: 'The signatures, the bakery and the full menu.' },
  { step: 'Stay', line: 'A table that stays yours for the afternoon.' },
];

const pad = (number) => String(number).padStart(2, '0');

/** The films are titled after the visit, so each beat names the concept whose film carries it. */
function filmCredit(step) {
  const concept = concepts.find(({ video }) => cafeVideos[video].title === step);
  return concept ? `Film of concept ${concept.number}` : 'In every concept';
}

/**
 * What the four concepts share — the visit, the palette, the type and the
 * photography — laid out like the closing spread of a studio presentation.
 */
export default function CommonGround() {
  return (
    <section id="common-ground" className="sel-common theme-ivory" aria-labelledby="sel-common-title">
      <div className="container">
        <div className="sel-common__head row g-4 align-items-end">
          <div className="col-lg-7">
            <p className="type-eyebrow mb-3">Common ground</p>
            <TextReveal id="sel-common-title" className="sel-common__title">
              One house, four films, <em>the same visit.</em>
            </TextReveal>
          </div>
          <div className="col-md-10 col-lg-4 offset-lg-1">
            <p className="type-body mb-0">
              Every concept is built from the same brand and the same content — menu, Indian origins, team, events,
              journal. Only the telling changes, and each film plays a different part of the visit.
            </p>
          </div>
        </div>

        <FadeReveal as="ol" stagger className="sel-visit list-unstyled">
          {VISIT.map(({ step, line }, index) => (
            <li key={step} className="sel-visit__step">
              <span className="sel-visit__number" aria-hidden="true">
                {pad(index + 1)}
              </span>
              <h3 className="sel-visit__name">{step}</h3>
              <p className="sel-visit__line">{line}</p>
              <p className="sel-visit__film">{filmCredit(step)}</p>
            </li>
          ))}
        </FadeReveal>

        <BrandSheet />
      </div>

      <PhotoRail />
    </section>
  );
}
