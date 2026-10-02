# Kela-Cafe — café homepage concepts

Four homepage concepts for a premium café, each built around one of the café's films.

| Route        | Concept              | Film                                  | Video technique                     |
| ------------ | -------------------- | ------------------------------------- | ----------------------------------- |
| `/`          | Concept selector     | Posters of all four (hover previews)  | Lazy preview on hover/focus only    |
| `/concept-1` | Cinematic Luxury     | Coffee steaming in the café interior  | Optimised autoplay hero             |
| `/concept-2` | Scroll Cinema        | Cherry → roast → espresso → café      | Scroll-scrubbed, pinned (desktop)   |
| `/concept-3` | Editorial Café       | The café building itself             | Intersection Observer play/pause    |
| `/concept-4` | Immersive Experience | Barista pouring latte art             | Framed → full-viewport on scroll    |

**Stack:** Next.js 16 (App Router) · React 19 · JavaScript · Bootstrap 5 + custom CSS · GSAP + ScrollTrigger (+ SplitText) · Cloudinary.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000. The public Cloudinary cloud name is in the committed `.env`.

## Deploying to Netlify

Connect the GitHub repo in Netlify — `netlify.toml` sets the build command and Node 22, and Netlify's
Next.js runtime is applied automatically. No environment variables are required.

## Cloudinary

All video, posters and still imagery come from Cloudinary. Components never build URLs by hand:

- `src/data/videos.js` — the four films: public ID, poster timestamp, named still frames (`moments`, with alt text) and the scroll chapters for Concept 2.
- `src/lib/cloudinary.js` — URL builders and the `next/image` loader:
  - Playback: `q_auto`, `w_<rendition>,c_limit`, VP9/WebM first with an H.264/MP4 fallback. The rendition width (640–1920) is picked from the element's rendered size, so phones never download 1080p.
  - Scrubbing: `ki_0.15` (dense keyframes) so seeking is cheap.
  - Posters and stills: `so_<seconds>` frame grabs with `q_auto,f_auto` and responsive widths through `next/image`. Portrait crops use `c_lfill,ar_4:5,g_auto`.

Only `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` reaches the browser.

### Meaningful public IDs

The films are currently served from the IDs they were uploaded with. To move them to `cafe/home/video-01 … 04`:

1. Put the master MP4s in `source-videos/` (git-ignored, never served).
2. Add `CLOUDINARY_API_KEY` and `CLOUDINARY_API_SECRET` to `.env.local` (server-side only).
3. Run `npm run media:upload`, then update the `id` fields in `src/data/videos.js`.

## Project structure

```
src/
  app/                 layout, selector (/), concept-1 … concept-4 routes, globals.css
  components/
    common/            Logo, Button, SectionHeading
    navigation/        Navbar, DesktopNav, MobileNav
    video/             CloudinaryVideo, LazyVideo, ScrollVideo, VideoStill, PlaybackToggle
    animations/        FadeReveal, TextReveal, ImageReveal, ScrollProgress
    menu/              MenuSection (tabs), MenuCategory, MenuItem
    sections/          Location, Reservation (shared by every concept)
    footer/            Footer
    concepts/          Concept selector
    cinematic/         Concept 1
    scroll-cinema/     Concept 2
    editorial/         Concept 3
    immersive/         Concept 4
  data/                cafe, menu, concepts, videos
  hooks/               useGsap, useMediaQuery, useIntersectionVideo
  lib/                 cloudinary, animations
  styles/              tokens, typography, base + one stylesheet per concept
scripts/               upload-to-cloudinary.mjs
```

Each concept's stylesheet is namespaced (`.lux-`, `.cinema-`, `.ed-`, `.imm-`, `.sel-`) because global CSS
persists across client-side navigation.

## Motion and accessibility

- `useGsap` wraps `gsap.matchMedia`, so every animation is scoped, reverted on unmount and re-built when the
  breakpoint or `prefers-reduced-motion` changes. Only `transform`, `opacity` and `clip-path` are animated.
- With reduced motion enabled: no pinning or scrubbing, content is static and fully visible, and films stay on
  their poster until the visitor presses play.
- Autoplaying films have a pause control (WCAG 2.2.2) and pause when scrolled out of view.
- Skip link, one `h1` per page, keyboard-accessible menu tabs and mobile menu (focus trap, Escape to close).

## Content to replace before launch

The copy is written for a café in Indiranagar, Bengaluru: prices in Indian Rupees (whole numbers in the data,
inclusive of GST, rendered through `formatPrice()` in `src/lib/format.js`), dates in en-IN style and Indian
specialty coffee from Karnataka and Andhra Pradesh. These details are placeholders and must be confirmed or
replaced before launch:

- **Address** (`src/data/cafe.js`, `address`): 'No. 12, 12th Main Road, HAL 2nd Stage, Indiranagar, Bengaluru
  560038' and the Metro and parking directions. The Editorial Visit heading ('Just off 12th Main, in
  Indiranagar.') in `components/editorial/VisitSpread.jsx` names the street too.
- **Phone and email** (`src/data/cafe.js`, `contact`): '+91 80 4000 0000' and the `kelacafe.example` addresses.
  They appear in Visit, the footer and the reservation form.
- **Hours, seats and prices** (`src/data/cafe.js`, `src/data/menu.js`, `src/data/content.js`): confirm the
  opening hours, the 42 seats, every menu, bag, workshop and private hire price, and the GST-inclusive wording.
- **Estates and producers** (`src/data/content.js`, `origins` and `beans`): the regions are real, but the estate,
  producer and cooperative names (Kavikal Ridge, Kaveri Bend, Kanive Forest, Hillfold Growers' Cooperative) are
  fictional, as are the altitudes and tasting notes. Replace them with the real sourcing partners.
- **Team** (`src/data/content.js`, `team`, plus event hosts and the Coorg journal letter): the names, roles and
  years with the house are samples.
- **Guest notes** (`src/data/content.js`, `guestNotes`): sample quotes written for the design. Replace them with
  real reviews, quoted with the guests' consent. No press or awards are claimed anywhere; keep it that way unless
  they are real.
- **Journal** (`src/data/content.js`, `journal`): titles, dates and excerpts are samples.

The reservation form opens the visitor's email app, addressed to `contact.reservationsEmail`. Swap `handleSubmit`
in `components/sections/ReservationForm.jsx` for a booking provider when one is chosen.
