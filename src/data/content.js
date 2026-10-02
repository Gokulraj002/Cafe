import cafe from './cafe.js';
import menu from './menu.js';
import { formatPrice } from '../lib/format.js';

/**
 * Long-form copy shared by the four concepts: figures, origins, process,
 * people, events and practical answers. Each concept picks what it needs and
 * presents it its own way. Prices follow menu.js: whole rupees as plain numeric
 * strings, inclusive of GST, rendered through formatPrice().
 */

const menuItems = menu.flatMap((category) => category.items);

/** Price of a menu item by name, so featured drinks never drift from the menu. */
function menuPrice(name) {
  return menuItems.find((item) => item.name === name)?.price;
}

/**
 * Headline figures. `value` is digits only so a component can count up to
 * it; `unit` sits beside the number (may be empty) and `label` reads after it.
 *
 * @type {{ value: string, unit: string, label: string }[]}
 */
export const stats = [
  { value: '72', unit: 'h', label: 'laminated croissant dough' },
  { value: '12', unit: 'kg', label: 'per roast, never more' },
  { value: '4', unit: '', label: 'Indian coffees on the bar this season' },
  { value: '45', unit: 'min', label: 'of dial-in before the doors open' },
  { value: '18', unit: 'h', label: 'steep for every batch of cold brew' },
  { value: String(cafe.seats), unit: '', label: 'seats, and no rush to leave them' },
];

/**
 * The four coffees on the bar this season, all grown in south India. The
 * regions are real; producer and estate names are placeholders — replace them
 * with the real sourcing partners before launch. `country` holds the growing
 * region shown as each entry's heading.
 *
 * @type {{ id: string, country: string, region: string, producer: string, farm: string, altitude: string,
 *   variety: string, process: string, notes: string[], story: string, harvest: string }[]}
 */
export const origins = [
  {
    id: 'chikmagalur',
    country: 'Chikmagalur',
    region: 'Baba Budangiri',
    producer: 'Lakshmi G. and family',
    farm: 'Kavikal Ridge Estate',
    altitude: '1,450–1,600 m',
    variety: 'Selection 795 and Chandragiri',
    process: 'Washed',
    notes: ['Jasmine', 'Orange blossom', 'Ripe apricot'],
    story: 'Cherries are picked by hand under silver oak shade, pulped the same evening and dried on raised beds for twelve days.',
    harvest: 'November – January',
  },
  {
    id: 'coorg',
    country: 'Coorg',
    region: 'Kodagu district',
    producer: 'Bopanna C.',
    farm: 'Kaveri Bend Estate',
    altitude: '1,100–1,200 m',
    variety: 'SLN 9',
    process: 'Anaerobic natural, sealed 72\u00a0hours',
    notes: ['Red grape', 'Jaggery', 'Blood orange'],
    story: 'A second-generation estate where every lot is fermented in small sealed tanks and tasted before it is dried.',
    harvest: 'December – February',
  },
  {
    id: 'br-hills',
    country: 'BR Hills',
    region: 'Biligiri hills',
    producer: 'Ramesh N. and family',
    farm: 'Kanive Forest Estate',
    altitude: '1,200–1,400 m',
    variety: 'Chandragiri and Catimor',
    process: 'Monsooned Malabar',
    notes: ['Dark cocoa', 'Nutmeg', 'Toasted malt'],
    story: 'Sun-dried beans spend the monsoon in open warehouses on the Mangaluru coast, swelling in the wet sea wind until they turn pale gold.',
    harvest: 'November – January',
  },
  {
    id: 'araku',
    country: 'Araku Valley',
    region: 'Eastern Ghats',
    producer: 'A cooperative of 140 tribal farming families',
    farm: 'Hillfold Growers’ Cooperative',
    altitude: '1,000–1,100 m',
    variety: 'Selection 795',
    process: 'Natural',
    notes: ['Hazelnut', 'Cocoa', 'Dried fig'],
    story: 'Whole cherries dry on raised beds for three weeks, turned by hand through the day until they rattle.',
    harvest: 'December – February',
  },
];

/**
 * From green bean to cup. `detail` is the one precise figure behind each step.
 *
 * @type {{ id: string, title: string, text: string, detail: string }[]}
 */
