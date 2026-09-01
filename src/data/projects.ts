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
  /** 2-3 short lines: what I built and the decisions behind it */
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
   * Projects with a gallery render as large cards with a quick-look carousel.
   * Projects without one render in the compact row underneath.
   */
  gallery?: Gallery;
}

export const projects: Project[] = [
  {
    name: 'Huntr',
    tagline: 'Professional-grade fundamental stock analysis, without the $24k/year terminal.',
    description:
      'A financial terminal that makes institutional-style analysis accessible. Built a DCF calculator driven by live sliders, backed by Monte Carlo simulations that run thousands of scenarios so a valuation comes with a probability range instead of a single guess. Also an Opportunity Radar that surfaces unusual volume and buyback activity, and a visual earnings calendar. The heavy modelling runs in Python and PostgreSQL so the React client stays fast under load.',
    stack: ['TypeScript', 'React', 'Python', 'PostgreSQL'],
    category: 'Web',
    repo: 'https://github.com/igarridosi/Huntr',
    demo: 'https://huntrvalue.me/',
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
      'Native Android app built with Kotlin and Jetpack Compose. The product decision that defines it: no bank sync. Manual entry is deliberate friction, because the goal is awareness rather than automation. Named after the Basque word "oroitu", meaning to remember.',
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
      'React app for discovering and streaming radio stations worldwide, built around a public radio API with browser audio streaming.',
    stack: ['React', 'JavaScript', 'REST API'],
    category: 'Web',
    repo: 'https://github.com/igarridosi/Waveter_RadioExplorer',
    demo: 'https://waveter.netlify.app/',
  },
  {
    name: 'Open Workout Spots',
    tagline: 'A community map of outdoor calisthenics spots.',
    description:
      'Full stack platform to discover, share and review outdoor training locations. MariaDB schema, Express REST API and React client, all mine.',
    stack: ['React', 'Node.js', 'Express', 'MariaDB'],
    category: 'Backend',
    repo: 'https://github.com/igarridosi/OWS',
    demo: 'https://openworkoutspots.netlify.app/',
  },
  {
    name: 'The Mole Game',
    tagline: 'Real-time multiplayer social deduction.',
    description:
      'A desktop game in C# where several clients share one authoritative game state, kept in sync in real time as players join, act and drop mid-round.',
    stack: ['C#', '.NET', 'Real-time networking'],
    category: 'Desktop',
    repo: 'https://github.com/igarridosi/TheMoleGame',
  },
];
