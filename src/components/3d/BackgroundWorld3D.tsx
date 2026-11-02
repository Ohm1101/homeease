'use client';

import React, { useRef, useEffect, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

// City Skyscraper Matrix
function CitySkyscrapers() {
  const buildings = useMemo(() => {
    const list = [];
    const positions = [
      // Far background skyline
      [-14, 0, -12, 2.5, 9, 2.5],
      [-10, 0, -16, 3.0, 12, 3.0],
      [-5, 0, -18, 3.5, 15, 3.5],
      [0, 0, -20, 4.0, 18, 4.0],
      [6, 0, -19, 3.2, 14, 3.2],
      [12, 0, -15, 2.8, 11, 2.8],
      [16, 0, -11, 3.0, 8, 3.0],
      // Mid-distance side towers
      [-16, 0, -4, 2.4, 7, 2.4],
      [-18, 0, 4, 2.2, 6, 2.2],
      [15, 0, -2, 2.6, 8, 2.6],
      [18, 0, 5, 2.0, 6, 2.0],
    ];

    for (let i = 0; i < positions.length; i++) {
      const [x, y, z, w, h, d] = positions[i];
      list.push({ id: i, x, y: h / 2 - 1, z, w, h, d });
    }
    return list;
  }, []);

  return (
    <group>
      {buildings.map((b) => (
        <group key={b.id} position={[b.x, b.y, b.z]}>
          <RoundedBox args={[b.w, b.h, b.d]} radius={0.08} smoothness={2}>
            <meshStandardMaterial
              color="#090f1d"
              roughness={0.4}
              metalness={0.8}
            />
          </RoundedBox>
          {/* Subtle Window Grid Edges */}
          <mesh position={[0, 0, b.d / 2 + 0.01]}>
            <planeGeometry args={[b.w * 0.85, b.h * 0.9]} />
            <meshStandardMaterial
              color="#0284c7"
              emissive="#0284c7"
              emissiveIntensity={0.25}
              wireframe
            />
          </mesh>
          {/* Roof Beacon Light */}
          <mesh position={[0, b.h / 2 + 0.1, 0]}>
            <sphereGeometry args={[0.08, 8, 8]} />
            <meshStandardMaterial color="#00D9FF" emissive="#00D9FF" emissiveIntensity={2.5} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// Glowing Cyber-Roads & Moving Autonomous Service Vehicles
function CyberRoadNetwork() {
  const vehicleRef1 = useRef<THREE.Group>(null);
  const vehicleRef2 = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime * 0.5;

    // Vehicle 1 traveling along curving arterial road
    if (vehicleRef1.current) {
      const angle = (t * 0.4) % (Math.PI * 2);
      vehicleRef1.current.position.x = Math.sin(angle) * 9;
      vehicleRef1.current.position.z = Math.cos(angle) * 7 - 3;
      vehicleRef1.current.rotation.y = angle + Math.PI / 2;
    }

    // Vehicle 2 traveling along straight cross avenue
    if (vehicleRef2.current) {
      const progress = ((t * 0.6) % 2) - 1; // -1 to 1
      vehicleRef2.current.position.x = progress * 16;
      vehicleRef2.current.position.z = -7;
    }
  });

  return (
    <group position={[0, -0.88, 0]}>
      {/* Ground Grid lines */}
      <gridHelper args={[60, 60, '#1e293b', '#0b1120']} position={[0, 0, 0]} />

      {/* Main Curved Cyber Road Strip */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, -3]}>
        <ringGeometry args={[7.8, 8.4, 64]} />
        <meshStandardMaterial
          color="#00D9FF"
          emissive="#00D9FF"
          emissiveIntensity={0.8}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Straight Avenue Highway Strip */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, -7]}>
        <planeGeometry args={[36, 0.6]} />
        <meshStandardMaterial
          color="#D4AF37"
          emissive="#D4AF37"
          emissiveIntensity={0.6}
          transparent
          opacity={0.5}
        />
      </mesh>

      {/* Moving Electric Service Vehicle 1 */}
      <group ref={vehicleRef1} position={[0, 0.15, 0]}>
        <mesh>
          <boxGeometry args={[0.4, 0.22, 0.8]} />
          <meshStandardMaterial color="#00D9FF" emissive="#00D9FF" emissiveIntensity={1.2} />
        </mesh>
        <pointLight color="#00D9FF" intensity={1.5} distance={3} />
      </group>

      {/* Moving Electric Service Vehicle 2 */}
      <group ref={vehicleRef2} position={[0, 0.15, -7]}>
        <mesh>
          <boxGeometry args={[0.7, 0.22, 0.35]} />
          <meshStandardMaterial color="#D4AF37" emissive="#D4AF37" emissiveIntensity={1.5} />
        </mesh>
        <pointLight color="#D4AF37" intensity={1.5} distance={3} />
      </group>
    </group>
  );
}

// Floating Holographic Diagnostic Nodes
function HolographicDiagnosticNodes({ scrollProgress }: { scrollProgress: number }) {
  const nodesRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (nodesRef.current) {
      nodesRef.current.rotation.y += delta * 0.3;
    }
  });

  // Only prominently visible around Section 2 (0.12 - 0.45)
  const opacity = Math.max(0, Math.sin(scrollProgress * Math.PI * 1.5));

  return (
    <group ref={nodesRef} position={[-3.5, 3.2, 1.5]}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
        {/* Holographic Concentric Rings */}
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <ringGeometry args={[1.2, 1.25, 32]} />
          <meshStandardMaterial
            color="#00D9FF"
            emissive="#00D9FF"
            emissiveIntensity={2}
            transparent
            opacity={opacity * 0.7}
            side={THREE.DoubleSide}
          />
        </mesh>
        <mesh rotation={[-Math.PI / 4, 0, 0]}>
          <ringGeometry args={[1.5, 1.54, 32]} />
          <meshStandardMaterial
            color="#D4AF37"
            emissive="#D4AF37"
            emissiveIntensity={2}
            transparent
            opacity={opacity * 0.6}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Orbiting Diagnostic Particle Nodes */}
        {[-1, 0, 1].map((pos, i) => (
          <mesh key={i} position={[pos * 1.4, Math.sin(i * 2) * 0.5, pos * 0.8]}>
            <octahedronGeometry args={[0.12]} />
            <meshStandardMaterial
              color="#00D9FF"
              emissive="#00D9FF"
              emissiveIntensity={2.5}
              transparent
              opacity={opacity}
            />
          </mesh>
        ))}
      </Float>
    </group>
  );
}

