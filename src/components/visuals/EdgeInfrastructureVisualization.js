import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import ArchitectureFallback from "../ArchitectureFallback";
import { useMotionPreferences } from "../../animations/useMotionPreferences";

const BG_COLOR = 0x0b0f19;
const CAMERA_NODE_COUNT = 6;
const STAGE_COUNT = 5;

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

const supportsWebGL = () => {
  if (typeof window === "undefined") return false;
  const canvas = document.createElement("canvas");
  const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
  return Boolean(gl);
};

const createLabelSprite = (text, accent = "#76B900") => {
  const canvas = document.createElement("canvas");
  canvas.width = 560;
  canvas.height = 116;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(9, 15, 26, 0.92)";
  ctx.strokeStyle = "rgba(118, 185, 0, 0.52)";
  ctx.lineWidth = 3;

  const x = 10;
  const y = 10;
  const w = canvas.width - 20;
  const h = canvas.height - 20;
  const radius = 16;

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

  ctx.fillStyle = accent;
  ctx.font = "600 34px 'Plus Jakarta Sans', sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, canvas.width / 2, canvas.height / 2 + 1);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;

  const sprite = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      depthWrite: false,
      depthTest: false,
    }),
  );
  sprite.scale.set(3.4, 0.7, 1);
  return sprite;
};

const createCurveLine = (from, to, lift, color, opacity = 0.5) => {
  const cp1 = new THREE.Vector3(from.x + (to.x - from.x) * 0.35, from.y + lift, from.z);
  const cp2 = new THREE.Vector3(from.x + (to.x - from.x) * 0.7, to.y + lift, to.z);
  const curve = new THREE.CubicBezierCurve3(from.clone(), cp1, cp2, to.clone());

  const line = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(curve.getPoints(34)),
    new THREE.LineBasicMaterial({
      color,
      transparent: true,
      opacity,
    }),
  );

  return { curve, line };
};

const createParticleCloud = (connections, density) => {
  const count = connections.length * density;
  const offsets = new Float32Array(count);
  const speeds = new Float32Array(count);
  const connectionIndex = new Uint16Array(count);
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count; i += 1) {
    const conn = i % connections.length;
    connectionIndex[i] = conn;
    offsets[i] = Math.random();
    speeds[i] = 0.0022 + Math.random() * 0.0035;

    colors[i * 3] = 0.45;
    colors[i * 3 + 1] = 0.78;
    colors[i * 3 + 2] = 0.1;
  }

  return {
    count,
    offsets,
    speeds,
    connectionIndex,
    positions,
    colors,
  };
};

const STAGE_LABELS = [
  "Stage 1: Camera Streams + RTSP Ingestion",
  "Stage 2: Jetson Edge AI Nodes",
  "Stage 3: DeepStream + TensorRT GPU Processing",
  "Stage 4: Edge Event Engine",
  "Stage 5: Operations Dashboard",
];

