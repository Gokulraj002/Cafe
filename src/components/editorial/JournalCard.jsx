import Image from 'next/image';

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

/** '2026-09-18' → '18 September 2026', without locale APIs so server and client always agree. */
function formatDate(isoDate) {
  const [year, month, day] = isoDate.split('-').map(Number);
  return `${day} ${MONTHS[month - 1]} ${year}`;
}

/**
 * A journal story in the Kinfolk manner: plate, category and number, headline,
 * dek, then date and reading time.
 *
 * @param {object} story  Entry from `journal` in data/content.js
 * @param {object} photo  Entry from data/images.js
 * @param {number} index  Position in the journal, printed as "No. 01"
 * @param {string} sizes  `sizes` of the plate
 */
export default function JournalCard({ story, photo, index, sizes }) {
  return (
    <article className="ed-story">
      <div className="ed-story__media">
        <Image src={photo.src} alt={photo.alt} fill sizes={sizes} />
      </div>
      <div className="ed-story__body">
        <p className="ed-story__meta type-eyebrow mb-0">
          {story.category} <span aria-hidden="true">·</span> No. {String(index + 1).padStart(2, '0')}
        </p>
        <h3 className="ed-story__title">{story.title}</h3>
        <p className="ed-story__dek mb-0">{story.excerpt}</p>
        <p className="ed-story__footer type-caption mb-0">
          <time dateTime={story.date}>{formatDate(story.date)}</time> <span aria-hidden="true">·</span>{' '}
          {story.readTime} read
        </p>
      </div>
    </article>
  );
}
