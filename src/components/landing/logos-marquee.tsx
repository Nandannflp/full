"use client";

import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

// Stylized brand "logos" built from text + a unique mark each, so we avoid
// external assets while keeping a premium, recognizable feel.
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
      className="flex shrink-0 items-center gap-12 pr-12"
      style={{ animation: `${reverse ? "marquee-rev" : "marquee"} 38s linear infinite` }}
    >
      {LOGOS.map((l) => (
        <div
          key={l.name}
          className="group flex items-center gap-2.5 opacity-55 transition-all duration-300 hover:opacity-100"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-900/10 bg-slate-900/5 font-display text-sm font-bold text-[#38bdf8] transition-all duration-300 group-hover:border-[#3b82f6]/50 group-hover:bg-[#3b82f6]/10 group-hover:text-slate-900">
            {l.mark}
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-slate-600 transition-colors duration-300 group-hover:text-slate-900">
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
      className="relative mx-auto w-full max-w-7xl px-4 py-10 sm:px-6"
      aria-label="Trusted by leading brands"
    >
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: EASE }}
        className="mb-7 text-center text-xs font-semibold uppercase tracking-[0.25em] text-slate-500"
      >
        Powering growth at category leaders
      </motion.p>

      <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        {/* two rows, opposite directions for a richer marquee */}
        <div className="flex flex-col gap-5">
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
