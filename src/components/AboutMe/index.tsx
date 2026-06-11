import { motion } from 'framer-motion';
import { FaReact, FaGithub } from 'react-icons/fa';
import { SiKotlin } from 'react-icons/si';
import { PiFileCSharp } from 'react-icons/pi';
import { MdOutlineRocketLaunch, MdOutlineLightbulb, MdOutlineHandshake } from 'react-icons/md';

const stack = [
  { icon: <FaReact className="text-xl" />, label: 'React', sub: 'Web' },
  { icon: <PiFileCSharp className="text-xl" />, label: 'C# / .NET', sub: 'Backend' },
  { icon: <SiKotlin className="text-xl" />, label: 'Kotlin', sub: 'Mobile' },
];

const values = [
  {
    icon: <MdOutlineRocketLaunch className="text-2xl" />,
    title: 'I ship complete products',
    text: "Not just UI. I build and connect every layer — frontend, backend logic, and database — so things actually work in production.",
  },
  {
    icon: <MdOutlineLightbulb className="text-2xl" />,
    title: 'I think before I code',
    text: "I treat every feature as a design problem first. Clean architecture and maintainable code aren't side effects — they're the goal.",
  },
  {
    icon: <MdOutlineHandshake className="text-2xl" />,
    title: 'I grow fast in teams',
    text: "Git, code reviews, and iterative delivery are how I work. I'm looking for a team where I can contribute from day one and keep improving.",
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
      className="px-2 py-4 space-y-8"
    >
      <motion.div {...fadeUp(0.1)} className="space-y-3">
        <h2 className="text-2xl sm:text-3xl font-bold">About Me</h2>
        <p className="text-lg sm:text-xl leading-relaxed border-l-4 border-gray-800 pl-4 text-gray-800 font-medium">
          Most developers specialize in one platform.<br />
          <span className="font-bold">I build across three.</span>
        </p>
        <p className="text-gray-600 leading-relaxed">
          I'm a Fullstack Developer based in Oiartzun, Spain, focused on delivering end-to-end digital products, web interfaces, backend logic, and native mobile apps, all from a single developer.
        </p>
      </motion.div>

      <motion.div {...fadeUp(0.2)} className="space-y-2">
        <p className="text-xs uppercase tracking-widest text-gray-400 font-mono">What I build with</p>
        <div className="grid grid-cols-3 gap-3">
          {stack.map(({ icon, label, sub }) => (
            <div key={label}
              className="flex flex-col items-center gap-1.5 p-3 border-2 border-gray-800 bg-white shadow-[3px_3px_0px_0px_rgba(31,41,55)] text-center"
            >
              <span className="text-gray-700">{icon}</span>
              <span className="font-bold text-sm text-gray-800">{label}</span>
              <span className="text-xs text-gray-500 font-mono">{sub}</span>
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
