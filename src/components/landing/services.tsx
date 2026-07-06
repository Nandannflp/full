"use client";

import { motion } from "framer-motion";
import { Target, Code2, Bot, ArrowUpRight, Check } from "lucide-react";
import { SectionHeading } from "./section-heading";

const EASE = [0.16, 1, 0.3, 1] as const;

const SERVICES = [
  {
    id: "lead-gen",
    icon: Target,
    title: "Lead Generation",
    tagline: "Quality leads on autopilot",
    description:
      "AI-driven funnels, smart capture forms, and intent scoring that deliver qualified prospects directly to your pipeline — 24/7.",
    points: [
      "AI intent scoring",
      "Multi-channel capture",
      "Smart nurture sequences",
      "Real-time CRM sync",
    ],
    accent: "from-rose-500 to-[#3b82f6]",
    visual: <LeadGenVisual />,
  },
  {
    id: "web-dev",
    icon: Code2,
    title: "Website Development",
    tagline: "Premium, lightning-fast sites",
    description:
      "Award-worthy websites engineered for speed, SEO, and conversion. Built with modern stacks and pixel-perfect craft.",
    points: [
      "Next-gen performance",
      "Conversion-optimized UX",
      "SEO-ready architecture",
      "Headless CMS",
    ],
    accent: "from-rose-500 to-orange-500",
    visual: <WebDevVisual />,
  },
  {
    id: "ai-automation",
    icon: Bot,
    title: "AI Automation",
    tagline: "Intelligent workflows that scale",
    description:
      "Automate support, follow-ups, reporting, and operations with custom AI agents that work around the clock.",
    points: [
      "Custom AI agents",
      "Workflow automation",
      "Smart chat support",
      "Predictive analytics",
    ],
    accent: "from-[#06b6d4] to-[#38bdf8]",
    visual: <AIVisual />,
  },
];

export function Services() {
  return (
    <section
      id="services"
      className="relative mx-auto w-full max-w-7xl scroll-mt-24 px-4 py-20 sm:px-6 lg:py-28"
    >
      <SectionHeading
        kicker="What we do"
        title="Premium solutions for"
        highlight="explosive growth"
        description="Three pillars engineered to turn attention into revenue — each powered by AI and crafted with obsessive attention to detail."
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {SERVICES.map((s, i) => (
          <motion.article
            key={s.id}
            id={s.id}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: EASE, delay: i * 0.1 }}
            className="animated-border group relative flex flex-col overflow-hidden rounded-[24px] glass-card p-6 transition-transform duration-500 hover:-translate-y-2 sm:p-7"
          >
            {/* glow on hover */}
            <div
              className="pointer-events-none absolute -inset-px -z-10 rounded-[24px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(60% 60% at 50% 0%, rgba(59,130,246,0.18) 0%, transparent 70%)",
              }}
            />

            {/* visual */}
            <div className="relative mb-6 h-40 overflow-hidden rounded-2xl border border-slate-900/10 bg-[#070f22]">
              {s.visual}
            </div>

            {/* icon + title */}
            <div className="mb-3 flex items-center gap-3">
              <span
                className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${s.accent} shadow-[0_8px_24px_-8px_rgba(37,99,235,0.7)]`}
              >
                <s.icon className="h-5 w-5 text-white" />
              </span>
              <div>
                <h3 className="text-lg font-bold text-white">{s.title}</h3>
                <p className="text-xs text-[#38bdf8]">{s.tagline}</p>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-slate-400/85">
              {s.description}
            </p>

            <ul className="mt-5 grid grid-cols-2 gap-2">
              {s.points.map((p) => (
                <li
                  key={p}
                  className="flex items-center gap-1.5 text-xs text-slate-400"
                >
                  <Check className="h-3.5 w-3.5 shrink-0 text-[#38bdf8]" />
                  {p}
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-white transition-colors hover:text-[#38bdf8]"
            >
              Learn more
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

/* ---------- Service visuals ---------- */
function LeadGenVisual() {
  return (
    <div className="relative h-full w-full p-4">
      <div className="absolute inset-0 dot-pattern opacity-40" />
      {/* funnel */}
      <div className="relative flex flex-col items-center gap-1.5 pt-2">
        {[
          { w: "w-full", l: "Visitors", n: "12,480", c: "text-slate-400" },
          { w: "w-[78%]", l: "Engaged", n: "6,210", c: "text-slate-400" },
          { w: "w-[54%]", l: "Qualified", n: "2,940", c: "text-[#38bdf8]" },
          { w: "w-[32%]", l: "Leads", n: "812", c: "text-[#06b6d4]" },
        ].map((row, i) => (
          <motion.div
            key={row.l}
            initial={{ opacity: 0, scaleX: 0.6 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.12, ease: EASE }}
            className={`relative ${row.w} rounded-lg border border-slate-900/10 bg-gradient-to-r from-[#0d1830] to-[#0a1430] px-3 py-1.5`}
          >
            <div className="flex items-center justify-between text-[10px]">
              <span className="text-slate-400">{row.l}</span>
              <span className={`font-bold ${row.c}`}>{row.n}</span>
            </div>
          </motion.div>
        ))}
      </div>
      {/* pulsing dot */}
      <motion.span
        animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute right-6 top-3 h-2 w-2 rounded-full bg-[#22c55e] shadow-[0_0_12px_2px_rgba(34,197,94,0.7)]"
      />
    </div>
  );
}

