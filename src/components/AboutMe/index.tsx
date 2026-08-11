import { motion } from 'framer-motion';
import { FaReact, FaGithub, FaPython } from 'react-icons/fa';
import { SiKotlin } from 'react-icons/si';
import { PiFileCSharp } from 'react-icons/pi';
import {
  MdOutlineSpeed, MdOutlineLayers, MdOutlinePublic, MdOutlineAutoAwesome,
  MdOutlineLocationOn, MdOutlineSchool, MdOutlineWorkOutline, MdOutlineFlag,
} from 'react-icons/md';

const stack = [
  { icon: <PiFileCSharp className="text-xl" />, label: 'C# / .NET', sub: 'Desktop & backend' },
  { icon: <FaReact className="text-xl" />, label: 'React / TS', sub: 'Web' },
  { icon: <FaPython className="text-xl" />, label: 'Python', sub: 'Data & IoT' },
  { icon: <SiKotlin className="text-xl" />, label: 'Kotlin', sub: 'Mobile' },
];

/* The quick facts a recruiter scans for before reading a single sentence. */
const facts = [
  { icon: <MdOutlineLocationOn />, label: 'Based in', value: 'Prague, Czech Republic' },
  { icon: <MdOutlineWorkOutline />, label: 'Open to', value: 'On-site, hybrid or remote in Europe' },
  { icon: <MdOutlineSchool />, label: 'Qualified', value: 'Two EQF Level 5 diplomas' },
  { icon: <MdOutlineFlag />, label: 'Experience', value: 'Internships in Spain and Belgium' },
];

const values = [
  {
    icon: <MdOutlineLayers className="text-2xl" />,
    title: 'I own the whole stack, not just the screen',
    text: "At SMARTENDS I wrote the Python services that chewed through high-frequency sensor data. At IRISBOND I worked down at the threading level in C#. In my own projects I design the database, the API and the client. Hand me a feature and I can take it from schema to pixel.",
  },
  {
    icon: <MdOutlineSpeed className="text-2xl" />,
    title: 'I treat performance as a feature',
    text: "My internship work was measured in latency, not tickets closed: keeping a Windows UI thread unblocked during eye-tracking calibration, cutting processing time on a real-time monitoring platform. I profile before I optimise, and I know the difference between slow code and a slow design.",
  },
  {
    icon: <MdOutlinePublic className="text-2xl" />,
    title: 'I already work across borders',
    text: "Two internships in two countries, and I moved to Prague to keep going. I am used to English-speaking teams, asynchronous communication and being the person who asks the clarifying question early rather than guessing.",
  },
  {
    icon: <MdOutlineAutoAwesome className="text-2xl" />,
    title: 'I ship fast without shipping mess',
    text: "I lean on AI tooling to move quickly, then review everything that lands. Git, code review and iterative delivery are habits, not requirements someone imposed on me. I would rather ask why a feature exists than build the wrong thing well.",
  },
];

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.4 },
});

const AboutMe = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="px-1 py-4 space-y-8"
    >
      <motion.div {...fadeUp(0.1)} className="space-y-3">
        <h2 className="text-2xl sm:text-3xl font-bold">About Me</h2>
        <p className="text-lg sm:text-xl leading-relaxed border-l-4 border-gray-800 pl-4 text-gray-800 font-medium">
          Most developers specialize in one platform.<br />
          <span className="font-bold">I build across four.</span>
        </p>
        <p className="text-gray-600 leading-relaxed">
          I'm a Full Stack Developer based in Prague, working on high-concurrency desktop
          applications and data-heavy web platforms. Two internships, one in Spain and one in
          Belgium, taught me to ship production software inside international teams and that
          most performance problems are design problems wearing a disguise.
        </p>
      </motion.div>

      {/* Quick facts */}
      <motion.div {...fadeUp(0.15)} className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {facts.map(({ icon, label, value }) => (
          <div
            key={label}
            className="flex items-center gap-2.5 px-3 py-2 border-2 border-gray-200 rounded-lg bg-gray-50"
          >
            <span className="text-lg text-gray-500 shrink-0">{icon}</span>
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-widest font-mono text-gray-400">{label}</p>
              <p className="text-sm font-semibold text-gray-800 leading-snug">{value}</p>
            </div>
          </div>
        ))}
      </motion.div>

      <motion.div {...fadeUp(0.2)} className="space-y-2">
        <p className="text-xs uppercase tracking-widest text-gray-400 font-mono">What I build with</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
          {stack.map(({ icon, label, sub }) => (
            <div key={label}
              className="flex flex-col items-center gap-1 sm:gap-1.5 p-2 sm:p-3 border-2 border-gray-800 bg-white shadow-[3px_3px_0px_0px_rgba(31,41,55)] text-center"
            >
              <span className="text-gray-700">{icon}</span>
              <span className="font-bold text-xs sm:text-sm text-gray-800">{label}</span>
              <span className="text-[10px] sm:text-xs text-gray-500 font-mono">{sub}</span>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div {...fadeUp(0.3)} className="space-y-3">
        <p className="text-xs uppercase tracking-widest text-gray-400 font-mono">Why work with me</p>
        <div className="space-y-4">
          {values.map(({ icon, title, text }) => (
            <div key={title} className="flex gap-3 items-start">
              <div className="mt-0.5 shrink-0 w-9 h-9 flex items-center justify-center border-2 border-gray-800 bg-gray-800 text-white">
                {icon}
              </div>
              <div>
                <p className="font-bold text-gray-800 text-sm">{title}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div {...fadeUp(0.4)}>
        <div className="flex items-center gap-3 p-4 border-2 border-gray-800 bg-gray-50">
          <FaGithub className="text-2xl shrink-0 text-gray-800" />
          <div>
            <p className="font-bold text-gray-800 text-sm">See the work, not just the words</p>
            <a href="https://github.com/igarridosi" target="_blank" rel="noopener noreferrer"
              className="text-sm text-gray-600 hover:text-gray-900 underline underline-offset-2 transition-colors">
              github.com/igarridosi →
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AboutMe;
