import React from "react";
import { motion } from "framer-motion";
import { Container } from "./layout";
import { AnimatedGpuBackground } from "./AnimatedGpuBackground";

const defaultPipelineNodes = [
  "Camera Streams",
  "RTSP Ingestion",
  "Jetson Edge Nodes",
  "DeepStream Pipeline",
  "TensorRT GPU Inference",
  "Operations Dashboard",
];

export const PageHero = ({
  eyebrow,
  title,
  subheadline = "",
  techLine = "",
  subtitle,
  description = "",
  credibilityLine = "",
  positioningLine = "",
  bullets = [],
  actions,
  showArchitectureVisualization = false,
  pipelineNodes = defaultPipelineNodes,
}) => (
  <section className="hero-shell">
    <AnimatedGpuBackground />
    <Container className="hero-inner relative py-20 md:py-28">
      <div className={`hero-container ${showArchitectureVisualization ? "has-visualization" : ""}`.trim()}>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="hero-content"
        >
          {eyebrow ? <p className="section-eyebrow">{eyebrow}</p> : null}
          <h1 className="hero-title">{title}</h1>
          {subheadline ? <p className="hero-subheadline">{subheadline}</p> : null}
          {techLine ? <p className="hero-tech-line">{techLine}</p> : null}
          {subtitle ? <p className="hero-subtitle">{subtitle}</p> : null}
          {description ? <p className="hero-description">{description}</p> : null}
          {positioningLine ? <p className="hero-positioning-line">{positioningLine}</p> : null}
          {credibilityLine ? <p className="hero-credibility-line">{credibilityLine}</p> : null}
          {bullets.length ? (
            <ul className="hero-bullet-list">
              {bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          ) : null}
          {actions ? <div className="hero-actions">{actions}</div> : null}
        </motion.div>

        {showArchitectureVisualization ? (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.12 }}
            className="hero-architecture-shell"
            role="img"
            aria-label="Edge AI architecture pipeline processing camera streams through GPU inference"
          >
            <div className="hero-glow-particles" aria-hidden="true">
              <span className="hero-glow-dot dot-a" />
              <span className="hero-glow-dot dot-b" />
              <span className="hero-glow-dot dot-c" />
              <span className="hero-glow-dot dot-d" />
            </div>
            <div className="hero-pipeline">
              {pipelineNodes.map((node, index) => (
                <React.Fragment key={node}>
                  <div className="hero-pipeline-node">{node}</div>
                  {index < pipelineNodes.length - 1 ? (
                    <div className="hero-pipeline-line" aria-hidden="true">
                      <span className="packet" />
                      <span className="packet" />
                      <span className="packet" />
                    </div>
                  ) : null}
                </React.Fragment>
              ))}
            </div>
          </motion.div>
        ) : null}
      </div>
    </Container>
  </section>
);
