'use client';

import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  Float,
  ContactShadows,
  OrbitControls,
  RoundedBox,
  MeshReflectorMaterial,
} from '@react-three/drei';
import * as THREE from 'three';

interface HouseProps {
  assemblyProgress: number;
  mode: 'assemble' | 'explode' | 'xray' | 'night';
  mousePos: { x: number; y: number };
}

function ModernLuxuryVilla({ assemblyProgress, mode, mousePos }: HouseProps) {
  const groupRef = useRef<THREE.Group>(null);
  const internalPipesRef = useRef<THREE.Group>(null);
  const poolLightRef = useRef<THREE.PointLight>(null);
  const carLightRef = useRef<THREE.PointLight>(null);

  // Smooth rotation & subtle mouse tracking
  useFrame((state, delta) => {
    if (groupRef.current) {
      // Gentle auto-rotation
      groupRef.current.rotation.y += delta * 0.12;
      
      // Responsive camera/group tilt based on mouse position
      const targetRotX = (mousePos.y * 0.12) - 0.08;
      const targetRotZ = (mousePos.x * 0.12);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, delta * 2);
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetRotZ, delta * 2);
    }

    if (poolLightRef.current) {
      poolLightRef.current.intensity = 2.0 + Math.sin(state.clock.elapsedTime * 2.5) * 0.5;
    }
    if (carLightRef.current) {
      carLightRef.current.intensity = 1.5 + Math.sin(state.clock.elapsedTime * 1.5) * 0.3;
    }
  });

  const explodeFactor = mode === 'explode' ? 1 : 1 - assemblyProgress;
  const isXray = mode === 'xray';
  const isNight = mode === 'night';

  // Materials & Colors
  const wallBaseColor = isNight ? '#0b1324' : '#1e293b';
  const stoneColor = '#0f172a';
  const woodColor = '#854d0e'; // Cedar / Teak timber slats
  const glassColor = isNight ? '#38bdf8' : '#e0f2fe';
  const frameColor = '#090d16';
  const goldColor = '#D4AF37';
  const cyanColor = '#00D9FF';

  return (
    <group ref={groupRef} position={[0, -0.7, 0]}>
      {/* ========================================================
          1. GROUND PODIUM, DRIVEWAY & LANDSCAPING
      ======================================================== */}
      {/* Main Basalt Stone Foundation Terrace */}
      <mesh position={[0, -0.15 - explodeFactor * 0.4, 0]} receiveShadow>
        <boxGeometry args={[8.4, 0.28, 6.2]} />
        <meshStandardMaterial color="#0b1120" roughness={0.7} metalness={0.2} />
      </mesh>

      {/* Stepped Entrance Path with Step LEDs */}
      {[-0.8, -0.4, 0, 0.4].map((x, i) => (
        <group key={i} position={[-2.4, -0.05 + i * 0.04 - explodeFactor * 0.3, 2.4 - i * 0.35]}>
          <mesh receiveShadow>
            <boxGeometry args={[1.4, 0.06, 0.45]} />
            <meshStandardMaterial color="#1e293b" roughness={0.4} />
          </mesh>
          {/* Subtle LED strip under tread */}
          <mesh position={[0, -0.02, 0.23]}>
            <boxGeometry args={[1.35, 0.015, 0.02]} />
            <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={1.5} />
          </mesh>
        </group>
      ))}

      {/* Modern Landscaping Lawn & Boxwood Planters */}
      <mesh position={[-3.0, -0.01 - explodeFactor * 0.35, -0.8]} receiveShadow>
        <boxGeometry args={[1.8, 0.05, 4.0]} />
        <meshStandardMaterial color="#064e3b" roughness={0.9} />
      </mesh>
      {/* Architectural Low Hedges */}
      {[-2.2, -1.2, -0.2, 0.8].map((z, i) => (
        <mesh key={i} position={[-3.1, 0.15 - explodeFactor * 0.35, z]} castShadow>
          <boxGeometry args={[0.4, 0.3, 0.7]} />
          <meshStandardMaterial color="#047857" roughness={0.8} />
        </mesh>
      ))}

      {/* Modern Sculptural Trees */}
      <group position={[-3.2, 0 - explodeFactor * 0.35, 1.8]}>
        {/* Slender trunk */}
        <mesh position={[0, 0.8, 0]} castShadow>
          <cylinderGeometry args={[0.04, 0.06, 1.6, 12]} />
          <meshStandardMaterial color="#292524" roughness={0.9} />
        </mesh>
        {/* Layered geometric canopy */}
        <mesh position={[0, 1.5, 0]} castShadow>
          <coneGeometry args={[0.45, 0.9, 8]} />
          <meshStandardMaterial color="#065f46" roughness={0.7} />
        </mesh>
        <mesh position={[0, 2.0, 0]} castShadow>
          <coneGeometry args={[0.35, 0.7, 8]} />
          <meshStandardMaterial color="#047857" roughness={0.7} />
        </mesh>
      </group>

      {/* ========================================================
          2. TURQUOISE INFINITY POOL & TEAK DECK
      ======================================================== */}
      {/* Teak Wood Deck Platform */}
      <mesh position={[2.2, -0.01 - explodeFactor * 0.3, 0.4]} receiveShadow>
        <boxGeometry args={[3.2, 0.08, 4.4]} />
        <meshStandardMaterial color="#3f2717" roughness={0.6} metalness={0.1} />
      </mesh>
      {/* Individual wood plank separator lines */}
      {[-1.6, -0.8, 0, 0.8, 1.6].map((z, i) => (
        <mesh key={i} position={[2.2, 0.035 - explodeFactor * 0.3, z]}>
          <boxGeometry args={[3.18, 0.005, 0.02]} />
          <meshStandardMaterial color="#1c1109" />
        </mesh>
      ))}

      {/* Pool Basin Basin Shell */}
      <mesh position={[2.2, -0.05 - explodeFactor * 0.3, 0.4]} receiveShadow>
        <boxGeometry args={[2.5, 0.15, 3.4]} />
        <meshStandardMaterial color="#082f49" roughness={0.2} metalness={0.5} />
      </mesh>

      {/* Deep Turquoise Water Surface with Translucency */}
      <mesh position={[2.2, 0.01 - explodeFactor * 0.3, 0.4]}>
        <boxGeometry args={[2.4, 0.02, 3.3]} />
        <meshPhysicalMaterial
          color="#06b6d4"
          transmission={0.8}
          roughness={0.08}
          metalness={0.2}
          ior={1.33}
          transparent
          opacity={0.85}
          emissive="#0284c7"
          emissiveIntensity={isNight ? 0.6 : 0.25}
        />
      </mesh>
      <pointLight ref={poolLightRef} position={[2.2, 0.25, 0.4]} color="#00D9FF" distance={5} intensity={2.2} />

      {/* Modern Poolside Loungers */}
      {[-0.8, 0.8].map((z, i) => (
        <group key={i} position={[3.3, 0.1 - explodeFactor * 0.3, z]} rotation={[0, -Math.PI / 2, 0]}>
          {/* Bed frame */}
          <mesh castShadow>
            <boxGeometry args={[0.5, 0.06, 1.2]} />
            <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.3} />
          </mesh>
          {/* White luxury cushion */}
          <mesh position={[0, 0.05, 0]}>
            <boxGeometry args={[0.46, 0.05, 1.15]} />
            <meshStandardMaterial color="#f8fafc" roughness={0.9} />
          </mesh>
          {/* Headrest tilt */}
          <mesh position={[0, 0.1, -0.42]} rotation={[0.4, 0, 0]}>
            <boxGeometry args={[0.46, 0.05, 0.35]} />
            <meshStandardMaterial color="#f8fafc" roughness={0.9} />
          </mesh>
        </group>
      ))}

      {/* Perimeter Glass Balustrade on Pool Edge */}
      <mesh position={[3.45, 0.25 - explodeFactor * 0.3, 0.4]}>
        <boxGeometry args={[0.02, 0.45, 3.4]} />
        <meshPhysicalMaterial color="#bae6fd" transparent opacity={0.4} roughness={0.05} />
      </mesh>
      {/* Slim Gold Railing Cap */}
      <mesh position={[3.45, 0.48 - explodeFactor * 0.3, 0.4]}>
        <boxGeometry args={[0.04, 0.02, 3.42]} />
        <meshStandardMaterial color={goldColor} metalness={0.95} roughness={0.15} />
      </mesh>

      {/* ========================================================
          3. LOWER LEVEL MAIN LIVING PAVILION
      ======================================================== */}
      <group position={[-0.7, 0.75 - explodeFactor * 0.2, 0]}>
        {/* Main Concrete Structural Back & Side Walls */}
        <RoundedBox
          args={[3.6, 1.5, 3.6]}
          radius={0.04}
          smoothness={4}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial
            color={wallBaseColor}
            roughness={isXray ? 0.9 : 0.4}
            metalness={0.3}
            transparent={isXray}
            opacity={isXray ? 0.3 : 1}
            wireframe={isXray}
          />
        </RoundedBox>

        {/* Floor-to-Ceiling Double-Height Glass Curtain Wall (Front & Side) */}
        <mesh position={[0.4, 0, 1.82]}>
          <planeGeometry args={[2.7, 1.4]} />
          <meshPhysicalMaterial
            color={glassColor}
            transmission={0.88}
            opacity={0.65}
            transparent
            roughness={0.05}
            metalness={0.15}
            ior={1.5}
          />
        </mesh>

        {/* Slim Black Architectural Mullions / Window Framing */}
        {[-0.9, 0, 0.9, 1.75].map((x, i) => (
          <mesh key={i} position={[x, 0, 1.83]}>
            <boxGeometry args={[0.04, 1.45, 0.04]} />
            <meshStandardMaterial color={frameColor} metalness={0.9} roughness={0.2} />
          </mesh>
        ))}
        <mesh position={[0.4, 0, 1.83]}>
          <boxGeometry args={[2.75, 0.04, 0.04]} />
          <meshStandardMaterial color={frameColor} metalness={0.9} roughness={0.2} />
        </mesh>

        {/* Interior Architecture (Visible through glass) */}
        {/* Floating Minimalist Staircase */}
        <group position={[-1.1, -0.6, 0.4]}>
          {[0, 1, 2, 3, 4, 5].map((step) => (
            <mesh key={step} position={[0, step * 0.18, step * 0.2]}>
              <boxGeometry args={[0.7, 0.04, 0.26]} />
              <meshStandardMaterial color="#d97706" roughness={0.5} />
            </mesh>
          ))}
        </group>

        {/* Modern Dining Table & Chairs Silhouette */}
        <mesh position={[0.5, -0.4, 0.6]}>
          <boxGeometry args={[1.2, 0.04, 0.7]} />
          <meshStandardMaterial color="#0f172a" metalness={0.8} />
        </mesh>
        <mesh position={[0.5, -0.58, 0.6]}>
          <boxGeometry args={[0.06, 0.32, 0.06]} />
          <meshStandardMaterial color={goldColor} metalness={0.9} />
        </mesh>

        {/* Warm Golden Pendant Chandelier over Dining */}
        <group position={[0.5, 0.45, 0.6]}>
          <mesh>
            <torusGeometry args={[0.25, 0.015, 16, 32]} />
            <meshStandardMaterial color={goldColor} emissive={goldColor} emissiveIntensity={1.8} />
          </mesh>
          <pointLight color="#fbbf24" intensity={isNight ? 2.5 : 1.4} distance={4} />
        </group>

        {/* Recessed Walnut Entrance Door with Champagne Gold Pull Handle */}
        <group position={[-1.4, -0.15, 1.82]}>
          <mesh>
            <boxGeometry args={[0.75, 1.2, 0.05]} />
            <meshStandardMaterial color="#2d1a10" roughness={0.4} />
          </mesh>
          {/* Vertical Gold Pull Handle */}
          <mesh position={[0.28, 0, 0.04]}>
            <cylinderGeometry args={[0.015, 0.015, 0.7, 16]} />
            <meshStandardMaterial color={goldColor} metalness={0.98} roughness={0.1} />
          </mesh>
          {/* Keyless Smart Lock Status Indicator (Electric Cyan) */}
          <mesh position={[0.28, 0.42, 0.04]}>
            <sphereGeometry args={[0.02, 16, 16]} />
            <meshStandardMaterial color={cyanColor} emissive={cyanColor} emissiveIntensity={2.5} />
          </mesh>
        </group>
      </group>

      {/* ========================================================
          4. UPPER LEVEL CANTILEVERED MASTER SUITE
      ======================================================== */}
      <group position={[0.5, 2.2 + explodeFactor * 1.3, 0.2]}>
        {/* Charcoal Composite Cladding Volume */}
        <RoundedBox
          args={[4.0, 1.4, 3.4]}
          radius={0.05}
          smoothness={4}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial
            color={isXray ? '#0369a1' : '#0f172a'}
            roughness={isXray ? 0.9 : 0.3}
            metalness={0.6}
            transparent={isXray}
            opacity={isXray ? 0.35 : 1}
            wireframe={isXray}
          />
        </RoundedBox>

        {/* Architectural Cedar Wood Slat Screen (Louvers) */}
        <group position={[-1.1, 0, 1.72]}>
          {[-0.6, -0.45, -0.3, -0.15, 0, 0.15, 0.3, 0.45, 0.6].map((x, i) => (
            <mesh key={i} position={[x, 0, 0]} castShadow>
              <boxGeometry args={[0.04, 1.2, 0.06]} />
              <meshStandardMaterial color={woodColor} roughness={0.5} />
            </mesh>
          ))}
        </group>

        {/* Recessed Balcony Terrace Glass Sliding Doors */}
        <mesh position={[0.9, 0, 1.55]}>
          <planeGeometry args={[1.8, 1.2]} />
          <meshPhysicalMaterial
            color={glassColor}
            transmission={0.88}
            opacity={0.6}
            transparent
            roughness={0.05}
            metalness={0.2}
          />
        </mesh>
        {/* Balcony Railing Glass */}
        <mesh position={[0.9, -0.3, 1.72]}>
          <planeGeometry args={[1.8, 0.55]} />
          <meshPhysicalMaterial color="#38bdf8" transparent opacity={0.5} roughness={0.05} />
        </mesh>
        {/* Balcony Railing Gold Handrail */}
        <mesh position={[0.9, -0.02, 1.73]}>
          <boxGeometry args={[1.84, 0.03, 0.03]} />
          <meshStandardMaterial color={goldColor} metalness={0.95} roughness={0.15} />
        </mesh>

        {/* Interior Master Bedroom Lighting */}
        <pointLight position={[0.9, 0.3, 0.2]} color="#fed7aa" intensity={isNight ? 2.5 : 1.2} distance={4} />

        {/* Cantilever Bottom Soffit LED Strip (Illuminates pool below) */}
        <mesh position={[1.1, -0.71, 0]}>
          <boxGeometry args={[1.7, 0.015, 3.2]} />
          <meshStandardMaterial color="#fef08a" emissive="#fef08a" emissiveIntensity={1.2} />
        </mesh>
      </group>

      {/* ========================================================
          5. ULTRA-THIN CANTILEVERED ROOF & PHOTOVOLTAIC ARRAY
      ======================================================== */}
      <group position={[0.3, 3.15 + explodeFactor * 2.3, 0.1]}>
        {/* Ultra-Slim Modern Charcoal Roof Slab */}
        <RoundedBox args={[4.8, 0.14, 3.8]} radius={0.03} smoothness={4} castShadow>
          <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.25} />
        </RoundedBox>

        {/* Thin Luxury Gold Perimeter Fascia Strip */}
        <mesh position={[0, -0.01, 1.91]}>
          <boxGeometry args={[4.84, 0.04, 0.02]} />
          <meshStandardMaterial color={goldColor} metalness={0.98} roughness={0.1} emissive={goldColor} emissiveIntensity={0.3} />
        </mesh>
        <mesh position={[2.41, -0.01, 0]}>
          <boxGeometry args={[0.02, 0.04, 3.82]} />
          <meshStandardMaterial color={goldColor} metalness={0.98} roughness={0.1} />
        </mesh>

        {/* Realistic Solar Panel Grid Array (Dark Photovoltaic Cells) */}
        <group position={[0, 0.08, 0]}>
          {[-1.4, -0.5, 0.4, 1.3].map((x, xi) => (
            [-1.1, 0, 1.1].map((z, zi) => (
              <mesh key={`${xi}-${zi}`} position={[x, 0, z]}>
                <boxGeometry args={[0.78, 0.015, 0.95]} />
                <meshStandardMaterial
                  color="#091322"
                  metalness={0.92}
                  roughness={0.15}
                  emissive="#0284c7"
                  emissiveIntensity={0.2}
                />
              </mesh>
            ))
          ))}
        </group>
      </group>

      {/* ========================================================
          6. PARKED ELECTRIC SERVICE VEHICLE ON DRIVEWAY
      ======================================================== */}
      <group position={[-2.4, 0.18 - explodeFactor * 0.35, -1.8]} rotation={[0, Math.PI / 4, 0]}>
        {/* Vehicle Chassis */}
        <RoundedBox args={[0.9, 0.45, 1.6]} radius={0.06} smoothness={4} castShadow>
          <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.2} />
        </RoundedBox>
        {/* Roof / Glass Canopy */}
        <mesh position={[0, 0.28, -0.05]}>
          <boxGeometry args={[0.78, 0.25, 0.9]} />
          <meshPhysicalMaterial color="#38bdf8" roughness={0.1} metalness={0.3} transmission={0.7} transparent opacity={0.7} />
        </mesh>
        {/* Glowing LED Headlights (Electric Cyan) */}
        <mesh position={[-0.32, -0.02, 0.81]}>
          <boxGeometry args={[0.16, 0.06, 0.02]} />
          <meshStandardMaterial color="#00D9FF" emissive="#00D9FF" emissiveIntensity={3} />
        </mesh>
        <mesh position={[0.32, -0.02, 0.81]}>
          <boxGeometry args={[0.16, 0.06, 0.02]} />
          <meshStandardMaterial color="#00D9FF" emissive="#00D9FF" emissiveIntensity={3} />
        </mesh>
        <pointLight ref={carLightRef} position={[0, 0.1, 1.1]} color="#00D9FF" distance={3} intensity={1.8} />

        {/* Wheels */}
        {[-0.46, 0.46].map((x, xi) => (
          [-0.5, 0.5].map((z, zi) => (
            <mesh key={`${xi}-${zi}`} position={[x, -0.16, z]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.15, 0.15, 0.08, 16]} />
              <meshStandardMaterial color="#111827" roughness={0.8} />
            </mesh>
          ))
        ))}
      </group>

      {/* ========================================================
          7. INTERNAL PLUMBING & ELECTRICAL CONDUITS (X-RAY / NIGHT)
      ======================================================== */}
      <group ref={internalPipesRef} position={[-0.7, 1.1, 0]}>
        {/* Vertical Plumbing Risers (Cyan Pulse) */}
        <mesh position={[-1.2, 0.4, -0.6]}>
          <cylinderGeometry args={[0.035, 0.035, 2.8, 16]} />
          <meshStandardMaterial
            color={cyanColor}
            emissive={cyanColor}
            emissiveIntensity={isXray ? 3.0 : isNight ? 1.5 : 0.8}
            wireframe={isXray}
          />
        </mesh>
        <mesh position={[-1.2, -0.7, -0.6]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.035, 0.035, 1.4, 16]} />
          <meshStandardMaterial
            color={cyanColor}
            emissive={cyanColor}
            emissiveIntensity={isXray ? 3.0 : isNight ? 1.5 : 0.8}
          />
        </mesh>

        {/* Electrical Conduit Lines (Gold Pulse) */}
        <mesh position={[1.1, 0.6, -0.8]}>
          <cylinderGeometry args={[0.025, 0.025, 2.6, 16]} />
          <meshStandardMaterial
            color={goldColor}
            emissive={goldColor}
            emissiveIntensity={isXray ? 3.5 : isNight ? 1.8 : 0.9}
          />
        </mesh>
        <mesh position={[0.4, 1.2, -0.8]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.025, 0.025, 1.4, 16]} />
          <meshStandardMaterial
            color={goldColor}
            emissive={goldColor}
            emissiveIntensity={isXray ? 3.5 : isNight ? 1.8 : 0.9}
          />
        </mesh>
      </group>

      {/* ========================================================
          8. FLOATING SMART IOT SENSORS & STATUS BEACONS
      ======================================================== */}
      <Float speed={2.2} rotationIntensity={0.6} floatIntensity={1.0}>
        <group position={[-2.6, 2.8 + explodeFactor * 0.8, 1.6]}>
          <mesh>
            <octahedronGeometry args={[0.15]} />
            <meshStandardMaterial color="#00D9FF" emissive="#00D9FF" emissiveIntensity={2.5} />
          </mesh>
          <pointLight color="#00D9FF" intensity={1.5} distance={3} />
        </group>
      </Float>

      <Float speed={2.6} rotationIntensity={0.8} floatIntensity={1.2}>
        <group position={[2.8, 2.4 + explodeFactor * 0.6, -1.6]}>
          <mesh>
            <dodecahedronGeometry args={[0.14]} />
            <meshStandardMaterial color="#D4AF37" emissive="#D4AF37" emissiveIntensity={2.8} />
          </mesh>
          <pointLight color="#D4AF37" intensity={1.5} distance={3} />
        </group>
      </Float>
    </group>
  );
}

