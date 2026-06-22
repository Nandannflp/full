"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail, CheckCircle2, Sparkles } from "lucide-react";
import { Magnetic } from "./magnetic";
import { toast } from "sonner";

const EASE = [0.16, 1, 0.3, 1] as const;

export function CTA() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setSubmitted(true);
    toast.success("You're on the list! We'll be in touch within 24 hours.");
    setEmail("");
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section
      id="contact"
      className="relative mx-auto w-full max-w-7xl scroll-mt-24 px-4 py-20 sm:px-6 lg:py-28"
    >
      <div className="relative overflow-hidden rounded-[32px] border border-white/10 px-6 py-14 sm:px-12 sm:py-16 lg:px-20 lg:py-20">
        {/* animated aurora background */}
        <div className="absolute inset-0 -z-10 bg-[#020617]" />
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
            className="mx-auto mt-5 max-w-xl text-pretty text-base text-slate-200/90 sm:text-lg"
          >
            Join 500+ brands growing with Adwiser. Get a free strategy session
            and a custom growth roadmap in 24 hours.
          </motion.p>

          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
            className="mx-auto mt-8 flex w-full max-w-md flex-col gap-3 sm:flex-row"
          >
            <div className="relative flex-1">
              <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                aria-label="Email address"
                className="h-12 w-full rounded-xl border border-white/15 bg-white/10 pl-10 pr-4 text-sm text-white placeholder:text-slate-400 backdrop-blur-md transition-colors focus:border-[#38bdf8] focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/40"
              />
            </div>
            <Magnetic strength={0.25}>
              <button
                type="submit"
                className="btn-primary-glow group inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-xl px-6 text-sm font-semibold"
              >
                {submitted ? (
                  <>
                    <CheckCircle2 className="h-4 w-4" /> Sent!
                  </>
                ) : (
                  <>
                    Let's Build Something Amazing
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </Magnetic>
          </motion.form>

          <p className="mt-4 text-xs text-slate-300/70">
            No spam. Unsubscribe anytime. We respect your privacy.
          </p>
        </div>
      </div>
    </section>
  );
}
