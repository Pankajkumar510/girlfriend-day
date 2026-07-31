import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NOTES = [
  { text: 'You are my favorite person.', emoji: '💕', sub: 'In the whole universe...' },
  { text: 'You make every day brighter.', emoji: '☀️', sub: 'Just by being you...' },
  { text: 'You are my safe place.', emoji: '🏡', sub: 'My home, my heart...' },
  { text: "I'll always choose you.", emoji: '💍', sub: 'Today, tomorrow, always...' },
  { text: 'Forever starts with you.', emoji: '♾️', sub: 'And never ends...' },
  { text: 'You are my greatest adventure.', emoji: '🌟', sub: 'Every day with you...' },
  { text: 'My heart chose you.', emoji: '❤️', sub: 'And keeps choosing you...' },
];

export default function LoveCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef(null);

  const next = () => setCurrent(c => (c + 1) % NOTES.length);
  const prev = () => setCurrent(c => (c - 1 + NOTES.length) % NOTES.length);

  useEffect(() => {
    if (!paused) {
      intervalRef.current = setInterval(next, 3500);
    }
    return () => clearInterval(intervalRef.current);
  }, [paused, current]);

  return (
    <section
      id="carousel"
      className="relative py-20 px-6"
      style={{
        background: 'linear-gradient(180deg, #0d001e 0%, #1a0030 50%, #0d0014 100%)',
      }}
    >
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="font-script text-2xl mb-3" style={{ color: '#c77dff' }}>
            💌 Words From My Soul
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold gradient-text">
            Love Notes
          </h2>
        </div>

        {/* Carousel */}
        <div
          className="relative glass-card overflow-hidden"
          style={{
            border: '1px solid rgba(255,107,157,0.3)',
            boxShadow: '0 0 60px rgba(255,107,157,0.15)',
            minHeight: '280px',
          }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Background glow */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                position: 'absolute',
                inset: 0,
                background: `radial-gradient(circle at center, rgba(255,107,157,0.1), transparent 70%)`,
              }}
            />
          </AnimatePresence>

          {/* Slide content */}
          <div className="relative p-12 flex flex-col items-center justify-center min-h-72 text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.95 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="flex flex-col items-center gap-4"
              >
                <motion.div
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-6xl"
                  style={{ filter: 'drop-shadow(0 0 20px rgba(255,107,157,0.8))' }}
                >
                  {NOTES[current].emoji}
                </motion.div>

                <blockquote
                  className="font-script text-2xl md:text-3xl leading-relaxed"
                  style={{ color: '#fff', textShadow: '0 0 30px rgba(255,107,157,0.5)' }}
                >
                  "{NOTES[current].text}"
                </blockquote>

                <p
                  className="font-body text-sm italic"
                  style={{ color: 'rgba(255,179,200,0.6)' }}
                >
                  {NOTES[current].sub}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass-card flex items-center justify-center text-white/60 hover:text-white hover:border-pink-400/50 transition-all"
            style={{ border: '1px solid rgba(255,107,157,0.3)' }}
            data-hoverable
          >
            ‹
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass-card flex items-center justify-center text-white/60 hover:text-white hover:border-pink-400/50 transition-all"
            style={{ border: '1px solid rgba(255,107,157,0.3)' }}
            data-hoverable
          >
            ›
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {NOTES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="transition-all duration-300"
              style={{
                width: i === current ? '24px' : '8px',
                height: '8px',
                borderRadius: '4px',
                background: i === current
                  ? 'linear-gradient(to right, #ff6b9d, #c77dff)'
                  : 'rgba(255,107,157,0.3)',
                border: 'none',
                cursor: 'pointer',
              }}
              data-hoverable
            />
          ))}
        </div>
      </div>
    </section>
  );
}
