import cafe from '@/data/cafe';
import RunningHead from './RunningHead';
import SectionOpener from './SectionOpener';
import SpaceStage from './space/SpaceStage';

const OPENING_TIME = cafe.hours[0].time.split(' – ')[0];

/**
 * 01 — The Space. A single lamp over a teak table, and then the room builds
 * itself around it as the reader scrolls through the five paragraphs of its
 * story (see space/SpaceStage).
 */
export default function SpaceStory() {
  return (
    <section id="space" className="ed-space theme-ivory" aria-labelledby="space-title">
      <RunningHead section="space" />

      <div className="container">
        <SectionOpener
          section="space"
          titleId="space-title"
          title={
            <>
              It began with <em>a single lamp.</em>
            </>
          }
          dek={`Before there was a floor plan there was one pendant, hung low over the teak table the roastery has worked at since ${cafe.roastingSince}. Everything else was built outwards from its light.`}
          className="ed-space-opener"
        />
      </div>

      <SpaceStage />

      <div className="container">
        <p className="ed-space-coda mb-0">
          Doors open at {OPENING_TIME}. <em>The lamp goes on first.</em>
        </p>
      </div>
    </section>
  );
}
