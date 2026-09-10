import { useEffect, useRef, useState } from 'react';
import { useLocation, type Location } from 'react-router-dom';

/* ---------------------------------------------------------------------------
   The page change, staged as a piece of television.

   A handset rises from the bottom right, a thumb hits a fastext key, and the
   set changes channel: the picture collapses into a bright horizontal line,
   holds there through a moment of static, and opens back out on the new page.
   That collapse is what hides the swap - the new route is not mounted until
   the screen is a line.

   The handset is drawn as an oblique projection rather than a flat sprite:
   two copies of the same outline, offset down and left, joined along the two
   visible edges. That is how the reference page fakes depth, and it is why it
   reads as an object sitting in the room rather than as a picture of one.
   --------------------------------------------------------------------------- */

const REMOTE_IN_AT = 0;
const REMOTE_IN_MS = 560;
const HAND_IN_AT = 480;
const PRESS_AT = 1040;
const PRESS_MS = 200;
const CLOSE_AT = 1180; // the picture starts collapsing
const CLOSE_MS = 280;
const EXIT_AT = 1240; // the handset drops away as the screen closes
const OPEN_AT = 1900;
const OPEN_MS = 400;

export const SWAP_AT_MS = 1700; // screen is a line here; nothing to see
export const WIPE_MS = 2500;

/* --- the handset, in local drawing units -------------------------------- */

const FACE = { x: 100, y: 40, w: 120, h: 290 };
/* Depth offset. Down and to the left, so the lit edges are the near ones.
   Deep enough that the slab has obvious thickness rather than reading as a
   card with an outline. */
const DEPTH = { x: -42, y: 26 };
/* The turned faces are shades of near-black rather than a colour. A pure
   black side against a black page makes the volume collapse, so each gets
   just enough lift to read as a separate plane - the top face stays darkest,
   the two edges catching a little of the light the white outline implies. */
const SIDE_LEFT = '#171717';
const SIDE_BOTTOM = '#2b2b2b';

const KEY_H = 9;
const PAIR_L = FACE.x + 16;
const PAIR_R = FACE.x + 68;
const PAIR_W = 36;

/* Rows of plain keys, as the reference draws them: white dashes. */
const DASH_ROWS = [84, 106, 128, 206, 228, 250];
const CYAN_ROW = 156;
const CYAN_SINGLE = { x: FACE.x + 42, y: 180, w: PAIR_W };

/* The fastext strip. The yellow one is the far right, which is why the thumb
   can reach it without the hand covering the keypad it came to press. */
const FASTEXT_Y = 286;
const FASTEXT = [
  { x: FACE.x + 12, fill: '#ff3131' },
  { x: FACE.x + 48, fill: '#00ff00' },
  { x: FACE.x + 84, fill: '#ffff00' },
];
const FASTEXT_W = 30;
const PRESSED = FASTEXT[2];

const corners = (r: typeof FACE) => [
  [r.x, r.y],
  [r.x + r.w, r.y],
  [r.x + r.w, r.y + r.h],
  [r.x, r.y + r.h],
];

const poly = (pts: number[][]) => pts.map(([x, y]) => x + ',' + y).join(' ');

