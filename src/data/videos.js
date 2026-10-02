/**
 * The four café films. Every video, poster and still image on the site is
 * derived from these entries — components never build Cloudinary URLs by hand
 * (see lib/cloudinary.js).
 *
 * `id` is the Cloudinary public ID. Accented characters are written as
 * escapes: the uploads use a decomposed "é" (e + U+0301).
 *
 * `moments` are frames reused as still photography, keyed by name.
 * `offset` is the timestamp in seconds. The last frames of each clip carry a
 * small generator mark in the bottom-right corner, so portrait crops use
 * gravity that keeps it out of frame where possible.
 */
const cafeVideos = {
  concept1: {
    id: 'Coffee_steaming_in_café_interior_20260927004911_mjxkuq',
    title: 'Arrive',
    type: 'hero',
    description: 'Morning light, a steaming cup on a teak table.',
    duration: 10,
    poster: 6.5,
    moments: {
      window: { offset: 0.6, alt: 'Looking into the café through a tall window on a bright morning' },
      room: { offset: 2.6, alt: 'Oak tables and leather chairs in a sunlit café room' },
      cup: { offset: 4.6, alt: 'A ceramic cup of coffee resting on a teak table' },
      steam: { offset: 6.6, alt: 'Steam rising from a cup of coffee in soft window light' },
      corner: { offset: 8.6, alt: 'A quiet corner table beside tall windows and plants' },
      bar: { offset: 9.6, alt: 'The espresso bar and grinder bathed in morning sun' },
    },
  },

  concept2: {
    id: 'Creating_café_video_journey_1080p_20260927004853_tibn4w',
    title: 'Craft',
    type: 'scroll',
    description: 'From cherry to cup — the whole journey in ten seconds.',
    duration: 10,
    poster: 0.6,
    moments: {
      cherry: { offset: 1.2, alt: 'A ripe red coffee cherry on the branch, beaded with dew' },
      bean: { offset: 2.6, alt: 'A single roasted coffee bean falling into a grinder' },
      grind: { offset: 4.2, alt: 'Freshly ground coffee tumbling into a burr grinder' },
      extraction: { offset: 5.5, alt: 'Espresso streaming from a portafilter into a cup' },
      pour: { offset: 6.5, alt: 'Espresso pouring into a cup with a thick golden crema' },
      crema: { offset: 7.5, alt: 'Close-up of swirling espresso crema' },
      cafe: { offset: 9.2, alt: 'A cup of coffee in the foreground of a warm, wood-panelled café' },
    },
    /** Story beats for the scroll-controlled sequence, as time ranges in seconds. */
    chapters: [
      { key: 'bean', label: 'Bean', start: 0, end: 2.2, moment: 'cherry' },
      { key: 'roast', label: 'Roast', start: 2.2, end: 5, moment: 'grind' },
      { key: 'craft', label: 'Craft', start: 5, end: 6.2, moment: 'extraction' },
      { key: 'pour', label: 'Pour', start: 6.2, end: 8, moment: 'crema' },
      { key: 'experience', label: 'Experience', start: 8, end: 10, moment: 'cafe' },
    ],
  },

  concept3: {
    id: 'Café_building_itself_on_camera_20260927003955_tjyecu',
    title: 'Discover',
    type: 'atmosphere',
    description: 'A single lamp over a teak table — and then the room builds itself around it.',
    duration: 10,
    poster: 5.6,
    moments: {
      lamp: { offset: 0.6, alt: 'A single pendant lamp glowing over a teak table in the dark' },
      frame: { offset: 3.4, alt: 'The café interior taking shape around tall glass windows' },
      atrium: { offset: 4.4, alt: 'A double-height atrium with pendant lights and round tables' },
      tables: { offset: 5.6, alt: 'Tables set with coffee and croissants in a bright, airy room' },
      breakfast: { offset: 7.4, alt: 'Coffee and croissants on a teak table beneath a curved wooden arch' },
      arch: { offset: 8.4, alt: 'A curved timber arch framing the café and its green sofas' },
      hall: { offset: 9.5, alt: 'The finished café hall, full of plants and warm light' },
    },
  },

  concept4: {
    id: 'Barista_pouring_coffee_into_cup_20260927005122_ktgcuu',
    title: 'Stay',
    type: 'experience',
    description: 'A barista pours latte art, sets the cup down beside a croissant.',
    duration: 8,
    poster: 3.4,
    moments: {
      pitcher: { offset: 0.6, alt: 'A barista holding a steel milk pitcher over a green ceramic cup' },
      pour: { offset: 2.5, alt: 'Milk being poured into espresso to form latte art' },
      art: { offset: 3.5, alt: 'A rosetta of latte art forming in a green cup' },
      serve: { offset: 4.6, alt: 'A barista presenting a finished latte across the counter' },
      table: { offset: 6.6, alt: 'A latte and a golden croissant on a wooden counter' },
      steam: { offset: 7.5, alt: 'Steam curling above a latte and croissant in a sunlit café' },
    },
  },
};

export default cafeVideos;
