/**
 * Still photography that sits beside the four café films.
 *
 * Every photograph comes from Unsplash and is used under the Unsplash License
 * (https://unsplash.com/license): free for commercial use, no permission
 * needed. None of them are Unsplash+ images. Attribution is not required, but
 * we keep the photographer credit for every image here so it can be shown in a
 * credits list and so each file can be traced back to its source page.
 *
 * Files live in /public/images and are optimised by Next.js, so render them
 * with next/image: `<Image src={photo.src} width={photo.width}
 * height={photo.height} alt={photo.alt} sizes="…" />` (or `fill` inside a
 * sized frame). Landscapes are 2400px wide, portraits 1800px wide.
 *
 * `category` is one of: espresso, latte, origins, roasting, brewing, pastry,
 * dessert, interior, barista, moments, retail.
 * `source` is the photo's page on Unsplash.
 */
const photos = {
  espressoExtraction: {
    src: '/images/espresso-extraction.jpg',
    width: 1800,
    height: 2699,
    alt: 'A thick ribbon of espresso pouring from a bottomless portafilter into a white cup',
    category: 'espresso',
    orientation: 'portrait',
    credit: { name: 'Nathan Dumlao', url: 'https://unsplash.com/@nate_dumlao' },
    source: 'https://unsplash.com/photos/So7cyDtlmls',
  },
  espressoDoubleShot: {
    src: '/images/espresso-double-shot.jpg',
    width: 2400,
    height: 1599,
    alt: 'Two espresso shots running from a double spout into small glasses on a steel drip tray',
    category: 'espresso',
    orientation: 'landscape',
    credit: { name: 'Kevin Butz', url: 'https://unsplash.com/@kevin_butz' },
    source: 'https://unsplash.com/photos/BBFRIGifYQ8',
  },

  latteGreenCup: {
    src: '/images/latte-green-cup.jpg',
    width: 1800,
    height: 2250,
    alt: 'A heart of latte art in a sage-green cup and saucer on a dark wooden table',
    category: 'latte',
    orientation: 'portrait',
    credit: { name: 'Pablo Merchán Montes', url: 'https://unsplash.com/@pablomerchanm' },
    source: 'https://unsplash.com/photos/_Tw4vCs9C-8',
  },
  latteArtPour: {
    src: '/images/latte-art-pour.jpg',
    width: 1800,
    height: 2250,
    alt: 'A barista pouring a rosetta from a steel milk pitcher into a cup held low in dim light',
    category: 'latte',
    orientation: 'portrait',
    credit: { name: 'Caramel', url: 'https://unsplash.com/@caramel_works' },
    source: 'https://unsplash.com/photos/OFdqt1ECako',
  },
  milkPourBar: {
    src: '/images/milk-pour-bar.jpg',
    width: 2400,
    height: 1343,
    alt: 'Steamed milk poured into a white cup, forming latte art above a wooden bar',
    category: 'latte',
    orientation: 'landscape',
    credit: { name: 'Fahmi Fakhrudin', url: 'https://unsplash.com/@fahmipaping' },
    source: 'https://unsplash.com/photos/nzyzAUsbV0M',
  },

  coffeeCherries: {
    src: '/images/coffee-cherries-branch.jpg',
    width: 2400,
    height: 1601,
    alt: 'Coffee cherries ripening from green to red on a branch in soft farm light',
    category: 'origins',
    orientation: 'landscape',
    credit: { name: 'Clint McKoy', url: 'https://unsplash.com/@clintmckoy' },
    source: 'https://unsplash.com/photos/h28p96ICizo',
  },
  cherryHarvest: {
    src: '/images/cherry-harvest-hands.jpg',
    width: 1800,
    height: 2700,
    alt: 'Weathered hands picking ripe red coffee cherries from the branch',
    category: 'origins',
    orientation: 'portrait',
    credit: { name: 'LIVESTART STIVEN', url: 'https://unsplash.com/@livestart' },
    source: 'https://unsplash.com/photos/aXLk1YTaxNM',
  },
  greenBeans: {
    src: '/images/green-coffee-beans.jpg',
    width: 2400,
    height: 1600,
    alt: 'A close pile of unroasted green coffee beans in soft focus',
    category: 'origins',
    orientation: 'landscape',
    credit: { name: 'Battlecreek Coffee Roasters', url: 'https://unsplash.com/@battlecreekcoffeeroasters' },
    source: 'https://unsplash.com/photos/Yx1XkPYUBss',
  },

  roasteryDrum: {
    src: '/images/roastery-drum.jpg',
    width: 2400,
    height: 1602,
    alt: 'Freshly roasted beans pouring from a drum roaster into its cooling tray under a work lamp',
    category: 'roasting',
    orientation: 'landscape',
    credit: { name: 'Yanapi Senaud', url: 'https://unsplash.com/@yaanapi' },
    source: 'https://unsplash.com/photos/6HR8vpjYUHo',
  },
  roasterCoolingTray: {
    src: '/images/roaster-cooling-tray.jpg',
    width: 1800,
    height: 2250,
    alt: 'Roasted beans turning in a roaster cooling tray beneath a warm lamp',
    category: 'roasting',
    orientation: 'portrait',
    credit: { name: 'Scott Soltys-Curry', url: 'https://unsplash.com/@heyscottcurry' },
    source: 'https://unsplash.com/photos/7p4SmQtWFHU',
  },
  cuppingPour: {
    src: '/images/cupping-pour.jpg',
    width: 1800,
    height: 2700,
    alt: 'Hot water poured from a kettle over a row of cupping bowls',
    category: 'roasting',
    orientation: 'portrait',
    credit: { name: 'René Porter', url: 'https://unsplash.com/@reneporter' },
    source: 'https://unsplash.com/photos/VXIOMNlnSos',
  },

  pourOverKettle: {
    src: '/images/pour-over-kettle.jpg',
    width: 1800,
    height: 2700,
    alt: 'A gooseneck kettle pouring over a pour-over dripper in warm side light',
    category: 'brewing',
    orientation: 'portrait',
    credit: { name: 'Beau Carpenter', url: 'https://unsplash.com/@btcarpenter' },
    source: 'https://unsplash.com/photos/KGR2u2rG6c4',
  },
  chemexSlowBar: {
    src: '/images/chemex-slow-bar.jpg',
    width: 1800,
    height: 2700,
    alt: 'A kettle pouring into a Chemex on a wooden slow-bar tray beside a cup',
    category: 'brewing',
    orientation: 'portrait',
    credit: { name: 'Eiliv Aceron', url: 'https://unsplash.com/@shootdelicious' },
    source: 'https://unsplash.com/photos/XP5zW2ngk9w',
  },

  croissantsBakingTray: {
    src: '/images/croissants-baking-tray.jpg',
    width: 1800,
    height: 2700,
    alt: 'Golden croissants cooling on a perforated baking tray',
    category: 'pastry',
    orientation: 'portrait',
    credit: { name: 'With Mahdy', url: 'https://unsplash.com/@withmahdy' },
    source: 'https://unsplash.com/photos/ePh7mI8y_bA',
  },
  painAuChocolat: {
    src: '/images/pain-au-chocolat.jpg',
    width: 1800,
    height: 2700,
    alt: 'A pain au chocolat and a croissant resting on crumpled baking paper',
    category: 'pastry',
    orientation: 'portrait',
    credit: { name: 'Nicholas Doyle', url: 'https://unsplash.com/@nsdoyle' },
    source: 'https://unsplash.com/photos/t7jTtJ9iyUE',
  },

  basqueCheesecake: {
    src: '/images/basque-cheesecake.jpg',
    width: 2400,
    height: 1684,
    alt: 'A slice of burnt Basque cheesecake with a small spoon on a green plate',
    category: 'dessert',
    orientation: 'landscape',
    credit: { name: 'mahyar mirghasemi', url: 'https://unsplash.com/@mahyar_mirghasmi' },
    source: 'https://unsplash.com/photos/z35wEXJ8kvA',
  },
  cardamomKnot: {
    src: '/images/cardamom-knot.jpg',
    width: 2400,
    height: 1800,
    alt: 'A twisted, sugar-glazed spiced bun on a white plate on a dark wooden table',
    category: 'dessert',
    orientation: 'landscape',
    credit: { name: 'Chris Curry', url: 'https://unsplash.com/@chriscurry92' },
    source: 'https://unsplash.com/photos/M5XHo05kO78',
  },

  goldenHourRoom: {
    src: '/images/golden-hour-room.jpg',
    width: 2000,
    height: 2000,
    alt: 'A café room glowing in golden-hour light, with oak panelling, bentwood chairs and trailing plants',
    category: 'interior',
    orientation: 'square',
    credit: { name: 'Volodymyr Dobrovolskyy', url: 'https://unsplash.com/@vladimir_d' },
    source: 'https://unsplash.com/photos/4lZyKFyzmWw',
  },
  banquetteWindow: {
    src: '/images/banquette-window.jpg',
    width: 2400,
    height: 1350,
    alt: 'A leather banquette and small tables beneath a living plant wall and tall sash windows',
    category: 'interior',
    orientation: 'landscape',
    credit: { name: 'Ian Valerio', url: 'https://unsplash.com/@iangvalerio' },
    source: 'https://unsplash.com/photos/m5D5dHWHfSk',
  },
  windowBar: {
    src: '/images/window-bar-light.jpg',
    width: 1800,
    height: 2700,
    alt: 'Two oak stools at a window counter, with sunlight falling across a quiet corner',
    category: 'interior',
    orientation: 'portrait',
    credit: { name: 'Long Chung', url: 'https://unsplash.com/@chungj07' },
    source: 'https://unsplash.com/photos/EGU0c37idAA',
  },

  baristaTamping: {
    src: '/images/barista-tamping.jpg',
    width: 2400,
    height: 1600,
    alt: 'A barista lowering a tamper onto freshly dosed grounds in a portafilter',
    category: 'barista',
    orientation: 'landscape',
    credit: { name: 'Enis Yavuz', url: 'https://unsplash.com/@enisyavuz' },
    source: 'https://unsplash.com/photos/sBS-Ufi0f1g',
  },
  portafilterDose: {
    src: '/images/portafilter-dose.jpg',
    width: 1800,
    height: 2696,
    alt: 'Hands holding a portafilter filled with freshly ground coffee',
    category: 'barista',
    orientation: 'portrait',
    credit: { name: 'Sonalika Vakili', url: 'https://unsplash.com/@sonay' },
    source: 'https://unsplash.com/photos/9AKxPWN5Wz8',
  },

  morningCup: {
    src: '/images/morning-cup-oak.jpg',
    width: 1800,
    height: 2400,
    alt: 'A cream cup of coffee on an oak table, caught in a slant of morning sun',
    category: 'moments',
    orientation: 'portrait',
    credit: { name: 'L.D.I.A', url: 'https://unsplash.com/@57_fiftysevn' },
    source: 'https://unsplash.com/photos/dQdyO9jsixA',
  },
  bookAndLatte: {
    src: '/images/book-and-latte.jpg',
    width: 1800,
    height: 2700,
    alt: 'An open book and a latte on a round wooden stool, seen from above',
    category: 'moments',
    orientation: 'portrait',
    credit: { name: 'Alexandra Fuller', url: 'https://unsplash.com/@alexandrajf' },
    source: 'https://unsplash.com/photos/5hUHRyKtwEE',
  },
  handsAroundCup: {
    src: '/images/hands-around-cup.jpg',
    width: 2400,
    height: 1600,
    alt: 'Two hands in a striped sleeve cradling a stoneware cup of black coffee',
    category: 'moments',
    orientation: 'landscape',
    credit: { name: 'Marie G.', url: 'https://unsplash.com/@mindandcoffee' },
    source: 'https://unsplash.com/photos/h0R95oV_k1w',
  },

  kraftBag: {
    src: '/images/kraft-coffee-bag.jpg',
    width: 2400,
    height: 1600,
    alt: 'A plain kraft-paper coffee bag standing on a white shelf against a caramel wall',
    category: 'retail',
    orientation: 'landscape',
    credit: { name: 'With Mahdy', url: 'https://unsplash.com/@withmahdy' },
    source: 'https://unsplash.com/photos/wizWrRZJXSg',
  },
  beansSack: {
    src: '/images/beans-linen-sack.jpg',
    width: 1800,
    height: 2700,
    alt: 'Dark roasted coffee beans heaped in the open mouth of a linen sack',
    category: 'retail',
    orientation: 'portrait',
    credit: { name: 'Tatiana Fernández R', url: 'https://unsplash.com/@artofmuses' },
    source: 'https://unsplash.com/photos/vFzBSLRkH8s',
  },
};

/**
 * All photographs in one category, in the order they are listed above.
 * @param {string} category e.g. 'espresso', 'interior', 'moments'
 * @returns {Array<object>} photo entries (empty when the category is unknown)
 */
export function photosByCategory(category) {
  return Object.values(photos).filter((photo) => photo.category === category);
}

export default photos;
