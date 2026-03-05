import React, { useEffect, useRef, useState } from "react";
import { useMotionPreferences } from "../../animations/useMotionPreferences";
import {
  createDashboardCard,
  spawnFrames,
  tickDashboardCards,
  tickPopups,
  updateFrames,
} from "./frameGenerator";
import { PIPELINE_STAGES, buildPipelineLayout, renderPipelineScene } from "./pipelineRenderer";

const h = React.createElement;

const SIM_STAGE_LABELS = [
  "Stage 1: Cameras + RTSP active",
  "Stage 2: Jetson edge nodes active",
  "Stage 3: DeepStream/TensorRT GPU processing",
  "Stage 4: Event engine generating alerts",
  "Stage 5: Dashboard output updated",
];

const supportsCanvas2d = () => {
  if (typeof window === "undefined") return false;
  const canvas = document.createElement("canvas");
  return Boolean(canvas.getContext && canvas.getContext("2d"));
};

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

const getViewportMode = () => {
  if (typeof window === "undefined") return { isMobile: false, isTablet: false };
  const width = window.innerWidth;
  return {
    isMobile: width < 768,
    isTablet: width >= 768 && width < 1120,
  };
};

const createEmptyState = () => ({
  frames: [],
  cards: [],
  popups: [],
  frameSeq: 0,
  lastSpawnAt: 0,
});

const MobileFallback = () =>
  h(
    "div",
    { className: "edge-sim-mobile-fallback", role: "img", "aria-label": "Static simulation diagram for mobile" },
    h("p", { className: "edge-sim-mobile-title" }, "Static Pipeline Diagram (Mobile Fallback)"),
    h(
      "div",
      { className: "edge-sim-mobile-flow" },
      PIPELINE_STAGES.map((stage, index) =>
        h(
          React.Fragment,
          { key: stage },
          h("span", { className: "edge-sim-mobile-node" }, stage),
          index < PIPELINE_STAGES.length - 1 ? h("span", { className: "edge-sim-mobile-arrow" }, "→") : null,
        ),
      ),
    ),
  );

