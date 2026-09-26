'use client';

import { useRef } from 'react';
import cafe from '@/data/cafe';
import photos from '@/data/images';
import cafeVideos from '@/data/videos';
import useGsap from '@/hooks/useGsap';
import { parallax } from '@/lib/animations';
import SectionHeading from '@/components/common/SectionHeading';
import Button from '@/components/common/Button';
import SwipeRail from '@/components/mobile/SwipeRail';
import LuxMedia from './LuxMedia';
import RevealFrame from './RevealFrame';

const SHAPES = {
  wide: { aspect: '16:9', className: 'ratio-wide', sizes: '(min-width: 1400px) 740px, 55vw' },
  portrait: { aspect: '4:5', className: 'ratio-portrait', sizes: '(min-width: 1400px) 420px, 32vw' },
  tall: { aspect: '3:4', className: 'ratio-tall', sizes: '(min-width: 1400px) 420px, 32vw' },
};

/**
 * Photographs of the room and frames from the films, in mosaic order
 * (placement lives in cinematic.css). `drift` is the desktop parallax travel
 * as a percentage of the frame's height; negative values rise faster.
 */
const GALLERY = [
  { key: 'golden-hour', media: photos.goldenHourRoom, label: 'The room at golden hour', shape: 'wide', drift: 6 },
  { key: 'window', media: { video: cafeVideos.concept1, moment: 'window' }, label: 'The front window', shape: 'portrait', drift: -14 },
  { key: 'bench', media: photos.windowBar, label: 'The window bench', shape: 'tall', drift: -8 },
  { key: 'banquette', media: photos.banquetteWindow, label: 'The banquette', shape: 'wide', drift: 8 },
  { key: 'reading', media: photos.bookAndLatte, label: 'A chapter and a latte', shape: 'portrait', drift: -16 },
  { key: 'atrium', media: { video: cafeVideos.concept3, moment: 'atrium' }, label: 'The atrium', shape: 'wide', drift: 4 },
];

const pad = (number) => String(number).padStart(2, '0');

function Caption({ index, label }) {
  return (
    <figcaption className="lux-atmosphere__caption">
      <span className="lux-atmosphere__index">{pad(index + 1)}</span>
      {label}
    </figcaption>
  );
}

/**
 * An asymmetric mosaic from tablet up, each frame drifting at its own speed
 * on desktop; a swipeable filmstrip on phones. Closes with the practical
 * comforts of the room and a way to book a seat in it.
 */
export default function Atmosphere() {
  const sectionRef = useRef(null);
  const mosaicRef = useRef(null);

  useGsap(
    ({ isDesktop, reduceMotion }) => {
      if (!isDesktop || reduceMotion) return;
      mosaicRef.current.querySelectorAll('.lux-atmosphere__item').forEach((item) => {
        parallax(item, { amount: Number(item.dataset.drift) });
      });
    },
    sectionRef,
  );

  return (
    <section ref={sectionRef} id="atmosphere" className="section lux-atmosphere theme-charcoal" aria-labelledby="atmosphere-title">
      <div className="container">
        <SectionHeading
          id="atmosphere-title"
          eyebrow="Atmosphere"
          title="A room that asks you to stay."
          intro="Tall windows, oak and worn leather, the low murmur of the grinder. Morning light does most of the work."
          className="lux-atmosphere__heading"
        />

        <ul ref={mosaicRef} className="lux-atmosphere__mosaic list-unstyled mb-0 d-none d-md-grid">
          {GALLERY.map((still, index) => {
            const shape = SHAPES[still.shape];
            return (
              <li key={still.key} className="lux-atmosphere__item" data-drift={still.drift}>
                <figure className="mb-0">
                  <RevealFrame media={still.media} aspect={shape.aspect} sizes={shape.sizes} className={shape.className} />
                  <Caption index={index} label={still.label} />
                </figure>
              </li>
            );
          })}
        </ul>
      </div>

      <SwipeRail label="Photographs of the café" className="lux-atmosphere__rail d-md-none">
        {GALLERY.map((still, index) => (
          <figure key={still.key} className="mb-0">
            <div className="media-frame ratio-portrait">
              <LuxMedia media={still.media} aspect="4:5" sizes="80vw" />
            </div>
            <Caption index={index} label={still.label} />
          </figure>
        ))}
      </SwipeRail>

      <div className="container">
        <div className="lux-atmosphere__footer">
          <div className="row gy-4 align-items-end">
            <ul className="lux-atmosphere__comforts col-lg-8 list-unstyled mb-0" aria-label="In the room">
              {cafe.amenities.map((amenity) => (
                <li key={amenity}>{amenity}</li>
              ))}
            </ul>
            <div className="col-lg-4 text-lg-end">
              <Button href="#reserve" variant="light" arrow data-reserve-sheet>
                Reserve a window seat
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
