import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function FloatingMesh() {
  const meshRef = useRef();
  const mouse = useRef({ x: 0, y: 0 });

  // Track mouse coordinates on window
  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    const clampedDelta = Math.min(delta, 0.1);
    const elapsed = state.clock.getElapsedTime();

    if (meshRef.current) {
      // Slow auto-rotation on Y and X
      meshRef.current.rotation.y += 0.08 * clampedDelta;
      meshRef.current.rotation.x += 0.04 * clampedDelta;

      // Subtle mouse tilt with smooth lerp
      const targetX = mouse.current.y * 0.3;
      const targetY = mouse.current.x * 0.3;

      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetX + elapsed * 0.04, 0.08);
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetY + elapsed * 0.08, 0.08);

      // Slow vertical floating wave
      meshRef.current.position.y = Math.sin(elapsed * 1.5) * 0.15;
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[2.0, 1]} />
      {/* Cyan low-poly wireframe sphere */}
      <meshBasicMaterial 
        color="#06B6D4" 
        wireframe={true} 
        transparent={true} 
        opacity={0.65} 
      />
    </mesh>
  );
}

export default function Hero3D() {
  return (
    <div className="w-full h-full relative flex items-center justify-center">
      {/* Soft radial glow behind the panel */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 65%)',
          zIndex: 0
        }}
      />

      <div className="w-full h-[320px] md:h-[400px] relative z-10">
        <Canvas 
          camera={{ position: [0, 0, 5.0], fov: 50 }} 
          dpr={[1, 2]}
        >
          <ambientLight intensity={0.8} />
          {/* Ambient + point lights in cyan for glow effect */}
          <pointLight position={[8, 8, 8]} intensity={2.5} color="#06B6D4" />
          <pointLight position={[-8, -8, -8]} intensity={1.5} color="#3B82F6" />
          <pointLight position={[0, 0, 0]} intensity={3.5} color="#06B6D4" distance={6} />
          
          <FloatingMesh />
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            enableDamping={true}
            dampingFactor={0.05}
          />
        </Canvas>
      </div>
    </div>
  );
}
