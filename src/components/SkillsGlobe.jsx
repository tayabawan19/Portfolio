import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';

function GlobeGroup() {
  const groupRef = useRef();
  const sphereRef = useRef();

  // Tech skills list as requested by the user
  const skills = [
    "Java", 
    "C++", 
    "Python", 
    "MongoDB", 
    "Node.js", 
    "React Native", 
    "Express", 
    "Firebase", 
    "Stripe", 
    "Figma"
  ];

  // Distribute skills evenly on a sphere using Fibonacci distribution
  const points = useMemo(() => {
    const radius = 2.3;
    return skills.map((skill, index) => {
      const k = index + 0.5;
      const phi = Math.acos(1 - (2 * k) / skills.length);
      const theta = Math.PI * (1 + Math.sqrt(5)) * k;

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);
      return { name: skill, position: [x, y, z] };
    });
  }, []);

  useFrame((state, delta) => {
    const clampedDelta = Math.min(delta, 0.1);
    // Slow auto-rotation on Y and X axes
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.08 * clampedDelta;
      groupRef.current.rotation.x += 0.03 * clampedDelta;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Outer wireframe sphere in electric cyan */}
      <mesh ref={sphereRef}>
        <sphereGeometry args={[2.0, 28, 28]} />
        <meshBasicMaterial
          color="#06B6D4"
          wireframe={true}
          transparent={true}
          opacity={0.35}
        />
      </mesh>

      {/* Subtle inner dark sphere for depth blocking */}
      <mesh>
        <sphereGeometry args={[1.96, 28, 28]} />
        <meshStandardMaterial
          color="#020817"
          transparent={true}
          opacity={0.7}
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>

      {/* Floating skills text labels as HTML overlays */}
      {points.map((p, idx) => (
        <Html
          key={idx}
          position={p.position}
          center
          distanceFactor={6}
          occlude
          className="pointer-events-none select-none transition-opacity duration-300 z-10"
        >
          <div className="px-3 py-1.5 text-[10px] md:text-[11px] font-mono font-bold border border-[#06B6D4]/50 bg-[#020817]/95 text-white/90 rounded-full shadow-lg shadow-[#06B6D4]/10 whitespace-nowrap uppercase tracking-wider">
            {p.name}
          </div>
        </Html>
      ))}
    </group>
  );
}

export default function SkillsGlobe() {
  return (
    <div className="w-full h-[380px] md:h-[480px] relative cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 0, 5.0], fov: 60 }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.7} />
        {/* Colorful lighting accents */}
        <pointLight position={[6, 6, 6]} intensity={2.5} color="#06B6D4" />
        <pointLight position={[-6, -6, -6]} intensity={1.5} color="#3B82F6" />
        
        <GlobeGroup />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableDamping={true}
          dampingFactor={0.05}
          rotateSpeed={0.8}
        />
      </Canvas>
    </div>
  );
}
