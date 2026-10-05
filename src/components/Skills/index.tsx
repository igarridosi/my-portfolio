import { useLayoutEffect, useRef, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import {
  FaReact, FaHtml5, FaGitAlt, FaGithub, FaBolt, FaChartLine,
  FaLayerGroup, FaRobot,
} from 'react-icons/fa';
import {
  SiTypescript, SiTailwindcss, SiJavascript, SiMysql, SiMariadb, SiDotnet,
  SiKotlin, SiJetpackcompose, SiAndroid, SiNextdotjs, SiSass, SiPython,
  SiDocker, SiPostgresql, SiGithubactions, SiNodedotjs, SiMui, SiSupabase,
  SiTerraform, SiMaterialdesign,
} from 'react-icons/si';
import {
  MdSync, MdSpeed, MdAutoAwesome, MdDesktopWindows, MdDesignServices,
  MdKey, MdInsights, MdStorage, MdNotificationsActive, MdDevices,
} from 'react-icons/md';
import { VscAzure } from 'react-icons/vsc';
import { PiFileCSharp } from 'react-icons/pi';

interface Skill {
  name: string;
  icon: ReactNode;
}

const skillCategories: { title: string; skills: Skill[] }[] = [
  {
    title: 'Languages & Frontend',
    skills: [
      { name: 'TypeScript', icon: <SiTypescript /> },
      { name: 'JavaScript', icon: <SiJavascript /> },
      { name: 'React', icon: <FaReact /> },
      { name: 'Next.js', icon: <SiNextdotjs /> },
      { name: 'Tailwind CSS', icon: <SiTailwindcss /> },
      { name: 'Sass', icon: <SiSass /> },
      { name: 'Material UI', icon: <SiMui /> },
      { name: 'HTML5 / CSS3', icon: <FaHtml5 /> },
      { name: 'WPF', icon: <MdDesktopWindows /> },
    ],
  },
  {
    title: 'Backend & Systems',
    skills: [
      { name: 'C#', icon: <PiFileCSharp /> },
      { name: '.NET Core', icon: <SiDotnet /> },
      { name: 'Python', icon: <SiPython /> },
      { name: 'Node.js', icon: <SiNodedotjs /> },
      { name: 'RESTful APIs', icon: <FaLayerGroup /> },
      { name: 'Multithreading', icon: <FaBolt /> },
    ],
  },
  {
    title: 'Mobile',
    skills: [
      { name: 'Kotlin', icon: <SiKotlin /> },
      { name: 'Jetpack Compose', icon: <SiJetpackcompose /> },
      { name: 'Material 3', icon: <SiMaterialdesign /> },
      { name: 'Room', icon: <MdStorage /> },
      { name: 'WorkManager', icon: <MdNotificationsActive /> },
      { name: 'Android SDK', icon: <SiAndroid /> },
    ],
  },
  {
    title: 'Databases',
    skills: [
      { name: 'PostgreSQL', icon: <SiPostgresql /> },
      { name: 'Supabase', icon: <SiSupabase /> },
      { name: 'MySQL', icon: <SiMysql /> },
      { name: 'MariaDB', icon: <SiMariadb /> },
    ],
  },
  {
    title: 'Cloud & Infrastructure',
    skills: [
      { name: 'Azure Functions', icon: <VscAzure /> },
      { name: 'Azure Key Vault', icon: <MdKey /> },
      { name: 'Azure Blob Storage', icon: <VscAzure /> },
      { name: 'Application Insights', icon: <MdInsights /> },
      { name: 'Terraform', icon: <SiTerraform /> },
    ],
  },
  {
    title: 'Architecture & Practices',
    skills: [
      { name: 'Asynchronous Systems', icon: <MdSync /> },
      { name: 'UI/UX Development', icon: <MdDesignServices /> },
      { name: 'Performance Optimization', icon: <MdSpeed /> },
      { name: 'Responsive Design', icon: <MdDevices /> },
      { name: 'Real-time Data Visualization', icon: <FaChartLine /> },
    ],
  },
  {
    title: 'Tools & DevOps',
    skills: [
      { name: 'Git', icon: <FaGitAlt /> },
      { name: 'GitHub', icon: <FaGithub /> },
      { name: 'Docker', icon: <SiDocker /> },
      { name: 'GitHub Actions CI/CD', icon: <SiGithubactions /> },
      { name: 'AI-assisted development', icon: <MdAutoAwesome /> },
      { name: 'GitHub Copilot', icon: <FaGithub /> },
      { name: 'Claude Code', icon: <FaRobot /> },
    ],
  },
];

/* Which groups share a column on a wide screen. The browser's own column
   balancing, told never to split a group, put Languages and Backend together
   - sixteen names in one column against seven in the last - and the tallest
   column is the one that decides how large the type can be. Weighing a
   heading as two names, these four come out at 11, 15, 15 and 16: as even as
   seven groups of these sizes allow. Reading down each column still goes
   from the language to what is built with it. */
const COLUMNS = [
  ['Languages & Frontend'],
  ['Backend & Systems', 'Cloud & Infrastructure'],
  ['Mobile', 'Architecture & Practices'],
  ['Databases', 'Tools & DevOps'],
];

/** The groups in column order. Anything not placed above goes in the last
    column rather than silently disappearing. */
const columns = (() => {
  const byTitle = new Map(skillCategories.map((c) => [c.title, c]));
  const placed = COLUMNS.map((titles) =>
    titles.flatMap((t) => (byTitle.has(t) ? [byTitle.get(t)!] : [])),
  );
  const listed = new Set(COLUMNS.flat());
  placed[placed.length - 1].push(...skillCategories.filter((c) => !listed.has(c.title)));
  return placed;
})();

/* The range the index may be set in. The floor keeps it readable on a laptop
   at 150% scaling; the ceiling stops it turning into a poster on a 4K screen. */
const FS_MIN = 11;
const FS_MAX = 18;

/**
 * Sets the index in the largest type that still fits the page.
 *
 * On a desktop every page is a box of fixed height, and whether this one fits
 * depends on how many names wrap - which depends on the column width, the
 * font, and the font having loaded. No formula in CSS can know that, so it is
 * measured instead: a binary search on the type size against the height the
 * box actually has, redone whenever that box changes size. Everything in the
 * index is sized in `em`, so one number scales the text and the spacing
 * around it together.
 *
 * Below the desktop breakpoint the page scrolls like every other one and the
 * stylesheet's own size applies.
 */
function useFitToBox() {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const box = ref.current;
    const main = document.getElementById('main');
    if (!box || !main) return;
    const desktop = window.matchMedia('(min-width: 1024px)');

    const fit = () => {
      if (!desktop.matches) {
        box.style.removeProperty('--skill-fs');
        return;
      }
      const cs = getComputedStyle(main);
      // The wrapper's own vertical padding comes off the room as well.
      const room =
        main.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom) - 20;

      let lo = FS_MIN;
      let hi = FS_MAX;
      for (let step = 0; step < 7; step += 1) {
        const mid = (lo + hi) / 2;
        box.style.setProperty('--skill-fs', mid + 'px');
        // offsetHeight is layout, so the entry animation's transform does
        // not count against the room.
        if (box.offsetHeight <= room) lo = mid;
        else hi = mid;
      }
      // The largest size that fits can sit right on the edge of a name
      // wrapping: a hundredth of a pixel more - a rounding, another
      // browser's text metrics, a zoom level - and a whole line is added.
      // Back off a little from that edge, then make sure it really fits.
      let size = lo * 0.98;
      box.style.setProperty('--skill-fs', size + 'px');
      while (box.offsetHeight > room && size > FS_MIN) {
        size = Math.max(FS_MIN, size - 0.25);
        box.style.setProperty('--skill-fs', size + 'px');
      }
    };

    fit();
    // The box changes with the window; the names change width once the
    // teletext face has loaded. `document.fonts.ready` alone is not enough
    // for that: a face is only requested when text using it is first laid
    // out, so on a cold load the promise can already be settled while the
    // face is still on its way, and the size measured with the fallback font
    // then overflows by a line or two. `loadingdone` fires when it lands.
    const observer = new ResizeObserver(fit);
    observer.observe(main);
    desktop.addEventListener('change', fit);
    document.fonts?.addEventListener('loadingdone', fit);
    let alive = true;
    document.fonts?.ready.then(() => alive && fit());

    return () => {
      alive = false;
      observer.disconnect();
      desktop.removeEventListener('change', fit);
      document.fonts?.removeEventListener('loadingdone', fit);
    };
  }, []);

  return ref;
}

