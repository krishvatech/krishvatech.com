import React from "react";
import { Container } from "./layout";

export const NvidiaInceptionBadge = () => (
  <section className="nvidia-trust-section" id="trust-recognition">
    <Container>
      <div className="nvidia-trust-card">
        <h2 className="nvidia-trust-title">Trusted by Global AI Ecosystem</h2>

        <a
          className="nvidia-badge-link"
          href="https://www.nvidia.com/en-us/startups/"
          target="_blank"
          rel="noreferrer"
          aria-label="Open NVIDIA Inception Program page"
        >
          <span className="nvidia-badge-mark" aria-hidden="true">NV</span>
          <span className="nvidia-badge-text">
            <strong>NVIDIA Inception Program</strong>
            <span>Member Recognition</span>
          </span>
        </a>

        <p className="nvidia-trust-description">
          KrishvaTech Pvt Ltd is a member of the NVIDIA Inception Program, a global initiative supporting startups
          building cutting-edge AI and accelerated computing solutions.
        </p>
      </div>
    </Container>
  </section>
);
