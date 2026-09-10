import { useCallback, useEffect, useRef, useState } from 'react';
import type { Project } from '../../data/projects';

/* ---------------------------------------------------------------------------
   A shelf of television sets, one per project, stood around a cylinder.

   Each set is rotated its own step around a shared axis and pushed out by the
   radius, so the curve and the squeeze at the edges are real perspective, not
   a row of cards being scaled down. Only the set in front is switched on, and
   clicking it opens the project.

   There are no arrows and no buttons. The shelf is turned by dragging it, by
   a two-finger swipe, or with the arrow keys, and the picture is the link.
   --------------------------------------------------------------------------- */

/** Teletext numbered its pages in hundreds; the projects continue the scheme. */
const FIRST_PAGE = 401;

/** Cursor travel that turns the shelf by one set. */
const DRAG_PER_STEP = 190;

/** Two-finger travel that turns the shelf by one set. */
const WHEEL_PER_STEP = 120;

/** How long the wheel must be still before the shelf settles on a set. */
const WHEEL_QUIET_MS = 140;

/* The EBU colour bars, in broadcast order. A set with nothing to show gets
   these rather than an empty frame: it says "no picture yet" in the language
   the rest of the page already speaks. */
const BARS = ['#ffffff', '#ffff00', '#00ffff', '#00ff00', '#ff00ff', '#ff3131', '#0000aa'];

const clamp1 = (n: number) => Math.max(-1, Math.min(1, n));

/**
 * Text that fills in a character at a time, the way a teletext page arrived:
 * left to right, in steps rather than a fade.
 *
 * Words are kept whole in their own inline block so the line still breaks
 * between words and not in the middle of one - splitting a string into loose
 * characters otherwise lets it wrap anywhere.
 */
const PixelText = ({ text, step }: { text: string; step: number }) => {
  let n = -1;
  return (
    <>
      {text.split(' ').map((word, w) => (
        <span key={w} className="px-word">
          {[...word].map((ch, i) => {
            n += 1;
            return (
              <span
                key={i}
                className="px-char"
                style={{ '--i': n, '--px-step': step + 'ms' } as React.CSSProperties}
              >
                {ch}
              </span>
            );
          })}
          {w < text.split(' ').length - 1 ? ' ' : ''}
        </span>
      ))}
    </>
  );
};

const TestCard = () => (
  <div className="tv-testcard" aria-hidden="true">
    <div className="tv-testcard__bars">
      {BARS.map((c) => (
        <span key={c} style={{ background: c }} />
      ))}
    </div>
    <span className="tv-testcard__label">No signal</span>
  </div>
);

