"use client";

import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Testimonials() {
  return (
    <section className="relative mx-auto w-full max-w-7xl px-4 py-32 sm:px-6 lg:py-40 border-t border-border">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: EASE }}
        className="max-w-4xl"
      >
        <h2 className="text-3xl font-medium leading-relaxed text-primary sm:text-4xl lg:text-5xl">
          "Adwiser transformed our entire digital presence. They didn't just build a website; they architected a growth engine that fundamentally changed how we acquire customers."
        </h2>
        <div className="mt-12 flex items-center gap-6">
          <div className="h-16 w-16 bg-accent rounded-full" />
          <div>
            <div className="text-lg font-medium text-primary">Elena Rodriguez</div>
            <div className="text-secondary-foreground">CMO, TechVentures</div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
