import { motion } from 'framer-motion';

const CVSection = () => {
  return (
    <section className="relative flex flex-col items-center w-full lg:h-full">
      <motion.div
        className="relative w-full overflow-hidden flex justify-center items-center bg-black cv-height lg:absolute lg:inset-0"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* The portrait is already a teletext page, black surround included, so
            it is shown whole (`contain`) against the same black rather than
            cropped, and carries no grayscale filter that would kill its palette.
            `pixelated` keeps the character blocks crisp instead of smoothing
            them away when the frame scales the image up. */}
        <motion.img
          src="/img/teletext-portrait.webp"
          alt="Ibai Garrido, rendered as a teletext page"
          className="w-full h-full object-contain [image-rendering:pixelated]"
          fetchPriority="high"
          decoding="async"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            opacity: { duration: 0.3 },
            scale: { duration: 0.8, ease: 'easeOut' },
          }}
        />
      </motion.div>
    </section>
  );
};

export default CVSection;