// Camera Choreographer that smoothly glides based on scroll progress
function CameraController({ scrollProgress }: { scrollProgress: number }) {
  useFrame((state) => {
    // Waypoints along page sections:
    // 0.0 - 0.15: Hero Section (Close 3/4 luxury perspective)
    // 0.15 - 0.35: Problem Lab (Glide left & inspect service core)
    // 0.35 - 0.60: Workflow & Services (Crane up to aerial city overview)
    // 0.60 - 0.85: Live Tracking Radar (High dynamic tracking perspective)
    // 0.85 - 1.00: Pricing & CTA (Cinematic twilight panoramic view)

    const targetPos = new THREE.Vector3();
    const targetLookAt = new THREE.Vector3();

    if (scrollProgress < 0.2) {
      // Hero
      const t = scrollProgress / 0.2;
      targetPos.set(
        THREE.MathUtils.lerp(7.0, 5.0, t),
        THREE.MathUtils.lerp(4.5, 3.8, t),
        THREE.MathUtils.lerp(7.5, 6.0, t)
      );
      targetLookAt.set(0, 0.6, 0);
    } else if (scrollProgress < 0.45) {
      // Problem Lab
      const t = (scrollProgress - 0.2) / 0.25;
      targetPos.set(
        THREE.MathUtils.lerp(5.0, -4.5, t),
        THREE.MathUtils.lerp(3.8, 3.2, t),
        THREE.MathUtils.lerp(6.0, 5.5, t)
      );
      targetLookAt.set(-1.5, 1.2, 0);
    } else if (scrollProgress < 0.7) {
      // Workflow & Services
      const t = (scrollProgress - 0.45) / 0.25;
      targetPos.set(
        THREE.MathUtils.lerp(-4.5, 2.0, t),
        THREE.MathUtils.lerp(3.2, 8.5, t),
        THREE.MathUtils.lerp(5.5, 11.0, t)
      );
      targetLookAt.set(0, 0, -2);
    } else {
      // Live Tracking & CTA
      const t = (scrollProgress - 0.7) / 0.3;
      targetPos.set(
        THREE.MathUtils.lerp(2.0, 6.5, t),
        THREE.MathUtils.lerp(8.5, 5.5, t),
        THREE.MathUtils.lerp(11.0, 8.5, t)
      );
      targetLookAt.set(0, 0.4, 0);
    }

    // Smooth lerping to target position and orientation
    state.camera.position.lerp(targetPos, 0.05);
    state.camera.lookAt(targetLookAt);
  });

  return null;
}

export default function BackgroundWorld3D() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = Math.min(1, Math.max(0, window.scrollY / totalScroll));
        setScrollProgress(currentProgress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 w-full h-full overflow-hidden opacity-60">
      <Canvas
        camera={{ position: [7.0, 4.5, 7.5], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#030712']} />

        {/* Ambient & Directional Scene Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[12, 16, 10]} intensity={1.6} color="#fffbeb" />
        <pointLight position={[-10, 6, -8]} intensity={1.5} color="#00D9FF" />
        <pointLight position={[10, -2, 8]} intensity={1.2} color="#D4AF37" />

        {/* Dynamic Smooth Camera Controller linked to page scroll */}
        <CameraController scrollProgress={scrollProgress} />

        {/* Background City Skyline */}
        <CitySkyscrapers />

        {/* Cyber Roads & Autonomous Service Vehicles */}
        <CyberRoadNetwork />

        {/* Floating Holographic Diagnostic Telemetry */}
        <HolographicDiagnosticNodes scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}


