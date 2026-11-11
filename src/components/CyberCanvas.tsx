import React, { useEffect, useRef } from 'react';
import { calculateLaserDistance } from '../utils/cyberEffects';

interface CyberCanvasProps {
  isOverdrive: boolean;
  accentColor?: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseAlpha: number;
  hueShift: number;
}

export const CyberCanvas: React.FC<CyberCanvasProps> = ({ isOverdrive, accentColor = '#0099ff' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: -100, y: -100, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
    };
    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Initialize particles
    const count = isOverdrive ? 65 : 40;
    const particles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * (isOverdrive ? 1.8 : 0.8),
        vy: (Math.random() - 0.5) * (isOverdrive ? 1.8 : 0.8),
        size: Math.random() * 2.2 + 1,
        baseAlpha: Math.random() * 0.5 + 0.3,
        hueShift: Math.random() * 30
      });
    }

    let scanlineY = 0;
    let lastRenderTime = 0;

    const render = (now: number) => {
      animId = requestAnimationFrame(render);
      if (now - lastRenderTime < 28) return; // 35 FPS throttle for smooth lossless CPU performance
      lastRenderTime = now;
      ctx.clearRect(0, 0, width, height);

      // In overdrive, render a high-tech moving horizontal laser scanline
      if (isOverdrive) {
        scanlineY = (scanlineY + 3.5) % height;
        const grad = ctx.createLinearGradient(0, scanlineY - 40, 0, scanlineY + 40);
        grad.addColorStop(0, 'rgba(0, 153, 255, 0)');
        grad.addColorStop(0.5, 'rgba(0, 220, 255, 0.18)');
        grad.addColorStop(1, 'rgba(0, 153, 255, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, scanlineY - 40, width, 80);

        ctx.strokeStyle = 'rgba(56, 189, 248, 0.45)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, scanlineY);
        ctx.lineTo(width, scanlineY);
        ctx.stroke();
      }

      // Update & Draw Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx * (isOverdrive ? 1.6 : 1);
        p.y += p.vy * (isOverdrive ? 1.6 : 1);

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Draw particle dot
        ctx.fillStyle = isOverdrive ? '#38bdf8' : accentColor;
        ctx.globalAlpha = p.baseAlpha * (isOverdrive ? 1 : 0.6);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (isOverdrive ? 1.3 : 1), 0, Math.PI * 2);
        ctx.fill();

        // Connect with other particles via laser lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const { alpha, connects } = calculateLaserDistance(p.x, p.y, p2.x, p2.y, isOverdrive ? 140 : 95);
          if (connects) {
            ctx.strokeStyle = isOverdrive ? '#00e5ff' : accentColor;
            ctx.globalAlpha = alpha * (isOverdrive ? 0.35 : 0.14);
            ctx.lineWidth = isOverdrive ? 1.2 : 0.8;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Connect with interactive mouse
        if (mouseRef.current.active) {
          const m = mouseRef.current;
          const { alpha, connects } = calculateLaserDistance(p.x, p.y, m.x, m.y, isOverdrive ? 180 : 120);
          if (connects) {
            ctx.strokeStyle = isOverdrive ? '#ffffff' : '#38bdf8';
            ctx.globalAlpha = alpha * (isOverdrive ? 0.6 : 0.3);
            ctx.lineWidth = isOverdrive ? 1.5 : 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(m.x, m.y);
            ctx.stroke();
          }
        }
      }

      // Draw interactive mouse HUD target reticle in Overdrive mode
      if (isOverdrive && mouseRef.current.active) {
        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;

        ctx.strokeStyle = 'rgba(0, 229, 255, 0.7)';
        ctx.lineWidth = 1.2;
        ctx.globalAlpha = 0.85;

        // Corner brackets around mouse
        const s = 14;
        const g = 6;
        // Top-left
        ctx.beginPath();
        ctx.moveTo(mx - s, my - g);
        ctx.lineTo(mx - s, my - s);
        ctx.lineTo(mx - g, my - s);
        // Top-right
        ctx.moveTo(mx + g, my - s);
        ctx.lineTo(mx + s, my - s);
        ctx.lineTo(mx + s, my - g);
        // Bottom-left
        ctx.moveTo(mx - s, my + g);
        ctx.lineTo(mx - s, my + s);
        ctx.lineTo(mx - g, my + s);
        // Bottom-right
        ctx.moveTo(mx + g, my + s);
        ctx.lineTo(mx + s, my + s);
        ctx.lineTo(mx + s, my + g);
        ctx.stroke();

        // Center dot
        ctx.fillStyle = '#00ffff';
        ctx.beginPath();
        ctx.arc(mx, my, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isOverdrive, accentColor]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-700"
      style={{ opacity: isOverdrive ? 0.95 : 0.65 }}
    />
  );
};
