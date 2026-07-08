"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const STATS = [
  { value: 500, suffix: "+", label: "Projects Delivered", sub: "Across 20+ industries" },
  { value: 10, suffix: "M+", label: "Leads Generated", sub: "For our clients" },
  { value: 98, suffix: "%", label: "Client Satisfaction", sub: "Retention rate" },
  { value: 24, suffix: "/7", label: "Support", sub: "Always available" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const duration = 1800;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section id="why-adwiser" className="relative mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
      <div className="relative overflow-hidden rounded-[28px] glass-card p-8 sm:p-12">
        {/* glow accents */}
        <div className="pointer-events-none absolute -left-20 -top-20 h-60 w-60 rounded-full bg-[#2563eb]/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-[#06b6d4]/20 blur-3xl" />

        <div className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.1 }}
              className="relative text-center sm:text-left"
            >
              <div className="bg-gradient-to-br from-primary via-secondary to-accent bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-6xl">
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-3 text-base font-semibold text-foreground">
                {s.label}
              </div>
              <div className="mt-1 text-sm text-muted-foreground">{s.sub}</div>
              {i < STATS.length - 1 && (
                <div className="absolute right-0 top-1/2 hidden h-16 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-white/15 to-transparent lg:block" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
