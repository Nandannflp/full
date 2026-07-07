"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const EASE = [0.16, 1, 0.3, 1] as const;

const PARTNERS = [
  { name: "Meta", src: "/Meta-logo.webp" },
  { name: "Google", src: "/google-logo.jpg" },
  { name: "Shopify", src: "/Shopify-logo.webp" },
  { name: "Hostinger", src: "/Hostinger-logo.png" },
  { name: "Anthropic", src: "/Anthropic-logo.png" },
  { name: "OpenAI", src: "/Openai-logo.webp" },
];

// Duplicate for seamless infinite scroll
const LOGOS_DOUBLED = [...PARTNERS, ...PARTNERS];

export function LogosMarquee() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: EASE }}
      className="relative mx-auto w-full max-w-7xl px-4 py-12 sm:px-6"
      aria-label="Partnered with"
    >
      <p className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
        Partnered with
      </p>

      <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
        <div className="flex" style={{ animation: "marquee 30s linear infinite" }}>
          {LOGOS_DOUBLED.map((logo, i) => (
            <div
              key={`${logo.name}-${i}`}
              className="mx-8 flex shrink-0 items-center justify-center"
            >
              <div className="group relative flex h-14 items-center gap-3 rounded-2xl border border-border/50 bg-background/60 px-6 py-3 backdrop-blur-sm transition-all duration-300 hover:border-border hover:bg-background hover:shadow-md">
                <div className="relative h-7 w-7 shrink-0 overflow-hidden rounded-md">
                  <Image
                    src={logo.src}
                    alt={`${logo.name} logo`}
                    fill
                    className="object-contain"
                    sizes="28px"
                  />
                </div>
                <span className="text-sm font-semibold tracking-tight text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                  {logo.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
