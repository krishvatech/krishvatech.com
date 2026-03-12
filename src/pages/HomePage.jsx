import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Cpu } from "lucide-react";
import {
  architecturePreviewSteps,
  gpuAdvantagePoints,
  nvidiaStack,
  platformCapabilities,
} from "../content/platformData";
import { AIUseCaseMapSection } from "../components/AIUseCaseMapSection";
import { ArchitectureDiagram } from "../components/ArchitectureDiagram";
import { NvidiaInceptionBadge } from "../components/NvidiaInceptionBadge";
import EdgeNodeFlowCanvas from "../components/visuals/EdgeNodeFlowCanvas";
import { Container, fadeInUp, revealTransition, SectionTitle } from "../components/layout";
import { PageHero } from "../components/PageHero";

const runtimeCards = [
  { key: "activeEdgeNodes", label: "Active Edge Nodes", target: 24 },
  { key: "cameraStreams", label: "Camera Streams Processing", target: 182 },
  { key: "gpuUtilization", label: "GPU Utilization", target: 71, suffix: "%" },
  { key: "eventsGenerated", label: "Events Generated Today", target: 1483 },
  { key: "systemStatus", label: "System Status", value: "Operational" },
];

const deploymentSteps = [
  {
    number: "01",
    title: "Connect Cameras",
    description: "Attach RTSP camera streams or existing CCTV infrastructure.",
  },
  {
    number: "02",
    title: "Deploy Edge Node",
    description: "Install EdgeVision runtime on NVIDIA Jetson edge devices.",
  },
  {
    number: "03",
    title: "Activate AI Pipeline",
    description: "Enable AI detection models and start receiving real-time alerts.",
  },
];

const nvidiaStackCards = [
  {
    title: "NVIDIA Jetson",
    description: "Edge AI hardware platform powering real-time inference at the edge.",
  },
  {
    title: "DeepStream SDK",
    description: "High-performance multi-stream video analytics pipeline.",
  },
  {
    title: "TensorRT",
    description: "GPU-optimized deep learning inference engine.",
  },
  {
    title: "CUDA / cuDNN",
    description: "Accelerated computing libraries enabling high-performance workloads.",
  },
];

