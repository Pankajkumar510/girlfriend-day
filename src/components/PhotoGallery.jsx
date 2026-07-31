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
  {
    id: 5,
    src: '/girlfriend-day/gallery/photo6.jpg',
    label: 'Sunshine smile 🌟',
    caption: 'Your smile is the most beautiful thing I have ever seen.',
  },
  {
    id: 6,
    src: '/girlfriend-day/gallery/photo7.jpg',
    label: 'Pure joy 🌻',
    caption: 'Your laugh is my favorite sound in the entire world.',
  },
  {
    id: 7,
    src: '/girlfriend-day/gallery/photo8.jpg',
    label: 'City lights 🌉',
    caption: 'You light up every room you walk into, just like the city at night.',
  },
  {
    id: 8,
    src: '/girlfriend-day/gallery/photo9.jpg',
    label: 'My world 💞',
    caption: 'With you beside me, every place feels like home.',
  },
];

// Split photos into columns for masonry layout
function splitIntoColumns(photos, numCols) {
  const cols = Array.from({ length: numCols }, () => []);
  photos.forEach((photo, i) => cols[i % numCols].push({ ...photo, index: i }));
  return cols;
}

function PhotoCard({ photo, onClick }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: photo.index * 0.07, ease: 'easeOut' }}
      className="relative cursor-pointer group mb-4"
      onClick={() => onClick(photo)}
      data-hoverable
    >
      <motion.div
        className="rounded-2xl overflow-hidden relative"
        whileHover={{ scale: 1.02, y: -4 }}
        transition={{ duration: 0.3 }}
        style={{
          border: '1px solid rgba(255,107,157,0.25)',
          boxShadow: '0 4px 24px rgba(255,107,157,0.1)',
        }}
      >
        {/* Full photo — no fixed height, no cropping */}
        <img
          src={photo.src}
          alt={photo.label}
          className="w-full block"
          style={{ display: 'block' }}
        />
        {/* Elegant hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-400 flex flex-col items-center justify-end pb-5 px-4">
          <p className="font-script text-base text-white drop-shadow-lg">{photo.label}</p>
          <p className="font-body text-xs text-white/60 mt-1">Tap to open</p>
        </div>
        {/* Subtle glow border on hover */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ boxShadow: 'inset 0 0 0 1.5px rgba(255,107,157,0.5)' }}
        />
      </motion.div>
    </motion.div>
  );
}

export default function PhotoGallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [lightboxPhoto, setLightboxPhoto] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (photo) => {
    setLightboxPhoto(photo);
    setLightboxIndex(photo.id);
  };

  const navigate = (dir) => {
    const next = (lightboxIndex + dir + PHOTOS.length) % PHOTOS.length;
    setLightboxIndex(next);
    setLightboxPhoto(PHOTOS[next]);
  };

  // 3 columns on desktop, 2 on tablet, 1 on mobile (via CSS)
  const cols3 = splitIntoColumns(PHOTOS, 3);
  const cols2 = splitIntoColumns(PHOTOS, 2);

  return (
    <section
      id="gallery"
      className="relative py-20 px-4 md:px-6"
      style={{
        background: 'linear-gradient(180deg, #0d0014 0%, #1a0030 50%, #0d001e 100%)',
      }}
    >
      <div className="max-w-6xl mx-auto">
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
            Tap any photo to view it in full 💕
          </motion.p>
        </div>

        {/* Masonry Grid — 3 columns on lg, 2 on sm, 1 on xs */}
        {/* Desktop 3-col */}
        <div className="hidden lg:flex gap-4 items-start">
          {cols3.map((col, ci) => (
            <div key={ci} className="flex-1 flex flex-col">
              {col.map((photo) => (
                <PhotoCard key={photo.id} photo={photo} onClick={openLightbox} />
              ))}
            </div>
          ))}
        </div>

        {/* Tablet 2-col */}
        <div className="hidden sm:flex lg:hidden gap-4 items-start">
          {cols2.map((col, ci) => (
            <div key={ci} className="flex-1 flex flex-col">
              {col.map((photo) => (
                <PhotoCard key={photo.id} photo={photo} onClick={openLightbox} />
              ))}
            </div>
          ))}
        </div>

        {/* Mobile 1-col */}
        <div className="flex sm:hidden flex-col gap-4">
          {PHOTOS.map((photo, i) => (
            <PhotoCard key={photo.id} photo={{ ...photo, index: i }} onClick={openLightbox} />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxPhoto(null)}
            className="fixed inset-0 flex items-center justify-center z-[9000] p-4"
            style={{ background: 'rgba(0,0,0,0.93)', backdropFilter: 'blur(30px)' }}
          >
            <motion.div
              initial={{ scale: 0.75, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.75, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 240, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex flex-col items-center"
              style={{ maxWidth: '90vw', maxHeight: '90vh' }}
            >
              <img
                src={lightboxPhoto.src}
                alt={lightboxPhoto.label}
                className="rounded-2xl shadow-2xl"
                style={{
                  maxHeight: '75vh',
                  maxWidth: '90vw',
                  width: 'auto',
                  objectFit: 'contain',
                  border: '2px solid rgba(255,107,157,0.4)',
                }}
              />
              <div className="mt-4 text-center px-4">
                <p className="font-script text-xl" style={{ color: '#ffb3c6' }}>{lightboxPhoto.label}</p>
                <p className="font-body text-sm mt-1" style={{ color: 'rgba(255,200,220,0.65)' }}>{lightboxPhoto.caption}</p>
              </div>

              {/* Prev / Next buttons */}
              <div className="flex gap-4 mt-5">
                <button
                  onClick={() => navigate(-1)}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-lg transition-all"
                  style={{ background: 'rgba(255,107,157,0.2)', border: '1px solid rgba(255,107,157,0.4)' }}
                >‹</button>
                <span className="font-body text-xs self-center" style={{ color: 'rgba(255,179,200,0.5)' }}>
                  {lightboxIndex + 1} / {PHOTOS.length}
                </span>
                <button
                  onClick={() => navigate(1)}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-lg transition-all"
                  style={{ background: 'rgba(255,107,157,0.2)', border: '1px solid rgba(255,107,157,0.4)' }}
                >›</button>
              </div>

              {/* Close */}
              <button
                onClick={() => setLightboxPhoto(null)}
                className="absolute top-2 right-2 w-9 h-9 rounded-full flex items-center justify-center text-white/70 hover:text-white text-xl transition-all"
                style={{ background: 'rgba(0,0,0,0.5)' }}
              >×</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