export const ritual = [
  {
    id: 'select',
    title: 'Select',
    text: 'Every lot is cupped twice — as a sample from origin and again when it lands. We only buy what we would drink every day.',
    detail: 'Scored 84+ on arrival',
  },
  {
    id: 'roast',
    title: 'Roast',
    text: 'Small batches on a drum roaster, each origin with its own profile, logged and cupped the following morning.',
    detail: '12 kg batches · 9–11 min',
  },
  {
    id: 'rest',
    title: 'Rest',
    text: 'Fresh is not the same as ready. The beans rest until the gas settles and the sweetness comes forward.',
    detail: '7 days for filter · 10 for espresso',
  },
  {
    id: 'dial-in',
    title: 'Dial in',
    text: 'Each morning the grinders are adjusted by taste, shot by shot, until the espresso runs sweet and even.',
    detail: '18 g in · 36 g out · 28 s',
  },
  {
    id: 'steam',
    title: 'Steam',
    text: 'Milk is stretched into a fine, glossy foam and stopped before it scalds, so its natural sweetness survives.',
    detail: '60–65 °C, never hotter',
  },
  {
    id: 'serve',
    title: 'Serve',
    text: 'Brought to your table with a glass of water and the name of the estate — never left waiting on the counter.',
    detail: 'At the table within a minute',
  },
];

/**
 * Four signature drinks, each with what we would order beside it. Names
 * match menu.js and prices are read from it.
 *
 * @type {{ id: string, name: string, description: string, pairing: string, pairingNote: string, price: string }[]}
 */
export const signatures = [
  {
    id: 'kela-latte',
    name: 'Kela Latte',
    description: 'The house espresso with milk steamed through browned butter and a few flakes of sea salt. Rich, never sweet.',
    pairing: 'Cardamom Bun',
    pairingNote: 'Warm spice cuts through the brown butter.',
  },
  {
    id: 'flat-white',
    name: 'Flat White',
    description: 'A double shot under a thin veil of micro-foam — the clearest way to taste the coffee through the milk.',
    pairing: 'Butter Croissant',
    pairingNote: 'Seventy-two hours of lamination, gone in four minutes.',
  },
  {
    id: 'siphon',
    name: 'Siphon',
    description: 'Brewed in glass over a halogen burner with the washed Chikmagalur from Kavikal Ridge. Floral, tea-like, entirely unhurried.',
    pairing: 'Basque Cheesecake',
    pairingNote: 'Burnt caramel against jasmine and apricot.',
  },
  {
    id: 'elaichi-cortado',
    name: 'Elaichi Cortado',
    description: 'Green cardamom ground at the bar, a little jaggery and steamed oat milk under a single-estate shot. Fragrant and short.',
    pairing: 'Almond Croissant',
    pairingNote: 'Toasted almond and elaichi for a warm Bengaluru afternoon.',
  },
].map((drink) => ({ ...drink, price: menuPrice(drink.name) }));

/**
 * The people behind the bar. `years` counts time with the house, which
 * began as a roastery in 2019 — before the café opened.
 *
 * @type {{ id: string, name: string, role: string, philosophy: string, years: number }[]}
 */
export const team = [
  {
    id: 'ananya',
    name: 'Ananya R.',
    role: 'Founder & Head Roaster',
    philosophy: 'A roast is finished when the sweetness is, not when the timer says so.',
    years: 7,
  },
  {
    id: 'karthik',
    name: 'Karthik S.',
    role: 'Head of Coffee',
    philosophy: 'The last shot of the day deserves the same attention as the first.',
    years: 5,
  },
  {
    id: 'farah',
    name: 'Farah K.',
    role: 'Head Baker',
    philosophy: 'Butter, cold hands and a room cooler than Bengaluru. Everything else is patience.',
    years: 3,
  },
  {
    id: 'joseph',
    name: 'Joseph M.',
    role: 'Front of House',
    philosophy: 'Nobody should ever feel like a table number.',
    years: 1,
  },
];

/**
 * Short guest quotes, attributed by first name and context.
 *
 * SAMPLE CONTENT — written for the design only. Replace with real reviews,
 * quoted with the guests' consent, before launch.
 *
 * @type {{ id: string, quote: string, name: string, context: string }[]}
 */
