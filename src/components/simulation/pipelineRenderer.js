export const PIPELINE_STAGES = [
  "Camera Streams",
  "RTSP Ingestion",
  "Jetson Edge AI Node",
  "DeepStream Multi-Stream Pipeline",
  "TensorRT Optimized Inference",
  "Edge Event Engine",
  "Operations Dashboard",
];

const NODE_PHASE_MAP = [0, 0, 1, 2, 2, 3, 4];

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const lerp = (from, to, t) => from + (to - from) * t;

const roundRect = (ctx, x, y, width, height, radius) => {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + width - r, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + r);
  ctx.lineTo(x + width, y + height - r);
  ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  ctx.lineTo(x + r, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
};

const drawGlow = (ctx, x, y, radius, color, alpha) => {
  const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
  gradient.addColorStop(0, color);
  gradient.addColorStop(1, "rgba(118, 185, 0, 0)");
  ctx.globalAlpha = alpha;
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;
};

export const buildPipelineLayout = ({ width, height, isTablet }) => {
  const horizontalPadding = isTablet ? 48 : 72;
  const y = Math.round(height * 0.33);
  const spacing = (width - horizontalPadding * 2) / (PIPELINE_STAGES.length - 1);

  const nodes = PIPELINE_STAGES.map((label, index) => {
    const x = horizontalPadding + spacing * index;
    return {
      index,
      label,
      x,
      y,
      width: isTablet ? 118 : 146,
      height: isTablet ? 40 : 48,
      phase: NODE_PHASE_MAP[index],
    };
  });

  const dashboardPanel = {
    x: Math.round(width * 0.67),
    y: Math.round(height * 0.58),
    width: Math.round(width * 0.28),
    height: Math.round(height * 0.34),
  };

  return {
    width,
    height,
    nodes,
    dashboardPanel,
  };
};

const getSegmentIndex = (progress) => {
  const segmentProgress = clamp(progress, 0, 0.999999) * (PIPELINE_STAGES.length - 1);
  return Math.floor(segmentProgress);
};

export const getFramePoint = (frame, layout, timeSeconds = 0) => {
  const nodes = layout.nodes;

  if (frame.holdTimer > 0) {
    const holdNode = nodes[3];
    return { x: holdNode.x, y: holdNode.y + Math.sin(timeSeconds * 8 + frame.id) * 2 };
  }

  const segment = getSegmentIndex(frame.progress);
  const from = nodes[segment];
  const to = nodes[Math.min(segment + 1, nodes.length - 1)];
  const local = (frame.progress * (nodes.length - 1)) - segment;

  return {
    x: lerp(from.x, to.x, local),
    y: lerp(from.y, to.y, local) + Math.sin((local + frame.id * 0.11 + timeSeconds * 1.8) * Math.PI) * 6,
  };
};

const drawBackground = (ctx, width, height, timeSeconds) => {
  const bg = ctx.createLinearGradient(0, 0, width, height);
  bg.addColorStop(0, "#0b0f19");
  bg.addColorStop(1, "#0f1728");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = "rgba(70, 95, 142, 0.2)";
  ctx.lineWidth = 1;

  const offset = (timeSeconds * 12) % 34;
  for (let x = -34; x < width + 34; x += 34) {
    ctx.beginPath();
    ctx.moveTo(x + offset, 0);
    ctx.lineTo(x + offset, height);
    ctx.stroke();
  }

  for (let y = 0; y < height + 24; y += 24) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
};

const drawLinks = (ctx, nodes, activeStage, timeSeconds) => {
  for (let i = 0; i < nodes.length - 1; i += 1) {
    const from = nodes[i];
    const to = nodes[i + 1];
    const phase = Math.max(from.phase, to.phase);
    const active = phase <= activeStage;

    const gradient = ctx.createLinearGradient(from.x, from.y, to.x, to.y);
    gradient.addColorStop(0, active ? "rgba(102, 147, 219, 0.45)" : "rgba(102, 147, 219, 0.18)");
    gradient.addColorStop(0.5, active ? "rgba(118, 185, 0, 0.78)" : "rgba(118, 185, 0, 0.26)");
    gradient.addColorStop(1, active ? "rgba(102, 147, 219, 0.45)" : "rgba(102, 147, 219, 0.18)");

    ctx.strokeStyle = gradient;
    ctx.lineWidth = active ? 3 : 1.8;
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();

    if (active) {
      const pulse = ((timeSeconds * 0.62) + i * 0.22) % 1;
      const x = lerp(from.x, to.x, pulse);
      const y = lerp(from.y, to.y, pulse);
      drawGlow(ctx, x, y, 14, "rgba(118, 185, 0, 0.65)", 0.52);
    }
  }
};

