import { motion } from 'framer-motion';
import { MdWorkOutline, MdSchool, MdLocationOn, MdVerified } from 'react-icons/md';
import { FaLinkedinIn, FaQuoteLeft } from 'react-icons/fa';
import { roles, education, recommendation } from '../../data/experience';

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

    {/* The recommendation goes first. Anyone can write their own bullet
        points; this is the one paragraph on the page written by somebody
        else - the CTO who supervised the work - and it links straight to
        the original so it can be checked rather than taken on trust. */}
    <motion.figure
      {...fadeUp(0.05)}
      className="relative p-4 sm:p-5 border-2 border-gray-800 rounded-lg"
    >
      <p className="flex items-center gap-2 text-xs uppercase tracking-widest font-mono text-gray-400">
        <MdVerified className="text-base" />
        Recommendation
      </p>

      <blockquote className="mt-3">
        <p className="flex gap-3 text-base sm:text-lg font-bold leading-snug text-gray-900">
          <FaQuoteLeft aria-hidden="true" className="mt-1 shrink-0 text-sm text-gray-700" />
          <span>{recommendation.pullQuote}</span>
        </p>

        <div className="mt-3 space-y-2 sm:pl-7">
          {recommendation.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-sm text-gray-600 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </blockquote>

      <figcaption className="mt-4 sm:pl-7 flex flex-wrap items-end justify-between gap-x-4 gap-y-3">
        <div>
          <p className="text-sm font-bold text-gray-900">{recommendation.author}</p>
          <p className="text-xs text-gray-600">
            {recommendation.role} · {recommendation.relation}
          </p>
          <p className="mt-0.5 text-[11px] font-mono text-gray-500">
            {recommendation.date} · Translated from {recommendation.originalLanguage}
          </p>
        </div>

        <a
          href={recommendation.source}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-gray-800 border-2 border-gray-800 rounded hover:bg-gray-800 hover:text-white transition-colors"
        >
          <FaLinkedinIn aria-hidden="true" />
          Verify on LinkedIn
        </a>
      </figcaption>
    </motion.figure>

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
            <p className="mt-2 text-xs text-gray-600 leading-relaxed">{item.detail}</p>
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
      <p className="mt-1 text-sm text-gray-300">
        EU citizen, no visa required. Available immediately.
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
