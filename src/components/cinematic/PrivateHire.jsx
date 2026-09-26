import { privateHire } from '@/data/content';
import Button from '@/components/common/Button';
import FadeReveal from '@/components/animations/FadeReveal';

const enquiry = `mailto:${privateHire.email}?subject=${encodeURIComponent(privateHire.emailSubject)}`;

/** The after-hours offer that closes the events section: two spaces and one way to ask. */
export default function PrivateHire() {
  return (
    <FadeReveal className="lux-hire">
      <div className="row gy-4 gx-lg-5">
        <div className="col-lg-6">
          <p className="type-eyebrow mb-3">{privateHire.eyebrow}</p>
          <h3 className="type-title mb-3">{privateHire.title}</h3>
          <p className="type-body mb-0">{privateHire.text}</p>
        </div>

        <div className="col-lg-5 offset-lg-1">
          <dl className="lux-hire__spaces mb-0">
            {privateHire.spaces.map((space) => (
              <div key={space.name} className="lux-hire__space">
                <dt>{space.name}</dt>
                <dd className="mb-0">
                  {space.capacity}
                  <br />
                  <span className="lux-hire__availability">{space.availability}</span>
                </dd>
              </div>
            ))}
          </dl>
          <p className="type-caption mt-3 mb-4">{privateHire.note}</p>
          <Button href={enquiry} variant="outline" arrow>
            {privateHire.ctaLabel}
          </Button>
        </div>
      </div>
    </FadeReveal>
  );
}
