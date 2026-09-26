'use client';

import { useId, useRef, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import Icon from './icons';
import useModalDialog from './useModalDialog';
import useSwipeToDismiss from './useSwipeToDismiss';

const subscribeToNothing = () => () => {};

/**
 * App-style bottom sheet: a modal dialog that slides up from the bottom edge
 * (a floating card from the md breakpoint up).
 *
 * Closes on Escape, the close button, a tap on the backdrop, or dragging the
 * handle/header down. Focus is trapped while open and the page stops
 * scrolling. Rendered into <body> so no transformed ancestor can trap it.
 *
 * @param {boolean} isOpen
 * @param {() => void} onClose
 * @param {string} title       Visible heading and the dialog's accessible name
 * @param {string} [eyebrow]   Small label above the title
 * @param {string} [theme]     Theme class for the panel, e.g. 'theme-ivory'
 */
export default function BottomSheet({ isOpen, onClose, title, eyebrow, theme = 'theme-ivory', className = '', children }) {
  const sheetRef = useRef(null);
  const panelRef = useRef(null);
  const titleId = useId();
  const isClient = useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false,
  );
  const dragHandlers = useSwipeToDismiss({ sheetRef, panelRef }, onClose);

  useModalDialog(panelRef, isOpen && isClient, onClose);

  if (!isClient) return null;

  return createPortal(
    <div ref={sheetRef} className={`sheet ${isOpen ? 'is-open' : ''} ${className}`} inert={!isOpen}>
      <div className="sheet__backdrop" onClick={onClose} aria-hidden="true" />

      <div
        ref={panelRef}
        className={`sheet__panel ${theme}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
      >
        <div className="sheet__grab" {...dragHandlers}>
          <span className="sheet__handle" aria-hidden="true" />
          <div className="sheet__header">
            <div>
              {eyebrow && <p className="type-eyebrow mb-2">{eyebrow}</p>}
              <h2 id={titleId} className="sheet__title">
                {title}
              </h2>
            </div>
            <button type="button" className="sheet__close" onClick={onClose} aria-label="Close" data-autofocus>
              <Icon name="close" size={20} />
            </button>
          </div>
        </div>

        <div className="sheet__body">{children}</div>
      </div>
    </div>,
    document.body,
  );
}
