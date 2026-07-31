import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function FloatingMusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
    }

    const handleFirstInteraction = () => {
      if (audioRef.current) {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(e => console.log('Autoplay blocked', e));
      }
      // Remove after first interaction
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('scroll', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction, { once: true });
    window.addEventListener('scroll', handleFirstInteraction, { once: true });
    window.addEventListener('touchstart', handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('scroll', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.log('Audio play failed', e));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      <audio
        ref={audioRef}
        src="/girlfriend-day/music/ishq-wala-love.mp3"
        loop
        onEnded={() => setIsPlaying(false)}
      />
      
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={togglePlay}
        className="relative flex items-center gap-3 p-3 rounded-full overflow-hidden group cursor-pointer"
        style={{
          background: 'rgba(26, 0, 48, 0.6)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 107, 157, 0.3)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
        }}
        data-hoverable
      >
        {/* Play/Pause Icon */}
        <div 
          className="w-10 h-10 rounded-full flex items-center justify-center relative z-10"
          style={{
            background: 'linear-gradient(135deg, #ff6b9d, #c77dff)',
            boxShadow: '0 0 15px rgba(255,107,157,0.4)',
          }}
        >
          {isPlaying ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white" style={{ marginLeft: '2px' }}>
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </div>

        {/* Text */}
        <div className="pr-3 relative z-10 hidden md:block">
          <p className="font-script text-sm m-0" style={{ color: '#ffb3c6' }}>Pehla Nasha Instrumental</p>
          <div className="flex items-center gap-1 mt-0.5">
            {[1, 2, 3].map((bar) => (
              <motion.div
                key={bar}
                animate={isPlaying ? { height: [3, 10, 3] } : { height: 3 }}
                transition={{ duration: 0.8, repeat: Infinity, delay: bar * 0.2 }}
                className="w-0.5 rounded-full"
                style={{ background: '#c77dff', minHeight: '3px' }}
              />
            ))}
            <span className="text-[10px] ml-1 font-body text-white/50 uppercase tracking-widest">
              {isPlaying ? 'Playing' : 'Paused'}
            </span>
          </div>
        </div>

        {/* Hover glow */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ background: 'radial-gradient(circle at right, rgba(255,107,157,0.15), transparent 70%)' }}
        />
      </motion.button>
    </div>
  );
}
