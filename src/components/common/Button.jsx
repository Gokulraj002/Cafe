const VARIANTS = {
  outline: '',
  solid: 'btn-cafe--solid',
  light: 'btn-cafe--light',
  text: 'btn-cafe--text',
};

/**
 * The one button style of the site. Renders an anchor when given `href`,
 * otherwise a `<button>`. Links between concepts are plain anchors on purpose:
 * each concept builds its own pinned ScrollTrigger scenes, and a full page load
 * starts the next one from a clean slate at the top of the page.
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

  return (
    <a href={href} className={classes} {...rest}>
      {content}
    </a>
  );
}
