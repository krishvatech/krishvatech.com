import React, { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

type NodeMeta = {
  id: string;
  label: string;
  description: string;
  position: [number, number, number];
  accent: string;
};

type TooltipState = {
  visible: boolean;
  x: number;
  y: number;
  title: string;
  description: string;
};

const nodeMeta: NodeMeta[] = [
  {
    id: "camera",
    label: "Camera Nodes",
    description: "Industrial cameras continuously capture video feeds from production and safety zones.",
    position: [-10.8, 1.8, 0],
    accent: "#5fb2ff",
  },
  {
    id: "rtsp",
    label: "RTSP Stream Layer",
    description: "RTSP ingestion normalizes and stabilizes multi-camera streams before GPU processing.",
    position: [-7.2, 1.0, 0],
    accent: "#7ea8ff",
  },
  {
    id: "jetson",
    label: "Jetson Edge Node",
    description:
      "Jetson devices perform real-time GPU accelerated inference directly at the edge.",
    position: [-3.6, 0.3, 0],
    accent: "#83c7ff",
  },
  {
    id: "deepstream",
    label: "DeepStream Video Pipeline",
    description:
      "DeepStream processes multiple camera streams simultaneously using optimized GPU pipelines.",
    position: [0.2, 0.0, 0],
    accent: "#76b900",
  },
  {
    id: "tensorrt",
    label: "TensorRT Inference Engine",
    description: "TensorRT optimizes deep learning models for high-performance GPU inference.",
    position: [4.1, 0.3, 0],
    accent: "#9ddf2f",
  },
  {
    id: "edgeapi",
    label: "Edge API",
    description: "Edge API standardizes events and routes operational intelligence to control systems.",
    position: [7.7, 1.0, 0],
    accent: "#77d89f",
  },
  {
    id: "cloud",
    label: "Cloud Dashboard",
    description: "Cloud dashboard aggregates alerts, analytics, and fleet-level visibility across sites.",
    position: [11.2, 1.7, 0],
    accent: "#7ac7c3",
  },
];

const hexToColor = (hex: string) => new THREE.Color(hex);

const createLabelSprite = (label: string) => {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(10, 18, 32, 0.88)";
  ctx.strokeStyle = "rgba(132, 158, 210, 0.48)";
  ctx.lineWidth = 3;

  const radius = 18;
  const x = 12;
  const y = 20;
  const w = canvas.width - 24;
  const h = canvas.height - 40;

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
  ctx.fillStyle = "#eef4ff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(label, canvas.width / 2, canvas.height / 2 + 2);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  const material = new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false });
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(3.7, 0.9, 1);

  return sprite;
};

export default function GPUArchitecture() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [tooltip, setTooltip] = useState<TooltipState>({
    visible: false,
    x: 0,
    y: 0,
    title: "",
    description: "",
  });

  const nodes = useMemo(() => nodeMeta, []);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x0b0f19, 14, 40);

    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 3.5, 17.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x0b0f19, 1);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0x9bb4df, 0.52);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0x8bb8ff, 0.82);
    keyLight.position.set(6, 8, 8);
    scene.add(keyLight);

    const fillLight = new THREE.PointLight(0x76b900, 0.8, 30, 2);
    fillLight.position.set(0, 1, 6);
    scene.add(fillLight);

    const grid = new THREE.GridHelper(42, 42, 0x26437a, 0x162642);
    const gridMat = grid.material as THREE.Material;
    gridMat.transparent = true;
    gridMat.opacity = 0.24;
    grid.position.y = -3.2;
    scene.add(grid);

    const nodeMeshes: THREE.Mesh[] = [];
    const deepStreamPulseLines: THREE.Mesh[] = [];

    const baseGeometry = new THREE.BoxGeometry(2.35, 1.25, 1.2);
    const trimGeometry = new THREE.BoxGeometry(2.15, 0.16, 1.12);
    const glowGeometry = new THREE.SphereGeometry(0.19, 14, 14);

    nodes.forEach((node) => {
      const group = new THREE.Group();
      group.position.set(node.position[0], node.position[1], node.position[2]);

      const baseMaterial = new THREE.MeshStandardMaterial({
        color: 0x111b30,
        emissive: 0x0d1423,
        emissiveIntensity: 0.82,
        metalness: 0.38,
        roughness: 0.46,
      });
      const block = new THREE.Mesh(baseGeometry, baseMaterial);
      block.userData.meta = node;
      group.add(block);

      const trimMaterial = new THREE.MeshStandardMaterial({
        color: hexToColor(node.accent),
        emissive: hexToColor(node.accent),
        emissiveIntensity: 0.5,
        metalness: 0.25,
        roughness: 0.35,
      });
      const trim = new THREE.Mesh(trimGeometry, trimMaterial);
      trim.position.y = 0.48;
      group.add(trim);

      const edges = new THREE.LineSegments(
        new THREE.EdgesGeometry(baseGeometry),
        new THREE.LineBasicMaterial({ color: 0x3b5d97, transparent: true, opacity: 0.42 }),
      );
      group.add(edges);

      const glow = new THREE.Mesh(
        glowGeometry,
        new THREE.MeshBasicMaterial({ color: hexToColor(node.accent), transparent: true, opacity: 0.7 }),
      );
      glow.position.set(0, 0.92, 0.58);
      group.add(glow);

      const labelSprite = createLabelSprite(node.label);
      if (labelSprite) {
        labelSprite.position.set(0, 1.55, 0);
        group.add(labelSprite);
      }

      if (node.id === "deepstream") {
        for (let i = 0; i < 4; i += 1) {
          const lineMat = new THREE.MeshStandardMaterial({
            color: 0x76b900,
            emissive: 0x76b900,
            emissiveIntensity: 0.75,
            transparent: true,
            opacity: 0.75,
            metalness: 0.15,
            roughness: 0.3,
          });
          const line = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.08, 0.08), lineMat);
          line.position.set(0, -0.3 + i * 0.2, 0.65);
          group.add(line);
          deepStreamPulseLines.push(line);
        }
      }

      scene.add(group);
      nodeMeshes.push(block);
    });

    const flowCurves: THREE.CatmullRomCurve3[] = [];
    const flowSpeeds: number[] = [];

    for (let i = 0; i < nodes.length - 1; i += 1) {
      const start = new THREE.Vector3(...nodes[i].position);
      const end = new THREE.Vector3(...nodes[i + 1].position);
      const mid = new THREE.Vector3(
        (start.x + end.x) / 2,
        Math.max(start.y, end.y) + 1.15 + (i % 2 === 0 ? 0.18 : -0.06),
        (start.z + end.z) / 2,
      );

      const curve = new THREE.CatmullRomCurve3([start, mid, end]);
      flowCurves.push(curve);
      flowSpeeds.push(0.065 + Math.random() * 0.045);

      const pathPoints = curve.getPoints(42);
      const flowLine = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(pathPoints),
        new THREE.LineBasicMaterial({ color: 0x345886, transparent: true, opacity: 0.56 }),
      );
      scene.add(flowLine);
    }

    const particleCount = 260;
    const particleOffsets = new Float32Array(particleCount);
    const particleFlowIndex = new Uint16Array(particleCount);
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i += 1) {
      const flowIndex = i % flowCurves.length;
      particleFlowIndex[i] = flowIndex;
      particleOffsets[i] = Math.random();

      const brightness = 0.7 + Math.random() * 0.3;
      particleColors[i * 3] = 0.46 * brightness;
      particleColors[i * 3 + 1] = 0.73 * brightness;
      particleColors[i * 3 + 2] = 0.0;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute("color", new THREE.BufferAttribute(particleColors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.11,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(999, 999);
    const cameraTarget = new THREE.Vector2(0, 0);

    const resize = () => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    resize();

    const onPointerMove = (event: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      mouse.set(x, y);

      cameraTarget.x = x * 0.48;
      cameraTarget.y = y * 0.2;

      raycaster.setFromCamera(mouse, camera);
      const intersections = raycaster.intersectObjects(nodeMeshes);

      if (intersections.length > 0) {
        const hit = intersections[0].object as THREE.Mesh;
        const meta = hit.userData.meta as NodeMeta;
        renderer.domElement.style.cursor = "pointer";
        setTooltip({
          visible: true,
          x: event.clientX - rect.left + 14,
          y: event.clientY - rect.top + 14,
          title: meta.label,
          description: meta.description,
        });
      } else {
        renderer.domElement.style.cursor = "default";
        setTooltip((prev) => (prev.visible ? { ...prev, visible: false } : prev));
      }
    };

    const onPointerLeave = () => {
      renderer.domElement.style.cursor = "default";
      setTooltip((prev) => (prev.visible ? { ...prev, visible: false } : prev));
    };

    renderer.domElement.addEventListener("pointermove", onPointerMove);
    renderer.domElement.addEventListener("pointerleave", onPointerLeave);

    let rafId = 0;
    const clock = new THREE.Clock();
    const temp = new THREE.Vector3();

    const renderLoop = () => {
      const t = clock.getElapsedTime();

      camera.position.x += (cameraTarget.x - camera.position.x) * 0.03;
      camera.position.y += (3.5 + cameraTarget.y - camera.position.y) * 0.03;
      camera.lookAt(0, 0.25, 0);

      for (let i = 0; i < particleCount; i += 1) {
        const flowIndex = particleFlowIndex[i];
        const flow = flowCurves[flowIndex];
        const u = (particleOffsets[i] + t * flowSpeeds[flowIndex]) % 1;
        flow.getPointAt(u, temp);
        particlePositions[i * 3] = temp.x;
        particlePositions[i * 3 + 1] = temp.y;
        particlePositions[i * 3 + 2] = temp.z;
      }
      particleGeometry.attributes.position.needsUpdate = true;

      deepStreamPulseLines.forEach((line, index) => {
        const lineMaterial = line.material as THREE.MeshStandardMaterial;
        lineMaterial.emissiveIntensity = 0.6 + Math.sin(t * 4.2 + index * 0.6) * 0.34;
      });

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    const observer = new ResizeObserver(resize);
    observer.observe(mount);

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      renderer.domElement.removeEventListener("pointermove", onPointerMove);
      renderer.domElement.removeEventListener("pointerleave", onPointerLeave);

      scene.traverse((object) => {
        if ((object as THREE.Mesh).geometry) {
          (object as THREE.Mesh).geometry.dispose();
        }

        const material = (object as THREE.Mesh).material;
        if (Array.isArray(material)) {
          material.forEach((m) => m.dispose());
        } else if (material) {
          material.dispose();
        }
      });

      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, [nodes]);

  return (
    <div ref={mountRef} className="gpu-architecture-root" role="img" aria-label="GPU architecture visualization">
      {tooltip.visible ? (
        <div className="gpu-architecture-tooltip" style={{ left: tooltip.x, top: tooltip.y }}>
          <p className="gpu-architecture-tooltip-title">{tooltip.title}</p>
          <p className="gpu-architecture-tooltip-text">{tooltip.description}</p>
        </div>
      ) : null}
    </div>
  );
}