export default function EdgeVisionSimulation({ className = "" }) {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const controlRef = useRef({ start: () => {}, stop: () => {}, renderOnce: () => {}, resetState: () => {} });
  const stateRef = useRef(createEmptyState());
  const layoutRef = useRef(null);
  const inViewRef = useRef(false);
  const manualPausedRef = useRef(false);
  const allowAnimationRef = useRef(false);
  const stageRef = useRef(0);

  const [mode, setMode] = useState(getViewportMode);
  const [isInView, setIsInView] = useState(false);
  const [manualPaused, setManualPaused] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [activeStage, setActiveStage] = useState(0);

  const { allowAnimation, reducedMotion, lowPower } = useMotionPreferences();

  useEffect(() => {
    inViewRef.current = isInView;
  }, [isInView]);

  useEffect(() => {
    manualPausedRef.current = manualPaused;
  }, [manualPaused]);

  useEffect(() => {
    allowAnimationRef.current = allowAnimation;
  }, [allowAnimation]);

  useEffect(() => {
    const onResize = () => setMode(getViewportMode());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.22 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (mode.isMobile || !supportsCanvas2d()) return undefined;

    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return undefined;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return undefined;

    const simState = stateRef.current;
    let running = false;
    let rafId = 0;
    let lastTime = performance.now();

    const syncSize = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, mode.isTablet ? 1.35 : 1.8);
      const width = Math.max(1, Math.floor(rect.width));
      const height = Math.max(1, Math.floor(rect.height));

      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

      layoutRef.current = buildPipelineLayout({ width, height, isTablet: mode.isTablet });
    };

    const getScrollStage = () => {
      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;
      const raw = (viewportHeight - rect.top) / (viewportHeight + rect.height * 0.45);
      const stage = clamp(Math.floor(clamp(raw, 0, 0.9999) * 5), 0, 4);
      return stage;
    };

    const pushPopup = (label, frameId) => {
      simState.popups.unshift({
        id: `popup-${frameId}-${performance.now()}`,
        label,
        ttl: 1.8,
        yOffset: 0,
        xJitter: (Math.random() - 0.5) * 36,
      });
      simState.popups = simState.popups.slice(0, 4);
    };

    const pushDashboardCard = (frame, now) => {
      simState.cards.unshift(createDashboardCard({ frame, now }));
      simState.cards = simState.cards.slice(0, 6);
    };

    const render = (now, delta) => {
      if (!layoutRef.current) return;

      const stage = getScrollStage();
      if (stage !== stageRef.current) {
        stageRef.current = stage;
        setActiveStage(stage);
      }

      spawnFrames({
        state: simState,
        now,
        maxFrames: mode.isTablet ? 12 : 22,
        spawnInterval: mode.isTablet ? 580 : 430,
        simplified: mode.isTablet,
      });

      simState.frames = updateFrames({
        frames: simState.frames,
        delta,
        now,
        onEvent: (label, frameId) => pushPopup(label, frameId),
        onComplete: (frame, finishedAt) => pushDashboardCard(frame, finishedAt),
        gpuHoldSeconds: mode.isTablet ? [0.2, 0.38] : [0.2, 0.46],
        eventChance: mode.isTablet ? 0.28 : 0.34,
      });

      simState.cards = tickDashboardCards(simState.cards, delta);
      simState.popups = tickPopups(simState.popups, delta);

      renderPipelineScene({
        ctx,
        width: layoutRef.current.width,
        height: layoutRef.current.height,
        layout: layoutRef.current,
        frames: simState.frames,
        cards: simState.cards,
        popups: simState.popups,
        activeStage: stage,
        timeSeconds: now * 0.001,
        isTablet: mode.isTablet,
      });
    };

    const drawStatic = () => {
      const now = performance.now();
      render(now, 0.016);
    };

    const tick = (now) => {
      if (!running) return;
      const delta = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      render(now, delta);
      rafId = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running) return;
      running = true;
      lastTime = performance.now();
      setIsRunning(true);
      rafId = requestAnimationFrame(tick);
    };

    const stop = () => {
      if (!running) {
        setIsRunning(false);
        return;
      }
      running = false;
      cancelAnimationFrame(rafId);
      setIsRunning(false);
    };

    const resetState = () => {
      simState.frames = [];
      simState.cards = [];
      simState.popups = [];
      simState.frameSeq = 0;
      simState.lastSpawnAt = 0;
      stageRef.current = 0;
      setActiveStage(0);
      drawStatic();
    };

    syncSize();
    drawStatic();

    const onResize = () => {
      syncSize();
      drawStatic();
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        stop();
      } else if (inViewRef.current && !manualPausedRef.current && allowAnimationRef.current) {
        start();
      }
    };

    const resizeObserver = new ResizeObserver(syncSize);
    resizeObserver.observe(canvas);

    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibilityChange);

    controlRef.current = { start, stop, renderOnce: drawStatic, resetState };

    return () => {
      stop();
      resizeObserver.disconnect();
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      controlRef.current = { start: () => {}, stop: () => {}, renderOnce: () => {}, resetState: () => {} };
    };
  }, [mode.isMobile, mode.isTablet]);

  useEffect(() => {
    const control = controlRef.current;
    if (!control) return;

    const shouldRun = isInView && !manualPaused && allowAnimation && !mode.isMobile;

    if (shouldRun) {
      control.start();
    } else {
      control.stop();
      control.renderOnce();
    }
  }, [allowAnimation, isInView, manualPaused, mode.isMobile]);

  const onStart = () => {
    setManualPaused(false);
    if (isInView && allowAnimation && !mode.isMobile) {
      controlRef.current.start();
    }
  };

  const onPause = () => {
    setManualPaused(true);
    controlRef.current.stop();
    controlRef.current.renderOnce();
  };

  const onReset = () => {
    controlRef.current.resetState();
    if (isInView && !manualPaused && allowAnimation && !mode.isMobile) {
      controlRef.current.start();
    }
  };

  const statusLabel = mode.isMobile
    ? "Mobile fallback"
    : lowPower
      ? "Low-power mode"
      : reducedMotion
        ? "Reduced-motion mode"
        : isRunning
          ? "Running"
          : "Paused";

  const rootClass = `edge-sim-wrapper ${className}`.trim();

  return h(
    "section",
    { ref: sectionRef, className: rootClass },
    h("p", { className: "edge-sim-kicker" }, "Simulation"),
    h("h3", { className: "edge-sim-title" }, "EdgeVision Pipeline Simulation (Conceptual Visualization)"),
    h(
      "p",
      { className: "edge-sim-subtitle" },
      "Visual simulation of frame flow through RTSP ingestion, edge GPU inference, event generation, and dashboard output.",
    ),
    h(
      "div",
      { className: "edge-sim-controls" },
      h(
        "button",
        { type: "button", className: "edge-sim-btn", onClick: onStart, disabled: mode.isMobile || !allowAnimation },
        "Start Simulation",
      ),
      h("button", { type: "button", className: "edge-sim-btn", onClick: onPause, disabled: mode.isMobile }, "Pause Simulation"),
      h("button", { type: "button", className: "edge-sim-btn edge-sim-btn-secondary", onClick: onReset }, "Reset"),
      h("span", { className: "edge-sim-status" }, statusLabel),
      h("span", { className: "edge-sim-stage" }, SIM_STAGE_LABELS[activeStage]),
    ),
    mode.isMobile ? h(MobileFallback, null) : h("canvas", { ref: canvasRef, className: "edge-sim-canvas" }),
  );
}
