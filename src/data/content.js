import cafe from './cafe.js';
import menu from './menu.js';

/**
 * Long-form copy shared by the four concepts: figures, origins, process,
 * people, events and practical answers. Each concept picks what it needs and
 * presents it its own way. Prices follow menu.js: local currency, no symbol.
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
  { value: '4', unit: '', label: 'single origins on the bar this season' },
  { value: '45', unit: 'min', label: 'of dial-in before the doors open' },
  { value: '18', unit: 'h', label: 'steep for every batch of cold brew' },
  { value: String(cafe.seats), unit: '', label: 'seats, and no rush to leave them' },
];

/**
 * The four coffees on the bar this season. Producer and farm names are
 * illustrative — replace them with the real sourcing partners before launch.
 *
 * @type {{ id: string, country: string, region: string, producer: string, farm: string, altitude: string,
 *   variety: string, process: string, notes: string[], story: string, harvest: string }[]}
 */
export const origins = [
  {
    id: 'ethiopia-guji',
    country: 'Ethiopia',
    region: 'Guji, Oromia',
    producer: 'Tigist A. and 312 smallholder families',
    farm: 'Dawa Ridge washing station',
    altitude: '2,100–2,300 m',
    variety: 'JARC 74110 and local landraces',
    process: 'Washed',
    notes: ['Jasmine', 'Bergamot', 'White peach'],
    story: 'Cherries are sorted by hand, pulped the same evening and dried on raised beds for twelve days.',
    harvest: 'November – January',
  },
  {
    id: 'colombia-huila',
    country: 'Colombia',
    region: 'Huila',
    producer: 'Marisol V.',
    farm: 'Finca Las Nubes Altas',
    altitude: '1,850 m',
    variety: 'Pink Bourbon',
    process: 'Washed, 36-hour dry fermentation',
    notes: ['Red grape', 'Panela', 'Blood orange'],
    story: 'A second-generation farm where every lot is fermented in small tanks and tasted before it is dried.',
    harvest: 'October – December',
  },
  {
    id: 'guatemala-huehuetenango',
    country: 'Guatemala',
    region: 'Huehuetenango',
    producer: 'Aurelio M. and family',
    farm: 'Finca Tres Cumbres',
    altitude: '1,750–1,900 m',
    variety: 'Bourbon and Caturra',
    process: 'Washed',
    notes: ['Milk chocolate', 'Toffee', 'Red apple'],
    story: 'Warm, dry winds from the Mexican lowlands keep frost off the high slopes and give the cup its clean finish.',
    harvest: 'January – March',
  },
  {
    id: 'brazil-mantiqueira',
    country: 'Brazil',
    region: 'Mantiqueira de Minas',
    producer: 'The Andrade family',
    farm: 'Sítio Alto da Serra',
    altitude: '1,250 m',
    variety: 'Yellow Catuaí',
    process: 'Natural',
    notes: ['Hazelnut', 'Cocoa', 'Dried fig'],
    story: 'Whole cherries dry on raised beds for three weeks, turned by hand through the day until they rattle.',
    harvest: 'May – August',
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
    detail: 'Scored 86+ on arrival',
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
    text: 'Brought to your table with a glass of water and the name of the farm — never left waiting on the counter.',
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
    id: 'lente-latte',
    name: 'Lente Latte',
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
    description: 'Brewed in glass over a halogen burner with the washed Ethiopian from Dawa Ridge. Floral, tea-like, entirely unhurried.',
    pairing: 'Basque Cheesecake',
    pairingNote: 'Burnt caramel against jasmine and bergamot.',
  },
  {
    id: 'espresso-tonic',
    name: 'Espresso Tonic',
    description: 'A single-origin shot poured slowly over citrus tonic and ice, so the layers hold until the first sip.',
    pairing: 'Almond Croissant',
    pairingNote: 'Bitter orange and toasted almond for a warm afternoon.',
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
    id: 'elodie',
    name: 'Élodie R.',
    role: 'Founder & Head Roaster',
    philosophy: 'A roast is finished when the sweetness is, not when the timer says so.',
    years: 7,
  },
  {
    id: 'tomas',
    name: 'Tomas K.',
    role: 'Head of Coffee',
    philosophy: 'The last shot of the day deserves the same attention as the first.',
    years: 5,
  },
  {
    id: 'noor',
    name: 'Noor H.',
    role: 'Head Baker',
    philosophy: 'Butter, cold hands and time. Everything else is patience.',
    years: 3,
  },
  {
    id: 'daniel',
    name: 'Daniel O.',
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
    id: 'amara',
    quote: 'The only café where I have been asked how I like my coffee to taste, not how big.',
    name: 'Amara',
    context: 'Sunday regular',
  },
  {
    id: 'jonas',
    quote: 'I came in for a flat white and stayed for two chapters and a cardamom bun.',
    name: 'Jonas',
    context: 'Weekday mornings',
  },
  {
    id: 'mei',
    quote: 'They told me the name of the farm with my pour-over. It changed how I drank it.',
    name: 'Mei',
    context: 'First visit',
  },
  {
    id: 'rafael',
    quote: 'Quiet enough to think, warm enough to stay. That is rarer than good coffee.',
    name: 'Rafael',
    context: 'Works from the window bench',
  },
  {
    id: 'clara',
    quote: 'The croissant shatters exactly as it should, and the espresso is better still.',
    name: 'Clara',
    context: 'Saturday bakery run',
  },
  {
    id: 'idris',
    quote: 'We booked the long table for my mother’s seventieth. They made it feel like her own room.',
    name: 'Idris',
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
    duration: '2 hours',
    price: '65',
    seats: 6,
    host: 'Tomas K.',
    description: 'Dose, grind, yield and time: taste what each one changes, one at a time, on the machine behind our bar. You leave with a recipe written for your own grinder.',
  },
  {
    id: 'filter-side-by-side',
    title: 'Filter, Side by Side',
    day: 'Thursdays',
    time: '19:30',
    duration: '90 minutes',
    price: '45',
    seats: 8,
    host: 'Tomas K.',
    description: 'One coffee through V60, Chemex and siphon, tasted together so the differences are impossible to miss. Includes 250 g of the single origin of the week.',
  },
  {
    id: 'sunday-cupping',
    title: 'Sunday Cupping',
    day: 'Last Sunday of the month',
    time: '09:00',
    duration: '1 hour',
    price: '12',
    seats: 12,
    host: 'Élodie R.',
    description: 'Taste new arrivals the way we buy them — side by side, from a spoon, without labels. No experience needed, and the fee returns as credit on any bag of beans.',
  },
  {
    id: 'three-day-croissant',
    title: 'The Three-Day Croissant',
    day: 'First Saturday of the month',
    time: '14:00',
    duration: '3 hours',
    price: '85',
    seats: 6,
    host: 'Noor H.',
    description: 'Détrempe, butter block, turns and shaping — all seventy-two hours explained in one afternoon. You bake a tray here and take a laminated dough home.',
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
    id: 'dawa-ridge',
    name: 'Dawa Ridge',
    origin: 'Guji, Ethiopia',
    process: 'Washed',
    notes: ['Jasmine', 'Bergamot', 'White peach'],
    roast: 'Light, for filter',
    weight: '250 g',
    price: '17',
  },
  {
    id: 'las-nubes-altas',
    name: 'Las Nubes Altas',
    origin: 'Huila, Colombia',
    process: 'Washed, 36-hour dry fermentation',
    notes: ['Red grape', 'Panela', 'Blood orange'],
    roast: 'Light, for filter',
    weight: '250 g',
    price: '19',
  },
  {
    id: 'tres-cumbres',
    name: 'Tres Cumbres',
    origin: 'Huehuetenango, Guatemala',
    process: 'Washed',
    notes: ['Milk chocolate', 'Toffee', 'Red apple'],
    roast: 'Medium-light, for filter or espresso',
    weight: '250 g',
    price: '15',
  },
  {
    id: 'house-espresso',
    name: 'Lente House Espresso',
    origin: 'Mantiqueira de Minas, Brazil & Huehuetenango, Guatemala',
    process: 'Natural and washed',
    notes: ['Hazelnut', 'Cocoa', 'Dark cherry'],
    roast: 'Medium, for espresso',
    weight: '250 g',
    price: '14',
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
    excerpt: 'From détrempe to the final fold: a timeline of the pastry that takes three days to make and about four minutes to eat.',
    category: 'Bakery',
    readTime: '6 min',
    date: '2026-08-27',
  },
  {
    slug: 'a-letter-from-huila',
    title: 'A letter from Huila',
    excerpt: 'Marisol V. on Pink Bourbon, dry fermentation and why this year’s harvest arrived three weeks late — and tasted better for it.',
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
    answer: 'Yes. Oat milk is always available at no extra cost, alongside whole and skimmed, and any milk drink can be made with it. Allergen details for every pastry are kept at the bar — just ask.',
  },
  {
    id: 'laptops',
    question: 'Can I work from the café?',
    answer: 'Please do. The Wi-Fi is free, the window bench has sockets and there is no time limit. On busy weekend mornings we may ask you to share a table.',
  },
  {
    id: 'groups',
    question: 'Can you seat larger groups?',
    answer: 'We can usually seat up to eight without notice. For nine or more, reserve the long table — it seats fourteen — or ask about hiring the café for an evening.',
  },
  {
    id: 'dogs',
    question: 'Are dogs welcome?',
    answer: 'Always. There are water bowls by the door and treats behind the bar; we only ask that dogs stay on the floor rather than the banquettes.',
  },
  {
    id: 'accessibility',
    question: 'Is the café accessible?',
    answer: 'The entrance is step-free, there is an accessible toilet on the ground floor and the window tables suit wheelchairs. If you need anything else, call ahead and we will have it ready.',
  },
  {
    id: 'bookings',
    question: 'Do I need to book?',
    answer: 'Not for coffee — a third of our tables are always kept for walk-ins. For weekend mornings, the long table or groups of six or more, reserve up to four weeks ahead.',
  },
];

