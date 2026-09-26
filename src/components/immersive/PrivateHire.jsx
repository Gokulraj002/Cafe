import { privateHire } from '@/data/content';
import photos from '@/data/images';
import SectionHeading from '@/components/common/SectionHeading';
import FadeReveal from '@/components/animations/FadeReveal';
import FrameReveal from './FrameReveal';
import MomentMedia from './MomentMedia';

const enquiryHref = `mailto:${privateHire.email}?subject=${encodeURIComponent(privateHire.emailSubject)}`;

/** The café after hours: the two spaces, what the evening includes and how to ask for a date. */
export default function PrivateHire() {
  const { eyebrow, title, text, spaces, includes, note, ctaLabel } = privateHire;

  return (
    <section id="private-hire" className="section imm-hire theme-charcoal" aria-labelledby="private-hire-title">
      <div className="container">
        <div className="row g-5 align-items-center">
          <div className="col-lg-6">
            <FrameReveal>
              <MomentMedia
                media={{ photo: photos.banquetteWindow }}
                sizes="(min-width: 992px) 50vw, 100vw"
                className="imm-hire__photo"
              />
            </FrameReveal>
          </div>

          <div className="col-lg-5 offset-lg-1">
            <SectionHeading id="private-hire-title" eyebrow={eyebrow} title={title} intro={text} />

            <FadeReveal stagger className="mt-5">
              <ul className="imm-hire__spaces list-unstyled mb-4">
                {spaces.map((space) => (
                  <li key={space.name} className="imm-hire__space">
                    <h3 className="imm-hire__space-name mb-1">{space.name}</h3>
                    <p className="mb-0">{space.capacity}</p>
                    <p className="imm-hire__space-when mb-0">{space.availability}</p>
                  </li>
                ))}
              </ul>

              <ul className="imm-hire__includes list-unstyled mb-4">
                {includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <p className="type-caption mb-4">{note}</p>

              <div>
                <a href={enquiryHref} className="btn-cafe btn-cafe--solid imm-btn">
                  {ctaLabel}
                </a>
              </div>
            </FadeReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
