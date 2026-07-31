import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import CursorGlow from './components/CursorGlow';
import ScrollProgress from './components/ScrollProgress';
import FloatingPetals from './components/FloatingPetals';
import HeartGarden from './components/HeartGarden';
import EasterEgg from './components/EasterEgg';
import HeroSection from './components/HeroSection';
import LoveLetterSection from './components/LoveLetterSection';
import MemoryTimeline from './components/MemoryTimeline';
import PhotoGallery from './components/PhotoGallery';
import LoveCounter from './components/LoveCounter';
import ReasonsSection from './components/ReasonsSection';
import LoveCarousel from './components/LoveCarousel';
import FloatingMusicPlayer from './components/FloatingMusicPlayer';
import FinalSurprise from './components/FinalSurprise';
import Footer from './components/Footer';

// Easter egg: title click tracker
let eggClickCount = 0;
let eggShow = null;

function useEasterEgg() {
  const [showEgg, setShowEgg] = useState(false);
  const countRef = useRef(0);

  const triggerClick = useCallback(() => {
    countRef.current += 1;
    if (countRef.current >= 5) {
      setShowEgg(true);
      countRef.current = 0;
    }
    return countRef.current;
  }, []);

  return { showEgg, setShowEgg, triggerClick, count: countRef };
}

export default function App() {
  const [pageLoaded, setPageLoaded] = useState(false);
  const { showEgg, setShowEgg, triggerClick, count } = useEasterEgg();
  const [titleClickCount, setTitleClickCount] = useState(0);

  useEffect(() => {
    // Page load animation
    const t = setTimeout(() => setPageLoaded(true), 200);
    return () => clearTimeout(t);
  }, []);

  const handleOpenHeart = useCallback(() => {
    const letterSection = document.getElementById('letter');
    if (letterSection) {
      letterSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleTitleClick = useCallback(() => {
    const newCount = count.current + 1;
    count.current = newCount;
    setTitleClickCount(newCount);
    if (newCount >= 5) {
      setShowEgg(true);
      count.current = 0;
      setTitleClickCount(0);
    }
  }, [count, setShowEgg]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={pageLoaded ? { opacity: 1 } : {}}
      transition={{ duration: 1 }}
      className="relative min-h-screen page-reveal"
      style={{ background: '#0d0014' }}
    >
      {/* Global overlays */}
      <CursorGlow />
      <ScrollProgress />
      <FloatingPetals count={12} />
      <HeartGarden />
      
      {/* Easter egg modal */}
      <AnimatePresence>
        {showEgg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowEgg(false)}
            className="fixed inset-0 flex items-center justify-center z-[99999]"
            style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(20px)' }}
          >
            <motion.div
              initial={{ scale: 0.5, y: 60 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.5, y: 60 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="glass-card text-center p-12 max-w-md mx-4 relative"
              style={{ border: '1px solid rgba(255,107,157,0.4)', boxShadow: '0 0 60px rgba(255,107,157,0.4)' }}
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setShowEgg(false)}
                className="absolute top-4 right-4 text-white/40 hover:text-white text-2xl"
              >×</button>
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="text-6xl mb-6"
              >🔮</motion.div>
              <h3 className="font-display text-3xl mb-4 gradient-text font-bold">
                You Found It!
              </h3>
              <p className="font-script text-xl leading-relaxed" style={{ color: '#ffb3c6' }}>
                "You found my hidden message...
                <br /><br />
                I fall in love with you
                <br />
                a little more every single day. ❤️"
              </p>
              <motion.div className="mt-8 flex justify-center gap-2">
                {['❤️','💕','💖','💗','💝'].map((h, i) => (
                  <motion.span
                    key={i}
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.2 }}
                    className="text-2xl"
                  >{h}</motion.span>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating music player */}
      <FloatingMusicPlayer />

      {/* Main sections */}
      <main>
        <HeroSection
          onOpenHeart={handleOpenHeart}
          titleClickCount={titleClickCount}
          onTitleClick={handleTitleClick}
        />
        <LoveLetterSection />
        <MemoryTimeline />
        <PhotoGallery />
        <LoveCounter />
        <ReasonsSection />
        <LoveCarousel />
        <FinalSurprise />
      </main>

      <Footer />
    </motion.div>
  );
}