export const guestNotes = [
  {
    id: 'priya',
    quote: 'The only café where I have been asked how I like my coffee to taste, not how big.',
    name: 'Priya',
    context: 'Weekday regular, Indiranagar',
  },
  {
    id: 'arjun',
    quote: 'I came in for a filter kaapi and stayed for two chapters and a cardamom bun.',
    name: 'Arjun',
    context: 'Weekday mornings',
  },
  {
    id: 'meera',
    quote: 'They told me the name of the estate with my pour-over. It changed how I drank it.',
    name: 'Meera',
    context: 'First visit',
  },
  {
    id: 'nikhil',
    quote: 'Quiet enough to think, warm enough to stay. That is rarer than good coffee.',
    name: 'Nikhil',
    context: 'Works from the window bench',
  },
  {
    id: 'sneha',
    quote: 'The croissant shatters exactly as it should, and the espresso is better still.',
    name: 'Sneha',
    context: 'Saturday bakery run, from Koramangala',
  },
  {
    id: 'imran',
    quote: 'We booked the long table for my mother’s seventieth. They made it feel like her own room.',
    name: 'Imran',
    context: 'Private hire',
  },
];

/**
 * Workshops and tastings in the roastery room behind the bar. `price` is per
 * person; `seats` is the class size.
 *
 * @type {{ id: string, title: string, day: string, time: string, duration: string, price: string,
 *   seats: number, host: string, description: string }[]}
 */
export const events = [
  {
    id: 'espresso-at-home',
    title: 'Espresso at Home',
    day: 'Tuesdays',
    time: '19:30',
    duration: '2\u00a0hours',
    price: '2500',
    seats: 6,
    host: 'Karthik S.',
    description: 'Dose, grind, yield and time: taste what each one changes, one at a time, on the machine behind our bar. You leave with a recipe written for your own grinder.',
  },
  {
    id: 'filter-side-by-side',
    title: 'Filter, Side by Side',
    day: 'Thursdays',
    time: '19:30',
    duration: '90\u00a0minutes',
    price: '1800',
    seats: 8,
    host: 'Karthik S.',
    description: 'One coffee through V60, Chemex and a South Indian filter, tasted together so the differences are impossible to miss. Includes 250 g of the single estate of the week.',
  },
  {
    id: 'sunday-cupping',
    title: 'Sunday Cupping',
    day: 'Last Sunday of the month',
    time: '09:00',
    duration: '1\u00a0hour',
    price: '1200',
    seats: 12,
    host: 'Ananya R.',
    description: 'Taste new arrivals the way we buy them — side by side, from a spoon, without labels. No experience needed, and you take home a bag of the one you liked best.',
  },
  {
    id: 'three-day-croissant',
    title: 'The Three-Day Croissant',
    day: 'First Saturday of the month',
    time: '14:00',
    duration: '3\u00a0hours',
    price: '2500',
    seats: 6,
    host: 'Farah K.',
    description: 'Détrempe, butter block, turns and shaping — all seventy-two hours explained in one afternoon, with an eggless variation. You bake a tray here and take a laminated dough home.',
  },
];

/**
 * Coffee to take home, roasted weekly. `price` is per bag.
 *
 * @type {{ id: string, name: string, origin: string, process: string, notes: string[], roast: string,
 *   weight: string, price: string }[]}
 */
export const beans = [
  {
    id: 'kavikal-ridge',
    name: 'Kavikal Ridge',
    origin: 'Baba Budangiri, Chikmagalur',
    process: 'Washed',
    notes: ['Jasmine', 'Orange blossom', 'Ripe apricot'],
    roast: 'Light, for filter',
    weight: '250 g',
    price: '950',
  },
  {
    id: 'kaveri-bend',
    name: 'Kaveri Bend',
    origin: 'Coorg, Karnataka',
    process: 'Anaerobic natural, sealed 72\u00a0hours',
    notes: ['Red grape', 'Jaggery', 'Blood orange'],
    roast: 'Light, for filter',
    weight: '250 g',
    price: '1250',
  },
  {
    id: 'kanive-monsooned',
    name: 'Kanive Monsooned',
    origin: 'BR Hills, Karnataka',
    process: 'Monsooned Malabar',
    notes: ['Dark cocoa', 'Nutmeg', 'Toasted malt'],
    roast: 'Medium, for espresso or French press',
    weight: '250 g',
    price: '850',
  },
  {
    id: 'house-espresso',
    name: 'Kela House Espresso',
    origin: 'Araku Valley & BR Hills',
    process: 'Natural and Monsooned Malabar',
    notes: ['Hazelnut', 'Cocoa', 'Dark cherry'],
    roast: 'Medium, for espresso',
    weight: '250 g',
    price: '750',
  },
];

