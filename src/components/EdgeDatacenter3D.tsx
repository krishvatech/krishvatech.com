import React, { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import ArchitectureFallback from "./ArchitectureFallback";

/*
  Next.js integration (no SSR):
  const EdgeDatacenter3D = dynamic(() => import("./EdgeDatacenter3D"), { ssr: false });
*/

type TooltipState = {
  visible: boolean;
  x: number;
  y: number;
  title: string;
  description: string;
};

type InteractiveKind = "camera" | "rack" | "dashboard";

type InteractiveMeta = {
  kind: InteractiveKind;
  index?: number;
  title: string;
  description: string;
};

type RackInstance = {
  group: THREE.Group;
  frame: THREE.Mesh;
  moduleInstances: THREE.InstancedMesh;
  moduleColorAttr: THREE.InstancedBufferAttribute;
  streamLines: THREE.Mesh[];
  hitBox: THREE.Mesh;
  activeMap: number[];
  basePosition: THREE.Vector3;
};

const BACKGROUND_COLOR = 0x0b0f19;

const CAMERA_COUNT = 10;
const RACK_COUNT = 3;
const MODULES_PER_RACK = 8;

const supportsWebGL = () => {
  if (typeof window === "undefined") return false;
  const canvas = document.createElement("canvas");
  const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
  return !!gl;
};

const shouldUseFallback = () => {
  if (typeof window === "undefined") return true;

  const nav = navigator as Navigator & { deviceMemory?: number };
  const cores = nav.hardwareConcurrency || 8;
  const memory = nav.deviceMemory || 8;
  const coarse = window.matchMedia("(pointer: coarse)").matches;

  return !supportsWebGL() || memory <= 4 || cores <= 4 || (coarse && window.innerWidth < 860);
};

const prefersReducedMotion = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

const createSpriteLabel = (text: string, accent = "#76B900") => {
  const canvas = document.createElement("canvas");
  canvas.width = 640;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(8, 14, 26, 0.92)";
  ctx.strokeStyle = "rgba(118, 185, 0, 0.5)";
  ctx.lineWidth = 3;

  const radius = 20;
  const x = 8;
  const y = 16;
  const w = canvas.width - 16;
  const h = canvas.height - 32;

  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + w - radius, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
  ctx.lineTo(x + w, y + h - radius);
  ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
  ctx.lineTo(x + radius, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.font = "600 34px 'Plus Jakarta Sans', sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = accent;
  ctx.fillText(text, canvas.width / 2, canvas.height / 2 + 2);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;

  const sprite = new THREE.Sprite(
    new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false, depthTest: false }),
  );
  sprite.scale.set(3.8, 0.76, 1);
  return sprite;
};

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

