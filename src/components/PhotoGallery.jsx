import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const PHOTOS = [
  {
    id: 0,
    src: '/girlfriend-day/gallery/photo1.jpg',
    label: 'Among the sunflowers 🌻',
    caption: 'Where sunflowers bloom, so does my heart for you.',
  },
  {
    id: 1,
    src: '/girlfriend-day/gallery/photo2.jpg',
    label: 'Lost in the moment 🌸',
    caption: 'You look most beautiful when you are just yourself.',
  },
  {
    id: 2,
    src: '/girlfriend-day/gallery/photo3.jpg',
    label: 'Holding on ❤️',
    caption: 'In every journey, I just want your hand in mine.',
  },
  {
    id: 3,
    src: '/girlfriend-day/gallery/photo4.jpg',
    label: 'Together always 💕',
    caption: 'My favorite place in the world is right next to you.',
  },
  {
    id: 4,
    src: '/girlfriend-day/gallery/photo5.jpg',
    label: 'Us ✨',
    caption: 'Every moment with you is a memory I treasure forever.',
  },
];

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
        transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
        className="relative cursor-pointer group"
        onClick={() => setLightbox(true)}
        data-hoverable
      >
        {/* Card */}
        <motion.div
          className="w-full rounded-2xl overflow-hidden relative"
          whileHover={{ scale: 1.03, y: -6 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          style={{
            border: '1px solid rgba(255,107,157,0.3)',
            boxShadow: '0 8px 30px rgba(255,107,157,0.15)',
          }}
        >
          {/* Real image */}
          <img
            src={photo.src}
            alt={photo.label}
            className="w-full h-64 object-cover block"
            style={{ objectPosition: 'top center' }}
          />
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
            <p className="font-script text-sm text-white">{photo.label}</p>
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
            className="fixed inset-0 flex flex-col items-center justify-center z-[9000] p-6"
            style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(30px)' }}
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 220, damping: 26 }}
              onClick={e => e.stopPropagation()}
              className="relative max-w-sm w-full"
            >
              <img
                src={photo.src}
                alt={photo.label}
                className="w-full rounded-3xl shadow-2xl"
                style={{ border: '2px solid rgba(255,107,157,0.5)' }}
              />
              <div className="mt-4 text-center">
                <p className="font-script text-xl" style={{ color: '#ffb3c6' }}>{photo.label}</p>
                <p className="font-body text-sm mt-1" style={{ color: 'rgba(255,200,220,0.7)' }}>{photo.caption}</p>
              </div>
              <button
                onClick={() => setLightbox(false)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center bg-black/40 text-white/70 hover:text-white hover:bg-black/60 transition-all text-lg"
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
            Click on a photo to view it 💕
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PHOTOS.map((photo, i) => (
            <PhotoCard key={photo.id} photo={photo} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