/**
 * Latest journal entries. `date` is ISO (YYYY-MM-DD); format it for display.
 *
 * @type {{ slug: string, title: string, excerpt: string, category: string, readTime: string, date: string }[]}
 */
export const journal = [
  {
    slug: 'why-we-rest-our-espresso',
    title: 'Why we rest our espresso for ten days',
    excerpt: 'Fresh is not the same as ready. What happens inside a roasted bean in its first fortnight, and why the wait makes a sweeter shot.',
    category: 'Roastery',
    readTime: '4 min',
    date: '2026-09-18',
  },
  {
    slug: 'seventy-two-hours-of-croissant',
    title: 'Seventy-two hours of croissant',
    excerpt: 'From détrempe to the final fold — and keeping butter cold through a Bengaluru April — for a pastry that takes three days to make.',
    category: 'Bakery',
    readTime: '6 min',
    date: '2026-08-27',
  },
  {
    slug: 'a-letter-from-coorg',
    title: 'A letter from Coorg',
    excerpt: 'Bopanna C. on SLN 9, sealed-tank fermentation and how a late blossom shower gave last season’s best lot three extra weeks on the branch.',
    category: 'Origins',
    readTime: '5 min',
    date: '2026-07-09',
  },
];

/**
 * Practical questions, answered plainly.
 *
 * @type {{ id: string, question: string, answer: string }[]}
 */
export const faq = [
  {
    id: 'milk',
    question: 'Do you offer plant-based milk?',
    answer: 'Yes. Oat and almond milk are always available at no extra cost, alongside full-cream, and any milk drink can be made with either. Eggless and vegan bakes are marked at the counter, and allergen details are kept at the bar — just ask.',
  },
  {
    id: 'laptops',
    question: 'Can I work from the café?',
    answer: 'On weekdays, please do. The Wi-Fi is free, the window bench has charging points and there is no time limit. On weekends a few tables are kept laptop-free, and on busy mornings we may ask you to share.',
  },
  {
    id: 'groups',
    question: 'Can you seat larger groups?',
    answer: 'We can usually seat up to five without notice. For six or more, reserve the long table — it seats fourteen — or ask about hiring the café for an evening.',
  },
  {
    id: 'dogs',
    question: 'Are pets welcome?',
    answer: 'On the verandah, always. There are water bowls by the door and treats behind the bar; we only ask that pets stay outside, for guests with allergies.',
  },
  {
    id: 'accessibility',
    question: 'Is the café accessible?',
    answer: 'The entrance is step-free, there is an accessible washroom on the ground floor and the window tables suit wheelchairs. If you need anything else, call ahead and we will have it ready.',
  },
  {
    id: 'bookings',
    question: 'Do I need to book?',
    answer: 'Not for coffee — walk-ins are always welcome, and a third of our tables are never booked. For groups of six or more, the long table or weekend mornings, reserve up to four weeks ahead.',
  },
  {
    id: 'payments',
    question: 'How can I pay?',
    answer: 'UPI, all major cards and cash. Every price on the menu includes GST, so what you see is what you pay.',
  },
];

/**
 * A weekday at the café, hour by hour, for "A day at Kela-Cafe".
 *
 * @type {{ time: string, title: string, line: string }[]}
 */
export const dayTimeline = [
  { time: '06:45', title: 'Dial-in', line: 'The grinders are adjusted shot by shot until one tastes right.' },
  { time: '07:30', title: 'Doors open', line: 'The first croissants are still warm, the decoction is dripping and the regulars know their seats.' },
  { time: '10:00', title: 'The slow bar', line: 'Pour-overs and siphons for anyone with ten minutes to spare. Most people find them.' },
  { time: '13:00', title: 'Midday light', line: 'Sun crosses the teak tables while the cheesecake softens on the counter.' },
  { time: '16:00', title: 'Kaapi hour', line: 'Books come out, the music drops a notch and the davara tumblers start to stack up.' },
  { time: '18:30', title: 'Lamps on', line: 'The room turns amber as the bakery folds dough for the day after tomorrow.' },
  { time: '21:30', title: 'Last pour', line: 'Made with exactly the same care as the first one this morning.' },
];

