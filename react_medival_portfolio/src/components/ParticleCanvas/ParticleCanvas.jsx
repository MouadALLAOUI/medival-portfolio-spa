import { useEffect, useRef } from 'react';
import styles from './ParticleCanvas.module.scss';

class Particle {
  constructor(width, height) {
    this.reset(width, height);
    this.y = Math.random() * height; // Start at random height initially
  }

  reset(width, height) {
    this.x = Math.random() * width;
    this.y = height + Math.random() * 20;
    this.size = Math.random() * 2.5 + 0.5;
    this.speedY = Math.random() * 0.4 + 0.15; // Slow drift upwards
    this.speedX = (Math.random() - 0.5) * 0.2; // Subtle swaying
    this.alpha = Math.random() * 0.5 + 0.1;
    this.fadeSpeed = Math.random() * 0.002 + 0.001;
  }

  update(width, height) {
    this.y -= this.speedY;
    this.x += this.speedX;
    
    // Drift and fade out as it goes up
    if (this.y < height * 0.7) {
      this.alpha -= this.fadeSpeed;
    }

    if (this.y < 0 || this.alpha <= 0) {
      this.reset(width, height);
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    
    const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#d4af37';
    ctx.fillStyle = accentColor;
    ctx.globalAlpha = this.alpha;
    ctx.shadowBlur = this.size * 2;
    ctx.shadowColor = accentColor;
    ctx.fill();
    ctx.restore();
  }
}

const ParticleCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const particles = [];
    const particleCount = 45;

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(width, height));
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.update(width, height);
        p.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
};

export default ParticleCanvas;
