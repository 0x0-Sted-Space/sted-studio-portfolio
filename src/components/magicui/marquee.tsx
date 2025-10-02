import React, { useRef, useEffect } from 'react';

interface MarqueeProps {
  children: React.ReactNode;
  speed?: number; // pixels per second
  style?: React.CSSProperties;
}

export const Marquee: React.FC<MarqueeProps> = ({ children, speed = 40, style }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    let animationFrame: number;
    let start: number | null = null;
    let x = 0;
    const contentWidth = content.offsetWidth;

    function animate(ts: number) {
      if (start === null) start = ts;
      const elapsed = ts - start;
      x = -((elapsed / 1000) * speed) % contentWidth;
      content.style.transform = `translateX(${x}px)`;
      animationFrame = requestAnimationFrame(animate);
    }
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [speed]);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        overflow: 'hidden',
        position: 'relative',
        ...style,
      }}
    >
      <div
        ref={contentRef}
        style={{
          display: 'flex',
          whiteSpace: 'nowrap',
          willChange: 'transform',
        }}
      >
        {children}
        {children}
      </div>
    </div>
  );
};

export default Marquee; 