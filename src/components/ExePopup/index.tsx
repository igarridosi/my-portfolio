import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

/* ---------------------------------------------------------------------------
   The way to the other portfolio, exe.ibaigarrido.dev.

   Two states of one thing. Most of the time it is a narrow tab tucked against
   the right-hand edge of the screen: always there, never in the way. Once per
   visit - after eight seconds, or once the visitor has read 40% of the page -
   it slides out of that edge into a card in the bottom-right corner, and
   closing the card slides it back into the tab.

   The card is a non-modal <dialog>. It sits in a corner and the page around
   it stays usable, so it does not take focus when it appears by itself:
   someone typing into the contact form would otherwise have their keystrokes
   land in it. It does take focus when the visitor asks for it from the tab.

   Following the link does not cut to the new site. The set is switched off -
   the picture closes to a line, the line to a dot, the dot fades - and the
   other channel is tuned in on the dark screen before the browser leaves.
   --------------------------------------------------------------------------- */

const EXE_URL = 'https://exe.ibaigarrido.dev';
const DELAY_MS = 8000;
const SCROLL_FRACTION = 0.4;
/** How long to wait before trying again when something else has the screen. */
const BUSY_RETRY_MS = 1500;
/** Must match the slide back into the tab in index.css. */
const COLLAPSE_MS = 280;
/** From the first frame of the switch-off to the browser leaving. Long enough
    to read as a set being turned off and retuned, not as a page being cut. */
const TUNE_MS = 2200;
/** Without the motion it is only a fade to black and the caption. */
const TUNE_MS_REDUCED = 700;

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Something else is using the screen: the project viewer is open, the box is
    travelling into or out of it, or the page is changing channel. */
const screenBusy = () =>
  document.querySelector('[aria-modal="true"], .tv-flight, .tt-wipe') !== null;

/** On a desktop the page itself does not scroll - the content column does -
    so both are measured. */
const readFraction = (target: EventTarget | null): number => {
  const el =
    target === document
      ? document.scrollingElement
      : target instanceof HTMLElement && target.id === 'main'
        ? target
        : null;
  if (!el) return 0;
  const range = el.scrollHeight - el.clientHeight;
  return range > 0 ? el.scrollTop / range : 0;
};

/** Opens the connection to the other site as soon as the card is on screen,
    so that by the end of the switch-off there is no wait left. */
let preconnected = false;
const preconnect = () => {
  if (preconnected) return;
  preconnected = true;
  const link = document.createElement('link');
  link.rel = 'preconnect';
  link.href = EXE_URL;
  document.head.appendChild(link);
};

/** The set switching off and the other channel being tuned in. Above
    everything, and it takes every click, so nothing can be started halfway. */
const TuneOut = () =>
  createPortal(
    <div className="exe-tune" role="status" aria-live="polite">
      <span className="exe-tune__shutter exe-tune__shutter--top" aria-hidden="true" />
      <span className="exe-tune__shutter exe-tune__shutter--bottom" aria-hidden="true" />
      <span className="exe-tune__line" aria-hidden="true" />
      <span className="exe-tune__dot" aria-hidden="true" />
      <p className="exe-tune__caption">
        <span className="exe-tune__page">P905</span>
        Tuning to exe.ibaigarrido.dev
        <span className="exe-tune__cursor" aria-hidden="true" />
      </p>
    </div>,
    document.body,
  );

