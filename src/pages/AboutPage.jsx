import React from "react";
import { motion } from "framer-motion";
import { Cpu, Factory, ShieldCheck, Target } from "lucide-react";
import { aboutPillars, infrastructurePositioningSentence } from "../content/platformData";
import { Container, fadeInUp, revealTransition, SectionTitle } from "../components/layout";
import { PageHero } from "../components/PageHero";

const icons = [Target, Factory, Cpu, ShieldCheck];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About KrishvaTech"
        title="Building India's GPU-Powered Industrial AI Infrastructure"
        subtitle={`KrishvaTech Pvt Ltd exists to build edge-native computer vision infrastructure that transitions from pilot to dependable industrial deployment. ${infrastructurePositioningSentence}`}
        actions={
          <>
            <a href="/platform" className="btn-primary">View Platform</a>
            <a href="/contact" className="btn-secondary">Contact Team</a>
          </>
        }
      />

      <section className="section-shell" id="about-core">
        <Container>
          <SectionTitle
            eyebrow="Mission"
            title="Industrial AI Specialization with a Deployment-First Mindset"
            subtitle="Engineering decisions are shaped by uptime, safety, and operational reliability for India’s manufacturing sector."
          />

          <div className="mt-9 grid gap-5 md:grid-cols-2">
            {aboutPillars.map((pillar, index) => {
              const Icon = icons[index % icons.length];
              return (
                <motion.article
                  key={pillar.title}
                  className="panel"
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={fadeInUp}
                  transition={{ ...revealTransition, delay: index * 0.05 }}
                >
                  <div className="icon-box"><Icon size={18} /></div>
                  <h3 className="mt-3 text-xl text-white">{pillar.title}</h3>
                  <p className="mt-2 text-sm text-white/72">{pillar.detail}</p>
                </motion.article>
              );
            })}
          </div>

          <motion.article
            className="panel mt-8"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            transition={revealTransition}
          >
            <p className="panel-title">Infrastructure Positioning</p>
            <p className="about-vision">{infrastructurePositioningSentence}</p>
          </motion.article>

          <motion.article
            className="panel mt-8"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            transition={revealTransition}
          >
            <p className="panel-title">Vision</p>
            <p className="about-vision">Building India's GPU-powered industrial AI infrastructure.</p>
          </motion.article>
        </Container>
      </section>
    </>
  );
}
