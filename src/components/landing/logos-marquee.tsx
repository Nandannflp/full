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

export function LogosMarquee() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: EASE }}
      className="relative mx-auto w-full max-w-7xl px-4 py-16 sm:px-6"
      aria-label="Powered By"
    >
      <p className="mb-12 text-center text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
        Powered By
      </p>

      <div className="flex flex-wrap items-center justify-center gap-12 sm:gap-16 lg:gap-20">
        {PARTNERS.map((logo, i) => (
          <motion.div
            key={logo.name}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.07, ease: EASE }}
            className="group flex flex-col items-center gap-3"
          >
            <div className="relative h-16 w-32 opacity-70 transition-opacity duration-300 group-hover:opacity-100">
              <Image
                src={logo.src}
                alt={`${logo.name} logo`}
                fill
                className="object-contain"
                sizes="128px"
              />
            </div>
            <span className="text-sm font-semibold tracking-wide text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
              {logo.name}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
