import cafeVideos from '@/data/videos';
import Location from '@/components/sections/Location';
import Reservation from '@/components/sections/Reservation';
import RunningHead from './RunningHead';
import { contentsEntry, sectionLabel } from './issue';

/**
 * 05 — Visit: the shared Location (on cream) and Reservation (on ivory)
 * sections, framed with this issue's bronze numeral and running head.
 */
export default function VisitSpread() {
  return (
    <div className="ed-visit">
      <RunningHead section="visit" />
      <span className="ed-visit__numeral" aria-hidden="true">
        {contentsEntry('visit').number}
      </span>

      <Location
        theme="theme-cream"
        eyebrow={sectionLabel('visit')}
        title="On the corner of the old market square."
        still={{ video: cafeVideos.concept3, moment: 'arch' }}
      />
      <Reservation
        id="reserve"
        theme="theme-ivory"
        title="Your table is waiting."
        intro="Walk in any day — or tell us when you are coming, how many you will be and where you like to sit, and we will set the table before you arrive."
      />
    </div>
  );
}
