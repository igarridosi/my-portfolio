export interface Gallery {
  /** Slide image paths under /public */
  images: string[];
  /**
   * How slides are framed. `landscape` fills a 16:9 frame (desktop captures),
   * `portrait` uses a taller frame for phone mockups.
   */
  layout: 'landscape' | 'portrait';
  /** Tailwind background class behind the slide; should match the artwork */
  bg: string;
  /**
   * How the first slide is framed on the card. `cover` fills the frame, which
   * suits screenshots; `contain` shows the artwork whole, which a logo needs.
   */
  posterFit?: 'cover' | 'contain';
}

export interface Project {
  /** Display name, not necessarily the repo slug */
  name: string;
  /** One line: the problem this solves. This is what a recruiter reads first. */
  tagline: string;
  /**
   * Problem, solution, outcome, in that order. The outcome is what the work
   * actually changed — never an invented metric.
   */
  description: string;
  /** Technologies, most relevant first */
  stack: string[];
  /** Which platform this proves */
  category: 'Web' | 'Backend' | 'Mobile' | 'Desktop';
  repo: string;
  demo?: string;
  /** Where to get the built app, for projects that ship a binary rather than a URL */
  download?: string;
  /**
   * The picture on the set's screen. Falls back to the first gallery slide,
   * so this is only needed by projects that have a cover but no gallery.
   */
  poster?: string;
  /**
   * Projects with a gallery open into the lightbox. Projects without one show
   * their poster on the set and hand the click on to the live demo instead.
   */
  gallery?: Gallery;
}

export const projects: Project[] = [
  {
    name: 'Huntr',
    tagline: 'Fundamental stock analysis that values a company as a range of outcomes, not one number.',
    description:
      'A fundamental analysis platform for retail investors. It values a company with a DCF calculator driven by live sliders and a Monte Carlo simulation that turns a single target price into a probability range, then finds the next idea through an Opportunity Radar for unusual volume and buybacks, a visual earnings calendar and a portfolio view. React on the front, Python and PostgreSQL behind it, and it runs in production today.',
    stack: ['TypeScript', 'React', 'Python', 'PostgreSQL'],
    category: 'Web',
    repo: 'https://github.com/igarridosi/Huntr',
    demo: 'https://www.huntrvalue.me/',
    gallery: {
      images: [
        '/img/projects/landing_page.webp',
        '/img/projects/chart_kpis.webp',
        '/img/projects/dcf_calculator_ui.webp',
        '/img/projects/earnings_calendar.webp',
        '/img/projects/insights_view.webp',
        '/img/projects/stock_radar.webp',
        '/img/projects/stock_info.webp',
        '/img/projects/portfolio_view.webp',
      ],
      layout: 'landscape',
      bg: 'bg-[#0d0d0f]',
    },
  },
  {
    name: 'Oroi',
    tagline: 'A subscription tracker that makes you type every expense, on purpose.',
    description:
      'Subscription trackers automate everything, and the moment you stop typing your expenses you stop noticing them. So this native Android app, built in Kotlin and Jetpack Compose, deliberately has no bank sync: entering each expense by hand is the friction that makes it register. The outcome is awareness rather than automation, and it ships publicly on Appteka. Named after the Basque word "oroitu", to remember.',
    stack: ['Kotlin', 'Jetpack Compose', 'Android SDK'],
    category: 'Mobile',
    repo: 'https://github.com/igarridosi/OroiApp',
    download: 'https://appteka.store/app/811r289712',
    gallery: {
      images: [
        '/img/projects/logo.webp',
        '/img/projects/oroi-1.webp',
        '/img/projects/oroi-2.webp',
        '/img/projects/oroi-3.webp',
      ],
      layout: 'portrait',
      bg: 'bg-[#ece8fd]',
      posterFit: 'contain',
    },
  },
  {
    name: 'Waveter',
    tagline: 'Tune into any radio station on earth from one page.',
    description:
      'Finding a station abroad means hopping between broadcaster sites that each play differently. This React client sits on a public radio directory and streams straight in the browser, so any station on earth is two clicks away from one page.',
    stack: ['React', 'JavaScript', 'REST API'],
    category: 'Web',
    repo: 'https://github.com/igarridosi/Waveter_RadioExplorer',
    demo: 'https://waveter.netlify.app/',
    poster: '/img/projects/waveter.webp',
  },
  {
    name: 'Open Workout Spots',
    tagline: 'A community map of outdoor calisthenics spots.',
    description:
      'Outdoor calisthenics spots are passed around by word of mouth and forgotten. I built the whole platform to make them findable: MariaDB schema, Express REST API and React client, all mine. It leaves a community map anyone can add to and review.',
    stack: ['React', 'Node.js', 'Express', 'MariaDB'],
    category: 'Backend',
    repo: 'https://github.com/igarridosi/OWS',
    demo: 'https://openworkoutspots.netlify.app/',
    poster: '/img/projects/open-workout-spots.webp',
  },
  {
    name: 'The Mole Game',
    tagline: 'Real-time multiplayer social deduction.',
    description:
      'Social deduction falls apart if two players see different states. This C# desktop game keeps one authoritative game state that every client mirrors, so the round stays consistent even as players join, act and drop mid-game.',
    stack: ['C#', '.NET', 'Real-time networking'],
    category: 'Desktop',
    repo: 'https://github.com/igarridosi/TheMoleGame',
  },
];
