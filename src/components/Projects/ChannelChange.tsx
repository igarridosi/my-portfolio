import { useCallback, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

/* ---------------------------------------------------------------------------
   Changing channel between the portfolio and a project.

   What switches off is the whole tube - everything below the address bar, not
   just the set that was clicked - because that is what makes it read as the
   screen changing channel rather than a picture being enlarged.

   One box does the journey in both directions: it collapses into a bright
   line where it starts, the line crosses to where it is going and takes that
   width, and the window opens from it. The middle of the journey is a line,
   and a line has no proportions, so nothing ever has to be reconciled between
   a page and a dialog. Going back is the same move with the ends swapped.
   --------------------------------------------------------------------------- */

/** The whole journey, one way. */
export const CHANNEL_MS = 1100;

/** When the destination is put in place behind the box, as a fraction of it. */
const HANDOVER_AT = 0.76;

type Rect = { x: number; y: number; w: number; h: number };

const PANEL_RATIO = 1.67;

/** Where the gallery panel will be. It is not mounted when the box sets off,
    so its box is derived from the rules it lays itself out by: centred, inset
    by the dialog's padding, and no wider than 96vw. Its height is content-led
    and cannot be read in advance, but its layout is fixed - a 4:3 picture
    beside a description column of set width - so its shape is near enough
    constant to aim at. */
const panelRect = (): Rect => {
  const vw = document.documentElement.clientWidth;
  const vh = document.documentElement.clientHeight;
  const pad = vw >= 640 ? 16 : 8;
  const w = Math.min(vw - pad * 2, vw * 0.96);
  const h = Math.min(w / PANEL_RATIO, vh - pad * 2);
  return { x: (vw - w) / 2, y: (vh - h) / 2, w, h };
};

const rectOf = (el: Element): Rect => {
  const r = el.getBoundingClientRect();
  return { x: r.left, y: r.top, w: r.width, h: r.height };
};

/* No picture travels. The box starts over the whole page, so putting the
   project's poster in it stretched a 4:3 screenshot across the width of the
   window for a frame before the collapse - the leak. What switches off is a
   screen, and a screen that is off is dark. */
type Trip = { from: Rect; to: Rect };

/** The box in transit, on `document.body` so that neither the clipped page it
    leaves nor the dialog it arrives in can cut it off, and above both so it
    still shows once the destination is in place underneath. */
const TripPortal = ({ trip }: { trip: Trip }) =>
  createPortal(
    <div
      className="tv-flight"
      aria-hidden="true"
      style={
        {
          '--from-x': trip.from.x + 'px',
          '--from-y': trip.from.y + 'px',
          '--from-w': trip.from.w + 'px',
          '--from-h': trip.from.h + 'px',
          '--to-x': trip.to.x + 'px',
          '--to-y': trip.to.y + 'px',
          '--to-w': trip.to.w + 'px',
          '--to-h': trip.to.h + 'px',
          '--flight-ms': CHANNEL_MS + 'ms',
        } as React.CSSProperties
      }
    />,
    document.body,
  );

/**
 * Drives the change in both directions.
 *
 * The tube is switched off by hand rather than through React state: it lives
 * in the app shell, several levels above whatever is using this, and threading
 * a flag up there to hide it would be a lot of plumbing for a decoration. The
 * box covers it exactly at the moment it goes, so the switch is never seen.
 */
export const useChannelChange = () => {
  const [trip, setTrip] = useState<Trip | null>(null);
  const busy = useRef(false);

  const tube = () => document.querySelector('.crt-tube');

  const run = useCallback((next: Trip, onHandover: () => void) => {
    busy.current = true;
    setTrip(next);
    setTimeout(onHandover, CHANNEL_MS * HANDOVER_AT);
    setTimeout(() => {
      setTrip(null);
      busy.current = false;
    }, CHANNEL_MS);
  }, []);

  /** Portfolio off, project on. */
  const toProject = useCallback(
    (open: () => void) => {
      const el = tube();
      if (busy.current || !el) {
        open();
        return;
      }
      const from = rectOf(el);
      el.classList.add('is-blank');
      run({ from, to: panelRect() }, open);
    },
    [run],
  );

  /** Project off, portfolio back on. */
  const toPortfolio = useCallback(() => {
    const el = tube();
    if (busy.current || !el) {
      el?.classList.remove('is-blank');
      return;
    }
    // The tube is still blank, so its box is measured where it will reappear.
    const to = rectOf(el);
    el.classList.add('is-blank');
    run({ from: panelRect(), to }, () => el.classList.remove('is-blank'));
  }, [run]);

  return { trip, toProject, toPortfolio, portal: trip ? <TripPortal trip={trip} /> : null };
};