const drawNodes = (ctx, nodes, activeStage, timeSeconds, isTablet) => {
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  nodes.forEach((node) => {
    const active = node.phase <= activeStage;
    const x = node.x - node.width / 2;
    const y = node.y - node.height / 2;
    const pulse = 1 + Math.sin(timeSeconds * 4 + node.index * 0.72) * 0.05;

    if (active) {
      drawGlow(ctx, node.x, node.y, isTablet ? 32 : 42, "rgba(118, 185, 0, 0.55)", 0.38);
    }

    roundRect(ctx, x, y, node.width, node.height, 12);
    ctx.fillStyle = active ? "rgba(20, 32, 50, 0.92)" : "rgba(16, 25, 40, 0.85)";
    ctx.fill();

    ctx.lineWidth = active ? 1.6 * pulse : 1;
    ctx.strokeStyle = active ? "rgba(118, 185, 0, 0.85)" : "rgba(121, 150, 203, 0.45)";
    ctx.stroke();

    ctx.fillStyle = active ? "#e5f4c4" : "#c3d4f3";
    ctx.font = `${isTablet ? 11 : 12}px "Plus Jakarta Sans", sans-serif`;
    ctx.fillText(node.label, node.x, node.y);
  });
};

const drawFrames = (ctx, frames, layout, timeSeconds) => {
  frames.forEach((frame) => {
    const point = getFramePoint(frame, layout, timeSeconds);

    roundRect(ctx, point.x - 9, point.y - 6, 18, 12, 3);
    ctx.fillStyle = frame.color;
    ctx.fill();

    ctx.strokeStyle = frame.processed ? "rgba(193, 239, 133, 0.85)" : "rgba(151, 189, 250, 0.78)";
    ctx.lineWidth = 1;
    ctx.stroke();
  });
};

const drawDashboardPanel = (ctx, panel, cards) => {
  roundRect(ctx, panel.x, panel.y, panel.width, panel.height, 12);
  ctx.fillStyle = "rgba(12, 20, 34, 0.92)";
  ctx.fill();
  ctx.strokeStyle = "rgba(113, 163, 232, 0.5)";
  ctx.lineWidth = 1.2;
  ctx.stroke();

  ctx.fillStyle = "#d9e8ff";
  ctx.font = "600 12px 'Plus Jakarta Sans', sans-serif";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText("Operations Dashboard Output", panel.x + 12, panel.y + 10);

  const visibleCards = cards.slice(0, 3);
  visibleCards.forEach((card, index) => {
    const y = panel.y + 34 + index * 58;

    roundRect(ctx, panel.x + 10, y, panel.width - 20, 50, 8);
    ctx.fillStyle = "rgba(17, 28, 46, 0.86)";
    ctx.fill();
    ctx.strokeStyle = "rgba(118, 185, 0, 0.34)";
    ctx.stroke();

    ctx.fillStyle = "#e4f4c6";
    ctx.font = "600 11px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText(card.title, panel.x + 18, y + 8);

    ctx.fillStyle = "#9fb8e2";
    ctx.font = "500 10px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText(card.subtitle, panel.x + 18, y + 23);

    const chartX = panel.x + 18;
    const chartY = y + 37;
    const chartW = panel.width - 36;
    const barW = chartW / card.bars.length;

    card.bars.forEach((value, barIndex) => {
      const h = (value / 90) * 10;
      const x = chartX + barIndex * barW;
      ctx.fillStyle = barIndex % 2 === 0 ? "rgba(118, 185, 0, 0.7)" : "rgba(109, 156, 233, 0.7)";
      ctx.fillRect(x, chartY + (10 - h), Math.max(1, barW - 1), h);
    });
  });
};

const drawEventPopups = (ctx, popups, layout) => {
  if (!popups.length) return;
  const eventNode = layout.nodes[5];

  popups.forEach((popup, index) => {
    const width = 138;
    const height = 28;
    const x = eventNode.x - width / 2 + popup.xJitter;
    const y = eventNode.y - 68 - index * 4 + popup.yOffset;
    const alpha = clamp(popup.ttl / 1.8, 0.18, 1);

    ctx.globalAlpha = alpha;
    roundRect(ctx, x, y, width, height, 8);
    ctx.fillStyle = "rgba(9, 16, 27, 0.95)";
    ctx.fill();
    ctx.strokeStyle = "rgba(118, 185, 0, 0.78)";
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = "#e5f4c4";
    ctx.font = "600 11px 'Plus Jakarta Sans', sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(popup.label, x + width / 2, y + height / 2);
    ctx.globalAlpha = 1;
  });
};

export const renderPipelineScene = ({
  ctx,
  width,
  height,
  layout,
  frames,
  cards,
  popups,
  activeStage,
  timeSeconds,
  isTablet,
}) => {
  drawBackground(ctx, width, height, timeSeconds);
  drawLinks(ctx, layout.nodes, activeStage, timeSeconds);
  drawNodes(ctx, layout.nodes, activeStage, timeSeconds, isTablet);
  drawFrames(ctx, frames, layout, timeSeconds);
  drawEventPopups(ctx, popups, layout);
  drawDashboardPanel(ctx, layout.dashboardPanel, cards);
};
