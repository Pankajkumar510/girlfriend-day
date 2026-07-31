import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';

const LETTER_LINES = [
  'My love, Srija,',
  '',
  'Every moment with you feels like the best chapter of my life.',
  'Thank you for your kindness, your smile, your endless support,',
  'and for making ordinary days feel magical.',
  '',
  'No matter where life takes us,',
  "you'll always have a special place in my heart.",
  '',
  "Happy Girlfriend's Day ❤️",
];

function LetterLine({ text, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });

  return (
    <motion.p
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.18, duration: 0.6, ease: 'easeOut' }}
      className={`font-script leading-relaxed ${text === '' ? 'h-4' : ''} ${
        index === 0 ? 'text-2xl font-bold mb-2' : 'text-lg'
      } ${text.includes('❤️') ? 'text-2xl font-bold mt-4' : ''}`}
      style={{
        color: index === 0 ? '#ffd700' : text.includes('❤️') ? '#ff6b9d' : 'rgba(255,230,240,0.9)',
        textShadow: index === 0 ? '0 0 20px rgba(255,215,0,0.5)' : 'none',
      }}
    >
      {text || '\u00A0'}
    </motion.p>
  );
}

export default function LoveLetterSection() {
  const [opened, setOpened] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const handleOpen = () => {
    setOpened(true);
    setTimeout(() => setShowLetter(true), 800);
  };

  return (
    <section
      id="letter"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center py-20 px-6"
      style={{
        background: 'linear-gradient(180deg, #0d0014 0%, #1a0030 50%, #0d001e 100%)',
      }}
    >
      {/* Section header */}
      <div className="max-w-3xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="font-script text-2xl mb-3" style={{ color: '#c77dff' }}>
            ✉️ A Letter From My Heart
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold gradient-text">
            My Love Letter
          </h2>
        </motion.div>

        {/* Envelope + Letter */}
        <div className="flex flex-col items-center">
          {/* Envelope */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative w-full max-w-lg"
            style={{ perspective: '1200px' }}
          >
            {/* Envelope body */}
            <div
              className="relative glass-card overflow-hidden"
              style={{
                padding: '0',
                border: '1px solid rgba(255,107,157,0.3)',
                boxShadow: '0 0 40px rgba(255,107,157,0.2)',
              }}
            >
              {/* Envelope flap */}
              <motion.div
                initial={{ rotateX: 0 }}
                animate={opened ? { rotateX: -170 } : { rotateX: 0 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
                style={{
                  transformOrigin: 'top center',
                  background: 'linear-gradient(135deg, rgba(255,107,157,0.3), rgba(199,125,255,0.3))',
                  padding: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '80px',
                  cursor: opened ? 'default' : 'pointer',
                  borderBottom: '1px solid rgba(255,107,157,0.2)',
                  backfaceVisibility: 'hidden',
                }}
                onClick={!opened ? handleOpen : undefined}
                data-hoverable
              >
                {!opened ? (
                  <div className="text-center">
                    <div className="text-4xl mb-2">💌</div>
                    <p className="font-script text-sm" style={{ color: '#ffb3c6' }}>
                      Click to open your letter...
                    </p>
                  </div>
                ) : (
                  <div className="text-4xl">💌</div>
                )}
              </motion.div>

              {/* Letter content */}
              <AnimatePresence>
                {showLetter && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    style={{
                      background: 'linear-gradient(135deg, rgba(26,0,48,0.9), rgba(13,0,30,0.9))',
                      padding: '36px 40px',
                      overflow: 'hidden',
                    }}
                  >
                    {/* Decorative lines */}
                    <div className="space-y-1">
                      {LETTER_LINES.map((line, i) => (
                        <LetterLine key={i} text={line} index={i} />
                      ))}
                    </div>
                    {/* Wax seal */}
                    <div className="flex justify-end mt-8">
                      <motion.div
                        initial={{ scale: 0, rotate: -20 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: LETTER_LINES.length * 0.18 + 0.5, type: 'spring' }}
                        className="text-4xl"
                        style={{ filter: 'drop-shadow(0 0 10px rgba(255,107,157,0.6))' }}
                      >
                        💝
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Bottom envelope part when closed */}
              {!showLetter && (
                <div style={{
                  background: 'linear-gradient(135deg, rgba(255,107,157,0.1), rgba(199,125,255,0.1))',
                  padding: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <p className="font-script text-lg" style={{ color: 'rgba(255,179,200,0.5)' }}>
                    {opened ? '📖 Opening...' : '🔒 Your letter awaits...'}
                  </p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Decorative hearts below */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={showLetter ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="mt-8 flex gap-3 text-2xl"
          >
            {['💕', '💖', '💗', '💝', '💕'].map((h, i) => (
              <motion.span
                key={i}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
              >{h}</motion.span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
