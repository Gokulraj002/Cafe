import Image from 'next/image';
import photos from '@/data/images';
import SwipeRail from '@/components/mobile/SwipeRail';

/** Six portraits that show the photography direction beside the films. */
const PICKS = ['espressoExtraction', 'latteArtPour', 'roasterCoolingTray', 'croissantsBakingTray', 'windowBar', 'bookAndLatte'];

/** Rendered width of one slide — see --rail-item-width on .sel-photos in concepts.css. */
const PHOTO_SIZES = '(min-width: 1400px) 312px, (min-width: 992px) 23vw, (min-width: 768px) 31vw, (min-width: 576px) 42vw, 70vw';

/** Photography strip: a swipe rail on phones, four to a view on desktop. */
export default function PhotoRail() {
  return (
    <div className="sel-photos">
      <div className="container">
        <div className="sel-photos__head d-md-flex align-items-end justify-content-between gap-4">
          <h3 className="sel-sheet__label mb-md-0">Photography</h3>
          <p className="sel-photos__note mb-0">
            Licensed under the Unsplash License and chosen for the films’ warm, low light.
          </p>
        </div>
      </div>

      <SwipeRail label="Photography" className="sel-photos__rail">
        {PICKS.map((key) => {
          const photo = photos[key];
          return (
            <figure key={key} className="sel-photo mb-0">
              <div className="sel-photo__frame media-frame ratio-portrait">
                <Image src={photo.src} alt={photo.alt} fill sizes={PHOTO_SIZES} />
              </div>
              <figcaption className="sel-photo__caption">
                <span className="sel-photo__category">{photo.category}</span>
                {photo.credit.name}
              </figcaption>
            </figure>
          );
        })}
      </SwipeRail>
    </div>
  );
}
