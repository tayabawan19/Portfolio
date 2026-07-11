import React, { useEffect, useRef } from 'react';

export default function BackgroundParticles() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Create 90 depth-weighted particles
    const particleCount = 90;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        baseX: Math.random() * width,
        baseY: Math.random() * height,
        radius: Math.random() * 1.5 + 0.5,
        // z-depth weight from 0.2 to 1.0
        z: Math.random() * 0.8 + 0.2,
        // Drift speed
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      // Normalize mouse coordinates around center
      mouseRef.current.tx = e.clientX - window.innerWidth / 2;
      mouseRef.current.ty = e.clientY - window.innerHeight / 2;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      // Clear canvas (the main background color is set by body/aurora container)
      ctx.clearRect(0, 0, width, height);

      // Lerp mouse coordinates for smooth parallax lag
      const mouse = mouseRef.current;
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;

      // Update positions & calculate display coordinates
      const coords = particles.map(p => {
        // Move base coordinates (drift)
        p.baseX += p.vx;
        p.baseY += p.vy;

        // Wrap around borders
        if (p.baseX < 0) p.baseX = width;
        if (p.baseX > width) p.baseX = 0;
        if (p.baseY < 0) p.baseY = height;
        if (p.baseY > height) p.baseY = 0;

        // Apply z-weighted mouse parallax (deeper z = more movement)
        // Accentuate z for parallax: heavier z has more shift
        const px = p.baseX + mouse.x * p.z * 0.04;
        const py = p.baseY + mouse.y * p.z * 0.04;

        // Mouse distortion (push particles away slightly if too close)
        // Transform mouse coordinates back to screen space
        const screenMouseX = mouse.x + window.innerWidth / 2;
        const screenMouseY = mouse.y + window.innerHeight / 2;

        const dx = px - screenMouseX;
        const dy = py - screenMouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let finalX = px;
        let finalY = py;

        if (dist < 150) {
          const force = (150 - dist) / 150; // 0 to 1
          // Soft distortion push (alive feel)
          finalX += (dx / dist) * force * 15 * p.z;
          finalY += (dy / dist) * force * 15 * p.z;
        }

        return { ...p, dx: finalX, dy: finalY };
      });

      // Draw connecting lines between close particles
      // Distance limit: 130px
      for (let i = 0; i < particleCount; i++) {
        const p1 = coords[i];
        for (let j = i + 1; j < particleCount; j++) {
          const p2 = coords[j];
          const dx = p1.dx - p2.dx;
          const dy = p1.dy - p2.dy;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            const alpha = (1 - dist / 130) * 0.12 * Math.min(p1.z, p2.z);
            ctx.beginPath();
            ctx.moveTo(p1.dx, p1.dy);
            ctx.lineTo(p2.dx, p2.dy);
            // Draw cyan lines
            ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`;
            ctx.lineWidth = 0.5 * Math.min(p1.z, p2.z);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (let i = 0; i < particleCount; i++) {
        const p = coords[i];
        ctx.beginPath();
        ctx.arc(p.dx, p.dy, p.radius * p.z, 0, Math.PI * 2);
        // Deeper particles are smaller and less opaque
        const opacity = p.z * 0.5;
        ctx.fillStyle = `rgba(6, 182, 212, ${opacity})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {/* Layer 1 - Aurora Blobs */}
      <div className="aurora-container">
        <div className="aurora-blob aurora-blob-1"></div>
        <div className="aurora-blob aurora-blob-2"></div>
        <div className="aurora-blob aurora-blob-3"></div>
        <div className="aurora-blob aurora-blob-4"></div>
      </div>

      {/* Layer 2 - Particle Field Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full -z-10 pointer-events-none block"
      />

      {/* Layer 3 - Noise Grain Overlay */}
      <div className="noise-overlay" />
    </>
  );
}
