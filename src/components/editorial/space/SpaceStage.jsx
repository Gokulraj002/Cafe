'use client';

import { useRef, useState } from 'react';
import cafeVideos from '@/data/videos';
import useGsap from '@/hooks/useGsap';
import { parallax } from '@/lib/animations';
import SpaceBlock from './SpaceBlock';
import SpacePlate from './SpacePlate';
import { spaceBeats } from './spaceBeats';
import useSpaceTimeline from './useSpaceTimeline';

const film = cafeVideos.concept3;

/**
 * The scrollytelling spread: the plate holds still in its column while the
 * five paragraphs scroll past it, and reading them builds the room.
 *
 * Desktop: plate left (7 columns), text right. Below lg: the plate sticks to
 * the top of the screen and the paragraphs pass beneath it as cards.
 * The paragraph on the reading line is the only React state.
 */
export default function SpaceStage() {
  const stageRef = useRef(null);
  const storyRef = useRef(null);
  const filmRef = useRef(null);
  const timecodeRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToBeat = useSpaceTimeline({
    scopeRef: stageRef,
    storyRef,
    filmRef,
    timecodeRef,
    film,
    beats: spaceBeats,
    onBeatChange: setActiveIndex,
  });

  // Large numerals drift behind their paragraphs — desktop only, where there is room for depth.
  useGsap(
    ({ isDesktop, reduceMotion }) => {
      if (!isDesktop || reduceMotion) return;
      stageRef.current.querySelectorAll('.ed-space-block__numeral').forEach((numeral) => parallax(numeral, { amount: 40 }));
    },
    stageRef,
  );

  return (
    <div ref={stageRef} className="ed-space-stage container">
      <div className="row">
        <div className="col-lg-7 ed-space-stage__plate">
          <SpacePlate
            film={film}
            beats={spaceBeats}
            activeIndex={activeIndex}
            filmRef={filmRef}
            timecodeRef={timecodeRef}
            onSelect={scrollToBeat}
          />
        </div>

        <div className="col-lg-4 offset-lg-1 ed-space-stage__story">
          <p className="ed-space-stage__cue mb-0">Scroll slowly — the film follows</p>
          <ol ref={storyRef} className="ed-space-blocks list-unstyled mb-0">
            {spaceBeats.map((beat, index) => (
              <SpaceBlock key={beat.key} beat={beat} film={film} isActive={index === activeIndex} />
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
