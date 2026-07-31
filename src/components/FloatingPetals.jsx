import { useEffect, useState } from 'react';

const PETAL_EMOJIS = ['🌸', '🌺', '🌹', '💮', '🌷'];

function Petal({ id }) {
  const left = Math.random() * 100;
  const delay = Math.random() * 10;
  const duration = 8 + Math.random() * 8;
  const emoji = PETAL_EMOJIS[Math.floor(Math.random() * PETAL_EMOJIS.length)];
  const size = 14 + Math.floor(Math.random() * 18);

  return (
    <div
      key={id}
      style={{
        position: 'fixed',
        left: `${left}%`,
        top: '-5vh',
        fontSize: `${size}px`,
        animation: `petalFall ${duration}s ease-in-out ${delay}s infinite`,
        pointerEvents: 'none',
        zIndex: 1,
        userSelect: 'none',
      }}
    >
      {emoji}
    </div>
  );
}

export default function FloatingPetals({ count = 15 }) {
  const [petals] = useState(() =>
    Array.from({ length: count }, (_, i) => i)
  );

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1, overflow: 'hidden' }}>
      {petals.map(id => <Petal key={id} id={id} />)}
    </div>
  );
}
