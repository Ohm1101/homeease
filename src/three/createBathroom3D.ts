import * as THREE from 'three';

export interface BathroomRefs {
  group: THREE.Group;
  showerDrips: THREE.Points;
  mirrorGlow: THREE.PointLight;
  pressureWarningRing: THREE.Mesh;
  update: (progress: number, delta: number) => void;
  dispose: () => void;
}

/**
 * Procedural 3D Luxury Modern Bathroom Suite
 * Modeled precisely to the reference interior image:
 * - Large backlit floating mirror with warm ambient LED halo
 * - Floating dark charcoal dual vanity with Calacatta marble top & rectangular vessel sink
 * - Matte black wall-mounted faucet & luxury toiletries
 * - Lower open wood shelf with rolled white spa towels
 * - Frameless walk-in glass shower enclosure with matte black trim & ceiling rain showerhead
 * - Recessed illuminated shampoo niche in shower wall
 * - Modern wall-hung rimless toilet with dual flush plate
 * - Textured limestone wall tiles & animated shower pressure diagnostic visualization (Scene 7)
 */
export function createBathroom3D(isSoftwareGl: boolean): BathroomRefs {
  const group = new THREE.Group();
  group.name = 'Luxury_Bathroom_Suite';

  // Second floor right wing of the villa model (aligned with second-floor slab Y: 3.89, back wall Z: -2.40)
  group.position.set(2.4, 3.89, -1.2);

  const disposables: (THREE.BufferGeometry | THREE.Material)[] = [];

  // ==========================================
  // SHARED LUXURY MATERIALS
  // ==========================================
  // Warm Italian Travertine / Luxury Alabaster Tile (rich warm sand-ivory)
  const stoneTileMat = new THREE.MeshStandardMaterial({
    color: 0xede8df,
    roughness: 0.85,
    metalness: 0.04,
  });
  const marbleMat = new THREE.MeshStandardMaterial({
    color: 0xf3f4f6,
    roughness: 0.2,
    metalness: 0.08,
  });
  const darkVanityMat = new THREE.MeshStandardMaterial({
    color: 0x181e28,
    roughness: 0.35,
    metalness: 0.2,
  });
  const warmWoodMat = new THREE.MeshStandardMaterial({
    color: 0x9a6a42,
    roughness: 0.6,
    metalness: 0.05,
  });
  const blackMetalMat = new THREE.MeshStandardMaterial({
    color: 0x111418,
    roughness: 0.3,
    metalness: 0.85,
  });
  const porcelainMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.15,
    metalness: 0.05,
  });
  const towelWhiteMat = new THREE.MeshStandardMaterial({
    color: 0xf8fafc,
    roughness: 0.9,
    metalness: 0.02,
  });
  const mirrorGlassMat = new THREE.MeshStandardMaterial({
    color: 0x242e3a,
    roughness: 0.05,
    metalness: 0.95,
  });

  disposables.push(
    stoneTileMat,
    marbleMat,
    darkVanityMat,
    warmWoodMat,
    blackMetalMat,
    porcelainMat,
    towelWhiteMat,
    mirrorGlassMat
  );

  // ==========================================
  // 1. BACK TILE FEATURE WALL
  // ==========================================
  const wallGeom = new THREE.PlaneGeometry(3.6, 2.7);
  const wallMesh = new THREE.Mesh(wallGeom, stoneTileMat);
  wallMesh.position.set(0, 1.35, -1.15);
  group.add(wallMesh);
  disposables.push(wallGeom);

  // Floor stone tile
  const floorGeom = new THREE.PlaneGeometry(3.6, 2.5);
  floorGeom.rotateX(-Math.PI / 2);
  const floorMesh = new THREE.Mesh(floorGeom, stoneTileMat);
  floorMesh.position.set(0, 0.01, 0.1);
  group.add(floorMesh);
  disposables.push(floorGeom);

  // ==========================================
  // 2. FLOATING VANITY & VESSEL SINK
  // ==========================================
  const vanityGroup = new THREE.Group();
  vanityGroup.name = 'Bathroom_Vanity';
  vanityGroup.position.set(-0.55, 0, -0.65);

  // Floating dark drawer cabinet
  const cabinetGeom = new THREE.BoxGeometry(1.5, 0.38, 0.58);
  const cabinet = new THREE.Mesh(cabinetGeom, darkVanityMat);
  cabinet.position.set(0, 0.58, 0);
  cabinet.castShadow = !isSoftwareGl;
  vanityGroup.add(cabinet);
  disposables.push(cabinetGeom);

  // Open warm wood lower shelf
  const shelfGeom = new THREE.BoxGeometry(1.46, 0.04, 0.54);
  const shelf = new THREE.Mesh(shelfGeom, warmWoodMat);
  shelf.position.set(0, 0.28, 0);
  vanityGroup.add(shelf);
  disposables.push(shelfGeom);

  // Rolled white spa towels on shelf
  const towelGeom = new THREE.CylinderGeometry(0.065, 0.065, 0.28, 12);
  towelGeom.rotateZ(Math.PI / 2);
  disposables.push(towelGeom);
  for (let i = 0; i < 3; i++) {
    const towel = new THREE.Mesh(towelGeom, towelWhiteMat);
    towel.position.set(-0.35 + i * 0.32, 0.36, 0);
    vanityGroup.add(towel);
  }

  // Marble Countertop
  const counterGeom = new THREE.BoxGeometry(1.56, 0.06, 0.62);
  const counter = new THREE.Mesh(counterGeom, marbleMat);
  counter.position.set(0, 0.8, 0);
  vanityGroup.add(counter);
  disposables.push(counterGeom);

  // Luxury Sculpted Italian Oval Stone Vessel Wash Basin
  const basinGroup = new THREE.Group();
  basinGroup.name = 'Designer_Wash_Basin';
  basinGroup.position.set(0.1, 0.83, 0);

  // Basin Outer Sculpted Body (Cylinder with gentle bevel)
  const basinOuterGeom = new THREE.CylinderGeometry(0.32, 0.28, 0.16, 24);
  const basinOuter = new THREE.Mesh(basinOuterGeom, porcelainMat);
  basinOuter.position.y = 0.08;
  basinOuter.scale.set(1.2, 1.0, 0.85); // Organic oval form
  basinOuter.castShadow = !isSoftwareGl;
  basinGroup.add(basinOuter);
  disposables.push(basinOuterGeom);

  // Basin Inner Bowl (Hollow basin cavity)
  const basinInnerGeom = new THREE.CylinderGeometry(0.28, 0.24, 0.14, 20);
  const basinInnerMat = new THREE.MeshStandardMaterial({
    color: 0xf8fafc,
    roughness: 0.1,
    metalness: 0.15,
  });
  const basinInner = new THREE.Mesh(basinInnerGeom, basinInnerMat);
  basinInner.position.y = 0.095;
  basinInner.scale.set(1.16, 1.0, 0.82);
  basinGroup.add(basinInner);
  disposables.push(basinInnerGeom, basinInnerMat);

  // Chrome Pop-Up Drain Plug
  const drainGeom = new THREE.CylinderGeometry(0.045, 0.045, 0.015, 16);
  const drainMat = new THREE.MeshStandardMaterial({
    color: 0x0f172a,
    metalness: 0.95,
    roughness: 0.1,
  });
  const drain = new THREE.Mesh(drainGeom, drainMat);
  drain.position.y = 0.03;
  basinGroup.add(drain);
  disposables.push(drainGeom, drainMat);

  // Water Pool surface plane inside wash basin
  const waterGeom = new THREE.CircleGeometry(0.22, 16);
  waterGeom.rotateX(-Math.PI / 2);
  const waterMat = new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    transparent: true,
    opacity: 0.65,
  });
  const waterMesh = new THREE.Mesh(waterGeom, waterMat);
  waterMesh.position.y = 0.045;
  waterMesh.scale.set(1.1, 1.0, 0.78);
  basinGroup.add(waterMesh);
  disposables.push(waterGeom, waterMat);

  // Under-basin ambient LED illumination strip
  const basinGlowLight = new THREE.PointLight(0x00d9ff, 0.8, 1.5);
  basinGlowLight.position.set(0.1, 0.82, 0.15);
  vanityGroup.add(basinGlowLight);

  vanityGroup.add(basinGroup);

  // Matte Black Wall-Mounted Spout & Handles
  const faucetGroup = new THREE.Group();
  faucetGroup.position.set(0.1, 1.15, -0.28);

  const spoutGeom = new THREE.CylinderGeometry(0.015, 0.015, 0.26, 12);
  spoutGeom.rotateX(Math.PI / 2);
  const spout = new THREE.Mesh(spoutGeom, blackMetalMat);
  faucetGroup.add(spout);
  disposables.push(spoutGeom);

  // Aerator nozzle tip pointing downward into wash basin
  const nozzleGeom = new THREE.CylinderGeometry(0.012, 0.012, 0.04, 10);
  const nozzle = new THREE.Mesh(nozzleGeom, blackMetalMat);
  nozzle.position.set(0, -0.02, 0.12);
  faucetGroup.add(nozzle);
  disposables.push(nozzleGeom);

  // Twin knurled control handles
  const handleGeom = new THREE.CylinderGeometry(0.022, 0.022, 0.04, 12);
  handleGeom.rotateX(Math.PI / 2);
  disposables.push(handleGeom);

  const handleL = new THREE.Mesh(handleGeom, blackMetalMat);
  handleL.position.set(-0.16, 0, 0.02);
  faucetGroup.add(handleL);

  const handleR = new THREE.Mesh(handleGeom, blackMetalMat);
  handleR.position.set(0.16, 0, 0.02);
  faucetGroup.add(handleR);

  vanityGroup.add(faucetGroup);

  // Luxury toiletries on counter (ceramic vase & amber dispenser)
  const soapGeom = new THREE.CylinderGeometry(0.035, 0.035, 0.14, 10);
  const soapMat = new THREE.MeshStandardMaterial({ color: 0x8b5a2b, roughness: 0.2, metalness: 0.1 });
  const soapDispenser = new THREE.Mesh(soapGeom, soapMat);
  soapDispenser.position.set(-0.45, 0.9, 0.1);
  vanityGroup.add(soapDispenser);
  disposables.push(soapGeom, soapMat);

  const vaseGeom = new THREE.CylinderGeometry(0.05, 0.07, 0.18, 12);
  const vaseMat = new THREE.MeshStandardMaterial({ color: 0x262626, roughness: 0.4 });
  const vase = new THREE.Mesh(vaseGeom, vaseMat);
  vase.position.set(-0.58, 0.92, -0.1);
  vanityGroup.add(vase);
  disposables.push(vaseGeom, vaseMat);

  group.add(vanityGroup);

  // ==========================================
  // 3. LARGE BACKLIT FLOATING MIRROR
  // ==========================================
  const mirrorGroup = new THREE.Group();
  mirrorGroup.position.set(-0.55, 1.82, -1.1);

  // Mirror Glass pane
  const mirrorGeom = new THREE.BoxGeometry(1.4, 0.95, 0.02);
  const mirror = new THREE.Mesh(mirrorGeom, mirrorGlassMat);
  mirrorGroup.add(mirror);
  disposables.push(mirrorGeom);

  // Perimeter LED Halo backlight frame
  const haloGeom = new THREE.BoxGeometry(1.46, 1.01, 0.015);
  const haloMat = new THREE.MeshBasicMaterial({ color: 0xffb366 });
  const halo = new THREE.Mesh(haloGeom, haloMat);
  halo.position.z = -0.01;
  mirrorGroup.add(halo);
  disposables.push(haloGeom, haloMat);

  // Warm PointLight emanating from mirror halo
  const mirrorGlow = new THREE.PointLight(0xffa855, 2.2, 4.5);
  mirrorGlow.position.set(0, 0, 0.15);
  mirrorGroup.add(mirrorGlow);

  group.add(mirrorGroup);

  // ==========================================
  // 4. FRAMELESS WALK-IN GLASS SHOWER
  // ==========================================
  const showerGroup = new THREE.Group();
  showerGroup.name = 'Walk_In_Shower';
  showerGroup.position.set(1.05, 0, -0.4);

  // Glass shower screen partition (Ultra-clear frameless architectural glass)
  const glassScreenGeom = new THREE.BoxGeometry(0.02, 2.3, 1.4);
  const glassScreenMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: isSoftwareGl ? 0.05 : 0.08,
    roughness: 0.0,
    metalness: 0.05,
    transmission: isSoftwareGl ? 0 : 0.98,
    ior: 1.5,
    depthWrite: false,
  });
  const glassScreen = new THREE.Mesh(glassScreenGeom, glassScreenMat);
  glassScreen.position.set(-0.35, 1.15, 0);
  showerGroup.add(glassScreen);
  disposables.push(glassScreenGeom, glassScreenMat);

  // Matte Black Minimalist Glass Frame Edge
  const frameGeom = new THREE.BoxGeometry(0.04, 2.3, 0.03);
  const frameBar = new THREE.Mesh(frameGeom, blackMetalMat);
  frameBar.position.set(-0.35, 1.15, 0.7);
  showerGroup.add(frameBar);
  disposables.push(frameGeom);

  // Ceiling Rain Showerhead
  const showerHeadGeom = new THREE.BoxGeometry(0.24, 0.02, 0.24);
  const showerHead = new THREE.Mesh(showerHeadGeom, blackMetalMat);
  showerHead.position.set(0.15, 2.25, 0);
  showerGroup.add(showerHead);
  disposables.push(showerHeadGeom);

  const showerPipeGeom = new THREE.CylinderGeometry(0.012, 0.012, 0.25, 8);
  const showerPipe = new THREE.Mesh(showerPipeGeom, blackMetalMat);
  showerPipe.position.set(0.15, 2.38, 0);
  showerGroup.add(showerPipe);
  disposables.push(showerPipeGeom);

  // Recessed Shampoo Niche in wall
  const nicheGeom = new THREE.BoxGeometry(0.35, 0.25, 0.08);
  const nicheMat = new THREE.MeshStandardMaterial({ color: 0x222834, roughness: 0.4 });
  const niche = new THREE.Mesh(nicheGeom, nicheMat);
  niche.position.set(0.15, 1.35, -0.7);
  showerGroup.add(niche);
  disposables.push(nicheGeom, nicheMat);

  // Niche LED under-shelf glow
  const nicheLight = new THREE.PointLight(0xffaa44, 0.9, 1.8);
  nicheLight.position.set(0.15, 1.45, -0.65);
  showerGroup.add(nicheLight);

  group.add(showerGroup);

  // ==========================================
  // 5. WALL-HUNG RIMLESS TOILET
  // ==========================================
  const toiletGroup = new THREE.Group();
  toiletGroup.name = 'Wall_Hung_Toilet';
  toiletGroup.position.set(1.4, 0, 0.65);

  // Floating toilet bowl
  const bowlGeom = new THREE.BoxGeometry(0.38, 0.34, 0.52);
  const toiletBowl = new THREE.Mesh(bowlGeom, porcelainMat);
  toiletBowl.position.set(0, 0.42, 0);
  toiletGroup.add(toiletBowl);
  disposables.push(bowlGeom);

  // Matte black dual flush plate on wall
  const flushGeom = new THREE.BoxGeometry(0.02, 0.16, 0.24);
  const flushPlate = new THREE.Mesh(flushGeom, blackMetalMat);
  flushPlate.position.set(0.2, 0.95, 0);
  toiletGroup.add(flushPlate);
  disposables.push(flushGeom);

  group.add(toiletGroup);

  // ==========================================
  // 6. ANIMATED SHOWER PRESSURE & REPAIR VISUALIZATION (Scene 7)
  // ==========================================
  const dripCount = 45;
  const dripPositions = new Float32Array(dripCount * 3);
  for (let i = 0; i < dripCount; i++) {
    dripPositions[i * 3] = (Math.random() - 0.5) * 0.18 + 0.15;
    dripPositions[i * 3 + 1] = 0.5 + Math.random() * 1.6;
    dripPositions[i * 3 + 2] = (Math.random() - 0.5) * 0.18;
  }
  const dripGeom = new THREE.BufferGeometry();
  dripGeom.setAttribute('position', new THREE.BufferAttribute(dripPositions, 3));
  const dripMat = new THREE.PointsMaterial({
    color: 0x00d9ff,
    size: 0.04,
    transparent: true,
    opacity: 0.8,
  });
  const showerDrips = new THREE.Points(dripGeom, dripMat);
  showerDrips.visible = false;
  showerGroup.add(showerDrips);
  disposables.push(dripGeom, dripMat);

  // Pressure anomaly pulsing ring
  const pressureRingGeom = new THREE.RingGeometry(0.12, 0.19, 24);
  pressureRingGeom.rotateX(-Math.PI / 2);
  const pressureRingMat = new THREE.MeshBasicMaterial({
    color: 0x00d9ff,
    transparent: true,
    opacity: 0.8,
    side: THREE.DoubleSide,
  });
  const pressureWarningRing = new THREE.Mesh(pressureRingGeom, pressureRingMat);
  pressureWarningRing.position.set(0.15, 2.22, 0);
  pressureWarningRing.visible = false;
  showerGroup.add(pressureWarningRing);
  disposables.push(pressureRingGeom, pressureRingMat);

  // ==========================================
  // UPDATE & CLEANUP HOOKS
  // ==========================================
  let animTime = 0;

  function update(progress: number, delta: number) {
    animTime += delta * 4;

    // Active during Scene 7 (Bathroom: Repairs, Installations, Maintenance. progress ~ 0.28 - 0.34)
    const isBathroomScene = progress >= 0.28 && progress <= 0.34;

    if (isBathroomScene) {
      showerDrips.visible = true;
      pressureWarningRing.visible = true;

      // Animate falling rain droplets
      const pos = dripGeom.attributes.position.array as Float32Array;
      for (let i = 0; i < dripCount; i++) {
        pos[i * 3 + 1] -= delta * 2.8;
        if (pos[i * 3 + 1] < 0.1) {
          pos[i * 3 + 1] = 2.2;
        }
      }
      dripGeom.attributes.position.needsUpdate = true;

      // Pulse pressure ring
      const ringScale = 1.0 + Math.sin(animTime * 4) * 0.4;
      pressureWarningRing.scale.set(ringScale, ringScale, ringScale);
      (pressureWarningRing.material as THREE.MeshBasicMaterial).opacity = 0.85 - (ringScale - 1.0) * 0.5;

      mirrorGlow.intensity = 2.4 + Math.sin(animTime * 2) * 0.4;
    } else {
      showerDrips.visible = false;
      pressureWarningRing.visible = false;
      mirrorGlow.intensity = 2.0;
    }
  }

  function dispose() {
    disposables.forEach((item) => {
      item.dispose();
    });
  }

  return {
    group,
    showerDrips,
    mirrorGlow,
    pressureWarningRing,
    update,
    dispose,
  };
}
