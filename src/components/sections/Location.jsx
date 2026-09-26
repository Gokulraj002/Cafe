import cafe, { mapsUrl } from '@/data/cafe';
import SectionHeading from '@/components/common/SectionHeading';
import Button from '@/components/common/Button';
import FadeReveal from '@/components/animations/FadeReveal';
import ImageReveal from '@/components/animations/ImageReveal';

/**
 * Address, opening hours and contact details beside a film still.
 *
 * @param {{video: object, moment: string}} still Frame to show
 */
export default function Location({
  id = 'visit',
  eyebrow = 'Visit',
  title = 'Find your seat by the window.',
  theme = 'theme-ivory',
  still,
  className = '',
}) {
  const { address, hours, contact } = cafe;

  return (
    <section id={id} className={`section location ${theme} ${className}`} aria-labelledby={`${id}-title`}>
      <div className="container">
        <div className="row g-5 align-items-center">
          <div className="col-lg-6 order-lg-2">
            {still && (
              <ImageReveal
                video={still.video}
                moment={still.moment}
                aspect="4:5"
                sizes="(min-width: 992px) 50vw, 100vw"
                className="ratio-portrait"
                drift
              />
            )}
          </div>

          <div className="col-lg-5 order-lg-1">
            <SectionHeading id={`${id}-title`} eyebrow={eyebrow} title={title} />

            <FadeReveal stagger className="location__details mt-5">
              <address className="location__block mb-0">
                <h3 className="type-eyebrow mb-2">Address</h3>
                <p className="type-lead mb-0">
                  {address.street}
                  <br />
                  {address.area}, {address.city}
                </p>
              </address>

              <div className="location__block">
                <h3 className="type-eyebrow mb-2">Hours</h3>
                <dl className="location__hours mb-0">
                  {hours.map((entry) => (
                    <div key={entry.days} className="location__hours-row">
                      <dt>{entry.days}</dt>
                      <dd className="mb-0">{entry.time}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="location__block">
                <h3 className="type-eyebrow mb-2">Contact</h3>
                <p className="mb-0">
                  <a href={`tel:${contact.phone.replace(/\s/g, '')}`}>{contact.phone}</a>
                  <br />
                  <a href={`mailto:${contact.email}`}>{contact.email}</a>
                </p>
              </div>

              <div>
                <Button href={mapsUrl()} variant="text" arrow target="_blank" rel="noopener noreferrer">
                  Get directions
                </Button>
              </div>
            </FadeReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