export default function EdgeInfrastructureVisualization({ className = "" }) {
  const shellRef = useRef(null);
  const mountRef = useRef(null);
  const runtimeRef = useRef(null);
  const inViewRef = useRef(false);
  const stageRef = useRef(0);

  const [isInView, setIsInView] = useState(false);
  const [fallback, setFallback] = useState(false);
  const [activeStage, setActiveStage] = useState(0);

  const { reducedMotion, lowPower, allowAnimation } = useMotionPreferences();

  useEffect(() => {
    setFallback(!supportsWebGL() || lowPower);
  }, [lowPower]);

  useEffect(() => {
    const node = shellRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        inViewRef.current = visible;
        setIsInView(visible);
      },
      { threshold: 0.18 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (fallback || !isInView || runtimeRef.current) return undefined;

    const mount = mountRef.current;
    const shell = shellRef.current;
    if (!mount || !shell) return undefined;

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(BG_COLOR, 16, 50);

    const camera = new THREE.PerspectiveCamera(43, 1, 0.1, 120);
    camera.position.set(0, 4.5, 22);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "high-performance" });
    renderer.setClearColor(BG_COLOR, 1);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0x9ab4df, 0.55);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0x8eb5fb, 0.75);
    keyLight.position.set(8, 14, 10);
    scene.add(keyLight);

    const greenFill = new THREE.PointLight(0x76b900, 1.0, 42, 2.1);
    greenFill.position.set(0.5, 3.2, 7.2);
    scene.add(greenFill);

    const blueFill = new THREE.PointLight(0x476da8, 0.58, 54, 2.3);
    blueFill.position.set(5.5, 1.8, -8.5);
    scene.add(blueFill);

    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(46, 24),
      new THREE.MeshStandardMaterial({ color: 0x0d1423, roughness: 0.92, metalness: 0.18 }),
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -3.9;
    scene.add(floor);

    const grid = new THREE.GridHelper(46, 46, 0x284270, 0x192947);
    grid.position.y = -3.88;
    grid.material.transparent = true;
    grid.material.opacity = 0.23;
    scene.add(grid);

    const stageNodes = {
      stage0: [],
      stage1: [],
      stage2: [],
      stage3: [],
      stage4: [],
    };

    const cameraAnchors = [];

    const cameraGeo = new THREE.BoxGeometry(0.58, 0.32, 0.28);
    for (let i = 0; i < CAMERA_NODE_COUNT; i += 1) {
      const y = 2.2 - i * 0.9;
      const node = new THREE.Mesh(
        cameraGeo,
        new THREE.MeshStandardMaterial({
          color: 0x6fa8ff,
          emissive: 0x1f4c85,
          emissiveIntensity: 0.42,
          roughness: 0.34,
          metalness: 0.42,
        }),
      );
      node.position.set(-13.2, y, -0.2 + (i % 2) * 0.4);

      const lens = new THREE.Mesh(
        new THREE.SphereGeometry(0.08, 12, 12),
        new THREE.MeshBasicMaterial({ color: 0xb7d8ff, transparent: true, opacity: 0.85 }),
      );
      lens.position.set(0.29, 0, 0);
      node.add(lens);

      scene.add(node);
      stageNodes.stage0.push(node);
      cameraAnchors.push(new THREE.Vector3(node.position.x + 0.35, node.position.y, node.position.z));
    }

    const rtspNode = new THREE.Mesh(
      new THREE.BoxGeometry(2.3, 1.3, 1.1),
      new THREE.MeshStandardMaterial({
        color: 0x12213b,
        emissive: 0x253f6d,
        emissiveIntensity: 0.4,
        roughness: 0.46,
        metalness: 0.38,
      }),
    );
    rtspNode.position.set(-8.2, -0.2, 0);
    scene.add(rtspNode);
    stageNodes.stage0.push(rtspNode);

    const rtspLabel = createLabelSprite("RTSP Ingestion", "#9cc2ff");
    if (rtspLabel) {
      rtspLabel.position.set(-8.2, 1.1, 0.8);
      scene.add(rtspLabel);
    }

    const jetsonAnchors = [];
    const jetsonGeo = new THREE.BoxGeometry(1.6, 2.6, 1.2);

    for (let i = 0; i < 3; i += 1) {
      const rack = new THREE.Mesh(
        jetsonGeo,
        new THREE.MeshStandardMaterial({
          color: 0x111d34,
          emissive: 0x1e3357,
          emissiveIntensity: 0.46,
          roughness: 0.48,
          metalness: 0.44,
        }),
      );
      rack.position.set(-3.9 + i * 2.2, -0.1 + (i % 2) * 0.18, -0.2 + (i % 2) * 0.25);
      scene.add(rack);
      stageNodes.stage1.push(rack);
      jetsonAnchors.push(new THREE.Vector3(rack.position.x, rack.position.y + 0.5, rack.position.z + 0.8));

      for (let s = 0; s < 4; s += 1) {
        const slot = new THREE.Mesh(
          new THREE.BoxGeometry(1.18, 0.16, 0.08),
          new THREE.MeshStandardMaterial({
            color: 0x2b4a15,
            emissive: 0x76b900,
            emissiveIntensity: 0.5,
            roughness: 0.32,
            metalness: 0.2,
            transparent: true,
            opacity: 0.84,
          }),
        );
        slot.position.set(rack.position.x, rack.position.y + 0.9 - s * 0.5, rack.position.z + 0.66);
        scene.add(slot);
        stageNodes.stage1.push(slot);
      }
    }

    const jetsonLabel = createLabelSprite("Jetson Edge AI Node", "#b8df6a");
    if (jetsonLabel) {
      jetsonLabel.position.set(-1.8, 2.1, 1.2);
      scene.add(jetsonLabel);
    }

    const gpuCluster = new THREE.Mesh(
      new THREE.BoxGeometry(4.4, 3.6, 1.6),
      new THREE.MeshStandardMaterial({
        color: 0x122539,
        emissive: 0x2e5b2c,
        emissiveIntensity: 0.5,
        roughness: 0.4,
        metalness: 0.34,
      }),
    );
    gpuCluster.position.set(3.7, 0.1, -0.1);
    scene.add(gpuCluster);
    stageNodes.stage2.push(gpuCluster);

    for (let i = 0; i < 7; i += 1) {
      const line = new THREE.Mesh(
        new THREE.BoxGeometry(3.4, 0.08, 0.06),
        new THREE.MeshStandardMaterial({
          color: 0x76b900,
          emissive: 0x76b900,
          emissiveIntensity: 0.56,
          transparent: true,
          opacity: 0.72,
          roughness: 0.2,
          metalness: 0.1,
        }),
      );
      line.position.set(3.7, 1.2 - i * 0.36, 0.82);
      scene.add(line);
      stageNodes.stage2.push(line);
    }

    const deepstreamLabel = createLabelSprite("DeepStream Multi-Stream Pipeline", "#8fd11f");
    if (deepstreamLabel) {
      deepstreamLabel.position.set(3.7, 2.4, 1.2);
      scene.add(deepstreamLabel);
    }

    const tensorLabel = createLabelSprite("TensorRT Optimized Inference", "#d7f0a6");
    if (tensorLabel) {
      tensorLabel.position.set(3.7, 1.7, 1.2);
      scene.add(tensorLabel);
    }

    const eventNode = new THREE.Mesh(
      new THREE.CylinderGeometry(0.9, 0.9, 1.2, 14),
      new THREE.MeshStandardMaterial({
        color: 0x1a2538,
        emissive: 0x2d496f,
        emissiveIntensity: 0.42,
        roughness: 0.5,
        metalness: 0.24,
      }),
    );
    eventNode.position.set(8.4, 0.2, 0.2);
    scene.add(eventNode);
    stageNodes.stage3.push(eventNode);

    const eventLabel = createLabelSprite("Edge Event Engine", "#a9d85e");
    if (eventLabel) {
      eventLabel.position.set(8.4, 1.55, 0.9);
      scene.add(eventLabel);
    }

    const dashboard = new THREE.Mesh(
      new THREE.PlaneGeometry(3.3, 2.4),
      new THREE.MeshStandardMaterial({
        color: 0x0f1e33,
        emissive: 0x264a7f,
        emissiveIntensity: 0.48,
        roughness: 0.44,
        metalness: 0.1,
        side: THREE.DoubleSide,
      }),
    );
    dashboard.position.set(12.6, 0.7, 0.4);
    dashboard.rotation.y = -0.2;
    scene.add(dashboard);
    stageNodes.stage4.push(dashboard);

    for (let i = 0; i < 4; i += 1) {
      const uiLine = new THREE.Mesh(
        new THREE.BoxGeometry(2.2 - (i % 2) * 0.5, 0.07, 0.04),
        new THREE.MeshBasicMaterial({ color: i % 2 === 0 ? 0x76b900 : 0x6e9dd9, transparent: true, opacity: 0.78 }),
      );
      uiLine.position.set(12.2 + (i % 2) * 0.12, 1.45 - i * 0.48, 0.42);
      uiLine.rotation.y = -0.2;
      scene.add(uiLine);
      stageNodes.stage4.push(uiLine);
    }

    const dashboardLabel = createLabelSprite("Operations Dashboard", "#bdd8ff");
    if (dashboardLabel) {
      dashboardLabel.position.set(12.2, 2.15, 0.9);
      scene.add(dashboardLabel);
    }

    const connections = [];

    const rtspAnchor = rtspNode.position.clone().add(new THREE.Vector3(1.2, 0.12, 0.28));
    const rtspInputAnchor = rtspNode.position.clone().add(new THREE.Vector3(-1.2, 0.12, 0.28));

    cameraAnchors.forEach((anchor, index) => {
      const flow = createCurveLine(anchor, rtspInputAnchor, 0.4 + (index % 2) * 0.12, 0x5f8fd2, 0.3);
      scene.add(flow.line);
      connections.push({ ...flow, stage: 0 });
    });

    jetsonAnchors.forEach((anchor) => {
      const flow = createCurveLine(rtspAnchor, anchor, 0.6, 0x76b900, 0.34);
      scene.add(flow.line);
      connections.push({ ...flow, stage: 1 });
    });

    const gpuInputAnchor = gpuCluster.position.clone().add(new THREE.Vector3(-2.2, 0.2, 0.5));
    jetsonAnchors.forEach((anchor, index) => {
      const flow = createCurveLine(anchor, gpuInputAnchor, 0.44 + index * 0.1, 0x76b900, 0.36);
      scene.add(flow.line);
      connections.push({ ...flow, stage: 2 });
    });

    const gpuOutputAnchor = gpuCluster.position.clone().add(new THREE.Vector3(2.2, 0.15, 0.5));
    const eventAnchor = eventNode.position.clone().add(new THREE.Vector3(-0.9, 0.1, 0.2));
    const eventFlow = createCurveLine(gpuOutputAnchor, eventAnchor, 0.45, 0x9edb43, 0.44);
    scene.add(eventFlow.line);
    connections.push({ ...eventFlow, stage: 3 });

    const dashboardAnchor = dashboard.position.clone().add(new THREE.Vector3(-1.6, -0.1, 0.2));
    const dashFlow = createCurveLine(eventNode.position.clone().add(new THREE.Vector3(0.9, 0.1, 0.2)), dashboardAnchor, 0.34, 0x88c834, 0.5);
    scene.add(dashFlow.line);
    connections.push({ ...dashFlow, stage: 4 });

    const particleCloud = createParticleCloud(connections, reducedMotion ? 8 : 16);

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(particleCloud.positions, 3));
    particleGeometry.setAttribute("color", new THREE.BufferAttribute(particleCloud.colors, 3));

    const particles = new THREE.Points(
      particleGeometry,
      new THREE.PointsMaterial({
        size: reducedMotion ? 0.08 : 0.11,
        vertexColors: true,
        transparent: true,
        opacity: 0.9,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    );
    scene.add(particles);

    const samplePoint = new THREE.Vector3();
    const clock = new THREE.Clock();

    const updateStageFromScroll = () => {
      const bounds = shell.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      const raw = (viewport - bounds.top) / (viewport + bounds.height * 0.55);
      const progress = clamp(raw, 0, 0.9999);
      const nextStage = clamp(Math.floor(progress * STAGE_COUNT), 0, STAGE_COUNT - 1);

      stageRef.current = nextStage;
      setActiveStage((prev) => (prev === nextStage ? prev : nextStage));
    };

    const updateStageLighting = (time) => {
      const currentStage = stageRef.current;

      const applyIntensity = (nodes, isActive, base, boost) => {
        nodes.forEach((mesh, index) => {
          const material = mesh.material;
          if (!material || !("emissiveIntensity" in material)) return;

          const pulse = 0.9 + Math.sin(time * 2.4 + index * 0.55) * 0.16;
          material.emissiveIntensity = isActive ? boost * pulse : base;
        });
      };

      applyIntensity(stageNodes.stage0, currentStage >= 0, 0.32, 0.72);
      applyIntensity(stageNodes.stage1, currentStage >= 1, 0.36, 0.82);
      applyIntensity(stageNodes.stage2, currentStage >= 2, 0.38, 0.92);
      applyIntensity(stageNodes.stage3, currentStage >= 3, 0.34, 0.86);
      applyIntensity(stageNodes.stage4, currentStage >= 4, 0.3, 0.9);

      connections.forEach((conn) => {
        const enabled = currentStage >= conn.stage;
        conn.line.material.opacity = enabled ? 0.62 : 0.12;
      });
    };

    const updateParticles = (elapsed) => {
      for (let i = 0; i < particleCloud.count; i += 1) {
        const connIndex = particleCloud.connectionIndex[i];
        const conn = connections[connIndex];
        const enabled = stageRef.current >= conn.stage;

        const speed = particleCloud.speeds[i] * (enabled ? 1 : 0.15);
        particleCloud.offsets[i] = (particleCloud.offsets[i] + speed) % 1;

        conn.curve.getPointAt(particleCloud.offsets[i], samplePoint);

        particleCloud.positions[i * 3] = samplePoint.x;
        particleCloud.positions[i * 3 + 1] = samplePoint.y;
        particleCloud.positions[i * 3 + 2] = samplePoint.z;

        const glow = enabled ? 0.62 + Math.sin(elapsed * 6 + i * 0.13) * 0.25 : 0.16;
        particleCloud.colors[i * 3] = 0.45;
        particleCloud.colors[i * 3 + 1] = enabled ? clamp(glow, 0.22, 1.0) : 0.28;
        particleCloud.colors[i * 3 + 2] = enabled ? 0.1 : 0.4;
      }

      particleGeometry.attributes.position.needsUpdate = true;
      particleGeometry.attributes.color.needsUpdate = true;
    };

    const updateCameraDrift = (elapsed) => {
      const x = Math.sin(elapsed * 0.16) * 1.15;
      const y = 4.4 + Math.cos(elapsed * 0.21) * 0.32;
      camera.position.x = x;
      camera.position.y = y;
      camera.lookAt(0.6, 0.25, 0);
    };

    const resize = () => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      if (!width || !height) return;

      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, reducedMotion ? 1.2 : 1.7));
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const renderFrame = () => {
      updateStageFromScroll();
      const elapsed = clock.getElapsedTime();
      updateStageLighting(elapsed);
      updateParticles(elapsed);
      updateCameraDrift(elapsed);
      renderer.render(scene, camera);
    };

    let rafId = 0;
    let running = false;

    const tick = () => {
      if (!running) return;
      if (!inViewRef.current || document.hidden) {
        running = false;
        return;
      }

      renderFrame();
      rafId = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running || reducedMotion || !allowAnimation) return;
      running = true;
      rafId = requestAnimationFrame(tick);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(rafId);
    };

    resize();
    renderFrame();

    const onVisibility = () => {
      if (document.hidden) {
        stop();
      } else if (inViewRef.current && allowAnimation && !reducedMotion) {
        start();
      }
    };

    const onScroll = () => {
      if (!allowAnimation || reducedMotion || !inViewRef.current) {
        renderFrame();
      }
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);

    if (allowAnimation && !reducedMotion) {
      start();
    }

    runtimeRef.current = {
      start,
      stop,
      renderFrame,
      cleanup: () => {
        stop();
        resizeObserver.disconnect();
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", resize);
        document.removeEventListener("visibilitychange", onVisibility);

        scene.traverse((obj) => {
          const mesh = obj;

          if (mesh.geometry) {
            mesh.geometry.dispose();
          }

          const material = mesh.material;
          if (Array.isArray(material)) {
            material.forEach((mat) => {
              if (mat.map) mat.map.dispose();
              mat.dispose();
            });
          } else if (material) {
            if (material.map) material.map.dispose();
            material.dispose();
          }
        });

        renderer.dispose();
        if (mount.contains(renderer.domElement)) {
          mount.removeChild(renderer.domElement);
        }
      },
    };

    return () => {
      runtimeRef.current?.cleanup();
      runtimeRef.current = null;
    };
  }, [allowAnimation, fallback, isInView, reducedMotion]);

  useEffect(() => {
    const runtime = runtimeRef.current;
    if (!runtime) return;

    if (isInView && allowAnimation && !reducedMotion) {
      runtime.start();
    } else {
      runtime.stop();
      runtime.renderFrame();
    }
  }, [allowAnimation, isInView, reducedMotion]);

  useEffect(() => {
    return () => {
      runtimeRef.current?.cleanup();
      runtimeRef.current = null;
    };
  }, []);

  if (fallback) {
    return React.createElement(ArchitectureFallback, null);
  }

  return React.createElement(
    "div",
    { className: `edge-infra-shell ${className}`.trim(), ref: shellRef },
    React.createElement("div", {
      ref: mountRef,
      className: "edge-infra-canvas",
      role: "img",
      "aria-label": "EdgeVision platform infrastructure visualization",
    }),
    React.createElement(
      "div",
      { className: "edge-infra-overlay" },
      React.createElement("p", { className: "edge-infra-title" }, "Platform Architecture Stage"),
      React.createElement("p", { className: "edge-infra-stage" }, STAGE_LABELS[activeStage]),
    ),
  );
}
