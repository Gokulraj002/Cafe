/**
 * Brand and visit details shared by every concept.
 * Address, directions, phone and email are placeholders — replace before launch.
 */
const cafe = {
  name: 'Kela-Cafe',
  shortName: 'Kela',
  tagline: 'Coffee, crafted slowly.',
  description: 'A Bengaluru space for Indian coffee, conversation and quiet moments.',
  established: 2026,
  /** The roastery came first: seven years of roasting before the café opened its doors. */
  roastingSince: 2019,
  seats: 42,

  manifesto:
    'We roast, bake and pour at the pace good things take. Four Indian coffees from growers we know by name, a bakery that starts before dawn, and a room built for staying — not for turning tables.',

  story: [
    'Kela-Cafe began with a single teak table and one rule: nothing leaves the bar until it is right.',
    'We roast in small batches in Bengaluru, a morning’s drive from Chikmagalur and Coorg, dial in every morning and pour each cup by hand — because the best things in a day are rarely the fastest.',
  ],

  philosophy: [
    {
      title: 'Slow by design',
      text: 'Every espresso is weighed, timed and tasted. We would rather you wait a minute than drink something ordinary.',
    },
    {
      title: 'Sourced with care',
      text: 'Lots from Chikmagalur, Coorg, BR Hills and Araku, paid well above the market rate and roasted within the week.',
    },
    {
      title: 'Made to linger',
      text: 'Laptops welcome on weekdays, and no rush to turn tables. Stay for a chapter, a conversation or the whole afternoon.',
    },
  ],

  /** Short practical facts for visit sections and the reservation sheet. */
  amenities: [
    'Free Wi-Fi, with charging points along the window bench',
    'Step-free entrance and an accessible washroom',
    'Pets welcome on the verandah, water bowls by the door',
    'Full-cream, oat or almond milk at no extra cost',
    'Eggless and vegan bakes on the counter every day',
    'UPI, cards and cash; every price includes GST',
  ],

  /** Placeholder address — replace with the real premises before launch. */
  address: {
    street: 'No. 12, 12th Main Road',
    area: 'HAL 2nd Stage, Indiranagar',
    city: 'Bengaluru',
    postcode: '560038',
    state: 'Karnataka',
    mapsQuery: 'Kela-Cafe, Indiranagar',
    directions:
      'A few minutes’ walk from Indiranagar Metro on the Purple Line. Paid parking nearby, two-wheeler parking out front.',
  },

  hours: [
    { days: 'Monday – Friday', time: '7:30 – 22:00' },
    { days: 'Saturday – Sunday', time: '8:00 – 23:00' },
  ],
  hoursNote: 'Last orders thirty minutes before closing. Open on most public holidays.',

  /** Placeholder phone number and example-domain emails — replace before launch. */
  contact: {
    phone: '+91 80 4000 0000',
    email: 'hello@kelacafe.example',
    reservationsEmail: 'reservations@kelacafe.example',
    eventsEmail: 'events@kelacafe.example',
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
