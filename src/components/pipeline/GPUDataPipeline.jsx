import React, { useEffect, useMemo, useRef, useState } from "react";
import { Activity, Camera, Cloud, Cpu, Gauge, Network, Workflow } from "lucide-react";
import { useMotionPreferences } from "../../animations/useMotionPreferences";

const iconByName = {
  camera: Camera,
  rtsp: Network,
  jetson: Cpu,
  deepstream: Workflow,
  event: Activity,
  tensorrt: Gauge,
  dashboard: Cloud,
};

const resolveIcon = (label) => {
  const key = label.toLowerCase();
  if (key.includes("camera")) return iconByName.camera;
  if (key.includes("rtsp") || key.includes("ingestion")) return iconByName.rtsp;
  if (key.includes("jetson") || key.includes("edge node")) return iconByName.jetson;
  if (key.includes("deepstream")) return iconByName.deepstream;
  if (key.includes("tensorrt") || key.includes("inference")) return iconByName.tensorrt;
  if (key.includes("event")) return iconByName.event;
  if (key.includes("dashboard")) return iconByName.dashboard;
  return Activity;
};

const createFlowParticles = (links, density = 9) => {
  const particles = [];
  links.forEach((_, linkIndex) => {
    for (let i = 0; i < density; i += 1) {
      particles.push({
        linkIndex,
        progress: Math.random(),
        speed: 0.0035 + Math.random() * 0.004,
        radius: 1.2 + Math.random() * 1.8,
      });
    }
  });
  return particles;
};

const getNodeAnchors = (container, canvas) => {
  const containerRect = container.getBoundingClientRect();
  const canvasRect = canvas.getBoundingClientRect();
  const nodes = Array.from(container.querySelectorAll("[data-pipeline-node='true']"));

  return nodes.map((node) => {
    const rect = node.getBoundingClientRect();
    return {
      x: rect.left - containerRect.left + rect.width / 2,
      y: rect.top - canvasRect.top + rect.height / 2,
    };
  });
};

export function GPUDataPipeline({ stages = [], className = "" }) {
  const shellRef = useRef(null);
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const anchorsRef = useRef([]);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const { allowAnimation, allowAdvancedMotion, reducedMotion } = useMotionPreferences();

  const safeStages = useMemo(() => stages.filter(Boolean), [stages]);

  useEffect(() => {
    if (!allowAnimation || reducedMotion || safeStages.length < 2) return undefined;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % safeStages.length);
    }, 1100);
    return () => clearInterval(timer);
  }, [allowAnimation, reducedMotion, safeStages.length]);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    const shell = shellRef.current;
    const canvas = canvasRef.current;
    if (!shell || !canvas || safeStages.length < 2) return undefined;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return undefined;

    let width = 0;
    let height = 0;
    let raf = 0;
    let links = [];

    const updateSize = () => {
      const rect = shell.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, allowAdvancedMotion ? 1.6 : 1.2);
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

      const anchors = getNodeAnchors(shell, canvas);
      anchorsRef.current = anchors;
      links = [];
      for (let i = 0; i < anchors.length - 1; i += 1) {
        links.push({ from: anchors[i], to: anchors[i + 1] });
      }
      particlesRef.current = createFlowParticles(links, allowAdvancedMotion ? 11 : 5);
    };

    const drawStaticLinks = (time) => {
      ctx.lineWidth = 1.4;
      links.forEach((link, index) => {
        const gradient = ctx.createLinearGradient(link.from.x, link.from.y, link.to.x, link.to.y);
        const currentStage = activeIndexRef.current;
        const isActive = index === currentStage || index === Math.max(currentStage - 1, 0);
        gradient.addColorStop(0, "rgba(108,137,191,0.25)");
        gradient.addColorStop(0.5, isActive ? "rgba(118,185,0,0.68)" : "rgba(125,157,216,0.4)");
        gradient.addColorStop(1, "rgba(108,137,191,0.25)");

        ctx.strokeStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(link.from.x, link.from.y);
        ctx.lineTo(link.to.x, link.to.y);
        ctx.stroke();

        if (isActive) {
          const sweep = (time * 0.56 + index * 0.21) % 1;
          const px = link.from.x + (link.to.x - link.from.x) * sweep;
          const py = link.from.y + (link.to.y - link.from.y) * sweep;
          ctx.fillStyle = "rgba(118,185,0,0.88)";
          ctx.beginPath();
          ctx.arc(px, py, 2.2, 0, Math.PI * 2);
          ctx.fill();
        }
      });
    };

    const drawParticles = () => {
      particlesRef.current.forEach((particle) => {
        const link = links[particle.linkIndex];
        if (!link) return;

        particle.progress += particle.speed;
        if (particle.progress >= 1) {
          particle.progress = 0;
        }

        const x = link.from.x + (link.to.x - link.from.x) * particle.progress;
        const y = link.from.y + (link.to.y - link.from.y) * particle.progress;
        const alpha = 0.32 + Math.sin(particle.progress * Math.PI) * 0.55;

        ctx.fillStyle = `rgba(118,185,0,${alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, particle.radius, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const drawNodeAuras = (time) => {
      const anchors = anchorsRef.current;
      if (!anchors.length) return;
      const current = activeIndexRef.current;

      anchors.forEach((anchor, index) => {
        const nearActive = Math.abs(index - current) <= 1;
        const radius = nearActive ? 18 + Math.sin(time * 4 + index) * 3 : 10 + Math.sin(time * 2.6 + index) * 2;
        const alpha = nearActive ? 0.26 : 0.12;
        const gradient = ctx.createRadialGradient(anchor.x, anchor.y, 0, anchor.x, anchor.y, radius);
        gradient.addColorStop(0, `rgba(118,185,0,${alpha + 0.18})`);
        gradient.addColorStop(1, "rgba(118,185,0,0)");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(anchor.x, anchor.y, radius, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const render = () => {
      const time = performance.now() * 0.001;
      ctx.clearRect(0, 0, width, height);
      drawNodeAuras(time);
      drawStaticLinks(time);
      if (allowAnimation && !reducedMotion) {
        drawParticles();
      }
    };

    const animate = () => {
      render();
      raf = requestAnimationFrame(animate);
    };

    updateSize();

    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(shell);

    window.addEventListener("resize", updateSize);

    if (allowAnimation && !reducedMotion) {
      animate();
    } else {
      render();
    }

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateSize);
    };
  }, [allowAdvancedMotion, allowAnimation, reducedMotion, safeStages]);

  return (
    <div className={`gpu-pipeline-shell ${className}`.trim()} ref={shellRef}>
      <canvas className="gpu-pipeline-canvas" ref={canvasRef} aria-hidden="true" />
      <div className="gpu-pipeline-track" role="list" aria-label="GPU accelerated processing pipeline">
        {safeStages.map((stage, index) => {
          const Icon = resolveIcon(stage);
          const isActive = index === activeIndex;
          return (
            <article
              key={stage}
              className={`gpu-pipeline-node ${isActive ? "is-active" : ""}`}
              data-pipeline-node="true"
              role="listitem"
            >
              <span className="gpu-pipeline-node-icon">
                <Icon size={15} />
              </span>
              <span>{stage}</span>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export default GPUDataPipeline;
