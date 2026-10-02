import cafe, { mapsUrl } from '@/data/cafe';
import cafeVideos from '@/data/videos';
import SectionHeading from '@/components/common/SectionHeading';
import Button from '@/components/common/Button';
import FadeReveal from '@/components/animations/FadeReveal';
import VideoStill from '@/components/video/VideoStill';
import Icon from '@/components/mobile/icons';
import RevealFrame from './RevealFrame';

/**
 * The visit details set like a film's closing credits, under the film's
 * last frame: role on the left, name on the right, centred on the page.
 * Directions and a reservation sit directly under the title, in thumb reach.
 */
export default function VisitCredits() {
  const { address, hours, hoursNote, contact, amenities } = cafe;

  return (
    <section id="visit" className="section cinema-visit theme-espresso" aria-labelledby="visit-title">
      <div className="container">
        <RevealFrame drift className="cinema-visit__frame">
          <VideoStill
            video={cafeVideos.concept2}
            moment="cafe"
            sizes="(min-width: 1400px) 1320px, (min-width: 768px) 100vw, 130vw"
          />
        </RevealFrame>

        <SectionHeading
          id="visit-title"
          eyebrow="Visit — The final chapter"
          title="The sixth chapter is yours."
          intro={address.directions}
          align="center"
          className="cinema-visit__heading"
        />

        <FadeReveal className="cinema-visit__actions">
          <Button href={mapsUrl()} variant="solid" target="_blank" rel="noopener noreferrer">
            <Icon name="pin" size={18} />
            Get directions
          </Button>
          <Button href="#reserve" data-reserve-sheet>
            <Icon name="calendar" size={18} />
            Reserve a table
          </Button>
        </FadeReveal>

        <FadeReveal as="dl" stagger y={20} className="cinema-credits">
          <div className="cinema-credits__row">
            <dt>Address</dt>
            <dd>
              {address.street}
              <br />
              {address.area}, {address.city}&nbsp;{address.postcode}
            </dd>
          </div>
          <div className="cinema-credits__row">
            <dt>Hours</dt>
            <dd>
              {hours.map((entry) => (
                <span key={entry.days} className="cinema-credits__hours">
                  {entry.days} <span className="cinema-credits__time">{entry.time}</span>
                </span>
              ))}
              <span className="cinema-credits__small">{hoursNote}</span>
            </dd>
          </div>
          <div className="cinema-credits__row">
            <dt>Telephone</dt>
            <dd>
              <a href={`tel:${contact.phone.replace(/\s/g, '')}`}>{contact.phone}</a>
            </dd>
          </div>
          <div className="cinema-credits__row">
            <dt>Email</dt>
            <dd>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </dd>
          </div>
          <div className="cinema-credits__row">
            <dt>Good to know</dt>
            <dd>
              <ul className="list-unstyled mb-0">
                {amenities.map((amenity) => (
                  <li key={amenity} className="cinema-credits__small">
                    {amenity}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        </FadeReveal>
      </div>
    </section>
  );
}
