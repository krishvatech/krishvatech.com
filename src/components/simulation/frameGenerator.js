export const SIM_EVENT_LABELS = ["Worker Detected", "Process Anomaly", "Object Detected"];

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

const randomFrom = (list) => list[Math.floor(Math.random() * list.length)];

export const createFrame = ({ id, now, simplified = false }) => ({
  id,
  createdAt: now,
  progress: 0,
  speed: (simplified ? 0.17 : 0.22) + Math.random() * (simplified ? 0.06 : 0.09),
  holdTimer: 0,
  processed: false,
  eventLabel: null,
  eventEmitted: false,
  color: "#7eb4ff",
});

export const spawnFrames = ({ state, now, maxFrames, spawnInterval, simplified }) => {
  if (state.frames.length >= maxFrames) return;
  if (now - state.lastSpawnAt < spawnInterval) return;

  state.frameSeq += 1;
  state.lastSpawnAt = now;
  state.frames.push(createFrame({ id: state.frameSeq, now, simplified }));
};

export const updateFrames = ({
  frames,
  delta,
  now,
  onEvent,
  onComplete,
  gpuHoldSeconds = [0.18, 0.42],
  eventChance = 0.35,
}) => {
  const nextFrames = [];

  for (let i = 0; i < frames.length; i += 1) {
    const frame = { ...frames[i] };

    if (frame.holdTimer > 0) {
      frame.holdTimer -= delta;
      if (frame.holdTimer < 0) frame.holdTimer = 0;
      nextFrames.push(frame);
      continue;
    }

    frame.progress = clamp(frame.progress + frame.speed * delta, 0, 1.25);

    if (!frame.processed && frame.progress >= 0.5) {
      frame.holdTimer = gpuHoldSeconds[0] + Math.random() * (gpuHoldSeconds[1] - gpuHoldSeconds[0]);
      frame.processed = true;
      frame.color = "#88d53a";
      nextFrames.push(frame);
      continue;
    }

    if (!frame.eventEmitted && frame.progress >= 0.81) {
      frame.eventEmitted = true;
      if (Math.random() < eventChance) {
        frame.eventLabel = randomFrom(SIM_EVENT_LABELS);
        if (onEvent) onEvent(frame.eventLabel, frame.id, now);
      }
    }

    if (frame.progress >= 1) {
      if (onComplete) onComplete(frame, now);
      continue;
    }

    nextFrames.push(frame);
  }

  return nextFrames;
};

const createSparkline = () =>
  Array.from({ length: 10 }).map(() => 18 + Math.round(Math.random() * 60));

export const createDashboardCard = ({ frame, now }) => ({
  id: `sim-card-${frame.id}-${Math.round(now)}`,
  title: frame.eventLabel || "Frame Processed",
  subtitle: frame.eventLabel ? "Edge Event Generated" : "Metadata Updated",
  bars: createSparkline(),
  ttl: 7.5,
});

export const tickDashboardCards = (cards, delta) =>
  cards
    .map((card) => {
      const bars = card.bars.map((value, index) => {
        const wave = Math.sin((performance.now() * 0.0012) + index) * 3.6;
        return clamp(Math.round(value + wave), 10, 86);
      });

      return {
        ...card,
        ttl: card.ttl - delta,
        bars,
      };
    })
    .filter((card) => card.ttl > 0);

export const tickPopups = (popups, delta) =>
  popups
    .map((popup) => ({
      ...popup,
      ttl: popup.ttl - delta,
      yOffset: popup.yOffset - delta * 18,
    }))
    .filter((popup) => popup.ttl > 0);
