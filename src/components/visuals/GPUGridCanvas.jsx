import React, { useEffect, useRef } from "react";
import { useMotionPreferences } from "../../animations/useMotionPreferences";
import { createParticlePool, drawParticlePool, tickParticlePool } from "../../utils/particles";

const NETWORK_NODES = [
  { u: 0.08, v: 0.16 },
  { u: 0.16, v: 0.5 },
  { u: 0.23, v: 0.78 },
  { u: 0.31, v: 0.34 },
  { u: 0.38, v: 0.62 },
  { u: 0.47, v: 0.23 },
  { u: 0.54, v: 0.51 },
  { u: 0.62, v: 0.74 },
  { u: 0.7, v: 0.32 },
  { u: 0.78, v: 0.58 },
  { u: 0.86, v: 0.2 },
  { u: 0.93, v: 0.72 },
];

const NETWORK_EDGES = [
  [0, 1],
  [1, 2],
  [0, 3],
  [3, 4],
  [3, 5],
  [4, 6],
  [5, 6],
  [6, 7],
  [6, 8],
  [8, 9],
  [8, 10],
  [9, 11],
];

const drawGrid = (ctx, width, height, offset, opacity = 0.22, size = 52) => {
  ctx.save();
  ctx.strokeStyle = `rgba(124, 152, 205, ${opacity})`;
  ctx.lineWidth = 1;

  for (let x = -size; x < width + size; x += size) {
    const px = Math.round(x + offset.x);
    ctx.beginPath();
    ctx.moveTo(px, 0);
    ctx.lineTo(px, height);
    ctx.stroke();
  }

  for (let y = -size; y < height + size; y += size) {
    const py = Math.round(y + offset.y);
    ctx.beginPath();
    ctx.moveTo(0, py);
    ctx.lineTo(width, py);
    ctx.stroke();
  }

  ctx.restore();
};

const drawAmbient = (ctx, width, height, pointer) => {
  const leftCx = width * (0.14 + pointer.x * 0.015);
  const leftCy = height * (0.16 + pointer.y * 0.02);
  const rightCx = width * (0.84 - pointer.x * 0.013);
  const rightCy = height * (0.22 - pointer.y * 0.015);

  const left = ctx.createRadialGradient(leftCx, leftCy, 20, leftCx, leftCy, width * 0.46);
  left.addColorStop(0, "rgba(118,185,0,0.22)");
  left.addColorStop(1, "rgba(118,185,0,0)");

  const right = ctx.createRadialGradient(rightCx, rightCy, 20, rightCx, rightCy, width * 0.38);
  right.addColorStop(0, "rgba(72,122,205,0.2)");
  right.addColorStop(1, "rgba(72,122,205,0)");

  ctx.fillStyle = left;
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = right;
  ctx.fillRect(0, 0, width, height);
};

const drawNetworkMesh = (ctx, width, height, time, pointer, allowAdvancedMotion) => {
  const positions = NETWORK_NODES.map((node, index) => {
    const phase = time * 0.42 + index * 0.32;
    const drift = allowAdvancedMotion ? Math.sin(phase) * 4 : 0;
    return {
      x: node.u * width + pointer.x * (node.u - 0.5) * 16 + drift,
      y: node.v * height + pointer.y * (node.v - 0.5) * 12 + (allowAdvancedMotion ? Math.cos(phase * 0.8) * 2 : 0),
    };
  });

  NETWORK_EDGES.forEach((edge, index) => {
    const from = positions[edge[0]];
    const to = positions[edge[1]];
    const signal = (Math.sin(time * 1.5 + index * 0.8) + 1) * 0.5;

    const gradient = ctx.createLinearGradient(from.x, from.y, to.x, to.y);
    gradient.addColorStop(0, "rgba(122, 154, 213, 0.18)");
    gradient.addColorStop(0.5, `rgba(118, 185, 0, ${0.22 + signal * 0.36})`);
    gradient.addColorStop(1, "rgba(122, 154, 213, 0.18)");
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();

    if (allowAdvancedMotion) {
      const pulseT = (time * 0.32 + index * 0.19) % 1;
      const px = from.x + (to.x - from.x) * pulseT;
      const py = from.y + (to.y - from.y) * pulseT;
      ctx.fillStyle = "rgba(164, 222, 68, 0.88)";
      ctx.beginPath();
      ctx.arc(px, py, 1.9, 0, Math.PI * 2);
      ctx.fill();
    }
  });

  positions.forEach((position, index) => {
    const pulse = 0.35 + (Math.sin(time * 2 + index * 0.7) + 1) * 0.3;
    ctx.fillStyle = `rgba(165, 223, 76, ${pulse})`;
    ctx.beginPath();
    ctx.arc(position.x, position.y, 2.1, 0, Math.PI * 2);
    ctx.fill();
  });
};

