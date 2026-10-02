import Image from 'next/image';
import { formatDate } from '@/lib/format';

/**
 * One journal story. The featured one leads with a wide cover; the others
 * are compact rows with a square thumbnail, like a news feed.
 *
 * @param {object}  entry      Entry from `journal` in data/content.js
 * @param {object}  cover      Photo entry from data/images.js
 * @param {boolean} [featured]
 */
export default function JournalEntry({ entry, cover, featured = false }) {
  return (
    <article className={`cinema-entry ${featured ? 'cinema-entry--featured' : ''}`}>
      <div className="cinema-entry__cover media-frame">
        <Image
          src={cover.src}
          alt={cover.alt}
          fill
          sizes={featured ? '(min-width: 992px) 55vw, 100vw' : '(min-width: 992px) 136px, 88px'}
        />
      </div>

      <div className="cinema-entry__body">
        <p className="cinema-entry__meta mb-2">
          {entry.category} <span aria-hidden="true">·</span> <time dateTime={entry.date}>{formatDate(entry.date)}</time>
        </p>
        <h3 className={`cinema-entry__title mb-2 ${featured ? 'type-title' : ''}`}>{entry.title}</h3>
        <p className="cinema-entry__excerpt mb-2">{entry.excerpt}</p>
        <p className="cinema-entry__read mb-0">{entry.readTime} read</p>
      </div>
    </article>
  );
}
