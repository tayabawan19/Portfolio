import React, { useEffect, useRef } from 'react';

export default function BackgroundParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Create sparse, subtle star particles
    const starCount = 120;
    const stars = [];

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.2 + 0.3,
        // Drift slowly in random directions
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        // Opacity variation for twinkling effect
        opacity: Math.random() * 0.7 + 0.3,
        twinkleSpeed: Math.random() * 0.01 + 0.002,
        twinklePhase: Math.random() * Math.PI * 2,
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const animate = () => {
      // Clear canvas with a solid deep black background
      ctx.fillStyle = '#0A0A0A';
      ctx.fillRect(0, 0, width, height);

      // Draw and update stars
      for (let i = 0; i < starCount; i++) {
        const star = stars[i];

        // Draw star
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        
        // Dynamic opacity for subtle twinkling
        star.twinklePhase += star.twinkleSpeed;
        const currentOpacity = star.opacity * (0.7 + 0.3 * Math.sin(star.twinklePhase));
        
        ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
        ctx.fill();

        // Move star
        star.x += star.vx;
        star.y += star.vy;

        // Wrap around borders
        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height;
        if (star.y > height) star.y = 0;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10 pointer-events-none block"
      style={{ background: '#0A0A0A' }}
    />
  );
}
