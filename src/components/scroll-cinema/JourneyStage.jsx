'use client';

import { useRef, useState } from 'react';
import cafeVideos from '@/data/videos';
import useGsap from '@/hooks/useGsap';
import ScrollVideo from '@/components/video/ScrollVideo';
import createJourneyTimeline, { dockStage } from './stage/createJourneyTimeline';
import { chapterIndexAt, chapterRestPoint, formatTimecode, layoutJourney } from './stage/journey';
import ChapterRail from './stage/ChapterRail';
import StageChapters from './stage/StageChapters';
import StoryProgress from './stage/StoryProgress';

const film = cafeVideos.concept2;
const { chapters, length } = layoutJourney(film);

/**
 * Concept 2's centrepiece: the café film in five chapters, played by the
 * scroll.
 *
 * A tall track holds a sticky full-screen stage — CSS sticky rather than a
 * GSAP pin, so nothing jumps as it docks. Scrolling through the track drives
 * one timeline that moves the film's playhead from chapter to chapter and,
 * in step, cross-fades the captions and fills the chapter rail (desktop) or
 * the story bar (phones and tablets). React only hears about it when the
 * chapter changes.
 *
 * With reduced motion there is no film and nothing is scrubbed: the same
 * chapters become a list of cards, each with a still from the film.
 */
export default function JourneyStage() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const screenRef = useRef(null);
  const filmRef = useRef(null);
  const timecodeRef = useRef(null);
  const scrollTriggerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useGsap(({ isDesktop, isMobile, reduceMotion }) => {
    if (reduceMotion) return;

    let shownIndex = -1;
    let shownTimecode = '';

    const timeline = createJourneyTimeline(sectionRef.current, {
      chapters,
      length,
      shift: isDesktop ? 28 : 12,
      // A phone already sees a narrow, magnified slice of the film
      depthAmount: isMobile ? 0.4 : 1,
      scrollTrigger: {
        trigger: trackRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        invalidateOnRefresh: true,
      },
      onUpdate(filmTime, stageTime) {
        filmRef.current?.setProgress(filmTime / film.duration);

        const timecode = formatTimecode(filmTime);
        if (timecode !== shownTimecode) {
          shownTimecode = timecode;
          timecodeRef.current.textContent = timecode;
        }

        const index = chapterIndexAt(chapters, stageTime);
        if (index !== shownIndex) {
          shownIndex = index;
          setActiveIndex(index);
        }
      },
    });
    scrollTriggerRef.current = timeline.scrollTrigger;

    if (isDesktop) dockStage(screenRef.current, trackRef.current);
  }, sectionRef);

  function handleChapterSelect(index) {
    const trigger = scrollTriggerRef.current;
    if (!trigger) return;

    const progress = chapterRestPoint(chapters[index]) / length;
    window.scrollTo({ top: trigger.start + (trigger.end - trigger.start) * progress, behavior: 'smooth' });
  }

  return (
    <section ref={sectionRef} id="journey" className="cinema-stage-journey theme-charcoal" aria-labelledby="journey-title">
      <div ref={trackRef} className="cinema-stage-track">
        <div ref={screenRef} className="cinema-stage-screen">
          <div className="cinema-stage-film">
            <div className="cinema-stage-film__depth video-cover">
              <ScrollVideo ref={filmRef} video={film} sizes="100vw" />
            </div>
          </div>
          <div className="cinema-stage-vignette" aria-hidden="true" />
          <div className="cinema-stage-shade" aria-hidden="true" />

          <div className="cinema-stage-ui container">
            <StoryProgress chapters={chapters} activeIndex={activeIndex} onSelect={handleChapterSelect} />

            <header className="cinema-stage-header">
              <h2 id="journey-title" className="cinema-stage-title">
                <span className="cinema-stage-title__kicker">The journey</span>
                <span className="cinema-stage-title__text">Five chapters, one cup.</span>
              </h2>
              <p className="cinema-stage-timecode" aria-hidden="true">
                <span ref={timecodeRef} className="cinema-stage-timecode__now">
                  {formatTimecode(0)}
                </span>
                {` / ${formatTimecode(film.duration)}`}
              </p>
            </header>

            <StageChapters film={film} chapters={chapters} />
            <ChapterRail chapters={chapters} length={length} activeIndex={activeIndex} onSelect={handleChapterSelect} />

            <p className="cinema-stage-cue" aria-hidden="true">
              Scroll to play
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
