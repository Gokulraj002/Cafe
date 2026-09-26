'use client';

import { useEffect, useState } from 'react';
import cafe from '@/data/cafe';

const TIMES = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];
const PARTY_SIZES = ['1', '2', '3', '4', '5', '6'];

// Bootstrap classes per field: roomy on the page, one thumb-wide column in a sheet.
const LAYOUTS = {
  full: {
    gutter: 'g-4',
    name: 'col-sm-6',
    email: 'col-sm-6',
    date: 'col-sm-4',
    time: 'col-6 col-sm-4',
    guests: 'col-6 col-sm-4',
    actions: 'flex-column flex-sm-row align-items-sm-center gap-3 gap-sm-4',
  },
  compact: {
    gutter: 'g-3',
    name: 'col-12',
    email: 'col-12',
    date: 'col-6',
    time: 'col-3',
    guests: 'col-3',
    actions: 'flex-column gap-3',
  },
};

/**
 * Table request form. Without a booking backend yet, submitting opens the
 * visitor's email app with the request pre-filled for the reservations
 * address in data/cafe.js — swap `handleSubmit` for a booking provider when
 * one is chosen.
 *
 * @param {string} [idPrefix] Prefix for every field id — must be unique per page
 * @param {boolean} [compact] Single-column layout with a sticky submit button, for sheets
 */
export default function ReservationForm({ idPrefix = 'reserve', compact = false, className = '' }) {
  const [isSent, setIsSent] = useState(false);
  // Set after mount so the server's clock never disagrees with the visitor's.
  const [today, setToday] = useState();
  const layout = compact ? LAYOUTS.compact : LAYOUTS.full;
  const fieldId = (name) => `${idPrefix}-${name}`;

  useEffect(() => {
    setToday(new Date().toLocaleDateString('en-CA'));
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const subject = `Table request — ${data.date} at ${data.time}, ${data.guests} guests`;
    const body = [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Date: ${data.date}`,
      `Time: ${data.time}`,
      `Guests: ${data.guests}`,
      data.note ? `Note: ${data.note}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    window.location.href = `mailto:${cafe.contact.reservationsEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setIsSent(true);
  }

  return (
    <form className={`reservation-form ${compact ? 'reservation-form--compact' : ''} ${className}`} onSubmit={handleSubmit}>
      <div className={`row ${layout.gutter}`}>
        <div className={layout.name}>
          <label className="form-label-cafe" htmlFor={fieldId('name')}>
            Name
          </label>
          <input
            id={fieldId('name')}
            name="name"
            className="form-control-cafe"
            autoComplete="name"
            autoCapitalize="words"
            enterKeyHint="next"
            required
          />
        </div>
        <div className={layout.email}>
          <label className="form-label-cafe" htmlFor={fieldId('email')}>
            Email
          </label>
          <input
            id={fieldId('email')}
            name="email"
            type="email"
            inputMode="email"
            className="form-control-cafe"
            autoComplete="email"
            autoCapitalize="off"
            spellCheck={false}
            enterKeyHint="next"
            required
          />
        </div>
        <div className={layout.date}>
          <label className="form-label-cafe" htmlFor={fieldId('date')}>
            Date
          </label>
          <input id={fieldId('date')} name="date" type="date" min={today} className="form-control-cafe" required />
        </div>
        <div className={layout.time}>
          <label className="form-label-cafe" htmlFor={fieldId('time')}>
            Time
          </label>
          <select id={fieldId('time')} name="time" className="form-control-cafe" defaultValue="10:00">
            {TIMES.map((time) => (
              <option key={time}>{time}</option>
            ))}
          </select>
        </div>
        <div className={layout.guests}>
          <label className="form-label-cafe" htmlFor={fieldId('guests')}>
            Guests
          </label>
          <select id={fieldId('guests')} name="guests" className="form-control-cafe" defaultValue="2">
            {PARTY_SIZES.map((size) => (
              <option key={size}>{size}</option>
            ))}
          </select>
        </div>
        <div className="col-12">
          <label className="form-label-cafe" htmlFor={fieldId('note')}>
            Anything we should know? <span className="text-lowercase">(optional)</span>
          </label>
          <textarea id={fieldId('note')} name="note" rows={2} className="form-control-cafe" />
        </div>
        <div className={`reservation-form__actions col-12 d-flex pt-2 ${layout.actions}`}>
          <button type="submit" className="btn-cafe btn-cafe--solid">
            <span>Reserve a table</span>
            <span className="btn-cafe__arrow" aria-hidden="true">
              →
            </span>
          </button>
          <p className="type-caption mb-0" role="status">
            {isSent
              ? 'Your email app should open with the request — we reply within the day.'
              : `Or call us on ${cafe.contact.phone}.`}
          </p>
        </div>
      </div>
    </form>
  );
}
