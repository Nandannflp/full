"use client";

import { motion } from "framer-motion";
import { Search, PenTool, Rocket, LineChart } from "lucide-react";
import { SectionHeading } from "./section-heading";

const EASE = [0.16, 1, 0.3, 1] as const;

const STEPS = [
  {
    icon: Search,
    step: "01",
    title: "Discover & Audit",
    description:
      "We analyze your market, audience, and funnel to uncover the biggest growth opportunities — powered by AI insights.",
  },
  {
    icon: PenTool,
    step: "02",
    title: "Design & Build",
    description:
      "Our team crafts a premium, conversion-first digital experience and integrates AI automations tailored to your goals.",
  },
  {
    icon: Rocket,
    step: "03",
    title: "Launch & Scale",
    description:
      "We deploy, optimize, and activate lead-generation engines that fill your pipeline from day one.",
  },
  {
    icon: LineChart,
    step: "04",
    title: "Measure & Optimize",
    description:
      "Continuous AI-driven A/B testing and analytics keep performance compounding month over month.",
  },
];

export function Solutions() {
  return (
    <section
      id="solutions"
      className="relative mx-auto w-full max-w-7xl scroll-mt-24 px-4 py-20 sm:px-6 lg:py-28"
    >
      <SectionHeading
        kicker="How it works"
        title="A proven path from"
        highlight="idea to impact"
        description="Our four-step framework combines strategy, design, and AI automation to deliver measurable growth — fast."
      />

      <div className="relative mt-16">
        {/* connecting line */}
        <div className="pointer-events-none absolute left-0 right-0 top-9 hidden h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent lg:block" />

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.1 }}
              className="group relative"
            >
              {/* node */}
              <div className="relative z-10 mx-auto mb-6 flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-2xl glass-card transition-all duration-500 group-hover:glow-blue sm:mx-0">
                <s.icon className="h-7 w-7 text-[#38bdf8] transition-transform duration-500 group-hover:scale-110" />
                <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-[10px] font-bold text-foreground shadow-[0_0_16px_-2px_rgba(59,130,246,0.8)]">
                  {s.step}
                </span>
              </div>
              <h3 className="text-center text-lg font-bold text-foreground sm:text-left">
                {s.title}
              </h3>
              <p className="mt-2 text-center text-sm leading-relaxed text-muted-foreground sm:text-left">
                {s.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
