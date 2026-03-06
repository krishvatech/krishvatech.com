import React from "react";

const defaultArchitectureSteps = [
  "Camera Streams",
  "RTSP Ingestion",
  "Jetson Edge AI Node",
  "DeepStream Multi-Stream Pipeline",
  "TensorRT GPU Inference",
  "Edge Event Engine",
  "Operations Dashboard",
];

export const ArchitectureDiagram = ({ steps = defaultArchitectureSteps, className = "" }) => {
  const safeSteps = (steps || []).filter(Boolean);

  return (
    <div className={`architecture-preview ${className}`.trim()} role="list" aria-label="Platform architecture preview">
      {safeSteps.map((step, index) => (
        <React.Fragment key={step}>
          <div
            className={`arch-node ${step.toLowerCase().includes("tensorrt") ? "tensor-node" : ""}`.trim()}
            role="listitem"
          >
            {step}
          </div>
          {index < safeSteps.length - 1 ? <div className="arch-arrow" aria-hidden="true">↓</div> : null}
        </React.Fragment>
      ))}
    </div>
  );
};
