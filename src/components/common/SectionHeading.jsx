import FadeReveal from '@/components/animations/FadeReveal';
import TextReveal from '@/components/animations/TextReveal';

/**
 * Eyebrow + headline + optional intro, with scroll reveals.
 *
 * @param {string} [eyebrow]   Small caps label, e.g. "02 — The Coffee"
 * @param {string} title
 * @param {string} [intro]
 * @param {'start'|'center'} [align]
 * @param {string} [as]        Heading level, h2 by default
 * @param {string} [titleClassName] Type scale, `type-headline` by default
 */
export default function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'start',
  as = 'h2',
  id,
  titleClassName = 'type-headline',
  className = '',
}) {
  return (
    <div className={`section-heading ${align === 'center' ? 'section-heading--center' : ''} ${className}`}>
      {eyebrow && (
        <FadeReveal as="p" className="type-eyebrow mb-0" y={16}>
          {eyebrow}
        </FadeReveal>
      )}
      <TextReveal as={as} id={id} className={titleClassName}>
        {title}
      </TextReveal>
      {intro && (
        <FadeReveal as="p" className="section-heading__intro type-body mb-0" delay={0.15}>
          {intro}
        </FadeReveal>
      )}
    </div>
  );
}
