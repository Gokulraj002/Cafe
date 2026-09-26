import Image from 'next/image';
import { origins } from '@/data/content';
import photos from '@/data/images';
import SectionHeading from '@/components/common/SectionHeading';
import RevealFrame from './RevealFrame';
import OriginList from './OriginList';

const { cherryHarvest, coffeeCherries } = photos;

/**
 * Where the film's first chapter really happens: the four coffees on the bar
 * this season, each as a spec sheet. From desktop up the heading and the
 * photographs stay in view while the list scrolls past them.
 */
export default function Origins() {
  return (
    <section id="origins" className="section cinema-origins theme-espresso" aria-labelledby="origins-title">
      <div className="container">
        <div className="row gy-5 gx-lg-5">
          <div className="col-lg-5 align-self-start cinema-origins__aside">
            <SectionHeading
              id="origins-title"
              eyebrow="Behind the film — Origins"
              title="Where it begins."
              intro="Four coffees on the bar this season, from growers we know by name. Each began as a cherry like the one in the film — ripening slowly, at altitude."
            />

            <div className="cinema-origins__media">
              <RevealFrame className="cinema-origins__photo">
                <Image
                  src={cherryHarvest.src}
                  alt={cherryHarvest.alt}
                  fill
                  sizes="(min-width: 992px) 30vw, (min-width: 768px) 55vw, 80vw"
                />
              </RevealFrame>
              <RevealFrame direction="left" className="cinema-origins__inset">
                <Image
                  src={coffeeCherries.src}
                  alt={coffeeCherries.alt}
                  fill
                  sizes="(min-width: 992px) 18vw, (min-width: 768px) 38vw, 48vw"
                />
              </RevealFrame>
            </div>
          </div>

          <div className="col-lg-6 offset-lg-1">
            <OriginList origins={origins} />
          </div>
        </div>
      </div>
    </section>
  );
}
