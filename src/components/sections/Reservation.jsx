import SectionHeading from '@/components/common/SectionHeading';
import FadeReveal from '@/components/animations/FadeReveal';
import ReservationForm from './ReservationForm';

/**
 * Reservation section: heading and intro beside the table request form.
 * The same form also lives in the mobile tab bar's "Reserve" sheet.
 */
export default function Reservation({
  id = 'reserve',
  eyebrow = 'Reservations',
  title = 'Your table is waiting.',
  intro = 'Walk-ins are always welcome. For groups of six or more, the long table or a private event, send us a note.',
  theme = 'theme-espresso',
  className = '',
}) {
  return (
    <section id={id} className={`section reservation ${theme} ${className}`} aria-labelledby={`${id}-title`}>
      <div className="container">
        <div className="row g-5 justify-content-between">
          <div className="col-lg-5">
            <SectionHeading id={`${id}-title`} eyebrow={eyebrow} title={title} intro={intro} />
          </div>

          <div className="col-lg-6">
            <FadeReveal>
              <ReservationForm idPrefix={id} />
            </FadeReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
