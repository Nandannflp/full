"use client";

import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  return (
    <section
      id="home"
      className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col items-center justify-center px-4 pt-32 pb-24 sm:px-6 lg:pt-40 lg:pb-32"
    >
      <div className="flex w-full flex-col items-start justify-center max-w-[1000px]">
        
        {/* Massive Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: EASE }}
          className="text-balance text-6xl font-extrabold leading-[0.9] tracking-tighter text-primary sm:text-7xl md:text-8xl lg:text-[140px]"
        >
          We build brands
          <br />
          people remember.
        </motion.h1>

        {/* Minimal Supporting Text */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.2 }}
          className="mt-12 max-w-2xl text-pretty text-lg font-medium leading-relaxed text-secondary-foreground sm:text-xl lg:text-2xl"
        >
          We design websites, identities, and growth systems that help ambitious businesses stand apart.
        </motion.p>

        {/* Single Strong CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.3 }}
          className="mt-16"
        >
          <a
            href="#contact"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-primary px-10 py-5 text-base font-semibold text-primary-foreground transition-transform hover:scale-105"
          >
            <span className="relative z-10">Start Your Project</span>
            <div className="absolute inset-0 z-0 bg-white/20 opacity-0 transition-opacity group-hover:opacity-100" />
          </a>
        </motion.div>
        
      </div>
    </section>
  );
}
