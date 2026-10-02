import Image from 'next/image';
import { beans, events } from '@/data/content';
import photos from '@/data/images';
import SectionHeading from '@/components/common/SectionHeading';
import Button from '@/components/common/Button';
import FadeReveal from '@/components/animations/FadeReveal';
import SwipeRail from '@/components/mobile/SwipeRail';
import RevealFrame from './RevealFrame';
import BeanCard from './BeanCard';

const { kraftBag } = photos;
const cupping = events.find((event) => event.id === 'sunday-cupping');
/** "Last Sunday of the month" → "last Sunday of the month", to sit mid-sentence. */
const cuppingDay = cupping.day.charAt(0).toLowerCase() + cupping.day.slice(1);

/**
 * The house lights come up: a light interlude with the four coffees sold by
 * the bag. Phones and tablets swipe through the bags; from desktop up all
 * four sit side by side in the same rail.
 */
export default function TakeHomeBeans() {
  return (
    <section id="beans" className="section cinema-beans theme-cream" aria-labelledby="beans-title">
      <div className="container">
        <div className="row gy-5 align-items-center mb-5">
          <div className="col-lg-6">
            <SectionHeading
              id="beans-title"
              eyebrow="Intermission — To take home"
              title="The film’s beans, for your kitchen."
              intro={`Every coffee on the bar, roasted weekly in Bengaluru and rested until it is ready — in ${beans[0].weight} bags at the counter.`}
            />
          </div>
          <div className="col-lg-5 offset-lg-1">
            <RevealFrame direction="left" className="cinema-beans__photo">
              <Image src={kraftBag.src} alt={kraftBag.alt} fill sizes="(min-width: 992px) 40vw, 100vw" />
            </RevealFrame>
          </div>
        </div>
      </div>

      <FadeReveal>
        <SwipeRail label="Beans to take home" className="cinema-beans__rail">
          {beans.map((bean, index) => (
            <BeanCard key={bean.id} bean={bean} number={index + 1} />
          ))}
        </SwipeRail>
      </FadeReveal>

      <div className="container">
        <FadeReveal className="cinema-beans__cupping">
          <p className="mb-0">
            Not sure which? Taste them side by side at <strong>{cupping.title}</strong>, on the {cuppingDay} — and take
            home a bag of the one you liked best.
          </p>
          <Button href="#workshops" arrow>
            See the workshops
          </Button>
        </FadeReveal>
      </div>
    </section>
  );
}
