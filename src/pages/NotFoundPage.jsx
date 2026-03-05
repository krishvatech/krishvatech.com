import React from "react";
import { AlertTriangle } from "lucide-react";
import { Container } from "../components/layout";

export default function NotFoundPage() {
  return (
    <section className="section-shell">
      <Container>
        <article className="panel max-w-3xl">
          <div className="icon-box">
            <AlertTriangle size={18} />
          </div>
          <p className="section-eyebrow mt-4">404</p>
          <h1 className="section-title">Page Not Found</h1>
          <p className="section-subtitle">
            The requested page is not available. Continue to the platform overview or the homepage.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="/" className="btn-primary">Go to Home</a>
            <a href="/platform" className="btn-secondary">Open Platform Page</a>
          </div>
        </article>
      </Container>
    </section>
  );
}
