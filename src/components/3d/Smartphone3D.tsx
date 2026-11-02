'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

interface Smartphone3DProps {
  activeScreen: 'booking' | 'tracking' | 'wallet' | 'reviews' | 'dashboard';
}

function PhoneModel({ activeScreen }: Smartphone3DProps) {
  const phoneRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (phoneRef.current) {
      // Gentle floating rotation
      phoneRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.35;
      phoneRef.current.rotation.x = 0.08 + Math.cos(state.clock.elapsedTime * 0.4) * 0.08;
    }
  });

  // Dynamic screen accent color
  const screenBorderColor =
    activeScreen === 'tracking'
      ? '#00D9FF'
      : activeScreen === 'wallet'
      ? '#D4AF37'
      : activeScreen === 'dashboard'
      ? '#10B981'
      : '#6366F1';

  return (
    <group ref={phoneRef} position={[0, 0, 0]}>
      {/* PHONE BODY (Titanium Chassis) */}
      <RoundedBox args={[2.5, 5.1, 0.28]} radius={0.24} smoothness={8} castShadow receiveShadow>
        <meshStandardMaterial color="#0b1120" metalness={0.92} roughness={0.18} />
      </RoundedBox>

      {/* LUXURY GOLD PERIMETER CHAMFER ACCENT */}
      <mesh position={[0, 0, -0.01]}>
        <boxGeometry args={[2.54, 5.14, 0.24]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.96} roughness={0.1} />
      </mesh>

      {/* DISPLAY SCREEN GLASS */}
      <mesh position={[0, 0, 0.145]}>
        <planeGeometry args={[2.34, 4.9]} />
        <meshStandardMaterial color="#030712" roughness={0.1} metalness={0.4} />
      </mesh>

      {/* DYNAMIC SCREEN UI OVERLAY (Glowing simulated screen interface) */}
      <group position={[0, 0, 0.15]}>
        {/* Dynamic Island / Speaker Pill */}
        <mesh position={[0, 2.22, 0.01]}>
          <boxGeometry args={[0.6, 0.12, 0.02]} />
          <meshStandardMaterial color="#000000" />
        </mesh>

        {/* Screen Header Bar */}
        <mesh position={[0, 1.85, 0.01]}>
          <planeGeometry args={[2.1, 0.35]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>

        {/* Screen Content Cards based on activeScreen */}
        <mesh position={[0, 0.9, 0.01]}>
          <planeGeometry args={[2.0, 1.1]} />
          <meshStandardMaterial
            color="#1e293b"
            emissive={screenBorderColor}
            emissiveIntensity={0.25}
          />
        </mesh>

        <mesh position={[0, -0.4, 0.01]}>
          <planeGeometry args={[2.0, 1.0]} />
          <meshStandardMaterial color="#111827" />
        </mesh>

        <mesh position={[0, -1.6, 0.01]}>
          <planeGeometry args={[2.0, 0.9]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>

        {/* Home Navigation Indicator Bar */}
        <mesh position={[0, -2.3, 0.01]}>
          <boxGeometry args={[0.8, 0.04, 0.01]} />
          <meshStandardMaterial color="#ffffff" opacity={0.7} transparent />
        </mesh>
      </group>

      {/* CAMERA BUMP ON BACK */}
      <mesh position={[0.65, 1.8, -0.16]}>
        <boxGeometry args={[0.9, 0.9, 0.08]} />
        <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Dual Triple Lenses */}
      <mesh position={[0.45, 1.95, -0.21]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.14, 0.14, 0.05, 24]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.95} roughness={0.1} />
      </mesh>
      <mesh position={[0.85, 1.95, -0.21]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.14, 0.14, 0.05, 24]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.95} roughness={0.1} />
      </mesh>
      <mesh position={[0.65, 1.62, -0.21]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.14, 0.14, 0.05, 24]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.95} roughness={0.1} />
      </mesh>
    </group>
  );
}

export default function Smartphone3D({ activeScreen }: Smartphone3DProps) {
  return (
    <div className="w-full h-[520px] lg:h-[600px] relative flex items-center justify-center">
      <Canvas camera={{ position: [0, 0, 6.2], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 8, 5]} intensity={1.8} color="#ffffff" />
        <pointLight position={[-4, -2, 4]} intensity={1.5} color="#D4AF37" />
        <pointLight position={[4, 2, -3]} intensity={1.2} color="#00D9FF" />
        <Float speed={1.8} rotationIntensity={0.2} floatIntensity={0.6}>
          <PhoneModel activeScreen={activeScreen} />
        </Float>
      </Canvas>
    </div>
  );
}
