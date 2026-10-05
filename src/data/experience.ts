export interface Role {
  company: string;
  title: string;
  location: string;
  period: string;
  /** Concrete outcomes, strongest first */
  highlights: string[];
  stack: string[];
}

export interface Qualification {
  title: string;
  school: string;
  location: string;
  period: string;
  /** European Qualifications Framework level, recognised across the EU */
  level: string;
  /** What the course actually covered, in one or two lines */
  detail: string;
}

/** A recommendation someone gave on LinkedIn, shown where it can be checked. */
export interface Recommendation {
  author: string;
  role: string;
  /** How they knew the work - a supervisor's word carries more than a peer's */
  relation: string;
  date: string;
  /** The line worth reading if nothing else is */
  pullQuote: string;
  /** The full text, translated. The original is on LinkedIn. */
  paragraphs: string[];
  /** Language it was written in, so the translation is never passed off as the original */
  originalLanguage: string;
  /** Where anyone can confirm it is real */
  source: string;
}

export const roles: Role[] = [
  {
    company: 'IRISBOND',
    title: 'Software Developer Intern, C# / .NET',
    location: 'San Sebastián, Spain',
    period: 'Mar 2026 to Jun 2026',
    highlights: [
      'Engineered "HiruSystray", a multithreaded Windows application in C# for eye-tracking hardware calibration, moving rendering off the UI thread and tripling the frame rate from 30 to 90 FPS.',
      'Implemented advanced gaze-control algorithms (Dwell) with custom cursor-smoothing filters and tolerance zones, achieving 100% accessible navigation without a mouse.',
      'Developed real-time video and avatar positioning modules and interactive calibration UI components, used by assistive-technology clients worldwide.',
    ],
    stack: ['C#', '.NET', 'Multithreading', 'Real-time UI'],
  },
  {
    company: 'SMARTENDS',
    title: 'Software Developer Intern, Python / IoT',
    location: 'Ghent, Belgium',
    period: 'Mar 2025 to Jun 2025',
    highlights: [
      'Developed IoT backend modules in Python processing high-frequency sensor data for waste management and route optimisation.',
      'Optimised a real-time monitoring platform visualising fill levels, geographic patterns and collection schedules, cutting data processing latency.',
    ],
    stack: ['Python', 'IoT', 'Data Processing'],
  },
];

export const education: Qualification[] = [
  {
    title: 'Higher Technician in Cross-Platform Application Development',
    school: 'IES Xabier Zubiri Manteo',
    location: 'San Sebastián, Spain',
    period: '2024 / 2026',
    level: 'EQF Level 5',
    detail:
      'Two-year vocational degree, 2,000 hours including a supervised industry placement. Concurrency, multithreading and sockets; mobile and multimedia programming; data access and persistence layers.',
  },
  {
    title: 'Higher Technician in Web Application Development',
    school: 'IES Xabier Zubiri Manteo',
    location: 'San Sebastián, Spain',
    period: '2022 / 2024',
    level: 'EQF Level 5',
    detail:
      'Two-year vocational degree, 2,000 hours including a supervised industry placement. Client- and server-side web development, usability and accessibility, deployment and relational databases.',
  },
];

export const recommendation: Recommendation = {
  author: 'David Ruiz Osés',
  role: 'CTO, Irisbond',
  relation: 'Supervised Ibai directly',
  date: 'September 2026',
  pullQuote:
    "He doesn't hesitate to ask when needed, but quickly takes the initiative and solves problems independently.",
  paragraphs: [
    'Working alongside Ibai during his internship at Irisbond was a very positive experience. From the first day he proved to be an exceptionally proactive and courageous professional, always willing to help with whatever was needed.',
    "What I would highlight most about working with him is his ability to keep an ideal balance between autonomy and teamwork: he doesn't hesitate to ask when needed, but quickly takes the initiative and solves problems independently. His openness to constructive criticism also lets him learn and adapt at an incredible pace.",
    'Day to day, his character and approachability make him very easy and pleasant to communicate with, and he always brings a great atmosphere to the team.',
    'Without a doubt, he is a profile with enormous potential who will add great value to any project or team he is part of.',
  ],
  originalLanguage: 'Spanish',
  source: 'https://www.linkedin.com/in/ibai-garrido/details/recommendations/',
};
