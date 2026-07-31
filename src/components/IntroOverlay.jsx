import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function IntroOverlay({ onEnter }) {
  const [isLeaving, setIsLeaving] = useState(false);

  const handleEnter = () => {
    setIsLeaving(true);
    setTimeout(() => {
      onEnter();
    }, 800); // Wait for fade out animation
  };

  return (
    <AnimatePresence>
      {!isLeaving && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center cursor-pointer"
          style={{
            background: 'radial-gradient(ellipse at center, #1a0030 0%, #0d0014 100%)',
          }}
          onClick={handleEnter}
        >
          {/* Pulsing hearts background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 15 }).map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
                style={{
                  position: 'absolute',
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  fontSize: `${20 + Math.random() * 40}px`,
                  filter: 'blur(4px)',
                }}
              >
                ❤️
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative z-10 text-center flex flex-col items-center"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="text-6xl mb-6"
              style={{ filter: 'drop-shadow(0 0 20px rgba(255,107,157,0.6))' }}
            >
              💌
            </motion.div>
            <h2 className="font-display text-4xl md:text-5xl font-bold gradient-text mb-4">
              A Special Surprise
            </h2>
            <p className="font-script text-2xl text-pink-300 mb-10">
              For Srija...
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-full font-body font-semibold text-white tracking-widest text-sm uppercase relative overflow-hidden group"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,107,157,0.5)',
                boxShadow: '0 0 20px rgba(255,107,157,0.2)',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10">Tap to Enter</span>
            </motion.button>
            <p className="mt-4 text-xs font-body text-white/40 tracking-widest uppercase">
              (Turn on your sound)
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
