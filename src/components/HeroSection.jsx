import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';

// Floating Heart particle
function FloatingHeart({ style }) {
  return (
    <div
      className="float-heart select-none pointer-events-none"
      style={style}
    >
      {style.emoji}
    </div>
  );
}

// Glow particle
function GlowParticle({ style }) {
  return (
    <div
      className="glow-particle absolute"
      style={style}
    />
  );
}

const HEART_EMOJIS = ['❤️', '💕', '💖', '💗', '💝', '🩷', '💞', '💓'];

export default function HeroSection({ onOpenHeart, titleClickCount, onTitleClick }) {
  const ref = useRef(null);
  const [exploded, setExploded] = useState(false);
  const [explosionPieces, setExplosionPieces] = useState([]);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Generate floating hearts
  const hearts = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    emoji: HEART_EMOJIS[i % HEART_EMOJIS.length],
    left: `${Math.random() * 100}%`,
    animationDuration: `${8 + Math.random() * 12}s`,
    animationDelay: `${Math.random() * 10}s`,
    fontSize: `${16 + Math.random() * 30}px`,
    opacity: 0.3 + Math.random() * 0.5,
  }));

  // Glow particles
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    width: `${3 + Math.random() * 8}px`,
    height: `${3 + Math.random() * 8}px`,
    background: i % 3 === 0
      ? 'rgba(255,107,157,0.8)'
      : i % 3 === 1
      ? 'rgba(199,125,255,0.8)'
      : 'rgba(255,215,0,0.8)',
    animationDuration: `${3 + Math.random() * 5}s`,
    animationDelay: `${Math.random() * 5}s`,
  }));

  const handleOpenHeart = useCallback(() => {
    // Trigger explosion
    const pieces = Array.from({ length: 24 }, (_, i) => ({
      id: i,
      angle: (Math.PI * 2 * i) / 24,
      dist: 100 + Math.random() * 200,
      emoji: HEART_EMOJIS[i % HEART_EMOJIS.length],
      size: 20 + Math.random() * 30,
    }));
    setExplosionPieces(pieces);
    setExploded(true);
    setTimeout(() => setExploded(false), 1000);
    onOpenHeart();
  }, [onOpenHeart]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at center, #1a0030 0%, #2d0a4e 30%, #0d0014 70%)',
      }}
    >
      {/* Parallax wrapper */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 pointer-events-none">
        {/* Floating Hearts */}
        {hearts.map(h => (
          <FloatingHeart
            key={h.id}
            style={{
              emoji: h.emoji,
              left: h.left,
              animationDuration: h.animationDuration,
              animationDelay: h.animationDelay,
              fontSize: h.fontSize,
              opacity: h.opacity,
            }}
          />
        ))}
        {/* Glow Particles */}
        {particles.map(p => (
          <GlowParticle
            key={p.id}
            style={{
              left: p.left,
              top: p.top,
              width: p.width,
              height: p.height,
              background: p.background,
              animationDuration: p.animationDuration,
              animationDelay: p.animationDelay,
            }}
          />
        ))}
        {/* Radial glow blobs */}
        <div style={{
          position: 'absolute', top: '20%', left: '15%',
          width: '300px', height: '300px',
          background: 'radial-gradient(circle, rgba(255,107,157,0.15) 0%, transparent 70%)',
          borderRadius: '50%', filter: 'blur(40px)',
        }} />
        <div style={{
          position: 'absolute', bottom: '25%', right: '15%',
          width: '250px', height: '250px',
          background: 'radial-gradient(circle, rgba(199,125,255,0.15) 0%, transparent 70%)',
          borderRadius: '50%', filter: 'blur(40px)',
        }} />
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Subtitle above */}
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="font-script text-xl mb-4"
          style={{ color: '#c77dff' }}
        >
          ✨ A special day for someone special ✨
        </motion.p>

        {/* Main Title with typing effect */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mb-6"
        >
          <h1
            className="font-display font-bold leading-tight cursor-pointer select-none"
            style={{ fontSize: 'clamp(2.2rem, 7vw, 5rem)' }}
            onClick={onTitleClick}
            data-hoverable
          >
            <TypeAnimation
              sequence={[
                'Happy Girlfriend\'s Day, Srija ❤️',
                3000,
                'Srija, You Are My Everything 💕',
                2000,
                'I Love You Forever 💖',
                2000,
                'Happy Girlfriend\'s Day, Srija ❤️',
                5000,
              ]}
              wrapper="span"
              speed={50}
              className="gradient-text"
              repeat={Infinity}
            />
          </h1>
          {titleClickCount >= 3 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm mt-2"
              style={{ color: 'rgba(255,215,0,0.7)' }}
            >
              {5 - titleClickCount} more clicks for a secret... 🔮
            </motion.p>
          )}
        </motion.div>

        {/* Beating Heart */}
        <motion.div
          animate={{ scale: [1, 1.08, 1, 1.08, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-8xl my-8 inline-block"
          style={{ filter: 'drop-shadow(0 0 30px rgba(255,107,157,0.8))' }}
        >
          ❤️
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="font-body text-lg md:text-xl mb-10 leading-relaxed"
          style={{ color: 'rgba(255,179,200,0.9)' }}
        >
          Srija, to the most beautiful person who makes every day brighter.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="relative inline-block"
        >
          <motion.button
            onClick={handleOpenHeart}
            whileHover={{ scale: 1.08, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="glow-btn magnetic-btn relative px-10 py-4 rounded-full font-body font-semibold text-white text-lg z-10"
            style={{ letterSpacing: '0.05em' }}
            data-hoverable
          >
            <span className="relative z-10">Open My Heart 💖</span>
          </motion.button>

          {/* Explosion */}
          <AnimatePresence>
            {exploded && explosionPieces.map(piece => (
              <motion.div
                key={piece.id}
                initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
                animate={{
                  x: Math.cos(piece.angle) * piece.dist,
                  y: Math.sin(piece.angle) * piece.dist,
                  opacity: 0,
                  scale: 1.5,
                }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  fontSize: piece.size,
                  pointerEvents: 'none',
                  zIndex: 20,
                }}
              >
                {piece.emoji}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-16 flex flex-col items-center gap-2 opacity-50"
        >
          <span className="text-xs font-body tracking-widest uppercase" style={{ color: '#c77dff' }}>
            Scroll to explore
          </span>
          <div style={{
            width: '24px', height: '40px',
            border: '2px solid rgba(199,125,255,0.5)',
            borderRadius: '12px',
            display: 'flex', justifyContent: 'center', paddingTop: '6px',
          }}>
            <motion.div
              animate={{ y: [0, 14, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{
                width: '4px', height: '8px',
                background: '#c77dff',
                borderRadius: '2px',
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
