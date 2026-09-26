import '@/styles/immersive-sequence.css';
import '@/styles/immersive.css';
import cafeVideos from '@/data/videos';
import Navbar from '@/components/navigation/Navbar';
import MenuSection from '@/components/menu/MenuSection';
import Location from '@/components/sections/Location';
import Reservation from '@/components/sections/Reservation';
import Footer from '@/components/footer/Footer';
import MomentSequence from '@/components/immersive/MomentSequence';
import DayTimeline from '@/components/immersive/DayTimeline';
import SignaturePairings from '@/components/immersive/SignaturePairings';
import GuestStories from '@/components/immersive/GuestStories';
import EventsProgram from '@/components/immersive/EventsProgram';
import BeansToGo from '@/components/immersive/BeansToGo';
import PrivateHire from '@/components/immersive/PrivateHire';

export const metadata = {
  title: 'Immersive Experience',
  description:
    'Come for the coffee. Stay for the moment. A single pour, framed like a photograph, grows until it fills the screen — then the day at Maison Lente unfolds around your table.',
};

const NAV_LINKS = [
  { label: 'Moments', href: '#day' },
  { label: 'Pairings', href: '#pairings' },
  { label: 'Menu', href: '#menu' },
  { label: 'Visit', href: '#visit' },
];

/** Concept 04 — one pour, scrolled frame by frame, then a whole day around it. */
export default function ImmersiveExperiencePage() {
  return (
    <>
      <Navbar links={NAV_LINKS} theme="dark" />
      <main id="main" className="imm-page">
        <MomentSequence />
        <DayTimeline />
        <SignaturePairings />
        <GuestStories />
        <EventsProgram />
        <MenuSection
          theme="theme-coffee"
          eyebrow="The menu"
          title="Everything we pour, all day."
          className="imm-menu"
        />
        <BeansToGo />
        <PrivateHire />
        <Location
          theme="theme-ivory"
          title="Your seat by the window."
          still={{ video: cafeVideos.concept3, moment: 'hall' }}
          className="imm-location"
        />
        <Reservation
          theme="theme-espresso"
          title="Stay for the moment."
          intro="A third of our tables are never booked, so walk-ins are always welcome. For weekend mornings, the long table or groups of six or more, send us a note."
          className="imm-reserve"
        />
      </main>
      <Footer />
    </>
  );
}
