'use client';

import { useRef } from 'react';

const DISMISS_FRACTION = 0.28; // of the panel's height
const DISMISS_VELOCITY = 0.55; // px per ms — a quick flick closes from anywhere
const FLICK_MIN_DISTANCE = 12;
const STALE_MOVE_MS = 90; // a finger that paused before lifting isn't flicking
const UPWARD_RESISTANCE = 0.12;

/**
 * Drag-down-to-dismiss for a bottom sheet. Spread the returned handlers on the
 * grab area (handle + header). While dragging, only the panel's transform and
 * the sheet's `--sheet-drag` (0 → 1, used to fade the backdrop) change — no
 * React state per pointer move.
 *
 * @param {object} refs
 * @param {{ current: HTMLElement | null }} refs.sheetRef Root; gets `.is-dragging`
 * @param {{ current: HTMLElement | null }} refs.panelRef The element that moves
 * @param {() => void} onDismiss
 */
export default function useSwipeToDismiss({ sheetRef, panelRef }, onDismiss) {
  const dragRef = useRef(null);

  function applyOffset(offset, height = 1) {
    panelRef.current.style.transform = offset ? `translate3d(0, ${offset}px, 0)` : '';
    sheetRef.current.style.setProperty('--sheet-drag', Math.min(1, Math.max(0, offset / height)).toFixed(3));
  }

  function handlePointerDown(event) {
    if (event.button !== 0 || event.target.closest('button, a, input, select, textarea')) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      startY: event.clientY,
      lastY: event.clientY,
      lastTime: event.timeStamp,
      velocity: 0,
      offset: 0,
      height: panelRef.current.offsetHeight,
    };
    sheetRef.current.classList.add('is-dragging');
  }

  function handlePointerMove(event) {
    const drag = dragRef.current;
    if (!drag) return;

    const distance = event.clientY - drag.startY;
    const elapsed = event.timeStamp - drag.lastTime;
    if (elapsed > 0) drag.velocity = (event.clientY - drag.lastY) / elapsed;
    drag.lastY = event.clientY;
    drag.lastTime = event.timeStamp;
    // The sheet is already fully open, so upward pulls only give a little.
    drag.offset = distance > 0 ? distance : distance * UPWARD_RESISTANCE;
    applyOffset(drag.offset, drag.height);
  }

  function handlePointerEnd(event) {
    const drag = dragRef.current;
    if (!drag) return;
    dragRef.current = null;

    const isFresh = event.timeStamp - drag.lastTime < STALE_MOVE_MS;
    const isFlick = isFresh && drag.velocity > DISMISS_VELOCITY && drag.offset > FLICK_MIN_DISTANCE;
    const isFarEnough = drag.offset > drag.height * DISMISS_FRACTION;

    // Hand the panel back to CSS: it transitions from where the finger left
    // it — to closed if dismissed, otherwise back to open.
    sheetRef.current.classList.remove('is-dragging');
    applyOffset(0);
    if (isFlick || isFarEnough) onDismiss();
  }

  return {
    onPointerDown: handlePointerDown,
    onPointerMove: handlePointerMove,
    onPointerUp: handlePointerEnd,
    onPointerCancel: handlePointerEnd,
  };
}
