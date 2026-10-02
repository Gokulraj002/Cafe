import cafe from '@/data/cafe';
import cafeVideos from '@/data/videos';
import photos from '@/data/images';
import { origins, ritual } from '@/data/content';
import FadeReveal from '@/components/animations/FadeReveal';
import SwipeRail from '@/components/mobile/SwipeRail';
import SectionOpener from './SectionOpener';
import RunningHead from './RunningHead';
import Plate from './Plate';
import OriginCard from './OriginCard';

/** The ritual steps the essay tells: two before the pull quote, two after it. */
const STEPS_BEFORE_QUOTE = ritual.slice(0, 2);
const STEPS_AFTER_QUOTE = ritual.slice(2, 4);

/** A ritual step as a paragraph with a run-in head and its one precise figure. */
function EssayStep({ step }) {
  return (
    <p className="ed-essay__step">
      <span className="ed-essay__runin">{step.title}.</span> {step.text}
      <span className="ed-essay__detail">{step.detail}</span>
    </p>
  );
}

/**
 * 02 — The Coffee. A photo essay: a wide roastery plate, the essay with a drop
 * cap and a pull quote beside two tall plates, then the boxed-out sidebar of
 * this harvest's four origins (a swipe rail on phones, four columns on desktop).
 */
export default function CoffeeEssay() {
  return (
    <section id="coffee" className="section ed-section ed-coffee theme-cream" aria-labelledby="coffee-title">
      <RunningHead section="coffee" />

      <div className="container">
        <SectionOpener
          section="coffee"
          titleId="coffee-title"
          title="Four hills, one bar, and no shortcuts."
          dek={cafe.philosophy[1].text}
        />

        <Plate
          photo={photos.roasteryDrum}
          figure="2"
          caption="Twelve kilos at a time: a finished roast tipped into the cooling tray."
          ratio="ed-ratio-banner"
          sizes="(min-width: 1400px) 1296px, 92vw"
          drift
        />

        <div className="row gy-5 ed-coffee__body">
          <FadeReveal as="article" className="col-lg-6 offset-lg-1 ed-essay">
            <p className="ed-essay__lede ed-dropcap">{cafe.manifesto}</p>
            {STEPS_BEFORE_QUOTE.map((step) => (
              <EssayStep key={step.id} step={step} />
            ))}

            <blockquote className="ed-pullquote">
              <p className="mb-0">“Nothing leaves the bar until it is right.”</p>
              <footer className="ed-pullquote__source">The house rule, since {cafe.roastingSince}</footer>
            </blockquote>

            {STEPS_AFTER_QUOTE.map((step) => (
              <EssayStep key={step.id} step={step} />
            ))}
          </FadeReveal>

          <div className="col-lg-4 offset-lg-1">
            <div className="row gy-5">
              <div className="col-10 col-lg-12">
                <Plate
                  photo={photos.cherryHarvest}
                  figure="3"
                  caption="Only the ripest cherries: picked by hand, pulped the same evening."
                  ratio="ed-ratio-slim"
                  sizes="(min-width: 992px) 30vw, 80vw"
                  direction="left"
                />
              </div>
              <div className="col-8 offset-4 col-lg-10 offset-lg-2">
                <Plate
                  still={{ video: cafeVideos.concept2, moment: 'extraction', aspect: '4:5' }}
                  figure="4"
                  caption="Eighteen grams in, thirty-six out, in twenty-eight seconds."
                  sizes="(min-width: 992px) 25vw, 60vw"
                />
              </div>
            </div>
          </div>
        </div>

        <header className="ed-origins__header">
          <p className="type-eyebrow mb-0">Sidebar</p>
          <h3 className="ed-origins__title">
            On the bar this harvest
          </h3>
          <p className="ed-origins__intro mb-0">
            Three family estates and a farmers’ cooperative — each roasted to its own profile, all of them on the
            slow bar and in bags to take home.
          </p>
        </header>
      </div>

      <SwipeRail label="Origins on the bar this harvest" className="ed-origins ed-grid-rail" progress="bar">
        {origins.map((origin, index) => (
          <OriginCard key={origin.id} origin={origin} index={index} />
        ))}
      </SwipeRail>
    </section>
  );
}
