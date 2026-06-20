import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

function FloatingMesh() {
  const meshRef = useRef();
  const wireframeRef = useRef();

  useFrame((state, delta) => {
    const clampedDelta = Math.min(delta, 0.1);
    const elapsed = state.clock.getElapsedTime();

    // Slow auto-rotation
    if (meshRef.current && wireframeRef.current) {
      meshRef.current.rotation.y += 0.12 * clampedDelta;
      meshRef.current.rotation.x += 0.08 * clampedDelta;

      wireframeRef.current.rotation.y += 0.12 * clampedDelta;
      wireframeRef.current.rotation.x += 0.08 * clampedDelta;

      // Floating sine wave animation
      const hover = Math.sin(elapsed * 1.5) * 0.2;
      meshRef.current.position.y = hover;
      wireframeRef.current.position.y = hover;
    }
  });

  return (
    <group>
      {/* Inner semi-transparent solid shape */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[2.3, 1]} />
        <meshStandardMaterial 
          color="#0F1123" 
          roughness={0.15} 
          metalness={0.8}
          transparent={true}
          opacity={0.7}
        />
      </mesh>

      {/* Outer wireframe overlay */}
      <mesh ref={wireframeRef}>
        <icosahedronGeometry args={[2.32, 1]} />
        <meshBasicMaterial 
          color="#E91E63" 
          wireframe={true} 
          transparent={true} 
          opacity={0.75} 
        />
      </mesh>
    </group>
  );
}

export default function Hero3D() {
  return (
    <div className="w-full h-[350px] md:h-[450px] relative cursor-grab active:cursor-grabbing">
      <Canvas 
        camera={{ position: [0, 0, 5.5], fov: 50 }} 
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.5} />
        {/* Environmental Lights */}
        <pointLight position={[8, 8, 8]} intensity={1.5} color="#E91E63" />
        <pointLight position={[-8, -8, -8]} intensity={0.5} color="#C2185B" />
        {/* Glow light source inside the object */}
        <pointLight position={[0, 0, 0]} intensity={3.5} color="#E91E63" distance={5} />
        
        <FloatingMesh />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
        />
      </Canvas>
    </div>
  );
}
