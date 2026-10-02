import cafe from '@/data/cafe';
import menu from '@/data/menu';
import photos from '@/data/images';
import FadeReveal from '@/components/animations/FadeReveal';
import MenuCategory from '@/components/menu/MenuCategory';
import SectionOpener from './SectionOpener';
import RunningHead from './RunningHead';
import MenuIndex from './MenuIndex';
import Plate from './Plate';

const ID_PREFIX = 'menu';

/** The spread's two pages: the bar on the left, signatures and the bakery on the right. */
const PAGES = [menu.slice(0, 2), menu.slice(2)];

/**
 * 03 — The Menu, set as a magazine spread: a tall plate that stays in view on
 * desktop while the four categories run in two columns either side of the
 * fold. On phones and tablets a sticky chip index jumps between categories.
 */
export default function MenuSpread() {
  return (
    <section id="menu" className="section ed-section ed-menu theme-ivory" aria-labelledby="menu-title">
      <RunningHead section="menu" />

      <div className="container">
        <SectionOpener
          section="menu"
          titleId="menu-title"
          title="A short menu, read slowly."
          dek="Four pages: the espresso bar, the slow bar, the drinks we are known for and a bakery that starts before dawn."
        />
      </div>

      <MenuIndex categories={menu.map(({ id, title }) => ({ id, title }))} idPrefix={ID_PREFIX} />

      <div className="container">
        <div className="row gx-lg-5 gy-5">
          <div className="col-lg-4">
            <Plate
              photo={photos.latteArtPour}
              figure="5"
              caption="A rosetta for the Kela Latte: brown-butter milk, a few flakes of sea salt."
              ratio="ed-menu__plate-frame"
              sizes="(min-width: 992px) 30vw, 92vw"
              className="ed-menu__plate"
            />
          </div>

          <div className="col-lg-8">
            <div className="row gx-md-5 gy-5 ed-menu__spread">
              {PAGES.map((categories, pageIndex) => (
                <div key={categories[0].id} className={`col-md-6 ed-menu__page ${pageIndex ? 'ed-menu__page--right' : ''}`}>
                  {categories.map((category) => (
                    <FadeReveal key={category.id} id={`${ID_PREFIX}-${category.id}`} className="ed-menu__category">
                      <MenuCategory category={category} />
                    </FadeReveal>
                  ))}
                </div>
              ))}
            </div>

            <p className="ed-menu__footnote type-caption mb-0">
              Prices in rupees, inclusive of GST. {cafe.hoursNote}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
