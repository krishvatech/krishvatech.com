import React from "react";
import { motion } from "framer-motion";
import { Container } from "./layout";
import { AnimatedGpuBackground } from "./AnimatedGpuBackground";

export const PageHero = ({ eyebrow, title, subtitle, actions }) => (
  <section className="hero-shell">
    <AnimatedGpuBackground />
    <Container className="relative py-20 md:py-28">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="max-w-4xl"
      >
        {eyebrow ? <p className="section-eyebrow">{eyebrow}</p> : null}
        <h1 className="hero-title">{title}</h1>
        <p className="hero-subtitle">{subtitle}</p>
        {actions ? <div className="mt-8 flex flex-wrap gap-4">{actions}</div> : null}
      </motion.div>
    </Container>
  </section>
);