/**
 * A weekday at the café, hour by hour, for "A day at Maison Lente".
 *
 * @type {{ time: string, title: string, line: string }[]}
 */
export const dayTimeline = [
  { time: '06:15', title: 'Dial-in', line: 'The grinders are adjusted shot by shot until one tastes right.' },
  { time: '07:00', title: 'Doors open', line: 'The first croissants are still warm, and the regulars already know their seats.' },
  { time: '09:30', title: 'The slow bar', line: 'Pour-overs and siphons for anyone with ten minutes to spare. Most people find them.' },
  { time: '12:30', title: 'Midday light', line: 'Sun crosses the oak tables while the cheesecake softens on the counter.' },
  { time: '15:00', title: 'The quiet hour', line: 'Books come out, the music drops a notch, cold brew goes over one clear cube.' },
  { time: '17:30', title: 'Lamps on', line: 'The lamps come on one by one as the bakery folds dough for the day after tomorrow.' },
  { time: '18:30', title: 'Last pour', line: 'Made with exactly the same care as the first one this morning.' },
];

/**
 * One line (twelve words at most) and one supporting fact per Scroll Cinema
 * chapter, keyed like `concept2.chapters` in data/videos.js.
 *
 * @type {Record<'bean' | 'roast' | 'craft' | 'pour' | 'experience', { line: string, fact: string }>}
 */
