import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

function Particles() {
  const pointsRef = useRef();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const particleCount = 1200;
  
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40;     // X
      pos[i * 3 + 1] = (Math.random() - 0.5) * 40; // Y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 40; // Z
    }
    return pos;
  }, []);

  useFrame((state, delta) => {
    // Clamp delta to avoid huge jumps on tab switch
    const clampedDelta = Math.min(delta, 0.1);
    
    // Slow continuous background rotation
    pointsRef.current.rotation.y += 0.015 * clampedDelta;
    pointsRef.current.rotation.x += 0.008 * clampedDelta;
    
    // Smooth mouse parallax interpolation
    const targetY = mouse.current.x * 0.12;
    const targetX = -mouse.current.y * 0.12;
    pointsRef.current.rotation.y += (targetY - pointsRef.current.rotation.y) * 0.05;
    pointsRef.current.rotation.x += (targetX - pointsRef.current.rotation.x) * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#E91E63"
        size={0.07}
        sizeAttenuation={true}
        transparent={true}
        opacity={0.3}
        depthWrite={false}
      />
    </points>
  );
}

export default function BackgroundParticles() {
  return (
    <div className="fixed inset-0 w-full h-full -z-10 pointer-events-none bg-[#0A0B0D]">
      <Canvas camera={{ position: [0, 0, 12], fov: 60 }}>
        <color attach="background" args={['#0A0B0D']} />
        <ambientLight intensity={0.3} />
        <Particles />
      </Canvas>
    </div>
  );
}