const Remote = () => {
  const top = corners(FACE);
  const [TL, TR, BR, BL] = top;
  const push = ([x, y]: number[]) => [x + DEPTH.x, y + DEPTH.y];
  const TLd = push(TL);
  const BLd = push(BL);
  const BRd = push(BR);

  // Only the left and bottom faces of the slab are turned towards the viewer.
  const leftSide = [TL, BL, BLd, TLd];
  const bottomSide = [BL, BR, BRd, BLd];

  /* Outline and fill are separate jobs here. Stroking each face on its own
     left hidden edges poking out at the corners, and on the sharp angles the
     skew produces the miter joins threw spikes well past the body - the line
     appeared to escape the handset. So the faces are painted with no stroke
     at all and the pen goes round the silhouette once (the outline of both
     rectangles together), then draws only the creases where the turned faces
     meet the top. Nothing is stroked twice and nothing can overshoot. */
  const silhouette = [TR, TL, TLd, BLd, BRd, BR];

  return (
    <g
      /* Oblique projection: verticals stay vertical, horizontals lean. It is
         the cheapest honest 3D there is, and the one the original pages used. */
      transform="translate(160 185) rotate(-9) skewY(13) translate(-160 -185)"
    >
      <polygon points={poly(leftSide)} fill={SIDE_LEFT} />
      <polygon points={poly(bottomSide)} fill={SIDE_BOTTOM} />
      <polygon points={poly(top)} fill="#000000" />

      <g stroke="none">
        {/* Standby, alone at the top. */}
        <rect x={FACE.x + 46} y={FACE.y + 14} width={28} height={11} fill="#ff3131" />

        {DASH_ROWS.flatMap((y) => [
          <rect key={'l' + y} x={PAIR_L} y={y} width={PAIR_W} height={KEY_H} fill="#ffffff" />,
          <rect key={'r' + y} x={PAIR_R} y={y} width={PAIR_W} height={KEY_H} fill="#ffffff" />,
        ])}

        <rect x={PAIR_L} y={CYAN_ROW} width={PAIR_W} height={KEY_H} fill="#00ffff" />
        <rect x={PAIR_R} y={CYAN_ROW} width={PAIR_W} height={KEY_H} fill="#00ffff" />
        <rect
          x={CYAN_SINGLE.x}
          y={CYAN_SINGLE.y}
          width={CYAN_SINGLE.w}
          height={KEY_H}
          fill="#00ffff"
        />

        {/* The key under the thumb is one of these, not a shape drawn over
            them: it keeps its own yellow and its own size, and the press is
            shown by the key going down rather than by changing colour. */}
        {FASTEXT.map((k) => (
          <rect
            key={k.fill}
            className={k === PRESSED ? 'tt-wipe__key' : undefined}
            x={k.x}
            y={FASTEXT_Y}
            width={FASTEXT_W}
            height={KEY_H}
            fill={k.fill}
          />
        ))}
      </g>

      {/* Drawn last, so no fill can creep over it. */}
      <g fill="none" stroke="#ffffff" strokeLinejoin="round" strokeLinecap="round">
        <polygon points={poly(silhouette)} strokeWidth={5} />
        <polyline points={poly([TL, BL, BLd])} strokeWidth={4} />
        <polyline points={poly([BL, BR])} strokeWidth={4} />
      </g>
    </g>
  );
};

/* The pointing-hand cursor, transcribed cell by cell from the classic bitmap.

   The proportions are the whole point and the first attempt got them wrong: a
   short, thick finger on a round palm reads as a blob with a horn. Here the
   finger is three cells wide and ten tall, leaning right as it descends, and
   the palm is a squat mass beneath it. The three
   curled fingers are the humps along the top right, each closed by its own
   crease.

   `K` is the outline, `W` the fill. Against this black screen the outline
   vanishes around the silhouette, which is what gives the flat teletext look,
   but inside the shape it still draws the creases between the curled fingers
   and separates the hand from the handset's white edges where they overlap.

   The fingertip is row 0, columns 2-4 - that is the point aligned with the
   key, and why this hand comes up from below rather than in from the side. */
const HAND_LINE = '#000000';
const HAND_FILL = '#ffff00';

const HAND = [
  '..KKK.....................',
  '.KWWWK....................',
  '..KWWWK...................',
  '..KWWWK...................',
  '...KWWWK..................',
  '....KWWWK.................',
  '....KWWWK.................',
  '....KWWWK.KK.KK.KK........',
  '....KWWWKKWWKWWKWWK.......',
  '....KWWWWWWWKWWKWWWK......',
  '..KK.KWWWWWWKWWKWWWWK.....',
  '.KWWKKWWWWWWWWWWWWWWWK....',
  '.KWWWWWWWWWWWWWWWWWWWK....',
  '..KWWWWWWWWWWWWWWWWWWK....',
  '...KWWWWWWWWWWWWWWWWWK....',
  '...KWWWWWWWWWWWWWWWWK.....',
  '....KWWWWWWWWWWWWWWWK.....',
  '....KWWWWWWWWWWWWWWK......',
  '.....KWWWWWWWWWWWWWK......',
  '.....KKKKKKKKKKKKKKK......',
];

