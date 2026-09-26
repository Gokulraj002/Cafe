/** Growing facts shown on every origin card, in reading order. */
const FACTS = [
  { key: 'producer', label: 'Grown by' },
  { key: 'farm', label: 'Farm' },
  { key: 'altitude', label: 'Altitude' },
  { key: 'variety', label: 'Variety' },
  { key: 'process', label: 'Process' },
  { key: 'harvest', label: 'Harvest' },
];

/**
 * One single origin in the coffee sidebar: where it grows, who grows it, how
 * it tastes, and a line on how it is handled at the farm.
 *
 * @param {object} origin Entry from `origins` in data/content.js
 * @param {number} index  Position in the sidebar, printed as "No. 01"
 */
export default function OriginCard({ origin, index }) {
  return (
    <article className="ed-origin">
      <p className="ed-origin__meta type-eyebrow mb-0">
        No. {String(index + 1).padStart(2, '0')} <span aria-hidden="true">·</span> {origin.region}
      </p>
      <h4 className="ed-origin__country">{origin.country}</h4>
      <p className="ed-origin__notes">{origin.notes.join(' · ')}</p>

      <dl className="ed-origin__facts">
        {FACTS.map(({ key, label }) => (
          <div key={key} className="ed-origin__fact">
            <dt>{label}</dt>
            <dd>{origin[key]}</dd>
          </div>
        ))}
      </dl>

      <p className="ed-origin__story mb-0">{origin.story}</p>
    </article>
  );
}
