"use client";

import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Solutions() {
  return (
    <section id="solutions" className="relative mx-auto w-full max-w-7xl px-4 py-32 sm:px-6 lg:py-40">
      <div className="mb-24">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="text-4xl font-medium tracking-tight text-primary sm:text-5xl lg:text-6xl max-w-3xl"
        >
          A different approach to digital growth.
        </motion.h2>
      </div>
      <div className="grid gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="border border-border p-12 flex flex-col justify-between aspect-[4/3] lg:aspect-auto"
        >
          <div className="text-secondary-foreground font-medium mb-8">01 — Strategy</div>
          <div>
            <h3 className="text-3xl font-medium text-primary mb-6">Built for scale</h3>
            <p className="text-secondary-foreground text-lg leading-relaxed">
              We design every system with your future in mind. Scalable architecture, 
              robust design systems, and AI models that learn as you grow.
            </p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
          className="bg-accent p-12 flex flex-col justify-between aspect-[4/3] lg:aspect-auto"
        >
          <div className="text-secondary-foreground font-medium mb-8">02 — Execution</div>
          <div>
            <h3 className="text-3xl font-medium text-primary mb-6">Pixel perfection</h3>
            <p className="text-secondary-foreground text-lg leading-relaxed">
              Every detail matters. We craft digital experiences that not only perform 
              flawlessly but leave a lasting impression on your audience.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