export const chapterNotes = {
  bean: {
    line: 'It begins as a cherry, ripening slowly at altitude.',
    fact: 'Our coffees grow between 1,250 and 2,300 metres, where cherries ripen slowly and build more sugar.',
  },
  roast: {
    line: 'Heat, time and attention — twelve kilos at a time.',
    fact: 'Each origin has its own roast profile, logged and cupped the following morning before it goes on sale.',
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
    text: 'Beneath it, the oak table the roastery started with. It is oiled by hand every Monday and still carries the rings of seven years of cups.',
  },
  {
    key: 'glass',
    title: 'The glass',
    text: 'Tall steel-framed windows on two sides, so the morning reaches the bar before we do.',
  },
  {
    key: 'room',
    title: 'The room',
    text: 'A double-height hall under a curved timber arch, with round tables set far enough apart to talk without being overheard.',
  },
  {
    key: 'light',
    title: 'The light',
    text: 'By mid-afternoon the sun has crossed the whole floor, and the hall turns the colour of a well-made flat white.',
  },
];

/** Copy for the private hire block. `email` is where enquiries go. */
export const privateHire = {
  eyebrow: 'Private hire',
  title: 'The room is yours after hours.',
  text: 'On weekday evenings the café closes at seven and opens again for you — birthdays, book launches, supper clubs and quiet team offsites. We plan the menu with you and run the bar ourselves.',
  spaces: [
    { name: 'The long table', capacity: 'Up to 14 seated', availability: 'Daytime or evening' },
    { name: 'The whole café', capacity: `${cafe.seats} seated · 60 standing`, availability: 'Weekday evenings from 19:30' },
  ],
  includes: [
    'A barista and a host for the evening',
    'Coffee, cold brew and a menu planned with our baker',
    'Your own playlist, and the lamps turned low',
  ],
  note: 'Menus from 38 per guest. We reply to every enquiry within one working day.',
  ctaLabel: 'Enquire about a date',
  email: cafe.contact.eventsEmail,
  emailSubject: 'Private hire enquiry',
};

/** Copy for the newsletter sign-up. */
export const newsletter = {
  eyebrow: 'The Lente letter',
  title: 'One letter a month. Nothing more.',
  text: 'New arrivals from origin, workshop dates a week before they go public, and the occasional recipe from the bakery.',
  fieldLabel: 'Email address',
  placeholder: 'you@example.com',
  submitLabel: 'Subscribe',
  note: 'We never share your address. Unsubscribe in one click.',
  success: 'Thank you. Your first letter arrives at the start of next month.',
};
