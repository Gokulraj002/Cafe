import '@/styles/editorial.css';
import '@/styles/editorial-space.css';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/footer/Footer';
import ScrollProgress from '@/components/animations/ScrollProgress';
import Masthead from '@/components/editorial/Masthead';
import SpaceStory from '@/components/editorial/SpaceStory';
import CoffeeEssay from '@/components/editorial/CoffeeEssay';
import MenuSpread from '@/components/editorial/MenuSpread';
import ExperienceEssay from '@/components/editorial/ExperienceEssay';
import JournalSection from '@/components/editorial/JournalSection';
import FaqSection from '@/components/editorial/FaqSection';
import VisitSpread from '@/components/editorial/VisitSpread';
import Colophon from '@/components/editorial/Colophon';

export const metadata = {
  title: 'Editorial Café',
  description:
    'The Slow Issue — a café magazine in five features: a room that builds itself as you read, four single origins, a short menu, the people behind the bar and a table waiting for you.',
};

const NAV_LINKS = [
  { label: 'Space', href: '#space' },
  { label: 'Coffee', href: '#coffee' },
  { label: 'Menu', href: '#menu' },
  { label: 'Visit', href: '#visit' },
];

/**
 * Concept 03 — Editorial Café, "The Slow Issue". Warm ivory pages, espresso
 * ink and bronze numerals: a cover, five numbered features, the journal and
 * the small print. The room assembles itself as you read 01 — The Space.
 */
export default function EditorialCafePage() {
  return (
    <>
      <ScrollProgress />
      <Navbar links={NAV_LINKS} theme="light" />
      <main id="main" className="ed-page">
        <Masthead />
        <SpaceStory />
        <CoffeeEssay />
        <MenuSpread />
        <ExperienceEssay />
        <JournalSection />
        <FaqSection />
        <VisitSpread />
        <Colophon />
      </main>
      <Footer theme="theme-espresso" />
    </>
  );
}
