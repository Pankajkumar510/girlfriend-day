import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative py-12 px-6"
      style={{
        background: 'linear-gradient(180deg, #0d0014 0%, #0a000f 100%)',
        borderTop: '1px solid rgba(255,107,157,0.15)',
      }}
    >
      {/* Glow line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '60%',
          height: '1px',
          background: 'linear-gradient(to right, transparent, #ff6b9d, #c77dff, transparent)',
          filter: 'blur(2px)',
        }}
      />

      <div className="max-w-4xl mx-auto text-center">
        {/* Hearts row */}
        <motion.div
          className="flex justify-center gap-3 mb-6 text-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {['💕', '❤️', '💖', '❤️', '💕'].map((h, i) => (
            <motion.span
              key={i}
              animate={{ y: [0, -8, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            >
              {h}
            </motion.span>
          ))}
        </motion.div>

        {/* Main text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="font-script text-2xl md:text-3xl mb-2"
          style={{ color: '#ffb3c6' }}
        >
          Made with ❤️ only for you.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="font-body text-sm"
          style={{ color: 'rgba(255,179,200,0.5)' }}
        >
          Happy Girlfriend's Day {currentYear} 🌹
        </motion.p>

        {/* Divider */}
        <div className="my-6 flex items-center gap-4">
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(255,107,157,0.3))' }} />
          <span className="text-xl">🌸</span>
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, rgba(199,125,255,0.3))' }} />
        </div>

        {/* Navigation links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 text-xs font-body"
          style={{ color: 'rgba(255,179,200,0.5)' }}
        >
          {[
            ['Our Story', '#hero'],
            ['Love Letter', '#letter'],
            ['Memories', '#timeline'],
            ['Gallery', '#gallery'],
            ['Counter', '#counter'],
            ['Reasons', '#reasons'],
          ].map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="hover:text-pink-300 transition-colors"
              data-hoverable
            >
              {label}
            </a>
          ))}
        </motion.div>

        {/* Easter egg hint */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-6 text-xs font-body"
          style={{ color: 'rgba(255,179,200,0.25)' }}
        >
          🔮 Press H five times for a secret...
        </motion.p>
      </div>
    </footer>
  );
}
