import Image from 'next/image';
import { privateHire } from '@/data/content';
import photos from '@/data/images';
import Button from '@/components/common/Button';
import FadeReveal from '@/components/animations/FadeReveal';
import RevealFrame from './RevealFrame';

const { goldenHourRoom } = photos;
const enquiryHref = `mailto:${privateHire.email}?subject=${encodeURIComponent(privateHire.emailSubject)}`;

/**
 * Private hire, billed as a private screening: the room after hours, the two
 * spaces on offer, what is included and an enquiry by email.
 */
export default function PrivateScreening() {
  return (
    <div className="cinema-screening row g-0">
      <div className="col-lg-6">
        <RevealFrame className="cinema-screening__photo">
          <Image src={goldenHourRoom.src} alt={goldenHourRoom.alt} fill sizes="(min-width: 992px) 50vw, 100vw" />
        </RevealFrame>
      </div>

      <FadeReveal className="cinema-screening__body col-lg-6">
        <p className="type-eyebrow mb-3">{privateHire.eyebrow} — Private screenings</p>
        <h3 className="type-title mb-3">{privateHire.title}</h3>
        <p className="type-body mb-0">{privateHire.text}</p>

        <dl className="cinema-screening__spaces">
          {privateHire.spaces.map((space) => (
            <div key={space.name}>
              <dt>{space.name}</dt>
              <dd className="mb-0">
                {space.capacity}
                <span className="cinema-screening__when">{space.availability}</span>
              </dd>
            </div>
          ))}
        </dl>

        <ul className="cinema-screening__includes list-unstyled">
          {privateHire.includes.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <div className="cinema-screening__cta">
          <Button href={enquiryHref} variant="solid" arrow>
            {privateHire.ctaLabel}
          </Button>
          <p className="type-caption mb-0">{privateHire.note}</p>
        </div>
      </FadeReveal>
    </div>
  );
}
