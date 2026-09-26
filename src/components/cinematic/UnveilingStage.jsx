'use client';

import { useRef } from 'react';
import cafe from '@/data/cafe';
import cafeVideos from '@/data/videos';
import Button from '@/components/common/Button';
import ScrollVideo from '@/components/video/ScrollVideo';
import VideoStill from '@/components/video/VideoStill';
import Letterbox from './stage/Letterbox';
import StageReel from './stage/StageReel';
import StageTitle from './stage/StageTitle';
import usePageLoaded from './stage/usePageLoaded';
import useUnveilingTimeline from './stage/useUnveilingTimeline';

const film = cafeVideos.concept1;

/**
 * Concept 01 opening — "The Unveiling".
 *
 * The page opens on charcoal: a slit of morning film between two letterbox
 * bars. Scrolling parts the bars, resolves the headline word by word and
 * plays the film — the steam rises because you scroll — before the line and
 * the invitation to reserve arrive. A sticky screen inside a tall track holds
 * the stage while that happens (see stage/useUnveilingTimeline).
 *
 * The first frame of the sequence is the priority poster, so the first paint
 * is instant; the film itself downloads after the page has loaded. With
 * reduced motion there are no bars, no scrub and no film: a still of the
 * steam and the full composition, at rest.
 */
export default function UnveilingStage() {
  const stageRef = useRef(null);
  const filmRef = useRef(null);
  const isPageLoaded = usePageLoaded();

  useUnveilingTimeline(stageRef, filmRef, film);

  return (
    <section ref={stageRef} id="top" className="lux-stage theme-charcoal" aria-labelledby="lux-stage-title">
      <div className="lux-stage__screen">
        <div className="lux-stage__film">
          <div className="lux-stage__lens">
            <ScrollVideo
              ref={filmRef}
              video={film}
              load={isPageLoaded}
              smoothing={0.35}
              posterMoment="window"
              posterPriority
              className="lux-stage__video"
            />
            <div className="lux-stage__still">
              <VideoStill video={film} moment="steam" alt="" />
            </div>
          </div>
          <div className="lux-stage__shade" />
          <div className="lux-stage__dim" />
        </div>

        <Letterbox />

        <div className="lux-stage__content container">
          <StageTitle id="lux-stage-title" />

          <div className="lux-stage__footer">
            <p className="lux-stage__lede">{cafe.description}</p>
            <div className="lux-stage__actions">
              <Button href="#reserve" variant="light" arrow data-reserve-sheet>
                Reserve a table
              </Button>
            </div>
          </div>

          <StageReel title={`Chapter I — ${film.title}`} duration={film.duration} />
        </div>
      </div>
    </section>
  );
}
