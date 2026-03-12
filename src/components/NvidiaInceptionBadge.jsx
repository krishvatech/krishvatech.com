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
          <img
            className="nvidia-badge-image"
            src="https://cdn.prod.website-files.com/68669c4fd29af60dfdd79833/6868063d7cf297ee9df4102d_nvidia-inception-program-badge-rgb-for-screen%201.svg"
            alt="NVIDIA Inception Program Badge"
            loading="lazy"
          />
        </a>

        <p className="nvidia-trust-description">
          KrishvaTech Pvt Ltd is a member of the NVIDIA Inception Program, a global initiative supporting startups
          building cutting-edge AI and accelerated computing solutions.
        </p>
      </div>
    </Container>
  </section>
);