const TvCarousel = ({
  projects,
  onOpen,
}: {
  projects: Project[];
  onOpen: (project: Project) => void;
}) => {
  const [active, setActive] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ from: number } | null>(null);
  /* Outlives the drag on purpose. `drag` is cleared on pointerup, which is
     before the click arrives, so it cannot be what tells the click apart from
     the end of a drag. */
  const movedRef = useRef(false);

  const count = projects.length;
  const go = useCallback(
    (delta: number) => setActive((i) => (i + delta + count) % count),
    [count],
  );

  // Arrow keys work whenever the shelf itself has focus, which with no buttons
  // left on screen is the only way through it from a keyboard.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      e.preventDefault();
      go(e.key === 'ArrowLeft' ? -1 : 1);
    };
    stage.addEventListener('keydown', onKey);
    return () => stage.removeEventListener('keydown', onKey);
  }, [go]);

  /* A two-finger swipe on a trackpad arrives as a wheel event, so the shelf
     answers those too. Whichever axis the trackpad reports is used: some send
     the sideways swipe as deltaX, others as deltaY.

     The travel turns the shelf as it arrives, exactly as a drag does, so the
     sets follow the fingers instead of jumping a whole place at a threshold.
     It is clamped to one set and committed once the wheel falls quiet.

     Absorbing the tail of a hard flick is the awkward part. A timed lock got
     it wrong in both directions: too short and the momentum pushed three
     projects by, too long and a deliberate second swipe was refused. So the
     shape of the gesture is used instead. Momentum decays - every event is
     weaker than the last - while a fresh push spikes. Anything decaying is
     swallowed; a delta clearly bigger than the one before it is a new gesture
     and is let straight through. */
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    let travel = 0;
    let absorbing = false;
    let lastAbs = 0;
    let quiet: ReturnType<typeof setTimeout> | undefined;

    /* Commits whatever has been turned so far. It deliberately does not touch
       `absorbing` or `lastAbs`: those belong to whoever called it. Clearing
       them here was a real bug - the tail of a flick was then measured against
       zero, looked like a huge new push, and every one of the thirty-odd
       momentum events stepped a project. */
    const settle = () => {
      const moved = Math.round(clamp1(travel / WHEEL_PER_STEP));
      travel = 0;
      // The transition goes back on *before* the offset is cleared, so the
      // shelf eases into place instead of snapping there.
      stage.classList.remove('is-dragging');
      setDragOffset(0);
      if (moved) go(moved);
    };

    const release = () => {
      absorbing = false;
      lastAbs = 0;
    };

    const onWheel = (e: WheelEvent) => {
      const d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (!d) return;
      e.preventDefault();

      const mag = Math.abs(d);
      if (absorbing) {
        if (mag > lastAbs * 1.25) absorbing = false;
        else {
          lastAbs = mag;
          clearTimeout(quiet);
          quiet = setTimeout(release, WHEEL_QUIET_MS);
          return;
        }
      }

      lastAbs = mag;
      travel += d;
      // Turning as it goes is what gives the gesture its weight; the shelf is
      // pulled round rather than flicked between two states. The transition is
      // off while it tracks, or every reading would queue behind half a second
      // of easing and the shelf would lag the fingers badly.
      stage.classList.add('is-dragging');
      setDragOffset(clamp1(-travel / WHEEL_PER_STEP));

      clearTimeout(quiet);
      if (Math.abs(travel) >= WHEEL_PER_STEP) {
        settle();
        // The tail that follows is measured against the event that got us
        // here, which is what lets a decaying flick be told from a new push.
        absorbing = true;
        lastAbs = mag;
        quiet = setTimeout(release, WHEEL_QUIET_MS);
        return;
      }
      quiet = setTimeout(() => {
        settle();
        release();
      }, WHEEL_QUIET_MS);
    };

    stage.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      stage.removeEventListener('wheel', onWheel);
      clearTimeout(quiet);
    };
  }, [go]);

  /* Dragging turns the shelf as it happens. The offset is written to the ring
     as a CSS variable in fractions of a step - never through state, because a
     pointermove must not re-render five sets - and `is-dragging` takes the
     transition off so the shelf tracks the cursor exactly.

     Both the live offset and the landing are clamped to a single set. Turning
     further than that put sets past the point where their wrapped offset is
     recomputed, and they jumped across the shelf on release. */
  const setDragOffset = (steps: number) =>
    ringRef.current?.style.setProperty('--drag', steps.toFixed(4));

  /* The drag is followed on `window` rather than through pointer capture.
     Capture looked like the tidier way to keep a drag alive past the edge of
     the shelf, but a captured pointer also redirects the click that follows it
     to the capturing element - so the click never reached the set underneath
     and the picture could not be opened at all. Window listeners keep the drag
     working outside the shelf and leave the click where it belongs. */
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    if (drag.current) return;

    drag.current = { from: e.clientX };
    movedRef.current = false;
    stageRef.current?.classList.add('is-dragging');

    const onMove = (ev: PointerEvent) => {
      const d = drag.current;
      if (!d) return;
      const dx = ev.clientX - d.from;
      if (!movedRef.current && Math.abs(dx) > 4) movedRef.current = true;
      setDragOffset(clamp1(dx / DRAG_PER_STEP));
    };

    const onUp = (ev: PointerEvent) => {
      const d = drag.current;
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
      if (!d) return;
      drag.current = null;
      stageRef.current?.classList.remove('is-dragging');
      setDragOffset(0);
      const moved = Math.round(clamp1((ev.clientX - d.from) / DRAG_PER_STEP));
      if (moved) go(-moved);
    };

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
  };

  const current = projects[active];

  return (
    <div className="tv-carousel">
      {/* With the section heading gone, the project on screen is the heading. */}
      <div className="tv-marquee">
        {/* Keyed on the project so the fill-in runs again on every change - and
            keyed *distinctly*, because two siblings sharing a key is not a
            tidier way of writing the same thing: React reconciles keyed
            children against each other, and duplicates made it append a fresh
            title on every change instead of replacing the old one. */}
        <h1 key={'name-' + current.name} className="tv-marquee__name">
          <span className="tv-marquee__text">
            <PixelText text={current.name} step={26} />
          </span>
          <span className="tv-marquee__page">{FIRST_PAGE + active}</span>
        </h1>
        <p key={'line-' + current.name} className="tv-marquee__line">
          <PixelText text={current.tagline} step={7} />
        </p>
      </div>

      <div
        ref={stageRef}
        className="tv-stage"
        tabIndex={0}
        role="group"
        aria-label="Projects. Drag, swipe or use the arrow keys."
        onPointerDown={onPointerDown}
      >
        <div ref={ringRef} className="tv-ring">
          {projects.map((project, i) => {
            // Shortest way round, so stepping from the last set to the first
            // turns one place forward instead of four places back.
            let offset = i - active;
            if (offset > count / 2) offset -= count;
            if (offset < -count / 2) offset += count;
            const isOn = i === active;
            const poster = project.gallery?.images[0];

            return (
              <button
                key={project.name}
                type="button"
                className={`tv-slot ${isOn ? 'is-on' : ''}`}
                style={{ '--offset': offset } as React.CSSProperties}
                onClick={() => {
                  // A drag that happens to end on a set is not a click on it.
                  if (movedRef.current) return;
                  if (isOn) onOpen(project);
                  else setActive(i);
                }}
                aria-label={
                  isOn
                    ? project.gallery
                      ? `Open the ${project.name} gallery`
                      : project.name
                    : `Show ${project.name}`
                }
                aria-current={isOn ? 'true' : undefined}
                tabIndex={isOn ? 0 : -1}
              >
                <span className="tv-set">
                  <span className="tv-screen">
                    {poster ? (
                      <img
                        src={poster}
                        alt=""
                        draggable={false}
                        loading={Math.abs(offset) <= 1 ? 'eager' : 'lazy'}
                        decoding="async"
                        className={
                          project.gallery?.posterFit === 'contain'
                            ? 'object-contain p-3'
                            : 'object-cover object-top'
                        }
                      />
                    ) : (
                      <TestCard />
                    )}
                    <span className="tv-screen__glass" aria-hidden="true" />
                  </span>
                  <span className="tv-set__base" aria-hidden="true">
                    <span className="tv-set__led" />
                    <span className="tv-set__brand">{project.category}</span>
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* The one thing left that says how many there are and where you are. */}
      <div className="tv-dots" role="tablist" aria-label="Choose a project">
        {projects.map((project, i) => (
          <button
            key={project.name}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-label={project.name}
            className={`tv-dot ${i === active ? 'is-on' : ''}`}
            onClick={() => setActive(i)}
          />
        ))}
      </div>

    </div>
  );
};

export default TvCarousel;
