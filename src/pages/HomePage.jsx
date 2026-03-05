import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Cpu } from "lucide-react";
import {
  architecturePreviewSteps,
  gpuAdvantagePoints,
  homeHeroBullets,
  nvidiaStack,
  platformCapabilities,
} from "../content/platformData";
import { AIUseCaseMapSection } from "../components/AIUseCaseMapSection";
import { ArchitectureDiagram } from "../components/ArchitectureDiagram";
import EdgeNodeFlowCanvas from "../components/visuals/EdgeNodeFlowCanvas";
import { Container, fadeInUp, revealTransition, SectionTitle } from "../components/layout";
import { PageHero } from "../components/PageHero";

export default function HomePage() {
  return (
    <>
      <PageHero
        eyebrow="GPU-Native Industrial AI"
        title="GPU-Accelerated Edge AI Infrastructure for Industrial Intelligence"
        subtitle="KrishvaTech EdgeVision Platform is now in private beta, built on NVIDIA Jetson, DeepStream, TensorRT, and CUDA for multi-camera RTSP ingestion and multi-stream inference pipelines on an edge AI runtime."
        positioningLine="KrishvaTech builds GPU-accelerated edge AI infrastructure that enables real-time industrial computer vision systems."
        bullets={homeHeroBullets}
        actions={
          <>
            <a href="/contact" className="btn-primary">
              Contact Us for Beta Access <ArrowRight size={17} />
            </a>
            <a href="/platform#architecture-diagram" className="btn-secondary">
              Explore Architecture
            </a>
            <a href="/technology" className="btn-secondary">
              Technical Deep Dive
            </a>
          </>
        }
      />

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
