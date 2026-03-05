import React from "react";
import { AIUseCaseMapSection } from "../components/AIUseCaseMapSection";
import { PageHero } from "../components/PageHero";

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Industrial Computer Vision Deployments"
        subtitle="Purpose-built edge AI deployments for textile, diamond, and smart infrastructure operations."
        actions={
          <>
            <a href="/platform" className="btn-primary">Explore EdgeVision Platform</a>
            <a href="/contact" className="btn-secondary">Discuss Use Case</a>
          </>
        }
      />

      <AIUseCaseMapSection id="industry-deployments" />
    </>
  );
}
