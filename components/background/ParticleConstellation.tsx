"use client";

import { useEffect, useRef } from "react";

export const CANVAS_STYLE = {
  connectionColor: "rgba(91,192,222,0.22)",
  particleColor: "rgba(244,214,176,0.65)",
  particleRadius: 1.4,
} as const;

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export const PARTICLE_CONFIG = {
  maxParticles: 60,
  connectionDistance: 120,
  pointerRadius: 160,
  maxDevicePixelRatio: 1.5,
  minViewportWidth: 640,
} as const;

export function applyPointerInfluence(
  particle: Particle,
  pointer: { x: number; y: number },
  radius: number,
): Particle {
  const dx = particle.x - pointer.x;
  const dy = particle.y - pointer.y;
  if (dx ** 2 + dy ** 2 >= radius ** 2) {
    return particle;
  }
  return { ...particle, x: particle.x + dx * 0.01, y: particle.y + dy * 0.01 };
}

export function createParticles(width: number, height: number): Particle[] {
  const count = Math.min(
    PARTICLE_CONFIG.maxParticles,
    Math.max(12, Math.floor((width * height) / 12000)),
  );

  return Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.35,
    vy: (Math.random() - 0.5) * 0.35,
  }));
}

export function ParticleConstellation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || window.innerWidth < PARTICLE_CONFIG.minViewportWidth) {
      return;
    }

    const motionQuery = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (motionQuery?.matches) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    let width = 0;
    let height = 0;
    let frame = 0;
    let running = false;
    let particles: Particle[] = [];
    const pointer = { x: Number.NEGATIVE_INFINITY, y: Number.NEGATIVE_INFINITY };

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      width = bounds.width || window.innerWidth;
      height = bounds.height || window.innerHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, PARTICLE_CONFIG.maxDevicePixelRatio);
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      particles = createParticles(width, height);
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);
      context.strokeStyle = CANVAS_STYLE.connectionColor;
      context.fillStyle = CANVAS_STYLE.particleColor;

      for (const particle of particles) {
        particle.x += particle.vx;
        particle.y += particle.vy;
        if (particle.x < 0 || particle.x > width) {
          particle.vx *= -1;
        }
        if (particle.y < 0 || particle.y > height) {
          particle.vy *= -1;
        }

        const influenced = applyPointerInfluence(particle, pointer, PARTICLE_CONFIG.pointerRadius);
        particle.x = influenced.x;
        particle.y = influenced.y;

        context.beginPath();
        context.arc(particle.x, particle.y, CANVAS_STYLE.particleRadius, 0, Math.PI * 2);
        context.fill();
      }

      for (let first = 0; first < particles.length; first += 1) {
        for (let second = first + 1; second < particles.length; second += 1) {
          const dx = particles[first]?.x ?? 0;
          const dy = particles[first]?.y ?? 0;
          const distanceSquared = (dx - (particles[second]?.x ?? 0)) ** 2 + (dy - (particles[second]?.y ?? 0)) ** 2;
          if (distanceSquared < PARTICLE_CONFIG.connectionDistance ** 2) {
            context.beginPath();
            context.moveTo(dx, dy);
            context.lineTo(particles[second]?.x ?? 0, particles[second]?.y ?? 0);
            context.stroke();
          }
        }
      }
    };

    const tick = () => {
      if (!running) {
        return;
      }
      draw();
      frame = window.requestAnimationFrame(tick);
    };

    const start = () => {
      if (running || document.hidden) {
        return;
      }
      running = true;
      frame = window.requestAnimationFrame(tick);
    };

    const stop = () => {
      running = false;
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
      frame = 0;
    };

    const handlePointerMove = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
    };

    const handleVisibility = () => {
      if (document.hidden) {
        stop();
      } else {
        start();
      }
    };

    const handleMotionChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        stop();
      } else {
        start();
      }
    };

    resize();
    start();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("visibilitychange", handleVisibility);
    motionQuery?.addEventListener?.("change", handleMotionChange);

    return () => {
      stop();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("visibilitychange", handleVisibility);
      motionQuery?.removeEventListener?.("change", handleMotionChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-20 h-full w-full motion-reduce:hidden"
    />
  );
}
