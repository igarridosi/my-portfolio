import { useEffect, useRef } from 'react';

/* ---------------------------------------------------------------------------
   An invitation to the other portfolio, exe.ibaigarrido.dev.

   It is a joke, so it has to stay out of the way of the real thing:
   - once per visitor, remembered in localStorage;
   - never on arrival: after eight seconds, or once the visitor has read 40% of
     the page, whichever comes first;
   - never with ?nopopup in the address, so the portfolio can be sent to a
     recruiter without it;
   - never on top of something else that owns the screen - the project viewer,
     the channel change into it, or the page change - it waits for those.

   A native <dialog> opened with showModal(): the browser supplies the modal
   behaviour (inert page behind, Escape to close, the top layer above every CRT
   overlay) and this only adds what it does not - closing on a click outside,
   and putting focus back where it was.
   --------------------------------------------------------------------------- */

const EXE_URL = 'https://exe.ibaigarrido.dev';
const STORAGE_KEY = 'exe-popup-shown';
const DELAY_MS = 8000;
const SCROLL_FRACTION = 0.4;
/** How long to wait before trying again when something else has the screen. */
const BUSY_RETRY_MS = 1500;

/** Whether this visitor may be shown it at all. If storage cannot be read, the
    answer is no: without it there is no way to show it only once. */
const allowed = (): boolean => {
  if (new URLSearchParams(window.location.search).has('nopopup')) return false;
  try {
    return window.localStorage.getItem(STORAGE_KEY) === null;
  } catch {
    return false;
  }
};

/** Records that it was shown. Written before it opens, so that a visitor who
    leaves with it on screen does not get it again; and if the write fails, it
    is not shown. */
const markShown = (): boolean => {
  try {
    window.localStorage.setItem(STORAGE_KEY, new Date().toISOString());
    return true;
  } catch {
    return false;
  }
};

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

const ExePopup = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const primaryRef = useRef<HTMLAnchorElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!allowed()) return;

    let finished = false;
    let delay = 0;
    let retry = 0;

    const stop = () => {
      finished = true;
      window.clearTimeout(delay);
      window.clearTimeout(retry);
      document.removeEventListener('scroll', onScroll, true);
    };

    const open = () => {
      if (finished) return;
      if (screenBusy()) {
        window.clearTimeout(retry);
        retry = window.setTimeout(open, BUSY_RETRY_MS);
        return;
      }
      const dialog = dialogRef.current;
      stop();
      if (!dialog || dialog.open || !markShown()) return;

      returnFocus.current =
        document.activeElement instanceof HTMLElement ? document.activeElement : null;
      dialog.showModal();
      // showModal() would focus the first focusable element, which is the
      // link; said explicitly so a reorder of the buttons cannot change it.
      primaryRef.current?.focus();
    };

    function onScroll(e: Event) {
      if (readFraction(e.target) >= SCROLL_FRACTION) open();
    }

    delay = window.setTimeout(open, DELAY_MS);
    // Captured, because a scroll on an element does not bubble to document.
    document.addEventListener('scroll', onScroll, { capture: true, passive: true });

    return stop;
  }, []);

  const close = () => dialogRef.current?.close();

  // Every way out - the buttons, Escape, a click outside - ends in `close`,
  // so focus is put back in one place.
  const handleClose = () => {
    const target = returnFocus.current;
    returnFocus.current = null;
    if (target && target.isConnected) target.focus();
  };

  // The dialog has no padding and the panel fills it, so a click that lands
  // on the dialog element itself can only have come from the backdrop.
  const handleClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === e.currentTarget) close();
  };

  return (
    <dialog
      ref={dialogRef}
      className="exe-popup"
      aria-labelledby="exe-popup-title"
      aria-describedby="exe-popup-body"
      onClose={handleClose}
      onClick={handleClick}
    >
      <div className="tt-screen crt-screen relative overflow-hidden border-2 border-tt-cyan">
        {/* The same title bar as every other window on the site. */}
        <div className="flex items-center gap-3 h-9 px-3 bg-black border-b-2 border-tt-cyan">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="w-3 h-3 bg-tt-red" />
            <span className="w-3 h-3 bg-tt-yellow" />
            <span className="w-3 h-3 bg-tt-green" />
          </div>
          <span className="truncate font-mono text-[11px] tracking-[0.14em] text-tt-green">
            exe.ibaigarrido.dev
          </span>
        </div>

        <div className="px-5 py-6 sm:px-7 sm:py-7">
          <h2 id="exe-popup-title" className="text-xl sm:text-2xl leading-tight">
            Tired of modern portfolios?
          </h2>

          <p id="exe-popup-body" className="mt-3 text-sm leading-relaxed text-gray-600">
            Gradients, glassmorphism, a dark mode toggle nobody asked for. There's another
            version of me: hand-written HTML, Times New Roman and zero years of the five you
            require.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <a
              ref={primaryRef}
              href={EXE_URL}
              target="_blank"
              rel="noopener"
              onClick={close}
              className="exe-popup__primary"
            >
              Show me the honest one
            </a>
            <button type="button" onClick={close} className="exe-popup__secondary">
              No thanks, I love gradients
            </button>
          </div>

          <p className="mt-4 text-[11px] font-mono text-gray-500">
            Warning: contains sarcasm about the junior job market.
          </p>
        </div>

        <span className="crt-face" aria-hidden="true" />
      </div>
    </dialog>
  );
};

export default ExePopup;