function Skills() {
  const fitRef = useFitToBox();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      // Centred in the page's fixed box rather than hung from the top of it:
      // once everything fits, what is left over is better split above and
      // below than left as a hole at the bottom.
      className="w-full min-h-full flex flex-col justify-center px-1 py-2"
    >
      <div ref={fitRef} className="skill-fit">
      {/* Title and subtitle share a line: the teletext banner above already
          says SKILLS in double height, so this only has to carry the page's
          h1 for screen readers and a word of context, not take a second
          block of the screen for it. */}
      <div className="mb-4 flex flex-wrap items-baseline gap-x-4 gap-y-0.5">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="text-xl sm:text-2xl font-bold text-gray-900"
        >
          Technical Skills
        </motion.h1>
        <p className="text-xs sm:text-sm text-gray-500">
          What I reach for, grouped by where it lives in the stack.
        </p>
      </div>

      {/* An index, not a wall of tags. Each group is a heading and a plain
          list. On a wide screen the groups sit in the four columns chosen
          above; below that the column wrappers dissolve and the groups flow
          through as many columns as fit. */}
      <div className="skill-index columns-1 sm:columns-2 md:columns-3">
        {columns.map((column, columnIndex) => (
          <div key={columnIndex} className="skill-col">
            {column.map((category) => (
          <motion.section
            key={category.title}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: skillCategories.indexOf(category) * 0.05 }}
            className="skill-group"
          >
            <h2 className="uppercase tracking-widest font-mono text-gray-400">
              {category.title}
            </h2>
            <ul>
              {category.skills.map((skill) => (
                <li key={skill.name} className="skill-item">
                  <span aria-hidden="true" className="skill-item__icon text-gray-700">
                    {skill.icon}
                  </span>
                  <span className="text-gray-800">{skill.name}</span>
                </li>
              ))}
            </ul>
          </motion.section>
            ))}
          </div>
        ))}
      </div>
      </div>
    </motion.div>
  );
}

export default Skills;
