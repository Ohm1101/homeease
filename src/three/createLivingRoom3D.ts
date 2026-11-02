import * as THREE from 'three';

export interface LivingRoomRefs {
  group: THREE.Group;
  acStatusLed: THREE.Mesh;
  acWarningRing: THREE.Mesh;
  update: (progress: number, delta: number) => void;
  dispose: () => void;
}

/**
 * Procedural 3D Luxury Modern Living Room Model
 * Matched to the architectural villa ground-floor living pavilion:
 * - Sectional L-shaped linen sofa with plush cushions & throw pillows
 * - Designer black marble low-profile coffee table with book & ceramic vase
 * - Fluted wood media wall with floating credenza & warm LED underglow
 * - Wall-mounted 75" OLED Television
 * - Wall-mounted slim AC Split Unit with interactive status LED & warning rings
 * - Woven textured area rug
 * - Architectural arc floor lamp with warm glow
 * - Potted indoor monstera / fiddle-leaf plant
 */
export function createLivingRoom3D(isSoftwareGl: boolean): LivingRoomRefs {
  const group = new THREE.Group();
  group.name = 'Luxury_Living_Room_Suite';

  // Base positioning: Ground floor living pavilion (aligned with ground-floor slab Y: 0.35)
  group.position.set(-2.9, 0.35, 0.3);

  const disposables: (THREE.BufferGeometry | THREE.Material)[] = [];

  // ==========================================
  // 1. TEXTURED WOVEN AREA RUG
  // ==========================================
  const rugGeom = new THREE.BoxGeometry(4.2, 0.03, 3.8);
  const rugMat = new THREE.MeshStandardMaterial({
    color: 0xd6d3cb, // Warm beige/cream woven wool
    roughness: 0.95,
    metalness: 0.02,
  });
  const rug = new THREE.Mesh(rugGeom, rugMat);
  rug.position.set(0.2, 0.015, 0.4);
  rug.receiveShadow = !isSoftwareGl;
  group.add(rug);
  disposables.push(rugGeom, rugMat);

  // ==========================================
  // 2. LUXURY L-SHAPED MODULAR SECTIONAL SOFA
  // ==========================================
  const sofaGroup = new THREE.Group();
  sofaGroup.name = 'Sectional_Sofa_Group';
  sofaGroup.position.set(0.1, 0, 0.6);

  const sofaFabricMat = new THREE.MeshStandardMaterial({
    color: 0xe5e2dc, // Sand linen upholstery
    roughness: 0.85,
    metalness: 0.05,
  });
  const darkPillowMat = new THREE.MeshStandardMaterial({
    color: 0x334155, // Slate blue accent cushion
    roughness: 0.8,
  });
  const rustPillowMat = new THREE.MeshStandardMaterial({
    color: 0xc25e3a, // Terracotta rust velvet cushion
    roughness: 0.75,
  });
  disposables.push(sofaFabricMat, darkPillowMat, rustPillowMat);

  // Main Sofa Base (Horizontal run facing the TV wall)
  const sofaBaseGeom = new THREE.BoxGeometry(2.8, 0.28, 1.1);
  const sofaBase = new THREE.Mesh(sofaBaseGeom, sofaFabricMat);
  sofaBase.position.set(0, 0.14, 0.5);
  sofaBase.castShadow = !isSoftwareGl;
  sofaGroup.add(sofaBase);
  disposables.push(sofaBaseGeom);

  // Left Chaise Longue Extension (projecting forward toward the terrace glass)
  const chaiseGeom = new THREE.BoxGeometry(1.1, 0.28, 1.6);
  const chaise = new THREE.Mesh(chaiseGeom, sofaFabricMat);
  chaise.position.set(-0.85, 0.14, -0.65);
  chaise.castShadow = !isSoftwareGl;
  sofaGroup.add(chaise);
  disposables.push(chaiseGeom);

  // Seat Cushions (Plush beveled blocks)
  const seatCushionGeom = new THREE.BoxGeometry(0.85, 0.16, 0.95);
  disposables.push(seatCushionGeom);
  for (let i = 0; i < 3; i++) {
    const seat = new THREE.Mesh(seatCushionGeom, sofaFabricMat);
    seat.position.set(-0.85 + i * 0.9, 0.36, 0.48);
    seat.castShadow = !isSoftwareGl;
    sofaGroup.add(seat);
  }

  // Chaise Front Cushion
  const chaiseCushionGeom = new THREE.BoxGeometry(0.95, 0.16, 1.3);
  const chaiseCushion = new THREE.Mesh(chaiseCushionGeom, sofaFabricMat);
  chaiseCushion.position.set(-0.85, 0.36, -0.65);
  sofaGroup.add(chaiseCushion);
  disposables.push(chaiseCushionGeom);

  // Backrest (Long rear support)
  const backrestGeom = new THREE.BoxGeometry(2.8, 0.55, 0.28);
  const backrest = new THREE.Mesh(backrestGeom, sofaFabricMat);
  backrest.position.set(0, 0.55, 0.95);
  backrest.castShadow = !isSoftwareGl;
  sofaGroup.add(backrest);
  disposables.push(backrestGeom);

  // Chaise Side Backrest (Left side wall)
  const chaiseSideGeom = new THREE.BoxGeometry(0.28, 0.55, 1.8);
  const chaiseSide = new THREE.Mesh(chaiseSideGeom, sofaFabricMat);
  chaiseSide.position.set(-1.3, 0.55, -0.1);
  chaiseSide.castShadow = !isSoftwareGl;
  sofaGroup.add(chaiseSide);
  disposables.push(chaiseSideGeom);

  // Right Side Armrest
  const armrestGeom = new THREE.BoxGeometry(0.28, 0.42, 1.1);
  const armrest = new THREE.Mesh(armrestGeom, sofaFabricMat);
  armrest.position.set(1.3, 0.42, 0.5);
  sofaGroup.add(armrest);
  disposables.push(armrestGeom);

  // Throw Pillows
  const pillowGeom = new THREE.BoxGeometry(0.38, 0.38, 0.14);
  disposables.push(pillowGeom);

  const pillow1 = new THREE.Mesh(pillowGeom, rustPillowMat);
  pillow1.position.set(-0.7, 0.55, 0.76);
  pillow1.rotation.y = 0.2;
  sofaGroup.add(pillow1);

  const pillow2 = new THREE.Mesh(pillowGeom, darkPillowMat);
  pillow2.position.set(0.6, 0.55, 0.76);
  pillow2.rotation.y = -0.15;
  sofaGroup.add(pillow2);

  group.add(sofaGroup);

  // ==========================================
  // 3. DESIGNER LOW-PROFILE COFFEE TABLE
  // ==========================================
  const tableGroup = new THREE.Group();
  tableGroup.position.set(0.3, 0, -0.4);

  // Black Marquina marble tabletop
  const tableTopGeom = new THREE.BoxGeometry(1.4, 0.08, 0.85);
  const tableTopMat = new THREE.MeshStandardMaterial({
    color: 0x18181b,
    roughness: 0.25,
    metalness: 0.15,
  });
  const tableTop = new THREE.Mesh(tableTopGeom, tableTopMat);
  tableTop.position.y = 0.26;
  tableTop.castShadow = !isSoftwareGl;
  tableGroup.add(tableTop);
  disposables.push(tableTopGeom, tableTopMat);

  // Recessed plinth base
  const tableBaseGeom = new THREE.BoxGeometry(1.1, 0.22, 0.65);
  const tableBaseMat = new THREE.MeshStandardMaterial({
    color: 0x09090b,
    roughness: 0.6,
    metalness: 0.3,
  });
  const tableBase = new THREE.Mesh(tableBaseGeom, tableBaseMat);
  tableBase.position.y = 0.11;
  tableGroup.add(tableBase);
  disposables.push(tableBaseGeom, tableBaseMat);

  // Decor on Coffee Table: Art book & Minimalist Ceramic Vase
  const bookGeom = new THREE.BoxGeometry(0.28, 0.03, 0.35);
  const bookMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.4 });
  const book = new THREE.Mesh(bookGeom, bookMat);
  book.position.set(-0.25, 0.315, 0.05);
  book.rotation.y = 0.25;
  tableGroup.add(book);
  disposables.push(bookGeom, bookMat);

  const vaseGeom = new THREE.CylinderGeometry(0.08, 0.12, 0.24, 16);
  const vaseMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.3 });
  const vase = new THREE.Mesh(vaseGeom, vaseMat);
  vase.position.set(0.3, 0.42, -0.1);
  tableGroup.add(vase);
  disposables.push(vaseGeom, vaseMat);

  group.add(tableGroup);

  // ==========================================
  // 4. FLUTED WOOD TV WALL & FLOATING CONSOLE
  // ==========================================
  // Situated on the rear wall of the living area facing the sofa
  const mediaWallGroup = new THREE.Group();
  mediaWallGroup.position.set(0.1, 0, -1.9);

  // Fluted Wooden Acoustic Accent Wall
  const wallPanelGeom = new THREE.BoxGeometry(3.6, 2.8, 0.08);
  const woodMat = new THREE.MeshStandardMaterial({
    color: 0x854d0e, // Rich teak / walnut
    roughness: 0.45,
    metalness: 0.1,
  });
  const wallPanel = new THREE.Mesh(wallPanelGeom, woodMat);
  wallPanel.position.set(0, 1.4, 0);
  mediaWallGroup.add(wallPanel);
  disposables.push(wallPanelGeom, woodMat);

  // Vertical Fluted Slats on the accent wall
  const slatGeom = new THREE.BoxGeometry(0.04, 2.8, 0.03);
  const slatMat = new THREE.MeshStandardMaterial({
    color: 0x713f12,
    roughness: 0.4,
  });
  disposables.push(slatGeom, slatMat);
  for (let x = -1.7; x <= 1.7; x += 0.12) {
    const slat = new THREE.Mesh(slatGeom, slatMat);
    slat.position.set(x, 1.4, 0.055);
    mediaWallGroup.add(slat);
  }

  // Floating Media Credenza / Console
  const credenzaGeom = new THREE.BoxGeometry(3.0, 0.38, 0.42);
  const credenzaMat = new THREE.MeshStandardMaterial({
    color: 0x1e293b, // Dark charcoal lacquer
    roughness: 0.3,
    metalness: 0.4,
  });
  const credenza = new THREE.Mesh(credenzaGeom, credenzaMat);
  credenza.position.set(0, 0.42, 0.25);
  credenza.castShadow = !isSoftwareGl;
  mediaWallGroup.add(credenza);
  disposables.push(credenzaGeom, credenzaMat);

  // Warm LED Under-Cabinet Light Strip
  const ledStripGeom = new THREE.BoxGeometry(2.9, 0.02, 0.02);
  const ledStripMat = new THREE.MeshBasicMaterial({ color: 0xffaa44 });
  const ledStrip = new THREE.Mesh(ledStripGeom, ledStripMat);
  ledStrip.position.set(0, 0.22, 0.25);
  mediaWallGroup.add(ledStrip);
  disposables.push(ledStripGeom, ledStripMat);

  const credenzaLight = new THREE.PointLight(0xff9933, 1.5, 4);
  credenzaLight.position.set(0, 0.15, 0.3);
  mediaWallGroup.add(credenzaLight);

  // 75" Ultra-Slim Wall-Mounted OLED TV
  const tvBezelGeom = new THREE.BoxGeometry(2.0, 1.15, 0.04);
  const tvBezelMat = new THREE.MeshStandardMaterial({
    color: 0x0a0a0a,
    roughness: 0.15,
    metalness: 0.95,
  });
  const tvBezel = new THREE.Mesh(tvBezelGeom, tvBezelMat);
  tvBezel.position.set(0, 1.55, 0.1);
  mediaWallGroup.add(tvBezel);
  disposables.push(tvBezelGeom, tvBezelMat);

  // TV Screen Display Surface (Subtle ambient screen glow)
  const tvScreenGeom = new THREE.PlaneGeometry(1.94, 1.09);
  const tvScreenMat = new THREE.MeshBasicMaterial({
    color: 0x0f172a, // Deep OLED standby obsidian
  });
  const tvScreen = new THREE.Mesh(tvScreenGeom, tvScreenMat);
  tvScreen.position.set(0, 1.55, 0.125);
  mediaWallGroup.add(tvScreen);
  disposables.push(tvScreenGeom, tvScreenMat);

  group.add(mediaWallGroup);

  // ==========================================
  // 5. INDOOR AC SPLIT UNIT (SCENE 5 HERO ITEM)
  // ==========================================
  // Mounted high on the side wall with real-time status LED and thermal telemetry
  const acGroup = new THREE.Group();
  acGroup.position.set(1.4, 2.35, 0.6);
  acGroup.rotation.y = -Math.PI / 2; // Facing into the room

  const acBodyGeom = new THREE.BoxGeometry(1.3, 0.38, 0.25);
  const acBodyMat = new THREE.MeshStandardMaterial({
    color: 0xf8fafc,
    roughness: 0.2,
    metalness: 0.1,
  });
  const acBody = new THREE.Mesh(acBodyGeom, acBodyMat);
  acGroup.add(acBody);
  disposables.push(acBodyGeom, acBodyMat);

  // Louver discharge vent (bottom slot)
  const acVentGeom = new THREE.BoxGeometry(1.15, 0.04, 0.08);
  const acVentMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.5 });
  const acVent = new THREE.Mesh(acVentGeom, acVentMat);
  acVent.position.set(0, -0.14, 0.06);
  acGroup.add(acVent);
  disposables.push(acVentGeom, acVentMat);

  // Digital Status Indicator LED Ring
  const ledGeom = new THREE.SphereGeometry(0.04, 12, 12);
  const ledMat = new THREE.MeshBasicMaterial({ color: 0x00c853 }); // Normal green
  const acStatusLed = new THREE.Mesh(ledGeom, ledMat);
  acStatusLed.position.set(0.48, 0.05, 0.13);
  acGroup.add(acStatusLed);
  disposables.push(ledGeom, ledMat);

  // Pulsing Thermal Anomaly Ring (Scene 5 warning)
  const ringGeom = new THREE.RingGeometry(0.12, 0.22, 24);
  const ringMat = new THREE.MeshBasicMaterial({
    color: 0xef4444,
    transparent: true,
    opacity: 0,
    side: THREE.DoubleSide,
  });
  const acWarningRing = new THREE.Mesh(ringGeom, ringMat);
  acWarningRing.position.set(0.48, 0.05, 0.14);
  acGroup.add(acWarningRing);
  disposables.push(ringGeom, ringMat);

  group.add(acGroup);

  // ==========================================
  // 6. MODERN ARCHITECTURAL ARC FLOOR LAMP
  // ==========================================
  const lampGroup = new THREE.Group();
  lampGroup.position.set(1.5, 0, 1.4);

  // Marble circular base
  const lampBaseGeom = new THREE.CylinderGeometry(0.24, 0.24, 0.06, 24);
  const lampBaseMat = new THREE.MeshStandardMaterial({
    color: 0xf1f5f9,
    roughness: 0.3,
  });
  const lampBase = new THREE.Mesh(lampBaseGeom, lampBaseMat);
  lampBase.position.y = 0.03;
  lampGroup.add(lampBase);
  disposables.push(lampBaseGeom, lampBaseMat);

  // Curved metal stem arc
  const arcCurve = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(0, 0.05, 0),
    new THREE.Vector3(0, 2.5, 0),
    new THREE.Vector3(-0.8, 2.2, -0.5)
  );
  const arcGeom = new THREE.TubeGeometry(arcCurve, 20, 0.02, 8, false);
  const arcMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.9, roughness: 0.2 });
  const arcMesh = new THREE.Mesh(arcGeom, arcMat);
  lampGroup.add(arcMesh);
  disposables.push(arcGeom, arcMat);

  // Dome shade
  const shadeGeom = new THREE.SphereGeometry(0.18, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2);
  const shadeMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.8, side: THREE.DoubleSide });
  const shade = new THREE.Mesh(shadeGeom, shadeMat);
  shade.rotation.x = Math.PI;
  shade.position.set(-0.8, 2.18, -0.5);
  lampGroup.add(shade);
  disposables.push(shadeGeom, shadeMat);

  // Warm lamp light
  const lampLight = new THREE.PointLight(0xffbe76, 2.0, 5);
  lampLight.position.set(-0.8, 2.0, -0.5);
  lampGroup.add(lampLight);

  group.add(lampGroup);

  // ==========================================
  // 7. POTTED INDOOR MONSTERA / FICUS PLANT
  // ==========================================
  const plantGroup = new THREE.Group();
  plantGroup.position.set(-1.4, 0, 1.4);

  // Ceramic white cylinder pot
  const potGeom = new THREE.CylinderGeometry(0.22, 0.18, 0.45, 20);
  const potMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.3 });
  const pot = new THREE.Mesh(potGeom, potMat);
  pot.position.y = 0.225;
  pot.castShadow = !isSoftwareGl;
  plantGroup.add(pot);
  disposables.push(potGeom, potMat);

  // Soil
  const soilGeom = new THREE.CylinderGeometry(0.2, 0.2, 0.05, 16);
  const soilMat = new THREE.MeshStandardMaterial({ color: 0x271c19, roughness: 0.95 });
  const soil = new THREE.Mesh(soilGeom, soilMat);
  soil.position.y = 0.42;
  plantGroup.add(soil);
  disposables.push(soilGeom, soilMat);

  // Broad Tropical Leaves
  const leafGeom = new THREE.ConeGeometry(0.18, 0.55, 6);
  const leafMat = new THREE.MeshStandardMaterial({
    color: 0x166534, // Deep lush foliage green
    roughness: 0.35,
    metalness: 0.1,
  });
  disposables.push(leafGeom, leafMat);

  const leafAngles = [0, 1.2, 2.4, 3.6, 4.8];
  leafAngles.forEach((ang, i) => {
    const leaf = new THREE.Mesh(leafGeom, leafMat);
    leaf.position.set(Math.cos(ang) * 0.12, 0.65 + i * 0.06, Math.sin(ang) * 0.12);
    leaf.rotation.z = Math.cos(ang) * 0.45;
    leaf.rotation.x = Math.sin(ang) * 0.45;
    plantGroup.add(leaf);
  });

  group.add(plantGroup);

  // ==========================================
  // UPDATE LOOP (DAMPING & ANOMALY TRIGGERS)
  // ==========================================
  const update = (p: number, delta: number) => {
    // Living Room Anomaly triggers during Scene 5 (progress 0.18 - 0.24)
    const isLivingRoomAnomaly = p >= 0.17 && p <= 0.24;

    if (isLivingRoomAnomaly) {
      // Red warning status LED
      ledMat.color.setHex(0xef4444);

      // Pulsing warning ring expanding out from the AC unit
      const pulseTime = Date.now() * 0.006;
      const ringScale = 1.0 + (Math.sin(pulseTime) * 0.5 + 0.5) * 1.5;
      acWarningRing.scale.set(ringScale, ringScale, ringScale);
      ringMat.opacity = Math.max(0, 0.8 - (ringScale - 1.0) * 0.6);
      acWarningRing.visible = true;
    } else if (p > 0.78) {
      // Resolved / Emerald green
      ledMat.color.setHex(0x00c853);
      acWarningRing.visible = false;
    } else {
      ledMat.color.setHex(0x00c853);
      acWarningRing.visible = false;
    }
  };

  // ==========================================
  // DISPOSE FOR CLEANUP
  // ==========================================
  const dispose = () => {
    disposables.forEach((d) => d.dispose());
  };

  return {
    group,
    acStatusLed,
    acWarningRing,
    update,
    dispose,
  };
}