/**
 * One line (twelve words at most) and one supporting fact per Scroll Cinema
 * chapter, keyed like `concept2.chapters` in data/videos.js.
 *
 * @type {Record<'bean' | 'roast' | 'craft' | 'pour' | 'experience', { line: string, fact: string }>}
 */
export const chapterNotes = {
  bean: {
    line: 'It begins as a cherry, ripening slowly in the Chikmagalur hills.',
    fact: 'Our coffees grow under shade at 1,000–1,600 metres in the Ghats, where cherries ripen slowly and build more sugar.',
  },
  roast: {
    line: 'Heat, time and attention — twelve kilos at a time.',
    fact: 'Each estate has its own roast profile, logged and cupped in Bengaluru the following morning before it goes on sale.',
  },
  craft: {
    line: 'Eighteen grams, ground to order, weighed to the tenth.',
    fact: '18 g in, 36 g out in 28 seconds at 93 °C — then adjusted by taste every morning.',
  },
  pour: {
    line: 'Crema the colour of burnt caramel, poured without hurry.',
    fact: 'Milk is steamed to 60–65 °C and no further, so its natural sweetness survives.',
  },
  experience: {
    line: 'And then there is nothing left to do but stay.',
    fact: 'A third of our tables are never booked, so there is always somewhere to sit.',
  },
};

/**
 * The room, in the order the Editorial film builds it: the lamp, the table,
 * the glass, the room and, finally, the light.
 *
 * @type {{ key: string, title: string, text: string }[]}
 */
export const spaceStory = [
  {
    key: 'lamp',
    title: 'The lamp',
    text: 'Before there were walls, there was a lamp. We chose it first and built the room around its warmth — low, amber, never white.',
  },
  {
    key: 'table',
    title: 'The table',
    text: 'Beneath it, the teak table the roastery started with. It is oiled by hand every Monday and still carries the rings of seven years of cups.',
  },
  {
    key: 'glass',
    title: 'The glass',
    text: 'Tall steel-framed windows on two sides, under the rain trees, so the morning reaches the bar before we do.',
  },
  {
    key: 'room',
    title: 'The room',
    text: 'A double-height hall under a curved timber arch, with round tables set far enough apart to talk without being overheard.',
  },
  {
    key: 'light',
    title: 'The light',
    text: 'By mid-afternoon the sun has crossed the whole floor, and the hall turns the colour of a well-made filter kaapi.',
  },
];

/** Copy for the private hire block. `email` is where enquiries go. */
export const privateHire = {
  eyebrow: 'Private hire',
  title: 'The room is yours for the evening.',
  text: 'Take the long table for an afternoon, or the whole café on a weeknight — birthdays, book launches, supper clubs and quiet team offsites. We plan the menu with you and run the bar ourselves.',
  spaces: [
    { name: 'The long table', capacity: 'Up to 14 seated', availability: 'Daytime or evening' },
    { name: 'The whole café', capacity: `${cafe.seats} seated · 60 standing`, availability: 'Mon – Thu evenings from 18:30' },
  ],
  includes: [
    'A barista and a host for the evening',
    'Filter kaapi, cold brew and a menu planned with our baker',
    'Your own playlist, and the lamps turned low',
  ],
  note: `Menus from ${formatPrice('1800')} per guest, inclusive of GST. We reply to every enquiry within one working day.`,
  ctaLabel: 'Enquire about a date',
  email: cafe.contact.eventsEmail,
  emailSubject: 'Private hire enquiry',
};

/** Copy for the newsletter sign-up. */
export const newsletter = {
  eyebrow: 'The Kela letter',
  title: 'One letter a month. Nothing more.',
  text: 'New arrivals from the estates, workshop dates a week before they go public, and the occasional recipe from the bakery.',
  fieldLabel: 'Email address',
  placeholder: 'you@example.com',
  submitLabel: 'Subscribe',
  note: 'We never share your address. Unsubscribe in one click.',
  success: 'Thank you. Your first letter arrives at the start of next month.',
};
