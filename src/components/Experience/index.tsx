import { motion } from 'framer-motion';
import { MdWorkOutline, MdSchool, MdLocationOn } from 'react-icons/md';
import { roles, education } from '../../data/experience';

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.4 },
});

const Experience = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.4 }}
    className="px-1 py-4 space-y-8"
  >
    <div className="space-y-1">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Experience</h1>
      <p className="text-sm text-gray-500">
        Two internships across two countries, shipping production software rather than coursework.
      </p>
    </div>

    {/* Professional experience */}
    <section className="space-y-3">
      <p className="flex items-center gap-2 text-xs uppercase tracking-widest text-gray-400 font-mono">
        <MdWorkOutline className="text-base" />
        Professional
      </p>

      <div className="relative space-y-4 sm:pl-6">
        {/* Timeline rail */}
        <div aria-hidden className="hidden sm:block absolute left-1.5 top-2 bottom-2 w-0.5 bg-gray-200" />

        {roles.map((role, i) => (
          <motion.article
            key={role.company}
            {...fadeUp(0.1 + i * 0.1)}
            className="relative p-4 bg-white border-2 border-gray-800 rounded-lg
              shadow-[3px_3px_0px_0px_rgba(31,41,55)] hover:shadow-[5px_5px_0px_0px_rgba(31,41,55)]
              transition-shadow duration-200"
          >
            {/* Timeline node */}
            <span
              aria-hidden
              className="hidden sm:block absolute -left-[26px] top-5 w-3 h-3 rounded-full bg-gray-800 border-2 border-white ring-2 ring-gray-800"
            />

            <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
              <h2 className="text-base font-bold text-gray-900">{role.company}</h2>
              <span className="text-xs font-mono text-gray-500 whitespace-nowrap">{role.period}</span>
            </div>

            <p className="mt-0.5 text-sm font-medium text-gray-800">{role.title}</p>

            <p className="mt-1 flex items-center gap-1 text-xs text-gray-500">
              <MdLocationOn className="text-sm shrink-0" />
              {role.location}
            </p>

            <ul className="mt-3 space-y-1.5">
              {role.highlights.map((point) => (
                <li key={point} className="flex gap-2 text-sm text-gray-600 leading-relaxed">
                  <span aria-hidden className="mt-[7px] shrink-0 w-1.5 h-1.5 bg-gray-800 rounded-full" />
                  {point}
                </li>
              ))}
            </ul>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {role.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 text-[11px] font-mono text-gray-700 bg-gray-100 border border-gray-300 rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </section>

    {/* Education */}
    <section className="space-y-3">
      <p className="flex items-center gap-2 text-xs uppercase tracking-widest text-gray-400 font-mono">
        <MdSchool className="text-base" />
        Education
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {education.map((item, i) => (
          <motion.div
            key={item.title}
            {...fadeUp(0.3 + i * 0.1)}
            className="p-4 bg-gray-50 border-2 border-gray-800 rounded-lg"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="px-1.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider bg-gray-800 text-white rounded">
                {item.level}
              </span>
              <span className="text-xs font-mono text-gray-500">{item.period}</span>
            </div>
            <h2 className="mt-2 text-sm font-bold text-gray-900 leading-snug">{item.title}</h2>
            <p className="mt-1 text-xs text-gray-600">{item.school}</p>
            <p className="text-xs text-gray-500">{item.location}</p>
          </motion.div>
        ))}
      </div>
    </section>

    {/* Availability */}
    <motion.div
      {...fadeUp(0.5)}
      className="p-4 border-2 border-gray-800 bg-gray-900 rounded-lg"
    >
      <p className="text-xs uppercase tracking-widest font-mono text-gray-400">Currently</p>
      <p className="mt-1.5 text-sm font-bold text-white">
        Based in Prague, open to on-site and hybrid roles here, or remote anywhere in Europe.
      </p>
      <a
        href="/cv/Ibai_Garrido_CV.pdf"
        download="Ibai_Garrido_CV.pdf"
        className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 text-sm font-bold text-gray-900 bg-white border-2 border-white rounded hover:bg-gray-100 transition-colors"
      >
        Download full CV
      </a>
    </motion.div>
  </motion.div>
);

export default Experience;
