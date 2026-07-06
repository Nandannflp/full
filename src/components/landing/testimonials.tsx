"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { SectionHeading } from "./section-heading";

const EASE = [0.16, 1, 0.3, 1] as const;

const TESTIMONIALS = [
  {
    name: "Sarah Chen",
    role: "CEO, Nebula Finance",
    initials: "SC",
    gradient: "from-rose-500 to-[#3b82f6]",
    review:
      "Adwiser transformed our lead pipeline. Within 3 months we saw a 212% increase in qualified leads. Their AI automation runs our entire nurture sequence.",
    rating: 5,
    delay: 0,
  },
  {
    name: "Marcus Reid",
    role: "Founder, Vertex Commerce",
    initials: "MR",
    gradient: "from-rose-500 to-orange-500",
    review:
      "The website they built is genuinely award-worthy. Fast, beautiful, and it converts. Our AOV jumped 340% after launch. Worth every penny.",
    rating: 5,
    delay: 1.2,
  },
  {
    name: "Aisha Patel",
    role: "CMO, Lumen Health",
    initials: "AP",
    gradient: "from-[#06b6d4] to-[#38bdf8]",
    review:
      "Their AI assistant handles patient triage 24/7. Satisfaction hit 98% and our team finally has bandwidth to focus on care, not admin.",
    rating: 5,
    delay: 2.4,
  },
  {
    name: "David Kim",
    role: "Director, Orbit Studio",
    initials: "DK",
    gradient: "from-[#38bdf8] to-[#2563eb]",
    review:
      "Working with Adwiser felt like adding a senior growth team overnight. Strategic, fast, and relentlessly focused on results.",
    rating: 5,
    delay: 0.6,
  },
  {
    name: "Elena Voss",
    role: "VP Growth, Pulse Analytics",
    initials: "EV",
    gradient: "from-rose-500 to-orange-500",
    review:
      "We process 10M+ events a day and their dashboards make it all legible. The automation alone saved us 30 hours a week.",
    rating: 5,
    delay: 1.8,
  },
  {
    name: "Tom Bradley",
    role: "Owner, Bradley & Co",
    initials: "TB",
    gradient: "from-rose-500 to-[#38bdf8]",
    review:
      "I've worked with many agencies. None come close to Adwiser's blend of design taste and technical depth. True partners.",
    rating: 5,
    delay: 3,
  },
];

export function Testimonials() {
  return (
    <section className="relative mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
      <SectionHeading
        kicker="Testimonials"
        title="Loved by founders &"
        highlight="growth teams"
        description="Don't just take our word for it — here's what the people driving real growth have to say."
      />

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {TESTIMONIALS.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: EASE, delay: (i % 3) * 0.1 }}
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: t.delay,
              }}
              className="group relative h-full rounded-[24px] glass-card p-6 transition-shadow duration-500 hover:glow-blue-sm"
            >
              <Quote className="absolute right-5 top-5 h-8 w-8 text-[#3b82f6]/20" />
              <div className="mb-4 flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star
                    key={j}
                    className="h-4 w-4 fill-[#38bdf8] text-[#38bdf8]"
                  />
                ))}
              </div>
              <p className="relative z-10 text-sm leading-relaxed text-slate-300">
                "{t.review}"
              </p>
              <div className="mt-6 flex items-center gap-3 border-t border-slate-900/10 pt-4">
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${t.gradient} text-sm font-bold text-white ring-2 ring-white/10`}
                >
                  {t.initials}
                </span>
                <div>
                  <div className="text-sm font-semibold text-white">
                    {t.name}
                  </div>
                  <div className="text-xs text-slate-400">{t.role}</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
