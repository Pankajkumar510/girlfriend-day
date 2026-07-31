import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FloatingMusicPlayer({ autoPlayTrigger }) {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [expanded, setExpanded] = useState(false);
  const [currentNote, setCurrentNote] = useState(0);
  const intervalRef = useRef(null);
  const audioRef = useRef(null);

  const NOTES = ['♩', '♪', '♫', '♬', '🎵'];
  const SONGS = [
    { 
      title: 'Romantic Piano (Royalty Free)', 
      artist: 'Bensound',
      src: 'https://www.bensound.com/bensound-music/bensound-romantic.mp3'
    }
  ];
  const [songIndex, setSongIndex] = useState(0);

  // Trigger autoplay when overlay is dismissed
  useEffect(() => {
    if (autoPlayTrigger && audioRef.current) {
      setPlaying(true);
      audioRef.current.play().catch(e => console.log("Autoplay prevented:", e));
    }
  }, [autoPlayTrigger]);

  // Handle play/pause state changes
  useEffect(() => {
    if (audioRef.current) {
      if (playing) {
        audioRef.current.play().catch(e => console.log("Play prevented:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [playing]);

  // Handle volume changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Animate music notes when playing
  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setCurrentNote(n => (n + 1) % NOTES.length);
      }, 600);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [playing]);

  const nextSong = () => setSongIndex(s => (s + 1) % SONGS.length);
  const prevSong = () => setSongIndex(s => (s - 1 + SONGS.length) % SONGS.length);

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.6, type: 'spring' }}
      className="fixed bottom-6 right-6 z-[9000]"
    >
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="glass-card mb-3 p-4 w-64 relative"
            style={{
              border: '1px solid rgba(255,107,157,0.3)',
              boxShadow: '0 0 40px rgba(255,107,157,0.2)',
            }}
          >
            {/* Song info */}
            <div className="flex items-center gap-3 mb-4">
              <motion.div
                animate={playing ? { rotate: 360 } : { rotate: 0 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                className="w-12 h-12 rounded-full flex items-center justify-center text-xl flex-shrink-0"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,107,157,0.4), rgba(199,125,255,0.4))',
                  border: '2px solid rgba(255,107,157,0.5)',
                }}
              >
                🎵
              </motion.div>
              <div className="overflow-hidden flex-1">
                <p className="font-body text-sm font-semibold text-white truncate">
                  {SONGS[songIndex].title}
                </p>
                <p className="font-body text-xs" style={{ color: 'rgba(255,179,200,0.7)' }}>
                  {SONGS[songIndex].artist}
                </p>
              </div>
            </div>

            {/* Progress bar (decorative) */}
            <div className="h-1 rounded-full mb-4 overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(to right, #ff6b9d, #c77dff)' }}
                animate={playing ? { width: ['0%', '100%'] } : {}}
                transition={{ duration: 30, ease: 'linear', repeat: Infinity }}
              />
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={prevSong}
                className="text-white/60 hover:text-white transition-colors text-lg"
                data-hoverable
              >⏮</button>
              <button
                onClick={() => setPlaying(p => !p)}
                className="w-10 h-10 rounded-full flex items-center justify-center text-white text-lg transition-all"
                style={{
                  background: 'linear-gradient(135deg, #ff6b9d, #c77dff)',
                  boxShadow: '0 0 20px rgba(255,107,157,0.5)',
                }}
                data-hoverable
              >
                {playing ? '⏸' : '▶'}
              </button>
              <button
                onClick={nextSong}
                className="text-white/60 hover:text-white transition-colors text-lg"
                data-hoverable
              >⏭</button>
            </div>

            {/* Volume */}
            <div className="flex items-center gap-2">
              <span className="text-sm">🔈</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={e => setVolume(parseFloat(e.target.value))}
                className="flex-1 h-1 rounded-full cursor-pointer"
                style={{
                  accentColor: '#ff6b9d',
                  background: `linear-gradient(to right, #ff6b9d ${volume * 100}%, rgba(255,255,255,0.2) ${volume * 100}%)`,
                }}
                data-hoverable
              />
              <span className="text-sm">🔊</span>
            </div>

            <p className="text-xs text-center mt-3" style={{ color: 'rgba(255,179,200,0.5)' }}>
              (Playing sample romantic track) 💕
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={SONGS[songIndex].src}
        loop
      />

      {/* Main toggle button */}
      <motion.button
        onClick={() => setExpanded(e => !e)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-14 h-14 rounded-full flex items-center justify-center text-2xl relative"
        style={{
          background: 'linear-gradient(135deg, #ff6b9d, #c77dff)',
          boxShadow: playing
            ? '0 0 30px rgba(255,107,157,0.8), 0 0 60px rgba(255,107,157,0.4)'
            : '0 0 20px rgba(255,107,157,0.4)',
        }}
        data-hoverable
      >
        <motion.span
          animate={playing ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 0.6, repeat: Infinity }}
        >
          {playing ? NOTES[currentNote] : '🎵'}
        </motion.span>
        {playing && (
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
            style={{ border: '2px solid rgba(255,107,157,0.5)' }}
          />
        )}
      </motion.button>
    </motion.div>
  );
}
