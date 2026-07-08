"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { SectionHeading } from "./section-heading";

const EASE = [0.16, 1, 0.3, 1] as const;

const PROJECTS = [
  {
    name: "Nebula Finance",
    category: "Fintech SaaS",
    description: "AI-powered portfolio dashboard with real-time analytics.",
    metric: "+212% conversions",
    gradient: "from-primary via-secondary to-accent",
  },
  {
    name: "Lumen Health",
    category: "Healthcare",
    description: "Patient engagement platform with AI triage assistant.",
    metric: "98% satisfaction",
    gradient: "from-[#06b6d4] via-[#38bdf8] to-[#3b82f6]",
  },
  {
    name: "Vertex Commerce",
    category: "E-commerce",
    description: "Headless storefront with AI product recommendations.",
    metric: "+340% AOV",
    gradient: "from-primary via-[#2563eb] to-[#38bdf8]",
  },
  {
    name: "Orbit Studio",
    category: "Creative Agency",
    description: "Award-winning portfolio with immersive motion design.",
    metric: "5 awards won",
    gradient: "from-[#38bdf8] via-[#06b6d4] to-[#2563eb]",
  },
  {
    name: "Pulse Analytics",
    category: "Data Platform",
    description: "Real-time data visualization suite for enterprises.",
    metric: "10M+ events/day",
    gradient: "from-primary via-[#06b6d4] to-[#3b82f6]",
  },
];

export function Showcase() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector("[data-card]") as HTMLElement | null;
    const amount = card ? card.offsetWidth + 24 : 420;
    track.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <section
      id="showcase"
      className="relative mx-auto w-full max-w-7xl scroll-mt-24 px-4 py-20 sm:px-6 lg:py-28"
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          align="left"
          kicker="Selected work"
          title="Premium websites that"
          highlight="convert & captivate"
          description="A glimpse of the digital experiences we've engineered for ambitious brands across industries."
        />
        <div className="flex gap-2">
          <button
            onClick={() => scrollBy(-1)}
            aria-label="Previous projects"
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-900/10 bg-slate-900/5 text-foreground transition-all hover:border-[#3b82f6]/50 hover:bg-[#3b82f6]/10 hover:text-[#38bdf8]"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => scrollBy(1)}
            aria-label="Next projects"
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-900/10 bg-slate-900/5 text-foreground transition-all hover:border-[#3b82f6]/50 hover:bg-[#3b82f6]/10 hover:text-[#38bdf8]"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-6"
      >
        {PROJECTS.map((p, i) => (
          <motion.div
            key={p.name}
            data-card
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, ease: EASE, delay: i * 0.05 }}
            className="group relative w-[88vw] shrink-0 snap-center sm:w-[460px]"
          >
            <MacBook gradient={p.gradient} name={p.name} />
            <div className="mt-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#38bdf8]">
                  {p.category}
                </p>
                <h3 className="mt-1 text-xl font-bold text-foreground">{p.name}</h3>
                <p className="mt-1 max-w-xs text-sm text-muted-foreground">
                  {p.description}
                </p>
              </div>
              <span className="shrink-0 rounded-full border border-[#3b82f6]/30 bg-[#3b82f6]/10 px-3 py-1 text-xs font-semibold text-[#38bdf8]">
                {p.metric}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function MacBook({ gradient, name }: { gradient: string; name: string }) {
  return (
    <div className="relative">
      {/* Screen */}
      <div className="relative rounded-[14px] border border-slate-900/10 bg-[#0a1428] p-1.5 shadow-[0_30px_60px_-20px_rgba(2,6,23,0.9)] transition-all duration-500 group-hover:shadow-[0_30px_70px_-15px_rgba(37,99,235,0.5)]">
        <div className="overflow-hidden rounded-[10px]">
          <div className="relative aspect-[16/10]">
            {/* faux site */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-90`}
            />
            <div className="absolute inset-0 bg-[#0A0A0A]/55" />
            <div className="absolute inset-0 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="h-4 w-4 rounded bg-[#0A0A0A]/80" />
                  <div className="h-2 w-16 rounded-full bg-[#0A0A0A]/40" />
                </div>
                <div className="flex gap-2">
                  <div className="h-1.5 w-8 rounded-full bg-[#0A0A0A]/20" />
                  <div className="h-1.5 w-8 rounded-full bg-[#0A0A0A]/20" />
                  <div className="h-1.5 w-8 rounded-full bg-[#0A0A0A]/60" />
                </div>
              </div>
              <div className="mt-8 space-y-2">
                <div className="h-4 w-2/3 rounded-full bg-[#0A0A0A]/80" />
                <div className="h-4 w-1/2 rounded-full bg-slate-900/50" />
              </div>
              <div className="mt-4 h-6 w-24 rounded-md bg-[#0A0A0A]/90" />
              <div className="mt-6 grid grid-cols-3 gap-2">
                <div className="h-12 rounded-lg bg-[#0A0A0A]/10 backdrop-blur" />
                <div className="h-12 rounded-lg bg-[#0A0A0A]/10 backdrop-blur" />
                <div className="h-12 rounded-lg bg-[#0A0A0A]/10 backdrop-blur" />
              </div>
            </div>
            {/* reflection */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            {/* hover overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <span className="flex items-center gap-2 rounded-full bg-[#0A0A0A]/15 px-4 py-2 text-xs font-semibold text-foreground backdrop-blur-md">
                <ExternalLink className="h-3.5 w-3.5" /> View {name}
              </span>
            </div>
          </div>
        </div>
        {/* camera notch */}
        <div className="absolute left-1/2 top-0 h-1 w-1 -translate-x-1/2 rounded-full bg-[#0A0A0A]/20" />
      </div>
      {/* Base / hinge */}
      <div className="relative mx-auto h-3 w-[112%] -translate-x-[5.3%] rounded-b-[10px] rounded-t-[3px] bg-gradient-to-b from-[#1e293b] to-[#0f172a]">
        <div className="absolute left-1/2 top-0 h-1 w-20 -translate-x-1/2 rounded-b-lg bg-[#0A0A0A]" />
      </div>
    </div>
  );
}
