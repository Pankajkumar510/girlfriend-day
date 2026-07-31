import { useEffect, useRef, useState } from 'react';

export default function CursorGlow() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let animId;

    const handleMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
      }
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px)`;
      }
      animId = requestAnimationFrame(animate);
    };

    const handleEnter = () => setIsHovering(true);
    const handleLeave = () => setIsHovering(false);

    document.addEventListener('mousemove', handleMove);
    const interactives = document.querySelectorAll('button, a, [data-hoverable]');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', handleEnter);
      el.addEventListener('mouseleave', handleLeave);
    });

    animId = requestAnimationFrame(animate);
    return () => {
      document.removeEventListener('mousemove', handleMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{
          transform: isHovering ? 'scale(2)' : 'scale(1)',
          background: isHovering ? '#ffd700' : '#ff6b9d',
        }}
      />
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{
          width: isHovering ? '50px' : '36px',
          height: isHovering ? '50px' : '36px',
          borderColor: isHovering ? 'rgba(255,215,0,0.6)' : 'rgba(255,107,157,0.6)',
        }}
      />
    </>
  );
}
