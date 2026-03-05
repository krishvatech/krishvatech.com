import React from "react";
import GPUGridCanvas from "./visuals/GPUGridCanvas";

const nodes = [
  { left: "8%", top: "14%", delay: "0s" },
  { left: "18%", top: "72%", delay: "1.2s" },
  { left: "31%", top: "35%", delay: "2.1s" },
  { left: "47%", top: "62%", delay: "0.6s" },
  { left: "58%", top: "20%", delay: "1.8s" },
  { left: "72%", top: "49%", delay: "2.8s" },
  { left: "86%", top: "28%", delay: "0.9s" },
  { left: "92%", top: "78%", delay: "2.4s" },
];

export const AnimatedGpuBackground = ({ className = "" }) => (
  <div className={`gpu-bg ${className}`} aria-hidden>
    <GPUGridCanvas />
    <div className="gpu-grid-layer" />
    <div className="gpu-grid-layer depth" />
    <div className="gpu-ambient gpu-ambient-green" />
    <div className="gpu-ambient gpu-ambient-blue" />
    {nodes.map((node, index) => (
      <span
        key={index}
        className="gpu-node"
        style={{ left: node.left, top: node.top, animationDelay: node.delay }}
      />
    ))}
  </div>
);
