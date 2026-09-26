import '@/styles/cinematic.css';
import '@/styles/cinematic-stage.css';
import cafeVideos from '@/data/videos';
import Navbar from '@/components/navigation/Navbar';
import MenuSection from '@/components/menu/MenuSection';
import Location from '@/components/sections/Location';
import Reservation from '@/components/sections/Reservation';
import Footer from '@/components/footer/Footer';
import UnveilingStage from '@/components/cinematic/UnveilingStage';
import BrandStory from '@/components/cinematic/BrandStory';
import SignatureCoffee from '@/components/cinematic/SignatureCoffee';
import Ritual from '@/components/cinematic/Ritual';
import OriginsLedger from '@/components/cinematic/OriginsLedger';
import Philosophy from '@/components/cinematic/Philosophy';
import Atmosphere from '@/components/cinematic/Atmosphere';
import GuestNotes from '@/components/cinematic/GuestNotes';
import Events from '@/components/cinematic/Events';

export const metadata = {
  title: 'Cinematic Luxury',
  description:
    'Coffee, crafted slowly. A letterboxed morning film that unveils as you scroll, dark espresso rooms and ivory type — Kela-Cafe, a space for coffee, conversation and quiet moments.',
};

const NAV_LINKS = [
  { label: 'Story', href: '#story' },
  { label: 'Coffee', href: '#signature' },
  { label: 'Menu', href: '#menu' },
  { label: 'Visit', href: '#visit' },
];

/**
 * Concept 01 — Cinematic Luxury. Scrolling unveils the opening film; the
 * page then moves through rooms of charcoal and espresso with one ivory
 * interlude, bronze hairlines between them.
 */
export default function CinematicLuxuryPage() {
  return (
    <>
      <Navbar links={NAV_LINKS} theme="dark" />
      <main id="main" className="lux-page">
        <UnveilingStage />
        <BrandStory />
        <SignatureCoffee />
        <Ritual />
        <OriginsLedger />
        <MenuSection
          theme="theme-espresso"
          title="Made to order, never rushed."
          intro="A short menu, done properly — the espresso bar, the slow bar, our signatures and a bakery that starts before dawn."
        />
        <Philosophy />
        <Atmosphere />
        <GuestNotes />
        <Events />
        <Location
          theme="theme-charcoal"
          title="Find your seat by the window."
          still={{ video: cafeVideos.concept1, moment: 'room' }}
        />
        <Reservation
          theme="theme-espresso"
          intro="A third of our tables are always kept for walk-ins. For weekend mornings, the long table or a particular window seat, send us a note and we will hold it for you."
        />
      </main>
      <Footer />
    </>
  );
}
