"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const EASE = [0.16, 1, 0.3, 1] as const;

const PARTNERS = [
  { name: "Meta", src: "/Meta-logo.webp", w: 80, h: 40 },
  { name: "Google", src: "/google-logo.jpg", w: 90, h: 40 },
  { name: "Shopify", src: "/Shopify-logo.webp", w: 110, h: 40 },
  { name: "Hostinger", src: "/Hostinger-logo.png", w: 110, h: 40 },
  { name: "Anthropic", src: "/Anthropic-logo.png", w: 110, h: 40 },
  { name: "OpenAI", src: "/Openai-logo.webp", w: 100, h: 40 },
];

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
      <p className="mb-10 text-center text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
        Our Performance Marketing Services are Certified by
      </p>

      <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
        {PARTNERS.map((logo, i) => (
          <motion.div
            key={logo.name}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08, ease: EASE }}
            className="flex items-center justify-center rounded-2xl border border-border/60 bg-white/80 px-6 py-4 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-md hover:border-border dark:bg-white/10"
          >
            <div className="relative" style={{ width: logo.w, height: logo.h }}>
              <Image
                src={logo.src}
                alt={`${logo.name} logo`}
                fill
                className="object-contain"
                sizes={`${logo.w}px`}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
