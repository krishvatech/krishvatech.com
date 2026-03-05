import React from "react";
import { motion } from "framer-motion";
import { Camera, Cloud, Cpu, Gauge, Network, Workflow } from "lucide-react";

const iconByName = {
  camera: Camera,
  rtsp: Network,
  jetson: Cpu,
  deepstream: Workflow,
  event: Workflow,
  tensorrt: Gauge,
  dashboard: Cloud,
};

const findIcon = (label) => {
  const key = label.toLowerCase();
  if (key.includes("camera")) return iconByName.camera;
  if (key.includes("rtsp") || key.includes("ingestion")) return iconByName.rtsp;
  if (key.includes("deepstream")) return iconByName.deepstream;
  if (key.includes("event")) return iconByName.event;
  if (key.includes("tensorrt") || key.includes("inference")) return iconByName.tensorrt;
  if (key.includes("dashboard") || key.includes("operations")) return iconByName.dashboard;
  if (key.includes("jetson") || key.includes("edge")) return iconByName.jetson;
  return iconByName.dashboard;
};

export const ArchitectureDiagram = ({ steps = [], className = "" }) => (
  <div className={`arch-diagram ${className}`}>
    {steps.map((step, index) => {
      const Icon = findIcon(step);
      return (
        <React.Fragment key={step}>
          <motion.div
            className="arch-node"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.35, delay: index * 0.04, ease: "easeOut" }}
          >
            <span className="arch-node-icon"><Icon size={15} /></span>
            <span>{step}</span>
          </motion.div>
          {index < steps.length - 1 ? (
            <div className="arch-link" aria-hidden>
              <span className="arch-link-line" />
              <span className="arch-link-pulse" />
            </div>
          ) : null}
        </React.Fragment>
      );
    })}
  </div>
);
