"use client";

import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const LOGOS = [
  { name: "Nebula", mark: "N" },
  { name: "Vertex", mark: "V" },
  { name: "Lumen", mark: "L" },
  { name: "Orbit", mark: "O" },
  { name: "Pulse", mark: "P" },
  { name: "Quanta", mark: "Q" },
  { name: "Helix", mark: "H" },
  { name: "Apex", mark: "A" },
];

function LogoRow({ reverse = false }: { reverse?: boolean }) {
  return (
    <div
      className="flex shrink-0 items-center gap-16 pr-16"
      style={{ animation: `${reverse ? "marquee-rev" : "marquee"} 38s linear infinite` }}
    >
      {LOGOS.map((l) => (
        <div
          key={l.name}
          className="group flex items-center gap-4 opacity-40 transition-all duration-300 hover:opacity-100"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-none bg-accent font-display text-lg font-bold text-primary transition-all duration-300">
            {l.mark}
          </span>
          <span className="font-display text-2xl font-bold tracking-tight text-secondary-foreground transition-colors duration-300 group-hover:text-primary">
            {l.name}
          </span>
        </div>
      ))}
    </div>
  );
}

export function LogosMarquee() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: EASE }}
      className="relative mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 border-b border-border"
      aria-label="Trusted by leading brands"
    >
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: EASE }}
        className="mb-12 text-center text-sm font-medium uppercase tracking-widest text-secondary-foreground"
      >
        Trusted by category leaders
      </motion.p>

      <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <div className="flex flex-col gap-8">
          <div className="flex">
            <LogoRow />
            <LogoRow />
          </div>
          <div className="flex">
            <LogoRow reverse />
            <LogoRow reverse />
          </div>
        </div>
      </div>
    </motion.section>
  );
}
