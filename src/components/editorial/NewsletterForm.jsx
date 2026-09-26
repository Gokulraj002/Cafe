'use client';

import { useState } from 'react';
import cafe from '@/data/cafe';
import { newsletter } from '@/data/content';

/**
 * Sign-up for the monthly letter. Like the reservation form, it has no mail
 * provider behind it yet: submitting opens the visitor's email app with the
 * request addressed to the café — swap `handleSubmit` for the provider's API
 * when one is chosen.
 */
export default function NewsletterForm() {
  const [isSent, setIsSent] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    const email = new FormData(event.currentTarget).get('email');
    const subject = encodeURIComponent('Subscribe me to the Kela letter');
    const body = encodeURIComponent(`Please add ${email} to the monthly letter.`);
    window.location.href = `mailto:${cafe.contact.email}?subject=${subject}&body=${body}`;
    setIsSent(true);
  }

  return (
    <form className="ed-letter__form" onSubmit={handleSubmit}>
      <label className="form-label-cafe" htmlFor="letter-email">
        {newsletter.fieldLabel}
      </label>
      <div className="ed-letter__field">
        <input
          id="letter-email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          autoCapitalize="off"
          spellCheck={false}
          enterKeyHint="send"
          placeholder={newsletter.placeholder}
          className="form-control-cafe"
          required
        />
        <button type="submit" className="btn-cafe btn-cafe--solid">
          {newsletter.submitLabel}
        </button>
      </div>
      <p className="type-caption mt-3 mb-0" role="status">
        {isSent ? newsletter.success : newsletter.note}
      </p>
    </form>
  );
}
