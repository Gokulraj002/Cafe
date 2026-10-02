/**
 * One line of the origins ledger: where the coffee grows, how it tastes and
 * the particulars a coffee buyer would ask for.
 */
export default function OriginEntry({ number, country, region, producer, farm, altitude, variety, process, harvest, notes, story }) {
  const specs = [
    ['Producer', producer],
    ['Estate', farm],
    ['Altitude', altitude],
    ['Variety', variety],
    ['Process', process],
    ['Harvest', harvest],
  ];

  return (
    <li className="lux-origin">
      <span className="lux-origin__rule" aria-hidden="true" />
      <div className="lux-origin__content row gy-4 gx-lg-5">
        <div className="col-lg-4">
          <p className="lux-origin__number mb-0" aria-hidden="true">
            {String(number).padStart(2, '0')}
          </p>
          <h3 className="lux-origin__country type-title mb-0">{country}</h3>
          <p className="lux-origin__region mb-0">{region}</p>
        </div>

        <div className="col-lg-4">
          <ul className="lux-origin__notes list-unstyled mb-0" aria-label="Tasting notes">
            {notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
          <p className="lux-origin__story type-body mb-0">{story}</p>
        </div>

        <div className="col-lg-4">
          <dl className="lux-origin__specs mb-0">
            {specs.map(([term, value]) => (
              <div key={term} className="lux-origin__spec">
                <dt>{term}</dt>
                <dd className="mb-0">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </li>
  );
}
