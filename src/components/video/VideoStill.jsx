'use client';

import Image from 'next/image';
import cloudinaryLoader, { stillUrl } from '@/lib/cloudinary';

/**
 * A still frame from one of the café films, delivered through `next/image`
 * with Cloudinary doing the resizing (see the loader in lib/cloudinary.js).
 *
 * The parent must be positioned and sized — this renders with `fill`.
 *
 * @param {object} video    Entry from data/videos.js
 * @param {string} [moment] Key of `video.moments`; omit to use the poster frame
 * @param {string} [aspect] Crop ratio such as '4:5'; omit for the full frame
 * @param {string} [sizes]  Standard `sizes` attribute
 */
export default function VideoStill({ video, moment, aspect, gravity, sizes = '100vw', priority = false, alt, className = '' }) {
  const frame = moment ? video.moments[moment] : { offset: video.poster, alt: video.description };

  return (
    <Image
      loader={cloudinaryLoader}
      src={stillUrl(video, frame.offset, { aspect, gravity })}
      alt={alt ?? frame.alt}
      fill
      sizes={sizes}
      priority={priority}
      className={className}
    />
  );
}
