import React from "react";
import { motion } from "framer-motion";

export const fadeInUp = {
  hidden: { opacity: 0, y: 24, scale: 0.988, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
};

export const revealTransition = { duration: 0.55, ease: [0.16, 1, 0.3, 1] };

export const Container = ({ children, className = "" }) => (
  <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

export const SectionTitle = ({ eyebrow, title, subtitle }) => (
  <motion.div
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.3 }}
    variants={fadeInUp}
    transition={revealTransition}
    className="max-w-3xl"
  >
    {eyebrow ? <p className="section-eyebrow">{eyebrow}</p> : null}
    <h2 className="section-title">{title}</h2>
    {subtitle ? <p className="section-subtitle">{subtitle}</p> : null}
  </motion.div>
);
