import cafe from '@/data/cafe';
import cafeVideos from '@/data/videos';
import photos from '@/data/images';
import SectionOpener from './SectionOpener';
import RunningHead from './RunningHead';
import Plate from './Plate';
import DayTimeline from './DayTimeline';
import TeamInterview from './TeamInterview';
import GuestNotes from './GuestNotes';

const { title: lingerTitle, text: lingerText } = cafe.philosophy[2];

/**
 * 04 — The Experience. An asymmetric photo essay set around the café's day,
 * then a one-question interview with the team and notes left by guests.
 * Plates sit off the grid on every screen size — narrower columns pushed
 * left and right — so even the phone layout reads like a magazine page.
 */
export default function ExperienceEssay() {
  return (
    <section id="experience" className="section ed-section ed-experience theme-cream" aria-labelledby="experience-title">
      <RunningHead section="experience" />

      <div className="container">
        <SectionOpener section="experience" titleId="experience-title" title={`${lingerTitle}.`} dek={lingerText} />

        <div className="row gx-lg-5 gy-5 align-items-start">
          <div className="col-9 col-md-6 col-lg-5">
            <Plate
              photo={photos.windowBar}
              figure="7"
              caption="The window counter at three: sun, sockets and no time limit."
              ratio="ed-ratio-slim"
              sizes="(min-width: 992px) 38vw, (min-width: 768px) 48vw, 72vw"
              drift
            />
          </div>
          <div className="col-md-6 col-lg-5 offset-lg-1 ed-experience__day">
            <DayTimeline />
          </div>
        </div>

        <div className="row gx-lg-5 gy-5 align-items-end ed-experience__pair">
          <div className="col-8 offset-4 col-md-5 offset-md-0 col-lg-4 offset-lg-1">
            <Plate
              photo={photos.bookAndLatte}
              figure="8"
              caption="Two chapters and a latte, read from above."
              sizes="(min-width: 992px) 30vw, (min-width: 768px) 40vw, 62vw"
              direction="right"
            />
          </div>
          <div className="col-md-7 col-lg-6 offset-lg-1">
            <Plate
              still={{ video: cafeVideos.concept4, moment: 'table', aspect: '3:2' }}
              figure="9"
              caption="Eleven o’clock at the counter: a latte and the morning’s last croissant."
              ratio="ed-ratio-landscape"
              sizes="(min-width: 992px) 46vw, (min-width: 768px) 56vw, 92vw"
            />
          </div>
        </div>
      </div>

      <TeamInterview />
      <GuestNotes />
    </section>
  );
}
