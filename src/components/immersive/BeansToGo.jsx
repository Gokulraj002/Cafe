import { beans, events } from '@/data/content';
import photos from '@/data/images';
import { formatPrice } from '@/lib/format';
import SectionHeading from '@/components/common/SectionHeading';
import FadeReveal from '@/components/animations/FadeReveal';
import SwipeRail from '@/components/mobile/SwipeRail';
import BeanCard from './BeanCard';
import FrameReveal from './FrameReveal';
import MomentMedia from './MomentMedia';

const cupping = events.find((event) => event.id === 'sunday-cupping');

/** The coffees on the bar, sold by the bag: a wide photograph, then one card per bean. */
export default function BeansToGo() {
  return (
    <section id="beans" className="section imm-beans theme-cream" aria-labelledby="beans-title">
      <div className="container">
        <div className="row g-5 align-items-center mb-5">
          <div className="col-lg-5">
            <SectionHeading
              id="beans-title"
              eyebrow="Beans to take home"
              title="Take the moment with you."
              intro="The four Indian coffees on our bar this season, roasted weekly in Bengaluru and sold at the counter by the bag."
            />
            <FadeReveal as="p" className="imm-beans__tip type-caption mt-4 mb-0" delay={0.2}>
              Taste them first: the {cupping.title} fee, {formatPrice(cupping.price)} per guest, includes a bag of your favourite.
            </FadeReveal>
          </div>
          <div className="col-lg-6 offset-lg-1">
            <FrameReveal>
              <MomentMedia
                media={{ photo: photos.kraftBag }}
                sizes="(min-width: 992px) 46vw, 100vw"
                className="imm-beans__photo"
              />
            </FrameReveal>
          </div>
        </div>
      </div>

      <SwipeRail label="Beans to take home" className="imm-beans__rail">
        {beans.map((bean) => (
          <BeanCard key={bean.id} {...bean} />
        ))}
      </SwipeRail>
    </section>
  );
}
