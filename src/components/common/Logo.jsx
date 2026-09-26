import Link from 'next/link';
import cafe from '@/data/cafe';

/** Typographic wordmark. Links to the top of the current concept by default. */
export default function Logo({ href = '/', className = '', onClick }) {
  return (
    <Link href={href} className={`cafe-logo ${className}`} aria-label={`${cafe.name} — home`} onClick={onClick}>
      <span className="cafe-logo__mark" aria-hidden="true">
        ML
      </span>
      <span className="cafe-logo__name">{cafe.name}</span>
    </Link>
  );
}
