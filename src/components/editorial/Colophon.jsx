import { newsletter } from '@/data/content';
import FadeReveal from '@/components/animations/FadeReveal';
import NewsletterForm from './NewsletterForm';
import { ISSUE, ISSUE_PHOTOS } from './issue';

/** Each photographer in this issue once, in order of appearance. */
const photographers = [...new Map(ISSUE_PHOTOS.map(({ credit }) => [credit.name, credit])).values()];

/**
 * The back page: sign-up for the monthly letter beside the colophon, which
 * credits every photographer printed in the issue.
 */
export default function Colophon() {
  return (
    <section id="letter" className="section section--tight ed-section ed-colophon theme-cream" aria-labelledby="letter-title">
      <div className="container">
        <div className="row gx-lg-5 gy-5">
          <FadeReveal className="col-lg-6">
            <p className="type-eyebrow">{newsletter.eyebrow}</p>
            <h2 id="letter-title" className="ed-colophon__title">
              {newsletter.title}
            </h2>
            <p className="type-body ed-colophon__text">{newsletter.text}</p>
            <NewsletterForm />
          </FadeReveal>

          <div className="col-lg-4 offset-lg-2">
            <FadeReveal as="aside" className="ed-colophon__credits" delay={0.1}>
              <h3 className="type-eyebrow mb-2">Colophon</h3>
              <p className="type-caption">
                {ISSUE.title} · Issue {ISSUE.number} · {ISSUE.season}. Moving pictures from the Maison Lente house films. Set
                in Cormorant Garamond and Manrope.
              </p>
              <p className="type-caption mb-2">Photography, used under the Unsplash License:</p>
              <ul className="ed-colophon__list list-unstyled mb-0">
                {photographers.map((credit) => (
                  <li key={credit.name}>
                    <a href={credit.url} target="_blank" rel="noopener noreferrer" className="ed-colophon__link">
                      {credit.name}
                    </a>
                  </li>
                ))}
              </ul>
            </FadeReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
