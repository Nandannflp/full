"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const FAQS = [
  { q: "How do you measure success?", a: "We define clear KPIs during our strategy phase, focusing primarily on acquisition cost, conversion rate, and lifetime value." },
  { q: "What is your typical timeline?", a: "Most digital platforms take 8-12 weeks from strategy to launch. AI automation systems vary based on complexity." },
  { q: "Do you work with startups?", a: "We partner with ambitious companies at all stages, provided they have a clear vision and are ready to invest in premium execution." },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  
  return (
    <section className="relative mx-auto w-full max-w-7xl px-4 py-32 sm:px-6 lg:py-40">
      <div className="grid gap-16 lg:grid-cols-2">
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
            className="text-4xl font-medium tracking-tight text-primary sm:text-5xl"
          >
            Questions & Answers
          </motion.h2>
        </div>
        <div className="flex flex-col gap-4 border-t border-border pt-4">
          {FAQS.map((faq, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE, delay: i * 0.1 }}
              className="border-b border-border pb-4"
            >
              <button 
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between py-4 text-left text-xl font-medium text-primary transition-colors hover:text-secondary-foreground"
              >
                {faq.q}
                <span className="text-2xl font-light">{open === i ? "−" : "+"}</span>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <p className="pb-8 pt-2 text-lg text-secondary-foreground leading-relaxed">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
