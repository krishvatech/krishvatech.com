import React from "react";
import { Container } from "./layout";

export const SiteFooter = () => (
  <footer className="site-footer">
    <Container className="footer-inner">
      <p>© {new Date().getFullYear()} KrishvaTech Pvt Ltd. GPU-Accelerated Edge AI Infrastructure Company.</p>
      <p>
        GPU accelerated AI · Edge AI infrastructure · NVIDIA Jetson AI · DeepStream video analytics · Industrial computer vision
      </p>
    </Container>
  </footer>
);
