'use client';

import { useEffect, useEffectEvent } from 'react';

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

// Several dialogs may be open at once (a sheet above the menu); the page
// stays locked until the last one closes.
let openDialogCount = 0;

function lockPageScroll() {
  openDialogCount += 1;
  document.body.classList.add('is-locked');
}

function unlockPageScroll() {
  openDialogCount = Math.max(0, openDialogCount - 1);
  if (openDialogCount === 0) document.body.classList.remove('is-locked');
}

/**
 * Modal behaviour for a dialog element while it is open: focus moves inside
 * (to `[data-autofocus]`, else the first focusable element), Tab is trapped,
 * Escape closes, the page behind stops scrolling, and focus returns to
 * whatever opened the dialog once it closes.
 *
 * @param {{ current: HTMLElement | null }} dialogRef
 * @param {boolean} isOpen
 * @param {() => void} onClose
 */
export default function useModalDialog(dialogRef, isOpen, onClose) {
  const requestClose = useEffectEvent(onClose);

  useEffect(() => {
    if (!isOpen) return undefined;

    const dialog = dialogRef.current;
    const opener = document.activeElement;
    const focusable = () => [...dialog.querySelectorAll(FOCUSABLE)];
    const initialFocus = dialog.querySelector('[data-autofocus]') ?? focusable()[0] ?? dialog;
    initialFocus.focus({ preventScroll: true });
    lockPageScroll();

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        requestClose();
        return;
      }
      if (event.key !== 'Tab') return;

      const items = focusable();
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      unlockPageScroll();
      if (opener instanceof HTMLElement && opener.isConnected) opener.focus({ preventScroll: true });
    };
  }, [dialogRef, isOpen]);
}
