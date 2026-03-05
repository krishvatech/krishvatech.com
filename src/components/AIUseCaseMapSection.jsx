import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  Camera,
  ChevronRight,
  Cloud,
  Cog,
  Factory,
  Gauge,
  Gem,
  LayoutDashboard,
  Network,
  ShieldAlert,
  Workflow,
} from "lucide-react";
import { aiUseCaseMap, targetDeploymentProfiles, useCaseMapPipeline } from "../content/platformData";
import { Container, fadeInUp, revealTransition, SectionTitle } from "./layout";

const industryIcons = [Factory, Gem, Cloud];
const useCaseIcons = [Activity, ShieldAlert, Workflow, Gauge];

const pipelineIconByLabel = {
  "Camera Streams": Camera,
  "RTSP Ingestion": Network,
  "Jetson Edge AI Node": Cog,
  "DeepStream Multi-Stream Pipeline": Workflow,
  "TensorRT Optimized Inference": Gauge,
  "Edge Event Engine": Activity,
  "Operations Dashboard": LayoutDashboard,
};

export function AIUseCaseMapSection({
  id = "ai-use-case-map",
  className = "section-shell",
  title = "AI Use Case Map",
  subtitle = "How the KrishvaTech EdgeVision Platform delivers operational intelligence across industrial environments.",
}) {
  const [activeTooltipId, setActiveTooltipId] = useState(null);

  return (
    <section className={className} id={id}>
      <Container>
        <SectionTitle eyebrow="Industries" title={title} subtitle={subtitle} />

        <div className="mt-10 grid gap-6 xl:grid-cols-3">
          {aiUseCaseMap.map((industry, industryIndex) => {
            const IndustryIcon = industryIcons[industryIndex % industryIcons.length];
            return (
              <motion.article
                key={industry.title}
                className="industry-usecase-card"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeInUp}
                transition={{ ...revealTransition, delay: industryIndex * 0.05 }}
              >
                <img src={industry.image} alt={industry.title} className="industry-image" />
                <div className="industry-overlay" />
                <div className="industry-usecase-content">
                  <div className="icon-box industry-card-icon">
                    <IndustryIcon size={18} />
                  </div>
                  <h3 className="industry-usecase-title">{industry.title}</h3>
                  <p className="industry-summary">{industry.summary}</p>
                  <p className="usecase-list-label">AI Use Cases</p>
                  <ul className="usecase-list">
                    {industry.useCases.map((useCase, useCaseIndex) => {
                      const UseCaseIcon = useCaseIcons[useCaseIndex % useCaseIcons.length];
                      const useCaseId = `${industry.title}-${useCase.title}`;
                      const isOpen = activeTooltipId === useCaseId;
                      return (
                        <li className={`usecase-row ${isOpen ? "is-open" : ""}`} key={useCaseId}>
                          <button
                            type="button"
                            className="usecase-button"
                            aria-expanded={isOpen}
                            aria-controls={`usecase-tooltip-${industryIndex}-${useCaseIndex}`}
                            onClick={() => setActiveTooltipId((prev) => (prev === useCaseId ? null : useCaseId))}
                          >
                            <span className="usecase-icon">
                              <UseCaseIcon size={14} />
                            </span>
                            <span className="usecase-copy-wrap">
                              <span className="usecase-item-title">{useCase.title}</span>
                              <span className="usecase-item-text">{useCase.description}</span>
                            </span>
                          </button>
                          <p
                            id={`usecase-tooltip-${industryIndex}-${useCaseIndex}`}
                            className="usecase-tooltip"
                          >
                            {useCase.tooltip}
                          </p>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </motion.article>
            );
          })}
        </div>

        <motion.article
          className="panel usecase-platform-banner mt-8"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          transition={revealTransition}
        >
          <p className="usecase-platform-title">
            All use cases powered by the KrishvaTech EdgeVision Platform
          </p>
          <div className="usecase-platform-flow" aria-label="Platform architecture flow">
            {useCaseMapPipeline.map((step, index) => {
              const StepIcon = pipelineIconByLabel[step] || Activity;
              const hasNext = index < useCaseMapPipeline.length - 1;
              return (
                <React.Fragment key={step}>
                  <div className="usecase-platform-node">
                    <StepIcon size={14} />
                    <span>{step}</span>
                  </div>
                  {hasNext ? (
                    <span className="usecase-platform-arrow" aria-hidden="true">
                      <ChevronRight size={14} />
                    </span>
                  ) : null}
                </React.Fragment>
              );
            })}
          </div>
        </motion.article>

        <motion.article
          className="panel mt-7"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          transition={revealTransition}
        >
          <p className="panel-title">Target Deployment Profiles</p>
          <p className="edge-datacenter-note mt-3">
            Planning references for beta and pilot scoping. These are not customer deployments.
          </p>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {targetDeploymentProfiles.map((item, index) => (
              <motion.article
                key={item.industry}
                className="panel"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeInUp}
                transition={{ ...revealTransition, delay: index * 0.04 }}
              >
                <h3 className="text-base text-white">{item.industry}</h3>
                <div className="mt-3 grid gap-2">
                  <div className="tech-row">Target Environment: {item.targetEnvironment}</div>
                  <div className="tech-row">Typical Target Range: {item.typicalTargetRange}</div>
                  <div className="tech-row">Planned Detections: {item.plannedDetections.join(" · ")}</div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.article>
      </Container>
    </section>
  );
}
