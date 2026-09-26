import { journal } from '@/data/content';
import photos from '@/data/images';
import SectionHeading from '@/components/common/SectionHeading';
import FadeReveal from '@/components/animations/FadeReveal';
import JournalEntry from './JournalEntry';

/** Cover photograph for each story, by slug. */
const COVERS = {
  'why-we-rest-our-espresso': photos.roasterCoolingTray,
  'seventy-two-hours-of-croissant': photos.croissantsBakingTray,
  'a-letter-from-huila': photos.greenBeans,
};

/**
 * The latest journal stories: the newest one featured with a wide cover,
 * the others as compact rows beside it (below it on phones).
 */
export default function Journal() {
  const [latest, ...earlier] = journal;

  return (
    <section id="journal" className="section cinema-journal theme-charcoal" aria-labelledby="journal-title">
      <div className="container">
        <SectionHeading
          id="journal-title"
          eyebrow="From the journal"
          title="Longer stories, slowly told."
          className="mb-5"
        />

        <div className="row gy-5 gx-lg-5">
          <FadeReveal className="col-lg-7">
            <JournalEntry entry={latest} cover={COVERS[latest.slug]} featured />
          </FadeReveal>

          <div className="col-lg-5">
            <FadeReveal as="ul" stagger className="cinema-journal__list list-unstyled mb-0">
              {earlier.map((entry) => (
                <li key={entry.slug}>
                  <JournalEntry entry={entry} cover={COVERS[entry.slug]} />
                </li>
              ))}
            </FadeReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
