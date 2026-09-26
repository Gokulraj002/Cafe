/** One bag of beans: where it comes from, how it tastes, how it is roasted and what it costs. */
export default function BeanCard({ name, origin, process, notes, roast, weight, price }) {
  return (
    <article className="imm-bean">
      <p className="type-eyebrow mb-2">{origin}</p>
      <h3 className="type-title mb-3">{name}</h3>

      <ul className="imm-bean__notes list-unstyled mb-4" aria-label="Tasting notes">
        {notes.map((note) => (
          <li key={note} className="imm-bean__note">
            {note}
          </li>
        ))}
      </ul>

      <dl className="imm-bean__facts mb-0">
        <div className="imm-bean__fact">
          <dt>Process</dt>
          <dd>{process}</dd>
        </div>
        <div className="imm-bean__fact">
          <dt>Roast</dt>
          <dd>{roast}</dd>
        </div>
        <div className="imm-bean__fact imm-bean__fact--price">
          <dt>{weight}</dt>
          <dd>{price}</dd>
        </div>
      </dl>
    </article>
  );
}
