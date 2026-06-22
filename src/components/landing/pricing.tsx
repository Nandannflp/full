"use client";

import { motion } from "framer-motion";
import { Check, Sparkles, Zap, Crown } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { Magnetic } from "./magnetic";

const EASE = [0.16, 1, 0.3, 1] as const;

const PLANS = [
  {
    name: "Starter",
    icon: Zap,
    price: "$1,499",
    period: "/mo",
    description: "Perfect for small businesses ready to grow online.",
    features: [
      "Premium 5-page website",
      "Basic lead capture forms",
      "SEO foundation setup",
      "Monthly analytics report",
      "Email support",
    ],
    cta: "Start Starter",
    featured: false,
  },
  {
    name: "Growth",
    icon: Sparkles,
    price: "$3,999",
    period: "/mo",
    description: "For scaling companies that need AI-powered growth.",
    features: [
      "Custom premium website",
      "AI lead generation engine",
      "AI automation workflows",
      "A/B testing & optimization",
      "Priority 24/7 support",
      "Dedicated growth manager",
    ],
    cta: "Start Growth",
    featured: true,
  },
  {
    name: "Enterprise",
    icon: Crown,
    price: "Custom",
    period: "",
    description: "Tailored solutions for high-volume operations.",
    features: [
      "Unlimited custom builds",
      "Full AI automation suite",
      "Custom AI agent training",
      "Dedicated engineering team",
      "SLA & uptime guarantees",
      "Quarterly strategy reviews",
    ],
    cta: "Contact Sales",
    featured: false,
  },
];

export function Pricing() {
  return (
    <section
      id="pricing"
      className="relative mx-auto w-full max-w-7xl scroll-mt-24 px-4 py-20 sm:px-6 lg:py-28"
    >
      <SectionHeading
        kicker="Pricing"
        title="Plans that scale with"
        highlight="your ambition"
        description="Transparent, flexible pricing engineered to deliver ROI from day one. No hidden fees, cancel anytime."
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {PLANS.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: EASE, delay: i * 0.1 }}
            className={`relative flex flex-col rounded-[24px] p-7 transition-transform duration-500 ${
              p.featured
                ? "glass-card gradient-border glow-blue lg:-translate-y-4 lg:scale-[1.03]"
                : "glass-card hover:-translate-y-1"
            }`}
          >
            {p.featured && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#2563eb] to-[#06b6d4] px-3.5 py-1 text-xs font-bold text-white shadow-[0_0_20px_-2px_rgba(59,130,246,0.8)]">
                  <Sparkles className="h-3 w-3" /> Most Popular
                </span>
              </div>
            )}

            <div className="mb-5 flex items-center gap-3">
              <span
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                  p.featured
                    ? "bg-gradient-to-br from-[#2563eb] to-[#06b6d4]"
                    : "bg-white/5 border border-white/10"
                }`}
              >
                <p.icon
                  className={`h-5 w-5 ${
                    p.featured ? "text-white" : "text-[#38bdf8]"
                  }`}
                />
              </span>
              <h3 className="text-xl font-bold text-white">{p.name}</h3>
            </div>

            <div className="mb-2 flex items-end gap-1">
              <span className="text-4xl font-bold text-white">{p.price}</span>
              <span className="mb-1 text-sm text-slate-400">{p.period}</span>
            </div>
            <p className="mb-6 text-sm text-slate-400">{p.description}</p>

            <ul className="mb-7 flex-1 space-y-3">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-slate-300">
                  <span
                    className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
                      p.featured
                        ? "bg-gradient-to-br from-[#2563eb] to-[#06b6d4]"
                        : "bg-[#3b82f6]/15"
                    }`}
                  >
                    <Check className="h-3 w-3 text-white" />
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            <Magnetic strength={0.3}>
              <a
                href="#contact"
                className={`block rounded-xl px-5 py-3 text-center text-sm font-semibold transition-all ${
                  p.featured
                    ? "btn-primary-glow"
                    : "btn-ghost-glass"
                }`}
              >
                {p.cta}
              </a>
            </Magnetic>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
