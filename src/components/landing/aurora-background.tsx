"use client";

import { useEffect, useRef } from "react";

/**
 * Animated cinematic background for Adwiser.
 * Layers:
 *  1. Dark navy gradient base
 *  2. Blue glowing aurora blobs (CSS drift)
 *  3. Blurred mesh gradients
 *  4. Animated particles (canvas)
 *  5. Soft radial lights
 *  6. Noise texture overlay
 */
export function AuroraBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    type P = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      a: number;
      hue: number;
    };
    let particles: P[] = [];

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(70, Math.floor((w * h) / 22000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.8 + 0.6,
        a: Math.random() * 0.5 + 0.2,
        hue: Math.random() > 0.5 ? 340 : 25, /* pink (340) or orange (25) */
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6);
        grad.addColorStop(0, `hsla(${p.hue}, 95%, 65%, ${p.a})`);
        grad.addColorStop(1, `hsla(${p.hue}, 95%, 65%, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 6, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    if (!reduce) {
      raf = requestAnimationFrame(draw);
    } else {
      draw();
      cancelAnimationFrame(raf);
    }
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Layer 1: radial gradient base */}
      <div
        className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,#fff_0%,#f8fafc_55%,#f8fafc_100%)] dark:bg-[radial-gradient(120%_80%_at_50%_-10%,#1a1012_0%,#0A0A0A_55%,#0A0A0A_100%)]"
      />

      {/* Layer 2: aurora blobs */}
      <div className="absolute inset-0">
        <div
          className="absolute -top-32 -left-24 h-[42rem] w-[42rem] rounded-full blur-[120px] animate-aurora"
          style={{
            background:
              "radial-gradient(circle, rgba(244,63,94,0.15) 0%, rgba(244,63,94,0) 70%)",
          }}
        />
        <div
          className="absolute top-10 right-[-10%] h-[38rem] w-[38rem] rounded-full blur-[120px] animate-aurora"
          style={{
            animationDelay: "-6s",
            background:
              "radial-gradient(circle, rgba(251,146,60,0.15) 0%, rgba(251,146,60,0) 70%)",
          }}
        />
        <div
          className="absolute bottom-[-15%] left-1/3 h-[40rem] w-[40rem] rounded-full blur-[130px] animate-aurora"
          style={{
            animationDelay: "-12s",
            background:
              "radial-gradient(circle, rgba(249,115,22,0.12) 0%, rgba(249,115,22,0) 70%)",
          }}
        />
      </div>

      {/* Layer 3: blurred mesh gradient */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background:
            "conic-gradient(from 180deg at 50% 50%, rgba(244,63,94,0.15), rgba(251,146,60,0.15), rgba(251,113,133,0.1), rgba(244,63,94,0.15))",
          filter: "blur(80px)",
        }}
      />

      {/* Layer 4: animated particles */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* Layer 5: soft radial lights */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 80% 20%, rgba(251,146,60,0.05) 0%, transparent 60%), radial-gradient(50% 50% at 15% 75%, rgba(244,63,94,0.05) 0%, transparent 60%)",
        }}
      />

      {/* Subtle grid */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      {/* Layer 6: noise texture overlay */}
      <div className="absolute inset-0 noise-overlay mix-blend-overlay" />

      {/* Vignette for depth */}
      <div
        className="absolute inset-0 bg-[radial-gradient(120%_100%_at_50%_0%,transparent_50%,rgba(255,255,255,0.4)_100%)] dark:bg-[radial-gradient(120%_100%_at_50%_0%,transparent_50%,rgba(10,10,10,0.8)_100%)]"
      />
    </div>
  );
}