export default function Hero3DHouse() {
  const [assemblyProgress, setAssemblyProgress] = useState(1);
  const [mode, setMode] = useState<'assemble' | 'explode' | 'xray' | 'night'>('assemble');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    setMousePos({ x, y });
  };

  return (
    <div
      className="relative w-full h-[540px] lg:h-[680px] rounded-3xl overflow-hidden glass-panel border border-white/10 shadow-2xl"
      onMouseMove={handleMouseMove}
    >
      {/* 3D Canvas Viewport */}
      <Canvas
        camera={{ position: [6.4, 4.2, 6.8], fov: 40 }}
        shadows
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#030712']} />

        {/* Ambient & Luxury Directional Lighting */}
        <ambientLight intensity={mode === 'night' ? 0.3 : 0.6} />
        <directionalLight
          position={[10, 14, 8]}
          intensity={mode === 'night' ? 0.8 : 2.2}
          color={mode === 'night' ? '#93c5fd' : '#fffbeb'}
          castShadow
          shadow-mapSize={2048}
          shadow-bias={-0.0001}
        />
        <pointLight position={[-8, 6, -6]} intensity={1.2} color="#D4AF37" />
        <pointLight position={[8, -2, 6]} intensity={1.5} color="#00D9FF" />

        {/* Luxury Architectural Villa Model */}
        <ModernLuxuryVilla
          assemblyProgress={assemblyProgress}
          mode={mode}
          mousePos={mousePos}
        />

        {/* Ground Floor Mirror Reflection */}
        <mesh position={[0, -0.92, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[35, 35]} />
          <MeshReflectorMaterial
            blur={[300, 100]}
            resolution={512}
            mixBlur={1}
            mixStrength={45}
            roughness={0.35}
            depthScale={1.2}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.4}
            color="#07111F"
            metalness={0.85}
            mirror={0.55}
          />
        </mesh>

        <ContactShadows
          position={[0, -0.91, 0]}
          opacity={0.85}
          scale={14}
          blur={2.2}
          far={6}
          color="#000000"
        />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2 - 0.05}
          minPolarAngle={Math.PI / 5}
          rotateSpeed={0.5}
        />
      </Canvas>

      {/* Floating 3D Interaction Control Dock */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-2 rounded-2xl glass-panel border border-white/10 z-10 shadow-2xl backdrop-blur-xl">
        <button
          onClick={() => {
            setMode('assemble');
            setAssemblyProgress(1);
          }}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
            mode === 'assemble'
              ? 'bg-[#D4AF37] text-black font-semibold shadow-lg shadow-[#D4AF37]/30'
              : 'text-gray-300 hover:text-white hover:bg-white/5'
          }`}
        >
          Villa View
        </button>

        <button
          onClick={() => {
            setMode('explode');
            setAssemblyProgress(0);
          }}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
            mode === 'explode'
              ? 'bg-[#00D9FF] text-black font-semibold shadow-lg shadow-[#00D9FF]/30'
              : 'text-gray-300 hover:text-white hover:bg-white/5'
          }`}
        >
          Exploded 3D
        </button>

        <button
          onClick={() => setMode('xray')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
            mode === 'xray'
              ? 'bg-emerald-500 text-black font-semibold shadow-lg shadow-emerald-500/30'
              : 'text-gray-300 hover:text-white hover:bg-white/5'
          }`}
        >
          X-Ray Grid
        </button>

        <button
          onClick={() => setMode('night')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
            mode === 'night'
              ? 'bg-indigo-600 text-white font-semibold shadow-lg shadow-indigo-600/30'
              : 'text-gray-300 hover:text-white hover:bg-white/5'
          }`}
        >
          Night Luxury
        </button>
      </div>

      {/* Top right interaction hint */}
      <div className="absolute top-5 right-5 pointer-events-none hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-md text-xs text-gray-300">
        <span>Drag to rotate</span>
        <span className="text-gray-500">•</span>
        <span className="text-[#D4AF37]">Hover to inspect</span>
      </div>
    </div>
  );
}
