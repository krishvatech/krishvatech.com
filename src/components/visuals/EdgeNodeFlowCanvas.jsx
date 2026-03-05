import React, { useEffect, useRef, useState } from "react";
import { useMotionPreferences } from "../../animations/useMotionPreferences";

const lerpPoint = (from, to, t) => ({
  x: from.x + (to.x - from.x) * t,
  y: from.y + (to.y - from.y) * t,
});

const curvePoint = (from, control, to, t) => {
  const p0 = lerpPoint(from, control, t);
  const p1 = lerpPoint(control, to, t);
  return lerpPoint(p0, p1, t);
};

const curvePath = (ctx, from, control, to) => {
  ctx.beginPath();
  ctx.moveTo(from.x, from.y);
  ctx.quadraticCurveTo(control.x, control.y, to.x, to.y);
  ctx.stroke();
};

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

const STAGE_SEQUENCE = ["rtsp", "jetson", "deepstream", "tensorrt", "event", "dashboard"];

const TOOLTIP_COPY = {
  camera_1: { title: "Camera Stream", text: "RTSP Stream Ingest" },
  camera_2: { title: "Camera Stream", text: "RTSP Stream Ingest" },
  camera_3: { title: "Camera Stream", text: "RTSP Stream Ingest" },
  camera_4: { title: "Camera Stream", text: "RTSP Stream Ingest" },
  camera_5: { title: "Camera Stream", text: "RTSP Stream Ingest" },
  camera_6: { title: "Camera Stream", text: "RTSP Stream Ingest" },
  rtsp: { title: "RTSP Ingestion", text: "Ingress gateway normalizes and stabilizes camera streams." },
  jetson_1: { title: "Jetson Edge Node", text: "Jetson devices perform real-time GPU accelerated inference directly at the edge." },
  jetson_2: { title: "Jetson Edge Node", text: "Jetson devices perform real-time GPU accelerated inference directly at the edge." },
  jetson_3: { title: "Jetson Edge Node", text: "Jetson devices perform real-time GPU accelerated inference directly at the edge." },
  deepstream: { title: "DeepStream Pipeline", text: "DeepStream processes multiple camera streams simultaneously using optimized GPU pipelines." },
  tensorrt: { title: "TensorRT Inference", text: "TensorRT optimizes deep learning models for high-performance GPU inference." },
  event: { title: "Edge Event Engine", text: "Rule evaluation converts detections into operational events and alerts." },
  dashboard: { title: "Operations Dashboard", text: "Edge-to-cloud metadata powers monitoring timelines and alert workflows." },
};

const buildNodeMap = (width, height) => {
  const cameraY = [0.18, 0.3, 0.42, 0.58, 0.7, 0.82];
  const nodes = [];

  cameraY.forEach((value, index) => {
    nodes.push({
      id: `camera_${index + 1}`,
      stage: "camera",
      x: width * 0.08,
      y: height * value,
      radius: 7,
    });
  });

  nodes.push({ id: "rtsp", stage: "rtsp", x: width * 0.24, y: height * 0.5, radius: 12 });
  nodes.push({ id: "jetson_1", stage: "jetson", x: width * 0.43, y: height * 0.34, radius: 11 });
  nodes.push({ id: "jetson_2", stage: "jetson", x: width * 0.43, y: height * 0.5, radius: 13 });
  nodes.push({ id: "jetson_3", stage: "jetson", x: width * 0.43, y: height * 0.66, radius: 11 });
  nodes.push({ id: "deepstream", stage: "deepstream", x: width * 0.62, y: height * 0.42, radius: 13 });
  nodes.push({ id: "tensorrt", stage: "tensorrt", x: width * 0.72, y: height * 0.58, radius: 13 });
  nodes.push({ id: "event", stage: "event", x: width * 0.82, y: height * 0.46, radius: 12 });
  nodes.push({ id: "dashboard", stage: "dashboard", x: width * 0.93, y: height * 0.5, radius: 14 });

  const byId = nodes.reduce((acc, node) => {
    acc[node.id] = node;
    return acc;
  }, {});

  const links = [];

  nodes
    .filter((node) => node.stage === "camera")
    .forEach((cameraNode) => {
      links.push({
        from: cameraNode.id,
        to: "rtsp",
        control: { x: width * 0.16, y: (cameraNode.y + height * 0.5) / 2 },
      });
    });

  ["jetson_1", "jetson_2", "jetson_3"].forEach((id) => {
    const target = byId[id];
    links.push({
      from: "rtsp",
      to: id,
      control: { x: width * 0.33, y: target.y },
    });

    links.push({
      from: id,
      to: "deepstream",
      control: { x: width * 0.53, y: (target.y + byId.deepstream.y) / 2 - 16 },
    });
  });

  links.push({
    from: "deepstream",
    to: "tensorrt",
    control: { x: width * 0.67, y: height * 0.52 },
  });
  links.push({
    from: "tensorrt",
    to: "event",
    control: { x: width * 0.77, y: height * 0.48 },
  });
  links.push({
    from: "event",
    to: "dashboard",
    control: { x: width * 0.88, y: height * 0.42 },
  });

  return { nodes, byId, links };
};

const initParticles = (links, countPerLink) => {
  const particles = [];
  links.forEach((_, linkIndex) => {
    for (let i = 0; i < countPerLink; i += 1) {
      particles.push({
        linkIndex,
        offset: Math.random(),
        speed: 0.0028 + Math.random() * 0.0032,
        radius: 1.6 + Math.random() * 1.8,
      });
    }
  });
  return particles;
};

