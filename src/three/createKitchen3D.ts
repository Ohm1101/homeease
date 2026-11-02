import * as THREE from 'three';

export interface KitchenRefs {
  group: THREE.Group;
  leakDrip: THREE.Mesh;
  leakRings: THREE.Mesh;
  faucetGlow: THREE.PointLight;
  update: (progress: number, delta: number) => void;
  dispose: () => void;
}

/**
 * Procedural 3D Luxury Modern Kitchen Suite
 * Modeled precisely to the reference interior image:
 * - Large Calacatta marble waterfall island with dark base cabinetry
 * - 3 modern minimalist black counter stools with cream cushioned seats
 * - 3 suspended matte black cone pendant lamps with warm spot pools
 * - Matte black high-arc gooseneck faucet and undermount stainless sink
 * - Integrated plumbing leak diagnostic animation (Scene 6)
 * - Full-height rear cabinetry with double built-in wall ovens & French door stainless fridge
 * - Warm oak upper cabinets with LED under-cabinet task lighting
 * - Luxury countertop details: cutting board, citrus fruit bowl, olive oil bottles
 */
export function createKitchen3D(isSoftwareGl: boolean): KitchenRefs {
  const group = new THREE.Group();
  group.name = 'Luxury_Kitchen_Suite';

  // Ground floor right wing of the villa model (aligned with ground-floor slab Y: 0.35)
  group.position.set(2.9, 0.35, -0.1);

  const disposables: (THREE.BufferGeometry | THREE.Material)[] = [];

  // ==========================================
  // SHARED LUXURY MATERIALS
  // ==========================================
  const marbleMat = new THREE.MeshStandardMaterial({
    color: 0xf3f4f6,
    roughness: 0.18,
    metalness: 0.08,
  });
  const darkCabinetMat = new THREE.MeshStandardMaterial({
    color: 0x181e29,
    roughness: 0.35,
    metalness: 0.25,
  });
  const oakWoodMat = new THREE.MeshStandardMaterial({
    color: 0x9a6a42,
    roughness: 0.55,
    metalness: 0.05,
  });
  const blackMetalMat = new THREE.MeshStandardMaterial({
    color: 0x111418,
    roughness: 0.3,
    metalness: 0.85,
  });
  const stainlessMat = new THREE.MeshStandardMaterial({
    color: 0xd1d5db,
    roughness: 0.22,
    metalness: 0.88,
  });
  const creamCushionMat = new THREE.MeshStandardMaterial({
    color: 0xe5e2dc,
    roughness: 0.8,
    metalness: 0.02,
  });
  const glassBlackMat = new THREE.MeshStandardMaterial({
    color: 0x0a0c10,
    roughness: 0.1,
    metalness: 0.9,
  });

  disposables.push(
    marbleMat,
    darkCabinetMat,
    oakWoodMat,
    blackMetalMat,
    stainlessMat,
    creamCushionMat,
    glassBlackMat
  );

  // ==========================================
  // 1. WATERFALL CALACATTA MARBLE ISLAND
  // ==========================================
  const islandGroup = new THREE.Group();
  islandGroup.name = 'Kitchen_Island';
  islandGroup.position.set(0, 0, 0.4);

  // Island base cabinet (dark charcoal)
  const baseGeom = new THREE.BoxGeometry(2.5, 0.86, 0.9);
  const baseMesh = new THREE.Mesh(baseGeom, darkCabinetMat);
  baseMesh.position.set(0, 0.43, -0.05);
  baseMesh.castShadow = !isSoftwareGl;
  baseMesh.receiveShadow = !isSoftwareGl;
  islandGroup.add(baseMesh);
  disposables.push(baseGeom);

  // Marble Countertop (Slab with overhang)
  const topSlabGeom = new THREE.BoxGeometry(2.74, 0.07, 1.14);
  const topSlab = new THREE.Mesh(topSlabGeom, marbleMat);
  topSlab.position.set(0, 0.88, 0.04);
  topSlab.castShadow = !isSoftwareGl;
  topSlab.receiveShadow = !isSoftwareGl;
  islandGroup.add(topSlab);
  disposables.push(topSlabGeom);

  // Marble Waterfall Left Leg
  const leftLegGeom = new THREE.BoxGeometry(0.08, 0.88, 1.14);
  const leftLeg = new THREE.Mesh(leftLegGeom, marbleMat);
  leftLeg.position.set(-1.33, 0.44, 0.04);
  leftLeg.castShadow = !isSoftwareGl;
  leftLeg.receiveShadow = !isSoftwareGl;
  islandGroup.add(leftLeg);
  disposables.push(leftLegGeom);

  // Marble Waterfall Right Leg
  const rightLeg = new THREE.Mesh(leftLegGeom, marbleMat);
  rightLeg.position.set(1.33, 0.44, 0.04);
  rightLeg.castShadow = !isSoftwareGl;
  rightLeg.receiveShadow = !isSoftwareGl;
  islandGroup.add(rightLeg);

  // Undermount Stainless Sink cutout & basin
  const sinkBasinGeom = new THREE.BoxGeometry(0.65, 0.28, 0.42);
  const sinkBasin = new THREE.Mesh(sinkBasinGeom, stainlessMat);
  sinkBasin.position.set(0.2, 0.72, -0.08);
  islandGroup.add(sinkBasin);
  disposables.push(sinkBasinGeom);

  // High-Arc Matte Black Gooseneck Faucet
  const faucetGroup = new THREE.Group();
  faucetGroup.position.set(0.2, 0.91, -0.22);

  // Faucet base cylinder
  const fBaseGeom = new THREE.CylinderGeometry(0.025, 0.028, 0.16, 12);
  const fBase = new THREE.Mesh(fBaseGeom, blackMetalMat);
  fBase.position.y = 0.08;
  faucetGroup.add(fBase);
  disposables.push(fBaseGeom);

  // Curved gooseneck spout using Torus arc + straight vertical
  const fCurveGeom = new THREE.TorusGeometry(0.1, 0.015, 12, 16, Math.PI);
  fCurveGeom.rotateZ(Math.PI / 2);
  fCurveGeom.rotateY(-Math.PI / 2);
  const fCurve = new THREE.Mesh(fCurveGeom, blackMetalMat);
  fCurve.position.set(0, 0.25, 0.04);
  faucetGroup.add(fCurve);
  disposables.push(fCurveGeom);

  // Faucet handle lever
  const fLeverGeom = new THREE.CylinderGeometry(0.008, 0.008, 0.09, 8);
  const fLever = new THREE.Mesh(fLeverGeom, blackMetalMat);
  fLever.position.set(0.05, 0.08, 0);
  fLever.rotation.z = Math.PI / 4;
  faucetGroup.add(fLever);
  disposables.push(fLeverGeom);

  islandGroup.add(faucetGroup);

  // Decorative fruit bowl on island
  const bowlGeom = new THREE.CylinderGeometry(0.14, 0.08, 0.06, 16);
  const bowlMat = new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.3 });
  const bowl = new THREE.Mesh(bowlGeom, bowlMat);
  bowl.position.set(-0.6, 0.94, -0.05);
  islandGroup.add(bowl);
  disposables.push(bowlGeom, bowlMat);

  // Citrus fruits inside bowl
  const fruitMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.6 });
  const fruitGeom = new THREE.SphereGeometry(0.038, 8, 8);
  disposables.push(fruitMat, fruitGeom);
  for (let i = 0; i < 4; i++) {
    const fruit = new THREE.Mesh(fruitGeom, fruitMat);
    const angle = (i / 4) * Math.PI * 2;
    fruit.position.set(
      -0.6 + Math.cos(angle) * 0.05,
      0.97 + (i === 3 ? 0.03 : 0),
      -0.05 + Math.sin(angle) * 0.05
    );
    islandGroup.add(fruit);
  }

  // Wood cutting board
  const boardGeom = new THREE.BoxGeometry(0.32, 0.02, 0.44);
  const board = new THREE.Mesh(boardGeom, oakWoodMat);
  board.position.set(0.75, 0.92, -0.05);
  islandGroup.add(board);
  disposables.push(boardGeom);

  group.add(islandGroup);

  // ==========================================
  // 2. 3 COUNTER BARSTOOLS
  // ==========================================
  const stoolPositions = [-0.7, 0.0, 0.7];
  const stoolSeatGeom = new THREE.CylinderGeometry(0.18, 0.18, 0.07, 20);
  const stoolLegGeom = new THREE.CylinderGeometry(0.012, 0.012, 0.64, 8);
  const stoolRingGeom = new THREE.TorusGeometry(0.14, 0.009, 8, 20);
  stoolRingGeom.rotateX(Math.PI / 2);
  disposables.push(stoolSeatGeom, stoolLegGeom, stoolRingGeom);

  stoolPositions.forEach((posX, idx) => {
    const stool = new THREE.Group();
    stool.name = `Kitchen_Stool_${idx + 1}`;
    stool.position.set(posX, 0, 1.05);

    // Cream upholstered seat
    const seat = new THREE.Mesh(stoolSeatGeom, creamCushionMat);
    seat.position.y = 0.64;
    seat.castShadow = !isSoftwareGl;
    stool.add(seat);

    // 4 slender metal legs
    const legOffset = 0.12;
    [
      [-legOffset, -legOffset],
      [legOffset, -legOffset],
      [-legOffset, legOffset],
      [legOffset, legOffset],
    ].forEach(([lx, lz]) => {
      const leg = new THREE.Mesh(stoolLegGeom, blackMetalMat);
      leg.position.set(lx, 0.32, lz);
      leg.castShadow = !isSoftwareGl;
      stool.add(leg);
    });

    // Footrest ring
    const ring = new THREE.Mesh(stoolRingGeom, blackMetalMat);
    ring.position.y = 0.22;
    stool.add(ring);

    group.add(stool);
  });

  // ==========================================
  // 3. 3 SUSPENDED CONE PENDANT LIGHTS
  // ==========================================
  const pendantPositions = [-0.7, 0.0, 0.7];
  const coneGeom = new THREE.ConeGeometry(0.13, 0.22, 16, 1, true);
  const cordGeom = new THREE.CylinderGeometry(0.005, 0.005, 1.4, 6);
  disposables.push(coneGeom, cordGeom);

  pendantPositions.forEach((px) => {
    const pendant = new THREE.Group();
    pendant.position.set(px, 1.75, 0.44);

    // Cord to ceiling
    const cord = new THREE.Mesh(cordGeom, blackMetalMat);
    cord.position.y = 0.7;
    pendant.add(cord);

    // Matte black cone shade
    const cone = new THREE.Mesh(coneGeom, blackMetalMat);
    pendant.add(cone);

    // Warm luminous interior bulb
    const bulbGeom = new THREE.SphereGeometry(0.04, 10, 10);
    const bulbMat = new THREE.MeshBasicMaterial({ color: 0xffe5b4 });
    const bulb = new THREE.Mesh(bulbGeom, bulbMat);
    bulb.position.y = -0.03;
    pendant.add(bulb);
    disposables.push(bulbGeom, bulbMat);

    group.add(pendant);
  });

  // Downlight pool illumination on island
  const islandSpot = new THREE.PointLight(0xffeaad, 2.2, 5.5);
  islandSpot.position.set(0, 2.1, 0.44);
  group.add(islandSpot);

  // ==========================================
  // 4. REAR CABINET WALL, BUILT-IN OVENS & FRIDGE
  // ==========================================
  const rearGroup = new THREE.Group();
  rearGroup.position.set(0, 0, -1.25);

  // Tall dark cabinet tower (left section)
  const tallCabinetGeom = new THREE.BoxGeometry(0.85, 2.65, 0.65);
  const tallCabinet = new THREE.Mesh(tallCabinetGeom, darkCabinetMat);
  tallCabinet.position.set(-1.05, 1.325, 0);
  rearGroup.add(tallCabinet);
  disposables.push(tallCabinetGeom);

  // Built-in double French Door Refrigerator (Stainless steel with handles)
  const fridgeBodyGeom = new THREE.BoxGeometry(0.78, 1.85, 0.62);
  const fridgeBody = new THREE.Mesh(fridgeBodyGeom, stainlessMat);
  fridgeBody.position.set(-1.05, 0.95, 0.04);
  rearGroup.add(fridgeBody);
  disposables.push(fridgeBodyGeom);

  // Fridge vertical door split line
  const seamGeom = new THREE.BoxGeometry(0.015, 1.8, 0.02);
  const seam = new THREE.Mesh(seamGeom, blackMetalMat);
  seam.position.set(-1.05, 0.95, 0.36);
  rearGroup.add(seam);
  disposables.push(seamGeom);

  // Middle cooking section: lower dark cabinets & upper oak cabinets
  const lowerCounterGeom = new THREE.BoxGeometry(1.4, 0.86, 0.65);
  const lowerCounter = new THREE.Mesh(lowerCounterGeom, darkCabinetMat);
  lowerCounter.position.set(0.15, 0.43, 0);
  rearGroup.add(lowerCounter);
  disposables.push(lowerCounterGeom);

  // Upper warm oak wood cabinets
  const upperCabinetsGeom = new THREE.BoxGeometry(1.4, 0.95, 0.42);
  const upperCabinets = new THREE.Mesh(upperCabinetsGeom, oakWoodMat);
  upperCabinets.position.set(0.15, 1.95, -0.11);
  rearGroup.add(upperCabinets);
  disposables.push(upperCabinetsGeom);

  // Quartz backsplash between upper and lower
  const backsplashGeom = new THREE.PlaneGeometry(1.4, 0.62);
  const backsplash = new THREE.Mesh(backsplashGeom, marbleMat);
  backsplash.position.set(0.15, 1.17, 0.32);
  rearGroup.add(backsplash);
  disposables.push(backsplashGeom);

  // Under-cabinet warm LED light strip
  const underCabinetLight = new THREE.PointLight(0xffb74d, 1.6, 3.2);
  underCabinetLight.position.set(0.15, 1.45, 0.15);
  rearGroup.add(underCabinetLight);

  // Right tower: Built-in Double Wall Ovens
  const ovenTowerGeom = new THREE.BoxGeometry(0.75, 2.65, 0.65);
  const ovenTower = new THREE.Mesh(ovenTowerGeom, darkCabinetMat);
  ovenTower.position.set(1.25, 1.325, 0);
  rearGroup.add(ovenTower);
  disposables.push(ovenTowerGeom);

  // Oven 1 (upper)
  const ovenGeom = new THREE.BoxGeometry(0.64, 0.48, 0.05);
  const oven1 = new THREE.Mesh(ovenGeom, glassBlackMat);
  oven1.position.set(1.25, 1.55, 0.34);
  rearGroup.add(oven1);

  // Oven 2 (lower)
  const oven2 = new THREE.Mesh(ovenGeom, glassBlackMat);
  oven2.position.set(1.25, 1.0, 0.34);
  rearGroup.add(oven2);
  disposables.push(ovenGeom);

  // Oven digital clock displays (cyan glow)
  const clockGeom = new THREE.PlaneGeometry(0.15, 0.04);
  const clockMat = new THREE.MeshBasicMaterial({ color: 0x00d9ff });
  const clock1 = new THREE.Mesh(clockGeom, clockMat);
  clock1.position.set(1.25, 1.74, 0.37);
  rearGroup.add(clock1);
  disposables.push(clockGeom, clockMat);

  group.add(rearGroup);

  // ==========================================
  // 5. ANIMATED PLUMBING LEAK VISUALIZATION (Scene 6)
  // ==========================================
  const leakGroup = new THREE.Group();
  leakGroup.position.set(0.2, 0.9, 0.18); // Under faucet

  // Water drip droplet
  const dripGeom = new THREE.SphereGeometry(0.024, 8, 8);
  const dripMat = new THREE.MeshBasicMaterial({
    color: 0x00d9ff,
    transparent: true,
    opacity: 0.9,
  });
  const leakDrip = new THREE.Mesh(dripGeom, dripMat);
  leakDrip.position.set(0, 0, 0);
  leakGroup.add(leakDrip);
  disposables.push(dripGeom, dripMat);

  // Expanding puddle shockwave rings
  const ringGeom = new THREE.RingGeometry(0.04, 0.09, 16);
  ringGeom.rotateX(-Math.PI / 2);
  const ringMat = new THREE.MeshBasicMaterial({
    color: 0x00d9ff,
    transparent: true,
    opacity: 0.7,
    side: THREE.DoubleSide,
  });
  const leakRings = new THREE.Mesh(ringGeom, ringMat);
  leakRings.position.set(0, -0.015, 0);
  leakGroup.add(leakRings);
  disposables.push(ringGeom, ringMat);

  // Diagnostic glow light around faucet during plumbing scene
  const faucetGlow = new THREE.PointLight(0x00d9ff, 0, 2.5);
  faucetGlow.position.set(0.2, 1.1, 0.2);
  group.add(faucetGlow);

  islandGroup.add(leakGroup);

  // ==========================================
  // UPDATE & CLEANUP HOOKS
  // ==========================================
  let leakAnimTime = 0;

  function update(progress: number, delta: number) {
    leakAnimTime += delta * 4;

    // Active during Scene 6 (Plumbing Problems, progress ~ 0.22 - 0.28)
    const isLeaking = progress >= 0.22 && progress <= 0.28;

    if (isLeaking) {
      leakGroup.visible = true;
      faucetGlow.intensity = 1.8 + Math.sin(leakAnimTime * 3) * 0.8;

      // Animate falling droplet
      const cycle = (leakAnimTime % 1.5) / 1.5; // 0 to 1
      leakDrip.position.y = -cycle * 0.15;
      leakDrip.scale.setScalar(1 - cycle * 0.4);

      // Pulse puddle ring
      const ringScale = 1.0 + Math.sin(leakAnimTime * 5) * 0.5;
      leakRings.scale.set(ringScale, ringScale, ringScale);
      (leakRings.material as THREE.MeshBasicMaterial).opacity = 0.8 - (ringScale - 1.0) * 0.6;
    } else {
      leakGroup.visible = false;
      faucetGlow.intensity = 0;
    }
  }

  function dispose() {
    disposables.forEach((item) => {
      item.dispose();
    });
  }

  return {
    group,
    leakDrip,
    leakRings,
    faucetGlow,
    update,
    dispose,
  };
}
