import * as THREE from 'three';

export interface WholeHouseWiringRefs {
  group: THREE.Group;
  update: (progress: number, delta: number, isXray: boolean) => void;
  dispose: () => void;
}

/**
 * Procedural 3D Whole-House Electrical Grid & Wiring Infrastructure
 * Renders complete architectural electrical schematics visible in X-Ray mode:
 * - Main 400A Service Entrance & Smart Breaker Panel with status LEDs
 * - Main vertical utility conduit backbone riser (Ground -> Floor 2 -> Rooftop HVAC)
 * - Living Room branch circuits (OLED TV, AC compressor, ceiling cove)
 * - Kitchen high-draw branch circuits (Sub-floor island feed, double wall ovens, induction hob, fridge)
 * - Second floor sub-distribution panel
 * - Master Bedroom circuits (Dual globe pendants, nightstand USB/outlets, bedroom AC)
 * - Luxury Bathroom GFCI circuits (Backlit mirror halo driver, shower niche, vanity wash basin)
 * - Rooftop heavy-duty HVAC power conduit & solar inverter bus
 * - Animated glowing electric current pulses traveling along circuits
 */
export function createWholeHouseWiring3D(isSoftwareGl: boolean): WholeHouseWiringRefs {
  const group = new THREE.Group();
  group.name = 'Whole_House_Electrical_Grid';
  group.visible = false;

  const disposables: (THREE.BufferGeometry | THREE.Material)[] = [];

  // ==========================================
  // SHARED MATERIALS
  // ==========================================
  // Primary 240V / 120V Electrical Conduits (Amber Gold)
  const conduitGoldMat = new THREE.MeshStandardMaterial({
    color: 0xf59e0b,
    emissive: 0xd97706,
    emissiveIntensity: 0.9,
    metalness: 0.95,
    roughness: 0.15,
  });

  // Heavy Power / HVAC Riser Conduits (Electric Cyan)
  const conduitCyanMat = new THREE.MeshStandardMaterial({
    color: 0x00d9ff,
    emissive: 0x0088aa,
    emissiveIntensity: 0.85,
    metalness: 0.9,
    roughness: 0.18,
  });

  // Junction Boxes & Breaker Panel Enclosures
  const junctionBoxMat = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    metalness: 0.85,
    roughness: 0.3,
  });

  // Glowing Breaker LEDs (Green & Amber)
  const ledGreenMat = new THREE.MeshBasicMaterial({ color: 0x00c853 });
  const ledAmberMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b });
  const ledCyanMat = new THREE.MeshBasicMaterial({ color: 0x00d9ff });

  disposables.push(
    conduitGoldMat,
    conduitCyanMat,
    junctionBoxMat,
    ledGreenMat,
    ledAmberMat,
    ledCyanMat
  );

  // Helper to add straight conduit segment
  function addConduit(
    p1: [number, number, number],
    p2: [number, number, number],
    radius: number,
    material: THREE.Material
  ) {
    const v1 = new THREE.Vector3(...p1);
    const v2 = new THREE.Vector3(...p2);
    const distance = v1.distanceTo(v2);
    if (distance < 0.001) return;

    const geom = new THREE.CylinderGeometry(radius, radius, distance, 8);
    geom.translate(0, distance / 2, 0);
    geom.rotateX(Math.PI / 2);

    const mesh = new THREE.Mesh(geom, material);
    mesh.position.copy(v1);
    mesh.lookAt(v2);

    group.add(mesh);
    disposables.push(geom);
  }

  // Helper to add junction box
  function addJunctionBox(pos: [number, number, number], size = 0.22, withLed = true) {
    const boxGeom = new THREE.BoxGeometry(size, size, size * 0.7);
    const box = new THREE.Mesh(boxGeom, junctionBoxMat);
    box.position.set(...pos);
    group.add(box);
    disposables.push(boxGeom);

    if (withLed) {
      const ledGeom = new THREE.SphereGeometry(size * 0.16, 8, 8);
      const led = new THREE.Mesh(ledGeom, Math.random() > 0.3 ? ledGreenMat : ledAmberMat);
      led.position.set(pos[0], pos[1], pos[2] + size * 0.38);
      group.add(led);
      disposables.push(ledGeom);
    }
  }

  // ==========================================
  // 1. MAIN SMART ELECTRICAL BREAKER PANEL (Ground Floor Left)
  // ==========================================
  const panelGroup = new THREE.Group();
  panelGroup.position.set(-5.6, 1.25, 0.1);

  // Panel enclosure
  const panelGeom = new THREE.BoxGeometry(0.55, 0.95, 0.22);
  const panelMesh = new THREE.Mesh(panelGeom, junctionBoxMat);
  panelGroup.add(panelMesh);
  disposables.push(panelGeom);

  // Digital Smart Meter Glass Readout
  const meterGeom = new THREE.CylinderGeometry(0.12, 0.12, 0.06, 16);
  meterGeom.rotateX(Math.PI / 2);
  const meterMat = new THREE.MeshBasicMaterial({ color: 0x00d9ff });
  const meter = new THREE.Mesh(meterGeom, meterMat);
  meter.position.set(0, 0.26, 0.12);
  panelGroup.add(meter);
  disposables.push(meterGeom, meterMat);

  // Array of 8 miniature smart breaker toggle LEDs
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 2; c++) {
      const bLedGeom = new THREE.BoxGeometry(0.04, 0.03, 0.03);
      const bLed = new THREE.Mesh(bLedGeom, r === 1 ? ledAmberMat : ledGreenMat);
      bLed.position.set(-0.12 + c * 0.24, -0.05 - r * 0.08, 0.12);
      panelGroup.add(bLed);
      disposables.push(bLedGeom);
    }
  }

  // Underground utility feed coming up into panel
  addConduit([-5.6, -0.5, 0.1], [-5.6, 0.75, 0.1], 0.07, conduitCyanMat);

  group.add(panelGroup);

  // ==========================================
  // 2. CENTRAL MULTI-CONDUIT UTILITY RISER
  // ==========================================
  // Vertical backbone from Ground (Y: 0.35) through Floor 2 (Y: 3.82) to Rooftop (Y: 7.9)
  const riserX = -0.2;
  const riserZ = -1.8;
  addConduit([riserX, 0.35, riserZ], [riserX, 7.9, riserZ], 0.06, conduitCyanMat);
  addConduit([riserX + 0.12, 0.35, riserZ], [riserX + 0.12, 7.9, riserZ], 0.05, conduitGoldMat);

  // Main feed line from Breaker Panel across ground ceiling to utility riser
  addConduit([-5.6, 1.7, 0.1], [-5.6, 3.25, 0.1], 0.05, conduitCyanMat);
  addConduit([-5.6, 3.25, 0.1], [-5.6, 3.25, -1.8], 0.05, conduitCyanMat);
  addConduit([-5.6, 3.25, -1.8], [riserX, 3.25, -1.8], 0.05, conduitCyanMat);

  addJunctionBox([-5.6, 3.25, -1.8]);
  addJunctionBox([riserX, 3.25, -1.8]);

  // ==========================================
  // 3. GROUND FLOOR: LIVING ROOM ELECTRICAL GRID
  // ==========================================
  // Main Living Room Branch running West from Riser
  addConduit([riserX, 3.15, -1.8], [-2.9, 3.15, -1.8], 0.045, conduitGoldMat);
  addJunctionBox([-2.9, 3.15, -1.8]);

  // Living Room Ceiling Perimeter Loop
  addConduit([-2.9, 3.15, -1.8], [-2.9, 3.15, 1.8], 0.035, conduitGoldMat);
  addConduit([-2.9, 3.15, 1.8], [-5.2, 3.15, 1.8], 0.035, conduitGoldMat);
  addConduit([-5.2, 3.15, 1.8], [-5.2, 3.15, -1.8], 0.035, conduitGoldMat);
  addConduit([-5.2, 3.15, -1.8], [-2.9, 3.15, -1.8], 0.035, conduitGoldMat);

  // TV Feature Media Wall 120V & Data Conduits Drop
  addConduit([-2.9, 3.15, -1.1], [-2.9, 1.45, -1.1], 0.04, conduitGoldMat);
  addJunctionBox([-2.9, 1.45, -1.1], 0.18);

  // Living Room Split AC Dedicated Circuit
  addConduit([-5.2, 3.15, 0.2], [-5.2, 2.35, 0.2], 0.04, conduitCyanMat);
  addJunctionBox([-5.2, 2.35, 0.2], 0.16);

  // ==========================================
  // 4. GROUND FLOOR: KITCHEN HIGH-LOAD GRID
  // ==========================================
  // Main Kitchen Branch running East from Riser
  addConduit([riserX, 3.15, -1.8], [2.9, 3.15, -1.8], 0.055, conduitCyanMat);
  addJunctionBox([2.9, 3.15, -1.8]);

  // Dedicated 50A Feed Drop to Double Wall Ovens
  addConduit([2.9, 3.15, -1.8], [4.15, 3.15, -1.8], 0.05, conduitCyanMat);
  addConduit([4.15, 3.15, -1.8], [4.15, 1.5, -1.8], 0.05, conduitCyanMat);
  addJunctionBox([4.15, 1.5, -1.8], 0.2);

  // Refrigerator dedicated outlet
  addConduit([2.9, 3.15, -1.8], [1.85, 3.15, -1.8], 0.04, conduitGoldMat);
  addConduit([1.85, 3.15, -1.8], [1.85, 1.4, -1.8], 0.04, conduitGoldMat);

  // Sub-Floor Conduit Branch crossing to Central Kitchen Island
  addConduit([2.9, 3.15, -1.8], [2.9, 0.35, -1.8], 0.045, conduitGoldMat);
  addConduit([2.9, 0.35, -1.8], [2.9, 0.35, 0.35], 0.045, conduitGoldMat);
  addConduit([2.9, 0.35, 0.35], [2.9, 1.05, 0.35], 0.045, conduitGoldMat);
  addJunctionBox([2.9, 1.05, 0.35], 0.18); // Island internal power junction

  // Suspended Cone Pendants Ceiling Track Conduit
  addConduit([2.9, 3.15, 0.35], [2.2, 3.15, 0.35], 0.03, conduitGoldMat);
  addConduit([2.9, 3.15, 0.35], [3.6, 3.15, 0.35], 0.03, conduitGoldMat);

  // ==========================================
  // 5. SECOND FLOOR: SUB-PANEL & LANDING
  // ==========================================
  const subPanelPos: [number, number, number] = [riserX, 4.85, -1.7];
  addJunctionBox(subPanelPos, 0.32);

  // ==========================================
  // 6. SECOND FLOOR: MASTER BEDROOM GRID
  // ==========================================
  // Feeder conduit running West from Sub-Panel across Bedroom Ceiling (Y: 6.65)
  addConduit([riserX, 6.65, -1.8], [-2.9, 6.65, -1.8], 0.045, conduitGoldMat);
  addJunctionBox([-2.9, 6.65, -1.8]);

  // Headboard Wall Distribution Box
  addConduit([-2.9, 6.65, -1.8], [-2.9, 6.65, -1.1], 0.04, conduitGoldMat);
  addConduit([-2.9, 6.65, -1.1], [-2.9, 4.4, -1.1], 0.04, conduitGoldMat);
  addJunctionBox([-2.9, 4.4, -1.1], 0.2);

  // Bedside Nightstand Power & USB branches (Left & Right)
  addConduit([-2.9, 4.4, -1.1], [-4.3, 4.4, -1.1], 0.03, conduitGoldMat);
  addConduit([-2.9, 4.4, -1.1], [-1.5, 4.4, -1.1], 0.03, conduitGoldMat);
  addJunctionBox([-4.3, 4.4, -1.1], 0.14);
  addJunctionBox([-1.5, 4.4, -1.1], 0.14);

  // Dual Globe Pendant Ceiling Drop Conduits
  addConduit([-2.9, 6.65, -1.1], [-4.3, 6.65, -1.1], 0.03, conduitGoldMat);
  addConduit([-2.9, 6.65, -1.1], [-1.5, 6.65, -1.1], 0.03, conduitGoldMat);
  addConduit([-4.3, 6.65, -1.1], [-4.3, 5.0, -1.1], 0.02, conduitGoldMat);
  addConduit([-1.5, 6.65, -1.1], [-1.5, 5.0, -1.1], 0.02, conduitGoldMat);

  // Master Bedroom Climate AC Dedicated Circuit
  addConduit([-2.9, 6.65, -1.8], [-4.4, 6.65, -1.8], 0.04, conduitCyanMat);
  addConduit([-4.4, 6.65, -1.8], [-4.4, 5.85, -1.8], 0.04, conduitCyanMat);
  addJunctionBox([-4.4, 5.85, -1.8], 0.16);

  // ==========================================
  // 7. SECOND FLOOR: LUXURY BATHROOM GFCI GRID
  // ==========================================
  // Feeder conduit running East from Sub-Panel to Bathroom Ceiling
  addConduit([riserX, 6.65, -1.8], [2.9, 6.65, -1.8], 0.045, conduitCyanMat);
  addJunctionBox([2.9, 6.65, -1.8]);

  // Backlit Mirror Halo LED Driver Transformer Box
  addConduit([2.9, 6.65, -1.8], [2.35, 6.65, -1.8], 0.035, conduitGoldMat);
  addConduit([2.35, 6.65, -1.8], [2.35, 5.65, -1.1], 0.035, conduitGoldMat);
  addJunctionBox([2.35, 5.65, -1.1], 0.18); // Behind mirror halo driver

  // Vanity Wash Basin GFCI Outlet Conduit Drop
  addConduit([2.35, 5.65, -1.1], [2.35, 4.45, -1.1], 0.035, conduitGoldMat);
  addJunctionBox([2.35, 4.45, -1.1], 0.14);

  // Rain Shower Illuminated Niche Low-Voltage Conduit
  addConduit([2.9, 6.65, -1.8], [3.95, 6.65, -1.8], 0.03, conduitGoldMat);
  addConduit([3.95, 6.65, -1.8], [3.95, 5.15, -0.9], 0.03, conduitGoldMat);
  addJunctionBox([3.95, 5.15, -0.9], 0.14);

  // ==========================================
  // 8. ROOFTOP HEAVY-DUTY HVAC POWER BUS
  // ==========================================
  // Conduits extending from Riser top out to Rooftop AC Unit ([1.2, 8.4, -1.0])
  addConduit([riserX, 7.9, riserZ], [riserX, 8.35, riserZ], 0.06, conduitCyanMat);
  addConduit([riserX, 8.35, riserZ], [1.2, 8.35, riserZ], 0.06, conduitCyanMat);
  addConduit([1.2, 8.35, riserZ], [1.2, 8.35, -1.0], 0.06, conduitCyanMat);
  addJunctionBox([1.2, 8.35, -1.0], 0.26);

  // ==========================================
  // 9. ANIMATED GLOWING CURRENT PULSES
  // ==========================================
  const pulseCount = 120;
  const pulsePositions = new Float32Array(pulseCount * 3);
  const pulseSpeeds = new Float32Array(pulseCount);

  // Seed pulses along the major conduit trunks
  for (let i = 0; i < pulseCount; i++) {
    const t = Math.random();
    // Route 1: Ground panel to riser
    if (i < 40) {
      pulsePositions[i * 3] = THREE.MathUtils.lerp(-5.6, riserX, t);
      pulsePositions[i * 3 + 1] = 3.25;
      pulsePositions[i * 3 + 2] = -1.8;
      pulseSpeeds[i] = 1.8 + Math.random() * 1.5;
    }
    // Route 2: Vertical riser
    else if (i < 80) {
      pulsePositions[i * 3] = riserX;
      pulsePositions[i * 3 + 1] = THREE.MathUtils.lerp(0.35, 7.9, t);
      pulsePositions[i * 3 + 2] = riserZ;
      pulseSpeeds[i] = 2.4 + Math.random() * 1.6;
    }
    // Route 3: Second floor to bedroom / bathroom
    else {
      const isEast = i % 2 === 0;
      pulsePositions[i * 3] = THREE.MathUtils.lerp(riserX, isEast ? 2.9 : -2.9, t);
      pulsePositions[i * 3 + 1] = 6.65;
      pulsePositions[i * 3 + 2] = -1.8;
      pulseSpeeds[i] = 1.9 + Math.random() * 1.2;
    }
  }

  const pulseGeom = new THREE.BufferGeometry();
  pulseGeom.setAttribute('position', new THREE.BufferAttribute(pulsePositions, 3));
  const pulseMat = new THREE.PointsMaterial({
    color: 0xffea00, // Electric bright gold
    size: isSoftwareGl ? 0.18 : 0.14,
    transparent: true,
    opacity: 0.95,
    blending: THREE.AdditiveBlending,
  });
  const pulsePoints = new THREE.Points(pulseGeom, pulseMat);
  group.add(pulsePoints);
  disposables.push(pulseGeom, pulseMat);

  // Ambient electrical hum light
  const electricalGridLight = new THREE.PointLight(0xf59e0b, 0, 16);
  electricalGridLight.position.set(0, 4.0, 0);
  group.add(electricalGridLight);

  // ==========================================
  // UPDATE & CLEANUP
  // ==========================================
  let animTime = 0;

  function update(progress: number, delta: number, isXray: boolean) {
    group.visible = isXray;

    if (!isXray) {
      electricalGridLight.intensity = 0;
      return;
    }

    animTime += delta * 3;

    // Conduits pulsing emissive energy
    conduitGoldMat.emissiveIntensity = 0.8 + Math.sin(animTime * 4) * 0.35;
    conduitCyanMat.emissiveIntensity = 0.85 + Math.cos(animTime * 3) * 0.3;
    electricalGridLight.intensity = 2.4 + Math.sin(animTime * 2) * 0.6;

    // Advance electric current electron pulses along conductors
    const pos = pulseGeom.attributes.position.array as Float32Array;
    for (let i = 0; i < pulseCount; i++) {
      if (i < 40) {
        pos[i * 3] += delta * pulseSpeeds[i];
        if (pos[i * 3] > riserX) pos[i * 3] = -5.6;
      } else if (i < 80) {
        pos[i * 3 + 1] += delta * pulseSpeeds[i];
        if (pos[i * 3 + 1] > 7.9) pos[i * 3 + 1] = 0.35;
      } else {
        const isEast = i % 2 === 0;
        if (isEast) {
          pos[i * 3] += delta * pulseSpeeds[i];
          if (pos[i * 3] > 2.9) pos[i * 3] = riserX;
        } else {
          pos[i * 3] -= delta * pulseSpeeds[i];
          if (pos[i * 3] < -2.9) pos[i * 3] = riserX;
        }
      }
    }
    pulseGeom.attributes.position.needsUpdate = true;
  }

  function dispose() {
    disposables.forEach((item) => {
      item.dispose();
    });
  }

  return {
    group,
    update,
    dispose,
  };
}
