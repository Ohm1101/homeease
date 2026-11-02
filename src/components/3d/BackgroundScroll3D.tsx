'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { SCENES } from '@/data/scenes';
import { createLivingRoom3D, LivingRoomRefs } from '@/three/createLivingRoom3D';
import { createKitchen3D, KitchenRefs } from '@/three/createKitchen3D';
import { createBathroom3D, BathroomRefs } from '@/three/createBathroom3D';
import { createBedroom3D, BedroomRefs } from '@/three/createBedroom3D';
import { createWholeHouseWiring3D, WholeHouseWiringRefs } from '@/three/createWholeHouseWiring3D';

// Reusable math helpers to eliminate Garbage Collection in render loop
const _tempVec3 = new THREE.Vector3();
const _targetCamPos = new THREE.Vector3();
const _targetLookAt = new THREE.Vector3();

export default function BackgroundScroll3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return false;
      }
    })();

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // Setup Scene, Camera, Renderer
    const scene = new THREE.Scene();
    // Transparent background to preserve the clean light / dark website theme
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 300);
    camera.position.set(0, 0, 18);
    const cameraLookAt = new THREE.Vector3(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
      alpha: true,
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.18;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // Studio Lighting Rig
    try {
      const pmremGenerator = new THREE.PMREMGenerator(renderer);
      scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
      pmremGenerator.dispose();
    } catch {
      // Fallback
    }

    const dirLight = new THREE.DirectionalLight(0xfff5ea, 2.5);
    dirLight.position.set(16, 26, 20);
    dirLight.castShadow = !isSoftwareGl;
    if (dirLight.shadow) {
      dirLight.shadow.mapSize.width = 1024;
      dirLight.shadow.mapSize.height = 1024;
      dirLight.shadow.bias = -0.0005;
      dirLight.shadow.normalBias = 0.02;
    }
    scene.add(dirLight);

    const hemiLight = new THREE.HemisphereLight(0x00d9ff, 0x07111f, 1.25);
    scene.add(hemiLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.55);
    scene.add(ambientLight);

    // World Hierarchy
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // Cityscape Background Grid
    const cityGroup = new THREE.Group();
    const buildingGeom = new THREE.BoxGeometry(1, 1, 1);
    const buildingMat = new THREE.MeshStandardMaterial({
      color: 0x081022,
      roughness: 0.35,
      metalness: 0.85,
    });
    const windowMat = new THREE.MeshBasicMaterial({
      color: 0x00d9ff,
      transparent: true,
      opacity: 0.55,
    });

    const buildingCount = 65;
    const buildingInstMesh = new THREE.InstancedMesh(buildingGeom, buildingMat, buildingCount);
    const dummy = new THREE.Object3D();

    let bIdx = 0;
    for (let x = -6; x <= 6; x += 1.35) {
      for (let z = -6; z <= 6; z += 1.35) {
        if (Math.abs(x) < 2.3 && Math.abs(z) < 2.3) continue;
        if (bIdx >= buildingCount) break;

        const bHeight = 4 + Math.sin(x * 3 + z * 5) * 3 + (Math.abs(x) + Math.abs(z)) * 1.5;
        dummy.position.set(x * 6 + Math.sin(z) * 1.4, bHeight / 2 - 2, z * 6);
        dummy.scale.set(3.2, bHeight, 3.2);
        dummy.updateMatrix();
        buildingInstMesh.setMatrixAt(bIdx, dummy.matrix);
        bIdx++;
      }
    }
    buildingInstMesh.instanceMatrix.needsUpdate = true;
    buildingInstMesh.computeBoundingSphere();
    cityGroup.add(buildingInstMesh);

    // Ground Grid Helper
    const gridHelper = new THREE.GridHelper(160, 40, 0x00d9ff, 0x94a3b8);
    gridHelper.position.y = -0.01;
    cityGroup.add(gridHelper);
    worldGroup.add(cityGroup);

    // 3D GLB Modern Villa Model
    const villaGroup = new THREE.Group();
    villaGroup.position.set(0, 0, 0);

    // Ground platform shadow catcher
    const shadowGeom = new THREE.PlaneGeometry(24, 24);
    shadowGeom.rotateX(-Math.PI / 2);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.35,
      depthWrite: false,
    });
    const shadowPlane = new THREE.Mesh(shadowGeom, shadowMat);
    shadowPlane.position.y = -0.52;
    villaGroup.add(shadowPlane);

    // Container for the loaded GLB model
    const glbContainer = new THREE.Group();
    villaGroup.add(glbContainer);

    // Materials reference collection for dynamic X-Ray and Gold VIP transitions
    const originalMaterials: Map<THREE.Mesh, THREE.Material | THREE.Material[]> = new Map();
    const transparentXrayMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.22,
      roughness: 0.2,
      metalness: 0.8,
      wireframe: false,
    });
    const goldVipMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.88,
      roughness: 0.18,
    });

    const poolMeshes: THREE.Mesh[] = [];
    const facadeGlassMeshes: THREE.Mesh[] = [];
    const wallMeshes: THREE.Mesh[] = [];
    const slabMeshes: THREE.Mesh[] = [];

    // Dynamically apply Theme-specific wall colors and lighting
    // Dark Theme: Luxury Warm Alabaster Limestone (0xede8df)
    // Light Theme: Modern High-Contrast Charcoal Slate Stone (0x243044)
    const applyThemeMaterials = (isLight: boolean) => {
      const wallColor = isLight ? 0x243044 : 0xede8df;
      const slabColor = isLight ? 0x334155 : 0xded8cc;
      const wallRoughness = isLight ? 0.70 : 0.82;
      const wallMetalness = isLight ? 0.15 : 0.04;
      const slabRoughness = isLight ? 0.80 : 0.88;
      const slabMetalness = isLight ? 0.10 : 0.02;

      wallMeshes.forEach((mesh) => {
        if (mesh.material instanceof THREE.MeshStandardMaterial) {
          mesh.material.color.setHex(wallColor);
          mesh.material.roughness = wallRoughness;
          mesh.material.metalness = wallMetalness;
          mesh.material.needsUpdate = true;
        }
      });

      slabMeshes.forEach((mesh) => {
        if (mesh.material instanceof THREE.MeshStandardMaterial) {
          mesh.material.color.setHex(slabColor);
          mesh.material.roughness = slabRoughness;
          mesh.material.metalness = slabMetalness;
          mesh.material.needsUpdate = true;
        }
      });

      buildingMat.color.setHex(isLight ? 0x7e94a8 : 0x081022);
      buildingMat.needsUpdate = true;

      // Softened non-glaring lighting for comfortable reading
      dirLight.intensity = isLight ? 1.75 : 2.5;
      ambientLight.intensity = isLight ? 0.48 : 0.55;
      hemiLight.intensity = isLight ? 0.70 : 1.25;
      renderer.toneMappingExposure = isLight ? 0.95 : 1.18;

      // Subtle atmospheric light blue fog in light mode
      if (isLight) {
        scene.fog = new THREE.FogExp2(0xd6e4f0, 0.012);
      } else {
        scene.fog = null;
      }
    };

    // Load the 3D GLB model
    const loader = new GLTFLoader();
    loader.load(
      '/modern_villa_complete_with_interiors.glb',
      (gltf) => {
        const model = gltf.scene;
        model.rotation.x = -Math.PI / 2;
        model.position.set(0, 0, 0);

        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            const lowerName = child.name.toLowerCase();

            // Hide basic placeholders to seamlessly integrate custom interactive suites
            const isOldPlaceholder =
              (lowerName.startsWith('bedroom_') && !lowerName.includes('wall') && !lowerName.includes('floor') && !lowerName.includes('ceiling') && !lowerName.includes('threshold') && !lowerName.includes('window')) ||
              (lowerName.startsWith('bathroom_') && !lowerName.includes('wall') && !lowerName.includes('floor') && !lowerName.includes('ceiling') && !lowerName.includes('threshold')) ||
              (lowerName.startsWith('kitchen_') && !lowerName.includes('wall') && !lowerName.includes('floor') && !lowerName.includes('ceiling') && !lowerName.includes('threshold')) ||
              lowerName.startsWith('living room') ||
              lowerName.startsWith('dining ') ||
              lowerName.includes('upper_rear_volume');

            if (isOldPlaceholder) {
              child.visible = false;
              return;
            }

            if (!isSoftwareGl) {
              child.castShadow = true;
              child.receiveShadow = true;
            }

            // Enhanced water shader styling
            if (lowerName.includes('pool') || lowerName.includes('water')) {
              poolMeshes.push(child);
              child.material = new THREE.MeshPhysicalMaterial({
                color: 0x00d9ff,
                emissive: 0x006688,
                emissiveIntensity: 0.25,
                roughness: 0.08,
                metalness: 0.1,
                transmission: isSoftwareGl ? 0 : 0.85,
                transparent: true,
                opacity: isSoftwareGl ? 0.65 : 0.9,
                ior: 1.33,
              });
              originalMaterials.set(child, child.material);
              return;
            }

            // Upper floor & balcony glass: transparent and clean
            const isUpperFloorGlass =
              (lowerName.includes('upper') && (lowerName.includes('glass') || lowerName.includes('window') || lowerName.includes('glazing'))) ||
              lowerName.includes('balcony') ||
              lowerName.includes('balustrade');

            if (isUpperFloorGlass) {
              child.visible = false;
              return;
            }

            // Facade glass
            if (lowerName.includes('glass') || lowerName.includes('glazing') || lowerName.includes('window')) {
              facadeGlassMeshes.push(child);
              child.material = new THREE.MeshPhysicalMaterial({
                color: 0xffffff,
                transmission: isSoftwareGl ? 0 : 0.98,
                transparent: true,
                opacity: isSoftwareGl ? 0.04 : 0.06,
                roughness: 0.0,
                metalness: 0.05,
                ior: 1.5,
                clearcoat: 1.0,
                depthWrite: false,
              });
              originalMaterials.set(child, child.material);
              return;
            }

            // Architectural Wall Finish (Theme Adaptive)
            const isWallOrStructure =
              lowerName.includes('wall') ||
              lowerName.includes('header') ||
              lowerName.includes('pier') ||
              lowerName.includes('volume') ||
              lowerName.includes('parapet') ||
              lowerName.includes('penthouse');

            if (isWallOrStructure) {
              wallMeshes.push(child);
              child.material = new THREE.MeshStandardMaterial({
                color: 0xede8df,
                roughness: 0.82,
                metalness: 0.04,
              });
              originalMaterials.set(child, child.material);
              return;
            }

            // Slabs, Floors & Foundation (Theme Adaptive)
            if (lowerName.includes('slab') || lowerName.includes('floor') || lowerName.includes('threshold') || lowerName.includes('foundation')) {
              slabMeshes.push(child);
              child.material = new THREE.MeshStandardMaterial({
                color: 0xded8cc,
                roughness: 0.88,
                metalness: 0.02,
              });
              originalMaterials.set(child, child.material);
              return;
            }

            // Natural Teak Timber Decking
            if (lowerName.includes('deck') || lowerName.includes('timber') || lowerName.includes('teak')) {
              child.material = new THREE.MeshStandardMaterial({
                color: 0x7c4f2a,
                roughness: 0.55,
                metalness: 0.08,
              });
              originalMaterials.set(child, child.material);
              return;
            }

            // Obsidian Architectural Steel & Window Mullions
            if (lowerName.includes('mullion') || lowerName.includes('frame') || lowerName.includes('rail') || lowerName.includes('beam') || lowerName.includes('fascia')) {
              child.material = new THREE.MeshStandardMaterial({
                color: 0x0f141c,
                roughness: 0.25,
                metalness: 0.88,
              });
              originalMaterials.set(child, child.material);
              return;
            }

            originalMaterials.set(child, child.material);
          }
        });

        glbContainer.add(model);
        const isCurrentLight = typeof document !== 'undefined' && (document.documentElement.classList.contains('light') || !document.documentElement.classList.contains('dark'));
        applyThemeMaterials(isCurrentLight);
        renderer.render(scene, camera);
      },
      undefined,
      (error) => {
        console.error('Error loading 3D villa model:', error);
      }
    );

    // Custom 3D Living Room Suite
    const livingRoomSuite: LivingRoomRefs = createLivingRoom3D(isSoftwareGl);
    villaGroup.add(livingRoomSuite.group);

    // Custom 3D Kitchen Suite
    const kitchenSuite: KitchenRefs = createKitchen3D(isSoftwareGl);
    villaGroup.add(kitchenSuite.group);

    // Custom 3D Bathroom Suite
    const bathroomSuite: BathroomRefs = createBathroom3D(isSoftwareGl);
    villaGroup.add(bathroomSuite.group);

    // Custom 3D Master Bedroom Suite
    const bedroomSuite: BedroomRefs = createBedroom3D(isSoftwareGl);
    villaGroup.add(bedroomSuite.group);

    // Whole-House Electrical Grid & Conduits Infrastructure
    const wholeHouseWiring: WholeHouseWiringRefs = createWholeHouseWiring3D(isSoftwareGl);
    villaGroup.add(wholeHouseWiring.group);

    // Warm Interior Point Lights
    const livingRoomLight = new THREE.PointLight(0xff9944, 2.6, 9);
    livingRoomLight.position.set(-2.8, 2.0, 0.5);
    villaGroup.add(livingRoomLight);

    const kitchenLight = new THREE.PointLight(0xffa550, 2.4, 9);
    kitchenLight.position.set(3.0, 2.2, 0.0);
    villaGroup.add(kitchenLight);

    const bathroomLight = new THREE.PointLight(0xffedd5, 3.2, 9);
    bathroomLight.position.set(2.4, 5.5, -0.6);
    villaGroup.add(bathroomLight);

    const bedroomLight = new THREE.PointLight(0xffedd5, 3.2, 9);
    bedroomLight.position.set(-2.9, 5.5, -0.6);
    villaGroup.add(bedroomLight);

    const poolGlowLight = new THREE.PointLight(0x00d9ff, 1.8, 8);
    poolGlowLight.position.set(1.5, 1.2, 4.5);
    villaGroup.add(poolGlowLight);

    // Rooftop AC Diagnostic Unit
    const acUnitGroup = new THREE.Group();
    acUnitGroup.position.set(1.2, 8.4, -1.0);
    const acChassis = new THREE.Mesh(
      new THREE.BoxGeometry(1.4, 0.9, 0.8),
      new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.8, roughness: 0.2 })
    );
    acUnitGroup.add(acChassis);

    const fanGeom = new THREE.CylinderGeometry(0.32, 0.32, 0.05, 12);
    fanGeom.rotateX(Math.PI / 2);
    const fanMesh = new THREE.Mesh(fanGeom, new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.9 }));
    fanMesh.position.set(0, 0, 0.42);
    acUnitGroup.add(fanMesh);

    const acStatusLed = new THREE.Mesh(
      new THREE.SphereGeometry(0.09, 12, 12),
      new THREE.MeshBasicMaterial({ color: 0x00c853 })
    );
    acStatusLed.position.set(0.5, 0.32, 0.42);
    acUnitGroup.add(acStatusLed);
    villaGroup.add(acUnitGroup);

    // Infrastructure Pipeline (Revealed in X-Ray)
    const infraGroup = new THREE.Group();
    const pipeBlueMat = new THREE.MeshStandardMaterial({
      color: 0x00d9ff,
      emissive: 0x007799,
      metalness: 0.8,
      roughness: 0.2,
    });
    const pipe1 = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 7.5, 8), pipeBlueMat);
    pipe1.position.set(2.8, 4.0, 0.2);
    const pipe2 = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 6.0, 8), pipeBlueMat);
    pipe2.rotation.z = Math.PI / 2;
    pipe2.position.set(0.5, 1.2, 0.2);
    infraGroup.add(pipe1, pipe2);

    const wireAmberMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      emissive: 0xd97706,
      metalness: 0.9,
      roughness: 0.2,
    });
    const wire1 = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 7.2, 8), wireAmberMat);
    wire1.position.set(-2.4, 4.2, 0.2);
    const wire2 = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 6.0, 8), wireAmberMat);
    wire2.rotation.x = Math.PI / 2;
    wire2.position.set(-2.4, 5.4, 0);
    infraGroup.add(wire1, wire2);

    const dropMesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.07, 8, 8),
      new THREE.MeshBasicMaterial({ color: 0x00d9ff, transparent: true, opacity: 0.85 })
    );
    dropMesh.position.set(2.8, 1.2, 0.2);
    infraGroup.add(dropMesh);
    infraGroup.visible = false;
    villaGroup.add(infraGroup);

    // Holographic AI Laser Scan Plane
    const scanPlaneGeom = new THREE.PlaneGeometry(16, 16);
    scanPlaneGeom.rotateX(Math.PI / 2);
    const scanPlaneMat = new THREE.MeshBasicMaterial({
      color: 0x00d9ff,
      transparent: true,
      opacity: 0.25,
      side: THREE.DoubleSide,
    });
    const scanPlane = new THREE.Mesh(scanPlaneGeom, scanPlaneMat);
    scanPlane.position.set(0, 1.0, 0);
    scanPlane.visible = false;
    villaGroup.add(scanPlane);

    // Orbiting 3D Service Icons Group
    const serviceOrbitGroup = new THREE.Group();
    const serviceColors = [0x00d9ff, 0xd4af37, 0x00c853, 0xf59e0b, 0x9333ea, 0x3b82f6];
    const orbitMeshes: THREE.Mesh[] = [];

    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const radius = 9.2;
      const ringGeom = new THREE.TorusGeometry(0.65, 0.08, 12, 32);
      const ringMat = new THREE.MeshStandardMaterial({
        color: serviceColors[i % serviceColors.length],
        emissive: serviceColors[i % serviceColors.length],
        emissiveIntensity: 0.5,
        roughness: 0.2,
        metalness: 0.9,
      });
      const ringMesh = new THREE.Mesh(ringGeom, ringMat);
      ringMesh.position.set(Math.cos(angle) * radius, 4.5 + Math.sin(i * 1.5) * 1.2, Math.sin(angle) * radius);
      serviceOrbitGroup.add(ringMesh);
      orbitMeshes.push(ringMesh);
    }
    serviceOrbitGroup.visible = false;
    villaGroup.add(serviceOrbitGroup);

    worldGroup.add(villaGroup);

    // Service Dispatch Vehicle
    const vehicleGroup = new THREE.Group();
    const vehicleBody = new THREE.Mesh(
      new THREE.BoxGeometry(1.6, 0.7, 0.8),
      new THREE.MeshStandardMaterial({ color: 0x00d9ff, metalness: 0.8, roughness: 0.2 })
    );
    vehicleBody.position.y = 0.45;
    vehicleGroup.add(vehicleBody);

    const vehicleHeadlight = new THREE.PointLight(0x00d9ff, 2.2, 8);
    vehicleHeadlight.position.set(0.9, 0.5, 0);
    vehicleGroup.add(vehicleHeadlight);

    const routeCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(25, 0.3, 20),
      new THREE.Vector3(15, 0.3, 14),
      new THREE.Vector3(5, 0.3, 10),
      new THREE.Vector3(0, 0.3, 7.5),
    ]);
    const routePoints = routeCurve.getPoints(40);
    const routeGeom = new THREE.BufferGeometry().setFromPoints(routePoints);
    const routeMat = new THREE.LineBasicMaterial({ color: 0x00d9ff, linewidth: 2 });
    const routeLine = new THREE.Line(routeGeom, routeMat);
    routeLine.visible = false;
    worldGroup.add(routeLine);
    worldGroup.add(vehicleGroup);
    vehicleGroup.visible = false;

    // Particle Swarm for Genesis & Finale
    const particleCount = 1000;
    const particlePositions = new Float32Array(particleCount * 3);
    const targetPositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(Math.random()) * 16;
      const sinPhi = Math.sin(phi);

      particlePositions[i * 3] = r * sinPhi * Math.cos(theta);
      particlePositions[i * 3 + 1] = r * sinPhi * Math.sin(theta);
      particlePositions[i * 3 + 2] = r * Math.cos(phi);

      const scale = 4.0;
      if (i < particleCount * 0.4) {
        const roofT = (i / (particleCount * 0.4)) * 2 - 1;
        targetPositions[i * 3] = roofT * scale;
        targetPositions[i * 3 + 1] = (1 - Math.abs(roofT)) * scale * 0.8 + 1.2;
        targetPositions[i * 3 + 2] = (Math.random() - 0.5) * 0.4;
      } else if (i < particleCount * 0.8) {
        const angleBox = ((i - particleCount * 0.4) / (particleCount * 0.4)) * Math.PI * 2;
        targetPositions[i * 3] = Math.cos(angleBox) * scale * 0.8;
        targetPositions[i * 3 + 1] = Math.sin(angleBox) * scale * 0.6 - 0.8;
        targetPositions[i * 3 + 2] = (Math.random() - 0.5) * 0.4;
      } else {
        targetPositions[i * 3] = (Math.random() - 0.5) * scale * 0.5;
        targetPositions[i * 3 + 1] = (Math.random() - 0.5) * scale * 0.5;
        targetPositions[i * 3 + 2] = (Math.random() - 0.5) * 0.4;
      }
    }

    const particleGeom = new THREE.BufferGeometry();
    particleGeom.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x00d9ff,
      size: isSoftwareGl ? 0.25 : 0.18,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeom, particleMat);
    scene.add(particles);

    // ==========================================
    // ANIMATION & SCROLL-DRIVEN CAMERA LOOP
    // ==========================================
    let frameId = 0;
    const clock = new THREE.Clock();
    let prevModeState = '';

    // Scroll state tracker
    let currentScrollProgress = 0;
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        currentScrollProgress = Math.min(1, Math.max(0, window.scrollY / totalScroll));
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    function updateSceneState(p: number, delta: number) {
      let activeIdx = 0;
      for (let i = 0; i < SCENES.length; i++) {
        if (p >= SCENES[i].triggerProgress) {
          activeIdx = i;
        }
      }

      const activeScene = SCENES[activeIdx];
      const nextScene = SCENES[Math.min(activeIdx + 1, SCENES.length - 1)];
      const range = (nextScene.triggerProgress - activeScene.triggerProgress) || 0.04;
      const alpha = Math.min(Math.max((p - activeScene.triggerProgress) / range, 0), 1);

      // Camera position interpolation
      _targetCamPos.set(
        THREE.MathUtils.lerp(activeScene.cameraPos[0], nextScene.cameraPos[0], alpha),
        THREE.MathUtils.lerp(activeScene.cameraPos[1], nextScene.cameraPos[1], alpha),
        THREE.MathUtils.lerp(activeScene.cameraPos[2], nextScene.cameraPos[2], alpha)
      );

      _targetLookAt.set(
        THREE.MathUtils.lerp(activeScene.cameraTarget[0], nextScene.cameraTarget[0], alpha),
        THREE.MathUtils.lerp(activeScene.cameraTarget[1], nextScene.cameraTarget[1], alpha),
        THREE.MathUtils.lerp(activeScene.cameraTarget[2], nextScene.cameraTarget[2], alpha)
      );

      // Smooth damping
      camera.position.x = THREE.MathUtils.damp(camera.position.x, _targetCamPos.x, 3.5, delta);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, _targetCamPos.y, 3.5, delta);
      camera.position.z = THREE.MathUtils.damp(camera.position.z, _targetCamPos.z, 3.5, delta);

      cameraLookAt.x = THREE.MathUtils.damp(cameraLookAt.x, _targetLookAt.x, 4.0, delta);
      cameraLookAt.y = THREE.MathUtils.damp(cameraLookAt.y, _targetLookAt.y, 4.0, delta);
      cameraLookAt.z = THREE.MathUtils.damp(cameraLookAt.z, _targetLookAt.z, 4.0, delta);
      camera.lookAt(cameraLookAt);

      // Pool water caustics glow pulse
      poolGlowLight.intensity = 1.6 + Math.sin(clock.getElapsedTime() * 3) * 0.4;

      // AC fan rotor
      fanMesh.rotation.z += delta * (p >= 0.18 && p <= 0.42 ? 2 : 12);

      // AC Status LED
      if (p >= 0.18 && p < 0.78) {
        (acStatusLed.material as THREE.MeshBasicMaterial).color.setHex(0xef4444);
      } else {
        (acStatusLed.material as THREE.MeshBasicMaterial).color.setHex(0x00c853);
      }

      // Update 3D Room Suites animations
      livingRoomSuite.update(p, delta);
      kitchenSuite.update(p, delta);
      bathroomSuite.update(p, delta);
      bedroomSuite.update(p, delta);

      // Dynamic FOV for interior room closeups
      const isInteriorScene = p >= 0.18 && p <= 0.40;
      const targetFov = isInteriorScene ? 54 : 40;
      if (Math.abs(camera.fov - targetFov) > 0.05) {
        camera.fov = THREE.MathUtils.damp(camera.fov, targetFov, 3.5, delta);
        camera.updateProjectionMatrix();
      }

      // Hide facade glass panels during interior scenes for crystal-clear view
      facadeGlassMeshes.forEach((mesh) => {
        mesh.visible = !isInteriorScene;
      });

      // X-Ray Villa Mode
      const isXray = (p >= 0.42 && p <= 0.52);
      const isGold = p >= 0.91 && p <= 0.95;

      const isWiringActive = isXray || (p >= 0.28 && p <= 0.33);
      wholeHouseWiring.update(p, delta, isWiringActive);

      const currentModeKey = isXray ? 'xray' : isGold ? 'gold' : 'normal';
      if (currentModeKey !== prevModeState) {
        prevModeState = currentModeKey;
        glbContainer.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            if (isXray) {
              child.material = transparentXrayMat;
            } else if (isGold) {
              child.material = goldVipMat;
            } else {
              const orig = originalMaterials.get(child);
              if (orig) child.material = orig;
            }
          }
        });
      }

      infraGroup.visible = isXray;
      if (isXray) {
        dropMesh.position.y -= delta * 1.5;
        if (dropMesh.position.y < 0.3) dropMesh.position.y = 1.4;
      }

      // AI Laser Scan Plane (Scene 11)
      const isScan = p >= 0.48 && p <= 0.54;
      scanPlane.visible = isScan;
      if (isScan) {
        scanPlane.position.y = 0.5 + Math.sin(clock.getElapsedTime() * 4) * 4.5;
      }

      // 60+ Services Explosion (Scene 12 & 13)
      const isServices = p >= 0.53 && p <= 0.68;
      serviceOrbitGroup.visible = isServices;
      if (isServices) {
        serviceOrbitGroup.rotation.y += delta * 0.8;
        orbitMeshes.forEach((mesh, idx) => {
          mesh.rotation.x += delta * (1 + idx * 0.1);
        });
      }

      // Live Tracking Dispatch Vehicle (Scene 17)
      const isTracking = p >= 0.73 && p <= 0.79;
      vehicleGroup.visible = isTracking;
      routeLine.visible = isTracking;
      if (isTracking) {
        const routeT = Math.min(Math.max((p - 0.73) / 0.06, 0), 1);
        const pos = routeCurve.getPointAt(routeT);
        vehicleGroup.position.copy(pos);
        const tangent = routeCurve.getTangentAt(routeT);
        vehicleGroup.quaternion.setFromUnitVectors(_tempVec3.set(1, 0, 0), tangent);
      }

      // Particles morphing (Finale)
      const isLogoParticles = p > 0.97;
      particles.visible = isLogoParticles;
      if (isLogoParticles) {
        const positions = particleGeom.attributes.position.array as Float32Array;
        const morphAlpha = p < 0.05 ? p / 0.05 : (p - 0.97) / 0.03;
        for (let i = 0; i < particleCount; i++) {
          const i3 = i * 3;
          positions[i3] = THREE.MathUtils.lerp(particlePositions[i3], targetPositions[i3], morphAlpha);
          positions[i3 + 1] = THREE.MathUtils.lerp(particlePositions[i3 + 1], targetPositions[i3 + 1], morphAlpha);
          positions[i3 + 2] = THREE.MathUtils.lerp(particlePositions[i3 + 2], targetPositions[i3 + 2], morphAlpha);
        }
        particleGeom.attributes.position.needsUpdate = true;
        particles.rotation.y += delta * 0.2;
      }
    }

    function tick() {
      const delta = Math.min(clock.getDelta(), 0.1);
      updateSceneState(currentScrollProgress, delta);
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(tick);
    }

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
      frameId = requestAnimationFrame(tick);
    } else {
      frameId = window.setTimeout(tick, 10);
    }

    const renderIntervalId = setInterval(() => {
      try {
        renderer.render(scene, camera);
      } catch {}
    }, 250);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Theme observer to dynamically update wall color & lighting on Light / Dark toggle
    const checkTheme = () => {
      const isCurrentLight = typeof document !== 'undefined' && (document.documentElement.classList.contains('light') || !document.documentElement.classList.contains('dark'));
      applyThemeMaterials(isCurrentLight);
    };

    checkTheme();

    const themeObserver = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === 'attributes' && m.attributeName === 'class') {
          checkTheme();
        }
      }
    });

    if (typeof document !== 'undefined') {
      themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class'],
      });
    }

    // Cleanup
    return () => {
      clearInterval(renderIntervalId);
      themeObserver.disconnect();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (frameId) {
        cancelAnimationFrame(frameId);
        clearTimeout(frameId);
      }
      renderer.dispose();
      buildingGeom.dispose();
      buildingMat.dispose();
      windowMat.dispose();
      shadowGeom.dispose();
      shadowMat.dispose();
      particleGeom.dispose();
      particleMat.dispose();
      transparentXrayMat.dispose();
      goldVipMat.dispose();
      livingRoomSuite.dispose();
      kitchenSuite.dispose();
      bathroomSuite.dispose();
      bedroomSuite.dispose();
      wholeHouseWiring.dispose();
      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden opacity-88 dark:opacity-85 transition-opacity duration-500"
      style={{ touchAction: 'none' }}
    />
  );
}
