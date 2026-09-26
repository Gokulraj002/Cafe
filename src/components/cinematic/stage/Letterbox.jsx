/**
 * Two charcoal bars that leave only a slit of film open, bronze hairlines on
 * their inner edges. The stage timeline slides them apart; the scroll cue
 * rides away on the lower bar. Decorative.
 */
export default function Letterbox() {
  return (
    <div className="lux-stage__letterbox" aria-hidden="true">
      <div className="lux-stage__bar lux-stage__bar--top" />
      <div className="lux-stage__bar lux-stage__bar--bottom">
        <p className="lux-stage__hint">
          Scroll to unveil
          <span className="lux-stage__hint-line" />
        </p>
      </div>
    </div>
  );
}
