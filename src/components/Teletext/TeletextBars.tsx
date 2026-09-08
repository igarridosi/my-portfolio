import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaGithub, FaLinkedinIn, FaDownload, FaEnvelope } from 'react-icons/fa';

/**
 * Teletext indexed its sections in hundreds, so the routes borrow the scheme.
 * The title is what goes in the double-height banner.
 */
const PAGES: Record<string, { page: string; title: string }> = {
  '/': { page: '100', title: 'Home' },
  '/about': { page: '200', title: 'About' },
  '/experience': { page: '300', title: 'Experience' },
  '/projects': { page: '400', title: 'Projects' },
  '/skills': { page: '500', title: 'Skills' },
  '/contact': { page: '600', title: 'Contact' },
};

const NAV = [
  { to: '/', label: 'Home', page: '100' },
  { to: '/about', label: 'About', page: '200' },
  { to: '/experience', label: 'Experience', page: '300' },
  { to: '/projects', label: 'Projects', page: '400' },
  { to: '/skills', label: 'Skills', page: '500' },
  { to: '/contact', label: 'Contact', page: '600' },
];

/** Bottom row: off-page links, so it never duplicates the navigation above. */
const LINKS = [
  { href: 'https://github.com/igarridosi', label: 'GitHub', key: '901', dot: 'text-tt-red', icon: FaGithub },
  { href: 'https://www.linkedin.com/in/ibai-garrido/', label: 'LinkedIn', key: '902', dot: 'text-tt-green', icon: FaLinkedinIn },
  { href: '/cv/Ibai_Garrido_CV.pdf', label: 'CV', key: '903', dot: 'text-tt-yellow', icon: FaDownload, download: true },
  { href: 'mailto:garridotab4@gmail.com', label: 'Email', key: '904', dot: 'text-tt-cyan', icon: FaEnvelope },
];

const DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
const two = (n: number) => String(n).padStart(2, '0');

/**
 * The teletext page header: status row, double-height banner, dashed rule.
 * Decorative - the page number, clock and banner repeat what the navigation
 * and the page's own <h1> already say, so it is hidden from assistive tech
 * rather than read out twice.
 */
export const TeletextHeader = ({ pathname }: { pathname: string }) => {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const { page, title } = PAGES[pathname] ?? PAGES['/'];

  return (
    <div aria-hidden="true" className="bg-black font-mono select-none px-3 sm:px-5 pt-1">
      {/* Status row, as every broadcast page carried it. */}
      <div className="flex items-center justify-between gap-3 text-[10px] sm:text-xs tracking-[0.14em] uppercase">
        <span className="text-tt-white">
          Portfolio <span className="text-tt-cyan">1</span> {page}
        </span>
        <span className="tabular-nums text-tt-white">
          {DAYS[now.getDay()]} {two(now.getDate())} {MONTHS[now.getMonth()]}{' '}
          <span className="text-tt-yellow">
            {two(now.getHours())}:{two(now.getMinutes())}
            <span className="text-tt-cyan">/{two(now.getSeconds())}</span>
          </span>
        </span>
      </div>

      <TeletextRule />

      {/* Banner: the cyan station box beside a double-height title. */}
      <div className="flex items-end justify-between gap-4">
        <div className="flex items-center gap-2.5 sm:gap-4 min-w-0">
          <span className="shrink-0 px-2 py-0.5 bg-tt-cyan text-black text-sm sm:text-xl font-bold tracking-[0.15em] leading-tight">
            IG
          </span>
          <span className="truncate text-tt-yellow font-display uppercase leading-none text-2xl sm:text-4xl lg:text-5xl tracking-[0.1em]">
            {title}
          </span>
        </div>
        <span className="shrink-0 text-right text-[10px] sm:text-xs tracking-[0.14em] uppercase text-tt-cyan tabular-nums leading-snug">
          <span className="hidden sm:block">Prague</span>
          <span className="block text-tt-white">{page}/600</span>
        </span>
      </div>

      <TeletextRule />
    </div>
  );
};

/** The row of dashes teletext drew between blocks. */
export const TeletextRule = ({ className = '' }: { className?: string }) => (
  <div
    aria-hidden="true"
    className={`h-[2px] my-0.5 ${className}`}
    style={{
      backgroundImage:
        'repeating-linear-gradient(90deg, currentColor 0 10px, transparent 10px 16px)',
      color: '#fff',
    }}
  />
);

/**
 * Primary navigation, drawn as a teletext index row: name in white, page
 * number in colour. Replaces the old bookmark tabs.
 */
export const TeletextNav = () => (
  <nav
    aria-label="Main"
    className="bg-tt-blue font-mono text-[11px] sm:text-sm uppercase tracking-[0.14em]
      border-y-2 border-black overflow-x-auto no-scrollbar"
  >
    <ul className="flex min-w-max sm:min-w-0 sm:justify-center">
      {NAV.map(({ to, label, page }) => (
        <li key={to} className="flex">
          <NavLink
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              [
                'group flex items-center gap-2 px-3 sm:px-5 py-2.5 sm:py-3 whitespace-nowrap',
                'transition-colors duration-100',
                isActive
                  ? 'bg-tt-yellow text-black'
                  : 'text-tt-white hover:bg-tt-white hover:text-tt-blue',
              ].join(' ')
            }
          >
            {label}
            <span
              className="tabular-nums text-tt-cyan group-hover:text-tt-blue
                group-[.bg-tt-yellow]:text-tt-red"
              aria-hidden="true"
            >
              {page}
            </span>
          </NavLink>
        </li>
      ))}
    </ul>
  </nav>
);

/** Bottom row: the coloured key strip, here pointing off-site. */
export const TeletextFooter = () => (
  <div className="bg-black font-mono px-3 sm:px-5 pb-2.5">
    <TeletextRule />
    <nav
      aria-label="Elsewhere"
      className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-2
        text-[10px] sm:text-xs uppercase tracking-[0.12em]"
    >
      {LINKS.map(({ href, label, key, dot, icon: Icon, download }) => (
        <a
          key={href}
          href={href}
          {...(download
            ? { download: 'Ibai_Garrido_CV.pdf' }
            : href.startsWith('http')
              ? { target: '_blank', rel: 'noopener noreferrer' }
              : {})}
          className="group flex items-center gap-2 min-w-0 text-tt-white py-1
            hover:bg-tt-white hover:text-black transition-colors duration-100 px-1.5 -mx-1.5"
        >
          <Icon className={`shrink-0 ${dot} group-hover:text-black`} aria-hidden="true" />
          <span className="truncate">{label}</span>
          <span
            aria-hidden="true"
            className="flex-1 h-px self-end mb-1 opacity-40"
            style={{
              backgroundImage:
                'repeating-linear-gradient(90deg, currentColor 0 2px, transparent 2px 6px)',
            }}
          />
          <span aria-hidden="true" className="tabular-nums text-tt-cyan group-hover:text-black">
            {key}
          </span>
        </a>
      ))}
    </nav>
  </div>
);
