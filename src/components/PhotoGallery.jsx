import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const PLACEHOLDERS = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  label: 'Add your favorite photo',
  emoji: ['🌸', '💕', '✨', '💖', '🌹', '💝', '🌺', '💗'][i],
  color: [
    'rgba(255,107,157,0.3)',
    'rgba(199,125,255,0.3)',
    'rgba(255,215,0,0.3)',
    'rgba(255,143,171,0.3)',
    'rgba(255,107,157,0.3)',
    'rgba(199,125,255,0.3)',
    'rgba(255,215,0,0.3)',
    'rgba(255,143,171,0.3)',
  ][i],
  border: [
    'rgba(255,107,157,0.5)',
    'rgba(199,125,255,0.5)',
    'rgba(255,215,0,0.5)',
    'rgba(255,143,171,0.5)',
    'rgba(255,107,157,0.5)',
    'rgba(199,125,255,0.5)',
    'rgba(255,215,0,0.5)',
    'rgba(255,143,171,0.5)',
  ][i],
}));

function PhotoCard({ photo, index }) {
  const [lightbox, setLightbox] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0.85, y: 30 }}
        animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.08, ease: 'easeOut' }}
        className="relative cursor-pointer group"
        style={{ aspectRatio: '1 / 1' }}
        onClick={() => setLightbox(true)}
        data-hoverable
      >
        {/* Card */}
        <motion.div
          className="w-full h-full rounded-2xl overflow-hidden relative"
          whileHover={{ scale: 1.05, y: -6 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          style={{
            background: `radial-gradient(circle at center, ${photo.color}, rgba(13,0,20,0.9))`,
            border: `1px solid ${photo.border}`,
            boxShadow: `0 0 20px ${photo.color}`,
          }}
        >
          {/* Glow on hover */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at center, ${photo.color}, transparent 70%)`,
              filter: 'blur(8px)',
            }}
          />
          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.3 }}
              className="text-4xl"
              style={{ filter: `drop-shadow(0 0 10px ${photo.border})` }}
            >
              {photo.emoji}
            </motion.div>
            <p
              className="font-script text-sm text-center"
              style={{ color: 'rgba(255,210,230,0.8)' }}
            >
              {photo.label}
            </p>
            <div
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs font-body"
              style={{ color: 'rgba(255,255,255,0.6)' }}
            >
              Click to view
            </div>
          </div>

          {/* Corner decoration */}
          <div
            className="absolute top-2 right-2 text-sm opacity-40"
          >
            ✨
          </div>
        </motion.div>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(false)}
            className="fixed inset-0 flex items-center justify-center z-[9000] lightbox-overlay"
            style={{ background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(30px)' }}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 25 }}
              onClick={e => e.stopPropagation()}
              className="relative w-80 h-80 md:w-96 md:h-96 rounded-3xl overflow-hidden"
              style={{
                background: `radial-gradient(circle at center, ${photo.color}, rgba(13,0,20,0.95))`,
                border: `2px solid ${photo.border}`,
                boxShadow: `0 0 60px ${photo.color}, 0 0 120px ${photo.color}40`,
              }}
            >
              <div className="w-full h-full flex flex-col items-center justify-center gap-4 p-8">
                <div className="text-7xl">{photo.emoji}</div>
                <p className="font-script text-xl text-center" style={{ color: '#ffb3c6' }}>
                  {photo.label}
                </p>
                <p className="font-body text-xs text-center" style={{ color: 'rgba(255,200,220,0.6)' }}>
                  Replace with your cherished memory 💕
                </p>
              </div>
              <button
                onClick={() => setLightbox(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function PhotoGallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      id="gallery"
      className="relative py-20 px-6"
      style={{
        background: 'linear-gradient(180deg, #0d0014 0%, #1a0030 50%, #0d001e 100%)',
      }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12" ref={ref}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="font-script text-2xl mb-3"
            style={{ color: '#c77dff' }}
          >
            📸 Our Beautiful Moments
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl font-bold gradient-text"
          >
            Photo Gallery
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-body mt-4 text-sm"
            style={{ color: 'rgba(255,179,200,0.6)' }}
          >
            Add your most treasured photos here 💕
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {PLACEHOLDERS.map((photo, i) => (
            <PhotoCard key={photo.id} photo={photo} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