const ExePopup = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const tabRef = useRef<HTMLButtonElement>(null);
  const primaryRef = useRef<HTMLAnchorElement>(null);

  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [leaving, setLeaving] = useState(false);

  /** It opens by itself once per visit at most, and never after the visitor
      has already opened or closed it by hand. */
  const autoSpent = useRef(false);
  /** Where focus goes when the state changes - set before, acted on after
      the render that shows the element it is meant for. */
  const focusPrimary = useRef(false);
  const focusTab = useRef(false);

  const expand = useCallback((byVisitor: boolean) => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    autoSpent.current = true;
    focusPrimary.current = byVisitor;
    preconnect();

    // show() runs the same focusing steps as showModal(): it moves focus to
    // the first button in the card even though nothing is blocked. That is
    // right when the visitor asked for it and wrong when the timer did - so
    // in that case focus is handed straight back to wherever it was.
    const previous = document.activeElement;
    dialog.show();
    if (!byVisitor) {
      if (previous instanceof HTMLElement && previous !== document.body) {
        previous.focus({ preventScroll: true });
      } else if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    }

    setClosing(false);
    setOpen(true);
  }, []);

  const collapse = useCallback(() => {
    const dialog = dialogRef.current;
    if (!dialog?.open) return;
    autoSpent.current = true;
    focusTab.current = dialog.contains(document.activeElement);

    const finish = () => {
      dialog.close();
      setClosing(false);
      setOpen(false);
    };
    if (reducedMotion()) {
      finish();
      return;
    }
    setClosing(true);
    window.setTimeout(finish, COLLAPSE_MS);
  }, []);

  // Focus follows the visitor, never the timer.
  useEffect(() => {
    if (open && focusPrimary.current) {
      focusPrimary.current = false;
      primaryRef.current?.focus();
    }
    if (!open && focusTab.current) {
      focusTab.current = false;
      tabRef.current?.focus();
    }
  }, [open]);

  // Out of the tab by itself: after the wait or the scroll, whichever is
  // first, and only when nothing else has the screen.
  useEffect(() => {
    if (new URLSearchParams(window.location.search).has('nopopup')) return;

    let finished = false;
    let delay = 0;
    let retry = 0;

    const stop = () => {
      finished = true;
      window.clearTimeout(delay);
      window.clearTimeout(retry);
      document.removeEventListener('scroll', onScroll, true);
    };

    const attempt = () => {
      if (finished) return;
      if (autoSpent.current) {
        stop();
        return;
      }
      if (screenBusy()) {
        window.clearTimeout(retry);
        retry = window.setTimeout(attempt, BUSY_RETRY_MS);
        return;
      }
      stop();
      expand(false);
    };

    function onScroll(e: Event) {
      if (readFraction(e.target) >= SCROLL_FRACTION) attempt();
    }

    delay = window.setTimeout(attempt, DELAY_MS);
    // Captured, because a scroll on an element does not bubble to document.
    document.addEventListener('scroll', onScroll, { capture: true, passive: true });
    return stop;
  }, [expand]);

  // Back into the tab with Escape or a click anywhere else. Escape is left
  // alone while the project viewer is open: that one is its.
  useEffect(() => {
    if (!open || closing) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape' || document.querySelector('[aria-modal="true"]')) return;
      collapse();
    };
    const onPointer = (e: PointerEvent) => {
      const target = e.target as Node;
      if (dialogRef.current?.contains(target) || tabRef.current?.contains(target)) return;
      collapse();
    };

    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, [open, closing, collapse]);

  // Coming back with the browser's Back button can restore this page from
  // memory exactly as it was left - switched off. Switch it back on.
  useEffect(() => {
    const onShow = (e: PageTransitionEvent) => {
      if (e.persisted) setLeaving(false);
    };
    window.addEventListener('pageshow', onShow);
    return () => window.removeEventListener('pageshow', onShow);
  }, []);

  const goToExe = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // A middle click or a modifier asks for a new tab or window: that is the
    // visitor's call, and the link still has a real href to honour it.
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    if (leaving) return;
    setLeaving(true);
    window.setTimeout(
      () => window.location.assign(EXE_URL),
      reducedMotion() ? TUNE_MS_REDUCED : TUNE_MS,
    );
  };

  return (
    <>
      <button
        ref={tabRef}
        type="button"
        className="exe-tab"
        hidden={open}
        aria-expanded={open}
        aria-controls="exe-popup"
        onClick={() => expand(true)}
      >
        honest.exe
      </button>

      <dialog
        ref={dialogRef}
        id="exe-popup"
        className={`exe-popup${closing ? ' is-closing' : ''}`}
        aria-labelledby="exe-popup-title"
        aria-describedby="exe-popup-body"
      >
        <div className="tt-screen crt-screen relative overflow-hidden border-2 border-tt-cyan">
          {/* The same title bar as every other window on the site. */}
          <div className="flex items-center gap-3 h-8 px-3 bg-black border-b-2 border-tt-cyan">
            <div className="flex gap-1.5" aria-hidden="true">
              <span className="w-2.5 h-2.5 bg-tt-red" />
              <span className="w-2.5 h-2.5 bg-tt-yellow" />
              <span className="w-2.5 h-2.5 bg-tt-green" />
            </div>
            <span className="truncate font-mono text-[10px] tracking-[0.14em] text-tt-green">
              exe.ibaigarrido.dev
            </span>
          </div>

          <div className="px-4 py-5 sm:px-5">
            <h2 id="exe-popup-title" className="text-lg leading-tight">
              Tired of modern portfolios?
            </h2>

            <p id="exe-popup-body" className="mt-2.5 text-[13px] leading-relaxed text-gray-600">
              Gradients, glassmorphism, a dark mode toggle nobody asked for. There's another
              version of me: hand-written HTML, Times New Roman and zero years of the five you
              require.
            </p>

            <div className="mt-5 flex flex-col gap-2.5">
              <a
                ref={primaryRef}
                href={EXE_URL}
                onClick={goToExe}
                className="exe-popup__primary"
              >
                Show me the honest one
              </a>
              <button type="button" onClick={collapse} className="exe-popup__secondary">
                No thanks, I love gradients
              </button>
            </div>

            <p className="mt-3.5 text-[10px] font-mono text-gray-500">
              Warning: contains sarcasm about the junior job market.
            </p>
          </div>

          <span className="crt-face" aria-hidden="true" />
        </div>
      </dialog>

      {leaving && <TuneOut />}
    </>
  );
};

export default ExePopup;
