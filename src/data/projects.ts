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
      'A research terminal for individual investors: financial statements, earnings history and call transcripts, a screener across 800+ tickers, and portfolio tracking with time-weighted return measured against the S&P 500. Its valuation suite (DCF scenarios, Monte Carlo, reverse DCF) traces every input back to the SEC filing it came from, and refuses to show a figure when the data does not reconcile. Behind it, a nightly serverless pipeline on Azure Functions loads SEC EDGAR data for 890+ companies into PostgreSQL, provisioned with Terraform and deployed through GitHub Actions with no stored credentials.',
    stack: ['TypeScript', 'React', 'Next.js', 'Supabase (PostgreSQL)', 'Azure Functions', 'Terraform'],
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
      'Subscription trackers automate everything, and the moment you stop typing your expenses you stop noticing them, so entry here is manual by design. Fully offline: data stays on the device in Room, with no account, no analytics and no internet permission. Renewal reminders arrive through WorkManager two days before each charge, alongside a home-screen widget, a monthly budget with live progress, CSV export and a custom animated donut chart drawn on the Compose Canvas. Material 3 light and dark themes, localised into English, Spanish and Basque. Named after the Basque word "oroitu", to remember.',
    stack: ['Kotlin', 'Jetpack Compose', 'Material 3', 'Room', 'WorkManager', 'Android SDK'],
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
