"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Magnetic } from "./magnetic";
import { BookCallModal } from "./book-call-modal";

const EASE = [0.16, 1, 0.3, 1] as const;

export function CTA() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section
      id="contact"
      className="relative mx-auto w-full max-w-7xl scroll-mt-24 px-4 py-20 sm:px-6 lg:py-28"
    >
      <div className="relative overflow-hidden rounded-[32px] border border-slate-900/10 px-6 py-14 sm:px-12 sm:py-16 lg:px-20 lg:py-20">
        {/* animated aurora background */}
        <div className="absolute inset-0 -z-10 bg-[#0A0A0A]" />
        <div
          className="absolute inset-0 -z-10 gradient-animate opacity-90"
          style={{
            background:
              "linear-gradient(120deg, rgba(37,99,235,0.35), rgba(6,182,212,0.25), rgba(59,130,246,0.35), rgba(56,189,248,0.2))",
          }}
        />
        <div className="absolute inset-0 -z-10">
          <div className="absolute -left-10 top-0 h-72 w-72 rounded-full bg-[#2563eb]/40 blur-[100px] animate-aurora" />
          <div
            className="absolute -right-10 bottom-0 h-72 w-72 rounded-full bg-[#06b6d4]/40 blur-[100px] animate-aurora"
            style={{ animationDelay: "-8s" }}
          />
        </div>
        <div className="absolute inset-0 -z-10 noise-overlay mix-blend-overlay" />
        <div className="absolute inset-0 -z-10 grid-pattern opacity-40" />

        <div className="relative mx-auto max-w-2xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            className="kicker"
          >
            <Sparkles className="h-3.5 w-3.5" /> Let's grow together
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.05 }}
            className="mt-5 text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Ready To Scale Faster?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.12 }}
            className="mx-auto mt-5 max-w-xl text-pretty text-base text-white/70 sm:text-lg"
          >
            Join 500+ brands growing with Adwiser. Get a free strategy session
            and a custom growth roadmap in 24 hours.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
            className="mx-auto mt-8 flex justify-center w-full max-w-md"
          >
            <Magnetic strength={0.25}>
              <button
                onClick={() => setIsModalOpen(true)}
                className="btn-primary-glow group inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-xl px-8 text-sm font-semibold"
              >
                Book a call
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </Magnetic>
          </motion.div>
        </div>
      </div>

      <BookCallModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
