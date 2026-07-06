"use client";

import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

export function CTA() {
  return (
    <section className="relative w-full bg-primary px-4 py-32 sm:px-6 lg:py-48 text-center text-primary-foreground">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: EASE }}
        className="mx-auto max-w-5xl"
      >
        <h2 className="font-display text-5xl font-extrabold leading-[0.9] tracking-tighter sm:text-7xl lg:text-9xl mb-12">
          Every pixel has
          <br />
          a purpose.
        </h2>
        <a
          href="#contact"
          className="inline-block rounded-full bg-primary-foreground px-10 py-5 text-lg font-semibold text-primary transition-transform hover:scale-105"
        >
          Start Your Project
        </a>
      </motion.div>
    </section>
  );
}
