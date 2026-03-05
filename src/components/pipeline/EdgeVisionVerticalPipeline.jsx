import React, { useEffect, useMemo, useState } from "react";
import { Activity, Camera, Cloud, Cpu, Gauge, Network, Workflow } from "lucide-react";

const stageMeta = [
  {
    id: "camera",
    title: "Camera Streams",
    description: "Industrial multi-camera inputs from lines, aisles, and safety zones.",
    Icon: Camera,
  },
  {
    id: "gateway",
    title: "RTSP Ingestion Gateway",
    description: "RTSP session management, stream normalization, and frame buffering.",
    Icon: Network,
  },
  {
    id: "cluster",
    title: "Edge Compute Cluster",
    description: "Distributed Jetson nodes running edge AI runtime workloads.",
    Icon: Cpu,
  },
  {
    id: "inference",
    title: "GPU Inference Engine",
    description: "DeepStream + TensorRT accelerated inference and batching.",
    Icon: Workflow,
  },
  {
    id: "event",
    title: "Event Processing",
    description: "Policy evaluation, event scoring, and alert routing.",
    Icon: Activity,
  },
  {
    id: "dashboard",
    title: "Operations Dashboard",
    description: "Live operational telemetry, incidents, and event timelines.",
    Icon: Cloud,
  },
];

const clusterNodeLabels = [
  "Jetson Node A1",
  "Jetson Node A2",
  "Jetson Node A3",
  "Jetson Node B1",
  "Jetson Node B2",
  "Jetson Node B3",
];

const pickPulseNodes = () => {
  const indices = new Set();
  while (indices.size < 3) {
    indices.add(Math.floor(Math.random() * clusterNodeLabels.length));
  }
  return Array.from(indices);
};

const resolveStageList = (incomingStages) => {
  if (!incomingStages?.length) return stageMeta;
  const normalized = incomingStages.map((label) => label.toLowerCase());
  return stageMeta.filter((item) => normalized.some((entry) => entry.includes(item.id) || entry.includes(item.title.toLowerCase().split(" ")[0])));
};

export default function EdgeVisionVerticalPipeline({ stages = [], intervalMs = 2000 }) {
  const stageList = useMemo(() => resolveStageList(stages), [stages]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [pulseNodes, setPulseNodes] = useState([]);

  useEffect(() => {
    if (stageList.length < 2) return undefined;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % stageList.length);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [intervalMs, stageList.length]);

  useEffect(() => {
    const activeStage = stageList[activeIndex];
    if (!activeStage || activeStage.id !== "cluster") {
      setPulseNodes([]);
      return undefined;
    }

    const next = pickPulseNodes();
    setPulseNodes(next);
    const clear = setTimeout(() => setPulseNodes([]), 850);
    return () => clearTimeout(clear);
  }, [activeIndex, stageList]);

  return (
    <div className="edge-dc-sim" role="list" aria-label="EdgeVision data-center runtime architecture">
      {stageList.map((stage, index) => {
        const isActive = index === activeIndex;
        const isLast = index === stageList.length - 1;
        const StageIcon = stage.Icon || Gauge;

        return (
          <React.Fragment key={stage.id}>
            <section className="edge-dc-stage" role="listitem" aria-current={isActive ? "step" : undefined}>
              <p className="section-title">{stage.title}</p>

              {stage.id === "cluster" ? (
                <div className={`node-card edge-cluster-shell ${isActive ? "active-node" : ""}`}>
                  <p className="edge-dc-copy">{stage.description}</p>
                  <div className="edge-cluster">
                    {clusterNodeLabels.map((label, nodeIndex) => (
                      <div
                        key={label}
                        className={`edge-cluster-node ${pulseNodes.includes(nodeIndex) ? "pulse-node" : ""}`}
                      >
                        <Cpu size={14} />
                        <span>{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <article className={`node-card ${isActive ? "active-node" : ""}`}>
                  <span className="edge-dc-icon">
                    <StageIcon size={16} />
                  </span>
                  <p className="edge-dc-copy">{stage.description}</p>
                </article>
              )}
            </section>

            {!isLast ? (
              <div className={`flow-line ${isActive ? "is-active" : ""}`} aria-hidden="true">
                <span className="packet" style={{ animationDelay: `${index * 0.12}s` }} />
                <span className="packet alt" style={{ animationDelay: `${0.75 + index * 0.12}s` }} />
              </div>
            ) : null}
          </React.Fragment>
        );
      })}
    </div>
  );
}
