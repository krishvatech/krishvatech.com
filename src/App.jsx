import React, { useEffect } from "react";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import HomePage from "./pages/HomePage";
import IndustriesPage from "./pages/IndustriesPage";
import NotFoundPage from "./pages/NotFoundPage";
import PlatformPage from "./pages/PlatformPage";
import TechnologyPage from "./pages/TechnologyPage";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";

const baseKeywords =
  "GPU accelerated AI, Edge AI infrastructure, NVIDIA Jetson AI, DeepStream video analytics, Industrial computer vision, TensorRT optimization, CUDA edge inference";
const defaultOgImage = "https://krishvatech.com/logo.png";

const normalizePath = (pathname) => {
  const trimmed = pathname.replace(/\/+$/, "");
  return trimmed.length ? trimmed : "/";
};

const routes = {
  "/": {
    component: HomePage,
    title: "KrishvaTech Pvt Ltd | GPU-Accelerated Edge AI Infrastructure",
    description:
      "GPU-accelerated edge AI infrastructure for industrial intelligence, built on NVIDIA Jetson, DeepStream and TensorRT.",
    ogTitle: "GPU-Accelerated Edge AI Infrastructure for Industrial Intelligence",
    keywords: baseKeywords,
    robots: "index, follow",
    ogImage: defaultOgImage,
  },
  "/platform": {
    component: PlatformPage,
    title: "KrishvaTech EdgeVision Platform | Industrial Edge AI",
    description:
      "KrishvaTech EdgeVision Platform for RTSP multi-camera ingestion, DeepStream pipelines, TensorRT inference and edge-to-cloud analytics.",
    ogTitle: "KrishvaTech EdgeVision Platform",
    keywords:
      "Edge AI platform, Jetson edge deployment, DeepStream pipelines, TensorRT inference, RTSP multi-camera ingestion",
    robots: "index, follow",
    ogImage: defaultOgImage,
  },
  "/technology": {
    component: TechnologyPage,
    title: "Technology | Jetson, DeepStream, TensorRT, CUDA",
    description:
      "Deep technical architecture for RTSP ingestion, zero-copy GPU buffers, DeepStream stages, TensorRT optimization and fleet scaling.",
    ogTitle: "KrishvaTech Technology Architecture",
    keywords:
      "RTSP video ingestion pipelines, DeepStream processing stages, TensorRT model conversion, CUDA acceleration, GPU memory optimization",
    robots: "index, follow",
    ogImage: defaultOgImage,
  },
  "/industries": {
    component: IndustriesPage,
    title: "Industries | Textile, Diamond, Smart Infrastructure",
    description:
      "Industrial AI deployments for textile manufacturing, diamond processing and smart infrastructure operations.",
    ogTitle: "KrishvaTech Industrial Deployments",
    keywords:
      "industrial AI use cases, textile manufacturing intelligence, diamond processing monitoring, smart infrastructure analytics",
    robots: "index, follow",
    ogImage: defaultOgImage,
  },
  "/about": {
    component: AboutPage,
    title: "About KrishvaTech | GPU-Native Industrial AI Engineering",
    description:
      "KrishvaTech builds India's GPU-powered industrial AI infrastructure with a deployment-first engineering mindset.",
    ogTitle: "About KrishvaTech Pvt Ltd",
    keywords:
      "GPU-native engineering, industrial AI company India, edge computer vision infrastructure, manufacturing AI deployments",
    robots: "index, follow",
    ogImage: defaultOgImage,
  },
  "/contact": {
    component: ContactPage,
    title: "Contact KrishvaTech | EdgeVision Deployment",
    description:
      "Contact KrishvaTech for edge AI deployment planning, camera fleet architecture, and industrial monitoring infrastructure.",
    ogTitle: "Contact KrishvaTech",
    keywords:
      "edge AI deployment consultation, industrial camera analytics, jetson deepstream architecture support",
    robots: "index, follow",
    ogImage: defaultOgImage,
  },
};

const notFoundRoute = {
  component: NotFoundPage,
  title: "404 | KrishvaTech",
  description:
    "The requested page could not be found on KrishvaTech. Explore the EdgeVision platform and technology architecture.",
  ogTitle: "Page Not Found | KrishvaTech",
  keywords: baseKeywords,
  robots: "noindex, nofollow",
  ogImage: defaultOgImage,
};

const setMeta = (selector, content, attribute = "content") => {
  const tag = document.querySelector(selector);
  if (tag) tag.setAttribute(attribute, content);
};

const setCanonical = (href) => {
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", href);
};

export default function App() {
  const path = normalizePath(window.location.pathname);
  const page = routes[path] || notFoundRoute;
  const PageComponent = page.component;
  const pageUrl = `https://krishvatech.com${path === "/" ? "/" : path}`;

  useEffect(() => {
    document.title = page.title;
    setMeta('meta[name="description"]', page.description);
    setMeta('meta[name="keywords"]', page.keywords || baseKeywords);
    setMeta('meta[name="robots"]', page.robots || "index, follow");
    setMeta('meta[property="og:title"]', page.ogTitle);
    setMeta('meta[property="og:description"]', page.description);
    setMeta('meta[property="og:url"]', pageUrl);
    setMeta('meta[property="og:image"]', page.ogImage || defaultOgImage);
    setMeta('meta[name="twitter:title"]', page.ogTitle);
    setMeta('meta[name="twitter:description"]', page.description);
    setMeta('meta[name="twitter:image"]', page.ogImage || defaultOgImage);
    setCanonical(pageUrl);
  }, [page.description, page.keywords, page.ogImage, page.ogTitle, page.robots, page.title, pageUrl]);

  return (
    <main className="site-main">
      <SiteHeader currentPath={path} />
      <PageComponent />
      <SiteFooter />
    </main>
  );
}
