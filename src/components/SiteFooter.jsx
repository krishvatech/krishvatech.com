import React from "react";
import { Container } from "./layout";

export const SiteFooter = () => (
  <footer className="site-footer">
    <Container className="footer-inner">
      <section className="platform-info-block" aria-label="Platform Information">
        <p className="platform-info-title">Platform Information</p>
        <dl className="platform-info-grid">
          <div className="platform-info-row">
            <dt>EdgeVision Platform Status</dt>
            <dd>Alpha</dd>
          </div>
          <div className="platform-info-row">
            <dt>Deployment Model</dt>
            <dd>Edge AI (Jetson-based)</dd>
          </div>
          <div className="platform-info-row">
            <dt>Inference Runtime</dt>
            <dd>DeepStream + TensorRT</dd>
          </div>
          <div className="platform-info-row">
            <dt>Architecture</dt>
            <dd>Multi-stream GPU inference</dd>
          </div>
          <div className="platform-info-row">
            <dt>Target Industries</dt>
            <dd>Textile, Diamond, Smart Infrastructure</dd>
          </div>
          <div className="platform-info-row">
            <dt>Last Architecture Update</dt>
            <dd>2026</dd>
          </div>
        </dl>
      </section>

      <div className="footer-links-block">
        <p>© {new Date().getFullYear()} KrishvaTech Pvt Ltd. GPU-Accelerated Edge AI Infrastructure Company.</p>
        <p>
          GPU accelerated AI · Edge AI infrastructure · NVIDIA Jetson AI · DeepStream video analytics · Industrial computer vision
        </p>
      </div>
    </Container>
  </footer>
);