const HAND_CELL = 10;
const HAND_INK: Record<string, string> = { K: HAND_LINE, W: HAND_FILL };

const Hand = () => (
  <>
    {HAND.flatMap((row, y) =>
      [...row].map((ch, x) =>
        ch === '.' ? null : (
          <rect
            key={x + '-' + y}
            x={x * HAND_CELL}
            y={y * HAND_CELL}
            width={HAND_CELL}
            height={HAND_CELL}
            fill={HAND_INK[ch]}
          />
        ),
      ),
    )}
  </>
);

/**
 * Holds back the route being rendered until the picture has collapsed.
 *
 * `displayed` is what should be handed to <Routes location={...}>; it lags the
 * real location by exactly the time the screen needs to close.
 */
export const usePageWipe = () => {
  const location = useLocation();
  const [displayed, setDisplayed] = useState<Location>(location);
  const [run, setRun] = useState(0);
  const [active, setActive] = useState(false);
  // Keyed on a ref rather than on `displayed`, so that releasing the held
  // route does not re-run this effect and cancel its own cleanup timer.
  const handled = useRef(location.pathname);

  useEffect(() => {
    if (location.pathname === handled.current) return;
    handled.current = location.pathname;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplayed(location);
      setActive(false);
      return;
    }

    setRun((n) => n + 1);
    setActive(true);
    const swap = setTimeout(() => setDisplayed(location), SWAP_AT_MS);
    const end = setTimeout(() => setActive(false), WIPE_MS);
    // Navigating again mid-sequence tears this down and starts over, which is
    // what makes the animation interruptible: nobody is trapped inside it.
    return () => {
      clearTimeout(swap);
      clearTimeout(end);
    };
  }, [location]);

  return { displayed, active, run };
};

/** The overlay itself. `run` remounts it so every CSS animation restarts. */
export const PageWipe = ({ active, run }: { active: boolean; run: number }) => {
  if (!active) return null;

  const vars = {
    '--remote-in-at': REMOTE_IN_AT + 'ms',
    '--remote-in-ms': REMOTE_IN_MS + 'ms',
    '--hand-in-at': HAND_IN_AT + 'ms',
    // Arrival, jab and recovery are one animation: three separate ones would
    // be three writers fighting over the same transform.
    '--hand-ms': EXIT_AT - HAND_IN_AT + 'ms',
    '--press-at': PRESS_AT + 'ms',
    '--press-ms': PRESS_MS + 'ms',
    '--close-at': CLOSE_AT + 'ms',
    '--close-ms': CLOSE_MS + 'ms',
    '--open-at': OPEN_AT + 'ms',
    '--open-ms': OPEN_MS + 'ms',
    '--exit-at': EXIT_AT + 'ms',
    '--line-at': CLOSE_AT + CLOSE_MS - 60 + 'ms',
    '--line-ms': OPEN_AT - CLOSE_AT - CLOSE_MS + 120 + 'ms',
  } as React.CSSProperties;

  return (
    <div key={run} className="tt-wipe" aria-hidden="true" style={vars}>
      {/* The handset and the hand that works it. */}
      <div className="tt-wipe__stage">
        <svg className="tt-wipe__remote" viewBox="0 0 320 380">
          <Remote />
        </svg>
        <svg
          className="tt-wipe__hand"
          viewBox={'0 0 ' + HAND[0].length * HAND_CELL + ' ' + HAND.length * HAND_CELL}
          shapeRendering="crispEdges"
        >
          <Hand />
        </svg>
      </div>

      {/* Changing channel: two shutters close the picture into a line, hold
          through a moment of static, and open again on the new page. */}
      <span className="tt-wipe__shutter tt-wipe__shutter--top" />
      <span className="tt-wipe__shutter tt-wipe__shutter--bottom" />
      <span className="tt-wipe__static" />
      <span className="tt-wipe__line" />
    </div>
  );
};
