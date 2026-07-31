import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import ReactConfetti from 'react-confetti';

const FINAL_LINES = [
  'I love you today,',
  'tomorrow,',
  'forever,',
  'and always. ❤️',
];

function FireworkParticle({ x, y, color }) {
  const angle = Math.random() * Math.PI * 2;
  const dist = 60 + Math.random() * 120;
  return (
    <motion.div
      initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
      animate={{
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist,
        scale: 0,
        opacity: 0,
      }}
      transition={{ duration: 0.8 + Math.random() * 0.6, ease: 'easeOut' }}
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: 6,
        height: 6,
        borderRadius: '50%',
        background: color,
        pointerEvents: 'none',
      }}
    />
  );
}

export default function FinalSurprise() {
  const [triggered, setTriggered] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [lineIndex, setLineIndex] = useState(0);
  const [fireworks, setFireworks] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const fwId = useRef(0);

  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const COLORS = ['#ff6b9d', '#c77dff', '#ffd700', '#ff8fab', '#e9d5ff', '#ffb347'];

  const spawnFirework = () => {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight * 0.7;
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    const pieces = Array.from({ length: 16 }, (_, i) => ({
      id: fwId.current++,
      x, y, color,
    }));
    setFireworks(prev => [...prev, ...pieces]);
    setTimeout(() => {
      setFireworks(prev => prev.filter(p => !pieces.map(pp => pp.id).includes(p.id)));
    }, 1500);
  };

  const handleTrigger = () => {
    setTriggered(true);
    setShowConfetti(true);

    // Start fireworks
    let count = 0;
    const fw = setInterval(() => {
      spawnFirework();
      count++;
      if (count > 20) clearInterval(fw);
    }, 300);

    // Show text content after a bit
    setTimeout(() => {
      setShowContent(true);
      // Reveal lines one by one
      FINAL_LINES.forEach((_, i) => {
        setTimeout(() => setLineIndex(i + 1), i * 900 + 600);
      });
    }, 1500);

    // Stop confetti after 8s
    setTimeout(() => setShowConfetti(false), 8000);
  };

  return (
    <>
      {/* Trigger Section */}
      <section
        id="surprise"
        ref={ref}
        className="relative py-24 px-6 flex flex-col items-center justify-center min-h-screen"
        style={{
          background: 'linear-gradient(180deg, #0d001e 0%, #1a0030 50%, #0d0014 100%)',
        }}
      >
        {!triggered && (
          <div className="text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl md:text-5xl font-bold gradient-text mb-8"
            >
              Final Surprise
            </motion.h2>
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3, type: 'spring' }}
              onClick={handleTrigger}
              whileHover={{ scale: 1.08, y: -4 }}
              whileTap={{ scale: 0.95 }}
              className="glow-btn px-12 py-5 rounded-full font-body font-semibold text-white text-xl"
              data-hoverable
            >
              <span className="relative z-10">One Last Surprise ❤️</span>
            </motion.button>
          </div>
        )}

        {/* Overlay */}
        <AnimatePresence>
          {triggered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 z-[8000] flex items-center justify-center"
              style={{ background: 'rgba(5,0,15,0.97)', backdropFilter: 'blur(8px)' }}
            >
              {/* Confetti */}
              {showConfetti && (
                <ReactConfetti
                  width={windowSize.width}
                  height={windowSize.height}
                  colors={COLORS}
                  numberOfPieces={300}
                  recycle={false}
                  gravity={0.15}
                  style={{ zIndex: 8001 }}
                />
              )}

              {/* Firework particles */}
              <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 8002 }}>
                {fireworks.map(fw => (
                  <FireworkParticle key={fw.id} x={fw.x} y={fw.y} color={fw.color} />
                ))}
              </div>

              {/* Floating Hearts */}
              {Array.from({ length: 25 }, (_, i) => (
                <motion.div
                  key={i}
                  initial={{ y: window.innerHeight + 50, x: Math.random() * window.innerWidth, opacity: 0.8 }}
                  animate={{ y: -100, opacity: 0 }}
                  transition={{
                    duration: 3 + Math.random() * 4,
                    delay: Math.random() * 3,
                    repeat: Infinity,
                    ease: 'easeOut',
                  }}
                  style={{
                    position: 'fixed',
                    fontSize: `${20 + Math.random() * 30}px`,
                    zIndex: 8003,
                    pointerEvents: 'none',
                  }}
                >
                  {['❤️','💕','💖','💗','💝'][i % 5]}
                </motion.div>
              ))}

              {/* Animated Roses */}
              {Array.from({ length: 12 }, (_, i) => (
                <motion.div
                  key={`rose-${i}`}
                  initial={{ y: -50, x: Math.random() * window.innerWidth, opacity: 1, rotate: 0 }}
                  animate={{ y: window.innerHeight + 100, rotate: 360, opacity: 0 }}
                  transition={{
                    duration: 4 + Math.random() * 3,
                    delay: Math.random() * 4,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  style={{
                    position: 'fixed',
                    fontSize: `${24 + Math.random() * 20}px`,
                    zIndex: 8003,
                    pointerEvents: 'none',
                  }}
                >
                  🌹
                </motion.div>
              ))}

              {/* Main Content */}
              <div className="relative z-[8010] text-center px-6 max-w-2xl mx-auto">
                {/* Glowing Heart */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.3, 1] }}
                  transition={{ delay: 0.5, duration: 1, ease: 'easeOut' }}
                  className="text-9xl mb-8 inline-block"
                  style={{
                    filter: 'drop-shadow(0 0 40px rgba(255,107,157,1)) drop-shadow(0 0 80px rgba(255,107,157,0.6))',
                  }}
                >
                  ❤️
                </motion.div>

                {/* Lines */}
                <div className="space-y-3 mb-10">
                  {showContent && FINAL_LINES.map((line, i) => (
                    <AnimatePresence key={i}>
                      {lineIndex > i && (
                        <motion.p
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, ease: 'easeOut' }}
                          className="font-script"
                          style={{
                            fontSize: i === 3 ? '2.5rem' : '2rem',
                            color: i === 3 ? '#ff6b9d' : '#fff',
                            textShadow: '0 0 30px rgba(255,107,157,0.8)',
                          }}
                        >
                          {line}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  ))}
                </div>

                {/* Final message */}
                {lineIndex >= FINAL_LINES.length && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.8, type: 'spring' }}
                  >
                    <p
                      className="font-display text-2xl md:text-3xl font-bold"
                      style={{
                        background: 'linear-gradient(135deg, #ff6b9d, #ffd700, #c77dff)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        textShadow: 'none',
                        filter: 'drop-shadow(0 0 20px rgba(255,107,157,0.5))',
                      }}
                    >
                      Happy Girlfriend's Day, Srija. 💕
                    </p>

                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1 }}
                      onClick={() => setTriggered(false)}
                      className="mt-10 px-8 py-3 rounded-full font-body text-sm text-white/70 hover:text-white transition-colors"
                      style={{ border: '1px solid rgba(255,107,157,0.3)', background: 'rgba(255,107,157,0.1)' }}
                      data-hoverable
                    >
                      Return to our story 💕
                    </motion.button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </>
  );
}
