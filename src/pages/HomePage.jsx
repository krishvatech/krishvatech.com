import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Cpu, Gauge, Server, ShieldCheck, Workflow } from "lucide-react";
import {
  architecturePreviewSteps,
  edgeDeploymentPhilosophy,
  gpuAccelerationStory,
  gpuAccelerationSummary,
  gpuAdvantagePoints,
  infrastructurePositioningSentence,
} from "../content/platformData";
import { AIUseCaseMapSection } from "../components/AIUseCaseMapSection";
import { ArchitectureDiagram } from "../components/ArchitectureDiagram";
import { Container, fadeInUp, revealTransition, SectionTitle } from "../components/layout";
import { PageHero } from "../components/PageHero";

const philosophyIcons = [ShieldCheck, Gauge, Cpu, ArrowRight];
const gpuStoryIcons = [Cpu, Workflow, Gauge, ShieldCheck, Server];

export default function HomePage() {
  return (
    <>
      <PageHero
        eyebrow="GPU-Native Industrial AI"
        title="GPU-Accelerated Edge AI Infrastructure for Industrial Intelligence"
        subtitle={`Built on NVIDIA Jetson, DeepStream & TensorRT for real-time multi-stream computer vision. ${infrastructurePositioningSentence}`}
        actions={
          <>
            <a href="/platform" className="btn-primary">
              Explore Platform <ArrowRight size={17} />
            </a>
            <a href="/technology#architecture" className="btn-secondary">
              View Architecture
            </a>
          </>
        }
      />

      <AIUseCaseMapSection id="industrial-focus" />

      <section className="section-shell section-muted" id="gpu-advantage">
        <Container>
          <SectionTitle
            eyebrow="GPU Acceleration Advantage"
            title="Why GPU Acceleration Is Required for Industrial Video Intelligence"
            subtitle="Traditional CPU-only video processing cannot sustain high-density camera workloads. EdgeVision uses GPU-accelerated pipelines for scalable multi-stream inference."
          />

          <motion.article
            className="panel mt-9"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            transition={revealTransition}
          >
            <p className="industry-summary">
              EdgeVision runs decode, preprocessing, and inference on NVIDIA Jetson GPUs using DeepStream multi-stream
              orchestration. TensorRT then optimizes model execution for deterministic latency under industrial camera loads.
            </p>
            <p className="edge-datacenter-note mt-3">{gpuAccelerationSummary}</p>
          </motion.article>

          <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {gpuAccelerationStory.map((item, index) => {
              const Icon = gpuStoryIcons[index % gpuStoryIcons.length];
              return (
                <motion.article
                  key={item.title}
                  className="panel"
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={fadeInUp}
                  transition={{ ...revealTransition, delay: index * 0.04 }}
                >
                  <div className="icon-box"><Icon size={16} /></div>
                  <h3 className="mt-3 text-base text-white">{item.title}</h3>
                  <p className="mt-2 text-sm text-white/72">{item.detail}</p>
                </motion.article>
              );
            })}
          </div>

          <div className="mt-7 grid gap-4 md:grid-cols-2">
            {gpuAdvantagePoints.map((point, index) => (
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

          <motion.article
            className="panel mt-7"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            transition={revealTransition}
          >
            <p className="panel-title">EdgeVision Processing Pipeline</p>
            <div className="mt-4">
              <ArchitectureDiagram steps={architecturePreviewSteps} />
            </div>
          </motion.article>
        </Container>
      </section>

      <section className="section-shell" id="deployment-philosophy">
        <Container>
          <SectionTitle
            eyebrow="Edge Deployment Philosophy"
            title="Deployment-First Architecture for Industrial Sites"
            subtitle="Infrastructure and runtime decisions are tuned for real plant-floor constraints."
          />
          <div className="mt-9 grid gap-4 md:grid-cols-2">
            {edgeDeploymentPhilosophy.map((point, index) => {
              const Icon = philosophyIcons[index % philosophyIcons.length];
              return (
                <motion.article
                  key={point}
                  className="panel"
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={fadeInUp}
                  transition={{ ...revealTransition, delay: index * 0.04 }}
                >
                  <div className="architecture-row"><Icon size={16} /> {point}</div>
                </motion.article>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="section-shell section-muted" id="architecture-preview">
        <Container>
          <SectionTitle
            eyebrow="Architecture Preview"
            title="Real-Time EdgeVision Pipeline"
            subtitle="From camera streams to operations dashboards with GPU-accelerated inference and edge event processing."
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
            <div className="mt-6 flex flex-wrap gap-4">
              <a href="/platform" className="btn-primary">Explore Platform</a>
              <a href="/technology" className="btn-secondary">Open Technology Deep Dive</a>
            </div>
          </motion.article>
        </Container>
      </section>
    </>
  );
}
