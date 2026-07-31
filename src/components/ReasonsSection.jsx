import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const REASONS = [
  { emoji: '❤️', title: 'Your Smile', desc: 'The way you smile can light up an entire room and make my heart skip a beat.', color: '#ff6b9d' },
  { emoji: '🌹', title: 'Your Kindness', desc: 'The way you care for everyone around you is what makes you truly extraordinary.', color: '#ff8fab' },
  { emoji: '😊', title: 'Your Caring Nature', desc: 'You always know exactly what to say and do when I need it the most.', color: '#c77dff' },
  { emoji: '🌙', title: 'Your Beautiful Soul', desc: 'Your inner beauty radiates in everything you do. It\'s what drew me to you.', color: '#9d4edd' },
  { emoji: '✨', title: 'Your Laughter', desc: 'Your laughter is the most beautiful sound in the world. I could listen forever.', color: '#ffd700' },
  { emoji: '💫', title: 'Everything About You', desc: 'Every quirk, every habit, every unique thing about you — I love it all, endlessly.', color: '#ff6b9d' },
];

function ReasonCard({ reason, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
      className="glass-card p-6 relative group overflow-hidden"
      style={{
        border: `1px solid ${reason.color}30`,
      }}
      whileHover={{
        y: -10,
        scale: 1.03,
        boxShadow: `0 20px 60px ${reason.color}40, 0 0 40px ${reason.color}20`,
        borderColor: `${reason.color}60`,
      }}
      animate={isInView ? {
        y: [0, -6, 0],
        opacity: 1,
        scale: 1,
      } : { opacity: 0, y: 40, scale: 0.9 }}
      // Override the duplicate animate with transition
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at center, ${reason.color}15, transparent 70%)`,
        }}
      />

      {/* Floating animation layer */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3 + index * 0.4, repeat: Infinity, ease: 'easeInOut', delay: index * 0.3 }}
        className="relative z-10"
      >
        {/* Emoji */}
        <div
          className="text-5xl mb-4"
          style={{ filter: `drop-shadow(0 0 15px ${reason.color}80)` }}
        >
          {reason.emoji}
        </div>

        {/* Title */}
        <h3
          className="font-display text-xl font-bold mb-3"
          style={{ color: '#fff', textShadow: `0 0 20px ${reason.color}60` }}
        >
          {reason.title}
        </h3>

        {/* Desc */}
        <p
          className="font-body text-sm leading-relaxed"
          style={{ color: 'rgba(255,200,220,0.8)' }}
        >
          {reason.desc}
        </p>
      </motion.div>

      {/* Shimmer line at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(to right, transparent, ${reason.color}, transparent)` }}
      />
    </motion.div>
  );
}

export default function ReasonsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      id="reasons"
      className="relative py-20 px-6"
      style={{
        background: 'linear-gradient(180deg, #0d0014 0%, #1a0030 40%, #0d001e 100%)',
      }}
    >
      <div className="max-w-5xl mx-auto" ref={ref}>
        {/* Header */}
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="font-script text-2xl mb-3"
            style={{ color: '#c77dff' }}
          >
            💝 From the Bottom of My Heart
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl font-bold gradient-text"
          >
            Reasons I Love You
          </motion.h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {REASONS.map((reason, i) => (
            <ReasonCard key={i} reason={reason} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
