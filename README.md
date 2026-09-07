# Ibai Garrido — Developer Portfolio

Personal portfolio built as a retro browser window: the chrome, the address bar and the
bookmark tabs are the navigation. Live at **[ibaigarrido-portfolio.netlify.app](https://ibaigarrido-portfolio.netlify.app/)**.

<!-- TODO: add a screenshot of the portfolio itself here (docs/screenshot.webp).
     A README with a picture is the difference between someone reading it and scrolling past. -->

## What this is

A single-page React app that presents my work the way a hiring manager reads it: what the
problem was, what I built, and what it changed. Five projects across web, backend, mobile
and desktop, each with a gallery you can open in place.

## Stack

| Area | Choice | Why |
| --- | --- | --- |
| UI | React 19 + TypeScript | Type safety across the data layer that drives every section |
| Build | Vite 6 | Fast HMR; the whole site ships as a ~145 kB gzipped bundle |
| Styling | Tailwind CSS 4 | Utility classes keep the neo-brutalist system consistent |
| Motion | Framer Motion | Shared easing curve so transitions read as one system |
| Routing | React Router 7 | Client-side routes rendered inside the browser-window frame |
| Forms | EmailJS | Contact form with no backend to maintain |
| Hosting | Netlify | Static deploy plus one serverless function for GitHub stats |

## Running it

```bash
npm install
npm run dev
```

The dev server starts on `http://localhost:5173`.

| Script | Does |
| --- | --- |
| `npm run dev` | Vite dev server with HMR |
| `npm run build` | Type-checks with `tsc`, then builds to `dist/` |
| `npm run preview` | Serves the production build locally |
| `npm run lint` | ESLint across the project |
| `npm run typecheck` | Type-check only, no build |

The contact form needs EmailJS credentials in a `.env` file:

```
VITE_EMAILJS_SERVICE_ID=...
VITE_EMAILJS_TEMPLATE_ID=...
VITE_EMAILJS_PUBLIC_KEY=...
```

Without them the rest of the site works; only sending a message fails.

## Layout

```
src/
├── components/       One folder per section, each self-contained
│   ├── Section1/     Landing: name, role, CTAs
│   ├── AboutMe/      Positioning, quick facts, what I build with
│   ├── Experience/   Roles and qualifications
│   ├── Projects/     Cards plus the gallery lightbox
│   ├── Skills/       Grouped technical skills
│   ├── Contact/      EmailJS form and direct links
│   └── Navigation/   Bookmark-bar routing
├── data/             Content lives here, not in the components
│   ├── projects.ts   Every project, its gallery and its links
│   └── experience.ts Roles and education
└── App.tsx           The browser-window shell and routes
```

Content is separated from presentation on purpose: updating a project or a role means
editing one typed object in `src/data`, never touching JSX.

## Notes

- **Images** are WebP, resized to 1920 px wide. Full-resolution masters stay in
  `assets-src/`, outside `public/`, so they never reach the deploy.
- **Accessibility**: semantic landmarks, a skip link, labelled icon-only controls, a
  focus-trapped gallery dialog, and `prefers-reduced-motion` honoured throughout.
- **`dist/` is not committed.** Build it with `npm run build`.
