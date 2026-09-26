import Link from 'next/link';

const VARIANTS = {
  outline: '',
  solid: 'btn-cafe--solid',
  light: 'btn-cafe--light',
  text: 'btn-cafe--text',
};

/**
 * The one button style of the site. Renders a Next.js `Link` for internal
 * paths, a plain anchor for external/hash links, or a `<button>`.
 *
 * @param {'outline'|'solid'|'light'|'text'} [variant]
 * @param {boolean} [arrow] Adds a trailing arrow that nudges on hover
 */
export default function Button({ href, variant = 'outline', arrow = false, className = '', children, ...rest }) {
  const classes = `btn-cafe ${VARIANTS[variant]} ${className}`.trim();
  const content = (
    <>
      <span>{children}</span>
      {arrow && (
        <span className="btn-cafe__arrow" aria-hidden="true">
          →
        </span>
      )}
    </>
  );

  if (!href) {
    return (
      <button type="button" className={classes} {...rest}>
        {content}
      </button>
    );
  }

  const isInternalRoute = href.startsWith('/') && !href.startsWith('//');
  if (isInternalRoute) {
    return (
      <Link href={href} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  return (
    <a href={href} className={classes} {...rest}>
      {content}
    </a>
  );
}
