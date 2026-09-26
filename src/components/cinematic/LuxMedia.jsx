import Image from 'next/image';
import VideoStill from '@/components/video/VideoStill';

/**
 * One picture for Concept 01: either a photograph from data/images.js or a
 * still frame from one of the café films. Both fill their parent, so the
 * parent must be positioned and sized (`.media-frame` + a ratio class).
 *
 * @param {object} media   A photo entry (has `src`) or `{ video, moment }`
 * @param {string} [aspect] Crop ratio for film stills, e.g. '4:5' (photos are cropped by CSS)
 * @param {string} sizes    Standard `sizes` attribute — keep it accurate
 */
export default function LuxMedia({ media, aspect, sizes, className = '' }) {
  if (media.src) {
    return <Image src={media.src} alt={media.alt} fill sizes={sizes} className={className} />;
  }

  return <VideoStill video={media.video} moment={media.moment} aspect={aspect} sizes={sizes} className={className} />;
}
