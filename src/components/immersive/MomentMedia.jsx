import Image from 'next/image';
import VideoStill from '@/components/video/VideoStill';

/**
 * A rounded frame holding either a photograph from data/images.js or a still
 * from one of the café films, so sections can mix both freely.
 *
 * Size the frame with `className` (e.g. "ratio-portrait") or through CSS.
 *
 * @param {{photo?: object, video?: object, moment?: string}} media
 *   `{ photo }` for a photograph, `{ video, moment }` for a film still
 * @param {string} sizes   Standard `sizes` attribute — keep it accurate
 * @param {string} [aspect] Crop ratio for film stills, e.g. '4:5'
 */
export default function MomentMedia({ media, sizes, aspect, className = '' }) {
  return (
    <div className={`imm-frame media-frame ${className}`}>
      {media.photo ? (
        <Image src={media.photo.src} alt={media.photo.alt} fill sizes={sizes} className="imm-frame__image" />
      ) : (
        <VideoStill video={media.video} moment={media.moment} aspect={aspect} sizes={sizes} className="imm-frame__image" />
      )}
    </div>
  );
}
