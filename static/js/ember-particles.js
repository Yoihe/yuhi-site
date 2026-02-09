/**
 * Ember Particle System
 * Canvas-based animated particles with fire/water color palette
 */
(function() {
  'use strict';

  const canvas = document.getElementById('ember-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  // Particle configuration
  const config = {
    particleCount: 60,
    maxLife: 180,
    minSize: 2,
    maxSize: 6,
    speedY: { min: 0.5, max: 2 },
    speedX: { min: -0.5, max: 0.5 },
    fadeRate: 0.004,
    colors: [
      { r: 255, g: 107, b: 53, name: 'fire' },    // #ff6b35
      { r: 46, g: 134, b: 222, name: 'water' },    // #2e86de
      { r: 254, g: 202, b: 87, name: 'electric' }  // #feca57
    ]
  };

  let particles = [];
  let animationId = null;
  let width = 0;
  let height = 0;

  /**
   * Resize canvas to fill viewport
   */
  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  }

  /**
   * Create a new ember particle
   */
  function createParticle() {
    const color = config.colors[Math.floor(Math.random() * config.colors.length)];
    return {
      x: Math.random() * width,
      y: height + Math.random() * 50,
      size: config.minSize + Math.random() * (config.maxSize - config.minSize),
      speedY: config.speedY.min + Math.random() * (config.speedY.max - config.speedY.min),
      speedX: config.speedX.min + Math.random() * (config.speedX.max - config.speedX.min),
      life: 0,
      maxLife: config.maxLife * (0.7 + Math.random() * 0.6),
      color: color,
      opacity: 0.6 + Math.random() * 0.4,
      wobble: Math.random() * Math.PI * 2
    };
  }

  /**
   * Initialize particle pool
   */
  function init() {
    resize();
    particles = [];
    for (let i = 0; i < config.particleCount; i++) {
      const p = createParticle();
      p.y = Math.random() * height;
      p.life = Math.random() * p.maxLife;
      particles.push(p);
    }
  }

  /**
   * Update particle state
   */
  function updateParticle(p) {
    // Movement with slight wobble
    p.wobble += 0.02;
    p.x += p.speedX + Math.sin(p.wobble) * 0.3;
    p.y -= p.speedY;
    p.life++;

    // Opacity based on life (fade in and out)
    const lifeRatio = p.life / p.maxLife;
    if (lifeRatio < 0.1) {
      p.opacity = lifeRatio * 10 * 0.7;
    } else if (lifeRatio > 0.7) {
      p.opacity = (1 - lifeRatio) * 0.7;
    }

    // Reset dead particles
    if (p.life >= p.maxLife || p.opacity <= 0) {
      Object.assign(p, createParticle());
    }

    // Wrap horizontal
    if (p.x < -20) p.x = width + 20;
    if (p.x > width + 20) p.x = -20;
  }

  /**
   * Draw a single particle
   */
  function drawParticle(p) {
    const { r, g, b } = p.color;
    const alpha = Math.max(0, p.opacity);

    // Glow effect
    const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
    gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${alpha})`);
    gradient.addColorStop(0.4, `rgba(${r}, ${g}, ${b}, ${alpha * 0.5})`);
    gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();

    // Core
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${Math.min(255, r + 50)}, ${Math.min(255, g + 50)}, ${Math.min(255, b + 50)}, ${alpha})`;
    ctx.fill();
  }

  /**
   * Main render loop
   */
  function render() {
    // Clear with slight trail effect
    ctx.fillStyle = 'rgba(15, 20, 25, 0.15)';
    ctx.fillRect(0, 0, width, height);

    // Update and draw particles
    particles.forEach(p => {
      updateParticle(p);
      drawParticle(p);
    });

    animationId = requestAnimationFrame(render);
  }

  /**
   * Start the particle system
   */
  function start() {
    if (animationId) return;
    init();
    render();
  }

  /**
   * Stop the particle system
   */
  function stop() {
    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
  }

  // Event listeners
  window.addEventListener('resize', resize);

  // Start when page is visible
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stop();
    } else {
      start();
    }
  });

  // Initialize
  start();
})();
