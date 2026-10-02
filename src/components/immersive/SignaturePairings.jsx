import { signatures } from '@/data/content';
import menu from '@/data/menu';
import photos from '@/data/images';
import cafeVideos from '@/data/videos';
import SectionHeading from '@/components/common/SectionHeading';
import SwipeRail from '@/components/mobile/SwipeRail';
import PairingCard from './PairingCard';

/** Pictures for each pairing, keyed by the signature's id. */
const PAIRING_MEDIA = {
  'kela-latte': { drink: { video: cafeVideos.concept4, moment: 'art' }, plate: { photo: photos.cardamomKnot } },
  'flat-white': { drink: { photo: photos.latteGreenCup }, plate: { photo: photos.painAuChocolat } },
  siphon: { drink: { photo: photos.chemexSlowBar }, plate: { photo: photos.basqueCheesecake } },
  'elaichi-cortado': { drink: { photo: photos.espressoDoubleShot }, plate: { video: cafeVideos.concept4, moment: 'table' } },
};

const menuItems = menu.flatMap((category) => category.items);

const pairings = signatures.map((signature) => ({
  ...signature,
  ...PAIRING_MEDIA[signature.id],
  platePrice: menuItems.find((item) => item.name === signature.pairing)?.price,
}));

/**
 * Four signature drinks, each with the pastry that makes it better. A
 * swipeable rail on phones and tablets; four staggered columns on desktop.
 */
export default function SignaturePairings() {
  return (
    <section id="pairings" className="section imm-pairings theme-cream" aria-labelledby="pairings-title">
      <div className="container">
        <div className="row align-items-end g-4 mb-5">
          <div className="col-lg-7">
            <SectionHeading
              id="pairings-title"
              eyebrow="Signature pairings"
              title="One cup, one plate."
              intro="What we would order together: each of our signature drinks beside the pastry that suits it best."
            />
          </div>
          <div className="col-lg-4 offset-lg-1">
            <p className="imm-pairings__aside type-caption mb-0">
              Baked in the house before sunrise, with eggless and vegan bakes daily. Full-cream, oat or almond milk at no extra cost.
            </p>
          </div>
        </div>
      </div>

      <SwipeRail label="Signature pairings" className="imm-pairings__rail">
        {pairings.map((pairing, index) => (
          <PairingCard key={pairing.id} number={index + 1} {...pairing} />
        ))}
      </SwipeRail>
    </section>
  );
}
