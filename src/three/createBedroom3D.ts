import * as THREE from 'three';

export interface BedroomRefs {
  group: THREE.Group;
  acLed: THREE.Mesh;
  tempDisplay: THREE.Mesh;
  heatPulseLight: THREE.PointLight;
  update: (progress: number, delta: number) => void;
  dispose: () => void;
}

/**
 * Procedural 3D Luxury Modern Master Bedroom Suite
 * Modeled precisely to the reference interior image:
 * - Low-profile platform king bed in beige linen with channel-tufted headboard
 * - Charcoal waffle-knit throw blanket and terracotta accent pillow
 * - Symmetrical vertical fluted oak wood slat accent panels behind floating nightstands
 * - Two suspended brass & frosted glass sphere pendant lights with warm amber illumination
 * - Centered framed minimalist modern abstract art piece
 * - Perimeter warm ceiling cove LED strip
 * - Wall-mounted slim AC split unit with temperature rising indicator & flicker (Scene 8)
 * - Woven wool bedroom rug & curved boucle ottoman
 */
export function createBedroom3D(isSoftwareGl: boolean): BedroomRefs {
  const group = new THREE.Group();
  group.name = 'Luxury_Master_Bedroom_Suite';

  // Second floor left wing of the villa model (aligned with second-floor slab Y: 3.89, back wall Z: -2.40)
  group.position.set(-2.9, 3.89, -1.2);

  const disposables: (THREE.BufferGeometry | THREE.Material)[] = [];

  // ==========================================
  // SHARED LUXURY MATERIALS
  // ==========================================
  const linenBedMat = new THREE.MeshStandardMaterial({
    color: 0xe5e1d8,
    roughness: 0.85,
    metalness: 0.05,
  });
  const darkThrowMat = new THREE.MeshStandardMaterial({
    color: 0x2d3748,
    roughness: 0.9,
    metalness: 0.02,
  });
  const terracottaMat = new THREE.MeshStandardMaterial({
    color: 0xb45309,
    roughness: 0.8,
    metalness: 0.05,
  });
  const oakWoodMat = new THREE.MeshStandardMaterial({
    color: 0x9a6a42,
    roughness: 0.6,
    metalness: 0.05,
  });
  const darkWalnutMat = new THREE.MeshStandardMaterial({
    color: 0x1f242d,
    roughness: 0.4,
    metalness: 0.2,
  });
  const brassMat = new THREE.MeshStandardMaterial({
    color: 0xd4af37,
    roughness: 0.25,
    metalness: 0.88,
  });
  const frostedGlassMat = new THREE.MeshBasicMaterial({
    color: 0xfff0db,
  });
  const rugMat = new THREE.MeshStandardMaterial({
    color: 0xcdc8be,
    roughness: 0.95,
    metalness: 0.02,
  });
  // Warm Luxury Alabaster Architectural Finish
  const wallTileMat = new THREE.MeshStandardMaterial({
    color: 0xede8df,
    roughness: 0.85,
    metalness: 0.04,
  });

  disposables.push(
    linenBedMat,
    darkThrowMat,
    terracottaMat,
    oakWoodMat,
    darkWalnutMat,
    brassMat,
    frostedGlassMat,
    rugMat,
    wallTileMat
  );

  // ==========================================
  // 1. BEDROOM WOVEN AREA RUG
  // ==========================================
  const rugGeom = new THREE.BoxGeometry(3.2, 0.02, 3.4);
  const rug = new THREE.Mesh(rugGeom, rugMat);
  rug.position.set(0, 0.01, 0.2);
  rug.receiveShadow = !isSoftwareGl;
  group.add(rug);
  disposables.push(rugGeom);

  // ==========================================
  // 2. DESIGNER PLATFORM BED & BEDDING
  // ==========================================
  const bedGroup = new THREE.Group();
  bedGroup.name = 'Platform_Bed';
  bedGroup.position.set(0, 0, 0.1);

  // Platform frame base
  const platformGeom = new THREE.BoxGeometry(2.1, 0.26, 2.3);
  const platform = new THREE.Mesh(platformGeom, linenBedMat);
  platform.position.set(0, 0.13, 0);
  platform.castShadow = !isSoftwareGl;
  bedGroup.add(platform);
  disposables.push(platformGeom);

  // Plush Mattress
  const mattressGeom = new THREE.BoxGeometry(1.9, 0.32, 2.1);
  const mattress = new THREE.Mesh(mattressGeom, linenBedMat);
  mattress.position.set(0, 0.38, 0.05);
  bedGroup.add(mattress);
  disposables.push(mattressGeom);

  // Channel-Tufted Headboard
  const headboardGeom = new THREE.BoxGeometry(2.3, 1.1, 0.18);
  const headboard = new THREE.Mesh(headboardGeom, linenBedMat);
  headboard.position.set(0, 0.75, -1.05);
  headboard.castShadow = !isSoftwareGl;
  bedGroup.add(headboard);
  disposables.push(headboardGeom);

  // Sleeping Pillows (4 pillows)
  const pillowGeom = new THREE.BoxGeometry(0.55, 0.16, 0.38);
  disposables.push(pillowGeom);
  [-0.45, 0.45].forEach((px) => {
    // Back pillow
    const p1 = new THREE.Mesh(pillowGeom, linenBedMat);
    p1.position.set(px, 0.58, -0.72);
    p1.rotation.x = 0.2;
    bedGroup.add(p1);

    // Front pillow
    const p2 = new THREE.Mesh(pillowGeom, linenBedMat);
    p2.position.set(px, 0.56, -0.48);
    p2.rotation.x = 0.1;
    bedGroup.add(p2);
  });

  // Terracotta accent pillow centered
  const accentPillowGeom = new THREE.BoxGeometry(0.38, 0.24, 0.18);
  const accentPillow = new THREE.Mesh(accentPillowGeom, terracottaMat);
  accentPillow.position.set(0, 0.62, -0.42);
  bedGroup.add(accentPillow);
  disposables.push(accentPillowGeom);

  // Charcoal Waffle Throw Blanket across foot of bed
  const throwGeom = new THREE.BoxGeometry(1.94, 0.05, 0.85);
  const throwBlanket = new THREE.Mesh(throwGeom, darkThrowMat);
  throwBlanket.position.set(0, 0.55, 0.62);
  bedGroup.add(throwBlanket);
  disposables.push(throwGeom);

  group.add(bedGroup);

  // ==========================================
  // 3. FEATURE HEADBOARD WALL & FLUTED PANELS
  // ==========================================
  const wallGroup = new THREE.Group();
  wallGroup.position.set(0, 0, -1.18);

  // Main backdrop panel
  const wallGeom = new THREE.PlaneGeometry(3.6, 2.7);
  const wallMesh = new THREE.Mesh(wallGeom, wallTileMat);
  wallMesh.position.set(0, 1.35, 0);
  wallGroup.add(wallMesh);
  disposables.push(wallGeom);

  // Fluted oak wood slat sections on Left and Right of headboard
  const slatGeom = new THREE.BoxGeometry(0.04, 2.5, 0.04);
  disposables.push(slatGeom);

  // Left fluted panel
  for (let i = 0; i < 8; i++) {
    const slat = new THREE.Mesh(slatGeom, oakWoodMat);
    slat.position.set(-1.6 + i * 0.055, 1.25, 0.02);
    wallGroup.add(slat);
  }

  // Right fluted panel
  for (let i = 0; i < 8; i++) {
    const slat = new THREE.Mesh(slatGeom, oakWoodMat);
    slat.position.set(1.2 + i * 0.055, 1.25, 0.02);
    wallGroup.add(slat);
  }

  // Floating Dark Walnut Nightstands (Left and Right)
  const nightstandGeom = new THREE.BoxGeometry(0.55, 0.22, 0.42);
  disposables.push(nightstandGeom);

  const nightstandL = new THREE.Mesh(nightstandGeom, darkWalnutMat);
  nightstandL.position.set(-1.4, 0.45, 0.24);
  wallGroup.add(nightstandL);

  const nightstandR = new THREE.Mesh(nightstandGeom, darkWalnutMat);
  nightstandR.position.set(1.4, 0.45, 0.24);
  wallGroup.add(nightstandR);

  // Large Framed Modern Abstract Art above headboard
  const artFrameGeom = new THREE.BoxGeometry(1.15, 0.88, 0.03);
  const artFrameMat = new THREE.MeshStandardMaterial({ color: 0x1a202c, roughness: 0.3 });
  const artFrame = new THREE.Mesh(artFrameGeom, artFrameMat);
  artFrame.position.set(0, 1.9, 0.02);
  wallGroup.add(artFrame);
  disposables.push(artFrameGeom, artFrameMat);

  const artCanvasGeom = new THREE.PlaneGeometry(1.08, 0.82);
  const artCanvasMat = new THREE.MeshStandardMaterial({ color: 0xfafafa, roughness: 0.7 });
  const artCanvas = new THREE.Mesh(artCanvasGeom, artCanvasMat);
  artCanvas.position.set(0, 1.9, 0.04);
  wallGroup.add(artCanvas);
  disposables.push(artCanvasGeom, artCanvasMat);

  // ==========================================
  // 3B. ARCHITECTURAL ELECTRICAL WIRING & CONDUITS
  // ==========================================
  const wiringMat = new THREE.MeshStandardMaterial({
    color: 0xf59e0b, // Amber Gold Conduit
    emissive: 0xd97706,
    emissiveIntensity: 0.75,
    metalness: 0.92,
    roughness: 0.2,
  });
  const jBoxMat = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    metalness: 0.85,
    roughness: 0.35,
  });
  const statusLedMat = new THREE.MeshBasicMaterial({ color: 0x00d9ff });
  disposables.push(wiringMat, jBoxMat, statusLedMat);

  // Ceiling horizontal distribution conduit track
  const ceilingTrackGeom = new THREE.CylinderGeometry(0.014, 0.014, 3.2, 12);
  ceilingTrackGeom.rotateZ(Math.PI / 2);
  const ceilingTrack = new THREE.Mesh(ceilingTrackGeom, wiringMat);
  ceilingTrack.position.set(0, 2.52, 0.05);
  wallGroup.add(ceilingTrack);
  disposables.push(ceilingTrackGeom);

  // Central ceiling junction box with glowing indicator
  const centerJBoxGeom = new THREE.BoxGeometry(0.12, 0.12, 0.08);
  const centerJBox = new THREE.Mesh(centerJBoxGeom, jBoxMat);
  centerJBox.position.set(0, 2.52, 0.07);
  wallGroup.add(centerJBox);
  disposables.push(centerJBoxGeom);

  const centerLedGeom = new THREE.SphereGeometry(0.018, 8, 8);
  const centerLed = new THREE.Mesh(centerLedGeom, statusLedMat);
  centerLed.position.set(0, 2.52, 0.12);
  wallGroup.add(centerLed);
  disposables.push(centerLedGeom);

  // Vertical conduit drops running down the fluted oak slats to bedside nightstands
  const verticalConduitGeom = new THREE.CylinderGeometry(0.012, 0.012, 1.95, 10);
  disposables.push(verticalConduitGeom);

  [-1.4, 1.4].forEach((xPos) => {
    // Ceiling junction box above pendant drop
    const jBox = new THREE.Mesh(centerJBoxGeom, jBoxMat);
    jBox.position.set(xPos, 2.52, 0.07);
    wallGroup.add(jBox);

    // Vertical conduit pipe down wall to nightstand
    const vPipe = new THREE.Mesh(verticalConduitGeom, wiringMat);
    vPipe.position.set(xPos, 1.54, 0.05);
    wallGroup.add(vPipe);

    // Bedside smart outlet box with glowing USB/power indicator
    const outletBoxGeom = new THREE.BoxGeometry(0.14, 0.1, 0.04);
    const outletBox = new THREE.Mesh(outletBoxGeom, jBoxMat);
    outletBox.position.set(xPos, 0.62, 0.06);
    wallGroup.add(outletBox);
    disposables.push(outletBoxGeom);

    const outletLedGeom = new THREE.SphereGeometry(0.012, 8, 8);
    const outletLed = new THREE.Mesh(outletLedGeom, statusLedMat);
    outletLed.position.set(xPos + 0.03, 0.62, 0.085);
    wallGroup.add(outletLed);
    disposables.push(outletLedGeom);
  });

  // Horizontal feeder conduit to AC unit on side wall
  const acFeedGeom = new THREE.CylinderGeometry(0.012, 0.012, 0.9, 8);
  acFeedGeom.rotateZ(Math.PI / 2);
  const acFeed = new THREE.Mesh(acFeedGeom, wiringMat);
  acFeed.position.set(-1.85, 2.45, 0.05);
  wallGroup.add(acFeed);
  disposables.push(acFeedGeom);

  group.add(wallGroup);

  // ==========================================
  // 4. SUSPENDED GLOBE PENDANT LIGHTS
  // ==========================================
  const pendantL = new THREE.Group();
  pendantL.position.set(-1.4, 1.2, -0.85);

  const pendantR = new THREE.Group();
  pendantR.position.set(1.4, 1.2, -0.85);

  const globeGeom = new THREE.SphereGeometry(0.1, 16, 16);
  const brassRodGeom = new THREE.CylinderGeometry(0.006, 0.006, 1.2, 8);
  disposables.push(globeGeom, brassRodGeom);

  [pendantL, pendantR].forEach((pend) => {
    // Brass cord
    const rod = new THREE.Mesh(brassRodGeom, brassMat);
    rod.position.y = 0.6;
    pend.add(rod);

    // Glowing globe
    const globe = new THREE.Mesh(globeGeom, frostedGlassMat);
    pend.add(globe);

    // Warm amber PointLight
    const light = new THREE.PointLight(0xffb74d, 1.8, 3.8);
    pend.add(light);

    group.add(pend);
  });

  // Ceiling perimeter cove light
  const coveLight = new THREE.PointLight(0xffa726, 1.6, 5.0);
  coveLight.position.set(0, 2.45, -0.5);
  group.add(coveLight);

  // ==========================================
  // 5. BOUCLE OTTOMAN / STOOL
  // ==========================================
  const stoolGeom = new THREE.CylinderGeometry(0.24, 0.24, 0.36, 20);
  const stoolMat = new THREE.MeshStandardMaterial({ color: 0xd8d3ca, roughness: 0.9 });
  const ottoman = new THREE.Mesh(stoolGeom, stoolMat);
  ottoman.position.set(1.35, 0.18, 0.95);
  group.add(ottoman);
  disposables.push(stoolGeom, stoolMat);

  // ==========================================
  // 6. WALL-MOUNTED AC UNIT (Scene 8 Anomaly)
  // ==========================================
  const acGroup = new THREE.Group();
  acGroup.position.set(-1.55, 2.15, -0.3); // Mounted on side wall
  acGroup.rotation.y = Math.PI / 2;

  // AC Housing
  const acChassisGeom = new THREE.BoxGeometry(0.92, 0.28, 0.18);
  const acChassisMat = new THREE.MeshStandardMaterial({
    color: 0xf1f5f9,
    roughness: 0.25,
    metalness: 0.1,
  });
  const acChassis = new THREE.Mesh(acChassisGeom, acChassisMat);
  acGroup.add(acChassis);
  disposables.push(acChassisGeom, acChassisMat);

  // Digital LED Status Indicator
  const ledGeom = new THREE.SphereGeometry(0.02, 8, 8);
  const ledMat = new THREE.MeshBasicMaterial({ color: 0x00c853 });
  const acLed = new THREE.Mesh(ledGeom, ledMat);
  acLed.position.set(0.38, -0.06, 0.1);
  acGroup.add(acLed);
  disposables.push(ledGeom, ledMat);

  // Digital Temperature readout (82°F warning)
  const tempGeom = new THREE.PlaneGeometry(0.12, 0.05);
  const tempMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
  const tempDisplay = new THREE.Mesh(tempGeom, tempMat);
  tempDisplay.position.set(0.24, -0.06, 0.1);
  acGroup.add(tempDisplay);
  disposables.push(tempGeom, tempMat);

  // Thermal anomaly pulse light during Scene 8
  const heatPulseLight = new THREE.PointLight(0xef4444, 0, 3.2);
  heatPulseLight.position.set(0, 0, 0.3);
  acGroup.add(heatPulseLight);

  group.add(acGroup);

  // ==========================================
  // UPDATE & CLEANUP HOOKS
  // ==========================================
  let animTime = 0;

  function update(progress: number, delta: number) {
    animTime += delta * 4;

    // Active during Scene 8 (Bedroom: Fan flickers, room temperature rises. progress ~ 0.34 - 0.40)
    const isBedroomScene = progress >= 0.34 && progress <= 0.40;

    if (isBedroomScene) {
      // Fan/AC warning state
      (acLed.material as THREE.MeshBasicMaterial).color.setHex(0xef4444);
      tempDisplay.visible = Math.sin(animTime * 6) > -0.2; // Blinking temperature alarm
      heatPulseLight.intensity = 1.6 + Math.sin(animTime * 4) * 0.8;
    } else {
      (acLed.material as THREE.MeshBasicMaterial).color.setHex(0x00c853);
      tempDisplay.visible = false;
      heatPulseLight.intensity = 0;
    }
  }

  function dispose() {
    disposables.forEach((item) => {
      item.dispose();
    });
  }

  return {
    group,
    acLed,
    tempDisplay,
    heatPulseLight,
    update,
    dispose,
  };
}
