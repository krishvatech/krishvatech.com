import React from "react";
import { GPUDataPipeline } from "./pipeline/GPUDataPipeline";

export const ArchitectureDiagram = ({ steps = [], className = "" }) => (
  <GPUDataPipeline stages={steps} className={className} />
);
