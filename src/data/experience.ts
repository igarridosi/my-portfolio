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
}

export const roles: Role[] = [
  {
    company: 'IRISBOND',
    title: 'Software Developer Intern, C# / .NET',
    location: 'San Sebastián, Spain',
    period: 'Jan 2026 to Apr 2026',
    highlights: [
      'Engineered "HiruSystray", a multithreaded Windows application in C# for eye-tracking hardware calibration, eliminating UI thread blocking to keep the interface responsive under load.',
      'Implemented gaze-control algorithms (Dwell) with custom cursor-smoothing filters and tolerance zones, making navigation fully accessible without a mouse.',
      'Built real-time video and avatar positioning modules plus interactive calibration UI, shipped to assistive-technology clients worldwide.',
    ],
    stack: ['C#', '.NET', 'Multithreading', 'Real-time UI'],
  },
  {
    company: 'SMARTENDS',
    title: 'Software Developer Intern, Python / IoT',
    location: 'Ghent, Belgium',
    period: 'Jan 2025 to Apr 2025',
    highlights: [
      'Developed IoT backend modules in Python processing high-frequency sensor data for waste management and route optimisation.',
      'Optimised a real-time monitoring platform visualising fill levels, geographic patterns and collection schedules, cutting data processing latency.',
      'Worked in a cross-border team where the features shipped measurably improved collection efficiency and reduced operating costs.',
    ],
    stack: ['Python', 'IoT', 'Data Processing'],
  },
];

export const education: Qualification[] = [
  {
    title: 'Higher Technician in Cross-Platform Application Development',
    school: 'IES Xabier Zubiri Manteo',
    location: 'San Sebastián, Spain',
    period: '2025 / 2026',
    level: 'EQF Level 5',
  },
  {
    title: 'Higher Technician in Web Application Development',
    school: 'IES Xabier Zubiri Manteo',
    location: 'San Sebastián, Spain',
    period: '2023 / 2025',
    level: 'EQF Level 5',
  },
];
