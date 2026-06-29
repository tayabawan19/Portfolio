import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';

function GlobeGroup() {
  const groupRef = useRef();
  const sphereRef = useRef();

  // Tech skills list
  const skills = [
    "Java", 
    "C++", 
    "Python", 
    "MongoDB", 
    "Node.js", 
    "React Native", 
    "Express", 
    "SQL", 
    "WordPress", 
    "Figma"
  ];

  // Distribute skills evenly on a sphere using Fibonacci distribution
  const points = useMemo(() => {
    const radius = 2.2;
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
    // Slow auto-rotation
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.08 * clampedDelta;
      groupRef.current.rotation.x += 0.03 * clampedDelta;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Outer wireframe sphere */}
      <mesh ref={sphereRef}>
        <sphereGeometry args={[2.0, 24, 24]} />
        <meshBasicMaterial
          color="#FF1A1A"
          wireframe={true}
          transparent={true}
          opacity={0.35}
        />
      </mesh>

      {/* Subtle inner solid sphere for depth */}
      <mesh>
        <sphereGeometry args={[1.95, 24, 24]} />
        <meshStandardMaterial
          color="#0A0A0A"
          transparent={true}
          opacity={0.8}
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>

      {/* Floating skills text labels as HTML overlays */}
      {points.map((p, idx) => (
        <Html
          key={idx}
          position={p.position}
          center
          distanceFactor={6}
          // Enable occlusion so labels fade when rotating to the back
          occlude
          className="pointer-events-none select-none transition-opacity duration-300"
        >
          <div className="px-2 py-1 text-[10px] md:text-[11px] font-mono font-bold border border-[#FF1A1A] bg-[#0A0A0A]/95 text-white rounded shadow-md shadow-[#FF1A1A]/20 whitespace-nowrap uppercase tracking-wider">
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
        <ambientLight intensity={0.6} />
        {/* Colorful lighting accents */}
        <pointLight position={[6, 6, 6]} intensity={2.0} color="#FF1A1A" />
        <pointLight position={[-6, -6, -6]} intensity={1.0} color="#E53935" />
        
        <GlobeGroup />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.8}
        />
      </Canvas>
    </div>
  );
}
