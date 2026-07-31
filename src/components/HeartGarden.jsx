import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

let id = 0;

const SPAWN_ITEMS = ['❤️', '💕', '✨', '💖', '🌸', '💗', '⭐', '🌺'];

export default function HeartGarden() {
  const [items, setItems] = useState([]);

  const spawnAt = useCallback((x, y) => {
    const newItems = [];
    const count = 6 + Math.floor(Math.random() * 6);
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
      const dist = 40 + Math.random() * 80;
      newItems.push({
        id: id++,
        x,
        y,
        tx: Math.cos(angle) * dist,
        ty: Math.sin(angle) * dist - 60,
        emoji: SPAWN_ITEMS[Math.floor(Math.random() * SPAWN_ITEMS.length)],
        size: 14 + Math.floor(Math.random() * 22),
        rotate: Math.random() * 360,
      });
    }
    // Ripple
    newItems.push({
      id: id++,
      x,
      y,
      isRipple: true,
    });
    setItems(prev => [...prev, ...newItems]);
    setTimeout(() => {
      setItems(prev => prev.filter(item => !newItems.map(n => n.id).includes(item.id)));
    }, 1200);
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      // Don't spawn on interactive elements
      if (e.target.closest('button, a, input, textarea, select')) return;
      spawnAt(e.clientX, e.clientY);
    };
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [spawnAt]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9990]">
      <AnimatePresence>
        {items.map(item => {
          if (item.isRipple) {
            return (
              <motion.div
                key={item.id}
                initial={{ scale: 0, opacity: 0.8 }}
                animate={{ scale: 3, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                style={{
                  position: 'fixed',
                  left: item.x - 25,
                  top: item.y - 25,
                  width: 50,
                  height: 50,
                  borderRadius: '50%',
                  border: '2px solid rgba(255,107,157,0.8)',
                  boxShadow: '0 0 20px rgba(255,107,157,0.6)',
                  pointerEvents: 'none',
                }}
              />
            );
          }
          return (
            <motion.div
              key={item.id}
              initial={{ x: item.x, y: item.y, opacity: 1, scale: 0, rotate: 0 }}
              animate={{
                x: item.x + item.tx,
                y: item.y + item.ty,
                opacity: 0,
                scale: 1.2,
                rotate: item.rotate,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{
                position: 'fixed',
                fontSize: item.size,
                lineHeight: 1,
                userSelect: 'none',
                pointerEvents: 'none',
              }}
            >
              {item.emoji}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