export function EdgeNodeFlowCanvas({ className = "" }) {
  const rootRef = useRef(null);
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const nodeMapRef = useRef(null);
  const stageProgressRef = useRef(0);
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, title: "", text: "" });
  const [inView, setInView] = useState(false);
  const { allowAnimation, allowAdvancedMotion, reducedMotion } = useMotionPreferences();

  const shouldAnimate = allowAnimation && !reducedMotion;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.15 },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return undefined;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return undefined;

    let width = 0;
    let height = 0;
    let frame = 0;
    let raf = 0;

    const resize = () => {
      const rect = root.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, allowAdvancedMotion ? 1.8 : 1.2);
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

      nodeMapRef.current = buildNodeMap(width, height);
      particlesRef.current = initParticles(nodeMapRef.current.links, allowAdvancedMotion ? 8 : 4);
    };

    const updateScrollProgress = () => {
      const rect = root.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      const raw = (viewport - rect.top) / (viewport + rect.height);
      stageProgressRef.current = clamp(raw, 0, 1);
    };

    const draw = () => {
      const map = nodeMapRef.current;
      if (!map) return;

      frame += 1;
      ctx.clearRect(0, 0, width, height);

      const ambient = ctx.createRadialGradient(width * 0.45, height * 0.44, 30, width * 0.45, height * 0.44, width * 0.5);
      ambient.addColorStop(0, "rgba(118,185,0,0.12)");
      ambient.addColorStop(1, "rgba(118,185,0,0)");
      ctx.fillStyle = ambient;
      ctx.fillRect(0, 0, width, height);

      const activeStage = Math.min(
        STAGE_SEQUENCE.length - 1,
        Math.floor(stageProgressRef.current * STAGE_SEQUENCE.length),
      );

      map.links.forEach((link) => {
        const from = map.byId[link.from];
        const to = map.byId[link.to];
        const fromStage = STAGE_SEQUENCE.indexOf(from.stage);
        const toStage = STAGE_SEQUENCE.indexOf(to.stage);
        const isActive = toStage <= activeStage || fromStage <= activeStage;
        ctx.strokeStyle = isActive ? "rgba(118,185,0,0.58)" : "rgba(109,138,192,0.36)";
        ctx.lineWidth = isActive ? 1.8 : 1.2;
        curvePath(ctx, from, link.control, to);
      });

      if (shouldAnimate && inView) {
        particlesRef.current.forEach((particle) => {
          const link = map.links[particle.linkIndex];
          if (!link) return;

          const from = map.byId[link.from];
          const to = map.byId[link.to];
          const flowBoost = 0.55 + stageProgressRef.current * 0.85;

          particle.offset += particle.speed * flowBoost;
          if (particle.offset >= 1) particle.offset = 0;

          const point = curvePoint(from, link.control, to, particle.offset);
          const alpha = 0.35 + Math.sin((particle.offset + frame * 0.01) * Math.PI) * 0.5;
          ctx.fillStyle = `rgba(118,185,0,${alpha})`;
          ctx.beginPath();
          ctx.arc(point.x, point.y, particle.radius, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      map.nodes.forEach((node) => {
        const stageIndex = STAGE_SEQUENCE.indexOf(node.stage);
        const isActive = stageIndex !== -1 && stageIndex <= activeStage;

        ctx.beginPath();
        ctx.fillStyle = isActive ? "rgba(118,185,0,0.95)" : "rgba(142,170,220,0.88)";
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.strokeStyle = isActive ? "rgba(118,185,0,0.5)" : "rgba(142,170,220,0.3)";
        ctx.lineWidth = 6;
        ctx.arc(node.x, node.y, node.radius + 2.6 + Math.sin(frame * 0.02 + node.x * 0.01) * 0.8, 0, Math.PI * 2);
        ctx.stroke();
      });
    };

    const loop = () => {
      updateScrollProgress();
      draw();
      raf = requestAnimationFrame(loop);
    };

    resize();
    updateScrollProgress();

    const onScroll = () => {
      if (!shouldAnimate) {
        updateScrollProgress();
        draw();
      }
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(root);
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });

    if (shouldAnimate) {
      loop();
    } else {
      draw();
    }

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  }, [allowAdvancedMotion, inView, shouldAnimate]);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return undefined;

    const onMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const map = nodeMapRef.current;
      if (!map) return;

      const hitNode = map.nodes.find((node) => {
        const dx = x - node.x;
        const dy = y - node.y;
        return Math.sqrt(dx * dx + dy * dy) <= node.radius + 8;
      });

      if (!hitNode) {
        setTooltip((prev) => (prev.visible ? { visible: false, x: 0, y: 0, title: "", text: "" } : prev));
        canvas.style.cursor = "default";
        return;
      }

      const copy = TOOLTIP_COPY[hitNode.id];
      if (!copy) return;

      canvas.style.cursor = "pointer";
      setTooltip({
        visible: true,
        x: clamp(x + 14, 10, rect.width - 280),
        y: clamp(y + 12, 10, rect.height - 100),
        title: copy.title,
        text: copy.text,
      });
    };

    const onLeave = () => {
      canvas.style.cursor = "default";
      setTooltip({ visible: false, x: 0, y: 0, title: "", text: "" });
    };

    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);

    return () => {
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div className={`edge-node-flow-shell ${className}`.trim()} ref={rootRef}>
      <canvas className="edge-node-flow-canvas" ref={canvasRef} aria-label="Interactive edge node architecture flow" role="img" />
      {tooltip.visible ? (
        <div className="edge-node-flow-tooltip" style={{ left: tooltip.x, top: tooltip.y }}>
          <p className="edge-node-flow-tooltip-title">{tooltip.title}</p>
          <p className="edge-node-flow-tooltip-text">{tooltip.text}</p>
        </div>
      ) : null}
      <div className="edge-node-flow-legend" aria-hidden="true">
        Scroll to progress from ingest to dashboard
      </div>
    </div>
  );
}

export default EdgeNodeFlowCanvas;
