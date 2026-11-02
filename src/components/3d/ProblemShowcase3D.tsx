'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, RoundedBox, Cylinder, Sphere } from '@react-three/drei';
import * as THREE from 'three';

interface ProblemShowcase3DProps {
  modelType: string;
}

function ProblemModel({ modelType }: { modelType: string }) {
  const meshRef = useRef<THREE.Group>(null);
  const particleGroupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.4;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.8) * 0.15;
    }

    if (particleGroupRef.current) {
      particleGroupRef.current.children.forEach((child, i) => {
        child.position.y -= delta * (1.2 + i * 0.2);
        if (child.position.y < -1.2) {
          child.position.y = 0.5 + Math.random() * 0.3;
          child.position.x = (Math.random() - 0.5) * 0.4;
        }
      });
    }
  });

  if (modelType === 'pipe') {
    return (
      <group ref={meshRef}>
        {/* Main Copper Pipe */}
        <Cylinder args={[0.3, 0.3, 2.2, 32]} rotation={[0, 0, Math.PI / 4]}>
          <meshStandardMaterial color="#b45309" metalness={0.9} roughness={0.2} />
        </Cylinder>
        {/* Pipe Flange & Coupling Joint */}
        <Cylinder args={[0.42, 0.42, 0.4, 32]} rotation={[0, 0, Math.PI / 4]}>
          <meshStandardMaterial color="#D4AF37" metalness={0.95} roughness={0.15} />
        </Cylinder>
        {/* Burst Crack with Electric Cyan Glow */}
        <mesh position={[0.1, 0.1, 0.3]}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial color="#00D9FF" emissive="#00D9FF" emissiveIntensity={2.5} />
        </mesh>
        {/* Dripping Water Particles */}
        <group ref={particleGroupRef} position={[0.1, 0.1, 0.3]}>
          {[...Array(6)].map((_, i) => (
            <Sphere key={i} args={[0.06, 12, 12]} position={[(i % 2) * 0.1, -i * 0.3, (i % 3) * 0.05]}>
              <meshStandardMaterial color="#00D9FF" roughness={0.1} transparent opacity={0.8} />
            </Sphere>
          ))}
        </group>
      </group>
    );
  }

  if (modelType === 'switch') {
    return (
      <group ref={meshRef}>
        {/* Breaker Switch Enclosure */}
        <RoundedBox args={[1.6, 2.2, 0.8]} radius={0.08} smoothness={4}>
          <meshStandardMaterial color="#111827" metalness={0.5} roughness={0.4} />
        </RoundedBox>
        {/* Switch Lever (Tripped position) */}
        <mesh position={[0, -0.2, 0.5]} rotation={[-0.4, 0, 0]}>
          <boxGeometry args={[0.4, 0.7, 0.3]} />
          <meshStandardMaterial color="#EF4444" roughness={0.3} />
        </mesh>
        {/* Sparking Light Core */}
        <mesh position={[0, 0.3, 0.5]}>
          <octahedronGeometry args={[0.25]} />
          <meshStandardMaterial color="#D4AF37" emissive="#D4AF37" emissiveIntensity={3} />
        </mesh>
        <pointLight position={[0, 0.3, 0.8]} color="#F59E0B" intensity={3} distance={3} />
      </group>
    );
  }

  if (modelType === 'ac') {
    return (
      <group ref={meshRef}>
        {/* AC Outer Unit Body */}
        <RoundedBox args={[2.4, 1.4, 1.0]} radius={0.08} smoothness={4}>
          <meshStandardMaterial color="#1e293b" metalness={0.7} roughness={0.3} />
        </RoundedBox>
        {/* Circular Fan Grille */}
        <Cylinder args={[0.55, 0.55, 0.05, 32]} rotation={[Math.PI / 2, 0, 0]} position={[0.4, 0, 0.53]}>
          <meshStandardMaterial color="#00D9FF" emissive="#00D9FF" emissiveIntensity={1.2} wireframe />
        </Cylinder>
        {/* Status LED Warning */}
        <mesh position={[-0.8, 0.4, 0.52]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial color="#EF4444" emissive="#EF4444" emissiveIntensity={2.5} />
        </mesh>
      </group>
    );
  }

  if (modelType === 'door') {
    return (
      <group ref={meshRef}>
        {/* Heavy Smart Lock Escutcheon */}
        <RoundedBox args={[1.0, 2.4, 0.4]} radius={0.06} smoothness={4}>
          <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.2} />
        </RoundedBox>
        {/* Champagne Gold Handle */}
        <mesh position={[0.3, -0.3, 0.3]} rotation={[0, 0, -0.2]}>
          <boxGeometry args={[1.2, 0.16, 0.12]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.95} roughness={0.15} />
        </mesh>
        {/* Biometric Sensor Scanner Ring (Glows Red Jammed) */}
        <mesh position={[0, 0.6, 0.22]}>
          <ringGeometry args={[0.18, 0.25, 32]} />
          <meshStandardMaterial color="#EF4444" emissive="#EF4444" emissiveIntensity={2.5} side={THREE.DoubleSide} />
        </mesh>
      </group>
    );
  }

  // Default Appliance / Leak representation
  return (
    <group ref={meshRef}>
      <RoundedBox args={[1.8, 1.8, 1.8]} radius={0.1} smoothness={4}>
        <meshStandardMaterial color="#111827" metalness={0.8} roughness={0.3} />
      </RoundedBox>
      <mesh position={[0, 0, 0.95]}>
        <boxGeometry args={[1.4, 1.4, 0.02]} />
        <meshStandardMaterial color="#00D9FF" emissive="#00D9FF" emissiveIntensity={0.8} wireframe />
      </mesh>
    </group>
  );
}

export default function ProblemShowcase3D({ modelType }: ProblemShowcase3DProps) {
  return (
    <div className="w-full h-[320px] sm:h-[380px] rounded-2xl overflow-hidden glass-panel border border-white/10 relative">
      <Canvas camera={{ position: [0, 0, 4.2], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-4, -2, -2]} intensity={1} color="#00D9FF" />
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
          <ProblemModel modelType={modelType} />
        </Float>
      </Canvas>

      <div className="absolute bottom-3 right-3 text-[11px] text-gray-400 bg-black/50 px-2.5 py-1 rounded-full border border-white/5">
        Live 3D Telemetry
      </div>
    </div>
  );
}
