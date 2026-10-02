import { guestNotes } from '@/data/content';
import photos from '@/data/images';
import cafeVideos from '@/data/videos';
import SectionHeading from '@/components/common/SectionHeading';
import SwipeRail from '@/components/mobile/SwipeRail';
import StoryCard from './StoryCard';

/** Where each note was written, as a picture — keyed by the note's id. */
const STORY_MEDIA = {
  priya: { photo: photos.morningCup },
  arjun: { photo: photos.handsAroundCup },
  meera: { photo: photos.coffeeCherries },
  nikhil: { photo: photos.windowBar },
  sneha: { video: cafeVideos.concept4, moment: 'steam' },
  imran: { video: cafeVideos.concept3, moment: 'breakfast' },
};

/** Guest notes as a swipeable row of story cards, on every screen size. */
export default function GuestStories() {
  return (
    <section id="notes" className="section imm-stories theme-charcoal" aria-labelledby="notes-title">
      <div className="container">
        <div className="row mb-5">
          <div className="col-lg-7">
            <SectionHeading
              id="notes-title"
              eyebrow="Guest notes"
              title="Moments, in their words."
              intro="The small things guests tell us they remember about a visit here — rarely the coffee alone."
            />
          </div>
        </div>
      </div>

      <SwipeRail label="Guest notes" progress="dots" className="imm-stories__rail">
        {guestNotes.map((note, index) => (
          <StoryCard key={note.id} index={index} total={guestNotes.length} media={STORY_MEDIA[note.id]} {...note} />
        ))}
      </SwipeRail>
    </section>
  );
}