function WebDevVisual() {
  return (
    <div className="relative h-full w-full p-3">
      {/* browser mockup */}
      <div className="overflow-hidden rounded-xl border border-slate-900/10 bg-[#0a1428]">
        <div className="flex items-center gap-1 border-b border-slate-900/10 bg-slate-900/5 px-2 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#ef4444]/70" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#f59e0b]/70" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#22c55e]/70" />
          <div className="ml-2 h-3 flex-1 rounded-full bg-slate-900/5" />
        </div>
        <div className="p-3">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "70%" }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE }}
            className="h-2.5 rounded-full bg-gradient-to-r from-white/80 to-white/30"
          />
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "45%" }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
            className="mt-1.5 h-2.5 rounded-full bg-gradient-to-r from-[#38bdf8] to-orange-500"
          />
          <div className="mt-3 grid grid-cols-3 gap-1.5">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className="h-8 rounded-md bg-slate-900/5"
              />
            ))}
          </div>
        </div>
      </div>
      {/* code line */}
      <div className="mt-2 flex items-center gap-1.5 px-1 font-mono text-[9px] text-slate-400">
        <span className="text-[#3b82f6]">const</span>
        <span className="text-[#38bdf8]">site</span>
        <span className="text-slate-400">=</span>
        <span className="text-[#22c55e]">build()</span>
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="h-3 w-1.5 bg-[#38bdf8]"
        />
      </div>
    </div>
  );
}

function AIVisual() {
  return (
    <div className="relative h-full w-full p-4">
      {/* neural nodes */}
      <svg viewBox="0 0 200 120" className="h-full w-full">
        <defs>
          <linearGradient id="ai-line" x1="0" y1="0" x2="200" y2="0">
            <stop stopColor="#3b82f6" />
            <stop offset="1" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
        {/* connections */}
        {[
          [20, 30, 100, 60],
          [20, 60, 100, 60],
          [20, 90, 100, 60],
          [100, 60, 180, 30],
          [100, 60, 180, 60],
          [100, 60, 180, 90],
        ].map((c, i) => (
          <motion.line
            key={i}
            x1={c[0]}
            y1={c[1]}
            x2={c[2]}
            y2={c[3]}
            stroke="url(#ai-line)"
            strokeWidth="1"
            strokeOpacity="0.5"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.08 }}
          />
        ))}
        {/* pulses along lines */}
        {[
          [20, 30, 100, 60],
          [100, 60, 180, 60],
        ].map((c, i) => (
          <motion.circle
            key={`p${i}`}
            r="2.5"
            fill="#38bdf8"
            initial={{ cx: c[0], cy: c[1] }}
            animate={{ cx: [c[0], c[2]], cy: [c[1], c[3]] }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.6,
            }}
          />
        ))}
        {/* nodes */}
        {[
          [20, 30],
          [20, 60],
          [20, 90],
          [100, 60],
          [180, 30],
          [180, 60],
          [180, 90],
        ].map(([cx, cy], i) => (
          <circle
            key={`n${i}`}
            cx={cx}
            cy={cy}
            r="5"
            fill="#0a1428"
            stroke="url(#ai-line)"
            strokeWidth="1.5"
          />
        ))}
      </svg>
      <div className="absolute bottom-2 left-3 right-3 rounded-md bg-slate-900/5 px-2 py-1 font-mono text-[9px] text-slate-400">
        <span className="text-[#38bdf8]">ai.run</span>(workflow){" "}
        <span className="text-[#22c55e]">→ automated</span>
      </div>
    </div>
  );
}
