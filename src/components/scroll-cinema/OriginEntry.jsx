import { altitudeShare, padNumber, parseAltitude } from './formatters';

/**
 * One coffee origin as a spec sheet: country and farm, tasting notes, the
 * story, then altitude (drawn on the list's shared scale), process, variety,
 * harvest and producer.
 *
 * @param {object} origin Entry from `origins` in data/content.js
 * @param {number} number Position in the list, from 1
 */
export default function OriginEntry({ origin, number }) {
  const { low, high } = parseAltitude(origin.altitude);
  const altitudeRange = { '--from': altitudeShare(low), '--to': altitudeShare(high) };

  return (
    <li className="cinema-origin">
      <div className="cinema-origin__head">
        <span className="cinema-origin__number" aria-hidden="true">
          {padNumber(number)}
        </span>
        <div>
          <h3 className="type-title mb-1">{origin.country}</h3>
          <p className="cinema-origin__region mb-0">
            {origin.region} <span aria-hidden="true">·</span> {origin.farm}
          </p>
        </div>
      </div>

      <ul className="cinema-chips list-unstyled" aria-label={`Tasting notes for ${origin.country}`}>
        {origin.notes.map((note) => (
          <li key={note} className="cinema-chip">
            {note}
          </li>
        ))}
      </ul>

      <p className="type-body mb-0">{origin.story}</p>

      <dl className="cinema-origin__specs mb-0">
        <div className="cinema-origin__spec cinema-origin__spec--wide">
          <dt>Altitude</dt>
          <dd>
            {origin.altitude}
            <span className="cinema-altitude" style={altitudeRange} aria-hidden="true">
              <span className="cinema-altitude__fill" />
            </span>
          </dd>
        </div>
        <div className="cinema-origin__spec">
          <dt>Process</dt>
          <dd>{origin.process}</dd>
        </div>
        <div className="cinema-origin__spec">
          <dt>Variety</dt>
          <dd>{origin.variety}</dd>
        </div>
        <div className="cinema-origin__spec">
          <dt>Harvest</dt>
          <dd>{origin.harvest}</dd>
        </div>
        <div className="cinema-origin__spec">
          <dt>Grown by</dt>
          <dd>{origin.producer}</dd>
        </div>
      </dl>
    </li>
  );
}
