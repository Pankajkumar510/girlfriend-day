import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const MEMORIES = [
  {
    emoji: '🌸',
    title: 'The Day We Met',
    desc: 'A moment that changed everything. The universe conspired to bring us together on this magical day.',
    color: '#ff6b9d',
    glow: 'rgba(255,107,157,0.4)',
    date: 'The Beginning',
  },
  {
    emoji: '❤️',
    title: 'Our First Conversation',
    desc: 'Words flowed like a river, effortlessly and endlessly. We talked for hours and it still wasn\'t enough.',
    color: '#c77dff',
    glow: 'rgba(199,125,255,0.4)',
    date: 'Getting to Know You',
  },
  {
    emoji: '🎉',
    title: 'Our Funniest Moment',
    desc: 'That time we laughed so hard tears rolled down our cheeks. I\'ll treasure that memory forever.',
    color: '#ffd700',
    glow: 'rgba(255,215,0,0.4)',
    date: 'Pure Joy',
  },
  {
    emoji: '✨',
    title: 'Every Little Memory',
    desc: 'The quiet evenings, the spontaneous adventures, the inside jokes — every tiny moment matters.',
    color: '#ff8fab',
    glow: 'rgba(255,143,171,0.4)',
    date: 'Day by Day',
  },
  {
    emoji: '💍',
    title: 'Forever Together',
    desc: 'Here\'s to all the memories yet to come, the chapters unwritten, and every tomorrow we share.',
    color: '#c77dff',
    glow: 'rgba(199,125,255,0.5)',
    date: 'Always & Forever',
  },
];

function TimelineCard({ memory, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const isLeft = index % 2 === 0;

  return (
    <div ref={ref} className={`flex items-center gap-6 ${isLeft ? 'flex-row' : 'flex-row-reverse'} relative`}>
      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -60 : 60, y: 20 }}
        animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
        className="glass-card p-6 flex-1 max-w-sm group"
        style={{
          border: `1px solid ${memory.color}40`,
          boxShadow: `0 0 30px ${memory.glow}`,
          transition: 'all 0.4s ease',
        }}
        whileHover={{
          scale: 1.03,
          boxShadow: `0 0 50px ${memory.glow}`,
          y: -4,
        }}
      >
        <div className="text-4xl mb-3">{memory.emoji}</div>
        <div
          className="text-xs font-body tracking-widest uppercase mb-2"
          style={{ color: memory.color }}
        >
          {memory.date}
        </div>
        <h3
          className="font-display text-xl font-bold mb-2"
          style={{ color: '#fff', textShadow: `0 0 20px ${memory.glow}` }}
        >
          {memory.title}
        </h3>
        <p className="font-body text-sm leading-relaxed" style={{ color: 'rgba(255,200,220,0.8)' }}>
          {memory.desc}
        </p>
      </motion.div>

      {/* Center dot */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.2, type: 'spring' }}
        className="relative flex-shrink-0 z-10"
      >
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center text-2xl"
          style={{
            background: `linear-gradient(135deg, ${memory.color}40, ${memory.color}20)`,
            border: `2px solid ${memory.color}80`,
            boxShadow: `0 0 20px ${memory.glow}`,
          }}
        >
          {memory.emoji}
        </div>
      </motion.div>

      {/* Spacer for other side */}
      <div className="flex-1 max-w-sm" />
    </div>
  );
}

export default function MemoryTimeline() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      id="timeline"
      className="relative py-20 px-6 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0d001e 0%, #1a0030 50%, #0d0014 100%)',
      }}
    >
      {/* Header */}
      <div className="text-center mb-16" ref={ref}>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-script text-2xl mb-3"
          style={{ color: '#c77dff' }}
        >
          💫 Our Beautiful Story
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-4xl md:text-5xl font-bold gradient-text"
        >
          Memory Timeline
        </motion.h2>
      </div>

      {/* Timeline */}
      <div className="max-w-4xl mx-auto relative">
        {/* Vertical line */}
        <div
          className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2"
          style={{
            background: 'linear-gradient(to bottom, transparent, #ff6b9d, #c77dff, #ffd700, #c77dff, #ff6b9d, transparent)',
          }}
        />

        <div className="flex flex-col gap-12">
          {MEMORIES.map((memory, index) => (
            <TimelineCard key={index} memory={memory} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
