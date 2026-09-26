/**
 * Cloudinary delivery helpers.
 *
 * Only the public cloud name is used here. API keys and secrets never reach
 * the browser — they are read by scripts/upload-to-cloudinary.mjs on the
 * server side only.
 */

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const DELIVERY_BASE = `https://res.cloudinary.com/${CLOUD_NAME}`;

/** Rendition widths we request for video. Each one is cached by Cloudinary's CDN. */
const VIDEO_WIDTHS = [640, 960, 1280, 1920];

/**
 * Scroll-scrubbed films are decoded frame by frame, so they stay small: 720px
 * on phones, 960px on tablets and small laptops, 1280px above that.
 */
const SCRUB_BREAKPOINTS = [
  { below: 768, width: 720 },
  { below: 1200, width: 960 },
];
const SCRUB_MAX_WIDTH = 1280;

/**
 * `q_auto:eco` is indistinguishable from `:good` in these films (compared
 * frame by frame, including the dark opening of concept 3) and roughly 20%
 * lighter. With dense keyframes a ten-second film weighs about 0.8–1.5 MB at
 * 720px, 1.2–2.2 MB at 960px and 1.7–3.2 MB at 1280px.
 */
const SCRUB_QUALITY = 'q_auto:eco';

// Public IDs can contain folders ("cafe/home/video-01") and accented
// characters ("Café"), so each path segment is encoded on its own.
function encodePublicId(publicId) {
  return publicId.split('/').map(encodeURIComponent).join('/');
}

function deliveryUrl(resourceType, transformation, publicId, extension) {
  return `${DELIVERY_BASE}/${resourceType}/upload/${transformation}/${encodePublicId(publicId)}.${extension}`;
}

function trimTransformation(video) {
  return video.trim ? `so_${video.trim.start},eo_${video.trim.end},` : '';
}

/**
 * Picks the smallest rendition that still looks sharp at the rendered size.
 * Device pixel ratio is capped at 2 — beyond that the extra bytes are not
 * visible in moving footage.
 */
export function pickVideoWidth(renderedWidth, devicePixelRatio = 1) {
  const needed = renderedWidth * Math.min(devicePixelRatio, 2);
  return VIDEO_WIDTHS.find((width) => width >= needed) ?? VIDEO_WIDTHS[VIDEO_WIDTHS.length - 1];
}

/**
 * `<source>` list for a regular playback video: VP9/WebM first (roughly 40%
 * smaller), H.264/MP4 as the universal fallback.
 */
export function videoSources(video, { width = 1280 } = {}) {
  const base = `${trimTransformation(video)}q_auto,ac_none,w_${width},c_limit`;

  return [
    { src: deliveryUrl('video', `${base},vc_vp9`, video.id, 'webm'), type: 'video/webm; codecs="vp9"' },
    { src: deliveryUrl('video', `${base},vc_h264`, video.id, 'mp4'), type: 'video/mp4' },
  ];
}

/**
 * Rendition width for a scroll-scrubbed film, from the viewport width in CSS
 * pixels. Pair it with `scrubVideoUrl()`.
 */
export function pickScrubWidth(viewportWidth) {
  return SCRUB_BREAKPOINTS.find(({ below }) => viewportWidth < below)?.width ?? SCRUB_MAX_WIDTH;
}

/**
 * A single silent H.264 rendition with a keyframe every 0.15s (`ki_`). Dense
 * keyframes make seeking cheap, which is what scroll-scrubbed video needs;
 * H.264 is hardware-decoded everywhere, so each seek paints quickly.
 */
export function scrubVideoUrl(video, { width = SCRUB_MAX_WIDTH } = {}) {
  return deliveryUrl(
    'video',
    `${trimTransformation(video)}${SCRUB_QUALITY},vc_h264,ac_none,ki_0.15,w_${width},c_limit`,
    video.id,
    'mp4',
  );
}

/** Poster frame for a `<video poster>` attribute. */
export function posterUrl(video, { width = 1600, offset = video.poster } = {}) {
  return deliveryUrl('video', `so_${offset},w_${width},c_limit,q_auto,f_auto`, video.id, 'jpg');
}

/**
 * Base URL for a still frame, meant to be handed to `next/image`. The
 * transformation lives in ONE path segment so the loader below can append the
 * requested width to it.
 *
 * @param {object} video   Entry from data/videos.js
 * @param {number} offset  Timestamp of the frame, in seconds
 * @param {object} [options]
 * @param {string} [options.aspect]  e.g. '4:5'. Omit to keep the 16:9 frame.
 * @param {string} [options.gravity] Cloudinary gravity, 'auto' by default
 */
export function stillUrl(video, offset, { aspect, gravity = 'auto' } = {}) {
  const crop = aspect ? `c_lfill,ar_${aspect},g_${gravity}` : 'c_limit';
  return deliveryUrl('video', `so_${offset},${crop}`, video.id, 'jpg');
}

/**
 * `next/image` loader for film stills (passed by components/video/VideoStill).
 * Appends width, automatic quality and automatic format to the single
 * transformation segment produced by `stillUrl()`.
 */
export default function cloudinaryLoader({ src, width, quality }) {
  const marker = '/upload/';
  const markerIndex = src.indexOf(marker);
  if (markerIndex === -1) return src;

  const segmentStart = markerIndex + marker.length;
  const segmentEnd = src.indexOf('/', segmentStart);
  const sizing = `w_${width},q_${quality || 'auto'},f_auto`;

  return `${src.slice(0, segmentEnd)},${sizing}${src.slice(segmentEnd)}`;
}
