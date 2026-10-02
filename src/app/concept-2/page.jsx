import '@/styles/scroll-cinema.css';
import '@/styles/scroll-cinema-stage.css';
import cafeVideos from '@/data/videos';
import Navbar from '@/components/navigation/Navbar';
import MenuSection from '@/components/menu/MenuSection';
import Reservation from '@/components/sections/Reservation';
import Footer from '@/components/footer/Footer';
import CinemaIntro from '@/components/scroll-cinema/CinemaIntro';
import JourneyStage from '@/components/scroll-cinema/JourneyStage';
import Origins from '@/components/scroll-cinema/Origins';
import CraftNumbers from '@/components/scroll-cinema/CraftNumbers';
import TakeHomeBeans from '@/components/scroll-cinema/TakeHomeBeans';
import Workshops from '@/components/scroll-cinema/Workshops';
import Journal from '@/components/scroll-cinema/Journal';
import VisitCredits from '@/components/scroll-cinema/VisitCredits';

export const metadata = {
  title: 'Scroll Cinema',
  description:
    'From Chikmagalur cherry to Bengaluru cup in five chapters — a café film that moves only as fast as you scroll, then the Indian origins, beans, workshops and table behind it.',
};

const NAV_LINKS = [
  { label: 'Journey', href: '#journey' },
  { label: 'Origins', href: '#origins' },
  { label: 'Menu', href: '#menu' },
  { label: 'Visit', href: '#visit' },
];

/**
 * Concept 02 — the film is the page. A title card, then five chapters played
 * by the scroll, then everything the film leaves out: where the coffee comes
 * from, the figures behind it, the beans to take home, the menu, workshops,
 * the journal and, finally, your table.
 */
export default function ScrollCinemaPage() {
  return (
    <>
      <Navbar links={NAV_LINKS} theme="dark" />
      <main id="main" className="cinema-page">
        <CinemaIntro film={cafeVideos.concept2} />
        <JourneyStage />
        <Origins />
        <CraftNumbers />
        <TakeHomeBeans />
        <MenuSection theme="theme-espresso" eyebrow="Now showing — The menu" title="Now, the part you can taste." />
        <Workshops />
        <Journal />
        <VisitCredits />
        <Reservation
          theme="theme-coffee"
          title="Save a seat for the next showing."
          intro="Walk-ins are always welcome, and most of our tables are kept for them. For weekend mornings, the long table or groups of six or more, send us a note."
        />
      </main>
      <Footer />
    </>
  );
}
