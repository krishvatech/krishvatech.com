import React, { Suspense } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Cpu, Gauge, Workflow } from "lucide-react";
import {
  architecturePreviewSteps,
  deploymentWorkflow,
  gpuAdvantagePoints,
  inceptionStatement,
  infrastructurePositioningSentence,
  platformCapabilities,
  platformProofMetrics,
  platformSections,
  proofMetricsNote,
} from "../content/platformData";
const EdgeDatacenter3D = React.lazy(() => import("../components/EdgeDatacenter3D"));
import { ArchitectureDiagram } from "../components/ArchitectureDiagram";
import { Container, fadeInUp, revealTransition, SectionTitle } from "../components/layout";
import { PageHero } from "../components/PageHero";

const sectionIcons = [Cpu, Workflow, Gauge];

export default function PlatformPage() {
  return (
    <>
      <PageHero
        eyebrow="EdgeVision Platform"
        title="KrishvaTech EdgeVision Platform"
        subtitle={`A GPU-accelerated edge AI platform for real-time multi-stream video analytics built on NVIDIA Jetson, DeepStream, TensorRT and CUDA. ${infrastructurePositioningSentence}`}
        actions={
          <>
            <a className="btn-primary" href="#architecture-diagram">Explore Architecture</a>
            <a className="btn-secondary" href="/technology">Technical Deep Dive</a>
          </>
        }
      />

      <section className="section-shell" id="edge-ai-deployment">
        <Container>
          <SectionTitle
            eyebrow="Platform Overview"
            title="Architecture Built for Industrial Edge Deployment"
            subtitle="EdgeVision combines near-camera GPU inference with cloud-connected observability and control."
          />
          <div className="mt-9 grid gap-5 md:grid-cols-3">
            {platformSections.map((section, index) => {
              const Icon = sectionIcons[index % sectionIcons.length];
              return (
                <motion.article
                  key={section.title}
                  className="panel"
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={fadeInUp}
                  transition={{ ...revealTransition, delay: index * 0.05 }}
                >
                  <div className="icon-box"><Icon size={18} /></div>
                  <h3 className="mt-3 text-xl text-white">{section.title}</h3>
                  <p className="mt-2 text-sm text-white/70">{section.detail}</p>
                </motion.article>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="section-shell section-muted" id="gpu-acceleration-advantage">
        <Container>
          <SectionTitle
            eyebrow="GPU Acceleration Advantage"
            title="Why EdgeVision Uses GPU-Native Runtime Architecture"
            subtitle="Industrial multi-camera analytics requires parallel GPU compute, not CPU-only video processing."
          />

          <div className="mt-9 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {gpuAdvantagePoints.map((point, index) => (
              <motion.article
                key={point}
                className="panel"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeInUp}
                transition={{ ...revealTransition, delay: index * 0.04 }}
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
            <p className="panel-title">EdgeVision Pipeline</p>
            <div className="mt-4">
              <ArchitectureDiagram steps={architecturePreviewSteps} />
            </div>
            <p className="edge-datacenter-note mt-4">
              Camera streams are ingested over RTSP, processed on Jetson edge nodes through DeepStream multi-stream
              pipelines, optimized by TensorRT, and converted by the Edge Event Engine into actionable intelligence for
              operations dashboards.
            </p>
          </motion.article>

          <motion.article
            className="panel mt-7"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            transition={revealTransition}
          >
            <p className="panel-title">Quantified Deployment Proof</p>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {platformProofMetrics.map((metric, index) => (
                <motion.article
                  key={metric.jetsonProfile}
                  className="panel"
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={fadeInUp}
                  transition={{ ...revealTransition, delay: index * 0.04 }}
                >
                  <h3 className="text-base text-white">{metric.jetsonProfile}</h3>
                  <div className="mt-3 grid gap-2">
                    <div className="tech-row">Streams: {metric.streamsPerNode}</div>
                    <div className="tech-row">Inference Latency: {metric.p95Latency}</div>
                    <div className="tech-row">Event Throughput: {metric.eventThroughput}</div>
                  </div>
                </motion.article>
              ))}
            </div>
            <p className="edge-datacenter-note mt-4">{proofMetricsNote}</p>
          </motion.article>
        </Container>
      </section>

      <section className="section-shell section-muted" id="architecture-diagram">
        <Container>
          <SectionTitle
            eyebrow="GPU Accelerated Architecture"
            title="Edge Micro-Datacenter: GPU-Accelerated Multi-Stream Architecture"
            subtitle="Interactive 3D architecture visualization of camera ingestion, edge GPU compute, DeepStream processing, TensorRT inference, and dashboard analytics."
          />
          <motion.article
            className="panel mt-9"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            transition={revealTransition}
          >
            <Suspense fallback={<div className="edge-datacenter-root edge-datacenter-loading">Loading 3D architecture...</div>}>
              <EdgeDatacenter3D />
            </Suspense>
            <p className="edge-datacenter-note">
              KrishvaTech EdgeVision processes multiple RTSP camera streams at the edge using NVIDIA Jetson, DeepStream
              pipelines and TensorRT optimized inference, then routes edge events to operations dashboards for real-time response.
            </p>
            <p className="edge-datacenter-inception">{inceptionStatement}</p>
          </motion.article>
        </Container>
      </section>

      <section className="section-shell" id="deployment-workflow">
        <Container>
          <SectionTitle
            eyebrow="Deployment Workflow"
            title="From Camera Onboarding to Cloud Visibility"
            subtitle="Execution pattern for production rollout of the KrishvaTech EdgeVision Platform."
          />

          <div className="mt-9 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {deploymentWorkflow.map((step, index) => (
              <motion.article
                key={step}
                className="panel"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                variants={fadeInUp}
                transition={{ ...revealTransition, delay: index * 0.05 }}
              >
                <p className="panel-title">Step {index + 1}</p>
                <h3 className="mt-2 text-lg text-white">{step}</h3>
              </motion.article>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-shell section-muted" id="platform-capabilities">
        <Container>
          <SectionTitle
            eyebrow="Capabilities"
            title="Industrial-Grade GPU Platform Capabilities"
            subtitle="Edge-native runtime features for safety, anomaly monitoring, and scalable multi-camera deployments."
          />

          <div className="mt-9 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {platformCapabilities.map((item, index) => (
              <motion.article
                key={item.title}
                className="panel"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeInUp}
                transition={{ ...revealTransition, delay: index * 0.03 }}
              >
                <h3 className="text-lg text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-white/70">{item.detail}</p>
              </motion.article>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <a href="/technology" className="btn-primary">
              View Technology Stack <ArrowRight size={16} />
            </a>
            <a href="/contact" className="btn-secondary">
              Discuss Deployment
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}
