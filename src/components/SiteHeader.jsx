import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Container } from "./layout";

const logoSrc = "/logo.png";

export const SiteHeader = ({ currentPath = "/" }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [currentPath]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Platform", href: "/platform" },
    { label: "Industries", href: "/industries" },
    { label: "Technology", href: "/technology" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="site-header">
      <Container className="header-inner">
        <a href="/" className="brand-wrap" aria-label="KrishvaTech Home">
          <img src={logoSrc} alt="KrishvaTech" className="brand-logo" />
          <div>
            <p className="brand-title">KrishvaTech Pvt Ltd</p>
            <p className="brand-subtitle">GPU-Accelerated Edge AI Infrastructure</p>
          </div>
        </a>

        <nav className="main-nav" aria-label="Primary">
          {navItems.map((item) => (
            <a
              key={item.label}
              className={`nav-pill ${currentPath === item.href ? "is-active" : ""}`}
              href={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <a href="/contact" className="btn-primary header-cta">Contact Us</a>
          <button
            type="button"
            className="mobile-nav-toggle"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-panel"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </Container>

      <aside
        id="mobile-nav-panel"
        className={`mobile-nav-panel ${menuOpen ? "is-open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <nav className="mobile-nav-list" aria-label="Mobile Primary">
          {navItems.map((item) => (
            <a
              key={`mobile-${item.label}`}
              className={`mobile-nav-link ${currentPath === item.href ? "is-active" : ""}`}
              href={item.href}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a href="/contact" className="btn-primary mobile-nav-cta" onClick={() => setMenuOpen(false)}>
            Contact Us
          </a>
        </nav>
      </aside>
      {menuOpen ? (
        <button
          type="button"
          className="mobile-nav-backdrop"
          aria-label="Close navigation menu"
          onClick={() => setMenuOpen(false)}
        />
      ) : null}
    </header>
  );
};
