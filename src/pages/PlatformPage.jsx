import React, { Suspense } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import {
  inceptionStatement,
  infrastructurePositioningSentence,
  platformSectionCopy,
  productStatusContent,
  reliabilityDesignGoalsContent,
} from "../content/platformData";
const EdgeInfrastructureVisualization = React.lazy(
  () => import("../components/visuals/EdgeInfrastructureVisualization"),
);
const EdgeVisionSimulation = React.lazy(
  () => import("../components/simulation/EdgeVisionSimulation"),
);
import { Container, fadeInUp, revealTransition, SectionTitle } from "../components/layout";
import { PageHero } from "../components/PageHero";

const renderLines = (lines) =>
  lines.map((line) => (
    <p key={line} className="industry-summary">
      {line}
    </p>
  ));

const renderBullets = (items) => (
  <ul className="platform-bullet-list">
    {items.map((item) => (
      <li key={item}>{item}</li>
    ))}
  </ul>
);

export default function PlatformPage() {
  return (
    <>
      <PageHero
        eyebrow="EdgeVision Platform"
        title="KrishvaTech EdgeVision Platform"
        subtitle={`GPU-accelerated edge AI infrastructure for industrial multi-camera video analytics. ${infrastructurePositioningSentence} Now in private beta for pilot environments.`}
        actions={
          <>
            <a className="btn-primary" href="/contact">
              Contact Us for Beta Access
            </a>
            <a className="btn-secondary" href="#architecture-diagram">Explore Architecture</a>
            <a className="btn-secondary" href="/technology">Technical Deep Dive</a>
          </>
        }
      />

      <section className="section-shell" id="edge-ai-deployment">
        <Container>
          <SectionTitle
            eyebrow="Architecture Built for Industrial Edge Deployment"
            title={platformSectionCopy.architectureBuilt.headline}
            subtitle="EdgeVision is designed as a deployment-oriented edge AI infrastructure platform."
          />
          <motion.article
            className="panel mt-9"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            transition={revealTransition}
          >
            <div className="grid gap-3">{renderLines(platformSectionCopy.architectureBuilt.lines)}</div>
            <div className="mt-4">{renderBullets(platformSectionCopy.architectureBuilt.bullets)}</div>
          </motion.article>
        </Container>
      </section>

      <section className="section-shell section-muted" id="gpu-acceleration-advantage">
        <Container>
          <SectionTitle
            eyebrow="Why GPU Acceleration Is Required"
            title={platformSectionCopy.whyGpuRequired.headline}
            subtitle="GPU-native execution is central to EdgeVision pipeline design."
          />
          <motion.article
            className="panel mt-9"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            transition={revealTransition}
          >
            <div className="grid gap-3">{renderLines(platformSectionCopy.whyGpuRequired.lines)}</div>
            <div className="mt-4">{renderBullets(platformSectionCopy.whyGpuRequired.bullets)}</div>
          </motion.article>
        </Container>
      </section>

      <section className="section-shell" id="deployment-first-architecture">
        <Container>
          <SectionTitle
            eyebrow="Deployment-First Architecture"
            title={platformSectionCopy.deploymentFirst.headline}
            subtitle="Built for staged pilot-to-site expansion in industrial operations."
          />
          <motion.article
            className="panel mt-9"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            transition={revealTransition}
          >
            <div className="grid gap-3">{renderLines(platformSectionCopy.deploymentFirst.lines)}</div>
            <div className="mt-4">{renderBullets(platformSectionCopy.deploymentFirst.bullets)}</div>
          </motion.article>
        </Container>
      </section>

      <section className="section-shell section-muted" id="architecture-diagram">
        <Container>
          <SectionTitle
            eyebrow="Real-Time EdgeVision Pipeline"
            title={platformSectionCopy.realTimePipeline.headline}
            subtitle="Simple technical flow from camera streams to operational dashboard events."
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
              <EdgeInfrastructureVisualization />
            </Suspense>
            <p className="panel-title mt-6">Interactive Edge AI Infrastructure</p>
            <p className="industry-summary mt-3">
              Scroll progression highlights cameras, edge compute nodes, GPU processing, event generation, and dashboard output.
            </p>
            <div className="mt-4 grid gap-3">{renderLines(platformSectionCopy.realTimePipeline.lines)}</div>
            <div className="mt-4">{renderBullets(platformSectionCopy.realTimePipeline.bullets)}</div>
            <p className="edge-datacenter-inception mt-5">{inceptionStatement}</p>
          </motion.article>
        </Container>
      </section>

      <section className="section-shell" id="pipeline-simulation">
        <Container>
          <SectionTitle
            eyebrow="Simulation"
            title="Live AI Inference Simulation"
            subtitle="Conceptual visualization of frame flow through the EdgeVision pipeline."
          />
          <motion.article
            className="panel mt-9"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            transition={revealTransition}
          >
            <Suspense fallback={<div className="edge-sim-loading">Loading pipeline simulation...</div>}>
              <EdgeVisionSimulation />
            </Suspense>
          </motion.article>
        </Container>
      </section>

      <section className="section-shell" id="product-status">
        <Container>
          <SectionTitle
            eyebrow="Product Status"
            title={`Current Stage: ${productStatusContent.statusLabel}`}
            subtitle="Clear status for pilot planning and technical evaluation."
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
              <p className="panel-title">Available Now</p>
              {renderBullets(productStatusContent.availableNow)}
            </motion.article>
            <motion.article
              className="panel"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
              transition={{ ...revealTransition, delay: 0.04 }}
            >
              <p className="panel-title">Coming Next</p>
              {renderBullets(productStatusContent.comingNext)}
            </motion.article>
            <motion.article
              className="panel"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
              transition={{ ...revealTransition, delay: 0.08 }}
            >
              <p className="panel-title">How to Get Access</p>
              <p className="industry-summary mt-3">{productStatusContent.access}</p>
            </motion.article>
          </div>
        </Container>
      </section>

      <section className="section-shell section-muted" id="reliability-design-goals">
        <Container>
          <SectionTitle
            eyebrow="Reliability & Operations (Design Goals)"
            title="Operational Design Goals for Beta Infrastructure"
            subtitle={reliabilityDesignGoalsContent.intro}
          />
          <motion.article
            className="panel mt-9"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            transition={revealTransition}
          >
            {renderBullets(reliabilityDesignGoalsContent.goals)}
          </motion.article>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="/contact" className="btn-primary">
              Contact Us for Pilot/Beta Access <ArrowRight size={16} />
            </a>
            <a href="/technology" className="btn-secondary">
              Open Technical Deep Dive
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}
