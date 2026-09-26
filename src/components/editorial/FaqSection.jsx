import cafe from '@/data/cafe';
import { faq } from '@/data/content';
import FadeReveal from '@/components/animations/FadeReveal';
import SectionOpener from './SectionOpener';

/**
 * The small print — practical questions as a native details/summary
 * accordion. Opening one question closes the others (shared `name`), and
 * browsers that can animate `::details-content` slide the answer open.
 */
export default function FaqSection() {
  return (
    <section id="faq" className="section ed-section ed-faq theme-ivory" aria-labelledby="faq-title">
      <div className="container">
        <hr className="rule ed-faq__rule" />
        <div className="row gx-lg-5">
          <div className="col-lg-4">
            <SectionOpener label="The small print" titleId="faq-title" title="Questions, answered plainly." />
            <p className="ed-faq__contact type-body">
              Anything else? Write to{' '}
              <a href={`mailto:${cafe.contact.email}`} className="ed-faq__link">
                {cafe.contact.email}
              </a>{' '}
              — we reply within the day.
            </p>
          </div>

          <div className="col-lg-7 offset-lg-1">
            <FadeReveal className="ed-faq__list">
              {faq.map((item) => (
                <details key={item.id} name="faq" className="ed-faq__item">
                  <summary className="ed-faq__question">
                    <span>{item.question}</span>
                    <span className="ed-faq__icon" aria-hidden="true" />
                  </summary>
                  <p className="ed-faq__answer mb-0">{item.answer}</p>
                </details>
              ))}
            </FadeReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