export default function EdgeDatacenter3D() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [fallback, setFallback] = useState<boolean>(false);
  const [tooltip, setTooltip] = useState<TooltipState>({
    visible: false,
    x: 0,
    y: 0,
    title: "",
    description: "",
  });

  const tooltipFrame = useRef<TooltipState | null>(null);

  const cameraDescriptions = useMemo(
    () =>
      Array.from({ length: CAMERA_COUNT }).map((_, i) => ({
        title: `Camera Source ${i + 1}`,
        description: "RTSP Stream Ingest",
      })),
    [],
  );

  useEffect(() => {
    setFallback(shouldUseFallback());
  }, []);

  useEffect(() => {
    if (fallback) return;

    const mount = mountRef.current;
    if (!mount) return;
    const reducedMotion = prefersReducedMotion();

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(BACKGROUND_COLOR, 14, 44);

    const camera = new THREE.PerspectiveCamera(43, 1, 0.1, 120);
    camera.position.set(0, 4.7, 21.4);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(BACKGROUND_COLOR, 1);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, reducedMotion ? 1.25 : 2));
    mount.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0x95addb, 0.54);
    scene.add(ambient);

    const topLight = new THREE.DirectionalLight(0x9ec2ff, 0.7);
    topLight.position.set(8, 14, 10);
    scene.add(topLight);

    const greenRim = new THREE.PointLight(0x76b900, 0.8, 45, 2.4);
    greenRim.position.set(0, 2, 6);
    scene.add(greenRim);

    const blueRim = new THREE.PointLight(0x4068a8, 0.48, 60, 2.4);
    blueRim.position.set(5, 3, -10);
    scene.add(blueRim);

    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(44, 22, 1, 1),
      new THREE.MeshStandardMaterial({ color: 0x0d1423, metalness: 0.18, roughness: 0.92 }),
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -3.7;
    scene.add(floor);

    const grid = new THREE.GridHelper(44, 44, 0x25406e, 0x172742);
    (grid.material as THREE.Material).transparent = true;
    (grid.material as THREE.Material).opacity = 0.2;
    grid.position.y = -3.68;
    scene.add(grid);

    const interactiveTargets: THREE.Object3D[] = [];

    const cameraNodes: THREE.Mesh[] = [];
    const cameraAnchors: THREE.Vector3[] = [];

    const cameraBaseGeo = new THREE.CapsuleGeometry(0.19, 0.44, 6, 10);
    const cameraBaseMat = new THREE.MeshStandardMaterial({
      color: 0x70a7ff,
      emissive: 0x173e72,
      emissiveIntensity: 0.62,
      roughness: 0.4,
      metalness: 0.35,
    });

    for (let i = 0; i < CAMERA_COUNT; i += 1) {
      const row = i % 2;
      const col = Math.floor(i / 2);
      const x = -13.4 + col * 1.25;
      const y = 1.9 - row * 1.15 + (col % 2 === 0 ? 0.08 : -0.06);
      const z = row * 0.9 - 0.5;

      const node = new THREE.Mesh(cameraBaseGeo, cameraBaseMat.clone());
      node.position.set(x, y, z);
      node.rotation.z = Math.PI / 2;
      const cameraMeta: InteractiveMeta = {
        kind: "camera",
        index: i,
        title: cameraDescriptions[i].title,
        description: cameraDescriptions[i].description,
      };
      node.userData.meta = cameraMeta;

      const lens = new THREE.Mesh(
        new THREE.SphereGeometry(0.11, 10, 10),
        new THREE.MeshBasicMaterial({ color: 0x9ac7ff, transparent: true, opacity: 0.8 }),
      );
      lens.position.set(0.32, 0, 0);
      node.add(lens);

      scene.add(node);
      cameraNodes.push(node);
      cameraAnchors.push(new THREE.Vector3(x + 0.35, y, z));
      interactiveTargets.push(node);
    }

    const rackGroup = new THREE.Group();
    scene.add(rackGroup);

    const racks: RackInstance[] = [];
    const rackAnchors: THREE.Vector3[] = [];

    for (let i = 0; i < RACK_COUNT; i += 1) {
      const x = -2.9 + i * 2.9;
      const rack = new THREE.Group();
      rack.position.set(x, 0.1, -0.2 + (i === 1 ? 0.2 : 0));

      const frameGeo = new THREE.BoxGeometry(2.05, 4.7, 1.3);
      const frameMat = new THREE.MeshStandardMaterial({
        color: 0x111b30,
        emissive: 0x0f1626,
        emissiveIntensity: 0.75,
        metalness: 0.42,
        roughness: 0.5,
      });
      const frame = new THREE.Mesh(frameGeo, frameMat);
      rack.add(frame);

      const frameEdges = new THREE.LineSegments(
        new THREE.EdgesGeometry(frameGeo),
        new THREE.LineBasicMaterial({ color: 0x4a6ea5, transparent: true, opacity: 0.38 }),
      );
      rack.add(frameEdges);

      const slotsGeo = new THREE.BoxGeometry(1.52, 0.34, 0.14);
      const slotsMat = new THREE.MeshStandardMaterial({
        color: 0x2d4b1a,
        emissive: 0x76b900,
        emissiveIntensity: 0.5,
        metalness: 0.2,
        roughness: 0.32,
      });
      const moduleInstances = new THREE.InstancedMesh(slotsGeo, slotsMat, MODULES_PER_RACK);
      moduleInstances.instanceMatrix.setUsage(THREE.DynamicDrawUsage);

      const colorArray = new Float32Array(MODULES_PER_RACK * 3);
      for (let m = 0; m < MODULES_PER_RACK; m += 1) {
        const matrix = new THREE.Matrix4();
        matrix.makeTranslation(0, 1.8 - m * 0.52, 0.58);
        moduleInstances.setMatrixAt(m, matrix);

        colorArray[m * 3] = 0.46;
        colorArray[m * 3 + 1] = 0.73;
        colorArray[m * 3 + 2] = 0.0;
      }

      const colorAttr = new THREE.InstancedBufferAttribute(colorArray, 3);
      moduleInstances.instanceColor = colorAttr;
      rack.add(moduleInstances);

      const streamLines: THREE.Mesh[] = [];
      for (let s = 0; s < 4; s += 1) {
        const line = new THREE.Mesh(
          new THREE.BoxGeometry(1.7, 0.06, 0.05),
          new THREE.MeshStandardMaterial({
            color: 0x76b900,
            emissive: 0x76b900,
            emissiveIntensity: 0.64,
            opacity: 0.72,
            transparent: true,
            roughness: 0.25,
            metalness: 0.18,
          }),
        );
        line.position.set(0, -1.15 + s * 0.22, 0.68);
        rack.add(line);
        streamLines.push(line);
      }

      const hitBox = new THREE.Mesh(
        new THREE.BoxGeometry(2.3, 5.2, 1.8),
        new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 }),
      );
      const rackMeta: InteractiveMeta = {
        kind: "rack",
        index: i,
        title: `Jetson Rack ${i + 1}`,
        description: "Jetson Edge Node: DeepStream multi-stream pipeline",
      };
      hitBox.userData.meta = rackMeta;
      rack.add(hitBox);
      interactiveTargets.push(hitBox);

      const labels = ["Jetson Orin", "DeepStream", "TensorRT"];
      labels.forEach((label, labelIndex) => {
        const sprite = createSpriteLabel(label, labelIndex === 0 ? "#9ac7ff" : labelIndex === 1 ? "#76B900" : "#b6e954");
        if (!sprite) return;
        sprite.position.set(0, 2.65 - labelIndex * 0.62, 0.82);
        rack.add(sprite);
      });

      rackGroup.add(rack);

      const activeMap = [i, (i + 3) % MODULES_PER_RACK, (i + 5) % MODULES_PER_RACK];
      racks.push({
        group: rack,
        frame,
        moduleInstances,
        moduleColorAttr: colorAttr,
        streamLines,
        hitBox,
        activeMap,
        basePosition: rack.position.clone(),
      });

      rackAnchors.push(new THREE.Vector3(rack.position.x, rack.position.y + 0.2, rack.position.z + 0.85));
    }

    const dashboardGroup = new THREE.Group();
    dashboardGroup.position.set(10.7, 1.05, -0.3);
    scene.add(dashboardGroup);

    const panel = new THREE.Mesh(
      new THREE.PlaneGeometry(4.2, 3.2),
      new THREE.MeshStandardMaterial({
        color: 0x0d1729,
        emissive: 0x112138,
        emissiveIntensity: 0.62,
        metalness: 0.08,
        roughness: 0.52,
        side: THREE.DoubleSide,
      }),
    );
    panel.rotation.y = -0.18;
    dashboardGroup.add(panel);

    const panelFrame = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.PlaneGeometry(4.2, 3.2)),
      new THREE.LineBasicMaterial({ color: 0x77b2ff, transparent: true, opacity: 0.42 }),
    );
    panelFrame.rotation.y = -0.18;
    dashboardGroup.add(panelFrame);

    for (let i = 0; i < 6; i += 1) {
      const line = new THREE.Mesh(
        new THREE.BoxGeometry(2.75 - (i % 2) * 0.5, 0.06, 0.06),
        new THREE.MeshBasicMaterial({ color: i % 2 === 0 ? 0x76b900 : 0x6a93d6, transparent: true, opacity: 0.74 }),
      );
      line.position.set(-0.45 + (i % 2) * 0.16, 1.1 - i * 0.42, 0.04);
      line.rotation.y = -0.18;
      dashboardGroup.add(line);
    }

    const dashboardHit = new THREE.Mesh(
      new THREE.BoxGeometry(4.6, 3.6, 0.8),
      new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 }),
    );
    dashboardHit.userData.meta = {
      kind: "dashboard",
      title: "Cloud Dashboard",
      description: "Edge-to-Cloud Analytics Dashboard",
    } as InteractiveMeta;
    dashboardGroup.add(dashboardHit);
    interactiveTargets.push(dashboardHit);

    const dashboardAnchor = new THREE.Vector3(9.1, 1.2, 0.4);

    const allCurves: THREE.CatmullRomCurve3[] = [];
    const curveKinds: ("ingest" | "egress")[] = [];

    const addFlowCurve = (
      start: THREE.Vector3,
      end: THREE.Vector3,
      height: number,
      kind: "ingest" | "egress",
      color: number,
    ) => {
      const control = new THREE.Vector3((start.x + end.x) / 2, Math.max(start.y, end.y) + height, (start.z + end.z) / 2);
      const curve = new THREE.CatmullRomCurve3([start, control, end]);
      allCurves.push(curve);
      curveKinds.push(kind);

      const pathPoints = curve.getPoints(42);
      const line = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(pathPoints),
        new THREE.LineBasicMaterial({ color, transparent: true, opacity: kind === "ingest" ? 0.36 : 0.52 }),
      );
      scene.add(line);
    };

    cameraAnchors.forEach((cameraPos, index) => {
      const rackTarget = rackAnchors[index % rackAnchors.length];
      addFlowCurve(cameraPos, rackTarget, 1.45 + (index % 3) * 0.2, "ingest", 0x4d78af);
    });

    rackAnchors.forEach((rackPos, index) => {
      addFlowCurve(rackPos, dashboardAnchor, 1.0 + index * 0.2, "egress", 0x76b900);
    });

    const particleCount = reducedMotion ? 180 : 480;
    const particleOffsets = new Float32Array(particleCount);
    const particleFlowIndex = new Uint16Array(particleCount);
    const particleSpeeds = new Float32Array(particleCount);
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i += 1) {
      const curveIndex = i % allCurves.length;
      const isIngress = curveKinds[curveIndex] === "ingest";

      particleFlowIndex[i] = curveIndex;
      particleOffsets[i] = Math.random();
      particleSpeeds[i] = (isIngress ? 0.075 : 0.092) + Math.random() * 0.03;

      if (isIngress) {
        particleColors[i * 3] = 0.35;
        particleColors[i * 3 + 1] = 0.52 + Math.random() * 0.2;
        particleColors[i * 3 + 2] = 0.82;
      } else {
        particleColors[i * 3] = 0.44;
        particleColors[i * 3 + 1] = 0.72 + Math.random() * 0.2;
        particleColors[i * 3 + 2] = 0.0;
      }
    }

    const particleGeom = new THREE.BufferGeometry();
    particleGeom.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    particleGeom.setAttribute("color", new THREE.BufferAttribute(particleColors, 3));

    const particles = new THREE.Points(
      particleGeom,
      new THREE.PointsMaterial({
        size: 0.092,
        vertexColors: true,
        transparent: true,
        opacity: 0.86,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    );
    scene.add(particles);

    const eventPulseGeom = new THREE.SphereGeometry(0.08, 10, 10);
    const eventPulses: THREE.Mesh[] = [];
    for (let i = 0; i < 6; i += 1) {
      const pulse = new THREE.Mesh(
        eventPulseGeom,
        new THREE.MeshBasicMaterial({ color: 0x9ad93f, transparent: true, opacity: 0.4 }),
      );
      pulse.position.set(9.65 + (i % 3) * 0.6, 0.1 + Math.floor(i / 3) * 0.5, 0.16);
      scene.add(pulse);
      eventPulses.push(pulse);
    }

    const raycaster = new THREE.Raycaster();
    const pointerNdc = new THREE.Vector2(999, 999);
    const pointerWorld = new THREE.Vector2(0, 0);

    const resize = () => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    resize();

    let selectedRack = -1;
    let rackBoost = 0;

    const updateTooltip = (state: TooltipState) => {
      tooltipFrame.current = state;
    };

    const pointerMoveHandler = (event: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      pointerNdc.set(x, y);
      pointerWorld.set(x, y);

      raycaster.setFromCamera(pointerNdc, camera);
      const hits = raycaster.intersectObjects(interactiveTargets, false);

      if (hits.length > 0) {
        renderer.domElement.style.cursor = "pointer";
        const meta = hits[0].object.userData.meta as InteractiveMeta;
        updateTooltip({
          visible: true,
          x: clamp(event.clientX - rect.left + 16, 12, rect.width - 320),
          y: clamp(event.clientY - rect.top + 14, 12, rect.height - 120),
          title: meta.title,
          description: meta.description,
        });
      } else {
        renderer.domElement.style.cursor = "default";
        updateTooltip({ visible: false, x: 0, y: 0, title: "", description: "" });
      }
    };

    const pointerLeaveHandler = () => {
      renderer.domElement.style.cursor = "default";
      updateTooltip({ visible: false, x: 0, y: 0, title: "", description: "" });
    };

    const clickHandler = () => {
      raycaster.setFromCamera(pointerNdc, camera);
      const hits = raycaster.intersectObjects(interactiveTargets, false);
      if (!hits.length) return;
      const meta = hits[0].object.userData.meta as InteractiveMeta;
      if (meta.kind === "rack" && typeof meta.index === "number") {
        selectedRack = meta.index;
        rackBoost = 1;
      }
    };

    renderer.domElement.addEventListener("pointermove", pointerMoveHandler);
    renderer.domElement.addEventListener("pointerleave", pointerLeaveHandler);
    renderer.domElement.addEventListener("click", clickHandler);

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);

    const clock = new THREE.Clock();
    const pointSample = new THREE.Vector3();

    let raf = 0;

    const animate = () => {
      const t = clock.getElapsedTime();

      const orbitX = reducedMotion ? 0 : Math.sin(t * 0.13) * 0.85;
      const orbitY = reducedMotion ? 0 : Math.cos(t * 0.16) * 0.22;
      const targetX = pointerWorld.x * (reducedMotion ? 0.3 : 0.9) + orbitX;
      const targetY = 4.7 + pointerWorld.y * (reducedMotion ? 0.14 : 0.36) + orbitY;

      camera.position.x += (targetX - camera.position.x) * 0.04;
      camera.position.y += (targetY - camera.position.y) * 0.04;
      camera.lookAt(0, 0.05, 0);

      for (let i = 0; i < particleCount; i += 1) {
        const curveIndex = particleFlowIndex[i];
        const u = (particleOffsets[i] + t * particleSpeeds[i]) % 1;
        allCurves[curveIndex].getPointAt(u, pointSample);
        particlePositions[i * 3] = pointSample.x;
        particlePositions[i * 3 + 1] = pointSample.y;
        particlePositions[i * 3 + 2] = pointSample.z;
      }
      particleGeom.attributes.position.needsUpdate = true;

      rackBoost *= reducedMotion ? 0.88 : 0.95;

      racks.forEach((rack, rackIndex) => {
        const pulse = 0.58 + Math.sin(t * 2.9 + rackIndex * 0.8) * 0.2;
        const highlightBoost = selectedRack === rackIndex ? rackBoost * 0.75 : 0;
        const frameMat = rack.frame.material as THREE.MeshStandardMaterial;
        frameMat.emissiveIntensity = 0.7 + highlightBoost + pulse * 0.2;

        rack.group.position.y = rack.basePosition.y + Math.sin(t * 1.4 + rackIndex * 0.6) * 0.03;

        for (let i = 0; i < MODULES_PER_RACK; i += 1) {
          const active = rack.activeMap.includes(i);
          const baseGlow = active ? 0.78 : 0.42;
          const glow = baseGlow + Math.sin(t * (reducedMotion ? 2.6 : 4.1) + i * 0.6 + rackIndex) * 0.08 + highlightBoost * 0.45;

          rack.moduleColorAttr.setXYZ(i, 0.22 + glow * 0.4, 0.46 + glow * 0.54, 0.02);
        }
        rack.moduleColorAttr.needsUpdate = true;

        rack.streamLines.forEach((line, lineIndex) => {
          const mat = line.material as THREE.MeshStandardMaterial;
          mat.emissiveIntensity = 0.52 + Math.sin(t * (reducedMotion ? 2.2 : 4.4) + lineIndex * 0.5 + rackIndex) * 0.2 + highlightBoost * 0.3;
          mat.opacity = 0.5 + Math.sin(t * (reducedMotion ? 1.9 : 3.8) + lineIndex) * 0.12;
        });
      });

      eventPulses.forEach((pulse, index) => {
        const mat = pulse.material as THREE.MeshBasicMaterial;
        mat.opacity = 0.18 + Math.abs(Math.sin(t * (reducedMotion ? 1.6 : 3.2) + index * 0.7)) * 0.72;
        const scale = 0.72 + Math.sin(t * (reducedMotion ? 1.3 : 2.6) + index * 0.55) * 0.22;
        pulse.scale.set(scale, scale, scale);
      });

      if (tooltipFrame.current) {
        setTooltip((prev) => {
          const next = tooltipFrame.current;
          if (!next) return prev;
          if (
            prev.visible === next.visible &&
            prev.x === next.x &&
            prev.y === next.y &&
            prev.title === next.title &&
            prev.description === next.description
          ) {
            return prev;
          }
          return next;
        });
      }

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();

      renderer.domElement.removeEventListener("pointermove", pointerMoveHandler);
      renderer.domElement.removeEventListener("pointerleave", pointerLeaveHandler);
      renderer.domElement.removeEventListener("click", clickHandler);

      scene.traverse((obj) => {
        const mesh = obj as THREE.Mesh;

        if (mesh.geometry) {
          mesh.geometry.dispose();
        }

        const material = mesh.material;
        if (Array.isArray(material)) {
          material.forEach((mat) => {
            const texture = (mat as THREE.Material & { map?: THREE.Texture | null }).map;
            if (texture) texture.dispose();
            mat.dispose();
          });
        } else if (material) {
          const texture = (material as THREE.Material & { map?: THREE.Texture | null }).map;
          if (texture) texture.dispose();
          material.dispose();
        }
      });

      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [cameraDescriptions, fallback]);

  if (fallback) {
    return <ArchitectureFallback />;
  }

  return (
    <div ref={mountRef} className="edge-datacenter-root" role="img" aria-label="Edge micro-datacenter architecture">
      {tooltip.visible ? (
        <div className="edge-datacenter-tooltip" style={{ left: tooltip.x, top: tooltip.y }}>
          <p className="edge-datacenter-tooltip-title">{tooltip.title}</p>
          <p className="edge-datacenter-tooltip-text">{tooltip.description}</p>
        </div>
      ) : null}
    </div>
  );
}
