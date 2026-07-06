"use client";

import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const STATS = [
  { value: "500+", label: "Projects Delivered" },
  { value: "10M+", label: "Leads Generated" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "24/7", label: "Global Support" },
];

export function Stats() {
  return (
    <section className="relative mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:py-32 border-y border-border">
      <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE, delay: i * 0.1 }}
            className="flex flex-col items-start"
          >
            <div className="text-5xl font-medium tracking-tight text-primary sm:text-6xl mb-4">
              {s.value}
            </div>
            <div className="text-sm font-medium text-secondary-foreground uppercase tracking-widest">
              {s.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
