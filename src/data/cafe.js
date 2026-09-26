/**
 * Brand and visit details shared by every concept.
 * Address, directions, phone and email are placeholders — replace before launch.
 */
const cafe = {
  name: 'Maison Lente',
  shortName: 'Lente',
  tagline: 'Coffee, crafted slowly.',
  description: 'A space for coffee, conversation and quiet moments.',
  established: 2026,
  /** The roastery came first: seven years of roasting before the café opened its doors. */
  roastingSince: 2019,
  seats: 42,

  manifesto:
    'We roast, bake and pour at the pace good things take. Four coffees from growers we know by name, a bakery that starts before dawn, and a room built for staying — not for turning tables.',

  story: [
    'Maison Lente began with a single oak table and one rule: nothing leaves the bar until it is right.',
    'We roast in small batches, dial in every morning and pour each cup by hand — because the best things in a day are rarely the fastest.',
  ],

  philosophy: [
    {
      title: 'Slow by design',
      text: 'Every espresso is weighed, timed and tasted. We would rather you wait a minute than drink something ordinary.',
    },
    {
      title: 'Sourced with care',
      text: 'Single-origin lots from growers we know by name, paid well above fair-trade minimums and roasted within the week.',
    },
    {
      title: 'Made to linger',
      text: 'No laptops-off rules, no rush to turn tables. Stay for a chapter, a conversation or the whole afternoon.',
    },
  ],

  /** Short practical facts for visit sections and the reservation sheet. */
  amenities: [
    'Free Wi-Fi, with sockets along the window bench',
    'Step-free entrance and an accessible toilet',
    'Dogs welcome, water bowls by the door',
    'Oat, whole or skimmed milk at no extra cost',
  ],

  address: {
    street: '12 Linden Row',
    area: 'Old Quarter',
    city: 'Your City',
    postcode: '00000',
    mapsQuery: 'Maison Lente café',
    directions: 'Five minutes on foot from the central station, on the corner of the old market square.',
  },

  hours: [
    { days: 'Monday – Friday', time: '7:00 – 19:00' },
    { days: 'Saturday', time: '8:00 – 20:00' },
    { days: 'Sunday', time: '8:00 – 17:00' },
  ],
  hoursNote: 'Last orders thirty minutes before closing. Public holidays 9:00 – 16:00.',

  contact: {
    phone: '+00 000 000 000',
    email: 'hello@maisonlente.example',
    reservationsEmail: 'reservations@maisonlente.example',
    eventsEmail: 'events@maisonlente.example',
  },

  social: [
    { label: 'Instagram', href: 'https://instagram.com/' },
    { label: 'Journal', href: '#' },
  ],
};

export function mapsUrl() {
  const { street, city, mapsQuery } = cafe.address;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${mapsQuery}, ${street}, ${city}`)}`;
}

export default cafe;