export default function HomePage() {
  const [runtimeValues, setRuntimeValues] = useState({
    activeEdgeNodes: 0,
    cameraStreams: 0,
    gpuUtilization: 0,
    eventsGenerated: 0,
  });

  useEffect(() => {
    let raf = 0;
    const duration = 1200;
    const start = performance.now();

    const animate = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;

      setRuntimeValues({
        activeEdgeNodes: Math.round(24 * eased),
        cameraStreams: Math.round(182 * eased),
        gpuUtilization: Math.round(71 * eased),
        eventsGenerated: Math.round(1483 * eased),
      });

      if (progress < 1) {
        raf = window.requestAnimationFrame(animate);
      }
    };

    raf = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(raf);
  }, []);

  return (
    <>
      <PageHero
        title="GPU-Accelerated Edge AI Infrastructure"
        subheadline="for Real-Time Industrial Intelligence"
        techLine="Built on NVIDIA Jetson, DeepStream & TensorRT"
        description="Deploy multi-stream computer vision pipelines at the edge with real-time GPU inference and event-driven automation."
        credibilityLine="Designed for multi-stream video analytics, edge inference, and scalable industrial AI deployments."
        showArchitectureVisualization
        actions={
          <>
            <a href="/platform#architecture-diagram" className="btn-secondary">
              Explore Architecture
            </a>
            <a href="/contact" className="btn-primary">
              Request Platform Demo <ArrowRight size={17} />
            </a>
          </>
        }
      />

      <NvidiaInceptionBadge />

      <section className="runtime-section" id="edgevision-platform-runtime">
        <Container>
          <h2 className="runtime-title">EdgeVision Platform Runtime</h2>
          <div className="runtime-grid" aria-label="EdgeVision platform runtime telemetry">
            {runtimeCards.map((metric) => (
              <article className="runtime-card" key={metric.key}>
                <p className="runtime-value">
                  {typeof metric.target === "number"
                    ? `${runtimeValues[metric.key] ?? 0}${metric.suffix || ""}`
                    : metric.value}
                </p>
                <p className="runtime-label">{metric.label}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="steps-section" id="deploy-edgevision">
        <Container>
          <h2 className="steps-title">Deploy EdgeVision in 3 Steps</h2>
          <div className="steps-grid" aria-label="Deploy EdgeVision in 3 steps">
            {deploymentSteps.map((step) => (
              <article className="steps-card" key={step.number}>
                <p className="steps-number">Step {step.number}</p>
                <h3 className="steps-card-title">{step.title}</h3>
                <p className="steps-description">{step.description}</p>
              </article>
            ))}
          </div>
          <div className="steps-cta">
            <a href="/contact" className="btn-primary">Request Platform Demo</a>
          </div>
        </Container>
      </section>

      <section className="stack-section" id="nvidia-accelerated-stack">
        <Container>
          <h2 className="stack-title">Built on the NVIDIA Accelerated Computing Stack</h2>
          <div className="stack-grid" aria-label="NVIDIA accelerated computing stack">
            {nvidiaStackCards.map((item) => (
              <article className="stack-card" key={item.title}>
                <h3 className="stack-card-title">{item.title}</h3>
                <p className="stack-card-description">{item.description}</p>
              </article>
            ))}
          </div>
          <p className="stack-note">
            KrishvaTech is preparing its application to the NVIDIA Inception program to further scale its GPU-accelerated EdgeVision platform.
          </p>
        </Container>
      </section>

      <section className="section-shell" id="edgevision-platform">
        <Container>
          <SectionTitle
            eyebrow="EdgeVision Platform"
            title="Purpose-Built Industrial Edge AI Platform"
            subtitle="KrishvaTech EdgeVision is positioned as AI infrastructure for multi-camera industrial intelligence, not a services layer."
          />

          <div className="mt-9 grid gap-4 lg:grid-cols-3">
            <motion.article
              className="panel"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
              transition={revealTransition}
            >
              <p className="panel-title">GPU-Accelerated Edge AI Infrastructure</p>
              <p className="industry-summary mt-3">
                EdgeVision runs multi-stream inference pipelines close to industrial camera environments on Jetson edge nodes to keep response paths low latency and operationally stable.
              </p>
              <p className="industry-summary mt-3">
                DeepStream and TensorRT execution paths are designed for sustained multi-stream inference pipelines in beta pilot environments.
              </p>
            </motion.article>

            <motion.article
              className="panel"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
              transition={{ ...revealTransition, delay: 0.05 }}
            >
              <p className="panel-title">Core Platform Capabilities</p>
              <ul className="platform-bullet-list mt-3">
                {platformCapabilities.slice(0, 5).map((item) => (
                  <li key={item.title}>
                    <strong className="text-white">{item.title}:</strong> {item.detail}
                  </li>
                ))}
              </ul>
            </motion.article>

            <motion.article
              className="panel"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
              transition={{ ...revealTransition, delay: 0.1 }}
            >
              <p className="panel-title">Platform Architecture Preview</p>
              <div className="mt-4">
                <ArchitectureDiagram steps={architecturePreviewSteps} />
              </div>
            </motion.article>
          </div>

          <motion.article
            className="panel mt-7"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            transition={revealTransition}
          >
            <p className="panel-title">Industrial Pipeline</p>
            <pre className="code-block mt-4"><code>{`Industrial Cameras -> Jetson Edge Node -> DeepStream Pipeline -> TensorRT Inference -> Edge Event Engine -> Operations Dashboard`}</code></pre>
            <div className="mt-6 flex flex-wrap gap-4">
              <a href="/platform#architecture-diagram" className="btn-primary">Explore Platform Architecture</a>
              <a href="/platform" className="btn-secondary">Open EdgeVision Platform</a>
            </div>
          </motion.article>
        </Container>
      </section>

      <section className="section-shell section-muted" id="platform-architecture">
        <Container>
          <SectionTitle
            eyebrow="Platform Architecture"
            title="Real-Time Edge AI Pipeline Execution"
            subtitle="Live architecture visualization of camera ingest, edge AI runtime execution, GPU inference, event routing, and dashboard delivery."
          />
          <motion.article
            className="panel mt-9"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            transition={revealTransition}
          >
            <ArchitectureDiagram steps={architecturePreviewSteps} />
            <EdgeNodeFlowCanvas className="mt-5" />
            <div className="mt-6 flex flex-wrap gap-4">
              <a href="/platform#architecture-diagram" className="btn-primary">Explore Platform Architecture</a>
              <a href="/technology" className="btn-secondary">Open Technology Deep Dive</a>
            </div>
          </motion.article>
        </Container>
      </section>

      <AIUseCaseMapSection
        id="industrial-focus"
        className="section-shell"
        title="Industries"
        subtitle="Industrial use-case map for textile manufacturing, diamond processing, and smart infrastructure."
      />

      <section className="section-shell section-muted" id="technology">
        <Container>
          <SectionTitle
            eyebrow="Technology"
            title="GPU-Native Runtime Stack"
            subtitle="Core accelerated computing technologies used for edge-native, multi-stream industrial inference pipelines."
          />

          <div className="mt-9 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {nvidiaStack.map((item, index) => (
              <motion.article
                key={item}
                className="panel"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeInUp}
                transition={{ ...revealTransition, delay: index * 0.04 }}
              >
                <div className="architecture-row"><Cpu size={16} /> {item}</div>
              </motion.article>
            ))}
          </div>

          <div className="mt-7 grid gap-4 md:grid-cols-2">
            {gpuAdvantagePoints.slice(0, 4).map((point, index) => (
              <motion.article
                key={point}
                className="panel"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeInUp}
                transition={{ ...revealTransition, delay: index * 0.05 }}
              >
                <div className="architecture-row"><Cpu size={16} /> {point}</div>
              </motion.article>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-shell" id="enterprise-cta">
        <Container>
          <SectionTitle
            eyebrow="Enterprise Call-to-Action"
            title="Plan an EdgeVision Pilot Scope"
            subtitle="Discuss camera footprint, event priorities, and architecture constraints for a pilot-ready deployment plan."
          />

          <motion.article
            className="panel mt-8"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            transition={revealTransition}
          >
            <p className="industry-summary">
              KrishvaTech is currently in private beta and focused on infrastructure-led deployments for industrial monitoring environments.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <a href="/contact" className="btn-primary">
                Contact Us for Beta Access <ArrowRight size={17} />
              </a>
              <a href="/platform" className="btn-secondary">Explore Platform</a>
              <a href="/technology" className="btn-secondary">Technical Deep Dive</a>
            </div>
          </motion.article>
        </Container>
      </section>
    </>
  );
}
