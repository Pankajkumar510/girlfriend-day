import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// Set your anniversary date here (YYYY, MM-1, DD)
const ANNIVERSARY_DATE = new Date(2024, 0, 14); // Jan 14, 2024

function pad(n) {
  return String(n).padStart(2, '0');
}

function getTimeDiff() {
  const now = new Date();
  const diff = now - ANNIVERSARY_DATE;
  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds };
}

function CounterUnit({ value, label, color, delay }) {
  const [displayValue, setDisplayValue] = useState(value);
  const prevValue = useRef(value);
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    if (value !== prevValue.current) {
      setFlip(true);
      const t = setTimeout(() => {
        setDisplayValue(value);
        setFlip(false);
      }, 200);
      prevValue.current = value;
      return () => clearTimeout(t);
    }
  }, [value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.6, type: 'spring', stiffness: 150 }}
      className="glass-card counter-glow flex flex-col items-center justify-center p-6 md:p-8 relative overflow-hidden"
      style={{
        border: `1px solid ${color}50`,
        minWidth: '120px',
        flex: '1',
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: 'absolute', inset: 0,
          background: `radial-gradient(circle at center, ${color}15, transparent 70%)`,
        }}
      />
      {/* Number */}
      <motion.div
        animate={flip ? { y: -10, opacity: 0.3 } : { y: 0, opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="font-display font-bold relative z-10"
        style={{
          fontSize: 'clamp(2rem, 6vw, 3.5rem)',
          color: '#fff',
          textShadow: `0 0 30px ${color}`,
          lineHeight: 1,
        }}
      >
        {pad(displayValue)}
      </motion.div>
      {/* Label */}
      <p
        className="font-body text-xs tracking-widest uppercase mt-2 relative z-10"
        style={{ color }}
      >
        {label}
      </p>
    </motion.div>
  );
}

export default function LoveCounter() {
  const [time, setTime] = useState(getTimeDiff);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    const interval = setInterval(() => setTime(getTimeDiff()), 1000);
    return () => clearInterval(interval);
  }, []);

  const units = [
    { key: 'days', label: 'Days', color: '#ff6b9d', delay: 0.1 },
    { key: 'hours', label: 'Hours', color: '#c77dff', delay: 0.2 },
    { key: 'minutes', label: 'Minutes', color: '#ffd700', delay: 0.3 },
    { key: 'seconds', label: 'Seconds', color: '#ff8fab', delay: 0.4 },
  ];

  return (
    <section
      id="counter"
      className="relative py-20 px-6"
      style={{
        background: 'linear-gradient(180deg, #0d001e 0%, #1a0030 50%, #0d0014 100%)',
      }}
    >
      <div className="max-w-4xl mx-auto" ref={ref}>
        {/* Header */}
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="font-script text-2xl mb-3"
            style={{ color: '#c77dff' }}
          >
            ⏳ Counting Every Precious Moment
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl font-bold gradient-text"
          >
            Love Counter
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-body text-lg mt-4"
            style={{ color: 'rgba(255,179,200,0.8)' }}
          >
            We have created memories for...
          </motion.p>
        </div>

        {/* Counter grid */}
        {isInView && (
          <div className="flex gap-4 flex-wrap justify-center">
            {units.map(unit => (
              <CounterUnit
                key={unit.key}
                value={time[unit.key]}
                label={unit.label}
                color={unit.color}
                delay={unit.delay}
              />
            ))}
          </div>
        )}

        {/* Bottom text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center mt-10"
        >
          <p className="font-script text-xl" style={{ color: '#ffb3c6' }}>
            ...and every second is a blessing. 💕
          </p>
          <div className="flex justify-center gap-2 mt-4">
            {['❤️', '💕', '💖'].map((h, i) => (
              <motion.span
                key={i}
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.5 }}
                className="text-2xl"
              >{h}</motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
