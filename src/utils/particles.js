export const createParticlePool = ({ count, width, height, speedRange, radiusRange, color }) =>
  Array.from({ length: count }).map(() => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * speedRange,
    vy: (Math.random() - 0.5) * speedRange,
    radius: radiusRange.min + Math.random() * (radiusRange.max - radiusRange.min),
    alpha: 0.35 + Math.random() * 0.55,
    pulse: Math.random() * Math.PI * 2,
    color,
  }));

export const tickParticlePool = (particles, bounds, delta = 1) => {
  const { width, height } = bounds;

  particles.forEach((particle) => {
    particle.x += particle.vx * delta;
    particle.y += particle.vy * delta;

    if (particle.x < -8) particle.x = width + 8;
    if (particle.x > width + 8) particle.x = -8;
    if (particle.y < -8) particle.y = height + 8;
    if (particle.y > height + 8) particle.y = -8;

    particle.pulse += 0.02 * delta;
  });
};

export const drawParticlePool = (ctx, particles) => {
  particles.forEach((particle) => {
    const pulseAlpha = particle.alpha * (0.65 + Math.sin(particle.pulse) * 0.35);
    ctx.globalAlpha = Math.max(0.12, pulseAlpha);
    ctx.fillStyle = particle.color;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.globalAlpha = 1;
};
