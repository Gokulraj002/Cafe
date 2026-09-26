import { padNumber, parseRoast, ROAST_STEPS } from './formatters';

/**
 * A bag of beans drawn like its label: number and weight, name and origin,
 * tasting notes, process, a five-step roast scale and the price per bag.
 *
 * @param {object} bean   Entry from `beans` in data/content.js
 * @param {number} number Position in the range, from 1
 */
export default function BeanCard({ bean, number }) {
  const roast = parseRoast(bean.roast);

  return (
    <article className="cinema-bean">
      <p className="cinema-bean__label mb-0">
        <span>No. {padNumber(number)}</span>
        <span>{bean.weight}</span>
      </p>

      <div>
        <h3 className="type-title mb-2">{bean.name}</h3>
        <p className="cinema-bean__origin mb-0">{bean.origin}</p>
      </div>

      <ul className="cinema-chips list-unstyled mb-0" aria-label={`Tasting notes for ${bean.name}`}>
        {bean.notes.map((note) => (
          <li key={note} className="cinema-chip">
            {note}
          </li>
        ))}
      </ul>

      <dl className="cinema-bean__facts mb-0">
        <div>
          <dt>Process</dt>
          <dd>{bean.process}</dd>
        </div>
        <div>
          <dt>Roast</dt>
          <dd>
            <span className="cinema-roast" aria-hidden="true">
              {Array.from({ length: ROAST_STEPS }, (_, step) => (
                <span key={step} className={step < roast.level ? 'is-filled' : ''} />
              ))}
            </span>
            {roast.name}
            {roast.use && <span className="cinema-bean__use">, {roast.use}</span>}
          </dd>
        </div>
      </dl>

      <p className="cinema-bean__price mb-0">
        <span className="cinema-bean__amount">{bean.price}</span>
        <span className="cinema-bean__per">per bag</span>
      </p>
    </article>
  );
}
