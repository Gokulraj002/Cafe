import photos from '@/data/images';
import { journal } from '@/data/content';
import SwipeRail from '@/components/mobile/SwipeRail';
import SectionOpener from './SectionOpener';
import JournalCard from './JournalCard';

/** The plate printed with each story, by slug. */
const STORY_PHOTOS = {
  'why-we-rest-our-espresso': photos.roasterCoolingTray,
  'seventy-two-hours-of-croissant': photos.croissantsBakingTray,
  'a-letter-from-huila': photos.coffeeCherries,
};

/** The lead story is printed large on desktop; the other two as small plates beside it. */
const LEAD_SIZES = '(min-width: 992px) 52vw, (min-width: 768px) 44vw, 82vw';
const SIDE_SIZES = '(min-width: 992px) 16vw, (min-width: 768px) 44vw, 82vw';

/**
 * From the journal — the latest three stories. A swipe rail on phones and
 * tablets; on desktop the lead story takes the tall left column and the other
 * two stack beside it.
 */
export default function JournalSection() {
  return (
    <section id="journal" className="section ed-section ed-journal theme-ivory" aria-labelledby="journal-title">
      <div className="container">
        <SectionOpener
          label="From the journal"
          titleId="journal-title"
          title="Reading for the second cup."
          dek="Letters from origin, notes from the roastery and the bakery’s longest recipe — new stories every few weeks."
        />
      </div>

      <SwipeRail label="Journal stories" className="ed-journal__rail ed-grid-rail">
        {journal.map((story, index) => (
          <JournalCard
            key={story.slug}
            story={story}
            photo={STORY_PHOTOS[story.slug]}
            index={index}
            sizes={index === 0 ? LEAD_SIZES : SIDE_SIZES}
          />
        ))}
      </SwipeRail>
    </section>
  );
}
