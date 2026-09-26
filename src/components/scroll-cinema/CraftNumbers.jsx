import Image from 'next/image';
import { stats } from '@/data/content';
import photos from '@/data/images';
import SectionHeading from '@/components/common/SectionHeading';
import RevealFrame from './RevealFrame';
import StatCounters from './StatCounters';

const { roasteryDrum } = photos;

/**
 * The figures behind the film — roast size, dough time, dial-in, seats — set
 * large under a wide shot of the roaster.
 */
export default function CraftNumbers() {
  return (
    <section id="craft" className="section cinema-craft theme-charcoal" aria-labelledby="craft-title">
      <div className="container">
        <div className="row gy-4 align-items-end">
          <div className="col-lg-7">
            <SectionHeading
              id="craft-title"
              eyebrow="The craft, in numbers"
              title="Weighed, timed, tasted."
            />
          </div>
          <div className="col-lg-4 offset-lg-1">
            <p className="type-body mb-0">
              Ten seconds of film leave out the hours. These are the figures we work to every day — and never round
              up.
            </p>
          </div>
        </div>

        <RevealFrame drift className="cinema-craft__banner my-5">
          <Image src={roasteryDrum.src} alt={roasteryDrum.alt} fill sizes="(min-width: 1400px) 1320px, 100vw" />
        </RevealFrame>

        <StatCounters stats={stats} />
      </div>
    </section>
  );
}