const drawVignette = (ctx, width, height) => {
  const vignette = ctx.createRadialGradient(width * 0.5, height * 0.42, width * 0.16, width * 0.5, height * 0.42, width * 0.7);
  vignette.addColorStop(0, "rgba(8, 12, 20, 0)");
  vignette.addColorStop(1, "rgba(8, 12, 20, 0.56)");
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, width, height);
};

export function GPUGridCanvas({ className = "" }) {
  const canvasRef = useRef(null);
  const { allowAnimation, allowAdvancedMotion, reducedMotion, lowPower } = useMotionPreferences();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return undefined;

    let frame = 0;
    let raf = 0;
    let width = 0;
    let height = 0;
    let particles = [];
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };

    const setup = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, lowPower ? 1.25 : 1.7);
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

      const particleCount = allowAdvancedMotion ? 40 : 18;
      particles = createParticlePool({
        count: particleCount,
        width,
        height,
        speedRange: allowAdvancedMotion ? 0.22 : 0.11,
        radiusRange: allowAdvancedMotion ? { min: 0.8, max: 2.3 } : { min: 0.8, max: 1.6 },
        color: "rgba(164, 222, 68, 0.92)",
      });
    };

    setup();

    const render = () => {
      frame += allowAdvancedMotion ? 1 : 0.5;
      pointer.x += (pointer.tx - pointer.x) * 0.045;
      pointer.y += (pointer.ty - pointer.y) * 0.045;
      ctx.clearRect(0, 0, width, height);

      drawAmbient(ctx, width, height, pointer);

      const baseOffset = (frame * 0.12) % 52;
      drawGrid(ctx, width, height, { x: baseOffset + pointer.x * 6, y: baseOffset * 0.72 + pointer.y * 4 }, 0.11, 52);
      drawGrid(
        ctx,
        width,
        height,
        { x: (-baseOffset * 0.6) % 96 - pointer.x * 4, y: (-baseOffset * 0.45) % 96 - pointer.y * 3 },
        0.06,
        96,
      );

      drawNetworkMesh(ctx, width, height, frame * 0.016, pointer, allowAdvancedMotion);

      tickParticlePool(particles, { width, height }, 1);
      drawParticlePool(ctx, particles);
      drawVignette(ctx, width, height);
    };

    const loop = () => {
      render();
      raf = requestAnimationFrame(loop);
    };

    const onResize = () => {
      setup();
    };

    const onPointerMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      pointer.tx = Math.max(-1, Math.min(1, nx));
      pointer.ty = Math.max(-1, Math.min(1, ny));
    };

    const onPointerLeave = () => {
      pointer.tx = 0;
      pointer.ty = 0;
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerleave", onPointerLeave);

    if (allowAnimation && !reducedMotion) {
      loop();
    } else {
      render();
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [allowAdvancedMotion, allowAnimation, lowPower, reducedMotion]);

  return <canvas className={`gpu-grid-canvas ${className}`.trim()} ref={canvasRef} aria-hidden="true" />;
}

export default GPUGridCanvas;
