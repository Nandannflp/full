"use client";

import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const SERVICES = [
  {
    id: "01",
    title: "Lead Generation",
    description:
      "AI-driven funnels, smart capture forms, and intent scoring that deliver qualified prospects directly to your pipeline — 24/7. We don't just find leads; we find the right leads.",
  },
  {
    id: "02",
    title: "Website Development",
    description:
      "Award-worthy websites engineered for speed, SEO, and conversion. Built with modern stacks and pixel-perfect craft to ensure your brand stands out in a crowded market.",
  },
  {
    id: "03",
    title: "AI Automation",
    description:
      "Automate support, follow-ups, reporting, and operations with custom AI agents that work around the clock. Intelligent workflows that scale with your ambitions.",
  },
];

export function Services() {
  return (
    <section
      id="services"
      className="relative mx-auto w-full max-w-7xl px-4 py-32 sm:px-6 lg:py-40"
    >
      <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-24 gap-8">
        <div className="max-w-2xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
            className="text-4xl font-medium tracking-tight text-primary sm:text-5xl lg:text-6xl"
          >
            Premium solutions for explosive growth.
          </motion.h2>
        </div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          className="max-w-md text-base leading-relaxed text-secondary-foreground"
        >
          Three pillars engineered to turn attention into revenue — each powered by AI and crafted with obsessive attention to detail.
        </motion.p>
      </div>

      <div className="grid gap-16 lg:grid-cols-3">
        {SERVICES.map((s, i) => (
          <motion.article
            key={s.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE, delay: i * 0.1 }}
            className="group flex flex-col border-t border-border pt-8"
          >
            <div className="mb-8 text-sm font-medium text-secondary-foreground">
              {s.id}
            </div>
            <h3 className="mb-6 text-2xl font-medium text-primary md:text-3xl">
              {s.title}
            </h3>
            <p className="text-base leading-relaxed text-secondary-foreground">
              {s.description}
            </p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
