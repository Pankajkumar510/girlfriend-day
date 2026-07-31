import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function EasterEgg() {
  const [count, setCount] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === '♥' || e.key === 'h' || e.key === 'H') {
        setCount(c => c + 1);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  useEffect(() => {
    if (count >= 5) {
      setShow(true);
      setCount(0);
    }
  }, [count]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShow(false)}
          className="fixed inset-0 flex items-center justify-center z-[99999]"
          style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(20px)' }}
        >
          <motion.div
            initial={{ scale: 0.5, y: 60 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.5, y: 60 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="glass-card text-center p-12 max-w-md mx-4 relative"
            style={{ border: '1px solid rgba(255,107,157,0.4)', boxShadow: '0 0 60px rgba(255,107,157,0.4)' }}
            onClick={e => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setShow(false)}
              className="absolute top-4 right-4 text-white/40 hover:text-white text-2xl"
            >×</button>

            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="text-6xl mb-6"
            >🔮</motion.div>

            <h3 className="font-display text-3xl mb-4 gradient-text font-bold">
              You Found It!
            </h3>
            <p className="font-script text-xl leading-relaxed" style={{ color: '#ffb3c6' }}>
              "You found my hidden message...
              <br /><br />
              I fall in love with you
              <br />
              a little more every single day. ❤️"
            </p>
            <motion.div className="mt-8 flex justify-center gap-2">
              {['❤️','💕','💖','💗','💝'].map((h, i) => (
                <motion.span
                  key={i}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.2 }}
                  className="text-2xl"
                >{h}</motion.span>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Export the trigger function so HeroSection can call it
export { };
