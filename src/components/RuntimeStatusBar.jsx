import React, { useEffect, useMemo, useState } from "react";

const metricConfig = [
  { key: "streams", label: "Streams Processing", unit: "", min: 18, max: 32, step: 2 },
  { key: "latency", label: "Inference Latency", unit: "ms", min: 28, max: 52, step: 3 },
  { key: "fps", label: "Frames Per Second", unit: "", min: 620, max: 860, step: 16 },
  { key: "gpu", label: "GPU Utilization", unit: "%", min: 46, max: 84, step: 4 },
  { key: "events", label: "Events Detected/min", unit: "", min: 6, max: 20, step: 2 },
];

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const randomDelta = (step) => (Math.random() > 0.5 ? 1 : -1) * (1 + Math.floor(Math.random() * step));

const initialMetrics = {
  streams: 24,
  latency: 38,
  fps: 720,
  gpu: 64,
  events: 12,
};

export default function RuntimeStatusBar({ className = "" }) {
  const [metrics, setMetrics] = useState(initialMetrics);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setMetrics((prev) => {
        const next = { ...prev };
        metricConfig.forEach((item) => {
          next[item.key] = clamp(prev[item.key] + randomDelta(item.step), item.min, item.max);
        });
        return next;
      });
      setTick((value) => value + 1);
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  const cards = useMemo(() => metricConfig.map((item) => ({
    ...item,
    value: metrics[item.key],
  })), [metrics]);

  return (
    <section className={`runtime-bar ${className}`.trim()} aria-label="EdgeVision runtime status">
      {cards.map((card) => (
        <article key={card.key} className="runtime-card">
          <p className="runtime-label">{card.label}</p>
          <p className="runtime-value" key={`${card.key}-${tick}`}>
            {card.value}
            <span className="runtime-unit">{card.unit}</span>
          </p>
        </article>
      ))}

      <article className="runtime-card runtime-status-card">
        <p className="runtime-label">System Status</p>
        <p className="runtime-status-text">RUNNING</p>
      </article>
    </section>
  );
}
